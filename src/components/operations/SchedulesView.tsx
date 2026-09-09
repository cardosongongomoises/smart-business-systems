import { useState, useMemo } from "react";
import {
  Calendar,
  Clock,
  Video,
  UserCheck,
  PlusCircle,
  CheckCircle2,
  ExternalLink,
  Copy,
  CalendarDays,
  Sparkles,
} from "lucide-react";
import { Lead } from "./types";
import { toast } from "sonner";

interface SchedulesViewProps {
  leads: Lead[];
  onSelectLead: (leadId: string) => void;
}

interface MeetingItem {
  id: string;
  leadId: string;
  leadName: string;
  company: string;
  phone: string;
  packageInterest: string;
  title: string;
  dateFormatted: string;
  timeFormatted: string;
  status: "confirmado" | "realizado" | "pendente";
  meetUrl: string;
}

export function SchedulesView({ leads, onSelectLead }: SchedulesViewProps) {
  const [filter, setFilter] = useState<"todos" | "confirmado" | "realizado">("todos");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Derive all meetings from leads
  const meetings: MeetingItem[] = useMemo(() => {
    const list: MeetingItem[] = [];
    leads.forEach((l) => {
      l.appointments.forEach((apt) => {
        list.push({
          id: apt.id,
          leadId: l.id,
          leadName: l.name,
          company: l.company,
          phone: l.phone,
          packageInterest: l.packageInterest,
          title: apt.title,
          dateFormatted: apt.dateFormatted,
          timeFormatted: apt.timeFormatted,
          status: apt.status === "confirmado" ? "confirmado" : "realizado",
          meetUrl: apt.meetUrl || "https://meet.google.com/agd-oper-dxq",
        });
      });
    });

    // Default mock meetings if none yet
    if (list.length === 0) {
      list.push(
        {
          id: "m-1",
          leadId: leads[0]?.id || "lead-1",
          leadName: "Dr. Sebastião Luvumbo",
          company: "Luvumbo Advocacia Corporativa",
          phone: "+244 923 881 204",
          packageInterest: "Autoridade",
          title: "Diagnóstico Digital & Alinhamento de Escopo",
          dateFormatted: "Hoje, 09 de Março",
          timeFormatted: "15:00 WAT (Luanda)",
          status: "confirmado",
          meetUrl: "https://meet.google.com/agd-diag-corp",
        },
        {
          id: "m-2",
          leadId: leads[1]?.id || "lead-2",
          leadName: "Dra. Jandira Kuanza",
          company: "Clínica Vida Talatona",
          phone: "+244 912 400 918",
          packageInterest: "Domínio IA",
          title: "Demonstração de Agente IA WhatsApp",
          dateFormatted: "Amanhã, 10 de Março",
          timeFormatted: "11:30 WAT (Luanda)",
          status: "confirmado",
          meetUrl: "https://meet.google.com/agd-clinica-ai",
        },
        {
          id: "m-3",
          leadId: leads[2]?.id || "lead-3",
          leadName: "Eng. Arnaldo Gaspar",
          company: "Gaspar Logística Luanda",
          phone: "+244 934 112 390",
          packageInterest: "Profissional",
          title: "Apresentação da Proposta Comercial",
          dateFormatted: "12 de Março de 2026",
          timeFormatted: "16:00 WAT (Luanda)",
          status: "confirmado",
          meetUrl: "https://meet.google.com/agd-gaspar-prop",
        },
      );
    }

    return list;
  }, [leads]);

  const filteredMeetings = useMemo(() => {
    if (filter === "todos") return meetings;
    return meetings.filter((m) => m.status === filter);
  }, [meetings, filter]);

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link do Google Meet copiado para a área de transferência");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#080A0F]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <h1 className="text-xl font-bold text-[#F5F7FA] flex items-center gap-2">
            <Calendar className="size-5 text-[#F59E0B]" />
            <span>Agendamentos & Diagnósticos por Vídeo</span>
          </h1>
          <p className="text-xs text-[#A7B0BF] mt-1">
            Reuniões marcadas automaticamente pelo Agente Digital ou pela equipa comercial
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            toast.info("Para marcar reunião, selecione um lead e use a aba Agendamentos.");
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <PlusCircle className="size-4" />
          <span>Novo Agendamento</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <span className="text-xs text-[#667085]">Reuniões Confirmadas</span>
          <p className="text-2xl font-bold text-[#F5F7FA] mt-2 font-mono">
            {meetings.filter((m) => m.status === "confirmado").length}
          </p>
          <p className="text-[11px] text-[#22C55E] mt-1 font-medium">Link Meet gerado e enviado</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <span className="text-xs text-[#667085]">Próxima Reunião</span>
          <p className="text-sm font-bold text-[#F59E0B] mt-2 truncate">
            {meetings[0]?.company || "Nenhuma hoje"}
          </p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">{meetings[0]?.timeFormatted || "--"}</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <span className="text-xs text-[#667085]">Taxa de Comparência</span>
          <p className="text-2xl font-bold text-[#22C55E] mt-2 font-mono">92.4%</p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Lembrete WhatsApp 1h antes</p>
        </div>

        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
          <span className="text-xs text-[#667085]">Conversão em Venda</span>
          <p className="text-2xl font-bold text-[#8B5CF6] mt-2 font-mono">48.2%</p>
          <p className="text-[11px] text-[#A7B0BF] mt-1">Pós-reunião de diagnóstico</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(
          [
            { id: "todos", label: "Todas as Reuniões" },
            { id: "confirmado", label: "Próximas Confirmadas" },
            { id: "realizado", label: "Já Realizadas" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            className={`px-3 py-1.5 rounded-[8px] text-xs font-semibold border transition-all ${
              filter === tab.id
                ? "bg-[#F59E0B]/15 border-[#F59E0B] text-[#F59E0B]"
                : "bg-[#151A23] border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Meetings Timeline Cards */}
      <div className="space-y-3.5">
        {filteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#3B82F6]/50 transition-all"
          >
            <div className="flex items-start gap-3.5">
              <div className="size-11 rounded-[12px] bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex flex-col items-center justify-center text-[#F59E0B] shrink-0 font-mono">
                <CalendarDays className="size-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#F5F7FA]">{meeting.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      meeting.status === "confirmado"
                        ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                        : "bg-[#667085]/20 text-[#A7B0BF]"
                    }`}
                  >
                    {meeting.status}
                  </span>
                </div>

                <p className="text-xs text-[#A7B0BF] mt-1">
                  <strong className="text-white">{meeting.leadName}</strong> • {meeting.company} (
                  <span className="text-[#3B82F6]">{meeting.packageInterest}</span>)
                </p>

                <div className="flex items-center gap-3 text-xs text-[#667085] mt-2 font-mono">
                  <span className="flex items-center gap-1 text-[#F5F7FA]">
                    <Clock className="size-3.5 text-[#F59E0B]" />
                    {meeting.dateFormatted} às {meeting.timeFormatted}
                  </span>
                  <span>•</span>
                  <span>{meeting.phone}</span>
                </div>
              </div>
            </div>

            {/* Meet Link & Action Buttons */}
            <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => handleCopyLink(meeting.meetUrl)}
                className="px-3 py-2 rounded-[8px] bg-[#0E121A] border border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA] text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <Copy className="size-3.5" />
                <span>Copiar Link</span>
              </button>

              <a
                href={meeting.meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Video className="size-3.5" />
                <span>Entrar no Google Meet</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
