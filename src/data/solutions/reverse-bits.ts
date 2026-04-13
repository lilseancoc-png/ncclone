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
          "Reverse all 32 bits of an unsigned integer. Extract each bit from position i and place it at position (31-i). Position 0 (LSB) goes to 31 (MSB), etc. Think of flipping a binary string. n = 13 = ...00001101.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "variables", entries: [{ name: "n (decimal)", value: 13 }, { name: "n (binary)", value: "...00001101" }, { name: "result", value: "00000000...00000000" }] },
        ],
      },
      {
        description:
          "i=0: (13 >> 0) & 1 = 1. The rightmost bit is 1. Place at position 31: result |= 1 << 31. The LSB becomes the MSB — this single bit flip changes the value dramatically (adds 2³¹ ≈ 2.1 billion).",
        codeHighlightLines: [4, 5],
        structures: [
          { type: "variables", entries: [{ name: "i=0: bit=1", value: "→ placed at pos 31", highlight: true }, { name: "result", value: "1000...0000" }] },
        ],
      },
      {
        description:
          "i=1: (13 >> 1) & 1 = 0. Bit is 0, no change. i=2: (13 >> 2) & 1 = 1. Place at position 29: result |= 1 << 29. Now result has 1s at positions 31 and 29.",
        codeHighlightLines: [4, 5],
        structures: [
          { type: "variables", entries: [{ name: "i=1: bit=0", value: "→ pos 30 (no change)" }, { name: "i=2: bit=1", value: "→ placed at pos 29", highlight: true }, { name: "result", value: "1010...0000" }] },
        ],
      },
      {
        description:
          "i=3: (13 >> 3) & 1 = 1. Place at position 28: result |= 1 << 28. Result now: 1011...0. The original 1s at positions {0, 2, 3} are mirrored to positions {31, 29, 28}. Bits 4-31 of input are all 0, so remaining 28 iterations add nothing.",
        codeHighlightLines: [4, 5],
        structures: [
          { type: "variables", entries: [{ name: "i=3: bit=1", value: "→ placed at pos 28", highlight: true }, { name: "result", value: "10110000...00000000" }, { name: "remaining bits 4-31", value: "all 0 → no changes" }] },
        ],
      },
      {
        description:
          "After 32 iterations: input 1101 → output 1011 (reversed). Result = 10110000...0 = 2952790016. Time: O(32) = O(1), always exactly 32 iterations. Space: O(1). Note: a more efficient approach uses divide-and-conquer (swap halves, then quarters, etc.) but the bit-by-bit version is clearer.",
        codeHighlightLines: [6],
        structures: [
          { type: "variables", entries: [{ name: "input", value: "...00001101" }, { name: "output", value: "10110000...0", highlight: true }, { name: "return", value: 2952790016, highlight: true }, { name: "Time", value: "O(1) — always 32 iterations" }] },
        ],
      },
    ],
  },
];

export default solutions;
