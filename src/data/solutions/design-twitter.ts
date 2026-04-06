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
          "Design Twitter with: postTweet, getNewsFeed (10 most recent from user + followees), follow, unfollow. Store tweets per user with timestamps. For news feed, use a max-heap (merge k sorted lists pattern) to get the 10 most recent across all followed users.",
        codeHighlightLines: [1, 2, 3, 4, 5],
        structures: [
          {
            type: "hashmap",
            label: "tweets",
            entries: [],
          },
          {
            type: "hashmap",
            label: "following",
            entries: [],
          },
        ],
      },
      {
        description:
          "User 1 posts tweet 5, then tweet 3. User 2 posts tweet 9. User 1 follows user 2. Each tweet gets an incrementing timestamp for ordering.",
        codeHighlightLines: [7, 8, 9],
        structures: [
          {
            type: "hashmap",
            label: "tweets",
            entries: [
              ["user1", "[(0,5), (1,3)]"],
              ["user2", "[(2,9)]"],
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
          "getNewsFeed(1): User 1 follows {self, user2}. Push most recent tweet from each: (-2, 9, user2) and (-1, 3, user1). Pop (-2, 9) → feed=[9]. Push user2's prev if exists. Pop (-1, 3) → feed=[9,3]. Push (-0, 5). Pop (0, 5) → feed=[9,3,5].",
        codeHighlightLines: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
        structures: [
          {
            type: "array",
            label: "news feed",
            values: [9, 3, 5],
            highlights: { 0: "success", 1: "success", 2: "success" },
          },
          {
            type: "variables",
            entries: [{ name: "return", value: "[9, 3, 5]", highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;
