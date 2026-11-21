import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  ShieldCheck,
  Workflow,
  Users,
} from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { CTA, DEMO_CTA_LABEL, EMAIL, LOCATION, WHATSAPP_DISPLAY } from "@/lib/site-config";

const tocItems = [
  { href: "#o-que-e", label: "O que é na prática" },
  { href: "#aplicacoes", label: "Aplicações em empresas" },
  { href: "#etapas", label: "Como implementar em 4 etapas" },
  { href: "#comparacao", label: "Comparação de modelos" },
  { href: "#escopo", label: "Limites e transparência" },
  { href: "#perguntas", label: "Perguntas frequentes" },
];

const businessUseCases = [
  {
    icon: MessageSquare,
    title: "Atendimento inicial organizado no WhatsApp",
    text: "Responde a perguntas frequentes sobre serviços, localização, horários e documentos necessários com base apenas na informação aprovada pela empresa.",
  },
  {
    icon: Users,
    title: "Qualificação de pedidos comerciais",
    text: "Recolhe o essencial antes de a conversa chegar à equipa: serviço pretendido, disponibilidade, empresa e urgência do pedido.",
  },
  {
    icon: CalendarCheck,
    title: "Agendamento ligado à agenda real",
    text: "Verifica disponibilidade e regista marcações ou reuniões diretamente no calendário utilizado pela equipa, reduzindo trocas manuais de mensagens.",
  },
  {
    icon: Workflow,
    title: "Encaminhamento claro para atendimento humano",
    text: "Sempre que o cliente pede uma pessoa, surge uma exceção comercial ou é necessária decisão técnica, a conversa passa para a equipa responsável.",
  },
];

const implementationSteps = [
  {
    title: "Diagnóstico da operação atual",
    detail:
      "Analisamos como chegam hoje as mensagens no WhatsApp, que perguntas se repetem, qual agenda ou ferramenta a equipa usa e onde se perde tempo no atendimento.",
  },
  {
    title: "Definição de regras e conteúdos aprovados",
    detail:
      "Estruturamos os serviços, preços, horários, restrições e critérios exatos em que a conversa deve ser entregue a um colaborador humano.",
  },
  {
    title: "Configuração, ligação e testes guiados",
    detail:
      "Ligamos o fluxo ao WhatsApp e ao sistema de agenda compatível, executamos testes controlados com cenários reais e validamos cada resposta com a sua equipa.",
  },
  {
    title: "Entrada em produção e acompanhamento",
    detail:
      "Ativamos o sistema com monitorização técnica e ajustamos fluxos consoante a evolução dos serviços e do atendimento real da empresa.",
  },
];

const comparisonRows = [
  {
    criterion: "Tempo de primeira resposta no WhatsApp",
    manual: "Depende da disponibilidade da equipa no momento",
    reception: "Resposta imediata às perguntas autorizadas",
    enterprise: "Resposta imediata com triagem por departamento",
  },
  {
    criterion: "Consulta de disponibilidade e marcação",
    manual: "Verificação manual em agenda ou caderno",
    reception: "Leitura e registo direto na agenda compatível",
    enterprise: "Ligação à agenda, CRM ou fluxo interno avaliado",
  },
  {
    criterion: "Passagem para colaborador humano",
    manual: "Toda a conversa exige intervenção humana",
    reception: "Automática quando o pedido foge das regras ou a pedido",
    enterprise: "Regras configuradas por tipo de cliente ou urgência",
  },
  {
    criterion: "Indicação principal em Angola",
    manual: "Volume baixo de mensagens diárias",
    reception: "Espaços de estética não médica em Luanda e Angola",
    enterprise: "Empresas de serviços com atendimento e triagem recorrentes",
  },
];

const enterpriseFaqs = [
  {
    q: "Que tipos de empresas em Angola beneficiam primeiro da implementação de IA?",
    a: "Empresas de serviços com volume recorrente de pedidos no WhatsApp, como espaços de estética, clínicas privadas, escritórios de consultoria, imobiliárias e negócios com marcação ou triagem diária.",
  },
  {
    q: "A implementação de IA exige substituir os sistemas atuais da empresa?",
    a: "Não necessariamente. No diagnóstico inicial verificamos se é possível ligar a recepção digital à agenda, folha de cálculo ou ferramenta que a empresa já utiliza no dia a dia.",
  },
  {
    q: "Como se evita que o agente de IA dê informações erradas aos clientes?",
    a: "O sistema responde apenas com base nos serviços, preços, horários e regras previamente aprovados pela empresa. Antes de entrar em produção, testamos cenários reais e definimos gatilhos claros para passar a conversa a um colaborador.",
  },
  {
    q: "Quanto custa implementar inteligência artificial numa empresa em Angola?",
    a: "O orçamento depende dos fluxos a ligar, da agenda utilizada e do volume de serviços. Trabalhamos com um valor de implementação inicial e uma mensalidade de acompanhamento, sendo os custos das plataformas externas separados e apresentados de forma transparente.",
  },
  {
    q: "A Agentes Digital atende empresas fora de Luanda?",
    a: "Sim. A equipa opera a partir de Luanda e realiza diagnósticos, implementações e acompanhamento remoto para empresas em qualquer província de Angola.",
  },
];

export function EmpresaIAPillar() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen bg-[#F5F3EE] text-[#101D35] antialiased selection:bg-[#F4C542] selection:text-[#101D35]">
      <Header />

      <main id="main-content" className="pt-24 pb-16 sm:pt-28 sm:pb-24">
        <article className="mx-auto w-full max-w-[1040px] px-4 sm:px-8">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Navegação estrutural"
            className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E3D9] pb-4 text-xs text-[#5B6B8C]"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="font-semibold hover:text-[#D9531C] transition-colors">
                  Início
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-[#101D35]" aria-current="page">
                Implementação de IA para empresas em Angola
              </li>
            </ol>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 font-semibold text-[#101D35] hover:text-[#D9531C] transition-colors"
            >
              <ArrowLeft className="size-3.5" aria-hidden="true" />
              <span>Voltar à página principal</span>
            </Link>
          </nav>

          {/* Hero / Header Block */}
          <header className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 sm:p-8 lg:p-10">
            <p className="lume-eyebrow text-[#D9531C]">Guia Técnico e Operacional · Angola</p>
            <h1 className="mt-3 font-heading text-2xl sm:text-4xl lg:text-[2.65rem] font-extrabold leading-[1.12] tracking-[-0.025em] text-[#101D35] text-balance">
              Implementação de IA para empresas em Angola
            </h1>
            <p className="mt-4 max-w-[66ch] text-base sm:text-lg leading-[1.65] text-[#5B6B8C] font-medium">
              Como organizar o atendimento pelo WhatsApp, qualificar pedidos comerciais e ligar a
              agenda da sua empresa sem perder o controlo humano das conversas.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-[#E7E3D9] pt-5 text-xs text-[#5B6B8C]">
              <span>
                <strong className="text-[#101D35]">Publicado e revisto:</strong> Novembro de 2026
              </span>
              <span>
                <strong className="text-[#101D35]">Equipa:</strong> Agentes Digital, {LOCATION}
              </span>
              <span>
                <strong className="text-[#101D35]">Contacto direto:</strong> {WHATSAPP_DISPLAY}
              </span>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={CTA.enterpriseDiagnostic}
                target="_blank"
                rel="noopener noreferrer"
                className="lume-btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap"
              >
                <span>Pedir diagnóstico para a minha empresa</span>
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
              <Link
                to="/"
                className="lume-btn-secondary-light inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap"
              >
                <span>Ver solução para espaços de estética</span>
              </Link>
            </div>
          </header>

          {/* Table of Contents */}
          <nav
            aria-label="Índice do guia"
            className="mt-8 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6"
          >
            <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-[#5B6B8C]">
              Índice do guia
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              {tocItems.map((item, idx) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 font-medium text-[#101D35] transition-colors hover:bg-[#F5F3EE] hover:text-[#D9531C]"
                  >
                    <span className="font-heading text-xs font-bold text-[#5B6B8C] tabular-nums">
                      0{idx + 1}
                    </span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Section 1: Snippet-ready Answer Definition */}
          <section
            id="o-que-e"
            className="mt-8 sm:mt-10 scroll-mt-24 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 sm:p-8 lg:p-10"
          >
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#101D35] leading-[1.2]">
              O que é a implementação de IA para empresas na prática?
            </h2>
            <p className="mt-4 text-base sm:text-[17px] leading-[1.7] text-[#101D35] font-medium">
              A implementação de IA para empresas em Angola consiste em configurar sistemas de
              atendimento e automação ligados aos canais e ferramentas reais do negócio, como
              WhatsApp e agenda, para responder a perguntas autorizadas, recolher dados de contacto
              e registar pedidos sem substituir a decisão da equipa humana.
            </p>
            <p className="mt-4 text-sm sm:text-base leading-[1.7] text-[#5B6B8C]">
              Em vez de entregar tecnologia genérica para a empresa configurar sozinha, o foco da
              Agentes Digital é estruturar processos concretos de recepção, triagem comercial e
              marcação de acordo com a realidade operacional do mercado angolano.
            </p>
          </section>

          {/* Section 2: Concrete Business Applications */}
          <section id="aplicacoes" className="mt-12 scroll-mt-24">
            <div className="max-w-2xl">
              <p className="lume-eyebrow text-[#D9531C]">Aplicações operacionais</p>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#101D35] leading-[1.18]">
                Onde a automação e a IA resolvem gargalos reais em Angola
              </h2>
            </div>

            <div className="mt-6 grid gap-px overflow-hidden rounded-[16px] border border-[#E7E3D9] bg-[#E7E3D9] sm:grid-cols-2">
              {businessUseCases.map((item, idx) => (
                <div key={item.title} className="bg-[#FFFFFF] p-5 sm:p-7 lg:p-8 flex flex-col">
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-10 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F4C542]">
                      <item.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-heading text-xs font-bold text-[#5B6B8C] tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-bold text-[#101D35]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#5B6B8C]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-8 text-[#F5F3EE] flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-xl">
                <p className="font-heading text-xs font-bold uppercase tracking-[0.06em] text-[#F4C542]">
                  Solução especializada em operação
                </p>
                <p className="mt-1.5 text-sm sm:text-base text-[#B8C0D0] leading-relaxed">
                  Gere um espaço de estética não médica em Luanda ou noutra cidade de Angola? A
                  nossa <strong className="text-[#F5F3EE]">Recepção Inteligente</strong> já está
                  estruturada para esse formato.
                </p>
              </div>
              <Link
                to="/"
                className="lume-btn-secondary-dark inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap shrink-0"
              >
                <span>Conhecer a Recepção Inteligente</span>
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </Link>
            </div>
          </section>

          {/* Section 3: Numbered List Snippet Target */}
          <section
            id="etapas"
            className="mt-10 sm:mt-12 scroll-mt-24 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 sm:p-8 lg:p-10"
          >
            <p className="lume-eyebrow text-[#D9531C]">Método de implementação</p>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#101D35] leading-[1.18]">
              Como implementar IA numa empresa em Angola em 4 etapas
            </h2>

            <ol className="mt-6 divide-y divide-[#E7E3D9]">
              {implementationSteps.map((step, index) => (
                <li key={step.title} className="py-5 first:pt-2 last:pb-0 flex items-start gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-[8px] bg-[#101D35] font-heading text-xs font-bold text-[#F4C542] tabular-nums">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg font-bold text-[#101D35]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm sm:text-base leading-relaxed text-[#5B6B8C]">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Section 4: Semantic Table Snippet Target */}
          <section id="comparacao" className="mt-12 scroll-mt-24">
            <div className="max-w-2xl">
              <p className="lume-eyebrow text-[#D9531C]">Visão comparativa</p>
              <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#101D35] leading-[1.18]">
                Comparação entre modelos de atendimento empresarial
              </h2>
            </div>

            <p className="mt-4 text-xs text-[#5B6B8C] sm:hidden">
              Deslize lateralmente para comparar todas as colunas.
            </p>
            <div className="mt-2 sm:mt-6 overflow-x-auto rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF]">
              <table className="w-full min-w-[640px] text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-[#E7E3D9] bg-[#101D35] text-[#F5F3EE]">
                    <th className="p-4 sm:p-5 font-heading text-xs font-bold uppercase tracking-[0.04em]">
                      Critério operacional
                    </th>
                    <th className="p-4 sm:p-5 font-heading text-xs font-bold uppercase tracking-[0.04em] text-[#B8C0D0]">
                      Atendimento manual
                    </th>
                    <th className="p-4 sm:p-5 font-heading text-xs font-bold uppercase tracking-[0.04em] text-[#F4C542]">
                      Recepção Inteligente (Estética)
                    </th>
                    <th className="p-4 sm:p-5 font-heading text-xs font-bold uppercase tracking-[0.04em] text-[#F5F3EE]">
                      Implementação à medida
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E3D9]">
                  {comparisonRows.map((row) => (
                    <tr key={row.criterion} className="hover:bg-[#F5F3EE]/50 transition-colors">
                      <th
                        scope="row"
                        className="p-4 sm:p-5 font-heading text-xs sm:text-sm font-bold text-[#101D35]"
                      >
                        {row.criterion}
                      </th>
                      <td className="p-4 sm:p-5 text-[#5B6B8C] leading-relaxed">{row.manual}</td>
                      <td className="p-4 sm:p-5 text-[#101D35] font-medium leading-relaxed">
                        {row.reception}
                      </td>
                      <td className="p-4 sm:p-5 text-[#101D35] leading-relaxed">
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 5: E-E-A-T Scope & Transparency */}
          <section
            id="escopo"
            className="mt-12 scroll-mt-24 overflow-hidden rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] text-[#101D35]"
          >
            <div className="grid grid-cols-1 divide-y divide-[#E7E3D9] md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="min-w-0 p-5 sm:p-8 lg:p-10">
                <div className="flex items-center gap-2.5 text-[#D9531C]">
                  <ShieldCheck className="size-5 shrink-0" aria-hidden="true" />
                  <p className="lume-eyebrow text-[#D9531C]">Critério técnico e transparência</p>
                </div>
                <h2 className="mt-3 font-heading text-2xl font-bold text-[#101D35] leading-[1.2]">
                  O que validamos no diagnóstico e o que não prometemos
                </h2>
                <p className="mt-4 text-sm sm:text-base leading-[1.7] text-[#5B6B8C]">
                  Não prometemos ganhos automáticos de faturação nem autonomia total sem supervisão.
                  Cada implementação começa por validar se a integração com a agenda ou sistema
                  atual da empresa é viável e vantajosa para a operação diária.
                </p>
              </div>

              <div className="bg-[#FFFFFF] p-5 sm:p-8 lg:p-10">
                <ul className="space-y-4 text-sm text-[#101D35]">
                  <li className="flex items-start gap-3">
                    <CheckCircle2
                      className="size-4 mt-1 shrink-0 text-[#2E9E6B]"
                      aria-hidden="true"
                    />
                    <span>
                      Custos das plataformas externas (como APIs de comunicação e infraestrutura)
                      são apresentados em separado do valor de implementação e acompanhamento.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2
                      className="size-4 mt-1 shrink-0 text-[#2E9E6B]"
                      aria-hidden="true"
                    />
                    <span>
                      Recolha de dados limitada ao necessário para atendimento e agendamento, em
                      conformidade com a{" "}
                      <Link
                        to="/privacidade"
                        className="font-semibold text-[#D9531C] underline underline-offset-4"
                      >
                        Política de Privacidade
                      </Link>{" "}
                      e os{" "}
                      <Link
                        to="/termos"
                        className="font-semibold text-[#D9531C] underline underline-offset-4"
                      >
                        Termos de Serviço
                      </Link>
                      .
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2
                      className="size-4 mt-1 shrink-0 text-[#2E9E6B]"
                      aria-hidden="true"
                    />
                    <span>
                      Suporte direto com a nossa equipa em {LOCATION} através do WhatsApp{" "}
                      {WHATSAPP_DISPLAY} ou do e-mail {EMAIL}.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 6: Enterprise PAA FAQs */}
          <section id="perguntas" className="mt-12 scroll-mt-24">
            <p className="lume-eyebrow text-[#D9531C]">Perguntas frequentes</p>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-[#101D35]">
              Dúvidas comuns sobre IA para empresas em Angola
            </h2>

            <div className="mt-6 overflow-hidden rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] divide-y divide-[#E7E3D9]">
              {enterpriseFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className={isOpen ? "bg-[#F5F3EE]/40" : "bg-[#FFFFFF]"}>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors hover:bg-[#F5F3EE]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#F36B32]"
                    >
                      <div className="flex items-baseline gap-3.5 min-w-0">
                        <span className="font-heading text-xs font-bold text-[#5B6B8C] tabular-nums shrink-0">
                          0{idx + 1}
                        </span>
                        <span className="font-heading text-sm sm:text-base font-bold text-[#101D35]">
                          {faq.q}
                        </span>
                      </div>
                      <ChevronDown
                        className={`size-5 shrink-0 text-[#5B6B8C] transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#D9531C]" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-250 ease-out ${
                        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-5 sm:px-6 sm:pl-14 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed text-[#5B6B8C]">
                          {faq.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Bottom Conversion CTA */}
          <section className="mt-10 sm:mt-12 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 sm:p-8 lg:p-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="lume-eyebrow text-[#D9531C]">Próximo passo</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-[#101D35]">
                Quer avaliar a implementação na sua empresa?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-[#5B6B8C] leading-relaxed">
                Conte-nos como funciona hoje o seu atendimento no WhatsApp e verificamos que fluxo
                faz sentido estruturar para a sua realidade.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href={CTA.enterpriseDiagnostic}
                target="_blank"
                rel="noopener noreferrer"
                className="lume-btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 text-sm sm:whitespace-nowrap"
              >
                <span>Falar no WhatsApp</span>
                <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href="/#demonstracao-final"
                className="lume-btn-secondary-light inline-flex w-full sm:w-auto items-center justify-center gap-2 text-xs sm:whitespace-nowrap"
              >
                <span>{DEMO_CTA_LABEL}</span>
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
