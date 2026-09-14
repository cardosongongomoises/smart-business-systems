import { Reveal } from "./Reveal";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Globe,
  BotMessageSquare,
  Cog,
  Smartphone,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { site } from "@/lib/site-config";
import { Link } from "@tanstack/react-router";

const services = [
  {
    icon: Globe,
    title: "Websites que convertem visitantes em clientes",
    description:
      "Não é só um site — é uma ferramenta que transforma visitas em receita. Design profissional, carregamento rápido, SEO para ser encontrado, e estrutura que guia o visitante até à acção que você quer que ele tome.",
    result: "+40% mais contactos directos do que sites genéricos",
    features: [
      "SEO local para ser encontrado no Google",
      "Design que transmite credibilidade",
      "Integração directa com WhatsApp",
      "Carregamento em menos de 2 segundos",
    ],
  },
  {
    icon: BotMessageSquare,
    title: "Atendimento 24/7 que fecha negócios sozinho",
    description:
      "O Motor ATQA responde, qualifica e agenda reuniões automaticamente — ao contrário de um formulário de contacto que ninguém preenche, ou de uma WhatsApp que ninguém responde. Cada lead é atendido em segundos, não em horas.",
    result: "Resposta em <10 segundos, 24/7/365",
    features: [
      "Resposta em menos de 10 segundos",
      "Qualificação automática do lead",
      "Agendamento direto na sua agenda",
      "Zero leads perdidos — mesmo às 3 da manhã",
    ],
  },
  {
    icon: Cog,
    title: "Automação que liberta a sua equipa",
    description:
      "Automatize tarefas repetitivas: follow-ups, lembretes, relatórios, actualizações de estado. Sua equipa deixa de perder tempo em tarefas manuais e passa a fechar negócios — que é onde deveria estar.",
    result: "-50% tempo gasto em tarefas repetitivas",
    features: [
      "Lembretes automáticos — zero faltas",
      "Follow-ups de venta automáticos",
      "Relatórios semanalmente sem esforço",
      "Integração com as ferramentas que já usa",
    ],
  },
  {
    icon: Smartphone,
    title: "Sistemas sob medida para o seu negócio",
    description:
      "Cada empresa tem um processo diferente. Desenvolvemos sistemas que se adaptam ao seu fluxo — não o contrário.CRM, gestão de leads, painéis operacionais — tudo construído à medida do que o seu negócio precisa.",
    result: "Solução feita para o seu processo, não o contrário",
    features: [
      "CRM personalizado para o seu fluxo",
      "Painel de controlo com indicadores em tempo real",
      "Sistema de gestão de leads automatizado",
      "Integração com WhatsApp, email e mais",
    ],
  },
];

export function Services() {
  return (
    <section
      id="servicos"
      className="relative overflow-hidden bg-gradient-to-b from-[#111827] via-[#111827] to-[#0E121A] py-20 sm:py-28 scroll-mt-20"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#22C55E]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#22C55E] uppercase">
            Nossos Serviços
          </span>
          <h2 className="mt-5 max-w-3xl text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Cada serviço é{" "}
            <span className="text-[#22C55E]">um resultado</span> que entregamos ao
            seu negócio
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-[#A7B0BF] leading-relaxed">
            Não vendemos "sites", "automação" ou "inteligência artificial". Vendemos o
            que essas coisas fazem pelo seu negócio: mais contactos, menos tempo perdido,
            e negócios fechados enquanto dorme.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <Card className="group relative h-full border-[#252C38] bg-[#151A23]/80 backdrop-blur-sm transition-all duration-300 hover:border-[#22C55E]/30 hover:bg-[#151A23]">
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="flex items-start justify-between">
                    <div className="flex size-11 items-center justify-center rounded-[10px] border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E] transition-colors group-hover:bg-[#22C55E]/20">
                      <s.icon className="size-5" />
                    </div>
                    <ArrowUpRight className="size-5 text-[#A7B0BF] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[#22C55E]" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-[#F5F7FA] tracking-tight">
                    {s.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#A7B0BF]">
                    {s.description}
                  </p>

                  {/* Result badge */}
                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1.5 self-start">
                    <ArrowUpRight className="size-3 text-[#22C55E]" />
                    <span className="text-[11px] font-semibold text-[#22C55E]">
                      Resultado: {s.result}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="mt-5 space-y-2.5 border-t border-[#252C38] pt-5">
                    {s.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2.5 text-sm text-[#A7B0BF]"
                      >
                        <MessageSquare className="size-4 mt-0.5 text-[#22C55E]/80 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-5 border-t border-[#252C38]/60">
                    <a
                      href={site.ctaSecond.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#22C55E] transition-colors hover:text-[#16A34A]"
                    >
                      {site.ctaSecond.label}
                      <ArrowUpRight className="size-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Automate Pro promo */}
        <Reveal delay={320}>
          <div className="mt-12 rounded-[16px] border border-[#3B82F6]/30 bg-[#3B82F6]/5 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex size-11 items-center justify-center rounded-[10px] border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#3B82F6] shrink-0">
                <BotMessageSquare className="size-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#F5F7FA]">
                  Já tem um site? Adicione Inteligência Artificial
                </h4>
                <p className="mt-1 text-sm text-[#A7B0BF]">
                  O Motor ATQA integra-se ao seu site actual em dias, não em meses — com
                  atendimento automático via WhatsApp, CRM e dashboard de conversas.
                </p>
              </div>
            </div>
            <Link
              to="/automate-pro"
              className="shrink-0 inline-flex h-[40px] items-center justify-center gap-2 rounded-[8px] border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-5 text-sm font-semibold text-[#60A5FA] transition-all hover:bg-[#3B82F6]/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
            >
              <BotMessageSquare className="size-4" />
              Ver Automate Pro
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
