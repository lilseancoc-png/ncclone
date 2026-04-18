import { Category } from "../types";

export const twoDDynamicProgramming: Category = {
  name: "2-D Dynamic Programming",
  slug: "two-d-dynamic-programming",
  problems: [
    {
      id: 62,
      title: "Unique Paths",
      slug: "unique-paths",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/unique-paths/",
      description:
        "A robot is located at the top-left corner of an m x n grid. It can only move right or down. How many possible unique paths are there to reach the bottom-right corner?",
      functionName: "uniquePaths",
      starterCode: {
        javascript: "function uniquePaths(m, n) {\n  \n}",
        python: "def unique_paths(m, n):\n    pass",
        java: "class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "m = 3, n = 7",
          inputArgs: [3, 7],
          expected: 28,
        },
        {
          id: 2,
          input: "m = 3, n = 2",
          inputArgs: [3, 2],
          expected: 3,
        },
      ],
      patterns: ["Dynamic Programming", "Math", "Combinatorics"],
      hints: [
        "To reach any cell, your last move was from the cell above OR from the cell to the left. Sum the paths.",
        "dp[i][j] = dp[i-1][j] + dp[i][j-1]. Base: first row and column all 1.",
        "Mathematically, this is C(m+n-2, m-1) — choose which moves are 'down' out of the total.",
      ],
      keyIntuition:
        "Unique Paths is 2D DP in its purest form — each cell is the sum of 'how many ways to reach its two predecessors'. The 'last move' decomposition is the key. Once you see it, the closed-form C(m+n-2, m-1) pops out: out of m+n-2 total moves, choose which are 'down'. DP and combinatorics converge here.",
      approach:
        "DP grid where dp[i][j] = dp[i-1][j] + dp[i][j-1]. The number of paths to each cell is the sum of paths from the cell above and the cell to the left. Initialize the first row and column with 1.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 1143,
      title: "Longest Common Subsequence",
      slug: "longest-common-subsequence",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/longest-common-subsequence/",
      description:
        "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
      functionName: "longestCommonSubsequence",
      starterCode: {
        javascript: "function longestCommonSubsequence(text1, text2) {\n  \n}",
        python: "def longest_common_subsequence(text1, text2):\n    pass",
        java: "class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'text1 = "abcde", text2 = "ace"',
          inputArgs: ["abcde", "ace"],
          expected: 3,
        },
        {
          id: 2,
          input: 'text1 = "abc", text2 = "abc"',
          inputArgs: ["abc", "abc"],
          expected: 3,
        },
        {
          id: 3,
          input: 'text1 = "abc", text2 = "def"',
          inputArgs: ["abc", "def"],
          expected: 0,
        },
      ],
      patterns: ["Dynamic Programming", "String"],
      hints: [
        "State: dp[i][j] = LCS length of text1[0..i-1] and text2[0..j-1].",
        "If last chars match, they contribute to LCS: dp[i][j] = dp[i-1][j-1] + 1.",
        "If they don't match, skip one char from either side: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      ],
      keyIntuition:
        "LCS is the foundational 2D DP — master this and many string DPs fall. The state is 'how much common subsequence can we extract from these two prefixes?' The decision is always about the LAST characters: match them or drop one. This template (Edit Distance, Distinct Subsequences, etc.) is one of the highest-leverage DP patterns to know cold.",
      approach:
        "Use a 2D DP table where dp[i][j] represents the LCS length of text1[0..i-1] and text2[0..j-1]. If characters match, dp[i][j] = dp[i-1][j-1] + 1. Otherwise, dp[i][j] = max(dp[i-1][j], dp[i][j-1]).",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
    {
      id: 309,
      title: "Best Time to Buy and Sell Stock with Cooldown",
      slug: "best-time-to-buy-and-sell-stock-with-cooldown",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/",
      description:
        "Given an array of stock prices, find the maximum profit with the constraint that after selling, you must wait one day before buying again (cooldown of 1 day).",
      functionName: "maxProfit",
      starterCode: {
        javascript: "function maxProfit(prices) {\n  \n}",
        python: "def max_profit(prices):\n    pass",
        java: "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "prices = [1,2,3,0,2]",
          inputArgs: [[1, 2, 3, 0, 2]],
          expected: 3,
        },
        {
          id: 2,
          input: "prices = [1]",
          inputArgs: [[1]],
          expected: 0,
        },
      ],
      patterns: ["Dynamic Programming", "State Machine", "Array"],
      hints: [
        "At each day, you're in one of three states: HOLD (own stock), SOLD (just sold, must cooldown), or REST (nothing + no cooldown).",
        "Model the transitions: hold[i] = max(hold[i-1], rest[i-1] - price). sold[i] = hold[i-1] + price. rest[i] = max(rest[i-1], sold[i-1]).",
        "Answer = max(sold[n-1], rest[n-1]).",
      ],
      keyIntuition:
        "State machine DP is a powerful frame for sequential-decision problems. Break each step into 'what state am I in?' and write transitions for each. The cooldown constraint is elegantly captured: SOLD only flows to REST, not directly to HOLD. This state-machine approach generalizes to stock problems with fees, with k transactions, etc.",
      approach:
        "Use state machine DP with three states: holding, sold, and cooldown. Transitions: holding -> sold (sell), cooldown -> holding (buy), sold -> cooldown (wait). Track max profit in each state.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 518,
      title: "Coin Change II",
      slug: "coin-change-ii",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/coin-change-ii/",
      description:
        "Given an integer amount and an array of coin denominations, return the number of combinations that make up that amount. If no combination is possible, return 0.",
      functionName: "change",
      starterCode: {
        javascript: "function change(amount, coins) {\n  \n}",
        python: "def change(amount, coins):\n    pass",
        java: "class Solution {\n    public int change(int amount, int[] coins) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int change(int amount, vector<int>& coins) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "amount = 5, coins = [1,2,5]",
          inputArgs: [5, [1, 2, 5]],
          expected: 4,
        },
        {
          id: 2,
          input: "amount = 3, coins = [2]",
          inputArgs: [3, [2]],
          expected: 0,
        },
        {
          id: 3,
          input: "amount = 10, coins = [10]",
          inputArgs: [10, [10]],
          expected: 1,
        },
      ],
      patterns: ["Dynamic Programming", "Array", "Unbounded Knapsack"],
      hints: [
        "Unbounded knapsack in combinations-mode. Each amount counts distinct multisets of coins.",
        "dp[j] = # ways to make amount j. Transition: for each coin c, dp[j] += dp[j-c].",
        "LOOP ORDER MATTERS: outer coins, inner amount → combinations. Outer amount, inner coins → permutations (wrong!).",
      ],
      keyIntuition:
        "The subtle difference between combinations and permutations in DP is ALL in loop order. Outer coin means 'fix this coin's uses before moving on' → combinations only. Outer amount means 'any coin usable' → counts orderings (permutations). Internalize this distinction and you'll sail through related Coin Change / Climbing Stairs variants.",
      approach:
        "DP where dp[j] = number of combinations to make amount j. Process coins one at a time (outer loop) to avoid counting permutations. For each coin, dp[j] += dp[j - coin].",
      timeComplexity: "O(n*m)",
      spaceComplexity: "O(n)",
    },
    {
      id: 494,
      title: "Target Sum",
      slug: "target-sum",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/target-sum/",
      description:
        "Given an integer array nums and an integer target, return the number of ways to assign + and - signs to each number so that the expression evaluates to target.",
      functionName: "findTargetSumWays",
      starterCode: {
        javascript: "function findTargetSumWays(nums, target) {\n  \n}",
        python: "def find_target_sum_ways(nums, target):\n    pass",
        java: "class Solution {\n    public int findTargetSumWays(int[] nums, int target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int findTargetSumWays(vector<int>& nums, int target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,1,1,1,1], target = 3",
          inputArgs: [[1, 1, 1, 1, 1], 3],
          expected: 5,
        },
        {
          id: 2,
          input: "nums = [1], target = 1",
          inputArgs: [[1], 1],
          expected: 1,
        },
      ],
      patterns: ["Dynamic Programming", "Subset Sum", "Array"],
      hints: [
        "Let P = positives, N = negatives. P + N = sum, P - N = target. Solve: P = (sum + target) / 2.",
        "Now: 'count subsets summing to P'. Standard subset-sum counting DP.",
        "Precondition: (sum + target) must be non-negative and even, else 0.",
      ],
      keyIntuition:
        "The classic algebraic reduction: signed-expression counting reduces to subset-sum counting via one clever substitution. This move is a reusable trick: whenever you see ± signs contributing to a target, separate positives from negatives and use sum-of-positives as your new target. Makes the problem solvable with standard 0/1 knapsack in O(n·sum).",
      approach:
        "Transform into a subset sum problem: find subsets P and N where P - N = target and P + N = sum. So P = (sum + target) / 2. Use DP to count subsets that sum to P.",
      timeComplexity: "O(n*sum)",
      spaceComplexity: "O(sum)",
    },
    {
      id: 97,
      title: "Interleaving String",
      slug: "interleaving-string",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/interleaving-string/",
      description:
        "Given strings s1, s2, and s3, determine whether s3 is formed by an interleaving of s1 and s2. An interleaving preserves the relative order of characters from each string.",
      functionName: "isInterleave",
      starterCode: {
        javascript: "function isInterleave(s1, s2, s3) {\n  \n}",
        python: "def is_interleave(s1, s2, s3):\n    pass",
        java: "class Solution {\n    public boolean isInterleave(String s1, String s2, String s3) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isInterleave(string s1, string s2, string s3) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"',
          inputArgs: ["aabcc", "dbbca", "aadbbcbcac"],
          expected: true,
        },
        {
          id: 2,
          input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"',
          inputArgs: ["aabcc", "dbbca", "aadbbbaccc"],
          expected: false,
        },
      ],
      patterns: ["Dynamic Programming", "String"],
      hints: [
        "If you've used i chars of s1 and j chars of s2, you must have consumed i+j chars of s3.",
        "dp[i][j] = true iff s3[0..i+j-1] is an interleaving. It's reachable from dp[i-1][j] (if s1[i-1] matches) or dp[i][j-1] (if s2[j-1] matches).",
        "First check: len(s1) + len(s2) == len(s3).",
      ],
      keyIntuition:
        "Two-string DP with a hidden third string. Since length sums constrain you (i+j indexes s3), you don't need a 3D state — (i,j) is enough. The recurrence asks the simplest question: 'what was the LAST move — from s1 or from s2?' This two-source OR pattern recurs in merge-style DP problems.",
      approach:
        "Use 2D DP where dp[i][j] = true if s3[0..i+j-1] can be formed by interleaving s1[0..i-1] and s2[0..j-1]. Check if the current character of s3 matches the next character of s1 or s2.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 329,
      title: "Longest Increasing Path in a Matrix",
      slug: "longest-increasing-path-in-a-matrix",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-increasing-path-in-a-matrix/",
      description:
        "Given an m x n integers matrix, return the length of the longest increasing path. From each cell, you can move in four directions (up, down, left, right) to a cell with a strictly larger value.",
      functionName: "longestIncreasingPath",
      starterCode: {
        javascript: "function longestIncreasingPath(matrix) {\n  \n}",
        python: "def longest_increasing_path(matrix):\n    pass",
        java: "class Solution {\n    public int longestIncreasingPath(int[][] matrix) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int longestIncreasingPath(vector<vector<int>>& matrix) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]",
          inputArgs: [[[9, 9, 4], [6, 6, 8], [2, 1, 1]]],
          expected: 4,
        },
        {
          id: 2,
          input: "matrix = [[3,4,5],[3,2,6],[2,2,1]]",
          inputArgs: [[[3, 4, 5], [3, 2, 6], [2, 2, 1]]],
          expected: 4,
        },
      ],
      patterns: ["Dynamic Programming", "DFS", "Memoization", "Matrix", "Topological Sort"],
      hints: [
        "Because paths are STRICTLY increasing, there are no cycles — the grid forms a DAG.",
        "DFS with memoization: longest[i][j] = 1 + max(longest[neighbor]) where neighbor > current.",
        "Each cell computed once → O(m*n). Alternative: topological sort by value, then DP.",
      ],
      keyIntuition:
        "Strict inequality = DAG = memoization works! On a DAG, DFS with memoization IS dynamic programming on the implicit topological order. The 'no cycles' property is what unlocks polynomial time. This generalizes: any grid/graph problem with a monotone constraint (strictly increasing/decreasing) becomes a DAG and admits memoized DFS.",
      approach:
        "DFS with memoization from each cell. For each cell, explore all four directions where the neighbor value is greater. Cache the longest path starting from each cell to avoid recomputation.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
    {
      id: 115,
      title: "Distinct Subsequences",
      slug: "distinct-subsequences",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/distinct-subsequences/",
      description:
        "Given two strings s and t, return the number of distinct subsequences of s which equals t.",
      functionName: "numDistinct",
      starterCode: {
        javascript: "function numDistinct(s, t) {\n  \n}",
        python: "def num_distinct(s, t):\n    pass",
        java: "class Solution {\n    public int numDistinct(String s, String t) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int numDistinct(string s, string t) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "rabbbit", t = "rabbit"',
          inputArgs: ["rabbbit", "rabbit"],
          expected: 3,
        },
        {
          id: 2,
          input: 's = "babgbag", t = "bag"',
          inputArgs: ["babgbag", "bag"],
          expected: 5,
        },
      ],
      patterns: ["Dynamic Programming", "String"],
      hints: [
        "dp[i][j] = # ways s[0..i-1] forms subsequence equal to t[0..j-1].",
        "If s[i-1] == t[j-1]: you can either USE s[i-1] (dp[i-1][j-1] ways) or SKIP it (dp[i-1][j] ways). Sum both.",
        "If they don't match, you MUST skip s[i-1]: dp[i][j] = dp[i-1][j].",
      ],
      keyIntuition:
        "When the choice is 'use this match or skip', you sum both counts — that's the hallmark of counting-subsequences DP. Compare to LCS (which tracks length, so it takes max) — here you track COUNT, so you add. The shape is 2D string DP, but the aggregation operator tells you what you're counting.",
      approach:
        "2D DP where dp[i][j] = number of distinct subsequences of s[0..i-1] that equal t[0..j-1]. If s[i-1] == t[j-1], dp[i][j] = dp[i-1][j-1] + dp[i-1][j] (use or skip current char). Otherwise dp[i][j] = dp[i-1][j].",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 72,
      title: "Edit Distance",
      slug: "edit-distance",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/edit-distance/",
      description:
        "Given two strings word1 and word2, return the minimum number of operations (insert, delete, replace) required to convert word1 into word2.",
      functionName: "minDistance",
      starterCode: {
        javascript: "function minDistance(word1, word2) {\n  \n}",
        python: "def min_distance(word1, word2):\n    pass",
        java: "class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'word1 = "horse", word2 = "ros"',
          inputArgs: ["horse", "ros"],
          expected: 3,
        },
        {
          id: 2,
          input: 'word1 = "intention", word2 = "execution"',
          inputArgs: ["intention", "execution"],
          expected: 5,
        },
      ],
      patterns: ["Dynamic Programming", "String"],
      hints: [
        "dp[i][j] = min ops to turn word1[0..i-1] into word2[0..j-1].",
        "If chars match: dp[i][j] = dp[i-1][j-1] (free, no op needed).",
        "Otherwise, dp[i][j] = 1 + min(dp[i-1][j] [delete], dp[i][j-1] [insert], dp[i-1][j-1] [replace]).",
      ],
      keyIntuition:
        "Edit Distance (Levenshtein) is the capstone of 2D string DP. Each operation maps to a specific predecessor: delete moves i-1 back, insert moves j-1 back, replace moves both back. The beauty is that these three account for all possible ways to resolve a mismatch at position (i,j). Understanding this opens up DNA alignment, spell-check, and diff algorithms.",
      approach:
        "2D DP where dp[i][j] = minimum operations to convert word1[0..i-1] to word2[0..j-1]. If characters match, dp[i][j] = dp[i-1][j-1]. Otherwise, take the minimum of insert (dp[i][j-1]), delete (dp[i-1][j]), or replace (dp[i-1][j-1]), plus 1.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 312,
      title: "Burst Balloons",
      slug: "burst-balloons",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/burst-balloons/",
      description:
        "Given n balloons with numbers on them, burst all balloons to collect maximum coins. When you burst balloon i, you get nums[i-1] * nums[i] * nums[i+1] coins. After bursting, i-1 and i+1 become adjacent.",
      functionName: "maxCoins",
      starterCode: {
        javascript: "function maxCoins(nums) {\n  \n}",
        python: "def max_coins(nums):\n    pass",
        java: "class Solution {\n    public int maxCoins(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int maxCoins(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [3,1,5,8]",
          inputArgs: [[3, 1, 5, 8]],
          expected: 167,
        },
        {
          id: 2,
          input: "nums = [1,5]",
          inputArgs: [[1, 5]],
          expected: 10,
        },
      ],
      patterns: ["Dynamic Programming", "Interval DP", "Array"],
      hints: [
        "Thinking 'first balloon to burst' is hopeless — neighbors shift around. Flip it: think LAST balloon to burst in each range.",
        "If k is the last popped in range [i,j], then at the moment it's popped, its neighbors are still nums[i-1] and nums[j+1] (fixed by the range boundary).",
        "dp[i][j] = max over k of: dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j]. Pad both ends with 1.",
      ],
      keyIntuition:
        "Burst Balloons is famously tricky because the OBVIOUS first-step DP fails. The insight 'think about the LAST move' is the canonical interval-DP trick: it fixes the boundary conditions and makes sub-problems truly independent. This 'last move' reframing shows up in Matrix Chain Multiplication, Optimal BST, Guess Number Higher or Lower II, etc.",
      approach:
        "Use interval DP with the key insight: consider the last balloon to burst in each subarray. For interval [i,j], try each balloon k as the last to pop: dp[i][j] = max(dp[i][k-1] + nums[i-1]*nums[k]*nums[j+1] + dp[k+1][j]) for all k in [i,j].",
      timeComplexity: "O(n^3)",
      spaceComplexity: "O(n^2)",
    },
    {
      id: 10,
      title: "Regular Expression Matching",
      slug: "regular-expression-matching",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/regular-expression-matching/",
      description:
        "Given an input string s and a pattern p, implement regular expression matching with support for '.' (matches any single character) and '*' (matches zero or more of the preceding element).",
      functionName: "isMatch",
      starterCode: {
        javascript: "function isMatch(s, p) {\n  \n}",
        python: "def is_match(s, p):\n    pass",
        java: "class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isMatch(string s, string p) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "aa", p = "a"',
          inputArgs: ["aa", "a"],
          expected: false,
        },
        {
          id: 2,
          input: 's = "aa", p = "a*"',
          inputArgs: ["aa", "a*"],
          expected: true,
        },
        {
          id: 3,
          input: 's = "ab", p = ".*"',
          inputArgs: ["ab", ".*"],
          expected: true,
        },
      ],
      patterns: ["Dynamic Programming", "Recursion", "String"],
      hints: [
        "dp[i][j] = s[0..i-1] matches p[0..j-1]?",
        "For '.' or literal: dp[i][j] = (chars match) && dp[i-1][j-1].",
        "For 'x*': zero uses → dp[i][j-2]. One+ uses (if preceding char matches s[i-1]) → dp[i-1][j].",
      ],
      keyIntuition:
        "Regex matching via DP is a classic because it requires careful case-splitting on the pattern. The '*' is the tricky case: it either matches zero characters (skip 'x*' entirely) OR consumes one more from s (stay on 'x*' but advance in s). Once you see that 'zero or more' reduces to two recursive sub-problems, the rest is book-keeping. This same case-splitting approach solves Wildcard Matching and similar pattern problems.",
      approach:
        "2D DP where dp[i][j] = whether s[0..i-1] matches p[0..j-1]. Handle '.' as any character match. For '*', either use zero occurrences (dp[i][j-2]) or one+ occurrences if the preceding character matches (dp[i-1][j]).",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m*n)",
    },
  ],
};
