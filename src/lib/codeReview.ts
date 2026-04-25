import { Language, Problem, TestCase, TestResult } from "@/data/types";
import type { PuterChatChunk, PuterChatMessage } from "@/types/puter";

const REVIEW_MODEL = "claude-sonnet-4-5";

export const SYSTEM_PROMPT = `You are a senior coding mentor pair-programming with a candidate on a LeetCode-style problem.

Focus on:
1. **Bugs & correctness** — logic errors, mishandled edge cases (empty input, single element, duplicates, negatives, overflow), off-by-ones.
2. **Time & space complexity** — give Big-O for the candidate's approach, and flag if a meaningfully better complexity exists.

Hard rules:
- Give **hints, not solutions**. Nudge the candidate toward the fix; never write the corrected code or pseudocode that hands them the answer.
- If the code is correct and optimal, say so in one or two sentences and stop.
- Be specific: cite variable names or describe the exact line.
- Keep each response under ~200 words. Use light markdown (short headings or bullets).
- The candidate may ask follow-up questions or share updated code. Stay in mentor mode across the conversation.`;

interface BuildPromptInput {
  problem: Problem;
  language: Language;
  code: string;
  failingResults: TestResult[];
  testCases: TestCase[];
}

export function buildInitialReviewMessage({
  problem,
  language,
  code,
  failingResults,
  testCases,
}: BuildPromptInput): string {
  const parts: string[] = [];
  parts.push(`# Problem ${problem.id}: ${problem.title} (${problem.difficulty})`);

  if (problem.description) {
    parts.push(`\n## Description\n${problem.description.trim()}`);
  }

  if (problem.functionName) {
    parts.push(`\n## Required function\n\`${problem.functionName}\``);
  }

  parts.push(`\n## My ${language} solution\n\`\`\`${language}\n${code}\n\`\`\``);

  if (failingResults.length > 0) {
    const lines = failingResults.slice(0, 5).map((r) => {
      const tc = testCases.find((t) => t.id === r.testCaseId);
      const input = tc?.input ?? `(test ${r.testCaseId})`;
      const expected = JSON.stringify(r.expected);
      const actual = r.error ? `error: ${r.error}` : JSON.stringify(r.actual);
      return `- ${input} → expected ${expected}, got ${actual}`;
    });
    parts.push(`\n## Failing tests (most recent run)\n${lines.join("\n")}`);
  }

  parts.push(`\nReview my solution per the rules. Be concise.`);
  return parts.join("\n");
}

export function buildFollowUpMessage(
  text: string,
  language: Language,
  currentCode: string,
): string {
  return `${text}\n\n## My current ${language} code\n\`\`\`${language}\n${currentCode}\n\`\`\``;
}

export function buildFailureExplanationMessage({
  testNumber,
  result,
  testCase,
  language,
  code,
}: {
  testNumber: number;
  result: TestResult;
  testCase: TestCase | undefined;
  language: Language;
  code: string;
}): string {
  const input = testCase?.input ?? `(test id ${result.testCaseId})`;
  const expected = JSON.stringify(result.expected);
  const actual = result.error
    ? `error: ${result.error}`
    : JSON.stringify(result.actual);

  return [
    `Focus only on why **test ${testNumber}** is failing. Be concrete: name the variable or line, and keep it tight.`,
    ``,
    `## Failing case`,
    `- Input: \`${input}\``,
    `- Expected: \`${expected}\``,
    `- Got: \`${actual}\``,
    ``,
    `## My ${language} code`,
    "```" + language,
    code,
    "```",
  ].join("\n");
}

export const COMPLEXITY_SYSTEM_PROMPT = `You analyze the Big-O complexity of a submitted solution.

Respond in **exactly this format** and nothing else:

Time: O(...)
<one short sentence justifying time>
Space: O(...)
<one short sentence justifying space>

Rules:
- Use the tightest correct bound for the candidate's actual code (not the optimal solution).
- Sentences must be <= 20 words each.
- No code, no markdown headings, no lists, no preface.`;

export function buildComplexityMessage({
  problem,
  language,
  code,
}: {
  problem: Problem;
  language: Language;
  code: string;
}): string {
  return [
    `Problem: ${problem.title} (${problem.difficulty})`,
    ``,
    `## ${language} solution`,
    "```" + language,
    code,
    "```",
  ].join("\n");
}

export const HINT_SYSTEM_PROMPT = `You give ONE hint at a time to a candidate solving a LeetCode-style problem.

The user will tell you their current hint level (1-5). Each level is strictly more revealing:
- Level 1: broad direction — which family of algorithms or data structures fits.
- Level 2: a key property of the input or invariant they should notice.
- Level 3: name the concrete data structure or technique to use.
- Level 4: describe the loop/pass structure in plain English.
- Level 5: point at the specific line or variable in their current code that is wrong (or the exact missing step), as close to a spoiler as you can get without writing code.

Hard rules:
- Output **one short paragraph only** (<= 50 words). No lists, no headings.
- Never write code, pseudocode, or a step-by-step solution.
- Do not repeat a previous hint — each new level must add genuinely new information.
- If the candidate's code is already correct, say so in one sentence.`;

export function buildHintMessage({
  problem,
  language,
  code,
  level,
  previousHints,
}: {
  problem: Problem;
  language: Language;
  code: string;
  level: number;
  previousHints: string[];
}): string {
  const parts: string[] = [];
  parts.push(`Problem: ${problem.title} (${problem.difficulty})`);
  if (problem.description) {
    parts.push(`\n## Description\n${problem.description.trim()}`);
  }
  if (code.trim()) {
    parts.push(`\n## My current ${language} code`);
    parts.push("```" + language);
    parts.push(code);
    parts.push("```");
  } else {
    parts.push(`\n(The candidate has not written any code yet.)`);
  }
  if (previousHints.length > 0) {
    parts.push(`\n## Previous hints I already saw`);
    parts.push(previousHints.map((h, i) => `${i + 1}. ${h}`).join("\n"));
  }
  parts.push(`\nGive me hint level ${level} per the rules.`);
  return parts.join("\n");
}

export const EXPLAIN_SYSTEM_PROMPT = `You translate a LeetCode-style problem statement into plain English for a candidate who is intimidated by it.

Output **exactly three bullets** in this order, each one short sentence:
- **Input:** what the function receives (concrete shape and meaning).
- **Output:** what it must return (concrete shape, including edge-case conventions).
- **The catch:** the single hardest constraint or hidden requirement they must respect.

Hard rules:
- Use markdown bullets with the bolded labels exactly as shown above.
- Do not reveal the algorithm or data structure to use. Stay descriptive, not prescriptive.
- Refer to the actual variable / parameter names from the problem when helpful.
- Keep each bullet under 25 words. No preface, no closing remarks.`;

export function buildExplainMessage(problem: Problem): string {
  const parts: string[] = [
    `Problem: ${problem.title} (${problem.difficulty})`,
  ];
  if (problem.description) {
    parts.push(`\n## Description\n${problem.description.trim()}`);
  }
  if (problem.functionName) {
    parts.push(`\n## Function name\n\`${problem.functionName}\``);
  }
  return parts.join("\n");
}

export const APPROACH_CHECK_SYSTEM_PROMPT = `You are evaluating a candidate's PLAN for a LeetCode-style problem **before they write any code**. They want to know if their approach is on the right track.

Output **exactly three labeled lines** in this order, each one short sentence (≤ 25 words):

**Verdict:** one of "On track", "Partially there", or "Reconsider".
**Why:** explain the verdict, citing a specific aspect of their plan in their own words.
**Probe:** one question that points at a gap, edge case, or complexity concern they should address next.

Hard rules:
- Do NOT write code or pseudocode.
- Do NOT name an algorithm or data structure that the candidate has not already named — describe behavior in plain English instead.
- Be concrete: refer to what the candidate actually said, not generic advice.
- If the plan is empty, vague, or off-topic, give Verdict "Reconsider" and Probe a clarifying question.
- No preface, no closing remarks, no extra lines.`;

export function buildApproachCheckMessage({
  problem,
  plan,
}: {
  problem: Problem;
  plan: string;
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
  parts.push(`\n## My plan (before coding)`);
  parts.push(plan.trim() || "(empty)");
  parts.push(`\nReact per the rules. Three labeled lines, no more.`);
  return parts.join("\n");
}

export class PuterUnavailableError extends Error {
  constructor() {
    super(
      "AI reviewer isn't available. Make sure your browser allowed the puter.com script and try again.",
    );
    this.name = "PuterUnavailableError";
  }
}

function extractChunkText(chunk: PuterChatChunk | string | unknown): string {
  if (typeof chunk === "string") return chunk;
  if (chunk && typeof chunk === "object" && "text" in chunk) {
    const t = (chunk as PuterChatChunk).text;
    if (typeof t === "string") return t;
  }
  return "";
}

export async function streamChat(
  messages: PuterChatMessage[],
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  if (typeof window === "undefined" || !window.puter?.ai?.chat) {
    throw new PuterUnavailableError();
  }

  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const stream = await window.puter.ai.chat(messages, {
    model: REVIEW_MODEL,
    stream: true,
  });

  let full = "";
  for await (const chunk of stream) {
    if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
    const delta = extractChunkText(chunk);
    if (delta) {
      full += delta;
      onDelta(delta);
    }
  }
  return full;
}
