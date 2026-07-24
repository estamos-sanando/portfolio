"use client";

import { useGameStore } from "@/hooks/useGameStore";

/**
 * PixelRoom — Renderiza la habitación con superposición absoluta directa de <img>.
 * Evita cualquier rescalado de envoltorios de Next.js para un cambio de capas 100% imperceptible.
 */
export default function PixelRoom() {
  const { isPcOn, isPhoneOn } = useGameStore();

  const commonStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center bottom",
    pointerEvents: "none",
  };

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 1,
        backgroundColor: "#1E1A29",
      }}
    >
      {/* 1. BASE ESTÁTICA: Habitación Apagada (Siempre 100% opaca) */}
      <img
        src="/room_off_off.jpg"
        alt="Habitación Apagada"
        style={{ ...commonStyle, zIndex: 1 }}
      />

      {/* 2. SOLO PC PRENDIDA */}
      <img
        src="/room_pc_off.jpg"
        alt="PC Prendida"
        style={{
          ...commonStyle,
          zIndex: 2,
          opacity: isPcOn && !isPhoneOn ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
          willChange: "opacity",
        }}
      />

      {/* 3. SOLO CELULAR PRENDIDO */}
      <img
        src="/room_off_phone.jpg"
        alt="Celular Prendido"
        style={{
          ...commonStyle,
          zIndex: 3,
          opacity: !isPcOn && isPhoneOn ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
          willChange: "opacity",
        }}
      />

      {/* 4. AMBOS PRENDIDOS */}
      <img
        src="/room_pc_phone.jpg"
        alt="Ambos Prendidos"
        style={{
          ...commonStyle,
          zIndex: 4,
          opacity: isPcOn && isPhoneOn ? 1 : 0,
          transition: "opacity 0.25s ease-in-out",
          willChange: "opacity",
        }}
      />
    </div>
  );
}
