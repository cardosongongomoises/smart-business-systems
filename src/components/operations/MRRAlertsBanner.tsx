import { useState } from "react";
import {
  AlertTriangle,
  TrendingDown,
  ShieldAlert,
  ArrowDownRight,
  RotateCcw,
  CheckCircle2,
  X,
  Phone,
  BookOpen,
  Sparkles,
  ChevronRight,
  Flame,
} from "lucide-react";
import { useMRRMonitoring, MRRAlert } from "./mrrMonitoringStore";
import { formatKz } from "./financialUtils";
import { toast } from "sonner";

interface MRRAlertsBannerProps {
  onNavigateToClients?: () => void;
  compact?: boolean;
}

export function MRRAlertsBanner({ onNavigateToClients, compact = false }: MRRAlertsBannerProps) {
  const {
    alerts,
    totalMrrImpact,
    hasActiveAlerts,
    resolveAlertAndRestoreClient,
    dismissAlert,
    triggerSimulatedDowngradeAlert,
    triggerSimulatedChurnAlert,
  } = useMRRMonitoring();

  const [selectedAlertForPlaybook, setSelectedAlertForPlaybook] = useState<MRRAlert | null>(null);

  if (!hasActiveAlerts) {
    // When no alerts are active, show a subtle monitoring health badge with quick simulation trigger
    if (compact) return null;

    return (
      <div
        id="mrr-monitor-status"
        className="rounded-[12px] border border-[#22C55E]/25 bg-[#22C55E]/5 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center">
            <span className="size-2.5 rounded-full bg-[#22C55E] animate-pulse" />
            <span className="absolute size-4 rounded-full bg-[#22C55E]/30 animate-ping" />
          </div>
          <div>
            <span className="font-semibold text-[#22C55E] flex items-center gap-1.5">
              <CheckCircle2 className="size-3.5" />
              Monitor de MRR & Retenção Ativo
            </span>
            <span className="text-[11px] text-[#A7B0BF] block sm:inline sm:ml-1">
              • Nenhuma perda de receita ou downgrade detectado no ciclo atual (100% de retenção)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            type="button"
            onClick={() => {
              triggerSimulatedDowngradeAlert();
              toast.warning("🚨 Alerta de Downgrade Simulado Disparado!", {
                description:
                  "Dr. Sebastião Luvumbo migrou de Autoridade para Presença (-Kz 65.000/mês).",
              });
            }}
            className="px-2.5 py-1 rounded-[6px] bg-[#0E121A] hover:bg-[#F59E0B]/15 border border-[#252C38] hover:border-[#F59E0B]/50 text-[#F59E0B] text-[11px] font-medium transition-all inline-flex items-center gap-1"
          >
            <ArrowDownRight className="size-3" />
            <span>Testar Alerta Downgrade</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerSimulatedChurnAlert();
              toast.error("🚨 Alerta Crítico de Churn Simulado Disparado!", {
                description:
                  "Clínica Vida Talatona cancelou contrato Domínio IA (-Kz 150.000/mês).",
              });
            }}
            className="px-2.5 py-1 rounded-[6px] bg-[#0E121A] hover:bg-[#EF4444]/15 border border-[#252C38] hover:border-[#EF4444]/50 text-[#EF4444] text-[11px] font-medium transition-all inline-flex items-center gap-1"
          >
            <Flame className="size-3" />
            <span>Testar Alerta Churn</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3" id="mrr-active-alerts-container">
      {/* Consolidated Critical Header Banner */}
      <div className="rounded-[14px] border border-red-500/50 bg-gradient-to-r from-red-950/70 via-[#1F0E13] to-[#150F16] p-4 shadow-[0_0_24px_rgba(239,68,68,0.25)] relative overflow-hidden">
        {/* Ambient pulse glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 size-48 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="size-10 rounded-[10px] bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 mt-0.5 animate-pulse">
              <ShieldAlert className="size-5" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#F5F7FA] flex items-center gap-1.5">
                  <AlertTriangle className="size-4 text-red-400" />
                  ALERTA DE RECEITA: {alerts.length}{" "}
                  {alerts.length === 1 ? "Contrato Impactado" : "Contratos Impactados"}{" "}
                  Negativamente
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/40 uppercase tracking-wider">
                  Impacto: -{formatKz(Math.abs(totalMrrImpact))}/mês no MRR
                </span>
              </div>

              <p className="text-xs text-[#CBD5E1] mt-1 max-w-2xl leading-relaxed">
                O sistema de monitoramento automático detectou cancelamento ou migração para plano
                inferior. Aja imediatamente com os playbooks de retenção antes do encerramento do
                ciclo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            {onNavigateToClients && (
              <button
                type="button"
                onClick={onNavigateToClients}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#0E121A] hover:bg-[#252C38] border border-red-500/30 text-xs font-semibold text-red-300 hover:text-white transition-all"
              >
                <span>Gerenciar em Clientes</span>
                <ChevronRight className="size-3" />
              </button>
            )}
          </div>
        </div>

        {/* Individual Alert Cards List */}
        <div className="mt-3.5 pt-3 border-t border-red-500/30 space-y-2.5">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-[10px] border border-red-500/30 bg-[#0A0D14]/80 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all hover:border-red-500/60"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`size-7 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5 ${
                    alert.type === "churn"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-amber-500/20 text-amber-400"
                  }`}
                >
                  {alert.type === "churn" ? (
                    <TrendingDown className="size-4" />
                  ) : (
                    <ArrowDownRight className="size-4" />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <strong className="text-xs text-[#F5F7FA] font-bold">
                      {alert.clientCompany}
                    </strong>
                    <span className="text-[11px] text-[#94A3B8]">({alert.clientName})</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        alert.type === "churn"
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                      }`}
                    >
                      {alert.type === "churn" ? "Cancelamento (Churn)" : "Downgrade de Plano"}
                    </span>
                  </div>

                  <div className="text-xs text-[#CBD5E1] mt-0.5 flex items-center gap-2 flex-wrap">
                    <span>
                      Plano:{" "}
                      <span className="line-through text-[#94A3B8]">{alert.previousPlan}</span>
                      {" ➔ "}
                      <span className="font-semibold text-[#F5F7FA]">
                        {alert.newPlan || "Cancelado"}
                      </span>
                    </span>
                    <span className="text-red-400 font-mono font-bold">
                      {alert.mrrImpactFormatted}
                    </span>
                    <span className="text-[11px] text-[#94A3B8]">({alert.reason})</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedAlertForPlaybook(alert)}
                  className="px-2.5 py-1 rounded-[6px] bg-[#3B82F6]/20 hover:bg-[#3B82F6]/30 border border-[#3B82F6]/40 text-[#60A5FA] text-xs font-semibold inline-flex items-center gap-1 transition-all"
                >
                  <BookOpen className="size-3" />
                  <span>Playbook Retenção</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resolveAlertAndRestoreClient(alert.id);
                    toast.success("Contrato restaurado com sucesso!", {
                      description: `${alert.clientCompany} retornou ao plano ${alert.previousPlan}. MRR recuperado!`,
                    });
                  }}
                  className="px-2.5 py-1 rounded-[6px] bg-[#22C55E]/20 hover:bg-[#22C55E]/30 border border-[#22C55E]/40 text-[#4ADE80] text-xs font-semibold inline-flex items-center gap-1 transition-all"
                  title="Reverter alteração e restaurar plano original"
                >
                  <RotateCcw className="size-3" />
                  <span>Reverter & Recuperar</span>
                </button>

                <button
                  type="button"
                  onClick={() => dismissAlert(alert.id)}
                  className="p-1 rounded-[6px] text-[#64748B] hover:text-white hover:bg-[#1E293B] transition-all"
                  title="Dispensar alerta"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Retention Playbook Modal / Drawer */}
      {selectedAlertForPlaybook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-[16px] border border-[#252C38] bg-[#0E121A] p-6 shadow-2xl">
            <div className="flex items-start justify-between pb-3 border-b border-[#252C38]">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-[8px] bg-red-500/20 text-red-400 flex items-center justify-center">
                  <ShieldAlert className="size-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F5F7FA]">Playbook de Retenção de MRR</h3>
                  <p className="text-xs text-[#A7B0BF]">
                    {selectedAlertForPlaybook.clientCompany} • Perda:{" "}
                    <span className="text-red-400 font-mono font-bold">
                      {selectedAlertForPlaybook.mrrImpactFormatted}
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedAlertForPlaybook(null)}
                className="p-1.5 text-[#667085] hover:text-white rounded-[6px] hover:bg-[#1A212D]"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="rounded-[10px] bg-[#151A23] p-3 border border-[#252C38]">
                <span className="text-[11px] text-[#667085] block uppercase font-bold tracking-wider">
                  Motivo Identificado
                </span>
                <p className="text-xs text-[#CBD5E1] mt-1">"{selectedAlertForPlaybook.reason}"</p>
              </div>

              <div>
                <span className="text-xs font-bold text-[#F5F7FA] block mb-2">
                  Ações Recomendadas Imediatas:
                </span>
                <div className="space-y-2">
                  {selectedAlertForPlaybook.recoveryPlaybook.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-[8px] bg-[#151A23]/70 border border-[#252C38] flex items-start gap-2.5"
                    >
                      <span className="size-5 rounded-full bg-[#3B82F6]/20 text-[#60A5FA] font-bold font-mono text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-[#CBD5E1] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3.5 border-t border-[#252C38] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  resolveAlertAndRestoreClient(selectedAlertForPlaybook.id);
                  setSelectedAlertForPlaybook(null);
                  toast.success("Cliente retido com sucesso no plano original!");
                }}
                className="flex-1 py-2 rounded-[8px] bg-[#22C55E] hover:bg-[#16A34A] text-black font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all"
              >
                <RotateCcw className="size-3.5" />
                <span>Confirmar Retenção & Reverter Perda</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedAlertForPlaybook(null)}
                className="px-4 py-2 rounded-[8px] bg-[#151A23] hover:bg-[#252C38] text-[#CBD5E1] text-xs font-medium border border-[#252C38] transition-all"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
