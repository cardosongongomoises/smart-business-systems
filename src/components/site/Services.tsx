import { Reveal } from "./Reveal";
import { ArrowUpRight, Globe, BotMessageSquare, Cog, Smartphone, Check } from "lucide-react";
import { site } from "@/lib/site-config";

const services = [
  {
    num: "01",
    icon: Globe,
    title: "Websites que convertem visitantes em clientes",
    description:
      "Não é só um site — é uma ferramenta que transforma visitas em receita. Design profissional, carregamento rápido, SEO para ser encontrado e estrutura que guia o visitante até à ação.",
    result: "+40% mais contactos diretos do que sites genéricos",
    features: [
      "SEO local para ser encontrado no Google",
      "Design que transmite credibilidade",
      "Integração direta com WhatsApp",
      "Carregamento em menos de 2 segundos",
    ],
  },
  {
    num: "02",
    icon: BotMessageSquare,
    title: "Atendimento 24/7 que fecha negócios sozinho",
    description:
      "O Motor ATQA responde, qualifica e agenda reuniões automaticamente — ao contrário de um formulário que ninguém preenche ou de um WhatsApp sem resposta.",
    result: "Resposta em <10 segundos, 24/7/365",
    features: [
      "Resposta em menos de 10 segundos",
      "Qualificação automática do lead",
      "Agendamento direto na sua agenda",
      "Zero leads perdidos — mesmo às 3 da manhã",
    ],
  },
  {
    num: "03",
    icon: Cog,
    title: "Automação que liberta a sua equipa",
    description:
      "Automatize tarefas repetitivas: follow-ups, lembretes, relatórios e atualizações de estado. A sua equipa deixa de perder tempo em tarefas manuais e passa a fechar negócios.",
    result: "-50% tempo gasto em tarefas repetitivas",
    features: [
      "Lembretes automáticos — zero faltas",
      "Follow-ups comerciais automáticos",
      "Relatórios semanais sem esforço",
      "Integração com as ferramentas que já usa",
    ],
  },
  {
    num: "04",
    icon: Smartphone,
    title: "Sistemas sob medida para o seu negócio",
    description:
      "Cada empresa tem um processo diferente. Desenvolvemos sistemas que se adaptam ao seu fluxo — CRM, gestão de leads e painéis operacionais construídos à medida.",
    result: "Solução feita para o seu processo",
    features: [
      "CRM personalizado para o seu fluxo",
      "Painel de controlo com indicadores em tempo real",
      "Sistema de gestão de leads automatizado",
      "Integração com WhatsApp, e-mail e calendário",
    ],
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
          <p className="lume-eyebrow text-[#D9531C]">04 · Nossos serviços</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-[1.15] font-bold text-[#101D35] sm:text-4xl text-balance">
            Cada serviço é um resultado concreto entregue ao seu negócio
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 max-w-[65ch] text-base sm:text-lg text-[#5B6B8C] leading-relaxed">
            Não vendemos tecnologia abstrata. Entregamos o que ela produz na prática: mais contactos
            qualificados, menos tempo desperdiçado e negócios fechados enquanto dorme.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="group flex h-full flex-col rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-7 transition-colors duration-200 hover:border-[#101D35]">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F36B32]">
                    <s.icon className="size-5" aria-hidden="true" />
                  </div>
                  <span className="font-heading text-sm font-extrabold text-[#5B6B8C] tabular-nums">
                    {s.num}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-xl font-bold text-[#101D35]">{s.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-[#5B6B8C]">{s.description}</p>

                <p className="mt-4 text-xs font-semibold text-[#2E9E6B]">Resultado: {s.result}</p>

                <ul className="mt-5 space-y-2.5 border-t border-[#E7E3D9] pt-5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#101D35]">
                      <Check className="size-4 mt-0.5 text-[#F36B32] shrink-0" aria-hidden="true" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 border-t border-[#E7E3D9]">
                  <a
                    href={site.ctaSecond.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-heading text-sm font-bold text-[#101D35] transition-colors hover:text-[#D9531C]"
                  >
                    {site.ctaSecond.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Automate Pro promo */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-[16px] bg-[#101D35] p-6 sm:p-8 text-[#F5F3EE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="flex size-11 items-center justify-center rounded-[10px] border border-[#2A3D63] bg-[#1A2A4A] text-[#F4C542] shrink-0">
                <BotMessageSquare className="size-5" aria-hidden="true" />
              </div>
              <div>
                <h4 className="font-heading text-base font-bold text-[#F5F3EE]">
                  Já tem um website? Adicione Inteligência Artificial sem começar do zero
                </h4>
                <p className="mt-1 text-sm text-[#B8C0D0] max-w-[60ch]">
                  O Motor ATQA integra-se ao seu site atual em dias — com atendimento automático via
                  WhatsApp, CRM e dashboard de conversas.
                </p>
              </div>
            </div>
            <a
              href="/#automate-pro"
              className="lume-btn-primary shrink-0 inline-flex items-center justify-center gap-2 text-xs uppercase tracking-wider whitespace-nowrap"
            >
              Ver Automate Pro
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
