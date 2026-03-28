import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "DFS Backtracking",
  timeComplexity: "O(m × n × 4^L)",
  spaceComplexity: "O(L)",
  code: `def exist(board, word):
    rows, cols = len(board), len(board[0])
    def dfs(r, c, i):
        if i == len(word):
            return True
        if (r < 0 or r >= rows or c < 0 or c >= cols
                or board[r][c] != word[i]):
            return False
        board[r][c] = '#'  # mark visited
        found = (dfs(r+1,c,i+1) or dfs(r-1,c,i+1)
                 or dfs(r,c+1,i+1) or dfs(r,c-1,i+1))
        board[r][c] = word[i]  # backtrack
        return found
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
  steps: [
    {
      description:
        "Search for a word in a grid by moving horizontally/vertically to adjacent cells. Each cell used at most once per path. Use DFS with backtracking. Board: [[A,B,C,E],[S,F,C,S],[A,D,E,E]], word='ABCCED'.",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "row 0", values: ["A", "B", "C", "E"] },
        { type: "array", label: "row 1", values: ["S", "F", "C", "S"] },
        { type: "array", label: "row 2", values: ["A", "D", "E", "E"] },
        { type: "variables", entries: [{ name: "word", value: "ABCCED" }] },
      ],
    },
    {
      description:
        "Start at (0,0)='A' matches word[0]. DFS: (0,0)A → (0,1)B → (0,2)C. Each match marks the cell as '#' to prevent revisiting. 3 of 6 chars matched.",
      codeHighlightLines: [4, 5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "row 0", values: ["#", "#", "#", "E"], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "array", label: "row 1", values: ["S", "F", "C", "S"] },
        { type: "array", label: "row 2", values: ["A", "D", "E", "E"] },
        { type: "variables", entries: [{ name: "path", value: "A→B→C", highlight: true }, { name: "i", value: 3 }] },
      ],
    },
    {
      description:
        "Continue: (0,2)C → (1,2)C matches word[3]='C'. Then (1,2) → (2,2)E matches word[4]='E'. Then (2,2) → (2,1)D matches word[5]='D'. i==6==len(word), found!",
      codeHighlightLines: [4, 10, 11],
      structures: [
        { type: "array", label: "row 0", values: ["#", "#", "#", "E"], highlights: { 0: "found", 1: "found", 2: "found" } },
        { type: "array", label: "row 1", values: ["S", "F", "#", "S"], highlights: { 2: "found" } },
        { type: "array", label: "row 2", values: ["A", "#", "#", "E"], highlights: { 1: "found", 2: "found" } },
        { type: "variables", entries: [{ name: "path", value: "A→B→C→C→E→D" }, { name: "i", value: "6 == len(word)", highlight: true }] },
      ],
    },
    {
      description:
        "Return True — word 'ABCCED' found! Backtracking restores cells after each DFS path. Time: O(m×n×4^L) worst case where L is word length — each cell tries 4 directions up to L deep. Space: O(L) for recursion stack.",
      codeHighlightLines: [12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "row 0", values: ["A", "B", "C", "E"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "row 1", values: ["S", "F", "C", "S"], highlights: { 2: "success" } },
        { type: "array", label: "row 2", values: ["A", "D", "E", "E"], highlights: { 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }] },
      ],
    },
  ],
};

export default solution;
