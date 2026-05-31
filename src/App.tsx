import { useState } from "react";
import { Sparkles, Calendar, BookOpen, BrainCircuit, Heart, Menu, X, ArrowUpRight, Users, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import HomeHero from "./components/HomeHero";
import AboutUsSection from "./components/AboutUsSection";
import TreatmentsCatalog from "./components/TreatmentsCatalog";
import AppointmentBooking from "./components/AppointmentBooking";
import AIAdvisor from "./components/AIAdvisor";
import { useLanguage } from "./context/LanguageContext";

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"inicio" | "somos" | "tratamientos" | "reservas" | "asesor">("inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

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
      exosomas: t("hero.mainTreatments.exosomas"),
      toxina: t("hero.mainTreatments.toxina"),
      bioestimuladores: t("hero.mainTreatments.bioestimuladores"),
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
            <div className="w-10 h-10 rounded-full bg-[#2E2E2B] border border-nativa-gold-warm/85 text-nativa-gold-warm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(194,181,155,0.4)] group-hover:border-nativa-gold-warm">
              <span className="font-serif-elegant text-sm font-semibold tracking-tighter text-nativa-gold-warm">O</span>
            </div>
            <div className="flex flex-col border-l border-nativa-gold-warm/40 pl-3">
              <h1 className="text-xl font-serif-elegant font-bold tracking-[0.14em] text-nativa-green-deep">
                ONE CLINIC
              </h1>
              <span className="text-[10px] text-nativa-gold-warm font-serif-elegant italic tracking-[0.14em] leading-none mt-0.5 font-medium">
                {language === "en" ? "Advanced Aesthetics" : language === "pt" ? "Estética Avançada" : "Estética Avanzada"}
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-1 bg-white border border-nativa-green-accent/75 p-1 rounded-full px-2 shadow-sm">
            {[
              { id: "inicio", label: t("nav.home"), icon: Heart },
              { id: "somos", label: t("nav.about"), icon: Users },
              { id: "tratamientos", label: t("nav.treatments"), icon: BookOpen },
              { id: "reservas", label: t("nav.book"), icon: Calendar },
              { id: "asesor", label: t("nav.advisor"), icon: BrainCircuit }
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
            {/* Elegant Dropdown Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-nativa-green-accent/60 text-[11px] font-bold shadow-sm hover:border-nativa-gold-warm transition-all cursor-pointer text-slate-700"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <img
                  src={
                    language === "es"
                      ? "https://flagcdn.com/w40/co.png"
                      : language === "en"
                      ? "https://flagcdn.com/w40/us.png"
                      : "https://flagcdn.com/w40/br.png"
                  }
                  className="w-4.5 h-4.5 rounded-full object-cover border border-slate-100 shadow-xs"
                  alt={language}
                  referrerPolicy="no-referrer"
                />
                <span className="uppercase tracking-wider font-bold">{language}</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isLangDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <>
                    {/* Invisible Backdrop to close dropdown on click outside */}
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsLangDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 z-50 w-36 rounded-2xl bg-white border border-nativa-green-accent shadow-xl overflow-hidden p-1.5"
                    >
                      {[
                        { code: "es", label: "Español", flag: "https://flagcdn.com/w40/co.png" },
                        { code: "en", label: "English", flag: "https://flagcdn.com/w40/us.png" },
                        { code: "pt", label: "Português", flag: "https://flagcdn.com/w40/br.png" }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-xs font-semibold cursor-pointer transition-colors ${
                            language === lang.code
                              ? "bg-nativa-green-deep text-white"
                              : "text-slate-600 hover:bg-slate-50 hover:text-nativa-green-deep"
                          }`}
                        >
                          <img
                            src={lang.flag}
                            className="w-4.5 h-4.5 rounded-full object-cover border border-slate-100 shadow-xs"
                            alt={lang.label}
                            referrerPolicy="no-referrer"
                          />
                          <span>{lang.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>


            <button
              onClick={() => handleTabChange("reservas")}
              className="px-5 py-2 rounded-full bg-nativa-green-deep hover:bg-nativa-green-deep/90 text-[11px] font-semibold tracking-wide text-white cursor-pointer transition-all shadow-sm"
            >
              {t("nav.courtesy")}
            </button>
          </div>

          {/* Mobile Right Container (Language Switcher + Mobile Menu Toggle) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Elegant Mobile Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white border border-nativa-green-accent/60 text-[10px] font-bold shadow-sm cursor-pointer text-slate-700"
              >
                <img
                  src={
                    language === "es"
                      ? "https://flagcdn.com/w40/co.png"
                      : language === "en"
                      ? "https://flagcdn.com/w40/us.png"
                      : "https://flagcdn.com/w40/br.png"
                  }
                  className="w-4 h-4 rounded-full object-cover border border-slate-100 shadow-xs"
                  alt={language}
                  referrerPolicy="no-referrer"
                />
                <span className="uppercase tracking-wide font-bold">{language}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {isLangDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsLangDropdownOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.12 }}
                      className="absolute right-0 mt-1.5 z-50 w-32 rounded-xl bg-white border border-nativa-green-accent shadow-lg overflow-hidden p-1"
                    >
                      {[
                        { code: "es", label: "ESP", flag: "https://flagcdn.com/w40/co.png" },
                        { code: "en", label: "ENG", flag: "https://flagcdn.com/w40/us.png" },
                        { code: "pt", label: "POR", flag: "https://flagcdn.com/w40/br.png" }
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as any);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-[10px] font-bold cursor-pointer transition-colors ${
                            language === lang.code
                              ? "bg-nativa-green-deep text-white"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <img
                              src={lang.flag}
                              className="w-4 h-4 rounded-full object-cover border border-slate-100 shadow-xs"
                              alt={lang.label}
                              referrerPolicy="no-referrer"
                            />
                            <span>{lang.label}</span>
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white border border-nativa-green-accent/60 text-slate-700 hover:text-nativa-green-deep hover:border-nativa-gold-warm/60 transition-colors cursor-pointer"
              title="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="absolute top-[88px] left-0 right-0 z-50 p-4 bg-white border-b border-nativa-green-accent/60 space-y-2 md:hidden animate-in fade-in slide-in-from-top-4 duration-300 shadow-md">
            {[
              { id: "inicio", label: t("nav.home"), icon: Heart },
              { id: "somos", label: t("nav.about"), icon: Users },
              { id: "tratamientos", label: t("nav.treatments"), icon: BookOpen },
              { id: "reservas", label: t("nav.book"), icon: Calendar },
              { id: "asesor", label: t("nav.mobileAdvisor"), icon: BrainCircuit }
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
                <div className="w-8 h-8 rounded-full bg-[#2E2E2B] flex items-center justify-center text-nativa-gold-warm border border-nativa-gold-warm/40 shadow-sm">
                  <span className="font-serif-elegant text-xs font-semibold text-nativa-gold-warm">O</span>
                </div>
                <h3 className="font-serif-elegant font-bold text-sm tracking-wider text-nativa-green-deep">ONE CLINIC</h3>
               </div>
              <p className="text-[11px] font-light leading-relaxed text-slate-500">
                {language === "en"
                  ? "Leaders in dermoaesthetic, regenerative and aging medicine. Natural results certified by dermo-facial medical science."
                  : language === "pt"
                  ? "Líderes em medicina dermoestética, regenerativa e antienvelhecimento. Resultados naturais certificados pela ciência médica dermo-facial."
                  : "Líderes en medicina dermoestética, regenerativa y antienvejecimiento. Resultados naturales acreditados por la ciencia médica dermo-facial."
                }
              </p>
              <div className="text-[10px] text-nativa-gold-warm tracking-widest font-mono uppercase font-semibold">
                Medellín • Colombia
              </div>
            </div>

            {/* Navigation Column */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-nativa-green-deep">
                {language === "en" ? "Navigation" : language === "pt" ? "Navegação" : "Navegación"}
              </h4>
              <div className="grid grid-cols-1 gap-2 text-[11px] font-light">
                <button onClick={() => handleTabChange("inicio")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("nav.home")}</button>
                <button onClick={() => handleTabChange("somos")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("nav.about")}</button>
                <button onClick={() => handleTabChange("tratamientos")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("nav.treatments")}</button>
                <button onClick={() => handleTabChange("reservas")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("nav.book")}</button>
                <button onClick={() => handleTabChange("asesor")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("nav.advisor")}</button>
              </div>
            </div>

            {/* Popular Treatments Column */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-nativa-green-deep">{t("hero.mainTreatments.title")}</h4>
              <div className="grid grid-cols-1 gap-2 text-[11px] font-light">
                <button onClick={() => handleSelectTreatmentFromHero("exosomas")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("hero.mainTreatments.exosomas")}</button>
                <button onClick={() => handleSelectTreatmentFromHero("toxina")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("hero.mainTreatments.toxina")}</button>
                <button onClick={() => handleSelectTreatmentFromHero("bioestimuladores")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("hero.mainTreatments.bioestimuladores")}</button>
                <button onClick={() => handleSelectTreatmentFromHero("biogluteos")} className="hover:text-nativa-gold-warm text-left cursor-pointer font-medium transition-colors">{t("hero.mainTreatments.biogluteos")}</button>
              </div>
            </div>

            {/* Legal Column */}
            <div className="space-y-3">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-nativa-green-deep">
                {language === "en" ? "Credentials & Rigor" : language === "pt" ? "Credenciais e Rigor" : "Credenciales y Rigor"}
              </h4>
              <p className="text-[11px] font-light leading-relaxed text-slate-500 font-serif-elegant">
                {t("about.regulations")}
              </p>
              <div className="flex items-center gap-1.5 text-[10px] text-nativa-gold-warm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                {t("about.accreditation")}
              </div>
            </div>
          </div>

          <div className="border-t border-nativa-green-accent pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-light text-slate-450">
            <p>{t("common.rights")}</p>
            <div className="flex items-center gap-4">
              <span className="hover:text-nativa-gold-warm transition-colors cursor-pointer flex items-center gap-0.5 font-medium">
                {t("common.instagram")} <ArrowUpRight className="w-3 h-3" />
              </span>
              <span className="hover:text-nativa-gold-warm transition-colors cursor-pointer flex items-center gap-0.5 font-medium">
                {t("common.whatsapp")} <ArrowUpRight className="w-3 h-3" />
              </span>
              <span>{t("common.protection")}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
