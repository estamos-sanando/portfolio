"use client";

import { useState } from "react";
import PixelWindow from "./PixelWindow";

export default function CVWindow({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("antonellacosta_98@hotmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <PixelWindow
      id="cv-window"
      title="📄 Curriculum Vitae — Antonella Costa"
      onClose={onClose}
      defaultX={100}
      defaultY={40}
      width={640}
      minHeight={450}
      icon="📄"
    >
      <div className="cv-content" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* HEADER HERO */}
        <div
          style={{
            background: "linear-gradient(135deg, rgba(242,167,187,0.2), rgba(179,157,219,0.25))",
            border: "2px solid rgba(212,116,138,0.3)",
            borderRadius: 16,
            padding: 20,
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              overflow: "hidden",
              border: "3px solid white",
              boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              flexShrink: 0,
              background: "white",
            }}
          >
            <img
              src="/antonella.png"
              alt="Antonella Costa"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </div>

          {/* Titles & Info */}
          <div style={{ flex: 1 }}>
            <h1
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "22px",
                fontWeight: 800,
                color: "var(--px-dark)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              ANTONELLA COSTA
            </h1>
            <h2
              style={{
                fontFamily: "var(--font-pixel)",
                fontSize: "13px",
                fontWeight: 700,
                color: "var(--px-violet-dark)",
                letterSpacing: "0.1em",
                marginTop: 4,
                marginBottom: 8,
              }}
            >
              CREATIVA DIGITAL
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}>
              {["COMUNICACIÓN", "CONTENIDOS", "DISEÑO", "IA"].map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "var(--px-rose-dark)",
                    color: "white",
                    fontSize: "9px",
                    fontWeight: 700,
                    fontFamily: "var(--font-pixel)",
                    padding: "2px 8px",
                    borderRadius: 4,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Contact details */}
            <div
              style={{
                fontSize: "13px",
                color: "var(--px-dark-mid)",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                lineHeight: 1.4,
              }}
            >
              <span>📍 Lomas del Mirador, Buenos Aires</span>
              <span>✉️ antonellacosta_98@hotmail.com</span>
              <span>📱 +54 9 11 6892-2686</span>
            </div>
          </div>
        </div>

        {/* ACTION BAR */}
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button
            onClick={handleCopyEmail}
            style={{
              padding: "6px 14px",
              background: "white",
              border: "1.5px solid var(--px-violet-dark)",
              borderRadius: 8,
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              color: "var(--px-violet-dark)",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {copied ? "✓ Email Copiado!" : "📋 Copiar Email"}
          </button>
          <button
            onClick={handlePrint}
            style={{
              padding: "6px 14px",
              background: "linear-gradient(135deg, var(--px-rose-dark), var(--px-violet-dark))",
              border: "none",
              borderRadius: 8,
              color: "white",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            🖨️ Imprimir / PDF
          </button>
        </div>

        {/* PERFIL PROFESIONAL */}
        <Section title="👤 Perfil Profesional">
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: "14px", color: "var(--px-dark)" }}>
            Creativa digital con experiencia en producción de contenidos, comunicación estratégica y diseño de experiencias digitales.
            Me especializo en transformar ideas en proyectos con impacto, combinando creatividad, pensamiento estratégico y dominio de herramientas digitales e Inteligencia Artificial.
          </p>
          <p style={{ marginTop: 8, marginBottom: 0, lineHeight: 1.6, fontSize: "14px", color: "var(--px-dark)" }}>
            Me destaco por entender a las personas, generar contenido auténtico, visual y funcional, y liderar proyectos desde la conceptualización hasta su ejecución.
          </p>
        </Section>

        {/* EXPERIENCIA PROFESIONAL */}
        <Section title="💼 Experiencia Profesional">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <JobCard
              role="Fundadora | Productora | Directora Creativa"
              company="Estamos Sanando"
              period="2025 — Actualidad"
              color="var(--px-rose-dark)"
              bullets={[
                "Desarrollo integral de la estrategia de marca y comunicación.",
                "Producción general del podcast, guión y narrativa audiovisual.",
                "Dirección creativa de la identidad visual del proyecto.",
                "Producción de contenido para Instagram, TikTok, Facebook y Spotify.",
                "Gestión de comunidad y comunicación con foco en salud y bienestar desde una perspectiva social.",
              ]}
            />

            <JobCard
              role="Jefa de Equipo"
              company="West Liniers | Western Union"
              period="Junio 2022 — Actualidad"
              color="var(--px-violet-dark)"
              bullets={[
                "Coordinación operativa y supervisión de equipos de trabajo.",
                "Gestión integral de la atención al cliente presencial y digital.",
                "Organización de procesos administrativos y control operativo diario.",
                "Diseño de piezas gráficas y materiales de comunicación con Canva.",
                "Gestión de canales digitales (WhatsApp y Telegram), resolución de incidencias y mejora continua.",
                "Administración de divisas, operaciones financieras y capacitación de colaboradores.",
              ]}
            />

            <JobCard
              role="Creadora de Contenido Digital"
              company="Freelance / Independiente"
              period="2019 — 2022"
              color="#388E3C"
              bullets={[
                "Planificación estratégica de contenidos y calendarios editoriales.",
                "Producción audiovisual y diseño gráfico para redes sociales.",
                "Cobertura de eventos digitales y colaboraciones con marcas.",
                "Desarrollo de campañas, seguimiento de métricas y optimización de contenido.",
              ]}
            />
          </div>
        </Section>

        {/* EDUCACIÓN Y FORMACIÓN */}
        <Section title="🎓 Educación & Formación">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                background: "rgba(255,255,255,0.7)",
                borderRadius: 10,
                padding: "12px 14px",
                borderLeft: "4px solid var(--px-violet-dark)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: "14px", color: "var(--px-dark)" }}>
                  Universidad Nacional de La Matanza (UNLaM)
                </span>
                <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--px-violet-dark)", background: "white", padding: "2px 6px", borderRadius: 4 }}>
                  Previsto 2027
                </span>
              </div>
              <div style={{ fontSize: "13px", color: "var(--px-violet-dark)", fontWeight: 600, marginTop: 2 }}>
                Tecnicatura en Producción de Contenidos para la Comunicación
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 10, padding: "12px 14px", borderLeft: "4px solid var(--px-rose-dark)" }}>
              <div style={{ fontWeight: 700, fontSize: "13px", color: "var(--px-dark)", marginBottom: 6 }}>
                Formación Complementaria
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  "IA Aplicada al Marketing",
                  "Producción de Eventos y Periodística",
                  "Oratoria: El Arte de Hablar",
                  "Introducción a la IA",
                ].map((course) => (
                  <span
                    key={course}
                    style={{
                      background: "rgba(242,167,187,0.15)",
                      border: "1px solid rgba(242,167,187,0.4)",
                      padding: "3px 8px",
                      borderRadius: 6,
                      fontSize: "11px",
                      color: "var(--px-dark)",
                    }}
                  >
                    • {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* HERRAMIENTAS Y COMPETENCIAS */}
        <Section title="🛠️ Herramientas & Competencias">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--px-dark)", marginBottom: 4 }}>
                HERRAMIENTAS CLAVE
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  "Canva", "CapCut", "Antigravity", "Google Workspace", "Microsoft Office", "Excel", "ChatGPT", "Gemini"
                ].map((tool) => (
                  <span
                    key={tool}
                    style={{
                      background: "var(--px-violet-dark)",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 9px",
                      borderRadius: 6,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 4 }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "var(--px-dark)", marginBottom: 4 }}>
                COMPETENCIAS
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  "Storytelling & Copywriting", "Producción Audiovisual", "Community Management",
                  "Diseño UX/UI", "Wireframes & Prototipado", "Arquitectura de Información",
                  "Gestión de Proyectos", "Liderazgo de Equipos", "Atención al Cliente", "Resolución de Problemas"
                ].map((comp) => (
                  <span
                    key={comp}
                    style={{
                      background: "var(--px-beige)",
                      border: "1px solid var(--px-beige-dark)",
                      color: "var(--px-dark)",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "3px 9px",
                      borderRadius: 6,
                    }}
                  >
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </PixelWindow>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.6)",
        border: "1px solid rgba(139,115,85,0.2)",
        borderRadius: 12,
        padding: "14px 16px",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-pixel)",
          fontSize: "13px",
          fontWeight: 700,
          color: "var(--px-rose-dark)",
          margin: 0,
          marginBottom: 10,
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function JobCard({
  role,
  company,
  period,
  color,
  bullets,
}: {
  role: string;
  company: string;
  period: string;
  color: string;
  bullets: string[];
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        padding: "12px 14px",
        borderLeft: `4px solid ${color}`,
        boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: "14px", color: "var(--px-dark)" }}>{role}</div>
          <div style={{ fontSize: "12px", fontWeight: 600, color, marginTop: 1 }}>{company}</div>
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color,
            background: "rgba(0,0,0,0.04)",
            padding: "2px 8px",
            borderRadius: 6,
          }}
        >
          {period}
        </span>
      </div>
      <ul style={{ margin: 0, marginTop: 8, paddingLeft: 18, fontSize: "12px", color: "var(--px-dark)", lineHeight: 1.5 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: 2 }}>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}
