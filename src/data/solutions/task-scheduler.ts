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
        "Schedule tasks with a cooldown: the same task must have at least n intervals between executions. Find the minimum total intervals (including idle time). The key insight: the most frequent task determines the structure. We build 'frames' around it, filling gaps with other tasks or idle time. tasks=[A,A,A,B,B,B], n=2. Frequencies: A=3, B=3.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "tasks", values: ["A", "A", "A", "B", "B", "B"] },
        { type: "hashmap", label: "frequencies", entries: [["A", 3], ["B", 3]], highlightKeys: ["A", "B"] },
        { type: "variables", entries: [{ name: "n (cooldown)", value: 2 }] },
      ],
    },
    {
      description:
        "max_freq=3 (both A and B appear 3 times). max_count=2 (two tasks share the maximum frequency). Build the schedule skeleton around the most frequent task: A _ _ A _ _ A. There are (max_freq-1)=2 'chunks' between A's, each of size (n+1)=3 (one A plus n cooldown slots). The last A stands alone (or with other max-freq tasks).",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "schedule skeleton", values: ["A", "_", "_", "A", "_", "_", "A"], highlights: { 0: "active", 3: "active", 6: "active" } },
        { type: "variables", entries: [{ name: "max_freq", value: 3 }, { name: "max_count", value: "2 (both A and B)" }, { name: "chunks", value: "2 groups of size 3" }] },
      ],
    },
    {
      description:
        "Fill B into the gaps: A B _ A B _ A B. Formula: (max_freq-1) × (n+1) + max_count = 2 × 3 + 2 = 8. But we also need at least len(tasks)=6 intervals (can't schedule fewer than the actual tasks). Result = max(8, 6) = 8. The 2 idle slots are unavoidable because with n=2 cooldown and only 2 distinct tasks, there aren't enough different tasks to fill all gaps.",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "array", label: "optimal schedule", values: ["A", "B", "idle", "A", "B", "idle", "A", "B"], highlights: { 0: "success", 1: "success", 2: "found", 3: "success", 4: "success", 5: "found", 6: "success", 7: "success" } },
        { type: "variables", entries: [{ name: "formula", value: "(3-1)×(2+1)+2 = 8" }, { name: "len(tasks)", value: 6 }, { name: "max(8, 6)", value: 8, highlight: true }] },
      ],
    },
    {
      description:
        "Return 8. Why max(result, len(tasks))? If n=0 or there are many distinct tasks, there might be no idle time needed — the total is just len(tasks). The formula handles both cases: idle-heavy schedules (few distinct tasks, high n) and zero-idle schedules (many distinct tasks, low n). Time: O(n) to count frequencies. Space: O(1) — fixed 26-letter frequency array.",
      codeHighlightLines: [9],
      structures: [
        { type: "variables", entries: [{ name: "return", value: 8, highlight: true }, { name: "schedule", value: "A B _ A B _ A B" }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;
