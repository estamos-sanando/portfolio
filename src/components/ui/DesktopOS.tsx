"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "@/hooks/useAudio";
import PixelWindow from "./PixelWindow";
import { InstagramIcon, FacebookIcon, TikTokIcon, PodcastIcon, WebIcon } from "./SocialIcons";

// ---- Project Definitions ----
const PROJECTS = [
  {
    id: "despues",
    name: "Después",
    icon: "🌸",
    color: "#B39DDB",
    gif: "/trabajos/despues/despues.gif",
    video: "/trabajos/despues/despues.mp4",
    description:
      "Después es una aplicación de acompañamiento y prevención frente a situaciones de violencia sexoafectiva. Está pensada para ayudar a reconocer señales de alerta, comprender los propios límites y acceder a información clara sobre consentimiento, vínculos saludables y educación sexual. La aplicación reúne recursos de orientación, herramientas para registrar situaciones y un botón de salida rápida que permite abandonar la pantalla de manera discreta. Su objetivo es ofrecer un espacio seguro y accesible para informarse, identificar conductas que muchas veces se naturalizan y tomar decisiones con mayor autonomía.",
    problem:
      "Muchas personas no tienen acceso a herramientas digitales que aborden el procesamiento emocional post-encuentros sexoafectivos de forma empática y no invasiva.",
    process:
      "Desarrollo impulsado por Inteligencia Artificial (ChatGPT, Gemini, Antigravity) → Despliegue en Vercel.",
    role: "Diseño y Desarrollo con IA",
    tools: ["ChatGPT", "Gemini", "Antigravity"],
    prototype: "https://despues20.vercel.app/",
  },
  {
    id: "chequeate",
    name: "Chequéate",
    icon: "🏥",
    color: "#F2A7BB",
    gif: "/trabajos/chequeate/chequeate.gif",
    video: "/trabajos/chequeate/chequeate.mp4",
    description:
      "Chequéate es una aplicación de salud pensada para que cada persona pueda llevar un control más consciente y organizado de su propio cuerpo. Permite centralizar el historial médico, registrar controles y estudios, gestionar turnos y recibir recordatorios para no postergar chequeos importantes. Además de facilitar el seguimiento de la salud, brinda información preventiva y ayuda a detectar hábitos, antecedentes o controles pendientes. Su objetivo es que cada usuario pueda conocer mejor su cuerpo, tomar decisiones informadas y adoptar una actitud más activa frente al cuidado de su salud.",
    problem:
      "La falta de información accesible y el miedo provocan que muchas mujeres pospongan sus controles ginecológicos preventivos.",
    process:
      "Desarrollo impulsado por Inteligencia Artificial (ChatGPT, Gemini, Antigravity) → Despliegue en Vercel.",
    role: "Diseño y Desarrollo con IA",
    tools: ["ChatGPT", "Gemini", "Antigravity"],
    prototype: "https://chequeate201.vercel.app/",
  },
];

// ---- Estamos Sanando ----
const SANANDO_ITEMS = [
  {
    id: "ig",
    icon: <InstagramIcon size={36} />,
    label: "Instagram",
    desc: "Comunidad y contenido visual en Instagram: @estamos_sanando",
    url: "https://www.instagram.com/estamos_sanando/",
    buttonText: "Visitar Instagram",
  },
  {
    id: "fb",
    icon: <FacebookIcon size={36} />,
    label: "Facebook",
    desc: "Página oficial de Facebook: @estamossanando",
    url: "https://www.facebook.com/estamossanando/",
    buttonText: "Visitar Facebook",
  },
  {
    id: "tiktok",
    icon: <TikTokIcon size={36} />,
    label: "TikTok",
    desc: "Contenido audiovisual en TikTok: @estamos.sanando",
    url: "https://www.tiktok.com/@estamos.sanando",
    buttonText: "Visitar TikTok",
  },
  {
    id: "podcast",
    icon: <PodcastIcon size={36} />,
    label: "Podcast",
    desc: "Podcast de acompañamiento, salud y bienestar.",
    buttonText: "Escuchar Podcast",
  },
  {
    id: "web",
    icon: <WebIcon size={36} />,
    label: "Sitio Web",
    desc: "Sitio web del proyecto con identidad visual completa (Próximamente).",
    buttonText: "Sitio Web (Próximamente)",
  },
];

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
        width={460}
        style="win95"
        icon="🌿"
        contained={true}
      >
        <div style={{ padding: 8, background: "#D4D0C8" }}>
          {/* Logo Header Banner */}
          <div
            style={{
              width: "100%",
              background: "#FFFFFF",
              borderRadius: 6,
              border: "2px inset #999",
              padding: "12px 16px",
              marginBottom: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/trabajos/estamos_sanando/logo.png"
              alt="Logo Estamos Sanando"
              style={{
                maxHeight: 64,
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
            <p
              style={{
                fontFamily: "VT323, monospace",
                fontSize: "15px",
                color: "#2D2D3A",
                lineHeight: 1.4,
                textAlign: "center",
                margin: 0,
              }}
            >
              Proyecto personal que acompaña, informa y crea comunidad a través de la
              palabra, el arte y la escucha.
            </p>
          </div>

          {/* Social Links & Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              padding: "8px",
              background: "#D4D0C8",
            }}
          >
            {SANANDO_ITEMS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  play("click");
                  if (s.url) {
                    window.open(s.url, "_blank", "noopener,noreferrer");
                  } else {
                    setOpenItem(s.id);
                  }
                }}
                onDoubleClick={() => {
                  play("openFolder");
                  setOpenItem(s.id);
                }}
                style={{
                  background: "#E4E0D8",
                  border: "2px outset #fff",
                  borderRadius: 4,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  padding: "10px 4px",
                  fontFamily: "VT323, monospace",
                  fontSize: "14px",
                  color: "#000",
                }}
              >
                <div style={{ fontSize: "28px" }}>{s.icon}</div>
                <span style={{ fontWeight: 600 }}>{s.label}</span>
              </button>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px solid #999",
              marginTop: 8,
              padding: "4px 8px",
              fontFamily: "VT323, monospace",
              fontSize: "13px",
              background: "#C0C0C0",
              color: "#333",
            }}
          >
            Hacé clic en una red social para abrir la página oficial
          </div>
        </div>
      </PixelWindow>

      <AnimatePresence>
        {openItem && item && (
          <PixelWindow
            id={`sanando-${item.id}`}
            title={`🌿 ${item.label}`}
            onClose={() => setOpenItem(null)}
            defaultX={100}
            defaultY={40}
            width={340}
            contained={true}
          >
            <div style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>{item.icon}</div>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  color: "var(--px-dark)",
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </p>

              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: 16,
                    padding: "8px 16px",
                    background: "linear-gradient(135deg, #B39DDB, #8E24AA)",
                    color: "white",
                    borderRadius: 8,
                    textDecoration: "none",
                    fontFamily: "VT323, monospace",
                    fontSize: 16,
                    fontWeight: "bold",
                  }}
                >
                  {item.buttonText} →
                </a>
              ) : (
                <p
                  style={{
                    marginTop: 16,
                    fontFamily: "var(--font-pixel)",
                    fontSize: "8px",
                    color: "var(--px-rose-dark)",
                  }}
                >
                  Contenido próximamente →
                </p>
              )}
            </div>
          </PixelWindow>
        )}
      </AnimatePresence>
    </>
  );
}

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
      defaultX={20}
      defaultY={10}
      width={640}
      contained={true}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr",
          gap: 14,
          alignItems: "start",
        }}
      >
        {/* Left Column: GIF/Media & Link */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {"gif" in project && project.gif ? (
            <div
              style={{
                width: "100%",
                borderRadius: 6,
                overflow: "hidden",
                border: "2px inset #999",
                background: "#000",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.gif as string}
                alt={`Vista previa ${project.name}`}
                style={{
                  width: "100%",
                  maxHeight: 180,
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </div>
          ) : (
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
          )}

          {project.prototype !== "#" && (
            <a
              href={project.prototype}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "8px 12px",
                background: "linear-gradient(135deg, #B39DDB, #8E24AA)",
                border: `2px outset #fff`,
                borderRadius: 6,
                textAlign: "center",
                fontFamily: "VT323, monospace",
                fontSize: "17px",
                color: "#fff",
                textDecoration: "none",
                fontWeight: "bold",
                boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
                cursor: "pointer",
              }}
            >
              🌐 Abrir App Web →
            </a>
          )}
        </div>

        {/* Right Column: Info & Details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Section title="Descripción">
            <p style={{ lineHeight: 1.4, margin: 0 }}>{project.description}</p>
          </Section>

          <Section title="Problema">
            <p style={{ lineHeight: 1.4, margin: 0 }}>{project.problem}</p>
          </Section>

          <Section title="Proceso">
            <p style={{ lineHeight: 1.4, margin: 0 }}>{project.process}</p>
          </Section>

          <Section title="Mi Rol">
            <p style={{ lineHeight: 1.4, margin: 0 }}>{project.role}</p>
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
        </div>
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
          {PROJECTS.length} elementos — Doble clic para abrir
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

// ---- PRODUCCIONES ----
function ProduccionesWindow({ onClose }: { onClose: () => void }) {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { play } = useAudio();

  const handleOpenVideo = () => {
    play("click");
    setVideoError(false);
    setShowVideoModal(true);
  };

  useEffect(() => {
    if (showVideoModal && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay deferral:", err);
      });
    }
  }, [showVideoModal]);

  return (
    <>
      <PixelWindow
        id="producciones"
        title="PRODUCCIONES"
        onClose={onClose}
        defaultX={20}
        defaultY={10}
        width={660}
        style="win95"
        icon="🎬"
        contained={true}
      >
        <div style={{ padding: 10, background: "#D4D0C8", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {/* PRODUCCIÓN 1: Spot Publicitario */}
          <div
            style={{
              background: "#E4E0D8",
              border: "2px outset #fff",
              borderRadius: 6,
              padding: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ fontFamily: "VT323, monospace", fontSize: 17, fontWeight: "bold", color: "#000" }}>
                  DonaxVida — Spot Publicitario
                </div>
              </div>

              {/* Video Thumbnail Placeholder */}
              <div
                style={{
                  width: "100%",
                  height: 125,
                  background: "linear-gradient(135deg, #1C1828, #2A2438)",
                  borderRadius: 6,
                  border: "2px inset #999",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <span style={{ fontFamily: "VT323, monospace", fontSize: 15, color: "#F2A7BB", fontWeight: "bold" }}>
                  SPOT AUDIOVISUAL
                </span>
              </div>

              <p style={{ fontFamily: "VT323, monospace", fontSize: 14, color: "#2D2D3A", margin: 0, lineHeight: 1.3 }}>
                Spot publicitario de concientización para la campaña &quot;DonaxVida&quot;. Edición y postproducción con CapCut.
              </p>
              <div style={{ fontSize: 13, fontFamily: "VT323, monospace", color: "#444" }}>
                <strong>Rol:</strong> Dirección creativa, guión y edición.
              </div>
            </div>

            <button
              onClick={handleOpenVideo}
              style={{
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "7px 12px",
                background: "linear-gradient(135deg, #B39DDB, #8E24AA)",
                border: "2px outset #fff",
                borderRadius: 6,
                color: "white",
                fontFamily: "VT323, monospace",
                fontSize: "15px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              VER SPOT PUBLICITARIO →
            </button>
          </div>

          {/* PRODUCCIÓN 2: Videojuego Women Game Jam 2025 */}
          <div
            style={{
              background: "#E4E0D8",
              border: "2px outset #fff",
              borderRadius: 6,
              padding: 10,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 6,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ fontFamily: "VT323, monospace", fontSize: 17, fontWeight: "bold", color: "#000" }}>
                  Videojuego — Women Game Jam
                </div>
              </div>

              {/* Cover Image */}
              <div
                style={{
                  width: "100%",
                  height: 125,
                  borderRadius: 6,
                  overflow: "hidden",
                  border: "2px inset #999",
                  background: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/trabajos/PRODUCCIONES/theafter.jpeg"
                  alt="Portada del Videojuego - Women Game Jam 2025"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              <p style={{ fontFamily: "VT323, monospace", fontSize: 14, color: "#2D2D3A", margin: 0, lineHeight: 1.3 }}>
                Videojuego desarrollado en la Women Game Jam 2025. Diseño de juego y narrativa interactiva.
              </p>
              <div style={{ fontSize: 13, fontFamily: "VT323, monospace", color: "#444" }}>
                <strong>Rol:</strong> Game design / Narrativa
              </div>
            </div>

            <a
              href="https://itch.io/jam/women-game-jam-2025/rate/3802081#google_vignette"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => play("click")}
              style={{
                marginTop: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "7px 12px",
                background: "linear-gradient(135deg, #FF7043, #D84315)",
                border: "2px outset #fff",
                borderRadius: 6,
                color: "white",
                fontFamily: "VT323, monospace",
                fontSize: "15px",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              VER EN ITCH.IO →
            </a>
          </div>
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
          2 producciones disponibles
        </div>
      </PixelWindow>

      {/* POPUP DEDICADO DE VIDEO (VENTANA EMERGENTE) */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 200,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(6px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 16,
            }}
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              style={{
                position: "relative",
                width: "90%",
                maxWidth: 760,
                background: "#1C1828",
                border: "3px solid #F2A7BB",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(242,167,187,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                  borderBottom: "1px solid rgba(242,167,187,0.3)",
                  paddingBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-pixel)",
                    fontSize: "10px",
                    color: "#F2A7BB",
                  }}
                >
                  🎬 REPRODUCTOR — DONAXVIDA
                </span>
                <button
                  onClick={() => setShowVideoModal(false)}
                  style={{
                    background: "rgba(242,167,187,0.2)",
                    border: "1px solid #F2A7BB",
                    color: "white",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    cursor: "pointer",
                    fontFamily: "monospace",
                    fontWeight: "bold",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Video Element */}
              {videoError ? (
                <div
                  style={{
                    padding: 24,
                    textAlign: "center",
                    color: "#F2A7BB",
                    fontFamily: "VT323, monospace",
                    fontSize: 18,
                  }}
                >
                  <p>Hubo un inconveniente al cargar el reproductor incorporado.</p>
                  <a
                    href="/trabajos/PRODUCCIONES/SPOTDONAXVIDA.mp4"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: 12,
                      padding: "8px 16px",
                      background: "#F2A7BB",
                      color: "#1C1828",
                      borderRadius: 6,
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    ▶ Abrir video directamente
                  </a>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  preload="auto"
                  onError={() => setVideoError(true)}
                  style={{
                    width: "100%",
                    maxHeight: "70vh",
                    borderRadius: 8,
                    background: "#000",
                  }}
                >
                  <source src="/trabajos/PRODUCCIONES/SPOTDONAXVIDA.mp4" type="video/mp4" />
                  Tu navegador no soporta el reproductor de video.
                </video>
              )}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 10,
                }}
              >
                <a
                  href="/trabajos/PRODUCCIONES/SPOTDONAXVIDA.mp4"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "VT323, monospace",
                    fontSize: "15px",
                    color: "#F2A7BB",
                    textDecoration: "none",
                    opacity: 0.85,
                  }}
                >
                  🔗 Abrir video en pestaña nueva
                </a>
              </div>
            </motion.div>
          </motion.div>
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
    { id: "estamos_sanando", label: "Estamos Sanando", icon: "📁", x: 130, y: 20 },
    { id: "producciones", label: "PRODUCCIONES", icon: "🎬", x: 240, y: 20 },
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
            width: "94vw",
            maxWidth: 900,
            height: "86vh",
            maxHeight: 600,
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
              {openFolder === "producciones" && (
                <ProduccionesWindow onClose={() => setOpenFolder(null)} />
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
