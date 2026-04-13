import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Hash Map Point Counting",
    timeComplexity: "O(n) per count query",
    spaceComplexity: "O(n)",
    code: `class DetectSquares:
    def __init__(self):
        self.points = defaultdict(int)

    def add(self, point):
        self.points[tuple(point)] += 1

    def count(self, point):
        px, py = point
        result = 0
        for (x, y), cnt in self.points.items():
            if abs(px - x) != abs(py - y) or px == x or py == y:
                continue
            result += cnt * self.points.get((px, y), 0) * self.points.get((x, py), 0)
        return result`,
    steps: [
      {
        description:
          "Design a data structure to add points and count axis-aligned squares. Key insight: an axis-aligned square is defined by two diagonal corners. Given query Q and stored point D, if |Q.x - D.x| == |Q.y - D.y| (and they don't share x or y), they're diagonal corners. The other two corners are deterministic: (Q.x, D.y) and (D.x, Q.y). Store points with counts for duplicates. add points: (1,1), (1,3), (3,1), (3,3), (3,3).",
        codeHighlightLines: [1, 2, 3, 5, 6],
        structures: [
          {
            type: "hashmap",
            label: "points (coordinate → count)",
            entries: [
              ["(1,1)", 1],
              ["(1,3)", 1],
              ["(3,1)", 1],
              ["(3,3)", 2],
            ],
          },
          { type: "variables", entries: [{ name: "note", value: "(3,3) added twice → count=2" }] },
        ],
      },
      {
        description:
          "count([1,1]): Scan all stored points for diagonal partners. Point (1,3): |1-1|=0, px==x → same column, skip (a line, not a square). Point (3,1): |1-3|=2 but py==y → same row, skip. These fail the 'no shared x or y' filter — two points on the same row or column can't be diagonals of a square.",
        codeHighlightLines: [8, 9, 10, 11, 12],
        structures: [
          {
            type: "hashmap",
            label: "checking diagonals for Q=(1,1)",
            entries: [
              ["(1,3)", "same x → skip ✗"],
              ["(3,1)", "same y → skip ✗"],
            ],
          },
          { type: "variables", entries: [{ name: "query Q", value: "(1,1)" }, { name: "filter", value: "|dx|==|dy|, no shared x or y" }] },
        ],
      },
      {
        description:
          "Point (3,3): |1-3|=2 == |1-3|=2 ✓, and px≠x, py≠y ✓. Valid diagonal! The other two corners must be (Q.x, D.y) = (1,3) and (D.x, Q.y) = (3,1). Look up both: points[(1,3)]=1 ✓, points[(3,1)]=1 ✓. Squares from this pair = cnt(D) × cnt(corner1) × cnt(corner2) = 2 × 1 × 1 = 2. Because (3,3) has count 2, there are TWO distinct squares sharing the same shape!",
        codeHighlightLines: [13, 14],
        structures: [
          {
            type: "hashmap",
            label: "square corners",
            entries: [
              ["(1,1)", "query"],
              ["(3,3)", "diagonal (count=2)"],
              ["(1,3)", "corner (count=1)"],
              ["(3,1)", "corner (count=1)"],
            ],
            highlightKeys: ["(3,3)", "(1,3)", "(3,1)"],
          },
          { type: "variables", entries: [{ name: "squares", value: "2 × 1 × 1 = 2", highlight: true }] },
        ],
      },
      {
        description:
          "No other stored points form valid diagonals with (1,1). Total = 2. The duplicate (3,3) point means two distinct squares can be formed with the same corners — the multiplication of counts handles this combinatorics automatically. If we later add another (1,3), count([1,1]) would return 2×2×1 = 4.",
        codeHighlightLines: [15],
        structures: [
          { type: "variables", entries: [{ name: "return", value: 2, highlight: true }, { name: "why 2?", value: "two copies of (3,3) = two squares" }] },
        ],
      },
      {
        description:
          "Time per count: O(n) — scan all points, O(1) lookups for corners. add() is O(1). Space: O(n). The algorithm naturally handles multiple squares of different sizes from the same query point — each valid diagonal partner contributes independently. For a query with many nearby points, the same query could find multiple diagonal partners forming squares of different sizes.",
        codeHighlightLines: [15],
        structures: [
          { type: "variables", entries: [{ name: "add()", value: "O(1)" }, { name: "count()", value: "O(n) per query" }, { name: "Space", value: "O(n)" }, { name: "key insight", value: "duplicates handled by multiplication", highlight: true }] },
        ],
      },
    ],
  },
];

export default solutions;
