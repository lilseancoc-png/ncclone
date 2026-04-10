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
          "Design a simplified Twitter with four operations: postTweet, getNewsFeed (10 most recent tweets from user + followees), follow, and unfollow. The core challenge is getNewsFeed: merging multiple users' tweet streams into a single sorted feed. This is the 'merge k sorted lists' pattern — each user's tweets are sorted by time, and we need the top 10 across all followed users. A max-heap efficiently selects the most recent tweet at each step.",
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
          "User 1 posts tweet 5 (time=0), then tweet 3 (time=1). Each tweet gets a monotonically increasing timestamp so we can always determine recency. Tweets are appended to a per-user list, so each user's tweets are already sorted by time.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "hashmap",
            label: "tweets",
            entries: [
              ["user1", "[(0,tweet5), (1,tweet3)]"],
            ],
            highlightKeys: ["user1"],
          },
          {
            type: "variables",
            entries: [{ name: "time", value: 2 }, { name: "user1 tweets", value: "tweet5 @t=0, tweet3 @t=1" }],
          },
        ],
      },
      {
        description:
          "User 2 posts tweet 9 (time=2). User 1 follows user 2. Now user 1's feed should include tweets from both user 1 and user 2. The follow relationship is stored in a hash set for O(1) lookup.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "hashmap",
            label: "tweets",
            entries: [
              ["user1", "[(0,tweet5), (1,tweet3)]"],
              ["user2", "[(2,tweet9)]"],
            ],
            highlightKeys: ["user2"],
          },
          {
            type: "hashmap",
            label: "following",
            entries: [["user1", "{user2}"]],
            highlightKeys: ["user1"],
          },
        ],
      },
      {
        description:
          "getNewsFeed(1): User 1 follows {self, user2}. Initialize the max-heap with each user's MOST RECENT tweet. User1's latest: (time=1, tweet3). User2's latest: (time=2, tweet9). Push as negated times (Python min-heap trick): (-2, 9, user2, idx=0) and (-1, 3, user1, idx=1). This lazy approach avoids loading all tweets — we only fetch the next one from a user when their current tweet is consumed.",
        codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18],
        structures: [
          {
            type: "stack",
            label: "max heap (negated times)",
            values: ["(-2, tweet9, user2)", "(-1, tweet3, user1)"],
            topHighlight: true,
          },
          {
            type: "variables",
            entries: [{ name: "feed", value: "[]" }, { name: "followees", value: "{self, user2}" }],
          },
        ],
      },
      {
        description:
          "Pop (-2, tweet9, user2, idx=0) → feed=[9]. Tweet 9 is the most recent. User2 has no earlier tweets (idx=0, no idx-1), so nothing pushed. Pop (-1, tweet3, user1, idx=1) → feed=[9, 3]. Push user1's previous tweet: (-0, tweet5, user1, idx=0).",
        codeHighlightLines: [20, 21, 22, 23, 24, 25],
        structures: [
          {
            type: "array",
            label: "feed (building...)",
            values: [9, 3],
            highlights: { 0: "success", 1: "success" },
          },
          {
            type: "stack",
            label: "max heap",
            values: ["(-0, tweet5, user1)"],
            topHighlight: true,
          },
        ],
      },
      {
        description:
          "Pop (-0, tweet5, user1, idx=0) → feed=[9, 3, 5]. User1 has no earlier tweets. Heap empty — return feed. The heap ensures we always pick the globally most recent tweet without sorting all tweets together. Time: O(k log k) where k = number of followees (heap ops). Space: O(n) for storing tweets and follow relationships.",
        codeHighlightLines: [20, 21, 22, 26],
        structures: [
          {
            type: "array",
            label: "news feed (most recent first)",
            values: [9, 3, 5],
            highlights: { 0: "success", 1: "success", 2: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "[9, 3, 5]", highlight: true }, { name: "Time", value: "O(k log k) per feed" }, { name: "pattern", value: "merge k sorted lists" }],
          },
        ],
      },
    ],
  },
];

export default solutions;
