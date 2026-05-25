export interface Treatment {
  id: string;
  name: string;
  category: "Facial" | "Corporal";
  description: string;
  detailedInfo: string;
  duration: string;
  price: string;
  benefits: string[];
  image?: string;
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  time: string;
  notes?: string;
  createdAt: string;
  status: "Confirmada" | "Pendiente" | "Completada";
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}
