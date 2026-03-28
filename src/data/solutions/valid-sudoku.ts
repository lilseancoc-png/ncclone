import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def isValidSudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]

    for r in range(9):
        for c in range(9):
            num = board[r][c]
            if num == ".":
                continue
            box_idx = (r // 3) * 3 + c // 3
            if (num in rows[r] or
                num in cols[c] or
                num in boxes[box_idx]):
                return False
            rows[r].add(num)
            cols[c].add(num)
            boxes[box_idx].add(num)

    return True`,
  steps: [
    {
      description:
        "To validate a Sudoku board, we need to check: no duplicate numbers in any row, column, or 3x3 box. We create 9 sets for rows, 9 for columns, and 9 for boxes. The box index formula is (r // 3) * 3 + c // 3, which maps each cell to one of the 9 boxes (0-8).",
      codeHighlightLines: [1, 2, 3, 4],
      structures: [
        { type: "set", label: "rows (9 sets)", values: [] },
        { type: "set", label: "cols (9 sets)", values: [] },
        { type: "set", label: "boxes (9 sets)", values: [] },
        {
          type: "variables",
          entries: [
            { name: "box layout", value: "0|1|2 / 3|4|5 / 6|7|8" },
          ],
        },
      ],
    },
    {
      description:
        "Cell (0,0) = '5'. box_idx = (0//3)*3 + 0//3 = 0. Check: is '5' in rows[0]? No. In cols[0]? No. In boxes[0]? No. Safe — add '5' to all three sets.",
      codeHighlightLines: [7, 8, 10, 11, 12, 13, 15, 16, 17],
      structures: [
        { type: "array", label: "board row 0", values: ["5", "3", ".", ".", "7", ".", ".", ".", "."], highlights: { 0: "active" }, pointers: [{ index: 0, label: "r=0,c=0" }] },
        { type: "set", label: "rows[0]", values: ["5"], lastAdded: "5" },
        { type: "set", label: "cols[0]", values: ["5"], lastAdded: "5" },
        { type: "set", label: "boxes[0]", values: ["5"], lastAdded: "5" },
        { type: "variables", entries: [{ name: "num", value: "5" }, { name: "box_idx", value: 0 }] },
      ],
    },
    {
      description:
        "Cell (0,1) = '3'. box_idx = (0//3)*3 + 1//3 = 0 (same box — top-left 3x3). Not a duplicate in any set. Add '3' to rows[0], cols[1], boxes[0].",
      codeHighlightLines: [7, 8, 10, 15, 16, 17],
      structures: [
        { type: "array", label: "board row 0", values: ["5", "3", ".", ".", "7", ".", ".", ".", "."], highlights: { 0: "checked", 1: "active" }, pointers: [{ index: 1, label: "r=0,c=1" }] },
        { type: "set", label: "rows[0]", values: ["5", "3"], lastAdded: "3" },
        { type: "set", label: "cols[1]", values: ["3"], lastAdded: "3" },
        { type: "set", label: "boxes[0]", values: ["5", "3"], lastAdded: "3" },
      ],
    },
    {
      description:
        "Cell (0,2) = '.'. It's a dot (empty cell), so we skip it — the continue statement jumps to the next cell.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "array", label: "board row 0", values: ["5", "3", ".", ".", "7", ".", ".", ".", "."], highlights: { 0: "checked", 1: "checked", 2: "active" }, pointers: [{ index: 2, label: "r=0,c=2" }] },
        { type: "variables", entries: [{ name: "num", value: "'.'" }, { name: "action", value: "skip (continue)" }] },
      ],
    },
    {
      description:
        "Cell (0,3) = '.'. Also empty — skip.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "array", label: "board row 0", values: ["5", "3", ".", ".", "7", ".", ".", ".", "."], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active" }, pointers: [{ index: 3, label: "r=0,c=3" }] },
        { type: "variables", entries: [{ name: "num", value: "'.'" }, { name: "action", value: "skip (continue)" }] },
      ],
    },
    {
      description:
        "Cell (0,4) = '7'. box_idx = (0//3)*3 + 4//3 = 0 + 1 = 1 (top-middle box). Not in rows[0], cols[4], or boxes[1]. Add '7' to all three.",
      codeHighlightLines: [7, 8, 10, 15, 16, 17],
      structures: [
        { type: "array", label: "board row 0", values: ["5", "3", ".", ".", "7", ".", ".", ".", "."], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "active" }, pointers: [{ index: 4, label: "r=0,c=4" }] },
        { type: "set", label: "rows[0]", values: ["5", "3", "7"], lastAdded: "7" },
        { type: "set", label: "cols[4]", values: ["7"], lastAdded: "7" },
        { type: "set", label: "boxes[1] (top-middle)", values: ["7"], lastAdded: "7" },
      ],
    },
    {
      description:
        "Moving to row 1. Cell (1,0) = '6'. box_idx = (1//3)*3 + 0//3 = 0. Check: '6' not in rows[1] (empty), not in cols[0] ({'5'}), not in boxes[0] ({'5','3'}). Add '6' to all three.",
      codeHighlightLines: [6, 7, 8, 10, 15, 16, 17],
      structures: [
        { type: "array", label: "board row 1", values: ["6", ".", ".", "1", "9", "5", ".", ".", "."], highlights: { 0: "active" }, pointers: [{ index: 0, label: "r=1,c=0" }] },
        { type: "set", label: "rows[1]", values: ["6"], lastAdded: "6" },
        { type: "set", label: "cols[0]", values: ["5", "6"], lastAdded: "6" },
        { type: "set", label: "boxes[0]", values: ["5", "3", "6"], lastAdded: "6" },
      ],
    },
    {
      description:
        "Cell (1,3) = '1'. box_idx = (1//3)*3 + 3//3 = 0 + 1 = 1. Add to rows[1], cols[3], boxes[1]. Cell (1,4) = '9'. box_idx = 1. Add to rows[1], cols[4], boxes[1]. All unique so far.",
      codeHighlightLines: [10, 15, 16, 17],
      structures: [
        { type: "array", label: "board row 1", values: ["6", ".", ".", "1", "9", "5", ".", ".", "."], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "active" }, pointers: [{ index: 4, label: "r=1,c=4" }] },
        { type: "set", label: "rows[1]", values: ["6", "1", "9"], lastAdded: "9" },
        { type: "set", label: "cols[4]", values: ["7", "9"], lastAdded: "9" },
        { type: "set", label: "boxes[1]", values: ["7", "1", "9"], lastAdded: "9" },
      ],
    },
    {
      description:
        "Cell (1,5) = '5'. box_idx = (1//3)*3 + 5//3 = 0 + 1 = 1. Check boxes[1]: it has {'7','1','9'} — no '5'. Check rows[1]: {'6','1','9'} — no '5'. Check cols[5]: empty — no '5'. Safe! Add '5' everywhere.",
      codeHighlightLines: [10, 11, 12, 13, 15, 16, 17],
      structures: [
        { type: "array", label: "board row 1", values: ["6", ".", ".", "1", "9", "5", ".", ".", "."], highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "active" }, pointers: [{ index: 5, label: "r=1,c=5" }] },
        { type: "set", label: "rows[1]", values: ["6", "1", "9", "5"], lastAdded: "5" },
        { type: "set", label: "cols[5]", values: ["5"], lastAdded: "5" },
        { type: "set", label: "boxes[1]", values: ["7", "1", "9", "5"], lastAdded: "5" },
      ],
    },
    {
      description:
        "We continue this process for all 81 cells. If at any point a number is already in its row set, column set, OR box set, we immediately return False. After scanning every cell with no duplicates found, we return True. Time: O(81) = O(1). Space: O(81) = O(1) since the board is always 9x9.",
      codeHighlightLines: [14, 19],
      structures: [
        { type: "set", label: "rows[0] (final)", values: ["5", "3", "7"], highlightValues: ["5", "3", "7"] },
        { type: "set", label: "cols[0] (final)", values: ["5", "6", "8", "4", "7"], highlightValues: ["5", "6", "8", "4", "7"] },
        { type: "set", label: "boxes[0] (final)", values: ["5", "3", "6", "9", "8"], highlightValues: ["5", "3", "6", "9", "8"] },
        { type: "variables", entries: [{ name: "return", value: "True", highlight: true }] },
      ],
    },
  ],
};

export default solution;
