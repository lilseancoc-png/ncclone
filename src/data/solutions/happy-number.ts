import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Hash Set — Cycle Detection",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(log n)",
    code: `def isHappy(n):
    seen = set()
    while n != 1:
        if n in seen:
            return False
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return True`,
    steps: [
      {
        description:
          "We need to determine if a number is 'happy'. A happy number eventually reaches 1 when we repeatedly replace it with the sum of the squares of its digits. If it enters a cycle (repeats a number), it's not happy. We use a hash set to detect cycles.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "variables", entries: [{ name: "n", value: 19 }] },
          { type: "set", label: "seen", values: [] },
        ],
      },
      {
        description:
          "n=19: digits are 1 and 9. Sum of squares = 1² + 9² = 1 + 81 = 82. Add 19 to seen, update n to 82.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "variables", entries: [{ name: "n", value: 82, highlight: true }] },
          { type: "set", label: "seen", values: [19], lastAdded: 19 },
        ],
      },
      {
        description:
          "n=82: digits are 8 and 2. Sum of squares = 8² + 2² = 64 + 4 = 68. Add 82 to seen, update n to 68.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "variables", entries: [{ name: "n", value: 68, highlight: true }] },
          { type: "set", label: "seen", values: [19, 82], lastAdded: 82 },
        ],
      },
      {
        description:
          "n=68: 6² + 8² = 36 + 64 = 100. n=100: 1² + 0² + 0² = 1. After a few more iterations, n reaches 1!",
        codeHighlightLines: [6],
        structures: [
          { type: "variables", entries: [{ name: "n", value: 1, highlight: true }] },
          { type: "set", label: "seen", values: [19, 82, 68, 100] },
        ],
      },
      {
        description:
          "n equals 1, so the while loop exits and we return True. 19 is a happy number! The set helped us detect if we ever entered a cycle — if we saw a repeated number, we'd return False immediately.",
        codeHighlightLines: [7],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "True", highlight: true }] },
        ],
      },
    ],
  },
  {
    label: "Floyd's Cycle Detection (Two Pointers)",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    code: `def isHappy(n):
    def get_next(num):
        return sum(int(d) ** 2 for d in str(num))

    slow = n
    fast = get_next(n)
    while fast != 1 and slow != fast:
        slow = get_next(slow)
        fast = get_next(get_next(fast))
    return fast == 1`,
    steps: [
      {
        description:
          "Instead of using a set, we can use Floyd's cycle detection — like detecting a cycle in a linked list. Slow pointer moves one step, fast pointer moves two steps. If they meet, there's a cycle (not happy). If fast reaches 1, it's happy.",
        codeHighlightLines: [1, 5, 6],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "slow", value: 19 },
              { name: "fast", value: 82 },
            ],
          },
        ],
      },
      {
        description:
          "slow = get_next(19) = 82. fast = get_next(get_next(82)) = get_next(68) = 100. They haven't met and fast isn't 1 yet, so continue.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "slow", value: 82, highlight: true },
              { name: "fast", value: 100, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "slow = get_next(82) = 68. fast = get_next(get_next(100)) = get_next(1) = 1. Fast has reached 1!",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "slow", value: 68 },
              { name: "fast", value: 1, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "fast == 1, so the loop exits and we return True. This approach uses O(1) space since we only track two pointers instead of storing all seen numbers in a set.",
        codeHighlightLines: [10],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "True", highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;
