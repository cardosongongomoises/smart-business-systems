import { useState } from "react";
import {
  Globe,
  Bot,
  Workflow,
  LayoutDashboard,
  Check,
  Sparkles,
  CalendarCheck2,
  Headphones,
  RefreshCw,
  FileText,
  Layers,
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Reveal } from "./Reveal";

type FilterTab = "all" | "ai" | "infrastructure";

// Soluções Especializadas de IA — Usando ai-card
const aiSolutions = [
  {
    id: "ai-sdr",
    code: "AI-01",
    icon: Bot,
    title: "Agente SDR & Qualificação Comercial",
    badge: "Alta Conversão",
    status: "ONLINE 24/7",
    desc: "Atendimento imediato no WhatsApp Oficial para qualificar orçamentos, filtrar curiosos e encaminhar oportunidades quentes aos consultores.",
    capabilities: [
      "Triagem por faturamento, necessidade e urgência de compra",
      "Tempo de primeira resposta inferior a 8 segundos",
      "Encaminhamento com ficha do lead pronta no CRM",
      "Compatível com WhatsApp Cloud API Oficial da Meta",
    ],
    metric: "100% dos contactos triados sem espera",
    channel: "WhatsApp Oficial • Web",
  },
  {
    id: "ai-support",
    code: "AI-02",
    icon: Headphones,
    title: "Agente de Atendimento & Triagem N1",
    badge: "Suporte Imediato",
    status: "ACTIVE 24/7",
    desc: "Resolução inteligente e instantânea de dúvidas frequentes, tabelas de preços, localização e procedimentos corporativos sem filas de espera.",
    capabilities: [
      "Respostas precisas baseadas na base de dados da sua empresa",
      "Zero alucinação com diretrizes estritas de segurança",
      "Transferência transparente para atendente humano quando solicitado",
      "Atendimento simultâneo a centenas de clientes sem lentidão",
    ],
    metric: "80% das dúvidas resolvidas no 1º contacto",
    channel: "WhatsApp • Portal Web",
  },
  {
    id: "ai-calendar",
    code: "AI-03",
    icon: CalendarCheck2,
    title: "Agente Executivo de Agendamentos",
    badge: "Sincronizado",
    status: "CALENDAR SYNC",
    desc: "Elimina o vai-e-vem manual de mensagens para marcar reuniões com clientes, integrando-se diretamente ao calendário da sua equipa.",
    capabilities: [
      "Consulta de horários livres em tempo real no Google Calendar",
      "Bloqueio imediato na agenda e envio de link da reunião",
      "Lembrete automático 2h antes no WhatsApp para evitar faltas",
      "Reagendamento autônomo mediante solicitação do cliente",
    ],
    metric: "-75% de no-shows e faltas em reuniões",
    channel: "Google Calendar • WhatsApp",
  },
  {
    id: "ai-followup",
    code: "AI-04",
    icon: RefreshCw,
    title: "Agente de Follow-up & Cobrança Cordial",
    badge: "Recuperação",
    status: "PIPELINE ACTIVE",
    desc: "Recupera oportunidades comerciais paradas e notifica mensalidades ou faturas com abordagem respeitosa e profissional.",
    capabilities: [
      "Cadência inteligente de lembretes pós-proposta comercial",
      "Envio de referências de pagamento (Multicaixa Express / IBAN)",
      "Detecção de objeções de preço ou prazo para alertar a equipa",
      "Histórico sincronizado em tempo real com o CRM",
    ],
    metric: "+35% de propostas recuperadas no mês",
    channel: "WhatsApp • CRM • E-mail",
  },
  {
    id: "ai-rag",
    code: "AI-05",
    icon: FileText,
    title: "Agente RAG de Base de Conhecimento",
    badge: "IA Documental",
    status: "SECURE ENGINE",
    desc: "Assistente empresarial treinado em PDFs, manuais internos, contratos e políticas da organização para busca instantânea de informações.",
    capabilities: [
      "Busca semântica avançada em relatórios e documentação técnica",
      "Citação exata de fontes, cláusulas e páginas do documento",
      "Isolamento completo de dados e controle rigoroso de acesso",
      "Produtividade acelerada para consultores, advogados e gestores",
    ],
    metric: "Respostas documentadas em < 1.5s",
    channel: "Intranet • Portal Corporativo",
  },
  {
    id: "ai-omni",
    code: "AI-06",
    icon: Layers,
    title: "Agente de Triagem Multicanal Centralizado",
    badge: "Omnichannel",
    status: "ROUTING READY",
    desc: "Unifica os pontos de contacto da empresa (WhatsApp, Instagram, Web) numa única esteira inteligente conectada ao CRM da operação.",
    capabilities: [
      "Identificação automática da origem e do histórico do cliente",
      "Segmentação geográfica (Luanda, Benguela, Huambo, etc.)",
      "Distribuição automática de acordo com a carteira de vendedores",
      "Relatórios de tempo de resposta e taxa de conversão",
    ],
    metric: "Zero oportunidades perdidas entre canais",
    channel: "WhatsApp • Instagram • Web",
  },
];

// Pilares de Infraestrutura Base (Web, Automação, CRM)
const coreInfrastructure = [
  {
    n: "01",
    icon: Globe,
    title: "Websites Corporativos & Landing Pages de Alta Performance",
    desc: "Websites ultra-rápidos, responsivos e projetados com rigor visual corporativo para transformar visitantes em reuniões e contactos comerciais.",
    items: [
      "Landing Pages focadas em conversão direta",
      "Websites institucionais e corporativos para empresas em Angola",
      "Catálogos de produtos e serviços corporativos",
      "Otimização avançada de SEO local (Luanda e Províncias)",
      "Páginas de serviços especializadas de alta velocidade",
      "Design mobile-first adaptado às redes e dispositivos angolanos",
    ],
  },
  {
    n: "02",
    icon: Workflow,
    title: "Automação Comercial de Processos & WhatsApp API",
    desc: "Estruturação de fluxos operacionais que eliminam tarefas repetitivas, conectando canais de comunicação a sistemas de vendas.",
    items: [
      "Integração com WhatsApp Cloud API Oficial da Meta",
      "Sequências automáticas de nutrição e e-mails transacionais",
      "Agendamento automático sem atrito de comunicação",
      "Alertas imediatos no telemóvel dos gestores de conta",
      "Sincronização bidirecional de dados entre sistemas",
      "Eliminação de retrabalho manual em processos comerciais",
    ],
  },
  {
    n: "03",
    icon: LayoutDashboard,
    title: "Sistemas Digitais Sob Medida & CRM Empresarial",
    desc: "Plataformas web seguras e dashboards interativos para controlo unificado de clientes, propostas e métricas de desempenho da empresa.",
    items: [
      "Painéis de controlo e dashboards executivos em tempo real",
      "Aplicações web sob medida para operações específicas",
      "Sistemas de CRM com pipeline comercial transparente",
      "Portais de atendimento e consulta para clientes",
      "Bases de dados seguras e APIs corporativas escaláveis",
      "Arquitetura moderna desenhada para o mercado angolano",
    ],
  },
];

export function Services() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  return (
    <section
      id="servicos"
      className="py-20 sm:py-28 bg-[#0E121A] border-t border-[#252C38] scroll-mt-20 relative overflow-hidden"
    >
      {/* Background Accent Gradients (Restrained & Corporate) */}
      <div
        className="pointer-events-none absolute top-10 right-0 size-96 rounded-full bg-[#8B5CF6]/5 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 left-0 size-96 rounded-full bg-[#3B82F6]/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 relative z-10">
        {/* Header da Seção */}
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-[#252C38]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-1.5 text-[11px] font-mono font-semibold tracking-wider text-[#C084FC] uppercase mb-4">
                <Sparkles className="size-3 text-[#8B5CF6]" aria-hidden="true" />
                <span>Vitrine de Serviços & Soluções IA</span>
              </div>
              <h2 className="max-w-3xl text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
                Soluções completas: Websites, IA e Automação — tudo integrado.
              </h2>
              <p className="mt-4 max-w-2xl text-base text-[#A7B0BF] leading-relaxed">
                Cada sistema é construído para converter visitantes em clientes. Sem fragmentação, sem integrações quebradas — tudo funciona junto, desde o dia 1.
              </p>
            </div>

            {/* Quick Segment Filter */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-[10px] border border-[#252C38] bg-[#080A0F] self-start sm:self-end">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-[#3B82F6] text-white shadow-sm"
                    : "text-[#A7B0BF] hover:text-[#F5F7FA] hover:bg-[#151A23]"
                }`}
              >
                Todas as Soluções
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("ai")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all ${
                  activeTab === "ai"
                    ? "bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white shadow-[0_0_16px_rgba(139,92,246,0.3)]"
                    : "text-[#A7B0BF] hover:text-[#F5F7FA] hover:bg-[#151A23]"
                }`}
              >
                <Sparkles className="size-3 text-[#8B5CF6]" aria-hidden="true" />
                <span>Vitrine de IA (ai-card)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("infrastructure")}
                className={`px-3.5 py-1.5 rounded-[8px] text-xs font-semibold transition-all ${
                  activeTab === "infrastructure"
                    ? "bg-[#252C38] text-[#F5F7FA] shadow-sm"
                    : "text-[#A7B0BF] hover:text-[#F5F7FA] hover:bg-[#151A23]"
                }`}
              >
                Web & Automação
              </button>
            </div>
          </div>
        </Reveal>

        {/* VITRINE DE SOLUÇÕES DE IA — UTILIZANDO CLASSE UTILITÁRIA 'ai-card' */}
        {(activeTab === "all" || activeTab === "ai") && (
          <div className="mt-14">
            <Reveal>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B5CF6]">
                      Portfólio de Agentes de IA • Destaque Tecnológico
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-[#F5F7FA] mt-1">
                    Agentes de IA para WhatsApp, CRM e Website
                  </h3>
                  <p className="text-sm text-[#A7B0BF] mt-1 max-w-xl">
                    Cada agente resolve um problema específico — sem confusão, sem sobreposição. Prontos para integrar ao seu negócio.
                  </p>
                </div>
                <span className="hidden sm:inline-flex items-center gap-2 text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-3 py-1.5 rounded-full">
                  <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" /> SISTEMAS
                  ATIVOS
                </span>
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {aiSolutions.map((sol, index) => (
                <Reveal key={sol.id} delay={index * 80}>
                  {/* ai-card Utility Class Aplicada Aqui com Micro-Interação */}
                  <article className="ai-card flex h-full flex-col justify-between p-6 sm:p-7 transition-all duration-300 hover:border-[#8B5CF6]/70 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(139,92,246,0.22)] group">
                    <div>
                      {/* Top Meta Bar */}
                      <div className="flex items-center justify-between gap-2 border-b border-[#252C38] pb-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#8B5CF6]/15 text-[#C084FC] border border-[#8B5CF6]/30">
                            {sol.badge}
                          </span>
                          <span className="text-[10px] font-mono text-[#667085]">{sol.code}</span>
                        </div>
                        <span className="flex items-center gap-1.5 font-mono text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-2 py-0.5 rounded-full border border-[#22C55E]/20">
                          <span className="size-1.5 rounded-full bg-[#22C55E]" />
                          {sol.status}
                        </span>
                      </div>

                      {/* Icon & Title */}
                      <div className="mt-5 flex items-start gap-3.5">
                        <div className="relative flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-[#8B5CF6]/40 bg-[#0E121A] text-[#8B5CF6] shadow-sm transition-colors group-hover:border-[#8B5CF6] group-hover:text-[#C084FC]">
                          <sol.icon className="size-5" aria-hidden="true" />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold tracking-tight text-[#F5F7FA] group-hover:text-white transition-colors">
                            {sol.title}
                          </h4>
                          <span className="text-[11px] font-mono text-[#3B82F6]">
                            {sol.channel}
                          </span>
                        </div>
                      </div>

                      <p className="mt-3.5 text-xs sm:text-sm leading-relaxed text-[#A7B0BF]">
                        {sol.desc}
                      </p>

                      {/* Capabilities Checklist */}
                      <div className="mt-5 pt-4 border-t border-[#252C38]/60">
                        <p className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#667085] mb-2.5">
                          Capacidades Operacionais:
                        </p>
                        <ul className="space-y-2">
                          {sol.capabilities.map((cap) => (
                            <li
                              key={cap}
                              className="flex items-start gap-2 text-xs text-[#F5F7FA]/90"
                            >
                              <Check
                                className="mt-0.5 size-3.5 shrink-0 text-[#8B5CF6]"
                                aria-hidden="true"
                              />
                              <span className="leading-snug">{cap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer with Performance Metric & CTA */}
                    <div className="mt-6 pt-4 border-t border-[#252C38] flex flex-col gap-3">
                      <div className="flex items-center justify-between text-[11px] bg-[#0E121A] px-3 py-1.5 rounded-[8px] border border-[#252C38]">
                        <span className="text-[#667085]">Desempenho:</span>
                        <span className="font-semibold text-[#F5F7FA] font-mono flex items-center gap-1">
                          <Zap className="size-3 text-[#3B82F6]" aria-hidden="true" />
                          {sol.metric}
                        </span>
                      </div>

                      <a
                        href="#contacto"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#151A23] border border-[#8B5CF6]/40 px-3 py-2 text-xs font-semibold text-[#F5F7FA] transition-all hover:bg-[#8B5CF6]/15 hover:border-[#8B5CF6] hover:text-white"
                      >
                        <span>Solicitar esta Solução de IA</span>
                        <ArrowRight className="size-3.5 text-[#8B5CF6]" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* PILARES DE INFRAESTRUTURA CORPORATIVA (Websites, Automação & CRM) */}
        {(activeTab === "all" || activeTab === "infrastructure") && (
          <div className="mt-16 pt-12 border-t border-[#252C38]">
            <Reveal>
              <div className="mb-8">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#3B82F6]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#3B82F6]">
                    Infraestrutura & Base Tecnológica
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[#F5F7FA] mt-1">
                  Engenharia Web, Automação de Processos e Software de Gestão
                </h3>
                <p className="text-sm text-[#A7B0BF] mt-1 max-w-2xl">
                  A base sólida onde as soluções de IA são conectadas para garantir
                  estabilidade, velocidade e presença digital de alto nível — sem systems que comunicam entre si.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6 lg:grid-cols-3">
              {coreInfrastructure.map((item, idx) => (
                <Reveal key={item.title} delay={idx * 90}>
                  <article className="glass-card flex h-full flex-col justify-between rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-7 transition-[border-color,transform] hover:border-[#3B82F6]/50 hover:-translate-y-0.5">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#252C38] bg-[#0E121A] text-[#3B82F6]">
                          <item.icon className="size-5" aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#667085]">
                          {item.n}
                        </span>
                      </div>
                      <h4 className="mt-5 text-lg font-bold tracking-tight text-[#F5F7FA]">
                        {item.title}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#A7B0BF]">
                        {item.desc}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {item.items.map((it) => (
                          <li
                            key={it}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[#A7B0BF]"
                          >
                            <Check
                              className="mt-0.5 size-3.5 shrink-0 text-[#3B82F6]"
                              aria-hidden="true"
                            />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-7 pt-4 border-t border-[#252C38]/60 flex items-center justify-between text-xs">
                      <span className="text-[#667085]">Nível Empresarial</span>
                      <a
                        href="#contacto"
                        className="inline-flex items-center gap-1.5 font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                      >
                        Solicitar proposta <ArrowRight className="size-3.5" aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Governança de IA & Garantia de Segurança Corporativa */}
        <Reveal delay={120}>
          <div className="mt-14 rounded-[16px] border border-[#8B5CF6]/30 bg-[#080A0F] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <div className="flex items-start gap-4">
              <div className="size-12 shrink-0 rounded-[10px] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#8B5CF6]">
                <ShieldCheck className="size-6" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#8B5CF6]">
                  Governança & Confiabilidade
                </span>
                <h4 className="text-lg font-bold text-[#F5F7FA] mt-0.5">
                  Garantia de IA Confiável: Sem Alucinações e com Controle Humano
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm text-[#A7B0BF] max-w-3xl leading-relaxed">
                  Pode pensar que IA é arriscado — e para muitos fornecedores, é. Os nossos agentes
                  utilizam conhecimento estritamente delimitado pelas regras da sua empresa,
                  trabalham sobre a API Oficial do WhatsApp e contam com encaminhamento transparente
                  para atendentes humanos sempre que necessário. Nunca o cliente fica sem resposta humana.
                </p>
              </div>
            </div>

              <a
                href="#contacto"
                className="shrink-0 inline-flex h-[44px] items-center justify-center gap-2 rounded-[8px] bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] px-6 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all hover:opacity-95 active:scale-[0.98]"
              >
                <span>Agendar Demonstração</span>
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
