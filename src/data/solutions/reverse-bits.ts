import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Bit-by-Bit Reversal",
    timeComplexity: "O(32) = O(1)",
    spaceComplexity: "O(1)",
    code: `def reverseBits(n):
    result = 0
    for i in range(32):
        bit = (n >> i) & 1
        result |= bit << (31 - i)
    return result`,
    steps: [
      {
        description:
          "Reverse all 32 bits of an unsigned integer. The idea: extract each bit from position i in the input and place it at position (31 - i) in the result. Position 0 (rightmost/LSB) goes to position 31 (leftmost/MSB), position 1 goes to 30, and so on. Think of it like flipping a string of characters. Example: n = 13 = binary ...00001101.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "n (decimal)", value: 13 },
              { name: "n (binary)", value: "00000000000000000000000000001101" },
              { name: "result", value: "00000000000000000000000000000000" },
            ],
          },
        ],
      },
      {
        description:
          "i=0: Extract bit at position 0 → (13 >> 0) & 1 = 13 & 1 = 1 (the last bit). Place it at position 31-0 = 31 (the first bit): result |= 1 << 31. The least significant bit becomes the most significant bit. i=1: Extract bit at position 1 → (13 >> 1) & 1 = 6 & 1 = 0. Place 0 at position 30 — no change to result.",
        codeHighlightLines: [4, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "i=0: bit", value: "1 → placed at pos 31", highlight: true },
              { name: "i=1: bit", value: "0 → placed at pos 30" },
              { name: "result so far", value: "10000000000000000000000000000000" },
            ],
          },
        ],
      },
      {
        description:
          "i=2: Extract bit 2 → (13 >> 2) & 1 = 3 & 1 = 1. Place at position 29: result |= 1 << 29. i=3: Extract bit 3 → (13 >> 3) & 1 = 1 & 1 = 1. Place at position 28: result |= 1 << 28. After these, result has 1s at positions 31, 29, 28 — the mirror image of the original 1s at positions 0, 2, 3.",
        codeHighlightLines: [4, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "i=2: bit", value: "1 → placed at pos 29", highlight: true },
              { name: "i=3: bit", value: "1 → placed at pos 28", highlight: true },
              { name: "result so far", value: "10110000000000000000000000000000" },
            ],
          },
        ],
      },
      {
        description:
          "Bits 4 through 31 of the input are all 0, so the remaining iterations add nothing to result. After all 32 iterations, the bits are fully reversed: input 1101 (positions 0-3) became 1011 (positions 28-31). Result = 10110000...0 = 2952790016. Time: O(32) = O(1) — always exactly 32 iterations regardless of input. Space: O(1) — just two integer variables.",
        codeHighlightLines: [6],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "input", value: "00000000000000000000000000001101" },
              { name: "output", value: "10110000000000000000000000000000", highlight: true },
              { name: "return", value: 2952790016, highlight: true },
              { name: "Time", value: "O(1) — always 32 iterations" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;
