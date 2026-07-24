"use client";

import Image from "next/image";
import { useGameStore } from "@/hooks/useGameStore";

/**
 * PixelRoom — Renderiza el fondo de la habitación adaptado al estado de PC y Celular.
 */
export default function PixelRoom() {
  const { isPcOn, isPhoneOn } = useGameStore();

  const bgs = [
    { src: "/room_off_off.jpg", active: !isPcOn && !isPhoneOn },
    { src: "/room_off_phone.jpg", active: !isPcOn && isPhoneOn },
    { src: "/room_pc_off.jpg", active: isPcOn && !isPhoneOn },
    { src: "/room_pc_phone.jpg", active: isPcOn && isPhoneOn },
  ];

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
      {bgs.map((bg) => (
        <div
          key={bg.src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: bg.active ? 1 : 0,
            transition: "opacity 0.35s ease-in-out",
            pointerEvents: "none",
          }}
        >
          <Image
            src={bg.src}
            alt="Room Background"
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
      ))}
    </div>
  );
}
