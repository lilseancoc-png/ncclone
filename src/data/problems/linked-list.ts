import { Category } from "../types";

export const linkedList: Category = {
  name: "Linked List",
  slug: "linked-list",
  problems: [
    {
      id: 206,
      title: "Reverse Linked List",
      slug: "reverse-linked-list",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
      description:
        "Given the head of a singly linked list, reverse the list and return the reversed list. The input and output are represented as arrays for testing purposes.",
      functionName: "reverseList",
      runner: {
        kind: "linked-list",
        listInputIndices: [0],
        returnsList: true,
      },
      starterCode: {
        javascript: "function reverseList(head) {\n  \n}",
        python: "def reverse_list(head):\n    pass",
        java: "class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "head = [1,2,3,4,5]",
          inputArgs: [[1, 2, 3, 4, 5]],
          expected: [5, 4, 3, 2, 1],
        },
        {
          id: 2,
          input: "head = [1,2]",
          inputArgs: [[1, 2]],
          expected: [2, 1],
        },
        {
          id: 3,
          input: "head = []",
          inputArgs: [[]],
          expected: [],
        },
      ],
      patterns: ["Linked List", "In-Place Reversal"],
      hints: [
        "You need to change where each node's next pointer points. Think about what information you'll lose when you redirect a pointer.",
        "Use three pointers: one for the previous node, one for the current node, and one to temporarily save the next node before you overwrite the link.",
        "Initialize prev = null, curr = head. In a loop: save next = curr.next, set curr.next = prev, advance prev = curr, curr = next. Return prev when curr is null.",
      ],
      keyIntuition:
        "Reversing a linked list is about redirecting each node's next pointer backward. By keeping a reference to the previous node and temporarily saving the next node before overwriting, you can reverse the entire chain in a single pass. This in-place reversal technique is a fundamental building block used in many other linked list problems.",
      approach:
        "Iterate through the list, reversing each node's next pointer to point to the previous node. Maintain three pointers: previous, current, and next. After processing all nodes, the previous pointer becomes the new head.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 21,
      title: "Merge Two Sorted Lists",
      slug: "merge-two-sorted-lists",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
      description:
        "Merge two sorted linked lists and return it as a single sorted list. The lists are represented as arrays for testing. The merged list should be made by splicing together the nodes of the first two lists.",
      functionName: "mergeTwoLists",
      runner: {
        kind: "linked-list",
        listInputIndices: [0, 1],
        returnsList: true,
      },
      starterCode: {
        javascript: "function mergeTwoLists(list1, list2) {\n  \n}",
        python: "def merge_two_lists(list1, list2):\n    pass",
        java: "class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "list1 = [1,2,4], list2 = [1,3,4]",
          inputArgs: [[1, 2, 4], [1, 3, 4]],
          expected: [1, 1, 2, 3, 4, 4],
        },
        {
          id: 2,
          input: "list1 = [], list2 = []",
          inputArgs: [[], []],
          expected: [],
        },
        {
          id: 3,
          input: "list1 = [], list2 = [0]",
          inputArgs: [[], [0]],
          expected: [0],
        },
      ],
      patterns: ["Linked List", "Two Pointers", "Recursion"],
      hints: [
        "You can pick the smaller head each step, but what about edge cases when one list runs out?",
        "A dummy head simplifies the code — you don't need special logic for the first node of the result.",
        "Use a tail pointer starting at dummy. While both lists have nodes, attach the smaller one and advance. Finally, attach whatever's left.",
      ],
      keyIntuition:
        "The dummy node trick eliminates the special case of empty result. Instead of 'if result is empty, set head; else append', you always just append — the dummy's next becomes the real head. This pattern is indispensable in linked list problems to avoid null-check noise.",
      approach:
        "Use a dummy head node and a pointer to build the merged list. Compare the current nodes of both lists, appending the smaller one to the result and advancing that list's pointer. Attach any remaining nodes from the non-empty list at the end.",
      timeComplexity: "O(n + m)",
      spaceComplexity: "O(1)",
    },
    {
      id: 143,
      title: "Reorder List",
      slug: "reorder-list",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
      description:
        "Given the head of a singly linked list L0 -> L1 -> ... -> Ln-1 -> Ln, reorder it to L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ... You may not modify the values, only rearrange the nodes. Input and output are represented as arrays.",
      functionName: "reorderList",
      runner: {
        kind: "linked-list",
        listInputIndices: [0],
        inPlace: true,
      },
      starterCode: {
        javascript: "function reorderList(head) {\n  \n}",
        python: "def reorder_list(head):\n    pass",
        java: "class Solution {\n    public void reorderList(ListNode head) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    void reorderList(ListNode* head) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "head = [1,2,3,4]",
          inputArgs: [[1, 2, 3, 4]],
          expected: [1, 4, 2, 3],
        },
        {
          id: 2,
          input: "head = [1,2,3,4,5]",
          inputArgs: [[1, 2, 3, 4, 5]],
          expected: [1, 5, 2, 4, 3],
        },
      ],
      patterns: ["Linked List", "Two Pointers", "In-Place Reversal"],
      hints: [
        "Look at the pattern: you're zipping the first half with the reversed second half.",
        "Three subproblems: (1) find middle, (2) reverse second half, (3) merge by alternating.",
        "Use slow/fast pointers to find middle. Reverse from slow.next. Then weave the two halves: first, reversed, first, reversed, ...",
      ],
      keyIntuition:
        "Complex linked-list problems often decompose into three canonical operations: find middle (slow/fast), reverse, and merge. Recognizing that 'reorder' is really 'zip first half with reversed second half' unlocks a clean O(1) space solution — otherwise you'd need an array to random-access the nodes.",
      approach:
        "Find the middle of the list using slow/fast pointers. Reverse the second half of the list in place. Then merge the two halves by alternating nodes from the first and reversed second half. This achieves the reordering without extra space.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 19,
      title: "Remove Nth Node From End of List",
      slug: "remove-nth-node-from-end-of-list",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
      description:
        "Given the head of a linked list, remove the nth node from the end of the list and return its head. The list is represented as an array for testing purposes.",
      functionName: "removeNthFromEnd",
      runner: {
        kind: "linked-list",
        listInputIndices: [0],
        returnsList: true,
      },
      starterCode: {
        javascript: "function removeNthFromEnd(head, n) {\n  \n}",
        python: "def remove_nth_from_end(head, n):\n    pass",
        java: "class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "head = [1,2,3,4,5], n = 2",
          inputArgs: [[1, 2, 3, 4, 5], 2],
          expected: [1, 2, 3, 5],
        },
        {
          id: 2,
          input: "head = [1], n = 1",
          inputArgs: [[1], 1],
          expected: [],
        },
        {
          id: 3,
          input: "head = [1,2], n = 1",
          inputArgs: [[1, 2], 1],
          expected: [1],
        },
      ],
      patterns: ["Linked List", "Two Pointers"],
      hints: [
        "You could do two passes (one to count, one to remove). Can you do it in a single pass?",
        "Two pointers with a gap: when the leading pointer reaches the end, the trailing pointer is n steps behind — exactly at the node to remove.",
        "Use a dummy head. Advance fast n steps. Then move both slow and fast together until fast.next is null. Now slow.next is the node to remove.",
      ],
      keyIntuition:
        "The 'gap' pointer pattern converts a 'from-the-end' question into a 'from-the-start' pattern without knowing the length. Maintaining a fixed gap between two pointers is a fundamental linked-list technique for single-pass traversals. The dummy node again handles the 'remove head' edge case gracefully.",
      approach:
        "Use two pointers with a gap of n nodes between them. Advance the first pointer n steps ahead, then move both pointers together until the first reaches the end. The second pointer will be just before the node to remove. Use a dummy head to handle edge cases.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 138,
      title: "Copy List with Random Pointer",
      slug: "copy-list-with-random-pointer",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/copy-list-with-random-pointer/",
      description:
        "A linked list of length n is given where each node has an additional random pointer that could point to any node or null. Construct a deep copy of the list. The input is represented as an array of [val, randomIndex] pairs where randomIndex is the index of the node the random pointer points to, or null.",
      functionName: "copyRandomList",
      runner: { kind: "random-list" },
      starterCode: {
        javascript: "function copyRandomList(head) {\n  \n}",
        python: "def copy_random_list(head):\n    pass",
        java: "class Solution {\n    public Node copyRandomList(Node head) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    Node* copyRandomList(Node* head) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]",
          inputArgs: [
            [
              [7, null],
              [13, 0],
              [11, 4],
              [10, 2],
              [1, 0],
            ],
          ],
          expected: [
            [7, null],
            [13, 0],
            [11, 4],
            [10, 2],
            [1, 0],
          ],
        },
        {
          id: 2,
          input: "head = [[1,1],[2,1]]",
          inputArgs: [
            [
              [1, 1],
              [2, 1],
            ],
          ],
          expected: [
            [1, 1],
            [2, 1],
          ],
        },
      ],
      patterns: ["Linked List", "Hash Map"],
      hints: [
        "The random pointer can point anywhere in the list — including nodes you haven't created yet.",
        "First pass: create all the copy nodes and store a map: original → copy. Second pass: wire up next and random pointers using the map.",
        "You can't set curr.copy.random = curr.random.copy in one pass because curr.random's copy might not exist yet. Split into two passes.",
      ],
      keyIntuition:
        "Random pointers break the standard left-to-right linked list traversal because they can reference nodes that haven't been processed yet. The classic fix is 'create all the nodes first, then wire up pointers'. The HashMap translates original-node references into copy-node references. An O(1) space variant interleaves copies in the original list instead of using a map.",
      approach:
        "Use a HashMap mapping each original node to its copy. In the first pass, create all new nodes and store the mapping. In the second pass, set the next and random pointers for each copied node using the HashMap to look up corresponding copies.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 2,
      title: "Add Two Numbers",
      slug: "add-two-numbers",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
      description:
        "Two non-negative integers are represented as linked lists where each node contains a single digit, stored in reverse order. Add the two numbers and return the sum as a linked list in the same reverse-order format. Input and output are represented as arrays.",
      functionName: "addTwoNumbers",
      runner: {
        kind: "linked-list",
        listInputIndices: [0, 1],
        returnsList: true,
      },
      starterCode: {
        javascript: "function addTwoNumbers(l1, l2) {\n  \n}",
        python: "def add_two_numbers(l1, l2):\n    pass",
        java: "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "l1 = [2,4,3], l2 = [5,6,4]",
          inputArgs: [[2, 4, 3], [5, 6, 4]],
          expected: [7, 0, 8],
        },
        {
          id: 2,
          input: "l1 = [0], l2 = [0]",
          inputArgs: [[0], [0]],
          expected: [0],
        },
      ],
      patterns: ["Linked List", "Math"],
      hints: [
        "Digits are stored in reverse order — so the head is the least significant digit. That's convenient!",
        "Add digit by digit, tracking a carry. Remember to create nodes even when one list is longer than the other.",
        "While l1, l2, or carry is non-zero: sum = (l1?.val ?? 0) + (l2?.val ?? 0) + carry. New node with sum%10, carry = sum/10. Advance.",
      ],
      keyIntuition:
        "Because digits are reversed, adding them matches how you add numbers by hand — starting from the ones place. The trick is remembering to continue past the shorter list (treating its missing digits as 0) and to handle a trailing carry that extends the result. This simulates school-book arithmetic with linked list nodes.",
      approach:
        "Traverse both linked lists simultaneously, adding corresponding digits along with any carry from the previous addition. Create new nodes for each digit of the result. Continue until both lists are exhausted and no carry remains.",
      timeComplexity: "O(max(m, n))",
      spaceComplexity: "O(max(m, n))",
    },
    {
      id: 141,
      title: "Linked List Cycle",
      slug: "linked-list-cycle",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
      description:
        "Given the head of a linked list, determine if the linked list has a cycle. A cycle exists if some node can be reached again by continuously following the next pointer. The input is an array and a pos value indicating where the tail connects to (or -1 for no cycle).",
      functionName: "hasCycle",
      runner: {
        kind: "linked-list",
        listInputIndices: [0],
        cyclePosArgIndex: 1,
      },
      starterCode: {
        javascript: "function hasCycle(head) {\n  \n}",
        python: "def has_cycle(head):\n    pass",
        java: "class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool hasCycle(ListNode* head) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "head = [3,2,0,-4], pos = 1",
          inputArgs: [[3, 2, 0, -4], 1],
          expected: true,
        },
        {
          id: 2,
          input: "head = [1,2], pos = 0",
          inputArgs: [[1, 2], 0],
          expected: true,
        },
        {
          id: 3,
          input: "head = [1], pos = -1",
          inputArgs: [[1], -1],
          expected: false,
        },
      ],
      patterns: ["Linked List", "Two Pointers"],
      hints: [
        "A HashSet of visited nodes works, but uses O(n) space. Can you do it in O(1)?",
        "Floyd's algorithm: two pointers moving at different speeds. If there's a cycle, the faster one will lap the slower one.",
        "slow = head, fast = head. While fast and fast.next: slow = slow.next, fast = fast.next.next. If they meet → cycle. If fast hits null → no cycle.",
      ],
      keyIntuition:
        "The 'tortoise and hare' idea: on a cyclic track, the fast runner laps the slow one. With speeds 1 and 2, the gap shrinks by 1 each step, so they must collide. On a straight (non-cyclic) track, fast just reaches the end. This is an elegant space-time tradeoff — no extra memory at the cost of cleverness.",
      approach:
        "Use Floyd's cycle detection with slow and fast pointers. The slow pointer moves one step at a time while the fast pointer moves two steps. If a cycle exists, they will eventually meet; if the fast pointer reaches null, there is no cycle.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 287,
      title: "Find the Duplicate Number",
      slug: "find-the-duplicate-number",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
      description:
        "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, there is exactly one repeated number. Find and return this duplicate number without modifying the array and using only constant extra space.",
      functionName: "findDuplicate",
      starterCode: {
        javascript: "function findDuplicate(nums) {\n  \n}",
        python: "def find_duplicate(nums):\n    pass",
        java: "class Solution {\n    public int findDuplicate(int[] nums) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "nums = [1,3,4,2,2]",
          inputArgs: [[1, 3, 4, 2, 2]],
          expected: 2,
        },
        {
          id: 2,
          input: "nums = [3,1,3,4,2]",
          inputArgs: [[3, 1, 3, 4, 2]],
          expected: 3,
        },
      ],
      patterns: ["Linked List", "Two Pointers", "Binary Search"],
      hints: [
        "You can't sort, can't modify, can't use extra memory. What clever structural trick lets you use existing space?",
        "Treat the array as a linked list: i → nums[i]. The duplicate creates a cycle. Use Floyd's cycle detection.",
        "Phase 1: slow/fast pointers meet at a point inside the cycle. Phase 2: reset one pointer to the start; moving both by 1 step, they meet at the cycle's entrance — the duplicate.",
      ],
      keyIntuition:
        "Reframing: indices 0..n point to values 1..n, so treating i→nums[i] creates a mapping. A duplicate value means two indices map to the same next — a cycle. Floyd's algorithm then finds the cycle entrance, which is the duplicate. The 'restart one pointer to find entrance' is the beautiful but non-obvious second phase of Floyd's.",
      approach:
        "Treat the array as a linked list where index i points to nums[i]. Use Floyd's cycle detection algorithm to find the intersection point, then use a second pointer from the start to find the entrance to the cycle, which is the duplicate number.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
    {
      id: 146,
      title: "LRU Cache",
      slug: "lru-cache",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
      description:
        "Design a data structure that follows the Least Recently Used (LRU) cache constraints. Implement the LRUCache class with a capacity constructor, get(key) that returns the value or -1 if not found, and put(key, value) that inserts or updates a key-value pair, evicting the least recently used item when capacity is exceeded.",
      functionName: "LRUCache",
      runner: { kind: "class-ops", className: "LRUCache" },
      starterCode: {
        javascript:
          "class LRUCache {\n  constructor(capacity) {\n    \n  }\n\n  get(key) {\n    \n  }\n\n  put(key, value) {\n    \n  }\n}",
        python:
          "class LRUCache:\n    def __init__(self, capacity):\n        pass\n\n    def get(self, key):\n        pass\n\n    def put(self, key, value):\n        pass",
        java: "class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n\n    public int get(int key) {\n        \n    }\n\n    public void put(int key, int value) {\n        \n    }\n}",
        cpp: "class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n\n    int get(int key) {\n        \n    }\n\n    void put(int key, int value) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            "LRUCache(2), put(1,1), put(2,2), get(1), put(3,3), get(2), put(4,4), get(1), get(3), get(4)",
          inputArgs: [
            [
              "LRUCache",
              "put",
              "put",
              "get",
              "put",
              "get",
              "put",
              "get",
              "get",
              "get",
            ],
            [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
          ],
          expected: [null, null, null, 1, null, -1, null, -1, 3, 4],
        },
      ],
      patterns: ["Linked List", "Hash Map", "Design"],
      hints: [
        "You need O(1) lookup (HashMap) AND O(1) ordering updates (which HashMaps don't provide).",
        "Combine both: HashMap for lookup + doubly linked list for ordering. The doubly-linked list allows O(1) removal at any position.",
        "On get: find node via map, move to front. On put: if exists, update and move to front. Else, insert at front; if over capacity, evict tail and remove from map.",
      ],
      keyIntuition:
        "LRU's requirements clash: HashMaps give O(1) lookup but no order; linked lists give order but O(n) search. Combine them: HashMap maps keys to list nodes, giving O(1) access to any node. A doubly linked list makes it O(1) to remove from the middle and reinsert at front. This 'augmented data structure' pattern underlies many real-world caches.",
      approach:
        "Combine a HashMap for O(1) key lookups with a doubly linked list for O(1) order maintenance. The most recently used item is moved to the head of the list. When the cache exceeds capacity, evict the tail node (least recently used) and remove it from the map.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(n)",
    },
    {
      id: 23,
      title: "Merge K Sorted Lists",
      slug: "merge-k-sorted-lists",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/merge-k-sorted-lists/",
      description:
        "Given an array of k linked lists, each sorted in ascending order, merge all the linked lists into one sorted linked list and return it. Lists are represented as arrays for testing purposes.",
      functionName: "mergeKLists",
      runner: {
        kind: "linked-list",
        listOfListsInputIndices: [0],
        returnsList: true,
      },
      starterCode: {
        javascript: "function mergeKLists(lists) {\n  \n}",
        python: "def merge_k_lists(lists):\n    pass",
        java: "class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "lists = [[1,4,5],[1,3,4],[2,6]]",
          inputArgs: [
            [
              [1, 4, 5],
              [1, 3, 4],
              [2, 6],
            ],
          ],
          expected: [1, 1, 2, 3, 4, 4, 5, 6],
        },
        {
          id: 2,
          input: "lists = []",
          inputArgs: [[]],
          expected: [],
        },
      ],
      patterns: ["Linked List", "Heap", "Divide and Conquer"],
      hints: [
        "Naive: scan all k heads each step → O(nk). Can you find the min head faster?",
        "Use a min heap of size k holding the current heads. Pop smallest, add its next to the heap.",
        "Alternative: pairwise merge — merge lists 0&1, 2&3, ... Then merge the resulting lists pairwise again. O(n log k).",
      ],
      keyIntuition:
        "Two elegant approaches, both O(n log k). A min heap keeps the k candidates sorted, giving O(log k) per pop. Pairwise merging is a divide-and-conquer: log k rounds of merging, each processing O(n) nodes. Both are structured ways to avoid the naive O(nk) of scanning all heads each step.",
      approach:
        "Use a min heap (priority queue) to efficiently find the smallest element among the heads of all k lists. Pop the smallest node, add it to the result, and push its next node back into the heap. This avoids comparing all k heads on every step.",
      timeComplexity: "O(n log k)",
      spaceComplexity: "O(k)",
    },
    {
      id: 25,
      title: "Reverse Nodes in K-Group",
      slug: "reverse-nodes-in-k-group",
      difficulty: "Hard",
      leetcodeUrl: "https://leetcode.com/problems/reverse-nodes-in-k-group/",
      description:
        "Given the head of a linked list, reverse the nodes of the list k at a time and return the modified list. If the number of remaining nodes is less than k, leave them as-is. Only the nodes themselves may be changed, not the values. Input and output are represented as arrays.",
      functionName: "reverseKGroup",
      runner: {
        kind: "linked-list",
        listInputIndices: [0],
        returnsList: true,
      },
      starterCode: {
        javascript: "function reverseKGroup(head, k) {\n  \n}",
        python: "def reverse_k_group(head, k):\n    pass",
        java: "class Solution {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "head = [1,2,3,4,5], k = 2",
          inputArgs: [[1, 2, 3, 4, 5], 2],
          expected: [2, 1, 4, 3, 5],
        },
        {
          id: 2,
          input: "head = [1,2,3,4,5], k = 3",
          inputArgs: [[1, 2, 3, 4, 5], 3],
          expected: [3, 2, 1, 4, 5],
        },
      ],
      patterns: ["Linked List", "In-Place Reversal", "Recursion"],
      hints: [
        "This is 'reverse linked list' applied to chunks. But you need to stitch the reversed chunks back together correctly.",
        "Before reversing, verify that k more nodes exist. After reversing a group, track the tail of the previous reversed group so you can link to the new head.",
        "Use a dummy head. Loop: check if k nodes ahead exist; if so, reverse those k nodes, connect prevGroupTail to the new head, move prevGroupTail to the now-tail of this group.",
      ],
      keyIntuition:
        "Composing 'reverse linked list' over chunks is the high-level idea. The trickiest part is the bookkeeping: you need references to the node before the group and the node after, so you can rewire the chunk boundaries after reversal. This is a great exercise in managing pointer invariants — the kind of careful bookkeeping that shows up in production concurrency/linked-list code.",
      approach:
        "Count k nodes ahead to verify a full group exists. Reverse those k nodes in place using iterative pointer reversal, then connect the reversed group to the previous part. Repeat until fewer than k nodes remain, leaving those as-is.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
  ],
};
