import { Category } from "../types";

export const intervals: Category = {
  name: "Intervals",
  slug: "intervals",
  problems: [
    {
      id: 57,
      title: "Insert Interval",
      slug: "insert-interval",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/insert-interval/",
      description:
        "Given a sorted array of non-overlapping intervals and a new interval, insert the new interval and merge if necessary. Return the resulting array of non-overlapping intervals.",
      functionName: "insert",
      starterCode: {
        javascript: "function insert(intervals, newInterval) {\n  \n}",
        python: "def insert(intervals, new_interval):\n    pass",
        java: "class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "intervals = [[1,3],[6,9]], newInterval = [2,5]",
          inputArgs: [
            [
              [1, 3],
              [6, 9],
            ],
            [2, 5],
          ],
          expected: [
            [1, 5],
            [6, 9],
          ],
        },
        {
          id: 2,
          input:
            "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]",
          inputArgs: [
            [
              [1, 2],
              [3, 5],
              [6, 7],
              [8, 10],
              [12, 16],
            ],
            [4, 8],
          ],
          expected: [
            [1, 2],
            [3, 10],
            [12, 16],
          ],
        },
      ],
      approach:
        "Split intervals into three groups: those entirely before the new interval, those overlapping (merge them by taking min start and max end), and those entirely after. Concatenate the three groups.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 56,
      title: "Merge Intervals",
      slug: "merge-intervals",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/merge-intervals/",
      description:
        "Given an array of intervals, merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.",
      functionName: "merge",
      starterCode: {
        javascript: "function merge(intervals) {\n  \n}",
        python: "def merge(intervals):\n    pass",
        java: "class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
          inputArgs: [
            [
              [1, 3],
              [2, 6],
              [8, 10],
              [15, 18],
            ],
          ],
          expected: [
            [1, 6],
            [8, 10],
            [15, 18],
          ],
        },
        {
          id: 2,
          input: "intervals = [[1,4],[4,5]]",
          inputArgs: [
            [
              [1, 4],
              [4, 5],
            ],
          ],
          expected: [[1, 5]],
        },
      ],
      approach:
        "Sort intervals by start time. Iterate through and merge overlapping intervals: if the current interval's start is <= the previous interval's end, extend the previous interval's end. Otherwise, add the current interval as a new non-overlapping interval.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 435,
      title: "Non-overlapping Intervals",
      slug: "non-overlapping-intervals",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/non-overlapping-intervals/",
      description:
        "Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.",
      functionName: "eraseOverlapIntervals",
      starterCode: {
        javascript: "function eraseOverlapIntervals(intervals) {\n  \n}",
        python: "def erase_overlap_intervals(intervals):\n    pass",
        java: "class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "intervals = [[1,2],[2,3],[3,4],[1,3]]",
          inputArgs: [
            [
              [1, 2],
              [2, 3],
              [3, 4],
              [1, 3],
            ],
          ],
          expected: 1,
        },
        {
          id: 2,
          input: "intervals = [[1,2],[1,2],[1,2]]",
          inputArgs: [
            [
              [1, 2],
              [1, 2],
              [1, 2],
            ],
          ],
          expected: 2,
        },
      ],
      approach:
        "Sort by end time and use greedy selection. Keep track of the previous interval's end. For each interval, if it starts before the previous end (overlap), increment the removal count; otherwise, update the previous end.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 252,
      title: "Meeting Rooms",
      slug: "meeting-rooms",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms/",
      description:
        "Given an array of meeting time intervals consisting of start and end times, determine if a person could attend all meetings.",
      functionName: "canAttendMeetings",
      starterCode: {
        javascript: "function canAttendMeetings(intervals) {\n  \n}",
        python: "def can_attend_meetings(intervals):\n    pass",
        java: "class Solution {\n    public boolean canAttendMeetings(int[][] intervals) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool canAttendMeetings(vector<vector<int>>& intervals) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "intervals = [[0,30],[5,10],[15,20]]",
          inputArgs: [
            [
              [0, 30],
              [5, 10],
              [15, 20],
            ],
          ],
          expected: false,
        },
        {
          id: 2,
          input: "intervals = [[7,10],[2,4]]",
          inputArgs: [
            [
              [7, 10],
              [2, 4],
            ],
          ],
          expected: true,
        },
      ],
      approach:
        "Sort intervals by start time, then check if any two consecutive intervals overlap (current start < previous end). If no overlaps are found, all meetings can be attended.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 253,
      title: "Meeting Rooms II",
      slug: "meeting-rooms-ii",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/meeting-rooms-ii/",
      description:
        "Given an array of meeting time intervals, find the minimum number of conference rooms required.",
      functionName: "minMeetingRooms",
      starterCode: {
        javascript: "function minMeetingRooms(intervals) {\n  \n}",
        python: "def min_meeting_rooms(intervals):\n    pass",
        java: "class Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int minMeetingRooms(vector<vector<int>>& intervals) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "intervals = [[0,30],[5,10],[15,20]]",
          inputArgs: [
            [
              [0, 30],
              [5, 10],
              [15, 20],
            ],
          ],
          expected: 2,
        },
        {
          id: 2,
          input: "intervals = [[7,10],[2,4]]",
          inputArgs: [
            [
              [7, 10],
              [2, 4],
            ],
          ],
          expected: 1,
        },
      ],
      approach:
        "Use a sweep line approach: create events for meeting starts (+1) and ends (-1). Sort events by time (with ends before starts at the same time). Track the running count of concurrent meetings and return the maximum.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 1851,
      title: "Minimum Interval to Include Each Query",
      slug: "minimum-interval-to-include-each-query",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/minimum-interval-to-include-each-query/",
      description:
        "Given a 2D array of intervals and an array of queries, for each query return the size of the smallest interval that contains it, or -1 if no interval contains it.",
      functionName: "minInterval",
      starterCode: {
        javascript: "function minInterval(intervals, queries) {\n  \n}",
        python: "def min_interval(intervals, queries):\n    pass",
        java: "class Solution {\n    public int[] minInterval(int[][] intervals, int[] queries) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
          inputArgs: [
            [
              [1, 4],
              [2, 4],
              [3, 6],
              [4, 4],
            ],
            [2, 3, 4, 5],
          ],
          expected: [3, 3, 1, 4],
        },
        {
          id: 2,
          input:
            "intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]",
          inputArgs: [
            [
              [2, 3],
              [2, 5],
              [1, 8],
              [20, 25],
            ],
            [2, 19, 5, 22],
          ],
          expected: [2, -1, 4, 6],
        },
      ],
      approach:
        "Sort intervals by size and queries by value. Use a sweep line with a min heap sorted by interval size. For each query, add all intervals containing it and select the smallest. Use offline processing with sorted queries for efficiency.",
      timeComplexity: "O((n+q) log n)",
      spaceComplexity: "O(n+q)",
    },
  ],
};
