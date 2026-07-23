"use client";

import { useGameStore } from "@/hooks/useGameStore";

export default function AudioControls() {
  const { isMuted, toggleMute } = useGameStore();

  return (
    <button
      onClick={toggleMute}
      style={{
        position: "fixed",
        top: 12,
        right: 12,
        zIndex: 50,
        width: 36,
        height: 36,
        background: "rgba(45,45,58,0.85)",
        border: "2px solid var(--px-rose-dark)",
        color: "var(--px-cream)",
        fontSize: "16px",
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
