"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { audioEngine } from "@/lib/audioEngine";

export default function QuestModal() {
  const {
    visitedPhone,
    visitedPC,
    visitedDoor,
    dogUnlocked,
    activeCharacter,
    showQuestModal,
    openQuestModal,
    closeQuestModal,
    setActiveCharacter,
  } = useGameStore();

  const completedCount =
    (visitedPhone ? 1 : 0) + (visitedPC ? 1 : 0) + (visitedDoor ? 1 : 0);

  const handleOpen = () => {
    audioEngine.click();
    openQuestModal();
  };

  const handleClose = () => {
    audioEngine.click();
    closeQuestModal();
  };

  const handleSwitchCharacter = (char: "antonella" | "dog") => {
    audioEngine.click();
    setActiveCharacter(char);
  };

  return (
    <>
      {/* 1. TOP BADGE WIDGET */}
      <div
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 45,
        }}
      >
        <button
          onClick={handleOpen}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            background: "rgba(28, 24, 40, 0.92)",
            border: "2px solid var(--px-rose)",
            borderRadius: 20,
            color: "#FFF8EF",
            fontFamily: "var(--font-pixel)",
            fontSize: "10px",
            cursor: "pointer",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 12px rgba(242,167,187,0.25)",
            backdropFilter: "blur(8px)",
            transition: "transform 0.2s ease",
          }}
          className="hover:scale-105"
        >
          <span style={{ fontSize: "14px" }}>
            {dogUnlocked ? "🐾" : "📜"}
          </span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span style={{ color: "var(--px-rose)", fontWeight: 700 }}>
              {dogUnlocked ? "🐾 COMPAÑERA DESBLOQUEADA" : `📜 MISIONES (${completedCount}/3)`}
            </span>
            <span style={{ fontSize: "7px", color: "var(--px-beige)", opacity: 0.8 }}>
              {dogUnlocked ? "Clic para cambiar personaje" : "Clic para ver misiones"}
            </span>
          </div>
        </button>
      </div>

      {/* 2. QUESTS POPUP MODAL */}
      <AnimatePresence>
        {showQuestModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 150,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              background: "rgba(10, 8, 16, 0.8)",
              backdropFilter: "blur(8px)",
            }}
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 480,
                background: "linear-gradient(145deg, rgba(32, 28, 48, 0.98), rgba(20, 16, 32, 0.98))",
                border: "3px solid var(--px-rose)",
                borderRadius: 20,
                padding: "24px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(242,167,187,0.3)",
                color: "#FFF8EF",
                fontFamily: "var(--font-body)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 16,
                  background: "rgba(242,167,187,0.15)",
                  border: "1px solid rgba(242,167,187,0.4)",
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  color: "var(--px-rose)",
                  fontFamily: "var(--font-pixel)",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>

              <h2
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "var(--px-rose)",
                  marginBottom: 6,
                  letterSpacing: "0.04em",
                }}
              >
                📜 MISIONES Y RECOMPENSA
              </h2>
              <p style={{ fontSize: "13px", color: "#E2D9F3", marginBottom: 16, lineHeight: 1.4 }}>
                Explorá ambos dispositivos y la puerta para desbloquear a la perrita de Antonella como personaje jugable:
              </p>

              {/* Progress List */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {[
                  {
                    id: "phone",
                    label: "📱 Prender y explorar el Celular",
                    done: visitedPhone,
                  },
                  {
                    id: "pc",
                    label: "💻 Prender y explorar la Computadora",
                    done: visitedPC,
                  },
                  {
                    id: "door",
                    label: "🚪 Visitar la Puerta (Contacto)",
                    done: visitedDoor,
                  },
                ].map((m) => (
                  <div
                    key={m.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      background: m.done
                        ? "rgba(46, 204, 113, 0.15)"
                        : "rgba(18, 14, 28, 0.75)",
                      border: `1px solid ${m.done ? "rgba(46, 204, 113, 0.5)" : "rgba(242, 167, 187, 0.2)"}`,
                      borderRadius: 10,
                    }}
                  >
                    <span style={{ fontSize: "13px", color: m.done ? "#FFF" : "#D2C5E8" }}>
                      {m.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-pixel)",
                        fontSize: "9px",
                        fontWeight: 700,
                        color: m.done ? "#2ECC71" : "var(--px-rose)",
                        background: m.done ? "rgba(46,204,113,0.2)" : "rgba(242,167,187,0.15)",
                        padding: "3px 8px",
                        borderRadius: 6,
                      }}
                    >
                      {m.done ? "✓ COMPLETADO" : "PENDIENTE"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Unlocked Dog Character Section */}
              <div
                style={{
                  background: "rgba(18, 14, 28, 0.9)",
                  border: `2px solid ${dogUnlocked ? "#F2A7BB" : "rgba(242, 167, 187, 0.3)"}`,
                  borderRadius: 14,
                  padding: 14,
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid var(--px-rose)",
                    flexShrink: 0,
                    background: "radial-gradient(circle, rgba(242,167,187,0.3), transparent)",
                  }}
                >
                  <img
                    src="/dog_portrait.png"
                    alt="Perrita de Antonella"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "var(--px-rose)",
                      marginBottom: 4,
                    }}
                  >
                    {dogUnlocked ? "🎉 ¡PERRITA DESBLOQUEADA!" : "🔒 PERSONAJE BLOQUEADO"}
                  </div>
                  <p style={{ fontSize: "11px", color: "#D2C5E8", lineHeight: 1.3 }}>
                    {dogUnlocked
                      ? "¡Completaste las misiones! Tu perrita ha ingresado caminando a la habitación. Podés alternar entre ambos personajes:"
                      : "Completá las 3 misiones para que la perrita de Antonella entre caminando y puedas usarla como personaje."}
                  </p>

                  {/* Character Selector Switcher */}
                  {dogUnlocked && (
                    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                      <button
                        onClick={() => handleSwitchCharacter("antonella")}
                        style={{
                          padding: "6px 12px",
                          background:
                            activeCharacter === "antonella"
                              ? "linear-gradient(135deg, var(--px-rose-dark), var(--px-violet-dark))"
                              : "rgba(255,255,255,0.1)",
                          border: `1px solid ${activeCharacter === "antonella" ? "var(--px-rose)" : "#666"}`,
                          borderRadius: 8,
                          color: "white",
                          fontFamily: "var(--font-pixel)",
                          fontSize: "8px",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        👩 ANTONELLA
                      </button>

                      <button
                        onClick={() => handleSwitchCharacter("dog")}
                        style={{
                          padding: "6px 12px",
                          background:
                            activeCharacter === "dog"
                              ? "linear-gradient(135deg, var(--px-rose-dark), var(--px-violet-dark))"
                              : "rgba(255,255,255,0.1)",
                          border: `1px solid ${activeCharacter === "dog" ? "var(--px-rose)" : "#666"}`,
                          borderRadius: 8,
                          color: "white",
                          fontFamily: "var(--font-pixel)",
                          fontSize: "8px",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        🐾 PERRITA
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
