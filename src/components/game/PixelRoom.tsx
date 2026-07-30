"use client";

import { useGameStore } from "@/hooks/useGameStore";

/**
 * PixelRoom — Renderiza el fondo de la habitación según el estado de la PC y Celular.
 * Acompaña al personaje con panning horizontal suave en pantallas estrechas / móviles.
 * 100% responsivo y sin espacios vacíos laterales en ningún dispositivo.
 */
export default function PixelRoom() {
  const { isPcOn, isPhoneOn, cameraX, maxCameraX } = useGameStore();

  const cameraProgress = Math.min(
    100,
    Math.max(0, (cameraX / (maxCameraX || 1)) * 100)
  );

  const commonStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: `${cameraProgress}% center`,
    pointerEvents: "none",
    transition: "object-position 0.04s ease-out",
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
      {/* 1. TODO APAGADO */}
      <img
        src="/room_off_off.jpg"
        alt="Habitación Apagada"
        style={{
          ...commonStyle,
          zIndex: 1,
          opacity: !isPcOn && !isPhoneOn ? 1 : 0,
          transition: "opacity 0.06s linear, object-position 0.04s ease-out",
        }}
      />

      {/* 2. SOLO PC PRENDIDA */}
      <img
        src="/room_pc_off.jpg"
        alt="PC Prendida"
        style={{
          ...commonStyle,
          zIndex: 2,
          opacity: isPcOn && !isPhoneOn ? 1 : 0,
          transition: "opacity 0.06s linear, object-position 0.04s ease-out",
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
          transition: "opacity 0.06s linear, object-position 0.04s ease-out",
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
          transition: "opacity 0.06s linear, object-position 0.04s ease-out",
        }}
      />
    </div>
  );
}
