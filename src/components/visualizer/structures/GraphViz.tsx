"use client";

import { GraphVisualState } from "@/data/types";

const FILL_COLORS: Record<string, string> = {
  active: "rgba(59,130,246,0.35)",
  found: "rgba(239,68,68,0.35)",
  checked: "rgba(234,179,8,0.25)",
  success: "rgba(34,197,94,0.35)",
  visiting: "rgba(168,85,247,0.35)",
  default: "rgba(26,26,46,0.8)",
};

const STROKE_COLORS: Record<string, string> = {
  active: "#60a5fa",
  found: "#f87171",
  checked: "rgba(250,204,21,0.6)",
  success: "#4ade80",
  visiting: "#c084fc",
  default: "rgba(75,85,99,0.5)",
};

const EDGE_COLORS: Record<string, string> = {
  active: "#60a5fa",
  found: "#f87171",
  checked: "#facc15",
  success: "#4ade80",
  default: "#6b7280",
};

function layoutNodes(count: number, width: number, height: number) {
  // Circular layout
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(cx, cy) - 30;
  const positions: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    positions.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    });
  }
  return positions;
}

export default function GraphViz({ state }: { state: GraphVisualState }) {
  const { nodes, edges, directed } = state;
  if (!nodes || nodes.length === 0) return null;

  const width = 360;
  const height = Math.min(220, 80 + nodes.length * 20);
  const positions = layoutNodes(nodes.length, width, height);
  const nodeRadius = nodes.length > 8 ? 14 : 18;

  // Build id → index map
  const idToIdx: Record<string | number, number> = {};
  nodes.forEach((n, i) => {
    idToIdx[n.id] = i;
  });

  return (
    <div className="space-y-1.5">
      {state.label && (
        <div className="text-[11px] text-gray-400 font-mono">{state.label}</div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-h-[220px]"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Arrowhead marker */}
        {directed && (
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#6b7280" />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#60a5fa" />
            </marker>
            <marker
              id="arrowhead-success"
              markerWidth="8"
              markerHeight="6"
              refX="7"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#4ade80" />
            </marker>
          </defs>
        )}

        {/* Edges */}
        {edges.map((edge, i) => {
          const fromIdx = idToIdx[edge.from];
          const toIdx = idToIdx[edge.to];
          if (fromIdx === undefined || toIdx === undefined) return null;
          const p1 = positions[fromIdx];
          const p2 = positions[toIdx];

          // Shorten line to not overlap circles
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const offsetFrom = nodeRadius + 2;
          const offsetTo = nodeRadius + (directed ? 6 : 2);

          const x1 = p1.x + (dx / dist) * offsetFrom;
          const y1 = p1.y + (dy / dist) * offsetFrom;
          const x2 = p2.x - (dx / dist) * offsetTo;
          const y2 = p2.y - (dy / dist) * offsetTo;

          const color = edge.highlight
            ? EDGE_COLORS[edge.highlight] || EDGE_COLORS.default
            : EDGE_COLORS.default;

          const markerEnd = directed
            ? edge.highlight === "active"
              ? "url(#arrowhead-active)"
              : edge.highlight === "success"
                ? "url(#arrowhead-success)"
                : "url(#arrowhead)"
            : undefined;

          return (
            <g key={`edge-${i}`}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={color}
                strokeWidth="1.5"
                markerEnd={markerEnd}
              />
              {edge.label && (
                <text
                  x={(x1 + x2) / 2}
                  y={(y1 + y2) / 2 - 6}
                  textAnchor="middle"
                  className="text-[9px] font-mono fill-gray-400"
                >
                  {edge.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const pos = positions[i];
          const fill = node.highlight
            ? FILL_COLORS[node.highlight] || FILL_COLORS.default
            : FILL_COLORS.default;
          const stroke = node.highlight
            ? STROKE_COLORS[node.highlight] || STROKE_COLORS.default
            : STROKE_COLORS.default;

          return (
            <g key={`node-${i}`}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r={nodeRadius}
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
              />
              <text
                x={pos.x}
                y={pos.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-mono font-medium fill-gray-200"
              >
                {node.label || String(node.id)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
