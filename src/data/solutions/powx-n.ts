import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Binary Exponentiation",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",

  steps: [
    {
      description: "x=2.0, n=10. Square x repeatedly, multiply into result when bit is set.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "variables", label: "Initial", entries: [{ name: "x", value: "2.0" }, { name: "n", value: "10 (1010 in binary)" }, { name: "result", value: 1 }] },
      ],
    },
    {
      description: "n=10(1010): bit 0=0 (skip), x=4. bit 1=1, result*=4=4, x=16. bit 2=0 (skip), x=256. bit 3=1, result*=256=1024.",
      codeHighlightLines: [7, 8, 9, 10],
      structures: [
        { type: "variables", label: "Iterations", entries: [{ name: "n=10,bit=0", value: "skip, x=4" }, { name: "n=5,bit=1", value: "result=4, x=16" }, { name: "n=2,bit=0", value: "skip, x=256" }, { name: "n=1,bit=1", value: "result=1024" }] },
      ],
    },
    {
      description: "n=0, loop ends. 2^10 = 1024.",
      codeHighlightLines: [11],
      structures: [
        { type: "variables", label: "Result", entries: [{ name: "2.0^10", value: "1024.0" }] },
      ],
    },
  ],
};

export default solution;
