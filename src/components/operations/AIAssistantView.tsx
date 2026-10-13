import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  RotateCcw,
  Building2,
  Phone,
  Zap,
  TrendingUp,
  Target,
  FileText,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import { Lead } from "./types";
import { askOperationalAssistant, OperationalContextPayload } from "@/lib/aiAssistantFn";

interface AIAssistantViewProps {
  leads: Lead[];
  selectedLeadId?: string | null | undefined;
  onSelectLead?: ((leadId: string) => void) | undefined;
  activeCampaignName?: string | undefined;
}

interface MessageItem {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  suggestedWhatsAppCopy?: string | null | undefined;
  modelUsed?: string | undefined;
}

const QUICK_PROMPTS = [
  {
    id: "diagnose",
    icon: Target,
    label: "Diagnosticar Lead",
    prompt:
      "Faça um diagnóstico operacional completo do lead selecionado e recomende a próxima ação imediata de fechamento.",
  },
  {
    id: "copy_fechamento",
    icon: Sparkles,
    label: "Copy de Fechamento WhatsApp",
    prompt:
      "Gere uma mensagem persuasiva e acolhedora de WhatsApp para apresentar o plano ideal para este lead em Angola, com chamada para ação direta.",
  },
  {
    id: "objecao_preco",
    icon: TrendingUp,
    label: "Quebrar Objeção de Preço",
    prompt:
      "O cliente alegou que o orçamento é elevado. Forneça uma abordagem estratégica para WhatsApp reenquadrando o custo como investimento de retorno rápido em Luanda.",
  },
  {
    id: "followup",
    icon: Zap,
    label: "Follow-up de Reaquecimento",
    prompt:
      "O lead parou de responder há 3 dias. Crie uma mensagem curta de follow-up profissional para reabrir a conversa sem parecer insistente.",
  },
  {
    id: "auditoria_campanha",
    icon: FileText,
    label: "Auditoria de Entregabilidade",
    prompt:
      "Como otimizar a entrega de mensagens em massa para números Unitel e Movicel, evitando filtros de spam e descartando números fixos?",
  },
  {
    id: "resumo_oportunidades",
    icon: UserCheck,
    label: "Resumo das Oportunidades",
    prompt:
      "Analise a lista atual de leads cadastrados e aponte os 3 com maior potencial de fechamento imediato com base nos scores.",
  },
];

export function AIAssistantView({
  leads,
  selectedLeadId,
  onSelectLead,
  activeCampaignName,
}: AIAssistantViewProps) {
  const [messages, setMessages] = useState<MessageItem[]>(() => [
    {
      id: "welcome-1",
      sender: "assistant",
      text: `Olá! Sou o seu **Copiloto IA Operacional** da Agentes Digital.\n\nEstou conectado ao sistema em tempo real e pronto para ajudá-lo a:\n* **Analisar leads e scores de qualificação** para identificar os decisores mais quentes;\n* **Redigir copys de WhatsApp de alta conversão** adaptadas ao tom empresarial angolano;\n* **Superar objeções comerciais** (preço em Kwanzas, prazos, suporte local);\n* **Recomendar o plano ideal** (Presença, Profissional, Autoridade, Domínio IA ou Automate Pro).\n\nSelecione um lead no seletor acima ou clique em uma das ações rápidas para começar!`,
      timestamp: new Date().toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      modelUsed: "gemini-3.8-flash",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentLeadId, setCurrentLeadId] = useState<string | null>(selectedLeadId || null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Sincroniza se o lead selecionado externamente mudar
  useEffect(() => {
    if (selectedLeadId) {
      setCurrentLeadId(selectedLeadId);
    }
  }, [selectedLeadId]);

  // Lead ativo em foco
  const activeLead = leads.find((l) => l.id === currentLeadId) || leads[0] || null;

  // Auto-scroll para o final da conversa
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Métricas rápidas
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter((l) => l.aiQualified).length;
  const convertedLeads = leads.filter((l) => l.status === "convertido").length;
  const activeChats = leads.filter((l) => l.aiProcessingStatus === "ativo").length;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: MessageItem = {
      id: userMsgId,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      // Prepara o payload para o server
      const payload: OperationalContextPayload = {
        userMessage: text,
        selectedLead: activeLead
          ? {
              id: activeLead.id,
              name: activeLead.name,
              company: activeLead.company,
              role: activeLead.role,
              phone: activeLead.phone,
              channel: activeLead.channel,
              status: activeLead.status,
              packageInterest: activeLead.packageInterest,
              qualificationScore: activeLead.qualificationScore,
              estimatedValue: activeLead.estimatedValue,
              lastActive: activeLead.lastActive,
              hasWhatsApp: activeLead.hasWhatsApp,
              notesCount: activeLead.notes?.length || 0,
              recentMessages: (activeLead.conversation || []).slice(-4).map((m) => ({
                sender: m.sender,
                text: m.text,
              })),
            }
          : null,
        statsSummary: {
          totalLeads,
          qualifiedLeads,
          convertedLeads,
          activeChats,
          activeCampaignName: activeCampaignName || "Construção Civil & Empresas Luanda",
        },
        chatHistory: messages.slice(-4).map((m) => ({
          sender: m.sender,
          text: m.text,
        })),
      };

      const res = await askOperationalAssistant({ data: payload });

      const assistantMsg: MessageItem = {
        id: `asst-${Date.now()}`,
        sender: "assistant",
        text: res.text,
        timestamp: new Date().toLocaleTimeString("pt-PT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        suggestedWhatsAppCopy: res.suggestedWhatsAppCopy,
        modelUsed: res.modelUsed,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error("Erro ao consultar Assistente IA:", err);
      toast.error("Não foi possível processar a resposta. Tente novamente.");
    } finally {
      setIsLoading(false);
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleCopyText = (text: string, msgId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    toast.success("Mensagem copiada para a área de transferência!");
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleOpenWhatsApp = (text: string) => {
    const rawPhone = activeLead?.phone || "";
    const cleanPhone = rawPhone.replace(/\D/g, "");
    let phoneParam = cleanPhone;
    if (cleanPhone.length === 9) {
      phoneParam = `244${cleanPhone}`;
    }
    const url = `https://wa.me/${phoneParam}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "assistant",
        text: "Conversa reiniciada. Em que posso ajudar na operação comercial hoje?",
        timestamp: new Date().toLocaleTimeString("pt-PT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        modelUsed: "gemini-3.8-flash",
      },
    ]);
    toast.info("Histórico do chat reiniciado.");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080A0F] text-[#F5F7FA] overflow-hidden select-text">
      {/* 1. Header do Assistente */}
      <div className="px-5 py-3.5 border-b border-[#252C38] bg-[#0E121A]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-white tracking-tight">
                Assistente IA Operacional
              </h1>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300">
                gemini-3.8-flash
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Copiloto inteligente de análise de leads, respostas WhatsApp e conversão em Angola
            </p>
          </div>
        </div>

        {/* Controles de Contexto do Lead & Limpar Chat */}
        <div className="flex items-center gap-2.5">
          {leads.length > 0 && (
            <div className="flex items-center gap-2 bg-[#151A23] border border-[#252C38] rounded-lg px-2.5 py-1 text-xs">
              <Building2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="text-slate-400 text-[11px]">Lead em foco:</span>
              <select
                value={activeLead?.id || ""}
                onChange={(e) => {
                  const newId = e.target.value;
                  setCurrentLeadId(newId);
                  if (onSelectLead) onSelectLead(newId);
                }}
                className="bg-transparent text-slate-200 text-xs font-semibold focus:outline-none cursor-pointer max-w-[180px] truncate"
              >
                {leads.map((l) => (
                  <option key={l.id} value={l.id} className="bg-[#151A23] text-slate-200">
                    {l.name} • {l.company} ({l.qualificationScore} pts)
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-[#151A23] hover:bg-[#1C2330] border border-[#252C38] rounded-lg transition-colors cursor-pointer"
            title="Reiniciar conversa"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Limpar</span>
          </button>
        </div>
      </div>

      {/* 2. Barra de Contexto Operacional Vivo */}
      <div className="px-5 py-2 bg-[#121620] border-b border-[#252C38] flex items-center justify-between text-[11px] text-slate-400 overflow-x-auto shrink-0 gap-4">
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Total Leads:</span>
            <span className="font-mono font-semibold text-slate-200 tabular-nums">
              {totalLeads}
            </span>
          </div>
          <span className="text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Qualificados IA:</span>
            <span className="font-mono font-semibold text-emerald-400 tabular-nums">
              {qualifiedLeads}
            </span>
          </div>
          <span className="text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Convertidos:</span>
            <span className="font-mono font-semibold text-blue-400 tabular-nums">
              {convertedLeads}
            </span>
          </div>
          <span className="text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Chats Ativos:</span>
            <span className="font-mono font-semibold text-violet-400 tabular-nums">
              {activeChats}
            </span>
          </div>
        </div>

        {activeLead && (
          <div className="flex items-center gap-2 text-slate-300 shrink-0">
            <span className="text-slate-500">Foco Ativo:</span>
            <span className="font-medium text-white">{activeLead.name}</span>
            <span className="text-slate-500">({activeLead.company})</span>
            <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">
              {activeLead.packageInterest}
            </span>
          </div>
        )}
      </div>

      {/* 3. Atalhos de Ação Rápida */}
      <div className="px-5 py-2.5 bg-[#0A0D13] border-b border-[#252C38]/60 overflow-x-auto shrink-0 scrollbar-none">
        <div className="flex items-center gap-2 w-max">
          <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mr-1 shrink-0">
            Atalhos:
          </span>
          {QUICK_PROMPTS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleSendMessage(item.prompt)}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#151A23] hover:bg-[#1E2533] border border-[#252C38] hover:border-blue-500/40 text-xs font-medium text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap shadow-xs disabled:opacity-50"
              >
                <Icon className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Lista de Mensagens */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-4xl mx-auto w-full`}
            >
              <div
                className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                    isUser
                      ? "bg-blue-600 text-white"
                      : "bg-gradient-to-tr from-violet-600 to-blue-600 text-white shadow-md shadow-violet-500/20"
                  }`}
                >
                  {isUser ? "OP" : <Bot className="w-4 h-4" />}
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col gap-1.5 min-w-0">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-blue-600 text-white rounded-tr-xs"
                        : "bg-[#151A23] border border-[#252C38] text-slate-200 rounded-tl-xs whitespace-pre-wrap"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Cartão de Ação Destacado: Mensagem WhatsApp Pronta */}
                  {msg.suggestedWhatsAppCopy && (
                    <div className="mt-2 bg-[#0E131C] border border-emerald-500/30 rounded-xl p-3.5 flex flex-col gap-2.5 shadow-lg shadow-black/40">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Mensagem Pronta para WhatsApp:</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {activeLead ? activeLead.company : "Lead em Foco"}
                        </span>
                      </div>

                      <div className="p-3 bg-[#151A23] rounded-lg border border-[#252C38] text-xs text-slate-200 leading-relaxed font-sans italic whitespace-pre-wrap">
                        "{msg.suggestedWhatsAppCopy}"
                      </div>

                      <div className="flex items-center justify-end gap-2 pt-1">
                        <button
                          onClick={() => handleCopyText(msg.suggestedWhatsAppCopy!, msg.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C2330] hover:bg-[#252D3D] text-slate-200 hover:text-white border border-[#2A3548] text-xs font-medium transition-colors cursor-pointer"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-slate-400" />
                              <span>Copiar Texto</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleOpenWhatsApp(msg.suggestedWhatsAppCopy!)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm transition-colors cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Abrir no WhatsApp</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Metadados da Mensagem */}
                  <div
                    className={`flex items-center gap-2 text-[10px] text-slate-500 px-1 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {msg.modelUsed && (
                      <>
                        <span>·</span>
                        <span className="font-mono text-slate-400">{msg.modelUsed}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Indicador de Carregamento */}
        {isLoading && (
          <div className="flex items-center gap-3 max-w-4xl mx-auto w-full">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-blue-600 flex items-center justify-center text-white shrink-0 animate-pulse">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#151A23] border border-[#252C38] rounded-2xl rounded-tl-xs px-4 py-3 text-sm text-slate-300 flex items-center gap-2">
              <div className="flex gap-1.5">
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
              <span className="text-xs text-slate-400 ml-1">
                Consultando contexto e gerando resposta com IA...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 5. Barra Inferior de Entrada */}
      <div className="p-4 bg-[#0E121A] border-t border-[#252C38] shrink-0">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-2">
          {/* Indicador do lead ativo anexado à mensagem */}
          {activeLead && (
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <div className="flex items-center gap-1.5">
                <span className="text-blue-400 font-medium">Contexto vinculado:</span>
                <span className="text-slate-200 font-semibold">{activeLead.name}</span>
                <span>•</span>
                <span>{activeLead.company}</span>
                <span className="text-slate-500 font-mono">({activeLead.phone})</span>
              </div>
              <span className="text-slate-500 hidden sm:inline">
                Pressione Enter para enviar (Shift+Enter para quebra de linha)
              </span>
            </div>
          )}

          <div className="relative flex items-end bg-[#151A23] border border-[#252C38] focus-within:border-blue-500 rounded-xl transition-all shadow-inner">
            <textarea
              ref={textareaRef}
              rows={2}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={
                activeLead
                  ? `Peça uma análise ou copy de WhatsApp para ${activeLead.name}...`
                  : "Digite sua dúvida sobre vendas, leads, mensagens ou campanhas..."
              }
              className="flex-1 max-h-32 p-3 text-sm text-slate-100 placeholder-slate-500 bg-transparent resize-none focus:outline-none scrollbar-thin"
              disabled={isLoading}
            />

            <div className="p-2">
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputText.trim() || isLoading}
                className="p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:hover:bg-blue-600 transition-colors cursor-pointer"
                title="Enviar mensagem"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
