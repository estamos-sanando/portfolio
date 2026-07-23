"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";

interface PixelWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultX?: number;
  defaultY?: number;
  width?: number | string;
  minHeight?: number;
  onClose: () => void;
  isActive?: boolean;
  onClick?: () => void;
  style?: "pixel" | "win95";
  icon?: string;
}

export default function PixelWindow({
  id,
  title,
  children,
  defaultX = 80,
  defaultY = 60,
  width = 480,
  minHeight = 300,
  onClose,
  isActive = true,
  onClick,
  style = "pixel",
  icon = "📁",
}: PixelWindowProps) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".pixel-btn, .win95-btn")) return;
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - pos.x,
        y: e.clientY - pos.y,
      });
      onClick?.();
    },
    [pos, onClick]
  );

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      setPos({
        x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 200)),
        y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 100)),
      });
    };
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // ESC closes
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (style === "win95") {
    return (
      <motion.div
        ref={windowRef}
        className="win95-window window-animate-in"
        style={{
          left: pos.x,
          top: pos.y,
          width,
          minHeight,
          zIndex: isActive ? 30 : 20,
          position: "fixed",
          cursor: isDragging ? "grabbing" : "default",
          userSelect: isDragging ? "none" : "auto",
        }}
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
        onClick={onClick}
      >
        <div className="win95-titlebar" onMouseDown={handleMouseDown}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span>{icon}</span>
            {title}
          </span>
          <div style={{ display: "flex", gap: 2 }}>
            <button className="win95-btn" aria-label="Minimizar">_</button>
            <button className="win95-btn" aria-label="Maximizar">□</button>
            <button className="win95-btn" onClick={onClose} aria-label="Cerrar">✕</button>
          </div>
        </div>
        <div style={{ padding: "8px", overflowY: "auto", maxHeight: "70vh" }}>
          {children}
        </div>
      </motion.div>
    );
  }

  // Default pixel style
  return (
    <motion.div
      ref={windowRef}
      className="pixel-window window-animate-in"
      style={{
        left: pos.x,
        top: pos.y,
        width,
        minHeight,
        zIndex: isActive ? 30 : 20,
        position: "fixed",
        cursor: isDragging ? "grabbing" : "default",
        userSelect: isDragging ? "none" : "auto",
      }}
      initial={{ opacity: 0, scale: 0.85, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      onClick={onClick}
    >
      {/* Title bar */}
      <div className="pixel-window-titlebar" onMouseDown={handleMouseDown}>
        <span
          style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "13px",
            fontWeight: 700,
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          {icon} {title}
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          <button className="pixel-btn pixel-btn-min" aria-label="Minimizar">─</button>
          <button className="pixel-btn pixel-btn-max" aria-label="Maximizar">□</button>
          <button
            className="pixel-btn pixel-btn-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "12px",
          overflowY: "auto",
          maxHeight: "72vh",
          background: "var(--px-window-bg)",
          fontFamily: "var(--font-body)",
          fontSize: "18px",
          color: "var(--px-dark)",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
