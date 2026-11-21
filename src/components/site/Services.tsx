import { Reveal } from "./Reveal";
import {
  ArrowUpRight,
  Globe,
  BotMessageSquare,
  Workflow,
  Check,
  FileText,
  Compass,
  BookOpen,
  Lightbulb,
} from "lucide-react";
import { CTA } from "@/lib/site-config";

const coreServices = [
  {
    num: "Serviço 01",
    icon: BotMessageSquare,
    tag: "Atendimento e Qualificação",
    title: "Implementação de Inteligência Artificial",
    description:
      "Estruturamos agentes e fluxos inteligentes ligados à informação real da sua empresa para atender melhor e preparar o contacto antes de chegar à sua equipa.",
    capabilities: [
      "Atender clientes de forma mais rápida",
      "Responder a perguntas frequentes",
      "Recolher e qualificar contactos",
      "Organizar o atendimento comercial",
      "Marcar e confirmar reuniões",
      "Encaminhar conversas para colaboradores",
      "Organizar informações dos clientes",
    ],
    deliverables: [
      "Levantamento dos canais e regras de atendimento da empresa",
      "Configuração com os serviços, preços base e linguagem do negócio",
      "Encaminhamento para humanos com resumo do histórico",
      "Testes guiados e validação antes da entrada em produção",
    ],
    ctaLabel: "Pedir diagnóstico de IA",
    ctaHref: CTA.aiService,
  },
  {
    num: "Serviço 02",
    icon: Workflow,
    tag: "Processos e Acompanhamento",
    title: "Automatização de Processos Empresariais",
    description:
      "Automatizamos rotinas comerciais e operacionais para que nenhuma oportunidade caia no esquecimento e a sua equipa deixe de perder horas em trabalho manual.",
    capabilities: [
      "Automatizar follow-ups comerciais",
      "Enviar lembretes e notificações",
      "Acompanhar potenciais clientes",
      "Gerar relatórios automáticos",
      "Atualizar e organizar informações",
      "Reduzir tarefas repetitivas",
      "Integrar ferramentas e processos empresariais",
    ],
    deliverables: [
      "Mapeamento das tarefas repetitivas e gargalos prioritários",
      "Fluxos integrados entre WhatsApp, e-mail, agenda e CRM",
      "Alertas de acompanhamento e rotinas de relatórios",
      "Documentação clara para a equipa usar sem dependência técnica",
    ],
    ctaLabel: "Pedir diagnóstico de automatização",
    ctaHref: CTA.automationService,
  },
];

const complements = [
  {
    icon: Compass,
    title: "Mapeamento de atendimento e processos",
    text: "Diagnóstico claro de onde entram os contactos e onde o fluxo trava hoje.",
  },
  {
    icon: BookOpen,
    title: "Orientação prática para a equipa",
    text: "Explicamos passo a passo como acompanhar pedidos, assumir conversas e gerir a agenda.",
  },
  {
    icon: FileText,
    title: "Documentação dos fluxos implementados",
    text: "Registo objetivo das regras, integrações e pontos de contacto do sistema.",
  },
  {
    icon: Lightbulb,
    title: "Recomendações de melhoria contínua",
    text: "Sugestões práticas para evoluir o atendimento e os processos ao ritmo da empresa.",
  },
];

export function Services() {
  return (
    <section
      id="servicos"
      className="relative bg-[#F5F3EE] text-[#101D35] py-24 sm:py-32 border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#D9531C]">02 · Os nossos serviços</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-[1.15] font-bold text-[#101D35] sm:text-4xl text-balance">
            Atendimento com IA e automatização de processos: juntos ou em separado.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 max-w-[65ch] text-base sm:text-lg text-[#5B6B8C] leading-relaxed">
            Ajudamos empresas a atender melhor, acompanhar cada oportunidade e reduzir tarefas
            repetitivas. Pode implementar apenas um dos serviços ou combiná-los numa estrutura
            completa adaptada ao seu negócio.
          </p>
        </Reveal>

        {/* Two Core Services */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {coreServices.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-7 transition-colors duration-200 hover:border-[#101D35]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F36B32] shrink-0">
                      <s.icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold text-[#D9531C]">{s.tag}</span>
                  </div>
                  <span className="font-heading text-xs font-extrabold uppercase tracking-wider text-[#5B6B8C] shrink-0">
                    {s.num}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-xl sm:text-2xl font-bold text-[#101D35]">
                  {s.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#5B6B8C]">{s.description}</p>

                <div className="mt-6 border-t border-[#E7E3D9] pt-5">
                  <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#101D35]">
                    Como ajuda a sua empresa
                  </p>
                  <ul className="mt-3 space-y-2">
                    {s.capabilities.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-[#101D35]">
                        <Check
                          className="size-4 mt-0.5 text-[#F36B32] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-[12px] border border-[#E7E3D9] bg-[#F5F3EE] p-4">
                  <p className="font-heading text-xs font-bold uppercase tracking-wider text-[#2E9E6B]">
                    O que o cliente recebe
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-[#101D35]">
                        <Check
                          className="size-3.5 mt-0.5 text-[#2E9E6B] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6">
                  <a
                    href={s.ctaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lume-btn-primary inline-flex w-full items-center justify-center gap-2 text-xs uppercase tracking-wider"
                  >
                    <span>{s.ctaLabel}</span>
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Website & Captation support card */}
        <Reveal delay={140}>
          <div className="mt-8 rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex size-11 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F4C542] shrink-0">
                <Globe className="size-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D9531C]">
                  Base digital para captação
                </p>
                <h3 className="mt-1 font-heading text-lg font-bold text-[#101D35]">
                  Precisa também de um website preparado para converter contactos?
                </h3>
                <p className="mt-1.5 text-sm text-[#5B6B8C] max-w-[65ch]">
                  Para empresas sem site ou com páginas desatualizadas, desenvolvemos websites e
                  landing pages rápidos, com SEO estruturado e ligação direta ao atendimento no
                  WhatsApp.
                </p>
              </div>
            </div>
            <a
              href="#planos"
              className="lume-btn-secondary-light shrink-0 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <span>Ver planos com website</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>

        {/* Real implementation deliverables / complements (Section 16) */}
        <Reveal delay={170}>
          <div className="mt-12">
            <h3 className="font-heading text-lg font-bold text-[#101D35]">
              O que acompanha cada implementação para facilitar a adaptação da empresa
            </h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {complements.map((c) => (
                <div
                  key={c.title}
                  className="rounded-[14px] border border-[#E7E3D9] bg-[#FFFFFF] p-5"
                >
                  <c.icon className="size-5 text-[#D9531C]" aria-hidden="true" />
                  <h4 className="mt-3 font-heading text-sm font-bold text-[#101D35]">{c.title}</h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5B6B8C]">{c.text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Automate Pro promo */}
        <Reveal delay={200}>
          <div className="mt-10 rounded-[16px] bg-[#101D35] p-6 sm:p-8 text-[#F5F3EE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex size-11 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F4C542] shrink-0">
                <BotMessageSquare className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-heading text-base font-bold text-[#F5F3EE]">
                  Já tem website ativo? Não precisa de o refazer.
                </h4>
                <p className="mt-1 text-sm text-[#B8C0D0] max-w-[60ch]">
                  Integramos atendimento automático, qualificação e marcação de reuniões sobre o
                  site que já utiliza, sem tirar a sua página do ar.
                </p>
              </div>
            </div>
            <a
              href="/#automate-pro"
              className="lume-btn-primary shrink-0 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
            >
              <span>Ver Automate Pro</span>
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
