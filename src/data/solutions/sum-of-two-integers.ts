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
          "Add two integers without + or -. Binary addition: XOR (^) gives sum without carries (1^1=0, 1^0=1). AND (&) << 1 gives carries (both bits 1 → carry to next position). Repeat until no carries. a=5 (101), b=3 (011). Expected: 8.",
        codeHighlightLines: [1, 2],
        structures: [
          { type: "variables", entries: [{ name: "a", value: "5 (101)" }, { name: "b", value: "3 (011)" }, { name: "XOR = sum w/o carry", value: "101 ^ 011 = 110" }, { name: "AND << 1 = carries", value: "(101 & 011) << 1 = 010" }] },
        ],
      },
      {
        description:
          "Iteration 1: carry = (5 & 3) << 1 = (001) << 1 = 010 = 2. Position 0 had both bits set → carry to position 1. a = 5 ^ 3 = 110 = 6 (partial sum). b = 2 (remaining carry). Now add carry to partial sum — same problem, new numbers!",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "variables", entries: [{ name: "a ^ b", value: "101 ^ 011 = 110 = 6", highlight: true }, { name: "(a & b) << 1", value: "001 << 1 = 010 = 2", highlight: true }, { name: "new a=6, b=2", value: "carry still pending" }] },
        ],
      },
      {
        description:
          "Iteration 2: carry = (6 & 2) << 1 = (010) << 1 = 100 = 4. a = 6 ^ 2 = 110 ^ 010 = 100 = 4. b = 4. The carry propagated from position 1 to position 2. Still not done — a and b have overlapping bits again.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "variables", entries: [{ name: "6 ^ 2", value: "110 ^ 010 = 100 = 4" }, { name: "(6 & 2) << 1", value: "010 << 1 = 100 = 4" }, { name: "new a=4, b=4", value: "carry propagates again", highlight: true }] },
        ],
      },
      {
        description:
          "Iteration 3: carry = (4 & 4) << 1 = 100 << 1 = 1000 = 8. a = 4 ^ 4 = 000 = 0. b = 8. The carry rippled from position 2 to position 3. Iteration 4: carry = (0 & 8) << 1 = 0. a = 0 ^ 8 = 8. b = 0 — no more carries!",
        codeHighlightLines: [4, 5, 6],
        structures: [
          { type: "variables", entries: [{ name: "iter 3", value: "a=0, b=8 (carry at pos 3)" }, { name: "iter 4", value: "a=8, b=0 → done!", highlight: true }] },
        ],
      },
      {
        description:
          "Return 8. 5+3=8 using only XOR, AND, and shifts. The carry rippled: pos 0→1→2→3 (like decimal 9+1 carrying through digits). The mask 0xFFFFFFFF simulates 32-bit overflow for negative numbers in Python. Time: O(32)=O(1) — carries propagate at most 32 positions. Space: O(1).",
        codeHighlightLines: [7],
        structures: [
          { type: "variables", entries: [{ name: "return", value: "8 (5 + 3 = 8)", highlight: true }, { name: "carry path", value: "pos 0→1→2→3" }, { name: "Time", value: "O(1) — max 32 iterations" }] },
        ],
      },
    ],
  },
];

export default solutions;
