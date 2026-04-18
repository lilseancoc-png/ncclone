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
        {
          id: 4,
          input: "nums = []",
          inputArgs: [[]],
          expected: false,
        },
        {
          id: 5,
          input: "nums = [7]",
          inputArgs: [[7]],
          expected: false,
        },
      ],
      patterns: ["Array", "Hash Map", "Set"],
      hints: [
        "Think about what data structure lets you check if you've seen a value before in O(1) time.",
        "A Set stores unique values — what happens when you try to add a value that already exists?",
        "Iterate through the array. For each element, check if it's already in your Set. If yes, return true. Otherwise, add it.",
      ],
      keyIntuition:
        "The brute-force approach compares every pair (O(n²)). A HashSet trades space for time: by remembering what you've already seen, you reduce each lookup to O(1). This 'seen set' pattern recurs in many problems — whenever you need to check membership quickly, think HashSet.",
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
        {
          id: 3,
          input: 's = "", t = ""',
          inputArgs: ["", ""],
          expected: true,
        },
        {
          id: 4,
          input: 's = "a", t = "ab"',
          inputArgs: ["a", "ab"],
          expected: false,
        },
        {
          id: 5,
          input: 's = "aacc", t = "ccac"',
          inputArgs: ["aacc", "ccac"],
          expected: false,
        },
      ],
      patterns: ["Hash Map", "String"],
      hints: [
        "Two strings are anagrams if they have exactly the same character frequencies.",
        "You could sort both strings and compare, but can you do it without sorting?",
        "Count character frequencies for one string, then subtract for the other. If all counts are zero, they're anagrams.",
      ],
      keyIntuition:
        "Sorting both strings and comparing works (O(n log n)) but is overkill. Since anagrams are just rearrangements, they share the same character frequency fingerprint. A frequency counter reduces this to O(n). This frequency-counting technique is fundamental — it appears in problems about permutations, substrings, and any comparison that's order-independent.",
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
        {
          id: 4,
          input: "nums = [-1,-2,-3,-4,-5], target = -8",
          inputArgs: [[-1, -2, -3, -4, -5], -8],
          expected: [2, 4],
        },
        {
          id: 5,
          input: "nums = [0,4,3,0], target = 0",
          inputArgs: [[0, 4, 3, 0], 0],
          expected: [0, 3],
        },
      ],
      patterns: ["Array", "Hash Map"],
      hints: [
        "For each number, you need to find if another number exists that adds up to the target. What's target minus the current number?",
        "Instead of searching the entire array for the complement each time, what if you remembered which numbers (and their indices) you've already visited?",
        "Use a HashMap: key = number, value = index. For each element, look up (target - num) in the map. If found, you're done. Otherwise, add the current number.",
      ],
      keyIntuition:
        "The key insight is reframing the problem: instead of 'find two numbers that sum to target', think 'for each number, does its complement exist?' A HashMap makes complement lookups O(1). This complement-lookup pattern is the foundation for many sum problems (3Sum, 4Sum, etc.).",
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
      compareMode: "unordered-nested",
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
        {
          id: 2,
          input: 'strs = [""]',
          inputArgs: [[""]],
          expected: [[""]],
        },
        {
          id: 3,
          input: 'strs = ["a"]',
          inputArgs: [["a"]],
          expected: [["a"]],
        },
        {
          id: 4,
          input: 'strs = ["abc","bca","cab","xyz","zyx","foo"]',
          inputArgs: [["abc", "bca", "cab", "xyz", "zyx", "foo"]],
          expected: [["abc", "bca", "cab"], ["xyz", "zyx"], ["foo"]],
        },
      ],
      patterns: ["Hash Map", "Sorting", "String"],
      hints: [
        "Anagrams are words with the same letters. How can you create a 'canonical form' that all anagrams of a word share?",
        "If you sort each word's letters, all anagrams produce the same sorted string. That sorted string can be a dictionary key.",
        "Use a HashMap where the key is the sorted word and the value is a list of original words. Iterate through all strings, sort each, and append to the right group.",
      ],
      keyIntuition:
        "The core idea is creating a canonical representation — a unique signature that's identical for all anagrams. Sorting the letters is the simplest approach. Alternatively, a character frequency tuple (e.g., 'a1b0c2...') works in O(k) instead of O(k log k). This 'canonicalize then group' pattern appears whenever you need to group equivalent items.",
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
      compareMode: "unordered",
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
        {
          id: 3,
          input: "nums = [4,1,-1,2,-1,2,3], k = 2",
          inputArgs: [[4, 1, -1, 2, -1, 2, 3], 2],
          expected: [-1, 2],
        },
        {
          id: 4,
          input: "nums = [1,2,3,4,5], k = 5",
          inputArgs: [[1, 2, 3, 4, 5], 5],
          expected: [1, 2, 3, 4, 5],
        },
      ],
      patterns: ["Hash Map", "Bucket Sort"],
      hints: [
        "First, count how many times each element appears. What data structure is best for counting frequencies?",
        "After counting, you need the k most frequent. A heap works in O(n log k), but can you do it in O(n)?",
        "Bucket sort trick: create an array of size n+1 where index i holds elements that appear i times. Then walk backwards from the highest index, collecting k elements.",
      ],
      keyIntuition:
        "The clever trick is inverting the frequency map: instead of 'element → count', think 'count → elements'. Since frequencies are bounded by n, you can use an array (bucket sort) instead of a heap, achieving O(n). This bucket sort technique is useful whenever values have a bounded range.",
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
        {
          id: 3,
          input: "nums = [2,3]",
          inputArgs: [[2, 3]],
          expected: [3, 2],
        },
        {
          id: 4,
          input: "nums = [5,5,5,5]",
          inputArgs: [[5, 5, 5, 5]],
          expected: [125, 125, 125, 125],
        },
      ],
      patterns: ["Array", "Prefix Sum"],
      hints: [
        "You can't use division. For each index i, you need the product of everything to its left times everything to its right.",
        "What if you precomputed a 'prefix product' array and a 'suffix product' array?",
        "You can do it in one output array: first pass fills left-to-right prefix products, second pass multiplies in right-to-left suffix products.",
      ],
      keyIntuition:
        "The product at position i is (product of elements before i) × (product of elements after i). This decomposition into prefix and suffix is a powerful pattern. The same 'prefix/suffix decomposition' idea applies to prefix sums, running maximums, and any associative operation where you need to exclude one element.",
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
      patterns: ["Hash Map", "Matrix"],
      hints: [
        "You need to check three constraints: no duplicates in any row, column, or 3x3 box.",
        "Use separate Sets for each row, column, and box to track which numbers have appeared.",
        "The tricky part is mapping a cell (r, c) to its box index. Use: box = floor(r/3) * 3 + floor(c/3).",
      ],
      keyIntuition:
        "This is a constraint-checking problem, not a solving problem. The key insight is that you can validate all three constraints in a single pass by maintaining Sets for each row, column, and box simultaneously. The box index formula floor(r/3)*3 + floor(c/3) maps 9 cells to each of the 9 boxes.",
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
      patterns: ["String"],
      hints: [
        "The challenge is handling strings that might contain any character, including your delimiter.",
        "What if you encoded the length of each string before its content? Then you'd know exactly how many characters to read.",
        "Format: '5#hello4#world' — read the number before #, then consume exactly that many characters. Repeat.",
      ],
      keyIntuition:
        "Simple delimiters fail when strings can contain any character. Length-prefixing is a fundamental serialization technique used in network protocols (HTTP, TCP). By encoding the length, you make the delimiter unambiguous — the decoder always knows whether a '#' is a delimiter or part of the string content.",
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
        {
          id: 3,
          input: "nums = []",
          inputArgs: [[]],
          expected: 0,
        },
        {
          id: 4,
          input: "nums = [5]",
          inputArgs: [[5]],
          expected: 1,
        },
        {
          id: 5,
          input: "nums = [-3,-2,-1,0,1]",
          inputArgs: [[-3, -2, -1, 0, 1]],
          expected: 5,
        },
      ],
      patterns: ["Set", "Array"],
      hints: [
        "Sorting gives O(n log n). Can you identify the start of each consecutive sequence without sorting?",
        "A number is the start of a sequence only if (num - 1) is NOT in the array.",
        "Put all numbers in a HashSet. For each number where (num-1) is absent, count forward (num+1, num+2, ...) while values exist in the set. Track the max length.",
      ],
      keyIntuition:
        "The insight that makes this O(n) instead of O(n log n) is only starting to count from sequence beginnings. Without this optimization, you'd recount overlapping sequences. By checking 'is num-1 missing?', you ensure each element is visited at most twice across all sequence scans — once when added to the set, once when scanned forward.",
      approach:
        "Add all numbers to a HashSet for O(1) lookups. For each number, check if it is the start of a sequence (i.e., num-1 is not in the set). If it is, count consecutive numbers forward. Track the maximum sequence length found.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  ],
};
