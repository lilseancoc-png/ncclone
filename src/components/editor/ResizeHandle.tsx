"use client";

import { useCallback, useRef } from "react";

interface ResizeHandleProps {
  onResize: (deltaY: number) => void;
}

export default function ResizeHandle({ onResize }: ResizeHandleProps) {
  const dragging = useRef(false);
  const lastY = useRef(0);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      dragging.current = true;
      lastY.current = e.clientY;

      const handleMouseMove = (ev: MouseEvent) => {
        if (!dragging.current) return;
        const delta = lastY.current - ev.clientY;
        lastY.current = ev.clientY;
        onResize(delta);
      };

      const handleMouseUp = () => {
        dragging.current = false;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [onResize]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      lastY.current = touch.clientY;
      dragging.current = true;

      const handleTouchMove = (ev: TouchEvent) => {
        if (!dragging.current) return;
        const t = ev.touches[0];
        const delta = lastY.current - t.clientY;
        lastY.current = t.clientY;
        onResize(delta);
      };

      const handleTouchEnd = () => {
        dragging.current = false;
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove, { passive: true });
      document.addEventListener("touchend", handleTouchEnd);
    },
    [onResize]
  );

  return (
    <div
      className="flex items-center justify-center h-2 cursor-row-resize group hover:bg-white/5 transition-colors touch-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="w-8 h-0.5 rounded-full bg-gray-700 group-hover:bg-gray-500 transition-colors" />
    </div>
  );
}
