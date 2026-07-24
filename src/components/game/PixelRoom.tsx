"use client";

import Image from "next/image";
import { useGameStore } from "@/hooks/useGameStore";

/**
 * PixelRoom — Renderiza la habitación con superposición perfecta sin parpadeo.
 */
export default function PixelRoom() {
  const { isPcOn, isPhoneOn } = useGameStore();

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
      {/* 1. BASE CAPA ESTÁTICA: Habitación apagada (Siempre visible 100% sin desvanecer) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/room_off_off.jpg"
          alt="Room Base Off"
          fill
          sizes="100vw"
          quality={90}
          style={{
            objectFit: "cover",
            objectPosition: "center bottom",
            imageRendering: "auto",
          }}
          priority
        />
      </div>

      {/* 2. CAPA SOLO PC PRENDIDA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          opacity: isPcOn && !isPhoneOn ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          pointerEvents: "none",
          willChange: "opacity",
        }}
      >
        <Image
          src="/room_pc_off.jpg"
          alt="Room PC ON"
          fill
          sizes="100vw"
          quality={90}
          style={{
            objectFit: "cover",
            objectPosition: "center bottom",
            imageRendering: "auto",
          }}
          priority
        />
      </div>

      {/* 3. CAPA SOLO CELULAR PRENDIDO */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          opacity: !isPcOn && isPhoneOn ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          pointerEvents: "none",
          willChange: "opacity",
        }}
      >
        <Image
          src="/room_off_phone.jpg"
          alt="Room Phone ON"
          fill
          sizes="100vw"
          quality={90}
          style={{
            objectFit: "cover",
            objectPosition: "center bottom",
            imageRendering: "auto",
          }}
          priority
        />
      </div>

      {/* 4. CAPA AMBOS PRENDIDOS */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          opacity: isPcOn && isPhoneOn ? 1 : 0,
          transition: "opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          pointerEvents: "none",
          willChange: "opacity",
        }}
      >
        <Image
          src="/room_pc_phone.jpg"
          alt="Room Both ON"
          fill
          sizes="100vw"
          quality={90}
          style={{
            objectFit: "cover",
            objectPosition: "center bottom",
            imageRendering: "auto",
          }}
          priority
        />
      </div>
    </div>
  );
}
