import { Category } from "../types";

export const oneDDynamicProgramming: Category = {
  name: "1-D Dynamic Programming",
  slug: "one-d-dynamic-programming",
  problems: [
    {
      id: 70,
      title: "Climbing Stairs",
      slug: "climbing-stairs",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/climbing-stairs/",
      description:
        "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      functionName: "climbStairs",
      starterCode: {
        javascript: "function climbStairs(n) {\n  \n}",
        python: "def climb_stairs(n):\n    pass",
        java: "class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 2",
          inputArgs: [2],
          expected: 2,
        },
        {
          id: 2,
          input: "n = 3",
          inputArgs: [3],
          expected: 3,
        },
      ],
      approach:
        "Use DP where dp[i] = dp[i-1] + dp[i-2], representing the number of ways to reach step i. This is equivalent to the Fibonacci sequence. Optimize space by keeping only the two previous values.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 746,
      title: "Min Cost Climbing Stairs",
      slug: "min-cost-climbing-stairs",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/min-cost-climbing-stairs/",
      description:
        "Given an integer array cost where cost[i] is the cost of the ith step, return the minimum cost to reach the top of the floor. You can start from step 0 or step 1, and at each step you can climb 1 or 2 steps.",
      functionName: "minCostClimbingStairs",
      starterCode: {
        javascript: "function minCostClimbingStairs(cost) {\n  \n}",
        python: "def min_cost_climbing_stairs(cost):\n    pass",
        java: "class Solution {\n    public int minCostClimbingStairs(int[] cost) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int minCostClimbingStairs(vector<int>& cost) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "cost = [10,15,20]",
          inputArgs: [[10, 15, 20]],
          expected: 15,
        },
        {
          id: 2,
          input: "cost = [1,100,1,1,1,100,1,1,100,1]",
          inputArgs: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]],
          expected: 6,
        },
      ],
      approach:
        "DP where dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Start from step 0 or 1 (both are free). The answer is min(dp[n-1], dp[n-2]) since you can reach the top from either of the last two steps.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 198,
      title: "House Robber",
      slug: "house-robber",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/house-robber/",
      description:
        "Given an integer array nums representing the amount of money at each house, return the maximum amount you can rob without robbing two adjacent houses.",
      functionName: "rob",
      starterCode: {
        javascript: "function rob(nums) {\n  \n}",
        python: "def rob(nums):\n    pass",
        java: "class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,2,3,1]",
          inputArgs: [[1, 2, 3, 1]],
          expected: 4,
        },
        {
          id: 2,
          input: "nums = [2,7,9,3,1]",
          inputArgs: [[2, 7, 9, 3, 1]],
          expected: 12,
        },
      ],
      approach:
        "DP where at each house, choose to either rob it (add its value to the best from two houses back) or skip it (keep the best from the previous house). dp[i] = max(dp[i-1], dp[i-2] + nums[i]).",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 213,
      title: "House Robber II",
      slug: "house-robber-ii",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/house-robber-ii/",
      description:
        "All houses are arranged in a circle. Given an integer array nums representing the amount of money at each house, return the maximum amount you can rob without robbing two adjacent houses.",
      functionName: "rob",
      starterCode: {
        javascript: "function rob(nums) {\n  \n}",
        python: "def rob(nums):\n    pass",
        java: "class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [2,3,2]",
          inputArgs: [[2, 3, 2]],
          expected: 3,
        },
        {
          id: 2,
          input: "nums = [1,2,3,1]",
          inputArgs: [[1, 2, 3, 1]],
          expected: 4,
        },
        {
          id: 3,
          input: "nums = [1,2,3]",
          inputArgs: [[1, 2, 3]],
          expected: 3,
        },
      ],
      approach:
        "Since houses form a circle, the first and last cannot both be robbed. Run the linear House Robber algorithm twice: once excluding the last house, once excluding the first. Return the maximum of the two results.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 5,
      title: "Longest Palindromic Substring",
      slug: "longest-palindromic-substring",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
      description:
        "Given a string s, return the longest palindromic substring in s.",
      functionName: "longestPalindrome",
      starterCode: {
        javascript: "function longestPalindrome(s) {\n  \n}",
        python: "def longest_palindrome(s):\n    pass",
        java: "class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "babad"',
          inputArgs: ["babad"],
          expected: "bab",
        },
        {
          id: 2,
          input: 's = "cbbd"',
          inputArgs: ["cbbd"],
          expected: "bb",
        },
      ],
      approach:
        "Expand around each center position, trying both odd-length (single center) and even-length (double center) palindromes. Track the longest palindrome found. Each expansion takes O(n) time in the worst case.",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
    },
    {
      id: 647,
      title: "Palindromic Substrings",
      slug: "palindromic-substrings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/palindromic-substrings/",
      description:
        "Given a string s, return the number of palindromic substrings in it. A substring is a contiguous sequence of characters within the string.",
      functionName: "countSubstrings",
      starterCode: {
        javascript: "function countSubstrings(s) {\n  \n}",
        python: "def count_substrings(s):\n    pass",
        java: "class Solution {\n    public int countSubstrings(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int countSubstrings(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "abc"',
          inputArgs: ["abc"],
          expected: 3,
        },
        {
          id: 2,
          input: 's = "aaa"',
          inputArgs: ["aaa"],
          expected: 6,
        },
      ],
      approach:
        "Expand around each center for both odd and even length palindromes. Count each valid expansion as a palindromic substring. There are 2n-1 possible centers (n for odd, n-1 for even).",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
    },
    {
      id: 91,
      title: "Decode Ways",
      slug: "decode-ways",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/decode-ways/",
      description:
        "Given a string s containing only digits, return the number of ways to decode it, where 'A' = 1, 'B' = 2, ..., 'Z' = 26.",
      functionName: "numDecodings",
      starterCode: {
        javascript: "function numDecodings(s) {\n  \n}",
        python: "def num_decodings(s):\n    pass",
        java: "class Solution {\n    public int numDecodings(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int numDecodings(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "12"',
          inputArgs: ["12"],
          expected: 2,
        },
        {
          id: 2,
          input: 's = "226"',
          inputArgs: ["226"],
          expected: 3,
        },
        {
          id: 3,
          input: 's = "06"',
          inputArgs: ["06"],
          expected: 0,
        },
      ],
      approach:
        "DP where dp[i] represents the number of ways to decode the substring s[0..i]. A single digit (1-9) adds dp[i-1] ways; a valid two-digit number (10-26) adds dp[i-2] ways. Handle '0' specially as it cannot be decoded alone.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 322,
      title: "Coin Change",
      slug: "coin-change",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/coin-change/",
      description:
        "Given an array of coin denominations and a total amount, return the fewest number of coins needed to make up that amount. Return -1 if it cannot be made up.",
      functionName: "coinChange",
      starterCode: {
        javascript: "function coinChange(coins, amount) {\n  \n}",
        python: "def coin_change(coins, amount):\n    pass",
        java: "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "coins = [1,5,10], amount = 12",
          inputArgs: [[1, 5, 10], 12],
          expected: 3,
        },
        {
          id: 2,
          input: "coins = [2], amount = 3",
          inputArgs: [[2], 3],
          expected: -1,
        },
        {
          id: 3,
          input: "coins = [1], amount = 0",
          inputArgs: [[1], 0],
          expected: 0,
        },
      ],
      approach:
        "DP where dp[i] = minimum coins needed for amount i. For each amount from 1 to target, try each coin: dp[i] = min(dp[i], dp[i-coin] + 1). Initialize with infinity and dp[0] = 0.",
      timeComplexity: "O(n*m)",
      spaceComplexity: "O(n)",
    },
    {
      id: 152,
      title: "Maximum Product Subarray",
      slug: "maximum-product-subarray",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/maximum-product-subarray/",
      description:
        "Given an integer array nums, find a contiguous subarray that has the largest product, and return the product.",
      functionName: "maxProduct",
      starterCode: {
        javascript: "function maxProduct(nums) {\n  \n}",
        python: "def max_product(nums):\n    pass",
        java: "class Solution {\n    public int maxProduct(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [2,3,-2,4]",
          inputArgs: [[2, 3, -2, 4]],
          expected: 6,
        },
        {
          id: 2,
          input: "nums = [-2,0,-1]",
          inputArgs: [[-2, 0, -1]],
          expected: 0,
        },
      ],
      approach:
        "Track both the maximum and minimum product ending at each position, since a negative number can flip the minimum to maximum. At each element, compute new max and min from current * prevMax, current * prevMin, and current alone.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 139,
      title: "Word Break",
      slug: "word-break",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/word-break/",
      description:
        "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
      functionName: "wordBreak",
      starterCode: {
        javascript: "function wordBreak(s, wordDict) {\n  \n}",
        python: "def word_break(s, word_dict):\n    pass",
        java: "class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "leetcode", wordDict = ["leet","code"]',
          inputArgs: ["leetcode", ["leet", "code"]],
          expected: true,
        },
        {
          id: 2,
          input: 's = "applepenapple", wordDict = ["apple","pen"]',
          inputArgs: ["applepenapple", ["apple", "pen"]],
          expected: true,
        },
        {
          id: 3,
          input: 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]',
          inputArgs: ["catsandog", ["cats", "dog", "sand", "and", "cat"]],
          expected: false,
        },
      ],
      approach:
        "DP where dp[i] = true if s[0..i-1] can be segmented using the dictionary. For each position i, check all possible last words: if dp[j] is true and s[j..i] is in the dictionary, then dp[i] = true.",
      timeComplexity: "O(n^2*m)",
      spaceComplexity: "O(n)",
    },
    {
      id: 300,
      title: "Longest Increasing Subsequence",
      slug: "longest-increasing-subsequence",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
      description:
        "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
      functionName: "lengthOfLIS",
      starterCode: {
        javascript: "function lengthOfLIS(nums) {\n  \n}",
        python: "def length_of_lis(nums):\n    pass",
        java: "class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [10,9,2,5,3,7,101,18]",
          inputArgs: [[10, 9, 2, 5, 3, 7, 101, 18]],
          expected: 4,
        },
        {
          id: 2,
          input: "nums = [0,1,0,3,2,3]",
          inputArgs: [[0, 1, 0, 3, 2, 3]],
          expected: 4,
        },
      ],
      approach:
        "Use a patience sorting approach with binary search. Maintain a tails array where tails[i] is the smallest tail element of all increasing subsequences of length i+1. For each number, binary search for its position in tails.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 416,
      title: "Partition Equal Subset Sum",
      slug: "partition-equal-subset-sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/partition-equal-subset-sum/",
      description:
        "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of elements in both subsets is equal.",
      functionName: "canPartition",
      starterCode: {
        javascript: "function canPartition(nums) {\n  \n}",
        python: "def can_partition(nums):\n    pass",
        java: "class Solution {\n    public boolean canPartition(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,5,11,5]",
          inputArgs: [[1, 5, 11, 5]],
          expected: true,
        },
        {
          id: 2,
          input: "nums = [1,2,3,5]",
          inputArgs: [[1, 2, 3, 5]],
          expected: false,
        },
      ],
      approach:
        "Calculate the total sum; if odd, return false. Use DP to check if a subset sums to sum/2. Use a boolean array dp where dp[j] = true if sum j is achievable with the elements seen so far.",
      timeComplexity: "O(n*sum)",
      spaceComplexity: "O(sum)",
    },
  ],
};
