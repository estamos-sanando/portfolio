"use client";

import { useGameStore } from "@/hooks/useGameStore";

export default function AudioControls() {
  const { isMuted, toggleMute } = useGameStore();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleMute();
      }}
      style={{
        position: "fixed",
        top: 10,
        right: 10,
        zIndex: 50,
        width: 32,
        height: 32,
        background: "rgba(45,45,58,0.85)",
        border: "2px solid var(--px-rose-dark)",
        borderRadius: 8,
        color: "var(--px-cream)",
        fontSize: "14px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(4px)",
      }}
      aria-label={isMuted ? "Activar sonido" : "Silenciar"}
      title={isMuted ? "Activar sonido" : "Silenciar"}
    >
      {isMuted ? "🔇" : "🔊"}
    </button>
  );
}
