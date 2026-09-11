import { AlertTriangle, Clock, CheckCircle2, ChevronRight, X } from "lucide-react";
import { useState } from "react";

interface AttentionPanelProps {
  overdueCount: number;
  dueTodayCount: number;
  awaitingApprovalCount: number;
  activeQuickFilter: "overdue" | "today" | "approval" | null;
  onSelectQuickFilter: (filter: "overdue" | "today" | "approval" | null) => void;
}

export function AttentionPanel({
  overdueCount,
  dueTodayCount,
  awaitingApprovalCount,
  activeQuickFilter,
  onSelectQuickFilter,
}: AttentionPanelProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  // If no items require attention or user dismissed
  if (isDismissed || (overdueCount === 0 && dueTodayCount === 0 && awaitingApprovalCount === 0)) {
    return null;
  }

  const format2 = (n: number) => n.toString().padStart(2, "0");

  return (
    <aside
      aria-label="Tarefas que exigem atenção imediata"
      className="relative overflow-hidden rounded-[12px] border border-[#252C38] bg-[#0E121A] p-3 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all"
    >
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#EF4444] via-[#3B82F6] to-[#8B5CF6]" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#EF4444]/15 text-[#EF4444]">
            <AlertTriangle className="size-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#F5F7FA]">
                Atenção Operacional
              </span>
              <span className="rounded-full bg-[#EF4444]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#EF4444]">
                Requer Ação
              </span>
            </div>
            <p className="text-[12px] text-[#A7B0BF]">
              Itens críticos sincronizados com prazos e validações da equipa:
            </p>
          </div>
        </div>

        {/* Action chips for quick filtering */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Overdue */}
          {overdueCount > 0 && (
            <button
              type="button"
              onClick={() =>
                onSelectQuickFilter(activeQuickFilter === "overdue" ? null : "overdue")
              }
              className={`group inline-flex items-center gap-2 rounded-[8px] border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeQuickFilter === "overdue"
                  ? "border-[#EF4444] bg-[#EF4444]/20 text-[#F5F7FA] ring-1 ring-[#EF4444]"
                  : "border-[#EF4444]/40 bg-[#EF4444]/10 text-[#EF4444] hover:bg-[#EF4444]/20 hover:text-white"
              }`}
            >
              <span className="size-1.5 rounded-full bg-[#EF4444] animate-pulse" />
              <span>
                <strong className="font-mono">{format2(overdueCount)}</strong> tarefas atrasadas
              </span>
              <ChevronRight className="size-3 text-[#EF4444] transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Due Today */}
          {dueTodayCount > 0 && (
            <button
              type="button"
              onClick={() => onSelectQuickFilter(activeQuickFilter === "today" ? null : "today")}
              className={`group inline-flex items-center gap-2 rounded-[8px] border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeQuickFilter === "today"
                  ? "border-[#3B82F6] bg-[#3B82F6]/20 text-[#F5F7FA] ring-1 ring-[#3B82F6]"
                  : "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#3B82F6] hover:bg-[#3B82F6]/20 hover:text-white"
              }`}
            >
              <Clock className="size-3 text-[#3B82F6]" />
              <span>
                <strong className="font-mono">{format2(dueTodayCount)}</strong> vencem hoje
              </span>
              <ChevronRight className="size-3 text-[#3B82F6] transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Awaiting Approval */}
          {awaitingApprovalCount > 0 && (
            <button
              type="button"
              onClick={() =>
                onSelectQuickFilter(activeQuickFilter === "approval" ? null : "approval")
              }
              className={`group inline-flex items-center gap-2 rounded-[8px] border px-2.5 py-1.5 text-xs font-semibold transition-all ${
                activeQuickFilter === "approval"
                  ? "border-[#8B5CF6] bg-[#8B5CF6]/20 text-[#F5F7FA] ring-1 ring-[#8B5CF6]"
                  : "border-[#8B5CF6]/40 bg-[#8B5CF6]/10 text-[#8B5CF6] hover:bg-[#8B5CF6]/20 hover:text-white"
              }`}
            >
              <CheckCircle2 className="size-3 text-[#8B5CF6]" />
              <span>
                <strong className="font-mono">{format2(awaitingApprovalCount)}</strong> aguardam
                aprovação
              </span>
              <ChevronRight className="size-3 text-[#8B5CF6] transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Reset quick filter if active */}
          {activeQuickFilter && (
            <button
              type="button"
              onClick={() => onSelectQuickFilter(null)}
              className="text-[11px] font-medium text-[#A7B0BF] hover:text-white underline underline-offset-4 ml-1"
            >
              Ver todas
            </button>
          )}

          {/* Dismiss button */}
          <button
            type="button"
            aria-label="Ocultar painel de atenção"
            onClick={() => setIsDismissed(true)}
            className="ml-1 rounded-md p-1 text-[#667085] hover:bg-[#151A23] hover:text-[#A7B0BF] transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
