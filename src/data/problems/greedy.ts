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
      patterns: ["Greedy", "Dynamic Programming", "Array"],
      hints: [
        "Consider: at each index, what's the max-sum subarray ending right here?",
        "If the running sum becomes negative, discard it — it only hurts future sums. Start fresh from the next element.",
        "Track the global max separately. currentSum = max(nums[i], currentSum + nums[i]).",
      ],
      keyIntuition:
        "Kadane's algorithm is a masterclass in locality: you only care about the best subarray ENDING at each position. A negative running total is always worse than starting over. That one observation collapses an O(n²) problem to O(n). The same 'track best-ending-here' view unlocks many variants (max circular subarray, max product, etc.).",
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
      patterns: ["Greedy", "Array", "Dynamic Programming"],
      hints: [
        "You don't need to trace actual jump paths. Just track how far you can possibly reach.",
        "At each index i, if i > maxReach, you're stuck. Otherwise, maxReach = max(maxReach, i + nums[i]).",
        "If you never get stuck and reach the end (or maxReach >= n-1), return true.",
      ],
      keyIntuition:
        "The elegant reframing: don't think about sequences of jumps, think about reachability. A single variable ('farthest reachable index') captures all useful information from the prefix you've seen. If it ever falls behind i, you're stuck. This pattern — collapse all path history into a summary statistic — is a hallmark of greedy thinking.",
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
      patterns: ["Greedy", "Array", "Dynamic Programming", "BFS"],
      hints: [
        "Think of jumps as BFS 'levels'. Each level is the set of positions reachable in k jumps.",
        "Track the end of the CURRENT level (currentEnd) and the farthest seen within it (farthest).",
        "When i reaches currentEnd, you must jump: jumps++, currentEnd = farthest.",
      ],
      keyIntuition:
        "Viewing Jump Game II as implicit BFS is the unlock: the greedy 'extend to farthest and jump' corresponds exactly to BFS level progression. When you 'spend' a jump, you're committing to the best next range, and the greedy provably minimizes jumps. This 'BFS in disguise' shows up in many 'minimum steps' problems where levels can be computed on the fly.",
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
      patterns: ["Greedy", "Array"],
      hints: [
        "If the total gas is less than the total cost, it's impossible. That's the necessary condition.",
        "Walk the stations tracking a running tank. When tank goes negative, no station up to here can be the start.",
        "Reset tank to 0 and set start = i+1. The answer is start when total gas >= total cost.",
      ],
      keyIntuition:
        "Two-part greedy proof: (1) Feasibility — sum(gas) >= sum(cost) is both necessary and sufficient. (2) Optimal start — if the tank goes negative at index i, NO station between the last start and i can work, because even with a full head-start we failed. So skip past i. This 'rule out a whole range in one observation' technique collapses O(n²) to O(n).",
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
      patterns: ["Greedy", "Hash Map", "Sorting"],
      hints: [
        "The smallest remaining card MUST be the start of some group — no other group can include it.",
        "Build a frequency count. Process cards in sorted order (min-heap or sorted iteration).",
        "For each min card with freq > 0, try to decrement counts for [min, min+groupSize-1]. Any missing card → return false.",
      ],
      keyIntuition:
        "When a greedy choice is FORCED, the problem becomes easy. Here, the smallest available card has no choice but to anchor a group. Follow the forced choice, update state, repeat. This 'find the forced move' heuristic applies widely — in Tetris-like stacking, card games, and scheduling with strict constraints.",
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
      patterns: ["Greedy", "Array"],
      hints: [
        "Since merging takes element-wise MAX, a triplet with ANY element > target can never help — including it can only overshoot.",
        "Filter to 'valid' triplets where each component is <= target's component.",
        "Among valid triplets, check if each target component is achieved by some triplet's corresponding component.",
      ],
      keyIntuition:
        "Element-wise max is monotone: including more valid triplets can only INCREASE coordinates. So the best we can do is the element-wise max over all valid triplets — if that equals target, yes; else, no. Recognizing monotone aggregations lets you avoid combinatorial search entirely.",
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
      patterns: ["Greedy", "Hash Map", "Two Pointers", "String"],
      hints: [
        "A partition must be self-contained: every character in it must have its last occurrence inside it.",
        "Precompute last[c] = last index of character c in s.",
        "Scan with a current-partition end pointer. Extend it to max(end, last[s[i]]). When i == end, close the partition.",
      ],
      keyIntuition:
        "The trick: once you know each character's last occurrence, greedy extension works perfectly. The current partition 'grows' to accommodate whatever letter it contains. When the pointer catches up to the extended end, the partition is closed. This 'precompute last-positions, then greedy-extend' pattern solves many partitioning / contiguous-grouping problems.",
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
      patterns: ["Greedy", "Stack", "String"],
      hints: [
        "Track a RANGE of possible open-parenthesis counts instead of committing each '*'.",
        "'(' → both low and high ++. ')' → both --. '*' → low-- and high++ (low floors at 0).",
        "If high ever < 0, too many ')'. Valid iff low == 0 at the end.",
      ],
      keyIntuition:
        "The stroke of genius: since '*' has three interpretations, maintain the whole interval [low, high] of possible open counts and let each token update that interval. Any valid final assignment exists iff 0 lies in the final range — and that's equivalent to low == 0. This 'range of possibilities' trick avoids exponential branching and is a classic in ambiguous-parsing problems.",
      approach:
        "Track the range of possible open parenthesis counts using two variables: low and high. '(' increments both, ')' decrements both, '*' increments high and decrements low (clamp low at 0). The string is valid if low reaches 0.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
  ],
};
