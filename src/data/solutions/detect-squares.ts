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
          "DetectSquares stores points in a hash map with counts (for duplicates). When counting squares for a query point, we look for diagonal points that could form a square, then check if the other two corners exist.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "hashmap",
            label: "points",
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
          "count([1,1]): For each stored point, check if it could be the diagonal corner of a square. Point (3,3): |1-3| == |1-3| ✓ and neither x nor y are equal ✓. This could form a square!",
        codeHighlightLines: [9, 10, 11, 12],
        structures: [
          {
            type: "hashmap",
            label: "points",
            entries: [
              ["(1,1)", 1],
              ["(1,3)", 1],
              ["(3,1)", 1],
              ["(3,3)", 1],
            ],
            highlightKeys: ["(3,3)"],
          },
          {
            type: "variables",
            entries: [
              { name: "query", value: "(1,1)" },
              { name: "diagonal", value: "(3,3)", highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Check the other two corners: (px, y) = (1, 3) exists with count 1. (x, py) = (3, 1) exists with count 1. Result += 1 * 1 * 1 = 1. We found one axis-aligned square!",
        codeHighlightLines: [14],
        structures: [
          {
            type: "hashmap",
            label: "corners checked",
            entries: [
              ["(1,3)", 1],
              ["(3,1)", 1],
            ],
            highlightKeys: ["(1,3)", "(3,1)"],
          },
          {
            type: "variables",
            entries: [{ name: "result", value: 1, highlight: true }],
          },
        ],
      },
      {
        description:
          "Return 1. The key insight: for any query point Q and diagonal point D, the other two corners are always (Q.x, D.y) and (D.x, Q.y). We multiply counts to handle duplicate points. Time per query: O(n) scanning all points.",
        codeHighlightLines: [15],
        structures: [
          {
            type: "variables",
            entries: [{ name: "return", value: 1, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;
