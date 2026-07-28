"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { useAudio } from "@/hooks/useAudio";

export default function LoadScreen() {
  const { isLoading, loadProgress, setLoadProgress, startGame } = useGameStore();
  const { play } = useAudio();
  const [hintReady, setHintReady] = useState(false);
  const [scale, setScale] = useState(1);

  // Proportional 16:9 scaling for exact 1920x1080 canvas without scrollbars
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scaleX = w / 1920;
      const scaleY = h / 1080;
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload background artwork
  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = new Image();
    img.src = "/cover_bg.png";
  }, []);

  // Smooth loading progression loop
  useEffect(() => {
    if (!isLoading) return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 16 + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setHintReady(true), 250);
      }
      setLoadProgress(Math.min(Math.floor(current), 100));
    }, 140);

    return () => clearInterval(interval);
  }, [isLoading, setLoadProgress]);

  // Start handler on keydown or click
  const handleStart = useCallback(() => {
    if (hintReady && isLoading) {
      play("openWindow");
      startGame();
    }
  }, [hintReady, isLoading, startGame, play]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hintReady) handleStart();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hintReady, handleStart]);

  // Ambient floating sparkles / stars
  const sparkles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#160d1b] flex items-center justify-center overflow-hidden select-none cursor-pointer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          onClick={handleStart}
        >
          {/* ---- PROPORTIONAL 1920x1080 STAGE ---- */}
          <div
            className="relative overflow-hidden shadow-2xl flex-shrink-0"
            style={{
              width: "1920px",
              height: "1080px",
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
          >
            {/* 1. BASE BACKGROUND IMAGE */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/cover_bg.png')`,
                filter: "brightness(0.95) contrast(1.05)",
              }}
            />

            {/* Ambient Warm Night Overlay & Subtle Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(255, 220, 200, 0.05) 0%, rgba(22, 13, 27, 0.45) 80%, rgba(22, 13, 27, 0.75) 100%)",
              }}
            />

            {/* Floating Ambient Sparkles */}
            {sparkles.map((s) => (
              <motion.div
                key={s.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  backgroundColor: s.id % 2 === 0 ? "#F2A7BB" : "#FFE5B4",
                  boxShadow: "0 0 10px rgba(242, 167, 187, 0.8)",
                }}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.8, 1.3, 0.8],
                  translateY: [0, -12, 0],
                }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* ---- 2. RIGHT-ALIGNED TITLE & LOADING CARD ---- */}
            <div className="absolute inset-y-0 right-12 md:right-20 lg:right-28 flex flex-col items-end justify-center text-right z-20 pointer-events-auto max-w-3xl">
              
              {/* Enlarged Name Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="px-8 py-3 rounded-2xl flex items-center gap-3 shadow-2xl mb-4"
                style={{
                  background: "linear-gradient(135deg, #F2A7BB, #D4748A)",
                  border: "3px solid #FFFFFF",
                  boxShadow: "0 10px 30px rgba(242,167,187,0.6)",
                }}
              >
                <span className="text-xl">🌸</span>
                <span
                  className="font-black text-2xl md:text-3xl tracking-[0.3em] text-[#2A1420] uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  ANTONELLA COSTA
                </span>
                <span className="text-xl">🌸</span>
              </motion.div>

              {/* Main Title */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-7xl md:text-8xl font-black text-white text-right leading-none"
                style={{
                  fontFamily: "'Pixelify Sans', var(--font-display), sans-serif",
                  letterSpacing: "0.06em",
                  color: "#FFF5FA",
                  textShadow:
                    "0 0 35px rgba(242,167,187,0.9), 0 8px 20px rgba(0,0,0,0.9), 4px 4px 0px #8A3B58",
                }}
              >
                CREATIVA DIGITAL
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-3xl font-bold tracking-[0.45em] uppercase mt-3 text-[#E8D5B7] text-right"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
              >
                PORTFOLIO
              </motion.div>

              {/* Sub-pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center gap-3 mt-5 px-6 py-2.5 rounded-xl shadow-md"
                style={{
                  background: "rgba(30, 20, 40, 0.88)",
                  border: "2px solid rgba(242,167,187,0.45)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {["COMUNICACIÓN", "CONTENIDOS", "DISEÑO", "IA"].map((item, idx) => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      className="font-extrabold text-xs md:text-sm tracking-[0.2em]"
                      style={{ color: "#FFF8EF", fontFamily: "var(--font-body)" }}
                    >
                      {item}
                    </span>
                    {idx < 3 && <span className="text-[#F2A7BB] text-xs">✦</span>}
                  </div>
                ))}
              </motion.div>

              {/* Right-Aligned Loading Box Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-8 px-10 py-6 rounded-3xl flex flex-col items-center gap-4 text-center shadow-2xl w-full max-w-lg"
                style={{
                  background: "rgba(38, 26, 48, 0.92)",
                  border: "3px solid #F2A7BB",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(242,167,187,0.15)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Header text */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">💖</span>
                  <span
                    className="font-extrabold text-sm tracking-[0.18em] uppercase text-[#FFF8EF]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {!hintReady ? "Cargando experiencias..." : "¡Experiencia Lista!"}
                  </span>
                  <span className="text-xl">💖</span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full flex items-center gap-4">
                  <div
                    className="flex-1 h-5 rounded-full p-1 relative overflow-hidden"
                    style={{
                      background: "rgba(20, 15, 28, 0.8)",
                      border: "2px solid #D4748A",
                    }}
                  >
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{
                        background:
                          "linear-gradient(90deg, #D4748A 0%, #F2A7BB 50%, #B39DDB 100%)",
                        boxShadow: "0 0 12px rgba(242,167,187,0.8)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadProgress}%` }}
                      transition={{ ease: "easeOut" }}
                    />
                  </div>
                  <span
                    className="font-extrabold text-sm w-12 text-right"
                    style={{ color: "#F2A7BB" }}
                  >
                    {loadProgress}%
                  </span>
                </div>

                {/* Keypress message */}
                <div className="h-8 flex items-center justify-center mt-1">
                  {!hintReady ? (
                    <span className="text-xs text-purple-200/70 italic tracking-wide">
                      Preparando el estudio creativo...
                    </span>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="cursor-pointer"
                    >
                      <motion.span
                        animate={{
                          scale: [1, 1.04, 1],
                          boxShadow: [
                            "0 0 10px rgba(242,167,187,0.4)",
                            "0 0 25px rgba(242,167,187,0.9)",
                            "0 0 10px rgba(242,167,187,0.4)",
                          ],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="font-extrabold text-xs md:text-sm tracking-wider px-6 py-2.5 rounded-full inline-block text-[#1D1424] bg-gradient-to-r from-[#F2A7BB] to-[#B39DDB]"
                      >
                        ✨ Presioná cualquier tecla para comenzar ✨
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              </motion.div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
