import { Reveal } from "./Reveal";
import {
  ArrowUpRight,
  Globe,
  BotMessageSquare,
  Calendar,
  Database,
  Users,
  Check,
} from "lucide-react";
import { site } from "@/lib/site-config";

const services = [
  {
    num: "01",
    icon: BotMessageSquare,
    problem: "Mensagens sem resposta",
    title: "Atendimento imediato, 24 horas por dia",
    description:
      "Cada contacto por WhatsApp ou website recebe resposta em menos de 10 segundos, incluindo noites, fins de semana e feriados.",
    result: "Nenhum contacto fica à espera, mesmo às 3 da manhã.",
    features: [
      "Resposta automática em menos de 10 segundos",
      "Atendimento ativo à noite, fins de semana e feriados",
      "Funciona diretamente no WhatsApp e no website",
      "Respostas adaptadas às regras e serviços da sua empresa",
    ],
  },
  {
    num: "02",
    icon: Calendar,
    problem: "Reuniões que não se marcam, ou a que ninguém aparece",
    title: "Marcação automática com lembretes",
    description:
      "O cliente escolhe o horário no próprio chat. O sistema confirma, bloqueia a agenda e envia lembretes antes da reunião.",
    result: "Menos faltas (até -75%) e agenda preenchida sem troca de e-mails.",
    features: [
      "O cliente escolhe o horário livre direto no chat",
      "Confirmação imediata e bloqueio na agenda",
      "Lembretes automáticos antes da reunião",
      "Zero vai-e-vem para tentar combinar uma hora",
    ],
  },
  {
    num: "03",
    icon: Database,
    problem: "Contactos esquecidos",
    title: "Registo e acompanhamento automáticos",
    description:
      "Cada contacto fica guardado com nome, telefone, interesse e histórico. Quem parou de responder é retomado nos dias certos.",
    result: "Ninguém cai no esquecimento e passa a saber quantos negócios tem em curso.",
    features: [
      "Nome, telefone, interesse e histórico num só lugar",
      "Retoma automática para quem pediu orçamento e parou",
      "Visibilidade clara de cada negócio em curso",
      "Fim dos contactos perdidos em telemóveis pessoais",
    ],
  },
  {
    num: "04",
    icon: Users,
    problem: "Equipa a repetir respostas",
    title: "Só chega à equipa quem quer comprar",
    description:
      "As dúvidas comuns são respondidas automaticamente. Quando o cliente está pronto, a conversa passa para um vendedor com o histórico completo.",
    result: "A sua equipa gasta o tempo a fechar negócios, não a triar curiosos.",
    features: [
      "Triagem automática de dúvidas frequentes, preços e prazos",
      "Filtro de orçamento e urgência antes de chamar a equipa",
      "Passagem imediata para um vendedor com resumo completo",
      "Controlo total para assumir a conversa a qualquer momento",
    ],
  },
  {
    num: "05",
    icon: Globe,
    problem: "Site que não traz pedidos",
    title: "Website que transforma visitas em contactos",
    description:
      "Para quem não tem site, ou tem um que ninguém contacta: site rápido, com SEO local e ligação direta ao WhatsApp.",
    result: "+40% de contactos diretos face a sites genéricos.",
    features: [
      "SEO local para aparecer quando procuram no Google",
      "Design profissional que transmite confiança imediata",
      "Ligação direta ao WhatsApp e formulário simples",
      "Carregamento rápido no telemóvel",
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
          <p className="lume-eyebrow text-[#D9531C]">04 · O que resolvemos</p>
          <h2 className="mt-4 max-w-3xl font-heading text-3xl leading-[1.15] font-bold text-[#101D35] sm:text-4xl text-balance">
            Não vendemos tecnologia. Resolvemos cinco problemas concretos do seu atendimento
            comercial.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 max-w-[65ch] text-base sm:text-lg text-[#5B6B8C] leading-relaxed">
            Como fazemos: um assistente automático, treinado com a informação da sua empresa, atende
            e qualifica. Quando a conversa exige uma pessoa, passa para a sua equipa.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70} className={i === 4 ? "lg:col-span-2" : ""}>
              <div className="group flex h-full flex-col rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-7 transition-colors duration-200 hover:border-[#101D35]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-[10px] bg-[#101D35] text-[#F36B32] shrink-0">
                      <s.icon className="size-5" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold text-[#D9531C]">{s.problem}</span>
                  </div>
                  <span className="font-heading text-sm font-extrabold text-[#5B6B8C] tabular-nums shrink-0">
                    {s.num}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-xl font-bold text-[#101D35]">{s.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-[#5B6B8C]">{s.description}</p>

                <p className="mt-4 text-xs font-semibold text-[#2E9E6B]">Resultado: {s.result}</p>

                <ul
                  className={`mt-5 gap-2.5 border-t border-[#E7E3D9] pt-5 ${
                    i === 4 ? "grid sm:grid-cols-2" : "space-y-2.5"
                  }`}
                >
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
                    <span>Quero resolver isto na minha empresa</span>
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
                  Já tem website? Não o refazemos.
                </h4>
                <p className="mt-1 text-sm text-[#B8C0D0] max-w-[60ch]">
                  Juntamos o atendimento imediato no WhatsApp, qualificação e marcação de reuniões
                  ao site que já tem, em dias e sem o tirar do ar.
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
