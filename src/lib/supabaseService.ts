import { supabase, isSupabaseConfigured } from "./supabase";
import {
  Lead,
  LeadStatus,
  ChatMessage,
  ActivityItem,
  VendedorSkillDoc,
  Appointment,
  LeadNote,
} from "@/components/operations/types";
import { initialVendedorSkills } from "@/components/operations/vendedorSkillsData";

export interface ContactFormData {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  areaAtuacao: string;
  servico: string;
  mensagem: string;
  canal?: string;
}

const LOCAL_STORAGE_LEADS_KEY = "sbs_leads_cache";

/**
 * Salva leads no cache local para resiliência e fallback offline
 */
export function getLocalLeads(): Lead[] {
  if (typeof window === "undefined") return [];
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_LEADS_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed)) {
        // Purga qualquer lead mockado que possa ter ficado no cache local
        const cleaned = parsed.filter(
          (l) => l && l.id && !l.id.startsWith("lead-0") && !l.name?.includes("Gonçalo"),
        );
        if (cleaned.length !== parsed.length) {
          localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(cleaned));
        }
        return cleaned;
      }
    }
  } catch (err) {
    console.warn("Erro ao ler cache local de leads:", err);
  }
  return [];
}

export function setLocalLeads(leads: Lead[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_LEADS_KEY, JSON.stringify(leads));
  } catch (err) {
    console.warn("Erro ao salvar cache local de leads:", err);
  }
}

/**
 * Determina pacote e score com base no serviço pretendido
 */
function mapServiceToPackage(servico: string) {
  const s = servico.toLowerCase();
  if (s.includes("ia") || s.includes("agente")) {
    return {
      packageInterest: "Domínio IA" as const,
      estimatedValue: "Kz 700.000",
      qualificationScore: 88,
    };
  }
  if (s.includes("automação") || s.includes("automacao")) {
    return {
      packageInterest: "Autoridade" as const,
      estimatedValue: "Kz 450.000",
      qualificationScore: 82,
    };
  }
  if (s.includes("sistema")) {
    return {
      packageInterest: "Domínio IA" as const,
      estimatedValue: "Kz 700.000",
      qualificationScore: 92,
    };
  }
  return {
    packageInterest: "Profissional" as const,
    estimatedValue: "Kz 250.000",
    qualificationScore: 75,
  };
}

/**
 * 1. SUBMETER FORMULÁRIO DE CONTACTO PARA O SUPABASE
 * Grava cada campo na sua respectiva tabela no Supabase
 */
export async function submitContactForm(data: ContactFormData): Promise<{
  success: boolean;
  leadId?: string;
  mode: "supabase" | "demo";
  error?: string;
}> {
  const { packageInterest, estimatedValue, qualificationScore } = mapServiceToPackage(data.servico);
  const nowStr = new Date().toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

  // Se o Supabase estiver configurado no .env
  if (isSupabaseConfigured()) {
    // Tentativa 1: Via RPC transacional (atómica e mais robusta)
    const { data: rpcLeadId, error: rpcError } = await supabase.rpc("cadastrar_lead_formulario", {
      p_nome: data.nome.trim(),
      p_empresa: data.empresa.trim(),
      p_telefone: data.telefone.trim(),
      p_email: data.email.trim(),
      p_area_atuacao: data.areaAtuacao.trim(),
      p_servico: data.servico.trim(),
      p_mensagem: data.mensagem.trim(),
      p_canal: data.canal || "website",
    });

    if (!rpcError && rpcLeadId) {
      console.log("[Supabase] Lead registado via RPC:", rpcLeadId);
      return { success: true, leadId: String(rpcLeadId), mode: "supabase" };
    }

    if (rpcError) {
      console.warn("[Supabase] RPC falhou, tentando inserção directa:", rpcError.message);
    }

    // Tentativa 2: Inserção directa (fallback da RPC)
    try {
      const { data: leadRow, error: leadError } = await supabase
        .from("leads")
        .insert({
          channel: data.canal || "website",
          status: "novo",
          package_interest: packageInterest,
          ai_qualified: true,
          qualification_score: qualificationScore,
          estimated_value: estimatedValue,
          ai_processing_status: "ativo",
        })
        .select("id")
        .single();

      if (leadError || !leadRow) {
        throw new Error(leadError?.message || "Falha ao criar registo mestre de lead");
      }

      const leadId = leadRow.id;

      // Gravar em cada tabela de campo correspondente
      await Promise.all([
        supabase.from("lead_nomes").insert({
          lead_id: leadId,
          nome_completo: data.nome.trim(),
          cargo: "Responsável Comercial",
        }),
        supabase.from("lead_empresas").insert({
          lead_id: leadId,
          nome_empresa: data.empresa.trim(),
          localizacao: "Angola",
        }),
        supabase.from("lead_telefones").insert({
          lead_id: leadId,
          numero_telefone: data.telefone.trim(),
          e_whatsapp: true,
        }),
        supabase.from("lead_emails").insert({
          lead_id: leadId,
          endereco_email: data.email.trim(),
        }),
        supabase.from("lead_areas_atuacao").insert({
          lead_id: leadId,
          area_atuacao: data.areaAtuacao.trim(),
        }),
        supabase.from("lead_servicos").insert({
          lead_id: leadId,
          servico_pretendido: data.servico.trim(),
        }),
        supabase.from("lead_mensagens").insert({
          lead_id: leadId,
          conteudo_mensagem: data.mensagem.trim(),
        }),
        supabase.from("lead_atividades").insert({
          lead_id: leadId,
          tipo: "capture",
          titulo: "Lead capturado no website",
          descricao: `Pedido de proposta para o serviço "${data.servico}" enviado por ${data.nome} (${data.empresa}).`,
        }),
        supabase.from("lead_conversas").insert([
          {
            lead_id: leadId,
            remetente: "client",
            texto: `Olá! Enviei um pedido pelo formulário do site. Empresa: ${data.empresa}. Área: ${data.areaAtuacao}. Serviço: ${data.servico}. Mensagem: ${data.mensagem}`,
            timestamp_formatado: nowStr,
            sentimento: "positive",
          },
          {
            lead_id: leadId,
            remetente: "ai",
            texto: `Olá ${data.nome}! Recebemos a sua solicitação para ${data.servico}. O nosso Agente de IA já analisou o perfil da sua empresa (${data.empresa}) e os nossos especialistas comerciais irão entrar em contacto brevemente pelo WhatsApp.`,
            timestamp_formatado: nowStr,
            sentimento: "positive",
          },
        ]),
      ]);

      console.log("[Supabase] Lead registado via inserção directa:", leadId);
      return { success: true, leadId, mode: "supabase" };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("[Supabase] Erro crítico ao persistir lead:", msg);
      return { success: false, mode: "demo", error: msg };
    }
  }

  // Fallback Local (Modo Demonstração ou offline)
  const newLeadId = `lead-${Date.now()}`;
  const localLead: Lead = {
    id: newLeadId,
    name: data.nome.trim(),
    company: data.empresa.trim(),
    role: "Responsável Comercial",
    phone: data.telefone.trim(),
    email: data.email.trim(),
    location: "Malanje / Angola",
    channel: "website",
    status: "novo",
    packageInterest,
    aiQualified: true,
    qualificationScore,
    estimatedValue,
    firstContactAt: "Agora mesmo",
    lastActive: "há 1m",
    aiProcessingStatus: "ativo",
    unreadMessagesCount: 1,
    appointments: [],
    notes: [
      {
        id: `note-${Date.now()}`,
        author: "Sistema Web",
        text: `Área de atuação: ${data.areaAtuacao}. Serviço pretendido: ${data.servico}. Mensagem: ${data.mensagem}`,
        createdAt: "Agora mesmo",
      },
    ],
    activities: [
      {
        id: `act-${Date.now()}`,
        type: "capture",
        title: "Lead capturado no website",
        description: `Formulário preenchido para o serviço "${data.servico}"`,
        timestamp: "Agora mesmo",
      },
      {
        id: `act-ai-${Date.now()}`,
        type: "ai_qualification",
        title: "IA Qualificou Automaticamente",
        description: `Score de Qualificação ${qualificationScore}/100 gerado para ${packageInterest}`,
        timestamp: "Agora mesmo",
      },
    ],
    conversation: [
      {
        id: `msg-cl-${Date.now()}`,
        sender: "client",
        text: `Olá! Enviei um pedido pelo formulário do site. Empresa: ${data.empresa}. Área: ${data.areaAtuacao}. Serviço: ${data.servico}. Mensagem: ${data.mensagem}`,
        timestamp: nowStr,
      },
      {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: `Olá ${data.nome}! Recebemos a sua solicitação para ${data.servico}. O nosso Agente de IA já analisou o perfil da sua empresa (${data.empresa}) e os nossos especialistas comerciais irão entrar em contacto brevemente pelo WhatsApp.`,
        timestamp: nowStr,
        sentiment: "positive",
      },
    ],
  };

  const currentLocal = getLocalLeads();
  setLocalLeads([localLead, ...currentLocal.filter((l) => l.id !== newLeadId)]);

  return { success: true, leadId: newLeadId, mode: "demo" };
}

/**
 * 2. CARREGAR LEADS DO SUPABASE PARA O CENTRO DE OPERAÇÕES
 */
export async function fetchLeadsFromSupabase(): Promise<{
  leads: Lead[];
  source: "supabase" | "cache" | "mock";
}> {
  if (isSupabaseConfigured()) {
    try {
      // Busca a partir da view consolidada
      const { data, error } = await supabase
        .from("view_leads_completo")
        .select("*")
        .order("createdAt", { ascending: false });

      if (!error && Array.isArray(data)) {
        const mappedLeads: Lead[] = data.map((row: Record<string, unknown>) => ({
          id: String(row["id"]),
          name: (row["name"] as string) || "Contacto",
          company: (row["company"] as string) || "Empresa a confirmar",
          role: (row["role"] as string) || "Responsável Comercial",
          phone: (row["phone"] as string) || "",
          email: (row["email"] as string) || "",
          location: (row["location"] as string) || "Angola",
          channel: (row["channel"] as Lead["channel"]) || "website",
          status: (row["status"] as LeadStatus) || "novo",
          packageInterest: (row["packageInterest"] as Lead["packageInterest"]) || "Profissional",
          aiQualified: Boolean(row["aiQualified"]),
          qualificationScore: Number(row["qualificationScore"]) || 75,
          estimatedValue: (row["estimatedValue"] as string) || "Kz 250.000",
          firstContactAt: row["createdAt"]
            ? new Date(row["createdAt"] as string).toLocaleDateString("pt-PT")
            : "Hoje",
          lastActive: "Activo",
          aiProcessingStatus: (row["aiProcessingStatus"] as Lead["aiProcessingStatus"]) || "ativo",
          unreadMessagesCount: Number(row["unreadMessagesCount"]) || 0,
          appointments: Array.isArray(row["appointments"])
            ? (row["appointments"] as Appointment[])
            : [],
          notes: Array.isArray(row["notes"]) ? (row["notes"] as LeadNote[]) : [],
          activities: Array.isArray(row["activities"]) ? (row["activities"] as ActivityItem[]) : [],
          conversation: Array.isArray(row["conversation"])
            ? (row["conversation"] as ChatMessage[])
            : [],
        }));

        setLocalLeads(mappedLeads);
        return { leads: mappedLeads, source: "supabase" };
      }
    } catch (err) {
      console.warn("Falha ao buscar leads do Supabase, usando cache:", err);
    }
  }

  // Fallback: cache local ou lista vazia
  const local = getLocalLeads();
  return {
    leads: local || [],
    source: isSupabaseConfigured() ? "cache" : "mock",
  };
}

/**
 * 3. ATUALIZAR STATUS DO LEAD NO SUPABASE
 */
export async function updateLeadStatusInSupabase(
  leadId: string,
  newStatus: LeadStatus,
): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from("leads")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", leadId);

      await supabase.from("lead_atividades").insert({
        lead_id: leadId,
        tipo: "status_change",
        titulo: `Status alterado para ${newStatus.toUpperCase()}`,
        descricao: "Atualizado pelo Centro de Operações",
      });
      return true;
    } catch (err) {
      console.error("Erro ao atualizar status no Supabase:", err);
    }
  }
  return false;
}

/**
 * 4. ADICIONAR NOTA NO SUPABASE
 */
export async function addLeadNoteInSupabase(
  leadId: string,
  author: string,
  text: string,
): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("lead_notas").insert({
        lead_id: leadId,
        autor: author,
        texto: text,
      });

      await supabase.from("lead_atividades").insert({
        lead_id: leadId,
        tipo: "note",
        titulo: "Nova nota interna adicionada",
        descricao: text.slice(0, 100),
      });
      return true;
    } catch (err) {
      console.error("Erro ao adicionar nota no Supabase:", err);
    }
  }
  return false;
}

/**
 * 5. ADICIONAR MENSAGEM DE CHAT NO SUPABASE
 */
export async function addChatMessageInSupabase(
  leadId: string,
  message: ChatMessage,
): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      await supabase.from("lead_conversas").insert({
        lead_id: leadId,
        remetente: message.sender,
        texto: message.text,
        timestamp_formatado: message.timestamp,
        sentimento: message.sentiment || "neutral",
        ai_metadata: message.aiMetadata || null,
      });
      return true;
    } catch (err) {
      console.error("Erro ao adicionar mensagem no Supabase:", err);
    }
  }
  return false;
}

/**
 * 6. CRIAR LEAD MANUAL NO SUPABASE (MODAL)
 */
export async function createManualLeadInSupabase(lead: Lead): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const { data: leadRow, error } = await supabase
        .from("leads")
        .insert({
          channel: lead.channel,
          status: lead.status,
          package_interest: lead.packageInterest,
          ai_qualified: lead.aiQualified,
          qualification_score: lead.qualificationScore,
          estimated_value: lead.estimatedValue,
          ai_processing_status: lead.aiProcessingStatus,
        })
        .select("id")
        .single();

      if (error || !leadRow) return false;
      const leadId = leadRow.id;

      await Promise.all([
        supabase.from("lead_nomes").insert({
          lead_id: leadId,
          nome_completo: lead.name,
          cargo: lead.role,
        }),
        supabase.from("lead_empresas").insert({
          lead_id: leadId,
          nome_empresa: lead.company,
          localizacao: lead.location || "Angola",
        }),
        supabase.from("lead_telefones").insert({
          lead_id: leadId,
          numero_telefone: lead.phone,
          e_whatsapp: true,
        }),
        supabase.from("lead_emails").insert({
          lead_id: leadId,
          endereco_email: lead.email,
        }),
        supabase.from("lead_servicos").insert({
          lead_id: leadId,
          servico_pretendido: lead.packageInterest,
        }),
        supabase.from("lead_atividades").insert({
          lead_id: leadId,
          tipo: "capture",
          titulo: "Lead cadastrado manualmente",
          descricao: `Registado pelo painel operacional via canal ${lead.channel}`,
        }),
      ]);

      return true;
    } catch (err) {
      console.error("Erro ao criar lead manual no Supabase:", err);
    }
  }
  return false;
}

/**
 * 7. ESCUTAR MUDANÇAS EM TEMPO REAL (SUPABASE REALTIME)
 */
export function subscribeToLeadsChanges(onUpdate: () => void): () => void {
  if (!isSupabaseConfigured()) {
    return () => {};
  }

  const channel = supabase
    .channel("sbs-leads-channel")
    .on("postgres_changes", { event: "*", schema: "public", table: "leads" }, () => {
      onUpdate();
    })
    .on("postgres_changes", { event: "INSERT", schema: "public", table: "lead_atividades" }, () => {
      onUpdate();
    })
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

const LOCAL_STORAGE_SKILLS_KEY = "sbs_vendedor_skills";

export function getLocalVendedorSkills(): VendedorSkillDoc[] {
  if (typeof window === "undefined") return initialVendedorSkills;
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_SKILLS_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    console.warn("Erro ao ler cache local de skills:", err);
  }
  return initialVendedorSkills;
}

export function setLocalVendedorSkills(skills: VendedorSkillDoc[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_SKILLS_KEY, JSON.stringify(skills));
  } catch (err) {
    console.warn("Erro ao salvar cache local de skills:", err);
  }
}

/**
 * 8. BUSCAR BASE DE CONHECIMENTO E SKILLS DO VENDEDOR IA
 */
export async function fetchVendedorSkills(): Promise<{
  skills: VendedorSkillDoc[];
  source: "supabase" | "cache" | "mock";
}> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from("ia_vendedor_knowledge")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped: VendedorSkillDoc[] = data.map((r: Record<string, unknown>) => ({
          id: String(r["id"]),
          title: (r["title"] as string) || "Skill",
          filename:
            (r["filename"] as string) ||
            `${((r["title"] as string) || "skill").toLowerCase().replace(/\s+/g, "-")}.md`,
          type: (r["type"] as VendedorSkillDoc["type"]) || "skill",
          category: (r["category"] as VendedorSkillDoc["category"]) || "qualificacao",
          triggerCondition: (r["trigger_condition"] as string) || "",
          contentMd: (r["content_md"] as string) || "",
          isActive: Boolean(r["is_active"]),
          createdAt: r["created_at"]
            ? new Date(r["created_at"] as string).toLocaleDateString("pt-PT")
            : "09/09/2026",
          updatedAt: r["updated_at"]
            ? new Date(r["updated_at"] as string).toLocaleDateString("pt-PT")
            : "09/09/2026",
        }));
        setLocalVendedorSkills(mapped);
        return { skills: mapped, source: "supabase" };
      }
    } catch (err) {
      console.warn("Falha ao buscar skills do Supabase, usando biblioteca local:", err);
    }
  }

  const local = getLocalVendedorSkills();
  return {
    skills: local && local.length > 0 ? local : initialVendedorSkills,
    source: isSupabaseConfigured() ? "cache" : "mock",
  };
}

/**
 * 9. SALVAR OU ATUALIZAR SKILL / ARQUIVO .MD
 */
export async function saveVendedorSkill(doc: VendedorSkillDoc): Promise<boolean> {
  const current = getLocalVendedorSkills();
  const exists = current.some((s) => s.id === doc.id);
  const updated = exists ? current.map((s) => (s.id === doc.id ? doc : s)) : [doc, ...current];
  setLocalVendedorSkills(updated);

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("ia_vendedor_knowledge").upsert({
        id: doc.id.includes("-") && doc.id.length > 20 ? doc.id : undefined,
        title: doc.title,
        filename: doc.filename.endsWith(".md") ? doc.filename : `${doc.filename}.md`,
        type: doc.type,
        category: doc.category,
        trigger_condition: doc.triggerCondition || "",
        content_md: doc.contentMd,
        is_active: doc.isActive,
        updated_at: new Date().toISOString(),
      });
      return true;
    } catch (err) {
      console.error("Erro ao salvar skill no Supabase:", err);
    }
  }
  return true;
}

/**
 * 10. REMOVER SKILL / ARQUIVO .MD
 */
export async function deleteVendedorSkill(id: string): Promise<boolean> {
  const current = getLocalVendedorSkills();
  setLocalVendedorSkills(current.filter((s) => s.id !== id));

  if (isSupabaseConfigured()) {
    try {
      await supabase.from("ia_vendedor_knowledge").delete().eq("id", id);
      return true;
    } catch (err) {
      console.error("Erro ao remover skill no Supabase:", err);
    }
  }
  return true;
}

/**
 * 11. ATIVAR OU PAUSAR UMA SKILL
 */
export async function toggleVendedorSkillActive(id: string, isActive: boolean): Promise<boolean> {
  const current = getLocalVendedorSkills();
  setLocalVendedorSkills(current.map((s) => (s.id === id ? { ...s, isActive } : s)));

  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from("ia_vendedor_knowledge")
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq("id", id);
      return true;
    } catch (err) {
      console.error("Erro ao alternar status da skill no Supabase:", err);
    }
  }
  return true;
}
