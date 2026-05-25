import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, MapPin, Clock, ShieldCheck, Sparkles, Phone, Award, Users, Target, Compass, Eye, Image as ImageIcon, Sparkle, Maximize2, X, Leaf, Palette } from "lucide-react";

interface HomeHeroProps {
  onNavigate: (tab: string) => void;
  onSelectTreatment: (id: string) => void;
}

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Suites de Atención VIP El Poblado",
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

export default function HomeHero({ onNavigate, onSelectTreatment }: HomeHeroProps) {
  const [selectedCategory, setSelectedCategory] = useState<"todos" | "tratamientos" | "instalaciones" | "tecnologia">("todos");
  const [activePhoto, setActivePhoto] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  // Brand pillars
  const PILLARS = [
    {
      title: "NATURAL",
      desc: "Resultados sutiles que enaltecen los rasgos innatos de tu rostro y cuerpo, evitando sobrecorrecciones.",
      icon: Leaf
    },
    {
      title: "REGENERATIVA",
      desc: "Ciencia celular que reprograma el rejuvenecimiento tisular, induciendo colágeno autólogo.",
      icon: Award
    },
    {
      title: "CIENCIA",
      desc: "Protocolos médicos y dermoestéticos certificados bajo el más alto nivel de evidencia clínico-científica.",
      icon: ShieldCheck
    },
    {
      title: "IDENTIDAD LATINA",
      desc: "Tratamientos diseñados a la medida de los fototipos y necesidades específicas de las pieles latinoamericanas.",
      icon: MapPin
    }
  ];

  // Core showcase treatments for direct link
  const MAIN_TREATMENTS = [
    { id: "exosomas", name: "Exosomas Celulares", tag: "Regenerativo facial estrella" },
    { id: "toxina", name: "Toxina Botulínica", tag: "Suavidad expresiva natural" },
    { id: "bioestimuladores", name: "Bioestimuladores de Soporte", tag: "Firmeza y densidad progresiva" },
    { id: "biogluteos", name: "BioGlúteos Premium", tag: "Proyección y realce corporal" }
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-start overflow-hidden rounded-3xl border border-nativa-green-accent/40 shadow-2xl">
        {/* Background Image overlay with translucent premium gradients so the beautiful NATÍVA clinic entrance is fully visible */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/lobby_nativa_reception_1779665891448.png"
            alt="Natíva Clinic Medellín Lobby"
            className="w-full h-full object-cover filter brightness-[0.75] scale-102 transition-all duration-[30s]"
            referrerPolicy="no-referrer"
          />
          {/* Side gradient on desktop to preserve high white-text readability on the left while leaving the clinic on the right pristine */}
          <div className="absolute inset-0 bg-gradient-to-r from-nativa-green-deep/95 via-nativa-green-deep/82 to-transparent hidden md:block"></div>
          {/* High-visibility overlay on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-nativa-green-deep/95 via-nativa-green-deep/80 to-nativa-green-deep/40 md:hidden"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-nativa-bg to-transparent"></div>
        </div>

        {/* Content Box: Placed on the left. Highly readable, no background box on desktop to ensure the clinic interior behaves visually as a focal point */}
        <div className="relative z-10 max-w-2xl px-6 md:px-12 text-left space-y-8 py-12 md:py-16 my-8 rounded-3xl md:bg-transparent md:border-0 md:shadow-none bg-[#092215]/85 backdrop-blur-md md:backdrop-blur-none border border-nativa-green-accent/15 shadow-2x mx-4 md:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-5"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-nativa-gold-warm/20 border border-nativa-gold-warm/50 text-nativa-gold-warm text-xs font-bold tracking-widest uppercase shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-nativa-gold-warm animate-bounce" /> Sede El Poblado • Medellín, Colombia
            </span>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-elegant font-bold tracking-tight text-white leading-[1.05]">
              NATÍVA<br />
              <span className="text-nativa-gold-warm font-light italic text-3xl sm:text-5xl md:text-6xl drop-shadow-sm">CLINIC</span>
            </h1>

            {/* Beautiful, High-Contrast Tagline Capsule Group */}
            <div className="border-y border-nativa-gold-warm/40 py-4 max-w-xl">
              <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 text-xs sm:text-sm tracking-[0.16em] sm:tracking-[0.24em] font-bold">
                <span className="text-nativa-gold-warm drop-shadow">NATURAL</span>
                <span className="text-white/40 font-light select-none">•</span>
                <span className="text-white drop-shadow">REGENERATIVA</span>
                <span className="text-white/40 font-light select-none">•</span>
                <span className="text-nativa-gold-warm drop-shadow">CIENCIA</span>
                <span className="text-white/40 font-light select-none">•</span>
                <span className="text-white bg-nativa-gold-warm/25 px-2.5 py-1 rounded border border-nativa-gold-warm/40 text-[10px] sm:text-xs uppercase tracking-[0.12em] font-extrabold shadow-sm">
                  IDENTIDAD LATINOAMERICANA
                </span>
              </div>
            </div>
          </motion.div>

          {/* Subtitle with slight text shadow for outstanding readability over any pixel of the background */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-xl text-sm sm:text-base text-slate-100 font-normal leading-relaxed drop-shadow-sm"
          >
            Descubre una nueva era de medicina estética de alta gama en Colombia. 
            Fusiones científicas patentadas y bio-tecnología celular avanzada para revitalizar tu piel de forma natural, 
            respetando la armonía elegante de tu fisonomía.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4"
          >
            <button
              onClick={() => onNavigate("reservas")}
              id="hero-book-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-nativa-gold-warm text-[#0f2b1d] font-extrabold text-xs sm:text-sm tracking-wide shadow-lg hover:shadow-nativa-gold-warm/30 hover:bg-gold-300 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Agendar Cita de Valoración
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => onNavigate("asesor")}
              id="hero-advisor-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0a1f14]/80 text-nativa-gold-warm font-extrabold text-xs sm:text-sm tracking-wide border border-nativa-gold-warm/50 hover:border-nativa-gold-warm hover:bg-[#123120] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
            >
              Consultar Asesoría con IA
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nativa-gold-warm opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-nativa-gold-warm"></span>
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Brand Pillars Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold tracking-tight text-nativa-green-deep">
            Nuestros Pilares de Excelencia
          </h2>
          <div className="w-16 h-0.5 bg-nativa-gold-warm mx-auto"></div>
          <p className="max-w-xl mx-auto text-sm text-slate-600">
            En NATÍVA CLINIC, cada tratamiento facial y corporal está consagrado a nuestra filosofía de cuidado inteligente, empático y médico.
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
            Medicina Regenerativa de Vanguardia
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold leading-tight text-nativa-green-deep">
            Tratamientos que despiertan la juventud de tus propias células
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-light">
            Nuestros tratamientos insígnia, como los <strong>Exosomas Clínicos</strong> y los <strong>Bioestimuladores de Colágeno</strong>, no rellenan de forma artificial: reactivan los mecanismos celulares apagados por el paso del tiempo. 
            Es la ciencia regenerativa que permite revertir el daño acumulado, devolviendo elasticidad y salud natural.
          </p>
          
          <div className="space-y-4 pt-2">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-nativa-gold-warm/10 border border-nativa-gold-warm/30 flex items-center justify-center text-nativa-gold-warm">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-semibold text-nativa-green-deep">Sin bisturí, sin anestesia</h4>
                <p className="text-xs text-slate-500">Tratamientos mínimamente invasivos con retorno inmediato a tus actividades diarias.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-nativa-gold-warm/10 border border-nativa-gold-warm/30 flex items-center justify-center text-nativa-gold-warm">
                ✓
              </div>
              <div>
                <h4 className="text-sm font-semibold text-nativa-green-deep">Tecnología de escáner tridimensional</h4>
                <p className="text-xs text-slate-500">Medimos con precisión milimétrica la evolución dermo-facial en cada cita de control.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate("tratamientos")}
            id="read-more-treatments"
            className="inline-flex items-center gap-2 text-sm font-semibold text-nativa-gold-warm hover:text-nativa-green-deep transition-colors duration-300 group pt-4 cursor-pointer"
          >
            Ver Catálogo de Tratamientos Complete
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Beautiful customized image block */}
        <div className="lg:col-span-12 xl:col-span-7 relative h-[450px] rounded-3xl overflow-hidden border border-nativa-green-accent/60 shadow-xl group">
          <img
            src="/src/assets/images/glowing_skin_skincare_1779648705733.png"
            alt="Facial Rejuvenation and Glowing Skin"
            className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-[10s]"
            referrerPolicy="no-referrer"
          />
          {/* Accent light decoration */}
          <div className="absolute inset-0 bg-gradient-to-t from-nativa-bg/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md border border-nativa-green-accent flex justify-between items-center shadow-lg">
            <div>
              <p className="text-xs text-nativa-gold-warm font-semibold tracking-widest uppercase mb-1">Tratamiento Revelación</p>
              <h4 className="text-sm sm:text-base font-serif-elegant font-bold text-nativa-green-deep">Exosomas Celulares de Rejuvenecimiento de Capilar y Facial</h4>
            </div>
            <button
              onClick={() => onSelectTreatment("exosomas")}
              className="px-4 py-2 text-xs rounded-full bg-nativa-green-deep text-white font-bold hover:bg-opacity-90 transition-colors cursor-pointer"
            >
              Conocer
            </button>
          </div>
        </div>
      </section>

      {/* Immersive Visual Gallery Section */}
      <section className="space-y-10">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-widest text-nativa-gold-warm flex items-center justify-center gap-1.5">
            <Palette className="w-4 h-4 text-nativa-gold-warm animate-pulse" /> El Arte de la Medicina Bioregenerativa
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold tracking-tight text-nativa-green-deep">
            Galería de Experiencia NATÍVA
          </h2>
          <div className="w-16 h-0.5 bg-nativa-gold-warm mx-auto"></div>
          <p className="text-sm text-slate-600 leading-relaxed font-light">
            En NATÍVA CLINIC cada detalle está diseñado para cautivar e inspirar. Explora de forma visual nuestras suites de atención médica premium, tecnologías de última generación alemana y terapias moleculares avanzadas.
          </p>
        </div>

        {/* Categories Filtros */}
        <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
          {[
            { id: "todos", label: "Explorar Todo", icon: Eye },
            { id: "instalaciones", label: "Instalaciones VIP", icon: MapPin },
            { id: "tecnologia", label: "Tecnología Médica", icon: ShieldCheck },
            { id: "tratamientos", label: "Terapias Celulares", icon: Award }
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
            {GALLERY_ITEMS.filter(item => selectedCategory === "todos" || item.category === selectedCategory).map((item) => (
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
                  <div className="pt-2 flex items-center gap-1.5 text-nativa-gold-light text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-3.5 h-3.5" /> Ampliar Experiencia Visual
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Lightbox / Immersive Full-screen view */}
      <AnimatePresence>
        {activePhoto && (
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
              className="relative max-w-4xl w-full bg-[#071d13] rounded-3xl overflow-hidden border border-nativa-gold-warm/35 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black/80 flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Visual Banner */}
                <div className="h-64 sm:h-96 md:h-full min-h-[300px] md:min-h-[450px] relative bg-black">
                  <img
                    src={activePhoto.image}
                    alt={activePhoto.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-nativa-gold-warm text-nativa-green-deep text-[10px] font-bold px-3 py-1 rounded-full border border-nativa-gold-warm/20 tracking-wider uppercase">
                    {activePhoto.tag}
                  </div>
                </div>

                {/* Info and CTA Panel */}
                <div className="p-8 md:p-10 flex flex-col justify-between space-y-6 text-white my-auto">
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-nativa-gold-warm flex items-center gap-1.5">
                      <Sparkle className="w-3.5 h-3.5 text-nativa-gold-warm animate-pulse" /> EXPERIENCIA PREMIUM NATÍVA
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif-elegant font-bold text-white tracking-tight leading-tight">
                      {activePhoto.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-nativa-gold-warm"></div>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {activePhoto.desc}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">
                      Equipamiento de primer nivel clínico y espacios de confort meticulosamente diseñados para ofrecer una experiencia estética transformadora en Medellín.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setActivePhoto(null);
                        onNavigate("reservas");
                      }}
                      className="flex-1 px-6 py-3.5 text-center rounded-full bg-nativa-gold-warm text-[#0f2b1d] font-bold text-xs hover:bg-gold-300 transition-colors shadow-lg cursor-pointer"
                    >
                      Agendar Consulta de Valoración
                    </button>
                    <button
                      onClick={() => {
                        setActivePhoto(null);
                        onNavigate("tratamientos");
                      }}
                      className="px-6 py-3.5 text-center rounded-full bg-white/5 border border-white/15 text-white hover:text-nativa-gold-warm hover:border-nativa-gold-warm/40 font-bold text-xs transition-colors cursor-pointer"
                    >
                      Ver todos
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Launch Treatments Quick links */}
      <section className="p-8 rounded-3xl bg-white border border-nativa-green-accent shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-serif-elegant font-bold text-nativa-green-deep">¿Tienes claro tu objetivo dermoestético?</h3>
            <p className="text-sm text-slate-500">Accede directamente al análisis especializado de nuestras terapias más solicitadas en Medellín.</p>
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
            <h4 className="text-sm font-semibold uppercase tracking-wider text-nativa-green-deep">Ubicación Medellín</h4>
          </div>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Calle 10A #34-21, El Poblado<br />
            Medellín, Antioquia, Colombia • Unidad Clínica 1204
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-nativa-green-accent shadow-sm space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-nativa-gold-warm">
            <Clock className="w-4 h-4" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-nativa-green-deep">Horario de Atención</h4>
          </div>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Lunes a Viernes: 8:00 AM – 7:00 PM<br />
            Sábados: 8:00 AM – 4:00 PM (Cita previa)
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-nativa-green-accent shadow-sm space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2 text-nativa-gold-warm">
            <Phone className="w-4 h-4" />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-nativa-green-deep">Contacto y Valoraciones</h4>
          </div>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Whatsapp Clínico: +57 312 876 5432<br />
            Correo: citas@nativaclinic.com
          </p>
        </div>
      </section>
    </div>
  );
}
