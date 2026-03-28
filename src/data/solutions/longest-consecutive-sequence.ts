import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0

    for num in num_set:
        if num - 1 not in num_set:
            current = num
            length = 1

            while current + 1 in num_set:
                current += 1
                length += 1

            longest = max(longest, length)

    return longest`,
  steps: [
    {
      description:
        "We want to find the longest consecutive sequence in O(n) time. The trick: put all numbers in a set, then only start counting from numbers that are the beginning of a sequence (i.e., num-1 is NOT in the set).",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "array", label: "nums", values: [100, 4, 200, 1, 3, 2] },
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200] },
        { type: "variables", entries: [{ name: "longest", value: 0 }] },
      ],
    },
    {
      description:
        "Check num=1. Is (1-1)=0 in the set? No! So 1 is the START of a sequence. Initialize current=1, length=1.",
      codeHighlightLines: [5, 6, 7, 8],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [1] },
        {
          type: "variables",
          entries: [
            { name: "num", value: 1, highlight: true },
            { name: "current", value: 1 },
            { name: "length", value: 1 },
          ],
        },
      ],
    },
    {
      description:
        "While loop: is current+1 = 2 in the set? Yes! Increment: current=2, length=2.",
      codeHighlightLines: [10, 11, 12],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [1, 2] },
        {
          type: "variables",
          entries: [
            { name: "current", value: 2, highlight: true },
            { name: "length", value: 2, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Is current+1 = 3 in the set? Yes! Increment: current=3, length=3.",
      codeHighlightLines: [10, 11, 12],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [1, 2, 3] },
        {
          type: "variables",
          entries: [
            { name: "current", value: 3, highlight: true },
            { name: "length", value: 3, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Is current+1 = 4 in the set? Yes! Increment: current=4, length=4.",
      codeHighlightLines: [10, 11, 12],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [1, 2, 3, 4] },
        {
          type: "variables",
          entries: [
            { name: "current", value: 4, highlight: true },
            { name: "length", value: 4, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Is current+1 = 5 in the set? No! The while loop ends. We found sequence [1,2,3,4]. Update longest = max(0, 4) = 4.",
      codeHighlightLines: [10, 14],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [1, 2, 3, 4] },
        {
          type: "variables",
          entries: [
            { name: "length", value: 4 },
            { name: "longest", value: 4, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Check num=2. Is (2-1)=1 in the set? Yes — so 2 is NOT the start of a sequence. Skip it. This is the key optimization: we never re-count elements that belong to a sequence we've already found.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [2] },
        {
          type: "variables",
          entries: [
            { name: "num", value: 2, highlight: true },
            { name: "num - 1 = 1 in set?", value: "Yes → skip" },
          ],
        },
      ],
    },
    {
      description:
        "Check num=3. Is (3-1)=2 in the set? Yes — skip. 3 is in the middle of a sequence, not the start.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [3] },
        {
          type: "variables",
          entries: [
            { name: "num", value: 3, highlight: true },
            { name: "num - 1 = 2 in set?", value: "Yes → skip" },
          ],
        },
      ],
    },
    {
      description:
        "Check num=4. Is (4-1)=3 in the set? Yes — skip.",
      codeHighlightLines: [5, 6],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [4] },
        {
          type: "variables",
          entries: [
            { name: "num", value: 4, highlight: true },
            { name: "num - 1 = 3 in set?", value: "Yes → skip" },
          ],
        },
      ],
    },
    {
      description:
        "Check num=100. Is 99 in the set? No — so 100 is a sequence start. Is 101 in the set? No. Sequence length is just 1. longest stays 4 since max(4, 1) = 4.",
      codeHighlightLines: [5, 6, 7, 8, 10, 14],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [100] },
        {
          type: "variables",
          entries: [
            { name: "num", value: 100, highlight: true },
            { name: "length", value: 1 },
            { name: "longest", value: 4 },
          ],
        },
      ],
    },
    {
      description:
        "Check num=200. Is 199 in the set? No — sequence start. Is 201 in the set? No. Length is 1. longest stays 4.",
      codeHighlightLines: [5, 6, 7, 8, 10, 14],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [200] },
        {
          type: "variables",
          entries: [
            { name: "num", value: 200, highlight: true },
            { name: "length", value: 1 },
            { name: "longest", value: 4 },
          ],
        },
      ],
    },
    {
      description:
        "All numbers checked. The longest consecutive sequence is [1,2,3,4] with length 4. Time: O(n) — each number is visited at most twice (once in the for loop, once in the while loop). Space: O(n) for the set.",
      codeHighlightLines: [16],
      structures: [
        { type: "set", label: "num_set", values: [1, 2, 3, 4, 100, 200], highlightValues: [1, 2, 3, 4] },
        { type: "variables", entries: [{ name: "return", value: 4, highlight: true }] },
      ],
    },
  ],
};

export default solution;
