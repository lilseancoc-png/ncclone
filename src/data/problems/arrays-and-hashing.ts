import { Category } from "../types";

export const arraysAndHashing: Category = {
  name: "Arrays & Hashing",
  slug: "arrays-and-hashing",
  problems: [
    {
      id: 217,
      title: "Contains Duplicate",
      slug: "contains-duplicate",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/",
      description:
        "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
      functionName: "containsDuplicate",
      starterCode: {
        javascript: "function containsDuplicate(nums) {\n  \n}",
        python: "def contains_duplicate(nums):\n    pass",
        java: "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,2,3,1]",
          inputArgs: [[1, 2, 3, 1]],
          expected: true,
        },
        {
          id: 2,
          input: "nums = [1,2,3,4]",
          inputArgs: [[1, 2, 3, 4]],
          expected: false,
        },
        {
          id: 3,
          input: "nums = [1,1,1,3,3,4,3,2,4,2]",
          inputArgs: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]],
          expected: true,
        },
      ],
      approach:
        "Insert each element into a HashSet while iterating through the array. If the element already exists in the set, a duplicate is found. The HashSet provides O(1) average lookup, making this significantly faster than the brute-force O(n^2) comparison approach.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 242,
      title: "Valid Anagram",
      slug: "valid-anagram",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
      description:
        "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.",
      functionName: "isAnagram",
      starterCode: {
        javascript: "function isAnagram(s, t) {\n  \n}",
        python: "def is_anagram(s, t):\n    pass",
        java: "class Solution {\n    public boolean isAnagram(String s, String t) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "anagram", t = "nagaram"',
          inputArgs: ["anagram", "nagaram"],
          expected: true,
        },
        {
          id: 2,
          input: 's = "rat", t = "car"',
          inputArgs: ["rat", "car"],
          expected: false,
        },
      ],
      approach:
        "Count the frequency of each character in both strings using a fixed-size array of 26 entries. Compare the frequency arrays to determine if they match. Since the character set is fixed (lowercase English letters), the space used is constant.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 1,
      title: "Two Sum",
      slug: "two-sum",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/two-sum/",
      description:
        "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.",
      functionName: "twoSum",
      starterCode: {
        javascript: "function twoSum(nums, target) {\n  \n}",
        python: "def two_sum(nums, target):\n    pass",
        java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [2,7,11,15], target = 9",
          inputArgs: [[2, 7, 11, 15], 9],
          expected: [0, 1],
        },
        {
          id: 2,
          input: "nums = [3,2,4], target = 6",
          inputArgs: [[3, 2, 4], 6],
          expected: [1, 2],
        },
        {
          id: 3,
          input: "nums = [3,3], target = 6",
          inputArgs: [[3, 3], 6],
          expected: [0, 1],
        },
      ],
      approach:
        "Use a HashMap to store each number's index as you iterate. For each element, check if the complement (target - current) exists in the map. This allows finding the pair in a single pass through the array.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 49,
      title: "Group Anagrams",
      slug: "group-anagrams",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
      description:
        "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An anagram is a word formed by rearranging the letters of another word.",
      functionName: "groupAnagrams",
      starterCode: {
        javascript: "function groupAnagrams(strs) {\n  \n}",
        python: "def group_anagrams(strs):\n    pass",
        java: "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
          inputArgs: [["eat", "tea", "tan", "ate", "nat", "bat"]],
          expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
        },
      ],
      approach:
        "Sort each word alphabetically and use the sorted version as a key in a HashMap. All anagrams will produce the same sorted key, so they naturally group together. Alternatively, use a character frequency count as the key to avoid sorting.",
      timeComplexity: "O(n * k * log(k))",
      spaceComplexity: "O(n * k)",
    },
    {
      id: 347,
      title: "Top K Frequent Elements",
      slug: "top-k-frequent-elements",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
      description:
        "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. It is guaranteed the answer is unique.",
      functionName: "topKFrequent",
      starterCode: {
        javascript: "function topKFrequent(nums, k) {\n  \n}",
        python: "def top_k_frequent(nums, k):\n    pass",
        java: "class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,1,1,2,2,3], k = 2",
          inputArgs: [[1, 1, 1, 2, 2, 3], 2],
          expected: [1, 2],
        },
        {
          id: 2,
          input: "nums = [1], k = 1",
          inputArgs: [[1], 1],
          expected: [1],
        },
      ],
      approach:
        "Count frequencies with a HashMap, then use bucket sort where the index represents frequency. Create an array of buckets where bucket[i] contains elements that appear i times. Iterate from the highest bucket down to collect the top k elements.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 238,
      title: "Product of Array Except Self",
      slug: "product-of-array-except-self",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
      description:
        "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must solve it without using division and in O(n) time.",
      functionName: "productExceptSelf",
      starterCode: {
        javascript: "function productExceptSelf(nums) {\n  \n}",
        python: "def product_except_self(nums):\n    pass",
        java: "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,2,3,4]",
          inputArgs: [[1, 2, 3, 4]],
          expected: [24, 12, 8, 6],
        },
        {
          id: 2,
          input: "nums = [-1,1,0,-3,3]",
          inputArgs: [[-1, 1, 0, -3, 3]],
          expected: [0, 0, 9, 0, 0],
        },
      ],
      approach:
        "Compute prefix products from the left in a first pass, storing them in the result array. Then compute suffix products from the right in a second pass, multiplying them into the result. This avoids division and achieves O(1) extra space by reusing the output array.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 36,
      title: "Valid Sudoku",
      slug: "valid-sudoku",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/",
      description:
        "Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the rules: each row, column, and 3x3 sub-box must contain the digits 1-9 without repetition.",
      functionName: "isValidSudoku",
      starterCode: {
        javascript: "function isValidSudoku(board) {\n  \n}",
        python: "def is_valid_sudoku(board):\n    pass",
        java: "class Solution {\n    public boolean isValidSudoku(char[][] board) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isValidSudoku(vector<vector<char>>& board) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "board = valid 9x9 board",
          inputArgs: [
            [
              ["5", "3", ".", ".", "7", ".", ".", ".", "."],
              ["6", ".", ".", "1", "9", "5", ".", ".", "."],
              [".", "9", "8", ".", ".", ".", ".", "6", "."],
              ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
              ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
              ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
              [".", "6", ".", ".", ".", ".", "2", "8", "."],
              [".", ".", ".", "4", "1", "9", ".", ".", "5"],
              [".", ".", ".", ".", "8", ".", ".", "7", "9"],
            ],
          ],
          expected: true,
        },
        {
          id: 2,
          input: "board = invalid 9x9 board (duplicate 8 in column)",
          inputArgs: [
            [
              ["8", "3", ".", ".", "7", ".", ".", ".", "."],
              ["6", ".", ".", "1", "9", "5", ".", ".", "."],
              [".", "9", "8", ".", ".", ".", ".", "6", "."],
              ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
              ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
              ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
              [".", "6", ".", ".", ".", ".", "2", "8", "."],
              [".", ".", ".", "4", "1", "9", ".", ".", "5"],
              [".", ".", ".", ".", "8", ".", ".", "7", "9"],
            ],
          ],
          expected: false,
        },
      ],
      approach:
        "Use HashSets to track seen numbers for each row, column, and 3x3 sub-box. Iterate through each cell and check if the number has already appeared in its corresponding row, column, or box. The box index can be computed as (row/3)*3 + col/3.",
      timeComplexity: "O(9^2)",
      spaceComplexity: "O(9^2)",
    },
    {
      id: 271,
      title: "Encode and Decode Strings",
      slug: "encode-and-decode-strings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/encode-and-decode-strings/",
      description:
        "Design an algorithm to encode a list of strings to a single string, and decode it back to the original list. The encoded string should be transmittable over a network and decodable without ambiguity.",
      functionName: "encode",
      starterCode: {
        javascript:
          "function encode(strs) {\n  \n}\n\nfunction decode(s) {\n  \n}",
        python: "def encode(strs):\n    pass\n\ndef decode(s):\n    pass",
        java: "class Solution {\n    public String encode(List<String> strs) {\n        \n    }\n\n    public List<String> decode(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    string encode(vector<string>& strs) {\n        \n    }\n\n    vector<string> decode(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'strs = ["hello","world"]',
          inputArgs: [["hello", "world"]],
          expected: ["hello", "world"],
        },
        {
          id: 2,
          input: 'strs = ["",""]',
          inputArgs: [["", ""]],
          expected: ["", ""],
        },
      ],
      approach:
        "Encode each string by prepending its length followed by a delimiter character (e.g., '5#hello'). When decoding, read the length prefix to know exactly how many characters to extract for each string. This handles any character content including the delimiter itself.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 128,
      title: "Longest Consecutive Sequence",
      slug: "longest-consecutive-sequence",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/",
      description:
        "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
      functionName: "longestConsecutive",
      starterCode: {
        javascript: "function longestConsecutive(nums) {\n  \n}",
        python: "def longest_consecutive(nums):\n    pass",
        java: "class Solution {\n    public int longestConsecutive(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [100,4,200,1,3,2]",
          inputArgs: [[100, 4, 200, 1, 3, 2]],
          expected: 4,
        },
        {
          id: 2,
          input: "nums = [0,3,7,2,5,8,4,6,0,1]",
          inputArgs: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]],
          expected: 9,
        },
      ],
      approach:
        "Add all numbers to a HashSet for O(1) lookups. For each number, check if it is the start of a sequence (i.e., num-1 is not in the set). If it is, count consecutive numbers forward. Track the maximum sequence length found.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  ],
};
