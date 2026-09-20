import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Smartphone,
  PhoneOff,
  Filter,
  Terminal,
  Pause,
  Play,
  Trash2,
  Layers,
  Sparkles,
  Search,
} from "lucide-react";
import { ValidationStatusLogItem } from "./campaignValidationStore";

interface WhatsAppValidationLiveTerminalProps {
  isProcessing: boolean;
  progress: number;
  total: number;
  processedCount: number;
  successCount: number;
  failureCount: number;
  currentProcessingPhone?: string;
  logs: ValidationStatusLogItem[];
  onClearLogs?: () => void;
  onRerunValidation?: () => void;
}

export function WhatsAppValidationLiveTerminal({
  isProcessing,
  progress,
  total,
  processedCount,
  successCount,
  failureCount,
  currentProcessingPhone,
  logs,
  onClearLogs,
  onRerunValidation,
}: WhatsAppValidationLiveTerminalProps) {
  const [filterType, setFilterType] = useState<"all" | "success" | "failure">("all");
  const [autoScroll, setAutoScroll] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para a última mensagem de status
  useEffect(() => {
    if (autoScroll && logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const filteredLogs = logs.filter((item) => {
    if (filterType === "success" && item.status !== "sucesso") return false;
    if (filterType === "failure" && item.status === "sucesso") return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        item.numero.toLowerCase().includes(term) ||
        item.empresa.toLowerCase().includes(term) ||
        item.operadora.toLowerCase().includes(term) ||
        item.motivo.toLowerCase().includes(term)
      );
    }
    return true;
  });

  const successPercent =
    processedCount > 0 ? ((successCount / processedCount) * 100).toFixed(1) : "0.0";
  const failurePercent =
    processedCount > 0 ? ((failureCount / processedCount) * 100).toFixed(1) : "0.0";

  return (
    <div className="bg-[#10141D] border border-[#252C38] rounded-xl overflow-hidden shadow-lg shadow-black/40">
      {/* Header com Status do Processamento */}
      <div className="p-3.5 bg-[#141A26] border-b border-[#252C38] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-lg border ${
              isProcessing
                ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 animate-pulse"
                : "bg-slate-800/60 border-slate-700 text-slate-300"
            }`}
          >
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                Validação de WhatsApp em Tempo Real
                {isProcessing && (
                  <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-medium animate-pulse border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Processando...
                  </span>
                )}
                {!isProcessing && logs.length > 0 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono font-medium">
                    Auditoria Concluída
                  </span>
                )}
              </h3>
            </div>
            <p className="text-[11px] text-slate-400">
              {isProcessing && currentProcessingPhone ? (
                <span>
                  Analisando terminal:{" "}
                  <strong className="text-emerald-400 font-mono">{currentProcessingPhone}</strong>
                </span>
              ) : (
                "Monitoramento contínuo de terminals móveis ativos vs números descartados"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {onRerunValidation && !isProcessing && (
            <button
              onClick={onRerunValidation}
              className="text-[11px] px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              Executar Validação
            </button>
          )}

          <button
            onClick={() => setAutoScroll((prev) => !prev)}
            className={`text-[11px] px-2 py-1.5 rounded border transition-colors flex items-center gap-1 cursor-pointer ${
              autoScroll
                ? "bg-[#1A2230] text-emerald-400 border-emerald-500/30"
                : "bg-[#161B26] text-slate-400 border-slate-800"
            }`}
            title={autoScroll ? "Pausar rolagem automática" : "Ativar rolagem automática"}
          >
            {autoScroll ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span>{autoScroll ? "Auto-scroll Ativo" : "Scroll Pausado"}</span>
          </button>

          {logs.length > 0 && onClearLogs && !isProcessing && (
            <button
              onClick={onClearLogs}
              className="text-[11px] p-1.5 rounded text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-slate-800 transition-colors cursor-pointer"
              title="Limpar logs de status"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* BARRA DE PROGRESSO EM TEMPO REAL */}
      <div className="p-3.5 border-b border-[#252C38] bg-[#0E121A]/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-200">
              Progresso da Validação: <strong className="text-white font-mono">{progress}%</strong>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ({processedCount} de {total} contatos analisados)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {successCount} Aprovados ({successPercent}%)
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/20 font-mono flex items-center gap-1">
              <XCircle className="w-3 h-3" />
              {failureCount} Descartados ({failurePercent}%)
            </span>
          </div>
        </div>

        {/* Barra de Progresso Visual Animada */}
        <div className="w-full bg-[#1A2230] rounded-full h-2.5 overflow-hidden border border-[#2A3548] p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-200 ${
              isProcessing
                ? "bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-sm shadow-emerald-500/50"
                : progress === 100
                  ? "bg-emerald-500"
                  : "bg-slate-600"
            }`}
            style={{ width: `${Math.max(2, Math.min(100, progress))}%` }}
          />
        </div>
      </div>

      {/* Barra de Filtros e Busca no Registro de Status */}
      <div className="px-3.5 py-2 bg-[#121620] border-b border-[#202735] flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-slate-500" />
            Filtrar:
          </span>

          <button
            onClick={() => setFilterType("all")}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
              filterType === "all"
                ? "bg-slate-700 text-white font-medium"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Todos ({logs.length})
          </button>

          <button
            onClick={() => setFilterType("success")}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
              filterType === "success"
                ? "bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30"
                : "text-slate-400 hover:text-emerald-400"
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Aprovados ({logs.filter((l) => l.status === "sucesso").length})
          </button>

          <button
            onClick={() => setFilterType("failure")}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer flex items-center gap-1 ${
              filterType === "failure"
                ? "bg-rose-500/20 text-rose-300 font-medium border border-rose-500/30"
                : "text-slate-400 hover:text-rose-400"
            }`}
          >
            <XCircle className="w-3 h-3 text-rose-400" />
            Descartados ({logs.filter((l) => l.status !== "sucesso").length})
          </button>
        </div>

        <div className="relative">
          <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar nos logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#0A0D14] border border-[#252C38] rounded-md pl-7 pr-2.5 py-1 text-[11px] text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 w-44"
          />
        </div>
      </div>

      {/* REGISTRO DE STATUS (TERMINAL DE AUDITORIA EM TEMPO REAL) */}
      <div
        ref={logContainerRef}
        className="max-h-64 overflow-y-auto font-mono text-[11px] p-3 space-y-1.5 divide-y divide-[#1A2230]/40 bg-[#0A0D13]"
      >
        {filteredLogs.length === 0 ? (
          <div className="py-8 text-center text-slate-500 text-xs">
            {logs.length === 0
              ? "Nenhum evento de validação registrado ainda. Envie um arquivo ou clique em 'Executar Validação'."
              : "Nenhum log encontrado para o filtro selecionado."}
          </div>
        ) : (
          filteredLogs.map((log) => {
            const isSuccess = log.status === "sucesso";
            const isLandline = log.status === "descarte_fixo";

            return (
              <div
                key={log.id}
                className={`pt-1.5 first:pt-0 flex items-start justify-between gap-3 text-[11px] transition-colors ${
                  isSuccess ? "hover:bg-emerald-950/10" : "hover:bg-rose-950/10"
                }`}
              >
                <div className="flex items-start gap-2 min-w-0">
                  <span className="text-slate-500 text-[10px] shrink-0 pt-0.5">
                    {log.timestamp}
                  </span>

                  <div className="shrink-0 pt-0.5">
                    {isSuccess ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : isLandline ? (
                      <PhoneOff className="w-3.5 h-3.5 text-rose-400" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-amber-400" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`font-semibold ${isSuccess ? "text-emerald-300" : "text-rose-300"}`}
                      >
                        {log.numero}
                      </span>
                      <span className="text-slate-300">({log.empresa})</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        {log.operadora}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          isSuccess
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            : isLandline
                              ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {isSuccess
                          ? "[SUCESSO: WHATSAPP ATIVO]"
                          : isLandline
                            ? "[DESCARTE: LINHA FIXA]"
                            : "[DESCARTE: SEM CONTA]"}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-400 mt-0.5">{log.motivo}</p>
                    {log.mensagem && (
                      <p className="text-[10px] text-slate-500 italic truncate max-w-md mt-0.5">
                        Mensagem: "{log.mensagem}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer do Terminal */}
      <div className="px-3.5 py-2 bg-[#121620] border-t border-[#202735] flex items-center justify-between text-[11px] text-slate-400">
        <span>Status da Auditoria: Conexão direta com heurísticas de validação em Angola</span>
        <span className="font-mono text-[10px] text-slate-500">
          Total de Eventos: {logs.length}
        </span>
      </div>
    </div>
  );
}
