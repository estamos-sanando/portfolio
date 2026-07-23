"use client";

import { useEffect, useRef } from "react";
import { useGameStore } from "@/hooks/useGameStore";
import { audioEngine } from "@/lib/audioEngine";

// ---- Phaser Game Scene ----
// All room drawing is done in CSS/HTML above the Phaser canvas
// Phaser handles: character movement, collision zones, interaction detection

interface RoomObject {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  interactable?: boolean;
  label?: string;
}

export default function GameContainer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const { setNearObject, openWindow, gameStarted, isMuted } = useGameStore();
  const nearObjectRef = useRef<string | null>(null);

  useEffect(() => {
    if (!gameStarted) return;

    if (animationIdRef.current !== null) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // ---- Load Character Sprites ----
    const sideImg = new window.Image();
    sideImg.src = "/side_clean.png?v=9";
    let sideLoaded = false;
    sideImg.onload = () => { sideLoaded = true; };

    const idleImg = new window.Image();
    idleImg.src = "/idle_front.png?v=9";
    let idleLoaded = false;
    idleImg.onload = () => { idleLoaded = true; };

    // ---- Player State ----
    const player = {
      x: canvas.width * 0.5,
      y: canvas.height * 0.82,
      w: 28,
      h: 44,
      vx: 0,
      vy: 0,
      speed: 3.5,
      facing: "down" as "up" | "down" | "left" | "right",
      frame: 0,
      frameTimer: 0,
      isMoving: false,
      footstepTimer: 0,
    };

    // ---- Room Objects (collision + interaction zones) ----
    const W = () => canvas.width;
    const H = () => canvas.height;

    const getRoomObjects = (): RoomObject[] => [
      // Left wall
      { id: "wall_left", x: 0, y: 0, w: W() * 0.04, h: H() },
      // Right wall
      { id: "wall_right", x: W() * 0.96, y: 0, w: W() * 0.04, h: H() },
      // Top wall (now taking 70% of screen)
      { id: "wall_top", x: 0, y: 0, w: W(), h: H() * 0.72 },
      // Floor bottom limit
      { id: "floor_bottom", x: 0, y: H() * 0.95, w: W(), h: H() * 0.05 },
    ];

    // ---- Interactable Zones ----
    const getInteractables = () => [
      {
        id: "phone", // Nightstand left of center
        x: W() * 0.28,
        y: H() * 0.70,
        w: W() * 0.12,
        h: H() * 0.30,
        label: "CELULAR",
      },
      {
        id: "computer", // Desk center
        x: W() * 0.45,
        y: H() * 0.70,
        w: W() * 0.30,
        h: H() * 0.30,
        label: "COMPUTADORA",
      },
      {
        id: "door", // Door on the right
        x: W() * 0.85,
        y: H() * 0.70,
        w: W() * 0.12,
        h: H() * 0.30,
        label: "PUERTA",
      }
    ];

    // ---- Keyboard Input ----
    const keys: Record<string, boolean> = {};
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
      if (e.key === "e" || e.key === "E") {
        handleInteraction();
      }
      if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes(e.key)) {
        e.preventDefault();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => { keys[e.key] = false; };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // ---- Interaction ----
    function handleInteraction() {
      const ints = getInteractables();
      for (const obj of ints) {
        const dist = Math.hypot(
          player.x + player.w / 2 - (obj.x + obj.w / 2),
          player.y + player.h / 2 - (obj.y + obj.h / 2)
        );
        if (dist < 180) {
          audioEngine.interact();
          if (obj.id === "phone") openWindow("phone");
          else if (obj.id === "computer") openWindow("computer");
          else if (obj.id === "door") openWindow("door");
          return;
        }
      }
    }

    // ---- Collision Detection ----
    function checkCollision(nx: number, ny: number): boolean {
      const objs = getRoomObjects();
      const margin = 4;
      for (const obj of objs) {
        if (
          nx + margin < obj.x + obj.w &&
          nx + player.w - margin > obj.x &&
          ny + margin < obj.y + obj.h &&
          ny + player.h > obj.y
        ) {
          return true;
        }
      }
      return false;
    }

    // ---- Particles ----
    const particles: Array<{x: number; y: number; life: number; maxLife: number; vx: number; vy: number; color: string}> = [];
    for (let i = 0; i < 12; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 800),
        y: Math.random() * (canvas.height || 600),
        life: Math.random() * 200,
        maxLife: 200 + Math.random() * 300,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.2 - Math.random() * 0.3,
        color: ["#F2A7BB", "#B39DDB", "#A8C5A0", "#E8D5B7"][Math.floor(Math.random() * 4)],
      });
    }

    function updateParticles() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife || p.y < 0) {
          p.x = Math.random() * (canvas?.width || 800);
          p.y = (canvas?.height || 600) * 0.85;
          p.life = 0;
          p.maxLife = 200 + Math.random() * 300;
        }
      }
    }

    // ---- Draw Pixel Character ----
    function drawCharacter() {
      const px = player.x;
      const py = player.y;
      ctx!.save();

      // Shadow
      ctx!.fillStyle = "rgba(0,0,0,0.18)";
      ctx!.beginPath();
      ctx!.ellipse(px, py + 40, 45, 10, 0, 0, Math.PI * 2);
      ctx!.fill();

      const f = player.frame % 4;
      const bobY = player.isMoving ? Math.sin(f * Math.PI / 2) * 2 : 0;
      const bx = px;
      const by = py + bobY;

      // ---- Render Character ----
      if (player.isMoving && sideLoaded) {
        // High-definition side illustration with smooth 2D walk bounce & tilt
        const walkPhase = (Date.now() / 120) % (Math.PI * 2);
        const stepBob = Math.abs(Math.sin(walkPhase)) * 8; // step bounce
        const tiltAngle = (player.facing === "left" ? -1 : 1) * Math.sin(walkPhase) * 0.035; // natural stride tilt

        // sideImg contains 2 walking frames side-by-side.
        // We crop to 1 frame at a time (alternating steps)
        const totalFrames = 2;
        const frameW = sideImg.width / totalFrames;
        const frameH = sideImg.height;
        const frameIdx = Math.floor((Date.now() / 150) % totalFrames);
        const frameX = frameIdx * frameW;

        const targetHeight = 449; 
        const dh = targetHeight;
        const dw = dh * (frameW / frameH);

        ctx!.save();
        ctx!.translate(bx, by + 40 - stepBob);
        if (player.facing === "left") {
          ctx!.scale(-1, 1);
        }
        ctx!.rotate(tiltAngle);

        ctx!.drawImage(
          sideImg,
          frameX, 0, frameW, frameH,
          -dw / 2, -dh, dw, dh
        );
        ctx!.restore();
      } else if (!player.isMoving && idleLoaded) {
        // Idle front-facing pose with subtle breathing animation
        const breatheBob = Math.sin(Date.now() / 450) * 2;
        const targetHeight = 460;
        const dh = targetHeight;
        const dw = dh * (idleImg.width / idleImg.height);

        ctx!.save();
        ctx!.drawImage(
          idleImg,
          0, 0, idleImg.width, idleImg.height,
          bx - dw / 2, by - dh + 40 + breatheBob, dw, dh
        );
        ctx!.restore();
      } else {
        // Fallback cube if loading fails
        ctx!.fillStyle = "#2D2D2D";
        ctx!.fillRect(bx, by, 30, 40);
      }

      ctx!.restore();
    }

    // ---- Draw Particles ----
    function drawParticles() {
      for (const p of particles) {
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.4;
        ctx!.fillStyle = p.color + Math.round(alpha * 255).toString(16).padStart(2, "0");
        ctx!.fillRect(Math.round(p.x), Math.round(p.y), 2, 2);
      }
    }

    // ---- Draw Hint Labels ----
    function drawHints() {
      const ints = getInteractables();
      for (const obj of ints) {
        const dist = Math.hypot(
          player.x + player.w / 2 - (obj.x + obj.w / 2),
          player.y + player.h / 2 - (obj.y + obj.h / 2)
        );
        if (dist < 180) {
          const hx = obj.x + obj.w / 2;
          const hy = obj.y - 20;

          // Bubble background
          ctx!.fillStyle = "rgba(45,45,58,0.92)";
          ctx!.fillRect(hx - 55, hy - 14, 110, 22);
          ctx!.strokeStyle = "#F2A7BB";
          ctx!.lineWidth = 2;
          ctx!.strokeRect(hx - 55, hy - 14, 110, 22);

          // Key indicator
          ctx!.fillStyle = "#F2A7BB";
          ctx!.fillRect(hx - 50, hy - 10, 16, 14);
          ctx!.fillStyle = "#2D2D3A";
          ctx!.font = `bold 9px 'Press Start 2P'`;
          ctx!.textAlign = "center";
          ctx!.fillText("E", hx - 42, hy + 2);

          // Label
          ctx!.fillStyle = "#FFF8EF";
          ctx!.font = `8px 'Press Start 2P'`;
          ctx!.fillText(obj.label, hx + 8, hy + 2);

          if (nearObjectRef.current !== obj.id) {
            nearObjectRef.current = obj.id;
            setNearObject(obj.id as any);
          }
          return;
        }
      }
      if (nearObjectRef.current !== null) {
        nearObjectRef.current = null;
        setNearObject(null);
      }
    }

    // ---- Game Loop ----
    let lastTime = 0;
    function loop(ts: number) {
      const dt = Math.min(ts - lastTime, 50);
      lastTime = ts;

      if (!ctx || !canvas) return;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ---- Update player ----
      let dx = 0, dy = 0;

      if (keys["ArrowLeft"] || keys["a"] || keys["A"]) {
        dx = -1;
        player.facing = "left";
      } else if (keys["ArrowRight"] || keys["d"] || keys["D"]) {
        dx = 1;
        player.facing = "right";
      }

      if (keys["ArrowUp"] || keys["w"] || keys["W"]) {
        dy = -1;
        if (player.facing !== "left" && player.facing !== "right") {
          player.facing = "right";
        }
      } else if (keys["ArrowDown"] || keys["s"] || keys["S"]) {
        dy = 1;
        if (player.facing !== "left" && player.facing !== "right") {
          player.facing = "right";
        }
      }

      // Normalize diagonal
      if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
      }

      player.isMoving = dx !== 0 || dy !== 0;

      const nx = player.x + dx * player.speed;
      const ny = player.y + dy * player.speed;

      if (!checkCollision(nx, player.y)) player.x = nx;
      if (!checkCollision(player.x, ny)) player.y = ny;

      // Clamp to canvas floor zone
      player.x = Math.max(player.w / 2, Math.min(canvas.width - player.w * 1.5, player.x));
      player.y = Math.max(canvas.height * 0.72, Math.min(canvas.height * 0.90, player.y));

      // Frame animation
      if (player.isMoving) {
        player.frameTimer += dt;
        if (player.frameTimer > 140) {
          player.frame = (player.frame + 1) % 4;
          player.frameTimer = 0;
        }
        // Footstep sound
        player.footstepTimer += dt;
        if (player.footstepTimer > 380) {
          if (!isMuted) audioEngine.footstep();
          player.footstepTimer = 0;
        }
      } else {
        // Idle breathing
        player.frameTimer += dt;
        if (player.frameTimer > 500) {
          player.frame = (player.frame + 1) % 2;
          player.frameTimer = 0;
        }
      }

      // Update particles
      updateParticles();

      // ---- Draw ----
      drawParticles();
      drawCharacter();
      drawHints();

      animationIdRef.current = requestAnimationFrame(loop);
    }

    animationIdRef.current = requestAnimationFrame(loop);

    // Start ambient sound
    if (!isMuted) audioEngine.startAmbient();

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", resize);
    };
  }, [gameStarted, isMuted]);

  // Mobile D-pad input exposed via window events
  useEffect(() => {
    const handleMobileInput = (e: CustomEvent) => {
      const { key, pressed } = e.detail;
      const event = new KeyboardEvent(pressed ? "keydown" : "keyup", { key });
      window.dispatchEvent(event);
    };
    window.addEventListener("mobile-input" as any, handleMobileInput);
    return () => window.removeEventListener("mobile-input" as any, handleMobileInput);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="phaser-game-container"
      aria-label="Habitación interactiva pixel art"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 5,
        imageRendering: "pixelated",
      }}
    />
  );
}
