import { motion } from "motion/react";
import { Sparkles, ShieldCheck, Leaf, Heart, Award, Sparkle, Target, Compass, Sprout } from "lucide-react";

interface AboutUsSectionProps {
  onNavigate: (tab: "inicio" | "tratamientos" | "reservas" | "asesor") => void;
}

export default function AboutUsSection({ onNavigate }: AboutUsSectionProps) {
  return (
    <div className="space-y-12 py-4">
      {/* Title Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto animate-fade-in">
        <span className="text-xs font-bold uppercase tracking-widest text-nativa-gold-warm flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> NUESTRA ESENCIA
        </span>
        <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold tracking-tight text-nativa-green-deep animate-text-glow">
          Sobre NATÍVA CLINIC
        </h2>
        <div className="w-20 h-0.5 bg-nativa-gold-warm mx-auto"></div>
        <p className="text-sm md:text-base text-slate-600 font-light max-w-xl mx-auto">
          Conoce la filosofía, origen y el equipo que definen el nuevo estándar de la medicina estética dermoepidérmica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Section 1: Quiénes Somos */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-10 rounded-3xl bg-white border border-nativa-green-accent shadow-sm flex flex-col justify-between space-y-8 hover:border-nativa-gold-warm/40 transition-colors duration-300"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nativa-bg border border-nativa-gold-warm/20 text-nativa-gold-warm flex items-center justify-center shadow-inner">
                <Leaf className="w-5 h-5 text-nativa-gold-warm" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif-elegant font-bold text-nativa-green-deep uppercase tracking-wider">
                QUIÉNES SOMOS
              </h3>
            </div>
            
            <div className="h-[2px] w-12 bg-nativa-gold-warm"></div>

            <div className="space-y-5 text-slate-700 leading-relaxed font-light text-sm md:text-base text-justify">
              <p className="font-semibold text-nativa-green-deep text-base md:text-lg text-justify">
                NATÍVA CLINIC nace de la unión entre ciencia estética, identidad latinoamericana y belleza natural.
              </p>
              <p className="text-justify">
                Inspirada en la excelencia estética brasileña y creada para el mercado colombiano, NATÍVA surge con un propósito claro: transformar la experiencia de la estética moderna en una propuesta más accesible, sofisticada y humana.
              </p>
              <p className="text-justify">
                Creemos que el cuidado personal no debe sentirse distante ni exclusivo. Por eso desarrollamos un modelo de clínica que combina tecnología, protocolos modernos, atención cercana y resultados naturales, pensado para personas reales y estilos de vida actuales.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-nativa-green-accent/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-mono text-nativa-gold-light font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Habilitación Seccional Salud Antioquia
            </span>
            <button
              onClick={() => onNavigate("reservas")}
              className="px-6 py-3 rounded-full bg-nativa-green-deep text-white text-xs font-bold hover:bg-[#123120] transition-colors shadow-md cursor-pointer"
            >
              Agenda Consulta de Valoración
            </button>
          </div>
        </motion.div>

        {/* Section 2: El Significado de Natíva */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="p-8 md:p-10 rounded-3xl bg-[#092215] border border-nativa-gold-warm/20 shadow-xl flex flex-col justify-between space-y-8 relative overflow-hidden"
        >
          {/* Subtle elegant backdrop pattern */}
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
            <Leaf className="w-64 h-64 text-white rotate-45 transform" />
          </div>

          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-nativa-gold-warm/35 text-nativa-gold-warm flex items-center justify-center">
                <Sprout className="w-5 h-5 text-nativa-gold-warm animate-pulse" />
              </div>
              <h3 className="text-xl md:text-2xl font-serif-elegant font-bold text-nativa-gold-warm uppercase tracking-wider">
                EL SIGNIFICADO DE NATÍVA
              </h3>
            </div>

            <div className="h-[2px] w-12 bg-nativa-gold-warm"></div>

            <div className="space-y-5 text-slate-200 leading-relaxed font-light text-sm md:text-base text-justify">
              <p className="font-semibold text-white text-base md:text-lg text-justify font-serif-elegant">
                La palabra NATÍVA representa origen, esencia y autenticidad.
              </p>
              <p className="text-justify">
                Inspirada en la riqueza natural del trópico latinoamericano, la marca refleja una belleza que no busca transformar quién eres, sino resaltar tu mejor versión con armonía, confianza y naturalidad.
              </p>
              <p className="text-justify">
                NATÍVA conecta naturaleza, bienestar y ciencia estética en una experiencia moderna, elegante y emocionalmente cercana.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 relative z-10">
            <blockquote className="space-y-2">
              <p className="font-serif-elegant italic text-base md:text-lg text-nativa-gold-warm font-medium">
                "Porque para nosotros, la verdadera belleza no se exagera. Se revela."
              </p>
              <cite className="block text-[10px] tracking-widest text-slate-400 uppercase font-bold font-mono">
                — Manifiesto de Marca NATÍVA
              </cite>
            </blockquote>
          </div>
        </motion.div>
      </div>

      {/* Misión y Visión Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-10 rounded-3xl bg-white border border-nativa-green-accent shadow-sm hover:border-nativa-gold-warm/40 transition-colors duration-300 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nativa-bg border border-nativa-gold-warm/20 text-nativa-gold-warm flex items-center justify-center">
                <Target className="w-5 h-5 text-nativa-gold-warm" />
              </div>
              <h3 className="text-lg md:text-xl font-serif-elegant font-bold text-nativa-green-deep">
                NUESTRA MISIÓN
              </h3>
            </div>
            <div className="h-[2px] w-12 bg-nativa-gold-warm"></div>
            <p className="text-sm md:text-base text-slate-650 leading-relaxed font-light text-justify">
              Coadyuvar a la dermoestética, salud y autoconfianza de nuestros pacientes a través de terapias celulares avanzadas, protocolos de rejuvenecimiento de vanguardia y procedimientos mínimamente invasivos con rigor clínico insuperable. Restablecemos la juventud cutánea impulsando la regeneración celular íntegra desde adentro, priorizando siempre la armonía elegante que exalta la esencia natural de cada persona.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 md:p-10 rounded-3xl bg-white border border-nativa-green-accent shadow-sm hover:border-nativa-gold-warm/40 transition-colors duration-300 flex flex-col justify-between space-y-6"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-nativa-bg border border-nativa-gold-warm/20 text-nativa-gold-warm flex items-center justify-center">
                <Compass className="w-5 h-5 text-nativa-gold-warm" />
              </div>
              <h3 className="text-lg md:text-xl font-serif-elegant font-bold text-nativa-green-deep">
                NUESTRA VISIÓN
              </h3>
            </div>
            <div className="h-[2px] w-12 bg-nativa-gold-warm"></div>
            <p className="text-sm md:text-base text-slate-650 leading-relaxed font-light text-justify">
              Para el año 2035, consolidarnos como la clínica boutique de mayor prestigio e insignia en medicina bioregenerativa dermoestética en Medellín y el territorio nacional. Seremos distinguidos por ser pioneros en la adopción científica de biotecnología celular, por la excelencia en diagnósticos tridimensionales de alta definición y por brindar una experiencia premium intachable que celebra la naturalidad humana.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Core Values Section updated to match the minimalist aesthetic */}
      <section className="pt-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-nativa-gold-warm font-mono mb-1 block">
            Nuestros Pilares
          </span>
          <h3 className="text-2xl md:text-3xl font-serif-elegant font-bold text-nativa-green-deep">
            Valores Institucionales
          </h3>
          <div className="w-16 h-0.5 bg-nativa-gold-warm mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "Ética Médica Rigurosa",
              desc: "Solo ofrecemos alternativas científicas contrastadas de efectividad y seguridad clínicamente probada.",
            },
            {
              icon: Heart,
              title: "Resultados Armónicos",
              desc: "Buscamos despertar la belleza biológica genuina de tus propias células con correcciones respetuosas y sutiles.",
            },
            {
              icon: ShieldCheck,
              title: "Seguridad Sin Concesiones",
              desc: "Instalaciones de primer nivel, tecnología 3D alemana y productos originales certificados de prestigio mundial.",
            },
          ].map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-nativa-green-accent shadow-sm space-y-4 text-center hover:shadow-md hover:border-nativa-gold-warm/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-nativa-bg border border-nativa-gold-warm/15 text-nativa-gold-warm flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif-elegant font-bold text-nativa-green-deep text-lg md:text-xl">
                  {val.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
