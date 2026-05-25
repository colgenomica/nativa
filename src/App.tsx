import { useState } from "react";
import { Sparkles, Calendar, BookOpen, BrainCircuit, Heart, Menu, X, ArrowUpRight, Users } from "lucide-react";
import HomeHero from "./components/HomeHero";
import AboutUsSection from "./components/AboutUsSection";
import TreatmentsCatalog from "./components/TreatmentsCatalog";
import AppointmentBooking from "./components/AppointmentBooking";
import AIAdvisor from "./components/AIAdvisor";

export default function App() {
  const [activeTab, setActiveTab] = useState<"inicio" | "somos" | "tratamientos" | "reservas" | "asesor">("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States to facilitate cross-tab quick selections
  const [preselectedId, setPreselectedId] = useState<string | null>(null);
  const [preselectedName, setPreselectedName] = useState<string | null>(null);

  // Navigate to catalog, highlight and read treatment details
  const handleSelectTreatmentFromHero = (treatmentId: string) => {
    setPreselectedId(treatmentId);
    setActiveTab("tratamientos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Direct trigger to book from treatment catalog
  const handleBookFromCatalog = (treatmentId: string, treatmentName: string) => {
    setPreselectedId(treatmentId);
    setPreselectedName(treatmentName);
    setActiveTab("reservas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Direct trigger to book from AI recommendation panel
  const handleQuickBookFromAdvisor = (treatmentId: string) => {
    setPreselectedId(treatmentId);
    // Find treatment name to display cleanly
    const tNamesList: { [k: string]: string } = {
      exosomas: "Exosomas Celulares",
      toxina: "Toxina Botulínica",
      bioestimuladores: "Bioestimuladores de Soporte",
      skinboosters: "Skinboosters",
      melasma: "Aclaramiento de Melasma",
      lipopapada: "Reducción de Lipopapada",
      biogluteos: "BioGlúteos",
      bodyshape: "BodyShape",
      remodelacion: "Remodelación Corporal Integral"
    };
    setPreselectedName(tNamesList[treatmentId] || null);
    setActiveTab("reservas");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (tab: "inicio" | "somos" | "tratamientos" | "reservas" | "asesor") => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    
    // Clear selections only when moving to homepage
    if (tab === "inicio") {
      setPreselectedId(null);
      setPreselectedName(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-nativa-bg text-slate-800 font-sans cursor-default antialiased">
      {/* Decorative top ambient glow line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-nativa-gold-warm via-nativa-green-deep to-nativa-gold-warm shadow-sm"></div>

      {/* Main Luxury Header Navigation */}
      <header className="sticky top-0 z-40 bg-nativa-bg/80 backdrop-blur-md border-b border-nativa-green-accent/60 py-4 px-6 md:px-12 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Clinic Brand Signature */}
          <div
            onClick={() => handleTabChange("inicio")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#0a2316] border border-nativa-gold-warm/85 text-nativa-gold-warm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] group-hover:border-nativa-gold-warm">
              <svg
                viewBox="0 0 100 100"
                className="w-5.5 h-5.5 text-nativa-gold-warm fill-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Elegant Left vertical line with fine serif footers */}
                <path d="M32 28 L32 72 M26 28 L38 28 M26 72 L38 72" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                
                {/* Elegant Right vertical line with fine serif footers */}
                <path d="M68 28 L68 72 M62 28 L74 28 M62 72 L74 72" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                
                {/* Calligraphic curved organic diagonal for "N" (representing natural aesthetics / clinical science wave) */}
                <path d="M32 30 C42 42, 58 58, 68 70" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
                
                {/* Delicate gold leaf sprout on top-right as a mark of native plant cellular science */}
                <path d="M68 28 C64 21, 55 24, 57 31 C62 33, 66 30, 68 28 Z" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col border-l border-nativa-gold-warm/40 pl-3">
              <h1 className="text-xl font-serif-elegant font-bold tracking-[0.15em] text-nativa-green-deep">
                NATÍVA
              </h1>
              <span className="text-[9px] text-nativa-gold-warm tracking-[0.3em] font-medium leading-none uppercase">
                Clinic
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-1 bg-white border border-nativa-green-accent/75 p-1 rounded-full px-2 shadow-sm">
            {[
              { id: "inicio", label: "Inicio", icon: Heart },
              { id: "somos", label: "Quiénes Somos", icon: Users },
              { id: "tratamientos", label: "Tratamientos", icon: BookOpen },
              { id: "reservas", label: "Agendar Cita", icon: Calendar },
              { id: "asesor", label: "Consultorio IA", icon: BrainCircuit }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-nativa-green-deep text-white shadow-sm"
                      : "text-slate-600 hover:text-nativa-green-deep hover:bg-nativa-green-accent/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                  {tab.id === "asesor" && (
                    <span className="flex h-1.5 w-1.5 rounded-full bg-nativa-gold-warm relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-nativa-gold-warm opacity-75"></span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sede Contact Info */}
          <div className="hidden lg:flex items-center gap-4">
            <span className="text-[11px] font-mono text-slate-500 font-medium">Medellín • El Poblado</span>
            <button
              onClick={() => handleTabChange("reservas")}
              className="px-5 py-2 rounded-full bg-nativa-green-deep hover:bg-nativa-green-deep/90 text-[11px] font-semibold tracking-wide text-white cursor-pointer transition-all shadow-sm"
            >
              Valoración Cortesía
            </button>
          </div>

          {/* Mobile Menu Icon toggler */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white border border-nativa-green-accent/60 text-slate-700 hover:text-nativa-green-deep hover:border-nativa-gold-warm/60 transition-colors cursor-pointer"
            title="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-[88px] left-0 right-0 z-50 p-4 bg-white border-b border-nativa-green-accent/60 space-y-2 md:hidden animate-in fade-in slide-in-from-top-4 duration-300 shadow-md">
            {[
              { id: "inicio", label: "Inicio", icon: Heart },
              { id: "somos", label: "Quiénes Somos", icon: Users },
              { id: "tratamientos", label: "Catálogo de Tratamientos", icon: BookOpen },
              { id: "reservas", label: "Reservar Cita", icon: Calendar },
              { id: "asesor", label: "Consultorio IA (Dra. Sofía)", icon: BrainCircuit }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as any)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-nativa-green-deep text-white font-bold"
                      : "text-slate-600 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4 text-nativa-gold-warm" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Container Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-10">
        {activeTab === "inicio" && (
          <HomeHero
            onNavigate={(tab: any) => handleTabChange(tab)}
            onSelectTreatment={handleSelectTreatmentFromHero}
          />
        )}
        {activeTab === "somos" && (
          <AboutUsSection
            onNavigate={(tab: any) => handleTabChange(tab)}
          />
        )}
        {activeTab === "tratamientos" && (
          <TreatmentsCatalog
            onBookTreatment={handleBookFromCatalog}
            selectedId={preselectedId}
            clearSelection={() => setPreselectedId(null)}
          />
        )}
        {activeTab === "reservas" && (
          <AppointmentBooking
            preselectedTreatmentId={preselectedId}
            preselectedTreatmentName={preselectedName}
          />
        )}
        {activeTab === "asesor" && (
          <AIAdvisor onQuickBook={handleQuickBookFromAdvisor} />
        )}
      </main>

      {/* Luxury Footer component */}
      <footer className="w-full bg-white border-t border-nativa-green-accent/60 py-12 px-6 md:px-12 text-slate-600 text-xs shadow-sm">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Signature Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#0a2316] flex items-center justify-center text-nativa-gold-warm border border-nativa-gold-warm/40 shadow-sm">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-4.5 h-4.5 text-nativa-gold-warm fill-none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M32 28 L32 72 M26 28 L38 28 M26 72 L38 72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M68 28 L68 72 M62 28 L74 28 M62 72 L74 72" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M32 30 C42 42, 58 58, 68 70" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                    <path d="M68 28 C64 21, 55 24, 57 31 C62 33, 66 30, 68 28 Z" fill="currentColor" />
                  </svg>
                </div>
                <h3 className="font-serif-elegant font-bold text-sm tracking-wider text-nativa-green-deep">NATÍVA CLINIC</h3>
              </div>
              <p className="text-[11px] font-light leading-relaxed text-slate-500">
                Líderes en medicina dermoestética, regenerativa y antienvejecimiento. Resultados naturales acreditados por la ciencia médica dermo-facial.
              </p>
              <div className="text-[10px] text-nativa-gold-warm tracking-widest font-mono uppercase font-semibold">
                Medellín • Colombia
              </div>
            </div>

            {/* Navigation Column */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-nativa-green-deep">Navegación</h4>
              <div className="grid grid-cols-1 gap-2 text-[11px] font-light">
                <button onClick={() => handleTabChange("inicio")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">Inicio</button>
                <button onClick={() => handleTabChange("somos")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">Quiénes Somos</button>
                <button onClick={() => handleTabChange("tratamientos")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">Tratamientos</button>
                <button onClick={() => handleTabChange("reservas")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">Agendar Cita</button>
                <button onClick={() => handleTabChange("asesor")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">Asesor IA</button>
              </div>
            </div>

            {/* Popular Treatments Column */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-nativa-green-deep">Tratamientos Estrella</h4>
              <div className="grid grid-cols-1 gap-2 text-[11px] font-light">
                <button onClick={() => handleSelectTreatmentFromHero("exosomas")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">Exosomas Celulares</button>
                <button onClick={() => handleSelectTreatmentFromHero("toxina")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">Toxina Botulínica</button>
                <button onClick={() => handleSelectTreatmentFromHero("bioestimuladores")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">Bioestimuladores de Colágeno</button>
                <button onClick={() => handleSelectTreatmentFromHero("biogluteos")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">BioGlúteos</button>
              </div>
            </div>

            {/* Legal Column */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-nativa-green-deep">Credenciales y Rigor</h4>
              <p className="text-[11px] font-light leading-relaxed text-slate-500">
                Habilitados bajo la reglamentación del Ministerio de Salud de Colombia. Consultorios avalados. El Poblado, Sede de Excelencia Primera Unidad.
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-nativa-gold-warm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Habilitación Seccional Salud Antioquia
              </div>
            </div>
          </div>

          <div className="border-t border-nativa-green-accent pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-light text-slate-450">
            <p>© {new Date().getFullYear()} NATÍVA CLINIC • Premium Aesthetic Centers. Todos los derechos reservados.</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-nativa-gold-warm transition-colors cursor-pointer flex items-center gap-0.5 font-medium">
                Instagram <ArrowUpRight className="w-3 h-3" />
              </span>
              <span className="hover:text-nativa-gold-warm transition-colors cursor-pointer flex items-center gap-0.5 font-medium">
                WhatsApp Médico <ArrowUpRight className="w-3 h-3" />
              </span>
              <span>Protección de Datos Personales (Colombia)</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
