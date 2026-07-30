"use client";

import { useGameStore } from "@/hooks/useGameStore";

export default function MobileControls() {
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
      {/* D-PAD (Bottom Left) */}
      <div
        className="dpad-container"
        style={{
          position: "fixed",
          bottom: 16,
          left: 16,
          zIndex: 40,
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "38px 38px 38px",
            gridTemplateRows: "38px 38px 38px",
            gap: 4,
            padding: 6,
            background: "rgba(20, 16, 32, 0.65)",
            backdropFilter: "blur(8px)",
            borderRadius: 16,
            border: "1px solid rgba(242, 167, 187, 0.3)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          {/* Up */}
          <div style={{ gridColumn: 2, gridRow: 1 }}>
            <button
              className="mobile-pad-btn"
              onPointerDown={() => dispatch("ArrowUp", true)}
              onPointerUp={() => dispatch("ArrowUp", false)}
              onPointerLeave={() => dispatch("ArrowUp", false)}
              aria-label="Mover arriba"
            >
              ▲
            </button>
          </div>
          {/* Left */}
          <div style={{ gridColumn: 1, gridRow: 2 }}>
            <button
              className="mobile-pad-btn"
              onPointerDown={() => dispatch("ArrowLeft", true)}
              onPointerUp={() => dispatch("ArrowLeft", false)}
              onPointerLeave={() => dispatch("ArrowLeft", false)}
              aria-label="Mover izquierda"
            >
              ◀
            </button>
          </div>
          {/* Center */}
          <div style={{ gridColumn: 2, gridRow: 2 }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "rgba(242,167,187,0.5)",
                fontFamily: "var(--font-pixel)",
              }}
            >
              +
            </div>
          </div>
          {/* Right */}
          <div style={{ gridColumn: 3, gridRow: 2 }}>
            <button
              className="mobile-pad-btn"
              onPointerDown={() => dispatch("ArrowRight", true)}
              onPointerUp={() => dispatch("ArrowRight", false)}
              onPointerLeave={() => dispatch("ArrowRight", false)}
              aria-label="Mover derecha"
            >
              ▶
            </button>
          </div>
          {/* Down */}
          <div style={{ gridColumn: 2, gridRow: 3 }}>
            <button
              className="mobile-pad-btn"
              onPointerDown={() => dispatch("ArrowDown", true)}
              onPointerUp={() => dispatch("ArrowDown", false)}
              onPointerLeave={() => dispatch("ArrowDown", false)}
              aria-label="Mover abajo"
            >
              ▼
            </button>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS (Bottom Right) */}
      <div
        className="mobile-interact-btn"
        style={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 40,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          touchAction: "none",
        }}
      >
        {/* POWER BUTTON */}
        <button
          onClick={handlePower}
          style={{
            width: 52,
            height: 52,
            background: "linear-gradient(135deg, rgba(231, 76, 60, 0.85), rgba(192, 57, 43, 0.95))",
            border: "2px solid #FFF",
            color: "#FFF",
            fontFamily: "var(--font-pixel)",
            fontSize: "8px",
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderRadius: "50%",
            backdropFilter: "blur(6px)",
          }}
          aria-label="Prender o apagar"
        >
          <span style={{ fontSize: "16px" }}>⏻</span>
          <span>F</span>
        </button>

        {/* INTERACT BUTTON */}
        <button
          onClick={handleInteract}
          style={{
            width: 52,
            height: 52,
            background: "linear-gradient(135deg, rgba(242, 167, 187, 0.95), rgba(212, 116, 138, 0.95))",
            border: "2px solid #FFF",
            color: "#161022",
            fontFamily: "var(--font-pixel)",
            fontSize: "8px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 6px 16px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            borderRadius: "50%",
            backdropFilter: "blur(6px)",
          }}
          aria-label="Interactuar"
        >
          <span style={{ fontSize: "16px" }}>⚡</span>
          <span>E</span>
        </button>
      </div>

      {/* Global CSS for touch controls */}
      <style>{`
        .mobile-pad-btn {
          width: 38px;
          height: 38px;
          background: rgba(45, 38, 64, 0.85);
          border: 1.5px solid rgba(242, 167, 187, 0.5);
          color: #FFF8EF;
          border-radius: 8px;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          touch-action: manipulation;
          transition: background 0.1s ease, transform 0.1s ease;
        }
        .mobile-pad-btn:active {
          background: var(--px-rose);
          color: #120C1A;
          transform: scale(0.92);
        }
        @media (min-width: 769px) {
          .dpad-container { display: none !important; }
          .mobile-interact-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .dpad-container { display: block !important; }
          .mobile-interact-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
