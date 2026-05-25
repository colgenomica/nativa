import { useState, useEffect, FormEvent } from "react";
import { Calendar, Clock, User, Phone, Mail, Sparkles, FileText, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Booking } from "../types";

const CLINICAL_HOURS = [
  "08:00 AM", "09:30 AM", "11:00 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"
];

const TREATMENTS_LIST = [
  { id: "exosomas", name: "Exosomas Celulares" },
  { id: "toxina", name: "Toxina Botulínica" },
  { id: "bioestimuladores", name: "Bioestimuladores de Colágeno" },
  { id: "skinboosters", name: "Skinboosters" },
  { id: "melasma", name: "Aclaramiento de Melasma" },
  { id: "lipopapada", name: "Reducción de Lipopapada" },
  { id: "biogluteos", name: "BioGlúteos" },
  { id: "bodyshape", name: "BodyShape" },
  { id: "remodelacion", name: "Remodelación Corporal Integral" }
];

interface AppointmentBookingProps {
  preselectedTreatmentId: string | null;
  preselectedTreatmentName: string | null;
}

export default function AppointmentBooking({ preselectedTreatmentId, preselectedTreatmentName }: AppointmentBookingProps) {
  // Local list of persisted bookings
  const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
  
  // Step manager or Form values
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);
  const [treatmentId, setTreatmentId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Sync pre-selected treatment if directed from treatments view
  useEffect(() => {
    if (preselectedTreatmentId) {
      setTreatmentId(preselectedTreatmentId);
    }
  }, [preselectedTreatmentId]);

  // Load bookings on mount
  useEffect(() => {
    // Check local storage records
    const local = localStorage.getItem("nativa_bookings");
    if (local) {
      try {
        setActiveBookings(JSON.parse(local));
      } catch (e) {
        console.error("Local bookings corrupted:", e);
      }
    }

    // Try API fetch too to load from server backend
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((payload) => {
        if (payload && payload.status === "success" && payload.data.length > 0) {
          // Merge lists avoiding duplicates by id
          setActiveBookings((prev) => {
            const combined = [...prev, ...payload.data];
            const unique = combined.reduce((acc: Booking[], curr: Booking) => {
              if (!acc.some((b) => b.id === curr.id)) {
                acc.push(curr);
              }
              return acc;
            }, []);
            return unique;
          });
        }
      })
      .catch(() => {});
  }, []);

  // Compute next 14 eligible booking dates (excluding Sundays) starting tomorrow
  const getEligibleDates = () => {
    const list = [];
    let current = new Date();
    
    // Add 1 day to start booking tomorrow
    for (let i = 0; i < 20; i++) {
      current.setDate(current.getDate() + 1);
      // Day 0 is Sunday
      if (current.getDay() !== 0) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, "0");
        const day = String(current.getDate()).padStart(2, "0");
        const weekdayName = current.toLocaleDateString("es-ES", { weekday: "short" });
        const textLabel = `${weekdayName.toUpperCase()} ${day}/${month}`;
        list.push({ value: `${year}-${month}-${day}`, label: textLabel });
        if (list.length >= 14) break; // Keep only 14 open days
      }
    }
    return list;
  };
  
  const eligibleDates = getEligibleDates();

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple validations
    if (!treatmentId) return setErrorMsg("Por favor, selecciona el tratamiento clínico.");
    if (!date) return setErrorMsg("Selecciona un día disponible para tu valoración.");
    if (!time) return setErrorMsg("Escoge una hora de atención.");
    if (!name.trim()) return setErrorMsg("Escribe tu nombre completo.");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return setErrorMsg("Ingresa un correo electrónico válido.");
    if (!phone.replace(/\D/g, "").match(/^\d{10,12}$/)) {
      return setErrorMsg("Ingresa un número celular colombiano válido de 10 dígitos (ej: 3128765432).");
    }

    const tName = TREATMENTS_LIST.find((t) => t.id === treatmentId)?.name || "Tratamiento Personalizado";

    const bookingPayload = {
      name,
      email,
      phone,
      treatmentId,
      treatmentName: tName,
      date,
      time,
      notes: notes.trim()
    };

    // Call server to persist
    fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingPayload)
    })
      .then((res) => res.json())
      .then((response) => {
        if (response && response.booking) {
          const bookedItem = response.booking;
          
          // Save locally
          const updated = [bookedItem, ...activeBookings];
          setActiveBookings(updated);
          localStorage.setItem("nativa_bookings", JSON.stringify(updated));

          // Set success feedback state
          setSuccessBooking(bookedItem);

          // Reset form fields
          setDate("");
          setTime("");
          setName("");
          setEmail("");
          setPhone("");
          setNotes("");
          setTreatmentId("");
        } else {
          throw new Error("Invalid response format");
        }
      })
      .catch((err) => {
        console.error("Booking api failed, using local fallback.");
        // Local fallback
        const offlineBooking: Booking = {
          id: "BK-" + Math.floor(Math.random() * 900000 + 100000),
          name,
          email,
          phone,
          treatmentId,
          treatmentName: tName,
          date,
          time,
          notes: notes.trim() || undefined,
          createdAt: new Date().toISOString(),
          status: "Confirmada"
        };
        const updated = [offlineBooking, ...activeBookings];
        setActiveBookings(updated);
        localStorage.setItem("nativa_bookings", JSON.stringify(updated));
        setSuccessBooking(offlineBooking);
      });
  };

  const handleCancelBooking = (id: string) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta reserva de valoración médica?")) return;

    const filtered = activeBookings.filter((b) => b.id !== id);
    setActiveBookings(filtered);
    localStorage.setItem("nativa_bookings", JSON.stringify(filtered));
  };

  return (
    <div className="space-y-12">
      {/* Visual Title */}
      <div className="pb-6 border-b border-nativa-green-accent/60 space-y-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-nativa-gold-warm">
          Sede El Poblado, Medellín
        </span>
        <h2 className="text-3xl md:text-4xl font-serif-elegant font-bold text-nativa-green-deep">
          Sistema de Reserva de Citas
        </h2>
        <p className="text-sm text-slate-600 max-w-lg">
          Agenda tu consulta de valoración dermoestética en la que estudiaremos tu piel con tecnología 3D de alta definición.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form panel */}
        <div className="lg:col-span-11 xl:col-span-7">
          {successBooking ? (
            <div className="p-8 rounded-2xl bg-white border border-nativa-green-accent shadow-md text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-nativa-gold-warm/10 text-nativa-gold-warm flex items-center justify-center mx-auto border border-nativa-gold-warm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-serif-elegant font-bold text-nativa-green-deep">¡Cita Reservada Exitosamente!</h3>
                <p className="text-sm text-slate-650">
                  Hemos enviado la confirmación y las indicaciones clínicas de preparación a su correo electrónico.
                </p>
              </div>

              {/* Summary table */}
              <div className="p-5 rounded-xl bg-nativa-bg border border-nativa-green-accent text-left text-sm max-w-md mx-auto space-y-3 font-mono">
                <div className="flex justify-between border-b border-nativa-green-accent/40 pb-2">
                  <span className="text-slate-500 font-sans">Código Cita:</span>
                  <span className="text-nativa-gold-light font-bold">{successBooking.id}</span>
                </div>
                <div className="flex justify-between border-b border-nativa-green-accent/40 pb-2">
                  <span className="text-slate-500 font-sans">Paciente:</span>
                  <span className="text-slate-800 font-semibold">{successBooking.name}</span>
                </div>
                <div className="flex justify-between border-b border-nativa-green-accent/40 pb-2">
                  <span className="text-slate-500 font-sans">Tratamiento:</span>
                  <span className="text-slate-800 font-semibold">{successBooking.treatmentName}</span>
                </div>
                <div className="flex justify-between border-b border-nativa-green-accent/40 pb-2">
                  <span className="text-slate-500 font-sans">Fecha:</span>
                  <span className="text-slate-800 font-semibold">{successBooking.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-sans">Hora Clínico:</span>
                  <span className="text-slate-800 font-semibold">{successBooking.time}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSuccessBooking(null)}
                  className="px-6 py-2.5 rounded-full bg-nativa-green-deep text-white text-xs font-bold hover:bg-opacity-95 cursor-pointer shadow-md"
                >
                  Agendar Otra Valoración
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 rounded-2xl bg-white border border-nativa-green-accent space-y-6 shadow-sm">
              <div className="flex items-center gap-2 text-nativa-gold-warm pb-2 border-b border-nativa-green-accent">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-lg font-serif-elegant font-bold text-nativa-green-deep">Formulario de Agendamiento</h3>
              </div>

              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-850 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="font-semibold">{errorMsg}</span>
                </div>
              )}

              {/* Step 1: Treatment Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-nativa-green-deep uppercase tracking-widest">
                  1. Tratamiento o Valoración Principal
                </label>
                <select
                  value={treatmentId}
                  onChange={(e) => setTreatmentId(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-nativa-bg border border-nativa-green-accent text-xs text-slate-800 font-semibold focus:outline-none focus:border-nativa-gold-warm transition-all"
                >
                  <option value="" className="bg-white text-slate-700">-- Selecciona tratamiento --</option>
                  {TREATMENTS_LIST.map((t) => (
                    <option key={t.id} value={t.id} className="bg-white text-slate-800">
                      {t.name} (Valoración)
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Date and Time slots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-nativa-green-deep uppercase tracking-widest flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-nativa-gold-warm" />
                    2. Selecciona Fecha
                  </label>
                  <div className="grid grid-cols-2 gap-2 h-44 overflow-y-auto pr-1 border border-nativa-green-accent rounded-xl p-2 bg-nativa-bg/40">
                    {eligibleDates.map((d) => (
                      <button
                        type="button"
                        key={d.value}
                        onClick={() => setDate(d.value)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-lg text-center transition-all cursor-pointer ${
                          date === d.value
                            ? "bg-nativa-green-deep text-white"
                            : "bg-white hover:bg-nativa-green-accent/60 text-slate-700 border border-nativa-green-accent/50"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-nativa-green-deep uppercase tracking-widest flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-nativa-gold-warm" />
                    3. Turno Disponible
                  </label>
                  <div className="grid grid-cols-2 gap-2 h-44 overflow-y-auto pr-1 border border-nativa-green-accent rounded-xl p-2 bg-nativa-bg/40">
                    {CLINICAL_HOURS.map((h) => (
                      <button
                        type="button"
                        key={h}
                        onClick={() => setTime(h)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-lg text-center transition-all font-mono cursor-pointer ${
                          time === h
                            ? "bg-nativa-green-deep text-white font-semibold"
                            : "bg-white hover:bg-nativa-green-accent/60 text-slate-700 border border-nativa-green-accent/50"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Patient Fields input Group */}
              <div className="space-y-4 pt-4 border-t border-nativa-green-accent">
                <label className="block text-xs font-bold text-nativa-green-deep uppercase tracking-widest">
                  4. Resumen de Datos Personales
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Nombre Completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-nativa-bg/70 border border-nativa-green-accent text-xs text-slate-850 placeholder-slate-500 font-medium focus:outline-none focus:border-nativa-gold-warm"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      placeholder="Celular (ej: 3128765432)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-nativa-bg/70 border border-nativa-green-accent text-xs text-slate-850 placeholder-slate-500 font-semibold focus:outline-none focus:border-nativa-gold-warm font-mono"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-nativa-bg/70 border border-nativa-green-accent text-xs text-slate-850 placeholder-slate-500 font-medium focus:outline-none focus:border-nativa-gold-warm"
                    required
                  />
                </div>

                <div className="relative">
                  <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                  <textarea
                    placeholder="Cuéntanos cuales son tus objetivos estéticos actuales o si tienes afecciones en la piel (opcional)..."
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-nativa-bg/70 border border-nativa-green-accent text-xs text-slate-850 placeholder-slate-500 font-medium focus:outline-none focus:border-nativa-gold-warm leading-relaxed"
                  ></textarea>
                </div>
              </div>

              {/* Booking trigger button */}
              <button
                type="submit"
                id="submit-booking"
                className="w-full py-4 rounded-full bg-nativa-green-deep text-white font-bold text-sm tracking-wide hover:bg-opacity-95 transition-all cursor-pointer shadow-md active:scale-98"
              >
                Confirmar Solicitud de Valoración
              </button>
            </form>
          )}
        </div>

        {/* Dynamic Sidebar: My Active Bookings List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white border border-nativa-green-accent space-y-4 shadow-sm">
            <h4 className="text-sm font-bold uppercase tracking-wider text-nativa-green-deep flex items-center gap-2">
              <Calendar className="w-4 h-4 text-nativa-gold-warm" />
              Tus Reservas Activas ({activeBookings.length})
            </h4>

            {activeBookings.length > 0 ? (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                {activeBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-xl bg-nativa-bg/60 border border-nativa-green-accent space-y-3 shadow-sm relative group hover:border-nativa-gold-warm/50 transition-colors"
                  >
                    {/* Delete cancellation trigger */}
                    <button
                      onClick={() => handleCancelBooking(b.id)}
                      className="absolute top-3.5 right-3.5 p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-100 border border-transparent transition-all cursor-pointer opacity-80 md:opacity-0 md:group-hover:opacity-100"
                      title="Cancelar cita de valoración"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-1 pr-6">
                      <div className="text-[10px] font-bold text-nativa-gold-light font-mono tracking-wide">
                        {b.id}
                      </div>
                      <h5 className="text-sm font-bold text-nativa-green-deep truncate">
                        {b.treatmentName}
                      </h5>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 border-t border-nativa-green-accent/40 pt-2 font-mono font-medium">
                      <div>
                        <span className="text-[9px] text-slate-500 font-sans block font-semibold">Fecha</span>
                        {b.date}
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 font-sans block font-semibold">Hora</span>
                        {b.time}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1 text-[10px]">
                      <span className="inline-block w-2 bg-emerald-500 rounded-full h-2"></span>
                      <span className="text-emerald-700 font-bold">Estado: Confirmada (Sede Poblado)</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-xs text-slate-500 space-y-2">
                <AlertCircle className="w-8 h-8 text-nativa-gold-warm/30 mx-auto" />
                <p className="font-medium">No registras reservas activas creadas en esta sesión.</p>
                <p className="text-[10px] text-slate-400">Agendar una valoración te permitirá supervisar tus horarios.</p>
              </div>
            )}
          </div>

          {/* Quick clinical instructions block */}
          <div className="p-5 rounded-2xl bg-nativa-green-accent/25 border border-nativa-green-accent space-y-3 text-xs shadow-inner">
            <h5 className="font-bold text-nativa-green-deep flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
              <Sparkles className="w-4 h-4 text-nativa-gold-warm" /> Recomendaciones Clínicas
            </h5>
            <ul className="space-y-1.5 text-slate-700 font-medium leading-relaxed list-disc list-inside">
              <li>Llegar 10 minutos antes para registrar su ficha médica inicial.</li>
              <li>Asistir con el rostro limpio (sin maquillaje ni protector con color) si se evalúa un área facial.</li>
              <li>La sesión de valoración inicial se apoya en un escáner tridimensional computarizado gratuito.</li>
              <li>Para cancelaciones o reprogramaciones, notificar por favor vía WhatsApp con al menos 24 horas de antelación.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
