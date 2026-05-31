import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "es" | "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const dictionary: Record<Language, Record<string, any>> = {
  es: {
    nav: {
      home: "Inicio",
      about: "Quiénes Somos",
      treatments: "Tratamientos",
      book: "Agendar Cita",
      advisor: "Consultorio IA",
      mobileAdvisor: "Consultorio IA (Dra. Sofía)",
      courtesy: "Valoración Cortesía",
      location: "Medellín • Mixy Mall Los Colores",
    },
    common: {
      duration: "Duración",
      price: "Precio aproximado",
      benefits: "Beneficios clave",
      back: "Volver",
      close: "Cerrar",
      bookNow: "Reservar Ahora",
      loading: "Cargando...",
      success: "¡Éxito!",
      addressLabel: "Ubicación Medellín",
      addressDetails: "Calle 53 #73-45, Mixy Mall Los Colores • Local 303 (Sede de Excelencia)",
      instagram: "Instagram",
      whatsapp: "WhatsApp Médico",
      protection: "Protección de Datos Personales (Colombia)",
      rights: "© 2026 ONE CLINIC • Estética Avanzada. Todos los derechos reservados.",
    },
    hero: {
      galleryTitle: "GALERÍA CLÍNICA EXCLUSIVA",
      gallerySubtitle: "Instalaciones de Excelencia & Ciencia",
      galleryDesc: "En ONE CLINIC cada detalle está diseñado para cautivar e inspirar. Explora de forma visual nuestras suites de atención médica premium, tecnologías dermoestéticas de escuela brasilera y terapias moleculares de vanguardia.",
      galleryCategoryTodos: "Todos",
      galleryCategoryTratamientos: "Tratamientos",
      galleryCategoryInstalaciones: "Instalaciones",
      galleryCategoryTecnologia: "Tecnología",
      maximize: "Maximizar imagen",
      pauseAuto: "Pausar transición automática",
      resumeAuto: "Reanudar transición automática",
      pillars: {
        natural: {
          title: "NATURAL",
          desc: "Resultados sutiles que enaltecen los rasgos innatos de tu rostro y cuerpo, evitando sobrecorrecciones."
        },
        regenerativa: {
          title: "REGENERATIVA",
          desc: "Ciencia celular que reprograma el rejuvenecimiento tisular, induciendo colágeno autólogo."
        },
        ciencia: {
          title: "CIENCIA",
          desc: "Protocolos médicos y dermoestéticos certificados bajo el más alto nivel de evidencia clínico-científica."
        },
        latina: {
          title: "IDENTIDAD LATINA",
          desc: "Tratamientos diseñados a la medida de los fototipos y necesidades específicas de las pieles latinoamericanas."
        }
      },
      mainTreatments: {
        title: "Tratamientos Estrella",
        exosomas: "Exosomas Celulares",
        exosomasTag: "Regenerativo facial estrella",
        toxina: "Toxina Botulínica",
        toxinaTag: "Suavidad expresiva natural",
        bioestimuladores: "Bioestimuladores de Soporte",
        bioestimuladoresTag: "Firmeza y densidad progresiva",
        biogluteos: "BioGlúteos Premium",
        biogluteosTag: "Proyección y realce corporal"
      },
      galleryItems: {
        1: {
          title: "Suites de Atención VIP Los Colores",
          desc: "Cabinas de terapia individualizadas con iluminación circadiana adaptativa, aromaterapia orgánica y camillas ergonómicas climatizadas que garantizan una relajación profunda y absoluta privacidad.",
          tag: "Experiencia Premium"
        },
        2: {
          title: "Lounge de Espera & Bar de Antioxidantes",
          desc: "Disfruta de infusiones de té blanco, clorofila y jugos rejuvenecedores prensados en frío diseñados bajo supervisión nutricional en nuestra confortable sala de estar dermoestética.",
          tag: "Diseño Wellness"
        },
        3: {
          title: "Diagnóstico Multiespectral Tridimensional 3D",
          desc: "Análisis dérmico avanzado que estudia con precisión milimétrica la pigmentación melánica profunda, nivel de poro dilatado, eritemas y líneas de expresión antes de iniciar el tratamiento.",
          tag: "Tecnología Médica"
        },
        4: {
          title: "Inyección Intradérmica Molecular de Nutrientes",
          desc: "Protocolo de bioestimulación directa que introduce nutrientes patentados, aminoácidos esenciales y activadores de colágeno autólogo para reponer el volumen y refrescar la epidermis.",
          tag: "Nutrición Profunda"
        },
        5: {
          title: "Aplicación de Exosomas Clínicos Puros",
          desc: "Terapia bioterapéutica de última generación para la regeneración tisular activa del rostro, acelerando la curación celular de secuelas, marcas solares y laxitud cutánea.",
          tag: "Medicina Bioregenerativa"
        },
        6: {
          title: "Remodelación Muscular Electromagnética Inteligente",
          desc: "Sesiones no invasivas estimuladoras de contracciones supra-máximas continuas. Ayudan a tonificar y redefinir los contornos en abdomen, muslos o glúteos aceleradamente.",
          tag: "Contorno Muscular"
        }
      },
      slides: [
        {
          badge: "Sede Mixy Mall Los Colores • Medellín",
          title: "ONE CLINIC",
          subtitle: "Estética Avanzada",
          tagline: "IDENTIDAD LATINOAMERICANA",
          desc: "Descubre la medicina estética de alta gama en Medellín. Ciencia e innovación celular para armonizar tu piel de forma segura.",
          cardTitle: "Sede Los Colores",
          cardSubtitle: "Experiencia Sensorial Wellness",
          cardStamp: "EXCLUSIVIDAD",
          cardItems: [
            "Suites clínicas con máxima insonorización",
            "Discreción absoluta y atención personalizada",
            "Parqueadero privado en Mixy Mall Los Colores",
            "Aromaterapia de sándalo y música curada"
          ],
          btnBook: "Agendar Cita de Valoración",
          btnAdvisor: "Consultar Asesoría con IA"
        },
        {
          badge: "Inauguración Los Colores • Tiempo Limitado",
          title: "PROMO APERTURA",
          subtitle: "15% Off de Bienvenida",
          tagline: "BENEFICIO DE INAUGURACIÓN",
          desc: "Disfruta un 15% de cortesía interactiva reservando tu primer tratamiento regenerativo de Exosomas, más un diagnóstico facial 3D clínico sin costo por apertura.",
          cardTitle: "Apertura Exclusiva",
          cardSubtitle: "Beneficio para Nuevos Clientes",
          cardStamp: "PROMO ESPECIAL",
          cardItems: [
            "15% Descuento en tu primer tratamiento",
            "Valoración dermoestética digital 3D incluida",
            "Aplicable en Exosomas o Bioestimuladores",
            "Sede nueva Mixy Mall Los Colores"
          ],
          btnBook: "Agendar Cita de Valoración",
          btnAdvisor: "Consultar Asesoría con IA"
        },
        {
          badge: "Sede de Excelencia • Tecnología de Brasil",
          title: "RIGOR CIENTÍFICO",
          subtitle: "Rigor Científico y Armonía",
          tagline: "MEDICINA REGENERATIVA",
          desc: "Inauguramos en Los Colores la primera sede de expansión en Colombia. Una propuesta de medicina de alta gama combinada con protocolos exclusivos de dermoestética brasilera y equipamiento avanzado de primer nivel."
        }
      ]
    },
    about: {
      tag: "NUESTRA ESENCIA",
      title: "Sobre ONE CLINIC",
      sub: "Conoce la filosofía, origen y el equipo que definen el nuevo estándar de la medicina estética dermoepidérmica.",
      whoTitle: "QUIÉNES SOMOS",
      whoSubtitle: "ONE CLINIC nace de la unión entre ciencia estética dermoepidérmica, elegancia minimalista y refinamiento sutil.",
      whoP1: "Creada bajo la filosofía superior \"Estética Avanzada\" y pensada para brindar la más alta sofisticación, ONE CLINIC surge con el firme propósito de transformar el cuidado estético y regenerativo en una experiencia moderna, elegante y profundamente respetuosa de la fisonomía individual.",
      whoP2: "Creemos que el cuidado personal no debe sentirse distante ni exclusivo. Por eso desarrollamos un modelo de clínica que combina tecnología, protocolos modernos, atención cercana y resultados naturales, pensado para personas reales y estilos de vida actuales.",
      accreditation: "Habilitación Seccional Salud Antioquia",
      philosophyTitle: "FILOSOFÍA DERMOESTÉTICA",
      philosophyHighlight: "Preservamos la expresividad celular e identidad natural.",
      philosophyP1: "Creemos que existe un único balance ideal para ti: aquel en el que tu piel irradia luz y frescura sin perder jamás la esencia de tu personalidad. Nuestro enfoque prescinde de excesos para concentrarse únicamente en lo esencial.",
      philosophyP2: "Estética Avanzada es la consolidación de terapias regenerativas y aparatología no invasiva de vanguardia, respaldada por la prestigiosa tecnología y escuela estética de Brasil, traída directamente de la mano de nuestros cofundadores de origen brasilero.",
      ctaBook: "Agendar Valoración Sin Costo",
      teamTitle: "Dirección Científica y de Excelencia",
      founderTitle: "Cofundador & Director Médico",
      doctorBio: "Médico cirujano especialista en medicina estética regenerativa y dermoestética avanzada. Formado en instituciones de excelencia internacional de Brasil y Europa. Miembro activo de la Sociedad de Medicina Estética y pionero en la introducción de protocolos de bioestimulación molecular en Colombia.",
      pillarsTitle: "Valores Clínicos que nos Guían",
      securityTitle: "Seguridad Sin Concesiones",
      securityDesc: "Instalaciones de primer nivel, tecnología 3D de escuela brasilera y productos originales certificados de prestigio mundial.",
      regulations: "Habilitados bajo la reglamentación del Ministerio de Salud de Colombia. Consultorios avalados. Mixy Mall Los Colores, Sede de Excelencia Primera Unidad.",
    },
    catalog: {
      title: "Catálogo de Tratamientos",
      searchPlaceholder: "Buscar tratamiento por nombre o beneficio...",
      filterTodos: "Todos los tratamientos",
      filterFacial: "Faciales",
      filterCorporal: "Corporales",
      noResults: "No encontramos tratamientos para esa búsqueda. Intenta consultando otra palabra clave o pregúntale a nuestra Dra. Sofía de Inteligencia Artificial.",
      detailTitle: "Especificaciones Clínicas",
      benefitsTitle: "Beneficios esperados",
      duration: "Duración sesión",
      price: "Inversión estándar",
    },
    booking: {
      tag: "Sede Mixy Mall Los Colores, Medellín",
      title: "Sistema de Reserva de Citas",
      subtitle: "Planifica tu sesión de valoración o tratamiento de forma inmediata y automática con confirmación en tiempo real.",
      step1: "1. Datos Básicos",
      step2: "2. Seleccionar Sesión",
      step3: "3. Fecha y Hora",
      labelName: "Nombre completo",
      labelEmail: "Correo electrónico dermo-estratificado",
      labelPhone: "Teléfono de contacto móvil",
      labelCategory: "Tipo de Tratamiento",
      labelCategoryFacial: "Tratamiento Facial (Regenerativo & Antiedad)",
      labelCategoryCorporal: "Tratamiento Corporal (Armonización, Reticulación, Moldeado)",
      labelTreatmentSelect: "Selecciona el Protocolo Clínico",
      labelTreatmentPlaceholder: "-- Elige un tratamiento --",
      labelDate: "Fecha de atención sugerida",
      labelTime: "Hora disponible en Los Colores (Medellín)",
      labelNotes: "Notas, alergias o condiciones previas relevantes (Opcional)",
      labelNotesPlaceholder: "Escribe cualquier duda o condición específica de tu piel aquí...",
      btnPrev: "Fase Anterior",
      btnNext: "Siguiente Fase",
      btnSubmit: "Confirmar Reserva de Cita",
      recentTitle: "Tus Citas Programadas Recientemente",
      noBookings: "Aún no tienes citas agendadas en esta sesión. Completa el formulario de arriba para programar.",
      successTitle: "¡Cita Confirmada con Éxito!",
      successDesc: "Hemos registrado tu turno clínico en nuestro sistema de agenda en tiempo real. Un asesor de la sede de Los Colores se pondrá en contacto contigo vía WhatsApp para formalizar los últimos detalles.",
      code: "Código de Cita",
      state: "Estado: Confirmada (Sede Los Colores)",
    },
    advisor: {
      title: "Asesoría Clínica con Inteligencia Artificial",
      subtitle: "Consulta en segundos con nuestra Dra. Sofía, asesora interactiva experta, para descubrir los protocolos regenerativos de escuela brasilera que mejor se adaptan a tus objetivos estéticos.",
      advisorName: "Dra. Sofía",
      advisorRole: "Asesora Científica Dermoestética",
      welcome: "¡Hola! Un placer saludarte. Soy la Dra. Sofía, asesora dermoestética e investigadora en NATÍVA CLINIC, sede Mixy Mall Los Colores, Medellín.\n\nMi propósito es guiarte con rigor científico de forma cercana y empática a encontrar los protocolos de estética regenerativa idóneos para ti, respetando la expresividad e identidad de tu rostro y cuerpo.\n\nDime, ¿cuáles son tus objetivos estéticos actuales? ¿Te gustaría mejorar la elasticidad de tu piel, suavizar líneas gestuales, unificar el tono de tu rostro, o moldear tu silueta?",
      inputPlaceholder: "Pregúntale a la Dra. Sofía... (Ej: ¿Cómo tratar manchas solares?)",
      quickTitle: "Inquietudes frecuentes de pacientes",
      quickPrompts: [
        { text: "Tengo arrugas en la frente y entrecejo, ¿qué me recomiendan?", label: "Arrugas faciales" },
        { text: "Busco levantar y tonificar mis glúteos de forma natural.", label: "Tratamiento de Glúteos" },
        { text: "Quiero recuperar la firmeza facial y combatir la flacidez.", label: "Firmeza y Colágeno" },
        { text: "Me interesa tratar manchas oscuras y unificar el tono.", label: "Manchas y Melasma" },
        { text: "Busco disolver grasa en papada para perfilar mi rostro.", label: "Perfilación de Papada" }
      ],
      connError: "Conexión inestable. Dra. Sofía de NATÍVA se encuentra offline.",
      fallbackResponse: "¡Hola! Te pido una disculpa, en este instante estamos presentando una congestión técnica en nuestro servidor inteligente de consulta. No te preocupes: puedes ver nuestra gama de tratamientos estelares (Exosomas Celulares, Toxina Botulínica, Bioestimuladores, BioGlúteos) en la pestaña 'Tratamientos' o agendar directamente tu valoración médica gratuita en 'Agendar Cita' para que nuestro grupo de expertos evalúe tu caso en Medellín.",
      badgeOnline: "Activa • Científicamente avalada",
      btnQuickBook: "Agendar {name} Ahora",
    }
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      treatments: "Treatments",
      book: "Book Appointment",
      advisor: "AI Advisor",
      mobileAdvisor: "AI Advisor (Dr. Sofia)",
      courtesy: "Free Assessment",
      location: "Medellín • Mixy Mall Los Colores",
    },
    common: {
      duration: "Duration",
      price: "Approx. Price",
      benefits: "Key Benefits",
      back: "Back",
      close: "Close",
      bookNow: "Book Now",
      loading: "Loading...",
      success: "Success!",
      addressLabel: "Medellín Location",
      addressDetails: "Calle 53 #73-45, Mixy Mall Los Colores • Local 303 (Sede de Excelencia)",
      instagram: "Instagram",
      whatsapp: "Medical WhatsApp",
      protection: "Personal Data Protection (Colombia)",
      rights: "© 2026 ONE CLINIC • Advanced Aesthetics. All rights reserved.",
    },
    hero: {
      galleryTitle: "EXCLUSIVE CLINICAL GALLERY",
      gallerySubtitle: "Center of Excellence & Science",
      galleryDesc: "At ONE CLINIC, every detail is crafted to captivate and inspire. Visually explore our premium medical suites, advanced Brazilian-school dermoaesthetic tech, and state-of-the-art molecular therapies.",
      galleryCategoryTodos: "All",
      galleryCategoryTratamientos: "Treatments",
      galleryCategoryInstalaciones: "Facilities",
      galleryCategoryTecnologia: "Technology",
      maximize: "Maximize image",
      pauseAuto: "Pause automatic transitions",
      resumeAuto: "Resume automatic transitions (14s)",
      pillars: {
        natural: {
          title: "NATURAL",
          desc: "Subtle results that enhance the innate traits of your face and body, meticulously avoiding overcorrection."
        },
        regenerativa: {
          title: "REGENERATIVE",
          desc: "Cellular science designed to reprogram tissue rejuvenation, triggering autologous collagen."
        },
        ciencia: {
          title: "SCIENCE",
          desc: "Medical and dermoaesthetic protocols certified under the highest level of clinical-scientific evidence."
        },
        latina: {
          title: "LATIN IDENTITY",
          desc: "Treatments custom-tailored to the specific skin types and climatological needs of Latin American skins."
        }
      },
      mainTreatments: {
        title: "Star Treatments",
        exosomas: "Cellular Exosomes",
        exosomasTag: "Star facial regenerative treatment",
        toxina: "Botulinum Toxin",
        toxinaTag: "Natural expressive smoothness",
        bioestimuladores: "Support Biostimulators",
        bioestimuladoresTag: "Progressive firmness and density",
        biogluteos: "Premium BioGluteus",
        biogluteosTag: "Body projection and lift"
      },
      galleryItems: {
        1: {
          title: " VIP Clinical Suites Los Colores",
          desc: "Individualized therapy cabinets with adaptive circadian lighting, organic aromatherapy, and heated ergonomic beds ensuring deep relaxation and absolute privacy.",
          tag: "Premium Experience"
        },
        2: {
          title: "Waiting Lounge & Antioxidant Bar",
          desc: "Enjoy mocktails of white tea, chlorophyll, and cold-pressed healing juices custom-designed under nutritional guidance in our comfortable sensory living room.",
          tag: "Wellness Design"
        },
        3: {
          title: "3D Multispectral Diagnostic Scan",
          desc: "Advanced dermal analysis studying with millimetric detail the deep melanin pigmentation, pore structure, erythema, and fine lines before treatment begins.",
          tag: "Medical Tech"
        },
        4: {
          title: "Intradermal Molecular Nutrient Therapy",
          desc: "Direct biostimulation protocol injecting patented nutrients, essential amino acids, and autologous collagen boosters to restore dermal volume.",
          tag: "Deep Nutrition"
        },
        5: {
          title: "Pure Clinical Exosomes Protocol",
          desc: "State-of-the-art biotherapeutic treatment for active tissue regeneration of the face, accelerating cellular recovery from sun harm and skin laxity.",
          tag: "Bioregenerative Medicine"
        },
        6: {
          title: "Smart Electromagnetic Muscle Sculpting",
          desc: "Non-invasive sessions stimulating continuous supra-maximal contractions. Designed to rapidly tone and redefine contours of abdomen, thighs, or buttocks.",
          tag: "Muscle Contour"
        }
      },
      slides: [
        {
          badge: "Mixy Mall Los Colores Sede • Medellín",
          title: "ONE CLINIC",
          subtitle: "Advanced Aesthetics",
          tagline: "LATIN AMERICAN IDENTITY",
          desc: "Discover high-end aesthetic medicine in Medellín. Cellular science and innovation to harmonize your skin safely with absolute elegance.",
          cardTitle: "Los Colores Branch",
          cardSubtitle: "Wellness Sensory Experience",
          cardStamp: "EXCLUSIVITY",
          cardItems: [
            "Clinical suites with maximum soundproofing",
            "Absolute discretion and customized service",
            "Private parking inside Mixy Mall Los Colores",
            "Sandalwood aromatherapy and curated music"
          ],
          btnBook: "Schedule Assessment Appointment",
          btnAdvisor: "Consult with AI Advisor"
        },
        {
          badge: "Opening Special • Limited Time",
          title: "OPENING PROMO",
          subtitle: "15% Off Welcome Benefit",
          tagline: "INAUGURATION BENEFIT",
          desc: "Enjoy a 15% complimentary reward by booking your first Exosomes regenerative session, plus a free clinical 3D facial diagnosis scan during our grand opening.",
          cardTitle: "Exclusive Opening",
          cardSubtitle: "New Client Welcome Reward",
          cardStamp: "SPECIAL PROMO",
          cardItems: [
            "15% Discount on your first facial session",
            "Digital 3D dermoaesthetic assessment included",
            "Applicable on Exosomes or Collagen Sculpting",
            "Brand new Mixy Mall Los Colores branch"
          ],
          btnBook: "Schedule Assessment Appointment",
          btnAdvisor: "Consult with AI Advisor"
        },
        {
          badge: "Sede of Excellence • Brazil Technology",
          title: "SCIENTIFIC RIGOR",
          subtitle: "Scientific Rigor & Harmony",
          tagline: "REGENERATIVE MEDICINE",
          desc: "We inaugurate our very first expansion branch in Colombia at Los Colores. A high-end medicine concept combined with exclusive Brazilian dermoaesthetic protocols and advanced first-class equipment."
        }
      ]
    },
    about: {
      tag: "OUR ESSENCE",
      title: "About ONE CLINIC",
      sub: "Explore our clinical philosophy, origin, and the medical team setting the new standard in dermoepidermal aesthetic medicine.",
      whoTitle: "WHO WE ARE",
      whoSubtitle: "ONE CLINIC is born of the fusion between dermoepidermal science, minimalist elegance, and subtle refinement.",
      whoP1: "Created under the superior concept of \"Advanced Aesthetics\" and designed to deliver the highest sophistication, ONE CLINIC arises with the firm purpose of transforming dermoaesthetic and cellular care into a modern, gentle, and deeply respectful sensory journey.",
      whoP2: "We believe that premium self-care should feel welcoming and natural. Thus, we developed a medical model combining advanced technology, modern molecular protocols, close attention, and beautifully subtle, authentic results.",
      accreditation: "Antioquia Sectional Health Approval",
      philosophyTitle: "DERMOAESTHETIC PHILOSOPHY",
      philosophyHighlight: "Preserving cellular expression and natural identity.",
      philosophyP1: "We believe there is only one perfect balance for you: the one where your skin radiates natural light and freshness without losing an ounce of your unique personality.",
      philosophyP2: "Advanced Aesthetics is the consolidation of regenerative therapies and non-invasive state-of-the-art equipment, backed by the prestigious technology and aesthetic school of Brazil, brought directly by our Brazilian co-founders.",
      ctaBook: "Book Free Medical Assessment",
      teamTitle: "Scientific & Excellence Direction",
      founderTitle: "Co-Founder & Medical Director",
      doctorBio: "Surgeon specializing in regenerative aesthetic medicine and advanced dermoaesthetics. Trained in top European and Brazilian medical institutions. Appointed member of the Aesthetic Medicine Board, pioneering molecular biostimulation workflows in Colombia.",
      pillarsTitle: "Clinical Values Guiding Us",
      securityTitle: "Uncompromising Safety",
      securityDesc: "First-tier clinical suites, 3D technology from the Brazilian aesthetic school, and certified, premium global-standard organic products.",
      regulations: "Authorized under Colombia Ministry of Health regulations. Approved medical office. Mixy Mall Los Colores, Center of Excellence First Sede.",
    },
    catalog: {
      title: "Treatments Catalog",
      searchPlaceholder: "Search treatment by name or benefit...",
      filterTodos: "All Treatments",
      filterFacial: "Facial Treatments",
      filterCorporal: "Body Treatments",
      noResults: "We couldn't find treatments matching your search. Try another word or query Dr. Sofia, our AI specialist.",
      detailTitle: "Clinical Specifications",
      benefitsTitle: "Expected Benefits",
      duration: "Session Duration",
      price: "Standard Investment",
    },
    booking: {
      tag: "Mixy Mall Los Colores Sede, Medellín",
      title: "Appointment Booking System",
      subtitle: "Plan your assessment session or treatment instantly with our real-time clinic scheduling system.",
      step1: "1. Basic Info",
      step2: "2. Choose Session",
      step3: "3. Date & Time",
      labelName: "Full Name",
      labelEmail: "Certified E-mail Address",
      labelPhone: "Mobile Contact Phone Number",
      labelCategory: "Type of Treatment Area",
      labelCategoryFacial: "Facial Treatment (Regenerative & Anti-aging)",
      labelCategoryCorporal: "Body Treatment (Contour, Lift, Cellulite)",
      labelTreatmentSelect: "Choose Your Clinical Protocol",
      labelTreatmentPlaceholder: "-- Choose a treatment --",
      labelDate: "Preferred Appointment Date",
      labelTime: "Available Slots at Los Colores (Medellín)",
      labelNotes: "Details, allergies or relevant prior conditions (Optional)",
      labelNotesPlaceholder: "Write down any relevant skin history or questions here...",
      btnPrev: "Previous Phase",
      btnNext: "Next Phase",
      btnSubmit: "Confirm Appointment Booking",
      recentTitle: "Recently Booked Appointments",
      noBookings: "No appointments booked in this session yet. Complete the form above to schedule.",
      successTitle: "Appointment Confirmed Successfully!",
      successDesc: "Your clinical session has been booked. A representative from our Los Colores branch will contact you shortly via WhatsApp to finalize instructions.",
      code: "Booking Code",
      state: "Status: Confirmed (Los Colores Branch)",
    },
    advisor: {
      title: "Clinical AI Advisor Consult",
      subtitle: "Consult in seconds with Dr. Sofia, our interactive medical expert, to discover Brazilian-school dermoepidemal protocols designed for your personal objectives.",
      advisorName: "Dr. Sofia",
      advisorRole: "Dermoaesthetic Scientific Advisor",
      welcome: "Hello! A pleasure to greet you. I am Dr. Sofia, dermoaesthetic advisor and researcher at ONE CLINIC, Mixy Mall Los Colores campus in Medellín.\n\nMy purpose is to guide you with scientific rigor in a warm, empathetic way, finding the regenerative aesthetic protocols perfect for you, respecting the expressions and natural identity of your face and body.\n\nTell me, what are your aesthetic goals? Would you like to improve skin elasticity, smooth facial lines, unify complexion, or sculpt contour?",
      inputPlaceholder: "Ask Dr. Sofia... (e.g. How to treat dark spots?)",
      quickTitle: "Frequently Asked Questions",
      quickPrompts: [
        { text: "I have wrinkles on my forehead and frown lines, what do you recommend?", label: "Facial Wrinkles" },
        { text: "I want to lift and tone my glutes naturally.", label: "Glutes Treatment" },
        { text: "I need to restore facial tightness and fight skin laxity.", label: "Firmness & Collagen" },
        { text: "I am interested in treating dark spots and evening skin tone.", label: "Spots & Melasma" },
        { text: "I want to dissolve double chin fat to define my jawline.", label: "Double Chin Sculpt" }
      ],
      connError: "Network unstable. Dr. Sofia is currently offline.",
      fallbackResponse: "Hello! My apologies, we are experiencing a heavy load on our intelligent consulting server. You are welcome to browse our star treatment catalog (Cellular Exosomes, Botox, Biostimulators, BioGluteus) in the 'Treatments' tab or book a complimentary medical assessment in the 'Book Appointment' section.",
      badgeOnline: "Active • Scientifically Approved",
      btnQuickBook: "Book {name} Now",
    }
  },
  pt: {
    nav: {
      home: "Início",
      about: "Quem Somos",
      treatments: "Tratamentos",
      book: "Agendar Consulta",
      advisor: "Consultório IA",
      mobileAdvisor: "Consultório IA (Dra. Sofia)",
      courtesy: "Avaliação Cortesia",
      location: "Medellín • Mixy Mall Los Colores",
    },
    common: {
      duration: "Duração",
      price: "Preço aproximado",
      benefits: "Benefícios principais",
      back: "Voltar",
      close: "Fechar",
      bookNow: "Reservar Agora",
      loading: "Carregando...",
      success: "Sucesso!",
      addressLabel: "Localização Medellín",
      addressDetails: "Calle 53 #73-45, Mixy Mall Los Colores • Local 303 (Sede de Excelência)",
      instagram: "Instagram",
      whatsapp: "WhatsApp Médico",
      protection: "Proteção de Dados Pessoais (Colômbia)",
      rights: "© 2026 ONE CLINIC • Estética Avançada. Todos os direitos reservados.",
    },
    hero: {
      galleryTitle: "GALERIA CLÍNICA EXCLUSIVA",
      gallerySubtitle: "Instalações de Excelência & Ciência",
      galleryDesc: "Na ONE CLINIC cada detalhe é desenhado para cativar e inspirar. Explore visualmente nossas suítes de atendimento premium, tecnologias dermoestéticas de escola brasileira e terapias moleculares de vanguarda.",
      galleryCategoryTodos: "Todos",
      galleryCategoryTratamientos: "Tratamentos",
      galleryCategoryInstalaciones: "Instalações",
      galleryCategoryTecnologia: "Tecnologia",
      maximize: "Maximizar imagem",
      pauseAuto: "Pausar transição automática",
      resumeAuto: "Retomar transição automática (14s)",
      pillars: {
        natural: {
          title: "NATURAL",
          desc: "Resultados sutis que realçam os traços inatos do seu rosto e corpo, evitando de forma absoluta sobrecorreções."
        },
        regenerativa: {
          title: "REGENERATIVA",
          desc: "Ciência celular que reprograma o rejuvenescimento tecidual, estimulando a síntese de colágeno autólogo."
        },
        ciencia: {
          title: "CIÊNCIA",
          desc: "Protocolos médicos e dermoestéticos certificados segundo o mais rigoroso nível de evidência clínico-científica."
        },
        latina: {
          title: "IDENTIDADE LATINA",
          desc: "Tratamentos desenhados sob medida para os fotótipos e necessidades climáticas específicas das peles latino-americanas."
        }
      },
      mainTreatments: {
        title: "Tratamentos Estrela",
        exosomas: "Exossomas Celulares",
        exosomasTag: "Tratamento facial regenerador supremo",
        toxina: "Toxina Botulínica",
        toxinaTag: "Suavidade expressiva e natural",
        bioestimuladores: "Bioestimuladores de Suporte",
        bioestimuladoresTag: "Firmeza e densidade progressiva",
        biogluteos: "BioGlúteos Premium",
        biogluteosTag: "Projeção e realce corporal"
      },
      galleryItems: {
        1: {
          title: "Suítes de Atendimento VIP Los Colores",
          desc: "Cabines de terapia individualizadas com iluminação circadiana adaptativa, aromaterapia orgânica e macas ergonômicas aquecidas que garantem relaxamento profundo e privacidade absoluta.",
          tag: "Experiência Premium"
        },
        2: {
          title: "Lounge de Espera & Bar de Antioxidantes",
          desc: "Desfrute de infusões de chá branco, clorofila e sucos rejuvenescedores prensados a frio, desenvolvidos com supervisão de nossa equipe de nutrição clínica.",
          tag: "Design Wellness"
        },
        3: {
          title: "Diagnóstico Multiespectral Tridimensional 3D",
          desc: "Análise dérmica avançada que quantifica com precisão milimétrica a pigmentação melânica profunda, diâmetro dos poros, eritemas e linhas de expressão.",
          tag: "Tecnologia Médica"
        },
        4: {
          title: "Injeção Intradérmica Molecular de Nutrientes",
          desc: "Protocolo de bioestimulação direta que introduz nutrientes patenteados, aminoácidos fundamentais e estimuladores de colágeno natural para repor o volume.",
          tag: "Nutrição Profunda"
        },
        5: {
          title: "Aplicação de Exossomas Clínicos Puros",
          desc: "Terapia bioterapêutica de vanguarda no estímulo regenerativo celular do rosto, agilizando o resgate da pele de sequelas físicas ou envelhecimento solar.",
          tag: "Medicina Bioregenerativa"
        },
        6: {
          title: "Remodelação Muscular Eletromagnética Inteligente",
          desc: "Sessões não invasivas indutoras de contrações musculares supra-máximas sustentadas. Tonificação de abdômen, glúteos ou pernas aceleradamente.",
          tag: "Contorno Muscular"
        }
      },
      slides: [
        {
          badge: "Sede Mixy Mall Los Colores • Medellín",
          title: "ONE CLINIC",
          subtitle: "Estética Avançada",
          tagline: "IDENTIDADE LATINO-AMERICANA",
          desc: "Descubra a medicina estética de alto padrão em Medellín. Ciência e inovação celular para harmonizar sua pele com segurança absoluta.",
          cardTitle: "Sede Los Colores",
          cardSubtitle: "Experiência Sensorial Wellness",
          cardStamp: "EXCLUSIVIDADE",
          cardItems: [
            "Suítes dermoestéticas com isolamento acústico",
            "Discrição absoluta e atendimento personalizado",
            "Estacionamento privado no Mixy Mall Los Colores",
            "Aromaterapia de sândalo e música curada"
          ],
          btnBook: "Agendar Consulta de Avaliação",
          btnAdvisor: "Falar com Consultor IA"
        },
        {
          badge: "Inauguração Los Colores • Tempo Limitado",
          title: "PROMO DE INAUGURAÇÃO",
          subtitle: "15% Off de Boas-vindas",
          tagline: "BENEFÍCIO DE INAUGURAÇÃO",
          desc: "Receba 15% de cortesia ao agendar qualquer tratamento de Exossomas facial, mais um diagnóstico clínico facial 3D computadorizado sem custo.",
          cardTitle: "Abertura Exclusiva",
          cardSubtitle: "Boas-vindas para Novos Pacientes",
          cardStamp: "PROMO ESPECIAL",
          cardItems: [
            "15% Desconto na sua primeira sessão",
            "Avaliação digital 3D multispectral inclusa",
            "Válido para Exossomas ou Bioestimuladores",
            "Nova unidade de excelência Los Colores"
          ],
          btnBook: "Agendar Consulta de Avaliação",
          btnAdvisor: "Falar com Consultor IA"
        },
        {
          badge: "Sede de Excelência • Tecnologia do Brasil",
          title: "RIGOR CIENTÍFICO",
          subtitle: "Rigor Científico & Harmonia",
          tagline: "MEDICINA REGENERATIVA",
          desc: "Apresentamos em Los Colores a primeira clínica da expansão na Colômbia. Uma proposta médica de luxo integrada com protocolos exclusivos de dermoestética brasileira e tecnologia avançada."
        }
      ]
    },
    about: {
      tag: "NOSSSA ESSÊNCIA",
      title: "Sobre a ONE CLINIC",
      sub: "Conheça a filosofia dermoestética, as origens brasileiras e o time médico que lidera o novo padrão global em longevidade cutânea.",
      whoTitle: "QUEM SOMOS",
      whoSubtitle: "A ONE CLINIC nasce da união de ciência celular regenerativa, dermoestética, minimalismo sofisticado e refinamento sutil.",
      whoP1: "Formada sobre preceitos da excelência em \"Estética Avançada\", a ONE CLINIC surge do ideal de redefinir o cuidado antienvelhecimento, tornando os agendamentos corporais e faciais uma profunda experiência sensorial voltada à naturalidade individual.",
      whoP2: "Entendemos que os cuidados médicos premium devem ser calorosos. Por isso unimos tecnologia moderna de ponta, consultores médicos acessíveis e resultados harmônicos que acentuam o orgulho de pertencer à sua própria pele.",
      accreditation: "Habilitação Seccional de Saúde de Antioquia",
      philosophyTitle: "FILOSOFIA DERMOESTÉTICA",
      philosophyHighlight: "Protegendo a expressão celular e a beleza real.",
      philosophyP1: "Defendemos o equilíbrio singular: aquele no qual seu rosto e corpo irradiam frescor e brilho saudáveis, sem nunca alterar os traços estruturais da sua herança ou identidade.",
      philosophyP2: "Estética Avançada é a união perfeita de soluções biotecnológicas aliada aos protocolos estéticos exclusivos desenvolvidos no Brasil, trazidos pessoalmente à Colômbia pelos nossos cofundadores brasileiros.",
      ctaBook: "Solicitar Consulta de Cortesia",
      teamTitle: "Direção Geral & Responsabilidade Médica",
      founderTitle: "Cofundador & Líder Médico",
      doctorBio: "Médico cirurgião especialista em medicina regenerativa corporal e facial avançada, titulado com as maiores honrarias científicas na Europa e Brasil. Membro ativo de colegiados mundiais, pioneiro na introdução de terapias moleculares inovadoras na Colômbia.",
      pillarsTitle: "Princípios Clínicos de Suporte",
      securityTitle: "Segurança Absoluta",
      securityDesc: "Ambientes projetados de alto requinte clínico, fotodiagnóstico e dermoestética 3D importada do Brasil e cosméticos certificados.",
      regulations: "Licenciados pelo Ministério da Saúde colombiano. Consultórios formalizados no Mixy Mall Los Colores, Unidade Primária de Referência.",
    },
    catalog: {
      title: "Catálogo de Tratamentos",
      searchPlaceholder: "Pesquisar por nome do tratamento ou benefício...",
      filterTodos: "Todos os Tratamentos",
      filterFacial: "Estética Facial",
      filterCorporal: "Estética Corporal",
      noResults: "Não localizamos opções com este nome. Tente buscar um termo complementar ou conserte com nossa Dra. Sofia, a assessora inteligente.",
      detailTitle: "Ficha Médica de Protocolo",
      benefitsTitle: "Benefícios Clínicos Estimados",
      duration: "Tempo de sessão",
      price: "Faixa de Investimento",
    },
    booking: {
      tag: "Sede Mixy Mall Los Colores, Medellín",
      title: "Agendamento Inteligente",
      subtitle: "Programe sua consulta de avaliação imediata com o exclusivo sistema integrado de vagas digitais em tempo real.",
      step1: "1. Identificação",
      step2: "2. Selecionar Sessão",
      step3: "3. Agenda & Horários",
      labelName: "Nome completo do paciente",
      labelEmail: "E-mail de cadastro principal",
      labelPhone: "Telefone de contato WhatsApp",
      labelCategory: "Tipo de Protocolo Procurado",
      labelCategoryFacial: "Estética Facial (Revitalização, Regenerativo & Bioestimulado)",
      labelCategoryCorporal: "Estética Corporal (Contornos, Realces, Firmeza Muscular)",
      labelTreatmentSelect: "Selecione o Tratamento Específico",
      labelTreatmentPlaceholder: "-- Selecione uma opção --",
      labelDate: "Data de agendamento sugerida",
      labelTime: "Horários Disponíveis em Los Colores (Medellín)",
      labelNotes: "Notas, alergias cutâneas ou particularidades clínicas (Opcional)",
      labelNotesPlaceholder: "Registre qualquer dúvida, queixa principal ou histórico de pele aqui...",
      btnPrev: "Etapa Anterior",
      btnNext: "Próxima Etapa",
      btnSubmit: "Confirmar Agendamento de Consulta",
      recentTitle: "Consultas Reservadas nesta Sessão",
      noBookings: "Nenhum histórico agendado ainda. Use o formulário acima para reservar e confirmar.",
      successTitle: "Consulta Confirmada com Sucesso!",
      successDesc: "Sua solicitação foi gravada em nossos servidores de fluxo clínico. Uma equipe da Sede de Los Colores entrará em contato via WhatsApp para detalhes de boas-vindas.",
      code: "Localizador da Cita",
      state: "Status: Confirmado (Unidade Los Colores)",
    },
    advisor: {
      title: "Assessoria Inteligente de Bem-Estar",
      subtitle: "Interaja em instantes com a Dra. Sofia, nossa assessora e pesquisadora de inteligência de pele, esclarecendo procedimentos e soluções de linhagem brasileira.",
      advisorName: "Dra. Sofia",
      advisorRole: "Líder Científica dermoestética",
      welcome: "Olá! É uma imensa alegria falar com você. Sou a Dra. Sofia, médica assessora dermoestética e investigadora acadêmica no campus oficial ONE CLINIC Los Colores, em Medellín.\n\nMeu propósito ético é conduzir suas escolhas com clareza dermo-científica de forma humana e atenta, apontando os percursos ideais de medicina celular para recuperar a saúde de sua fisionomia facial ou corporal.\n\nMe conte: quais são suas metas? Quer suavizar rugas finas, homogeneizar manchas, restaurar a elasticidade ou lapidar seus contornos corporais?",
      inputPlaceholder: "Pergunte à Dra. Sofia... (Ex: Como unificar pele manchada?)",
      quickTitle: "Dúvidas e anseios frequentes",
      quickPrompts: [
        { text: "Tenho rugas na testa e linhas entre as sobrancelhas, o que recomendam?", label: "Rugas Faciais" },
        { text: "Desejo levantar e tonificar a área dos glúteos naturalmente.", label: "Tratamento de Glúteos" },
        { text: "Busco mitigar flacidez mandibular e redefinir contorno cutâneo.", label: "Firmeza & Colágeno" },
        { text: "Tenho melasma e manchas resistentes, como clarear?", label: "Manchas & Melasma" },
        { text: "Como compactar gordura para esculpir contorno de papada?", label: "Perfilamento de Papada" }
      ],
      connError: "Transmissão instável. Dra. Sofia está desconectada no momento.",
      fallbackResponse: "Olá! Peço sinceras desculpas, nosso processador interativo está sob alto volume de requisições. Sinta-se confortável para verificar a lista de serviços excepcionais na guia 'Tratamentos' ou agendar uma avaliação gratuita diretamente na agenda clínica localizada em nosso menu.",
      badgeOnline: "Disponível • Respaldada Cientificamente",
      btnQuickBook: "Agendar {name} Agora",
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem("oneclinic_lang");
      if (saved === "es" || saved === "en" || saved === "pt") {
        return saved;
      }
    } catch (e) {}
    return "es";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("oneclinic_lang", lang);
    } catch (e) {}
  };

  const t = (keyPath: string): any => {
    const keys = keyPath.split(".");
    
    // Attempt local language
    let current: any = dictionary[language];
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        current = null;
        break;
      }
    }

    if (current !== null && current !== undefined) {
      return current;
    }

    // Fallback to Spanish
    let fallback: any = dictionary["es"];
    for (const key of keys) {
      if (fallback && fallback[key] !== undefined) {
        fallback = fallback[key];
      } else {
        fallback = null;
        break;
      }
    }

    return fallback !== null && fallback !== undefined ? fallback : keyPath;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
