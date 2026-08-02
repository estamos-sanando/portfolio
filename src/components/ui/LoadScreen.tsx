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
          {/* 1. SEAMLESS EDGE-TO-EDGE FULLSCREEN BACKGROUND */}
          <div
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url('/cover_bg.jpg')`,
              filter: "brightness(0.98) contrast(1.02)",
            }}
          />

          {/* Subtle Ambient Vignette (No hard dark borders) */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 40%, rgba(22, 13, 27, 0.3) 100%)",
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

            {/* ---- 2. CENTERED & RESPONSIVE TITLE & PLAY BUTTON ---- */}
            <div className="absolute inset-0 px-6 py-8 sm:px-12 sm:py-12 flex flex-col items-center justify-center text-center z-20 pointer-events-auto md:left-[16%] md:right-[4%] gap-6 sm:gap-8 md:gap-10 max-w-full overflow-y-auto">
              
              {/* 1. Prominent Name Badge: ANTONELLA COSTA */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="px-6 sm:px-10 py-2.5 sm:py-3.5 rounded-full flex items-center justify-center shadow-2xl max-w-[90vw]"
                style={{
                  background: "linear-gradient(135deg, #FFF0F5, #F2A7BB, #D4748A)",
                  border: "3px solid #FFFFFF",
                  boxShadow: "0 12px 35px rgba(242,167,187,0.7), 0 0 20px rgba(255,255,255,0.8)",
                }}
              >
                <span
                  className="font-black text-lg sm:text-2xl md:text-3xl tracking-[0.25em] sm:tracking-[0.38em] text-[#1D1424] uppercase"
                  style={{
                    fontFamily: "var(--font-body)",
                    textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                    wordSpacing: "0.35em",
                  }}
                >
                  ANTONELLA COSTA
                </span>
              </motion.div>

              {/* 2. Main Title: CREATIVA DIGITAL */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white text-center leading-tight max-w-[90vw]"
                style={{
                  fontFamily: "'Pixelify Sans', var(--font-display), sans-serif",
                  letterSpacing: "0.06em",
                  wordSpacing: "0.35em",
                  color: "#FFF5FA",
                  textShadow:
                    "0 0 45px rgba(242,167,187,0.95), 0 8px 25px rgba(0,0,0,0.95), 4px 4px 0px #8A3B58",
                }}
              >
                CREATIVA DIGITAL
              </motion.h1>

              {/* 3. Subtitle: PORTFOLIO */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-2xl md:text-4xl font-black tracking-[0.35em] sm:tracking-[0.55em] uppercase text-[#E8D5B7] text-center max-w-[90vw]"
                style={{
                  textShadow: "0 3px 15px rgba(0,0,0,0.95), 0 0 10px rgba(232,213,183,0.4)",
                  wordSpacing: "0.4em",
                }}
              >
                PORTFOLIO
              </motion.div>

              {/* 4. Play Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-2 sm:pt-4"
              >
                <motion.button
                  onClick={handleStart}
                  disabled={!hintReady}
                  whileHover={hintReady ? { scale: 1.08 } : {}}
                  whileTap={hintReady ? { scale: 0.95 } : {}}
                  animate={
                    hintReady
                      ? {
                          boxShadow: [
                            "0 10px 30px rgba(242,167,187,0.5), 0 0 20px rgba(255,255,255,0.6)",
                            "0 10px 45px rgba(242,167,187,0.9), 0 0 35px rgba(255,255,255,0.9)",
                            "0 10px 30px rgba(242,167,187,0.5), 0 0 20px rgba(255,255,255,0.6)",
                          ],
                        }
                      : {}
                  }
                  transition={
                    hintReady
                      ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      : {}
                  }
                  className="relative group px-10 sm:px-16 py-4 sm:py-5 rounded-full flex items-center justify-center gap-4 transition-all duration-300 cursor-pointer overflow-hidden max-w-[90vw]"
                  style={{
                    background: hintReady
                      ? "linear-gradient(135deg, #F2A7BB 0%, #D4748A 50%, #8A3B58 100%)"
                      : "rgba(40, 25, 50, 0.8)",
                    border: "3px solid #FFFFFF",
                  }}
                >
                  {/* Glossy top highlight */}
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-white/25 pointer-events-none rounded-t-full" />

                  {!hintReady ? (
                    <div className="flex items-center gap-3 text-white/90 font-bold tracking-[0.2em] text-sm sm:text-base">
                      <span className="animate-spin text-lg sm:text-xl">🌸</span>
                      <span style={{ wordSpacing: "0.2em" }}>CARGANDO {loadProgress}%</span>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-3 sm:gap-5 text-white font-black text-xl sm:text-3xl md:text-4xl tracking-[0.3em] sm:tracking-[0.45em] uppercase"
                      style={{
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                        wordSpacing: "0.3em",
                      }}
                    >
                      <span className="text-2xl sm:text-4xl transform group-hover:scale-125 transition-transform duration-200">
                        ▶
                      </span>
                      <span>PLAY</span>
                    </div>
                  )}
                </motion.button>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}
