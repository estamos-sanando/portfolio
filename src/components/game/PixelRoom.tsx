"use client";

import Image from "next/image";

/**
 * PixelRoom — Renderiza el fondo de la habitación generado.
 */
export default function PixelRoom() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 1,
        backgroundColor: "#EBD0B3", // Color de fondo de respaldo
      }}
    >
      <Image
        src="/room_bg.jpg"
        alt="Room Background"
        fill
        sizes="100vw"
        quality={85}
        style={{
          objectFit: "cover",
          objectPosition: "center bottom",
          pointerEvents: "none",
          imageRendering: "auto",
        }}
        priority
      />
    </div>
  );
}
