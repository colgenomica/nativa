import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in the environment variables.");
}

// Treatment list reflecting Colombia's premium NATÍVA CLINIC catalog
const TREATMENTS = [
  {
    id: "exosomas",
    name: "Exosomas Celulares",
    category: "Facial",
    description: "Terapia de regeneración acelerada de última generación que reactiva la renovación celular profunda, tratando líneas finas, cicatrices y texturas desvitalizadas.",
    detailedInfo: "Utiliza nanopartículas mensajeras activadoras de factores de crecimiento para reprogramar el comportamiento dermoepidérmico de la piel. Es la cúspide de la medicina regenerativa aplicada a la estética.",
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
    detailedInfo: "La inyección subcutánea controlada estimula la neocolagénesis autóloga progresiva. Redibuja los contornos, restaura el volumen perdido por reabsorción de grasa y redefine la tensión tisular.",
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
    detailedInfo: "Combina agentes liposomados con activos inhibidores de melanina para unificar el tono y regular la sobreproducción cromática de los melanocitos, protegiendo y reforzando la barrera cutánea.",
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
    detailedInfo: "Emplea aparatología médica no invasiva que optimiza la microcirculación and reduce la circunferencia de muslos, abdomen o brazos, brindando un aspecto atlético, firme y con menor retención de líquidos.",
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

// Endpoint for treatments catalog
app.get("/api/treatments", (req, res) => {
  res.json({ status: "success", data: TREATMENTS });
});

// Endpoint for AI treatment advisor powered by Gemini 3.5 Flash
app.post("/api/advisor", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "El mensaje es obligatorio." });
    }

    if (!ai) {
      return res.json({
        response: "¡Hola! Te damos la bienvenida a NATÍVA CLINIC en Medellín. En este momento, nuestro asesor interactivo IA está en pausa debido a una desconexión temporal de la clave de acceso. Sin embargo, nuestro equipo médico está listo para recibirte. Te sugerimos revisar nuestra gama de tratamientos de estética regenerativa (como nuestros tratamientos estrella: Exosomas, Toxina Botulínica, Bioestimuladores y BioGlúteos) y agendar tu valoración especializada directamente en la sección de reservas de esta web."
      });
    }

    // Prepare contextual treatments catalog for Gemini system instructions
    const treatmentBulletPoints = TREATMENTS.map(t => 
      `* **${t.name}** (${t.category} - Precio aproximado: ${t.price}): ${t.description}. Adecuado para: ${t.benefits.join(", ")}.`
    ).join("\n");

    const systemInstruction = 
      "Eres la Dra. Sofía, asesora dermoestética, líder en medicina estética y rejuvenecimiento celular en NATÍVA CLINIC, sede Mixy Mall Los Colores, Medellín (Colombia).\n" +
      "Tu estilo de comunicación es extremadamente premium: cálido, muy profesional, empático, sofisticado y arraigado en la ciencia dermatológica. Utilizas un tono dermo-científico pero fácil de comprender.\n\n" +
      "Valores fundamentales de NATÍVA CLINIC:\n" +
      "1. NATURAL: Resultados moderados, elegantes y refinados. No promovemos cambios exagerados que desdibujen tu identidad.\n" +
      "2. REGENERATIVA: Fomentamos el despertar de tus propias células con ciencia celular avanzada (Exosomas, estímulo autólogo).\n" +
      "3. CIENCIA: Prácticas certificadas respaldadas por investigación rigurosa.\n" +
      "4. IDENTIDAD LATINOAMERICANA: Adaptación exacta de tratamientos a la diversidad climática y fototipos de piel de Colombia y Latinoamérica.\n\n" +
      "Tu objetivo principal es canalizar los síntomas, preocupaciones u objetivos de los pacientes (por ejemplo, manchas por el sol, flacidez mandíbular, pérdida de volumen en glúteos o arrugas de la frente) y sugerir 1 o 2 tratamientos de nuestro catálogo oficial:\n" +
      treatmentBulletPoints + "\n\n" +
      "Reglas de respuesta rígidas:\n" +
      "- Contesta estrictamente en español, con la amabilidad y atención premium típica de la alta hospitalidad y clínicas médicas de Medellín.\n" +
      "- Mantén las respuestas fluidas, acogedoras y precisas. No te extiendas en exceso: limita tu respuesta a un máximo de 2 a 3 párrafos compactos para que sea fácil de leer en un chat de dispositivo móvil.\n" +
      "- Recomienda estrictamente tratamientos reales del catálogo arriba detallado. No inventes procedimientos.\n" +
      "- Termina siempre invitando al paciente, de forma sofisticada, a reservar hoy mismo una sesión de Valoración de Cortesía Completa en nuestra clínica para que el equipo médico dermoestético estudie su caso con tecnología de escáner facial interactivo.";

    // Chat contents builder
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.text }]
        });
      });
    }
    // Append current user prompt
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call the correct SDK method as per gemini-api guidelines
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const textOutput = response.text || "Disculpa, no logré formular un diagnóstico general en este momento. Estaré encantada de resolver tus dudas de bienestar estético si me cuentas qué región de tu rostro o cuerpo te gustaría revitalizar.";
    res.json({ response: textOutput });
  } catch (error: any) {
    console.error("Failed to generate advisor response:", error);
    res.status(500).json({
      error: "Ocurrió un error en el módulo del Asesor IA.",
      response: "¡Hola! Pedimos disculpas, el consultor inteligente está experimentando alta afluencia en este instante. No te preocupes: puedes ver nuestra exquisita lista de tratamientos detallados en la pestaña 'Tratamientos' y seleccionar la hora que prefieras en 'Agendar Cita' para tu valoración en Mixy Mall Los Colores, Medellín."
    });
  }
});

// Standard booking mock slot database
const BOOKINGS_STORAGE: any[] = [];

app.post("/api/bookings", (req, res) => {
  try {
    const { name, email, phone, treatmentId, treatmentName, date, time, notes } = req.body;
    if (!name || !email || !phone || !treatmentId || !date || !time) {
      return res.status(400).json({ error: "Faltan campos requeridos para confirmar la cita." });
    }

    const newBooking = {
      id: "BK-" + Math.floor(Math.random() * 900000 + 100000),
      name,
      email,
      phone,
      treatmentId,
      treatmentName,
      date,
      time,
      notes: notes || "Sin notas adicionales.",
      createdAt: new Date().toISOString(),
      status: "Confirmada"
    };

    BOOKINGS_STORAGE.push(newBooking);
    res.json({ status: "success", booking: newBooking });
  } catch (error: any) {
    res.status(500).json({ error: "No se pudo procesar la reservación en el servidor." });
  }
});

app.get("/api/bookings", (req, res) => {
  res.json({ status: "success", data: BOOKINGS_STORAGE });
});

// Configure Vite dynamic middleware or direct static deployment files and start listening
async function startApp() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NATÍVA CLINIC Server] Running on http://localhost:${PORT}`);
  });
}

startApp().catch((err) => {
  console.error("Critical error starting NATÍVA server:", err);
});
