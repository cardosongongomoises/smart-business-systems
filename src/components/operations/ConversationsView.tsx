import { useState, useMemo } from "react";
import {
  MessageSquareCode,
  Bot,
  UserCheck,
  Send,
  Sparkles,
  Search,
  Code2,
  ChevronDown,
  ChevronUp,
  Calendar,
  Phone,
  Building2,
  CheckCircle2,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { Lead, ChatMessage } from "./types";
import { generateAIAgentResponse } from "./aiAgentEngine";
import { toast } from "sonner";

interface ConversationsViewProps {
  leads: Lead[];
  selectedLeadId: string | null;
  onSelectLead: (id: string) => void;
  onAddMessage: (leadId: string, msg: ChatMessage) => void;
  onToggleAiStatus: (leadId: string) => void;
}

export function ConversationsView({
  leads,
  selectedLeadId,
  onSelectLead,
  onAddMessage,
  onToggleAiStatus,
}: ConversationsViewProps) {
  const [search, setSearch] = useState("");
  const [filterAiOnly, setFilterAiOnly] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [clientSimInput, setClientSimInput] = useState("");
  const [isTypingAi, setIsTypingAi] = useState(false);
  const [expandedJsonIds, setExpandedJsonIds] = useState<Record<string, boolean>>({});

  // Filter conversations
  const conversationLeads = useMemo(() => {
    return leads.filter((l) => {
      if (filterAiOnly && l.aiProcessingStatus !== "ativo") return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        return (
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.phone.includes(q)
        );
      }
      return true;
    });
  }, [leads, filterAiOnly, search]);

  const activeLead = useMemo(() => {
    return conversationLeads.find((l) => l.id === selectedLeadId) || conversationLeads[0] || null;
  }, [conversationLeads, selectedLeadId]);

  const toggleJsonExpand = (msgId: string) => {
    setExpandedJsonIds((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSendOperatorReply = () => {
    if (!replyInput.trim() || !activeLead) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "human",
      text: replyInput.trim(),
      timestamp: new Date().toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onAddMessage(activeLead.id, newMsg);
    setReplyInput("");
    toast.success("Mensagem do operador enviada via WhatsApp");
  };

  const handleSimulateClientMessage = () => {
    if (!clientSimInput.trim() || !activeLead) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "client",
      text: clientSimInput.trim(),
      timestamp: new Date().toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onAddMessage(activeLead.id, newMsg);
    const sentText = clientSimInput.trim();
    setClientSimInput("");

    // Auto trigger AI response if AI is active
    if (activeLead.aiProcessingStatus === "ativo") {
      setIsTypingAi(true);
      setTimeout(() => {
        setIsTypingAi(false);
        const { replyText, metadata } = generateAIAgentResponse(
          sentText,
          activeLead.conversation,
          activeLead,
        );

        if (metadata.escalate_to_human) {
          toast.error("Regra 7: Escalonamento Humano acionado", {
            description: "A conversa foi transferida automaticamente para a equipa.",
          });
          onToggleAiStatus(activeLead.id);
        }

        const aiMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          sender: "ai",
          text: replyText,
          timestamp: new Date().toLocaleTimeString("pt-PT", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          aiMetadata: metadata,
        };

        onAddMessage(activeLead.id, aiMsg);
      }, 700);
    }
  };

  const handleForceAiResponse = () => {
    if (!activeLead) return;
    setIsTypingAi(true);

    const clientMsgs = activeLead.conversation.filter((m) => m.sender === "client");
    const lastMsg = clientMsgs[clientMsgs.length - 1]?.text || "Gostaria de saber preços e prazos.";

    setTimeout(() => {
      setIsTypingAi(false);
      const { replyText, metadata } = generateAIAgentResponse(
        lastMsg,
        activeLead.conversation,
        activeLead,
      );

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString("pt-PT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        aiMetadata: metadata,
      };

      onAddMessage(activeLead.id, aiMsg);
      toast.success("Resposta gerada pelo Agente Digital v3.2");
    }, 600);
  };

  return (
    <div className="flex-1 flex h-full bg-[#080A0F] overflow-hidden">
      {/* Left Column: Conversations List (340px) */}
      <div className="w-80 shrink-0 border-r border-[#252C38] bg-[#0E121A] flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-[#252C38]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-[#F5F7FA] flex items-center gap-2">
              <MessageSquareCode className="size-4 text-[#8B5CF6]" />
              Conversas em Tempo Real
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 text-[#C084FC] text-[10px] font-bold font-mono">
              {conversationLeads.length} canais
            </span>
          </div>

          <div className="relative">
            <Search className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquisar por nome ou número..."
              className="w-full h-8 pl-8 pr-3 rounded-[8px] border border-[#252C38] bg-[#151A23] text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="flex items-center gap-2 mt-2.5">
            <button
              type="button"
              onClick={() => setFilterAiOnly(!filterAiOnly)}
              className={`px-2.5 py-1 rounded-[6px] text-[11px] font-semibold border transition-all ${
                filterAiOnly
                  ? "bg-[#8B5CF6]/20 border-[#8B5CF6]/50 text-[#C084FC]"
                  : "bg-[#151A23] border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              {filterAiOnly ? "✓ Apenas IA Ativa" : "Todas as Conversas"}
            </button>
          </div>
        </div>

        {/* List of Chats */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#252C38]/50">
          {conversationLeads.map((lead) => {
            const isSelected = lead.id === activeLead?.id;
            const lastMsg = lead.conversation[lead.conversation.length - 1];

            return (
              <div
                key={lead.id}
                onClick={() => onSelectLead(lead.id)}
                className={`p-3.5 cursor-pointer transition-all ${
                  isSelected
                    ? "bg-[#151A23] border-l-2 border-l-[#3B82F6]"
                    : "hover:bg-[#151A23]/50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-xs text-[#F5F7FA] truncate">{lead.name}</span>
                  <span className="text-[10px] text-[#667085] font-mono shrink-0">
                    {lastMsg ? lastMsg.timestamp : lead.lastActive}
                  </span>
                </div>

                <div className="text-[11px] text-[#A7B0BF] truncate mb-1.5">{lead.company}</div>

                <div className="text-[11px] text-[#667085] line-clamp-1 italic mb-2">
                  "{lastMsg ? lastMsg.text : "Sem mensagens ainda"}"
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      lead.aiProcessingStatus === "ativo"
                        ? "bg-[#8B5CF6]/15 text-[#8B5CF6] border border-[#8B5CF6]/30"
                        : "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30"
                    }`}
                  >
                    {lead.aiProcessingStatus === "ativo" ? (
                      <>
                        <Bot className="size-2.5" />
                        IA Ativa
                      </>
                    ) : (
                      <>
                        <UserCheck className="size-2.5" />
                        Humano
                      </>
                    )}
                  </span>

                  <span className="text-[10px] font-mono text-[#A7B0BF]">
                    {lead.packageInterest}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Chat Canvas */}
      {activeLead ? (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#080A0F]">
          {/* Top Bar of Active Conversation */}
          <div className="p-4 border-b border-[#252C38] bg-[#0E121A] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-[10px] bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6] font-bold text-sm">
                {activeLead.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#F5F7FA]">{activeLead.name}</h3>
                  <span className="text-xs text-[#A7B0BF]">• {activeLead.company}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[#667085] mt-0.5">
                  <span className="font-mono text-[#3B82F6]">{activeLead.phone}</span>
                  <span>Canal: WhatsApp Business</span>
                  <span className="text-[#22C55E] font-semibold">{activeLead.estimatedValue}</span>
                </div>
              </div>
            </div>

            {/* AI Mode Toggle & Takeover */}
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => onToggleAiStatus(activeLead.id)}
                className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  activeLead.aiProcessingStatus === "ativo"
                    ? "border-[#8B5CF6]/50 bg-[#8B5CF6]/15 text-[#C084FC] hover:bg-[#8B5CF6]/25"
                    : "border-[#F59E0B]/50 bg-[#F59E0B]/15 text-[#F59E0B] hover:bg-[#F59E0B]/25"
                }`}
              >
                {activeLead.aiProcessingStatus === "ativo" ? (
                  <>
                    <span className="size-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                    <span>IA Ativa (Assumir Humano)</span>
                  </>
                ) : (
                  <>
                    <UserCheck className="size-3.5" />
                    <span>Humano (Reativar IA)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleForceAiResponse}
                disabled={isTypingAi}
                className="px-3 py-1.5 rounded-[8px] bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB] flex items-center gap-1.5 transition-all"
              >
                <Sparkles className="size-3.5" />
                <span>Gerar Resposta IA</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeLead.conversation.map((msg) => {
              const isClient = msg.sender === "client";
              const isAi = msg.sender === "ai";

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isClient ? "items-start" : "items-end"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-[14px] p-4 text-xs shadow-sm ${
                      isClient
                        ? "bg-[#252C38] text-[#F5F7FA] rounded-tl-sm"
                        : isAi
                          ? "bg-[#8B5CF6]/10 border border-[#8B5CF6]/35 text-[#F5F7FA] rounded-tr-sm"
                          : "bg-[#3B82F6]/15 border border-[#3B82F6]/35 text-[#F5F7FA] rounded-tr-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 mb-1 text-[10px]">
                      <span className="font-semibold text-[#A7B0BF] flex items-center gap-1">
                        {isClient ? (
                          activeLead.name
                        ) : isAi ? (
                          <>
                            <Bot className="size-3 text-[#8B5CF6]" /> Agente Digital (IA)
                          </>
                        ) : (
                          <>
                            <UserCheck className="size-3 text-[#3B82F6]" /> Operador Humano
                          </>
                        )}
                      </span>
                      <span className="font-mono text-[#667085]">{msg.timestamp}</span>
                    </div>

                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* AI Metadata Toggle */}
                    {msg.aiMetadata && (
                      <div className="mt-2.5 pt-2 border-t border-[#8B5CF6]/20">
                        <button
                          type="button"
                          onClick={() => toggleJsonExpand(msg.id)}
                          className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#C084FC] hover:text-white transition-colors"
                        >
                          <Code2 className="size-3 text-[#8B5CF6]" />
                          <span>
                            {expandedJsonIds[msg.id]
                              ? "Ocultar Telemetria JSON"
                              : `Intenção: ${msg.aiMetadata.ai_intent.toUpperCase()} (${(
                                  msg.aiMetadata.ai_confidence * 100
                                ).toFixed(0)}%)`}
                          </span>
                          {expandedJsonIds[msg.id] ? (
                            <ChevronUp className="size-3" />
                          ) : (
                            <ChevronDown className="size-3" />
                          )}
                        </button>

                        {expandedJsonIds[msg.id] && (
                          <pre className="mt-1.5 p-2.5 rounded-[6px] bg-[#080A0F]/90 border border-[#252C38] text-[10px] font-mono text-[#60A5FA] overflow-x-auto">
                            {JSON.stringify(msg.aiMetadata, null, 2)}
                          </pre>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isTypingAi && (
              <div className="flex items-end justify-end">
                <div className="rounded-[12px] bg-[#8B5CF6]/15 border border-[#8B5CF6]/35 px-3 py-2 text-xs text-[#C084FC] flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#8B5CF6] animate-bounce" />
                  <span className="size-1.5 rounded-full bg-[#8B5CF6] animate-bounce [animation-delay:0.2s]" />
                  <span className="size-1.5 rounded-full bg-[#8B5CF6] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] ml-1">Agente Digital digitando resposta...</span>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Dual Input Area */}
          <div className="p-4 border-t border-[#252C38] bg-[#0E121A] space-y-2.5">
            {/* Operator response */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={replyInput}
                onChange={(e) => setReplyInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendOperatorReply();
                }}
                placeholder="Responder como Operador Humano no WhatsApp..."
                className="flex-1 h-9 rounded-[8px] border border-[#252C38] bg-[#151A23] px-3 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
              />
              <button
                type="button"
                onClick={handleSendOperatorReply}
                className="h-9 px-4 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Send className="size-3.5" />
                <span>Enviar</span>
              </button>
            </div>

            {/* Test Simulation: send client message to test bot */}
            <div className="pt-2 border-t border-[#252C38]/50 flex items-center gap-2">
              <span className="text-[10px] text-[#667085] shrink-0">Simular Cliente:</span>
              <input
                type="text"
                value={clientSimInput}
                onChange={(e) => setClientSimInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSimulateClientMessage();
                }}
                placeholder="Escreva uma mensagem como se fosse o cliente (ex: Gostaria de marcar reunião amanhã)..."
                className="flex-1 h-8 rounded-[8px] border border-[#252C38] bg-[#080A0F] px-2.5 text-[11px] text-[#A7B0BF] placeholder-[#667085] focus:outline-none focus:border-[#8B5CF6]"
              />
              <button
                type="button"
                onClick={handleSimulateClientMessage}
                className="h-8 px-3 rounded-[8px] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#C084FC] hover:bg-[#8B5CF6]/30 text-[11px] font-semibold transition-all"
              >
                Testar Entrada
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-[#667085]">
          <MessageSquareCode className="size-12 mb-3 text-[#252C38]" />
          <p className="text-sm font-semibold text-[#A7B0BF]">Nenhuma conversa ativa selecionada</p>
        </div>
      )}
    </div>
  );
}
