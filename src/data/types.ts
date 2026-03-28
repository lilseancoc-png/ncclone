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

export type DataStructureState =
  | ArrayVisualState
  | SetVisualState
  | HashMapVisualState
  | StackVisualState
  | VariableVisualState;

export interface AnimationStep {
  description: string;
  structures: DataStructureState[];
  codeHighlightLines?: number[];
}

export interface SolutionData {
  code: string;
  steps: AnimationStep[];
}
