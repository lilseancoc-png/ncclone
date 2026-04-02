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
        "Capture all O regions not connected to the border. Key insight: instead of finding surrounded regions, find UN-surrounded ones (connected to border) and protect them. Everything else gets flipped to X.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"], highlights: {} },
        { type: "array", label: "Row 1", values: ["X", "O", "O", "X"], highlights: {} },
        { type: "array", label: "Row 2", values: ["X", "X", "O", "X"], highlights: {} },
        { type: "array", label: "Row 3", values: ["X", "O", "X", "X"], highlights: {} },
      ],
    },
    {
      description:
        "DFS from every border cell that is 'O'. Mark border-connected O's as 'S' (safe). grid[3][1] is a border O — mark it safe. The interior O's at (1,1), (1,2), (2,2) are NOT connected to the border.",
      codeHighlightLines: [14, 15, 16, 17, 18, 19],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"], highlights: {} },
        { type: "array", label: "Row 1", values: ["X", "O", "O", "X"], highlights: {} },
        { type: "array", label: "Row 2", values: ["X", "X", "O", "X"], highlights: {} },
        { type: "array", label: "Row 3", values: ["X", "S", "X", "X"], highlights: { 1: "active" } },
        { type: "variables", entries: [{ name: "border O found", value: "(3,1) → safe", highlight: true }] },
      ],
    },
    {
      description:
        "Now flip remaining O's to X (they are fully surrounded). The O's at (1,1), (1,2), (2,2) have no path to the border, so they become X. Restore S back to O.",
      codeHighlightLines: [21, 22, 23, 24, 25, 26],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"], highlights: {} },
        { type: "array", label: "Row 1", values: ["X", "X", "X", "X"], highlights: { 1: "found", 2: "found" } },
        { type: "array", label: "Row 2", values: ["X", "X", "X", "X"], highlights: { 2: "found" } },
        { type: "array", label: "Row 3", values: ["X", "O", "X", "X"], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "captured", value: 3 }, { name: "restored", value: 1 }] },
      ],
    },
    {
      description:
        "Final board: 3 interior O's captured (flipped to X), 1 border-connected O preserved. Time: O(m*n), each cell visited at most twice. Space: O(m*n) for DFS recursion stack.",
      codeHighlightLines: [26],
      structures: [
        { type: "array", label: "Row 0", values: ["X", "X", "X", "X"], highlights: {} },
        { type: "array", label: "Row 1", values: ["X", "X", "X", "X"], highlights: { 1: "success", 2: "success" } },
        { type: "array", label: "Row 2", values: ["X", "X", "X", "X"], highlights: { 2: "success" } },
        { type: "array", label: "Row 3", values: ["X", "O", "X", "X"], highlights: { 1: "success" } },
        { type: "variables", entries: [{ name: "result", value: "board modified in-place", highlight: true }] },
      ],
    },
  ],
};

export default solution;
