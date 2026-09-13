import { useState, useEffect } from "react";
import {
  Phone,
  PhoneOff,
  Mail,
  Building2,
  Calendar,
  MessageSquare,
  Bot,
  UserCheck,
  Send,
  ExternalLink,
  Edit3,
  Clock,
  Sparkles,
  ArrowUpRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  PlusCircle,
  FileText,
  Video,
  Code2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Loader2,
  Check,
  X,
  Info,
} from "lucide-react";
import { Lead, LeadStatus, ChatMessage, LeadNote } from "./types";
import { generateAIAgentResponse } from "./aiAgentEngine";
import {
  verifyWhatsAppNumber,
  verifyWhatsAppNumberAsync,
  WhatsAppVerificationResult,
} from "./whatsappVerification";
import { toast } from "sonner";

interface LeadDetailPanelProps {
  lead: Lead | null;
  onUpdateStatus: (leadId: string, newStatus: LeadStatus) => void;
  onAddMessage: (leadId: string, message: ChatMessage) => void;
  onAddNote: (leadId: string, noteText: string) => void;
  onToggleAiStatus: (leadId: string) => void;
  onUpdateWhatsAppStatus?: (leadId: string, hasWhatsApp: boolean) => void;
  onBackToList?: () => void;
}

type DetailTab = "overview" | "chat" | "schedules" | "notes" | "activity";

export function LeadDetailPanel({
  lead,
  onUpdateStatus,
  onAddMessage,
  onAddNote,
  onToggleAiStatus,
  onUpdateWhatsAppStatus,
  onBackToList,
}: LeadDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [newNoteInput, setNewNoteInput] = useState("");
  const [customReplyInput, setCustomReplyInput] = useState("");
  const [isTypingAi, setIsTypingAi] = useState(false);
  const [expandedJsonIds, setExpandedJsonIds] = useState<Record<string, boolean>>({});

  // WhatsApp Verification & AI Qualification Automatic State
  const [verification, setVerification] = useState<WhatsAppVerificationResult>(() =>
    lead ? verifyWhatsAppNumber(lead.phone, lead.hasWhatsApp) : verifyWhatsAppNumber(""),
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [isQualifying, setIsQualifying] = useState(false);

  // Execução AUTOMÁTICA de verificação e qualificação quando o lead é selecionado ou alterado
  useEffect(() => {
    if (!lead) return;

    setIsVerifying(true);

    const needsQual = !lead.aiQualified;
    if (needsQual) {
      setIsQualifying(true);
    }

    const timer = setTimeout(() => {
      // 1. Verificação automática do WhatsApp
      const autoResult = verifyWhatsAppNumber(lead.phone, lead.hasWhatsApp);
      setVerification(autoResult);
      setIsVerifying(false);

      // Notifica se houver handler e não estiver definido
      if (onUpdateWhatsAppStatus && lead.hasWhatsApp === undefined) {
        onUpdateWhatsAppStatus(lead.id, autoResult.isRegistered);
      }

      // 2. Qualificação automática da IA
      if (needsQual) {
        setIsQualifying(false);
        if (onUpdateStatus && lead.status === "novo") {
          onUpdateStatus(lead.id, "qualificado");
        }
      }
    }, 420);

    return () => clearTimeout(timer);
  }, [lead?.id, lead?.phone, lead?.hasWhatsApp]);

  // Escuta alterações globais de verificação no cache
  useEffect(() => {
    const handleStorageChange = () => {
      if (lead) {
        setVerification(verifyWhatsAppNumber(lead.phone, lead.hasWhatsApp));
      }
    };
    window.addEventListener("sbs_whatsapp_status_changed", handleStorageChange);
    return () => {
      window.removeEventListener("sbs_whatsapp_status_changed", handleStorageChange);
    };
  }, [lead]);

  const handleRunVerification = async () => {
    if (!lead?.phone) return;
    setIsVerifying(true);
    try {
      const res = await verifyWhatsAppNumberAsync(lead.phone);
      setVerification(res);
      if (onUpdateWhatsAppStatus) {
        onUpdateWhatsAppStatus(lead.id, res.isRegistered);
      }
      if (res.isRegistered) {
        toast.success(`✓ WhatsApp Ativo (${res.carrier})`, {
          description: `O número ${res.formattedNumber} está cadastrado no WhatsApp.`,
        });
      } else {
        toast.error(`✕ Sem WhatsApp (${res.carrier})`, {
          description: `${res.reason}`,
        });
      }
    } catch {
      toast.error("Erro ao verificar número no WhatsApp.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleRunAiQualification = () => {
    if (!lead) return;
    setIsQualifying(true);
    setTimeout(() => {
      setIsQualifying(false);
      if (onUpdateStatus && lead.status === "novo") {
        onUpdateStatus(lead.id, "qualificado");
      }
      toast.success("Qualificação por IA concluída", {
        description: `Lead qualificado com Score ${lead.qualificationScore || 94}/100 para ${lead.company}.`,
      });
    }, 600);
  };

  const toggleJsonExpand = (messageId: string) => {
    setExpandedJsonIds((prev) => ({ ...prev, [messageId]: !prev[messageId] }));
  };

  if (!lead) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-[#667085] bg-[#080A0F]">
        <Bot className="size-12 mb-3 text-[#252C38]" />
        <p className="text-sm font-semibold text-[#A7B0BF]">Nenhum lead selecionado</p>
        <p className="text-xs text-[#667085]">
          Selecione um lead da lista lateral para visualizar a telemetria completa.
        </p>
      </div>
    );
  }

  const handleSendReply = (sender: "ai" | "human") => {
    if (!customReplyInput.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      text: customReplyInput.trim(),
      timestamp: new Date().toLocaleTimeString("pt-PT", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    onAddMessage(lead.id, newMessage);
    setCustomReplyInput("");
  };

  const handleSimulateAiResponse = () => {
    setIsTypingAi(true);

    const clientMessages = lead.conversation.filter((m) => m.sender === "client");
    const lastClientMessage = clientMessages[clientMessages.length - 1];
    const incomingText =
      lastClientMessage?.text || "Boa tarde, gostaria de saber mais sobre o serviço.";

    setTimeout(() => {
      setIsTypingAi(false);

      const { replyText, metadata } = generateAIAgentResponse(
        incomingText,
        lead.conversation,
        lead,
      );

      // Rule 7 Escalation Handling
      if (metadata.escalate_to_human) {
        toast.error("Regra 7 do System Prompt: Escalonamento para Humano", {
          description:
            "Pedido de desconto, insatisfação ou solicitação direta de atendente humano acionada.",
        });
        if (lead.aiProcessingStatus === "ativo") {
          onToggleAiStatus(lead.id);
        }
      } else if (metadata.lead_update.status && metadata.lead_update.status !== lead.status) {
        onUpdateStatus(lead.id, metadata.lead_update.status);
      }

      const aiReply: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: "ai",
        text: replyText,
        timestamp: new Date().toLocaleTimeString("pt-PT", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        aiMetadata: metadata,
      };

      onAddMessage(lead.id, aiReply);
    }, 700);
  };

  const handleSaveNote = () => {
    if (!newNoteInput.trim()) return;
    onAddNote(lead.id, newNoteInput.trim());
    setNewNoteInput("");
  };

  const initials = lead.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const statusOptions: Array<{ id: LeadStatus; label: string; color: string }> = [
    { id: "novo", label: "Novo", color: "text-[#3B82F6]" },
    { id: "qualificado", label: "Qualificado", color: "text-[#8B5CF6]" },
    { id: "agendado", label: "Agendado", color: "text-[#F59E0B]" },
    { id: "convertido", label: "Convertido", color: "text-[#22C55E]" },
    { id: "perdido", label: "Perdido", color: "text-[#EF4444]" },
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080A0F] overflow-y-auto">
      {/* Top Header */}
      <div className="p-4 sm:p-6 border-b border-[#252C38] bg-[#0E121A]/80 flex flex-col gap-3 sm:gap-4">
        {/* Mobile Back to List Button */}
        {onBackToList && (
          <button
            type="button"
            onClick={onBackToList}
            className="lg:hidden inline-flex items-center gap-1.5 text-xs font-semibold text-[#A7B0BF] hover:text-[#3B82F6] transition-colors py-1 cursor-pointer w-fit"
          >
            <ArrowLeft className="size-4" />
            <span>Voltar à lista de leads</span>
          </button>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="size-11 sm:size-13 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-xs sm:text-sm font-bold text-[#3B82F6] shadow-sm shrink-0">
              {initials}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold text-[#F5F7FA] tracking-tight">
                  {lead.name}
                </h2>
                {lead.aiQualified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 text-[#C084FC] border border-[#8B5CF6]/30">
                    <Sparkles className="size-3 text-[#8B5CF6]" />
                    Score {lead.qualificationScore}/100 • Qualificado por IA
                  </span>
                ) : isQualifying ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#3B82F6]/15 text-[#60A5FA] border border-[#3B82F6]/30 animate-pulse">
                    <Loader2 className="size-3 animate-spin text-[#3B82F6]" />A qualificar por IA...
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-[#A7B0BF] mt-0.5">
                {lead.role} • {lead.company}
              </p>
            </div>
          </div>

          {/* Status Changer & Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select
                value={lead.status}
                onChange={(e) => onUpdateStatus(lead.id, e.target.value as LeadStatus)}
                className="h-9 px-3 text-xs font-semibold rounded-[8px] bg-[#151A23] border border-[#252C38] text-[#F5F7FA] cursor-pointer focus:outline-none focus:border-[#3B82F6] transition-colors uppercase tracking-wider"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    Status: {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão A qualificar por IA... */}
            {isQualifying ? (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1.5 h-9 rounded-[8px] border border-[#8B5CF6]/70 bg-[#0E121A] px-3.5 text-xs font-semibold text-[#C084FC] animate-pulse cursor-wait select-none"
              >
                <Loader2 className="size-3.5 animate-spin text-[#8B5CF6]" />
                <span>A qualificar por IA...</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRunAiQualification}
                className="inline-flex items-center gap-1.5 h-9 rounded-[8px] border border-[#8B5CF6]/40 bg-[#0E121A] hover:bg-[#8B5CF6]/10 px-3.5 text-xs font-semibold text-[#C084FC] hover:text-[#D8B4FE] transition-all shadow-sm active:scale-95"
                title="Executar qualificação automática por IA"
              >
                <Sparkles className="size-3.5 text-[#8B5CF6]" />
                <span>A qualificar por IA...</span>
              </button>
            )}

            {/* Veredito Final de WhatsApp ou Botão A verificar... */}
            {isVerifying ? (
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1.5 h-9 rounded-[8px] border border-[#3B82F6]/70 bg-[#0E121A] px-3.5 text-xs font-semibold text-[#60A5FA] animate-pulse cursor-wait select-none"
              >
                <Loader2 className="size-3.5 animate-spin text-[#3B82F6]" />
                <span>A verificar...</span>
              </button>
            ) : verification.isRegistered && verification.waLink ? (
              /* Conforme FOTO 2 em anexo: Botão verde com borda e texto WhatsApp */
              <a
                href={verification.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 h-9 rounded-[8px] border border-[#22C55E] bg-[#0E121A] hover:bg-[#22C55E]/10 px-3.5 text-xs font-semibold text-[#22C55E] transition-all shadow-sm active:scale-95"
                title={`Veredito: Cadastrado no WhatsApp (${verification.carrier})`}
              >
                <Phone className="size-3.5 text-[#22C55E]" />
                <span>WhatsApp</span>
              </a>
            ) : (
              /* Conforme FOTO 1 em anexo: Botão vermelho com borda e texto Sem WhatsApp */
              <button
                type="button"
                onClick={handleRunVerification}
                className="inline-flex items-center gap-1.5 h-9 rounded-[8px] border border-[#EF4444] bg-[#0E121A] hover:bg-[#EF4444]/10 px-3.5 text-xs font-semibold text-[#EF4444] transition-all shadow-sm active:scale-95"
                title={`Veredito: Sem WhatsApp (${verification.reason}). Clique para verificar novamente.`}
              >
                <PhoneOff className="size-3.5 text-[#EF4444]" />
                <span>Sem WhatsApp</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Contact & Metadata Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-[#252C38]/60 text-xs">
          <div className="flex items-center gap-2 text-[#A7B0BF] truncate">
            {verification.isRegistered ? (
              <Phone className="size-3.5 text-[#22C55E] shrink-0" />
            ) : (
              <PhoneOff className="size-3.5 text-[#EF4444] shrink-0" />
            )}
            <span className="text-[#F5F7FA] font-mono truncate">{lead.phone}</span>
            {verification.isRegistered ? (
              <span className="text-[10px] text-[#22C55E] font-medium shrink-0">• WA</span>
            ) : (
              <span className="text-[10px] text-[#EF4444] font-medium shrink-0">• Sem WA</span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[#A7B0BF] truncate">
            <Mail className="size-3.5 text-[#667085]" />
            <span className="text-[#F5F7FA] truncate">{lead.email}</span>
          </div>

          <div className="flex items-center gap-2 text-[#A7B0BF]">
            <Building2 className="size-3.5 text-[#667085]" />
            <span className="text-[#F5F7FA] font-semibold">{lead.packageInterest}</span>
          </div>

          <div className="flex items-center gap-2 text-[#A7B0BF]">
            <Clock className="size-3.5 text-[#667085]" />
            <span>
              Valor Est.: <strong className="text-[#22C55E]">{lead.estimatedValue}</strong>
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#252C38] -mb-6 pt-1">
          {[
            { id: "overview" as DetailTab, label: "Overview" },
            {
              id: "chat" as DetailTab,
              label: "Conversa IA",
              badge: lead.conversation.length,
            },
            {
              id: "schedules" as DetailTab,
              label: "Agendamentos",
              badge: lead.appointments.length || undefined,
            },
            { id: "notes" as DetailTab, label: "Notas" },
            { id: "activity" as DetailTab, label: "Atividade" },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 pb-3 text-xs font-semibold tracking-wide transition-colors border-b-2 px-1 ${
                  isActive
                    ? "text-[#3B82F6] border-[#3B82F6]"
                    : "text-[#A7B0BF] border-transparent hover:text-[#F5F7FA]"
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="size-4.5 px-1 rounded-full text-[10px] font-bold bg-[#151A23] border border-[#252C38] text-[#8B5CF6]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="p-6 space-y-6">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Sobre o Lead */}
            <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
              <h3 className="text-sm font-bold text-[#F5F7FA] pb-3 border-b border-[#252C38] flex items-center justify-between">
                <span>Sobre o Lead</span>
                <span className="text-[10px] text-[#667085] font-mono">ID: {lead.id}</span>
              </h3>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[#667085] block mb-1">Nome Completo</span>
                  <p className="font-semibold text-[#F5F7FA]">{lead.name}</p>
                </div>

                <div>
                  <span className="text-[#667085] block mb-1">Empresa & Cargo</span>
                  <p className="font-semibold text-[#F5F7FA]">
                    {lead.company} ({lead.role})
                  </p>
                </div>

                <div>
                  <span className="text-[#667085] block mb-1">
                    {verification.isRegistered ? "Telefone WhatsApp" : "Telefone (Sem WhatsApp)"}
                  </span>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-[#F5F7FA] font-mono">{lead.phone}</p>
                    {verification.isRegistered ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/25 px-1.5 py-0.5 rounded-[4px]">
                        <CheckCircle2 className="size-3" /> WhatsApp Ativo ({verification.carrier})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/25 px-1.5 py-0.5 rounded-[4px]">
                        <PhoneOff className="size-3" /> Sem WhatsApp ({verification.carrier})
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <span className="text-[#667085] block mb-1">E-mail Corporativo</span>
                  <p className="font-semibold text-[#F5F7FA]">{lead.email}</p>
                </div>

                <div>
                  <span className="text-[#667085] block mb-1">Canal de Origem</span>
                  <p className="font-semibold text-[#3B82F6] uppercase tracking-wider">
                    {lead.channel}
                  </p>
                </div>

                <div>
                  <span className="text-[#667085] block mb-1">Primeiro Contacto</span>
                  <p className="font-semibold text-[#F5F7FA]">{lead.firstContactAt}</p>
                </div>
              </div>

              {/* Pacote de Interesse Tags */}
              <div className="mt-5 pt-4 border-t border-[#252C38]">
                <span className="text-xs text-[#667085] block mb-2">Pacote de Interesse</span>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { name: "Presença", price: "Kz 125.000" },
                      { name: "Profissional", price: "Kz 250.000 ⭐" },
                      { name: "Autoridade", price: "Kz 450.000" },
                      { name: "Domínio IA", price: "Kz 700.000" },
                    ] as const
                  ).map((pkg) => {
                    const isSelected = lead.packageInterest === pkg.name;
                    return (
                      <span
                        key={pkg.name}
                        className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/50 shadow-sm"
                            : "bg-[#0E121A] text-[#667085] border border-[#252C38]"
                        }`}
                      >
                        <span>{pkg.name}</span>
                        <span className="text-[10px] font-mono opacity-80">({pkg.price})</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Conversa com Agente IA (Preview) */}
            <div className="rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-5 shadow-[0_0_30px_-8px_rgba(139,92,246,0.25)]">
              <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-[6px] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                    <Bot className="size-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
                      Conversa com Agente IA
                    </h4>
                    <p className="text-[10px] text-[#A7B0BF]">
                      Resumo da sessão interativa via WhatsApp API
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab("chat")}
                  className="text-xs font-semibold text-[#8B5CF6] hover:text-[#C084FC] flex items-center gap-1"
                >
                  <span>Abrir Chat Completo</span>
                  <ArrowUpRight className="size-3.5" />
                </button>
              </div>

              {/* Chat snippet */}
              <div className="mt-4 space-y-3">
                {lead.conversation.slice(-3).map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === "client" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-[12px] p-3 text-xs ${
                        msg.sender === "client"
                          ? "bg-[#252C38] text-[#F5F7FA]"
                          : "bg-[#3B82F6]/10 border border-[#3B82F6]/25 text-[#F5F7FA]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1 text-[10px] text-[#A7B0BF]">
                        <span className="font-semibold">
                          {msg.sender === "client" ? lead.name : "Agente IA (Agentes Digital)"}
                        </span>
                        <span className="font-mono">{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agendamentos Snippet */}
            {lead.appointments.length > 0 && lead.appointments[0] && (
              <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
                <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
                  <h4 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="size-4 text-[#3B82F6]" />
                    Próximo Agendamento
                  </h4>
                  <span className="text-xs font-mono text-[#22C55E] font-semibold">
                    {lead.appointments[0]?.status}
                  </span>
                </div>

                <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[10px] border border-[#252C38] bg-[#0E121A] p-3.5">
                  <div>
                    <p className="text-xs font-bold text-[#F5F7FA]">
                      {lead.appointments[0]?.title}
                    </p>
                    <p className="text-[11px] text-[#A7B0BF] mt-0.5">
                      {lead.appointments[0]?.dateFormatted} • {lead.appointments[0]?.timeFormatted}
                    </p>
                  </div>

                  {lead.appointments[0]?.meetUrl && (
                    <a
                      href={lead.appointments[0].meetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB] transition-colors"
                    >
                      <Video className="size-3.5" />
                      <span>Abrir Google Meet</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHAT TAB (Full AI Agent Conversation) */}
        {activeTab === "chat" && (
          <div className="rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-5 shadow-[0_0_30px_-8px_rgba(139,92,246,0.25)] flex flex-col min-h-[500px]">
            {/* Telemetry Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#252C38]">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-[8px] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                  <Bot className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
                    Conversa Ativa com Agente IA
                  </h3>
                  <p className="text-[10px] text-[#A7B0BF]">
                    Canal: WhatsApp Business API • Latência média 42ms
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onToggleAiStatus(lead.id)}
                  className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold border transition-all ${
                    lead.aiProcessingStatus === "ativo"
                      ? "border-[#3B82F6]/50 bg-[#3B82F6]/15 text-[#60A5FA]"
                      : "border-[#F59E0B]/50 bg-[#F59E0B]/15 text-[#F59E0B]"
                  }`}
                >
                  {lead.aiProcessingStatus === "ativo" ? (
                    <span className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-[#3B82F6] animate-pulse" />◌
                      PROCESSANDO (IA)
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="size-3.5" />↗ ATENDENTE HUMANO
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 py-4 space-y-3 overflow-y-auto">
              {lead.conversation.map((msg) => {
                const isClient = msg.sender === "client";
                const isAI = msg.sender === "ai";

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isClient ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-[14px] p-3.5 text-xs shadow-sm transition-all duration-200 ${
                        isClient
                          ? "bg-[#252C38] text-[#F5F7FA] rounded-tl-sm"
                          : isAI
                            ? "bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#F5F7FA] rounded-tr-sm"
                            : "bg-[#8B5CF6]/15 border border-[#8B5CF6]/35 text-[#F5F7FA] rounded-tr-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-1 text-[10px]">
                        <span className="font-semibold text-[#A7B0BF] flex items-center gap-1">
                          {isClient ? (
                            lead.name
                          ) : isAI ? (
                            <>
                              <Bot className="size-3 text-[#3B82F6]" /> Agente IA
                            </>
                          ) : (
                            <>
                              <UserCheck className="size-3 text-[#8B5CF6]" /> Atendente Humano
                            </>
                          )}
                        </span>
                        <span className="font-mono text-[#667085]">{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                      {/* AI Structured Telemetry Toggle */}
                      {msg.aiMetadata && (
                        <div className="mt-2.5 pt-2 border-t border-[#3B82F6]/20">
                          <button
                            type="button"
                            onClick={() => toggleJsonExpand(msg.id)}
                            className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#93C5FD] hover:text-white transition-colors"
                          >
                            <Code2 className="size-3 text-[#3B82F6]" />
                            <span>
                              {expandedJsonIds[msg.id]
                                ? "Ocultar Payload JSON"
                                : "Inspecionar Payload JSON (Backend)"}
                            </span>
                            {expandedJsonIds[msg.id] ? (
                              <ChevronUp className="size-3" />
                            ) : (
                              <ChevronDown className="size-3" />
                            )}
                          </button>

                          {expandedJsonIds[msg.id] && (
                            <pre className="mt-1.5 p-2 rounded-[6px] bg-[#080A0F]/90 border border-[#252C38] text-[10px] font-mono text-[#60A5FA] overflow-x-auto">
                              {JSON.stringify(msg.aiMetadata, null, 2)}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Typing indicator */}
              {isTypingAi && (
                <div className="flex items-end justify-end">
                  <div className="rounded-[12px] bg-[#3B82F6]/15 border border-[#3B82F6]/30 px-3 py-2 text-xs text-[#93C5FD] flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-[#3B82F6] animate-bounce" />
                    <span className="size-1.5 rounded-full bg-[#3B82F6] animate-bounce [animation-delay:0.2s]" />
                    <span className="size-1.5 rounded-full bg-[#3B82F6] animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] ml-1">IA digitando resposta...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input & Quick AI Controls */}
            <div className="pt-3 border-t border-[#252C38] flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleSimulateAiResponse}
                  disabled={isTypingAi}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8B5CF6] hover:text-[#C084FC] transition-colors"
                >
                  <Sparkles className="size-3 text-[#8B5CF6]" />
                  <span>Gerar Resposta do Agente IA</span>
                </button>

                <span className="text-[10px] text-[#667085]">
                  Pressione Enviar para responder como Operador
                </span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customReplyInput}
                  onChange={(e) => setCustomReplyInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendReply("human");
                  }}
                  placeholder="Escreva uma mensagem como Operador Humano..."
                  className="flex-1 h-10 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3.5 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
                />

                <button
                  type="button"
                  onClick={() => handleSendReply("human")}
                  className="h-10 px-4 rounded-[8px] bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB] flex items-center gap-1.5 transition-colors"
                >
                  <Send className="size-3.5" />
                  <span>Enviar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SCHEDULES TAB */}
        {activeTab === "schedules" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
              <h3 className="text-sm font-bold text-[#F5F7FA]">
                Agendamentos ({lead.appointments.length})
              </h3>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB] transition-colors"
              >
                <PlusCircle className="size-3.5" />
                <span>Marcar Reunião</span>
              </button>
            </div>

            {lead.appointments.length === 0 ? (
              <div className="p-8 text-center rounded-[16px] border border-[#252C38] bg-[#151A23] text-[#667085]">
                <Calendar className="size-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Nenhuma reunião agendada no momento.</p>
              </div>
            ) : (
              lead.appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold tracking-wider text-[#8B5CF6] uppercase">
                        {apt.type}
                      </span>
                      <h4 className="text-sm font-bold text-[#F5F7FA] mt-0.5">{apt.title}</h4>
                      <p className="text-xs text-[#A7B0BF] mt-1 flex items-center gap-2">
                        <span>📅 {apt.dateFormatted}</span>
                        <span>⏰ {apt.timeFormatted}</span>
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">
                      {apt.status}
                    </span>
                  </div>

                  {apt.meetUrl && (
                    <div className="mt-4 pt-3 border-t border-[#252C38] flex items-center justify-between">
                      <span className="text-xs text-[#667085] font-mono">
                        Google Meet Link Ativo
                      </span>
                      <a
                        href={apt.meetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#3B82F6] hover:underline"
                      >
                        Entrar na Sala <ExternalLink className="size-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === "notes" && (
          <div className="space-y-4">
            <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
              <h3 className="text-sm font-bold text-[#F5F7FA] mb-3">Nova Nota Comercial</h3>

              <textarea
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                placeholder="Insira detalhes sobre a proposta, dores do cliente ou alinhamentos internos..."
                rows={3}
                className="w-full rounded-[8px] border border-[#252C38] bg-[#080A0F] p-3 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
              />

              <div className="mt-2.5 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveNote}
                  className="px-4 py-1.5 rounded-[8px] bg-[#3B82F6] text-white text-xs font-semibold hover:bg-[#2563EB] transition-colors"
                >
                  Salvar Nota
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="space-y-3">
              {lead.notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-[12px] border border-[#252C38] bg-[#151A23] p-4 text-xs"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-[#252C38]/60 mb-2">
                    <span className="font-semibold text-[#F5F7FA]">{note.author}</span>
                    <span className="text-[10px] text-[#667085]">{note.createdAt}</span>
                  </div>
                  <p className="text-[#A7B0BF] leading-relaxed">{note.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ACTIVITY TIMELINE TAB */}
        {activeTab === "activity" && (
          <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
            <h3 className="text-sm font-bold text-[#F5F7FA] pb-3 border-b border-[#252C38]">
              Atividade Recente & Auditoria
            </h3>

            <div className="mt-4 relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#252C38]">
              {lead.activities.map((act) => (
                <div key={act.id} className="relative group">
                  <span className="absolute -left-6 top-0.5 size-3 rounded-full bg-[#3B82F6] ring-4 ring-[#151A23]" />
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-bold text-[#F5F7FA]">{act.title}</p>
                      <span className="text-[10px] text-[#667085] font-mono">{act.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#A7B0BF] mt-0.5">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
