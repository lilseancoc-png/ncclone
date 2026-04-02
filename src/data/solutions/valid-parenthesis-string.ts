import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Greedy — Min/Max Open Count",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def check_valid_string(s):
    lo = 0  # min possible open count
    hi = 0  # max possible open count
    for c in s:
        if c == '(':
            lo += 1
            hi += 1
        elif c == ')':
            lo -= 1
            hi -= 1
        else:  # '*'
            lo -= 1  # treat as ')'
            hi += 1  # treat as '('
        if hi < 0: return False
        lo = max(lo, 0)
    return lo == 0`,
  steps: [
    {
      description:
        "Check if \"(*)\" is valid. '*' can be '(', ')', or empty. Track the range [lo, hi] of possible open parentheses counts. If the range ever allows 0 at the end, it is valid.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")"] },
        { type: "variables", entries: [{ name: "lo (min open)", value: 0 }, { name: "hi (max open)", value: 0 }] },
      ],
    },
    {
      description:
        "char '(': both lo and hi increase by 1. lo=1, hi=1. We definitely have one unmatched open paren.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")"], highlights: { 0: "active" }, pointers: [{ index: 0, label: "i" }] },
        { type: "variables", entries: [{ name: "lo", value: 1 }, { name: "hi", value: 1 }, { name: "range", value: "[1, 1]", highlight: true }] },
      ],
    },
    {
      description:
        "char '*': could be ')' (lo-1=0), empty (stays 1), or '(' (hi+1=2). lo=0, hi=2. The open count is somewhere in [0, 2]. hi >= 0 so still potentially valid.",
      codeHighlightLines: [4, 11, 12, 13],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "i" }] },
        { type: "variables", entries: [{ name: "lo", value: 0 }, { name: "hi", value: 2 }, { name: "range", value: "[0, 2]", highlight: true }] },
      ],
    },
    {
      description:
        "char ')': lo=0-1=-1 (clamp to 0), hi=2-1=1. Range [0, 1]. Since lo=0 is in the range, there exists an assignment of '*' that makes this valid. lo==0 at end, return True!",
      codeHighlightLines: [4, 8, 9, 10, 15, 16, 17],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "lo", value: 0 }, { name: "hi", value: 1 }, { name: "lo == 0?", value: "Yes!", highlight: true }, { name: "return", value: "True", highlight: true }] },
      ],
    },
  ],
};

export default solution;
