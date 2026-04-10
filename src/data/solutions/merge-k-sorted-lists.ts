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
          "Merge k sorted linked lists into one sorted list. The brute force approach collects all values and sorts — O(n log n). The heap approach is smarter: maintain a min-heap of size k, always containing one node from each list. Pop the smallest, append to result, push that node's successor. lists = [[1,4,5], [1,3,4], [2,6]]. Initialize: push each list's head onto the heap.",
        codeHighlightLines: [3, 4, 5, 6, 7, 8],
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
          { type: "stack", label: "min heap", values: ["(1, list0)", "(1, list1)", "(2, list2)"] },
        ],
      },
      {
        description:
          "Pop (1, list0) — smallest value is 1 from list 0. Append node(1) to result. Push list0's next node (value 4) onto the heap. The heap re-sorts: (1, list1) is now the minimum. The index i in the heap tuple breaks ties between equal values (preventing node comparison errors in Python).",
        codeHighlightLines: [10, 11, 12, 13, 14],
        structures: [
          {
            type: "linkedlist",
            label: "result",
            nodes: [{ value: 1, highlight: "success" }],
          },
          { type: "stack", label: "min heap", values: ["(1, list1)", "(2, list2)", "(4, list0)"], topHighlight: true },
          { type: "variables", entries: [{ name: "popped", value: "1 from list0" }, { name: "pushed", value: "4 (list0's next)", highlight: true }] },
        ],
      },
      {
        description:
          "Pop (1, list1) → append 1. Push list1's next (3). Pop (2, list2) → append 2. Push list2's next (6). Result grows: 1→1→2. Each pop gives us the globally smallest remaining element — the heap guarantees this in O(log k) time.",
        codeHighlightLines: [10, 11, 12, 13, 14],
        structures: [
          {
            type: "linkedlist",
            label: "result so far",
            nodes: [
              { value: 1, highlight: "success" },
              { value: 1, highlight: "success" },
              { value: 2, highlight: "success" },
            ],
          },
          { type: "stack", label: "min heap", values: ["(3, list1)", "(4, list0)", "(6, list2)"], topHighlight: true },
        ],
      },
      {
        description:
          "Pop (3, list1) → append 3. Push list1's next (4). Pop (4, list0) → append 4. Push list0's next (5). Pop (4, list1) → append 4. No next in list1. Result: 1→1→2→3→4→4. When a list is exhausted, we simply don't push anything — the heap naturally shrinks.",
        codeHighlightLines: [10, 11, 12, 13, 14],
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
          { type: "stack", label: "min heap", values: ["(5, list0)", "(6, list2)"] },
        ],
      },
      {
        description:
          "Pop (5, list0) → append 5. No next in list0. Pop (6, list2) → append 6. No next. Heap empty — done. Return dummy.next: 1→1→2→3→4→4→5→6. Each of n total nodes is pushed and popped from the heap exactly once. Each heap operation is O(log k). Total: O(n log k), much better than O(n log n) when k << n.",
        codeHighlightLines: [15],
        structures: [
          {
            type: "linkedlist",
            label: "merged list (final)",
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
          { type: "variables", entries: [{ name: "return", value: "1→1→2→3→4→4→5→6", highlight: true }, { name: "Time", value: "O(n log k)" }, { name: "Space", value: "O(k) for heap" }] },
        ],
      },
    ],
  },
];

export default solutions;
