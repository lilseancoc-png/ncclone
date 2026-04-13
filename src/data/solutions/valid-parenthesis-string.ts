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
        "Check if a string with '(', ')', and '*' (wildcard: can be '(', ')', or empty) has valid parentheses. Instead of brute-forcing 3^n assignments, track the RANGE [lo, hi] of possible open paren counts. lo = min (treat * as ')'), hi = max (treat * as '('). If 0 is in the range at the end, some valid assignment exists. s = \"(*))\".",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")", ")"] },
        { type: "variables", entries: [{ name: "lo (min open)", value: 0 }, { name: "hi (max open)", value: 0 }] },
      ],
    },
    {
      description:
        "char '(': Both lo and hi increase by 1. lo=1, hi=1. Range [1,1] — exactly 1 unmatched '(' no matter what. A real '(' always adds to the open count.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")", ")"], highlights: { 0: "active" } },
        { type: "variables", entries: [{ name: "lo", value: 1 }, { name: "hi", value: 1 }, { name: "range", value: "[1, 1]", highlight: true }] },
      ],
    },
    {
      description:
        "char '*': Three scenarios branch the range. As ')': lo=1-1=0. As empty: stays 1. As '(': hi=1+1=2. lo=0, hi=2. Range [0,2] means 0, 1, or 2 unmatched opens are all possible depending on how * resolves.",
      codeHighlightLines: [4, 11, 12, 13],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")", ")"], highlights: { 0: "checked", 1: "active" } },
        { type: "variables", entries: [{ name: "* as ')'", value: "lo → 0" }, { name: "* as '('", value: "hi → 2" }, { name: "range", value: "[0, 2]", highlight: true }] },
      ],
    },
    {
      description:
        "char ')': lo=0-1=-1 → clamp to 0 (can't have negative opens). hi=2-1=1. Range [0,1]. Second ')': lo=0-1=-1 → clamp to 0. hi=1-1=0. Range [0,0]. hi ≥ 0 so we haven't hit impossible territory — there IS an assignment that works.",
      codeHighlightLines: [4, 8, 9, 10, 14, 15],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")", ")"], highlights: { 2: "active", 3: "active" } },
        { type: "variables", entries: [{ name: "first ')'", value: "range [0,1]" }, { name: "second ')'", value: "range [0,0]", highlight: true }, { name: "hi ≥ 0?", value: "Yes — still possible" }] },
      ],
    },
    {
      description:
        "lo == 0 → True! The valid assignment: treat * as '(' → \"(())\" which is valid. If s were \"(*)))\" instead, after the third ')' hi would go to -1 → False (too many closes for any assignment). The lo clamp prevents false negatives, and the hi < 0 check prevents false positives. Time: O(n). Space: O(1).",
      codeHighlightLines: [16],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")", ")"], highlights: { 0: "success", 1: "success", 2: "success", 3: "success" } },
        { type: "variables", entries: [{ name: "lo == 0?", value: "Yes → valid!", highlight: true }, { name: "return", value: "True", highlight: true }, { name: "valid assignment", value: "* = '(' → \"(())\"" }, { name: "Time", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;
