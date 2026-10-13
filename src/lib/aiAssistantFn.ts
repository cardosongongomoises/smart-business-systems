import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

export interface OperationalContextPayload {
  userMessage: string;
  selectedLead?:
    | {
        id: string;
        name: string;
        company: string;
        role?: string | undefined;
        phone: string;
        channel: string;
        status: string;
        packageInterest: string;
        qualificationScore: number;
        estimatedValue?: string | undefined;
        lastActive?: string | undefined;
        hasWhatsApp?: boolean | undefined;
        notesCount?: number | undefined;
        recentMessages?: Array<{ sender: string; text: string }> | undefined;
      }
    | null
    | undefined;
  statsSummary?:
    | {
        totalLeads: number;
        qualifiedLeads: number;
        convertedLeads: number;
        activeChats: number;
        activeCampaignName?: string | undefined;
        totalDisparos?: number | undefined;
      }
    | undefined;
  chatHistory?: Array<{ sender: "user" | "assistant"; text: string }> | undefined;
}

export interface AssistantResponse {
  success: boolean;
  text: string;
  suggestedWhatsAppCopy?: string | null | undefined;
  modelUsed: string;
}

const SYSTEM_INSTRUCTION = `Você é o Assistente IA Oficial do Centro de Operações da Agentes Digital (agentes-digital.com), sediada em Luanda, Angola.
A sua função é ser o copiloto comercial e operacional da equipe interna de vendas e operações.

A Agentes Digital é especialista em:
1. Criação de Websites Profissionais e Landing Pages de Alta Conversão para empresas em Angola.
2. Agentes de Inteligência Artificial para WhatsApp (atendimento automatizado 24/7, qualificação de leads, agendamento de reuniões).
3. Automação Comercial e CRM (Automate Pro) para integração completa de processos de vendas.

Pacotes Oficiais da Agentes Digital:
- Presença (Kz 150.000): Website institucional rápido, layout mobile, botão WhatsApp.
- Profissional (Kz 250.000): Website corporativo completo, SEO local, formulário e catálogo integrado.
- Autoridade (Kz 450.000): Plataforma web robusta, múltiplos produtos/serviços, integração de captação e analytics.
- Domínio IA (Kz 750.000): Website topo de gama com Agente de IA para WhatsApp integrado e treinado.
- Automate Pro (Setup Kz 500.000 + Recorrência Kz 85.000/mês): Automação total de CRM, disparos em massa qualificados e acompanhamento contínuo.

Contexto de Mercado em Angola:
- Moeda: Kwanza (Kz).
- Operadoras móveis locais: Unitel (maior base), Movicel, Africell.
- Linguagem: Português de Angola, tom profissional, acolhedor e seguro ("com todo o gosto", "prezado", "excelente oportunidade").
- Respeito pelo canal WhatsApp: mensagens objetivas, sem spam, focadas na dor real do decisor (aumentar vendas, não perder clientes fora de horário comercial, ter presença digital credível).

Suas Diretrizes de Resposta:
- Seja direto, perspicaz e acionável. Evite enrolação.
- Se o usuário pedir análise de um lead ou sugestão de mensagem, forneça uma análise rápida do contexto e forneça uma mensagem pronta para envio.
- Sempre que gerar uma mensagem recomendada para envio no WhatsApp, formate-a claramente com o marcador:
=== MENSAGEM WHATSAPP ===
[Texto da mensagem pronto para copiar e enviar ao cliente]
=== FIM MENSAGEM ===
- Responda dúvidas sobre estratégias comerciais, cálculo de taxas de conversão, tratamento de objeções de preço e follow-up.`;

export const askOperationalAssistant = createServerFn({ method: "POST" })
  .validator((d: OperationalContextPayload) => d)
  .handler(async ({ data }): Promise<AssistantResponse> => {
    const { userMessage, selectedLead, statsSummary, chatHistory = [] } = data;

    // Constrói o contexto atual para enriquecer o prompt
    let contextPrompt = "";
    if (statsSummary) {
      contextPrompt += `\n[CONTEXTO ATUAL DA OPERAÇÃO]:
- Total de Leads Cadastrados: ${statsSummary.totalLeads}
- Leads Qualificados por IA: ${statsSummary.qualifiedLeads}
- Leads Convertidos: ${statsSummary.convertedLeads}
- Conversas Ativas no Momento: ${statsSummary.activeChats}
${statsSummary.activeCampaignName ? `- Campanha Recente em Foco: "${statsSummary.activeCampaignName}"` : ""}\n`;
    }

    if (selectedLead) {
      contextPrompt += `\n[LEAD SELECIONADO NO CENTRO DE OPERAÇÕES]:
- Nome: ${selectedLead.name}
- Empresa: ${selectedLead.company} (${selectedLead.role || "Decisor Comercial"})
- Telefone: ${selectedLead.phone} ${selectedLead.hasWhatsApp ? "(WhatsApp Confirmado Ativo)" : "(A verificar)"}
- Canal de Entrada: ${selectedLead.channel}
- Status no Funil: ${selectedLead.status}
- Pacote de Interesse: ${selectedLead.packageInterest}
- Score de Qualificação: ${selectedLead.qualificationScore}/100
- Valor Estimado: ${selectedLead.estimatedValue || "A definir"}\n`;

      if (selectedLead.recentMessages && selectedLead.recentMessages.length > 0) {
        contextPrompt += `- Últimas mensagens da conversa com o lead:\n`;
        selectedLead.recentMessages.slice(-4).forEach((m) => {
          contextPrompt += `  * [${m.sender === "client" ? "Cliente" : "IA"}]: "${m.text}"\n`;
        });
      }
    }

    // Histórico recente da conversa com o assistente
    let conversationHistoryText = "";
    if (chatHistory.length > 0) {
      conversationHistoryText = "\n[HISTÓRICO RECENTE DO CHAT]:\n";
      chatHistory.slice(-4).forEach((h) => {
        conversationHistoryText += `${h.sender === "user" ? "Operador" : "Assistente"}: ${h.text}\n`;
      });
    }

    const fullPrompt = `${contextPrompt}${conversationHistoryText}
[MENSAGEM DO OPERADOR]:
${userMessage}

Responda agora como o Assistente IA do Centro de Operações.`;

    const apiKey = process.env["GEMINI_API_KEY"];

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: fullPrompt,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.65,
          },
        });

        const outputText = response.text || "";

        // Extrai mensagem WhatsApp se houver bloco demarcado
        let suggestedWhatsAppCopy: string | null = null;
        const copyMatch = outputText.match(
          /=== MENSAGEM WHATSAPP ===([\s\S]*?)=== FIM MENSAGEM ===/,
        );
        if (copyMatch && copyMatch[1]) {
          suggestedWhatsAppCopy = copyMatch[1].trim();
        }

        return {
          success: true,
          text: outputText,
          suggestedWhatsAppCopy,
          modelUsed: "gemini-3.8-flash",
        };
      } catch (err) {
        console.warn("Erro na chamada do Gemini API, recorrendo ao motor heurístico:", err);
      }
    }

    // Fallback heurístico inteligente em caso de ausência momentânea de chave ou offline
    const fallbackResult = generateHeuristicAssistantResponse(userMessage, selectedLead);
    return {
      success: true,
      text: fallbackResult.text,
      suggestedWhatsAppCopy: fallbackResult.suggestedWhatsAppCopy,
      modelUsed: "motor-heuristico-operacional",
    };
  });

function generateHeuristicAssistantResponse(
  userMessage: string,
  selectedLead?: OperationalContextPayload["selectedLead"],
): { text: string; suggestedWhatsAppCopy: string | null } {
  const query = userMessage.toLowerCase();
  const leadName = selectedLead?.name || "Dr(a). Diretor(a)";
  const leadCompany = selectedLead?.company || "sua empresa";
  const leadPlan = selectedLead?.packageInterest || "Profissional";

  if (query.includes("lead") || query.includes("analis") || query.includes("diagnost")) {
    const copy = `Olá ${leadName}! Acompanhei o crescimento da ${leadCompany} e notei uma oportunidade excelente para captarem mais clientes qualificados através do vosso atendimento comercial. Quando teria 10 minutos esta semana para lhe apresentar uma demonstração rápida do nosso plano ${leadPlan}?`;
    return {
      text: `### 🎯 Diagnóstico Operacional do Lead\n\n- **Lead em Análise:** ${leadName} (${leadCompany})\n- **Score de Qualificação:** ${selectedLead?.qualificationScore ?? 85}/100\n- **Pacote Recomendado:** ${leadPlan}\n- **Recomendação Prática:** O lead apresenta forte potencial. O principal próximo passo é enviar uma abordagem direta via WhatsApp validando o interesse e sugerindo um diagnóstico rápido de 10 minutos.\n\n=== MENSAGEM WHATSAPP ===\n${copy}\n=== FIM MENSAGEM ===`,
      suggestedWhatsAppCopy: copy,
    };
  }

  if (query.includes("preço") || query.includes("objec") || query.includes("caro")) {
    const copy = `Compreendo perfeitamente, ${leadName}. Mais do que um custo, a solução da Agentes Digital é desenhada para se pagar logo no primeiro mês com os clientes adicionais que deixa de perder fora do horário de expediente. Se concordar, posso apresentar-lhe como empresas semelhantes à ${leadCompany} obtiveram retorno positivo em menos de 3 semanas.`;
    return {
      text: `### 🛡️ Tratamento de Objeção: Preço / Orçamento\n\n1. **Validação da Preocupação:** Reconhecer que o orçamento é uma prioridade do decisor angolano.\n2. **Reenquadramento de Custo para Investimento:** Destacar que perder 3 clientes por semana no WhatsApp custa mais do que a mensalidade do sistema.\n3. **Prova de Retorno Local:** Oferecer um exemplo comparativo de retorno no mercado de Luanda.\n\n=== MENSAGEM WHATSAPP ===\n${copy}\n=== FIM MENSAGEM ===`,
      suggestedWhatsAppCopy: copy,
    };
  }

  if (query.includes("campanha") || query.includes("disparo") || query.includes("entrega")) {
    return {
      text: `### 📊 Auditoria de Campanha e Disparos\n\n- **Filtro Anti-Bloqueio:** Garantir que o intervalo entre mensagens seja de pelo menos 15 a 25 segundos.\n- **Higienização de Base:** Sempre utilize a verificação automática de números móveis angolanos (descartando telefones fixos +244 222/227).\n- **Horários Nobres em Angola:** Disparos entre **09h00 e 11h30** e entre **14h30 e 16h30** registam a maior taxa de leitura e resposta imediata.`,
      suggestedWhatsAppCopy: null,
    };
  }

  // Resposta padrão orientada a vendas e operações
  const defaultCopy = `Olá ${leadName}, espero que esteja bem! Gostaria de partilhar consigo uma demonstração de como a ${leadCompany} pode automatizar o atendimento comercial no WhatsApp com Inteligência Artificial e fechar propostas sem atrasos. Tem disponibilidade para uma breve chamada amanhã?`;
  return {
    text: `Olá! Estou conectado ao Centro de Operações da **Agentes Digital** com acesso aos dados de leads, métricas de conversão e campanhas.\n\nPosso ajudá-lo a:\n1. **Elaborar mensagens de WhatsApp** personalizadas para qualquer lead selecionado.\n2. **Quebrar objeções comerciais** (preço, tempo, desconfiança tecnológica).\n3. **Sugerir estratégias de follow-up** para reaquecer leads parados.\n4. **Otimizar campanhas de disparo** para máxima entregabilidade em Angola.\n\nAbaixo preparei uma abordagem modelo que você pode utilizar agora mesmo:\n\n=== MENSAGEM WHATSAPP ===\n${defaultCopy}\n=== FIM MENSAGEM ===`,
    suggestedWhatsAppCopy: defaultCopy,
  };
}
