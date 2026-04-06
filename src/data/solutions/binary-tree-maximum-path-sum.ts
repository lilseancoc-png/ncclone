import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "DFS — Post-order Traversal",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) where h = tree height",
    code: `def maxPathSum(root):
    result = [float('-inf')]

    def dfs(node):
        if not node:
            return 0
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        result[0] = max(result[0], node.val + left + right)
        return node.val + max(left, right)

    dfs(root)
    return result[0]`,
    steps: [
      {
        description:
          "Find the maximum path sum in a binary tree. A path can start and end at any node. At each node, we compute two things: (1) the max path through this node (left + node + right) to update the global result, and (2) the max gain we can offer to our parent (node + best child).",
        codeHighlightLines: [1, 2, 4],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "tree", value: "[-10, 9, 20, null, null, 15, 7]" },
              { name: "result", value: "-inf" },
            ],
          },
        ],
      },
      {
        description:
          "DFS post-order. Leaf 9: left=0, right=0. Path through 9 = 9. Gain to parent = 9. Leaf 15: path = 15, gain = 15. Leaf 7: path = 7, gain = 7.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "node 9", value: "gain=9" },
              { name: "node 15", value: "gain=15", highlight: true },
              { name: "node 7", value: "gain=7" },
              { name: "result", value: 15 },
            ],
          },
        ],
      },
      {
        description:
          "Node 20: left=max(15,0)=15, right=max(7,0)=7. Path through 20 = 15+20+7 = 42. Update result=42. Gain to parent = 20+max(15,7) = 35.",
        codeHighlightLines: [7, 8, 9, 10],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "node 20", value: "left=15, right=7" },
              { name: "path through 20", value: "15+20+7 = 42", highlight: true },
              { name: "gain to parent", value: 35 },
              { name: "result", value: 42, highlight: true },
            ],
          },
        ],
      },
      {
        description:
          "Node -10 (root): left=max(9,0)=9, right=max(35,0)=35. Path through -10 = 9+(-10)+35 = 34 < 42. Result stays 42. The max path is 15→20→7, which doesn't include the root! Return 42.",
        codeHighlightLines: [9, 12, 13],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "path through root", value: "9+(-10)+35 = 34" },
              { name: "best path", value: "15→20→7 = 42", highlight: true },
              { name: "return", value: 42 },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;
