import { Lead, MetricData, FunnelStage } from "./types";

export const initialMetrics: MetricData[] = [];

/**
 * Calcula os estágios do funil dinamicamente com base nos leads reais do Supabase
 */
export function calculateFunnelStages(leads: Lead[] = []): FunnelStage[] {
  const safe = leads || [];
  const total = safe.length;
  const contacted = safe.filter((l) => Boolean(l.phone || l.email)).length;
  const attended = safe.filter(
    (l) => (Array.isArray(l.conversation) && l.conversation.length > 0) || l.status !== "novo",
  ).length;
  const qualified = safe.filter(
    (l) => l.aiQualified || ["qualificado", "agendado", "convertido"].includes(l.status),
  ).length;
  const scheduled = safe.filter(
    (l) =>
      (Array.isArray(l.appointments) && l.appointments.length > 0) ||
      ["agendado", "convertido"].includes(l.status),
  ).length;
  const converted = safe.filter((l) => l.status === "convertido").length;

  const rate = (count: number, base: number) => {
    if (base === 0) return "0.0%";
    return `${((count / base) * 100).toFixed(1)}%`;
  };

  return [
    { id: "encontrar", name: "ENCONTRAR", count: total, conversionRate: "100%", color: "#3B82F6" },
    {
      id: "confiar",
      name: "CONFIAR",
      count: total,
      conversionRate: rate(total, total),
      color: "#3B82F6",
    },
    {
      id: "contactar",
      name: "CONTACTAR",
      count: contacted,
      conversionRate: rate(contacted, total),
      color: "#60A5FA",
    },
    {
      id: "atender",
      name: "ATENDER",
      count: attended,
      conversionRate: rate(attended, contacted || total),
      color: "#8B5CF6",
    },
    {
      id: "qualificar",
      name: "QUALIFICAR",
      count: qualified,
      conversionRate: rate(qualified, attended || total),
      color: "#8B5CF6",
    },
    {
      id: "agendar",
      name: "AGENDAR",
      count: scheduled,
      conversionRate: rate(scheduled, qualified || total),
      color: "#A855F7",
    },
    {
      id: "converter",
      name: "CONVERTER",
      count: converted,
      conversionRate: rate(converted, total),
      color: "#22C55E",
    },
  ];
}

export const funnelStages: FunnelStage[] = calculateFunnelStages([]);

/**
 * Array de leads inicial limpo (sem dados fictícios).
 * Sincronizado automaticamente com o Supabase.
 */
export const initialLeads: Lead[] = [];
