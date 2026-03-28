import { SolutionData } from "../types";

const solution: SolutionData = {
  code: `def encode(strs):
    parts = []
    for s in strs:
        parts.append(str(len(s)) + "#" + s)
    return "".join(parts)

def decode(s):
    result = []
    i = 0
    while i < len(s):
        j = s.index("#", i)
        length = int(s[i:j])
        result.append(s[j+1 : j+1+length])
        i = j + 1 + length
    return result`,
  steps: [
    {
      description:
        "We need to encode a list of strings into one string that we can decode back — even if the strings contain special characters. The trick: prefix each string with its length and a '#' delimiter, like \"4#lint\". The length tells us exactly how many characters to read, so '#' inside a string won't confuse us.",
      codeHighlightLines: [1, 2],
      structures: [
        { type: "array", label: "strs", values: ["lint", "code", "love", "you"] },
        { type: "variables", entries: [{ name: "parts", value: "[]" }] },
      ],
    },
    {
      description:
        "Encode \"lint\": len(\"lint\") = 4. Build the chunk \"4#lint\" and append it to parts. We use a list instead of string concatenation because appending to a list is O(1), while += on strings copies the whole string each time.",
      codeHighlightLines: [3, 4],
      structures: [
        {
          type: "array",
          label: "strs",
          values: ["lint", "code", "love", "you"],
          highlights: { 0: "active" },
          pointers: [{ index: 0, label: "s" }],
        },
        {
          type: "variables",
          entries: [
            { name: "len(s)", value: 4 },
            { name: "parts", value: "[\"4#lint\"]", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Encode \"code\": len(\"code\") = 4. Append \"4#code\" to parts.",
      codeHighlightLines: [3, 4],
      structures: [
        {
          type: "array",
          label: "strs",
          values: ["lint", "code", "love", "you"],
          highlights: { 0: "checked", 1: "active" },
          pointers: [{ index: 1, label: "s" }],
        },
        {
          type: "variables",
          entries: [
            { name: "len(s)", value: 4 },
            { name: "parts", value: "[\"4#lint\",\"4#code\"]", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Encode \"love\": len(\"love\") = 4. Append \"4#love\" to parts.",
      codeHighlightLines: [3, 4],
      structures: [
        {
          type: "array",
          label: "strs",
          values: ["lint", "code", "love", "you"],
          highlights: { 0: "checked", 1: "checked", 2: "active" },
          pointers: [{ index: 2, label: "s" }],
        },
        {
          type: "variables",
          entries: [
            { name: "len(s)", value: 4 },
            { name: "parts", value: "[...,\"4#love\"]", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Encode \"you\": len(\"you\") = 3 (not 4!). Append \"3#you\" to parts.",
      codeHighlightLines: [3, 4],
      structures: [
        {
          type: "array",
          label: "strs",
          values: ["lint", "code", "love", "you"],
          highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "active" },
          pointers: [{ index: 3, label: "s" }],
        },
        {
          type: "variables",
          entries: [
            { name: "len(s)", value: 3 },
            { name: "parts", value: "[...,\"3#you\"]", highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "Join all parts into one string: \"4#lint4#code4#love3#you\". Using join() is O(n) total — much better than repeated string concatenation. Now let's decode it.",
      codeHighlightLines: [5],
      structures: [
        {
          type: "array",
          label: "encoded",
          values: ["4", "#", "l", "i", "n", "t", "4", "#", "c", "o", "d", "e", "4", "#", "l", "o", "v", "e", "3", "#", "y", "o", "u"],
        },
        {
          type: "variables",
          entries: [{ name: "return", value: "\"4#lint4#code4#love3#you\"", highlight: true }],
        },
      ],
    },
    {
      description:
        "Start decoding. Set i=0 and an empty result list. The plan: find the '#', read the number before it to get the length, then extract that many characters after it.",
      codeHighlightLines: [7, 8, 9],
      structures: [
        {
          type: "array",
          label: "encoded",
          values: ["4", "#", "l", "i", "n", "t", "4", "#", "c", "o", "d", "e", "4", "#", "l", "o", "v", "e", "3", "#", "y", "o", "u"],
          pointers: [{ index: 0, label: "i", color: "purple" }],
        },
        { type: "array", label: "result", values: [] },
      ],
    },
    {
      description:
        "Find '#' starting from i=0 → found at j=1. Read s[0:1] = \"4\", so length=4. Extract s[2:6] = \"lint\". Append to result. Advance i to j+1+length = 6.",
      codeHighlightLines: [10, 11, 12, 13],
      structures: [
        {
          type: "array",
          label: "encoded",
          values: ["4", "#", "l", "i", "n", "t", "4", "#", "c", "o", "d", "e", "4", "#", "l", "o", "v", "e", "3", "#", "y", "o", "u"],
          highlights: { 0: "active", 1: "active", 2: "success", 3: "success", 4: "success", 5: "success" },
          pointers: [{ index: 0, label: "i", color: "purple" }, { index: 1, label: "j", color: "cyan" }],
        },
        {
          type: "array",
          label: "result",
          values: ["lint"],
          highlights: { 0: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "length", value: 4 },
            { name: "i (next)", value: 6, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=6. Find '#' from index 6 → found at j=7. s[6:7] = \"4\", length=4. Extract s[8:12] = \"code\". Advance i to 12.",
      codeHighlightLines: [10, 11, 12, 13],
      structures: [
        {
          type: "array",
          label: "encoded",
          values: ["4", "#", "l", "i", "n", "t", "4", "#", "c", "o", "d", "e", "4", "#", "l", "o", "v", "e", "3", "#", "y", "o", "u"],
          highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked", 6: "active", 7: "active", 8: "success", 9: "success", 10: "success", 11: "success" },
          pointers: [{ index: 6, label: "i", color: "purple" }, { index: 7, label: "j", color: "cyan" }],
        },
        {
          type: "array",
          label: "result",
          values: ["lint", "code"],
          highlights: { 1: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "length", value: 4 },
            { name: "i (next)", value: 12, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=12. Find '#' from index 12 → found at j=13. s[12:13] = \"4\", length=4. Extract s[14:18] = \"love\". Advance i to 18.",
      codeHighlightLines: [10, 11, 12, 13],
      structures: [
        {
          type: "array",
          label: "encoded",
          values: ["4", "#", "l", "i", "n", "t", "4", "#", "c", "o", "d", "e", "4", "#", "l", "o", "v", "e", "3", "#", "y", "o", "u"],
          highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked", 6: "checked", 7: "checked", 8: "checked", 9: "checked", 10: "checked", 11: "checked", 12: "active", 13: "active", 14: "success", 15: "success", 16: "success", 17: "success" },
          pointers: [{ index: 12, label: "i", color: "purple" }, { index: 13, label: "j", color: "cyan" }],
        },
        {
          type: "array",
          label: "result",
          values: ["lint", "code", "love"],
          highlights: { 2: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "length", value: 4 },
            { name: "i (next)", value: 18, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=18. Find '#' from index 18 → found at j=19. s[18:19] = \"3\", length=3. Extract s[20:23] = \"you\". Advance i to 23.",
      codeHighlightLines: [10, 11, 12, 13],
      structures: [
        {
          type: "array",
          label: "encoded",
          values: ["4", "#", "l", "i", "n", "t", "4", "#", "c", "o", "d", "e", "4", "#", "l", "o", "v", "e", "3", "#", "y", "o", "u"],
          highlights: { 0: "checked", 1: "checked", 2: "checked", 3: "checked", 4: "checked", 5: "checked", 6: "checked", 7: "checked", 8: "checked", 9: "checked", 10: "checked", 11: "checked", 12: "checked", 13: "checked", 14: "checked", 15: "checked", 16: "checked", 17: "checked", 18: "active", 19: "active", 20: "success", 21: "success", 22: "success" },
          pointers: [{ index: 18, label: "i", color: "purple" }, { index: 19, label: "j", color: "cyan" }],
        },
        {
          type: "array",
          label: "result",
          values: ["lint", "code", "love", "you"],
          highlights: { 3: "success" },
        },
        {
          type: "variables",
          entries: [
            { name: "length", value: 3 },
            { name: "i (next)", value: 23, highlight: true },
          ],
        },
      ],
    },
    {
      description:
        "i=23 equals len(s)=23, so the while loop ends. Return the decoded list — it matches the original! Time: O(n) for both encode and decode, where n is total characters across all strings. Space: O(n) for the output.",
      codeHighlightLines: [14],
      structures: [
        {
          type: "array",
          label: "result",
          values: ["lint", "code", "love", "you"],
          highlights: { 0: "success", 1: "success", 2: "success", 3: "success" },
        },
        {
          type: "variables",
          entries: [{ name: "return", value: "[\"lint\",\"code\",\"love\",\"you\"]", highlight: true }],
        },
      ],
    },
  ],
};

export default solution;
