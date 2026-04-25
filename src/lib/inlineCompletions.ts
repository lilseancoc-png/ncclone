import type * as MonacoT from "monaco-editor";
import type { Language, Problem } from "@/data/types";
import type { PuterChatMessage, PuterChatResponse } from "@/types/puter";

type Monaco = typeof MonacoT;

const COMPLETION_MODEL = "claude-sonnet-4-5";

const SYSTEM_PROMPT = `You provide inline single-shot code completions for a candidate solving a LeetCode-style problem.

Hard rules:
- Output ONLY the code that should appear at the cursor — no markdown, no fences, no explanations, no echoing of the surrounding code.
- Complete the current logical unit only (one to three lines). Do not write the whole solution.
- The first line you emit will be inserted at the cursor with NO extra leading whitespace — if the cursor sits at the start of a fresh indented line, the editor already has the indent; you supply only the code.
- Subsequent lines must include their own indentation appropriate to the language and surrounding code.
- Never invent variables that don't exist in the surrounding code unless you are clearly introducing a new local.
- If you cannot offer something genuinely useful, output an empty string.`;

interface CompletionContext {
  problem: Problem;
  language: Language;
}

let activeContext: CompletionContext | null = null;
let enabled = false;
let registered = false;

export function setInlineCompletionContext(ctx: CompletionContext | null) {
  activeContext = ctx;
}

export function setInlineCompletionEnabled(value: boolean) {
  enabled = value;
}

export function isInlineCompletionEnabled(): boolean {
  return enabled;
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
    `\nReturn ONLY the code that should replace <CURSOR>. Keep it short (1–3 lines). No prose, no fences.`,
  );
  return parts.join("\n");
}

function extractText(resp: PuterChatResponse | string | unknown): string {
  if (typeof resp === "string") return resp;
  if (resp && typeof resp === "object") {
    const r = resp as PuterChatResponse;
    if (r.message?.content) return r.message.content;
    if (typeof r.text === "string") return r.text;
    if (typeof r.toString === "function") {
      const s = r.toString();
      if (s && s !== "[object Object]") return s;
    }
  }
  return "";
}

function stripFences(raw: string): string {
  if (!raw) return "";
  let s = raw.replace(/^﻿/, "");
  // Trim only trailing whitespace (leading whitespace may matter for indentation).
  s = s.replace(/\s+$/, "");
  // Strip a leading code-fence opener line, if any.
  s = s.replace(/^[ \t]*```[a-zA-Z0-9_+-]*\s*\n?/, "");
  // Strip a trailing fence.
  s = s.replace(/\n?[ \t]*```\s*$/, "");
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

  const resp = (await window.puter.ai.chat(messages, {
    model: COMPLETION_MODEL,
  })) as PuterChatResponse;

  if (signal.aborted) return "";
  return stripFences(extractText(resp));
}

interface PendingRequest {
  controller: AbortController;
  promise: Promise<string>;
  before: string;
  after: string;
}
let pending: PendingRequest | null = null;

const MIN_CHARS_BEFORE = 8;

function shouldSkip(before: string, after: string): boolean {
  if (!enabled || !activeContext) return true;
  if (before.length < MIN_CHARS_BEFORE) return true;
  // Don't fire mid-token: if the char immediately before cursor is an
  // identifier char and the next is too, we're likely in the middle of a word.
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
        const promise = fetchCompletion(ctx, before, after, controller.signal).catch(
          () => "",
        );
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
