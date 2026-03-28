import { Category } from "../types";

export const greedy: Category = {
  name: "Greedy",
  slug: "greedy",
  problems: [
    {
      id: 53,
      title: "Maximum Subarray",
      slug: "maximum-subarray",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
      description:
        "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
      functionName: "maxSubArray",
      starterCode: {
        javascript: "function maxSubArray(nums) {\n  \n}",
        python: "def max_sub_array(nums):\n    pass",
        java: "class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
          inputArgs: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
          expected: 6,
        },
        {
          id: 2,
          input: "nums = [1]",
          inputArgs: [[1]],
          expected: 1,
        },
        {
          id: 3,
          input: "nums = [5,4,-1,7,8]",
          inputArgs: [[5, 4, -1, 7, 8]],
          expected: 23,
        },
      ],
      approach:
        "Use Kadane's algorithm: maintain a running sum and reset it to the current element whenever it drops below zero. Track the maximum sum seen. The key insight is that a negative running sum can never help a future subarray.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 55,
      title: "Jump Game",
      slug: "jump-game",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/jump-game/",
      description:
        "Given an integer array nums where each element represents the maximum jump length from that position, determine if you can reach the last index starting from the first index.",
      functionName: "canJump",
      starterCode: {
        javascript: "function canJump(nums) {\n  \n}",
        python: "def can_jump(nums):\n    pass",
        java: "class Solution {\n    public boolean canJump(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [2,3,1,1,4]",
          inputArgs: [[2, 3, 1, 1, 4]],
          expected: true,
        },
        {
          id: 2,
          input: "nums = [3,2,1,0,4]",
          inputArgs: [[3, 2, 1, 0, 4]],
          expected: false,
        },
      ],
      approach:
        "Greedily track the farthest reachable index. Iterate through the array; at each position, update the farthest reach. If the current index exceeds the farthest reach, the end is unreachable.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 45,
      title: "Jump Game II",
      slug: "jump-game-ii",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/jump-game-ii/",
      description:
        "Given an integer array nums where each element represents the maximum jump length from that position, return the minimum number of jumps to reach the last index. You can always reach the last index.",
      functionName: "jump",
      starterCode: {
        javascript: "function jump(nums) {\n  \n}",
        python: "def jump(nums):\n    pass",
        java: "class Solution {\n    public int jump(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [2,3,1,1,4]",
          inputArgs: [[2, 3, 1, 1, 4]],
          expected: 2,
        },
        {
          id: 2,
          input: "nums = [2,3,0,1,4]",
          inputArgs: [[2, 3, 0, 1, 4]],
          expected: 2,
        },
      ],
      approach:
        "Use a BFS-style greedy approach. Track the current range boundary and the farthest reachable from that range. When you reach the boundary, increment jumps and extend to the farthest point.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 134,
      title: "Gas Station",
      slug: "gas-station",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/gas-station/",
      description:
        "There are n gas stations along a circular route. Given arrays gas and cost, return the starting gas station index if you can travel around the circuit once clockwise, or -1 if it is impossible.",
      functionName: "canCompleteCircuit",
      starterCode: {
        javascript: "function canCompleteCircuit(gas, cost) {\n  \n}",
        python: "def can_complete_circuit(gas, cost):\n    pass",
        java: "class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
          inputArgs: [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]],
          expected: 3,
        },
        {
          id: 2,
          input: "gas = [2,3,4], cost = [3,4,3]",
          inputArgs: [[2, 3, 4], [3, 4, 3]],
          expected: -1,
        },
      ],
      approach:
        "If total gas >= total cost, a solution exists. Track the current tank surplus; whenever it drops below zero, the starting station must be after this point. Reset the start to the next station and continue.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 846,
      title: "Hand of Straights",
      slug: "hand-of-straights",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/hand-of-straights/",
      description:
        "Given an array of integers hand and an integer groupSize, return true if the cards can be rearranged into groups of consecutive cards of the given size.",
      functionName: "isNStraightHand",
      starterCode: {
        javascript: "function isNStraightHand(hand, groupSize) {\n  \n}",
        python: "def is_n_straight_hand(hand, group_size):\n    pass",
        java: "class Solution {\n    public boolean isNStraightHand(int[] hand, int groupSize) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isNStraightHand(vector<int>& hand, int groupSize) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3",
          inputArgs: [[1, 2, 3, 6, 2, 3, 4, 7, 8], 3],
          expected: true,
        },
        {
          id: 2,
          input: "hand = [1,2,3,4,5], groupSize = 4",
          inputArgs: [[1, 2, 3, 4, 5], 4],
          expected: false,
        },
      ],
      approach:
        "Sort the cards and use a frequency map. For each unprocessed smallest card, try to form a consecutive group of the required size. If any card in the sequence is missing, return false.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 1899,
      title: "Merge Triplets to Form Target Triplet",
      slug: "merge-triplets-to-form-target-triplet",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/merge-triplets-to-form-target-triplet/",
      description:
        "Given a 2D array of triplets and a target triplet, return true if it is possible to obtain the target by selecting some triplets and taking the element-wise maximum.",
      functionName: "mergeTriplets",
      starterCode: {
        javascript: "function mergeTriplets(triplets, target) {\n  \n}",
        python: "def merge_triplets(triplets, target):\n    pass",
        java: "class Solution {\n    public boolean mergeTriplets(int[][] triplets, int[] target) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]",
          inputArgs: [
            [
              [2, 5, 3],
              [1, 8, 4],
              [1, 7, 5],
            ],
            [2, 7, 5],
          ],
          expected: true,
        },
        {
          id: 2,
          input: "triplets = [[3,4,5],[4,5,6]], target = [3,2,5]",
          inputArgs: [
            [
              [3, 4, 5],
              [4, 5, 6],
            ],
            [3, 2, 5],
          ],
          expected: false,
        },
      ],
      approach:
        "Filter out triplets where any value exceeds the corresponding target value (they can never contribute). From the remaining valid triplets, check if we can achieve each target value independently by taking the maximum across valid triplets.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 763,
      title: "Partition Labels",
      slug: "partition-labels",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/partition-labels/",
      description:
        "Given a string s, partition it into as many parts as possible so that each letter appears in at most one part. Return a list of the sizes of these parts.",
      functionName: "partitionLabels",
      starterCode: {
        javascript: "function partitionLabels(s) {\n  \n}",
        python: "def partition_labels(s):\n    pass",
        java: "class Solution {\n    public List<Integer> partitionLabels(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "ababcbacadefegdehijhklij"',
          inputArgs: ["ababcbacadefegdehijhklij"],
          expected: [9, 7, 8],
        },
        {
          id: 2,
          input: 's = "eccbbbbdec"',
          inputArgs: ["eccbbbbdec"],
          expected: [10],
        },
      ],
      approach:
        "First, record the last occurrence of each character. Then iterate through the string, extending the current partition's end to the max last occurrence of any character within it. When the current index reaches the partition end, close the partition.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 678,
      title: "Valid Parenthesis String",
      slug: "valid-parenthesis-string",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/valid-parenthesis-string/",
      description:
        "Given a string s containing only '(', ')' and '*', where '*' can be treated as '(', ')' or an empty string, return true if s is valid.",
      functionName: "checkValidString",
      starterCode: {
        javascript: "function checkValidString(s) {\n  \n}",
        python: "def check_valid_string(s):\n    pass",
        java: "class Solution {\n    public boolean checkValidString(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool checkValidString(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "()"',
          inputArgs: ["()"],
          expected: true,
        },
        {
          id: 2,
          input: 's = "(*)"',
          inputArgs: ["(*)"],
          expected: true,
        },
        {
          id: 3,
          input: 's = "(*)))"',
          inputArgs: ["(*)))"],
          expected: false,
        },
      ],
      approach:
        "Track the range of possible open parenthesis counts using two variables: low and high. '(' increments both, ')' decrements both, '*' increments high and decrements low (clamp low at 0). The string is valid if low reaches 0.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
  ],
};
