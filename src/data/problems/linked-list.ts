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
      approach:
        "Count k nodes ahead to verify a full group exists. Reverse those k nodes in place using iterative pointer reversal, then connect the reversed group to the previous part. Repeat until fewer than k nodes remain, leaving those as-is.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
  ],
};
