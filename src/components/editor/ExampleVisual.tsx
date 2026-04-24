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
import BarChartViz from "@/components/visualizer/structures/BarChartViz";

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

// Problem-specific annotated diagrams. Returns null when the slug has no
// custom visual, so pickVisual falls through to the generic renderers.
function customVisual(problem: Problem): DataStructureState | null {
  const first = problem.testCases?.[0]?.inputArgs?.[0];
  if (!Array.isArray(first) || first.length === 0 || first.length > 20) return null;
  if (!first.every((v) => typeof v === "number")) return null;
  const values = first as number[];

  switch (problem.slug) {
    case "best-time-to-buy-and-sell-stock": {
      let minIdx = 0;
      let buy = 0;
      let sell = 0;
      let profit = 0;
      for (let i = 1; i < values.length; i++) {
        if (values[i] - values[minIdx] > profit) {
          profit = values[i] - values[minIdx];
          buy = minIdx;
          sell = i;
        }
        if (values[i] < values[minIdx]) minIdx = i;
      }
      if (profit === 0) {
        return {
          type: "barchart",
          label: "Example 1 — prices",
          values,
          caption: "Prices only decline — no profitable trade (max profit = 0)",
        };
      }
      return {
        type: "barchart",
        label: "Example 1 — prices",
        values,
        barColors: { [buy]: "buy", [sell]: "sell" },
        topLabels: { [buy]: "buy", [sell]: "sell" },
        caption: `Buy day ${buy} ($${values[buy]}) → sell day ${sell} ($${values[sell]}) · profit = ${profit}`,
      };
    }

    case "container-with-most-water": {
      let l = 0;
      let r = values.length - 1;
      let best = 0;
      let bestL = 0;
      let bestR = values.length - 1;
      while (l < r) {
        const area = Math.min(values[l], values[r]) * (r - l);
        if (area > best) {
          best = area;
          bestL = l;
          bestR = r;
        }
        if (values[l] < values[r]) l++;
        else r--;
      }
      const level = Math.min(values[bestL], values[bestR]);
      return {
        type: "barchart",
        label: "Example 1 — heights",
        values,
        barColors: { [bestL]: "container", [bestR]: "container" },
        topLabels: { [bestL]: "left", [bestR]: "right" },
        containerBetween: { left: bestL, right: bestR, level },
        caption: `Best: min(${values[bestL]}, ${values[bestR]}) × ${bestR - bestL} = ${best}`,
      };
    }

    case "trapping-rain-water": {
      const n = values.length;
      if (n < 3) return null;
      const leftMax = new Array<number>(n);
      const rightMax = new Array<number>(n);
      leftMax[0] = values[0];
      for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i - 1], values[i]);
      rightMax[n - 1] = values[n - 1];
      for (let i = n - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], values[i]);
      const waterMask = new Array<number>(n);
      let total = 0;
      for (let i = 0; i < n; i++) {
        waterMask[i] = Math.max(0, Math.min(leftMax[i], rightMax[i]) - values[i]);
        total += waterMask[i];
      }
      return {
        type: "barchart",
        label: "Example 1 — elevation",
        values,
        waterMask,
        caption: `Water trapped = ${total} (shaded in cyan)`,
      };
    }

    case "maximum-subarray": {
      // Kadane's: find the contiguous subarray with the largest sum.
      let bestSum = values[0];
      let bestStart = 0;
      let bestEnd = 0;
      let curSum = values[0];
      let curStart = 0;
      for (let i = 1; i < values.length; i++) {
        if (curSum < 0) {
          curSum = values[i];
          curStart = i;
        } else {
          curSum += values[i];
        }
        if (curSum > bestSum) {
          bestSum = curSum;
          bestStart = curStart;
          bestEnd = i;
        }
      }
      const barColors: Record<number, string> = {};
      for (let i = 0; i < values.length; i++) {
        barColors[i] = i >= bestStart && i <= bestEnd ? "max" : "dim";
      }
      const slice = values.slice(bestStart, bestEnd + 1);
      return {
        type: "barchart",
        label: "Example 1 — nums",
        values,
        barColors,
        highlightRange: { start: bestStart, end: bestEnd },
        caption: `Max subarray = [${slice.join(", ")}] (indices ${bestStart}–${bestEnd}) · sum = ${bestSum}`,
      };
    }

    case "sliding-window-maximum": {
      const k = problem.testCases?.[0]?.inputArgs?.[1];
      if (typeof k !== "number" || k <= 0 || k > values.length) return null;
      // Show the first window shaded with its max bar highlighted, plus
      // the full per-window output list in the caption.
      let firstMaxIdx = 0;
      for (let i = 1; i < k; i++) {
        if (values[i] > values[firstMaxIdx]) firstMaxIdx = i;
      }
      const allMaxes: number[] = [];
      for (let start = 0; start + k <= values.length; start++) {
        let m = values[start];
        for (let i = start + 1; i < start + k; i++) if (values[i] > m) m = values[i];
        allMaxes.push(m);
      }
      return {
        type: "barchart",
        label: `Example 1 — nums (k=${k})`,
        values,
        barColors: { [firstMaxIdx]: "max" },
        topLabels: { [firstMaxIdx]: "max" },
        highlightRange: {
          start: 0,
          end: k - 1,
          color: "rgba(59, 130, 246, 0.15)",
        },
        caption: `First window → max = ${values[firstMaxIdx]} · full output: [${allMaxes.join(", ")}]`,
      };
    }

    case "two-sum": {
      const target = problem.testCases?.[0]?.inputArgs?.[1];
      if (typeof target !== "number") return null;
      const seen = new Map<number, number>();
      for (let i = 0; i < values.length; i++) {
        const need = target - values[i];
        if (seen.has(need)) {
          const j = seen.get(need)!;
          return {
            type: "array",
            label: `Example 1 — nums (target = ${target})`,
            values,
            highlights: { [j]: "success", [i]: "success" },
            pointers: [
              { index: j, label: `${values[j]}` },
              { index: i, label: `+${values[i]}=${target}` },
            ],
          };
        }
        seen.set(values[i], i);
      }
      return null;
    }

    case "binary-search": {
      const target = problem.testCases?.[0]?.inputArgs?.[1];
      if (typeof target !== "number") return null;
      const idx = values.indexOf(target);
      if (idx < 0) return null;
      return {
        type: "array",
        label: `Example 1 — nums (target = ${target})`,
        values,
        highlights: { [idx]: "found" },
        pointers: [{ index: idx, label: "target" }],
      };
    }

    case "search-in-rotated-sorted-array": {
      const target = problem.testCases?.[0]?.inputArgs?.[1];
      if (typeof target !== "number") return null;
      const idx = values.indexOf(target);
      // Find rotation point (where the sequence drops).
      let pivot = 0;
      for (let i = 1; i < values.length; i++) {
        if (values[i] < values[i - 1]) {
          pivot = i;
          break;
        }
      }
      const pointers: { index: number; label: string }[] = [];
      if (pivot > 0) pointers.push({ index: pivot, label: "pivot" });
      if (idx >= 0 && idx !== pivot) pointers.push({ index: idx, label: "target" });
      else if (idx >= 0) pointers[0] = { index: idx, label: "pivot/target" };
      const highlights: Record<number, string> = {};
      if (idx >= 0) highlights[idx] = "found";
      return {
        type: "array",
        label: `Example 1 — nums (target = ${target})`,
        values,
        highlights,
        pointers,
      };
    }

    case "find-minimum-in-rotated-sorted-array": {
      let minIdx = 0;
      for (let i = 1; i < values.length; i++) {
        if (values[i] < values[minIdx]) minIdx = i;
      }
      return {
        type: "array",
        label: "Example 1 — nums",
        values,
        highlights: { [minIdx]: "success" },
        pointers: [{ index: minIdx, label: "min" }],
      };
    }

    case "longest-consecutive-sequence": {
      const set = new Set(values);
      let bestRun: number[] = [];
      for (const v of set) {
        if (set.has(v - 1)) continue;
        const run: number[] = [];
        let cur = v;
        while (set.has(cur)) {
          run.push(cur);
          cur++;
        }
        if (run.length > bestRun.length) bestRun = run;
      }
      if (bestRun.length < 2) return null;
      const runSet = new Set(bestRun);
      const highlights: Record<number, string> = {};
      values.forEach((v, i) => {
        if (runSet.has(v)) highlights[i] = "success";
      });
      return {
        type: "array",
        label: "Example 1 — nums",
        values,
        highlights,
        caption: `Longest run = [${bestRun.join(", ")}] (length ${bestRun.length})`,
      };
    }
  }

  return null;
}

// Figure out the best diagram to show for a problem's first example, based
// on the runner metadata and category. Returns null when nothing fits
// (e.g. class-ops design problems, pure-number inputs) — the Examples
// section alone is clearer in those cases.
function pickVisual(problem: Problem, category: Category): DataStructureState | null {
  const custom = customVisual(problem);
  if (custom) return custom;

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
    case "barchart":
      return <BarChartViz state={state} />;
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
