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
  const {
    setNearObject,
    openWindow,
    gameStarted,
    isMuted,
    isPcOn,
    isPhoneOn,
    visitedPhone,
    visitedPC,
    visitedDoor,
    togglePcPower,
    togglePhonePower,
    dogUnlocked,
    activeCharacter,
    setCameraX,
  } = useGameStore();

  const nearObjectRef = useRef<string | null>(null);
  const isPcOnRef = useRef(isPcOn);
  const isPhoneOnRef = useRef(isPhoneOn);
  const dogUnlockedRef = useRef<boolean>(dogUnlocked);
  const activeCharacterRef = useRef<"antonella" | "dog">(activeCharacter);
  const visitedPhoneRef = useRef(visitedPhone);
  const visitedPCRef = useRef(visitedPC);
  const visitedDoorRef = useRef(visitedDoor);

  useEffect(() => {
    isPcOnRef.current = isPcOn;
    isPhoneOnRef.current = isPhoneOn;
    dogUnlockedRef.current = dogUnlocked;
    activeCharacterRef.current = activeCharacter;
    visitedPhoneRef.current = visitedPhone;
    visitedPCRef.current = visitedPC;
    visitedDoorRef.current = visitedDoor;
  }, [isPcOn, isPhoneOn, dogUnlocked, activeCharacter, visitedPhone, visitedPC, visitedDoor]);

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

    // ---- Load Character Sprites ----
    const sideImg = new window.Image();
    sideImg.src = "/side_clean.png?v=9";
    let sideLoaded = sideImg.complete;
    sideImg.onload = () => { sideLoaded = true; };

    const idleImg = new window.Image();
    idleImg.src = "/idle_front.png?v=9";
    let idleLoaded = idleImg.complete;
    idleImg.onload = () => { idleLoaded = true; };

    const dogImg = new window.Image();
    dogImg.src = "/dog_character.png";
    let dogLoaded = dogImg.complete;
    dogImg.onload = () => { dogLoaded = true; };

    const dogSideImg = new window.Image();
    dogSideImg.src = "/dog_side_clean.png";
    let dogSideLoaded = dogSideImg.complete;
    dogSideImg.onload = () => { dogSideLoaded = true; };

    const dogHappyImg = new window.Image();
    dogHappyImg.src = "/dog_happy.png";
    let dogHappyLoaded = dogHappyImg.complete;
    dogHappyImg.onload = () => { dogHappyLoaded = true; };

    let petTimer = 0;
    const petHearts: Array<{x: number; y: number; vy: number; alpha: number; icon: string; size: number}> = [];

    // ---- Virtual Room & Camera Setup ----
    let roomWidth = Math.max(canvas.width, canvas.height * 1.7778);
    let currentCamX = 0;

    // ---- Player & Dog State ----
    const player = {
      x: roomWidth * 0.5,
      y: canvas.height * 0.82,
      w: 28,
      h: 44,
      vx: 0,
      vy: 0,
      speed: 4.0,
      facing: "down" as "up" | "down" | "left" | "right",
      frame: 0,
      frameTimer: 0,
      isMoving: false,
      footstepTimer: 0,
    };

    const dog = {
      x: roomWidth * 0.22, // Static position right in front of the bed
      y: canvas.height * 0.85,
      w: 32,
      h: 32,
      facing: "left" as "left" | "right",
    };

    // ---- Room Objects & Interactables Cache ----
    let roomObjects: RoomObject[] = [];
    let interactables: RoomObject[] = [];

    const updateObjects = () => {
      roomWidth = Math.max(canvas.width, canvas.height * 1.7778);
      const w = roomWidth;
      const h = canvas.height;
      dog.x = w * 0.22;
      dog.y = h * 0.85;

      roomObjects = [
        { id: "wall_left", x: 0, y: 0, w: w * 0.04, h: h },
        { id: "wall_right", x: w * 0.96, y: 0, w: w * 0.04, h: h },
        { id: "wall_top", x: 0, y: 0, w: w, h: h * 0.72 },
        { id: "floor_bottom", x: 0, y: h * 0.95, w: w, h: h * 0.05 },
      ];
      interactables = [
        { id: "phone", x: 0, y: h * 0.35, w: w * 0.16, h: h * 0.50, label: "CELULAR" },
        { id: "computer", x: w * 0.22, y: h * 0.08, w: w * 0.35, h: h * 0.65, label: "COMPUTADORA" },
        { id: "door", x: w * 0.73, y: h * 0.05, w: w * 0.15, h: h * 0.75, label: "PUERTA" },
      ];

      if (dogUnlockedRef.current) {
        interactables.push({
          id: "pet_dog",
          x: dog.x - 40,
          y: dog.y - 120,
          w: 80,
          h: 140,
          label: "ACARICIAR",
        });
      }
    };

    // Resize canvas & update objects
    let initialPositionSet = false;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      updateObjects();
      if (!initialPositionSet) {
        player.x = roomWidth * 0.65;
        player.y = canvas.height * 0.85;
        initialPositionSet = true;
      }
    };
    resize();
    window.addEventListener("resize", resize);

    // ---- Keyboard Input ----
    const keys: Record<string, boolean> = {};
    const clearKeys = () => {
      for (const k in keys) {
        keys[k] = false;
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
        return;
      }

      keys[e.key] = true;
      if (e.key) keys[e.key.toLowerCase()] = true;
      if (e.code) keys[e.code] = true;

      if (e.key === "e" || e.key === "E" || e.code === "KeyE") {
        handleInteraction();
      }
      if (
        e.key === "f" ||
        e.key === "F" ||
        e.code === "KeyF" ||
        e.key === "p" ||
        e.key === "P" ||
        e.code === "KeyP"
      ) {
        handlePowerToggle();
      }
      if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D"].includes(e.key) ||
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "KeyW", "KeyA", "KeyS", "KeyD"].includes(e.code)
      ) {
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
      if (e.key) keys[e.key.toLowerCase()] = false;
      if (e.code) keys[e.code] = false;
    };

    const handleBlur = () => {
      clearKeys();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    // ---- Active Object Resolver based on Specific Interaction Spots ----
    function getActiveObjectAtPlayerPos(): RoomObject | null {
      const relX = player.x / roomWidth;
      // 1. Phone / Nightstand spot
      if (relX >= 0.16 && relX <= 0.30) {
        return interactables.find((o) => o.id === "phone") || null;
      }
      // 2. PC / Desk Chair spot
      if (relX >= 0.42 && relX <= 0.58) {
        return interactables.find((o) => o.id === "computer") || null;
      }
      // 3. Door / Rug spot
      if (relX >= 0.76 && relX <= 0.90) {
        return interactables.find((o) => o.id === "door") || null;
      }
      return null;
    }

    // ---- Power Toggle Handler ----
    function handlePowerToggle() {
      const obj = getActiveObjectAtPlayerPos();
      if (!obj) return;
      if (obj.id === "computer") {
        const turningOn = !isPcOnRef.current;
        togglePcPower();
        if (turningOn) {
          audioEngine.bootPC();
        } else {
          audioEngine.powerOff();
        }
      } else if (obj.id === "phone") {
        const turningOn = !isPhoneOnRef.current;
        togglePhonePower();
        if (turningOn) {
          audioEngine.powerOnPhone();
        } else {
          audioEngine.powerOff();
        }
      }
    }

    // ---- Interaction Handler ----
    function handleInteraction() {
      // Direct distance check to dog when unlocked
      if (dogUnlockedRef.current) {
        const distToDog = Math.hypot(player.x - dog.x, player.y - dog.y);
        if (distToDog < 240) {
          audioEngine.click();
          petTimer = 180;
          for (let k = 0; k < 6; k++) {
            petHearts.push({
              x: dog.x + (Math.random() - 0.5) * 50,
              y: dog.y - 140 + (Math.random() - 0.5) * 25,
              vy: -1.2 - Math.random() * 1.2,
              alpha: 1.0,
              icon: ["💖", "✨", "🌸", "💕"][Math.floor(Math.random() * 4)],
              size: 18 + Math.floor(Math.random() * 8),
            });
          }
          return;
        }
      }

      const obj = getActiveObjectAtPlayerPos();
      if (!obj) return;

      if (obj.id === "phone") {
        if (isPhoneOnRef.current) {
          audioEngine.interact();
          openWindow("phone");
        } else {
          audioEngine.click();
        }
      } else if (obj.id === "computer") {
        if (isPcOnRef.current) {
          audioEngine.interact();
          openWindow("computer");
        } else {
          audioEngine.click();
        }
      } else if (obj.id === "door") {
        audioEngine.interact();
        openWindow("door");
      }
    }

    // ---- Canvas Direct Click Handler ----
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const worldClickX = clickX + currentCamX;
      const relX = worldClickX / roomWidth;

      if (relX < 0.22) {
        if (isPhoneOnRef.current) {
          audioEngine.interact();
          openWindow("phone");
        } else {
          audioEngine.click();
        }
      } else if (relX >= 0.22 && relX < 0.70 && clickY < canvas.height * 0.80) {
        if (isPcOnRef.current) {
          audioEngine.interact();
          openWindow("computer");
        } else {
          audioEngine.click();
        }
      } else if (relX >= 0.70 && clickY < canvas.height * 0.80) {
        audioEngine.interact();
        openWindow("door");
      } else if (dogUnlockedRef.current) {
        const distToDog = Math.hypot(worldClickX - dog.x, clickY - dog.y);
        if (distToDog < 120) {
          audioEngine.click();
          petTimer = 180;
          for (let k = 0; k < 6; k++) {
            petHearts.push({
              x: dog.x + (Math.random() - 0.5) * 50,
              y: dog.y - 120 + (Math.random() - 0.5) * 25,
              vy: -1.2 - Math.random() * 1.2,
              alpha: 1.0,
              icon: ["💖", "✨", "🌸", "💕"][Math.floor(Math.random() * 4)],
              size: 16 + Math.floor(Math.random() * 8),
            });
          }
        }
      }
    };
    canvas.addEventListener("click", handleCanvasClick);

    // ---- Collision Detection ----
    function checkCollision(nx: number, ny: number): boolean {
      const margin = 4;
      for (let i = 0; i < roomObjects.length; i++) {
        const obj = roomObjects[i];
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
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
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

    // ---- Draw Pixel Character & Dog ----
    function drawCharacter() {
      const now = performance.now();

      // Responsive heights scaled to viewport height
      const targetHeight = Math.min(520, canvas!.height * 0.50);
      const dogTargetHeight = Math.min(270, canvas!.height * 0.26);

      // 1. Draw Antonella
      const px = player.x - currentCamX;
      const py = player.y;
      ctx!.save();

      // Realistic ground shadow
      ctx!.fillStyle = "rgba(0, 0, 0, 0.28)";
      ctx!.beginPath();
      ctx!.ellipse(px, py + 22, 38, 9, 0, 0, Math.PI * 2);
      ctx!.fill();

      const f = player.frame % 4;
      const bobY = player.isMoving ? Math.sin((f * Math.PI) / 2) * 2 : 0;
      const bx = px;
      const by = py + bobY;

      if (player.isMoving && sideLoaded) {
        const walkPhase = (now / 120) % (Math.PI * 2);
        const stepBob = Math.abs(Math.sin(walkPhase)) * 8;
        const tiltAngle =
          (player.facing === "left" ? -1 : 1) * Math.sin(walkPhase) * 0.035;

        const totalFrames = 2;
        const frameW = sideImg.width / totalFrames;
        const frameH = sideImg.height;
        const frameIdx = Math.floor((now / 150) % totalFrames);
        const frameX = frameIdx * frameW;

        const dh = targetHeight;
        const dw = dh * (frameW / frameH);

        ctx!.save();
        ctx!.translate(bx, by + 44 - stepBob);
        if (player.facing === "left") {
          ctx!.scale(-1, 1);
        }
        ctx!.rotate(tiltAngle);

        ctx!.drawImage(
          sideImg,
          frameX,
          0,
          frameW,
          frameH,
          -dw / 2,
          -dh,
          dw,
          dh
        );
        ctx!.restore();
      } else if (!player.isMoving && idleLoaded) {
        const breatheBob = 0;
        const dh = targetHeight;
        const dw = dh * (idleImg.width / idleImg.height);

        ctx!.save();
        ctx!.drawImage(
          idleImg,
          0,
          0,
          idleImg.width,
          idleImg.height,
          bx - dw / 2,
          by - dh + 44 + breatheBob,
          dw,
          dh
        );
        ctx!.restore();
      } else {
        ctx!.fillStyle = "#2D2D2D";
        ctx!.fillRect(bx, by, 30, 40);
      }
      ctx!.restore();

      // 2. Draw Dog Character (when unlocked)
      if (dogUnlockedRef.current && dogLoaded) {
        const dx = dog.x - currentCamX;
        const dy = dog.y;
        ctx!.save();

        // Shadow under dog
        ctx!.fillStyle = "rgba(0, 0, 0, 0.25)";
        ctx!.beginPath();
        ctx!.ellipse(dx, dy + 22, 36, 8, 0, 0, Math.PI * 2);
        ctx!.fill();

        if (petTimer > 0 && dogHappyLoaded) {
          petTimer--;
          const dh = dogTargetHeight;
          const dw = dh * (dogHappyImg.width / dogHappyImg.height);
          const happyBob = Math.sin(now / 150) * 3;

          ctx!.translate(dx, dy + happyBob);
          if (dog.facing === "right") {
            ctx!.scale(-1, 1);
          }

          ctx!.drawImage(dogHappyImg, -dw / 2, -dh + 32, dw, dh);
        } else {
          // Attentive sitting pose - completely solid on floor
          const dh = dogTargetHeight;
          const dw = dh * (dogImg.width / dogImg.height);

          ctx!.translate(dx, dy);
          if (dog.facing === "right") {
            ctx!.scale(-1, 1);
          }

          ctx!.drawImage(dogImg, -dw / 2, -dh + 32, dw, dh);
        }
        ctx!.restore();
      }
    }

    // ---- Draw Particles ----
    function drawParticles() {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * 0.4;
        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = p.color;
        ctx!.fillRect(Math.round(p.x - currentCamX), Math.round(p.y), 2, 2);
      }
      ctx!.globalAlpha = 1.0;

      // Draw floating heart & sparkle particles when petted
      for (let i = petHearts.length - 1; i >= 0; i--) {
        const h = petHearts[i];
        h.y += h.vy;
        h.alpha -= 0.015;
        if (h.alpha <= 0) {
          petHearts.splice(i, 1);
          continue;
        }
        ctx!.save();
        ctx!.globalAlpha = Math.max(0, h.alpha);
        ctx!.font = `${h.size}px sans-serif`;
        ctx!.fillText(h.icon, h.x - currentCamX, h.y);
        ctx!.restore();
      }
    }

    // ---- Draw Hint Labels ----
    function drawHints() {
      // Direct proximity check to dog when unlocked
      if (dogUnlockedRef.current) {
        const distToDog = Math.hypot(player.x - dog.x, player.y - dog.y);
        if (distToDog < 240) {
          const hx = dog.x - currentCamX;
          const hy = dog.y - 250;
          const bubbleW = 110;
          const bubbleH = 26;

          ctx!.fillStyle = "rgba(25,25,35,0.92)";
          ctx!.fillRect(hx - bubbleW / 2, hy - bubbleH / 2, bubbleW, bubbleH);
          ctx!.strokeStyle = "#F2A7BB";
          ctx!.lineWidth = 2;
          ctx!.strokeRect(hx - bubbleW / 2, hy - bubbleH / 2, bubbleW, bubbleH);

          ctx!.fillStyle = "#F2A7BB";
          ctx!.fillRect(hx - bubbleW / 2 + 6, hy - 9, 18, 16);
          ctx!.fillStyle = "#2D2D3A";
          ctx!.font = `bold 9px 'Press Start 2P'`;
          ctx!.textAlign = "center";
          ctx!.fillText("E", hx - bubbleW / 2 + 15, hy + 3);

          ctx!.fillStyle = "#FFF8EF";
          ctx!.font = `7px 'Press Start 2P'`;
          ctx!.textAlign = "left";
          ctx!.fillText("ACARICIAR", hx - bubbleW / 2 + 28, hy + 3);

          if (nearObjectRef.current !== "pet_dog") {
            nearObjectRef.current = "pet_dog";
            setNearObject("radio" as any);
          }
          return;
        }
      }

      const activeObj = getActiveObjectAtPlayerPos();
      if (activeObj) {
        const isPc = activeObj.id === "computer";
        const isPhone = activeObj.id === "phone";
        const isOn = isPc ? isPcOnRef.current : isPhone ? isPhoneOnRef.current : true;

        // Position hint box right near Antonella's right hand
        const screenPlayerX = player.x - currentCamX;
        const handOffsetX = screenPlayerX > canvas!.width - 220 ? -90 : 90;
        const hx = screenPlayerX + handOffsetX;
        const hy = player.y - 140;

        const bubbleW = isPc || isPhone ? 150 : 110;
        const bubbleH = 26;

        ctx!.fillStyle = "rgba(25,25,35,0.92)";
        ctx!.fillRect(hx - bubbleW / 2, hy - bubbleH / 2, bubbleW, bubbleH);
        ctx!.strokeStyle = isOn ? "#F2A7BB" : "#B39DDB";
        ctx!.lineWidth = 2;
        ctx!.strokeRect(hx - bubbleW / 2, hy - bubbleH / 2, bubbleW, bubbleH);

        if (isPc || isPhone) {
          ctx!.fillStyle = isOn ? "#E74C3C" : "#2ECC71";
          ctx!.fillRect(hx - bubbleW / 2 + 6, hy - 9, 18, 16);
          ctx!.fillStyle = "#FFFFFF";
          ctx!.font = `bold 9px 'Press Start 2P'`;
          ctx!.textAlign = "center";
          ctx!.fillText("F", hx - bubbleW / 2 + 15, hy + 3);

          ctx!.fillStyle = isOn ? "#FFD1D1" : "#D4EFDF";
          ctx!.font = `7px 'Press Start 2P'`;
          ctx!.textAlign = "left";
          ctx!.fillText(isOn ? "APAGAR" : "PRENDER", hx - bubbleW / 2 + 28, hy + 3);

          if (isOn) {
            ctx!.fillStyle = "#F2A7BB";
            ctx!.fillRect(hx + 10, hy - 9, 18, 16);
            ctx!.fillStyle = "#2D2D3A";
            ctx!.font = `bold 9px 'Press Start 2P'`;
            ctx!.textAlign = "center";
            ctx!.fillText("E", hx + 19, hy + 3);

            ctx!.fillStyle = "#F0E8FF";
            ctx!.font = `7px 'Press Start 2P'`;
            ctx!.textAlign = "left";
            ctx!.fillText("USAR", hx + 32, hy + 3);
          }
        } else {
          ctx!.fillStyle = "#B39DDB";
          ctx!.fillRect(hx - bubbleW / 2 + 6, hy - 9, 18, 16);
          ctx!.fillStyle = "#2D2D3A";
          ctx!.font = `bold 9px 'Press Start 2P'`;
          ctx!.textAlign = "center";
          ctx!.fillText("E", hx - bubbleW / 2 + 15, hy + 3);

          ctx!.fillStyle = "#F0E8FF";
          ctx!.font = `7px 'Press Start 2P'`;
          ctx!.textAlign = "left";
          ctx!.fillText("CONTACTAR", hx - bubbleW / 2 + 28, hy + 3);
        }

        if (nearObjectRef.current !== activeObj.id) {
          nearObjectRef.current = activeObj.id;
          setNearObject(activeObj.id as any);
        }
        return;
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

      // Update pet_dog interactable position dynamically
      const petObj = interactables.find((o) => o.id === "pet_dog");
      if (petObj) {
        petObj.x = dog.x - 40;
        petObj.y = dog.y - 120;
      }

      // 2. Player Input Movement (Antonella)
      let dx = 0,
        dy = 0;

      const isLeft = !!(
        keys["ArrowLeft"] ||
        keys["a"] ||
        keys["A"] ||
        keys["KeyA"]
      );
      const isRight = !!(
        keys["ArrowRight"] ||
        keys["d"] ||
        keys["D"] ||
        keys["KeyD"]
      );
      const isUp = !!(keys["ArrowUp"] || keys["w"] || keys["W"] || keys["KeyW"]);
      const isDown = !!(
        keys["ArrowDown"] ||
        keys["s"] ||
        keys["S"] ||
        keys["KeyS"]
      );

      if (isLeft && !isRight) {
        dx = -1;
      } else if (isRight && !isLeft) {
        dx = 1;
      }

      if (isUp && !isDown) {
        dy = -1;
      } else if (isDown && !isUp) {
        dy = 1;
      }

      if (dx !== 0 && dy !== 0) {
        dx *= 0.707;
        dy *= 0.707;
      }

      // Control Antonella
      if (dx < 0) player.facing = "left";
      if (dx > 0) player.facing = "right";

      player.isMoving = dx !== 0 || dy !== 0;

      const nx = player.x + dx * player.speed;
      const ny = player.y + dy * player.speed;

      if (!checkCollision(nx, player.y)) player.x = nx;
      if (!checkCollision(player.x, ny)) player.y = ny;

      player.x = Math.max(
        player.w / 2 + roomWidth * 0.03,
        Math.min(roomWidth - player.w * 1.5 - roomWidth * 0.03, player.x)
      );
      player.y = Math.max(
        canvas.height * 0.72,
        Math.min(canvas.height * 0.9, player.y)
      );

      // Camera tracking update
      const maxCamX = Math.max(0, roomWidth - canvas.width);
      const targetCamX = Math.max(0, Math.min(maxCamX, player.x - canvas.width * 0.5));
      currentCamX += (targetCamX - currentCamX) * 0.14;
      setCameraX(Math.round(currentCamX));

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
      canvas.removeEventListener("click", handleCanvasClick);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("resize", resize);
    };
  }, [gameStarted]);

  useEffect(() => {
    audioEngine.setMuted(isMuted);
  }, [isMuted]);

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
