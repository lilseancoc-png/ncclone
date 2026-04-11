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
        "Remove the nth node from the end in one pass. Trick: two pointers with a gap of n+1. When fast hits null, slow is right before the target. Dummy node handles edge case of removing the head. List: 1→2→3→4→5, n=2 (remove 4, the 2nd from end).",
      codeHighlightLines: [1, 2, 3],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d", label: "fast/slow" }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "n", value: 2 }, { name: "gap needed", value: "n+1 = 3" }] },
      ],
    },
    {
      description:
        "Create the gap: advance fast n+1=3 times. Step 1: fast→node(1). Step 2: fast→node(2). Step 3: fast→node(3). Now fast is at node 3, slow is still at dummy. Gap = 3 nodes. Why n+1? So slow lands BEFORE the target (we need the predecessor to rewire).",
      codeHighlightLines: [4, 5],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d", label: "slow" }, { value: 1 }, { value: 2 }, { value: 3, highlight: "active", label: "fast" }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "fast moved", value: "d→1→2→3 (3 steps)" }, { name: "gap", value: "3 nodes", highlight: true }] },
      ],
    },
    {
      description:
        "Move both in lockstep. Step 1: fast→4, slow→1. Step 2: fast→5, slow→2. Now fast is at node 5, slow is at node 2.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d" }, { value: 1 }, { value: 2, highlight: "active", label: "slow" }, { value: 3 }, { value: 4 }, { value: 5, highlight: "active", label: "fast" }] },
        { type: "variables", entries: [{ name: "slow", value: "node(2)" }, { name: "fast", value: "node(5)" }, { name: "gap maintained", value: "3 nodes" }] },
      ],
    },
    {
      description:
        "Step 3: fast→null, slow→3. fast is null → loop ends. Slow is at node 3, and slow.next is node 4 — the 2nd from end, our target. The math: fast traveled length+1 from dummy. slow traveled length+1-gap = length-n. That's the node right before the target.",
      codeHighlightLines: [6, 7, 8],
      structures: [
        { type: "linkedlist", label: "list", nodes: [{ value: "d" }, { value: 1 }, { value: 2 }, { value: 3, highlight: "active", label: "slow" }, { value: 4, highlight: "found", label: "target" }, { value: 5 }] },
        { type: "variables", entries: [{ name: "fast", value: "null (done)" }, { name: "slow", value: "node(3)" }, { name: "slow.next", value: "node(4) = target!", highlight: true }] },
      ],
    },
    {
      description:
        "Delete: slow.next = slow.next.next → node(3).next = node(5), bypassing node(4). Node 4 is removed from the list. Return dummy.next = node(1).",
      codeHighlightLines: [9, 10],
      structures: [
        { type: "linkedlist", label: "before deletion", nodes: [{ value: 1 }, { value: 2 }, { value: 3, highlight: "active" }, { value: 4, highlight: "checked" }, { value: 5 }] },
        { type: "linkedlist", label: "after deletion", nodes: [{ value: 1, highlight: "success" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 5, highlight: "success" }] },
        { type: "variables", entries: [{ name: "3.next = 5", value: "node(4) bypassed!", highlight: true }] },
      ],
    },
    {
      description:
        "Return 1→2→3→5. Node 4 (2nd from end) successfully removed. The dummy node was key — if we were removing node 1 (the head), slow would still be at dummy, and dummy.next = node(2) correctly returns the new head. Time: O(n) — single pass. Space: O(1).",
      codeHighlightLines: [10],
      structures: [
        { type: "linkedlist", label: "result", nodes: [{ value: 1, highlight: "success", label: "head" }, { value: 2, highlight: "success" }, { value: 3, highlight: "success" }, { value: 5, highlight: "success" }] },
        { type: "variables", entries: [{ name: "return", value: "1→2→3→5", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;
