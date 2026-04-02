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
        "Schedule tasks [A,A,A,B,B,B] with cooldown n=2. Same task needs at least n=2 intervals apart. Count frequencies first: A=3, B=3.",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "array", label: "tasks", values: ["A", "A", "A", "B", "B", "B"] },
        { type: "hashmap", label: "freq", entries: [["A", 3], ["B", 3]], highlightKeys: ["A", "B"] },
        { type: "variables", entries: [{ name: "n (cooldown)", value: 2 }] },
      ],
    },
    {
      description:
        "max_freq=3 (both A and B appear 3 times). max_count=2 (two tasks have the max frequency). The most frequent tasks form the skeleton: A _ _ A _ _ A. We have (max_freq-1)=2 gaps of size (n+1)=3.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "array", label: "schedule skeleton", values: ["A", "_", "_", "A", "_", "_", "A"], highlights: { 0: "active", 3: "active", 6: "active" } },
        { type: "variables", entries: [{ name: "max_freq", value: 3 }, { name: "max_count", value: 2 }, { name: "gaps", value: "2 chunks of size 3" }] },
      ],
    },
    {
      description:
        "Fill B into the gaps: A B _ A B _ A B. The formula: (max_freq-1) * (n+1) + max_count = 2 * 3 + 2 = 8. We also need at least len(tasks)=6 intervals. Result = max(8, 6) = 8.",
      codeHighlightLines: [7, 8, 9],
      structures: [
        { type: "array", label: "schedule", values: ["A", "B", "idle", "A", "B", "idle", "A", "B"], highlights: { 0: "success", 1: "success", 2: "found", 3: "success", 4: "success", 5: "found", 6: "success", 7: "success" } },
        { type: "variables", entries: [{ name: "(3-1)*(2+1)+2", value: 8 }, { name: "len(tasks)", value: 6 }, { name: "return", value: 8, highlight: true }] },
      ],
    },
    {
      description:
        "Return 8. The formula works because the most frequent task determines the minimum schedule length. Idle slots appear only when we run out of distinct tasks to fill gaps. O(n) time to count, O(1) space (fixed 26-letter array).",
      codeHighlightLines: [9],
      structures: [
        { type: "variables", entries: [{ name: "return", value: 8, highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;
