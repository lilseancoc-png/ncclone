import { Category } from "../types";

export const bitManipulation: Category = {
  name: "Bit Manipulation",
  slug: "bit-manipulation",
  problems: [
    {
      id: 136,
      title: "Single Number",
      slug: "single-number",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/single-number/",
      description:
        "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. You must implement a solution with linear runtime and constant extra space.",
      functionName: "singleNumber",
      starterCode: {
        javascript: "function singleNumber(nums) {\n  \n}",
        python: "def single_number(nums):\n    pass",
        java: "class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [2,2,1]",
          inputArgs: [[2, 2, 1]],
          expected: 1,
        },
        {
          id: 2,
          input: "nums = [4,1,2,1,2]",
          inputArgs: [[4, 1, 2, 1, 2]],
          expected: 4,
        },
      ],
      patterns: ["Bit Manipulation", "Array", "XOR"],
      hints: [
        "The constant-space requirement rules out hash sets. Think about an operation that pairs cancel under.",
        "XOR has two magical properties: a ^ a = 0 (self-inverse) and a ^ 0 = a (identity). Order doesn't matter.",
        "XOR every element together. Duplicates cancel to 0, and the lone element XORs with 0 to itself.",
      ],
      keyIntuition:
        "XOR is the 'toggle' operator — applying it twice cancels itself. That self-inverse property is the secret behind many bit tricks: missing number, swapping variables without a temp, finding pair differences. Once you recognize 'things appearing in pairs cancel,' you can solve a whole family of problems in O(1) space.",
      approach:
        "XOR all numbers together. Since XOR is self-inverse (a ^ a = 0) and commutative, all paired numbers cancel out, leaving only the single unpaired number.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 191,
      title: "Number of 1 Bits",
      slug: "number-of-1-bits",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/number-of-1-bits/",
      description:
        "Given a positive integer n, return the number of set bits (1-bits) in its binary representation (also known as the Hamming weight).",
      functionName: "hammingWeight",
      starterCode: {
        javascript: "function hammingWeight(n) {\n  \n}",
        python: "def hamming_weight(n):\n    pass",
        java: "class Solution {\n    public int hammingWeight(int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int hammingWeight(uint32_t n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 11",
          inputArgs: [11],
          expected: 3,
        },
        {
          id: 2,
          input: "n = 128",
          inputArgs: [128],
          expected: 1,
        },
        {
          id: 3,
          input: "n = 2147483645",
          inputArgs: [2147483645],
          expected: 30,
        },
      ],
      patterns: ["Bit Manipulation", "Brian Kernighan's Algorithm"],
      hints: [
        "The naive way is to check each of the 32 bits with n & 1 then shift. Works but always 32 iterations.",
        "Brian Kernighan's insight: n & (n-1) flips the lowest 1-bit to 0. So you only loop as many times as there are set bits.",
        "Initialize count = 0. While n != 0: n = n & (n-1); count++. Return count.",
      ],
      keyIntuition:
        "n-1 flips the lowest 1-bit and every 0 below it. ANDing with n keeps everything above that bit unchanged but clears the low region — effectively erasing exactly one 1-bit per step. This 'lowest set bit' manipulation underlies many advanced data structures (Fenwick trees, bitmask DP). Understanding why n & (n-1) works is the gateway to thinking in bits.",
      approach:
        "Use Brian Kernighan's trick: n & (n-1) clears the lowest set bit. Count how many times this operation can be applied until n becomes 0. Each iteration removes exactly one 1-bit.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 338,
      title: "Counting Bits",
      slug: "counting-bits",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/counting-bits/",
      description:
        "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
      functionName: "countBits",
      starterCode: {
        javascript: "function countBits(n) {\n  \n}",
        python: "def count_bits(n):\n    pass",
        java: "class Solution {\n    public int[] countBits(int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> countBits(int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 2",
          inputArgs: [2],
          expected: [0, 1, 1],
        },
        {
          id: 2,
          input: "n = 5",
          inputArgs: [5],
          expected: [0, 1, 1, 2, 1, 2],
        },
      ],
      patterns: ["Bit Manipulation", "Dynamic Programming"],
      hints: [
        "Naive: call popcount on each i. Works in O(n log n), but we can do better by reusing prior answers.",
        "Any number i has the same bits as i/2 (right-shifted) plus its last bit (i & 1).",
        "Build dp[0..n] bottom-up: dp[i] = dp[i >> 1] + (i & 1). One pass, O(n).",
      ],
      keyIntuition:
        "This is DP over bit structure: a number's popcount decomposes into (everything except last bit) + (last bit). The key pattern — 'a number = smaller number shifted + extra info' — appears everywhere in number theory, tree indexing (heap parent = i/2), and Fenwick trees. Spotting that a bit operation creates a recurrence unlocks a whole family of linear-time algorithms.",
      approach:
        "Use DP: dp[i] = dp[i >> 1] + (i & 1). The number of 1-bits in i equals the number of 1-bits in i/2 (right shift) plus whether the last bit is 1. This builds on previously computed results.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 190,
      title: "Reverse Bits",
      slug: "reverse-bits",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/reverse-bits/",
      description:
        "Reverse the bits of a given 32-bit unsigned integer.",
      functionName: "reverseBits",
      starterCode: {
        javascript: "function reverseBits(n) {\n  \n}",
        python: "def reverse_bits(n):\n    pass",
        java: "class Solution {\n    public int reverseBits(int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    uint32_t reverseBits(uint32_t n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 43261596",
          inputArgs: [43261596],
          expected: 964176192,
        },
        {
          id: 2,
          input: "n = 4294967293",
          inputArgs: [4294967293],
          expected: 3221225471,
        },
      ],
      patterns: ["Bit Manipulation", "Divide and Conquer"],
      hints: [
        "You need to swap the i-th bit with the (31-i)-th bit. Think of it as building the reversed number one bit at a time.",
        "Loop 32 times. Each iteration: shift result left by 1, OR in the LSB of n (n & 1), then shift n right by 1.",
        "For a fun optimization: swap groups of bits using masks — halves, then quarters, then bytes, then nibbles — in O(log 32) = 5 ops total.",
      ],
      keyIntuition:
        "Reversing bits is a 'build it as you destroy it' pattern: each bit popped off n is pushed onto result, mirroring a stack. The divide-and-conquer mask trick (swap 16/16, then 8/8, then 4/4...) shows how bit operations can parallelize at the word level — the same idea that powers population count, endianness swapping, and SIMD-style tricks.",
      approach:
        "Process the input bit by bit, shifting the result left and adding the least significant bit of n. Shift n right each iteration. After 32 iterations, all bits are reversed.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
    },
    {
      id: 268,
      title: "Missing Number",
      slug: "missing-number",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/missing-number/",
      description:
        "Given an array nums containing n distinct numbers in the range [0, n], return the one number in the range that is missing from the array.",
      functionName: "missingNumber",
      starterCode: {
        javascript: "function missingNumber(nums) {\n  \n}",
        python: "def missing_number(nums):\n    pass",
        java: "class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [3,0,1]",
          inputArgs: [[3, 0, 1]],
          expected: 2,
        },
        {
          id: 2,
          input: "nums = [0,1]",
          inputArgs: [[0, 1]],
          expected: 2,
        },
        {
          id: 3,
          input: "nums = [9,6,4,2,3,5,7,0,1]",
          inputArgs: [[9, 6, 4, 2, 3, 5, 7, 0, 1]],
          expected: 8,
        },
      ],
      patterns: ["Bit Manipulation", "Array", "Math", "XOR"],
      hints: [
        "Sorting gives O(n log n). A hash set gives O(n) time but O(n) space. Both work but can be beaten.",
        "Sum approach: expected sum = n*(n+1)/2. Missing = expected - actual sum.",
        "XOR approach: XOR all indices 0..n and all array values together. Every pair cancels, the missing number survives. Immune to overflow.",
      ],
      keyIntuition:
        "Two elegant paths lead to O(n)/O(1): Gauss's sum formula and XOR pairing. Both exploit a symmetry — the missing number is the unique element that fails to cancel against its partner. The XOR version is stronger because it survives integer overflow. Recognizing when a problem reduces to 'find the asymmetry in a supposedly symmetric pairing' is a repeating theme in competitive programming.",
      approach:
        "XOR all numbers from 0 to n with all numbers in the array. All paired numbers cancel out, leaving only the missing number. Alternatively, use the sum formula n*(n+1)/2 minus the array sum.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 371,
      title: "Sum of Two Integers",
      slug: "sum-of-two-integers",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/sum-of-two-integers/",
      description:
        "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
      functionName: "getSum",
      starterCode: {
        javascript: "function getSum(a, b) {\n  \n}",
        python: "def get_sum(a, b):\n    pass",
        java: "class Solution {\n    public int getSum(int a, int b) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int getSum(int a, int b) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "a = 1, b = 2",
          inputArgs: [1, 2],
          expected: 3,
        },
        {
          id: 2,
          input: "a = 2, b = 3",
          inputArgs: [2, 3],
          expected: 5,
        },
      ],
      patterns: ["Bit Manipulation", "Math"],
      hints: [
        "Addition in hardware uses two pieces: the partial sum and the carry. You need to simulate both with bitwise ops.",
        "XOR = addition without carry. AND << 1 = the carry that should propagate left.",
        "Loop: while b != 0, (a, b) = (a ^ b, (a & b) << 1). When carry is 0, a holds the sum.",
      ],
      keyIntuition:
        "This problem shows you how addition works under the hood: XOR handles bits where exactly one operand is 1, AND-shift handles the carry from both being 1. Iterating until the carry is zero is exactly what a ripple-carry adder does in a CPU. Thinking at this level — arithmetic from Boolean gates — connects algorithms to digital logic and is fundamental to systems programming.",
      approach:
        "Use bit manipulation: XOR gives the sum without carry, AND shifted left gives the carry. Repeat until there's no carry. Handle negative numbers carefully with 32-bit masking.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
    },
    {
      id: 7,
      title: "Reverse Integer",
      slug: "reverse-integer",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/reverse-integer/",
      description:
        "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range, then return 0.",
      functionName: "reverse",
      starterCode: {
        javascript: "function reverse(x) {\n  \n}",
        python: "def reverse(x):\n    pass",
        java: "class Solution {\n    public int reverse(int x) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int reverse(int x) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "x = 123",
          inputArgs: [123],
          expected: 321,
        },
        {
          id: 2,
          input: "x = -123",
          inputArgs: [-123],
          expected: -321,
        },
        {
          id: 3,
          input: "x = 120",
          inputArgs: [120],
          expected: 21,
        },
      ],
      patterns: ["Math", "Bit Manipulation"],
      hints: [
        "Extract digits from the right using x % 10 and shed them with x = x / 10. Build the result by result = result * 10 + digit.",
        "The trap: 32-bit overflow. INT_MAX = 2^31 - 1 = 2147483647. Once result exceeds INT_MAX/10, the next multiplication will overflow.",
        "Before result = result * 10 + digit: check if result > INT_MAX/10 (overflow) or result == INT_MAX/10 and digit > 7 (boundary). Mirror for negative.",
      ],
      keyIntuition:
        "The algorithm (pop last digit, push onto result) is trivial — the real lesson is overflow-safe arithmetic. Instead of detecting overflow after it happens (too late in languages without big-int), predict it by comparing against INT_MAX/10 before multiplying. This 'check before you multiply' pattern is essential for parsing integers, implementing atoi, and any bounded-precision numeric code.",
      approach:
        "Build the reversed number digit by digit using modulo 10 to extract the last digit and integer division to remove it. Check for 32-bit integer overflow before each multiplication by 10. Return 0 if overflow would occur.",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
    },
  ],
};
