"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { useAudio } from "@/hooks/useAudio";

// Interactive hotspots mapped onto the exact 1920x1080 reference illustration
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

const EXACT_ROOM_HOTSPOTS: Hotspot[] = [
  {
    id: "window",
    name: "Ventana Nocturna",
    skill: "Buenos Aires · Inspiración & Visión Creativa",
    icon: "🌃",
    x: 1,
    y: 1,
    w: 20,
    h: 48,
  },
  {
    id: "lamp",
    name: "Lámpara de Escritorio",
    skill: "Luz cálida de trabajo · Foco & Noches de Creación",
    icon: "💡",
    x: 1,
    y: 26,
    w: 12,
    h: 24,
  },
  {
    id: "photo",
    name: "Retrato Ilustrado",
    skill: "Antonella · Dirección de Arte & Estilo Cartoon 2D",
    icon: "🖼️",
    x: 2,
    y: 51,
    w: 8,
    h: 18,
  },
  {
    id: "coffee",
    name: "Taza Cozy",
    skill: "Combustible Creativo para Sesiones Nocturnas",
    icon: "☕",
    x: 11,
    y: 57,
    w: 7,
    h: 12,
  },
  {
    id: "sketchbook",
    name: "Cuaderno de Bocetos",
    skill: "Storytelling Visual, UX Wireframing & Guión",
    icon: "📖",
    x: 1,
    y: 68,
    w: 20,
    h: 28,
  },
  {
    id: "phone",
    name: "Teléfono Móvil",
    skill: "Redes Sociales, Estrategia Digital & Contenidos",
    icon: "📱",
    x: 3,
    y: 85,
    w: 18,
    h: 14,
  },
  {
    id: "laptop",
    name: "Computadora",
    skill: "Diseñamos experiencias que conectan personas · Web & IA",
    icon: "💻",
    x: 68,
    y: 36,
    w: 24,
    h: 38,
  },
  {
    id: "microphone",
    name: "Micrófono Studio",
    skill: "Locución, Voz, Guión & Audio Narrativo",
    icon: "🎙️",
    x: 88,
    y: 45,
    w: 7,
    h: 30,
  },
  {
    id: "tablet",
    name: "Tableta Gráfica",
    skill: "Arte + Estrategia + Tecnología = Experiencias",
    icon: "✏️",
    x: 58,
    y: 73,
    w: 24,
    h: 26,
  },
  {
    id: "books",
    name: "Stack de Libros",
    skill: "Storytelling Visual · Branding · Diseño UX/UI",
    icon: "📚",
    x: 81,
    y: 73,
    w: 18,
    h: 25,
  },
  {
    id: "board",
    name: "Tablero de Notas",
    skill: "UX · Contenido · Guión · Edición · Disfrutar el proceso",
    icon: "📌",
    x: 74,
    y: 2,
    w: 24,
    h: 30,
  },

  // Bottom pillars
  {
    id: "pillar_ideas",
    name: "Ideas que Conectan",
    skill: "Estrategia Creativa & Concepto",
    icon: "💬",
    x: 24,
    y: 78,
    w: 8,
    h: 18,
  },
  {
    id: "pillar_historias",
    name: "Historias que Importan",
    skill: "Narrativa, Contenidos & Copywriting",
    icon: "📖",
    x: 33,
    y: 78,
    w: 8,
    h: 18,
  },
  {
    id: "pillar_diseno",
    name: "Diseño con Propósito",
    skill: "UI/UX, Estética & Experiencia de Usuario",
    icon: "✏️",
    x: 42,
    y: 78,
    w: 8,
    h: 18,
  },
  {
    id: "pillar_tecnologia",
    name: "Tecnología que Potencia",
    skill: "Desarrollo Web, Frontend & Herramientas de IA",
    icon: "🖥️",
    x: 52,
    y: 78,
    w: 8,
    h: 18,
  },
  {
    id: "pillar_impacto",
    name: "Impacto que Trasciende",
    skill: "Resultados, Alcance & Valor Real",
    icon: "⭐",
    x: 62,
    y: 78,
    w: 8,
    h: 18,
  },
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
    img.src = "/cover_reference.jpg";
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

  // Ambient sparkles
  const sparkles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
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
          className="fixed inset-0 z-[100] bg-[#120d1a] flex items-center justify-center overflow-hidden select-none"
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
            {/* 1:1 Exact Illustrated Design Image Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('/cover_reference.jpg')`,
              }}
            />

            {/* Ambient Vignette & Warm Glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, transparent 60%, rgba(18, 13, 26, 0.4) 100%)",
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
                  backgroundColor: s.id % 2 === 0 ? "#FFC4D6" : "#FFE5B4",
                  boxShadow: "0 0 10px rgba(255, 196, 214, 0.9)",
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

            {/* ---- DYNAMIC LIVE OVERLAY OVER THE CENTRAL LOADING BAR ---- */}
            <div
              className="absolute pointer-events-auto"
              style={{
                left: "28.5%",
                top: "55.2%",
                width: "43%",
                height: "17%",
                zIndex: 30,
              }}
            >
              {/* Live Animated Progress Bar overlay directly over the image progress bar */}
              <div
                className="absolute"
                style={{
                  left: "14.2%",
                  top: "37.5%",
                  width: "71.5%",
                  height: "17%",
                  borderRadius: "999px",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #E66B8B 0%, #F59DB4 50%, #E86F90 100%)",
                    boxShadow: "0 0 12px rgba(245, 157, 180, 0.9)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${loadProgress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>

              {/* Live Percentage Counter overlay */}
              <div
                className="absolute font-extrabold text-sm"
                style={{
                  right: "7.8%",
                  top: "35.5%",
                  color: "#D45B78",
                  fontFamily: "var(--font-display), 'Plus Jakarta Sans', sans-serif",
                }}
              >
                {loadProgress}%
              </div>

              {/* Dynamic Keypress Hint Message when 100% loaded */}
              {hintReady && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-x-0 bottom-2 flex justify-center cursor-pointer"
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
                    className="font-extrabold text-xs md:text-sm tracking-wider px-5 py-1.5 rounded-full text-[#361E27] bg-[#FFF0F5] border-2 border-[#F2A7BB]"
                  >
                    ✨ PRESIONÁ CUALQUIER TECLA PARA COMENZAR ✨
                  </motion.span>
                </motion.div>
              )}
            </div>

            {/* ---- INTERACTIVE DESK HOTSPOTS & TOOLTIPS ---- */}
            {EXACT_ROOM_HOTSPOTS.map((spot) => {
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
                  {/* Subtle hover outline */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-all duration-300 pointer-events-none ${
                      isHovered
                        ? "border-2 border-[#F59DB4] bg-pink-400/10 shadow-[0_0_20px_rgba(245,157,180,0.4)]"
                        : "border border-transparent group-hover:border-white/20"
                    }`}
                  />

                  {/* Cozy Indie Game Tooltip */}
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
                          className="px-4 py-2.5 rounded-2xl shadow-2xl backdrop-blur-md text-center"
                          style={{
                            background: "rgba(40, 28, 44, 0.94)",
                            border: "2px solid #F59DB4",
                            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          }}
                        >
                          <div className="flex items-center justify-center gap-1.5 mb-0.5">
                            <span className="text-base">{spot.icon}</span>
                            <span
                              className="font-bold text-xs tracking-wide"
                              style={{ color: "#F59DB4" }}
                            >
                              {spot.name}
                            </span>
                          </div>
                          <p className="text-[11px] text-pink-100 font-medium leading-snug">
                            {spot.skill}
                          </p>
                        </div>
                        {/* Arrow */}
                        <div className="w-2.5 h-2.5 bg-[#281C2C] border-r-2 border-b-2 border-[#F59DB4] rotate-45 mx-auto -mt-1.5" />
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
