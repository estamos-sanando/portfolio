"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import PixelWindow from "./PixelWindow";

// ---- Project Definitions ----
const PROJECTS = [
  {
    id: "despues",
    name: "Después",
    icon: "🌸",
    color: "#B39DDB",
    description:
      "App de acompañamiento para situaciones de violencia sexoafectiva. Ayuda a usuarias a procesar emocionalmente sus experiencias, tomar decisiones y transformar su historia.",
    problem:
      "Muchas personas no tienen acceso a herramientas digitales que aborden el procesamiento emocional post-encuentros sexoafectivos de forma empática y no invasiva.",
    process:
      "Investigación de usuarios → Prototipado en papel → Testing con usuarios reales → Iteración en Figma → Prototipo funcional en FigJam.",
    role: "Diseño UX/UI — Investigación — Prototipado",
    tools: ["Figma", "FigJam", "Miro", "Notion"],
    prototype: "#",
  },
  {
    id: "chequeate",
    name: "Chequéate",
    icon: "💙",
    color: "#F2A7BB",
    description:
      "Plataforma inteligente de prevención médica cotidiana. Centraliza hábitos, estudios, recordatorios y alertas clínicas mediante un QR de acceso e historial resumido.",
    problem:
      "Las personas no tienen un sistema unificado para gestionar su historial médico y hábitos preventivos de forma simple y accesible.",
    process:
      "Análisis de competencia → Definición de flujos → Diseño de sistema de scores → Prototipado → Testing.",
    role: "Diseño UX/UI — Investigación — Arquitectura de información",
    tools: ["Figma", "FigJam", "Illustrator"],
    prototype: "#",
  },
  {
    id: "tercera",
    name: "Tercera App",
    icon: "❓",
    color: "#A8C5A0",
    description: "Próximamente...",
    problem: "—",
    process: "—",
    role: "—",
    tools: [],
    prototype: "#",
  },
];

// ---- Estamos Sanando ----
const SANANDO_ITEMS = [
  { id: "web", icon: "🌐", label: "Sitio web", desc: "Sitio web del proyecto con identidad visual completa." },
  { id: "podcast", icon: "🎙️", label: "Podcast", desc: "Podcast de acompañamiento e información." },
  { id: "ig", icon: "📸", label: "Instagram", desc: "Comunidad y contenido en redes sociales." },
];

// ---- Content Creation Thumbnails ----
const CONTENT_ITEMS = [
  { id: "c1", label: "Video 1", color: "#B39DDB", icon: "▶" },
  { id: "c2", label: "Video 2", color: "#F2A7BB", icon: "▶" },
  { id: "c3", label: "Video 3", color: "#A8C5A0", icon: "▶" },
  { id: "c4", label: "Video 4", color: "#E8D5B7", icon: "▶" },
  { id: "c5", label: "Video 5", color: "#B39DDB", icon: "▶" },
  { id: "c6", label: "Video 6", color: "#F2A7BB", icon: "▶" },
];

// ---- Project Card ----
function ProjectCard({
  project,
  onClose,
}: {
  project: (typeof PROJECTS)[0];
  onClose: () => void;
}) {
  return (
    <PixelWindow
      id={`project-${project.id}`}
      title={`${project.icon} ${project.name}`}
      onClose={onClose}
      defaultX={60}
      defaultY={20}
      width={480}
      contained={true}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Hero */}
        <div
          style={{
            height: 120,
            background: `linear-gradient(135deg, ${project.color}40, ${project.color}80)`,
            border: `2px solid ${project.color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "48px",
          }}
        >
          {project.icon}
        </div>

        {/* Description */}
        <Section title="Descripción">
          <p style={{ lineHeight: 1.6 }}>{project.description}</p>
        </Section>

        <Section title="Problema">
          <p style={{ lineHeight: 1.6 }}>{project.problem}</p>
        </Section>

        <Section title="Proceso">
          <p style={{ lineHeight: 1.6 }}>{project.process}</p>
        </Section>

        <Section title="Mi Rol">
          <p style={{ lineHeight: 1.6 }}>{project.role}</p>
        </Section>

        {project.tools.length > 0 && (
          <Section title="Herramientas">
            <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 4 }}>
              {project.tools.map((tool) => (
                <span key={tool} className="skill-tag" style={{ background: project.color }}>
                  {tool}
                </span>
              ))}
            </div>
          </Section>
        )}

        {project.prototype !== "#" && (
          <a
            href={project.prototype}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              padding: "10px",
              background: project.color,
              border: `2px solid rgba(0,0,0,0.2)`,
              textAlign: "center",
              fontFamily: "var(--font-pixel)",
              fontSize: "7px",
              color: "var(--px-dark)",
              textDecoration: "none",
              boxShadow: "3px 3px 0 rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
          >
            Ver prototipo →
          </a>
        )}
      </div>
    </PixelWindow>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "7px",
          color: "var(--px-rose-dark)",
          marginBottom: 6,
          borderBottom: "1px solid var(--px-beige)",
          paddingBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: "var(--font-body)", fontSize: "17px", color: "var(--px-dark)" }}>
        {children}
      </div>
    </div>
  );
}

// ---- Aplicaciones Folder ----
function AplicacionesWindow({ onClose }: { onClose: () => void }) {
  const { play } = useAudio();
  const [openProject, setOpenProject] = useState<string | null>(null);

  const project = PROJECTS.find((p) => p.id === openProject);

  return (
    <>
      <PixelWindow
        id="aplicaciones"
        title="📁 Aplicaciones"
        onClose={onClose}
        defaultX={40}
        defaultY={20}
        width={380}
        style="win95"
        icon="📁"
        contained={true}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            padding: "8px",
            background: "#D4D0C8",
            minHeight: 160,
          }}
        >
          {PROJECTS.map((proj) => (
            <button
              key={proj.id}
              onDoubleClick={() => {
                play("openFolder");
                setOpenProject(proj.id);
              }}
              onClick={() => play("click")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: "8px",
                fontFamily: "VT323, monospace",
                fontSize: "14px",
                color: "#000",
              }}
              title="Doble clic para abrir"
            >
              <div style={{ fontSize: "32px" }}>{proj.icon}</div>
              <span>{proj.name}</span>
            </button>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid #999",
            padding: "4px 8px",
            fontFamily: "VT323, monospace",
            fontSize: "14px",
            color: "#000",
            background: "#C0C0C0",
          }}
        >
          3 elementos — Doble clic para abrir
        </div>
      </PixelWindow>

      <AnimatePresence>
        {openProject && project && (
          <ProjectCard
            project={project}
            onClose={() => setOpenProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ---- Estamos Sanando Folder ----
function EstamosSanandoWindow({ onClose }: { onClose: () => void }) {
  const { play } = useAudio();
  const [openItem, setOpenItem] = useState<string | null>(null);
  const item = SANANDO_ITEMS.find((i) => i.id === openItem);

  return (
    <>
      <PixelWindow
        id="estamos_sanando"
        title="📁 Estamos Sanando"
        onClose={onClose}
        defaultX={60}
        defaultY={20}
        width={420}
        style="win95"
        icon="🌿"
        contained={true}
      >
        <div
          style={{
            padding: 8,
            background: "#D4D0C8",
            fontFamily: "VT323, monospace",
            fontSize: "15px",
            color: "#2D2D3A",
            lineHeight: 1.5,
            marginBottom: 8,
            borderBottom: "1px solid #999",
          }}
        >
          Proyecto personal que acompaña, informa y crea comunidad a través de la
          palabra, el arte y la escucha.
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            padding: "8px",
            background: "#D4D0C8",
          }}
        >
          {SANANDO_ITEMS.map((s) => (
            <button
              key={s.id}
              onDoubleClick={() => {
                play("openFolder");
                setOpenItem(s.id);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: 8,
                fontFamily: "VT323, monospace",
                fontSize: "14px",
                color: "#000",
              }}
            >
              <div style={{ fontSize: "32px" }}>{s.icon}</div>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid #999",
            padding: "4px 8px",
            fontFamily: "VT323, monospace",
            fontSize: "14px",
            background: "#C0C0C0",
          }}
        >
          Doble clic para abrir
        </div>
      </PixelWindow>

      <AnimatePresence>
        {openItem && item && (
          <PixelWindow
            id={`sanando-${item.id}`}
            title={`${item.icon} ${item.label}`}
            onClose={() => setOpenItem(null)}
            defaultX={100}
            defaultY={40}
            width={320}
            contained={true}
          >
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 48, textAlign: "center", marginBottom: 12 }}>
                {item.icon}
              </div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "18px",
                  color: "var(--px-dark)",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                {item.desc}
              </p>
              <p
                style={{
                  marginTop: 16,
                  fontFamily: "var(--font-pixel)",
                  fontSize: "7px",
                  color: "var(--px-rose-dark)",
                  textAlign: "center",
                }}
              >
                Contenido próximamente →
              </p>
            </div>
          </PixelWindow>
        )}
      </AnimatePresence>
    </>
  );
}

// ---- Spot Publicitario ----
function SpotPublicitarioWindow({ onClose }: { onClose: () => void }) {
  return (
    <PixelWindow
      id="spot"
      title="🎬 Spot Publicitario — DonaxVida"
      onClose={onClose}
      defaultX={40}
      defaultY={20}
      width={480}
      style="win95"
      icon="🎬"
      contained={true}
    >
      <div style={{ padding: 8, background: "#D4D0C8" }}>
        {/* Video Player */}
        <video
          controls
          preload="auto"
          playsInline
          style={{
            width: "100%",
            maxHeight: 260,
            background: "#000",
            borderRadius: 4,
            border: "2px inset #999",
            marginBottom: 12,
          }}
        >
          <source src="/trabajos/spot_publicitario/SPOTDONAXVIDA.mp4" type="video/mp4" />
          Tu navegador no soporta la reproducción de video HTML5.
        </video>

        <Section title="Descripción">
          <p style={{ lineHeight: 1.6, fontFamily: "VT323, monospace", fontSize: 16 }}>
            Spot publicitario de concientización para la campaña "DonaxVida". Edición y postproducción audiovisual realizada con CapCut.
          </p>
        </Section>

        <br />
        <Section title="Mi Rol">
          <p style={{ fontFamily: "VT323, monospace", fontSize: 16 }}>
            Dirección creativa, guión, producción y edición audiovisual.
          </p>
        </Section>

        <br />
        <Section title="Herramientas">
          <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 4 }}>
            {["CapCut"].map((tool) => (
              <span key={tool} className="skill-tag">
                {tool}
              </span>
            ))}
          </div>
        </Section>
      </div>
    </PixelWindow>
  );
}

// ---- Creación de Contenido ----
function CreacionContenidoWindow({ onClose }: { onClose: () => void }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const { play } = useAudio();

  return (
    <>
      <PixelWindow
        id="contenido"
        title="📹 Creación de Contenido"
        onClose={onClose}
        defaultX={60}
        defaultY={20}
        width={440}
        style="win95"
        icon="📹"
        contained={true}
      >
        <div style={{ padding: 8, background: "#D4D0C8" }}>
          <p
            style={{
              fontFamily: "VT323, monospace",
              fontSize: 16,
              marginBottom: 12,
              color: "#2D2D3A",
            }}
          >
            Videos y piezas de contenido para redes sociales.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
            }}
          >
            {CONTENT_ITEMS.map((item) => (
              <button
                key={item.id}
                className="gallery-thumb"
                onClick={() => {
                  play("click");
                  setPlaying(item.id);
                }}
                style={{
                  background: item.color + "60",
                  border: "2px inset #999",
                  cursor: "pointer",
                  padding: 0,
                  height: 70,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <span style={{ fontSize: 24 }}>{item.icon}</span>
                <span
                  style={{
                    fontFamily: "VT323, monospace",
                    fontSize: 13,
                    color: "#000",
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </PixelWindow>

      <AnimatePresence>
        {playing && (
          <PixelWindow
            id="video-player"
            title="▶ Reproductor"
            onClose={() => setPlaying(null)}
            defaultX={340}
            defaultY={100}
            width={340}
          >
            <div
              style={{
                width: "100%",
                height: 180,
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div style={{ fontSize: 48, color: "white" }}>▶</div>
              <div
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "8px",
                  color: "var(--px-rose)",
                }}
              >
                Adjuntá tus videos
                <br />
                en /public/videos/
              </div>
            </div>
          </PixelWindow>
        )}
      </AnimatePresence>
    </>
  );
}



// ---- Main Desktop OS ----
export default function DesktopOS({ onClose }: { onClose: () => void }) {
  const { play } = useAudio();
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [time, setTime] = useState("");
  const desktopRef = useRef<HTMLDivElement>(null);

  // Clock & Keyboard ESC listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openFolder) {
          setOpenFolder(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openFolder, onClose]);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  const FOLDERS = [
    { id: "aplicaciones", label: "Aplicaciones", icon: "📁", x: 20, y: 20 },
    { id: "estamos_sanando", label: "Estamos Sanando", icon: "📁", x: 120, y: 20 },
    { id: "spot", label: "Spot Publicitario", icon: "📁", x: 220, y: 20 },
    { id: "contenido", label: "Creación de Contenido", icon: "📁", x: 20, y: 120 },
  ];

  const openFolderHandler = (id: string) => {
    play("openFolder");
    setOpenFolder(id);
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 40,
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          style={{
            width: "90vw",
            maxWidth: 820,
            height: "82vh",
            maxHeight: 560,
            pointerEvents: "auto",
            position: "relative",
            zIndex: 40,
            display: "flex",
            flexDirection: "column",
            boxShadow: "8px 8px 0 rgba(0,0,0,0.6)",
          }}
        >
          {/* Title bar */}
          <div
            style={{
              background: "linear-gradient(90deg, #000080, #1084D0)",
              color: "white",
              padding: "4px 8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "VT323, monospace",
              fontSize: 16,
              cursor: "default",
              userSelect: "none",
            }}
          >
            <span>💻 Mi Computadora — Portfolio</span>
            <button
              onClick={onClose}
              style={{
                width: 16,
                height: 14,
                background: "#C0C0C0",
                border: "1px solid #fff",
                borderRightColor: "#5F5F5F",
                borderBottomColor: "#5F5F5F",
                cursor: "pointer",
                fontSize: 10,
                fontFamily: "VT323, monospace",
                color: "#000",
              }}
            >
              ✕
            </button>
          </div>

          {/* Desktop area */}
          <div
            ref={desktopRef}
            className="win95-desktop"
            style={{
              flex: 1,
              background: "linear-gradient(135deg, #3D8B99 0%, #2D6B77 100%)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Draggable Folders */}
            {FOLDERS.map((folder) => (
              <motion.div
                key={folder.id}
                drag
                dragConstraints={desktopRef}
                dragElastic={0}
                dragMomentum={false}
                initial={{ x: folder.x, y: folder.y }}
                onDoubleClick={() => openFolderHandler(folder.id)}
                onClick={() => play("click")}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  cursor: "grab",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: "6px",
                  color: "white",
                  fontFamily: "VT323, monospace",
                  fontSize: 14,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                  width: 86,
                  userSelect: "none",
                }}
                whileDrag={{ scale: 1.08, zIndex: 20, cursor: "grabbing" }}
                title="Arrastrá para mover · Doble clic para abrir"
              >
                <div style={{ fontSize: 36, pointerEvents: "none" }}>{folder.icon}</div>
                <span style={{ textAlign: "center", lineHeight: 1.3, pointerEvents: "none" }}>
                  {folder.label}
                </span>
              </motion.div>
            ))}

            {/* Draggable Recycle Bin */}
            <motion.div
              drag
              dragConstraints={desktopRef}
              dragElastic={0}
              dragMomentum={false}
              initial={{ x: 680, y: 380 }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                cursor: "grab",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                color: "white",
                fontFamily: "VT323, monospace",
                fontSize: 14,
                textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                width: 76,
                userSelect: "none",
              }}
              whileDrag={{ scale: 1.08, zIndex: 20, cursor: "grabbing" }}
              title="Arrastrá para mover"
            >
              <div style={{ fontSize: 36, pointerEvents: "none" }}>🗑️</div>
              <span style={{ pointerEvents: "none" }}>Papelera</span>
            </motion.div>

            {/* Sub-windows contained inside Desktop OS Screen */}
            <AnimatePresence>
              {openFolder === "aplicaciones" && (
                <AplicacionesWindow onClose={() => setOpenFolder(null)} />
              )}
              {openFolder === "estamos_sanando" && (
                <EstamosSanandoWindow onClose={() => setOpenFolder(null)} />
              )}
              {openFolder === "spot" && (
                <SpotPublicitarioWindow onClose={() => setOpenFolder(null)} />
              )}
              {openFolder === "contenido" && (
                <CreacionContenidoWindow onClose={() => setOpenFolder(null)} />
              )}
            </AnimatePresence>
          </div>

          {/* Taskbar */}
          <div className="win95-taskbar">
            <button className="win95-start-btn">
              ⊞ Inicio
            </button>
            <div
              style={{
                flex: 1,
                height: "100%",
                borderLeft: "1px solid #fff",
                borderRight: "1px solid #5F5F5F",
                margin: "0 4px",
              }}
            />
            <div
              style={{
                background: "#C0C0C0",
                border: "1px inset #999",
                padding: "2px 8px",
                fontFamily: "VT323, monospace",
                fontSize: 16,
                color: "#000",
              }}
            >
              {time || "21:47"}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
