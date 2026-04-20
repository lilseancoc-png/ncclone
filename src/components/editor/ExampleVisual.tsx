"use client";

import {
  Problem,
  Category,
  DataStructureState,
  LinkedListNodeState,
  TreeNodeState,
  MatrixCellState,
} from "@/data/types";
import ArrayViz from "@/components/visualizer/structures/ArrayViz";
import LinkedListViz from "@/components/visualizer/structures/LinkedListViz";
import TreeViz from "@/components/visualizer/structures/TreeViz";
import MatrixViz from "@/components/visualizer/structures/MatrixViz";

// Colorize cells in a grid-style matrix so "0" vs "1", walls, rotten/fresh
// oranges etc. read visually instead of as a wall of digits. Keys match the
// highlight colors MatrixViz already knows about.
function gridCellHighlight(cell: unknown): string | undefined {
  if (cell === "1" || cell === 1) return "path";     // land / filled
  if (cell === "0" || cell === 0) return "water";    // empty / water
  if (cell === 2) return "rotten";                    // rotting oranges
  if (cell === -1) return "wall";                     // walls & gates
  if (cell === "X") return "wall";                    // surrounded regions
  if (cell === "O") return "water";
  return undefined;
}

// Figure out the best diagram to show for a problem's first example, based
// on the runner metadata and category. Returns null when nothing fits
// (e.g. class-ops design problems, pure-number inputs) — the Examples
// section alone is clearer in those cases.
function pickVisual(problem: Problem, category: Category): DataStructureState | null {
  const tc = problem.testCases?.[0];
  if (!tc) return null;
  const args = tc.inputArgs;

  // Runner: linked list. Render the primary list argument as a chain,
  // with optional cycle arrow when the runner exposes a cyclePosArgIndex.
  if (problem.runner?.kind === "linked-list") {
    const listIdxs = problem.runner.listInputIndices ?? [];
    if (listIdxs.length > 0) {
      const raw = args[listIdxs[0]];
      if (Array.isArray(raw) && raw.every((v) => typeof v === "number" || typeof v === "string")) {
        const nodes: LinkedListNodeState[] = raw.map((v) => ({
          value: v as string | number,
        }));
        if (nodes.length === 0) return null;
        nodes[0].label = "head";
        const cycleIdx = problem.runner.cyclePosArgIndex;
        const cycle =
          typeof cycleIdx === "number" && typeof args[cycleIdx] === "number" && (args[cycleIdx] as number) >= 0
            ? (args[cycleIdx] as number)
            : undefined;
        return { type: "linkedlist", label: "Example 1 input", nodes, cycle };
      }
    }
  }

  // Runner: copy-random-list. Render the chain by values only — the
  // random pointers are too noisy for a static preview.
  if (problem.runner?.kind === "random-list") {
    const pairs = args[0];
    if (Array.isArray(pairs) && pairs.length > 0) {
      const nodes: LinkedListNodeState[] = (pairs as unknown[]).map((p) => {
        const val = Array.isArray(p) ? (p as unknown[])[0] : p;
        return { value: (val as string | number) ?? "" };
      });
      nodes[0].label = "head";
      return { type: "linkedlist", label: "Example 1 input", nodes };
    }
  }

  // Trees / tries use a level-order array with nulls for missing nodes.
  if (category.slug === "trees" || category.slug === "tries") {
    const first = args[0];
    if (Array.isArray(first) && first.length > 0 && first.length <= 31) {
      const nodes: (TreeNodeState | null)[] = first.map((v) =>
        v === null || v === undefined
          ? null
          : { value: v as string | number }
      );
      if (nodes[0]) nodes[0].label = "root";
      return { type: "tree", label: "Example 1 input", nodes };
    }
  }

  // 2D grid / matrix: render as a Matrix. Covers islands, rotting oranges,
  // walls & gates, surrounded regions, and similar problems.
  const first = args[0];
  if (Array.isArray(first) && first.length > 0 && Array.isArray(first[0])) {
    const rows2d = first as unknown[][];
    const looks2d = rows2d.every(
      (r) => Array.isArray(r) && r.every((c) => typeof c === "string" || typeof c === "number" || typeof c === "boolean")
    );
    if (looks2d && rows2d.length <= 12 && (rows2d[0] as unknown[]).length <= 12) {
      const rows: MatrixCellState[][] = rows2d.map((row) =>
        (row as unknown[]).map((cell) => ({
          value: cell as string | number,
          highlight: gridCellHighlight(cell),
        }))
      );
      return { type: "matrix", label: "Example 1 input", rows };
    }
  }

  // Fallback: flat array of primitives → ArrayViz (skip when it's clearly
  // just numbers like `k` or the answer is a string).
  if (
    Array.isArray(first) &&
    first.length > 0 &&
    first.length <= 32 &&
    first.every((v) => typeof v === "number" || typeof v === "string")
  ) {
    return {
      type: "array",
      label: "Example 1 input",
      values: first as (string | number)[],
    };
  }

  return null;
}

function RenderVisual({ state }: { state: DataStructureState }) {
  switch (state.type) {
    case "array":
      return <ArrayViz state={state} />;
    case "linkedlist":
      return <LinkedListViz state={state} />;
    case "tree":
      return <TreeViz state={state} />;
    case "matrix":
      return <MatrixViz state={state} />;
    default:
      return null;
  }
}

export default function ExampleVisual({
  problem,
  category,
}: {
  problem: Problem;
  category: Category;
}) {
  const visual = pickVisual(problem, category);
  if (!visual) return null;

  return (
    <div className="bg-[#151525] rounded-lg p-3.5 border border-border/30 overflow-x-auto">
      <RenderVisual state={visual} />
    </div>
  );
}
