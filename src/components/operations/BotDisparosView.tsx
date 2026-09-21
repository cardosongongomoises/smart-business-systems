import React, { useState, useMemo } from "react";
import {
  Bot,
  Play,
  Pause,
  RotateCcw,
  Clock,
  Send,
  ExternalLink,
  ShieldCheck,
  Zap,
  Search,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Activity,
  Layers,
  ChevronRight,
  Sparkles,
  Trash2,
} from "lucide-react";
import { DisparoCampanha, DisparoFilaItem } from "@/lib/supabaseService";

interface BotDisparosViewProps {
  campaigns: DisparoCampanha[];
  selectedCampaignId: number | null;
  onSelectCampaign: (id: number) => void;
  onDeleteCampaign?: (campaign: DisparoCampanha) => void;
  filaItems: DisparoFilaItem[];
  isBotRunning: boolean;
  botIntervalSeconds: number;
  onChangeInterval: (seconds: number) => void;
  onToggleBot: () => void;
  onResetFila: () => void;
  onSendSingleLead: (item: DisparoFilaItem) => void;
  currentSendingId: number | null;
  botLogs: Array<{
    id: string;
    time: string;
    text: string;
    status: "info" | "success" | "warning" | "error";
  }>;
  onLoadConstrucaoCivilCampaign: () => void;
  onInjectConstrucaoCivilDirect: () => void;
  isSyncing: boolean;
}

export function BotDisparosView({
  campaigns,
  selectedCampaignId,
  onSelectCampaign,
  onDeleteCampaign,
  filaItems,
  isBotRunning,
  botIntervalSeconds,
  onChangeInterval,
  onToggleBot,
  onResetFila,
  onSendSingleLead,
  currentSendingId,
  botLogs,
  onLoadConstrucaoCivilCampaign,
  onInjectConstrucaoCivilDirect,
  isSyncing,
}: BotDisparosViewProps) {
  const [filterStatus, setFilterStatus] = useState<"todos" | "pendente" | "enviado" | "falhou">(
    "todos",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLeadPreview, setSelectedLeadPreview] = useState<DisparoFilaItem | null>(null);

  // Totais e estatísticas da fila
  const total = filaItems.length;
  const pendentes = useMemo(
    () => filaItems.filter((it) => it.status === "pendente").length,
    [filaItems],
  );
  const enviados = useMemo(
    () => filaItems.filter((it) => it.status === "enviado").length,
    [filaItems],
  );
  const falhados = useMemo(
    () => filaItems.filter((it) => it.status === "falhou").length,
    [filaItems],
  );
  const percentConcluido = total > 0 ? Math.round((enviados / total) * 100) : 0;

  // Filtro de leads na tabela
  const filteredItems = useMemo(() => {
    return filaItems.filter((item) => {
      if (filterStatus !== "todos" && item.status !== filterStatus) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchEmp = item.empresa.toLowerCase().includes(query);
        const matchTel = item.telefone.includes(query);
        const matchMsg = item.mensagem.toLowerCase().includes(query);
        if (!matchEmp && !matchTel && !matchMsg) return false;
      }
      return true;
    });
  }, [filaItems, filterStatus, searchQuery]);

  const selectedCampaign = campaigns.find((c) => c.id === selectedCampaignId);

  return (
    <div id="bot-disparos-view" className="space-y-6">
      {/* Banner de Status do Bot e Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Card Principal de Controle do Bot */}
        <div className="lg:col-span-8 bg-[#131824] border border-[#252C38] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#202734] pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl border ${
                  isBotRunning
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 animate-pulse"
                    : "bg-[#1A2230] border-[#303846] text-slate-400"
                }`}
              >
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white tracking-wide">
                    Bot de Disparos WhatsApp
                  </h2>
                  <span
                    className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border flex items-center gap-1.5 ${
                      isBotRunning
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                        : "bg-slate-700/30 text-slate-400 border-slate-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isBotRunning ? "bg-emerald-400 animate-ping" : "bg-slate-400"
                      }`}
                    />
                    {isBotRunning ? "EXECUTANDO DISPAROS" : "PAUSADO / AGUARDANDO"}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automação com proteção anti-bloqueio, roteamento de mensagens personalizadas e
                  validação de números.
                </p>
              </div>
            </div>

            {/* Ação Iniciar / Pausar */}
            <div className="flex items-center gap-2">
              <button
                id="btn-toggle-bot"
                onClick={onToggleBot}
                disabled={total === 0}
                className={`px-4 py-2 text-xs font-semibold rounded-lg flex items-center gap-2 transition-all shadow-md cursor-pointer ${
                  isBotRunning
                    ? "bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/20"
                    : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
                }`}
              >
                {isBotRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pausar Bot
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Iniciar Disparos do Bot
                  </>
                )}
              </button>

              <button
                id="btn-reset-fila"
                onClick={onResetFila}
                disabled={isBotRunning || total === 0}
                className="px-3 py-2 text-xs font-medium rounded-lg border border-[#303846] bg-[#1A2230] hover:bg-[#222C3E] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                title="Reiniciar todos os itens para o estado 'pendente'"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reiniciar
              </button>
            </div>
          </div>

          {/* Seletor de Campanha e Intervalo Anti-Bloqueio */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Campanha Ativa no Supabase:
                </label>
                {selectedCampaign && onDeleteCampaign && (
                  <button
                    type="button"
                    onClick={() => onDeleteCampaign(selectedCampaign)}
                    disabled={isBotRunning}
                    className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    title="Excluir esta campanha e sua fila no Supabase"
                  >
                    <Trash2 className="w-3 h-3" />
                    Deletar Campanha
                  </button>
                )}
              </div>
              <select
                id="select-campaign-bot"
                value={selectedCampaignId || ""}
                onChange={(e) => onSelectCampaign(Number(e.target.value))}
                className="w-full bg-[#1A2230] border border-[#303846] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
              >
                {campaigns.length === 0 && <option value="">Nenhuma campanha no banco</option>}
                {campaigns.map((camp) => (
                  <option key={camp.id} value={camp.id}>
                    #{camp.id} - {camp.nome} ({camp.stats?.total || 0} leads)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>Intervalo de Segurança:</span>
                <span className="text-emerald-400 font-mono">{botIntervalSeconds}s por lead</span>
              </label>
              <div className="flex items-center gap-2">
                {[3, 5, 10, 15, 30].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => onChangeInterval(sec)}
                    className={`flex-1 py-1.5 text-xs font-mono font-medium rounded border transition-all cursor-pointer ${
                      botIntervalSeconds === sec
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold"
                        : "bg-[#1A2230] border-[#303846] text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {sec}s
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Barra de Progresso em Tempo Real */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5 font-medium">
              <span>Progresso dos Disparos:</span>
              <span className="font-mono text-emerald-400 font-bold">
                {enviados} de {total} enviados ({percentConcluido}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#1A2230] rounded-full overflow-hidden border border-[#252C38]">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 rounded-full"
                style={{ width: `${percentConcluido}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card Lateral: Base de Construção Civil e Métricas Rápidas */}
        <div className="lg:col-span-4 bg-[#131824] border border-[#252C38] rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                Base Pronta: Construção Civil
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Base oficial com 214 construtoras e empreiteiras de Luanda formatadas por ângulo
              persuasivo (Bloco A e Bloco B).
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#202734]">
            <button
              id="btn-inject-construcao-civil"
              onClick={onInjectConstrucaoCivilDirect}
              disabled={isSyncing}
              className="w-full py-2.5 px-3 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4" />
              Injetar Base no Bot (214 Mensagens)
            </button>
            <button
              id="btn-load-construcao-editor"
              onClick={onLoadConstrucaoCivilCampaign}
              className="w-full py-2 px-3 text-xs font-medium rounded-lg border border-[#303846] bg-[#1A2230] hover:bg-[#222C3E] text-slate-300 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Visualizar/Editar Mensagens
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Métricas de Fila */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
            Total na Fila
          </span>
          <span className="text-2xl font-bold font-mono text-white">{total}</span>
        </div>
        <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider block mb-1">
            Pendentes
          </span>
          <span className="text-2xl font-bold font-mono text-amber-300">{pendentes}</span>
        </div>
        <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
            Disparados com Sucesso
          </span>
          <span className="text-2xl font-bold font-mono text-emerald-400">{enviados}</span>
        </div>
        <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block mb-1">
            Falhados / Erros
          </span>
          <span className="text-2xl font-bold font-mono text-rose-400">{falhados}</span>
        </div>
      </div>

      {/* Seção Principal: Tabela da Fila e Terminal em Tempo Real */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Coluna Esquerda: Fila de Leads */}
        <div className="lg:col-span-8 bg-[#131824] border border-[#252C38] rounded-xl p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                Fila de Leads da Campanha
              </h3>
              <span className="text-xs text-slate-400">
                {selectedCampaign ? selectedCampaign.nome : "Selecione uma campanha"}
              </span>
            </div>

            {/* Filtros de Status */}
            <div className="flex items-center gap-1.5 bg-[#1A2230] p-1 rounded-lg border border-[#252C38]">
              {(["todos", "pendente", "enviado", "falhou"] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2.5 py-1 rounded text-xs font-medium capitalize transition-colors cursor-pointer ${
                    filterStatus === st
                      ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Busca de Leads */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por empresa, telefone ou texto da mensagem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1A2230] border border-[#303846] rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Tabela de Leads na Fila */}
          <div className="overflow-x-auto max-h-[500px] border border-[#252C38] rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#1A2230] text-slate-400 uppercase tracking-wider text-[10px] sticky top-0 border-b border-[#252C38]">
                <tr>
                  <th className="py-2.5 px-3">#</th>
                  <th className="py-2.5 px-3">Empresa</th>
                  <th className="py-2.5 px-3">Telefone</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#202734] font-normal text-slate-300">
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      Nenhum lead encontrado com os filtros atuais.
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const isSending = currentSendingId === item.id;
                    const cleanPhone = item.telefone.replace(/\D/g, "");
                    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(item.mensagem)}`;

                    return (
                      <tr
                        key={item.id}
                        className={`transition-colors hover:bg-[#1A2230]/50 ${
                          isSending ? "bg-emerald-500/10 border-l-2 border-emerald-400" : ""
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono text-slate-500">
                          {isSending ? (
                            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                          ) : (
                            item.id
                          )}
                        </td>
                        <td className="py-2.5 px-3">
                          <button
                            type="button"
                            onClick={() => setSelectedLeadPreview(item)}
                            className="font-semibold text-slate-200 hover:text-emerald-400 text-left transition-colors cursor-pointer"
                          >
                            {item.empresa}
                          </button>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-400">{item.telefone}</td>
                        <td className="py-2.5 px-3">
                          {item.status === "enviado" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                              <CheckCircle2 className="w-3 h-3" /> Enviado
                            </span>
                          )}
                          {item.status === "pendente" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                              <Clock className="w-3 h-3" /> Pendente
                            </span>
                          )}
                          {item.status === "falhou" && (
                            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                              <AlertCircle className="w-3 h-3" /> Falhou
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedLeadPreview(item)}
                              className="p-1 rounded text-slate-400 hover:text-slate-200 hover:bg-[#252C38] transition-colors cursor-pointer"
                              title="Visualizar mensagem completa"
                            >
                              Ver
                            </button>
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-[#252C38] transition-colors"
                              title="Abrir no WhatsApp Web"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={() => onSendSingleLead(item)}
                              className="px-2 py-1 rounded bg-emerald-600/80 hover:bg-emerald-600 text-white font-medium text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                              title="Disparar e marcar como enviado"
                            >
                              <Send className="w-3 h-3" />
                              Disparar
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Coluna Direita: Terminal de Execução do Bot & Pré-visualizador */}
        <div className="lg:col-span-4 space-y-4">
          {/* Terminal Console */}
          <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4 flex flex-col h-[320px]">
            <div className="flex items-center justify-between pb-3 border-b border-[#202734] mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Terminal de Eventos
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Live Bot Feed</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1.5 font-mono text-[11px] pr-1">
              {botLogs.length === 0 ? (
                <p className="text-slate-500 italic py-4">Aguardando início dos disparos...</p>
              ) : (
                botLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-1.5 leading-tight">
                    <span className="text-slate-500 shrink-0">[{log.time}]</span>
                    <span
                      className={`break-words ${
                        log.status === "success"
                          ? "text-emerald-400"
                          : log.status === "warning"
                            ? "text-amber-400"
                            : log.status === "error"
                              ? "text-rose-400"
                              : "text-slate-300"
                      }`}
                    >
                      {log.text}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Modal / Card de Pré-visualização do Lead Selecionado */}
          {selectedLeadPreview ? (
            <div className="bg-[#131824] border border-emerald-500/30 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[#202734] pb-2">
                <div>
                  <h4 className="text-xs font-bold text-white">{selectedLeadPreview.empresa}</h4>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {selectedLeadPreview.telefone}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedLeadPreview(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Fechar
                </button>
              </div>

              <div className="bg-[#1A2230] p-3 rounded-lg border border-[#252C38] text-xs text-slate-200 max-h-48 overflow-y-auto whitespace-pre-wrap font-sans leading-relaxed">
                {selectedLeadPreview.mensagem}
              </div>

              <button
                type="button"
                onClick={() => onSendSingleLead(selectedLeadPreview)}
                className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
                Disparar Esta Mensagem Agora
              </button>
            </div>
          ) : (
            <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4 text-center text-slate-500 text-xs">
              Selecione um lead na tabela ao lado para visualizar a mensagem completa e proposta
              persuasiva.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
