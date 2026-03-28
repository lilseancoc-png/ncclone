import { Category } from "../types";

export const trees: Category = {
  name: "Trees",
  slug: "trees",
  problems: [
    {
      id: 226,
      title: "Invert Binary Tree",
      slug: "invert-binary-tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/invert-binary-tree/",
      description:
        "Given the root of a binary tree, invert the tree by swapping the left and right children of every node, and return the root of the inverted tree.",
      functionName: "invertTree",
      starterCode: {
        javascript: "function invertTree(root) {\n  \n}",
        python: "def invert_tree(root):\n    pass",
        java: "class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [4,2,7,1,3,6,9]",
          inputArgs: [[4, 2, 7, 1, 3, 6, 9]],
          expected: [4, 7, 2, 9, 6, 3, 1],
        },
        {
          id: 2,
          input: "root = [2,1,3]",
          inputArgs: [[2, 1, 3]],
          expected: [2, 3, 1],
        },
      ],
      approach:
        "Recursively swap the left and right children of each node. The base case is a null node, which returns null. Each node is visited exactly once, performing a constant-time swap operation.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 104,
      title: "Maximum Depth of Binary Tree",
      slug: "maximum-depth-of-binary-tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/",
      description:
        "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
      functionName: "maxDepth",
      starterCode: {
        javascript: "function maxDepth(root) {\n  \n}",
        python: "def max_depth(root):\n    pass",
        java: "class Solution {\n    public int maxDepth(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [3,9,20,null,null,15,7]",
          inputArgs: [[3, 9, 20, null, null, 15, 7]],
          expected: 3,
        },
        {
          id: 2,
          input: "root = [1,null,2]",
          inputArgs: [[1, null, 2]],
          expected: 2,
        },
      ],
      approach:
        "Recursively compute the depth of left and right subtrees, returning 1 + the maximum of the two. The base case is a null node with depth 0. This naturally explores all paths and finds the longest one.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 543,
      title: "Diameter of Binary Tree",
      slug: "diameter-of-binary-tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/diameter-of-binary-tree/",
      description:
        "Given the root of a binary tree, return the length of the diameter. The diameter is the length of the longest path between any two nodes, measured by the number of edges between them.",
      functionName: "diameterOfBinaryTree",
      starterCode: {
        javascript: "function diameterOfBinaryTree(root) {\n  \n}",
        python: "def diameter_of_binary_tree(root):\n    pass",
        java: "class Solution {\n    public int diameterOfBinaryTree(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [1,2,3,4,5]",
          inputArgs: [[1, 2, 3, 4, 5]],
          expected: 3,
        },
        {
          id: 2,
          input: "root = [1,2]",
          inputArgs: [[1, 2]],
          expected: 1,
        },
      ],
      approach:
        "Perform DFS, computing the height of each subtree. At each node, the diameter passing through it equals left height + right height. Track the global maximum diameter across all nodes during the traversal.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 110,
      title: "Balanced Binary Tree",
      slug: "balanced-binary-tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/balanced-binary-tree/",
      description:
        "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is one in which the depth of the two subtrees of every node never differs by more than one.",
      functionName: "isBalanced",
      starterCode: {
        javascript: "function isBalanced(root) {\n  \n}",
        python: "def is_balanced(root):\n    pass",
        java: "class Solution {\n    public boolean isBalanced(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isBalanced(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [3,9,20,null,null,15,7]",
          inputArgs: [[3, 9, 20, null, null, 15, 7]],
          expected: true,
        },
        {
          id: 2,
          input: "root = [1,2,2,3,3,null,null,4,4]",
          inputArgs: [[1, 2, 2, 3, 3, null, null, 4, 4]],
          expected: false,
        },
      ],
      approach:
        "Use DFS to compute heights bottom-up. At each node, check if the height difference between left and right subtrees exceeds 1. Return -1 to signal imbalance, avoiding redundant re-computation.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 100,
      title: "Same Tree",
      slug: "same-tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/same-tree/",
      description:
        "Given the roots of two binary trees p and q, determine whether they are structurally identical and have the same node values at every position.",
      functionName: "isSameTree",
      starterCode: {
        javascript: "function isSameTree(p, q) {\n  \n}",
        python: "def is_same_tree(p, q):\n    pass",
        java: "class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "p = [1,2,3], q = [1,2,3]",
          inputArgs: [[1, 2, 3], [1, 2, 3]],
          expected: true,
        },
        {
          id: 2,
          input: "p = [1,2], q = [1,null,2]",
          inputArgs: [[1, 2], [1, null, 2]],
          expected: false,
        },
      ],
      approach:
        "Recursively compare nodes of both trees simultaneously. Two trees are the same if current nodes have equal values and both left and right subtrees are identical. Base case: both null means equal, one null means different.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 572,
      title: "Subtree of Another Tree",
      slug: "subtree-of-another-tree",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/subtree-of-another-tree/",
      description:
        "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values as subRoot.",
      functionName: "isSubtree",
      starterCode: {
        javascript: "function isSubtree(root, subRoot) {\n  \n}",
        python: "def is_subtree(root, sub_root):\n    pass",
        java: "class Solution {\n    public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [3,4,5,1,2], subRoot = [4,1,2]",
          inputArgs: [[3, 4, 5, 1, 2], [4, 1, 2]],
          expected: true,
        },
        {
          id: 2,
          input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]",
          inputArgs: [
            [3, 4, 5, 1, 2, null, null, null, null, 0],
            [4, 1, 2],
          ],
          expected: false,
        },
      ],
      approach:
        "At each node in the main tree, check if the subtree rooted there is identical to subRoot using a helper function. This helper recursively compares structure and values of both trees.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 235,
      title: "Lowest Common Ancestor of a Binary Search Tree",
      slug: "lowest-common-ancestor-of-a-binary-search-tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
      description:
        "Given a binary search tree and two nodes p and q, find the lowest common ancestor (LCA). The LCA is the deepest node that has both p and q as descendants (a node can be a descendant of itself).",
      functionName: "lowestCommonAncestor",
      starterCode: {
        javascript: "function lowestCommonAncestor(root, p, q) {\n  \n}",
        python: "def lowest_common_ancestor(root, p, q):\n    pass",
        java: "class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
          inputArgs: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8],
          expected: 6,
        },
        {
          id: 2,
          input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
          inputArgs: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4],
          expected: 2,
        },
      ],
      approach:
        "Leverage the BST property: if both values are less than the current node, the LCA is in the left subtree; if both are greater, it's in the right subtree. Otherwise, the current node is the LCA.",
      timeComplexity: "O(h)",
      spaceComplexity: "O(1)",
    },
    {
      id: 102,
      title: "Binary Tree Level Order Traversal",
      slug: "binary-tree-level-order-traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      description:
        "Given the root of a binary tree, return the level order traversal of its node values, grouped by level from left to right.",
      functionName: "levelOrder",
      starterCode: {
        javascript: "function levelOrder(root) {\n  \n}",
        python: "def level_order(root):\n    pass",
        java: "class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [3,9,20,null,null,15,7]",
          inputArgs: [[3, 9, 20, null, null, 15, 7]],
          expected: [[3], [9, 20], [15, 7]],
        },
        {
          id: 2,
          input: "root = [1]",
          inputArgs: [[1]],
          expected: [[1]],
        },
      ],
      approach:
        "Use BFS with a queue. Process nodes level by level, tracking the size of each level to group nodes correctly. Add each level's values as a subarray to the result.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 199,
      title: "Binary Tree Right Side View",
      slug: "binary-tree-right-side-view",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-right-side-view/",
      description:
        "Given the root of a binary tree, return the values of the nodes you can see when looking at the tree from the right side, ordered from top to bottom.",
      functionName: "rightSideView",
      starterCode: {
        javascript: "function rightSideView(root) {\n  \n}",
        python: "def right_side_view(root):\n    pass",
        java: "class Solution {\n    public List<Integer> rightSideView(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [1,2,3,null,5,null,4]",
          inputArgs: [[1, 2, 3, null, 5, null, 4]],
          expected: [1, 3, 4],
        },
        {
          id: 2,
          input: "root = [1,null,3]",
          inputArgs: [[1, null, 3]],
          expected: [1, 3],
        },
      ],
      approach:
        "Perform BFS level by level, and take the last node's value from each level. Alternatively, use DFS visiting right children first and recording the first node seen at each depth.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 1448,
      title: "Count Good Nodes in Binary Tree",
      slug: "count-good-nodes-in-binary-tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/count-good-nodes-in-binary-tree/",
      description:
        "Given a binary tree, a node is considered good if the path from the root to that node has no node with a value greater than that node's value. Return the number of good nodes in the tree.",
      functionName: "goodNodes",
      starterCode: {
        javascript: "function goodNodes(root) {\n  \n}",
        python: "def good_nodes(root):\n    pass",
        java: "class Solution {\n    public int goodNodes(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int goodNodes(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [3,1,4,3,null,1,5]",
          inputArgs: [[3, 1, 4, 3, null, 1, 5]],
          expected: 4,
        },
        {
          id: 2,
          input: "root = [3,3,null,4,2]",
          inputArgs: [[3, 3, null, 4, 2]],
          expected: 3,
        },
      ],
      approach:
        "Perform DFS, tracking the maximum value seen along the path from the root. A node is 'good' if its value is greater than or equal to the path maximum. Update the maximum as you descend.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 98,
      title: "Validate Binary Search Tree",
      slug: "validate-binary-search-tree",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/validate-binary-search-tree/",
      description:
        "Given the root of a binary tree, determine if it is a valid binary search tree. A valid BST requires that every node's left subtree contains only values less than the node, and the right subtree contains only values greater.",
      functionName: "isValidBST",
      starterCode: {
        javascript: "function isValidBST(root) {\n  \n}",
        python: "def is_valid_bst(root):\n    pass",
        java: "class Solution {\n    public boolean isValidBST(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [2,1,3]",
          inputArgs: [[2, 1, 3]],
          expected: true,
        },
        {
          id: 2,
          input: "root = [5,1,4,null,null,3,6]",
          inputArgs: [[5, 1, 4, null, null, 3, 6]],
          expected: false,
        },
      ],
      approach:
        "Use DFS with min/max bounds. Each node's value must fall within a valid range: greater than the lower bound and less than the upper bound. Update bounds as you recurse left (upper = node.val) and right (lower = node.val).",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 230,
      title: "Kth Smallest Element in a BST",
      slug: "kth-smallest-element-in-a-bst",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
      description:
        "Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) among all node values in the tree.",
      functionName: "kthSmallest",
      starterCode: {
        javascript: "function kthSmallest(root, k) {\n  \n}",
        python: "def kth_smallest(root, k):\n    pass",
        java: "class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [3,1,4,null,2], k = 1",
          inputArgs: [[3, 1, 4, null, 2], 1],
          expected: 1,
        },
        {
          id: 2,
          input: "root = [5,3,6,2,4,null,null,1], k = 3",
          inputArgs: [[5, 3, 6, 2, 4, null, null, 1], 3],
          expected: 3,
        },
      ],
      approach:
        "Perform an inorder traversal of the BST, which visits nodes in ascending order. Count the nodes visited and return the kth one. Can terminate early once the kth element is found.",
      timeComplexity: "O(h+k)",
      spaceComplexity: "O(h)",
    },
    {
      id: 105,
      title: "Construct Binary Tree from Preorder and Inorder Traversal",
      slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/",
      description:
        "Given two integer arrays preorder and inorder representing the preorder and inorder traversals of a binary tree, construct and return the binary tree.",
      functionName: "buildTree",
      starterCode: {
        javascript: "function buildTree(preorder, inorder) {\n  \n}",
        python: "def build_tree(preorder, inorder):\n    pass",
        java: "class Solution {\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
          inputArgs: [
            [3, 9, 20, 15, 7],
            [9, 3, 15, 20, 7],
          ],
          expected: [3, 9, 20, null, null, 15, 7],
        },
      ],
      approach:
        "The first element of preorder is the root. Find it in inorder to determine left/right subtree sizes. Recursively build left and right subtrees using the corresponding segments. Use a HashMap for O(1) root lookups in inorder.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 124,
      title: "Binary Tree Maximum Path Sum",
      slug: "binary-tree-maximum-path-sum",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/binary-tree-maximum-path-sum/",
      description:
        "Given the root of a binary tree, return the maximum path sum of any non-empty path. A path is a sequence of nodes where each pair of adjacent nodes has an edge, and no node appears more than once. The path does not need to pass through the root.",
      functionName: "maxPathSum",
      starterCode: {
        javascript: "function maxPathSum(root) {\n  \n}",
        python: "def max_path_sum(root):\n    pass",
        java: "class Solution {\n    public int maxPathSum(TreeNode root) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int maxPathSum(TreeNode* root) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [1,2,3]",
          inputArgs: [[1, 2, 3]],
          expected: 6,
        },
        {
          id: 2,
          input: "root = [-10,9,20,null,null,15,7]",
          inputArgs: [[-10, 9, 20, null, null, 15, 7]],
          expected: 42,
        },
      ],
      approach:
        "Use DFS returning the maximum single-path sum from each node (the node plus at most one child path). At each node, compute the path sum through it (left + node + right) and update the global maximum. Return the best single-direction path upward.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
    },
    {
      id: 297,
      title: "Serialize and Deserialize Binary Tree",
      slug: "serialize-and-deserialize-binary-tree",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/",
      description:
        "Design an algorithm to serialize a binary tree into a string and deserialize that string back into the original tree structure. The encoding scheme should allow full reconstruction of the tree.",
      functionName: "serialize",
      starterCode: {
        javascript:
          "function serialize(root) {\n  \n}\n\nfunction deserialize(data) {\n  \n}",
        python:
          "def serialize(root):\n    pass\n\ndef deserialize(data):\n    pass",
        java: "class Solution {\n    public String serialize(TreeNode root) {\n        \n    }\n\n    public TreeNode deserialize(String data) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    string serialize(TreeNode* root) {\n        \n    }\n\n    TreeNode* deserialize(string data) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "root = [1,2,3,null,null,4,5]",
          inputArgs: [[1, 2, 3, null, null, 4, 5]],
          expected: [1, 2, 3, null, null, 4, 5],
        },
      ],
      approach:
        "Use BFS or preorder DFS to serialize the tree, including null markers for missing children. To deserialize, reconstruct the tree by reading values in the same order and building nodes with the same traversal pattern.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  ],
};
