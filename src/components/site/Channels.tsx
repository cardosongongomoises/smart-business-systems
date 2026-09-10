import { MessageCircle, Mail, Check } from "lucide-react";
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
      className="py-20 sm:py-28 bg-[#080A0F] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase mb-4">
            Canais de Comunicação Omnichannel
          </span>
          <h2 className="text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Um atendimento corporativo que não dorme.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#A7B0BF]">
            Conecte sua empresa aos canais em que os clientes tomam decisões diárias de compra em
            Angola.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {channels.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <div className="glass-card flex h-full flex-col justify-between rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-7 transition-[border-color,transform] hover:border-[#3B82F6]/50 hover:-translate-y-0.5">
                <div>
                  <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#252C38] bg-[#0E121A] text-[#3B82F6]">
                    <c.icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#F5F7FA] tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A7B0BF]">{c.desc}</p>
                  <ul className="mt-6 space-y-2.5">
                    {c.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-center gap-2.5 text-xs sm:text-sm text-[#A7B0BF]"
                      >
                        <Check className="size-3.5 text-[#3B82F6] shrink-0" aria-hidden="true" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-7 pt-4 border-t border-[#252C38]/60 flex items-center justify-between text-xs text-[#667085]">
                  <span>Disponibilidade 24/7</span>
                  <span className="text-[#22C55E] font-medium flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" /> Sincronizado
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 rounded-[16px] border border-[#252C38] bg-[#0E121A] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-base sm:text-lg text-[#A7B0BF]">
              Enquanto sua equipa está em reunião ou fora do expediente,{" "}
              <span className="font-semibold text-[#F5F7FA]">
                seu agente digital continua atendendo, qualificando e agendando.
              </span>
            </p>
            <a
              href="#contacto"
              className="shrink-0 inline-flex h-[40px] items-center justify-center gap-2 rounded-[8px] bg-[#3B82F6] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#2563EB]"
            >
              Ativar canais agora
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
