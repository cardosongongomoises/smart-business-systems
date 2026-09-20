export interface CampaignValidationRecord {
  id: string;
  name: string;
  timestamp: string;
  total: number;
  bemSucedidas: number;
  malsucedidas: number;
  taxaSucesso: number;
  fixosDescartados: number;
  semContaDescartados: number;
  operadoras: {
    unitel: number;
    movicel: number;
    africell: number;
    fixo: number;
    outros: number;
  };
  status: "concluida" | "em_andamento" | "pendente" | "rascunho";
}

export interface ValidationStatusLogItem {
  id: string;
  timestamp: string;
  numero: string;
  empresa: string;
  operadora: string;
  tipoLinha: "mobile" | "landline" | "invalid";
  status: "sucesso" | "descarte_fixo" | "descarte_sem_conta";
  motivo: string;
  mensagem: string;
}

const STORAGE_KEY = "sbs_campaign_validation_stats_v1";

// Campanhas históricas de referência no mercado angolano
export const initialCampaignValidationHistory: CampaignValidationRecord[] = [
  {
    id: "camp-hist-1",
    name: "Clínicas & Odonto Luanda",
    timestamp: "20/09/2026 10:15",
    total: 45,
    bemSucedidas: 38,
    malsucedidas: 7,
    taxaSucesso: 84.4,
    fixosDescartados: 5,
    semContaDescartados: 2,
    operadoras: {
      unitel: 26,
      movicel: 9,
      africell: 3,
      fixo: 5,
      outros: 2,
    },
    status: "concluida",
  },
  {
    id: "camp-hist-2",
    name: "Escritórios Advocacia & Jurídico",
    timestamp: "19/09/2026 14:30",
    total: 60,
    bemSucedidas: 46,
    malsucedidas: 14,
    taxaSucesso: 76.7,
    fixosDescartados: 11,
    semContaDescartados: 3,
    operadoras: {
      unitel: 32,
      movicel: 10,
      africell: 4,
      fixo: 11,
      outros: 3,
    },
    status: "concluida",
  },
  {
    id: "camp-hist-3",
    name: "Restaurantes & Cafés Talatona",
    timestamp: "18/09/2026 11:00",
    total: 50,
    bemSucedidas: 44,
    malsucedidas: 6,
    taxaSucesso: 88.0,
    fixosDescartados: 4,
    semContaDescartados: 2,
    operadoras: {
      unitel: 30,
      movicel: 8,
      africell: 6,
      fixo: 4,
      outros: 2,
    },
    status: "em_andamento",
  },
  {
    id: "camp-hist-4",
    name: "Consultorias & Auditores Luanda",
    timestamp: "17/09/2026 16:45",
    total: 35,
    bemSucedidas: 26,
    malsucedidas: 9,
    taxaSucesso: 74.3,
    fixosDescartados: 8,
    semContaDescartados: 1,
    operadoras: {
      unitel: 18,
      movicel: 6,
      africell: 2,
      fixo: 8,
      outros: 1,
    },
    status: "concluida",
  },
  {
    id: "camp-hist-5",
    name: "Logística & Transportadoras Viana",
    timestamp: "16/09/2026 09:20",
    total: 40,
    bemSucedidas: 35,
    malsucedidas: 5,
    taxaSucesso: 87.5,
    fixosDescartados: 3,
    semContaDescartados: 2,
    operadoras: {
      unitel: 24,
      movicel: 8,
      africell: 3,
      fixo: 3,
      outros: 2,
    },
    status: "concluida",
  },
];

export function getCampaignValidationHistory(): CampaignValidationRecord[] {
  if (typeof window === "undefined") return initialCampaignValidationHistory;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCampaignValidationHistory));
      return initialCampaignValidationHistory;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.warn("Erro ao ler histórico de validações:", err);
  }
  return initialCampaignValidationHistory;
}

export function saveCampaignValidationRecord(
  record: CampaignValidationRecord,
): CampaignValidationRecord[] {
  const current = getCampaignValidationHistory();
  const existingIdx = current.findIndex((c) => c.id === record.id || c.name === record.name);

  let updated: CampaignValidationRecord[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = record;
  } else {
    updated = [record, ...current];
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn("Erro ao salvar histórico de validações:", err);
    }
  }
  return updated;
}
