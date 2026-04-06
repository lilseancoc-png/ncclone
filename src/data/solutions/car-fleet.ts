import { SolutionData } from "../types";

const solutions: SolutionData[] = [
  {
    label: "Sort + Stack",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    code: `def carFleet(target, position, speed):
    pairs = sorted(zip(position, speed), reverse=True)
    stack = []
    for pos, spd in pairs:
        time = (target - pos) / spd
        stack.append(time)
        if len(stack) >= 2 and stack[-1] <= stack[-2]:
            stack.pop()
    return len(stack)`,
    steps: [
      {
        description:
          "Cars at various positions drive toward a target. A slower car ahead blocks faster cars behind it, forming a fleet. Sort cars by position (descending — closest to target first). Track arrival times on a stack; if a car arrives before or at the same time as the car ahead, they merge into one fleet.",
        codeHighlightLines: [1, 2, 3],
        structures: [
          {
            type: "variables",
            entries: [
              { name: "target", value: 12 },
              { name: "position", value: "[10, 8, 0, 5, 3]" },
              { name: "speed", value: "[2, 4, 1, 1, 3]" },
            ],
          },
          { type: "stack", label: "fleets", values: [] },
        ],
      },
      {
        description:
          "Sorted by position (desc): [(10,2), (8,4), (5,1), (3,3), (0,1)]. Car at 10, speed 2: time = (12-10)/2 = 1.0. Push to stack.",
        codeHighlightLines: [4, 5, 6],
        structures: [
          {
            type: "array",
            label: "sorted pairs (pos, speed)",
            values: ["(10,2)", "(8,4)", "(5,1)", "(3,3)", "(0,1)"],
            highlights: { 0: "active" },
          },
          { type: "stack", label: "fleet times", values: ["1.0"], topHighlight: true },
        ],
      },
      {
        description:
          "Car at 8, speed 4: time = (12-8)/4 = 1.0. Push 1.0. stack[-1]=1.0 <= stack[-2]=1.0, so this car catches the fleet ahead — pop it. They merge into one fleet.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          {
            type: "array",
            label: "sorted pairs",
            values: ["(10,2)", "(8,4)", "(5,1)", "(3,3)", "(0,1)"],
            highlights: { 1: "active" },
          },
          { type: "stack", label: "fleet times", values: ["1.0"] },
          {
            type: "variables",
            entries: [{ name: "merged", value: "1.0 <= 1.0 → pop", highlight: true }],
          },
        ],
      },
      {
        description:
          "Car at 5, speed 1: time = 7.0. Push. 7.0 > 1.0, so this car is too slow to catch the fleet — new fleet. Car at 3, speed 3: time = 3.0. 3.0 <= 7.0 → merges. Car at 0, speed 1: time = 12.0 > 7.0 → new fleet.",
        codeHighlightLines: [5, 6, 7, 8],
        structures: [
          { type: "stack", label: "fleet times", values: ["1.0", "7.0", "12.0"], topHighlight: true },
          {
            type: "variables",
            entries: [{ name: "fleets", value: 3, highlight: true }],
          },
        ],
      },
      {
        description:
          "Return len(stack) = 3 car fleets. The stack height equals the number of fleets because each remaining entry represents a fleet that couldn't catch the one ahead of it.",
        codeHighlightLines: [9],
        structures: [
          { type: "stack", label: "fleet times", values: ["1.0", "7.0", "12.0"] },
          {
            type: "variables",
            entries: [{ name: "return", value: 3, highlight: true }],
          },
        ],
      },
    ],
  },
];

export default solutions;
