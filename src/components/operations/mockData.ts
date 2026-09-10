import { Lead, MetricData, FunnelStage } from "./types";

export const initialMetrics: MetricData[] = [
  {
    title: "Leads hoje",
    value: "0",
    change: "0%",
    isPositive: true,
    timeframe: "Aguardando novos contactos no site/WhatsApp",
    type: "leads",
  },
  {
    title: "Taxa de qualificação IA",
    value: "0.0%",
    change: "0%",
    isPositive: true,
    timeframe: "Agente IA activo e a postos",
    type: "qualification",
  },
  {
    title: "Reuniões agendadas",
    value: "0",
    change: "0%",
    isPositive: true,
    timeframe: "Nenhuma reunião pendente",
    type: "appointments",
  },
  {
    title: "Taxa de conversão",
    value: "0.0%",
    change: "0%",
    isPositive: true,
    timeframe: "Pipeline limpo",
    type: "conversion",
  },
];

export const funnelStages: FunnelStage[] = [
  { id: "encontrar", name: "ENCONTRAR", count: 0, conversionRate: "0%", color: "#3B82F6" },
  { id: "confiar", name: "CONFIAR", count: 0, conversionRate: "0%", color: "#3B82F6" },
  { id: "contactar", name: "CONTACTAR", count: 0, conversionRate: "0%", color: "#60A5FA" },
  { id: "atender", name: "ATENDER", count: 0, conversionRate: "0%", color: "#8B5CF6" },
  { id: "qualificar", name: "QUALIFICAR", count: 0, conversionRate: "0%", color: "#8B5CF6" },
  { id: "agendar", name: "AGENDAR", count: 0, conversionRate: "0%", color: "#A855F7" },
  { id: "converter", name: "CONVERTER", count: 0, conversionRate: "0%", color: "#22C55E" },
];

/**
 * Array de leads inicial limpo (sem dados fictícios).
 * Novos leads entram pelo formulário do site ou cadastro manual no painel.
 */
export const initialLeads: Lead[] = [];
