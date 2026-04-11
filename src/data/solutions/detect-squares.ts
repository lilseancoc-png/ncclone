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
          "Design a data structure to add points and count axis-aligned squares. The key geometric insight: an axis-aligned square is uniquely determined by two diagonal corners. Given query point Q and any stored point D, if |Q.x - D.x| == |Q.y - D.y| (and they don't share an x or y coordinate), they could be diagonal corners of a square. The other two corners are deterministic: (Q.x, D.y) and (D.x, Q.y). Store points in a hash map with counts to handle duplicates. Points added: (1,1), (1,3), (3,1), (3,3).",
        codeHighlightLines: [1, 2, 3, 5, 6],
        structures: [
          {
            type: "hashmap",
            label: "points (coordinate → count)",
            entries: [
              ["(1,1)", 1],
              ["(1,3)", 1],
              ["(3,1)", 1],
              ["(3,3)", 1],
            ],
          },
        ],
      },
      {
        description:
          "count([1,1]): Iterate through all stored points to find potential diagonal partners. Point (3,3): Check |1-3| == |1-3|? Yes, both differences are 2. And px ≠ x (1≠3) and py ≠ y (1≠3). This pair could be diagonally opposite corners of a 2×2 square! What about (1,3)? |1-1|=0, but px==x, so they share the same x — skip (they'd form a line, not a square). Similarly (3,1) has py==y — skip.",
        codeHighlightLines: [8, 9, 10, 11, 12],
        structures: [
          {
            type: "hashmap",
            label: "points",
            entries: [
              ["(1,1)", "query"],
              ["(1,3)", "same x, skip"],
              ["(3,1)", "same y, skip"],
              ["(3,3)", "diagonal ✓"],
            ],
            highlightKeys: ["(3,3)"],
          },
          {
            type: "variables",
            entries: [
              { name: "query Q", value: "(1,1)" },
              { name: "diagonal D", value: "(3,3)", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "With Q=(1,1) and D=(3,3), the other two corners must be: (Q.x, D.y) = (1,3) and (D.x, Q.y) = (3,1). Look up both: points[(1,3)] = 1, points[(3,1)] = 1. Both exist! Number of squares from this diagonal pair = count(D) × count(corner1) × count(corner2) = 1 × 1 × 1 = 1. If there were duplicate points (e.g., two copies of (3,3)), we'd count 2 squares — the multiplication handles combinatorics automatically.",
        codeHighlightLines: [13, 14],
        structures: [
          {
            type: "hashmap",
            label: "four corners of the square",
            entries: [
              ["(1,1)", "query"],
              ["(3,3)", "diagonal (count=1)"],
              ["(1,3)", "corner (count=1)"],
              ["(3,1)", "corner (count=1)"],
            ],
            highlightKeys: ["(1,3)", "(3,1)"],
          },
          {
            type: "variables",
            entries: [{ name: "squares", value: "1 × 1 × 1 = 1", highlight: true }],
          },
        ],
      },
      {
        description:
          "Return 1. No other stored points form valid diagonals with (1,1), so total = 1 square. Time per count query: O(n) — scan all points, with O(1) lookups for the other two corners. Add is O(1). Space: O(n) for the point counts. The algorithm works for any number of squares of different sizes, and handles duplicates via multiplication of counts.",
        codeHighlightLines: [15],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: 1, highlight: true }, { name: "add()", value: "O(1)" }, { name: "count()", value: "O(n)" }],
          },
        ],
      },
    ],
  },
];

export default solutions;
