import { blocoALeads } from "./blocoALeads";
import { blocoBLeads } from "./blocoBLeads";

export interface ConstrucaoCivilLead {
  id: number;
  empresa: string;
  nomeNaMensagem: string;
  categoria: string;
  cidade: string;
  bloco: "Bloco A (Com site próprio)" | "Bloco B (Sem site próprio)";
  presencaDigital?: string;
  angulo: string;
  emocao?: string;
  lugar?: string;
  premissa?: string;
  telefone: string;
  whatsappUrl: string;
  mensagem: string;
}

export const CONSTRUCAO_CIVIL_LEADS: ConstrucaoCivilLead[] = [...blocoALeads, ...blocoBLeads];

export const CONSTRUCAO_CIVIL_CAMPAIGN_INFO = {
  id: 214,
  name: "Prospecção Construção Civil Luanda (214 Leads)",
  description:
    "Base organizada com 214 construtoras e fornecedores de Luanda. 86 no Bloco A (com site) e 128 no Bloco B (sem site). Framework v12 assinado por Carlos Moreira com premissa persuasiva e empatia contextual.",
  totalLeads: 214,
  blocoACount: 86,
  blocoBCount: 128,
  author: "Carlos Moreira (Agentes Digital)",
};
