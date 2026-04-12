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
        "Search for word 'ABCCED' in a grid by moving to adjacent cells (up/down/left/right). Each cell used at most once per path. Use DFS with backtracking — mark cells '#' when visiting, restore on backtrack. Board: [[A,B,C,E],[S,F,C,S],[A,D,E,E]].",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "row 0", values: ["A", "B", "C", "E"] },
        { type: "array", label: "row 1", values: ["S", "F", "C", "S"] },
        { type: "array", label: "row 2", values: ["A", "D", "E", "E"] },
        { type: "variables", entries: [{ name: "word", value: "ABCCED" }, { name: "strategy", value: "DFS + backtrack from each cell" }] },
      ],
    },
    {
      description:
        "Scan grid for word[0]='A'. Found at (0,0). Start DFS: board[0][0]='A' matches word[0]. Mark (0,0)='#' to prevent revisiting. Move to word[1]='B'.",
      codeHighlightLines: [4, 5, 6, 7, 8, 9],
      structures: [
        { type: "array", label: "row 0", values: ["#", "B", "C", "E"], highlights: { 0: "active" } },
        { type: "array", label: "row 1", values: ["S", "F", "C", "S"] },
        { type: "array", label: "row 2", values: ["A", "D", "E", "E"] },
        { type: "variables", entries: [{ name: "matched", value: "A", highlight: true }, { name: "i", value: 1 }, { name: "next needed", value: "'B'" }] },
      ],
    },
    {
      description:
        "From (0,0), try neighbors. Right: (0,1)='B' matches word[1]. Mark '#'. From (0,1), right: (0,2)='C' matches word[2]. Mark '#'. Three characters matched: A→B→C. Each marked '#' so we can't revisit them in this path.",
      codeHighlightLines: [8, 9, 10, 11],
      structures: [
        { type: "array", label: "row 0", values: ["#", "#", "#", "E"], highlights: { 0: "active", 1: "active", 2: "active" } },
        { type: "array", label: "row 1", values: ["S", "F", "C", "S"] },
        { type: "array", label: "row 2", values: ["A", "D", "E", "E"] },
        { type: "variables", entries: [{ name: "path", value: "(0,0)A → (0,1)B → (0,2)C", highlight: true }, { name: "i", value: 3 }, { name: "next needed", value: "'C'" }] },
      ],
    },
    {
      description:
        "From (0,2), need word[3]='C'. Up/left are '#' or OOB. Right: (0,3)='E' ≠ 'C'. Down: (1,2)='C' matches! Mark '#'. Now need word[4]='E'. From (1,2), down: (2,2)='E' matches! Mark '#'. Five chars matched.",
      codeHighlightLines: [5, 6, 7, 8, 9, 10, 11],
      structures: [
        { type: "array", label: "row 0", values: ["#", "#", "#", "E"], highlights: { 0: "found", 1: "found", 2: "found" } },
        { type: "array", label: "row 1", values: ["S", "F", "#", "S"], highlights: { 2: "active" } },
        { type: "array", label: "row 2", values: ["A", "D", "#", "E"], highlights: { 2: "active" } },
        { type: "variables", entries: [{ name: "path", value: "A→B→C→C→E" }, { name: "i", value: 5 }, { name: "next needed", value: "'D'" }] },
      ],
    },
    {
      description:
        "From (2,2), need word[5]='D'. Left: (2,1)='D' matches! Mark '#'. i becomes 6 == len(word). Base case hit — return True! The full path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2)→(2,1). All 6 characters found in sequence.",
      codeHighlightLines: [4, 10, 11],
      structures: [
        { type: "array", label: "row 0", values: ["#", "#", "#", "E"], highlights: { 0: "found", 1: "found", 2: "found" } },
        { type: "array", label: "row 1", values: ["S", "F", "#", "S"], highlights: { 2: "found" } },
        { type: "array", label: "row 2", values: ["A", "#", "#", "E"], highlights: { 1: "found", 2: "found" } },
        { type: "variables", entries: [{ name: "i", value: "6 == len(word)", highlight: true }, { name: "path complete", value: "A→B→C→C→E→D" }] },
      ],
    },
    {
      description:
        "Return True — word 'ABCCED' found! Backtracking restores all '#' cells to original letters (so future searches work on a clean board). Time: O(m×n×4^L) — try each cell as start, DFS branches 4 ways up to L=word length deep. Space: O(L) recursion stack. The '#' marking prevents cycles without extra visited set.",
      codeHighlightLines: [12, 13, 14, 15, 16, 17],
      structures: [
        { type: "array", label: "row 0", values: ["A", "B", "C", "E"], highlights: { 0: "success", 1: "success", 2: "success" } },
        { type: "array", label: "row 1", values: ["S", "F", "C", "S"], highlights: { 2: "success" } },
        { type: "array", label: "row 2", values: ["A", "D", "E", "E"], highlights: { 1: "success", 2: "success" } },
        { type: "variables", entries: [{ name: "return", value: true, highlight: true }, { name: "Time", value: "O(m × n × 4^L)" }, { name: "Space", value: "O(L)" }] },
      ],
    },
  ],
};

export default solution;
