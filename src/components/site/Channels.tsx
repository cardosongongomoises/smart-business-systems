import { MessageCircle, Mail, Check, CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp Oficial com IA",
    desc: "Atendimento automático 24/7 no canal de comunicação mais utilizado em Angola.",
    items: [
      "Resposta imediata em menos de 10 segundos",
      "Resolução de perguntas frequentes do negócio",
      "Qualificação de orçamento e urgência",
      "Agendamento automático de reuniões",
      "Confirmação e lembretes prévios",
      "Follow-up de oportunidades abertas",
    ],
  },
  {
    icon: Mail,
    title: "E-mail Corporativo Inteligente",
    desc: "Triagem e categorização de mensagens empresariais sem perder oportunidades.",
    items: [
      "Respostas automáticas personalizadas",
      "Classificação por relevância e prioridade",
      "Encaminhamento para o responsável certo",
      "Follow-up programado para propostas",
      "Notificações instantâneas para a direção",
    ],
  },
];

export function Channels() {
  return (
    <section
      id="canais"
      className="py-20 sm:py-28 bg-[#FFFFFF] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#D9531C]">Canais de Comunicação Omnichannel</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
            Um atendimento corporativo que não dorme.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#5B6B8C] leading-[1.65]">
            Conecte a sua empresa aos canais em que os clientes tomam decisões diárias de compra em
            Angola.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="flex h-full flex-col justify-between rounded-[16px] border border-[#E7E3D9] bg-[#F5F3EE] p-6 sm:p-7 transition-colors hover:border-[#101D35]/40">
                <div>
                  <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#E7E3D9] bg-[#FFFFFF] text-[#D9531C]">
                    <c.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-bold text-[#101D35] tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#5B6B8C]">{c.desc}</p>
                  <ul className="mt-6 space-y-2.5">
                    {c.items.map((it) => (
                      <li key={it} className="flex items-start gap-2.5 text-sm text-[#101D35]">
                        <Check
                          className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-7 pt-4 border-t border-[#E7E3D9] flex items-center justify-between text-xs text-[#5B6B8C]">
                  <span className="font-medium tabular-nums">Disponibilidade 24/7</span>
                  <span className="inline-flex items-center gap-1.5 text-[#2E9E6B] font-semibold">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Sincronizado
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-[#F5F3EE]">
            <p className="text-base sm:text-lg text-[#B8C0D0] leading-relaxed">
              Enquanto a sua equipa está em reunião ou fora do expediente,{" "}
              <span className="font-semibold text-[#F5F3EE]">
                o seu agente digital continua a atender, qualificar e agendar.
              </span>
            </p>
            <a
              href="#contacto"
              className="lume-btn-primary shrink-0 inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <span>Ativar canais agora</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
