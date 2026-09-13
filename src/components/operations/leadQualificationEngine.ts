import { Lead } from "./types";
import { isKnownUnregisteredNumber, normalizePhoneNumber } from "./whatsappVerification";

export interface QualificationAudit {
  score: number; // 0 a 100
  isQualified: boolean; // score >= 60
  verdict: "aprovado" | "parcial" | "desqualificado";
  statusText: string;
  breakdown: {
    contactability: {
      score: number;
      max: 40;
      detail: string;
      hasWhatsApp: boolean;
      channelRecommendation: string;
    };
    identity: {
      score: number;
      max: 30;
      detail: string;
      isSuspicious: boolean;
    };
    commercialContext: {
      score: number;
      max: 30;
      detail: string;
    };
  };
  reasons: string[];
  blockers: string[];
  recommendations: string[];
}

/**
 * Motor de Qualificação Real e Transparente (Sem Achismos / Sem Simulações Falsas)
 * Avalia critérios objectivos:
 * 1. Contactabilidade real (Número no WhatsApp, E-mail corporativo/válido)
 * 2. Identidade empresarial (Nome, Empresa, se não são apenas caracteres de teste como "f", "df")
 * 3. Contexto comercial (Pacote, necessidade descrita, detalhe da mensagem)
 */
export function evaluateLeadQualification(lead: Partial<Lead>): QualificationAudit {
  const blockers: string[] = [];
  const reasons: string[] = [];
  const recommendations: string[] = [];

  // ==========================================
  // 1. CONTACTABILIDADE (Máx. 40 Pontos)
  // ==========================================
  let contactScore = 0;
  const rawPhone = lead.phone || "";
  const norm = normalizePhoneNumber(rawPhone);
  const isWithoutWhatsApp =
    lead.hasWhatsApp === false ||
    isKnownUnregisteredNumber(rawPhone) ||
    isKnownUnregisteredNumber(norm.digits);

  let hasWhatsApp = false;
  let channelRec = "Telefone celular / E-mail";

  if (isWithoutWhatsApp) {
    hasWhatsApp = false;
    contactScore += 0;
    blockers.push(
      `O número ${norm.formatted || rawPhone} NÃO possui conta ativa no WhatsApp (confirmado). Inviável envio de mensagens via WhatsApp API.`,
    );
    channelRec = "Contacto telefónico por chamada de voz ou E-mail";
  } else if (lead.hasWhatsApp === true) {
    hasWhatsApp = true;
    contactScore += 30;
    reasons.push("Contacto móvel confirmado com WhatsApp ativo.");
    channelRec = "WhatsApp Business API";
  } else {
    // Número móvel não testado ainda
    contactScore += 10;
    reasons.push("Número telefónico presente, mas ainda pendente de teste no WhatsApp.");
    channelRec = "Testar número no WhatsApp ou chamada direta";
  }

  // Avaliação de E-mail (Máx. 10 pts)
  const email = (lead.email || "").trim().toLowerCase();
  if (email && email.includes("@") && email.includes(".")) {
    const isPublicDomain =
      email.includes("@gmail.") ||
      email.includes("@yahoo.") ||
      email.includes("@hotmail.") ||
      email.includes("@outlook.");

    if (!isPublicDomain) {
      contactScore += 10;
      reasons.push(`E-mail com domínio corporativo (${email}).`);
    } else {
      contactScore += 5;
      reasons.push(`E-mail de provedor geral (${email}).`);
    }
  } else {
    blockers.push("Sem endereço de e-mail corporativo válido.");
  }

  // ==========================================
  // 2. IDENTIDADE & LEGITIMIDADE (Máx. 30 Pontos)
  // ==========================================
  let identityScore = 0;
  const name = (lead.name || "").trim();
  const company = (lead.company || "").trim();
  const isSuspicious =
    name.length <= 1 ||
    company.length <= 1 ||
    name.toLowerCase() === "teste" ||
    company.toLowerCase() === "teste" ||
    (name.length <= 2 && company.length <= 2);

  if (isSuspicious) {
    identityScore = 0;
    blockers.push(
      `Dados cadastrais com caracteres mínimos ("${name}" / "${company}"). Provável envio de teste ou incompleto.`,
    );
    recommendations.push("Confirmar a identidade real da empresa e do decisor comercial.");
  } else {
    if (name.length >= 3) {
      identityScore += 15;
      reasons.push(`Contacto identificado: ${name}.`);
    }
    if (company.length >= 3) {
      identityScore += 15;
      reasons.push(`Empresa identificada: ${company}.`);
    }
  }

  // ==========================================
  // 3. CONTEXTO COMERCIAL (Máx. 30 Pontos)
  // ==========================================
  let commercialScore = 0;
  if (lead.packageInterest) {
    commercialScore += 10;
    reasons.push(`Pacote de interesse selecionado: ${lead.packageInterest}.`);
  }

  // Verifica se há notas ou mensagens descritivas reais
  const notesText = (lead.notes || []).map((n) => n.text).join(" ");
  const conversationText = (lead.conversation || []).map((c) => c.text).join(" ");
  const fullText = `${notesText} ${conversationText}`.toLowerCase();

  if (
    fullText.length > 30 &&
    !fullText.includes("área de atuação: .") &&
    !fullText.includes("serviço: .")
  ) {
    commercialScore += 20;
    reasons.push("Necessidade de negócio descrita no pedido.");
  } else if (fullText.length > 10) {
    commercialScore += 10;
  } else {
    recommendations.push("Coletar detalhes adicionais sobre o projeto e volume operacional.");
  }

  // ==========================================
  // CÁLCULO FINAL DO SCORE
  // ==========================================
  const totalScore = Math.min(100, Math.max(0, contactScore + identityScore + commercialScore));
  const isQualified = totalScore >= 60 && !isWithoutWhatsApp && !isSuspicious;

  let verdict: QualificationAudit["verdict"] = "desqualificado";
  let statusText = "Desqualificado (Dados Incompletos)";

  if (isQualified) {
    verdict = "aprovado";
    statusText = `Qualificado (Score ${totalScore}/100)`;
  } else if (totalScore >= 40) {
    verdict = "parcial";
    statusText = `Qualificação Parcial (Score ${totalScore}/100)`;
  } else {
    verdict = "desqualificado";
    statusText = `Não Qualificado (Score ${totalScore}/100)`;
  }

  if (isWithoutWhatsApp) {
    recommendations.push(
      "Não tentar disparos automatizados de WhatsApp para este lead. Usar ligação de voz tradicional ou e-mail.",
    );
  }

  return {
    score: totalScore,
    isQualified,
    verdict,
    statusText,
    breakdown: {
      contactability: {
        score: contactScore,
        max: 40,
        detail: isWithoutWhatsApp
          ? "Número SEM WhatsApp ativo (0/30 pts) + E-mail"
          : hasWhatsApp
            ? "WhatsApp ativo confirmado (30/30 pts) + E-mail"
            : "Pendente de validação de WhatsApp (10/30 pts) + E-mail",
        hasWhatsApp,
        channelRecommendation: channelRec,
      },
      identity: {
        score: identityScore,
        max: 30,
        detail: isSuspicious
          ? `Caracteres suspeitos/mínimos ("${name}" / "${company}"): 0/30 pts`
          : "Nome e Empresa validados: 30/30 pts",
        isSuspicious,
      },
      commercialContext: {
        score: commercialScore,
        max: 30,
        detail: `Interesse em pacote (${lead.packageInterest || "Não definido"}) e mensagens contextuais.`,
      },
    },
    reasons,
    blockers,
    recommendations,
  };
}
