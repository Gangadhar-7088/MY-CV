import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable

def generate_pdf(filename="Gangadhar_Behera_CV.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=32,
        rightMargin=32,
        topMargin=26,
        bottomMargin=26
    )

    styles = getSampleStyleSheet()
    
    primary_color = colors.HexColor("#09131f")     # Deep obsidian navy
    accent_color = colors.HexColor("#097a6e")      # Dark Cyan/Teal
    text_dark = colors.HexColor("#1e293b")         # Charcoal body text
    text_muted = colors.HexColor("#475569")        # Slate secondary
    line_color = colors.HexColor("#cbd5e1")        # Subtle divider

    name_style = ParagraphStyle(
        'NameStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=21,
        textColor=primary_color,
        alignment=0,
        spaceAfter=1
    )

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=12,
        textColor=accent_color,
        spaceAfter=3
    )

    contact_style = ParagraphStyle(
        'ContactStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=text_muted,
        spaceAfter=4
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=primary_color,
        spaceBefore=5,
        spaceAfter=2,
        textTransform='uppercase'
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.5,
        textColor=text_dark,
        spaceAfter=2
    )

    bold_body = ParagraphStyle(
        'BoldBody',
        parent=body_style,
        fontName='Helvetica-Bold'
    )

    story = []

    # Header: Name, Title, Contact Info
    story.append(Paragraph("GANGADHAR BEHERA", name_style))
    story.append(Paragraph("AI &amp; IoT Developer &nbsp;|&nbsp; Web &amp; Software Developer &nbsp;|&nbsp; Computer Science Student", title_style))
    
    contact_text = (
        'Email: <font color="#097a6e"><b>gangadharbehera1380@gmail.com</b></font> &nbsp;&bull;&nbsp; '
        'GitHub: <font color="#097a6e"><b>github.com/Gangadhar-7088</b></font> &nbsp;&bull;&nbsp; '
        'LinkedIn: <font color="#097a6e"><b>linkedin.com/in/gangadhar-behera-043a3a435</b></font>'
    )
    story.append(Paragraph(contact_text, contact_style))
    story.append(HRFlowable(width="100%", thickness=1, color=primary_color, spaceBefore=1, spaceAfter=4))

    # SECTION: PROFESSIONAL PROFILE
    story.append(Paragraph("Professional Profile", section_heading))
    profile_text = (
        "Enthusiastic and practical Computer Science undergraduate with focused hands-on expertise across "
        "Artificial Intelligence, Computer Vision, Embedded IoT architectures, and full-stack software development. "
        "Proven ability to build intelligent systems connecting hardware sensors (ESP32, LoRa) with computer vision "
        "(OpenCV, YOLO) and responsive software tools. Driven to engineer reliable, innovative solutions for complex real-world challenges."
    )
    story.append(Paragraph(profile_text, body_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceBefore=3, spaceAfter=4))

    # SECTION: TECHNICAL SKILLS (Zero certification section - skills merged in!)
    story.append(Paragraph("Technical Skills", section_heading))
    skills_data = [
        [Paragraph("<b>Programming:</b>", body_style), Paragraph("Python, C, C++, Java, JavaScript, HTML5, CSS3", body_style)],
        [Paragraph("<b>AI &amp; Computer Vision:</b>", body_style), Paragraph("OpenCV, YOLO, Object Detection, Machine Learning, Deep Learning Architectures", body_style)],
        [Paragraph("<b>IoT &amp; Embedded:</b>", body_style), Paragraph("Arduino, ESP32, ESP8266, Raspberry Pi, LoRa, MQTT, Sensor Telemetry, Hardware Prototyping", body_style)],
        [Paragraph("<b>Applied Systems &amp; Tools:</b>", body_style), Paragraph(
            "Computer Applications (PGDCA), Financial Accounting &amp; Computing (DCFA), Database Management (MySQL), "
            "System Operations, Business Data Analysis, Git, GitHub, VS Code, Arduino IDE", body_style)],
        [Paragraph("<b>Currently Exploring:</b>", body_style), Paragraph("React, Node.js, MongoDB, Firebase, Cloud Services (AWS, GCP), Figma", body_style)],
    ]
    t_skills = Table(skills_data, colWidths=[130, 418])
    t_skills.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_skills)
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceBefore=3, spaceAfter=4))

    # SECTION: KEY PROJECTS
    story.append(Paragraph("Key Engineering Projects", section_heading))
    
    # Project 1: NETRA-MINE
    p1_title = (
        '<b>NETRA-MINE &mdash; Intelligent Low-Visibility Mine Vehicle Navigation</b> &nbsp;|&nbsp; '
        '<i>Team THE SMART POINTERS</i>'
    )
    p1_desc = (
        "&bull; <b>Overview:</b> Engineered an advanced situational awareness and safety telemetry prototype for open-cast mine vehicles operating in heavy fog, mist, and dust.<br/>"
        "&bull; <b>Hardware &amp; Telemetry:</b> Deployed ESP32 microcontrollers with long-range LoRa wireless transceivers and obstacle sensors to stream real-time collision hazards without relying on public cellular infrastructure.<br/>"
        "&bull; <b>Vision System:</b> Incorporated computer vision processing modules for edge vehicle detection and low-light visual enhancement."
    )
    story.append(Paragraph(p1_title, bold_body))
    story.append(Paragraph(p1_desc, body_style))
    story.append(Spacer(1, 2))

    # Project 2: OPTISAFE-AI
    p2_title = (
        '<b>OPTISAFE-AI &mdash; Computer Vision Industrial PPE Compliance System</b> &nbsp;|&nbsp; '
        '<i>Python, OpenCV, YOLO, Deep Learning</i>'
    )
    p2_desc = (
        "&bull; <b>Overview:</b> Developed an intelligent video safety pipeline designed to automatically verify personal protective equipment (PPE) compliance across hazardous worksites.<br/>"
        "&bull; <b>Vision Pipeline:</b> Utilized custom-trained YOLO object detection models to identify safety helmets, high-visibility vests, and unauthorized zone breaches in real-time camera streams.<br/>"
        "&bull; <b>Alerts &amp; Logging:</b> Integrated automatic visual alerting, bounding box overlays, and incident reporting logs for safety officers."
    )
    story.append(Paragraph(p2_title, bold_body))
    story.append(Paragraph(p2_desc, body_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=line_color, spaceBefore=3, spaceAfter=4))

    # SECTION: EDUCATION
    story.append(Paragraph("Education", section_heading))
    
    edu_data = [
        [
            Paragraph("<b>B.Tech &mdash; Computer Science &amp; Engineering</b><br/>Nalanda Institute of Technology, Bhubaneswar", body_style),
            Paragraph("<font color='#097a6e'><b>Current &bull; 2nd Year (3rd Sem)</b></font><br/><font color='#64748b'>Affiliated to BPUT, Odisha</font>", ParagraphStyle('RightEdu', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>Higher Secondary (+2 Science)</b><br/>Talanagar Higher Secondary School", body_style),
            Paragraph("<b>2021 &mdash; 2023 &bull; 77%</b><br/><font color='#64748b'>CHSE Odisha</font>", ParagraphStyle('RightEdu2', parent=body_style, alignment=2))
        ],
        [
            Paragraph("<b>Secondary Education (10th)</b><br/>Sunari High School, Sunari", body_style),
            Paragraph("<b>2021 &bull; 84%</b><br/><font color='#64748b'>BSE Odisha</font>", ParagraphStyle('RightEdu3', parent=body_style, alignment=2))
        ]
    ]
    t_edu = Table(edu_data, colWidths=[360, 188])
    t_edu.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 1.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.5),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(t_edu)

    doc.build(story)
    print(f"Successfully generated {filename}")

if __name__ == "__main__":
    generate_pdf()
