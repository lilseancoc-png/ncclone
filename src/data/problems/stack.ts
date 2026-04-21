import { Category } from "../types";

export const stack: Category = {
  name: "Stack",
  slug: "stack",
  problems: [
    {
      id: 20,
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      difficulty: "Easy",
      leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. A string is valid if open brackets are closed by the same type and in the correct order.",
      functionName: "isValid",
      starterCode: {
        javascript: "function isValid(s) {\n  \n}",
        python: "def is_valid(s):\n    pass",
        java: "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 's = "()"',
          inputArgs: ["()"],
          expected: true,
        },
        {
          id: 2,
          input: 's = "()[]{}"',
          inputArgs: ["()[]{}"],
          expected: true,
        },
        {
          id: 3,
          input: 's = "(]"',
          inputArgs: ["(]"],
          expected: false,
        },
      ],
      patterns: ["Stack", "String", "Hash Map"],
      hints: [
        "Think about what data structure naturally handles matching pairs in a last-in, first-out order.",
        "Use a stack to track opening brackets, and a hash map to quickly look up which closing bracket matches which opening bracket.",
        "For each character: if it's an opening bracket, push it. If it's a closing bracket, check that the stack is non-empty and the top matches. At the end, the stack must be empty.",
      ],
      keyIntuition:
        "Bracket matching is inherently a LIFO problem: the most recently opened bracket must be closed first. A stack naturally enforces this nesting constraint. By pushing openers and popping on closers, we verify that every bracket is closed in the correct order.",
      approach:
        "Push opening brackets onto a stack. When a closing bracket is encountered, check if it matches the top of the stack. If the stack is empty or the brackets don't match, the string is invalid. The string is valid only if the stack is empty at the end.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 155,
      title: "Min Stack",
      slug: "min-stack",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/min-stack/",
      description:
        "Design a stack that supports push, pop, top, and retrieving the minimum element, all in O(1) time. Implement the MinStack class with methods: push(val), pop(), top(), and getMin().",
      functionName: "MinStack",
      runner: { kind: "class-ops", className: "MinStack" },
      starterCode: {
        javascript:
          "class MinStack {\n  constructor() {\n    \n  }\n\n  push(val) {\n    \n  }\n\n  pop() {\n    \n  }\n\n  top() {\n    \n  }\n\n  getMin() {\n    \n  }\n}",
        python:
          "class MinStack:\n    def __init__(self):\n        pass\n\n    def push(self, val):\n        pass\n\n    def pop(self):\n        pass\n\n    def top(self):\n        pass\n\n    def get_min(self):\n        pass",
        java: "class MinStack {\n    public MinStack() {\n        \n    }\n\n    public void push(int val) {\n        \n    }\n\n    public void pop() {\n        \n    }\n\n    public int top() {\n        \n    }\n\n    public int getMin() {\n        \n    }\n}",
        cpp: "class MinStack {\npublic:\n    MinStack() {\n        \n    }\n\n    void push(int val) {\n        \n    }\n\n    void pop() {\n        \n    }\n\n    int top() {\n        \n    }\n\n    int getMin() {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input:
            "push(-2), push(0), push(-3), getMin(), pop(), top(), getMin()",
          inputArgs: [
            ["push", "push", "push", "getMin", "pop", "top", "getMin"],
            [[-2], [0], [-3], [], [], [], []],
          ],
          expected: [null, null, null, -3, null, 0, -2],
        },
      ],
      patterns: ["Stack", "Design"],
      hints: [
        "The main stack handles values easily. How do you track the minimum without scanning the whole stack on every getMin?",
        "Store the running minimum alongside each value, so the minimum is always accessible in O(1).",
        "Use two stacks (or one stack of pairs). On push, compute min(val, currentMin) and push that to the min stack. On pop, pop from both.",
      ],
      keyIntuition:
        "The trick is realizing that the minimum at any point depends only on what's currently in the stack. By storing the 'min so far' at each level, you effectively maintain a history of minimums that aligns with stack history. Popping naturally restores the previous minimum — no rescan needed.",
      approach:
        "Maintain two stacks: a main stack for values and a second stack that tracks the current minimum. On each push, push the new minimum (min of current value and previous minimum) onto the min stack. This ensures O(1) access to the minimum at any point.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(n)",
    },
    {
      id: 150,
      title: "Evaluate Reverse Polish Notation",
      slug: "evaluate-reverse-polish-notation",
      difficulty: "Medium",
      leetcodeUrl:
        "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
      description:
        "Evaluate the value of an arithmetic expression in Reverse Polish Notation (postfix notation). Valid operators are +, -, *, /. Each operand may be an integer or another expression. Division truncates toward zero.",
      functionName: "evalRPN",
      starterCode: {
        javascript: "function evalRPN(tokens) {\n  \n}",
        python: "def eval_rpn(tokens):\n    pass",
        java: "class Solution {\n    public int evalRPN(String[] tokens) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: 'tokens = ["2","1","+","3","*"]',
          inputArgs: [["2", "1", "+", "3", "*"]],
          expected: 9,
        },
        {
          id: 2,
          input: 'tokens = ["4","13","5","/","+"]',
          inputArgs: [["4", "13", "5", "/", "+"]],
          expected: 6,
        },
      ],
      patterns: ["Stack", "Math"],
      hints: [
        "RPN puts operators after their operands. How does that match a stack's behavior?",
        "Push operands onto a stack. When you see an operator, it applies to the top two stack values.",
        "For each token: if it's a number, push it. If it's an operator, pop two numbers (right then left), compute, and push the result.",
      ],
      keyIntuition:
        "Reverse Polish Notation eliminates the need for parentheses because operator precedence is encoded in token order. A stack is the perfect match: each operator's operands are always the most recent values pushed. This same stack-evaluation pattern is how compilers evaluate expressions internally after converting infix to postfix.",
      approach:
        "Process tokens left to right using a stack. Push numbers onto the stack. When an operator is encountered, pop the top two numbers, apply the operation, and push the result back. The final value on the stack is the answer.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 22,
      title: "Generate Parentheses",
      slug: "generate-parentheses",
      difficulty: "Medium",
      compareMode: "unordered",
      leetcodeUrl: "https://leetcode.com/problems/generate-parentheses/",
      description:
        "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
      functionName: "generateParenthesis",
      starterCode: {
        javascript: "function generateParenthesis(n) {\n  \n}",
        python: "def generate_parenthesis(n):\n    pass",
        java: "class Solution {\n    public List<String> generateParenthesis(int n) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "n = 3",
          inputArgs: [3],
          expected: ["((()))", "(()())", "(())()", "()(())", "()()()"],
        },
        {
          id: 2,
          input: "n = 1",
          inputArgs: [1],
          expected: ["()"],
        },
      ],
      patterns: ["Backtracking", "Stack", "Recursion"],
      hints: [
        "Any valid string has exactly n opening and n closing parens. At each step, which characters can you legally add?",
        "You can add '(' only if you haven't used all n opens. You can add ')' only if there are more opens than closes in the current string.",
        "Backtrack: at each call, try adding '(' if open < n, and try adding ')' if close < open. When length == 2n, record the string.",
      ],
      keyIntuition:
        "Instead of generating all 2^(2n) strings and filtering, prune invalid branches early. The two rules — open ≤ n and close ≤ open — encode 'well-formed' directly into the search tree. This is the essence of backtracking: explore choices, but abandon paths that can't lead to valid solutions.",
      approach:
        "Use backtracking, tracking the count of open and close parentheses used so far. Add an open parenthesis if the count is less than n, and add a close parenthesis if the close count is less than the open count. This ensures only valid combinations are generated.",
      timeComplexity: "O(4^n / sqrt(n))",
      spaceComplexity: "O(n)",
    },
    {
      id: 739,
      title: "Daily Temperatures",
      slug: "daily-temperatures",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
      description:
        "Given an array of integers temperatures representing daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day with a warmer temperature, set answer[i] to 0.",
      functionName: "dailyTemperatures",
      starterCode: {
        javascript: "function dailyTemperatures(temperatures) {\n  \n}",
        python: "def daily_temperatures(temperatures):\n    pass",
        java: "class Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "temperatures = [73,74,75,71,69,72,76,73]",
          inputArgs: [[73, 74, 75, 71, 69, 72, 76, 73]],
          expected: [1, 1, 4, 2, 1, 1, 0, 0],
        },
        {
          id: 2,
          input: "temperatures = [30,40,50,60]",
          inputArgs: [[30, 40, 50, 60]],
          expected: [1, 1, 1, 0],
        },
      ],
      patterns: ["Monotonic Stack", "Array"],
      hints: [
        "For each day, you're looking for the next day with a higher value. This is the classic 'next greater element' problem.",
        "Keep a stack of indices whose warmer day you haven't found yet. The stack stays monotonically decreasing in temperature.",
        "Iterate through temperatures. While stack is non-empty and current temp > stack top's temp, pop and set answer[poppedIdx] = currentIdx - poppedIdx. Then push currentIdx.",
      ],
      keyIntuition:
        "A monotonic decreasing stack stores days waiting for their answer. When a warmer day arrives, it resolves all colder days on the stack at once. Each index is pushed and popped at most once, giving O(n). This 'next greater element' template is one of the most reusable stack patterns.",
      approach:
        "Use a monotonic decreasing stack storing indices. For each new temperature, pop all indices from the stack whose temperatures are smaller, calculating the difference in days. This efficiently finds the next warmer day for each position.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 853,
      title: "Car Fleet",
      slug: "car-fleet",
      difficulty: "Medium",
      leetcodeUrl: "https://leetcode.com/problems/car-fleet/",
      description:
        "There are n cars going to the same destination along a one-lane road. Given the target distance and arrays of starting positions and speeds, determine the number of car fleets that will arrive at the destination. A car fleet is formed when a faster car catches up to a slower one ahead.",
      functionName: "carFleet",
      starterCode: {
        javascript: "function carFleet(target, position, speed) {\n  \n}",
        python: "def car_fleet(target, position, speed):\n    pass",
        java: "class Solution {\n    public int carFleet(int target, int[] position, int[] speed) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int carFleet(int target, vector<int>& position, vector<int>& speed) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]",
          inputArgs: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]],
          expected: 3,
        },
        {
          id: 2,
          input: "target = 10, position = [3], speed = [3]",
          inputArgs: [10, [3], [3]],
          expected: 1,
        },
      ],
      patterns: ["Stack", "Sorting", "Monotonic Stack"],
      hints: [
        "A faster car catches up to a slower one and then moves at the slower speed. Process cars in order of position.",
        "For each car, compute time = (target - position) / speed. Sort by position descending so you process the leading car first.",
        "Use a stack of arrival times. If a car behind has a shorter or equal time, it catches up and merges. If longer, it's its own fleet. Count stack size at the end.",
      ],
      keyIntuition:
        "Cars can only merge, never unmerge. Sorting by position means you process leading cars first — their time defines the fleet they lead. Any following car with a smaller or equal time gets absorbed. The stack naturally keeps only the 'leader' times that define separate fleets.",
      approach:
        "Sort cars by position in descending order. Calculate the time each car takes to reach the target. Use a stack to track fleets: if a car takes longer than the car ahead, it forms a new fleet; otherwise, it merges into the fleet ahead.",
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
    },
    {
      id: 84,
      title: "Largest Rectangle in Histogram",
      slug: "largest-rectangle-in-histogram",
      difficulty: "Hard",
      leetcodeUrl:
        "https://leetcode.com/problems/largest-rectangle-in-histogram/",
      description:
        "Given an array of integers heights representing the histogram's bar heights where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
      functionName: "largestRectangleArea",
      starterCode: {
        javascript: "function largestRectangleArea(heights) {\n  \n}",
        python: "def largest_rectangle_area(heights):\n    pass",
        java: "class Solution {\n    public int largestRectangleArea(int[] heights) {\n        \n    }\n}",
        cpp: "class Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        \n    }\n};",
      },
      testCases: [
        {
          id: 1,
          input: "heights = [2,1,5,6,2,3]",
          inputArgs: [[2, 1, 5, 6, 2, 3]],
          expected: 10,
        },
        {
          id: 2,
          input: "heights = [2,4]",
          inputArgs: [[2, 4]],
          expected: 4,
        },
      ],
      patterns: ["Monotonic Stack", "Array"],
      hints: [
        "For each bar, imagine the largest rectangle with that bar as the shortest. You need to know how far left and right it extends before hitting a shorter bar.",
        "A monotonic increasing stack of bar indices lets you find, for each bar, the first shorter bar on its left (below it in stack) and on its right (the one that pops it).",
        "Iterate through heights. While stack top is taller than current bar, pop it and compute width × height. Push current index. Process remaining stack after the loop using a sentinel.",
      ],
      keyIntuition:
        "The max-area rectangle is bounded by the shortest bar it contains. So for each bar, find the maximal left-right extent where it's still the minimum. A monotonic increasing stack gives you both boundaries in amortized O(1): the first shorter bar on the left is just below it, and the one that causes it to pop is on the right. This is the quintessential monotonic-stack problem.",
      approach:
        "Use a monotonic increasing stack to track bar indices. When a shorter bar is found, pop taller bars and calculate the area they can form using the current boundaries. This efficiently finds the maximum rectangle by determining how far each bar can extend left and right.",
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  ],
};
