import { AIStructuredOutput, ChatMessage, Lead } from "./types";

export const SYSTEM_PROMPT_CONTENT = `# PROMPT DE SISTEMA: AGENTE DIGITAL (Agentes Digital)

Este é o system prompt usado na chamada à API do modelo toda vez que uma mensagem chega via WhatsApp ou chat do site. Deve ser enviado junto com o histórico da conversa (tabela messages) a cada nova interação.

## 1. IDENTIDADE
Você é o Agente Digital, o assistente virtual da empresa Agentes Digital (agentes-digital.com), uma empresa angolana de tecnologia especializada em websites, Inteligência Artificial, automação e sistemas digitais para empresas.
Você não é um chatbot genérico. Você é a primeira linha de atendimento da empresa, com a função de dar uma boa impressão, entender a necessidade do contacto, qualificá-lo e, quando possível, agendar uma reunião.

## 2. TOM DE VOZ
- Profissional, mas humano e caloroso: nunca robótico ou excessivamente formal
- Direto: frases curtas, sem enrolação
- Confiante, mas nunca arrogante
- Português de Angola / Portugal (evitar expressões tipicamente brasileiras)
- Nunca usar emojis em excesso (no máximo 1 por mensagem, quando fizer sentido)
- Nunca soar como "script de vendas", buscando sempre uma conversa real

Nunca dizer:
- "Como posso ajudá-lo hoje?" (genérico demais)
- "Estou aqui para servir" (servil demais)
- Jargão técnico não solicitado ("modelo de linguagem", "IA generativa")

Preferir:
- "Olá! Em que posso ajudar a sua empresa?"
- Ir direto ao ponto, uma pergunta de cada vez

## 3. O QUE VOCÊ SABE (base de conhecimento)
### Sobre a empresa
A Agentes Digital constrói sistemas digitais que ajudam empresas a: ser encontradas → construir confiança → atender → qualificar → agendar → converter.
Não vende apenas sites: vende websites, agentes de IA, automação e sistemas.

### Os pacotes disponíveis (nunca inventar preços ou itens além destes):
- Presença: Kz 125.000 (impl) | Kz 20.000/mês: Para quem precisa começar: landing page, domínio, hospedagem, WhatsApp, Google Maps
- Profissional ⭐ mais escolhido: Kz 250.000 (impl) | Kz 50.000/mês: Website até 5 páginas + agendamento + IA básica + SEO local
- Automate Pro: Kz 300.000 (impl) | Kz 65.000/mês: Infraestrutura de IA e automação conectada sobre website já existente do cliente (inclui 4h/mês de ajustes)
- Autoridade: Kz 450.000 (impl) | Kz 85.000/mês: Website até 10 páginas + blog + IA avançada + CRM + automação
- Domínio IA: Kz 700.000 (impl) | Kz 150.000/mês: Operação digital completa: sistemas personalizados, agentes de IA, dashboards

### Serviços:
Websites, Agentes de IA (WhatsApp/site/e-mail), Automação (leads, follow-up, agendamento), Sistemas Digitais (dashboards, CRM, portais).

## 4. OBJETIVO DA CONVERSA (prioridade)
1. Entender que tipo de negócio o contacto tem
2. Entender o que ele procura (site, IA, automação, sistema, ou "não sei ainda")
3. Qualificar: tem site hoje? já usa WhatsApp para vender? qual o principal problema?
4. Sugerir o pacote mais adequado (sem forçar o mais caro)
5. Propor agendamento de uma reunião de diagnóstico (gratuita, sem compromisso)
6. Se o lead fechar horário → confirmar e criar o agendamento

## 5. FLUXO DE QUALIFICAÇÃO
Fazer no máximo 3-4 perguntas, uma de cada vez:
1. "Qual é o seu negócio / em que área atua?"
2. "Hoje já tem site ou usa o WhatsApp para atender clientes?"
3. "O que mais lhe interessa: ter uma presença online, automatizar o atendimento, ou os dois?"
4. (se aplicável) "Prefere conversar amanhã de manhã ou à tarde?"

## 6. QUANDO AGENDAR
Propor 2 horários concretos: ex. "amanhã às 10h ou às 15h".

## 7. QUANDO ESCALAR PARA HUMANO (↗ ATENDENTE)
Escalar imediatamente se:
- Pedir para falar com pessoa/humano
- Reclamação, insatisfação
- Contrato existente, faturamento, suporte técnico
- Pedido de desconto ou negociação de valores
Aviso ao lead:
"Vou passar isso para a nossa equipa, que consegue ajudar melhor com esse ponto. Já já alguém entra em contacto."

## 8. REGRAS RÍGIDAS
- Nunca prometer resultados garantidos
- Nunca inventar preços fora dos 4 pacotes
- Responder com transparência: "Sou o assistente digital da Agentes Digital"

## 11. DADOS ESTRUTURADOS DE SAÍDA
{
  "ai_intent": "qualificacao | agendamento | faq | escalonamento",
  "ai_confidence": 0.0,
  "lead_update": {
    "business_segment": null,
    "package_interest": null,
    "qualification_score": null,
    "status": null
  },
  "escalate_to_human": false
}`;

export function generateAIAgentResponse(
  incomingText: string,
  history: ChatMessage[],
  lead: Lead,
): {
  replyText: string;
  metadata: AIStructuredOutput;
} {
  const lower = incomingText.toLowerCase();

  // Rule 7: Immediate Escalation to Human
  const wantsHuman =
    lower.includes("pessoa") ||
    lower.includes("humano") ||
    lower.includes("atendente") ||
    lower.includes("falar com alguém") ||
    lower.includes("falar com pessoa");
  const wantsDiscount =
    lower.includes("desconto") ||
    lower.includes("negociar") ||
    lower.includes("fazer mais barato") ||
    lower.includes("preço mais baixo") ||
    lower.includes("promoção");
  const isExistingComplaint =
    lower.includes("reclamação") ||
    lower.includes("fatura") ||
    lower.includes("contrato") ||
    lower.includes("suporte técnico") ||
    lower.includes("problema no site");

  if (wantsHuman || wantsDiscount || isExistingComplaint) {
    return {
      replyText:
        "Vou passar isso para a nossa equipa, que consegue ajudar melhor com esse ponto. Já já alguém entra em contacto.",
      metadata: {
        ai_intent: "escalonamento",
        ai_confidence: 0.98,
        lead_update: {
          business_segment: null,
          package_interest: null,
          qualification_score: null,
          status: null,
        },
        escalate_to_human: true,
      },
    };
  }

  // Rule: Meeting Confirmation
  if (
    lower.includes("10h") ||
    lower.includes("15h") ||
    lower.includes("14h") ||
    lower.includes("16h") ||
    lower.includes("pode ser") ||
    lower.includes("amanhã") ||
    lower.includes("está bom") ||
    lower.includes("combinado")
  ) {
    const chosenHour = lower.includes("10h") ? "10h" : "15h";
    return {
      replyText: `Combinado! Reunião de diagnóstico marcada para amanhã às ${chosenHour}. Vou enviar a confirmação aqui no WhatsApp e por e-mail, se preferir também me passa o seu e-mail.`,
      metadata: {
        ai_intent: "agendamento",
        ai_confidence: 0.96,
        lead_update: {
          business_segment: lead.company || "Negócio em Luanda",
          package_interest: "dominio_ia",
          qualification_score: 95,
          status: "agendado",
        },
        escalate_to_human: false,
      },
    };
  }

  // Objection handling: Ancoragem de ROI e máquina de vendas (Skill: skill-contorno-objecoes-angola.md)
  if (
    lower.includes("caro") ||
    lower.includes("muito alto") ||
    lower.includes("sem dinheiro") ||
    lower.includes("não tenho orçamento") ||
    lower.includes("amigo faz") ||
    lower.includes("sobrinho")
  ) {
    return {
      replyText:
        "Compreendo perfeitamente a sua atenção ao orçamento. A grande diferença é que a Agentes Digital não entrega apenas um website vitrine, mas sim uma máquina de aquisição com inteligência artificial que atende e qualifica clientes 24 horas por dia no WhatsApp. Se ela trouxer apenas 2 novos clientes no mês, o retorno já cobre o investimento por completo. Faz sentido avaliarmos isso num diagnóstico rápido de 20 minutos?",
      metadata: {
        ai_intent: "qualificacao",
        ai_confidence: 0.96,
        lead_update: {
          business_segment: lead.company,
          package_interest: "dominio_ia",
          qualification_score: 90,
          status: "qualificado",
        },
        escalate_to_human: false,
      },
    };
  }

  // Inquiries specifically about existing websites or automation
  if (
    lower.includes("já tenho site") ||
    lower.includes("site existente") ||
    lower.includes("só a ia") ||
    lower.includes("só automação") ||
    lower.includes("conectar ao site") ||
    lower.includes("automate pro")
  ) {
    return {
      replyText:
        "Excelente! Para quem já possui website, temos o plano específico AUTOMATE PRO (Kz 300.000 setup único + Kz 65.000/mês de operação). Implementamos o agente de IA treinado, chat no site, integração direta com WhatsApp oficial, CRM e automação de agendamentos, com 4 horas mensais de suporte inclusas. Quer que façamos um diagnóstico do seu site atual?",
      metadata: {
        ai_intent: "qualificacao",
        ai_confidence: 0.97,
        lead_update: {
          business_segment: lead.company,
          package_interest: "automate_pro",
          qualification_score: 92,
          status: "qualificado",
        },
        escalate_to_human: false,
      },
    };
  }

  // Pricing Inquiry
  if (
    lower.includes("preço") ||
    lower.includes("quanto custa") ||
    lower.includes("valor") ||
    lower.includes("pacote") ||
    lower.includes("orçamento")
  ) {
    return {
      replyText:
        "Temos pacotes estruturados em Kwanzas: Presença (Kz 125.000 | Kz 20k/mês), Profissional (Kz 250.000 | Kz 50k/mês), Automate Pro para site existente (Kz 300.000 | Kz 65k/mês), Autoridade (Kz 450.000 | Kz 85k/mês) e Domínio IA (Kz 700.000 | Kz 150k/mês). Hoje a sua empresa já tem um website ativo ou precisa de construir um de raiz?",
      metadata: {
        ai_intent: "qualificacao",
        ai_confidence: 0.94,
        lead_update: {
          business_segment: null,
          package_interest: "profissional",
          qualification_score: 85,
          status: "qualificado",
        },
        escalate_to_human: false,
      },
    };
  }

  // First greeting or generic inquiry
  if (history.length <= 1) {
    return {
      replyText:
        "Olá! Com todo gosto. Para eu entender melhor: qual é o seu negócio ou em que área atua?",
      metadata: {
        ai_intent: "qualificacao",
        ai_confidence: 0.91,
        lead_update: {
          business_segment: null,
          package_interest: null,
          qualification_score: 65,
          status: "novo",
        },
        escalate_to_human: false,
      },
    };
  }

  // Next qualification step: propose diagnostic meeting with 2 concrete slots
  return {
    replyText:
      "Perfeito, compreendi a sua necessidade. É exatamente onde conseguimos ajudar: um sistema com agendamento automático e agente de IA que atende 24/7. Faz sentido marcarmos uma conversa rápida de diagnóstico, sem compromisso? Tenho amanhã às 10h ou às 15h.",
    metadata: {
      ai_intent: "agendamento",
      ai_confidence: 0.93,
      lead_update: {
        business_segment: lead.company,
        package_interest:
          lead.packageInterest === "Domínio IA"
            ? "dominio_ia"
            : lead.packageInterest === "Autoridade"
              ? "autoridade"
              : "profissional",
        qualification_score: 88,
        status: "qualificado",
      },
      escalate_to_human: false,
    },
  };
}
