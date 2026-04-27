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
      runner: { kind: "tree", treeInputIndices: [0], returnsTree: true },
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
      patterns: ["Tree", "DFS", "Recursion"],
      hints: [
        "Think about what needs to happen at each individual node — what single operation would mirror its children?",
        "At every node, swap its left and right children. Then recurse on both subtrees.",
        "Base case: if node is null, return null. Otherwise, swap node.left and node.right, then call invertTree on both children and return the node.",
      ],
      keyIntuition:
        "Inverting a tree is a mirror operation: at every node, the left and right subtrees trade places. Because each subtree must also be mirrored, recursion naturally decomposes the problem — swapping at the current level and delegating the rest downward.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "DFS", "BFS", "Recursion"],
      hints: [
        "The depth of a tree is one more than the depth of its deeper subtree.",
        "Use recursion: depth(node) = 1 + max(depth(left), depth(right)). Base case: null node has depth 0.",
        "Alternatively, BFS level-by-level: count how many levels until the queue is empty.",
      ],
      keyIntuition:
        "This is the canonical 'divide and conquer' tree problem. The answer at any node depends on answers from its children. Recursion mirrors the tree's own structure — you don't need to track depth as a parameter; just return the answer upward.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "DFS", "Recursion"],
      hints: [
        "The longest path may or may not pass through the root. For every node, consider the longest path that bends at that node.",
        "A path through a node has length = leftHeight + rightHeight (in edges). Compute heights via DFS and track the global max.",
        "Write dfs(node) that returns the height (1 + max of child heights). Inside, update answer = max(answer, leftHeight + rightHeight).",
      ],
      keyIntuition:
        "The diameter is the longest path that 'bends' at some node — it goes down one side and up the other. The key trick is combining two things in one DFS: returning height to the parent while updating a global max of the 'bending path'. This 'compute one thing, update another' pattern is common in tree problems where the answer spans subtrees.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "DFS", "Recursion"],
      hints: [
        "A naive approach computes height at every node (O(n²)). Can you check balance and compute height in one pass?",
        "Have your recursive function return the height if balanced, or a sentinel (like -1) if imbalance is detected anywhere below.",
        "dfs(node): get leftH and rightH. If either is -1 or |leftH - rightH| > 1, return -1. Else return 1 + max(leftH, rightH).",
      ],
      keyIntuition:
        "The trick is fusing the check and the measurement: instead of computing height twice, return a signal value (-1) that propagates imbalance upward. This 'return two pieces of information as one' is a common optimization for tree problems, turning O(n²) into O(n).",
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
      runner: { kind: "tree", treeInputIndices: [0, 1] },
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
      patterns: ["Tree", "DFS", "Recursion"],
      hints: [
        "Two trees are the same if their roots match AND their left subtrees match AND their right subtrees match.",
        "Walk both trees in lockstep. At each step, compare values and recurse.",
        "Base cases: both null → true; one null → false. Recursive case: values equal AND isSame(p.left, q.left) AND isSame(p.right, q.right).",
      ],
      keyIntuition:
        "Tree equality is naturally recursive: the whole is equal iff the parts are equal. Walking both trees simultaneously avoids building intermediate representations. This lockstep traversal pattern also underlies problems like 'symmetric tree' and 'merge two trees'.",
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
      runner: { kind: "tree", treeInputIndices: [0, 1] },
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
      patterns: ["Tree", "DFS", "Recursion"],
      hints: [
        "For each node in root, ask: 'is the subtree rooted here the same as subRoot?' That's a subproblem you already know how to solve.",
        "Reuse the same-tree check. Recurse through root, trying the check at every node.",
        "isSubtree(root, subRoot): if root is null → false. If isSameTree(root, subRoot) → true. Else: isSubtree(root.left, subRoot) OR isSubtree(root.right, subRoot).",
      ],
      keyIntuition:
        "Complex tree problems often decompose into simpler ones. Subtree matching is just 'try same-tree at every node'. Recognizing that a subroutine exists for 'match here?' lets you focus on the traversal structure. A tree-hashing approach can make this O(n+m) instead of O(nm) — but the simple version is more instructive.",
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
      runner: {
        kind: "tree",
        treeInputIndices: [0],
        nodeLookupArgIndices: [1, 2],
        returnsNodeValue: true,
      },
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
      patterns: ["Tree", "Binary Search", "DFS"],
      hints: [
        "A BST has a powerful ordering property: left < node < right. Think about when p and q diverge.",
        "If both p and q are less than current node, LCA is on the left. If both are greater, it's on the right. Otherwise, the current node IS the LCA.",
        "Walk down the tree: go left if both target values are smaller; go right if both are larger; return the current node when they split.",
      ],
      keyIntuition:
        "The LCA is the first node where p and q part ways — one goes left, the other goes right (or one equals the current node). The BST property makes this check O(1) per node, turning a typical O(n) tree search into O(h). This is a great example of how structural constraints dramatically change algorithm complexity.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "BFS", "Queue"],
      hints: [
        "DFS visits depth-first, but you need nodes grouped by depth. What traversal fits naturally?",
        "BFS using a queue processes nodes level by level. You just need to know where each level ends.",
        "At each iteration, record the queue size = number of nodes at the current level. Process exactly that many nodes, collecting their values, and enqueue their children.",
      ],
      keyIntuition:
        "BFS is a natural fit for level-order problems because it inherently processes nearer nodes before farther ones. The 'snapshot queue size' trick lets you process one level at a time without tagging nodes with their depth. This template generalizes to right-side view, zigzag traversal, and level averages.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "BFS", "DFS"],
      hints: [
        "From the right side, you only see the rightmost node at each depth.",
        "BFS: do level-order and pick the last value at each level.",
        "DFS alternative: traverse in root-right-left order. The first node seen at each depth is the visible one — track depths seen in a set.",
      ],
      keyIntuition:
        "Both approaches hinge on 'rightmost at each depth'. BFS is the obvious fit for 'per-depth' questions. DFS is a clever variation: by visiting the right subtree before the left, the first time you reach each depth, it's from the right. This shows how traversal order can be tweaked to extract specific information.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "DFS", "Recursion"],
      hints: [
        "A 'good' node's value is ≥ every value on the root-to-node path. What's the single number you need to know about that path?",
        "Track the max value seen on the path so far. At each node, check if current value ≥ max.",
        "dfs(node, pathMax): if node is null, return 0. good = (node.val ≥ pathMax) ? 1 : 0. Recurse with max(pathMax, node.val). Return good + dfs(left) + dfs(right).",
      ],
      keyIntuition:
        "Problems involving 'path from root' often reduce to threading a single piece of state down the recursion. Instead of remembering the entire path, you only need its max. This 'accumulator through recursion' pattern is the tree analogue of running-max scans in arrays.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "DFS", "Binary Search"],
      hints: [
        "A common bug: checking only immediate children. A BST requires that ALL values in the left subtree are smaller than the node, not just its direct left child.",
        "Each node has a valid range (min, max) based on the ancestors above it. As you go left, tighten max. As you go right, tighten min.",
        "Recurse with (min, max) bounds. For root: (-∞, +∞). For node.left: (min, node.val). For node.right: (node.val, max). Fail if node.val is outside bounds.",
      ],
      keyIntuition:
        "The BST property is transitive: it must hold for all ancestor-descendant pairs, not just parent-child. Tracking (min, max) bounds that propagate down captures this transitively in O(1) per node. Alternatively, inorder traversal of a BST yields a sorted sequence — another valid (and elegant) approach.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "DFS", "Binary Search"],
      hints: [
        "A BST has a special traversal order that visits nodes in sorted order. Which one?",
        "Inorder traversal (left, root, right) on a BST yields values in ascending order.",
        "Do inorder, incrementing a counter at each node. When the counter reaches k, return the current value.",
      ],
      keyIntuition:
        "Inorder traversal of a BST is equivalent to sorted iteration. This transforms a tree problem into an array problem — finding the kth element of a sorted sequence. Early termination makes it O(h + k). An iterative stack-based inorder enables clean early-exit.",
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
      runner: { kind: "tree", returnsTree: true },
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
      patterns: ["Tree", "DFS", "Recursion", "Hash Map"],
      hints: [
        "What unique property does each traversal give you? Preorder puts the root first. Inorder splits left and right subtrees by the root's position.",
        "Take preorder[0] as the root. Find it in inorder — everything left of it is the left subtree, everything right is the right subtree.",
        "Recurse: the next |left| elements of preorder form the left subtree; the rest form the right. Use a HashMap to find the root's index in inorder in O(1).",
      ],
      keyIntuition:
        "Each traversal encodes different information. Preorder identifies roots (in the order they're encountered). Inorder tells you the split between left and right subtrees. Together they uniquely determine the tree. This 'combine partial information' idea is fundamental when reconstructing structure from multiple views.",
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
      runner: { kind: "tree", treeInputIndices: [0] },
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
      patterns: ["Tree", "DFS", "Dynamic Programming"],
      hints: [
        "A path can turn once, but not twice, at any node. So for each node, consider the 'bending path' going left-through-right.",
        "Two things to track: the best straight path from each subtree (to return upward) and the best bending path (for the global answer).",
        "dfs(node) returns max(0, node.val + max(left, right)). Inside, update answer with node.val + max(0, leftPath) + max(0, rightPath).",
      ],
      keyIntuition:
        "The trick is realizing that any path either (a) continues straight down through a parent, or (b) bends at some node, using both its children. Each DFS call returns the 'straight path from here going down' (useful to the parent) while secretly updating a global with the 'bending path through here'. Clamping to 0 discards negative-sum branches — like choosing not to include them.",
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
      patterns: ["Tree", "DFS", "BFS", "String"],
      hints: [
        "Unlike a sorted array, a binary tree can't be serialized with just values — you need to encode null positions too.",
        "Use preorder (or level-order) and include a marker for null children. The structure of the traversal encodes the tree shape.",
        "Serialize: preorder DFS, emit 'null' for null nodes. Deserialize: split the string, consume tokens in order, building nodes recursively.",
      ],
      keyIntuition:
        "The core insight is that null markers are what make the serialization unambiguous. Without them, '1,2,3' could be many different trees. Preorder + null markers uniquely determines the tree — the deserializer rebuilds left subtree first (consuming all its tokens) before moving to the right. This is serialization by structural traversal.",
      approach:
        "Use BFS or preorder DFS to serialize the tree, including null markers for missing children. To deserialize, reconstruct the tree by reading values in the same order and building nodes with the same traversal pattern.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  ],
};
