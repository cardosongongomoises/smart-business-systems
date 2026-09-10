import { ChevronRight, ArrowRight } from "lucide-react";
import { FunnelStage } from "./types";

interface FunnelOverviewProps {
  stages: FunnelStage[];
}

export function FunnelOverview({ stages }: FunnelOverviewProps) {
  const maxCount = Math.max(...stages.map((s) => s.count), 0);
  const totalVisitors = stages[0]?.count || 0;
  const totalConversions = stages.find((s) => s.id === "converter")?.count || 0;
  const globalRate =
    totalVisitors > 0 ? ((totalConversions / totalVisitors) * 100).toFixed(1) : "0.0";

  return (
    <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#252C38]">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-[#F5F7FA] tracking-wide">
              Funil de Conversão & Operação
            </h2>
            <span className="text-[10px] font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 px-2 py-0.5 rounded-full uppercase">
              Pipeline Contínuo
            </span>
          </div>
          <p className="text-[11px] text-[#A7B0BF] mt-0.5">
            Fluxo completo de captação digital, qualificação por IA e fechamento
          </p>
        </div>

        <div className="text-[11px] text-[#667085] flex items-center gap-1.5 font-mono">
          <span>Total de Entradas: {totalVisitors}</span>
          <span>•</span>
          <span className="text-[#22C55E]">
            {totalConversions} Conversões ({globalRate}% global)
          </span>
        </div>
      </div>

      {/* Stepper Visual Journey */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((stage, idx) => {
          const isAiStage = stage.id === "atender" || stage.id === "qualificar";
          const isConversion = stage.id === "converter";

          return (
            <div
              key={stage.id}
              className={`rounded-[12px] border p-3 flex flex-col justify-between transition-all duration-200 ${
                isAiStage
                  ? "border-[#8B5CF6]/40 bg-[#8B5CF6]/5"
                  : isConversion
                    ? "border-[#22C55E]/40 bg-[#22C55E]/5"
                    : "border-[#252C38] bg-[#0E121A]/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold font-mono text-[#667085]">0{idx + 1}</span>
                  {idx < stages.length - 1 && (
                    <ChevronRight className="size-3 text-[#667085] hidden lg:block" />
                  )}
                </div>

                <p
                  className={`text-xs font-bold tracking-wider uppercase ${
                    isAiStage
                      ? "text-[#C084FC]"
                      : isConversion
                        ? "text-[#22C55E]"
                        : "text-[#F5F7FA]"
                  }`}
                >
                  {stage.name}
                </p>

                <p className="text-lg font-extrabold text-[#F5F7FA] mt-1 font-mono">
                  {stage.count.toLocaleString("pt-PT")}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#252C38]/60">
                <div className="w-full bg-[#252C38] h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isAiStage ? "bg-[#8B5CF6]" : isConversion ? "bg-[#22C55E]" : "bg-[#3B82F6]"
                    }`}
                    style={{
                      width: `${maxCount > 0 ? Math.max(4, (stage.count / maxCount) * 100) : 4}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px]">
                  <span className="text-[#667085]">Conversão</span>
                  <span
                    className={`font-semibold ${
                      isAiStage
                        ? "text-[#C084FC]"
                        : isConversion
                          ? "text-[#22C55E]"
                          : "text-[#3B82F6]"
                    }`}
                  >
                    {stage.conversionRate}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
