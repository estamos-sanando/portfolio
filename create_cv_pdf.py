import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT

def generate_pdf():
    pdf_path = os.path.join(os.getcwd(), "public", "CV_Antonella_Costa.pdf")
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        rightMargin=36,
        leftMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()

    # Color Palette
    primary = colors.HexColor("#D4748A")      # Rose Dark
    secondary = colors.HexColor("#7E57C2")    # Violet Dark
    dark = colors.HexColor("#2D2D3A")         # Dark Charcoal
    light_bg = colors.HexColor("#F9F4EF")     # Light Cream
    gray_text = colors.HexColor("#555555")

    # Custom Paragraph Styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=24,
        textColor=dark,
        spaceAfter=2
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=secondary,
        spaceAfter=6
    )

    contact_style = ParagraphStyle(
        'ContactText',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=11,
        textColor=gray_text
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=14,
        textColor=primary,
        spaceBefore=10,
        spaceAfter=4
    )

    body_style = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=dark
    )

    job_title = ParagraphStyle(
        'JobTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=12,
        textColor=dark
    )

    job_company = ParagraphStyle(
        'JobCompany',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11,
        textColor=secondary
    )

    job_date = ParagraphStyle(
        'JobDate',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=primary,
        alignment=TA_RIGHT
    )

    bullet_style = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        textColor=dark,
        leftIndent=12
    )

    story = []

    # --- HEADER BLOCK ---
    header_data = [
        [
            Paragraph("<b>ANTONELLA COSTA</b>", title_style),
            Paragraph("📍 Lomas del Mirador, BA, Argentina<br/>✉️ antonellacosta_98@hotmail.com<br/>📱 +54 9 11 6892-2686", contact_style)
        ],
        [
            Paragraph("CREATIVA DIGITAL &bull; COMUNICACIÓN | CONTENIDOS | DISEÑO | IA", subtitle_style),
            ""
        ]
    ]

    header_table = Table(header_data, colWidths=[360, 180])
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('SPAN', (0,1), (1,1)),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary, spaceAfter=8))

    # --- PERFIL PROFESIONAL ---
    story.append(Paragraph("<b>PERFIL PROFESIONAL</b>", section_heading))
    perfil_text = (
        "Creativa digital con experiencia en producción de contenidos, comunicación estratégica y diseño de experiencias digitales. "
        "Me especializo en transformar ideas en proyectos con impacto, combinando creatividad, pensamiento estratégico y dominio "
        "de herramientas digitales e Inteligencia Artificial. Me destaco por entender a las personas, generar contenido auténtico, "
        "visual y funcional, y liderar proyectos desde la conceptualización hasta su ejecución."
    )
    story.append(Paragraph(perfil_text, body_style))
    story.append(Spacer(1, 8))

    # --- EXPERIENCIA PROFESIONAL ---
    story.append(Paragraph("<b>EXPERIENCIA PROFESIONAL</b>", section_heading))

    # Job 1
    j1_head = Table([
        [Paragraph("<b>Fundadora | Productora | Directora Creativa</b> &mdash; <i>Estamos Sanando</i>", job_title), Paragraph("2025 &ndash; Actualidad", job_date)]
    ], colWidths=[400, 140])
    j1_head.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0)]))
    story.append(j1_head)
    for b in [
        "Desarrollo integral de la estrategia de marca y comunicación.",
        "Producción general del podcast, guión y narrativa audiovisual.",
        "Dirección creativa de la identidad visual del proyecto.",
        "Producción de contenido para Instagram, TikTok, Facebook y Spotify.",
        "Gestión de comunidad y comunicación con foco en salud y bienestar desde una perspectiva social."
    ]:
        story.append(Paragraph(f"&bull; {b}", bullet_style))
    story.append(Spacer(1, 6))

    # Job 2
    j2_head = Table([
        [Paragraph("<b>Jefa de Equipo</b> &mdash; <i>West Liniers | Western Union</i>", job_title), Paragraph("Junio 2022 &ndash; Actualidad", job_date)]
    ], colWidths=[400, 140])
    j2_head.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0)]))
    story.append(j2_head)
    for b in [
        "Coordinación operativa y supervisión de equipos de trabajo.",
        "Gestión integral de la atención al cliente presencial y digital.",
        "Organización de procesos administrativos y control operativo diario.",
        "Diseño de piezas gráficas y materiales de comunicación con Canva.",
        "Gestión de canales digitales (WhatsApp y Telegram) y resolución de incidencias.",
        "Administración de divisas, operaciones financieras y capacitación de colaboradores."
    ]:
        story.append(Paragraph(f"&bull; {b}", bullet_style))
    story.append(Spacer(1, 6))

    # Job 3
    j3_head = Table([
        [Paragraph("<b>Creadora de Contenido Digital</b> &mdash; <i>Freelance / Independiente</i>", job_title), Paragraph("2019 &ndash; 2022", job_date)]
    ], colWidths=[400, 140])
    j3_head.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'MIDDLE'), ('LEFTPADDING', (0,0), (-1,-1), 0)]))
    story.append(j3_head)
    for b in [
        "Planificación estratégica de contenidos y calendarios editoriales.",
        "Producción audiovisual, diseño gráfico para redes sociales y cobertura de eventos digitales.",
        "Desarrollo de campañas, colaboraciones con marcas y seguimiento de métricas."
    ]:
        story.append(Paragraph(f"&bull; {b}", bullet_style))
    story.append(Spacer(1, 8))

    # --- EDUCACIÓN & FORMACIÓN ---
    story.append(Paragraph("<b>EDUCACIÓN Y FORMACIÓN COMPLEMENTARIA</b>", section_heading))
    edu_head = Table([
        [Paragraph("<b>Universidad Nacional de La Matanza (UNLaM)</b><br/>Tecnicatura en Producción de Contenidos para la Comunicación", body_style), Paragraph("Finalización prevista: 2027", job_date)]
    ], colWidths=[400, 140])
    edu_head.setStyle(TableStyle([('VALIGN', (0,0), (-1,-1), 'TOP'), ('LEFTPADDING', (0,0), (-1,-1), 0)]))
    story.append(edu_head)
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>Formación Complementaria:</b> IA Aplicada al Marketing &bull; Producción de Eventos y Periodística &bull; Oratoria &bull; Introducción a la IA", body_style))
    story.append(Spacer(1, 8))

    # --- HERRAMIENTAS Y COMPETENCIAS ---
    story.append(Paragraph("<b>HERRAMIENTAS Y COMPETENCIAS CLAVE</b>", section_heading))
    skills_text = (
        "<b>Herramientas & IA:</b> Canva, CapCut, Antigravity, Google Workspace, Microsoft Office, Excel, ChatGPT, Gemini.<br/>"
        "<b>Competencias:</b> Storytelling & Copywriting, Producción Audiovisual, Community Management, Diseño UX/UI, Wireframes & Prototipado, Arquitectura de Información, Gestión de Proyectos, Liderazgo de Equipos."
    )
    story.append(Paragraph(skills_text, body_style))

    doc.build(story)
    print("PDF generated successfully at:", pdf_path)

if __name__ == "__main__":
    generate_pdf()
