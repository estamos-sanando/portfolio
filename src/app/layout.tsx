import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antonella — Portfolio Creativo | UX/UI & Producción Audiovisual",
  description:
    "Portfolio interactivo de Antonella, diseñadora UX/UI y productora audiovisual. Explorá mi trabajo como si estuvieras en un videojuego: una habitación creativa pixelada llena de proyectos.",
  keywords: [
    "portfolio", "UX/UI", "diseño", "audiovisual", "pixel art", "interactivo",
    "Antonella", "diseñadora", "productora"
  ],
  openGraph: {
    title: "Antonella — Portfolio Creativo",
    description: "Una experiencia de portfolio interactiva estilo videojuego 2D",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Pixelify+Sans:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-hidden">
        {children}
      </body>
    </html>
  );
}
