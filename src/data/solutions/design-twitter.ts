import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Hash Maps + Min Heap",
    timeComplexity: "O(k log k) for getNewsFeed",
    spaceComplexity: "O(n)",
    code: `class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = defaultdict(list)   # userId -> [(time, tweetId)]
        self.following = defaultdict(set)  # userId -> set of followeeIds

    def postTweet(self, userId, tweetId):
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId):
        self.following[userId].add(userId)
        heap = []
        for fId in self.following[userId]:
            if self.tweets[fId]:
                idx = len(self.tweets[fId]) - 1
                t, tId = self.tweets[fId][idx]
                heapq.heappush(heap, (-t, tId, fId, idx))
        feed = []
        while heap and len(feed) < 10:
            t, tId, fId, idx = heapq.heappop(heap)
            feed.append(tId)
            if idx > 0:
                t2, tId2 = self.tweets[fId][idx - 1]
                heapq.heappush(heap, (-t2, tId2, fId, idx - 1))
        return feed`,
    steps: [
      {
        description:
          "Design a simplified Twitter with four operations: postTweet (post a tweet), getNewsFeed (get 10 most recent tweets from user and their followees), follow, and unfollow. The core challenge is getNewsFeed: merging multiple users' tweet streams into a single sorted feed. This is exactly the 'merge k sorted lists' pattern! Each user's tweets are sorted by time, and we need the top 10 across all k followed users. A max-heap (negate timestamps for Python's min-heap) efficiently selects the most recent.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "hashmap",
            label: "tweets (userId → [(time, tweetId)])",
            entries: [],
          },
          {
            type: "hashmap",
            label: "following (userId → set of followees)",
            entries: [],
          },
        ],
      },
      {
        description:
          "User 1 posts tweet 5 (time=0), then tweet 3 (time=1). User 2 posts tweet 9 (time=2). User 1 follows user 2. Each tweet gets a monotonically increasing timestamp so we can always determine recency. Tweets are appended to a per-user list, so each user's tweets are already sorted by time. This is the 'pre-sorted streams' property that makes the heap merge efficient.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "hashmap",
            label: "tweets",
            entries: [
              ["user1", "[(0, tweet5), (1, tweet3)]"],
              ["user2", "[(2, tweet9)]"],
            ],
            highlightKeys: ["user1", "user2"],
          },
          {
            type: "hashmap",
            label: "following",
            entries: [["user1", "{user2}"]],
          },
        ],
      },
      {
        description:
          "getNewsFeed(1): User 1 follows {self, user2}. Initialize heap with each user's MOST RECENT tweet: user1's latest = (time=1, tweet3), user2's latest = (time=2, tweet9). Push as negated times: (-2, 9, user2, idx=0) and (-1, 3, user1, idx=1). Pop (-2, 9) → feed=[9]. User2 has no earlier tweets, nothing to push. Pop (-1, 3) → feed=[9,3]. Push user1's previous: (-0, 5, user1, idx=0). Pop (-0, 5) → feed=[9,3,5]. This lazy expansion avoids loading all tweets upfront — we only fetch tweets as needed, up to 10. Time: O(k log k) where k = number of followees.",
        codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        structures: [
          {
            type: "array",
            label: "news feed (most recent first)",
            values: [9, 3, 5],
            highlights: { 0: "success", 1: "success", 2: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "[9, 3, 5]", highlight: true }, { name: "getNewsFeed", value: "O(k log k)" }, { name: "pattern", value: "merge k sorted lists" }],
          },
        ],
      },
    ],
  },
];

export default solutions;
