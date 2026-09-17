import { useState, useEffect, useMemo } from "react";
import {
  Send,
  Play,
  Pause,
  RefreshCw,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Building2,
  Phone,
  Globe,
  Sparkles,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface Campanha {
  id: number;
  nome: string;
  descricao: string | null;
  status: "pendente" | "em_andamento" | "pausada" | "concluida";
  total: number;
  enviados: number;
  falhas: number;
  created_at: string;
  iniciado_em: string | null;
  concluido_em: string | null;
}

interface ItemFila {
  id: number;
  campanha_id: number;
  empresa: string;
  telefone: string;
  mensagem: string;
  oferta: string | null;
  angulo: string | null;
  bloco: "A" | "B" | null;
  cidade: string | null;
  site: string | null;
  rating: string | null;
  avaliacoes: string | null;
  status: "pendente" | "enviado" | "falhou";
  enviado_em: string | null;
  erro: string | null;
  created_at: string;
}

const LOCAL_BOT_API = "http://localhost:3333";

export function CampaignsView() {
  const [campanhas, setCampanhas] = useState<Campanha[]>([]);
  const [campanhaAtiva, setCampanhaAtiva] = useState<Campanha | null>(null);
  const [fila, setFila] = useState<ItemFila[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | "pendente" | "enviado" | "falhou">("todos");
  const [blocoFilter, setBlocoFilter] = useState<"todos" | "A" | "B">("todos");

  // Modal de preview da mensagem
  const [previewLead, setPreviewLead] = useState<ItemFila | null>(null);

  // Carrega campanhas do Supabase
  const loadCampanhas = async (silent = false) => {
    if (!silent) setIsLoading(true);
    else setIsRefreshing(true);

    try {
      const { data, error } = await supabase
        .from("campanhas_disparo")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar campanhas:", error);
        toast.error("Erro ao sincronizar campanhas com o Supabase");
        return;
      }

      if (data && data.length > 0) {
        setCampanhas(data as Campanha[]);
        // Se não houver campanha selecionada, seleciona a primeira
        if (!campanhaAtiva) {
          setCampanhaAtiva(data[0] as Campanha);
          await loadFila(data[0].id);
        } else {
          // Atualiza dados da campanha ativa
          const atualizada = data.find((c) => c.id === campanhaAtiva.id) || data[0];
          setCampanhaAtiva(atualizada as Campanha);
          await loadFila(atualizada.id);
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error("Erro:", msg);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Carrega a fila de uma campanha específica
  const loadFila = async (campanhaId: number) => {
    try {
      const { data, error } = await supabase
        .from("disparo_fila")
        .select("*")
        .eq("campanha_id", campanhaId)
        .order("id", { ascending: true });

      if (error) {
        console.error("Erro ao carregar fila:", error);
        return;
      }

      setFila((data || []) as ItemFila[]);
    } catch (err) {
      console.error("Erro ao buscar itens da fila:", err);
    }
  };

  // Carregamento inicial e auto-polling a cada 15 segundos
  useEffect(() => {
    loadCampanhas();
    const interval = setInterval(() => {
      loadCampanhas(true);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Troca de campanha
  const handleSelectCampanha = (camp: Campanha) => {
    setCampanhaAtiva(camp);
    loadFila(camp.id);
  };

  // Controle de Iniciar Disparo
  const handleIniciarDisparo = async (campanhaId: number) => {
    if (!confirm(`Deseja iniciar o disparo em massa para a Campanha #${campanhaId}?`)) return;
    setActionLoading(true);

    try {
      // 1. Atualiza diretamente no Supabase (o Bot monitora o Supabase e inicia automaticamente)
      const { error } = await supabase
        .from("campanhas_disparo")
        .update({
          status: "em_andamento",
          iniciado_em: new Date().toISOString(),
        })
        .eq("id", campanhaId);

      if (error) {
        console.error("Erro ao iniciar campanha no Supabase:", error);
        toast.error("Erro ao atualizar status da campanha no Supabase.");
        return;
      }

      // 2. Notifica o bot local via API como trigger imediato (opcional)
      try {
        await fetch(`${LOCAL_BOT_API}/api/campanha/${campanhaId}/iniciar`, {
          method: "POST",
        });
      } catch {
        // Silencioso: o monitor do Supabase já pegará o status
      }

      toast.success("✅ Disparo iniciado! O assistente está processando os envios com delays anti-bloqueio.");
      if (campanhaAtiva) {
        setCampanhaAtiva({ ...campanhaAtiva, status: "em_andamento" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Erro ao iniciar: ${msg}`);
    } finally {
      setActionLoading(false);
      await loadCampanhas(true);
    }
  };

  // Controle de Pausar Disparo
  const handlePausarDisparo = async (campanhaId: number) => {
    if (!confirm(`Deseja pausar o disparo da Campanha #${campanhaId}?`)) return;
    setActionLoading(true);

    try {
      // 1. Atualiza diretamente no Supabase
      const { error } = await supabase
        .from("campanhas_disparo")
        .update({
          status: "pausada",
        })
        .eq("id", campanhaId);

      if (error) {
        console.error("Erro ao pausar campanha no Supabase:", error);
        toast.error("Erro ao pausar campanha no Supabase.");
        return;
      }

      // 2. Notifica o bot local via API (opcional)
      try {
        await fetch(`${LOCAL_BOT_API}/api/campanha/${campanhaId}/pausar`, {
          method: "POST",
        });
      } catch {
        // Silencioso
      }

      toast.info("⏸ Disparo pausado com sucesso.");
      if (campanhaAtiva) {
        setCampanhaAtiva({ ...campanhaAtiva, status: "pausada" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Erro ao pausar: ${msg}`);
    } finally {
      setActionLoading(false);
      await loadCampanhas(true);
    }
  };

  // Fila filtrada
  const filteredFila = useMemo(() => {
    return fila.filter((item) => {
      // Filtro de texto
      const matchSearch =
        !searchQuery ||
        item.empresa.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.telefone.includes(searchQuery) ||
        (item.cidade && item.cidade.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.angulo && item.angulo.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filtro de status
      const matchStatus = statusFilter === "todos" || item.status === statusFilter;

      // Filtro de bloco
      const matchBloco = blocoFilter === "todos" || item.bloco === blocoFilter;

      return matchSearch && matchStatus && matchBloco;
    });
  }, [fila, searchQuery, statusFilter, blocoFilter]);

  // Métricas calculadas da fila ativa
  const metrics = useMemo(() => {
    const total = fila.length;
    const enviados = fila.filter((f) => f.status === "enviado").length;
    const falhas = fila.filter((f) => f.status === "falhou").length;
    const pendentes = fila.filter((f) => f.status === "pendente").length;
    const taxaProgresso = total > 0 ? Math.round((enviados / total) * 100) : 0;
    const blocoA = fila.filter((f) => f.bloco === "A").length;
    const blocoB = fila.filter((f) => f.bloco === "B").length;

    return { total, enviados, falhas, pendentes, taxaProgresso, blocoA, blocoB };
  }, [fila]);

  return (
    <div className="flex-1 overflow-y-auto flex flex-col p-4 sm:p-6 lg:p-8 space-y-6 bg-[#080A0F] text-[#F5F7FA]">
      {/* ── HEADER DA VISÃO ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#252C38]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6]">
              <Send className="size-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-3">
                Disparos em Massa & Prospecção
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                  Delay Humano Ativo
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#8F9CAE] mt-0.5">
                Envios individualizados e cadenciados para proteção contra bloqueios da Meta.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => loadCampanhas(false)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#161C26] hover:bg-[#1E2634] border border-[#252C38] text-[#DCE2EB] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${isRefreshing ? "animate-spin text-[#3B82F6]" : ""}`} />
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      {/* ── BANNER DE CONFIGURAÇÃO ANTI-BLOQUEIO ───────────────────────── */}
      <div className="bg-gradient-to-r from-[#161C26] to-[#0E121A] border border-[#252C38] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] shrink-0 mt-0.5">
            <ShieldCheck className="size-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-white">
                Cadência Anti-Bloqueio Meta Configuradas
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#3B82F6]/20 text-[#60A5FA]">
                Tempo Aleatório
              </span>
            </div>
            <p className="text-xs text-[#8F9CAE] leading-relaxed max-w-2xl">
              Entre cada mensagem disparada, o assistente aplica uma pausa randômica nos compassos de{" "}
              <strong className="text-white">3, 5, 6, 8 ou 10 minutos</strong>. Nunca segue uma
              sequência fixa, garantindo comportamento indetectável por algoritmos de spam.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#080A0F] border border-[#252C38] px-3.5 py-2 rounded-lg text-xs shrink-0 text-[#DCE2EB]">
          <Clock className="size-4 text-[#F59E0B]" />
          <span>Compassos:</span>
          <span className="font-mono text-[#F59E0B] font-semibold">3m • 5m • 6m • 8m • 10m</span>
        </div>
      </div>

      {/* ── SELETOR DE CAMPANHA & AÇÕES PRINCIPAIS ─────────────────────── */}
      {campanhaAtiva && (
        <div className="bg-[#0E121A] border border-[#252C38] rounded-xl p-5 space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#252C38] text-[#8F9CAE]">
                  Campanha #{campanhaAtiva.id}
                </span>
                <h2 className="text-lg font-bold text-white">{campanhaAtiva.nome}</h2>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase ${
                    campanhaAtiva.status === "em_andamento"
                      ? "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30 animate-pulse"
                      : campanhaAtiva.status === "concluida"
                        ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                        : campanhaAtiva.status === "pausada"
                          ? "bg-[#6B7280]/20 text-[#9CA3AF] border border-[#6B7280]/30"
                          : "bg-[#3B82F6]/15 text-[#3B82F6] border border-[#3B82F6]/30"
                  }`}
                >
                  {campanhaAtiva.status === "em_andamento"
                    ? "⚡ Em Andamento"
                    : campanhaAtiva.status === "pausada"
                      ? "⏸ Pausada"
                      : campanhaAtiva.status === "concluida"
                        ? "✅ Concluída"
                        : "⏳ Pendente"}
                </span>
              </div>
              <p className="text-xs text-[#8F9CAE]">{campanhaAtiva.descricao}</p>
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center gap-2.5 shrink-0">
              {campanhaAtiva.status !== "em_andamento" ? (
                <button
                  onClick={() => handleIniciarDisparo(campanhaAtiva.id)}
                  disabled={actionLoading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#EF4444] hover:bg-[#DC2626] text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(239,68,68,0.3)] transition-all disabled:opacity-50"
                >
                  <Play className="size-4 fill-white" />
                  <span>Iniciar Disparo</span>
                </button>
              ) : (
                <button
                  onClick={() => handlePausarDisparo(campanhaAtiva.id)}
                  disabled={actionLoading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-black text-xs font-bold uppercase tracking-wider shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all disabled:opacity-50"
                >
                  <Pause className="size-4 fill-black" />
                  <span>Pausar Disparo</span>
                </button>
              )}
            </div>
          </div>

          {/* Barra de Progresso Visual */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#8F9CAE]">
              <span>Progresso geral da fila</span>
              <span className="font-semibold text-white">
                {metrics.enviados} de {metrics.total} enviados ({metrics.taxaProgresso}%)
              </span>
            </div>
            <div className="w-full bg-[#161C26] h-2.5 rounded-full overflow-hidden border border-[#252C38]">
              <div
                className={`h-full transition-all duration-500 rounded-full ${
                  campanhaAtiva.status === "concluida" ? "bg-[#10B981]" : "bg-[#EF4444]"
                }`}
                style={{ width: `${metrics.taxaProgresso}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* ── GRID DE CARDS DE MÉTRICAS ──────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-[#0E121A] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-medium text-[#8F9CAE] uppercase tracking-wider block">
            Total na Fila
          </span>
          <span className="text-2xl font-bold text-white mt-1 block">{metrics.total}</span>
          <span className="text-[11px] text-[#8F9CAE] mt-0.5 block">Leads cadastrados</span>
        </div>

        <div className="bg-[#0E121A] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-medium text-[#8F9CAE] uppercase tracking-wider block">
            Enviados
          </span>
          <span className="text-2xl font-bold text-[#10B981] mt-1 block">{metrics.enviados}</span>
          <span className="text-[11px] text-[#10B981]/80 mt-0.5 block">Contatados</span>
        </div>

        <div className="bg-[#0E121A] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-medium text-[#8F9CAE] uppercase tracking-wider block">
            Pendentes
          </span>
          <span className="text-2xl font-bold text-[#F59E0B] mt-1 block">{metrics.pendentes}</span>
          <span className="text-[11px] text-[#F59E0B]/80 mt-0.5 block">Aguardando envio</span>
        </div>

        <div className="bg-[#0E121A] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-medium text-[#8F9CAE] uppercase tracking-wider block">
            Falhas
          </span>
          <span className="text-2xl font-bold text-[#EF4444] mt-1 block">{metrics.falhas}</span>
          <span className="text-[11px] text-[#EF4444]/80 mt-0.5 block">Erros no disparo</span>
        </div>

        <div className="bg-[#0E121A] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-medium text-[#8F9CAE] uppercase tracking-wider block">
            Bloco A (Com Site)
          </span>
          <span className="text-2xl font-bold text-[#60A5FA] mt-1 block">{metrics.blocoA}</span>
          <span className="text-[11px] text-[#60A5FA]/80 mt-0.5 block">Oferta: Automate Pro</span>
        </div>

        <div className="bg-[#0E121A] border border-[#252C38] rounded-xl p-4">
          <span className="text-[11px] font-medium text-[#8F9CAE] uppercase tracking-wider block">
            Bloco B (Sem Site)
          </span>
          <span className="text-2xl font-bold text-[#F59E0B] mt-1 block">{metrics.blocoB}</span>
          <span className="text-[11px] text-[#F59E0B]/80 mt-0.5 block">Oferta: Site + IA</span>
        </div>
      </div>

      {/* ── TABELA DA FILA DE DISPAROS ─────────────────────────────────── */}
      <div className="bg-[#0E121A] border border-[#252C38] rounded-xl overflow-hidden flex flex-col">
        {/* Barra de Filtros e Busca */}
        <div className="p-4 border-b border-[#252C38] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121721]/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#8F9CAE]" />
            <input
              type="text"
              placeholder="Buscar por clínica, telefone, ângulo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#161C26] border border-[#252C38] rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {/* Filtro por Bloco */}
            <div className="flex items-center gap-1 bg-[#161C26] p-1 rounded-lg border border-[#252C38] text-xs shrink-0">
              <span className="text-[#8F9CAE] px-2 text-[11px]">Bloco:</span>
              <button
                onClick={() => setBlocoFilter("todos")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  blocoFilter === "todos" ? "bg-[#3B82F6] text-white" : "text-[#8F9CAE] hover:text-white"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setBlocoFilter("A")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  blocoFilter === "A" ? "bg-[#3B82F6] text-white" : "text-[#8F9CAE] hover:text-white"
                }`}
              >
                A (Com Site)
              </button>
              <button
                onClick={() => setBlocoFilter("B")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  blocoFilter === "B" ? "bg-[#3B82F6] text-white" : "text-[#8F9CAE] hover:text-white"
                }`}
              >
                B (Sem Site)
              </button>
            </div>

            {/* Filtro por Status */}
            <div className="flex items-center gap-1 bg-[#161C26] p-1 rounded-lg border border-[#252C38] text-xs shrink-0">
              <span className="text-[#8F9CAE] px-2 text-[11px]">Status:</span>
              <button
                onClick={() => setStatusFilter("todos")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  statusFilter === "todos" ? "bg-[#3B82F6] text-white" : "text-[#8F9CAE] hover:text-white"
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setStatusFilter("pendente")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  statusFilter === "pendente" ? "bg-[#F59E0B] text-black" : "text-[#8F9CAE] hover:text-white"
                }`}
              >
                Pendentes
              </button>
              <button
                onClick={() => setStatusFilter("enviado")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  statusFilter === "enviado" ? "bg-[#10B981] text-white" : "text-[#8F9CAE] hover:text-white"
                }`}
              >
                Enviados
              </button>
              <button
                onClick={() => setStatusFilter("falhou")}
                className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                  statusFilter === "falhou" ? "bg-[#EF4444] text-white" : "text-[#8F9CAE] hover:text-white"
                }`}
              >
                Falhas
              </button>
            </div>
          </div>
        </div>

        {/* Tabela de Dados */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#DCE2EB]">
            <thead className="bg-[#161C26] text-[#8F9CAE] uppercase text-[10px] tracking-wider border-b border-[#252C38]">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Clínica / Empresa</th>
                <th className="py-3 px-4">Telefone / WhatsApp</th>
                <th className="py-3 px-4">Bloco</th>
                <th className="py-3 px-4">Ângulo Prospecção</th>
                <th className="py-3 px-4">Oferta Prevista</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Disparado Em</th>
                <th className="py-3 px-4 text-right">Mensagem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252C38]/60">
              {isLoading ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-[#8F9CAE]">
                    <RefreshCw className="size-5 animate-spin mx-auto mb-2 text-[#3B82F6]" />
                    Carregando fila de disparos...
                  </td>
                </tr>
              ) : filteredFila.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-[#8F9CAE]">
                    Nenhum lead encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredFila.map((item) => (
                  <tr key={item.id} className="hover:bg-[#161C26]/50 transition-colors">
                    <td className="py-3 px-4 font-mono text-[#8F9CAE]">{item.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <Building2 className="size-3.5 text-[#8F9CAE] shrink-0" />
                        <span>{item.empresa}</span>
                      </div>
                      {item.cidade && (
                        <span className="text-[11px] text-[#8F9CAE] block mt-0.5">{item.cidade}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs">
                      <a
                        href={`https://wa.me/${item.telefone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#3B82F6] hover:underline flex items-center gap-1"
                        title="Abrir no WhatsApp Web"
                      >
                        <Phone className="size-3" />
                        {item.telefone}
                        <ArrowUpRight className="size-2.5 opacity-70" />
                      </a>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          item.bloco === "A"
                            ? "bg-[#3B82F6]/15 text-[#60A5FA] border border-[#3B82F6]/30"
                            : "bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30"
                        }`}
                      >
                        Bloco {item.bloco}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#161C26] border border-[#252C38] text-[11px] text-[#CBD5E1]">
                        {(item.angulo || "Geral").replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#8F9CAE]">{item.oferta || "Site + IA"}</td>
                    <td className="py-3 px-4">
                      {item.status === "enviado" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30">
                          <CheckCircle2 className="size-3" /> Enviado
                        </span>
                      ) : item.status === "falhou" ? (
                        <span
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30"
                          title={item.erro || "Falha"}
                        >
                          <XCircle className="size-3" /> Falhou
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#6B7280]/20 text-[#9CA3AF] border border-[#6B7280]/30">
                          <Clock className="size-3" /> Pendente
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-[#8F9CAE] font-mono text-[11px]">
                      {item.enviado_em
                        ? new Date(item.enviado_em).toLocaleTimeString("pt-PT", {
                            day: "2-digit",
                            month: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "—"}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setPreviewLead(item)}
                        className="p-1.5 rounded-md hover:bg-[#252C38] text-[#8F9CAE] hover:text-white transition-colors"
                        title="Ver Mensagem de Prospecção"
                      >
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MODAL: PREVIEW DA MENSAGEM DO LEAD ─────────────────────────── */}
      {previewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#0E121A] border border-[#252C38] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#252C38] flex items-center justify-between bg-[#161C26]">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#3B82F6]">
                  Lead #{previewLead.id} • Bloco {previewLead.bloco}
                </span>
                <h3 className="text-base font-bold text-white">{previewLead.empresa}</h3>
                <p className="text-xs text-[#8F9CAE]">
                  Telefone: {previewLead.telefone} • Ângulo: {(previewLead.angulo || "").replace(/_/g, " ")}
                </p>
              </div>
              <button
                onClick={() => setPreviewLead(null)}
                className="p-1.5 rounded-lg hover:bg-[#252C38] text-[#8F9CAE] hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Mensagem */}
            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#8F9CAE] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-[#F59E0B]" />
                  Mensagem Personalizada de Abordagem:
                </label>
                <div className="bg-[#080A0F] border border-[#252C38] rounded-lg p-4 font-sans text-xs sm:text-sm text-[#F5F7FA] whitespace-pre-line leading-relaxed">
                  {previewLead.mensagem}
                </div>
              </div>

              {/* Detalhes Adicionais */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#161C26]/50 p-3 rounded-lg border border-[#252C38]">
                <div>
                  <span className="text-[#8F9CAE] block">Oferta Planeada:</span>
                  <span className="font-semibold text-white">{previewLead.oferta || "Site + Automação"}</span>
                </div>
                <div>
                  <span className="text-[#8F9CAE] block">Localização:</span>
                  <span className="font-semibold text-white">{previewLead.cidade || "Angola"}</span>
                </div>
                {previewLead.site && (
                  <div className="col-span-2">
                    <span className="text-[#8F9CAE] block">Site Atual:</span>
                    <a
                      href={previewLead.site}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#3B82F6] hover:underline flex items-center gap-1 mt-0.5 truncate"
                    >
                      <Globe className="size-3 shrink-0" />
                      <span className="truncate">{previewLead.site}</span>
                      <ExternalLink className="size-2.5 shrink-0" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#252C38] bg-[#161C26] flex items-center justify-between">
              <a
                href={`https://wa.me/${previewLead.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(
                  previewLead.mensagem,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold"
              >
                <Send className="size-3.5" />
                <span>Testar Envio Manual no WhatsApp</span>
              </a>
              <button
                onClick={() => setPreviewLead(null)}
                className="px-4 py-1.5 rounded-lg bg-[#252C38] hover:bg-[#323B4B] text-white text-xs font-medium"
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
