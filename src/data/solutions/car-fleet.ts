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
          "Cars drive toward a target. A slower car blocks faster cars behind it, forming a fleet. Sort by position (descending — closest to target first). For each car, compute arrival time = (target - position) / speed. If a car arrives at or before the car ahead, they merge. Track distinct fleet times on a stack. target=12, position=[10,8,0,5,3], speed=[2,4,1,1,3].",
        codeHighlightLines: [1, 2, 3],
        structures: [
          { type: "array", label: "position", values: [10, 8, 0, 5, 3] },
          { type: "array", label: "speed", values: [2, 4, 1, 1, 3] },
          { type: "variables", entries: [{ name: "target", value: 12 }] },
        ],
      },
      {
        description:
          "Sort by position descending: [(10,2), (8,4), (5,1), (3,3), (0,1)]. Car closest to target is processed first. Process car at position 10, speed 2: arrival time = (12-10)/2 = 1.0s. Push 1.0 onto stack. This car forms the first potential fleet.",
        codeHighlightLines: [2, 4, 5, 6],
        structures: [
          { type: "array", label: "sorted (pos desc)", values: ["(10,2)", "(8,4)", "(5,1)", "(3,3)", "(0,1)"], highlights: { 0: "active" } },
          { type: "stack", label: "fleet times", values: ["1.0"], topHighlight: true },
          { type: "variables", entries: [{ name: "car @10", value: "time = (12-10)/2 = 1.0" }] },
        ],
      },
      {
        description:
          "Car at position 8, speed 4: time = (12-8)/4 = 1.0s. Push 1.0. Check: stack[-1]=1.0 <= stack[-2]=1.0? YES — this car arrives at the same time as the fleet ahead. It merges! Pop it. Stack stays [1.0]. One fleet so far.",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          { type: "array", label: "sorted (pos desc)", values: ["(10,2)", "(8,4)", "(5,1)", "(3,3)", "(0,1)"], highlights: { 0: "checked", 1: "active" } },
          { type: "stack", label: "fleet times", values: ["1.0"] },
          { type: "variables", entries: [{ name: "car @8", value: "time=1.0 ≤ 1.0 → merged!", highlight: true }] },
        ],
      },
      {
        description:
          "Car at position 5, speed 1: time = (12-5)/1 = 7.0s. Push 7.0. Check: 7.0 <= 1.0? NO — this car is much slower and won't catch the fleet ahead. New fleet! Stack = [1.0, 7.0]. Two fleets now.",
        codeHighlightLines: [4, 5, 6, 7],
        structures: [
          { type: "array", label: "sorted (pos desc)", values: ["(10,2)", "(8,4)", "(5,1)", "(3,3)", "(0,1)"], highlights: { 2: "active" } },
          { type: "stack", label: "fleet times", values: ["1.0", "7.0"], topHighlight: true },
          { type: "variables", entries: [{ name: "car @5", value: "time=7.0 > 1.0 → new fleet" }] },
        ],
      },
      {
        description:
          "Car at position 3, speed 3: time = (12-3)/3 = 3.0s. Push 3.0. Check: 3.0 <= 7.0? YES — this faster car catches the slow fleet ahead. Merge! Pop 3.0. Stack = [1.0, 7.0]. Still two fleets.",
        codeHighlightLines: [4, 5, 6, 7, 8],
        structures: [
          { type: "array", label: "sorted (pos desc)", values: ["(10,2)", "(8,4)", "(5,1)", "(3,3)", "(0,1)"], highlights: { 3: "active" } },
          { type: "stack", label: "fleet times", values: ["1.0", "7.0"] },
          { type: "variables", entries: [{ name: "car @3", value: "time=3.0 ≤ 7.0 → merged!", highlight: true }] },
        ],
      },
      {
        description:
          "Car at position 0, speed 1: time = (12-0)/1 = 12.0s. Push 12.0. Check: 12.0 <= 7.0? NO — new fleet! Stack = [1.0, 7.0, 12.0]. Return len(stack) = 3 car fleets. Fleet 1: cars at 10 and 8 (time 1.0). Fleet 2: cars at 5 and 3 (time 7.0). Fleet 3: car at 0 (time 12.0). Time: O(n log n) for sorting.",
        codeHighlightLines: [4, 5, 6, 7, 9],
        structures: [
          { type: "stack", label: "fleet times (final)", values: ["1.0", "7.0", "12.0"] },
          { type: "variables", entries: [{ name: "return", value: 3, highlight: true }, { name: "fleet 1", value: "cars @10,8 (time=1.0)" }, { name: "fleet 2", value: "cars @5,3 (time=7.0)" }, { name: "fleet 3", value: "car @0 (time=12.0)" }] },
        ],
      },
    ],
  },
];

export default solutions;
