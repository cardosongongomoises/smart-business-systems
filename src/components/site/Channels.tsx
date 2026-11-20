import { MessageCircle, Mail, Check, CheckCircle2, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";

const channels = [
  {
    icon: MessageCircle,
    title: "WhatsApp Oficial da Empresa",
    desc: "Atendimento imediato 24h no principal canal comercial de Angola, sem mudar o ritmo da sua equipa.",
    items: [
      "Resposta imediata em menos de 10 segundos",
      "Resolução das perguntas mais frequentes do negócio",
      "Qualificação de orçamento, necessidade e urgência",
      "Marcação automática de reuniões no próprio chat",
      "Confirmação e lembretes para reduzir faltas",
      "Retoma automática de contactos que pararam de responder",
    ],
  },
  {
    icon: Mail,
    title: "E-mail e Formulários do Website",
    desc: "Nenhum pedido enviado pelo site ou por e-mail fica esquecido numa caixa de entrada.",
    items: [
      "Resposta automática personalizada em segundos",
      "Registo imediato com nome, telefone e histórico",
      "Encaminhamento para o comercial responsável",
      "Acompanhamento programado de propostas enviadas",
      "Notificações claras quando um contacto quer comprar",
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
          <p className="lume-eyebrow text-[#D9531C]">Onde atendemos os seus clientes</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
            WhatsApp e e-mail atendidos sem esperar pela equipa.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#5B6B8C] leading-[1.65]">
            Onde quer que o cliente entre em contacto com a sua empresa em Angola, recebe resposta
            na hora e avança para a reunião.
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
                  <span className="font-medium tabular-nums">Atendimento 24h</span>
                  <span className="inline-flex items-center gap-1.5 text-[#2E9E6B] font-semibold">
                    <CheckCircle2 className="size-3.5" aria-hidden="true" />
                    Ligado ao seu painel
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
                os pedidos continuam a ser respondidos, qualificados e marcados na agenda.
              </span>
            </p>
            <a
              href="#contacto"
              className="lume-btn-primary shrink-0 inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <span>Quero o meu diagnóstico gratuito</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
