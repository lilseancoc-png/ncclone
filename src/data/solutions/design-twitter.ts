import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "HashMap + Merge K Feeds",
  timeComplexity: "O(k log k) getNewsFeed",
  spaceComplexity: "O(n)",

  steps: [
    {
      description: "postTweet stores tweets with decreasing counter. follow/unfollow manage followee sets.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "hashmap", label: "Tweets", entries: [["user 1", "[tweet 5, tweet 3]"], ["user 2", "[tweet 6]"]], highlights: {} },
        { type: "hashmap", label: "Follows", entries: [["user 1", "{1, 2}"]] },
      ],
    },
    {
      description: "getNewsFeed: merge latest tweets from all followees using a min-heap (by timestamp).",
      codeHighlightLines: [14, 19],
      structures: [
        { type: "array", label: "Heap entries", values: ["(-1, tweet5, user1)", "(-2, tweet6, user2)"], highlights: { 0: "active" } },
        { type: "variables", label: "State", entries: [{ name: "merging feeds from", value: "user 1, user 2" }] },
      ],
    },
    {
      description: "Pop from heap up to 10 times to get most recent tweets across all followees.",
      codeHighlightLines: [21, 22, 23],
      structures: [
        { type: "array", label: "News Feed", values: ["tweet5", "tweet6", "tweet3"], highlights: { 0: "success", 1: "success", 2: "success" } },
      ],
    },
  ],
};

export default solution;
