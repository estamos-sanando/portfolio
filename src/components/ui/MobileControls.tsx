"use client";

import { useGameStore } from "@/hooks/useGameStore";
import { useAudio } from "@/hooks/useAudio";

export default function MobileControls() {
  const { isMuted } = useGameStore();

  const dispatch = (key: string, pressed: boolean) => {
    const event = new KeyboardEvent(pressed ? "keydown" : "keyup", { key });
    window.dispatchEvent(event);
  };

  const handleInteract = () => {
    const event = new KeyboardEvent("keydown", { key: "e" });
    window.dispatchEvent(event);
  };

  const handlePower = () => {
    const event = new KeyboardEvent("keydown", { key: "f" });
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* D-PAD */}
      <div
        className="dpad-container"
        style={{
          position: "fixed",
          bottom: 40,
          left: 24,
          zIndex: 20,
          userSelect: "none",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "44px 44px 44px", gridTemplateRows: "44px 44px 44px", gap: 4 }}>
          {/* Up */}
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <button
              className="dpad-btn"
              onPointerDown={() => dispatch("ArrowUp", true)}
              onPointerUp={() => dispatch("ArrowUp", false)}
              onPointerLeave={() => dispatch("ArrowUp", false)}
              aria-label="Mover arriba"
            >▲</button>
          </div>
          {/* Left */}
          <div style={{ gridColumn: 1, gridRow: 2 }}>
            <button
              className="dpad-btn"
              onPointerDown={() => dispatch("ArrowLeft", true)}
              onPointerUp={() => dispatch("ArrowLeft", false)}
              onPointerLeave={() => dispatch("ArrowLeft", false)}
              aria-label="Mover izquierda"
            >◀</button>
          </div>
          {/* Center */}
          <div style={{ gridColumn: 2, gridRow: 2 }}>
            <div className="dpad-btn" style={{ background: "rgba(45,45,58,0.6)", cursor: "default" }}>+</div>
          </div>
          {/* Right */}
          <div style={{ gridColumn: 3, gridRow: 2 }}>
            <button
              className="dpad-btn"
              onPointerDown={() => dispatch("ArrowRight", true)}
              onPointerUp={() => dispatch("ArrowRight", false)}
              onPointerLeave={() => dispatch("ArrowRight", false)}
              aria-label="Mover derecha"
            >▶</button>
          </div>
          {/* Down */}
          <div style={{ gridColumn: 2, gridRow: 3 }}>
            <button
              className="dpad-btn"
              onPointerDown={() => dispatch("ArrowDown", true)}
              onPointerUp={() => dispatch("ArrowDown", false)}
              onPointerLeave={() => dispatch("ArrowDown", false)}
              aria-label="Mover abajo"
            >▼</button>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS (mobile) */}
      <div
        style={{
          position: "fixed",
          bottom: 44,
          right: 20,
          zIndex: 20,
          display: "none",
          flexDirection: "row",
          gap: 12,
        }}
        className="mobile-interact-btn"
      >
        {/* POWER BUTTON */}
        <button
          onClick={handlePower}
          style={{
            width: 58,
            height: 58,
            background: "rgba(231,76,60,0.85)",
            border: "3px solid #C0392B",
            color: "#FFF",
            fontFamily: "var(--font-pixel)",
            fontSize: "10px",
            cursor: "pointer",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            touchAction: "manipulation",
            borderRadius: 8,
          }}
          aria-label="Prender o apagar"
        >
          <span style={{ fontSize: "18px" }}>⏻</span>
          <span style={{ fontSize: "6px" }}>ON/OFF [F]</span>
        </button>

        {/* INTERACT BUTTON */}
        <button
          onClick={handleInteract}
          style={{
            width: 58,
            height: 58,
            background: "rgba(242,167,187,0.9)",
            border: "3px solid var(--px-rose-dark)",
            color: "var(--px-dark)",
            fontFamily: "var(--font-pixel)",
            fontSize: "10px",
            cursor: "pointer",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            touchAction: "manipulation",
            borderRadius: 8,
          }}
          aria-label="Interactuar"
        >
          <span style={{ fontSize: "18px" }}>⚡</span>
          <span style={{ fontSize: "6px" }}>USAR [E]</span>
        </button>
      </div>

      {/* Show mobile interact on small screens via CSS */}
      <style>{`
        @media (max-width: 768px) {
          .dpad-container { display: block !important; }
          .mobile-interact-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
