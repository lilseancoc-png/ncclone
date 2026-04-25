import type * as MonacoT from "monaco-editor";
import type { Language, Problem } from "@/data/types";
import type { PuterChatChunk, PuterChatMessage } from "@/types/puter";

type Monaco = typeof MonacoT;

const COMPLETION_MODEL = "claude-sonnet-4-5";

// Debounce at the provider level — Monaco still invokes us per keystroke, but
// it will wait this long after the latest invocation before actually firing.
const DEBOUNCE_MS = 300;

// Hard early-stop: enough text for one logical chunk, before the model rambles.
const MAX_CHARS = 400;
const MAX_NEWLINES = 4;

const MIN_CHARS_BEFORE = 2;

const SYSTEM_PROMPT = `You provide inline code completions for a candidate solving a LeetCode-style problem.

Hard rules:
- Output ONLY the code that should appear at the cursor. No markdown, no code fences, no explanations, no preface.
- Complete the current logical unit only (one to four lines). Do not write the whole solution.
- Match the surrounding indentation exactly. If the cursor is at the end of a line and the next logical step belongs on a new line, BEGIN your output with a newline and the appropriate indent.
- Never invent variables that don't already exist in the surrounding code unless you are clearly declaring a new local.
- Respect the exact syntax of the language.
- If you can't offer something genuinely useful, output an empty string.`;

interface CompletionContext {
  problem: Problem;
  language: Language;
}

export type InlineCompletionStatus = "idle" | "loading";

let activeContext: CompletionContext | null = null;
let enabled = false;
let registered = false;
let status: InlineCompletionStatus = "idle";
const statusListeners = new Set<(s: InlineCompletionStatus) => void>();

function setStatus(next: InlineCompletionStatus) {
  if (status === next) return;
  status = next;
  for (const listener of statusListeners) listener(status);
}

export function setInlineCompletionContext(ctx: CompletionContext | null) {
  activeContext = ctx;
}

export function setInlineCompletionEnabled(value: boolean) {
  enabled = value;
  if (!value) setStatus("idle");
}

export function isInlineCompletionEnabled(): boolean {
  return enabled;
}

export function subscribeInlineCompletionStatus(
  listener: (s: InlineCompletionStatus) => void,
): () => void {
  statusListeners.add(listener);
  listener(status);
  return () => {
    statusListeners.delete(listener);
  };
}

function buildPrompt({
  problem,
  language,
  before,
  after,
}: {
  problem: Problem;
  language: Language;
  before: string;
  after: string;
}): string {
  const parts: string[] = [
    `Problem: ${problem.title} (${problem.difficulty})`,
  ];
  if (problem.description) {
    parts.push(`\n## Description\n${problem.description.trim()}`);
  }
  if (problem.functionName) {
    parts.push(`\n## Required function\n\`${problem.functionName}\``);
  }
  parts.push(`\n## Code with cursor (cursor marked as <CURSOR>)`);
  parts.push("```" + language);
  parts.push(`${before}<CURSOR>${after}`);
  parts.push("```");
  parts.push(
    `\nReturn ONLY the code that should replace <CURSOR>. Short (1–4 lines). No prose, no fences.`,
  );
  return parts.join("\n");
}

function cleanCompletion(raw: string): string {
  if (!raw) return "";
  let s = raw;
  // Trim trailing whitespace; leading whitespace may be intentional (indent).
  s = s.replace(/[ \t\r\n]+$/, "");
  // If the model wrapped its answer in a fence, prefer the fence body.
  const fenceMatch = s.match(/```[a-zA-Z0-9_+-]*\r?\n?([\s\S]*?)```/);
  if (fenceMatch) {
    s = fenceMatch[1].replace(/[ \t\r\n]+$/, "");
  } else {
    // Drop a single leading prose line ("Sure! Here's...:") if present.
    const firstLineEnd = s.indexOf("\n");
    if (firstLineEnd > 0) {
      const firstLine = s.slice(0, firstLineEnd);
      if (
        /^(Sure|Here|This|That|The|Below|Try|You|Okay|Got it)\b/i.test(firstLine) &&
        firstLine.trimEnd().endsWith(":")
      ) {
        s = s.slice(firstLineEnd + 1);
      }
    }
  }
  return s;
}

async function fetchCompletion(
  ctx: CompletionContext,
  before: string,
  after: string,
  signal: AbortSignal,
): Promise<string> {
  if (typeof window === "undefined" || !window.puter?.ai?.chat) return "";
  if (signal.aborted) return "";

  const messages: PuterChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: buildPrompt({
        problem: ctx.problem,
        language: ctx.language,
        before,
        after,
      }),
    },
  ];

  // Stream so we can stop early once we have enough — much snappier than
  // waiting for the model to finish a long monologue.
  const stream = await window.puter.ai.chat(messages, {
    model: COMPLETION_MODEL,
    stream: true,
  });

  if (signal.aborted) return "";

  let acc = "";
  for await (const chunk of stream) {
    if (signal.aborted) break;
    const delta =
      typeof chunk === "string"
        ? chunk
        : (chunk as PuterChatChunk)?.text ?? "";
    if (!delta) continue;
    acc += delta;
    if (acc.length >= MAX_CHARS) break;
    const newlines = (acc.match(/\n/g) ?? []).length;
    if (newlines >= MAX_NEWLINES) break;
  }

  return cleanCompletion(acc);
}

interface PendingRequest {
  controller: AbortController;
  promise: Promise<string>;
  before: string;
  after: string;
}
let pending: PendingRequest | null = null;

function shouldSkip(before: string, after: string): boolean {
  if (!enabled || !activeContext) return true;
  if (before.length < MIN_CHARS_BEFORE) return true;
  // Don't fire mid-identifier — would insert in the middle of a word.
  const prev = before.charAt(before.length - 1);
  const next = after.charAt(0);
  const isWord = (c: string) => /[A-Za-z0-9_]/.test(c);
  if (isWord(prev) && isWord(next)) return true;
  return false;
}

export function registerInlineCompletions(monaco: Monaco) {
  if (registered) return;
  registered = true;

  const languages: Language[] = ["python", "javascript", "java", "cpp"];

  for (const lang of languages) {
    monaco.languages.registerInlineCompletionsProvider(lang, {
      debounceDelayMs: DEBOUNCE_MS,
      async provideInlineCompletions(model, position, _ctx, token) {
        if (!enabled || !activeContext) return { items: [] };

        const beforeRange = {
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        };
        const lastLine = model.getLineCount();
        const lastCol = model.getLineMaxColumn(lastLine);
        const afterRange = {
          startLineNumber: position.lineNumber,
          startColumn: position.column,
          endLineNumber: lastLine,
          endColumn: lastCol,
        };
        const before = model.getValueInRange(beforeRange);
        const after = model.getValueInRange(afterRange);

        if (shouldSkip(before, after)) return { items: [] };

        // De-dupe: if a request for the exact same prefix is in flight, await it.
        if (pending && pending.before === before && pending.after === after) {
          try {
            const text = await pending.promise;
            if (token.isCancellationRequested || !text) return { items: [] };
            return {
              items: [
                {
                  insertText: text,
                  range: {
                    startLineNumber: position.lineNumber,
                    startColumn: position.column,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column,
                  },
                },
              ],
            };
          } catch {
            return { items: [] };
          }
        }

        // Cancel any older in-flight request — it's stale.
        pending?.controller.abort();

        const controller = new AbortController();
        token.onCancellationRequested(() => controller.abort());

        const ctx = activeContext;
        setStatus("loading");
        const promise = fetchCompletion(ctx, before, after, controller.signal)
          .catch(() => "")
          .finally(() => {
            // Drop status only if no other request raced ahead.
            if (pending && pending.controller === controller) setStatus("idle");
          });
        pending = { controller, promise, before, after };

        let text = "";
        try {
          text = await promise;
        } finally {
          if (pending && pending.controller === controller) pending = null;
        }

        if (token.isCancellationRequested || controller.signal.aborted) {
          return { items: [] };
        }
        if (!text) return { items: [] };

        return {
          items: [
            {
              insertText: text,
              range: {
                startLineNumber: position.lineNumber,
                startColumn: position.column,
                endLineNumber: position.lineNumber,
                endColumn: position.column,
              },
            },
          ],
        };
      },
      disposeInlineCompletions() {
        // No allocations to free.
      },
    });
  }
}
