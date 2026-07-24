"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { audioEngine } from "@/lib/audioEngine";

export default function GameTutorialModal() {
  const { showGuideModal, isGuideDocked, closeGuideModal, openGuideModal } = useGameStore();

  const handleClose = () => {
    audioEngine.click();
    closeGuideModal();
  };

  const handleOpen = () => {
    audioEngine.click();
    openGuideModal();
  };

  return (
    <>
      {/* 1. DOCKED WIDGET (Plegable en el costado derecho) */}
      <AnimatePresence>
        {isGuideDocked && !showGuideModal && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              top: 72,
              right: 20,
              zIndex: 40,
            }}
          >
            <button
              onClick={handleOpen}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 14px 8px 8px",
                background: "rgba(28, 24, 40, 0.92)",
                border: "2px solid var(--px-rose)",
                borderRadius: 24,
                color: "#FFF8EF",
                fontFamily: "var(--font-pixel)",
                fontSize: "10px",
                cursor: "pointer",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4), 0 0 12px rgba(242,167,187,0.3)",
                backdropFilter: "blur(10px)",
                transition: "transform 0.2s ease, boxShadow 0.2s ease",
              }}
              className="hover:scale-105"
              aria-label="Abrir Guía de Controles"
            >
              {/* Avatar circle */}
              <div
                style={{
                  position: "relative",
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "2px solid var(--px-violet-light)",
                  boxShadow: "0 0 8px rgba(179,157,219,0.5)",
                }}
              >
                <img
                  src="/character_portrait.png"
                  alt="Antonella Avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Status pulse & Text */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: "#2ECC71",
                      boxShadow: "0 0 6px #2ECC71",
                    }}
                  />
                  <span style={{ color: "var(--px-rose)", fontWeight: 700, fontSize: "9px" }}>
                    GUÍA DE JUEGO
                  </span>
                </div>
                <span style={{ fontSize: "7px", color: "var(--px-beige)", opacity: 0.8 }}>
                  Haz clic para ver ❓
                </span>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. TUTORIAL MODAL POPUP (Estilo Videojuego RPG) */}
      <AnimatePresence>
        {showGuideModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
              background: "rgba(10, 8, 16, 0.75)",
              backdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 620,
                background: "linear-gradient(145deg, rgba(32, 28, 48, 0.98), rgba(20, 16, 32, 0.98))",
                border: "3px solid var(--px-rose)",
                borderRadius: 20,
                padding: "24px 28px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(242,167,187,0.25)",
                color: "#FFF8EF",
                fontFamily: "var(--font-body)",
                overflow: "hidden",
              }}
            >
              {/* Pixel Art Corner Accents */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 12,
                  height: 12,
                  background: "var(--px-rose)",
                  borderBottomRightRadius: 4,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 12,
                  height: 12,
                  background: "var(--px-rose)",
                  borderBottomLeftRadius: 4,
                }}
              />

              {/* Close Button ✕ */}
              <button
                onClick={handleClose}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 16,
                  background: "rgba(242,167,187,0.15)",
                  border: "1px solid rgba(242,167,187,0.4)",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  color: "var(--px-rose)",
                  fontFamily: "var(--font-pixel)",
                  fontSize: "12px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                }}
                aria-label="Cerrar Guía"
              >
                ✕
              </button>

              {/* Modal Body Container */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 24,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {/* CHARACTER PORTRAIT SALUDANDO (Izquierda) */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                    margin: "0 auto",
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 20,
                      overflow: "hidden",
                      border: "3px solid var(--px-violet)",
                      boxShadow: "0 8px 24px rgba(179,157,219,0.35)",
                      background: "radial-gradient(circle, rgba(242,167,187,0.2), transparent)",
                    }}
                  >
                    <img
                      src="/character_portrait.png"
                      alt="Antonella Saludando"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </motion.div>
                  <span
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: "9px",
                      color: "var(--px-rose)",
                      background: "rgba(242,167,187,0.15)",
                      padding: "4px 10px",
                      borderRadius: 12,
                      border: "1px solid rgba(242,167,187,0.3)",
                      fontWeight: 700,
                    }}
                  >
                    🌸 ANTONELLA COSTA
                  </span>
                </div>

                {/* DIALOGUE SPEECH BOX & CONTROLS (Derecha) */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 260,
                    display: "flex",
                    flexDirection: "column",
                    gap: 14,
                  }}
                >
                  {/* Speech Header */}
                  <div>
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
                      🎮 ¡BIENVENIDO/A A MI ESPACIO!
                    </h2>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.5,
                        color: "#E2D9F3",
                      }}
                    >
                      ¡Hola! Te doy la bienvenida a mi portfolio 2D interactivo.
                      Explorá la habitación y utilizá los dispositivos para descubrir mis proyectos y trayectoria:
                    </p>
                  </div>

                  {/* Controls Box */}
                  <div
                    style={{
                      background: "rgba(18, 14, 28, 0.75)",
                      border: "1px solid rgba(242, 167, 187, 0.25)",
                      borderRadius: 12,
                      padding: "12px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    {[
                      { key: "A / D o ← →", text: "Moverse de izquierda a derecha" },
                      { key: "F", text: "PRENDER / APAGAR (PC o Celular)" },
                      { key: "E", text: "USAR Celular / PC (solo prendidos)" },
                      { key: "🚪 Puerta", text: "Acercate para enviarme un mensaje" },
                    ].map((item) => (
                      <div
                        key={item.key}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "var(--font-pixel)",
                            fontSize: "9px",
                            fontWeight: 700,
                            color: "var(--px-rose)",
                            background: "rgba(242,167,187,0.2)",
                            padding: "3px 7px",
                            borderRadius: 6,
                            border: "1px solid rgba(242,167,187,0.4)",
                            whiteSpace: "nowrap",
                            minWidth: 70,
                            textAlign: "center",
                          }}
                        >
                          {item.key}
                        </span>
                        <span style={{ fontSize: "12px", color: "#F0E8FF" }}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Start Playing Button */}
                  <button
                    onClick={handleClose}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "linear-gradient(135deg, var(--px-rose-dark), var(--px-violet-dark))",
                      border: "1px solid var(--px-rose)",
                      borderRadius: 10,
                      color: "#FFFFFF",
                      fontFamily: "var(--font-pixel)",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      boxShadow: "0 4px 16px rgba(242,167,187,0.3)",
                      transition: "all 0.2s ease",
                      letterSpacing: "0.05em",
                    }}
                    className="hover:brightness-110 active:scale-95"
                  >
                    ¡ENTENDIDO! EMPEZAR A JUGAR 🎮
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
