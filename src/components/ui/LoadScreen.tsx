"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { useAudio } from "@/hooks/useAudio";

// Hotspot definitions mapped on the 1920x1080 background
interface Hotspot {
  id: string;
  name: string;
  skill: string;
  icon: string;
  x: number; // percentage
  y: number; // percentage
  w: number;
  h: number;
}

const DESK_HOTSPOTS: Hotspot[] = [
  {
    id: "window",
    name: "Ventana Nocturna",
    skill: "Buenos Aires · Inspiración & Visión Creativa",
    icon: "🌃",
    x: 0,
    y: 0,
    w: 28,
    h: 56,
  },
  {
    id: "lamp",
    name: "Lámpara de Escritorio",
    skill: "Luz cálida de trabajo · Foco & Noches Creativas",
    icon: "💡",
    x: 3,
    y: 36,
    w: 20,
    h: 32,
  },
  {
    id: "sketchbook",
    name: "Cuaderno de Bocetos",
    skill: "Storytelling Visual, Wireframing & Arquitectura UX",
    icon: "📖",
    x: 4,
    y: 68,
    w: 24,
    h: 22,
  },
  {
    id: "phone",
    name: "Teléfono Móvil",
    skill: "Redes Sociales, Estrategia Digital & Comunicación",
    icon: "📱",
    x: 27,
    y: 69,
    w: 10,
    h: 12,
  },
  {
    id: "coffee",
    name: "Café Cozy",
    skill: "Combustible Creativo para Sesiones Nocturnas",
    icon: "☕",
    x: 29,
    y: 60,
    w: 8,
    h: 12,
  },
  {
    id: "laptop",
    name: "Computadora",
    skill: "Desarrollo Web, Frontend & Herramientas de IA",
    icon: "💻",
    x: 37,
    y: 48,
    w: 26,
    h: 24,
  },
  {
    id: "tablet",
    name: "Tableta Gráfica",
    skill: "Ilustración 2D, UI Design & Arte Digital",
    icon: "✏️",
    x: 37,
    y: 71,
    w: 27,
    h: 14,
  },
  {
    id: "microphone",
    name: "Micrófono Studio",
    skill: "Locución, Voz, Guión & Audio Narrativo",
    icon: "🎙️",
    x: 65,
    y: 52,
    w: 7,
    h: 20,
  },
  {
    id: "cube",
    name: "Cubo Pixel de Luz",
    skill: "Detalles Cozy & Game Aesthetic",
    icon: "👾",
    x: 73,
    y: 60,
    w: 9,
    h: 12,
  },
  {
    id: "books",
    name: "Stack de Libros",
    skill: "Branding, UX/UI & Aprendizaje Continuo",
    icon: "📚",
    x: 80,
    y: 68,
    w: 19,
    h: 18,
  },
  {
    id: "board",
    name: "Tablero de Notas",
    skill: "UX · Contenido · Guión · Edición · Disfrutar el proceso",
    icon: "📌",
    x: 74,
    y: 12,
    w: 25,
    h: 30,
  },
];

// Bottom 5 skill badges
const BOTTOM_BADGES = [
  { icon: "💬", title: "IDEAS", sub: "QUE CONECTAN", desc: "Estrategia Creativa & Concepto" },
  { icon: "📖", title: "HISTORIAS", sub: "QUE IMPORTAN", desc: "Narrativa, Contenidos & Guión" },
  { icon: "✏️", title: "DISEÑO", sub: "CON PROPÓSITO", desc: "UI/UX & Experiencia de Usuario" },
  { icon: "🖥️", title: "TECNOLOGÍA", sub: "QUE POTENCIA", desc: "Desarrollo Frontend & Herramientas IA" },
  { icon: "⭐", title: "IMPACTO", sub: "QUE TRASCIENDE", desc: "Resultados & Soluciones de Valor" },
];

export default function LoadScreen() {
  const { isLoading, loadProgress, setLoadProgress, startGame } = useGameStore();
  const { play } = useAudio();
  const [hintReady, setHintReady] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
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

  // Preload essential background image
  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = new Image();
    img.src = "/cover_clean_bg.png";
  }, []);

  // Smooth loading progression sequence
  useEffect(() => {
    if (!isLoading) return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 15 + 5;
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

  // Floating stars
  const stars = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
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
          className="fixed inset-0 z-[100] bg-[#1a1423] flex items-center justify-center overflow-hidden select-none"
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
            {/* 1. BACKGROUND IMAGE LAYER (Clean Studio Scene) */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/cover_clean_bg.png'), url('/cover_bg.png')`,
                filter: "brightness(0.96) contrast(1.04)",
              }}
            />

            {/* Ambient Vignette & Warm Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 30%, rgba(255, 230, 210, 0.08) 0%, rgba(26, 20, 35, 0.45) 80%, rgba(26, 20, 35, 0.75) 100%)",
              }}
            />

            {/* Floating Ambient Sparkles */}
            {stars.map((s) => (
              <motion.div
                key={s.id}
                className="absolute rounded-full pointer-events-none"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  backgroundColor: s.id % 2 === 0 ? "#F2A7BB" : "#FFE5B4",
                  boxShadow: "0 0 10px rgba(242, 167, 187, 0.9)",
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

            {/* ---- 2. TOP UI TITLE & EMBLEM (SEPARATE Crisp Vector HTML/CSS UI) ---- */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-center z-20 pointer-events-auto">
              
              {/* Top Emblem Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-6 py-1.5 rounded-full flex items-center gap-2 shadow-lg mb-3"
                style={{
                  background: "linear-gradient(135deg, #F2A7BB, #D4748A)",
                  border: "2px solid #FFFFFF",
                  boxShadow: "0 8px 20px rgba(242,167,187,0.5)",
                }}
              >
                <span className="text-sm">💖</span>
                <span
                  className="font-extrabold text-sm tracking-[0.25em] text-[#2A1420] uppercase"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  ANTONELLA COSTA
                </span>
                <span className="text-sm">💖</span>
              </motion.div>

              {/* Main 2D Pixel Title */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-7xl md:text-8xl font-black text-white"
                style={{
                  fontFamily: "'Pixelify Sans', var(--font-display), sans-serif",
                  letterSpacing: "0.06em",
                  color: "#FFF5FA",
                  textShadow:
                    "0 0 25px rgba(242,167,187,0.7), 0 4px 12px rgba(0,0,0,0.8), 3px 3px 0px #8A3B58",
                }}
              >
                CREATIVA DIGITAL
              </motion.h1>

              {/* Sub-pills */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-3 mt-3 px-5 py-1.5 rounded-xl shadow-md"
                style={{
                  background: "rgba(35, 25, 45, 0.85)",
                  border: "2px solid rgba(242,167,187,0.4)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {["COMUNICACIÓN", "CONTENIDOS", "DISEÑO", "IA"].map((item, idx) => (
                  <div key={item} className="flex items-center gap-3">
                    <span
                      className="font-extrabold text-xs tracking-[0.2em]"
                      style={{ color: "#FFF8EF", fontFamily: "var(--font-body)" }}
                    >
                      {item}
                    </span>
                    {idx < 3 && <span className="text-[#F2A7BB] text-xs">✦</span>}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ---- 3. CENTER LOADING CARD (SEPARATE Crisp Vector Box) ---- */}
            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="px-10 py-6 rounded-3xl flex flex-col items-center gap-4 text-center shadow-2xl"
                style={{
                  background: "#FAF0E6",
                  border: "4px solid #D4748A",
                  boxShadow:
                    "0 20px 50px rgba(0,0,0,0.6), inset 0 0 0 2px #FFF, 0 0 30px rgba(242,167,187,0.4)",
                  minWidth: "520px",
                }}
              >
                {/* Header Text */}
                <div className="flex items-center gap-2">
                  <span className="text-xl">💖</span>
                  <span
                    className="font-extrabold text-sm tracking-[0.18em] uppercase text-[#4A2633]"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {!hintReady ? "CARGANDO EXPERIENCIAS..." : "¡EXPERIENCIA LISTA!"}
                  </span>
                  <span className="text-xl">💖</span>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full flex items-center gap-4">
                  <div
                    className="flex-1 h-6 rounded-full p-1 relative overflow-hidden"
                    style={{
                      background: "#2D1F2D",
                      border: "2px solid #8A3B58",
                      boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)",
                    }}
                  >
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden flex items-center justify-end pr-1"
                      style={{
                        background:
                          "linear-gradient(90deg, #D4748A 0%, #F2A7BB 50%, #E8A0B4 100%)",
                        boxShadow: "0 0 12px rgba(242,167,187,0.9)",
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${loadProgress}%` }}
                      transition={{ ease: "easeOut" }}
                    >
                      <span className="text-xs">💖</span>
                    </motion.div>
                  </div>
                  <span
                    className="font-black text-base w-12 text-right"
                    style={{ color: "#D4748A" }}
                  >
                    {loadProgress}%
                  </span>
                </div>

                {/* KEYBOARD TRIGGER MESSAGE */}
                <div className="h-8 flex items-center justify-center mt-1">
                  {!hintReady ? (
                    <span className="text-xs text-[#7A4B58] italic tracking-wide font-medium">
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
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 0 12px rgba(242,167,187,0.5)",
                            "0 0 28px rgba(242,167,187,0.95)",
                            "0 0 12px rgba(242,167,187,0.5)",
                          ],
                        }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                        className="font-extrabold text-xs md:text-sm tracking-wider px-6 py-2 rounded-full inline-block text-[#2A1420] bg-white border-2 border-[#F2A7BB]"
                      >
                        ✨ Presioná cualquier tecla para comenzar ✨
                      </motion.span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* ---- 4. BOTTOM 5 BADGES (SEPARATE Vector UI Cards) ---- */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 z-20 pointer-events-auto">
              {BOTTOM_BADGES.map((badge) => (
                <motion.div
                  key={badge.title}
                  whileHover={{ scale: 1.08, y: -4 }}
                  className="flex flex-col items-center px-4 py-2.5 rounded-2xl cursor-pointer transition-all duration-200"
                  style={{
                    background: "#FAF0E6",
                    border: "2px solid #D4748A",
                    boxShadow: "0 8px 18px rgba(0,0,0,0.35)",
                    minWidth: "150px",
                  }}
                  onMouseEnter={() => play("click")}
                >
                  <span className="text-2xl mb-1">{badge.icon}</span>
                  <span
                    className="font-extrabold text-[12px] tracking-wider uppercase text-[#3A1E29]"
                    style={{ fontFamily: "var(--font-display), sans-serif" }}
                  >
                    {badge.title}
                  </span>
                  <span
                    className="font-bold text-[9px] tracking-widest uppercase text-[#D4748A]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {badge.sub}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* ---- 5. INTERACTIVE HOTSPOTS ON DESK OBJECTS ---- */}
            {DESK_HOTSPOTS.map((spot) => {
              const isHovered = activeHotspot?.id === spot.id;
              return (
                <div
                  key={spot.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    width: `${spot.w}%`,
                    height: `${spot.h}%`,
                    zIndex: 25,
                  }}
                  onMouseEnter={() => {
                    setActiveHotspot(spot);
                    play("click");
                  }}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  {/* Subtle hover outline */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                      isHovered
                        ? "border-2 border-[#F2A7BB] bg-pink-400/10 shadow-[0_0_20px_rgba(242,167,187,0.4)]"
                        : "border border-transparent group-hover:border-white/20"
                    }`}
                  />

                  {/* Cozy Tooltip Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 pointer-events-none z-40"
                        style={{ minWidth: "220px" }}
                      >
                        <div
                          className="px-4 py-2.5 rounded-2xl shadow-2xl text-center"
                          style={{
                            background: "#FAF0E6",
                            border: "2px solid #D4748A",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          }}
                        >
                          <div className="flex items-center justify-center gap-1.5 mb-0.5">
                            <span className="text-base">{spot.icon}</span>
                            <span
                              className="font-bold text-xs tracking-wide text-[#3A1E29]"
                              style={{ color: "#D4748A" }}
                            >
                              {spot.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#4A2C38] font-medium leading-snug">
                            {spot.skill}
                          </p>
                        </div>
                        {/* Arrow */}
                        <div className="w-2.5 h-2.5 bg-[#FAF0E6] border-r-2 border-b-2 border-[#D4748A] rotate-45 mx-auto -mt-1.5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
