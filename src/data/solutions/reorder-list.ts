import { SolutionData } from "../types";

const solution: SolutionData = {
  label: "Split, Reverse, Merge",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  code: `def reorder_list(head):
    # Find middle
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    # Reverse second half
    second = slow.next
    slow.next = None
    prev = None
    while second:
        tmp = second.next
        second.next = prev
        prev = second
        second = tmp
    # Merge two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,
  steps: [
    {
      description:
        "Reorder L0→L1→...→Ln to L0→Ln→L1→Ln-1→L2→Ln-2→... (interleave from both ends). The O(1) space approach uses three classic linked list techniques: (1) find middle with slow/fast pointers, (2) reverse second half, (3) merge halves by alternating. Input: 1→2→3→4→5.",
      codeHighlightLines: [1],
      structures: [
        { type: "linkedlist", label: "original list", nodes: [{ value: 1, label: "head" }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }] },
        { type: "variables", entries: [{ name: "goal", value: "1→5→2→4→3" }] },
      ],
    },
    {
      description:
        "Step 1 — Find the middle: slow starts at head, fast at head.next. Move slow 1 step, fast 2 steps until fast reaches end. Slow ends at node 3 (the middle). Why head.next for fast? This makes slow land at the LEFT middle for even-length lists, giving us equal or slightly larger first half.",
      codeHighlightLines: [2, 3, 4, 5, 6],
      structures: [
        { type: "linkedlist", label: "finding middle", nodes: [{ value: 1 }, { value: 2 }, { value: 3, highlight: "active", label: "slow" }, { value: 4 }, { value: 5, label: "fast" }] },
        { type: "variables", entries: [{ name: "slow", value: "node 3 (middle)" }, { name: "fast", value: "node 5 (end)" }] },
      ],
    },
    {
      description:
        "Split into two lists: second = slow.next (node 4), then slow.next = None to disconnect. First half: 1→2→3. Second half: 4→5. The disconnect is critical — without it, the reversal would corrupt the first half.",
      codeHighlightLines: [8, 9],
      structures: [
        { type: "linkedlist", label: "first half", nodes: [{ value: 1, highlight: "active" }, { value: 2, highlight: "active" }, { value: 3, highlight: "active" }] },
        { type: "linkedlist", label: "second half", nodes: [{ value: 4, highlight: "active" }, { value: 5, highlight: "active" }] },
      ],
    },
    {
      description:
        "Step 2 — Reverse the second half: Standard iterative reversal. Node 4: save tmp=5, point 4.next=None, prev=4, curr=5. Node 5: save tmp=None, point 5.next=4, prev=5, curr=None. Done. Second half is now 5→4. 'prev' (node 5) is the new head.",
      codeHighlightLines: [10, 11, 12, 13, 14, 15],
      structures: [
        { type: "linkedlist", label: "first half", nodes: [{ value: 1, highlight: "active" }, { value: 2, highlight: "active" }, { value: 3, highlight: "active" }] },
        { type: "linkedlist", label: "second half (reversed)", nodes: [{ value: 5, highlight: "success", label: "prev" }, { value: 4, highlight: "success" }] },
      ],
    },
    {
      description:
        "Step 3 — Merge by interleaving: first=1, second=5. Save tmp1=first.next(2), tmp2=second.next(4). Wire: first.next=second → 1→5. Then second.next=tmp1 → 5→2. Advance: first=tmp1(2), second=tmp2(4). Chain so far: 1→5→2...",
      codeHighlightLines: [17, 18, 19, 20, 21],
      structures: [
        { type: "linkedlist", label: "merging...", nodes: [{ value: 1, highlight: "success" }, { value: 5, highlight: "success" }, { value: 2, highlight: "active", label: "first" }, { value: 3 }] },
        { type: "variables", entries: [{ name: "first", value: "node 2" }, { name: "second", value: "node 4" }, { name: "wired", value: "1→5→2" }] },
      ],
    },
    {
      description:
        "Next iteration: first=2, second=4. Save tmp1=3, tmp2=None. Wire: 2→4, then 4→3. Advance: first=3, second=None. second is None — loop ends. Final: 1→5→2→4→3. Three linear passes total (find middle + reverse + merge). Time: O(n). Space: O(1) — only pointer variables.",
      codeHighlightLines: [18, 19, 20, 21, 22],
      structures: [
        { type: "linkedlist", label: "reordered list (final)", nodes: [{ value: 1, highlight: "success" }, { value: 5, highlight: "success" }, { value: 2, highlight: "success" }, { value: 4, highlight: "success" }, { value: 3, highlight: "success" }] },
        { type: "variables", entries: [{ name: "result", value: "1→5→2→4→3", highlight: true }, { name: "Time", value: "O(n)" }, { name: "Space", value: "O(1)" }] },
      ],
    },
  ],
};

export default solution;
