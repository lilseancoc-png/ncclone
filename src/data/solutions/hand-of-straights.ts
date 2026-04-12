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
        "Can the hand be arranged into groups of consecutive cards of size groupSize? Greedy: the smallest card MUST start a group (nothing smaller exists to include it mid-group). So always start from the smallest available. Quick check: 9 cards, groupSize=3, 9%3=0 ✓. hand=[1,2,3,6,2,3,4,7,8], groupSize=3.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "hand (sorted view)", values: [1, 2, 2, 3, 3, 4, 6, 7, 8] },
        { type: "hashmap", label: "count", entries: [[1, 1], [2, 2], [3, 2], [4, 1], [6, 1], [7, 1], [8, 1]] },
        { type: "variables", entries: [{ name: "groupSize", value: 3 }, { name: "9 % 3 = 0", value: "possible ✓" }] },
      ],
    },
    {
      description:
        "Smallest card: 1 (count=1 > 0). Form group [1,2,3]: need count[1]≥1 ✓, count[2]≥1 ✓, count[3]≥1 ✓. Decrement all. count becomes {1:0, 2:1, 3:1, 4:1, 6:1, 7:1, 8:1}. Group 1 formed! Card 1 is used up.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "group 1", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "hashmap", label: "count after", entries: [[1, 0], [2, 1], [3, 1], [4, 1], [6, 1], [7, 1], [8, 1]], highlightKeys: [1, 2, 3] },
      ],
    },
    {
      description:
        "Card 1: count=0, skip. Card 2: count=1 > 0. Form group [2,3,4]: count[2]=1 ✓, count[3]=1 ✓, count[4]=1 ✓. Decrement all. Group 2 formed! Greedy correctness: card 2 is now the smallest remaining, so it MUST start a group. count={...2:0, 3:0, 4:0...}.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "group 2", values: [2, 3, 4], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "hashmap", label: "count after", entries: [[1, 0], [2, 0], [3, 0], [4, 0], [6, 1], [7, 1], [8, 1]], highlightKeys: [2, 3, 4] },
      ],
    },
    {
      description:
        "Cards 1-4 all count=0, skip. Card 6: count=1 > 0. Form group [6,7,8]: count[6]=1 ✓, count[7]=1 ✓, count[8]=1 ✓. Decrement all. Group 3 formed! All 9 cards consumed in 3 valid groups. No remaining cards with count > 0.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "group 3", values: [6, 7, 8], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "all groups", value: "[1,2,3], [2,3,4], [6,7,8]", highlight: true }, { name: "cards remaining", value: "0" }] },
      ],
    },
    {
      description:
        "Return True! All cards form valid consecutive groups. If any needed card had count=0 during group formation (e.g., hand=[1,2,3,6,2,3,4,7,9] — no 8 available when forming group starting at 6), we'd immediately return False. Time: O(n log n) for sorting unique cards. Space: O(n) for the count map.",
      codeHighlightLines: [13],
      structures: [
        { type: "array", label: "all groups", values: ["[1,2,3]", "[2,3,4]", "[6,7,8]"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;
