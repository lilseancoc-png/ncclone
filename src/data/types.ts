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
}

// ---- Algorithm Visualization Types ----

export interface ArrayVisualState {
  type: "array";
  label?: string;
  values: (string | number | boolean)[];
  highlights?: Record<number, string>;
  pointers?: { index: number; label: string; color?: string }[];
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

export type DataStructureState =
  | ArrayVisualState
  | SetVisualState
  | HashMapVisualState
  | StackVisualState
  | VariableVisualState
  | TreeVisualState
  | LinkedListVisualState
  | MatrixVisualState
  | GraphVisualState;

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
