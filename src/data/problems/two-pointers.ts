import { Category } from "../types";

export const twoPointers: Category = {
  name: "Two Pointers",
  slug: "two-pointers",
  problems: [
    {
      id: 125,
      title: "Valid Palindrome",
      slug: "valid-palindrome",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
      description:
        "Given a string s, return true if it is a palindrome after converting all uppercase letters to lowercase and removing all non-alphanumeric characters. An empty string is considered a palindrome.",
      functionName: "isPalindrome",
      starterCode: {
        javascript: "function isPalindrome(s) {\n  \n}",
        python: "def is_palindrome(s):\n    pass",
        java: "class Solution {\n    public boolean isPalindrome(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isPalindrome(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "A man, a plan, a canal: Panama"',
          inputArgs: ["A man, a plan, a canal: Panama"],
          expected: true,
        },
        {
          id: 2,
          input: 's = "race a car"',
          inputArgs: ["race a car"],
          expected: false,
        },
        {
          id: 3,
          input: 's = " "',
          inputArgs: [" "],
          expected: true,
        },
        {
          id: 4,
          input: 's = "0P"',
          inputArgs: ["0P"],
          expected: false,
        },
        {
          id: 5,
          input: 's = "ab_a"',
          inputArgs: ["ab_a"],
          expected: true,
        },
      ],
      patterns: ["Two Pointers", "String"],
      hints: [
        "A palindrome reads the same forwards and backwards. How would you compare from both ends?",
        "Use two pointers: one at the start, one at the end. Skip characters that aren't letters or digits.",
        "Convert to lowercase before comparing. Move pointers inward until they cross.",
      ],
      keyIntuition:
        "The two-pointer technique from both ends is the natural approach for palindrome checking — you're literally checking the 'mirror' property. The real lesson here is preprocessing: by ignoring non-alphanumeric characters and case, you separate the 'what to compare' from 'how to compare'. This is cleaner than filtering into a new string first.",
      approach:
        "Use two pointers starting from the beginning and end of the string. Skip non-alphanumeric characters and compare the remaining characters case-insensitively. Move the pointers inward until they meet.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 167,
      title: "Two Sum II - Input Array Is Sorted",
      slug: "two-sum-ii-input-array-is-sorted",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
      description:
        "Given a 1-indexed sorted array of integers numbers, find two numbers that add up to a specific target. Return the indices of the two numbers (1-indexed) as an array [index1, index2]. Exactly one solution is guaranteed.",
      functionName: "twoSum",
      starterCode: {
        javascript: "function twoSum(numbers, target) {\n  \n}",
        python: "def two_sum(numbers, target):\n    pass",
        java: "class Solution {\n    public int[] twoSum(int[] numbers, int target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& numbers, int target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "numbers = [2,7,11,15], target = 9",
          inputArgs: [[2, 7, 11, 15], 9],
          expected: [1, 2],
        },
        {
          id: 2,
          input: "numbers = [2,3,4], target = 6",
          inputArgs: [[2, 3, 4], 6],
          expected: [1, 3],
        },
        {
          id: 3,
          input: "numbers = [-1,0], target = -1",
          inputArgs: [[-1, 0], -1],
          expected: [1, 2],
        },
        {
          id: 4,
          input: "numbers = [1,2,3,4,4,9,56,90], target = 8",
          inputArgs: [[1, 2, 3, 4, 4, 9, 56, 90], 8],
          expected: [4, 5],
        },
      ],
      patterns: ["Two Pointers", "Array"],
      hints: [
        "The array is already sorted. How can you exploit that property?",
        "If the sum of two elements is too large, you need a smaller number. If too small, you need a larger number.",
        "Start with pointers at both ends. Move the left pointer right to increase the sum, or the right pointer left to decrease it.",
      ],
      keyIntuition:
        "Sorted order is the key enabler. With pointers at both ends, you have the smallest + largest possible sum. Moving the right pointer left always decreases the sum; moving the left pointer right always increases it. This gives you a directed search that eliminates possibilities with each step — a hallmark of two-pointer problems on sorted arrays.",
      approach:
        "Place two pointers at the start and end of the sorted array. If the sum is too large, move the right pointer left; if too small, move the left pointer right. The sorted order guarantees convergence to the answer.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 15,
      title: "3Sum",
      slug: "3sum",
      difficulty: "Medium",
      compareMode: "unordered-nested",
      leetcodeUrl: "https://leetcode.com/problems/3sum/",
      description:
        "Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
      functionName: "threeSum",
      starterCode: {
        javascript: "function threeSum(nums) {\n  \n}",
        python: "def three_sum(nums):\n    pass",
        java: "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [-1,0,1,2,-1,-4]",
          inputArgs: [[-1, 0, 1, 2, -1, -4]],
          expected: [
            [-1, -1, 2],
            [-1, 0, 1],
          ],
        },
        {
          id: 2,
          input: "nums = [0,1,1]",
          inputArgs: [[0, 1, 1]],
          expected: [],
        },
        {
          id: 3,
          input: "nums = [0,0,0]",
          inputArgs: [[0, 0, 0]],
          expected: [[0, 0, 0]],
        },
      ],
      patterns: ["Two Pointers", "Sorting", "Array"],
      hints: [
        "If you fix one number, the problem reduces to Two Sum II on the remaining elements.",
        "Sort the array first. Then for each element nums[i], use two pointers on nums[i+1..n-1] to find pairs summing to -nums[i].",
        "To avoid duplicate triplets, skip over repeated values for the fixed element and both pointers.",
      ],
      keyIntuition:
        "3Sum demonstrates a powerful problem-solving pattern: reduce an N-variable problem to an (N-1)-variable problem you've already solved. Fix one element → Two Sum on the rest. Sorting enables both the two-pointer search and duplicate skipping. This 'fix one, solve the rest' technique extends to 4Sum and beyond.",
      approach:
        "Sort the array, then fix one element and use two pointers on the remaining subarray to find pairs that sum to its negation. Skip duplicate values for the fixed element and the two pointers to avoid duplicate triplets in the result.",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
    },
    {
      id: 11,
      title: "Container With Most Water",
      slug: "container-with-most-water",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
      description:
        "Given n non-negative integers where each represents a vertical line at position i with height height[i], find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water the container can store.",
      functionName: "maxArea",
      starterCode: {
        javascript: "function maxArea(height) {\n  \n}",
        python: "def max_area(height):\n    pass",
        java: "class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "height = [1,8,6,2,5,4,8,3,7]",
          inputArgs: [[1, 8, 6, 2, 5, 4, 8, 3, 7]],
          expected: 49,
        },
        {
          id: 2,
          input: "height = [1,1]",
          inputArgs: [[1, 1]],
          expected: 1,
        },
        {
          id: 3,
          input: "height = [4,3,2,1,4]",
          inputArgs: [[4, 3, 2, 1, 4]],
          expected: 16,
        },
        {
          id: 4,
          input: "height = [1,2,1]",
          inputArgs: [[1, 2, 1]],
          expected: 2,
        },
      ],
      patterns: ["Two Pointers", "Greedy"],
      hints: [
        "Area = min(height[left], height[right]) × (right - left). Start with the widest container.",
        "When you move a pointer inward, the width decreases. So you only gain area if the height increases.",
        "Always move the pointer with the shorter height — moving the taller one can only decrease or maintain the limiting height, never increase the area.",
      ],
      keyIntuition:
        "The greedy choice is: always move the shorter side inward. Why? The area is limited by the shorter bar. Moving the taller bar inward can never help — you'd lose width while the height is still bottlenecked by the shorter bar. By moving the shorter bar, you at least have a chance of finding a taller one. This greedy elimination proves no better solution was skipped.",
      approach:
        "Start with two pointers at the widest container (both ends). Calculate the area and move the pointer with the shorter height inward, since moving the taller one can never increase the area. Track the maximum area found.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 42,
      title: "Trapping Rain Water",
      slug: "trapping-rain-water",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
      description:
        "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      functionName: "trap",
      starterCode: {
        javascript: "function trap(height) {\n  \n}",
        python: "def trap(height):\n    pass",
        java: "class Solution {\n    public int trap(int[] height) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
          inputArgs: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]],
          expected: 6,
        },
        {
          id: 2,
          input: "height = [4,2,0,3,2,5]",
          inputArgs: [[4, 2, 0, 3, 2, 5]],
          expected: 9,
        },
        {
          id: 3,
          input: "height = []",
          inputArgs: [[]],
          expected: 0,
        },
        {
          id: 4,
          input: "height = [3,0,0,2,0,4]",
          inputArgs: [[3, 0, 0, 2, 0, 4]],
          expected: 10,
        },
      ],
      patterns: ["Two Pointers", "Array"],
      hints: [
        "Water above bar i is determined by min(max height to its left, max height to its right) minus height[i].",
        "You could precompute left-max and right-max arrays, but can you do it in O(1) space?",
        "Use two pointers from both ends, tracking leftMax and rightMax. Process the side with the smaller max — you know water is bounded by that max regardless of what's on the other side.",
      ],
      keyIntuition:
        "For each bar, water is bounded by the shorter of the two tallest walls on either side. The two-pointer optimization works because when leftMax < rightMax, the water at the left pointer is determined entirely by leftMax — no matter what's on the right, the right side is at least as tall. This allows you to process one side at a time without seeing the whole picture.",
      approach:
        "Use two pointers from both ends, tracking the maximum height seen from each side. The water trapped at any position is determined by the minimum of the two max heights minus the current height. Always process the side with the smaller max height.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
  ],
};
