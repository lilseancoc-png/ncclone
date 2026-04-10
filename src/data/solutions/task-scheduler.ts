import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Greedy — Count Frequencies",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def least_interval(tasks, n):
    freq = [0] * 26
    for t in tasks:
        freq[ord(t) - ord('A')] += 1
    max_freq = max(freq)
    max_count = freq.count(max_freq)
    # (max_freq - 1) chunks of size (n + 1), plus max_count
    result = (max_freq - 1) * (n + 1) + max_count
    return max(result, len(tasks))`,
  steps: [
    {
      description:
        "Schedule tasks with a cooldown: the same task must have at least n intervals between executions. Find the minimum total intervals (including idle time). The key insight: the most frequent task dictates the schedule structure. We build 'frames' around it. tasks=[A,A,A,B,B,B], n=2. First, count frequencies.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "tasks", values: ["A", "A", "A", "B", "B", "B"] },
        { type: "variables", entries: [{ name: "n (cooldown)", value: 2 }, { name: "goal", value: "minimize total intervals" }] },
      ],
    },
    {
      description:
        "Frequencies: A=3, B=3. max_freq=3 (both A and B appear 3 times). max_count=2 (two tasks share the maximum). The most frequent task creates the 'skeleton' — place A's with n gaps between them: A _ _ A _ _ A. There are (max_freq-1) = 2 gaps, each of size n = 2.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "hashmap", label: "frequencies", entries: [["A", 3], ["B", 3]], highlightKeys: ["A", "B"] },
        { type: "array", label: "schedule skeleton (A with gaps)", values: ["A", "_", "_", "A", "_", "_", "A"], highlights: { 0: "active", 3: "active", 6: "active" } },
        { type: "variables", entries: [{ name: "max_freq", value: 3 }, { name: "max_count", value: "2 (A and B)" }, { name: "gaps", value: "2 gaps of size 2" }] },
      ],
    },
    {
      description:
        "Fill B into the gaps: A B _ A B _ A B. Each gap has n=2 slots. B fills one slot per gap, leaving 1 idle slot in each. The schedule has (max_freq-1) 'chunks' of size (n+1): [A,B,_] [A,B,_] — each chunk is 3 intervals. Then the final partial chunk has the max_count tasks: [A,B].",
      codeHighlightLines: [7, 8],
      structures: [
        { type: "array", label: "filled schedule", values: ["A", "B", "idle", "A", "B", "idle", "A", "B"], highlights: { 0: "success", 1: "success", 2: "found", 3: "success", 4: "success", 5: "found", 6: "success", 7: "success" } },
        { type: "variables", entries: [{ name: "chunk 1", value: "[A, B, idle] (size n+1=3)" }, { name: "chunk 2", value: "[A, B, idle] (size n+1=3)" }, { name: "final", value: "[A, B] (max_count=2)" }] },
      ],
    },
    {
      description:
        "Formula: (max_freq-1) × (n+1) + max_count = 2 × 3 + 2 = 8. But we also need at least len(tasks)=6 intervals (can't have fewer intervals than actual tasks). result = max(8, 6) = 8. The 2 idle slots are unavoidable — with only 2 distinct tasks and cooldown n=2, we can't fill all gaps.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "variables", entries: [{ name: "(max_freq-1)×(n+1)", value: "2 × 3 = 6" }, { name: "+ max_count", value: "6 + 2 = 8" }, { name: "len(tasks)", value: 6 }, { name: "max(8, 6)", value: 8, highlight: true }] },
      ],
    },
    {
      description:
        "Why max(result, len(tasks))? Consider tasks=[A,A,A,B,B,B,C,C,C,D,D,D], n=2. max_freq=3, max_count=4. Formula: 2×3+4 = 10. But len(tasks)=12 > 10. With many distinct tasks, all gaps get filled (no idle needed) and the answer is simply the task count. Schedule: A B C D A B C D A B C D — zero idle time!",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "no-idle example", values: ["A", "B", "C", "D", "A", "B", "C", "D", "A", "B", "C", "D"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success", 8: "success", 9: "success", 10: "success", 11: "success" } },
        { type: "variables", entries: [{ name: "many tasks", value: "gaps fully filled → 0 idle" }, { name: "answer", value: "max(10, 12) = 12" }] },
      ],
    },
    {
      description:
        "Return 8 for our original example. Time: O(n) to count frequencies. Space: O(1) — fixed 26-letter frequency array. The greedy insight: you never need to simulate the schedule. The most frequent task's count determines the frame size, and max_count handles ties at the top frequency. Everything else fits in the gaps.",
      codeHighlightLines: [9],
      structures: [
        { type: "array", label: "final schedule", values: ["A", "B", "idle", "A", "B", "idle", "A", "B"], highlights: { 0: "success", 1: "success", 2: "found", 3: "success", 4: "success", 5: "found", 6: "success", 7: "success" } },
        { type: "variables", entries: [{ name: "return", value: 8, highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1) — 26-letter array" }] },
      ],
    },
  ],
};

export default solution;
