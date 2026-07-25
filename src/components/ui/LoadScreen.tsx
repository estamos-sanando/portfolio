"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { useAudio } from "@/hooks/useAudio";

// Interactive hotspots mapped on the 1920x1080 illustrated room
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

const ROOM_HOTSPOTS: Hotspot[] = [
  {
    id: "window",
    name: "Ventana Nocturna",
    skill: "Buenos Aires · Inspiración & Visión Creativa",
    icon: "🌃",
    x: 2,
    y: 5,
    w: 22,
    h: 58,
  },
  {
    id: "sketchbook",
    name: "Cuaderno de Bocetos",
    skill: "Storytelling Visual, Wireframing & UX",
    icon: "📖",
    x: 3,
    y: 75,
    w: 18,
    h: 20,
  },
  {
    id: "phone",
    name: "Teléfono Móvil",
    skill: "Estrategia Digital, Redes & Comunicación",
    icon: "📱",
    x: 18,
    y: 72,
    w: 8,
    h: 12,
  },
  {
    id: "coffee",
    name: "Café de Noche",
    skill: "Foco, Creatividad & Cozy Vibe",
    icon: "☕",
    x: 28,
    y: 70,
    w: 7,
    h: 12,
  },
  {
    id: "laptop",
    name: "Computadora de Trabajo",
    skill: "Desarrollo Web, Frontend & Herramientas de IA",
    icon: "💻",
    x: 36,
    y: 58,
    w: 26,
    h: 24,
  },
  {
    id: "tablet",
    name: "Tableta Gráfica",
    skill: "Ilustración 2D, UI Design & Arte Digital",
    icon: "✏️",
    x: 40,
    y: 82,
    w: 28,
    h: 15,
  },
  {
    id: "microphone",
    name: "Micrófono Studio",
    skill: "Locución, Producción de Voz & Audio",
    icon: "🎙️",
    x: 67,
    y: 60,
    w: 10,
    h: 24,
  },
  {
    id: "books",
    name: "Librería de Diseño",
    skill: "Branding, UX/UI & Aprendizaje Continuo",
    icon: "📚",
    x: 81,
    y: 56,
    w: 17,
    h: 40,
  },
  {
    id: "board",
    name: "Tablero de Notas",
    skill: "Ideas + Acción = Cambio · Planificación",
    icon: "📌",
    x: 79,
    y: 17,
    w: 19,
    h: 28,
  },
];

const SKILL_PILLARS = [
  { icon: "💬", title: "IDEAS", sub: "QUE CONECTAN" },
  { icon: "📖", title: "HISTORIAS", sub: "QUE IMPORTAN" },
  { icon: "✏️", title: "DISEÑO", sub: "CON PROPÓSITO" },
  { icon: "🖥️", title: "TECNOLOGÍA", sub: "QUE POTENCIA" },
  { icon: "⭐", title: "IMPACTO", sub: "QUE TRASCIENDE" },
];

export default function LoadScreen() {
  const { isLoading, loadProgress, setLoadProgress, startGame } = useGameStore();
  const { play } = useAudio();
  const [hintReady, setHintReady] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [scale, setScale] = useState(1);

  // Calculate dynamic 16:9 proportional scaling for 1920x1080 without scrollbars
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scaleX = w / 1920;
      const scaleY = h / 1080;
      // Fit whole 1920x1080 scene into viewport
      const currentScale = Math.min(scaleX, scaleY);
      setScale(currentScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Preload background artwork and essential sprites
  useEffect(() => {
    if (typeof window === "undefined") return;
    const imagesToPreload = [
      "/cover_bg.png",
      "/cover_reference.jpg",
      "/room_bg.jpg",
      "/idle_front.png",
    ];
    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Smooth loading progression sequence
  useEffect(() => {
    if (!isLoading) return;
    let current = 0;
    const interval = setInterval(() => {
      current += Math.random() * 14 + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => setHintReady(true), 300);
      }
      setLoadProgress(Math.min(Math.floor(current), 100));
    }, 150);

    return () => clearInterval(interval);
  }, [isLoading, setLoadProgress]);

  // Start handler on keydown or click when loading finished
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

  // Floating stars / warm ambient light specs
  const stars = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
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
          className="fixed inset-0 z-[100] bg-[#0d0a14] flex items-center justify-center overflow-hidden select-none"
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
            {/* 2D Cozy Room Background Illustration */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{
                backgroundImage: `url('/cover_bg.png'), url('/cover_reference.jpg')`,
                filter: "brightness(0.92) contrast(1.05)",
              }}
            />

            {/* Ambient Warm Night Overlay & Subtle Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(255, 230, 210, 0.08) 0%, rgba(13, 10, 20, 0.45) 80%, rgba(13, 10, 20, 0.75) 100%)",
              }}
            />

            {/* Floating Ambient Sparkles / Light Dust Particles */}
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
                  boxShadow: "0 0 8px rgba(242, 167, 187, 0.8)",
                }}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.8, 1.3, 0.8],
                  translateY: [0, -15, 0],
                }}
                transition={{
                  duration: s.duration,
                  delay: s.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}

            {/* ---- INTERACTIVE HOTSPOTS ON DESK OBJECTS ---- */}
            {ROOM_HOTSPOTS.map((spot) => {
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
                    zIndex: 20,
                  }}
                  onMouseEnter={() => {
                    setActiveHotspot(spot);
                    play("click");
                  }}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  {/* Subtle pulsing indicator icon */}
                  <motion.div
                    className="absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-md"
                    style={{
                      background: "rgba(242, 167, 187, 0.85)",
                      border: "2px solid #FFF",
                      backdropFilter: "blur(4px)",
                    }}
                    animate={{
                      scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.1, 1],
                      boxShadow: isHovered
                        ? "0 0 15px rgba(242, 167, 187, 0.9)"
                        : "0 0 8px rgba(242, 167, 187, 0.4)",
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {spot.icon}
                  </motion.div>

                  {/* Highlight border on hover */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                      isHovered
                        ? "border-2 border-[#F2A7BB] bg-pink-500/10 shadow-[0_0_20px_rgba(242,167,187,0.3)]"
                        : "border border-white/10 opacity-40 group-hover:opacity-100"
                    }`}
                  />

                  {/* Cozy Tooltip Card */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 pointer-events-none z-30"
                        style={{ minWidth: "240px" }}
                      >
                        <div
                          className="px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md"
                          style={{
                            background: "rgba(45, 38, 58, 0.92)",
                            border: "2px solid #F2A7BB",
                            boxShadow: "0 12px 28px rgba(0,0,0,0.4)",
                          }}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{spot.icon}</span>
                            <span
                              className="font-bold text-sm tracking-wide"
                              style={{ color: "#F2A7BB" }}
                            >
                              {spot.name}
                            </span>
                          </div>
                          <p className="text-xs text-purple-100 leading-snug font-medium">
                            {spot.skill}
                          </p>
                        </div>
                        {/* Arrow */}
                        <div
                          className="w-3 h-3 bg-[#2D263A] border-r-2 border-b-2 border-[#F2A7BB] rotate-45 mx-auto -mt-1.5"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* ---- CENTER TITLE & COZY GAME UI ---- */}
            <div className="absolute inset-0 flex flex-col items-center justify-between py-16 pointer-events-none z-20">
              
              {/* TOP HEADER / EMBLEM */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center text-center mt-4 pointer-events-auto"
              >
                {/* Cozy Pink Emblem Badge */}
                <div
                  className="px-6 py-1.5 rounded-full flex items-center gap-2 shadow-lg mb-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(242,167,187,0.95), rgba(179,157,219,0.95))",
                    border: "2px solid #FFFFFF",
                    boxShadow: "0 8px 20px rgba(242,167,187,0.4)",
                  }}
                >
                  <span className="text-sm">🌸</span>
                  <span
                    className="font-extrabold text-sm tracking-[0.25em] text-slate-900 uppercase"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    ANTONELLA COSTA
                  </span>
                  <span className="text-sm">🌸</span>
                </div>

                {/* Main 2D Game Title */}
                <h1
                  className="text-6xl md:text-7xl font-black tracking-wider text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.7)]"
                  style={{
                    fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                    letterSpacing: "0.08em",
                    color: "#FFF5FA",
                    textShadow:
                      "0 0 20px rgba(242,167,187,0.6), 0 4px 10px rgba(0,0,0,0.8), 2px 2px 0px #8A3B58",
                  }}
                >
                  CREATIVA DIGITAL
                </h1>

                <div
                  className="text-xl font-bold tracking-[0.4em] uppercase mt-1"
                  style={{ color: "#E8D5B7", textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                >
                  PORTFOLIO
                </div>

                {/* Subtitle Pills */}
                <div className="flex items-center gap-3 mt-4">
                  {["COMUNICACIÓN", "CONTENIDOS", "DISEÑO", "IA"].map((item, idx) => (
                    <div key={item} className="flex items-center gap-3">
                      <span
                        className="text-xs font-semibold tracking-[0.2em] px-3.5 py-1 rounded-lg"
                        style={{
                          background: "rgba(35, 28, 48, 0.75)",
                          color: "#F2A7BB",
                          border: "1px solid rgba(242,167,187,0.4)",
                          backdropFilter: "blur(6px)",
                        }}
                      >
                        {item}
                      </span>
                      {idx < 3 && <span className="text-[#B39DDB] text-xs font-bold">✦</span>}
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* ---- CENTER / LOWER: ANIMATED LOADING CARD ---- */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col items-center pointer-events-auto"
              >
                <div
                  className="px-10 py-6 rounded-3xl flex flex-col items-center gap-4 text-center"
                  style={{
                    background: "rgba(38, 30, 52, 0.88)",
                    border: "3px solid #F2A7BB",
                    boxShadow:
                      "0 20px 50px rgba(0,0,0,0.6), inset 0 0 20px rgba(242,167,187,0.15)",
                    backdropFilter: "blur(12px)",
                    minWidth: "480px",
                  }}
                >
                  {/* Status text */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💖</span>
                    <span
                      className="font-bold text-sm tracking-[0.15em] uppercase"
                      style={{ color: "#FFF8EF", fontFamily: "var(--font-body)" }}
                    >
                      {!hintReady ? "Cargando experiencias..." : "¡Experiencia Lista!"}
                    </span>
                    <span className="text-xl">💖</span>
                  </div>

                  {/* Animated Loading Bar */}
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

                  {/* START PROMPT KEYBOARD MSG */}
                  <div className="h-8 flex items-center justify-center mt-1">
                    {!hintReady ? (
                      <span className="text-xs text-purple-200/70 italic tracking-wide">
                        Preparando el estudio de Antonella...
                      </span>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="cursor-pointer"
                      >
                        <span
                          className="font-extrabold text-sm md:text-base tracking-wider px-5 py-2 rounded-full inline-block"
                          style={{
                            background: "linear-gradient(90deg, #F2A7BB, #B39DDB)",
                            color: "#1A1423",
                            boxShadow: "0 0 20px rgba(242,167,187,0.7)",
                            animation: "pulse 1.5s infinite",
                          }}
                        >
                          ✨ Presioná cualquier tecla para comenzar ✨
                        </span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* ---- BOTTOM: NATURAL SKILL PILLARS / BADGES ---- */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex items-center gap-6 pointer-events-auto mb-2"
              >
                {SKILL_PILLARS.map((pillar) => (
                  <motion.div
                    key={pillar.title}
                    whileHover={{ scale: 1.08, y: -4 }}
                    className="flex flex-col items-center px-4 py-2 rounded-2xl cursor-pointer transition-all duration-200"
                    style={{
                      background: "rgba(35, 27, 48, 0.78)",
                      border: "1.5px solid rgba(242,167,187,0.35)",
                      backdropFilter: "blur(8px)",
                      boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                    }}
                    onMouseEnter={() => play("click")}
                  >
                    <span className="text-2xl mb-0.5">{pillar.icon}</span>
                    <span
                      className="font-extrabold text-[11px] tracking-wider uppercase"
                      style={{ color: "#FFF8EF" }}
                    >
                      {pillar.title}
                    </span>
                    <span
                      className="font-medium text-[9px] tracking-widest uppercase"
                      style={{ color: "#F2A7BB" }}
                    >
                      {pillar.sub}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
