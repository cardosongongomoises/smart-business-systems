import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Send,
  Database,
  Search,
  ShieldCheck,
  Smartphone,
  Play,
  Pause,
  Layers,
  ChevronDown,
  Info,
  Clock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import {
  verifyWhatsAppNumber,
  WhatsAppVerificationResult,
  detectCarrier,
} from "./whatsappVerification";
import {
  createCampaignWithVerifiedQueue,
  fetchCampanhasComStats,
  subscribeToDisparosRealtime,
  updateCampanhaStatus,
  DisparoCampanha,
} from "@/lib/supabaseService";

interface ParsedLeadCandidate {
  empresa: string;
  telefone: string;
  mensagem: string;
  oferta?: string;
  angulo?: string;
  cidade?: string;
  rawText?: string;
  verification: WhatsAppVerificationResult;
}

export function CampaignsView() {
  const [campaignName, setCampaignName] = useState("");
  const [campaignDesc, setCampaignDesc] = useState("");
  const [rawText, setRawText] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeTab, setActiveTab] = useState<"preview" | "discarded" | "campaigns">("preview");
  const [isSyncing, setIsSyncing] = useState(false);
  const [campaignsList, setCampaignsList] = useState<DisparoCampanha[]>([]);
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(false);
  const [filterSearch, setFilterSearch] = useState("");

  // Parser multi-formato (.MD / .TXT / Tabela / Blocos / Delimitado)
  const parsedLeads = useMemo<ParsedLeadCandidate[]>(() => {
    if (!rawText.trim()) return [];

    const lines = rawText.split(/\r?\n/);
    const candidates: Array<{
      empresa: string;
      telefone: string;
      mensagem: string;
      oferta?: string;
      angulo?: string;
      cidade?: string;
    }> = [];

    // 1. Tentar detectar título de campanha no cabeçalho (# Campanha ...)
    const titleMatch = rawText.match(/^#\s+(.+)$/m);
    if (titleMatch && !campaignName) {
      setTimeout(() => {
        setCampaignName((prev) => (prev ? prev : titleMatch[1].trim()));
      }, 0);
    }

    // FORMATO A: Tabela Markdown (| Empresa | Telefone | Mensagem | ...)
    const tableLines = lines.filter((l) => l.trim().startsWith("|") && l.trim().endsWith("|"));
    if (tableLines.length >= 2) {
      const headerCols = tableLines[0]
        .split("|")
        .map((c) => c.trim().toLowerCase())
        .filter(Boolean);

      const empIdx = headerCols.findIndex((c) => c.includes("empresa") || c.includes("nome") || c.includes("cliente"));
      const telIdx = headerCols.findIndex((c) => c.includes("tel") || c.includes("cel") || c.includes("fone") || c.includes("whatsapp"));
      const msgIdx = headerCols.findIndex((c) => c.includes("msg") || c.includes("mensagem") || c.includes("texto"));
      const oftIdx = headerCols.findIndex((c) => c.includes("oferta") || c.includes("plano") || c.includes("pacote"));
      const angIdx = headerCols.findIndex((c) => c.includes("angulo") || c.includes("ângulo") || c.includes("gancho"));
      const cidIdx = headerCols.findIndex((c) => c.includes("cidade") || c.includes("local"));

      for (let i = 1; i < tableLines.length; i++) {
        const rowLine = tableLines[i];
        if (rowLine.includes("---")) continue;
        const cols = rowLine.split("|").map((c) => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length);

        if (cols.length >= 2) {
          const emp = empIdx !== -1 && cols[empIdx] ? cols[empIdx] : cols[0] || "Empresa";
          const tel = telIdx !== -1 && cols[telIdx] ? cols[telIdx] : cols[1] || "";
          const msg = msgIdx !== -1 && cols[msgIdx] ? cols[msgIdx] : cols[2] || `Olá ${emp}, temos uma proposta para vocês.`;

          if (tel && tel.replace(/\D/g, "").length >= 7) {
            candidates.push({
              empresa: emp,
              telefone: tel,
              mensagem: msg,
              oferta: oftIdx !== -1 ? cols[oftIdx] : undefined,
              angulo: angIdx !== -1 ? cols[angIdx] : undefined,
              cidade: cidIdx !== -1 ? cols[cidIdx] : undefined,
            });
          }
        }
      }
    }

    // FORMATO B: Blocos Markdown (### Empresa ... - Telefone: ... - Mensagem: ...)
    if (candidates.length === 0 && (rawText.includes("###") || rawText.includes("Telefone:") || rawText.includes("telefone:"))) {
      const blocks = rawText.split(/(?=###|\n##\s+)/);
      for (const block of blocks) {
        if (!block.trim()) continue;
        const nameMatch = block.match(/#{2,3}\s+(.+?)(?:\r?\n|$)/);
        const telMatch = block.match(/(?:Telefone|telefone|WhatsApp|Tel):\s*([+\d\s\(\)-]+)/i);
        const msgMatch = block.match(/(?:Mensagem|mensagem|Texto):\s*([\s\S]+?)(?=\n(?:[A-Z][a-z]+:|$))/i);
        const cidMatch = block.match(/(?:Cidade|cidade):\s*(.+?)(?:\r?\n|$)/i);
        const angMatch = block.match(/(?:Angulo|angulo|Ângulo):\s*(.+?)(?:\r?\n|$)/i);

        if (telMatch && telMatch[1]) {
          const emp = nameMatch ? nameMatch[1].trim() : "Empresa Prospect";
          const tel = telMatch[1].trim();
          const msg = msgMatch ? msgMatch[1].trim() : `Olá ${emp}, temos uma proposta personalizada.`;
          candidates.push({
            empresa: emp,
            telefone: tel,
            mensagem: msg,
            cidade: cidMatch ? cidMatch[1].trim() : undefined,
            angulo: angMatch ? angMatch[1].trim() : undefined,
          });
        }
      }
    }

    // FORMATO C: Linhas delimitadas por ponto-e-vírgula ou vírgula (Empresa;Telefone;Mensagem)
    if (candidates.length === 0) {
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) continue;

        let parts = trimmed.split(";");
        if (parts.length < 2) {
          parts = trimmed.split(",");
        }

        if (parts.length >= 2) {
          const emp = parts[0]?.trim() || "Empresa";
          const tel = parts[1]?.trim() || "";
          const msg = parts[2]?.trim() || `Olá ${emp}, temos uma solução para acelerar o seu negócio.`;

          if (tel && tel.replace(/\D/g, "").length >= 7) {
            candidates.push({
              empresa: emp,
              telefone: tel,
              mensagem: msg,
              cidade: parts[3]?.trim(),
            });
          }
        }
      }
    }

    // 2. Executa a verificação estrita de WhatsApp em cada lead
    return candidates.map((c) => {
      const verification = verifyWhatsAppNumber(c.telefone);
      return {
        ...c,
        verification,
      };
    });
  }, [rawText, campaignName]);

  // SEPARAÇÃO: Apenas leads válidos entram no Supabase; os sem WhatsApp são DESCARTADOS antes!
  const validLeads = useMemo(() => {
    return parsedLeads.filter(
      (l) => l.verification.isRegistered && l.verification.lineType !== "landline" && l.verification.status !== "not_registered"
    );
  }, [parsedLeads]);

  const discardedLeads = useMemo(() => {
    return parsedLeads.filter(
      (l) => !l.verification.isRegistered || l.verification.lineType === "landline" || l.verification.status === "not_registered"
    );
  }, [parsedLeads]);

  // Carregar campanhas do Supabase
  const loadCampaigns = useCallback(async () => {
    setIsLoadingCampaigns(true);
    try {
      const data = await fetchCampanhasComStats();
      setCampaignsList(data);
    } catch (err) {
      console.error("Erro ao carregar campanhas:", err);
    } finally {
      setIsLoadingCampaigns(false);
    }
  }, []);

  useEffect(() => {
    loadCampaigns();
    const unsubscribe = subscribeToDisparosRealtime(() => {
      loadCampaigns();
    });
    return () => unsubscribe();
  }, [loadCampaigns]);

  // Manipulação de Upload de Arquivo (.MD / .TXT)
  const handleFileUpload = (file: File) => {
    if (!file) return;
    const isMd = file.name.endsWith(".md") || file.name.endsWith(".markdown");
    const isTxt = file.name.endsWith(".txt");

    if (!isMd && !isTxt) {
      toast.error("Formato inválido! Envie apenas arquivos .MD ou .TXT");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = (e.target?.result as string) || "";
      setRawText(content);
      if (!campaignName) {
        const cleanName = file.name.replace(/\.(md|txt|markdown)$/i, "").replace(/[-_]/g, " ");
        setCampaignName(cleanName);
      }
      toast.success(`Arquivo "${file.name}" carregado com sucesso!`);
    };
    reader.onerror = () => {
      toast.error("Erro ao ler arquivo selecionado.");
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Sincronização em Tempo Real com o Supabase
  const handleSyncToSupabase = async () => {
    if (validLeads.length === 0) {
      toast.error("Nenhum lead com WhatsApp válido para sincronizar!");
      return;
    }

    const finalName = campaignName.trim() || `Campanha ${new Date().toLocaleDateString("pt-PT")}`;
    const finalDesc = campaignDesc.trim() || `Campanha importada via .MD/.TXT com ${validLeads.length} contatos verificados no WhatsApp.`;

    setIsSyncing(true);
    try {
      const res = await createCampaignWithVerifiedQueue(finalName, finalDesc, validLeads);

      if (res.success) {
        toast.success(
          `🚀 Campanha #${res.campaignId} sincronizada com sucesso! ${res.insertedCount} leads adicionados à fila de disparo.`
        );
        if (discardedLeads.length > 0) {
          toast.info(
            `🛡️ ${discardedLeads.length} número(s) sem WhatsApp foram descartados e NÃO entraram no Supabase.`
          );
        }
        setRawText("");
        setCampaignName("");
        setCampaignDesc("");
        setActiveTab("campaigns");
        loadCampaigns();
      } else {
        toast.error(`Falha ao sincronizar com o Supabase: ${res.error || "Erro desconhecido"}`);
      }
    } catch (err: any) {
      toast.error(`Erro na sincronização: ${err?.message || String(err)}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleStatus = async (camp: DisparoCampanha) => {
    const nextStatus = camp.status === "em_andamento" ? "pausada" : "em_andamento";
    const ok = await updateCampanhaStatus(camp.id, nextStatus);
    if (ok) {
      toast.success(`Campanha #${camp.id} alterada para: ${nextStatus}`);
      loadCampaigns();
    } else {
      toast.error("Não foi possível alterar status no Supabase.");
    }
  };

  const handleLoadExample = () => {
    const sampleMd = `# Campanha Clínicas & Serviços Luanda

| Empresa | Telefone | Mensagem | Oferta | Cidade |
|---|---|---|---|---|
| Centro Dentário Alvalade | +244923111222 | Olá! Notamos uma excelente oportunidade para atrair mais clientes em Luanda. Podemos apresentar? | Profissional | Luanda |
| Clínica Estética Talatona | +244934024904 | Boa tarde! Gostaríamos de apresentar uma proposta de automação comercial para sua clínica. | Domínio IA | Talatona |
| Consultoria Global Fixa | +244222090900 | Olá equipe da Consultoria! Temos uma proposta digital especial para sua empresa. | Presença | Luanda |
| Dra. Mariana Odonto | +244941845366 | Bom dia, Dra. Mariana! Vi que tem ótima reputação em Luanda e preparei uma proposta consultiva. | Automate Pro | Luanda |
| VIP Saúde & Estética | +244955552555 | Olá VIP Saúde! Fizemos uma auditoria de presença digital e encontramos pontos valiosos. | Profissional | Talatona |
`;
    setRawText(sampleMd);
    setCampaignName("Exemplo Clínicas Luanda - Set/2026");
    setCampaignDesc("Demonstração de filtragem automática: números fixos e sem WhatsApp serão descartados.");
    toast.info("Exemplo Markdown carregado! Veja a auditoria de números abaixo.");
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0B0E14] text-white overflow-y-auto">
      {/* Top Banner & Header */}
      <div className="p-6 pb-4 border-b border-[#252C38] bg-gradient-to-r from-[#111622] via-[#141A28] to-[#111622]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Send className="w-5 h-5" />
              </span>
              <h1 className="text-xl font-bold text-white tracking-wide">
                Campanhas & Disparos em Tempo Real
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                Supabase Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Envio de campanhas no formato <span className="text-slate-200 font-mono">.MD</span> ou{" "}
              <span className="text-slate-200 font-mono">.TXT</span> com validação prévia de WhatsApp (números fixos ou sem conta são descartados antes de gravar).
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadExample}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#303846] bg-[#1A2230] hover:bg-[#222C3E] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Carregar Exemplo .MD
            </button>
            <button
              onClick={loadCampaigns}
              disabled={isLoadingCampaigns}
              className="px-3 py-1.5 text-xs rounded-lg border border-[#303846] bg-[#1A2230] hover:bg-[#222C3E] text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingCampaigns ? "animate-spin text-emerald-400" : ""}`} />
              Atualizar Supabase
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mt-5 border-b border-[#252C38]">
          <button
            onClick={() => setActiveTab("preview")}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 transition-all border-b-2 cursor-pointer ${
              activeTab === "preview"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Leads Aprovados WhatsApp
            {validLeads.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px]">
                {validLeads.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("discarded")}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 transition-all border-b-2 cursor-pointer ${
              activeTab === "discarded"
                ? "border-rose-500 text-rose-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            Descartados Sem WhatsApp
            {discardedLeads.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-rose-500/20 text-rose-300 text-[10px]">
                {discardedLeads.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("campaigns")}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-2 transition-all border-b-2 cursor-pointer ${
              activeTab === "campaigns"
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            Campanhas no Supabase
            {campaignsList.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-blue-300 text-[10px]">
                {campaignsList.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {activeTab !== "campaigns" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Coluna Esquerda: Upload e Configuração */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Arquivo de Mensagens (.MD ou .TXT)
                  </h2>
                  <span className="text-[11px] text-slate-400">
                    Arrastar ou colar texto abaixo
                  </span>
                </div>

                {/* Dropzone */}
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-5 text-center transition-all cursor-pointer ${
                    isDragOver
                      ? "border-emerald-500 bg-emerald-500/5"
                      : "border-[#2A3444] hover:border-[#3D4B62] bg-[#0E121A]/50"
                  }`}
                  onClick={() => document.getElementById("file-campaign-input")?.click()}
                >
                  <input
                    id="file-campaign-input"
                    type="file"
                    accept=".md,.txt,.markdown"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                  <Upload className="w-7 h-7 mx-auto mb-2 text-slate-400" />
                  <p className="text-xs font-medium text-slate-200">
                    Clique para selecionar ou arraste o arquivo <span className="text-emerald-400 font-mono">.MD</span> / <span className="text-emerald-400 font-mono">.TXT</span>
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Suporta tabelas Markdown, blocos "Telefone: ..." ou CSV/ponto-e-vírgula.
                  </p>
                </div>

                {/* Inputs de Identificação */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">
                      Nome da Campanha:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Clínicas Dentárias Luanda"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      className="w-full bg-[#0E121A] border border-[#252C38] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-slate-400 block mb-1">
                      Descrição / Observações:
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Framework v9 - Set/2026"
                      value={campaignDesc}
                      onChange={(e) => setCampaignDesc(e.target.value)}
                      className="w-full bg-[#0E121A] border border-[#252C38] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Editor / Textarea do Conteúdo */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-medium text-slate-400">
                      Conteúdo Markdown / Texto:
                    </label>
                    {rawText && (
                      <button
                        onClick={() => setRawText("")}
                        className="text-[10px] text-rose-400 hover:underline cursor-pointer"
                      >
                        Limpar texto
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={8}
                    value={rawText}
                    onChange={(e) => setRawText(e.target.value)}
                    placeholder="Cole aqui o conteúdo em Markdown ou texto..."
                    className="w-full bg-[#0E121A] border border-[#252C38] rounded-lg p-3 text-xs font-mono text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Coluna Direita: Auditoria & Verificação em Tempo Real */}
            <div className="lg:col-span-6 space-y-4">
              {/* Cards de Métricas do Arquivo */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[#131824] border border-[#252C38] rounded-xl p-3.5">
                  <span className="text-[10px] font-medium text-slate-400 block">Total Identificado</span>
                  <div className="text-xl font-bold text-white mt-1">{parsedLeads.length}</div>
                  <span className="text-[10px] text-slate-500">linhas de prospect</span>
                </div>

                <div className="bg-[#131824] border border-emerald-500/20 rounded-xl p-3.5">
                  <span className="text-[10px] font-medium text-emerald-400 block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Aprovados WhatsApp
                  </span>
                  <div className="text-xl font-bold text-emerald-400 mt-1">{validLeads.length}</div>
                  <span className="text-[10px] text-emerald-500/80">entram no Supabase</span>
                </div>

                <div className="bg-[#131824] border border-rose-500/20 rounded-xl p-3.5">
                  <span className="text-[10px] font-medium text-rose-400 block flex items-center gap-1">
                    <XCircle className="w-3 h-3" /> Descartados
                  </span>
                  <div className="text-xl font-bold text-rose-400 mt-1">{discardedLeads.length}</div>
                  <span className="text-[10px] text-rose-500/80">bloqueados antes do DB</span>
                </div>
              </div>

              {/* Box Informativo do Filtro de Segurança */}
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4 text-xs text-emerald-300/90 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Blindagem Ativa de WhatsApp
                </div>
                <p className="text-[11px] leading-relaxed text-emerald-400/80">
                  O sistema valida operadoras móveis de Angola (+244 92/93/94 Unitel, 95 Africell, 91/99 Movicel) e descarta automaticamente telefones fixos (222, 227...) e números catalogados sem WhatsApp. Apenas os leads válidos são inseridos na tabela <span className="font-mono bg-emerald-900/40 px-1 py-0.5 rounded">disparo_fila</span>.
                </p>
              </div>

              {/* Botão de Ação Primária: Sincronizar com Supabase */}
              <div className="bg-[#131824] border border-[#252C38] rounded-xl p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-200">Sincronização com Supabase</h3>
                    <p className="text-[11px] text-slate-400">
                      Disponibiliza a fila instantaneamente para o bot de prospecção.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    {validLeads.length} prontos
                  </span>
                </div>

                <button
                  onClick={handleSyncToSupabase}
                  disabled={isSyncing || validLeads.length === 0}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    validLeads.length === 0
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                      : isSyncing
                      ? "bg-emerald-700 text-white cursor-wait"
                      : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                  }`}
                >
                  {isSyncing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Gravando no Supabase em Tempo Real...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Sincronizar Campanha ({validLeads.length} Leads Validados)
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tabela de Leads Aprovados */}
        {activeTab === "preview" && (
          <div className="bg-[#131824] border border-[#252C38] rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#252C38] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Leads Aprovados para Disparo ({validLeads.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Estes são os contatos que passarão pelo bot e entrarão na fila do Supabase.
                </p>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar empresa ou telefone..."
                  value={filterSearch}
                  onChange={(e) => setFilterSearch(e.target.value)}
                  className="bg-[#0E121A] border border-[#252C38] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500 w-52"
                />
              </div>
            </div>

            <div className="overflow-x-auto max-h-96">
              {validLeads.length === 0 ? (
                <div className="p-8 text-center text-slate-500 text-xs">
                  Nenhum lead carregado ou validado ainda. Envie um arquivo .MD/.TXT ou use o botão "Carregar Exemplo .MD".
                </div>
              ) : (
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0E121A] text-slate-400 font-medium text-[11px] border-b border-[#252C38] sticky top-0">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Empresa</th>
                      <th className="p-3">Telefone Normalizado</th>
                      <th className="p-3">Operadora</th>
                      <th className="p-3">Cidade / Oferta</th>
                      <th className="p-3">Mensagem a Enviar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D2433]">
                    {validLeads
                      .filter(
                        (l) =>
                          l.empresa.toLowerCase().includes(filterSearch.toLowerCase()) ||
                          l.telefone.includes(filterSearch)
                      )
                      .map((lead, idx) => (
                        <tr key={idx} className="hover:bg-[#161D2C]/60 transition-colors">
                          <td className="p-3 text-slate-500 font-mono text-[11px]">{idx + 1}</td>
                          <td className="p-3 font-semibold text-white">{lead.empresa}</td>
                          <td className="p-3 font-mono text-emerald-400 flex items-center gap-1.5">
                            <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                            {lead.verification.formattedNumber || lead.telefone}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20 font-medium">
                              {lead.verification.carrier}
                            </span>
                          </td>
                          <td className="p-3 text-slate-400">
                            {lead.cidade || "Angola"} {lead.oferta ? `• ${lead.oferta}` : ""}
                          </td>
                          <td className="p-3 max-w-xs truncate text-slate-400" title={lead.mensagem}>
                            {lead.mensagem}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Tabela de Descartados / Sem WhatsApp */}
        {activeTab === "discarded" && (
          <div className="bg-[#131824] border border-rose-500/30 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-[#252C38] bg-rose-500/5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-rose-400 flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  Números Descartados da Importação ({discardedLeads.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Estes números foram bloqueados pelo filtro anti-erro e <span className="text-rose-300 font-semibold">NÃO serão gravados no Supabase</span>.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto max-h-96">
              {discardedLeads.length === 0 ? (
                <div className="p-8 text-center text-emerald-400 text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Nenhum número descartado! Todos os números informados são válidos no WhatsApp.
                </div>
              ) : (
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0E121A] text-slate-400 font-medium text-[11px] border-b border-[#252C38] sticky top-0">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Empresa</th>
                      <th className="p-3">Telefone Original</th>
                      <th className="p-3">Operadora / Tipo</th>
                      <th className="p-3">Motivo do Descarte (Não enviado ao Supabase)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1D2433]">
                    {discardedLeads.map((lead, idx) => (
                      <tr key={idx} className="hover:bg-rose-500/5 transition-colors">
                        <td className="p-3 text-slate-500 font-mono text-[11px]">{idx + 1}</td>
                        <td className="p-3 font-semibold text-slate-300">{lead.empresa}</td>
                        <td className="p-3 font-mono text-rose-400">{lead.telefone}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] border border-rose-500/20 font-medium">
                            {lead.verification.carrier}
                          </span>
                        </td>
                        <td className="p-3 text-rose-300 text-[11px] font-medium">
                          {lead.verification.reason}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Aba de Campanhas no Supabase (Live Queue Status) */}
        {activeTab === "campaigns" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-400" />
                  Campanhas Registradas no Supabase ({campaignsList.length})
                </h3>
                <p className="text-[11px] text-slate-400">
                  Monitoramento em tempo real da fila de envio processada pelo bot de WhatsApp.
                </p>
              </div>

              <button
                onClick={() => setActiveTab("preview")}
                className="px-3 py-1.5 text-xs rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                Nova Campanha (.MD / .TXT)
              </button>
            </div>

            {campaignsList.length === 0 ? (
              <div className="bg-[#131824] border border-[#252C38] rounded-xl p-12 text-center text-slate-500 text-xs">
                Nenhuma campanha encontrada no Supabase. Crie uma na aba de upload!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaignsList.map((camp) => {
                  const stats = camp.stats || { total: camp.total || 0, pendente: 0, enviado: 0, falhou: 0 };
                  const percent = stats.total > 0 ? Math.round((stats.enviado / stats.total) * 100) : 0;

                  return (
                    <div
                      key={camp.id}
                      className="bg-[#131824] border border-[#252C38] rounded-xl p-4 flex flex-col justify-between space-y-4 hover:border-[#3D4B62] transition-colors"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-sm text-white">
                            #{camp.id} — {camp.nome}
                          </h4>
                          <span
                            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                              camp.status === "em_andamento"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                : camp.status === "pausada"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                            }`}
                          >
                            {camp.status.toUpperCase()}
                          </span>
                        </div>

                        {camp.descricao && (
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {camp.descricao}
                          </p>
                        )}
                      </div>

                      {/* Progresso da Fila */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-medium">
                          <span className="text-slate-400">Progresso do Envio</span>
                          <span className="text-emerald-400 font-mono">{percent}%</span>
                        </div>
                        <div className="w-full bg-[#0E121A] h-2 rounded-full overflow-hidden border border-[#252C38]">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-1 pt-2 text-center text-[10px]">
                          <div className="bg-[#0E121A] p-1.5 rounded border border-[#252C38]">
                            <span className="text-slate-500 block">Pendentes</span>
                            <span className="font-mono text-slate-200 font-bold">{stats.pendente}</span>
                          </div>
                          <div className="bg-[#0E121A] p-1.5 rounded border border-[#252C38]">
                            <span className="text-emerald-500 block">Enviados</span>
                            <span className="font-mono text-emerald-400 font-bold">{stats.enviado}</span>
                          </div>
                          <div className="bg-[#0E121A] p-1.5 rounded border border-[#252C38]">
                            <span className="text-rose-500 block">Falhados</span>
                            <span className="font-mono text-rose-400 font-bold">{stats.falhou}</span>
                          </div>
                        </div>
                      </div>

                      {/* Botões de Ação */}
                      <div className="pt-2 border-t border-[#252C38] flex items-center justify-between">
                        <span className="text-[10px] text-slate-500">
                          Total: <strong className="text-slate-300">{stats.total}</strong> contatos
                        </span>

                        <button
                          onClick={() => handleToggleStatus(camp)}
                          className="px-2.5 py-1 text-[11px] font-medium rounded border border-[#303846] bg-[#1A2230] hover:bg-[#222C3E] text-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {camp.status === "em_andamento" ? (
                            <>
                              <Pause className="w-3 h-3 text-amber-400" />
                              Pausar
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-emerald-400" />
                              Ativar Disparo
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
