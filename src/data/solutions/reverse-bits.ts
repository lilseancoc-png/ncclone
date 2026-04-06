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
          "Reverse all 32 bits of a given unsigned integer. We extract each bit from position i and place it at position (31-i) in the result. Example: n = 13 = ...00001101 in binary.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "n (binary)", value: "00000000000000000000000000001101" },
              { name: "result", value: 0 },
            ],
          },
        ],
      },
      {
        description:
          "i=0: Extract bit 0 of n → (13 >> 0) & 1 = 1. Place it at position 31: result |= 1 << 31. The LSB becomes the MSB.",
        codeHighlightLines: [4, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "i", value: 0 },
              { name: "bit", value: 1, highlight: true },
              { name: "target position", value: 31 },
              { name: "result (binary)", value: "10000000000000000000000000000000" },
            ],
          },
        ],
      },
      {
        description:
          "i=2: Extract bit 2 of n → (13 >> 2) & 1 = 1. Place at position 29: result |= 1 << 29. i=3: Extract bit 3 → (13 >> 3) & 1 = 1. Place at position 28.",
        codeHighlightLines: [4, 5],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "n bits extracted", value: "1, 0, 1, 1" },
              { name: "result (binary)", value: "10110000000000000000000000000000", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "After all 32 iterations, the bits are fully reversed. result = 10110000...0 in binary = 2952790016 in decimal. Each bit is moved exactly once, so this runs in constant O(32) time.",
        codeHighlightLines: [6],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "input", value: "00000000000000000000000000001101" },
              { name: "output", value: "10110000000000000000000000000000", highlight: true },
              { name: "return", value: 2952790016 },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;
