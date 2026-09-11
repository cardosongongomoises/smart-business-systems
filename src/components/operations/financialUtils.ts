import { Lead, PlanName } from "./types";

export type { PlanName };

export interface PlanConfig {
  name: PlanName;
  setupFee: number;
  monthlyFee: number;
  /** Alias numérico da mensalidade (Kz) */
  monthlyKz: number;
  setupFormatted: string;
  monthlyFormatted: string;
  badge?: string;
  tagline: string;
  description: string;
  features: string[];
}

export const PLANS_CATALOG: Record<PlanName, PlanConfig> = {
  Presença: {
    name: "Presença",
    setupFee: 125000,
    monthlyFee: 20000,
    monthlyKz: 20000,
    setupFormatted: "Kz 125.000",
    monthlyFormatted: "Kz 20.000/mês",
    tagline: "Presença digital essencial",
    description:
      "Website moderno e rápido com otimização inicial para motores de busca e WhatsApp.",
    features: [
      "Website responsivo de alta velocidade",
      "Botão de contacto direto WhatsApp",
      "Hospedagem segura e domínio configurado",
      "Suporte e monitoramento contínuo",
    ],
  },
  Profissional: {
    name: "Profissional",
    setupFee: 250000,
    monthlyFee: 50000,
    monthlyKz: 50000,
    setupFormatted: "Kz 250.000",
    monthlyFormatted: "Kz 50.000/mês",
    badge: "Mais Escolhido",
    tagline: "Máquina de captação de clientes",
    description:
      "Estrutura comercial com agendamento de reuniões e qualificação automatizada de leads.",
    features: [
      "Design de conversão de alta performance",
      "Agendamento automático com Google Meet",
      "Formulário comercial integrado ao CRM",
      "Manutenção técnica mensal preventiva",
    ],
  },
  Autoridade: {
    name: "Autoridade",
    setupFee: 450000,
    monthlyFee: 85000,
    monthlyKz: 85000,
    setupFormatted: "Kz 450.000",
    monthlyFormatted: "Kz 85.000/mês",
    tagline: "Posicionamento premium no mercado",
    description: "Infraestrutura robusta de autoridade com automações avançadas de atendimento.",
    features: [
      "Arquitetura digital exclusiva de alta autoridade",
      "Automação de e-mails e confirmações",
      "CRM com pipeline de vendas avançado",
      "Suporte prioritário e relatórios mensais",
    ],
  },
  "Domínio IA": {
    name: "Domínio IA",
    setupFee: 700000,
    monthlyFee: 150000,
    monthlyKz: 150000,
    setupFormatted: "Kz 700.000",
    monthlyFormatted: "Kz 150.000/mês",
    badge: "Ecossistema Completo",
    tagline: "Ecossistema completo com IA e omnicanalidade",
    description:
      "Agente de inteligência artificial treinado especificamente para qualificar e fechar contratos 24/7.",
    features: [
      "Agente de IA exclusivo treinado na sua empresa",
      "Integração oficial omnichannel (WhatsApp + Site)",
      "Qualificação e contorno de objeções autônomo",
      "SLA de 99.9% e otimização contínua de prompts",
    ],
  },
  "Automate Pro": {
    name: "Automate Pro",
    setupFee: 300000,
    monthlyFee: 65000,
    monthlyKz: 65000,
    setupFormatted: "Kz 300.000",
    monthlyFormatted: "Kz 65.000/mês",
    badge: "Infraestrutura Completa",
    tagline: "Implementação sobre website existente",
    description:
      "Implementação personalizada da infraestrutura de atendimento e automação sobre o website existente com 4 horas/mês de ajustes.",
    features: [
      "Agente IA configurado para a empresa",
      "Chat inteligente integrado ao site existente",
      "Base de conhecimento personalizada",
      "Qualificação automática de leads",
      "Integração oficial WhatsApp",
      "CRM para organização de oportunidades",
      "Sistema de agendamento automático",
      "Automação de follow-up pós-atendimento",
      "Confirmações e lembretes por e-mail",
      "Transferência transparente para atendente humano",
      "Monitoramento contínuo de estabilidade",
      "Manutenção preventiva de rotinas",
      "Otimizações periódicas de respostas",
      "4 horas/mês incluídas (ajustes, melhorias e alterações)",
    ],
  },
};

export interface ClientAccount {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  plan: PlanName;
  status: "no_ar" | "em_desenvolvimento" | "renovacao" | "cancelado";
  setupPrice: string;
  monthlyFee: string;
  launchedAt: string;
  siteUrl?: string;
  uptime: string;
}

/**
 * 4 clientes da base original (totalizam Kz 305.000/mês)
 */
export const INITIAL_CLIENTS: ClientAccount[] = [
  {
    id: "cl-1",
    name: "Dr. Sebastião Luvumbo",
    company: "Luvumbo Advocacia Corporativa",
    phone: "+244 923 881 204",
    email: "sebastiao@luvumbo-adv.co.ao",
    plan: "Autoridade",
    status: "no_ar",
    setupPrice: "Kz 450.000",
    monthlyFee: "Kz 85.000/mês",
    launchedAt: "12/01/2026",
    siteUrl: "https://luvumbo-adv.co.ao",
    uptime: "99.9%",
  },
  {
    id: "cl-2",
    name: "Dra. Jandira Kuanza",
    company: "Clínica Vida Talatona",
    phone: "+244 912 400 918",
    email: "jandira@clinicavida.co.ao",
    plan: "Domínio IA",
    status: "no_ar",
    setupPrice: "Kz 700.000",
    monthlyFee: "Kz 150.000/mês",
    launchedAt: "28/01/2026",
    siteUrl: "https://clinicavida.co.ao",
    uptime: "100%",
  },
  {
    id: "cl-3",
    name: "Eng. Arnaldo Gaspar",
    company: "Gaspar Logística & Distribuição",
    phone: "+244 934 112 390",
    email: "arnaldo@gasparlog.ao",
    plan: "Profissional",
    status: "em_desenvolvimento",
    setupPrice: "Kz 250.000",
    monthlyFee: "Kz 50.000/mês",
    launchedAt: "Previsão: 20/03/2026",
    uptime: "Staging",
  },
  {
    id: "cl-4",
    name: "Marta Tchissola",
    company: "Imobiliária Kilamba Prime",
    phone: "+244 945 678 123",
    email: "marta@kilambaprime.ao",
    plan: "Presença",
    status: "no_ar",
    setupPrice: "Kz 125.000",
    monthlyFee: "Kz 20.000/mês",
    launchedAt: "05/02/2026",
    siteUrl: "https://kilambaprime.ao",
    uptime: "99.8%",
  },
];

/**
 * Formata um número em formato padrão de Kwanzas (AOA)
 */
export function formatKz(val: number): string {
  return `Kz ${Math.round(val).toLocaleString("pt-PT")}`;
}

/**
 * Normaliza o nome do plano para a chave do catálogo
 */
export function normalizePlanName(rawName?: string | null): PlanName {
  if (!rawName) return "Profissional";
  const s = rawName.toLowerCase();
  if (s.includes("automate") || s.includes("pro") || s.includes("automação")) {
    if (s.includes("automate")) return "Automate Pro";
  }
  if (s.includes("domínio") || s.includes("dominio") || s.includes("ia")) return "Domínio IA";
  if (s.includes("autoridade")) return "Autoridade";
  if (s.includes("presença") || s.includes("presenca")) return "Presença";
  if (s.includes("automate pro")) return "Automate Pro";
  return "Profissional";
}

/**
 * Extrai valor numérico de mensalidade a partir do plano
 */
export function getMonthlyFeeForPlan(planName: PlanName | string): number {
  const norm = normalizePlanName(planName);
  return PLANS_CATALOG[norm]?.monthlyFee || 50000;
}

/**
 * Extrai valor numérico de setup a partir do plano
 */
export function getSetupFeeForPlan(planName: PlanName | string): number {
  const norm = normalizePlanName(planName);
  return PLANS_CATALOG[norm]?.setupFee || 250000;
}

export interface MonthlyRevenueData {
  month: string;
  monthShort: string;
  setupRevenue: number;
  mrrRevenue: number;
  totalRevenue: number;
  cumulativeSetup: number;
  cumulativeMrr: number;
  cumulativeTotal: number;
  activeClients: number;
  isProjected?: boolean;
  highlightNote?: string;
}

export interface FinancialSummary {
  mrrTotal: number;
  mrrFormatted: string;
  arrTotal: number;
  arrFormatted: string;
  setupRevenueTotal: number;
  setupRevenueFormatted: string;
  totalClientContracts: number;
  activeRecurringClients: number;
  retentionRate: number;
  averageTicketMrr: number;
  convertedLeadsCount: number;
  clientsMrrContribution: number;
  convertedLeadsMrrContribution: number;
  // Month-over-Month (MoM) metrics
  mrrPreviousMonth: number;
  mrrPreviousMonthFormatted: string;
  mrrMomGrowthPercent: number;
  mrrMomGrowthFormatted: string;
  mrrMomDiff: number;
  mrrMomDiffFormatted: string;
  isChurn: boolean;
  // Monthly Breakdown (Setup vs MRR over time)
  monthlyRevenueEvolution: MonthlyRevenueData[];
  mrrByPlan: Array<{
    plan: PlanName;
    count: number;
    mrrSubtotal: number;
    setupSubtotal: number;
    color: string;
  }>;
}

/**
 * Calcula em tempo real o MRR e indicadores financeiros
 * unindo a base de clientes com leads convertidos.
 */
export function computeFinancialMetrics(
  clients: ClientAccount[] = INITIAL_CLIENTS,
  leads: Lead[] = [],
): FinancialSummary {
  const safeClients = clients || [];
  const safeLeads = leads || [];

  // Converted leads dynamically contribute to MRR & Setup
  const convertedLeads = safeLeads.filter((l) => l?.status === "convertido");

  // Plan accumulators
  const planCounts: Record<PlanName, { count: number; mrr: number; setup: number }> = {
    Presença: { count: 0, mrr: 0, setup: 0 },
    Profissional: { count: 0, mrr: 0, setup: 0 },
    Autoridade: { count: 0, mrr: 0, setup: 0 },
    "Domínio IA": { count: 0, mrr: 0, setup: 0 },
    "Automate Pro": { count: 0, mrr: 0, setup: 0 },
  };

  let clientsMrr = 0;
  let clientsSetup = 0;

  // Process existing contracts
  safeClients.forEach((client) => {
    const plan = normalizePlanName(client.plan);
    const mFee = PLANS_CATALOG[plan]?.monthlyFee || 50000;
    const sFee = PLANS_CATALOG[plan]?.setupFee || 250000;

    clientsMrr += mFee;
    clientsSetup += sFee;

    planCounts[plan].count += 1;
    planCounts[plan].mrr += mFee;
    planCounts[plan].setup += sFee;
  });

  // Process converted leads
  let convertedLeadsMrr = 0;
  let convertedLeadsSetup = 0;

  convertedLeads.forEach((lead) => {
    const plan = normalizePlanName(lead.packageInterest);
    const mFee = PLANS_CATALOG[plan]?.monthlyFee || 50000;
    const sFee = PLANS_CATALOG[plan]?.setupFee || 250000;

    convertedLeadsMrr += mFee;
    convertedLeadsSetup += sFee;

    planCounts[plan].count += 1;
    planCounts[plan].mrr += mFee;
    planCounts[plan].setup += sFee;
  });

  const totalMrr = clientsMrr + convertedLeadsMrr;
  const totalSetup = clientsSetup + convertedLeadsSetup;
  const arr = totalMrr * 12;

  const totalContracts = safeClients.length + convertedLeads.length;
  const activeClientsCount =
    safeClients.filter((c) => c.status === "no_ar" || c.status === "em_desenvolvimento").length +
    convertedLeads.length;

  const colorsMap: Record<PlanName, string> = {
    Presença: "#F59E0B",
    Profissional: "#3B82F6",
    Autoridade: "#22C55E",
    "Domínio IA": "#8B5CF6",
    "Automate Pro": "#38BDF8",
  };

  const mrrByPlan = (Object.keys(planCounts) as PlanName[]).map((p) => ({
    plan: p,
    count: planCounts[p].count,
    mrrSubtotal: planCounts[p].mrr,
    setupSubtotal: planCounts[p].setup,
    color: colorsMap[p],
  }));

  // Month-over-Month (MoM) calculation:
  // Baseline Fevereiro 2026 MRR was Kz 255.000 (Dr. Sebastião 85k + Dra. Jandira 150k + Marta 20k)
  const mrrPreviousMonth = 255000;
  const mrrMomDiff = totalMrr - mrrPreviousMonth;
  const mrrMomGrowthPercent =
    mrrPreviousMonth > 0 ? ((totalMrr - mrrPreviousMonth) / mrrPreviousMonth) * 100 : 0;
  const isChurn = mrrMomGrowthPercent < 0;

  // Monthly breakdown separating Setup Revenue from Monthly Recurring Revenue (MRR)
  const currentMonthSetup = 250000 + convertedLeadsSetup;
  const currentMonthMrr = totalMrr;

  const rawMonthlySeries: Omit<
    MonthlyRevenueData,
    "cumulativeSetup" | "cumulativeMrr" | "cumulativeTotal"
  >[] = [
    {
      month: "Janeiro 2026",
      monthShort: "Jan",
      setupRevenue: 1150000, // Luvumbo (450k) + Clínica Vida (700k)
      mrrRevenue: 235000, // 85k + 150k
      totalRevenue: 1385000,
      activeClients: 2,
      highlightNote: "Início das operações: Luvumbo Advocacia & Clínica Vida",
    },
    {
      month: "Fevereiro 2026",
      monthShort: "Fev",
      setupRevenue: 125000, // Marta Tchissola (Presença: 125k)
      mrrRevenue: 255000, // 235k + 20k = 255k (+8.5% MoM)
      totalRevenue: 380000,
      activeClients: 3,
      highlightNote: "Entrada da Imobiliária Kilamba Prime (+Kz 20.000/mês)",
    },
    {
      month: "Março 2026",
      monthShort: "Mar",
      setupRevenue: currentMonthSetup, // Gaspar Logística (250k) + Converted Leads
      mrrRevenue: currentMonthMrr, // 305k + Converted Leads MRR (+19.6% MoM)
      totalRevenue: currentMonthSetup + currentMonthMrr,
      activeClients: activeClientsCount,
      highlightNote: "Mês atual: Gaspar Logística + Oportunidades convertidas",
    },
    {
      month: "Abril 2026",
      monthShort: "Abr (Proj.)",
      setupRevenue: 600000,
      mrrRevenue: Math.round(currentMonthMrr * 1.28),
      totalRevenue: 600000 + Math.round(currentMonthMrr * 1.28),
      activeClients: activeClientsCount + 2,
      isProjected: true,
      highlightNote: "Previsão de 2 novas ativações em fase final de proposta",
    },
    {
      month: "Maio 2026",
      monthShort: "Mai (Proj.)",
      setupRevenue: 750000,
      mrrRevenue: Math.round(currentMonthMrr * 1.62),
      totalRevenue: 750000 + Math.round(currentMonthMrr * 1.62),
      activeClients: activeClientsCount + 4,
      isProjected: true,
      highlightNote: "Expansão de contratos Automate Pro & Domínio IA",
    },
    {
      month: "Junho 2026",
      monthShort: "Jun (Proj.)",
      setupRevenue: 950000,
      mrrRevenue: Math.round(currentMonthMrr * 2.05),
      totalRevenue: 950000 + Math.round(currentMonthMrr * 2.05),
      activeClients: activeClientsCount + 7,
      isProjected: true,
      highlightNote: "Consolidação de meio de ano com 11 clientes ativos",
    },
  ];

  let runSetup = 0;
  let runMrr = 0;
  let runTotal = 0;

  const monthlyRevenueEvolution: MonthlyRevenueData[] = rawMonthlySeries.map((item) => {
    runSetup += item.setupRevenue;
    runMrr += item.mrrRevenue;
    runTotal += item.totalRevenue;
    return {
      ...item,
      cumulativeSetup: runSetup,
      cumulativeMrr: runMrr,
      cumulativeTotal: runTotal,
    };
  });

  return {
    mrrTotal: totalMrr,
    mrrFormatted: `${formatKz(totalMrr)}/mês`,
    arrTotal: arr,
    arrFormatted: formatKz(arr),
    setupRevenueTotal: totalSetup,
    setupRevenueFormatted: formatKz(totalSetup),
    totalClientContracts: totalContracts,
    activeRecurringClients: activeClientsCount,
    retentionRate: 100, // 100% de retenção histórica no ano
    averageTicketMrr: totalContracts > 0 ? Math.round(totalMrr / totalContracts) : 0,
    convertedLeadsCount: convertedLeads.length,
    clientsMrrContribution: clientsMrr,
    convertedLeadsMrrContribution: convertedLeadsMrr,
    // Month-over-Month (MoM) indicators
    mrrPreviousMonth,
    mrrPreviousMonthFormatted: `${formatKz(mrrPreviousMonth)}/mês`,
    mrrMomGrowthPercent: Number(mrrMomGrowthPercent.toFixed(1)),
    mrrMomGrowthFormatted: `${mrrMomGrowthPercent >= 0 ? "+" : ""}${mrrMomGrowthPercent.toFixed(1)}%`,
    mrrMomDiff,
    mrrMomDiffFormatted: `${mrrMomDiff >= 0 ? "+" : ""}${formatKz(mrrMomDiff)}`,
    isChurn,
    monthlyRevenueEvolution,
    mrrByPlan,
  };
}
