import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Min Heap",
    timeComplexity: "O(n log k)",
    spaceComplexity: "O(k)",
    code: `import heapq

def mergeKLists(lists):
    heap = []
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst.val, i, lst))
    dummy = ListNode(0)
    curr = dummy
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    return dummy.next`,
    steps: [
      {
        description:
          "Merge k sorted linked lists into one. Use a min-heap of size k to always pick the smallest element. Push the head of each list, then repeatedly pop smallest and push its successor.",
        codeHighlightLines: [3, 4, 5, 6, 7],
        structures: [
          {
            type: "linkedlist",
            label: "list 0",
            nodes: [{ value: 1, highlight: "active" }, { value: 4 }, { value: 5 }],
          },
          {
            type: "linkedlist",
            label: "list 1",
            nodes: [{ value: 1, highlight: "active" }, { value: 3 }, { value: 4 }],
          },
          {
            type: "linkedlist",
            label: "list 2",
            nodes: [{ value: 2, highlight: "active" }, { value: 6 }],
          },
          { type: "stack", label: "min heap", values: ["(1,0)", "(1,1)", "(2,2)"] },
        ],
      },
      {
        description:
          "Pop (1, list0). Add 1 to result, push list0's next (4). Pop (1, list1). Add 1, push 3. Result: 1→1.",
        codeHighlightLines: [10, 11, 12, 13, 14, 15],
        structures: [
          {
            type: "linkedlist",
            label: "result so far",
            nodes: [{ value: 1, highlight: "success" }, { value: 1, highlight: "success" }],
          },
          { type: "stack", label: "min heap", values: ["(2,2)", "(3,1)", "(4,0)"] },
        ],
      },
      {
        description:
          "Pop (2, list2) → push 6. Pop (3, list1) → push 4. Pop (4, list0) → push 5. Pop (4, list1) → no next. Result: 1→1→2→3→4→4.",
        codeHighlightLines: [11, 12, 13, 14, 15],
        structures: [
          {
            type: "linkedlist",
            label: "result so far",
            nodes: [
              { value: 1, highlight: "success" },
              { value: 1, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 4, highlight: "success" },
              { value: 4, highlight: "success" },
            ],
          },
          { type: "stack", label: "min heap", values: ["(5,0)", "(6,2)"] },
        ],
      },
      {
        description:
          "Pop (5, list0). Pop (6, list2). Heap empty, done. Final merged: 1→1→2→3→4→4→5→6. Each of n nodes pushed/popped once from heap of size k → O(n log k).",
        codeHighlightLines: [16],
        structures: [
          {
            type: "linkedlist",
            label: "merged list",
            nodes: [
              { value: 1, highlight: "success", label: "head" },
              { value: 1, highlight: "success" },
              { value: 2, highlight: "success" },
              { value: 3, highlight: "success" },
              { value: 4, highlight: "success" },
              { value: 4, highlight: "success" },
              { value: 5, highlight: "success" },
              { value: 6, highlight: "success" },
            ],
          },
        ],
      },
    ],
  },
];

export default solutions;
