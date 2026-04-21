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
      patterns: ["Matrix", "Math", "In-Place"],
      hints: [
        "Rotation sends (i, j) to (j, n-1-i). In-place is the tricky part — you can't just write to a new grid.",
        "Decompose the rotation: transpose (swap across the main diagonal) then reverse each row. Two simple passes, no allocation.",
        "Alternative layer-by-layer rotation: swap 4 corners at a time, moving inward. Both work; the transpose+reverse is easier to get right.",
      ],
      keyIntuition:
        "Any rotation/reflection of a square matrix can be decomposed into simpler in-place operations. Transpose + reverse-rows = 90° CW; transpose + reverse-cols = 90° CCW; reverse both = 180°. This decomposition trick — building a complex transform from commuting simple ones — appears in linear algebra, graphics, and image processing. The lesson: even 'in-place' problems often have a two-pass solution that's cleaner than the one-pass cleverness.",
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
      patterns: ["Matrix", "Simulation"],
      hints: [
        "Walk the boundary, peel it off, recurse on the inner matrix. Use four bounds: top, bottom, left, right.",
        "In each ring: go right along top, down along right, left along bottom (if top < bottom), up along left (if left < right). Shrink bounds after each side.",
        "Off-by-one trap: always check top <= bottom and left <= right after shrinking — a single row or column needs special handling.",
      ],
      keyIntuition:
        "Spiral traversal is a bounded simulation: you mimic the physical act of unwinding. The hardest part isn't the movement — it's terminating correctly when rows and columns aren't equal. Maintaining explicit bounds (vs. tracking direction changes) is the more robust template. This 'peel-the-onion' pattern reappears in problems involving nested shells, BFS by distance, and convex hull layers.",
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
      patterns: ["Matrix", "Hash Set", "In-Place"],
      hints: [
        "Naive: two sets tracking zero rows and zero cols. O(m+n) space. Can we do O(1) extra space?",
        "Use the matrix itself as storage. Use row 0 and column 0 as flags: if matrix[i][j] == 0, set matrix[i][0] = matrix[0][j] = 0.",
        "Trap: row 0 and col 0 are both used as flags AND need to be zeroed themselves. Track their fate in two separate boolean variables before overwriting them.",
      ],
      keyIntuition:
        "The elegant move is using the matrix as its own scratchpad — storing metadata in cells that'll be overwritten anyway. This 'data as flag' trick recurs when you need O(1) auxiliary memory: encoding two pieces of state per cell (via sign bits, sentinel values, or repurposing existing cells). The tricky part is order of operations: you must process dependents before overwriting the markers.",
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
      patterns: ["Math", "Fast & Slow Pointers", "Hash Set", "Cycle Detection"],
      hints: [
        "The sequence either reaches 1 or enters a cycle. You need to detect which.",
        "Approach 1: hash set of seen values. If you see one again, it's a cycle → false. If you see 1, return true.",
        "Approach 2: Floyd's cycle detection. Treat the digit-square-sum as a function f(n). Run slow = f(n), fast = f(f(n)) until they meet. If they meet at 1, happy; else cycle.",
      ],
      keyIntuition:
        "This problem secretly reuses Linked List Cycle. Any deterministic function f(x) that maps a finite range to itself eventually cycles — that's the pigeonhole principle. Detecting the cycle with fast/slow pointers works because the iteration sequence is structurally identical to a linked list. Recognizing when an iterative process is 'a linked list in disguise' is a powerful reframing technique across number theory and graph problems.",
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
      patterns: ["Array", "Math", "Simulation"],
      hints: [
        "Walk digits from right to left simulating addition. The only carry source is adding 1 to 9 → 10.",
        "If digit < 9, just increment and return. Otherwise set to 0 and continue left.",
        "If you exit the loop still carrying, the input was all 9s. Prepend a 1: e.g., [9,9,9] → [1,0,0,0].",
      ],
      keyIntuition:
        "Despite its simplicity, plus-one teaches the carry-propagation pattern that generalizes to big-integer arithmetic, binary addition, and string-number operations. The key observation — carry only travels as far as the first non-9 digit — saves you from thinking you need a full-width ripple. Cleanly handling the 'all 9s → grow the array' edge case is the hallmark of bug-free arithmetic code.",
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
      patterns: ["Math", "Recursion", "Binary Exponentiation", "Divide and Conquer"],
      hints: [
        "Linear n multiplications gives O(n). Exploit that x^n = (x^(n/2))^2 when n is even — each halving doubles the exponent reached.",
        "Recursive: if n == 0 return 1. If n is even, half = myPow(x, n/2); return half * half. If n is odd, return x * myPow(x, n-1).",
        "Edge cases: handle n < 0 by computing myPow(1/x, -n). Watch for INT_MIN, where -n overflows.",
      ],
      keyIntuition:
        "Binary exponentiation is the 'square-and-multiply' approach: each step squares the base, corresponding to doubling the exponent. Reading the binary representation of n tells you which squared bases to include. This O(log n) technique extends to matrix exponentiation (for linear recurrences like Fibonacci), modular exponentiation (cryptography), and monoid fast-power (any associative operation).",
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
      patterns: ["Math", "String", "Simulation"],
      hints: [
        "Simulate long multiplication from grade school. Result has at most len(num1) + len(num2) digits.",
        "Key insight: num1[i] * num2[j] contributes to result positions i+j (carry) and i+j+1 (digit). Pre-allocate a result array of that size.",
        "After accumulating all digit products, walk left-to-right applying carries. Strip leading zero(s) at the end. Special case: either operand is '0' returns '0'.",
      ],
      keyIntuition:
        "This implements what a CPU does when you multiply without hardware multipliers: accumulate partial products at the right positions. The insight 'digit at position i * digit at position j lands at positions i+j and i+j+1' is a tiny but profound claim that underlies polynomial multiplication, FFT-based big-integer math, and convolution. Master this and you're ready for arbitrary-precision arithmetic.",
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
      runner: { kind: "class-ops", className: "DetectSquares" },
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
      patterns: ["Hash Map", "Geometry", "Counting", "Design"],
      hints: [
        "For an axis-aligned square, fixing two opposite corners determines the other two. Iterate candidates instead of all 4-tuples.",
        "Strategy: for query point (qx, qy), find every stored point (qx, y) on the same vertical line. Side length = |y - qy|.",
        "The other two corners are at (qx + side, qy) and (qx + side, y), or (qx - side, qy) and (qx - side, y). Multiply counts from the hash map (duplicates supported).",
      ],
      keyIntuition:
        "The clever framing: rather than searching over 4-tuples (O(n^4)), iterate one axis (same x as query) and derive the other two corners. This reduction — 'lock one dimension, derive the rest' — is a go-to trick in computational geometry for counting shapes. Storing points as (point → count) rather than a set lets duplicate points legitimately form multiple squares, which is a common spec twist to watch for.",
      approach:
        "Store point counts in a HashMap. For a query point, enumerate all points with the same x-coordinate. For each such point, compute the side length and check if the two other corners of the axis-aligned square exist. Count valid squares.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  ],
};
