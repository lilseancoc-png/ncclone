import { Category } from "../types";

export const heapPriorityQueue: Category = {
  name: "Heap / Priority Queue",
  slug: "heap-priority-queue",
  problems: [
    {
      id: 703,
      title: "Kth Largest Element in a Stream",
      slug: "kth-largest-element-in-a-stream",
      difficulty: "Easy",
      leetcodeUrl:
        "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
      description:
        "Design a class that finds the kth largest element in a stream of numbers. Implement a constructor that accepts an integer k and an initial array, and an add method that accepts a new value and returns the kth largest element.",
      functionName: "KthLargest",
      runner: { kind: "class-ops", className: "KthLargest" },
      starterCode: {
        javascript:
          "class KthLargest {\n  constructor(k, nums) {\n    \n  }\n\n  add(val) {\n    \n  }\n}",
        python:
          "class KthLargest:\n    def __init__(self, k, nums):\n        pass\n\n    def add(self, val):\n        pass",
        java: "class KthLargest {\n    public KthLargest(int k, int[] nums) {\n        \n    }\n\n    public int add(int val) {\n        \n    }\n}",
        cpp: "class KthLargest {\npublic:\n    KthLargest(int k, vector<int>& nums) {\n        \n    }\n\n    int add(int val) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'operations: ["KthLargest","add","add","add","add","add"], args: [[3,[4,5,8,2]],[3],[5],[10],[9],[4]]',
          inputArgs: [
            ["KthLargest", "add", "add", "add", "add", "add"],
            [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]],
          ],
          expected: [null, 4, 5, 5, 8, 8],
        },
      ],
      patterns: ["Heap", "Design"],
      hints: [
        "You only need to track the top k elements. Anything smaller doesn't matter.",
        "Use a MIN heap of size k. The MIN-heap root is the kth largest among those top k (everything below it is smaller).",
        "On add: push; if size > k, pop. Return the root.",
      ],
      keyIntuition:
        "Counterintuitive but crucial: to find the kth LARGEST, use a MIN heap. The min heap's root is the smallest of the k-best, which is exactly the kth largest overall. This inversion ('largest k' ↔ 'min heap') is fundamental — any 'top k' streaming problem uses it. A max heap would give you the largest, not the kth; size-bounded min heap is the right tool.",
      approach:
        "Maintain a min heap of size k. The root of the heap is always the kth largest element. When adding a new element, push it to the heap and pop if the size exceeds k.",
      timeComplexity: "O(log k)",
      spaceComplexity: "O(k)",
    },
    {
      id: 1046,
      title: "Last Stone Weight",
      slug: "last-stone-weight",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/last-stone-weight/",
      description:
        "You have a collection of stones, each with a positive integer weight. On each turn, pick the two heaviest stones and smash them together. If they have equal weight, both are destroyed; otherwise the lighter one is destroyed and the heavier one loses weight equal to the lighter one. Return the weight of the last remaining stone, or 0 if none remain.",
      functionName: "lastStoneWeight",
      starterCode: {
        javascript: "function lastStoneWeight(stones) {\n  \n}",
        python: "def last_stone_weight(stones):\n    pass",
        java: "class Solution {\n    public int lastStoneWeight(int[] stones) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int lastStoneWeight(vector<int>& stones) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "stones = [2,7,4,1,8,1]",
          inputArgs: [[2, 7, 4, 1, 8, 1]],
          expected: 1,
        },
        {
          id: 2,
          input: "stones = [1]",
          inputArgs: [[1]],
          expected: 1,
        },
      ],
      patterns: ["Heap", "Array"],
      hints: [
        "Every step you need the two heaviest stones, and the outcome produces a new stone that needs re-ranking.",
        "A max heap supports both 'pop the largest' and 'push a new value' in O(log n).",
        "Loop: pop two, push difference if nonzero, stop when heap has < 2 stones.",
      ],
      keyIntuition:
        "Whenever a simulation repeatedly asks 'what's the current max/min?' after mutations, heap is your tool. Sorting once and scanning doesn't work here because every step produces a NEW value that must be re-inserted into the ordering — exactly what a priority queue handles efficiently.",
      approach:
        "Use a max heap to always access the two heaviest stones. Remove the two largest, and if they differ, push the difference back. Repeat until at most one stone remains.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 973,
      title: "K Closest Points to Origin",
      slug: "k-closest-points-to-origin",
      difficulty: "Medium",
      compareMode: "unordered",
      leetcodeUrl:
        "https://leetcode.com/problems/k-closest-points-to-origin/",
      description:
        "Given an array of points on the X-Y plane and an integer k, return the k closest points to the origin (0, 0). Distance is measured using Euclidean distance. The answer may be returned in any order.",
      functionName: "kClosest",
      starterCode: {
        javascript: "function kClosest(points, k) {\n  \n}",
        python: "def k_closest(points, k):\n    pass",
        java: "class Solution {\n    public int[][] kClosest(int[][] points, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "points = [[1,3],[-2,2]], k = 1",
          inputArgs: [[[1, 3], [-2, 2]], 1],
          expected: [[-2, 2]],
        },
        {
          id: 2,
          input: "points = [[3,3],[5,-1],[-2,4]], k = 2",
          inputArgs: [[[3, 3], [5, -1], [-2, 4]], 2],
          expected: [[3, 3], [-2, 4]],
        },
      ],
      patterns: ["Heap", "Array", "Quickselect"],
      hints: [
        "You want the k SMALLEST distances. By the same inversion trick as kth-largest, use a MAX heap of size k.",
        "Push each point; if heap size > k, pop. The heap always holds the k nearest seen so far.",
        "Skip the sqrt — compare squared distances x*x + y*y. Saves work and avoids float precision issues.",
      ],
      keyIntuition:
        "This is the dual of Kth Largest: to find the k SMALLEST, use a MAX heap (so the root is the largest of the k-best — pop it when something smaller arrives). Quickselect offers O(n) average time if you need better than O(n log k). The squared-distance trick is a tiny but important habit: avoid unnecessary sqrt whenever you only need relative ordering.",
      approach:
        "Use a max heap of size k based on distance from origin. For each point, push it to the heap. If the heap size exceeds k, pop the farthest point. The remaining k points are the closest.",
      timeComplexity: "O(n log k)",
      spaceComplexity: "O(k)",
    },
    {
      id: 215,
      title: "Kth Largest Element in an Array",
      slug: "kth-largest-element-in-an-array",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/kth-largest-element-in-an-array/",
      description:
        "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest in sorted order, not the kth distinct element.",
      functionName: "findKthLargest",
      starterCode: {
        javascript: "function findKthLargest(nums, k) {\n  \n}",
        python: "def find_kth_largest(nums, k):\n    pass",
        java: "class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [3,2,1,5,6,4], k = 2",
          inputArgs: [[3, 2, 1, 5, 6, 4], 2],
          expected: 5,
        },
        {
          id: 2,
          input: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
          inputArgs: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4],
          expected: 4,
        },
      ],
      patterns: ["Heap", "Quickselect", "Sorting", "Array"],
      hints: [
        "Easy option: sort and return nums[n-k]. O(n log n) — accepted but slow.",
        "Better: min heap of size k. O(n log k).",
        "Best: Quickselect. Average O(n), worst O(n²). Pick a pivot, partition, recurse on the side containing index n-k.",
      ],
      keyIntuition:
        "This problem is a benchmark for understanding selection algorithms. Quickselect teaches an important idea: 'partial' sorting. You only need to pivot until the kth position is correctly placed — no need to sort the rest. Randomized pivot selection makes worst case unlikely in practice. Heap variants trade simplicity for guaranteed asymptotic.",
      approach:
        "Use Quickselect (a partial Quicksort) to find the kth largest element in average O(n) time. Alternatively, use a min heap of size k for guaranteed O(n log k) time.",
      timeComplexity: "O(n) avg",
      spaceComplexity: "O(1)",
    },
    {
      id: 621,
      title: "Task Scheduler",
      slug: "task-scheduler",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/task-scheduler/",
      description:
        "Given a list of CPU tasks represented by characters and a cooldown period n, find the minimum number of intervals the CPU needs to complete all tasks. Identical tasks must be separated by at least n intervals. The CPU can be idle during intervals.",
      functionName: "leastInterval",
      starterCode: {
        javascript: "function leastInterval(tasks, n) {\n  \n}",
        python: "def least_interval(tasks, n):\n    pass",
        java: "class Solution {\n    public int leastInterval(char[] tasks, int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int leastInterval(vector<char>& tasks, int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'tasks = ["A","A","A","B","B","B"], n = 2',
          inputArgs: [["A", "A", "A", "B", "B", "B"], 2],
          expected: 8,
        },
        {
          id: 2,
          input: 'tasks = ["A","A","A","B","B","B"], n = 0',
          inputArgs: [["A", "A", "A", "B", "B", "B"], 0],
          expected: 6,
        },
      ],
      patterns: ["Heap", "Greedy", "Hash Map", "Math"],
      hints: [
        "The most-frequent task is the bottleneck — it determines the minimum span. Think about the 'frame' it creates.",
        "If max frequency is maxF, there are (maxF-1) required gaps of size (n+1) between max-task executions. Plus a final cluster.",
        "Formula: answer = max(len(tasks), (maxF-1)*(n+1) + count_of_tasks_with_max_freq).",
      ],
      keyIntuition:
        "Beautiful math trick that avoids simulation. Visualize it: the most-frequent task creates a skeleton of size (maxF-1)*(n+1). The skeleton's 'gap' slots can be filled with other tasks, and any leftover tasks expand naturally. The max() handles the case where tasks outnumber the skeleton. Heap-based simulation also works (pop max-remaining task per slot), but the closed-form formula is slicker.",
      approach:
        "Count task frequencies and use a greedy approach. The most frequent task determines the frame structure. Calculate idle slots needed based on the max frequency, then fill them with other tasks. The answer is max(total tasks, (maxFreq-1)*(n+1) + countOfMaxFreq).",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 355,
      title: "Design Twitter",
      slug: "design-twitter",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/design-twitter/",
      description:
        "Design a simplified version of Twitter with postTweet, getNewsFeed (10 most recent tweets from user and followees), follow, and unfollow operations.",
      functionName: "Twitter",
      runner: { kind: "class-ops", className: "Twitter" },
      starterCode: {
        javascript:
          "class Twitter {\n  constructor() {\n    \n  }\n\n  postTweet(userId, tweetId) {\n    \n  }\n\n  getNewsFeed(userId) {\n    \n  }\n\n  follow(followerId, followeeId) {\n    \n  }\n\n  unfollow(followerId, followeeId) {\n    \n  }\n}",
        python:
          "class Twitter:\n    def __init__(self):\n        pass\n\n    def post_tweet(self, user_id, tweet_id):\n        pass\n\n    def get_news_feed(self, user_id):\n        pass\n\n    def follow(self, follower_id, followee_id):\n        pass\n\n    def unfollow(self, follower_id, followee_id):\n        pass",
        java: "class Twitter {\n    public Twitter() {\n        \n    }\n\n    public void postTweet(int userId, int tweetId) {\n        \n    }\n\n    public List<Integer> getNewsFeed(int userId) {\n        \n    }\n\n    public void follow(int followerId, int followeeId) {\n        \n    }\n\n    public void unfollow(int followerId, int followeeId) {\n        \n    }\n}",
        cpp: "class Twitter {\npublic:\n    Twitter() {\n        \n    }\n\n    void postTweet(int userId, int tweetId) {\n        \n    }\n\n    vector<int> getNewsFeed(int userId) {\n        \n    }\n\n    void follow(int followerId, int followeeId) {\n        \n    }\n\n    void unfollow(int followerId, int followeeId) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'operations: ["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"], args: [[],[1,5],[1],[1,2],[2,6],[1],[1,2],[1]]',
          inputArgs: [
            [
              "Twitter",
              "postTweet",
              "getNewsFeed",
              "follow",
              "postTweet",
              "getNewsFeed",
              "unfollow",
              "getNewsFeed",
            ],
            [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
          ],
          expected: [null, null, [5], null, null, [6, 5], null, [5]],
        },
      ],
      patterns: ["Heap", "Hash Map", "Linked List", "Design"],
      hints: [
        "Store follows as Map<userId, Set<followeeId>>. Store each user's tweets as a list of (timestamp, tweetId).",
        "Use a global timestamp counter to order tweets across users.",
        "For getNewsFeed, merge the 10 most recent tweets from user + followees. Pointers-per-list merge (k-way merge via heap) is the textbook approach.",
      ],
      keyIntuition:
        "Design problems teach composition — pick the right data structure for each operation. Follows are a set problem (O(1) follow/unfollow/membership). Timelines are a sequence problem (append + reverse-iterate). Getting the news feed is a k-way merge problem (heap of iterators). Every individual piece is straightforward; the skill is recognizing which piece fits each requirement.",
      approach:
        "Use a HashMap for user follows and a list for tweets with timestamps. getNewsFeed merges the 10 most recent tweets from the user and their followees using a min heap of size 10.",
      timeComplexity: "O(k log k)",
      spaceComplexity: "O(n)",
    },
    {
      id: 295,
      title: "Find Median from Data Stream",
      slug: "find-median-from-data-stream",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/find-median-from-data-stream/",
      description:
        "Design a data structure that supports adding integers from a data stream and finding the median of all elements added so far. Implement addNum to add a number and findMedian to return the current median.",
      functionName: "MedianFinder",
      runner: { kind: "class-ops", className: "MedianFinder" },
      starterCode: {
        javascript:
          "class MedianFinder {\n  constructor() {\n    \n  }\n\n  addNum(num) {\n    \n  }\n\n  findMedian() {\n    \n  }\n}",
        python:
          "class MedianFinder:\n    def __init__(self):\n        pass\n\n    def add_num(self, num):\n        pass\n\n    def find_median(self):\n        pass",
        java: "class MedianFinder {\n    public MedianFinder() {\n        \n    }\n\n    public void addNum(int num) {\n        \n    }\n\n    public double findMedian() {\n        \n    }\n}",
        cpp: "class MedianFinder {\npublic:\n    MedianFinder() {\n        \n    }\n\n    void addNum(int num) {\n        \n    }\n\n    double findMedian() {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            'operations: ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"], args: [[],[1],[2],[],[3],[]]',
          inputArgs: [
            ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
            [[], [1], [2], [], [3], []],
          ],
          expected: [null, null, null, 1.5, null, 2.0],
        },
      ],
      patterns: ["Heap", "Design"],
      hints: [
        "Median splits the data into two halves — that's literally what two heaps give you.",
        "Max heap for the lower half (top = biggest-of-small), min heap for the upper half (top = smallest-of-big).",
        "Keep them balanced (sizes differ by at most 1). Median = top of larger heap (odd count) or average of both tops (even count).",
      ],
      keyIntuition:
        "The two-heap pattern is a classic: any time you need to maintain a 'midpoint' under streaming inserts, two heaps around the midpoint work. Each insert rebalances in O(log n). This pattern also handles 'sliding window median' and related problems. The invariant ('smaller half ≤ larger half, sizes within 1') is what makes it work — enforce it after every insert.",
      approach:
        "Maintain two heaps: a max heap for the lower half and a min heap for the upper half. Balance them so the max heap has equal or one more element. The median is the max heap's root (odd total) or the average of both roots (even total).",
      timeComplexity: "O(log n)",
      spaceComplexity: "O(n)",
    },
  ],
};
