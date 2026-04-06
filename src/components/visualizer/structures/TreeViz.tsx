"use client";

import { TreeVisualState } from "@/data/types";

const HIGHLIGHT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  active: { bg: "bg-blue-500/30", border: "border-blue-400", text: "text-blue-200" },
  found: { bg: "bg-red-500/30", border: "border-red-400", text: "text-red-200" },
  checked: { bg: "bg-yellow-500/20", border: "border-yellow-400/60", text: "text-yellow-200" },
  success: { bg: "bg-green-500/30", border: "border-green-400", text: "text-green-200" },
  swap: { bg: "bg-purple-500/30", border: "border-purple-400", text: "text-purple-200" },
};

const DEFAULT_STYLE = { bg: "bg-card", border: "border-border/50", text: "text-gray-200" };

export default function TreeViz({ state }: { state: TreeVisualState }) {
  const { nodes } = state;
  if (!nodes || nodes.length === 0) return null;

  // Calculate tree depth
  const depth = Math.ceil(Math.log2(nodes.length + 1));

  // Build levels from the flat array
  const levels: (typeof nodes)[] = [];
  let idx = 0;
  for (let d = 0; d < depth; d++) {
    const count = Math.pow(2, d);
    levels.push(nodes.slice(idx, idx + count));
    idx += count;
    if (idx >= nodes.length) break;
  }

  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <svg
        viewBox={`0 0 ${Math.max(400, Math.pow(2, depth - 1) * 64)} ${depth * 56 + 12}`}
        className="w-full max-h-[240px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Draw edges first (behind nodes) */}
        {levels.map((level, d) => {
          if (d === 0) return null;
          const parentLevel = levels[d - 1];
          const width = Math.max(400, Math.pow(2, depth - 1) * 64);
          const parentSpacing = width / (Math.pow(2, d - 1) + 1);
          const childSpacing = width / (Math.pow(2, d) + 1);
          const parentY = (d - 1) * 56 + 24;
          const childY = d * 56 + 24;

          return level.map((node, i) => {
            if (!node) return null;
            const parentIdx = Math.floor(i / 2);
            const parent = parentLevel?.[parentIdx];
            if (!parent) return null;

            const px = parentSpacing * (parentIdx + 1);
            const cx = childSpacing * (i + 1);

            return (
              <line
                key={`edge-${d}-${i}`}
                x1={px}
                y1={parentY + 14}
                x2={cx}
                y2={childY - 14}
                stroke="#4b5563"
                strokeWidth="1.5"
              />
            );
          });
        })}

        {/* Draw nodes */}
        {levels.map((level, d) => {
          const width = Math.max(400, Math.pow(2, depth - 1) * 64);
          const spacing = width / (Math.pow(2, d) + 1);
          const y = d * 56 + 24;

          return level.map((node, i) => {
            if (!node) return null;
            const x = spacing * (i + 1);
            const style = node.highlight
              ? HIGHLIGHT_COLORS[node.highlight] || DEFAULT_STYLE
              : DEFAULT_STYLE;

            // Map Tailwind-like colors to actual SVG fills
            const fillMap: Record<string, string> = {
              "bg-blue-500/30": "rgba(59,130,246,0.3)",
              "bg-red-500/30": "rgba(239,68,68,0.3)",
              "bg-yellow-500/20": "rgba(234,179,8,0.2)",
              "bg-green-500/30": "rgba(34,197,94,0.3)",
              "bg-purple-500/30": "rgba(168,85,247,0.3)",
              "bg-card": "rgba(26,26,46,0.8)",
            };
            const strokeMap: Record<string, string> = {
              "border-blue-400": "#60a5fa",
              "border-red-400": "#f87171",
              "border-yellow-400/60": "rgba(250,204,21,0.6)",
              "border-green-400": "#4ade80",
              "border-purple-400": "#c084fc",
              "border-border/50": "rgba(75,85,99,0.5)",
            };

            const fill = fillMap[style.bg] || "rgba(26,26,46,0.8)";
            const stroke = strokeMap[style.border] || "rgba(75,85,99,0.5)";

            return (
              <g key={`node-${d}-${i}`}>
                <circle
                  cx={x}
                  cy={y}
                  r={16}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="text-[11px] font-mono font-medium fill-gray-200"
                >
                  {String(node.value)}
                </text>
                {node.label && (
                  <text
                    x={x}
                    y={y - 22}
                    textAnchor="middle"
                    className="text-[9px] font-mono fill-gray-400"
                  >
                    {node.label}
                  </text>
                )}
              </g>
            );
          });
        })}
      </svg>
    </div>
  );
}
