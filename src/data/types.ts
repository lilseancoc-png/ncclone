export type Difficulty = "Easy" | "Medium" | "Hard";

export type Language = "javascript" | "python" | "java" | "cpp";

export interface TestCase {
  id: number;
  input: string;
  inputArgs: unknown[];
  expected: unknown;
}

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
  highlights?: Record<number, string>;
}

export interface HashMapVisualState {
  type: "hashmap";
  label?: string;
  entries: [string | number, string | number][];
  highlightKeys?: (string | number)[];
  highlights?: Record<string | number, string>;
}

export interface StackVisualState {
  type: "stack";
  label?: string;
  values: (string | number)[];
  topHighlight?: boolean;
  highlights?: Record<number, string>;
}

export interface VariableVisualState {
  type: "variables";
  label?: string;
  entries: { name: string; value: string | number | boolean; highlight?: boolean }[];
}

export interface TreeNode {
  value: string | number;
  highlight?: string;
  left?: TreeNode | null;
  right?: TreeNode | null;
}

export interface TreeVisualState {
  type: "tree";
  label?: string;
  root: TreeNode | null;
}

export interface LinkedListNode {
  value: string | number;
  highlight?: string;
}

export interface LinkedListVisualState {
  type: "linkedlist";
  label?: string;
  nodes: LinkedListNode[];
  pointers?: { index: number; label: string; color?: string }[];
  cycleIndex?: number; // index where tail connects back (for cycle detection)
}

export type DataStructureState =
  | ArrayVisualState
  | SetVisualState
  | HashMapVisualState
  | StackVisualState
  | VariableVisualState
  | TreeVisualState
  | LinkedListVisualState;

export interface AnimationStep {
  description: string;
  structures: DataStructureState[];
  codeHighlightLines?: number[];
}

export interface SolutionData {
  label?: string;
  timeComplexity?: string;
  spaceComplexity?: string;
  code?: string;
  steps: AnimationStep[];
}
