"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/hooks/useGameStore";
import { useAudio } from "@/hooks/useAudio";

// ---- App Screens ----

function SobreMiScreen() {
  return (
    <div style={{ padding: "20px 24px", background: "var(--px-cream)", minHeight: "100%" }}>
      <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
        {/* Left Column: Avatar & Quick Info */}
        <div
          style={{
            width: "180px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "rgba(242, 167, 187, 0.15)",
            padding: "16px",
            borderRadius: "16px",
            border: "1px solid rgba(212, 116, 138, 0.3)",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
              border: "3px solid white",
              marginBottom: 12,
              overflow: "hidden",
              background: "white",
            }}
          >
            <img
              src="/antonella.png"
              alt="Antonella Costa"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "15px",
              fontWeight: 800,
              color: "var(--px-dark)",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            ANTONELLA COSTA
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 600,
              color: "var(--px-rose-dark)",
              textAlign: "center",
              marginTop: 4,
              marginBottom: 12,
            }}
          >
            Creativa Digital
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
            {["Comunicación", "Contenidos", "Diseño", "IA"].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "var(--px-rose)",
                  color: "white",
                  padding: "3px 8px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: 600,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Detailed Bio */}
        <div
          style={{
            flex: 1,
            fontFamily: "var(--font-body)",
            fontSize: "15px",
            color: "var(--px-dark)",
            lineHeight: 1.6,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--px-violet-dark)",
              marginBottom: 12,
            }}
          >
            Perfil Profesional
          </h3>
          <p style={{ marginBottom: 12 }}>
            Creativa digital con amplia experiencia en producción de contenidos, comunicación estratégica y diseño de experiencias digitales.
          </p>
          <p style={{ marginBottom: 12 }}>
            Me especializo en transformar ideas en proyectos con impacto real, combinando sensibilidad estética, pensamiento estratégico y el dominio de herramientas digitales avanzadas e Inteligencia Artificial.
          </p>
          <p>
            Me destaco por entender a las personas, generar contenido auténtico, visual y funcional, y liderar proyectos completos desde la conceptualización inicial hasta su ejecución final.
          </p>
        </div>
      </div>
    </div>
  );
}

function ExperienciaScreen() {
  const items = [
    {
      role: "Fundadora | Productora | Directora",
      company: "Estamos Sanando",
      period: "2025 — Actualidad",
      desc: [
        "Desarrollo integral de estrategia de marca y comunicación.",
        "Producción del podcast, guión y narrativa audiovisual.",
        "Contenido para Instagram, TikTok, Facebook y Spotify.",
        "Comunicación con foco en salud y bienestar desde una perspectiva social."
      ],
      color: "#2E7D32",
      bg: "rgba(46, 125, 50, 0.08)",
    },
    {
      role: "Jefa de Equipo",
      company: "West Liniers | Western Union",
      period: "Junio 2022 — Actualidad",
      desc: [
        "Coordinación operativa y supervisión de equipos de trabajo.",
        "Gestión integral de la atención al cliente presencial y digital.",
        "Diseño de piezas gráficas (Canva) y gestión de canales (WhatsApp, Telegram).",
        "Administración de divisas, operaciones y capacitación."
      ],
      color: "#C2185B",
      bg: "rgba(194, 24, 91, 0.08)",
    },
    {
      role: "Creadora de Contenido Digital",
      company: "Freelance",
      period: "2019 — 2022",
      desc: [
        "Planificación estratégica, calendarios y producción audiovisual.",
        "Diseño gráfico para redes, cobertura de eventos y colaboraciones.",
        "Seguimiento de métricas y optimización de contenido."
      ],
      color: "#512DA8",
      bg: "rgba(81, 45, 168, 0.08)",
    },
  ];

  return (
    <div style={{ padding: "20px 24px", background: "var(--px-cream)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: item.bg,
              borderRadius: "14px",
              padding: "16px 20px",
              borderLeft: `5px solid ${item.color}`,
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: "var(--px-dark)",
                }}
              >
                {item.role}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-pixel)",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: item.color,
                  background: "white",
                  padding: "3px 10px",
                  borderRadius: "10px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                }}
              >
                {item.period}
              </span>
            </div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 600,
                color: item.color,
                marginBottom: 8,
              }}
            >
              {item.company}
            </div>
            <ul
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                color: "var(--px-dark)",
                lineHeight: 1.5,
                paddingLeft: "18px",
                margin: 0,
              }}
            >
              {item.desc.map((bullet, idx) => (
                <li key={idx} style={{ marginBottom: "4px" }}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function HabilidadesScreen() {
  const categories = [
    {
      title: "Herramientas e IA",
      icon: "⚙️",
      color: "var(--px-rose-dark)",
      skills: ["Canva", "CapCut", "Antigravity", "ChatGPT", "Gemini", "Google Workspace", "Excel"],
    },
    {
      title: "Comunicación & Contenido",
      icon: "📢",
      color: "var(--px-violet-dark)",
      skills: ["Storytelling", "Copywriting", "Audiovisual", "Community Mgmt", "Estrategia"],
    },
    {
      title: "Diseño & UX",
      icon: "🎨",
      color: "var(--px-green-dark)",
      skills: ["UX/UI", "Wireframes", "Prototipado", "Arquitectura Info", "Interfaces"],
    },
    {
      title: "Gestión & Educación",
      icon: "📚",
      color: "#8D6E63",
      skills: ["UNLaM (Prod. Contenidos)", "Gestión de proyectos", "Atención al cliente", "Resolución de problemas"],
    },
  ];

  return (
    <div style={{ padding: "20px 24px", background: "var(--px-cream)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {categories.map((cat) => (
          <div
            key={cat.title}
            style={{
              background: "white",
              borderRadius: "14px",
              padding: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "14px",
                fontWeight: 700,
                color: cat.color,
                marginBottom: 10,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span>{cat.icon}</span> {cat.title}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    background: "var(--px-cream)",
                    color: "var(--px-dark)",
                    border: `1px solid ${cat.color}`,
                    borderRadius: "8px",
                    padding: "4px 10px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function ContactoScreen() {
  const links = [
    {
      icon: "✉️",
      label: "Email",
      value: "antonellacosta_98@hotmail.com",
      href: "mailto:antonellacosta_98@hotmail.com",
    },
    {
      icon: "📱",
      label: "WhatsApp / Teléfono",
      value: "+54 9 11 6892-2686",
      href: "https://wa.me/5491168922686",
    },
    {
      icon: "📍",
      label: "Ubicación",
      value: "Buenos Aires, Argentina",
      href: "#",
    },
  ];

  return (
    <div style={{ padding: "24px 32px", background: "var(--px-cream)", minHeight: "100%" }}>
      <div
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "16px",
          fontWeight: 800,
          color: "var(--px-rose-dark)",
          marginBottom: 16,
        }}
      >
        ¡Hablemos y conectemos! 🌟
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "20px 16px",
              background: "white",
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              textDecoration: "none",
              color: "var(--px-dark)",
              cursor: link.href !== "#" ? "pointer" : "default",
              transition: "transform 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => {
              if (link.href !== "#") e.currentTarget.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              if (link.href !== "#") e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <span style={{ fontSize: "32px" }}>{link.icon}</span>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-pixel)", fontSize: "11px", fontWeight: 700, color: "var(--px-rose-dark)", marginBottom: 2 }}>
                {link.label}
              </div>
              <div style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600 }}>{link.value}</div>
            </div>
          </a>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          padding: "14px",
          background: "linear-gradient(135deg, var(--px-rose-dark), var(--px-violet-dark))",
          color: "white",
          border: "none",
          borderRadius: "14px",
          fontFamily: "var(--font-pixel)",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(212, 116, 138, 0.3)",
        }}
        onClick={() =>
          (window.location.href = "mailto:antonellacosta_98@hotmail.com")
        }
      >
        ✉️ Enviar un correo electrónico a Antonella →
      </button>
    </div>
  );
}

function CVScreen() {
  return (
    <div
      style={{
        padding: "32px 40px",
        background: "var(--px-cream)",
        minHeight: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "28px 36px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.06)",
          maxWidth: 540,
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ fontSize: "64px", flexShrink: 0 }}>📄</div>
        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: "var(--font-pixel)",
              fontSize: "18px",
              fontWeight: 800,
              color: "var(--px-dark)",
              marginBottom: 6,
            }}
          >
            Curriculum Vitae Oficial
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              color: "#555",
              lineHeight: 1.5,
              marginBottom: 16,
            }}
          >
            Descargá el documento PDF completo de Antonella Costa con toda su trayectoria profesional, experiencia y habilidades.
          </p>
          <a
            href="/cv-antonella.pdf"
            download
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "linear-gradient(135deg, var(--px-rose-dark), var(--px-violet-dark))",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontFamily: "var(--font-pixel)",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            ↓ DESCARGAR CV (PDF)
          </a>
        </div>
      </div>
    </div>
  );
}

// ---- App Registry ----
const APPS = [
  { id: "sobremi", label: "Sobre mí", icon: "👩", color: "#F2A7BB", Screen: SobreMiScreen },
  { id: "experiencia", label: "Experiencia", icon: "💼", color: "#B39DDB", Screen: ExperienciaScreen },
  { id: "habilidades", label: "Habilidades", icon: "🛠️", color: "#A8C5A0", Screen: HabilidadesScreen },
  { id: "contacto", label: "Contacto", icon: "✉️", color: "#E8D5B7", Screen: ContactoScreen },
  { id: "cv", label: "Descargar CV", icon: "📄", color: "#D4748A", Screen: CVScreen },
];

// ---- Main Phone Component ----
export default function PhoneApp({ onClose }: { onClose: () => void }) {
  const { play } = useAudio();
  const [activeApp, setActiveApp] = useState<string | null>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeApp) {
          setActiveApp(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeApp, onClose]);

  const openApp = (id: string) => {
    play("click");
    setActiveApp(id);
  };

  const closeApp = () => {
    play("closeWindow");
    setActiveApp(null);
  };

  const activeScreen = APPS.find((a) => a.id === activeApp);
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none", // Let clicks pass through if outside (or use a backdrop)
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{ pointerEvents: "auto", position: "relative" }}
      >
      <div
        className="phone-frame"
        style={{
          width: 680,
          height: 450,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Phone top notch */}
        <div
          style={{
            height: 20,
            background: "#181824",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 60,
              height: 6,
              background: "#282838",
              borderRadius: 3,
            }}
          />
        </div>

        {/* Screen */}
        <div
          className="phone-screen"
          style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}
        >
          {/* Status bar */}
          <div
            style={{
              background: "#1F1F2E",
              color: "white",
              fontFamily: "var(--font-pixel)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "6px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {new Date().getHours()}:
              {String(new Date().getMinutes()).padStart(2, "0")}
            </span>
            <span>📱 Dispositivo Inteligente Horizontal ● WiFi 🔋</span>
          </div>

          {/* App content / Home screen */}
          <AnimatePresence mode="wait">
            {activeApp && activeScreen ? (
              <motion.div
                key={activeApp}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "tween", duration: 0.2 }}
                style={{ position: "absolute", inset: 0, background: "var(--px-cream)", overflowY: "auto", top: 30, display: "flex", flexDirection: "column" }}
              >
                {/* App header */}
                <div
                  style={{
                    background: activeScreen.color,
                    padding: "10px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                  }}
                >
                  <button
                    onClick={closeApp}
                    style={{
                      background: "white",
                      border: "none",
                      borderRadius: "20px",
                      padding: "4px 14px",
                      cursor: "pointer",
                      fontFamily: "var(--font-pixel)",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "var(--px-dark)",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  >
                    ← Volver al inicio
                  </button>
                  <span
                    style={{
                      fontFamily: "var(--font-pixel)",
                      fontSize: "15px",
                      fontWeight: 800,
                      color: "var(--px-dark)",
                    }}
                  >
                    {activeScreen.label.toUpperCase()}
                  </span>
                </div>
                <div style={{ flex: 1, overflowY: "auto" }}>
                  <activeScreen.Screen />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  padding: "24px 32px",
                  height: "100%",
                  background: "linear-gradient(135deg, #FFF8EF, #F5EDD5)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <h2 style={{ fontFamily: "var(--font-pixel)", fontSize: "18px", fontWeight: 800, color: "var(--px-dark)" }}>
                    ANTONELLA COSTA
                  </h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "var(--px-rose-dark)", fontWeight: 600 }}>
                    Creativa Digital · Seleccioná una aplicación para ver la información
                  </p>
                </div>

                {/* App grid (5 columns) */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(5, 1fr)",
                    gap: 16,
                    width: "100%",
                    maxWidth: 580,
                  }}
                >
                  {APPS.map((app) => (
                    <button
                      key={app.id}
                      className="phone-app-icon"
                      onClick={() => openApp(app.id)}
                      style={{
                        background: app.color,
                        width: "100%",
                        height: 90,
                        borderRadius: 16,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                      }}
                      aria-label={app.label}
                    >
                      <span style={{ fontSize: "28px" }}>{app.icon}</span>
                      <span
                        style={{
                          fontFamily: "var(--font-pixel)",
                          fontSize: "12px",
                          fontWeight: 700,
                          color: "var(--px-dark)",
                          textAlign: "center",
                        }}
                      >
                        {app.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home bar */}
        <div
          style={{
            height: 20,
            background: "#181824",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={closeApp}
            style={{
              width: 120,
              height: 4,
              background: "rgba(255,255,255,0.7)",
              border: "none",
              cursor: "pointer",
              borderRadius: 4,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "white"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.7)"}
          />
        </div>
      </div>

      {/* Close button outside device */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: -16,
          right: -16,
          width: 36,
          height: 36,
          background: "#E57373",
          border: "2px solid #fff",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          color: "white",
          fontFamily: "var(--font-pixel)",
          fontSize: "14px",
          fontWeight: 700,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.1s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        ✕
      </button>
    </motion.div>
    </div>
  );
}
