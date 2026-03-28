import { Category } from "../types";

export const binarySearch: Category = {
  name: "Binary Search",
  slug: "binary-search",
  problems: [
    {
      id: 704,
      title: "Binary Search",
      slug: "binary-search",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/binary-search/",
      description:
        "Given a sorted array of integers nums and an integer target, return the index of target if it is found, or -1 if it is not present. You must write an algorithm with O(log n) runtime.",
      functionName: "search",
      starterCode: {
        javascript: "function search(nums, target) {\n  \n}",
        python: "def search(nums, target):\n    pass",
        java: "class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [-1,0,3,5,9,12], target = 9",
          inputArgs: [[-1, 0, 3, 5, 9, 12], 9],
          expected: 4,
        },
        {
          id: 2,
          input: "nums = [-1,0,3,5,9,12], target = 2",
          inputArgs: [[-1, 0, 3, 5, 9, 12], 2],
          expected: -1,
        },
      ],
      approach:
        "Maintain left and right pointers on the sorted array. Compare the middle element with the target: if equal, return the index; if target is smaller, search the left half; if larger, search the right half. Repeat until found or pointers cross.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 74,
      title: "Search a 2D Matrix",
      slug: "search-a-2d-matrix",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/search-a-2d-matrix/",
      description:
        "Write an efficient algorithm that searches for a value target in an m x n integer matrix. Each row is sorted in ascending order, and the first integer of each row is greater than the last integer of the previous row.",
      functionName: "searchMatrix",
      starterCode: {
        javascript: "function searchMatrix(matrix, target) {\n  \n}",
        python: "def search_matrix(matrix, target):\n    pass",
        java: "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
          inputArgs: [
            [
              [1, 3, 5, 7],
              [10, 11, 16, 20],
              [23, 30, 34, 60],
            ],
            3,
          ],
          expected: true,
        },
        {
          id: 2,
          input:
            "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
          inputArgs: [
            [
              [1, 3, 5, 7],
              [10, 11, 16, 20],
              [23, 30, 34, 60],
            ],
            13,
          ],
          expected: false,
        },
      ],
      approach:
        "Treat the 2D matrix as a flattened sorted array and apply standard binary search. Convert the 1D index to 2D coordinates using row = mid / cols and col = mid % cols. This works because each row starts with a value greater than the last element of the previous row.",
      timeComplexity: "O(log(m * n))",
      spaceComplexity: "O(1)",
    },
    {
      id: 875,
      title: "Koko Eating Bananas",
      slug: "koko-eating-bananas",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/koko-eating-bananas/",
      description:
        "Koko has piles of bananas and h hours to eat them all. She can eat at speed k bananas per hour, choosing one pile per hour (if the pile has fewer than k bananas, she finishes it and waits). Find the minimum integer eating speed k such that she can eat all bananas within h hours.",
      functionName: "minEatingSpeed",
      starterCode: {
        javascript: "function minEatingSpeed(piles, h) {\n  \n}",
        python: "def min_eating_speed(piles, h):\n    pass",
        java: "class Solution {\n    public int minEatingSpeed(int[] piles, int h) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int minEatingSpeed(vector<int>& piles, int h) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "piles = [3,6,7,11], h = 8",
          inputArgs: [[3, 6, 7, 11], 8],
          expected: 4,
        },
        {
          id: 2,
          input: "piles = [30,11,23,4,20], h = 5",
          inputArgs: [[30, 11, 23, 4, 20], 5],
          expected: 30,
        },
      ],
      approach:
        "Binary search on the eating speed k between 1 and the maximum pile size. For each candidate speed, calculate the total hours needed to eat all piles (ceiling division). Find the minimum speed where the total hours is within the time limit h.",
      timeComplexity: "O(n log m)",
      spaceComplexity: "O(1)",
    },
    {
      id: 153,
      title: "Find Minimum in Rotated Sorted Array",
      slug: "find-minimum-in-rotated-sorted-array",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
      description:
        "Given a sorted array of unique elements that has been rotated between 1 and n times, find the minimum element. You must write an algorithm that runs in O(log n) time.",
      functionName: "findMin",
      starterCode: {
        javascript: "function findMin(nums) {\n  \n}",
        python: "def find_min(nums):\n    pass",
        java: "class Solution {\n    public int findMin(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [3,4,5,1,2]",
          inputArgs: [[3, 4, 5, 1, 2]],
          expected: 1,
        },
        {
          id: 2,
          input: "nums = [4,5,6,7,0,1,2]",
          inputArgs: [[4, 5, 6, 7, 0, 1, 2]],
          expected: 0,
        },
        {
          id: 3,
          input: "nums = [11,13,15,17]",
          inputArgs: [[11, 13, 15, 17]],
          expected: 11,
        },
      ],
      approach:
        "Use binary search comparing the middle element with the rightmost element. If mid > right, the minimum is in the right half; otherwise, it's in the left half including mid. This identifies which half contains the rotation point.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 33,
      title: "Search in Rotated Sorted Array",
      slug: "search-in-rotated-sorted-array",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/search-in-rotated-sorted-array/",
      description:
        "Given a rotated sorted array of distinct integers and a target value, return the index of target if it is found, or -1 if it is not. You must write an algorithm with O(log n) runtime.",
      functionName: "search",
      starterCode: {
        javascript: "function search(nums, target) {\n  \n}",
        python: "def search(nums, target):\n    pass",
        java: "class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [4,5,6,7,0,1,2], target = 0",
          inputArgs: [[4, 5, 6, 7, 0, 1, 2], 0],
          expected: 4,
        },
        {
          id: 2,
          input: "nums = [4,5,6,7,0,1,2], target = 3",
          inputArgs: [[4, 5, 6, 7, 0, 1, 2], 3],
          expected: -1,
        },
      ],
      approach:
        "Use binary search by first determining which half is sorted. If the left half is sorted and the target falls within it, search left; otherwise search right. Apply the same logic if the right half is sorted. One half is always sorted in a rotated array.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 981,
      title: "Time Based Key-Value Store",
      slug: "time-based-key-value-store",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/time-based-key-value-store/",
      description:
        "Design a time-based key-value data structure that can store multiple values for the same key at different timestamps and retrieve the value at a certain timestamp. Implement the TimeMap class with set(key, value, timestamp) and get(key, timestamp) methods. get should return the value with the largest timestamp <= the given timestamp.",
      functionName: "TimeMap",
      starterCode: {
        javascript:
          "class TimeMap {\n  constructor() {\n    \n  }\n\n  set(key, value, timestamp) {\n    \n  }\n\n  get(key, timestamp) {\n    \n  }\n}",
        python:
          "class TimeMap:\n    def __init__(self):\n        pass\n\n    def set(self, key, value, timestamp):\n        pass\n\n    def get(self, key, timestamp):\n        pass",
        java: "class TimeMap {\n    public TimeMap() {\n        \n    }\n\n    public void set(String key, String value, int timestamp) {\n        \n    }\n\n    public String get(String key, int timestamp) {\n        \n    }\n}",
        cpp: "class TimeMap {\npublic:\n    TimeMap() {\n        \n    }\n\n    void set(string key, string value, int timestamp) {\n        \n    }\n\n    string get(string key, int timestamp) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'set("foo","bar",1), get("foo",1), get("foo",3), set("foo","bar2",4), get("foo",4), get("foo",5)',
          inputArgs: [
            ["set", "get", "get", "set", "get", "get"],
            [
              ["foo", "bar", 1],
              ["foo", 1],
              ["foo", 3],
              ["foo", "bar2", 4],
              ["foo", 4],
              ["foo", 5],
            ],
          ],
          expected: [null, "bar", "bar", null, "bar2", "bar2"],
        },
      ],
      approach:
        "Store values in a HashMap where each key maps to a list of (timestamp, value) pairs. Since timestamps are strictly increasing, use binary search on the list to find the largest timestamp less than or equal to the query timestamp.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 4,
      title: "Median of Two Sorted Arrays",
      slug: "median-of-two-sorted-arrays",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/median-of-two-sorted-arrays/",
      description:
        "Given two sorted arrays nums1 and nums2 of sizes m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log(m+n)).",
      functionName: "findMedianSortedArrays",
      starterCode: {
        javascript:
          "function findMedianSortedArrays(nums1, nums2) {\n  \n}",
        python: "def find_median_sorted_arrays(nums1, nums2):\n    pass",
        java: "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums1 = [1,3], nums2 = [2]",
          inputArgs: [[1, 3], [2]],
          expected: 2.0,
        },
        {
          id: 2,
          input: "nums1 = [1,2], nums2 = [3,4]",
          inputArgs: [[1, 2], [3, 4]],
          expected: 2.5,
        },
      ],
      approach:
        "Binary search on the shorter array to find the correct partition point. The partition divides both arrays such that all elements on the left are less than all elements on the right. Adjust the partition using binary search by comparing boundary elements across the two arrays.",
      timeComplexity: "O(log(min(m, n)))",
      spaceComplexity: "O(1)",
    },
  ],
};
