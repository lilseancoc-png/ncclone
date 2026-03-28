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
      approach:
        "Use a monotonic deque that stores indices in decreasing order of their values. As the window slides, remove indices that are out of the window from the front and remove smaller elements from the back before adding the new element. The front of the deque always holds the maximum.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)",
    },
  ],
};
