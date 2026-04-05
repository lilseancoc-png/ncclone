"use client";

import { TreeVisualState, TreeNode } from "@/data/types";

const HIGHLIGHT_COLORS: Record<string, string> = {
  active: "bg-blue-500/30 border-blue-400",
  found: "bg-red-500/30 border-red-400",
  checked: "bg-yellow-500/20 border-yellow-400/60",
  success: "bg-green-500/30 border-green-400",
  "pointer-i": "bg-purple-500/30 border-purple-400",
  "pointer-j": "bg-cyan-500/30 border-cyan-400",
  default: "bg-card border-border/50",
};

function TreeNodeViz({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const colorClass = node.highlight
    ? HIGHLIGHT_COLORS[node.highlight] || HIGHLIGHT_COLORS.default
    : HIGHLIGHT_COLORS.default;

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-full border text-xs font-mono font-medium transition-all duration-300 ${colorClass}`}
      >
        {String(node.value)}
      </div>
      {(node.left || node.right) && (
        <div className="flex items-start gap-1" style={{ minWidth: depth < 2 ? "4rem" : "2rem" }}>
          <div className="flex-1 flex flex-col items-center">
            {node.left ? (
              <>
                <div className="w-px h-3 bg-gray-600" />
                <TreeNodeViz node={node.left} depth={depth + 1} />
              </>
            ) : (
              <div className="h-3" />
            )}
          </div>
          <div className="flex-1 flex flex-col items-center">
            {node.right ? (
              <>
                <div className="w-px h-3 bg-gray-600" />
                <TreeNodeViz node={node.right} depth={depth + 1} />
              </>
            ) : (
              <div className="h-3" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TreeViz({ state }: { state: TreeVisualState }) {
  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <div className="flex justify-center py-2 overflow-x-auto">
        {state.root ? (
          <TreeNodeViz node={state.root} />
        ) : (
          <div className="text-xs text-gray-500 italic">null</div>
        )}
      </div>
    </div>
  );
}
