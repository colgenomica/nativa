import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, Clock, ShieldCheck, Sparkles, Phone, Award, Users, Target, Compass, Eye, Image as ImageIcon, Sparkle, Maximize2, X, Leaf, Palette, ChevronLeft, ChevronRight, Pause, Play, Dna, Atom, Microscope, Calendar, Heart, Smile, Droplets, Gift, Shield } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// Import local image assets for correct bundling in production
import lobbyOneClinicImg from "../assets/images/lobby_oneclinic_reception_1780192551376.png";
import suiteOneClinicImg from "../assets/images/suite_oneclinic_1780193126468.png";
import therapyOneClinicImg from "../assets/images/therapy_oneclinic_1780193142249.png";
import glowingSkinSkincareImg from "../assets/images/glowing_skin_skincare_1779648705733.png";

interface HomeHeroProps {
  onNavigate: (tab: string) => void;
  onSelectTreatment: (id: string) => void;
}

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Suites de Atención VIP Los Colores",
    category: "instalaciones",
    desc: "Cabinas de terapia individualizadas con iluminación circadiana adaptativa, aromaterapia orgánica y camillas ergonómicas climatizadas que garantizan una relajación profunda y absoluta privacidad.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000",
    size: "large",
    tag: "Experiencia Premium"
  },
  {
    id: 2,
    title: "Lounge de Espera & Bar de Antioxidantes",
    category: "instalaciones",
    desc: "Disfruta de infusiones de té blanco, clorofila y jugos rejuvenecedores prensados en frío diseñados bajo supervisión nutricional en nuestra confortable sala de estar dermoestética.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800",
    size: "small",
    tag: "Diseño Wellness"
  },
  {
    id: 3,
    title: "Diagnóstico Multiespectral Tridimensional 3D",
    category: "tecnologia",
    desc: "Análisis dérmico avanzado que estudia con precisión milimétrica la pigmentación melánica profunda, nivel de poro dilatado, eritemas y líneas de expresión antes de iniciar el tratamiento.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
    size: "small",
    tag: "Tecnología Médica"
  },
  {
    id: 4,
    title: "Inyección Intradérmica Molecular de Nutrientes",
    category: "tratamientos",
    desc: "Protocolo de bioestimulación directa que introduce nutrientes patentados, aminoácidos esenciales y activadores de colágeno autólogo para reponer el volumen y refrescar la epidermis.",
    image: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800",
    size: "small",
    tag: "Nutrición Profunda"
  },
  {
    id: 5,
    title: "Aplicación de Exosomas Clínicos Puros",
    category: "tratamientos",
    desc: "Terapia bioterapéutica de última generación para la regeneración tisular activa del rostro, acelerando la curación celular de secuelas, marcas solares y laxitud cutánea.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800",
    size: "small",
    tag: "Medicina Bioregenerativa"
  },
  {
    id: 6,
    title: "Remodelación Muscular Electromagnética Inteligente",
    category: "tecnologia",
    desc: "Sesiones no invasivas estimuladoras de contracciones supra-máximas continuas. Ayudan a tonificar y redefinir los contornos en abdomen, muslos o glúteos aceleradamente.",
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=1000",
    size: "large",
    tag: "Contorno Muscular"
  }
];

// Carousel slides with premium aesthetic assets, promotion details, and unique layouts
const CAROUSEL_SLIDES = [
  {
    image: lobbyOneClinicImg,
    alt: "Recepción ONE CLINIC",
    badge: "Sede Mixy Mall Los Colores • Medellín",
    title: "ONE CLINIC",
    subtitle: "Estética Avanzada",
    p1: "NATURAL",
    p2: "REGENERATIVA",
    p3: "CIENCIA",
    tagline: "IDENTIDAD LATINOAMERICANA",
    desc: "Descubre la medicina estética de alta gama en Medellín. Ciencia e innovación celular para armonizar tu piel de forma segura.",
    desktopGradient: "bg-gradient-to-r from-[#0d140e]/95 via-[#142217]/85 to-transparent",
    mobileGradient: "bg-gradient-to-t from-[#0d140e]/95 via-[#142217]/85 to-[#0d140e]/45",
    glowColor: "rgba(194, 181, 155, 0.25)",
    layout: "left-card",
    accentTextClass: "text-nativa-gold-warm",
    badgeBorderClass: "border-nativa-gold-warm/40",
    badgeBgClass: "bg-nativa-gold-warm/20",
    cardTitle: "Sede Los Colores",
    cardSubtitle: "Experiencia Sensorial Wellness",
    cardStamp: "EXCLUSIVIDAD",
    cardItems: [
      "Suites clínicas con máxima insonorización",
      "Discreción absoluta y atención personalizada",
      "Parqueadero privado en Mixy Mall Los Colores",
      "Aromaterapia de sándalo y música curada"
    ]
  },
  {
    image: therapyOneClinicImg,
    alt: "Promoción de Apertura ONE CLINIC",
    badge: "Inauguración Los Colores • Tiempo Limitado",
    title: "PROMO APERTURA",
    subtitle: "15% Off de Bienvenida",
    p1: "15% DE CORTESÍA",
    p2: "RITUAL SHINE",
    p3: "DIAGNÓSTICO 3D",
    tagline: "BENEFICIO DE INAUGURACIÓN",
    desc: "Disfruta un 15% de cortesía interactiva reservando tu primer tratamiento regenerativo de Exosomas, más un diagnóstico facial 3D clínico sin costo por apertura.",
    desktopGradient: "bg-gradient-to-l from-[#1a140f]/95 via-[#2b2014]/85 to-transparent", // Inversión del gradiente para flujo visual
    mobileGradient: "bg-gradient-to-t from-[#1a140f]/95 via-[#2b2014]/85 to-[#1a140f]/45",
    glowColor: "rgba(217, 119, 6, 0.25)",
    layout: "right-card", // LAYOUT INVERTIDO (Texto a la derecha, tarjeta a la izquierda)
    accentTextClass: "text-[#D4AF37]",
    badgeBorderClass: "border-[#D4AF37]/40",
    badgeBgClass: "bg-[#D4AF37]/20",
    cardTitle: "Apertura Exclusiva",
    cardSubtitle: "Beneficio para Nuevos Clientes",
    cardStamp: "PROMO ESPECIAL",
    cardItems: [
      "15% Descuento en tu primer tratamiento",
      "Valoración dermoestética digital 3D incluida",
      "Aplicable en Exosomas o Bioestimuladores",
      "Sede nueva Mixy Mall Los Colores"
    ]
  },
  {
    image: therapyOneClinicImg,
    alt: "Sutileza Biorregenerativa ONE CLINIC",
    badge: "Sede de Excelencia • Tecnología de Brasil",
    title: "RIGOR CIENTÍFICO",
    subtitle: "Rigor Científico y Armonía",
    p1: "BRASIL",
    p2: "TECNOLOGÍA AVANZADA",
    p3: "PRIMERA SEDE COLOMBIA",
    tagline: "MEDICINA REGENERATIVA",
    desc: "Inauguramos en Los Colores la primera sede de expansión en Colombia. Una propuesta de medicina de alta gama combinada con protocolos exclusivos de dermoestética brasilera y equipamiento avanzado de primer nivel.",
    desktopGradient: "bg-gradient-to-t from-[#0a0f18]/70 via-[#101926]/20 to-black/30", // Gradiente súper sutil y translúcido para que se vea mucho más la hermosa imagen de fondo
    mobileGradient: "bg-gradient-to-t from-[#0a0f18]/80 via-[#101926]/30 to-[#0a0f18]/25",
    glowColor: "rgba(186, 230, 253, 0.25)",
    layout: "center", // DISEÑO MINIMALISTA CENTRADO (Novedoso y sin tarjeta)
    showButtons: false, // NO MOSTRAR BOTONES DE AGENDAR / ASESOR EN ESTE BANNER
    accentTextClass: "text-[#D4AF37]",
    badgeBorderClass: "border-[#D4AF37]/30",
    badgeBgClass: "bg-[#D4AF37]/10",
    cardTitle: "",
    cardSubtitle: "",
    cardStamp: "",
    cardItems: []
  }
];

export default function HomeHero({ onNavigate, onSelectTreatment }: HomeHeroProps) {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<"todos" | "tratamientos" | "instalaciones" | "tecnologia">("todos");
  
  // Localized Slides Setup
  const localizedSlides = CAROUSEL_SLIDES.map((slide, idx) => ({
    ...slide,
    badge: t(`hero.slides.${idx}.badge`) || slide.badge,
    title: t(`hero.slides.${idx}.title`) || slide.title,
    subtitle: t(`hero.slides.${idx}.subtitle`) || slide.subtitle,
    tagline: t(`hero.slides.${idx}.tagline`) || slide.tagline,
    desc: t(`hero.slides.${idx}.desc`) || slide.desc,
    cardTitle: t(`hero.slides.${idx}.cardTitle`) || slide.cardTitle,
    cardSubtitle: t(`hero.slides.${idx}.cardSubtitle`) || slide.cardSubtitle,
    cardStamp: t(`hero.slides.${idx}.cardStamp`) || slide.cardStamp,
    cardItems: Array.isArray(t(`hero.slides.${idx}.cardItems`)) ? t(`hero.slides.${idx}.cardItems`) : slide.cardItems,
  }));

  // Localized Gallery Setup
  const localizedGalleryItems = GALLERY_ITEMS.map((item) => ({
    ...item,
    title: t(`hero.galleryItems.${item.id}.title`) || item.title,
    desc: t(`hero.galleryItems.${item.id}.desc`) || item.desc,
    tag: t(`hero.galleryItems.${item.id}.tag`) || item.tag,
  }));

  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Shorter 6-second interval for comfortable transitions
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Brand pillars
  const PILLARS = [
    {
      title: t("hero.pillars.natural.title") || "NATURAL",
      desc: t("hero.pillars.natural.desc") || "Resultados sutiles que enaltecen los rasgos innatos de tu rostro y cuerpo, evitando sobrecorrecciones.",
      icon: Leaf
    },
    {
      title: t("hero.pillars.regenerativa.title") || "REGENERATIVA",
      desc: t("hero.pillars.regenerativa.desc") || "Ciencia celular que reprograma el rejuvenecimiento tisular, induciendo colágeno autólogo.",
      icon: Award
    },
    {
      title: t("hero.pillars.ciencia.title") || "CIENCIA",
      desc: t("hero.pillars.ciencia.desc") || "Protocolos médicos y dermoestéticos certificados bajo el más alto nivel de evidencia clínico-científica.",
      icon: ShieldCheck
    },
    {
      title: t("hero.pillars.latina.title") || "IDENTIDAD LATINA",
      desc: t("hero.pillars.latina.desc") || "Tratamientos diseñados a la medida de los fototipos y necesidades específicas de las pieles latinoamericanas.",
      icon: MapPin
    }
  ];

  // Core showcase treatments for direct link
  const MAIN_TREATMENTS = [
    { id: "exosomas", name: t("hero.mainTreatments.exosomas") || "Exosomas Celulares", tag: t("hero.mainTreatments.exosomasTag") || "Regenerativo facial estrella" },
    { id: "toxina", name: t("hero.mainTreatments.toxina") || "Toxina Botulínica", tag: t("hero.mainTreatments.toxinaTag") || "Suavidad expresiva natural" },
    { id: "bioestimuladores", name: t("hero.mainTreatments.bioestimuladores") || "Bioestimuladores de Soporte", tag: t("hero.mainTreatments.bioestimuladoresTag") || "Firmeza y densidad progresiva" },
    { id: "biogluteos", name: t("hero.mainTreatments.biogluteos") || "BioGlúteos Premium", tag: t("hero.mainTreatments.biogluteosTag") || "Proyección y realce corporal" }
  ];

  const currentSlideData = localizedSlides[currentSlide];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-start overflow-hidden rounded-3xl border border-nativa-green-accent/40 shadow-2xl transition-all duration-1000">
        {/* Carousel Background with crossfades */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentSlide === 0 ? (
              <motion.div
                key="custom-split-slide-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full flex flex-col md:flex-row bg-[#080d0a]"
              >
                {/* Left/Center: Skincare model with glowing skin and deep dark-gold overlay gradient */}
                <div className="relative w-full md:w-[62%] h-full overflow-hidden">
                  <img
                    src={glowingSkinSkincareImg}
                    alt="Modelo One Clinic"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.7] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Glowing mask over the model */}
                  <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#080d0a] to-transparent hidden md:block" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#080d0a] to-transparent md:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#080d0a]/70 via-[#080d0a]/20 to-transparent" />
                </div>
                
                {/* Right: Beautiful warm lights reception desk space */}
                <div className="relative w-full md:w-[38%] h-full overflow-hidden hidden md:block">
                  <img
                    src={lobbyOneClinicImg}
                    alt="Lobby Recepcion"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-[0.95]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Smooth split gradient blend */}
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#080d0a] to-transparent" />
                </div>
                
                {/* Dark global vignette and bottom fading card masking */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#080d0a]/40 via-transparent to-[#080d0a]/80" />
              </motion.div>
            ) : currentSlide === 1 ? (
              <motion.div
                key="custom-split-slide-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full flex flex-col md:flex-row bg-[#080706]"
              >
                {/* Left: Background dark gold/neutral element */}
                <div className="relative w-full md:w-[48%] h-full bg-[#080706] hidden md:block">
                  <div className="absolute inset-0 bg-radial-gradient from-[#DFBA73]/5 via-transparent to-transparent opacity-40" />
                </div>
                
                {/* Right: Beautiful treatment image with patient and black gloves */}
                <div className="relative w-full md:w-[52%] h-full overflow-hidden">
                  <img
                    src={therapyOneClinicImg}
                    alt="Tratamiento Apertura"
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Left horizontal gradient to merge the splits beautifully */}
                  <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#080706] to-transparent hidden md:block" />
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#080706] to-transparent md:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#080706]/40 via-transparent to-transparent" />
                </div>
                
                {/* Global vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#080706]/90" />
              </motion.div>
            ) : (
              <motion.img
                key={currentSlide}
                src={CAROUSEL_SLIDES[currentSlide].image}
                alt={CAROUSEL_SLIDES[currentSlide].alt}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1.01 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.65]"
                referrerPolicy="no-referrer"
              />
            )}
          </AnimatePresence>

          {/* Dynamic mood overlay colored per slide to reinforce unique brand identity, only for next slides */}
          <AnimatePresence mode="wait">
            {currentSlide > 1 && (
              <motion.div
                key={`desktop-overlay-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className={`absolute inset-0 hidden md:block ${CAROUSEL_SLIDES[currentSlide].desktopGradient}`}
              />
            )}
          </AnimatePresence>

          {/* Mobile high-visibility overlay only for next slides */}
          <AnimatePresence mode="wait">
            {currentSlide > 1 && (
              <motion.div
                key={`mobile-overlay-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className={`absolute inset-0 md:hidden ${CAROUSEL_SLIDES[currentSlide].mobileGradient}`}
              />
            )}
          </AnimatePresence>
          
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nativa-bg to-transparent"></div>
        </div>

        {/* Content Container: Placed on a responsive 12-column grid */}
        <div className="relative z-10 w-full px-6 md:px-12 py-10 md:py-16 my-4">
          {currentSlide === 0 ? (
            /* Bespoke Slide 0 Layout - Matching the exact user-requested banner */
            <div className="w-full max-w-5xl mx-auto flex flex-col justify-between min-h-[60vh] space-y-10 py-4 sm:py-6 text-left">
              {/* Top part: Brand header & pillars stacked vertically */}
              <div className="flex flex-col items-start gap-6 pt-2">
                {/* 1. Header Branded Logo styled exactly like the picture */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col items-start gap-1 select-none"
                >
                  {/* Subtle Elegant Golden Arc over the title */}
                  <div className="relative w-44 sm:w-56 overflow-hidden h-3 sm:h-4 -mb-1">
                    <svg className="w-full h-full text-nativa-gold-warm opacity-80" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5,10 C30,2 70,2 95,10" stroke="currentColor" strokeWidth="0.8" fill="none" />
                    </svg>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-elegant font-medium tracking-[0.12em] bg-gradient-to-r from-[#b59e72] via-[#e5d4b3] to-[#9e8555] bg-clip-text text-transparent leading-none uppercase">
                    ONE CLINIC
                  </h1>
                  
                  {/* ESTÉTICA AVANZADA with side horizontal line strokes */}
                  <div className="w-full flex items-center justify-between gap-2 overflow-hidden py-0.5">
                    <div className="h-[0.5px] bg-[#DFBA73]/30 flex-1" />
                    <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.4em] font-semibold text-[#DFBA73] uppercase whitespace-nowrap">
                      ESTÉTICA AVANZADA
                    </span>
                    <div className="h-[0.5px] bg-[#DFBA73]/30 flex-1" />
                  </div>
                </motion.div>
                
                {/* 2. Pillars Natural / Regenerativa / Ciencia - Placed directly below "ESTÉTICA AVANZADA" */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.8 }}
                  className="flex items-center gap-6 sm:gap-8 text-white/95 pl-1"
                >
                  <div className="flex flex-col items-center gap-1 group">
                    <Leaf className="w-4.5 h-4.5 text-[#DFBA73]" />
                    <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] font-bold">NATURAL</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10" />
                  <div className="flex flex-col items-center gap-1 group">
                    <Dna className="w-4.5 h-4.5 text-[#DFBA73]" />
                    <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] font-bold">REGENERATIVA</span>
                  </div>
                  <div className="h-6 w-[1px] bg-white/10" />
                  <div className="flex flex-col items-center gap-1 group">
                    <Atom className="w-4.5 h-4.5 text-[#DFBA73]" />
                    <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.2em] font-bold">CIENCIA</span>
                  </div>
                </motion.div>
              </div>

              {/* Middle Section: Main headlines & CTA buttons */}
              <div className="space-y-5 max-w-xl text-left">
                {/* Headline Text with gradient layout */}
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-3xl sm:text-4xl md:text-[2.6rem] font-serif-elegant font-light text-white leading-tight"
                >
                  La nueva generación de la <br />
                  <span className="italic font-normal bg-gradient-to-r from-[#DFBA73] via-[#ffebd1] to-[#E9D9B3] bg-clip-text text-transparent font-serif-elegant">
                    medicina estética.
                  </span>
                </motion.h2>

                {/* Subtitle/Text paragraph */}
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-lg filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
                >
                  Protocolos avanzados diseñados para armonizar, rejuvenecer y potenciar tu belleza natural.
                </motion.p>

                {/* CTA Action Buttons side by side with accurate icons and shapes from uploaded model */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="flex flex-wrap items-center gap-4 pt-1"
                >
                  <button
                    onClick={() => onNavigate("reservas")}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#b59e72] via-[#e5d4b3] to-[#9e8555] hover:brightness-110 text-neutral-900 font-extrabold text-[10px] sm:text-xs tracking-widest flex items-center gap-2 group transition-all duration-300 shadow-md border border-[#f5e4c3]/30 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-neutral-900" />
                    AGENDAR VALORACIÓN
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-900 transition-transform group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => onNavigate("asesor")}
                    className="px-6 py-3.5 rounded-xl border border-[#DFBA73]/60 hover:border-[#DFBA73] hover:bg-white/5 text-[#DFBA73] font-bold text-[10px] sm:text-xs tracking-widest flex items-center gap-2 group transition-all duration-300 shadow-sm cursor-pointer backdrop-blur-sm"
                  >
                    <Sparkles className="w-4 h-4 text-[#DFBA73]" />
                    DIAGNÓSTICO IA
                    <ArrowRight className="w-3.5 h-3.5 text-[#DFBA73] transition-transform group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </div>

              {/* Bottom glassmorphic info bar with transparent material */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.9 }}
                className="rounded-2xl bg-neutral-950/60 backdrop-blur-md border border-white/10 p-4 grid grid-cols-1 md:grid-cols-3 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-xl"
              >
                {/* Pillar 1 */}
                <div className="flex items-center gap-3.5 md:px-4 py-1.5 md:py-0">
                  <div className="w-7 h-7 rounded-lg bg-[#DFBA73]/15 flex items-center justify-center flex-shrink-0 border border-[#DFBA73]/25">
                    <Microscope className="w-4 h-4 text-[#DFBA73]" />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-[10px] font-sans font-bold text-[#f5e4c3] tracking-widest uppercase">Ciencia</h5>
                    <p className="text-[9px] text-slate-300 font-light leading-snug">Ciencia que transforma.</p>
                  </div>
                </div>
                
                {/* Pillar 2 */}
                <div className="flex items-center gap-3.5 md:px-5 py-1.5 md:py-0">
                  <div className="w-7 h-7 rounded-lg bg-[#DFBA73]/15 flex items-center justify-center flex-shrink-0 border border-[#DFBA73]/25">
                    <Award className="w-4.5 h-4.5 text-[#DFBA73]" />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-[10px] font-sans font-bold text-[#f5e4c3] tracking-widest uppercase">Resultados</h5>
                    <p className="text-[9px] text-slate-300 font-light leading-snug">Resultados naturales, respaldados por innovación.</p>
                  </div>
                </div>
                
                {/* Pillar 3 */}
                <div className="flex items-center gap-3.5 md:px-5 py-1.5 md:py-0">
                  <div className="w-7 h-7 rounded-lg bg-[#DFBA73]/15 flex items-center justify-center flex-shrink-0 border border-[#DFBA73]/25">
                    <Heart className="w-4 h-4 text-[#DFBA73]" />
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-[10px] font-sans font-bold text-[#f5e4c3] tracking-widest uppercase">Bienestar</h5>
                    <p className="text-[9px] text-slate-300 font-light leading-snug">Tu bienestar, nuestra prioridad.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : currentSlide === 1 ? (
            /* Bespoke Slide 1 Layout - APERTURA OFICIAL */
            <div className="w-full max-w-5xl mx-auto flex flex-col justify-between min-h-[62vh] space-y-8 py-4 sm:py-6 text-left">
              {/* Grid layout containing two columns: Left (Details) and Right (Sticker/Badge) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Left Column (Details) */}
                <div className="col-span-12 lg:col-span-7 space-y-6">
                  {/* Logo / Brand Header */}
                  <div className="flex flex-col items-start gap-1 select-none">
                    <div className="relative w-44 sm:w-52 overflow-hidden h-3 sm:h-3.5 -mb-1">
                      <svg className="w-full h-full text-nativa-gold-warm opacity-80" viewBox="0 0 100 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5,10 C30,2 70,2 95,10" stroke="currentColor" strokeWidth="0.8" fill="none" />
                      </svg>
                    </div>
                    <span className="text-2xl sm:text-3xl font-serif-elegant font-medium tracking-[0.14em] bg-gradient-to-r from-[#b59e72] via-[#e5d4b3] to-[#9e8555] bg-clip-text text-transparent leading-none uppercase">
                      ONE CLINIC
                    </span>
                    <div className="w-44 sm:w-52 flex items-center justify-between gap-2 overflow-hidden py-0.5">
                       <div className="h-[0.5px] bg-[#DFBA73]/30 flex-1" />
                       <span className="text-[7.5px] font-sans tracking-[0.4em] font-semibold text-[#DFBA73] uppercase whitespace-nowrap">
                         ESTÉTICA AVANZADA
                       </span>
                       <div className="h-[0.5px] bg-[#DFBA73]/30 flex-1" />
                    </div>
                  </div>

                  {/* Titles APERTURA OFICIAL */}
                  <div className="relative inline-block">
                    {/* Left ribbon decoration */}
                    <span className="absolute -left-10 top-4 text-[#DFBA73]/40 animate-pulse hidden md:block">
                      <svg className="w-6 h-10" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M4,4 Q14,8 4,16 T14,28" strokeLinecap="round" />
                      </svg>
                    </span>
                    {/* Right ribbon decoration */}
                    <span className="absolute -right-10 top-1 text-[#DFBA73]/40 animate-pulse hidden md:block">
                      <svg className="w-6 h-10" viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M16,4 Q6,8 16,16 T6,28" strokeLinecap="round" />
                      </svg>
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-[3.25rem] font-serif-elegant font-bold tracking-[0.05em] leading-[0.95] uppercase">
                      <span className="text-white block">APERTURA</span>
                      <span className="bg-gradient-to-r from-[#DFBA73] via-[#ffebd1] to-[#E9D9B3] bg-clip-text text-transparent block mt-1">OFICIAL</span>
                    </h2>
                  </div>

                  {/* Elegant overlapping pill & bordered box container */}
                  <div className="relative border border-[#DFBA73]/45 rounded-2xl px-6 sm:px-8 pt-7 pb-5 max-w-md bg-black/30 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] mt-6">
                    {/* Glowing Pill badge overlapping the top border, centered */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex px-6 py-1.5 rounded-full bg-gradient-to-r from-[#DFBA73] via-[#ffebd1] to-[#b59e72] text-[#120F0C] font-extrabold text-[10px] sm:text-[11px] tracking-[0.15em] uppercase shadow-[0_4px_15px_rgba(223,186,115,0.4)] select-none whitespace-nowrap border border-[#ffffff]/20">
                        ¡POR TIEMPO LIMITADO!
                      </span>
                    </div>

                    {/* Inside Container content: 15% DE CORTESÍA */}
                    <div className="flex items-center gap-3 justify-center py-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-7xl sm:text-8xl md:text-8.5xl font-serif-elegant font-bold bg-gradient-to-r from-[#DFBA73] via-[#ffffff] to-[#E9D9B3] bg-clip-text text-transparent leading-none select-none tracking-tighter">
                          15%
                        </span>
                        <div className="flex flex-col justify-center leading-none pl-1">
                          <span className="text-[10px] sm:text-[12px] text-white/90 font-sans tracking-[0.25em] font-extrabold uppercase leading-none mb-1">
                            DE
                          </span>
                          <span className="text-3xl sm:text-4xl font-serif-elegant font-bold text-white tracking-[0.12em] leading-none uppercase">
                            CORTESÍA
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* EXCLUSIVO PARA NUEVOS PACIENTES */}
                    <div className="w-full flex items-center justify-between gap-3 text-[#DFBA73]/40 mt-3">
                      <div className="h-[0.5px] bg-[#DFBA73]/30 flex-grow" />
                      <span className="text-[7.5px] sm:text-[9.5px] font-sans tracking-[0.22em] font-extrabold uppercase text-white/90 whitespace-nowrap">
                        EXCLUSIVO PARA NUEVOS PACIENTES
                      </span>
                      <div className="h-[0.5px] bg-[#DFBA73]/30 flex-grow" />
                    </div>
                  </div>

                  {/* EN TRATAMIENTOS SELECCIONADOS (Placed underneath, outside the border box, as requested by the original image layout) */}
                  <div className="w-full max-w-md text-center py-3">
                    <span className="text-[8px] sm:text-[10px] font-sans tracking-[0.3em] font-extrabold text-[#DFBA73] uppercase flex items-center justify-center gap-3">
                      <span className="inline-block w-4 h-[1px] bg-[#DFBA73]/40"></span>
                      EN TRATAMIENTOS SELECCIONADOS
                      <span className="inline-block w-4 h-[1px] bg-[#DFBA73]/40"></span>
                    </span>
                  </div>

                  {/* 4 Pillars below */}
                  <div className="grid grid-cols-4 gap-3 text-center pt-2 max-w-lg">
                    <div className="flex flex-col items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center border border-[#DFBA73]/30 shadow-md hover:border-[#DFBA73] transition-colors duration-300">
                        <Atom className="w-5 h-5 text-[#DFBA73]" />
                      </div>
                      <span className="text-[7.5px] sm:text-[9px] font-sans font-extrabold text-white/95 tracking-[0.08em] leading-tight uppercase whitespace-pre-line">
                        EXOSOMAS{"\n"}CELULARES
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center border border-[#DFBA73]/30 shadow-md hover:border-[#DFBA73] transition-colors duration-300">
                        <Smile className="w-5 h-5 text-[#DFBA73]" />
                      </div>
                      <span className="text-[7.5px] sm:text-[9px] font-sans font-extrabold text-white/95 tracking-[0.08em] leading-tight uppercase whitespace-pre-line">
                        TOXINA{"\n"}BOTULÍNICA
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center border border-[#DFBA73]/30 shadow-md hover:border-[#DFBA73] transition-colors duration-300">
                        <Dna className="w-5 h-5 text-[#DFBA73]" />
                      </div>
                      <span className="text-[7.5px] sm:text-[9px] font-sans font-extrabold text-white/95 tracking-[0.08em] leading-tight uppercase whitespace-pre-line">
                        BIOESTIMULADORES{"\n"}DE COLÁGENO
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-2 p-1 rounded-xl hover:bg-white/5 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-black/60 flex items-center justify-center border border-[#DFBA73]/30 shadow-md hover:border-[#DFBA73] transition-colors duration-300">
                        <Droplets className="w-5 h-5 text-[#DFBA73]" />
                      </div>
                      <span className="text-[7.5px] sm:text-[9px] font-sans font-extrabold text-white/95 tracking-[0.08em] leading-tight uppercase whitespace-normal">
                        SKINBOOSTERS
                      </span>
                    </div>
                  </div>

                  {/* CTA - Button */}
                  <div className="flex flex-col items-start gap-2 pt-2">
                    <button
                      onClick={() => onNavigate("reservas")}
                      className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#b59e72] via-[#e5d4b3] to-[#9e8555] hover:brightness-110 text-neutral-900 font-extrabold text-[10px] sm:text-xs tracking-widest flex items-center gap-2 group transition-all duration-300 shadow-md border border-[#f5e4c3]/30 cursor-pointer"
                    >
                      <Calendar className="w-4 h-4 text-neutral-900" />
                      RESERVAR VALORACIÓN
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-900 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="text-[8px] text-slate-400 font-light mt-1 pl-1">
                      *Aplican términos y condiciones.
                    </p>
                  </div>
                </div>

                {/* Right Column (Floating Gold Sticker/Badge only on larger screens, centered horizontally/vertically) */}
                <div className="col-span-12 lg:col-span-5 flex justify-center lg:justify-end items-center py-6">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative flex-shrink-0 w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-[#DFBA73] via-[#ffebb1] to-[#b59e72] p-[1.5px] shadow-[0_12px_35px_rgba(223,186,115,0.3)] flex items-center justify-center select-none"
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#120F0C] to-[#2B231A] flex flex-col items-center justify-center text-center p-3">
                      <Gift className="w-5 h-5 text-[#DFBA73] mb-1 animate-bounce" />
                      <span className="text-[8.5px] md:text-[9.5px] font-sans font-extrabold text-[#DFBA73] tracking-widest uppercase leading-tight">
                        BENEFICIO DE
                      </span>
                      <span className="text-[8.5px] md:text-[9.5px] font-sans font-extrabold text-[#DFBA73] tracking-widest uppercase leading-tight">
                        INAUGURACIÓN
                      </span>
                      {/* Thin divider line */}
                      <div className="w-8 h-[1px] bg-[#DFBA73]/30 my-1 md:my-1.5" />
                      <span className="text-[6.5px] md:text-[7.5px] font-sans font-medium text-amber-100/80 tracking-widest uppercase leading-snug">
                        SOLO DURANTE
                      </span>
                      <span className="text-[6.5px] md:text-[7.5px] font-sans font-medium text-amber-100/80 tracking-widest uppercase leading-snug">
                        NUESTRO MES DE
                      </span>
                      <span className="text-[6.5px] md:text-[7.5px] font-sans font-medium text-amber-100/80 tracking-widest uppercase leading-snug">
                        APERTURA
                      </span>
                    </div>
                  </motion.div>
                </div>

              </div>

              {/* Bottom glassmorphic info bar with matching 4 bottom pillars */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.9 }}
                className="rounded-2xl bg-neutral-950/60 backdrop-blur-md border border-white/10 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-white/10 shadow-xl"
              >
                {/* Pillar 1 */}
                <div className="flex items-center gap-3 md:px-3 py-1.5 md:py-0">
                  <div className="w-7 h-7 rounded-lg bg-[#DFBA73]/15 flex items-center justify-center flex-shrink-0 border border-[#DFBA73]/25">
                    <Award className="w-4 h-4 text-[#DFBA73]" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-[9px] font-sans font-bold text-[#f5e4c3] tracking-wider uppercase leading-none">PROTOCOLOS</h5>
                    <p className="text-[8px] text-slate-300 font-light leading-tight">Personalizados para tu tipo de piel.</p>
                  </div>
                </div>
                
                {/* Pillar 2 */}
                <div className="flex items-center gap-3 md:px-3 py-1.5 md:py-0">
                  <div className="w-7 h-7 rounded-lg bg-[#DFBA73]/15 flex items-center justify-center flex-shrink-0 border border-[#DFBA73]/25">
                    <Shield className="w-4 h-4 text-[#DFBA73]" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-[9px] font-sans font-bold text-[#f5e4c3] tracking-wider uppercase leading-none">SEGURIDAD</h5>
                    <p className="text-[8px] text-slate-300 font-light leading-tight">Seguridad médica garantizada.</p>
                  </div>
                </div>
                
                {/* Pillar 3 */}
                <div className="flex items-center gap-3 md:px-3 py-1.5 md:py-0">
                  <div className="w-7 h-7 rounded-lg bg-[#DFBA73]/15 flex items-center justify-center flex-shrink-0 border border-[#DFBA73]/25">
                    <Leaf className="w-4 h-4 text-[#DFBA73]" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-[9px] font-sans font-bold text-[#f5e4c3] tracking-wider uppercase leading-none">RESULTADOS</h5>
                    <p className="text-[8px] text-slate-300 font-light leading-tight">Resultados naturales y armónicos.</p>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="flex items-center gap-3 md:px-3 py-1.5 md:py-0">
                  <div className="w-7 h-7 rounded-lg bg-[#DFBA73]/15 flex items-center justify-center flex-shrink-0 border border-[#DFBA73]/25">
                    <Sparkles className="w-4 h-4 text-[#DFBA73]" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-[9px] font-sans font-bold text-[#f5e4c3] tracking-wider uppercase leading-none">TECNOLOGÍA</h5>
                    <p className="text-[8px] text-slate-300 font-light leading-tight">Avanzada de última generación.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          ) : currentSlideData.layout === "center" ? (
            /* Layout 3: Center-aligned minimal luxury */
            <div className="max-w-3xl mx-auto text-center space-y-8 py-12">
              <div className="space-y-5 flex flex-col items-center">
                {/* Dynamic Badge */}
                <div className="h-8">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSlide}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold tracking-widest uppercase shadow-md backdrop-blur-sm transition-colors duration-500 ${currentSlideData.badgeBgClass} ${currentSlideData.badgeBorderClass} ${currentSlideData.accentTextClass}`}
                    >
                      <MapPin className="w-3.5 h-3.5 animate-bounce" /> {currentSlideData.badge}
                    </motion.span>
                  </AnimatePresence>
                </div>
                
                {currentSlide === 0 ? (
                  <div className="space-y-2 select-none flex flex-col items-center">
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-elegant font-medium tracking-[0.08em] bg-gradient-to-r from-[#b59e72] via-[#f5e4c3] to-[#9e8555] bg-clip-text text-transparent filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-[1.05] uppercase">
                      ONE CLINIC
                    </h1>
                    <div className="text-[11px] sm:text-xs md:text-sm font-sans tracking-[0.35em] font-semibold text-[#DFBA73] uppercase pb-2 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                      {currentSlideData.subtitle}
                    </div>
                  </div>
                ) : (
                  <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-elegant font-bold tracking-[0.08em] text-white leading-[1.05] text-center">
                    {currentSlideData.title}<br />
                    <div className="h-10 sm:h-14 overflow-hidden mt-2">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={currentSlide}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.4 }}
                          className={`font-serif-elegant font-light italic text-xl sm:text-3xl md:text-4xl drop-shadow-sm normal-case tracking-[0.12em] block ${currentSlideData.accentTextClass}`}
                        >
                          {currentSlideData.subtitle}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </h1>
                )}

                {/* Tagline Capsule Group */}
                <div className="border-y border-white/10 py-4 w-full max-w-xl mx-auto flex justify-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.24em] font-bold"
                    >
                      <span className={`${currentSlideData.accentTextClass} drop-shadow`}>{currentSlideData.p1}</span>
                      <span className="text-white/40 font-light select-none">•</span>
                      <span className="text-white drop-shadow">{currentSlideData.p2}</span>
                      <span className="text-white/40 font-light select-none">•</span>
                      <span className={`${currentSlideData.accentTextClass} drop-shadow`}>{currentSlideData.p3}</span>
                      <span className="text-white/40 font-light select-none">•</span>
                      <span className="text-white bg-white/10 px-2.5 py-1 rounded border border-white/20 text-[10px] sm:text-xs uppercase tracking-[0.12em] font-extrabold shadow-sm">
                        {currentSlideData.tagline}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Minimal Description */}
              <div className="min-h-[3rem] max-w-xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentSlide}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="text-sm sm:text-base text-slate-200 font-light leading-relaxed drop-shadow-sm text-center"
                  >
                    {currentSlideData.desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Action Buttons Centered - hidden when showButtons is false */}
              {currentSlideData.showButtons !== false && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                >
                  <button
                    onClick={() => onNavigate("reservas")}
                    id="hero-book-btn-center"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-nativa-gold-warm text-[#2E2E2B] font-extrabold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-nativa-gold-warm/30 hover:bg-gold-200 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {t("nav.courtesy")}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => onNavigate("asesor")}
                    id="hero-advisor-btn-center"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-nativa-green-deep)]/95 text-nativa-gold-warm font-extrabold text-xs sm:text-sm tracking-wide border border-nativa-gold-warm/50 hover:border-nativa-gold-warm hover:bg-[#687055] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
                  >
                    {t("nav.advisor")}
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nativa-gold-warm opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-nativa-gold-warm"></span>
                    </span>
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            /* Layout 1 & 2: Grid-aligned layouts (Left-card / Right-card) */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
              
              {/* Text Column - Orders to last on right-card to move it to the right */}
              <div className={`col-span-12 lg:col-span-7 xl:col-span-8 text-left space-y-8 ${
                currentSlideData.layout === "right-card" ? "lg:order-last lg:pl-8" : ""
              }`}>
                <div className="space-y-5">
                  {/* Dynamic Badge */}
                  <div className="h-8">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={currentSlide}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.4 }}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase shadow-md backdrop-blur-sm transition-colors duration-500 ${currentSlideData.badgeBgClass} ${currentSlideData.badgeBorderClass} ${currentSlideData.accentTextClass}`}
                      >
                        <MapPin className="w-3.5 h-3.5 animate-bounce" /> {currentSlideData.badge}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  
                  {currentSlide === 0 ? (
                    <div className="space-y-2 select-none">
                      <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-elegant font-medium tracking-[0.08em] bg-gradient-to-r from-[#b59e72] via-[#f5e4c3] to-[#9e8555] bg-clip-text text-transparent filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-[1.05] inline-block uppercase">
                        ONE CLINIC
                      </h1>
                      <div className="text-[11px] sm:text-xs md:text-sm font-sans tracking-[0.35em] font-semibold text-[#DFBA73] uppercase pb-2 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                        {currentSlideData.subtitle}
                      </div>
                    </div>
                  ) : (
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-elegant font-bold tracking-[0.08em] text-white leading-[1.05]">
                      {currentSlideData.title}<br />
                      <div className="h-10 sm:h-14 overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={currentSlide}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                            className={`font-serif-elegant font-light italic text-xl sm:text-3xl md:text-4xl drop-shadow-sm normal-case tracking-[0.12em] block ${currentSlideData.accentTextClass}`}
                          >
                            {currentSlideData.subtitle}
                          </motion.span>
                        </AnimatePresence>
                      </div>
                    </h1>
                  )}

                  {/* Beautiful, High-Contrast Tagline Capsule Group */}
                  <div className="border-y border-white/10 py-4 max-w-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.24em] font-bold"
                      >
                        <span className={`${currentSlideData.accentTextClass} drop-shadow`}>{currentSlideData.p1}</span>
                        <span className="text-white/40 font-light select-none">•</span>
                        <span className="text-white drop-shadow">{currentSlideData.p2}</span>
                        <span className="text-white/40 font-light select-none">•</span>
                        <span className={`${currentSlideData.accentTextClass} drop-shadow`}>{currentSlideData.p3}</span>
                        <span className="text-white/40 font-light select-none">•</span>
                        <span className="text-white bg-white/10 px-2.5 py-1 rounded border border-white/20 text-[10px] sm:text-xs uppercase tracking-[0.12em] font-extrabold shadow-sm">
                          {currentSlideData.tagline}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Subtitle with slight text shadow for outstanding readability */}
                <div className="min-h-[4.5rem]">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentSlide}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="max-w-xl text-sm sm:text-base text-slate-100 font-normal leading-relaxed drop-shadow-sm"
                    >
                      {currentSlideData.desc}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4"
                >
                  <button
                    onClick={() => onNavigate("reservas")}
                    id="hero-book-btn-grid"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-nativa-gold-warm text-[#2E2E2B] font-extrabold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-nativa-gold-warm/30 hover:bg-gold-200 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    {t("nav.courtesy")}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <button
                    onClick={() => onNavigate("asesor")}
                    id="hero-advisor-btn-grid"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-[var(--color-nativa-green-deep)]/95 text-nativa-gold-warm font-extrabold text-xs sm:text-sm tracking-wide border border-nativa-gold-warm/50 hover:border-nativa-gold-warm hover:bg-[#687055] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
                  >
                    {t("nav.advisor")}
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nativa-gold-warm opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-nativa-gold-warm"></span>
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Informational glassmorphic card - Orders to first on right-card to move it to the left */}
              <div className={`hidden lg:block lg:col-span-5 xl:col-span-4 self-center ${
                currentSlideData.layout === "right-card" ? "lg:order-first lg:pr-8 pl-0" : "pr-4 pl-0"
              }`}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`glasscard-${currentSlide}`}
                    initial={{ opacity: 0, x: currentSlideData.layout === "right-card" ? -50 : 50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: currentSlideData.layout === "right-card" ? 50 : -50, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative overflow-hidden p-8 rounded-3xl bg-neutral-900/40 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500"
                    style={{
                      boxShadow: `0 20px 50px -10px ${currentSlideData.glowColor}`
                    }}
                  >
                    {/* Decorative glowing gradient inside card */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-10 -mt-10 opacity-30 bg-white" />
                    
                    <div className="relative space-y-6">
                      <div>
                        <h4 className="text-xl font-serif-elegant font-bold text-white tracking-wide">
                          {currentSlideData.cardTitle}
                        </h4>
                        <p className="text-xs text-slate-300 font-light mt-1">
                          {currentSlideData.cardSubtitle}
                        </p>
                      </div>

                      <ul className="space-y-3.5 pt-2">
                        {currentSlideData.cardItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs text-white/90">
                            <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 animate-ping duration-1000 ${currentSlideData.badgeBgClass}`} />
                            <span className="leading-tight font-light">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-white/60" /> {language === "en" ? "Mon - Sat: 8am - 7pm" : language === "pt" ? "Seg - Sáb: 8h - 19h" : "Lun - Sáb: 8am - 7pm"}
                        </span>
                        <span className={`font-semibold tracking-wider ${currentSlideData.accentTextClass}`}>
                          ONE CLINIC
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          )}
        </div>

        {/* Carousel manual controls */}
        <div className="absolute right-6 sm:right-12 bottom-12 z-20 flex items-center gap-3">
          <button
            onClick={prevSlide}
            className="p-3 rounded-full border border-white/20 bg-black/25 text-white hover:bg-white hover:text-nativa-green-deep transition-all cursor-pointer backdrop-blur-sm active:scale-95"
            aria-label="Anterior slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pause / Play Control */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className={`p-3 rounded-full border transition-all cursor-pointer backdrop-blur-sm active:scale-95 flex items-center justify-center gap-1.5 ${
              isPaused 
                ? "bg-nativa-gold-warm border-nativa-gold-warm text-[#2E2E2B]" 
                : "border-white/20 bg-black/25 text-white hover:bg-white hover:text-nativa-green-deep"
            }`}
            title={isPaused ? "Reanudar transición automática (14s)" : "Pausar transición automática"}
            aria-label={isPaused ? "Reanudar" : "Pausar"}
          >
            {isPaused ? (
              <Play className="w-5 h-5 fill-current" />
            ) : (
              <Pause className="w-5 h-5 fill-current" />
            )}
          </button>

          <button
            onClick={nextSlide}
            className="p-3 rounded-full border border-white/20 bg-black/25 text-white hover:bg-white hover:text-nativa-green-deep transition-all cursor-pointer backdrop-blur-sm active:scale-95"
            aria-label="Siguiente slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? "w-6 bg-nativa-gold-warm" : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir al slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Brand Pillars Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold tracking-tight text-nativa-green-deep">
            {language === "en" ? "Our Pillars of Clinical Excellence" : language === "pt" ? "Nossos Pilares de Excelência" : "Nuestros Pilares de Excelencia"}
          </h2>
          <div className="w-16 h-0.5 bg-nativa-gold-warm mx-auto"></div>
          <p className="max-w-xl mx-auto text-sm text-slate-600">
            {language === "en" 
              ? "At ONE CLINIC, each facial and body treatment is devoted to our philosophy of intelligent, warm, and medical care." 
              : language === "pt" 
              ? "Na ONE CLINIC, cada tratamento corporal e facial está consagrado à nossa filosofia de cuidado inteligente, empático e médico." 
              : "En ONE CLINIC, cada tratamiento facial y corporal está consagrado a nuestra filosofía de cuidado inteligente, empático y médico."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.5 }}
                className="p-6 rounded-2xl bg-white border border-nativa-green-accent/60 hover:border-nativa-gold-warm/40 hover:bg-nativa-card-hover transition-all duration-300 group text-center md:text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-nativa-bg border border-nativa-gold-warm/15 text-nativa-gold-warm flex items-center justify-center mb-5 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-serif-elegant font-semibold text-nativa-green-deep tracking-wide mb-2 font-bold">
                  {p.title}
                </h3>
                <p className="text-sm text-slate-600 font-light leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Philosophy Visual Split Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-11 xl:col-span-5 space-y-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-nativa-gold-warm">
            {language === "en" ? "Cutting-edge Regenerative Medicine" : language === "pt" ? "Medicina Regenerativa de Vanguarda" : "Medicina Regenerativa de Vanguarda"}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold leading-tight text-nativa-green-deep">
            {language === "en" ? "Treatments that awaken the youth of your own cells" : language === "pt" ? "Tratamentos que despertam a juventude de suas próprias células" : "Tratamientos que despiertan la juventud de tus propias células"}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-light">
            {language === "en" 
              ? "Our signature protocols, such as Cellular Exosomes and Collagen Biostimulators, do not fake volume through micro-fillers: they reprogram underlying cells. This is natural cellular science."
              : language === "pt"
              ? "Nossos tratamentos de destaque, como Exossomas Clínicos e Bioestimuladores de Colágeno, não preenchem de forma artificial: reativam as células latentes da derme."
              : "Nuestros tratamientos insígnia, como los Exosomas Clínicos y los Bioestimuladores de Colágeno, no rellenan de forma artificial: reactivan los mecanismos celulares apagados por el paso del tiempo."
            }
          </p>
          
          <div className="space-y-4 pt-2">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-nativa-gold-warm/10 border border-nativa-gold-warm/30 flex items-center justify-center text-nativa-gold-warm">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-semibold text-nativa-green-deep">
                  {language === "en" ? "No scalpel, no anesthesia" : language === "pt" ? "Sem bisturi, sem anestesia" : "Sin bisturí, sin anestesia"}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === "en" ? "Minimally invasive therapies returning immediately to your daily routine." : language === "pt" ? "Terapias minimamente invasivas com retorno imediato à sua rotina ativa." : "Tratamientos mínimamente invasivos con retorno inmediato a tus actividades diarias."}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-nativa-gold-warm/10 border border-nativa-gold-warm/30 flex items-center justify-center text-nativa-gold-warm">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-semibold text-nativa-green-deep">
                  {language === "en" ? "3D multispectral scanning" : language === "pt" ? "Escâner tridimensional multiespectral" : "Tecnología de escáner tridimensional"}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === "en" ? "We measure evolutionary changes with high precision in each control session." : language === "pt" ? "Monitoramento fotográfico de altíssima precisão a cada consulta." : "Medimos con precisión milimétrica la evolución dermo-facial en cada cita de control."}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate("tratamientos")}
            id="read-more-treatments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-nativa-gold-warm hover:text-nativa-green-deep transition-colors duration-300 group pt-4 cursor-pointer"
          >
            {language === "en" ? "Explore Full Treatment Catalog" : language === "pt" ? "Ver Catálogo Completo de Tratamentos" : "Ver Catálogo de Tratamientos Completo"}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Beautiful customized image block */}
        <div className="lg:col-span-12 xl:col-span-7 relative h-[450px] rounded-3xl overflow-hidden border border-nativa-green-accent/60 shadow-xl group">
          <img
            src={glowingSkinSkincareImg}
            alt="Facial Rejuvenation and Glowing Skin"
            className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-[10s]"
            referrerPolicy="no-referrer"
          />
          {/* Accent light decoration */}
          <div className="absolute inset-0 bg-gradient-to-t from-nativa-bg/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-nativa-green-accent flex justify-between items-center shadow-lg">
            <div>
              <p className="text-xs text-nativa-gold-warm font-semibold tracking-widest uppercase mb-1">
                {language === "en" ? "Revelation Protocol" : language === "pt" ? "Protocolo Revelação" : "Tratamiento Revelación"}
              </p>
              <h4 className="text-sm sm:text-base font-serif-elegant font-bold text-nativa-green-deep">
                {t("hero.mainTreatments.exosomas")} ({t("hero.mainTreatments.exosomasTag")})
              </h4>
            </div>
            <button
              onClick={() => onSelectTreatment("exosomas")}
              className="px-4 py-2 text-xs rounded-full bg-nativa-green-deep text-white font-bold hover:bg-opacity-90 transition-colors cursor-pointer"
            >
              {language === "en" ? "Explore" : language === "pt" ? "Explorar" : "Conocer"}
            </button>
          </div>
        </div>
      </section>

      {/* Immersive Visual Gallery Section */}
      <section className="space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-nativa-gold-warm flex items-center justify-center gap-1.5">
            <Palette className="w-4 h-4 text-nativa-gold-warm animate-pulse" /> {language === "en" ? "The Art of Regenerative Medicine" : language === "pt" ? "A Arte da Medicina Regenerativa" : "El Arte de la Medicina Bioregenerativa"}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold tracking-tight text-nativa-green-deep">
            {t("hero.gallerySubtitle")}
          </h2>
          <div className="w-16 h-0.5 bg-nativa-gold-warm mx-auto"></div>
          <p className="text-sm text-slate-600 leading-relaxed font-light">
            {t("hero.galleryDesc")}
          </p>
        </div>

        {/* Categories Filtros */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          {[
            { id: "todos", label: t("hero.galleryCategoryTodos") || "Explorar Todo", icon: Eye },
            { id: "instalaciones", label: t("hero.galleryCategoryInstalaciones") || "Instalaciones VIP", icon: MapPin },
            { id: "tecnologia", label: t("hero.galleryCategoryTecnologia") || "Tecnología Médica", icon: ShieldCheck },
            { id: "tratamientos", label: t("hero.galleryCategoryTratamientos") || "Terapias Celulares", icon: Award }
          ].map((cat) => {
            const CatIcon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-nativa-green-deep border-nativa-green-deep text-white shadow-md shadow-nativa-green-deep/15"
                    : "bg-white border-nativa-green-accent text-slate-755 hover:border-nativa-gold-warm/60"
                }`}
              >
                <CatIcon className={`w-3.5 h-3.5 ${isSelected ? "text-nativa-gold-warm animate-pulse" : "text-nativa-gold-warm/80"}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid layout for premium look */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {localizedGalleryItems.filter(item => selectedCategory === "todos" || item.category === selectedCategory).map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                onClick={() => setActivePhoto(item)}
                className={`group relative rounded-2xl overflow-hidden bg-white border border-nativa-green-accent/65 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  item.size === "large" ? "md:col-span-2" : "col-span-1"
                }`}
              >
                {/* Cover Photo */}
                <div className="relative h-64 md:h-72 lg:h-80 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-[0.96]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90 transition-opacity duration-300 group-hover:from-black/90"></div>
                </div>

                {/* Tag Overlaid */}
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-nativa-green-deep text-[10px] font-bold px-3 py-1 rounded-full border border-nativa-gold-warm/20 tracking-wider uppercase shadow-sm">
                  {item.tag}
                </span>

                {/* Text Overlined at Bottom */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1.5 flex flex-col justify-end">
                  <h3 className="text-lg md:text-xl font-serif-elegant font-bold tracking-tight text-white group-hover:text-nativa-gold-warm transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed font-light">
                    {item.desc}
                  </p>
                  <div className="pt-2 flex items-center gap-1.5 text-nativa-gold-light text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono tracking-wider">
                    <Maximize2 className="w-3.5 h-3.5" /> {language === "en" ? "Zoom View" : language === "pt" ? "Ampliar Foto" : "Ampliar Experiencia Visual"}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox / Immersive Full-screen view */}
      <AnimatePresence>
        {activePhoto && (() => {
          const lImg = localizedGalleryItems.find(g => g.id === activePhoto.id) || activePhoto;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
              onClick={() => setActivePhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="relative max-w-4xl w-full bg-[#F5F2EA] rounded-3xl overflow-hidden border border-nativa-green-accent/60 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/40 text-white hover:bg-black/60 flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  {/* Visual Banner */}
                  <div className="h-64 sm:h-96 md:h-full min-h-[300px] md:min-h-[450px] relative bg-black">
                    <img
                      src={lImg.image}
                      alt={lImg.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-nativa-gold-warm text-nativa-green-deep text-[10px] font-bold px-3 py-1 rounded-full border border-nativa-gold-warm/20 tracking-wider uppercase">
                      {lImg.tag}
                    </div>
                  </div>

                  {/* Info and CTA Panel */}
                  <div className="p-8 md:p-10 flex flex-col justify-between space-y-6 text-[#2E2E2B] my-auto">
                    <div className="space-y-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-nativa-gold-warm flex items-center gap-1.5">
                        <Sparkle className="w-3.5 h-3.5 text-nativa-gold-warm animate-pulse" /> {language === "en" ? "EXCLUSIVE ONE CLINIC EXPERIENCE" : language === "pt" ? "EXPERIÊNCIA PREMIUM ONE CLINIC" : "EXPERENCIA PREMIUM ONE CLINIC"}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-serif-elegant font-bold text-nativa-green-deep tracking-tight leading-tight">
                        {lImg.title}
                      </h3>
                      <div className="w-12 h-0.5 bg-nativa-gold-warm"></div>
                      <p className="text-sm text-slate-600 leading-relaxed font-light">
                        {lImg.desc}
                      </p>
                      <p className="text-xs text-slate-500 leading-relaxed font-light">
                        {language === "en" 
                          ? "Top clinical facilities and relaxation bays meticulously curated to offer a truly premium dermo-aesthetic journey in Medellín with Brazilian legacy techniques." 
                          : language === "pt" 
                          ? "Suítes dermoestéticas equipadas para propiciar uma jornada médica de requinte em Medellín com técnicas exclusivas do Brasil." 
                          : "Equipamiento de primer nivel clínico y espacios de confort de escuela brasilera minuciosamente diseñados para ofrecer una experiencia estética premium en Medellín."
                        }
                      </p>
                    </div>

                    <div className="pt-6 border-t border-nativa-green-accent/60 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          setActivePhoto(null);
                          onNavigate("reservas");
                        }}
                        className="flex-1 px-6 py-3.5 text-center rounded-full bg-nativa-gold-warm text-[#2E2E2B] font-bold text-xs hover:bg-gold-200 transition-colors shadow-lg cursor-pointer"
                      >
                        {t("nav.courtesy")}
                      </button>
                      <button
                        onClick={() => {
                          setActivePhoto(null);
                          onNavigate("tratamientos");
                        }}
                        className="px-6 py-3.5 text-center rounded-full bg-white border border-nativa-green-accent/60 text-nativa-green-deep hover:text-nativa-gold-warm hover:border-nativa-gold-warm/60 font-bold text-xs transition-colors cursor-pointer"
                      >
                        {language === "en" ? "See all" : language === "pt" ? "Ver todos" : "Ver todos"}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* Quick Launch Treatments Quick links */}
      <section className="p-8 rounded-3xl bg-white border border-nativa-green-accent shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-serif-elegant font-bold text-nativa-green-deep">
              {language === "en" ? "Do you have a clear aesthetic goal?" : language === "pt" ? "Você já tem uma meta estética clara?" : "¿Tienes claro tu objetivo dermoestético?"}
            </h3>
            <p className="text-sm text-slate-500">
              {language === "en" ? "Access directly our most requested advanced cellular protocols." : language === "pt" ? "Acesse diretamente os protocolos dermoestéticos mais procurados da clínica." : "Accede directamente al análisis especializado de nuestras terapias más solicitadas en Medellín."}
            </p>
          </div>
          <div className="w-12 h-px bg-nativa-gold-warm/20 hidden md:block"></div>
          <div className="grid grid-cols-2 md:flex flex-wrap gap-3">
            {MAIN_TREATMENTS.map((t) => (
              <button
                key={t.id}
                onClick={() => onSelectTreatment(t.id)}
                className="px-4 py-2.5 rounded-xl bg-nativa-bg border border-nativa-green-accent text-xs text-left hover:border-nativa-gold-warm/50 hover:bg-nativa-green-accent/40 transition-all duration-300 cursor-pointer"
                title={t.tag}
              >
                <div className="font-semibold text-nativa-green-deep">{t.name}</div>
                <div className="text-[10px] text-nativa-gold-warm font-light italic mt-0.5">{t.tag}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Details Footer (Medellín Context) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-nativa-green-accent/60 text-center md:text-left">
        <div className="p-5 rounded-2xl bg-white border border-nativa-green-accent shadow-sm space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-nativa-gold-warm">
            <MapPin className="w-4 h-4" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-nativa-green-deep">{t("common.addressLabel")}</h4>
          </div>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Calle 53 #73-45, Mixy Mall Los Colores<br />
            {language === "en" ? "Medellín, Colombia • Local 303 (Center of Excellence)" : language === "pt" ? "Medellín, Colômbia • Local 303 (Sede de Excelência)" : "Medellín, Colombia • Local 303 (Sede de Excelencia)"}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-nativa-green-accent shadow-sm space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-nativa-gold-warm">
            <Clock className="w-4 h-4" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-nativa-green-deep">
              {language === "en" ? "Business Hours" : language === "pt" ? "Horário de Funcionamento" : "Horario de Atención"}
            </h4>
          </div>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            {language === "en" ? "Monday to Friday: 8:00 AM – 7:00 PM" : language === "pt" ? "Segunda a Sexta: 8h – 19h" : "Lunes a Viernes: 8:00 AM – 7:00 PM"}<br />
            {language === "en" ? "Saturdays: 8:00 AM – 4:00 PM (By Appointment)" : language === "pt" ? "Sábados: 8h – 16h (Agendamento Prévio)" : "Sábados: 8:00 AM – 4:00 PM (Cita previa)"}
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-nativa-green-accent shadow-sm space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-nativa-gold-warm">
            <Phone className="w-4 h-4" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-nativa-green-deep">
              {language === "en" ? "Contact & Inquiries" : language === "pt" ? "Contato e Consultas" : "Contacto y Valoraciones"}
            </h4>
          </div>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            {language === "en" ? "Clinic WhatsApp: +57 312 876 5432" : language === "pt" ? "WhatsApp Clínico: +57 312 876 5432" : "WhatsApp Clínico: +57 312 876 5432"}<br />
            {language === "en" ? "E-mail: appointments@oneclinic.com" : language === "pt" ? "E-mail: informacao@oneclinic.com" : "Correo: citas@oneclinic.com"}
          </p>
        </div>
      </section>
    </div>
  );
}
