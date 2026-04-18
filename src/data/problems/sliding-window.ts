import { Category } from "../types";

export const slidingWindow: Category = {
  name: "Sliding Window",
  slug: "sliding-window",
  problems: [
    {
      id: 121,
      title: "Best Time to Buy and Sell Stock",
      slug: "best-time-to-buy-and-sell-stock",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      description:
        "Given an array prices where prices[i] is the price of a stock on the ith day, find the maximum profit you can achieve by choosing a single day to buy and a later day to sell. Return 0 if no profit is possible.",
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
          input: "prices = [7,1,5,3,6,4]",
          inputArgs: [[7, 1, 5, 3, 6, 4]],
          expected: 5,
        },
        {
          id: 2,
          input: "prices = [7,6,4,3,1]",
          inputArgs: [[7, 6, 4, 3, 1]],
          expected: 0,
        },
      ],
      patterns: ["Sliding Window", "Array", "Greedy"],
      hints: [
        "You only need to track one piece of information as you scan left to right: what is the cheapest price you have seen so far?",
        "At each day, compute the profit you would get if you sold today. The buy price is the minimum price seen in all previous days.",
        "Initialize minPrice to prices[0] and maxProfit to 0. For each price from index 1 onward: maxProfit = max(maxProfit, price - minPrice), then minPrice = min(minPrice, price). Return maxProfit.",
      ],
      keyIntuition:
        "For every potential sell day, the optimal buy day is the minimum price that came before it. By maintaining a running minimum as we scan, we evaluate every possible (buy, sell) pair in O(n) without nested loops. This is a degenerate sliding window where the left boundary is simply the index of the minimum element seen so far.",
      approach:
        "Track the minimum price seen so far as you iterate through the array. At each position, calculate the profit if selling at the current price and update the maximum profit. This effectively finds the largest difference where the smaller value comes first.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 3,
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring-without-repeating-characters",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
      description:
        "Given a string s, find the length of the longest substring without repeating characters.",
      functionName: "lengthOfLongestSubstring",
      starterCode: {
        javascript: "function lengthOfLongestSubstring(s) {\n  \n}",
        python: "def length_of_longest_substring(s):\n    pass",
        java: "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "abcabcbb"',
          inputArgs: ["abcabcbb"],
          expected: 3,
        },
        {
          id: 2,
          input: 's = "bbbbb"',
          inputArgs: ["bbbbb"],
          expected: 1,
        },
        {
          id: 3,
          input: 's = "pwwkew"',
          inputArgs: ["pwwkew"],
          expected: 3,
        },
      ],
      patterns: ["Sliding Window", "Hash Map", "String"],
      hints: [
        "You want the longest substring with all unique characters. As you extend the window right, what happens when you hit a duplicate?",
        "Use a Set or HashMap to track characters currently in the window. When you add a duplicate, shrink from the left until it's gone.",
        "Two pointers: right expands, adding chars. If a char is already in the set, remove left chars until it's gone. Track max window size throughout.",
      ],
      keyIntuition:
        "A valid window is one with no duplicates. As you slide right, the window can only shrink due to a specific conflict — the duplicate. Rather than restarting, you just advance left past the previous occurrence. This 'right expands, left shrinks on violation' pattern is the foundation of variable-size sliding windows.",
      approach:
        "Maintain a sliding window with a HashSet tracking characters in the current window. When a duplicate is found, shrink the window from the left by removing characters until the duplicate is gone. Track the maximum window size throughout.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(n, m))",
    },
    {
      id: 424,
      title: "Longest Repeating Character Replacement",
      slug: "longest-repeating-character-replacement",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/longest-repeating-character-replacement/",
      description:
        "Given a string s and an integer k, you can choose any character and change it to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter after performing at most k replacements.",
      functionName: "characterReplacement",
      starterCode: {
        javascript: "function characterReplacement(s, k) {\n  \n}",
        python: "def character_replacement(s, k):\n    pass",
        java: "class Solution {\n    public int characterReplacement(String s, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int characterReplacement(string s, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "ABAB", k = 2',
          inputArgs: ["ABAB", 2],
          expected: 4,
        },
        {
          id: 2,
          input: 's = "AABABBA", k = 1',
          inputArgs: ["AABABBA", 1],
          expected: 4,
        },
      ],
      patterns: ["Sliding Window", "Hash Map", "String"],
      hints: [
        "If you could replace up to k characters, what does it mean for a window to be valid?",
        "A window is valid if all but the most-frequent character can be replaced: (windowLen - maxFreq) ≤ k.",
        "Expand the right pointer, updating character frequencies. If (windowLen - maxFreq) > k, shrink from the left. Track the max valid window size.",
      ],
      keyIntuition:
        "The core insight is flipping the perspective: instead of asking 'which chars to replace?', ask 'what's the dominant character, and can I replace the rest within budget k?' This reduces to a frequency-count check. A neat subtlety: maxFreq doesn't need to be recomputed exactly when shrinking — the answer only grows when maxFreq grows, so a stale max still gives the correct final answer.",
      approach:
        "Use a sliding window tracking character frequencies within the window. The key insight is that a valid window satisfies: window length - count of most frequent char <= k. When the condition is violated, shrink the window from the left.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 567,
      title: "Permutation in String",
      slug: "permutation-in-string",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/",
      description:
        "Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words, return true if one of s1's permutations is a substring of s2.",
      functionName: "checkInclusion",
      starterCode: {
        javascript: "function checkInclusion(s1, s2) {\n  \n}",
        python: "def check_inclusion(s1, s2):\n    pass",
        java: "class Solution {\n    public boolean checkInclusion(String s1, String s2) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool checkInclusion(string s1, string s2) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's1 = "ab", s2 = "eidbaooo"',
          inputArgs: ["ab", "eidbaooo"],
          expected: true,
        },
        {
          id: 2,
          input: 's1 = "ab", s2 = "eidboaoo"',
          inputArgs: ["ab", "eidboaoo"],
          expected: false,
        },
      ],
      patterns: ["Sliding Window", "Hash Map", "String"],
      hints: [
        "A permutation of s1 is any rearrangement — the key invariant is the character frequency count.",
        "Check every contiguous substring of s2 of length |s1|. Compare frequency counts. Use a fixed-size sliding window to avoid recomputing from scratch.",
        "Build a freq map for s1 and the first |s1| chars of s2. Slide: add the new right char, remove the old left char. Match if both freq maps are equal.",
      ],
      keyIntuition:
        "Since a permutation has the exact same character frequencies as the original, comparing frequency counts eliminates the need to check all permutations (which would be k!). A fixed-size window lets you update counts incrementally in O(1) per slide instead of O(k) recomputation. This is a classic fixed-window pattern.",
      approach:
        "Use a fixed-size sliding window equal to the length of s1 over s2. Maintain frequency counts and compare them. A permutation exists when the character frequency of the window matches that of s1. Slide the window one character at a time, updating counts incrementally.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 76,
      title: "Minimum Window Substring",
      slug: "minimum-window-substring",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
      description:
        "Given two strings s and t, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If no such substring exists, return the empty string.",
      functionName: "minWindow",
      starterCode: {
        javascript: "function minWindow(s, t) {\n  \n}",
        python: "def min_window(s, t):\n    pass",
        java: "class Solution {\n    public String minWindow(String s, String t) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    string minWindow(string s, string t) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "ADOBECODEBANC", t = "ABC"',
          inputArgs: ["ADOBECODEBANC", "ABC"],
          expected: "BANC",
        },
        {
          id: 2,
          input: 's = "a", t = "a"',
          inputArgs: ["a", "a"],
          expected: "a",
        },
        {
          id: 3,
          input: 's = "a", t = "aa"',
          inputArgs: ["a", "aa"],
          expected: "",
        },
      ],
      patterns: ["Sliding Window", "Hash Map", "String"],
      hints: [
        "Think in two phases: grow the window until it contains everything needed, then shrink it until it's as small as possible while still valid.",
        "Use two frequency counters: what's needed (from t), and what's currently in the window. Track how many distinct required chars are fully satisfied.",
        "Expand right until all of t is covered. Then shrink left while the window is still valid, tracking the minimum. Resume expanding when invalid.",
      ],
      keyIntuition:
        "The two-pointer 'expand then contract' pattern naturally finds minimum valid windows. A 'formed' counter — tracking how many distinct required characters have their full count — avoids comparing full maps on every step. This template generalizes to many 'smallest window containing X' problems.",
      approach:
        "Use a sliding window with character frequency counts. Expand the right pointer until all required characters are included, then contract the left pointer to find the minimum valid window. Track a 'formed' counter to efficiently check when all required characters are satisfied.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(m)",
    },
    {
      id: 239,
      title: "Sliding Window Maximum",
      slug: "sliding-window-maximum",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/sliding-window-maximum/",
      description:
        "Given an array of integers nums and a sliding window of size k moving from left to right, return the maximum value in each window position. The window moves one position at a time.",
      functionName: "maxSlidingWindow",
      starterCode: {
        javascript: "function maxSlidingWindow(nums, k) {\n  \n}",
        python: "def max_sliding_window(nums, k):\n    pass",
        java: "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
          inputArgs: [[1, 3, -1, -3, 5, 3, 6, 7], 3],
          expected: [3, 3, 5, 5, 6, 7],
        },
        {
          id: 2,
          input: "nums = [1], k = 1",
          inputArgs: [[1], 1],
          expected: [1],
        },
      ],
      patterns: ["Sliding Window", "Monotonic Stack", "Array"],
      hints: [
        "A naive approach rescans each window in O(k), giving O(nk). Can you track the max without rescanning?",
        "A monotonic decreasing deque: if a new element is larger than what's at the back, those smaller elements can never be the max again, so pop them.",
        "Maintain indices in a deque. When adding index i: pop larger-indexed items that are smaller than nums[i]. Also pop front if it's outside the window (i - k). Front is the current max.",
      ],
      keyIntuition:
        "Key insight: if element A appears before element B in the window and A < B, A is dominated — it will never be the max as long as B is in the window. A monotonic decreasing deque keeps only 'candidates' whose future relevance hasn't been ruled out. Each element is added and removed at most once, giving O(n) total.",
      approach:
        "Use a monotonic deque that stores indices in decreasing order of their values. As the window slides, remove indices that are out of the window from the front and remove smaller elements from the back before adding the new element. The front of the deque always holds the maximum.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)",
    },
  ],
};
