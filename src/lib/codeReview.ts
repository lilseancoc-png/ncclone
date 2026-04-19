import { Language, Problem, TestCase, TestResult } from "@/data/types";
import type { PuterChatChunk, PuterChatMessage } from "@/types/puter";

const REVIEW_MODEL = "claude-sonnet-4-5";

const SYSTEM_PROMPT = `You are a senior coding mentor reviewing a candidate's solution to a LeetCode-style problem.

Focus on two things:
1. **Bugs & correctness** — logic errors, mishandled edge cases (empty input, single element, duplicates, negatives, overflow), off-by-ones.
2. **Time & space complexity** — give Big-O for the candidate's approach, and flag if a meaningfully better complexity exists.

Hard rules:
- Give **hints, not solutions**. Nudge the candidate toward the fix; never write the corrected code or pseudocode that hands them the answer.
- If the code is correct and optimal, say so in one or two sentences and stop.
- Be specific: cite variable names or describe the exact line.
- Keep the whole response under ~200 words. Use light markdown (short headings or bullets).`;

interface BuildPromptInput {
  problem: Problem;
  language: Language;
  code: string;
  failingResults: TestResult[];
  testCases: TestCase[];
}

export function buildReviewPrompt({
  problem,
  language,
  code,
  failingResults,
  testCases,
}: BuildPromptInput): { system: string; user: string } {
  const parts: string[] = [];
  parts.push(`# Problem ${problem.id}: ${problem.title} (${problem.difficulty})`);

  if (problem.description) {
    parts.push(`\n## Description\n${problem.description.trim()}`);
  }

  if (problem.functionName) {
    parts.push(`\n## Required function\n\`${problem.functionName}\``);
  }

  parts.push(`\n## Candidate's ${language} solution\n\`\`\`${language}\n${code}\n\`\`\``);

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

  parts.push(
    `\n## Your task\nReview the solution per the system rules. Be concise.`,
  );

  return { system: SYSTEM_PROMPT, user: parts.join("\n") };
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

export async function streamReview(
  prompt: { system: string; user: string },
  onDelta: (text: string) => void,
  signal?: AbortSignal,
): Promise<string> {
  if (typeof window === "undefined" || !window.puter?.ai?.chat) {
    throw new PuterUnavailableError();
  }

  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  const messages: PuterChatMessage[] = [
    { role: "system", content: prompt.system },
    { role: "user", content: prompt.user },
  ];

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
