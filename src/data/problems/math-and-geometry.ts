import { Category } from "../types";

export const mathAndGeometry: Category = {
  name: "Math & Geometry",
  slug: "math-and-geometry",
  problems: [
    {
      id: 48,
      title: "Rotate Image",
      slug: "rotate-image",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/rotate-image/",
      description:
        "Given an n x n 2D matrix representing an image, rotate the image by 90 degrees clockwise in-place.",
      functionName: "rotate",
      starterCode: {
        javascript: "function rotate(matrix) {\n  \n}",
        python: "def rotate(matrix):\n    pass",
        java: "class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          inputArgs: [
            [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ],
          ],
          expected: [
            [7, 4, 1],
            [8, 5, 2],
            [9, 6, 3],
          ],
        },
      ],
      approach:
        "Rotate the matrix 90 degrees clockwise in-place by first transposing the matrix (swap rows and columns), then reversing each row. This two-step process achieves the rotation without extra space.",
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
    },
    {
      id: 54,
      title: "Spiral Matrix",
      slug: "spiral-matrix",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/spiral-matrix/",
      description:
        "Given an m x n matrix, return all elements of the matrix in spiral order.",
      functionName: "spiralOrder",
      starterCode: {
        javascript: "function spiralOrder(matrix) {\n  \n}",
        python: "def spiral_order(matrix):\n    pass",
        java: "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
          inputArgs: [
            [
              [1, 2, 3],
              [4, 5, 6],
              [7, 8, 9],
            ],
          ],
          expected: [1, 2, 3, 6, 9, 8, 7, 4, 5],
        },
      ],
      approach:
        "Traverse the matrix layer by layer, maintaining four boundaries (top, bottom, left, right). Process each layer by traversing right, down, left, then up, shrinking the boundaries after each direction.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 73,
      title: "Set Matrix Zeroes",
      slug: "set-matrix-zeroes",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
      description:
        "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0. Do it in-place.",
      functionName: "setZeroes",
      starterCode: {
        javascript: "function setZeroes(matrix) {\n  \n}",
        python: "def set_zeroes(matrix):\n    pass",
        java: "class Solution {\n    public void setZeroes(int[][] matrix) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
          inputArgs: [
            [
              [1, 1, 1],
              [1, 0, 1],
              [1, 1, 1],
            ],
          ],
          expected: [
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1],
          ],
        },
      ],
      approach:
        "Use the first row and first column as markers. First pass: scan the matrix and mark the first cell of the corresponding row and column when a zero is found. Second pass: zero out cells based on markers. Handle the first row and column separately.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 202,
      title: "Happy Number",
      slug: "happy-number",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/happy-number/",
      description:
        "Determine if a number n is happy. A happy number is defined by repeatedly replacing the number with the sum of the squares of its digits until it equals 1, or loops endlessly in a cycle that does not include 1.",
      functionName: "isHappy",
      starterCode: {
        javascript: "function isHappy(n) {\n  \n}",
        python: "def is_happy(n):\n    pass",
        java: "class Solution {\n    public boolean isHappy(int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isHappy(int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 19",
          inputArgs: [19],
          expected: true,
        },
        {
          id: 2,
          input: "n = 2",
          inputArgs: [2],
          expected: false,
        },
      ],
      approach:
        "Compute the sum of squares of digits repeatedly. Use Floyd's cycle detection (fast/slow pointers) to detect if the sequence enters a cycle. If the sequence reaches 1, the number is happy; if it cycles, it is not.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 66,
      title: "Plus One",
      slug: "plus-one",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/plus-one/",
      description:
        "Given a large integer represented as an integer array digits, where each element is a digit, increment the large integer by one and return the resulting array of digits.",
      functionName: "plusOne",
      starterCode: {
        javascript: "function plusOne(digits) {\n  \n}",
        python: "def plus_one(digits):\n    pass",
        java: "class Solution {\n    public int[] plusOne(int[] digits) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "digits = [1,2,3]",
          inputArgs: [[1, 2, 3]],
          expected: [1, 2, 4],
        },
        {
          id: 2,
          input: "digits = [4,3,2,1]",
          inputArgs: [[4, 3, 2, 1]],
          expected: [4, 3, 2, 2],
        },
        {
          id: 3,
          input: "digits = [9]",
          inputArgs: [[9]],
          expected: [1, 0],
        },
      ],
      approach:
        "Start from the last digit and add 1. Handle carry: if a digit becomes 10, set it to 0 and carry 1 to the next position. If carry remains after processing all digits, prepend 1 to the array.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 50,
      title: "Pow(x, n)",
      slug: "powx-n",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/powx-n/",
      description:
        "Implement pow(x, n), which calculates x raised to the power n.",
      functionName: "myPow",
      starterCode: {
        javascript: "function myPow(x, n) {\n  \n}",
        python: "def my_pow(x, n):\n    pass",
        java: "class Solution {\n    public double myPow(double x, int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    double myPow(double x, int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "x = 2.0, n = 10",
          inputArgs: [2.0, 10],
          expected: 1024.0,
        },
        {
          id: 2,
          input: "x = 2.1, n = 3",
          inputArgs: [2.1, 3],
          expected: 9.261,
        },
        {
          id: 3,
          input: "x = 2.0, n = -2",
          inputArgs: [2.0, -2],
          expected: 0.25,
        },
      ],
      approach:
        "Use fast exponentiation (binary exponentiation). If n is even, x^n = (x^(n/2))^2. If n is odd, x^n = x * x^(n-1). Handle negative n by computing 1/x^(-n). This reduces the number of multiplications to O(log n).",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 43,
      title: "Multiply Strings",
      slug: "multiply-strings",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/multiply-strings/",
      description:
        "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string. You must not use any built-in BigInteger library or convert the inputs to integer directly.",
      functionName: "multiply",
      starterCode: {
        javascript: "function multiply(num1, num2) {\n  \n}",
        python: "def multiply(num1, num2):\n    pass",
        java: "class Solution {\n    public String multiply(String num1, String num2) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    string multiply(string num1, string num2) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'num1 = "2", num2 = "3"',
          inputArgs: ["2", "3"],
          expected: "6",
        },
        {
          id: 2,
          input: 'num1 = "123", num2 = "456"',
          inputArgs: ["123", "456"],
          expected: "56088",
        },
      ],
      approach:
        "Simulate grade-school multiplication. Create a result array of length m+n. For each digit pair, multiply and add to the corresponding position in the result array, handling carries. Convert the result array to a string.",
      timeComplexity: "O(m*n)",
      spaceComplexity: "O(m+n)",
    },
    {
      id: 2013,
      title: "Detect Squares",
      slug: "detect-squares",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/detect-squares/",
      description:
        "Design a data structure that supports adding points on the X-Y plane and counting the number of ways to form axis-aligned squares with a given query point.",
      functionName: "DetectSquares",
      starterCode: {
        javascript:
          "class DetectSquares {\n  constructor() {\n    \n  }\n\n  add(point) {\n    \n  }\n\n  count(point) {\n    \n  }\n}",
        python:
          "class DetectSquares:\n    def __init__(self):\n        pass\n\n    def add(self, point):\n        pass\n\n    def count(self, point):\n        pass",
        java: "class DetectSquares {\n    public DetectSquares() {\n        \n    }\n\n    public void add(int[] point) {\n        \n    }\n\n    public int count(int[] point) {\n        \n    }\n}",
        cpp: "class DetectSquares {\npublic:\n    DetectSquares() {\n        \n    }\n\n    void add(vector<int> point) {\n        \n    }\n\n    int count(vector<int> point) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            '["DetectSquares","add","add","add","count","count","add","count"]',
          inputArgs: [
            ["DetectSquares", "add", "add", "add", "count", "count", "add", "count"],
            [[], [[3, 10]], [[11, 1]], [[3, 1]], [[11, 10]], [[14, 8]], [[11, 10]], [[11, 10]]],
          ],
          expected: [null, null, null, null, 1, 0, null, 2],
        },
      ],
      approach:
        "Store point counts in a HashMap. For a query point, enumerate all points with the same x-coordinate. For each such point, compute the side length and check if the two other corners of the axis-aligned square exist. Count valid squares.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  ],
};
