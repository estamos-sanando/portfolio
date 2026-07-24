"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { useAudio } from "@/hooks/useAudio";
import LoadScreen from "@/components/ui/LoadScreen";
import PixelRoom from "@/components/game/PixelRoom";
import GameContainer from "@/components/game/GameContainer";
import PhoneApp from "@/components/ui/PhoneApp";
import DesktopOS from "@/components/ui/DesktopOS";
import AudioControls from "@/components/ui/AudioControls";
import MobileControls from "@/components/ui/MobileControls";
import PixelWindow from "@/components/ui/PixelWindow";
import GameTutorialModal from "@/components/ui/GameTutorialModal";

// Controls legend
function ControlsOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return (
    <button
      onClick={() => setVisible(true)}
      style={{
        position: "fixed",
        top: 12,
        left: 12,
        zIndex: 50,
        padding: "4px 10px",
        background: "rgba(45,45,58,0.85)",
        border: "2px solid var(--px-rose-dark)",
        color: "var(--px-cream)",
        fontFamily: "var(--font-pixel)",
        fontSize: "7px",
        cursor: "pointer",
      }}
    >
      ?
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: 50,
        background: "rgba(30, 30, 42, 0.85)",
        border: "1px solid rgba(242, 167, 187, 0.3)",
        borderRadius: 12,
        padding: "14px 16px",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
        minWidth: 180,
      }}
    >
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        borderBottom: "1px solid rgba(242,167,187,0.2)",
        paddingBottom: 6,
      }}>
        <span style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "12px",
          fontWeight: 700,
          color: "var(--px-rose)",
          letterSpacing: "0.05em",
        }}>CONTROLES</span>
        <button
          onClick={() => setVisible(false)}
          style={{
            background: "none",
            border: "none",
            color: "var(--px-beige)",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >✕</button>
      </div>

      {[
        ["← → / A D", "Moverse (Izq/Der)"],
        ["↑ ↓ / W S", "Profundidad"],
        ["F", "Prender / Apagar"],
        ["E", "Usar dispositivo"],
        ["ESC", "Cerrar"],
      ].map(([key, action]) => (
        <div key={key} style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 6,
          alignItems: "center",
        }}>
          <span style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--px-rose)",
            background: "rgba(242,167,187,0.15)",
            padding: "2px 6px",
            borderRadius: 4,
            border: "1px solid rgba(242,167,187,0.3)",
          }}>{key}</span>
          <span style={{
            fontFamily: "var(--font-pixel)",
            fontSize: "12px",
            color: "#E2D9F3",
          }}>{action}</span>
        </div>
      ))}
    </motion.div>
  );
}

// How to interact tutorial overlay (first-time only)
function HowToPlay({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      style={{
        position: "fixed",
        bottom: 48,
        right: 20,
        zIndex: 50,
        background: "rgba(30, 30, 42, 0.9)",
        border: "1px solid rgba(242, 167, 187, 0.4)",
        borderRadius: 16,
        padding: "18px 20px",
        maxWidth: 280,
        backdropFilter: "blur(12px)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{
        fontFamily: "var(--font-pixel)",
        fontSize: "13px",
        fontWeight: 700,
        color: "var(--px-rose)",
        marginBottom: 10,
        letterSpacing: "0.05em",
      }}>
        CÓMO INTERACTUAR
      </div>
      {[
        "• Movéte de izquierda a derecha",
        "• Presioná F o hacé clic para PRENDER tus dispositivos",
        "• Presioná E para USARLOS cuando estén encendidos",
        "• ESC para cerrar ventanas",
      ].map((tip) => (
        <div key={tip} style={{
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          color: "#E2D9F3",
          marginBottom: 6,
          lineHeight: 1.4,
        }}>{tip}</div>
      ))}

      <div style={{
        marginTop: 12,
        borderTop: "1px solid rgba(242,167,187,0.2)",
        paddingTop: 10,
        fontFamily: "var(--font-body)",
        fontSize: "14px",
        color: "var(--px-rose)",
        fontStyle: "italic",
      }}>
        Explorá, descubrí y conocé mi trabajo.
      </div>

      <button
        onClick={onDismiss}
        style={{
          marginTop: 12,
          width: "100%",
          padding: "10px",
          background: "linear-gradient(135deg, var(--px-rose-dark), var(--px-violet-dark))",
          border: "none",
          borderRadius: 8,
          color: "white",
          fontFamily: "var(--font-pixel)",
          fontSize: "12px",
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
      >
        ¡Gracias por visitar! →
      </button>

      {/* Small cat pixel */}
      <div style={{
        position: "absolute",
        bottom: -14,
        right: 12,
        fontSize: "24px",
      }}>🐱</div>
    </motion.div>
  );
}

// Hint bar at bottom
function HintBar() {
  const { nearObject, isPcOn, isPhoneOn } = useGameStore();

  const hints: Record<string, string> = {
    phone: isPhoneOn
      ? "📱 Celular [PRENDIDO] · Presioná E para usar o F para apagar"
      : "📱 Celular [APAGADO] · Presioná F (o clic / E) para prenderlo primero",
    computer: isPcOn
      ? "💻 Computadora [PRENDIDA] · Presioná E para usar o F para apagar"
      : "💻 Computadora [APAGADA] · Presioná F (o clic / E) para prenderla primero",
    door: "🚪 Puerta · Presioná E para contactarme",
    radio: "🎵 Radio · Presioná E para escuchar",
  };

  const hint = nearObject
    ? hints[nearObject]
    : "💡 Consejo: acercate a la PC o celular y prendelos (F o clic) para interactuar";

  return (
    <div className="hint-bar">
      <span>💡</span>
      <span style={{ color: "var(--px-cream)" }}>{hint}</span>
    </div>
  );
}

// Door interaction — contact shortcut
function DoorWindow({ onClose }: { onClose: () => void }) {
  return (
    <PixelWindow
      id="door"
      title="🚪 Salida / Contacto"
      onClose={onClose}
      defaultX={120}
      defaultY={80}
      width={320}
      icon="🚪"
    >
      <div style={{ padding: 20, textAlign: "center" }}>
        <div style={{ fontSize: "48px", marginBottom: 12 }}>🌟</div>
        <div style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "8px",
          color: "var(--px-dark)",
          marginBottom: 16,
          lineHeight: 2,
        }}>
          ¡Gracias por visitar<br />mi portfolio!
        </div>
        <div style={{
          fontFamily: "var(--font-body)",
          fontSize: "18px",
          color: "var(--px-dark)",
          marginBottom: 20,
          lineHeight: 1.6,
        }}>
          Si llegaste hasta acá,<br />espero que te haya gustado.<br />
          ¡Me encantaría charlar!
        </div>
        <a
          href="mailto:antonella.creativa@gmail.com"
          style={{
            display: "block",
            padding: "12px",
            background: "linear-gradient(135deg, var(--px-rose), var(--px-violet))",
            color: "white",
            border: "2px solid var(--px-rose-dark)",
            fontFamily: "var(--font-pixel)",
            fontSize: "8px",
            cursor: "pointer",
            textDecoration: "none",
            boxShadow: "3px 3px 0 rgba(0,0,0,0.3)",
            marginBottom: 8,
          }}
        >
          ✉️ Escribirme →
        </a>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "8px",
            background: "var(--px-beige)",
            border: "2px solid var(--px-window-border)",
            fontFamily: "var(--font-pixel)",
            fontSize: "7px",
            cursor: "pointer",
            color: "var(--px-dark)",
          }}
        >
          Seguir explorando
        </button>
      </div>
    </PixelWindow>
  );
}

export default function HomePage() {
  const { gameStarted, openWindows, openWindow, closeWindow, closeAllWindows } = useGameStore();
  const { play } = useAudio();
  const [showHowTo, setShowHowTo] = useState(true);
  const [bootPC, setBootPC] = useState(false);

  // Close all windows on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Escape") {
        if (openWindows.length > 0) {
          closeAllWindows();
          play("closeWindow");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openWindows.length, closeAllWindows, play]);

  const handleOpenComputer = () => {
    if (!bootPC) {
      setBootPC(true);
      play("bootPC");
      setTimeout(() => {
        openWindow("computer");
      }, 800);
    } else {
      openWindow("computer");
      play("openWindow");
    }
  };

  const handleOpenPhone = () => {
    openWindow("phone");
    play("openWindow");
  };

  const handleOpenDoor = () => {
    openWindow("door");
    play("openWindow");
  };

  // Override openWindow to handle side effects
  // The game container calls openWindow from the store directly
  // We intercept it here via the window list
  const isPhoneOpen = openWindows.includes("phone");
  const isComputerOpen = openWindows.includes("computer");
  const isDoorOpen = openWindows.includes("door");

  return (
    <main
      className="game-wrapper"
      style={{ position: "relative", width: "100vw", height: "100dvh" }}
    >
      {/* ---- LOADING SCREEN ---- */}
      <LoadScreen />

      {/* ---- ROOM + GAME (only shown when started) ---- */}
      {gameStarted && (
        <>
          {/* Pixel art room background */}
          <PixelRoom />

          {/* Game engine (character + collisions + interaction hints) */}
          <GameContainer />

          {/* ---- UI OVERLAYS ---- */}
          <ControlsOverlay />
          <AudioControls />
          <MobileControls />
          <HintBar />

          {/* Game Tutorial Modal with Waving Character Portrait & Docked Widget */}
          <GameTutorialModal />

          {/* ---- INTERACTIVE WINDOWS ---- */}
          <AnimatePresence>
            {isPhoneOpen && (
              <PhoneApp
                key="phone"
                onClose={() => {
                  closeWindow("phone");
                  play("closeWindow");
                }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isComputerOpen && (
              <DesktopOS
                key="computer"
                onClose={() => {
                  closeWindow("computer");
                  play("closeWindow");
                }}
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isDoorOpen && (
              <DoorWindow
                key="door"
                onClose={() => {
                  closeWindow("door");
                  play("closeWindow");
                }}
              />
            )}
          </AnimatePresence>

          {/* Scrim when windows are open */}
          {openWindows.length > 0 && (
            <div
              onClick={() => {
                closeAllWindows();
                play("closeWindow");
              }}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.2)",
                zIndex: 15,
                cursor: "pointer",
              }}
            />
          )}
        </>
      )}
    </main>
  );
}
