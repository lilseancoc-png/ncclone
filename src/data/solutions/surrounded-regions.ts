import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS from Border",
  timeComplexity: "O(m × n)",
  spaceComplexity: "O(m × n)",
  code: `def solve(board):
    rows, cols = len(board), len(board[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if board[r][c] != "O":
            return
        board[r][c] = "S"  # mark safe
        dfs(r+1, c)
        dfs(r-1, c)
        dfs(r, c+1)
        dfs(r, c-1)

    # Mark border-connected O's as safe
    for r in range(rows):
        for c in range(cols):
            if (r in (0, rows-1) or c in (0, cols-1)):
                if board[r][c] == "O":
                    dfs(r, c)
    # Flip: O→X (captured), S→O (restored)
    for r in range(rows):
        for c in range(cols):
            if board[r][c] == "O":
                board[r][c] = "X"
            elif board[r][c] == "S":
                board[r][c] = "O"`,
  steps: [
    {
      description:
        "Capture all 'O' regions that are completely surrounded by 'X'. Key insight: instead of finding surrounded regions (hard), find UNsurrounded ones (connected to border) and protect them. Everything else is captured. Three-phase approach: (1) mark border-connected O's as safe, (2) flip remaining O's to X, (3) restore safe cells to O.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"] },
        { type: "array", label: "Row 1", values: ["X", "O", "O", "X"] },
        { type: "array", label: "Row 2", values: ["X", "X", "O", "X"] },
        { type: "array", label: "Row 3", values: ["X", "O", "X", "X"] },
        { type: "variables", entries: [{ name: "strategy", value: "protect border-connected, capture rest" }] },
      ],
    },
    {
      description:
        "Phase 1: Scan all border cells for 'O'. Row 0: all X. Column 0: all X. Row 3: (3,1)='O' found! Start DFS from (3,1). Mark (3,1) as 'S' (safe). Check neighbors: (2,1)='X', (3,0)='X', (3,2)='X'. No connected O's. This border O is an isolated safe cell.",
      codeHighlightLines: [14, 15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"] },
        { type: "array", label: "Row 1", values: ["X", "O", "O", "X"] },
        { type: "array", label: "Row 2", values: ["X", "X", "O", "X"] },
        { type: "array", label: "Row 3", values: ["X", "S", "X", "X"], highlights: { 1: "active" } },
        { type: "variables", entries: [{ name: "border O at (3,1)", value: "marked S (safe)", highlight: true }, { name: "neighbors", value: "all X — no propagation" }] },
      ],
    },
    {
      description:
        "Continue scanning borders. Column 3: all X. No more border O's found. The interior O's at (1,1), (1,2), (2,2) are NOT connected to any border O — they are completely surrounded. Phase 1 complete: only (3,1) is safe.",
      codeHighlightLines: [14, 15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"] },
        { type: "array", label: "Row 1", values: ["X", "O", "O", "X"], highlights: { 1: "found", 2: "found" } },
        { type: "array", label: "Row 2", values: ["X", "X", "O", "X"], highlights: { 2: "found" } },
        { type: "array", label: "Row 3", values: ["X", "S", "X", "X"], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "safe cells", value: "only (3,1)" }, { name: "surrounded O's", value: "(1,1), (1,2), (2,2)" }] },
      ],
    },
    {
      description:
        "Phase 2: Scan entire board. Any remaining 'O' → flip to 'X' (captured!). (1,1)='O'→'X'. (1,2)='O'→'X'. (2,2)='O'→'X'. These three cells had no escape path to the border. Phase 3: Any 'S' → restore to 'O'. (3,1)='S'→'O'. The safe cell is preserved.",
      codeHighlightLines: [21, 22, 23, 24, 25, 26],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"] },
        { type: "array", label: "Row 1", values: ["X", "X", "X", "X"], highlights: { 1: "checked", 2: "checked" } },
        { type: "array", label: "Row 2", values: ["X", "X", "X", "X"], highlights: { 2: "checked" } },
        { type: "array", label: "Row 3", values: ["X", "O", "X", "X"], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "captured", value: "3 O's → X", highlight: true }, { name: "restored", value: "1 S → O" }] },
      ],
    },
    {
      description:
        "Board modified in-place. 3 interior O's captured, 1 border-connected O preserved. The reason border DFS works: any O reachable from the border (via a chain of adjacent O's) can never be fully surrounded — the border itself is an escape. Time: O(m×n) — each cell visited at most twice (once by border DFS, once by final scan). Space: O(m×n) for DFS recursion stack.",
      codeHighlightLines: [26],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"] },
        { type: "array", label: "Row 1", values: ["X", "X", "X", "X"], highlights: { 1: "success", 2: "success" } },
        { type: "array", label: "Row 2", values: ["X", "X", "X", "X"], highlights: { 2: "success" } },
        { type: "array", label: "Row 3", values: ["X", "O", "X", "X"], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "result", value: "board modified in-place", highlight: true }, { name: "Time", value: "O(m × n)" }, { name: "Space", value: "O(m × n)" }] },
      ],
    },
  ],
};

export default solution;
