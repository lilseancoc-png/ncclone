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
          "Merge k sorted linked lists into one sorted list. Use a min-heap of size k to always pick the smallest available element. Push the head of each list into the heap, then repeatedly pop the smallest and push its next node.",
        codeHighlightLines: [3, 4, 5, 6, 7],
        structures: [
          {
            type: "array",
            label: "lists",
            values: ["1→4→5", "1→3→4", "2→6"],
            highlights: {},
          },
          { type: "stack", label: "min heap", values: ["(1,0)", "(1,1)", "(2,2)"] },
        ],
      },
      {
        description:
          "Pop (1, list0). Add node 1 to result. Push list0's next (4). Heap: [(1,1), (2,2), (4,0)]. Pop (1, list1). Add 1. Push 3. Result so far: 1→1.",
        codeHighlightLines: [10, 11, 12, 13, 14, 15],
        structures: [
          {
            type: "array",
            label: "result so far",
            values: [1, 1],
            highlights: { 0: "success", 1: "success" },
          },
          { type: "stack", label: "min heap", values: ["(2,2)", "(3,1)", "(4,0)"] },
        ],
      },
      {
        description:
          "Pop (2, list2). Push 6. Pop (3, list1). Push 4. Pop (4, list0). Push 5. Pop (4, list1). No next. Result: 1→1→2→3→4→4.",
        codeHighlightLines: [11, 12, 13, 14, 15],
        structures: [
          {
            type: "array",
            label: "result so far",
            values: [1, 1, 2, 3, 4, 4],
            highlights: { 2: "success", 3: "success", 4: "success", 5: "success" },
          },
          { type: "stack", label: "min heap", values: ["(5,0)", "(6,2)"] },
        ],
      },
      {
        description:
          "Pop (5, list0). Pop (6, list2). Heap empty, done. Final: 1→1→2→3→4→4→5→6. Each of n total nodes is pushed/popped once from a heap of size k → O(n log k).",
        codeHighlightLines: [16],
        structures: [
          {
            type: "array",
            label: "merged result",
            values: [1, 1, 2, 3, 4, 4, 5, 6],
            highlights: { 0: "success", 1: "success", 2: "success", 3: "success", 4: "success", 5: "success", 6: "success", 7: "success" },
          },
        ],
      },
    ],
  },
];

export default solutions;
