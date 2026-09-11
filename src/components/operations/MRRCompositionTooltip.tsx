import { useState } from "react";
import { Info, CheckCircle2, TrendingUp, TrendingDown, HelpCircle } from "lucide-react";
import { FinancialSummary, PLANS_CATALOG, formatKz } from "./financialUtils";
import { PlanName } from "./types";

interface MRRCompositionTooltipProps {
  financialMetrics: FinancialSummary;
  align?: "left" | "right" | "center";
}

const ALL_PLANS: PlanName[] = [
  "Presença",
  "Profissional",
  "Autoridade",
  "Domínio IA",
  "Automate Pro",
];

export function MRRCompositionTooltip({
  financialMetrics,
  align = "right",
}: MRRCompositionTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Map plans with their active count and calculations
  const planBreakdown = ALL_PLANS.map((planName) => {
    const config = PLANS_CATALOG[planName];
    const item = financialMetrics.mrrByPlan.find((p) => p.plan === planName);
    const count = item ? item.count : 0;
    const subtotal = count * (config?.monthlyFee || 0);

    return {
      name: planName,
      monthlyFee: config?.monthlyFee || 0,
      monthlyFormatted: config?.monthlyFormatted || "0/mês",
      badge: config?.badge,
      count,
      subtotal,
      subtotalFormatted: formatKz(subtotal),
      color: item?.color || "#3B82F6",
    };
  });

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        aria-label="Ver composição detalhada da receita recorrente (MRR)"
        title="Ver composição detalhada por plano"
        className="size-5 rounded-full bg-[#22C55E]/15 hover:bg-[#22C55E]/30 text-[#22C55E] flex items-center justify-center transition-all cursor-pointer border border-[#22C55E]/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#22C55E]"
      >
        <Info className="size-3" />
      </button>

      {isOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute top-full mt-2 z-50 w-80 sm:w-96 rounded-[14px] border border-[#22C55E]/40 bg-[#0E141D] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.65),0_0_24px_rgba(34,197,94,0.18)] backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150 ${
            align === "right"
              ? "right-0"
              : align === "center"
                ? "left-1/2 -translate-x-1/2"
                : "left-0"
          }`}
        >
          {/* Header */}
          <div className="pb-3 border-b border-[#252C38] flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#F5F7FA]">
                  Composição do MRR
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-[#22C55E]/20 text-[#22C55E]">
                  Previsível
                </span>
              </div>
              <p className="text-[11px] text-[#A7B0BF] mt-0.5">
                Mensalidades ativas dos 5 planos contratuais
              </p>
            </div>

            <div className="text-right">
              <span className="text-sm font-black font-mono text-[#22C55E]">
                {financialMetrics.mrrFormatted}
              </span>
              <div className="flex items-center justify-end gap-1 text-[10px] font-mono mt-0.5">
                {financialMetrics.isChurn ? (
                  <span className="text-[#EF4444] font-bold flex items-center gap-0.5">
                    <TrendingDown className="size-3" />
                    {financialMetrics.mrrMomGrowthFormatted} MoM
                  </span>
                ) : (
                  <span className="text-[#22C55E] font-bold flex items-center gap-0.5">
                    <TrendingUp className="size-3" />
                    {financialMetrics.mrrMomGrowthFormatted} MoM
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* List of Plans */}
          <div className="py-2.5 space-y-2">
            {planBreakdown.map((plan) => {
              const hasClients = plan.count > 0;
              return (
                <div
                  key={plan.name}
                  className={`p-2 rounded-[8px] border transition-all flex items-center justify-between ${
                    hasClients
                      ? "border-[#252C38] bg-[#151A23]"
                      : "border-[#1E2430]/60 bg-[#0E121A]/50 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: plan.color }}
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#F5F7FA] truncate">
                          {plan.name}
                        </span>
                        {plan.badge && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 font-medium">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#A7B0BF]">{plan.monthlyFormatted}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2">
                    <div className="text-xs font-bold font-mono text-[#F5F7FA]">
                      {plan.subtotalFormatted}/mês
                    </div>
                    <span
                      className={`text-[10px] font-medium ${
                        hasClients ? "text-[#22C55E]" : "text-[#667085]"
                      }`}
                    >
                      {plan.count} {plan.count === 1 ? "cliente" : "clientes"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Context Explanatory Note */}
          <div className="pt-2.5 border-t border-[#252C38] text-[10px] text-[#A7B0BF] space-y-1">
            <div className="flex items-center justify-between font-mono font-semibold text-[#F5F7FA]">
              <span>Total de Contratos Ativos:</span>
              <span className="text-[#22C55E]">
                {financialMetrics.activeRecurringClients} empresas
              </span>
            </div>
            <p className="text-[10px] text-[#667085] leading-relaxed pt-1">
              O MRR inclui hospedagem ultraveloz, operação contínua dos agentes de IA 24/7,
              manutenções preventivas e suporte mensal dedicado.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
