import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Two Pointers — One Pass",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n + 1):
        fast = fast.next
    while fast:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
  steps: [
    {
      description:
        "Remove the nth node from the end of a linked list in one pass. The naive approach traverses twice: once to find the length, again to find the target. The one-pass trick: maintain two pointers with a gap of n+1 nodes. When fast hits null, slow is right before the target. We use a dummy node before head to handle the edge case of removing the first node (without special-case code). List: 1→2→3→4→5, n=2 (remove 4, the 2nd from end).",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d", label: "fast/slow" }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "n", value: 2 }, { name: "gap needed", value: "n+1 = 3 (so slow stops BEFORE target)" }] },
      ],
    },
    {
      description:
        "Create the gap: advance fast n+1 = 3 times from dummy → 1 → 2 → 3. Now fast points to node 3 and slow still points to dummy. The gap is exactly 3 nodes. Why n+1 instead of n? Because we want slow to end up at the node BEFORE the one to delete (so we can rewire the pointers). The extra step ensures slow is one position earlier.",
      codeHighlightLines: [4, 5],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d", label: "slow" }, { value: 1 }, { value: 2 }, { value: 3, highlight: "active", label: "fast" }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "gap", value: "3 nodes apart", highlight: true }, { name: "why n+1?", value: "slow must land BEFORE target" }] },
      ],
    },
    {
      description:
        "Move both pointers in lockstep until fast reaches null. Fast: 3→4→5→null (3 more hops). Slow: dummy→1→2→3 (same 3 hops). The gap is preserved! Now slow is at node 3, and slow.next is node 4 — the 2nd node from the end. The math: when fast is at null, it's traveled (length + 1) positions from dummy. Slow has traveled (length + 1 - gap) = (length + 1) - (n+1) = length - n positions. That's exactly the node before the nth-from-end.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d" }, { value: 1 }, { value: 2 }, { value: 3, highlight: "active", label: "slow" }, { value: 4, highlight: "found" }, { value: 5 }] },
        { type: "variables", entries: [{ name: "fast", value: "null (end of list)" }, { name: "slow.next", value: "node 4 (target!)", highlight: true }] },
      ],
    },
    {
      description:
        "Delete the target by skipping it: slow.next = slow.next.next, which makes node 3 point directly to node 5, bypassing node 4. Return dummy.next to get the head of the modified list: 1→2→3→5. The dummy node was essential here — if n equaled the list length (removing the head), slow would still be at dummy, and dummy.next = dummy.next.next correctly skips the old head. Time: O(n) — single pass. Space: O(1).",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "linkedlist", label: "result", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 5, highlight: "success" }] },
        { type: "variables", entries: [{ name: "removed", value: "node 4" }, { name: "return", value: "1→2→3→5", highlight: true }, { name: "Time", value: "O(n)" }] },
      ],
    },
  ],
};

export default solution;
