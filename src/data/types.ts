export type Difficulty = "Easy" | "Medium" | "Hard";

export type Language = "javascript" | "python" | "java" | "cpp";

export interface TestCase {
  id: number;
  input: string;
  inputArgs: unknown[];
  expected: unknown;
}

// How to compare a solution's output against the expected answer.
// - "exact": deep equality (default).
// - "unordered": top-level array elements may be in any order.
// - "unordered-nested": top-level AND nested arrays may be in any order
//   (e.g. 3Sum: [[−1,0,1],[−1,−1,2]] should match in any order, and
//   each inner triplet also has no fixed order).
// - "set-of-strings": top-level array of strings compared as a multiset.
export type CompareMode =
  | "exact"
  | "unordered"
  | "unordered-nested"
  | "set-of-strings";

// Per-problem test-runner metadata. Lets the runner inject extra classes
// (e.g. ListNode) and convert test arg/return shapes around the user function.
export interface LinkedListRunner {
  kind: "linked-list";
  // Arg indices whose array value converts to a single ListNode chain.
  listInputIndices?: number[];
  // Arg indices whose array-of-arrays value converts to an array of chains.
  listOfListsInputIndices?: number[];
  // Convert the return value (a ListNode chain) to an array for comparison.
  returnsList?: boolean;
  // Ignore the return value; instead serialize the first list input's chain.
  inPlace?: boolean;
  // Arg index holding a cycle-position int. Forms a cycle in the first list
  // input at that index, then drops this arg before calling the user function.
  cyclePosArgIndex?: number;
}

export interface ClassOpsRunner {
  kind: "class-ops";
  className: string;
}

export interface RandomListRunner {
  kind: "random-list";
}

export type RunnerMeta = LinkedListRunner | ClassOpsRunner | RandomListRunner;

export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: Difficulty;
  leetcodeUrl: string;
  approach: string;
  timeComplexity: string;
  spaceComplexity: string;
  description?: string;
  starterCode?: Record<Language, string>;
  testCases?: TestCase[];
  functionName?: string;
  compareMode?: CompareMode;
  runner?: RunnerMeta;
  hints?: string[];
  patterns?: string[];
  keyIntuition?: string;
}

export interface Category {
  name: string;
  slug: string;
  problems: Problem[];
}

export interface TestResult {
  testCaseId: number;
  passed: boolean;
  actual: unknown;
  expected: unknown;
  error?: string;
  durationMs?: number;
}

// ---- Algorithm Visualization Types ----

export interface ArrayVisualState {
  type: "array";
  label?: string;
  values: (string | number | boolean)[];
  highlights?: Record<number, string>;
  pointers?: { index: number; label: string; color?: string }[];
  caption?: string;
}

export interface SetVisualState {
  type: "set";
  label?: string;
  values: (string | number)[];
  lastAdded?: string | number;
  highlightValues?: (string | number)[];
}

export interface HashMapVisualState {
  type: "hashmap";
  label?: string;
  entries: [string | number, string | number][];
  highlightKeys?: (string | number)[];
}

export interface StackVisualState {
  type: "stack";
  label?: string;
  values: (string | number)[];
  topHighlight?: boolean;
}

export interface VariableVisualState {
  type: "variables";
  entries: { name: string; value: string | number | boolean; highlight?: boolean }[];
}

export interface TreeNodeState {
  value: string | number;
  highlight?: string; // "active" | "found" | "checked" | "success" etc.
  label?: string; // e.g. "root", "p", "q"
}

export interface TreeVisualState {
  type: "tree";
  label?: string;
  // Level-order array representation. null = missing node.
  nodes: (TreeNodeState | null)[];
}

export interface LinkedListNodeState {
  value: string | number;
  highlight?: string;
  label?: string; // e.g. "head", "curr", "prev"
}

export interface LinkedListVisualState {
  type: "linkedlist";
  label?: string;
  nodes: LinkedListNodeState[];
  cycle?: number; // index that the tail points back to (for cycle detection problems)
}

export interface MatrixCellState {
  value: string | number;
  highlight?: string;
  label?: string;
}

export interface MatrixVisualState {
  type: "matrix";
  label?: string;
  rows: MatrixCellState[][];
  colHeaders?: (string | number)[];
  rowHeaders?: (string | number)[];
}

export interface GraphNodeState {
  id: string | number;
  label?: string;
  highlight?: string;
}

export interface GraphEdgeState {
  from: string | number;
  to: string | number;
  highlight?: string;
  label?: string;
}

export interface GraphVisualState {
  type: "graph";
  label?: string;
  nodes: GraphNodeState[];
  edges: GraphEdgeState[];
  directed?: boolean;
}

// Bar chart for numeric arrays where the shape *is* the point (stock prices,
// heights, elevation). Supports annotated bars ("buy"/"sell"), a shaded
// container between two columns (two-pointer area problems), per-column
// water overlays (trapping-rain-water), and a translucent range overlay
// for subarray/window problems. Handles negative values via a signed
// y-axis around zero.
export interface BarChartVisualState {
  type: "barchart";
  label?: string;
  values: number[];
  barColors?: Record<number, string>;  // index -> color key ("buy", "sell", "container", …)
  topLabels?: Record<number, string>;  // index -> label drawn above the bar
  waterMask?: number[];                // water depth per column
  containerBetween?: { left: number; right: number; level: number };
  highlightRange?: { start: number; end: number; color?: string; label?: string };
  caption?: string;
}

export type DataStructureState =
  | ArrayVisualState
  | SetVisualState
  | HashMapVisualState
  | StackVisualState
  | VariableVisualState
  | TreeVisualState
  | LinkedListVisualState
  | MatrixVisualState
  | GraphVisualState
  | BarChartVisualState;

export interface AnimationStep {
  description: string;
  structures: DataStructureState[];
  codeHighlightLines?: number[];
}

export interface SolutionData {
  label?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  code: string;
  steps: AnimationStep[];
}
