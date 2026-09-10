import { useState, useMemo, useRef, useEffect } from "react";
import {
  GraduationCap,
  Sparkles,
  FileText,
  Upload,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Zap,
  BookOpen,
  Edit3,
  Trash2,
  Download,
  Eye,
  Code,
  X,
  Bot,
  Play,
  Copy,
  Check,
  Power,
  ShieldAlert,
} from "lucide-react";
import { VendedorSkillDoc, KnowledgeType, KnowledgeCategory } from "./types";
import {
  fetchVendedorSkills,
  saveVendedorSkill,
  deleteVendedorSkill,
  toggleVendedorSkillActive,
} from "@/lib/supabaseService";
import { toast } from "sonner";

const categoryLabels: Record<KnowledgeCategory, string> = {
  qualificacao: "Qualificação & Diagnóstico",
  objecoes: "Contorno de Objeções",
  fechamento: "Fechamento & Agendamento",
  rapport: "Rapport & Tom de Voz",
  negociacao: "Negociação Comercial",
};

export function KnowledgeBaseView() {
  const [skills, setSkills] = useState<VendedorSkillDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<"all" | KnowledgeType>("all");
  const [selectedCategory, setSelectedCategory] = useState<"all" | KnowledgeCategory>("all");

  // Modal de Leitura / Edição
  const [viewingDoc, setViewingDoc] = useState<VendedorSkillDoc | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedTrigger, setEditedTrigger] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal de Criação
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newFilename, setNewFilename] = useState("");
  const [newType, setNewType] = useState<KnowledgeType>("skill");
  const [newCategory, setNewCategory] = useState<KnowledgeCategory>("qualificacao");
  const [newTrigger, setNewTrigger] = useState("");
  const [newContent, setNewContent] = useState("");

  // Sandbox de Teste de Ativação
  const [sandboxPrompt, setSandboxPrompt] = useState(
    "Achei a vossa proposta muito cara. Um amigo meu faz um site por 50 mil kwanzas.",
  );
  const [sandboxResult, setSandboxResult] = useState<{
    triggeredSkill: VendedorSkillDoc | null;
    analysis: string;
    suggestedResponse: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carrega as skills do Supabase / Local
  const loadSkills = async () => {
    setIsLoading(true);
    try {
      const res = await fetchVendedorSkills();
      setSkills(res.skills);
    } catch (err) {
      console.error("Erro ao carregar skills:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  // Filtros
  const filteredSkills = useMemo(() => {
    return skills.filter((item) => {
      if (selectedType !== "all" && item.type !== selectedType) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchFilename = item.filename.toLowerCase().includes(q);
        const matchContent = item.contentMd.toLowerCase().includes(q);
        const matchTrigger = (item.triggerCondition || "").toLowerCase().includes(q);
        return matchTitle || matchFilename || matchContent || matchTrigger;
      }
      return true;
    });
  }, [skills, selectedType, selectedCategory, searchQuery]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = skills.length;
    const active = skills.filter((s) => s.isActive).length;
    const executableSkills = skills.filter((s) => s.type === "skill").length;
    const manuals = skills.filter((s) => s.type === "manual").length;
    return { total, active, executableSkills, manuals };
  }, [skills]);

  // Toggle Ativo/Inativo
  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const nextState = !currentActive;
    setSkills((prev) => prev.map((s) => (s.id === id ? { ...s, isActive: nextState } : s)));
    await toggleVendedorSkillActive(id, nextState);
    toast.success(nextState ? "Skill ativada na IA de atendimento" : "Skill pausada");
  };

  // Remover
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Deseja realmente remover o arquivo "${title}"?`)) return;
    setSkills((prev) => prev.filter((s) => s.id !== id));
    await deleteVendedorSkill(id);
    toast.success("Documento removido com sucesso");
    if (viewingDoc?.id === id) setViewingDoc(null);
  };

  // Abrir Leitor / Editor
  const handleOpenDoc = (doc: VendedorSkillDoc) => {
    setViewingDoc(doc);
    setEditedTitle(doc.title);
    setEditedTrigger(doc.triggerCondition || "");
    setEditedContent(doc.contentMd);
    setIsEditing(false);
  };

  // Salvar Edição
  const handleSaveEdit = async () => {
    if (!viewingDoc) return;
    const updated: VendedorSkillDoc = {
      ...viewingDoc,
      title: editedTitle.trim() || viewingDoc.title,
      triggerCondition: editedTrigger.trim(),
      contentMd: editedContent,
      updatedAt: new Date().toLocaleDateString("pt-PT"),
    };
    setSkills((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    setViewingDoc(updated);
    setIsEditing(false);
    await saveVendedorSkill(updated);
    toast.success("Arquivo .md salvo e sincronizado com o Supabase!");
  };

  // Download .md
  const handleDownloadMd = (doc: VendedorSkillDoc) => {
    const element = document.createElement("a");
    const file = new Blob([doc.contentMd], { type: "text/markdown;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = doc.filename.endsWith(".md") ? doc.filename : `${doc.filename}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success(`Download de ${doc.filename} iniciado.`);
  };

  // Upload .md do computador
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith(".md") && !file.name.endsWith(".markdown") && !file.name.endsWith(".txt")) {
      toast.error("Por favor, selecione um arquivo no formato .md (Markdown).");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = (event.target?.result as string) || "";
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      const formattedTitle = baseName
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const newDoc: VendedorSkillDoc = {
        id: `skill-up-${Date.now()}`,
        title: formattedTitle,
        filename: file.name.endsWith(".md") ? file.name : `${baseName}.md`,
        type: file.name.toLowerCase().includes("skill") ? "skill" : "manual",
        category: "qualificacao",
        triggerCondition: "Gatilho configurado via upload",
        contentMd: content,
        isActive: true,
        createdAt: new Date().toLocaleDateString("pt-PT"),
        updatedAt: new Date().toLocaleDateString("pt-PT"),
      };

      setSkills((prev) => [newDoc, ...prev]);
      await saveVendedorSkill(newDoc);
      toast.success(`Arquivo .md "${file.name}" importado com sucesso!`);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsText(file);
  };

  // Criar nova Skill
  const handleCreateNewSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast.error("Insira o título da skill ou arquivo .md");
      return;
    }

    const cleanFilename = newFilename.trim()
      ? newFilename.endsWith(".md")
        ? newFilename
        : `${newFilename}.md`
      : `${newTitle.toLowerCase().replace(/[^a-z0-9]/g, "-")}.md`;

    const defaultMd =
      newContent.trim() ||
      `# ${newTitle}\n<!-- Documento de Capacitação do Vendedor IA -->\n\n## 1. Objectivo\nOrientar a postura comercial e técnicas de atendimento da IA.\n\n## 2. Gatilho de Ativação\n${newTrigger || "Quando o cliente realizar perguntas comerciais."}\n\n## 3. Playbook de Resposta\n- Ouça a dor do cliente com atenção e empatia.\n- Responda em no máximo 2 a 3 frases claras.\n- Conduza com elegância para o Diagnóstico Estratégico no Google Meet.`;

    const createdDoc: VendedorSkillDoc = {
      id: `skill-${Date.now()}`,
      title: newTitle.trim(),
      filename: cleanFilename,
      type: newType,
      category: newCategory,
      triggerCondition: newTrigger.trim() || "Gatilho comercial padrão",
      contentMd: defaultMd,
      isActive: true,
      createdAt: new Date().toLocaleDateString("pt-PT"),
      updatedAt: new Date().toLocaleDateString("pt-PT"),
    };

    setSkills((prev) => [createdDoc, ...prev]);
    await saveVendedorSkill(createdDoc);
    toast.success(`Skill "${createdDoc.title}" cadastrada no sistema!`);

    // Limpar form
    setNewTitle("");
    setNewFilename("");
    setNewTrigger("");
    setNewContent("");
    setIsCreateModalOpen(false);
  };

  // Testar no Sandbox
  const handleTestSandbox = () => {
    if (!sandboxPrompt.trim()) return;

    const lower = sandboxPrompt.toLowerCase();
    const activeList = skills.filter((s) => s.isActive);

    let match = activeList.find((s) => {
      if (lower.includes("caro") || lower.includes("preço") || lower.includes("barato") || lower.includes("orçamento")) {
        return s.category === "objecoes";
      }
      if (lower.includes("agendar") || lower.includes("reunião") || lower.includes("contratar") || lower.includes("horário")) {
        return s.category === "fechamento";
      }
      if (lower.includes("como funciona") || lower.includes("serviço") || lower.includes("site") || lower.includes("ia")) {
        return s.category === "qualificacao";
      }
      return false;
    });

    if (!match && activeList.length > 0) {
      match = activeList[0];
    }

    if (match) {
      let analysisText = "";
      let reply = "";

      if (match.category === "objecoes") {
        analysisText =
          "Objeção de valor detectada. A IA ativou a técnica de ancoragem em ROI (retorno sobre investimento) e diferenciação entre site vitrine vs máquina de vendas 24h.";
        reply =
          "Compreendo perfeitamente a sua atenção ao custo. A grande diferença é que a Agentes Digital não entrega apenas uma página estática, mas uma estrutura com inteligência artificial que atende, qualifica e agenda reuniões no WhatsApp 24 horas por dia. Se esse sistema trouxer apenas 2 clientes a mais no mês, o retorno já cobre o investimento por completo. Faz sentido avaliarmos isso num diagnóstico de 20 minutos?";
      } else if (match.category === "fechamento") {
        analysisText =
          "Intenção de avanço detectada. A IA ativou o framework de Alternativa Dupla (duas opções fechadas de horário para evitar paralisia de escolha).";
        reply =
          "Excelente! Para definirmos a arquitetura ideal para o seu negócio, nós realizamos uma sessão de Diagnóstico Estratégico Gratuito (30 min) via Google Meet. Para si seria mais conveniente amanhã às 11h00 ou na quinta-feira às 15h30?";
      } else {
        analysisText =
          "Fase de qualificação inicial. A IA ativou o framework SPIN Selling para investigar a dor do negócio antes de falar de pacotes.";
        reply =
          "Com todo o gosto! Para eu orientar com precisão para o seu cenário: qual é a área de atuação da sua empresa e como lidam hoje com as mensagens dos clientes fora do horário comercial?";
      }

      setSandboxResult({
        triggeredSkill: match,
        analysis: analysisText,
        suggestedResponse: reply,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#080A0F] p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
      {/* 1. Header Conceitual da Escola de Vendas da IA */}
      <div className="rounded-[16px] border border-[#8B5CF6]/35 bg-[#151A23] p-5 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.22)] relative overflow-hidden">
        <div className="pointer-events-none absolute -right-8 -bottom-8 size-48 rounded-full bg-[#8B5CF6]/10 blur-3xl" />
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="size-12 rounded-[12px] bg-gradient-to-br from-[#8B5CF6]/25 to-[#3B82F6]/25 border border-[#8B5CF6]/40 flex items-center justify-center text-[#C084FC] shrink-0 shadow-sm">
              <GraduationCap className="size-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-lg font-bold text-[#F5F7FA]">
                  Capacitação & Base de Conhecimento do Vendedor IA
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#8B5CF6]/20 text-[#C084FC] border border-[#8B5CF6]/40">
                  Formato .md & Skills
                </span>
              </div>
              <p className="text-xs text-[#A7B0BF] mt-1 max-w-3xl leading-relaxed">
                Esta área é dedicada à <strong className="text-[#F5F7FA]">escola de vendas e habilidades comerciais do Agente IA</strong>.
                Adicione playbooks em Markdown (<code className="text-[#C084FC]">.md</code>), técnicas de negociação, rapport para Angola e
                skills com gatilhos automáticos que transformam a IA num consultor de alta conversão.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full sm:w-auto mt-3 lg:mt-0">
            <input
              ref={fileInputRef}
              type="file"
              accept=".md,.markdown,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-1.5 h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-xs font-semibold text-[#A7B0BF] hover:text-[#F5F7FA] hover:border-[#3B82F6]/50 transition-colors flex-1 sm:flex-none"
            >
              <Upload className="size-3.5" />
              <span>Upload .md</span>
            </button>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 h-9 rounded-[8px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-3.5 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:brightness-110 active:scale-[0.98] transition-all flex-1 sm:flex-none"
            >
              <Plus className="size-3.5" />
              <span>+ Nova Skill / .md</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#252C38]/80 text-xs">
          <div className="rounded-[10px] bg-[#0E121A]/70 border border-[#252C38] p-3">
            <p className="text-[#A7B0BF] text-[11px]">Total de Arquivos .md</p>
            <p className="text-base font-bold text-[#F5F7FA] mt-0.5">{stats.total}</p>
          </div>
          <div className="rounded-[10px] bg-[#0E121A]/70 border border-[#252C38] p-3">
            <p className="text-[#A7B0BF] text-[11px]">Skills Ativas no Atendimento</p>
            <p className="text-base font-bold text-[#22C55E] mt-0.5">{stats.active} ativas</p>
          </div>
          <div className="rounded-[10px] bg-[#0E121A]/70 border border-[#252C38] p-3">
            <p className="text-[#A7B0BF] text-[11px]">Playbooks Executáveis</p>
            <p className="text-base font-bold text-[#3B82F6] mt-0.5">{stats.executableSkills}</p>
          </div>
          <div className="rounded-[10px] bg-[#0E121A]/70 border border-[#252C38] p-3">
            <p className="text-[#A7B0BF] text-[11px]">Manuais de Postura & Tom</p>
            <p className="text-base font-bold text-[#C084FC] mt-0.5">{stats.manuals}</p>
          </div>
        </div>
      </div>

      {/* 2. Filtros e Pesquisa */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#667085]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por skill, gatilho, conteúdo .md..."
            className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#151A23] pl-9 pr-3 text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        {/* Type & Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <div className="inline-flex rounded-[8px] border border-[#252C38] bg-[#151A23] p-0.5 shrink-0">
            <button
              type="button"
              onClick={() => setSelectedType("all")}
              className={`px-2.5 py-1 rounded-[6px] font-semibold transition-colors ${
                selectedType === "all" ? "bg-[#3B82F6] text-white" : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              Todos ({skills.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("skill")}
              className={`px-2.5 py-1 rounded-[6px] font-semibold transition-colors ${
                selectedType === "skill" ? "bg-[#3B82F6] text-white" : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              Skills ({skills.filter((s) => s.type === "skill").length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedType("manual")}
              className={`px-2.5 py-1 rounded-[6px] font-semibold transition-colors ${
                selectedType === "manual" ? "bg-[#3B82F6] text-white" : "text-[#A7B0BF] hover:text-[#F5F7FA]"
              }`}
            >
              Manuais ({skills.filter((s) => s.type === "manual").length})
            </button>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="h-8 rounded-[8px] border border-[#252C38] bg-[#151A23] px-2.5 text-[#F5F7FA] focus:outline-none focus:border-[#3B82F6] text-[11px] shrink-0"
          >
            <option value="all">Todas as Categorias</option>
            <option value="qualificacao">Qualificação & SPIN</option>
            <option value="objecoes">Contorno de Objeções</option>
            <option value="fechamento">Fechamento & Agendamento</option>
            <option value="rapport">Rapport & Tom de Voz</option>
            <option value="negociacao">Negociação</option>
          </select>
        </div>
      </div>

      {/* 3. Grid de Cards de Skills / Arquivos .md */}
      {filteredSkills.length === 0 ? (
        <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-12 text-center text-[#667085]">
          <BookOpen className="size-12 mx-auto mb-3 text-[#252C38]" />
          <p className="text-sm font-semibold text-[#A7B0BF]">Nenhuma skill encontrada</p>
          <p className="text-xs text-[#667085] mt-1">
            {searchQuery
              ? "Tente ajustar os termos da pesquisa ou filtros."
              : "Clique em '+ Nova Skill / .md' ou 'Upload .md' para adicionar material de treinamento."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((doc) => (
            <div
              key={doc.id}
              className={`rounded-[14px] border ${
                doc.isActive
                  ? "border-[#252C38] bg-[#151A23] hover:border-[#3B82F6]/50"
                  : "border-[#252C38]/40 bg-[#0E121A]/50 opacity-70"
              } p-5 transition-all flex flex-col justify-between shadow-sm relative group`}
            >
              <div>
                {/* Top badges */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        doc.type === "skill"
                          ? "bg-[#3B82F6]/15 text-[#60A5FA] border border-[#3B82F6]/30"
                          : "bg-[#8B5CF6]/15 text-[#C084FC] border border-[#8B5CF6]/30"
                      }`}
                    >
                      {doc.type === "skill" ? "Skill Executável" : "Manual de Postura"}
                    </span>

                    <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[#252C38] text-[#A7B0BF]">
                      {categoryLabels[doc.category] || doc.category}
                    </span>

                    <span className="font-mono text-[10px] text-[#667085] flex items-center gap-1">
                      <FileText className="size-3" />
                      {doc.filename}
                    </span>
                  </div>

                  {/* Toggle Active Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggleActive(doc.id, doc.isActive)}
                    title={doc.isActive ? "Desativar skill" : "Ativar skill"}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                      doc.isActive
                        ? "bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30"
                        : "bg-[#667085]/20 text-[#A7B0BF] border border-[#667085]/30"
                    }`}
                  >
                    <span className={`size-1.5 rounded-full ${doc.isActive ? "bg-[#22C55E]" : "bg-[#667085]"}`} />
                    <span>{doc.isActive ? "ATIVA" : "PAUSADA"}</span>
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-[#F5F7FA] group-hover:text-[#3B82F6] transition-colors">
                  {doc.title}
                </h3>

                {/* Trigger */}
                {doc.triggerCondition && (
                  <div className="mt-2.5 p-2 rounded-[8px] bg-[#0E121A] border border-[#252C38] flex items-start gap-2 text-[11px]">
                    <Zap className="size-3.5 text-[#F59E0B] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#A7B0BF] font-semibold">Gatilho de Ativação: </span>
                      <span className="text-[#E2E8F0]">{doc.triggerCondition}</span>
                    </div>
                  </div>
                )}

                {/* Preview text */}
                <p className="mt-3 text-xs text-[#A7B0BF] line-clamp-2 leading-relaxed">
                  {doc.contentMd.replace(/#|\*|_|<!--[\s\S]*?-->/g, "").slice(0, 160)}...
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="mt-4 pt-3 border-t border-[#252C38] flex items-center justify-between text-xs text-[#A7B0BF]">
                <span className="text-[10px] text-[#667085]">Atualizado em {doc.updatedAt}</span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDownloadMd(doc)}
                    title="Baixar arquivo .md"
                    className="p-1.5 rounded-[6px] hover:bg-[#252C38] hover:text-[#F5F7FA] transition-colors cursor-pointer"
                  >
                    <Download className="size-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenDoc(doc)}
                    title="Visualizar e Editar .md"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#252C38]/70 hover:bg-[#3B82F6]/20 hover:text-[#3B82F6] hover:border-[#3B82F6]/40 border border-transparent transition-all cursor-pointer font-semibold text-[11px]"
                  >
                    <Eye className="size-3" />
                    <span>Abrir .md</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(doc.id, doc.title)}
                    title="Remover arquivo"
                    className="p-1.5 rounded-[6px] hover:bg-[#EF4444]/20 hover:text-[#EF4444] transition-colors ml-1 cursor-pointer"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Sandbox de Simulação de Ativação de Skills */}
      <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="size-5 text-[#8B5CF6]" />
          <h3 className="text-sm font-bold text-[#F5F7FA]">Simulador de Ativação de Skills</h3>
          <span className="text-[10px] font-semibold text-[#8B5CF6] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2 py-0.5 rounded-full">
            Teste em Tempo Real
          </span>
        </div>
        <p className="text-xs text-[#A7B0BF] mb-4">
          Escreva uma frase de um potencial cliente para verificar qual das suas skills de venda ativas seria acionada para orientar a resposta da IA:
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={sandboxPrompt}
            onChange={(e) => setSandboxPrompt(e.target.value)}
            placeholder="Ex: Achei caro... ou Gostaria de agendar uma demonstração..."
            className="flex-1 h-10 rounded-[10px] border border-[#252C38] bg-[#0E121A] px-3.5 text-xs text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#8B5CF6]"
          />
          <button
            type="button"
            onClick={handleTestSandbox}
            className="h-10 px-4 rounded-[10px] bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-sm cursor-pointer"
          >
            <Play className="size-3.5 fill-white" />
            <span>Testar Skill</span>
          </button>
        </div>

        {sandboxResult && (
          <div className="mt-4 p-4 rounded-[12px] border border-[#8B5CF6]/40 bg-[#0E121A] space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#252C38]">
              <span className="text-[#A7B0BF] font-semibold flex items-center gap-1.5">
                <Zap className="size-3.5 text-[#F59E0B]" />
                Skill Acionada:{" "}
                <strong className="text-[#C084FC]">{sandboxResult.triggeredSkill?.title}</strong> (
                <code className="text-[10px] text-[#A7B0BF]">{sandboxResult.triggeredSkill?.filename}</code>)
              </span>
              <span className="text-[10px] font-bold text-[#22C55E]">GATILHO VALIDADO</span>
            </div>

            <p className="text-xs text-[#A7B0BF] leading-relaxed">
              <strong className="text-[#F5F7FA]">Raciocínio Comercial: </strong>
              {sandboxResult.analysis}
            </p>

            <div className="p-3 rounded-[8px] bg-[#151A23] border border-[#252C38]">
              <p className="text-[10px] uppercase tracking-wider font-bold text-[#3B82F6] mb-1">
                Resposta Gerada pelo Vendedor IA:
              </p>
              <p className="text-xs text-[#F5F7FA] italic leading-relaxed">
                "{sandboxResult.suggestedResponse}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 5. Modal de Leitura / Edição do Arquivo .md */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-[16px] border border-[#252C38] bg-[#151A23] shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#252C38] flex items-center justify-between gap-3 bg-[#0E121A]">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="size-8 rounded-[8px] bg-[#3B82F6]/20 border border-[#3B82F6]/40 flex items-center justify-center text-[#3B82F6] shrink-0">
                  <FileText className="size-4" />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold text-[#F5F7FA] truncate">{viewingDoc.title}</h3>
                  <p className="text-[11px] font-mono text-[#A7B0BF] truncate">{viewingDoc.filename}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] text-xs font-semibold border transition-colors cursor-pointer ${
                    isEditing
                      ? "bg-[#3B82F6] text-white border-transparent"
                      : "border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA]"
                  }`}
                >
                  {isEditing ? <Eye className="size-3.5" /> : <Edit3 className="size-3.5" />}
                  <span>{isEditing ? "Visualizar" : "Editar"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadMd(viewingDoc)}
                  title="Baixar .md"
                  className="p-1.5 rounded-[6px] border border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA] hover:bg-[#252C38] transition-colors cursor-pointer"
                >
                  <Download className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="p-1.5 rounded-[6px] text-[#667085] hover:text-[#F5F7FA] hover:bg-[#252C38] transition-colors cursor-pointer ml-1"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 text-xs space-y-4">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#A7B0BF] mb-1">
                      Título da Skill / Arquivo
                    </label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#A7B0BF] mb-1">
                      Gatilho de Ativação (Trigger)
                    </label>
                    <input
                      type="text"
                      value={editedTrigger}
                      onChange={(e) => setEditedTrigger(e.target.value)}
                      placeholder="Ex: Quando o cliente questionar o preço..."
                      className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#A7B0BF] mb-1">
                      Conteúdo Markdown (.md)
                    </label>
                    <textarea
                      rows={16}
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      className="w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] p-3 text-[#F5F7FA] font-mono text-xs focus:outline-none focus:border-[#3B82F6] leading-relaxed resize-y"
                    />
                  </div>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none space-y-3 text-[#CBD5E1] leading-relaxed font-sans">
                  {viewingDoc.triggerCondition && (
                    <div className="p-3 rounded-[8px] bg-[#0E121A] border border-[#8B5CF6]/30 text-xs mb-4">
                      <p className="text-[#C084FC] font-bold flex items-center gap-1.5 mb-0.5">
                        <Zap className="size-3.5" /> Gatilho de Ativação desta Skill:
                      </p>
                      <p className="text-[#E2E8F0]">{viewingDoc.triggerCondition}</p>
                    </div>
                  )}

                  <pre className="p-4 rounded-[10px] bg-[#0E121A] border border-[#252C38] text-xs font-mono text-[#E2E8F0] whitespace-pre-wrap overflow-x-auto leading-relaxed">
                    {viewingDoc.contentMd}
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#252C38] flex items-center justify-between bg-[#0E121A]">
              <span className="text-[11px] text-[#667085]">
                Tipo: {viewingDoc.type === "skill" ? "Skill de Ação" : "Manual de Treinamento"} • Categoria:{" "}
                {categoryLabels[viewingDoc.category]}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setViewingDoc(null)}
                  className="px-3.5 py-1.5 rounded-[8px] border border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA] hover:bg-[#252C38]/50 transition-colors"
                >
                  Fechar
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleSaveEdit}
                    className="px-4 py-1.5 rounded-[8px] bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold transition-colors"
                  >
                    Salvar Alterações
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Modal de Criação de Nova Skill / .md */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[16px] border border-[#252C38] bg-[#151A23] p-5 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#252C38]">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-[8px] bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#8B5CF6]">
                  <GraduationCap className="size-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F5F7FA]">Nova Skill de Vendas (.md)</h3>
                  <p className="text-[11px] text-[#A7B0BF]">
                    Capacite o vendedor IA com uma nova habilidade ou regra de conversão
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="size-8 rounded-[6px] text-[#667085] hover:text-[#F5F7FA] hover:bg-[#252C38] flex items-center justify-center transition-colors"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewSkill} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block text-[#A7B0BF] mb-1 font-semibold">Título da Skill *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Contorno de Objeção de Concorrente Local"
                  className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A7B0BF] mb-1 font-semibold">Nome do Arquivo (.md)</label>
                  <input
                    type="text"
                    value={newFilename}
                    onChange={(e) => setNewFilename(e.target.value)}
                    placeholder="Ex: skill-concorrente.md"
                    className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] placeholder-[#667085] font-mono text-[11px] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="block text-[#A7B0BF] mb-1 font-semibold">Tipo de Documento</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as KnowledgeType)}
                    className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] focus:outline-none focus:border-[#8B5CF6]"
                  >
                    <option value="skill">Skill Executável (Playbook de Ação)</option>
                    <option value="manual">Manual de Postura / Tom de Voz</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#A7B0BF] mb-1 font-semibold">Categoria Comercial</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as KnowledgeCategory)}
                    className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] focus:outline-none focus:border-[#8B5CF6]"
                  >
                    <option value="qualificacao">Qualificação & Diagnóstico</option>
                    <option value="objecoes">Contorno de Objeções</option>
                    <option value="fechamento">Fechamento & Agendamento</option>
                    <option value="rapport">Rapport & Tom de Voz</option>
                    <option value="negociacao">Negociação Comercial</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#A7B0BF] mb-1 font-semibold">Gatilho de Ativação (Trigger)</label>
                  <input
                    type="text"
                    value={newTrigger}
                    onChange={(e) => setNewTrigger(e.target.value)}
                    placeholder="Ex: Quando o cliente citar a agência X..."
                    className="w-full h-9 rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3 text-[#F5F7FA] placeholder-[#667085] focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#A7B0BF] mb-1 font-semibold">
                  Conteúdo Markdown (.md) — Deixe vazio para usar modelo sugerido
                </label>
                <textarea
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="# Título da Skill&#10;&#10;## 1. Objectivo Comercial&#10;...&#10;&#10;## 2. Resposta Recomendada&#10;> 'Exemplo de resposta da IA...'"
                  className="w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] p-3 text-[#F5F7FA] font-mono text-[11px] focus:outline-none focus:border-[#8B5CF6] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#252C38] flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-3.5 py-2 rounded-[8px] border border-[#252C38] text-[#A7B0BF] hover:text-[#F5F7FA] hover:bg-[#252C38]/40"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-[8px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold flex items-center gap-1.5 hover:brightness-110 shadow-[0_4px_16px_rgba(59,130,246,0.3)]"
                >
                  <Sparkles className="size-3.5" />
                  <span>Cadastrar e Ativar Skill</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
