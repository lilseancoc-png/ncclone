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
        "Check if a string with '(', ')', and '*' (wildcard: can be '(', ')', or empty) has valid parentheses. Instead of trying all 3^n wildcard assignments, use a clever greedy trick: track the RANGE [lo, hi] of possible open parenthesis counts. lo = minimum possible unmatched '(' (treat * as ')'). hi = maximum possible unmatched '(' (treat * as '('). If 0 is within this range at the end, some assignment works. s = \"(*)\".",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")"] },
        { type: "variables", entries: [{ name: "lo (min open parens)", value: 0 }, { name: "hi (max open parens)", value: 0 }, { name: "insight", value: "track range of possibilities" }] },
      ],
    },
    {
      description:
        "char '(': Both lo and hi increase by 1 — a '(' always adds one unmatched open paren. lo=1, hi=1. Range [1,1] means we definitely have exactly 1 unmatched '(' right now, no matter how the wildcards resolve.",
      codeHighlightLines: [4, 5, 6, 7],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")"], highlights: { 0: "active" }, pointers: [{ index: 0, label: "(" }] },
        { type: "variables", entries: [{ name: "lo", value: 1 }, { name: "hi", value: 1 }, { name: "range", value: "[1, 1] — exactly 1 open", highlight: true }] },
      ],
    },
    {
      description:
        "char '*': The wildcard branches into three scenarios. As ')': lo = 1-1 = 0 (closes the open paren). As empty: stays 1. As '(': hi = 1+1 = 2 (adds another open). So lo=0, hi=2. Range [0,2] means the unmatched count could be 0, 1, or 2 depending on how we resolve '*'. Since hi >= 0, it's still potentially valid.",
      codeHighlightLines: [4, 11, 12, 13],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")"], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "*" }] },
        { type: "variables", entries: [{ name: "* as ')'", value: "lo → 0" }, { name: "* as '('", value: "hi → 2" }, { name: "range", value: "[0, 2]", highlight: true }] },
      ],
    },
    {
      description:
        "char ')': lo = 0-1 = -1 → clamp to 0 (can't have negative open count). hi = 2-1 = 1. Range [0,1]. Since lo == 0 at the end, there exists an assignment where all parens are matched! In this case: treat '*' as empty → \"()\" which is valid. If hi had gone below 0 at any point, there'd be too many ')' for any assignment — instant False. Time: O(n) single pass. Space: O(1).",
      codeHighlightLines: [4, 8, 9, 10, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "s", values: ["(", "*", ")"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "lo (clamped)", value: "max(-1, 0) = 0" }, { name: "hi", value: 1 }, { name: "lo == 0?", value: "Yes → valid!", highlight: true }, { name: "return", value: "True", highlight: true }] },
      ],
    },
  ],
};

export default solution;
