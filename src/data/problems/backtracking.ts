import { Category } from "../types";

export const backtracking: Category = {
  name: "Backtracking",
  slug: "backtracking",
  problems: [
    {
      id: 78,
      title: "Subsets",
      slug: "subsets",
      difficulty: "Medium",
      compareMode: "unordered-nested",
      leetcodeUrl: "https://leetcode.com/problems/subsets/",
      description:
        "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution must not contain duplicate subsets, and may be returned in any order.",
      functionName: "subsets",
      starterCode: {
        javascript: "function subsets(nums) {\n  \n}",
        python: "def subsets(nums):\n    pass",
        java: "class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,2,3]",
          inputArgs: [[1, 2, 3]],
          expected: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]],
        },
        {
          id: 2,
          input: "nums = [0]",
          inputArgs: [[0]],
          expected: [[], [0]],
        },
      ],
      approach:
        "Use backtracking with an include/exclude decision at each index. At each step, either include the current element or skip it, building all possible combinations. The base case is reaching the end of the array.",
      timeComplexity: "O(n*2^n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 39,
      title: "Combination Sum",
      slug: "combination-sum",
      difficulty: "Medium",
      compareMode: "unordered-nested",
      leetcodeUrl: "https://leetcode.com/problems/combination-sum/",
      description:
        "Given an array of distinct integers candidates and a target integer, return all unique combinations of candidates where the chosen numbers sum to the target. The same number may be used an unlimited number of times. Combinations may be returned in any order.",
      functionName: "combinationSum",
      starterCode: {
        javascript: "function combinationSum(candidates, target) {\n  \n}",
        python: "def combination_sum(candidates, target):\n    pass",
        java: "class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "candidates = [2,3,6,7], target = 7",
          inputArgs: [[2, 3, 6, 7], 7],
          expected: [[2, 2, 3], [7]],
        },
        {
          id: 2,
          input: "candidates = [2,3,5], target = 8",
          inputArgs: [[2, 3, 5], 8],
          expected: [[2, 2, 2, 2], [2, 3, 3], [3, 5]],
        },
      ],
      approach:
        "Backtrack by trying each candidate, subtracting it from the target. Allow reuse of the same candidate by not advancing the index. Skip candidates that exceed the remaining target. Collect results when target reaches zero.",
      timeComplexity: "O(2^target)",
      spaceComplexity: "O(target)",
    },
    {
      id: 46,
      title: "Permutations",
      slug: "permutations",
      difficulty: "Medium",
      compareMode: "unordered",
      leetcodeUrl: "https://leetcode.com/problems/permutations/",
      description:
        "Given an array nums of distinct integers, return all possible permutations in any order.",
      functionName: "permute",
      starterCode: {
        javascript: "function permute(nums) {\n  \n}",
        python: "def permute(nums):\n    pass",
        java: "class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,2,3]",
          inputArgs: [[1, 2, 3]],
          expected: [
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1],
          ],
        },
        {
          id: 2,
          input: "nums = [0,1]",
          inputArgs: [[0, 1]],
          expected: [
            [0, 1],
            [1, 0],
          ],
        },
      ],
      approach:
        "Use backtracking by swapping each element to the current position. At each depth, swap the current index with every subsequent index, recurse, then swap back to restore the original order (backtrack).",
      timeComplexity: "O(n!*n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 90,
      title: "Subsets II",
      slug: "subsets-ii",
      difficulty: "Medium",
      compareMode: "unordered-nested",
      leetcodeUrl: "https://leetcode.com/problems/subsets-ii/",
      description:
        "Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution must not contain duplicate subsets, and may be returned in any order.",
      functionName: "subsetsWithDup",
      starterCode: {
        javascript: "function subsetsWithDup(nums) {\n  \n}",
        python: "def subsets_with_dup(nums):\n    pass",
        java: "class Solution {\n    public List<List<Integer>> subsetsWithDup(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,2,2]",
          inputArgs: [[1, 2, 2]],
          expected: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]],
        },
        {
          id: 2,
          input: "nums = [0]",
          inputArgs: [[0]],
          expected: [[], [0]],
        },
      ],
      approach:
        "Sort the array first to group duplicates together. Use backtracking and skip duplicate elements at the same recursion level by checking if the current element equals the previous one.",
      timeComplexity: "O(n*2^n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 40,
      title: "Combination Sum II",
      slug: "combination-sum-ii",
      difficulty: "Medium",
      compareMode: "unordered-nested",
      leetcodeUrl: "https://leetcode.com/problems/combination-sum-ii/",
      description:
        "Given an array of candidates (which may contain duplicates) and a target number, find all unique combinations where the candidate numbers sum to the target. Each number may only be used once per combination.",
      functionName: "combinationSum2",
      starterCode: {
        javascript:
          "function combinationSum2(candidates, target) {\n  \n}",
        python: "def combination_sum2(candidates, target):\n    pass",
        java: "class Solution {\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "candidates = [10,1,2,7,6,1,5], target = 8",
          inputArgs: [[10, 1, 2, 7, 6, 1, 5], 8],
          expected: [
            [1, 1, 6],
            [1, 2, 5],
            [1, 7],
            [2, 6],
          ],
        },
        {
          id: 2,
          input: "candidates = [2,5,2,1,2], target = 5",
          inputArgs: [[2, 5, 2, 1, 2], 5],
          expected: [[1, 2, 2], [5]],
        },
      ],
      approach:
        "Sort the candidates and backtrack. Each candidate can only be used once (advance the index after picking). Skip duplicates at the same level by checking if the current candidate equals the previous one.",
      timeComplexity: "O(2^n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 79,
      title: "Word Search",
      slug: "word-search",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/word-search/",
      description:
        "Given an m x n grid of characters and a string word, return true if word can be constructed from letters of sequentially adjacent cells (horizontally or vertically). Each cell may only be used once.",
      functionName: "exist",
      starterCode: {
        javascript: "function exist(board, word) {\n  \n}",
        python: "def exist(board, word):\n    pass",
        java: "class Solution {\n    public boolean exist(char[][] board, String word) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"',
          inputArgs: [
            [
              ["A", "B", "C", "E"],
              ["S", "F", "C", "S"],
              ["A", "D", "E", "E"],
            ],
            "ABCCED",
          ],
          expected: true,
        },
        {
          id: 2,
          input:
            'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"',
          inputArgs: [
            [
              ["A", "B", "C", "E"],
              ["S", "F", "C", "S"],
              ["A", "D", "E", "E"],
            ],
            "SEE",
          ],
          expected: true,
        },
      ],
      approach:
        "Perform DFS backtracking from each cell on the board. At each step, check if the current cell matches the current character. Mark visited cells to avoid reuse, and unmark them when backtracking.",
      timeComplexity: "O(m*n*4^L)",
      spaceComplexity: "O(L)",
    },
    {
      id: 131,
      title: "Palindrome Partitioning",
      slug: "palindrome-partitioning",
      difficulty: "Medium",
      compareMode: "unordered",
      leetcodeUrl: "https://leetcode.com/problems/palindrome-partitioning/",
      description:
        "Given a string s, partition it such that every substring in the partition is a palindrome. Return all possible palindrome partitionings of s.",
      functionName: "partition",
      starterCode: {
        javascript: "function partition(s) {\n  \n}",
        python: "def partition(s):\n    pass",
        java: "class Solution {\n    public List<List<String>> partition(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<string>> partition(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "aab"',
          inputArgs: ["aab"],
          expected: [
            ["a", "a", "b"],
            ["aa", "b"],
          ],
        },
        {
          id: 2,
          input: 's = "a"',
          inputArgs: ["a"],
          expected: [["a"]],
        },
      ],
      approach:
        "Backtrack by trying every possible prefix as a partition. If the prefix is a palindrome, add it to the current partition and recurse on the remaining string. Collect complete partitions when the end of the string is reached.",
      timeComplexity: "O(n*2^n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 17,
      title: "Letter Combinations of a Phone Number",
      slug: "letter-combinations-of-a-phone-number",
      difficulty: "Medium",
      compareMode: "unordered",
      leetcodeUrl:
        "https://leetcode.com/problems/letter-combinations-of-a-phone-number/",
      description:
        "Given a string containing digits from 2-9, return all possible letter combinations that the number could represent, based on a phone keypad mapping. Return the answer in any order.",
      functionName: "letterCombinations",
      starterCode: {
        javascript: "function letterCombinations(digits) {\n  \n}",
        python: "def letter_combinations(digits):\n    pass",
        java: "class Solution {\n    public List<String> letterCombinations(String digits) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'digits = "23"',
          inputArgs: ["23"],
          expected: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"],
        },
        {
          id: 2,
          input: 'digits = ""',
          inputArgs: [""],
          expected: [],
        },
      ],
      approach:
        "Map each digit to its corresponding letters (2->abc, 3->def, etc.). Backtrack by appending each possible letter for the current digit and recursing on the remaining digits. Return empty array for empty input.",
      timeComplexity: "O(4^n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 51,
      title: "N-Queens",
      slug: "n-queens",
      difficulty: "Hard",
      compareMode: "unordered",
      leetcodeUrl: "https://leetcode.com/problems/n-queens/",
      description:
        "Place n queens on an n x n chessboard such that no two queens threaten each other (no two queens share the same row, column, or diagonal). Return all distinct solutions, where each solution is a board configuration represented as an array of strings.",
      functionName: "solveNQueens",
      starterCode: {
        javascript: "function solveNQueens(n) {\n  \n}",
        python: "def solve_n_queens(n):\n    pass",
        java: "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 4",
          inputArgs: [4],
          expected: [
            [".Q..", "...Q", "Q...", "..Q."],
            ["..Q.", "Q...", "...Q", ".Q.."],
          ],
        },
        {
          id: 2,
          input: "n = 1",
          inputArgs: [1],
          expected: [["Q"]],
        },
      ],
      approach:
        "Place queens row by row using backtracking. Track attacked columns, diagonals (row-col), and anti-diagonals (row+col) using sets. A position is safe if its column and both diagonals are not attacked.",
      timeComplexity: "O(n!)",
      spaceComplexity: "O(n^2)",
    },
  ],
};
