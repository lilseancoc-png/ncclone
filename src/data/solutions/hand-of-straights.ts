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
        "Determine if a hand of cards can be rearranged into groups of consecutive cards, each of size groupSize. Greedy insight: the smallest card MUST be the start of some group (it can't appear in the middle or end of a consecutive sequence, since there's nothing smaller). So always start groups from the smallest available card. First, quick check: if the total cards aren't divisible by groupSize, it's impossible. hand=[1,2,3,6,2,3,4,7,8], groupSize=3. 9 % 3 = 0, so it might work.",
      codeHighlightLines: [1, 2, 3, 4, 5, 6],
      structures: [
        { type: "array", label: "hand", values: [1, 2, 3, 6, 2, 3, 4, 7, 8] },
        { type: "hashmap", label: "count", entries: [[1, 1], [2, 2], [3, 2], [4, 1], [6, 1], [7, 1], [8, 1]] },
        { type: "variables", entries: [{ name: "groupSize", value: 3 }, { name: "9 % 3 = 0?", value: "Yes, possible" }] },
      ],
    },
    {
      description:
        "Iterate through sorted unique cards. Smallest card is 1 (count > 0). Start a group: need [1, 2, 3]. Check each card exists: count[1]=1 ✓, count[2]=2 ✓, count[3]=2 ✓. Decrement all three. If any card in the range had count=0, we'd return False immediately. Group [1,2,3] formed! Remaining: count={2:1, 3:1, 4:1, 6:1, 7:1, 8:1}.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "group 1", values: [1, 2, 3], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "hashmap", label: "count (after group 1)", entries: [[1, 0], [2, 1], [3, 1], [4, 1], [6, 1], [7, 1], [8, 1]], highlightKeys: [1, 2, 3] },
      ],
    },
    {
      description:
        "Card 1 has count=0, skip. Card 2 has count=1 > 0 — start group [2, 3, 4]. count[2]=1 ✓, count[3]=1 ✓, count[4]=1 ✓. Decrement all. Group formed! Why does greedy work here? Card 2 MUST start a group (it's the smallest remaining), and it can only form a consecutive group with 3 and 4. There's no other valid placement for it.",
      codeHighlightLines: [7, 8, 9, 10, 11, 12],
      structures: [
        { type: "array", label: "group 2", values: [2, 3, 4], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "hashmap", label: "count (after group 2)", entries: [[1, 0], [2, 0], [3, 0], [4, 0], [6, 1], [7, 1], [8, 1]], highlightKeys: [2, 3, 4] },
      ],
    },
    {
      description:
        "Cards 1-4 all have count=0, skip. Card 6 has count=1 — start group [6, 7, 8]. All present, decrement. All 9 cards used in 3 valid groups. Return True! If at any point a needed card was missing (e.g., if we had a 6 but no 7), we'd return False. Time: O(n log n) for sorting the unique cards. Space: O(n) for the count map. This same algorithm solves the 'Divide Array in Sets of K Consecutive Numbers' problem.",
      codeHighlightLines: [13],
      structures: [
        { type: "array", label: "all groups", values: ["[1,2,3]", "[2,3,4]", "[6,7,8]"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: "True", highlight: true }, { name: "Time", value: "O(n log n)" }, { name: "Space", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;
