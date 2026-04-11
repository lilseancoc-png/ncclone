import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Bit Manipulation — XOR and AND",
    timeComplexity: "O(32) = O(1)",
    spaceComplexity: "O(1)",
    code: `def getSum(a, b):
    mask = 0xFFFFFFFF
    while b & mask:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    return a & mask if b > 0 else a`,
    steps: [
      {
        description:
          "Add two integers without using + or -. How? Think about how binary addition works: 1+1=10 (that's 0 with a carry of 1). XOR (^) gives us the sum without carries (1^1=0, 1^0=1, 0^0=0 — same as addition without carrying). AND (&) then left-shift gives us the carries (only positions where both bits are 1 produce a carry). We repeat until no carries remain. Example: a=5 (101), b=3 (011). Expected: 8.",
        codeHighlightLines: [1, 2],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "a", value: "5 (101)" },
              { name: "b", value: "3 (011)" },
              { name: "XOR = sum without carry", value: "101 ^ 011 = 110" },
              { name: "AND << 1 = carries", value: "(101 & 011) << 1 = 010" },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 1: carry = (5 & 3) << 1 = (001) << 1 = 010 = 2. Bit position 0 had both bits set (1&1=1), producing a carry to position 1. a = 5 ^ 3 = 101 ^ 011 = 110 = 6 (sum without carry). b = carry = 2. Now we need to add the carry (2) to the partial sum (6) — same problem, just with different numbers!",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "a ^ b (XOR)", value: "101 ^ 011 = 110 = 6", highlight: true },
              { name: "(a & b) << 1", value: "(001) << 1 = 010 = 2", highlight: true },
              { name: "new a", value: "6 (sum so far)" },
              { name: "new b", value: "2 (remaining carry)" },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 2: carry = (6 & 2) << 1 = (010) << 1 = 100 = 4. Position 1 had both bits set. a = 6 ^ 2 = 110 ^ 010 = 100 = 4. b = carry = 4. Still have a carry — keep going.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "6 ^ 2", value: "110 ^ 010 = 100 = 4" },
              { name: "(6 & 2) << 1", value: "(010) << 1 = 100 = 4" },
              { name: "new a", value: "4", highlight: true },
              { name: "new b (carry)", value: "4", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Iteration 3: carry = (4 & 4) << 1 = (100) << 1 = 1000 = 8. a = 4 ^ 4 = 0. b = 8. Iteration 4: carry = (0 & 8) << 1 = 0. a = 0 ^ 8 = 8. b = 0. No more carries — loop exits! Return 8. We computed 5 + 3 = 8 using only bit operations. The mask (0xFFFFFFFF) handles negative numbers in Python by simulating 32-bit overflow. Time: O(32) = O(1) since carries can propagate at most 32 positions.",
        codeHighlightLines: [4, 5, 6, 7],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "iteration 3", value: "a=0, b=8" },
              { name: "iteration 4", value: "a=8, b=0 → done!" },
              { name: "return", value: "8 (5 + 3 = 8)", highlight: true },
              { name: "Time", value: "O(1) — max 32 iterations" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;
