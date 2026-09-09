export type LeadStatus = "novo" | "qualificado" | "agendado" | "convertido" | "perdido";

export type LeadChannel = "whatsapp" | "website" | "email" | "google";

export interface ChatMessage {
  id: string;
  sender: "client" | "ai" | "human";
  text: string;
  timestamp: string;
  sentiment?: "positive" | "neutral" | "urgent";
}

export interface Appointment {
  id: string;
  title: string;
  type: "Diagnóstico Estratégico" | "Apresentação de Proposta" | "Setup Técnico e Alinhamento";
  dateTime: string;
  dateFormatted: string;
  timeFormatted: string;
  status: "Confirmado" | "Pendente" | "Realizado";
  meetUrl?: string;
}

export interface ActivityItem {
  id: string;
  type: "capture" | "ai_qualification" | "appointment" | "status_change" | "proposal" | "note";
  title: string;
  description: string;
  timestamp: string;
  iconType?: string;
}

export interface LeadNote {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  role: string;
  phone: string;
  email: string;
  channel: LeadChannel;
  status: LeadStatus;
  packageInterest: "Presença Digital" | "Profissional" | "Autoridade Digital" | "Domínio IA";
  aiQualified: boolean;
  qualificationScore: number; // 0-100
  estimatedValue: string;
  firstContactAt: string;
  lastActive: string;
  notes: LeadNote[];
  activities: ActivityItem[];
  appointments: Appointment[];
  conversation: ChatMessage[];
  aiProcessingStatus: "ativo" | "escalado" | "concluido";
  unreadMessagesCount?: number;
}

export interface MetricData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  type: "leads" | "qualification" | "appointments" | "conversion";
}

export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  conversionRate: string;
  dropOffRate?: string;
  color: string;
}
