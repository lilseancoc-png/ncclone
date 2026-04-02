import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Greedy — Sorted Counting",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  code: `def is_n_straight_hand(hand, groupSize):
    if len(hand) % groupSize != 0:
        return False
    count = {}
    for card in hand:
        count[card] = count.get(card, 0) + 1
    for card in sorted(count):
        while count[card] > 0:
            for i in range(card, card + groupSize):
                if count.get(i, 0) == 0:
                    return False
                count[i] -= 1
    return True`,
  steps: [
    {
      description:
        "Can [1,2,3,6,2,3,4,7,8] be split into groups of 3 consecutive cards? First check: len=9, 9%3=0, so it is possible. Count frequencies of each card.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "hand", values: [1, 2, 3, 6, 2, 3, 4, 7, 8] },
        { type: "hashmap", label: "count", entries: [[1, 1], [2, 2], [3, 2], [4, 1], [6, 1], [7, 1], [8, 1]] },
        { type: "variables", entries: [{ name: "groupSize", value: 3 }, { name: "len % groupSize", value: "9 % 3 = 0" }] },
      ],
    },
    {
      description:
        "Start from smallest card=1. Form group [1,2,3]: decrement count of 1,2,3. count[1]=0, count[2]=1, count[3]=1. First group formed successfully!",
      codeHighlightLines: [7, 8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "group 1", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "hashmap", label: "count", entries: [[1, 0], [2, 1], [3, 1], [4, 1], [6, 1], [7, 1], [8, 1]], highlightKeys: [1, 2, 3] },
      ],
    },
    {
      description:
        "count[1]=0, skip. Next smallest with count>0 is 2. Form group [2,3,4]: count[2]=0, count[3]=0, count[4]=0. Second group formed! Next smallest with count>0 is 6.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "group 2", values: [2, 3, 4], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "hashmap", label: "count", entries: [[1, 0], [2, 0], [3, 0], [4, 0], [6, 1], [7, 1], [8, 1]], highlightKeys: [2, 3, 4] },
      ],
    },
    {
      description:
        "Form group [6,7,8]: count[6]=0, count[7]=0, count[8]=0. All cards used, all groups valid. Return True! The greedy approach works because starting from the smallest unused card is the only way to include it in a consecutive group.",
      codeHighlightLines: [13],
      structures: [
        { type: "array", label: "group 3", values: [6, 7, 8], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "all groups", values: ["[1,2,3]", "[2,3,4]", "[6,7,8]"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;
