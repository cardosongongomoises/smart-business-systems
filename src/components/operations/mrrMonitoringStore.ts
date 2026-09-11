import { useState, useEffect } from "react";
import {
  INITIAL_CLIENTS,
  PLANS_CATALOG,
  ClientAccount,
  PlanName,
  normalizePlanName,
  formatKz,
} from "./financialUtils";

export interface MRRAlert {
  id: string;
  type: "churn" | "downgrade";
  severity: "critical" | "warning";
  clientId: string;
  clientCompany: string;
  clientName: string;
  previousPlan: PlanName;
  newPlan?: PlanName;
  previousFee: number;
  newFee: number;
  mrrImpact: number; // Negative number, e.g. -65000
  mrrImpactFormatted: string; // e.g. "-Kz 65.000/mês"
  timestamp: string;
  dateIso: string;
  reason: string;
  recoveryPlaybook: string[];
  status: "active" | "mitigated" | "resolved";
}

const STORAGE_KEY_CLIENTS = "ad_ops_monitored_clients_v2";
const STORAGE_KEY_ALERTS = "ad_ops_mrr_alerts_v2";

// Retention playbooks by incident type
export const RETENTION_PLAYBOOKS: Record<"churn" | "downgrade", string[]> = {
  churn: [
    "Agendar chamada executiva com o titular nas próximas 2 horas",
    "Oferecer carência de 30 dias com manutenção ativa sem custo de mensalidade",
    "Apresentar proposta de transição para o plano Presença (Kz 20.000/mês)",
    "Auditar e demonstrar valor gerado (leads captados e conversas realizadas pelo agente IA)",
  ],
  downgrade: [
    "Oferecer desconto de 15% por 3 meses para manter o plano atual",
    "Apresentar migração para o plano Automate Pro (Kz 65.000/mês com 4h de suporte)",
    "Readequar o escopo do prompt ou adicionar novo canal de atendimento",
    "Agendar alinhamento operacional para reavaliar metas de conversão",
  ],
};

// Listeners for multi-component reactivity
type StoreListener = () => void;
const listeners = new Set<StoreListener>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      /* ignore */
    }
  });
}

// Initial state loader
function loadStoredClients(): ClientAccount[] {
  if (typeof window === "undefined") return INITIAL_CLIENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLIENTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    /* fallback */
  }
  return INITIAL_CLIENTS;
}

function loadStoredAlerts(): MRRAlert[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ALERTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* fallback */
  }
  return [];
}

let activeClientsState: ClientAccount[] = loadStoredClients();
let activeAlertsState: MRRAlert[] = loadStoredAlerts();

function saveState() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY_CLIENTS, JSON.stringify(activeClientsState));
    localStorage.setItem(STORAGE_KEY_ALERTS, JSON.stringify(activeAlertsState));
  } catch {
    /* ignore */
  }
  notifyListeners();
}

/**
 * Registra um evento de downgrade de plano
 */
export function recordPlanDowngrade(
  clientId: string,
  newPlanName: PlanName,
  reason: string = "Solicitação de readequação orçamentária do cliente",
): MRRAlert | null {
  const clientIndex = activeClientsState.findIndex((c) => c.id === clientId);
  if (clientIndex === -1) return null;

  const client = activeClientsState[clientIndex];
  const oldPlan = normalizePlanName(client.plan);
  const newPlan = normalizePlanName(newPlanName);

  const oldFee = PLANS_CATALOG[oldPlan]?.monthlyFee || 50000;
  const newFee = PLANS_CATALOG[newPlan]?.monthlyFee || 20000;

  // Downgrade only if newFee < oldFee
  if (newFee >= oldFee) {
    // It's an upgrade!
    activeClientsState[clientIndex] = {
      ...client,
      plan: newPlan,
      monthlyFee: PLANS_CATALOG[newPlan]?.monthlyFormatted || `${formatKz(newFee)}/mês`,
    };
    saveState();
    return null;
  }

  const mrrImpact = -(oldFee - newFee);

  const alert: MRRAlert = {
    id: `alert-down-${Date.now()}`,
    type: "downgrade",
    severity: Math.abs(mrrImpact) >= 60000 ? "critical" : "warning",
    clientId: client.id,
    clientCompany: client.company,
    clientName: client.name,
    previousPlan: oldPlan,
    newPlan: newPlan,
    previousFee: oldFee,
    newFee: newFee,
    mrrImpact,
    mrrImpactFormatted: `-${formatKz(Math.abs(mrrImpact))}/mês`,
    timestamp: "Agora mesmo",
    dateIso: new Date().toISOString(),
    reason,
    recoveryPlaybook: RETENTION_PLAYBOOKS.downgrade,
    status: "active",
  };

  // Update client
  activeClientsState[clientIndex] = {
    ...client,
    plan: newPlan,
    monthlyFee: PLANS_CATALOG[newPlan]?.monthlyFormatted || `${formatKz(newFee)}/mês`,
  };

  activeAlertsState = [alert, ...activeAlertsState.filter((a) => a.clientId !== clientId)];
  saveState();
  return alert;
}

/**
 * Registra o cancelamento total de um contrato (Churn)
 */
export function recordClientCancellation(
  clientId: string,
  reason: string = "Cancelamento de serviço solicitado pelo cliente",
): MRRAlert | null {
  const clientIndex = activeClientsState.findIndex((c) => c.id === clientId);
  if (clientIndex === -1) return null;

  const client = activeClientsState[clientIndex];
  const plan = normalizePlanName(client.plan);
  const lostFee = PLANS_CATALOG[plan]?.monthlyFee || 50000;

  const alert: MRRAlert = {
    id: `alert-churn-${Date.now()}`,
    type: "churn",
    severity: "critical",
    clientId: client.id,
    clientCompany: client.company,
    clientName: client.name,
    previousPlan: plan,
    previousFee: lostFee,
    newFee: 0,
    mrrImpact: -lostFee,
    mrrImpactFormatted: `-${formatKz(lostFee)}/mês`,
    timestamp: "Agora mesmo",
    dateIso: new Date().toISOString(),
    reason,
    recoveryPlaybook: RETENTION_PLAYBOOKS.churn,
    status: "active",
  };

  // Update client status to cancelado
  activeClientsState[clientIndex] = {
    ...client,
    status: "renovacao" as const, // will be treated as non-active or marked cancelled
    monthlyFee: "Kz 0 (Contrato Cancelado)",
  };

  activeAlertsState = [alert, ...activeAlertsState.filter((a) => a.clientId !== clientId)];
  saveState();
  return alert;
}

/**
 * Reverte ou reativa um contrato (Retenção bem sucedida)
 */
export function resolveAlertAndRestoreClient(alertId: string): boolean {
  const alertIndex = activeAlertsState.findIndex((a) => a.id === alertId);
  if (alertIndex === -1) return false;

  const alert = activeAlertsState[alertIndex];
  const clientIndex = activeClientsState.findIndex((c) => c.id === alert.clientId);

  if (clientIndex !== -1) {
    const originalPlan = alert.previousPlan;
    const originalFee = PLANS_CATALOG[originalPlan]?.monthlyFormatted || "Kz 50.000/mês";
    activeClientsState[clientIndex] = {
      ...activeClientsState[clientIndex],
      plan: originalPlan,
      monthlyFee: originalFee,
      status: "no_ar",
    };
  }

  activeAlertsState = activeAlertsState.filter((a) => a.id !== alertId);
  saveState();
  return true;
}

/**
 * Descarta / silencia um alerta
 */
export function dismissAlert(alertId: string) {
  activeAlertsState = activeAlertsState.filter((a) => a.id !== alertId);
  saveState();
}

/**
 * Restaura clientes e alertas para o padrão de fábrica
 */
export function resetMonitoringState() {
  activeClientsState = [...INITIAL_CLIENTS];
  activeAlertsState = [];
  saveState();
}

/**
 * Simula um alerta de teste para demonstração imediata do sistema de monitoramento
 */
export function triggerSimulatedDowngradeAlert(): MRRAlert {
  // Pick Dr. Sebastião (Autoridade -> Presença, perda de 65.000)
  return recordPlanDowngrade(
    "cl-1",
    "Presença",
    "Cliente solicitou redução de custos após reestruturação interna",
  )!;
}

export function triggerSimulatedChurnAlert(): MRRAlert {
  // Pick Gaspar Logística or Clínica Vida
  return recordClientCancellation(
    "cl-2",
    "Suspensão de atividades no departamento de IA por 60 dias",
  )!;
}

/**
 * React hook para assinar alterações do monitoramento de MRR
 */
export function useMRRMonitoring() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const onUpdate = () => setTick((t) => t + 1);
    listeners.add(onUpdate);
    return () => {
      listeners.delete(onUpdate);
    };
  }, []);

  const activeAlerts = activeAlertsState.filter((a) => a.status === "active");
  const totalMrrImpact = activeAlerts.reduce((acc, a) => acc + a.mrrImpact, 0);

  return {
    clients: activeClientsState,
    alerts: activeAlerts,
    allAlerts: activeAlertsState,
    totalMrrImpact,
    totalMrrImpactFormatted:
      totalMrrImpact !== 0 ? `-${formatKz(Math.abs(totalMrrImpact))}/mês` : "Kz 0",
    hasActiveAlerts: activeAlerts.length > 0,
    recordPlanDowngrade,
    recordClientCancellation,
    resolveAlertAndRestoreClient,
    dismissAlert,
    triggerSimulatedDowngradeAlert,
    triggerSimulatedChurnAlert,
    resetMonitoringState,
  };
}
