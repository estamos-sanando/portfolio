"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";

const LOAD_STEPS = [
  "Inicializando habitación...",
  "Cargando assets...",
  "Preparando personaje...",
  "Encendiendo luces...",
  "¡Listo para explorar!",
];

export default function LoadScreen() {
  const { isLoading, loadProgress, setLoadProgress, startGame } = useGameStore();
  const [hint, setHint] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; delay: number}>>([]);

  // Generate random particles
  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
      }))
    );
  }, []);

  // Preload essential assets into memory
  useEffect(() => {
    if (typeof window === "undefined") return;
    const imagesToPreload = [
      "/room_bg.jpg",
      "/side_clean.png?v=9",
      "/idle_front.png?v=9",
      "/antonella.png",
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Simulated loading sequence
  useEffect(() => {
    if (!isLoading) return;
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setHint(true), 200);
      }
      setLoadProgress(Math.min(progress, 100));
      setStepIdx(Math.min(Math.floor(progress / 25), LOAD_STEPS.length - 1));
    }, 180);
    return () => clearInterval(interval);
  }, [isLoading, setLoadProgress]);

  // Listen for any key / tap
  const handleStart = useCallback(() => {
    if (hint) startGame();
  }, [hint, startGame]);

  useEffect(() => {
    window.addEventListener("keydown", handleStart);
    window.addEventListener("touchstart", handleStart);
    return () => {
      window.removeEventListener("keydown", handleStart);
      window.removeEventListener("touchstart", handleStart);
    };
  }, [handleStart]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          onClick={handleStart}
        >
          {/* Background particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: p.id % 3 === 0 ? "#F2A7BB" : p.id % 3 === 1 ? "#B39DDB" : "#A8C5A0",
                animationDelay: `${p.delay}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}

          {/* Pixel art scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
            }}
          />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Pixel art icon */}
            <div className="mb-6 relative">
              <div
                className="text-6xl"
                style={{
                  filter:
                    "drop-shadow(0 0 12px #F2A7BB) drop-shadow(0 0 24px #B39DDB)",
                }}
              >
                🌸
              </div>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(242,167,187,0.3)",
                    "0 0 40px rgba(179,157,219,0.5)",
                    "0 0 20px rgba(242,167,187,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="loading-logo" style={{ fontFamily: "var(--font-pixel)", fontWeight: 800, textAlign: "center" }}>
              ANTONELLA COSTA
              <br />
              <span style={{ color: "#B39DDB", fontSize: "14px", fontWeight: 700, letterSpacing: "0.15em", marginTop: 4, display: "block" }}>
                CREATIVA DIGITAL PORTFOLIO
              </span>
            </div>

            <div className="loading-sub" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "15px", marginTop: 8 }}>
              Comunicación · Contenidos · Diseño · IA
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <div className="loading-progress-bar">
              <div
                className="loading-progress-fill"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            <p
              className="text-center"
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "7px",
                color: "var(--px-beige)",
                letterSpacing: "0.05em",
              }}
            >
              {LOAD_STEPS[stepIdx]}
            </p>
          </motion.div>

          {/* Start prompt */}
          <AnimatePresence>
            {hint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-10"
              >
                <div className="loading-prompt cursor-blink">
                  Presioná cualquier tecla para comenzar
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Version / credit */}
          <div
            className="absolute bottom-6 text-center"
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "6px",
              color: "rgba(232,213,183,0.4)",
              letterSpacing: "0.1em",
            }}
          >
            v1.0 · 2025 · Hecho con ♥ en Argentina
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
