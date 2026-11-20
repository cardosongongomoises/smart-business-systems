import {
  Bot,
  MessageSquare,
  CalendarCheck,
  Database,
  UserCog,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Reveal } from "./Reveal";

const branches = [
  {
    icon: MessageSquare,
    from: "Pergunta frequente / preços",
    to: "Resposta em menos de 10 segundos",
    result: "Cliente atendido na hora, sem espera",
    human: false,
  },
  {
    icon: CalendarCheck,
    from: "Pedido de reunião",
    to: "Reunião marcada no próprio chat",
    result: "Horário confirmado sem vai-e-vem",
    human: false,
  },
  {
    icon: Database,
    from: "Contacto qualificado",
    to: "Registo completo + alerta à equipa",
    result: "Nenhum pedido cai no esquecimento",
    human: false,
  },
  {
    icon: UserCog,
    from: "Negociação ou pedido complexo",
    to: "Passagem para um vendedor",
    result: "Equipa focada em fechar negócio",
    human: true,
  },
];

export function HumanControl() {
  return (
    <section
      id="controlo"
      className="py-20 sm:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#D9531C]">Controlo Humano</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
            O atendimento filtra as dúvidas. A sua equipa{" "}
            <span className="text-[#2E9E6B]">foca-se em fechar</span>.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#5B6B8C] leading-[1.65]">
            As dúvidas comuns são respondidas automaticamente, a qualquer hora. Quando o cliente
            está pronto para avançar, ou quando a conversa exige uma pessoa, passa para a sua equipa
            com todo o histórico.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 rounded-[16px] p-6 sm:p-7 border border-[#E7E3D9] bg-[#FFFFFF]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E7E3D9] pb-5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-[8px] bg-[#101D35] text-[#F4C542]">
                  <Bot className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-heading text-sm font-bold text-[#101D35]">
                    Quando responde o sistema e quando entra a equipa
                  </p>
                  <p className="text-xs text-[#5B6B8C]">
                    Regras claras definidas consigo antes de arrancar
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 font-heading text-xs font-bold text-[#2E9E6B] uppercase tracking-wider">
                <CheckCircle2 className="size-3.5" aria-hidden="true" />
                Controlo Total
              </span>
            </div>

            <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {branches.map((b, i) => (
                <Reveal as="li" key={b.from} delay={i * 60}>
                  <div
                    className={`h-full rounded-[12px] border p-5 transition-colors ${
                      b.human
                        ? "border-[#2A3D63] bg-[#101D35] text-[#F5F3EE]"
                        : "border-[#E7E3D9] bg-[#F5F3EE] text-[#101D35] hover:border-[#101D35]/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <b.icon
                        className={`size-5 ${b.human ? "text-[#F4C542]" : "text-[#D9531C]"}`}
                        aria-hidden="true"
                      />
                      {b.human && (
                        <span className="font-heading text-[10px] font-bold text-[#F4C542] tracking-wider uppercase">
                          Equipa
                        </span>
                      )}
                    </div>
                    <p
                      className={`mt-4 font-heading text-xs font-bold ${
                        b.human ? "text-[#F5F3EE]" : "text-[#101D35]"
                      }`}
                    >
                      {b.from}
                    </p>
                    <div
                      className={`mt-3 pt-3 border-t ${
                        b.human ? "border-[#2A3D63]" : "border-[#E7E3D9]"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-1.5 text-xs ${
                          b.human ? "text-[#B8C0D0]" : "text-[#5B6B8C]"
                        }`}
                      >
                        <ArrowRight
                          className={`size-3 shrink-0 ${
                            b.human ? "text-[#F36B32]" : "text-[#2E9E6B]"
                          }`}
                          aria-hidden="true"
                        />
                        <span>{b.to}</span>
                      </div>
                      <p
                        className={`mt-1.5 text-xs font-semibold ${
                          b.human ? "text-[#F4C542]" : "text-[#2E9E6B]"
                        }`}
                      >
                        Resultado: {b.result}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 rounded-[12px] border border-[#E7E3D9] bg-[#FFFFFF] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-[#5B6B8C]">
              Pode intervir em qualquer conversa a qualquer momento.{" "}
              <span className="font-semibold text-[#2E9E6B]">
                A sua equipa só gasta tempo com quem quer mesmo comprar.
              </span>
            </p>
            <a
              href="#contacto"
              className="shrink-0 font-heading text-xs font-bold text-[#D9531C] hover:underline whitespace-nowrap"
            >
              Pedir diagnóstico gratuito →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
