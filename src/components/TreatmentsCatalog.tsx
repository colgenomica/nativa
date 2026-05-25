import { useState, useEffect } from "react";
import { Search, Clock, BadgeDollarSign, Heart, ChevronRight, X } from "lucide-react";
import { motion } from "motion/react";
import { Treatment } from "../types";

// Backup fallback treatment dataset for immediate zero-loading render
const INITIAL_TREATMENTS: Treatment[] = [
  {
    id: "exosomas",
    name: "Exosomas Celulares",
    category: "Facial",
    description: "Terapia de regeneración acelerada de última generación que reactiva la renovación celular profunda, tratando líneas finas, cicatrices y texturas desvitalizadas.",
    detailedInfo: "Utiliza nanopartículas mensajeras activadoras de factores de crecimiento para reprogramar el comportamiento dermoepidérmico de la piel. Excelente para secuelas de acné, poros dilatados y envejecimiento solar, impulsando un lifting facial orgánico que mejora drásticamente por meses.",
    duration: "60 min",
    price: "$1.200.000 COP",
    benefits: ["Acelera la cicatrización notablemente", "Induce la regeneración celular natural", "Suaviza poros dilatados y microtextura", "Aporta un resplandor duradero"],
    image: "/src/assets/images/glowing_skin_skincare_1779648705733.png"
  },
  {
    id: "toxina",
    name: "Toxina Botulínica",
    category: "Facial",
    description: "Tratamiento de alta precisión para suavizar con naturalidad las líneas de expresión mímicas en frente, entrecejo y contorno ocular.",
    detailedInfo: "Modula temporal y delicadamente la contracción muscular para atenuar las arrugas dinámicas y prevenir la formación de surcos fijos. Prioriza un resultado fresco, descansado y libre de rigidez.",
    duration: "45 min",
    price: "$950.000 COP",
    benefits: ["Suaviza líneas de la frente y entrecejo", "Efecto preventivo contra el envejecimiento", "Preserva la expresividad natural del rostro", "Tratamiento rápido con mínima recuperación"],
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "bioestimuladores",
    name: "Bioestimuladores de Colágeno",
    category: "Facial",
    description: "Inductores dérmicos de alta gama (Sculptra / Radiesse) diseñados para regenerar la estructura de soporte de la piel y devolver la elasticidad perdida.",
    detailedInfo: "La inyección subcutánea controlada estimula la neocolagénesis activa de nuevo colágeno progresivo. Redibuja los contornos, restaura el volumen perdido y redefine la firmeza del rostro.",
    duration: "60 min",
    price: "$1.800.000 COP",
    benefits: ["Combate la flacidez facial estructural", "Resultados duraderos de hasta 24 meses", "Estimula la producción real de colágeno natural", "Recupera la firmeza y densidad de forma progresiva"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "skinboosters",
    name: "Skinboosters",
    category: "Facial",
    description: "Hidratación hidrodinámica profunda con microgotas de ácido hialurónico estabilizado, logrando una piel turgente con brillo radiante instantáneo.",
    detailedInfo: "Restaura las reservas hídricas profundas que las cremas tópicas no logran alcanzar. Nutre la dermis de forma uniforme, difuminando finísimas líneas de deshidratación y emparejando la elasticidad.",
    duration: "50 min",
    price: "$850.000 COP",
    benefits: ["Hidratación profunda a nivel molecular", "Mejora inmediata de la elasticidad y suavidad", "Efecto dermo-glaze saludable y húmedo", "Ideal post-exposición solar o cambios estacionales"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "melasma",
    name: "Aclaramiento de Melasma",
    category: "Facial",
    description: "Plan clínico combinado para atenuar de forma no agresiva manchas de hiperpigmentación solar u hormonal.",
    detailedInfo: "Combina agentes liposomados con activos inhibidores de melanina para unificar el tono y regular la sobreproducción cromática de los melanocitos, protegiendo y refuerzando la barrera cutánea.",
    duration: "60 min",
    price: "$1.100.000 COP",
    benefits: ["Atenúa manchas rebeldes persistentes", "Regula la pigmentación a nivel celular", "Unifica el tono global del rostro", "Incluye guía dermatológica domiciliaria completa"],
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=85&w=600&auto=format&fit=crop"
  },
  {
    id: "lipopapada",
    name: "Reducción de Lipopapada",
    category: "Facial",
    description: "Tratamiento moldeador enfocado en disolver los acúmulos grasos y tensar la piel de la zona submentoniana.",
    detailedInfo: "Aplica enzimas lipolíticas focalizadas y ultratecnología de calor electromagnético para compactar y definir marcadamente la línea de perfil mandibular con total comodidad.",
    duration: "45 min",
    price: "$780.000 COP",
    benefits: ["Remodela la zona mandibular de perfil", "Disuelve grasa localizada submentoniana", "Recupera la tensión y disminuye la flacidez", "Sesiones cortas ambulatorias de rápida recuperación"],
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "biogluteos",
    name: "BioGlúteos",
    category: "Corporal",
    description: "Procedimiento de medicina estética avanzada para proyectar, modelar y tonificar los glúteos induciendo la regeneración tisular natural.",
    detailedInfo: "Combina tecnologías bioestimuladoras localizadas con activos dermoestéticos tensores para realzar el polo superior y mejorar de forma evidente la firmeza integral del área sin implantes quirúrgicos.",
    duration: "75 min",
    price: "$2.200.000 COP",
    benefits: ["Proyecta y eleva el contorno de glúteos", "Mejora progresivamente la textura y celulitis", "Tratamiento seguro sin anestesia general", "Armonía natural alineada a tu silueta"],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "bodyshape",
    name: "BodyShape",
    category: "Corporal",
    description: "Protocolo de remodelado de volumen graso rebelde y drenaje linfático activo con tecnología combinada de vanguardia.",
    detailedInfo: "Emplea aparatología médica no invasiva que optimiza la microcirculación y reduce la circunferencia de muslos, abdomen o brazos, brindando un aspecto atlético, firme y con menor retención de líquidos.",
    duration: "60 min",
    price: "$1.400.000 COP",
    benefits: ["Disminuye panículo adiposo localizado", "Reduce celulitis y drena toxinas tisulares", "No invasivo, indoloro y sumamente placentero", "Firmeza dermoepidérmica inmediata"],
    image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "remodelacion",
    name: "Remodelación Corporal Integral",
    category: "Corporal",
    description: "Tratamiento global que redibuja las líneas corporales de manera científica, combatiendo simultáneamente flacidez y celulitis.",
    detailedInfo: "Enfoque sinérgico de última generación que integra bioestimulación cutánea corporal con microondas y ultrasonido de alta frecuencia para redefinir muslos, flancos y abdomen.",
    duration: "90 min",
    price: "$2.600.000 COP",
    benefits: ["Redefinición integral de siluetas", "Tensa la piel flácida post-pérdida de peso", "Optimiza la salud y el tono del tejido", "Sesiones personalizadas supervisadas por expertos"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop"
  }
];

interface TreatmentsCatalogProps {
  onBookTreatment: (id: string, name: string) => void;
  selectedId: string | null;
  clearSelection: () => void;
}

export default function TreatmentsCatalog({ onBookTreatment, selectedId, clearSelection }: TreatmentsCatalogProps) {
  const [treatments, setTreatments] = useState<Treatment[]>(INITIAL_TREATMENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"Todos" | "Facial" | "Corporal">("Todos");
  const [activeDetailTreatment, setActiveDetailTreatment] = useState<Treatment | null>(null);

  // Fetch treatments from our server API, fallback to INITIAL_TREATMENTS on any issue
  useEffect(() => {
    fetch("/api/treatments")
      .then((res) => res.json())
      .then((payload) => {
        if (payload && payload.data) {
          setTreatments(payload.data);
        }
      })
      .catch((err) => {
        console.warn("API Treatments call failed, rendering offline state gracefully.");
      });
  }, []);

  // Sync selection trigger from other views (like Hero and Advisor 추천)
  useEffect(() => {
    if (selectedId) {
      const found = treatments.find((t) => t.id === selectedId);
      if (found) {
        setActiveDetailTreatment(found);
      }
    }
  }, [selectedId, treatments]);

  // Filters application
  const filteredTreatments = treatments.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.detailedInfo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Todos" || t.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCloseDetail = () => {
    setActiveDetailTreatment(null);
    clearSelection();
  };

  return (
    <div className="space-y-8">
      {/* Catalog Title and filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-nativa-green-accent/60">
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-nativa-gold-warm">
            Estética con Rigor Científico
          </span>
          <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold text-nativa-green-deep">
            Portafolio Clínico de Tratamientos
          </h2>
          <p className="text-sm text-slate-600 max-w-lg">
            Procedimientos combinados faciales y corporales de alto rendimiento diseñados específicamente para pieles latinoamericanas.
          </p>
        </div>

        {/* Search and Categories buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar tratamiento..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-full bg-white border border-nativa-green-accent text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-nativa-gold-warm transition-colors"
            />
          </div>

          {/* Selector categories */}
          <div className="flex rounded-full bg-white p-1 border border-nativa-green-accent">
            {(["Todos", "Facial", "Corporal"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-nativa-green-deep text-white shadow-sm"
                    : "text-slate-600 hover:text-nativa-green-deep"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Treatments list */}
      {filteredTreatments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="flex flex-col rounded-2xl bg-white border border-nativa-green-accent hover:border-nativa-gold-warm/50 hover:bg-nativa-card-hover transition-all duration-300 group overflow-hidden shadow-sm"
            >
              {/* Cover treatment image banner */}
              <div className="relative h-44 w-full overflow-hidden bg-nativa-bg border-b border-nativa-green-accent">
                <img
                  src={treatment.image || "/src/assets/images/glowing_skin_skincare_1779648705733.png"}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.96]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5"></div>
              </div>

              <div className="p-6 flex-1 space-y-4">
                {/* Category & Tag */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-nativa-green-accent/60 border border-nativa-green-accent text-[10px] font-bold tracking-wider text-nativa-green-deep uppercase">
                    {treatment.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-semibold font-mono">
                    <Clock className="w-3.5 h-3.5 text-nativa-gold-warm" />
                    {treatment.duration}
                  </div>
                </div>

                {/* Treatment core card */}
                <div className="space-y-2">
                  <h3 className="text-xl font-serif-elegant font-bold text-nativa-green-deep group-hover:text-nativa-gold-warm transition-colors">
                    {treatment.name}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {treatment.description}
                  </p>
                </div>

                {/* Bullets outline snippet */}
                <div className="space-y-1.5 text-xs text-slate-650 pt-2 border-t border-nativa-green-accent/60">
                  {treatment.benefits.slice(0, 2).map((b, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-nativa-gold-warm flex-shrink-0"></span>
                      <span className="truncate font-light text-slate-600">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price and Details link */}
              <div className="p-5 bg-nativa-bg/60 border-t border-nativa-green-accent/60 flex items-center justify-between">
                <div>
                  <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Inversión aprox.</span>
                  <span className="text-sm font-bold text-nativa-gold-light font-mono">{treatment.price}</span>
                </div>
                <button
                  onClick={() => setActiveDetailTreatment(treatment)}
                  className="px-4 py-2 rounded-xl bg-nativa-green-accent border border-nativa-green-deep/15 hover:bg-nativa-green-deep hover:text-white text-xs font-semibold text-nativa-green-deep tracking-wide transition-all cursor-pointer flex items-center gap-1"
                >
                  Detalles
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-16 text-center border border-dashed border-nativa-green-accent rounded-2xl bg-white space-y-4">
          <Heart className="w-12 h-12 text-nativa-gold-warm/40 mx-auto" />
          <h3 className="text-lg font-serif-elegant font-semibold text-nativa-green-deep">No encontramos tratamientos</h3>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Recuerda que también puedes pedir recomendaciones personalizadas directamente a la Dra. Sofía, nuestra asesora interactiva con Inteligencia Artificial.
          </p>
          <button
            onClick={() => { setSearchTerm(""); setSelectedCategory("Todos"); }}
            className="px-5 py-2 rounded-full border border-nativa-gold-warm text-xs text-nativa-gold-warm hover:bg-nativa-gold-warm hover:text-white transition-colors cursor-pointer"
          >
            Restaurar Filtros
          </button>
        </div>
      )}

      {/* Detail Slide out Drawer / Modal */}
      {activeDetailTreatment && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm p-4 sm:p-6 transition-all">
          <div className="absolute inset-0 cursor-pointer" onClick={handleCloseDetail}></div>
          <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="relative w-full max-w-lg h-full max-h-[95vh] sm:max-h-full overflow-y-auto rounded-3xl bg-white border border-nativa-green-accent shadow-2xl p-6 sm:p-8 flex flex-col justify-between"
          >
            {/* Header control */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-nativa-green-accent pb-4">
                <span className="px-3 py-1 rounded-full bg-nativa-gold-warm/10 border border-nativa-gold-warm text-[10px] font-semibold text-nativa-gold-warm uppercase tracking-widest">
                  Unidad Medellín • {activeDetailTreatment.category}
                </span>
                <button
                  onClick={handleCloseDetail}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-all cursor-pointer"
                  title="Cerrar detalles"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Treatment Main Metadata */}
              <div className="space-y-4">
                <div className="h-52 w-full rounded-2xl overflow-hidden bg-nativa-bg border border-nativa-green-accent shadow-sm">
                  <img
                    src={activeDetailTreatment.image || "/src/assets/images/glowing_skin_skincare_1779648705733.png"}
                    alt={activeDetailTreatment.name}
                    className="w-full h-full object-cover brightness-[0.97]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-3xl font-serif-elegant font-bold text-nativa-green-deep">
                  {activeDetailTreatment.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {activeDetailTreatment.detailedInfo}
                </p>
              </div>

              {/* Operational Stats: Duration and Price Tag */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-nativa-bg border border-nativa-green-accent font-mono shadow-inner">
                <div>
                  <span className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider font-bold mb-1">Duración Sesión</span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-800 font-semibold">
                    <Clock className="w-4 h-4 text-nativa-gold-warm" />
                    {activeDetailTreatment.duration}
                  </div>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-sans uppercase tracking-wider font-bold mb-1">Precio Sugerido</span>
                  <div className="flex items-center gap-1.5 text-xs text-nativa-gold-light font-bold">
                    <BadgeDollarSign className="w-4 h-4 text-nativa-gold-warm" />
                    {activeDetailTreatment.price}
                  </div>
                </div>
              </div>

              {/* Benefits Checklist section */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold tracking-wider uppercase text-nativa-green-deep">Beneficios Clínicos Clave</h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeDetailTreatment.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-nativa-gold-warm/15 border border-nativa-gold-warm/30 text-nativa-gold-warm flex items-center justify-center font-bold text-[10px] mt-0.5">
                        ✓
                      </div>
                      <span className="leading-relaxed text-slate-600 font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions button */}
            <div className="pt-8 border-t border-nativa-green-accent mt-8 space-y-3">
              <button
                onClick={() => {
                  onBookTreatment(activeDetailTreatment.id, activeDetailTreatment.name);
                  handleCloseDetail();
                }}
                className="w-full py-4 text-center rounded-full bg-nativa-green-deep text-white font-bold tracking-wide text-sm hover:bg-opacity-95 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2 group shadow-lg"
              >
                Agendar {activeDetailTreatment.name}
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <p className="text-[10px] text-center text-slate-500 font-light">
                *Los precios son de referencia y pueden variar previo diagnóstico en el escáner facial 3D.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
