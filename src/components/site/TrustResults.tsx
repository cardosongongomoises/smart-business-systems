import { Reveal } from "./Reveal";
import {
  Users,
  TrendingUp,
  Clock,
  BotMessageSquare,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export function TrustResults() {
  const metrics = [
    {
      icon: Clock,
      value: "<10s",
      label: "Tempo de resposta",
      detail: "ao primeiro contacto",
    },
    {
      icon: TrendingUp,
      value: "+35%",
      label: "Contactos marcados",
      detail: "que passam a reunião agendada",
    },
    {
      icon: BotMessageSquare,
      value: "+40%",
      label: "Agendamentos confirmados",
      detail: "com lembretes automáticos",
    },
    {
      icon: Users,
      value: "+50",
      label: "Empresas atendidas",
      detail: "nos últimos 12 meses",
    },
  ];

  return (
    <section
      id="resultados"
      className="py-20 sm:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#2E9E6B]">Resultados</p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
            Empresas angolanas que{" "}
            <span className="text-[#D9531C]">deixaram de perder clientes</span> por demora
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-4 text-base sm:text-lg text-[#5B6B8C] max-w-2xl leading-[1.65]">
            Quando o primeiro contacto é respondido na hora e cada pedido fica registado, a agenda
            da equipa enche com clientes reais.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col items-center text-center justify-center rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-[10px] border border-[#E7E3D9] bg-[#F5F3EE] text-[#D9531C]">
                  <m.icon className="size-5" aria-hidden="true" />
                </div>
                <p className="mt-4 font-heading text-3xl font-extrabold text-[#101D35] tabular-nums">
                  {m.value}
                </p>
                <p className="mt-1.5 font-heading text-sm font-bold text-[#101D35]">{m.label}</p>
                <p className="mt-1 text-xs text-[#5B6B8C]">{m.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Cases */}
        <Reveal delay={150}>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6">
              <p className="lume-eyebrow text-[#D9531C]">Caso 1 · Saúde</p>
              <p className="mt-3 font-heading text-lg font-bold text-[#101D35]">Clínica, Luanda</p>
              <p className="mt-2 text-sm text-[#5B6B8C] leading-relaxed">
                Tinha mais de 20 contactos por mês sem resposta. Agora responde a todos, confirma
                consultas e tem +35% de agendamentos.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#2E9E6B] text-sm font-semibold tabular-nums">
                <TrendingUp className="size-4" aria-hidden="true" />
                <span>+35% agendamentos</span>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6">
              <p className="lume-eyebrow text-[#D9531C]">Caso 2 · Advocacia</p>
              <p className="mt-3 font-heading text-lg font-bold text-[#101D35]">
                Escritório de advocacia
              </p>
              <p className="mt-2 text-sm text-[#5B6B8C] leading-relaxed">
                Consultas respondidas em menos de 10 segundos por WhatsApp, agenda automática, sem
                precisar de recepcionista a tempo inteiro.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#2E9E6B] text-sm font-semibold tabular-nums">
                <Clock className="size-4" aria-hidden="true" />
                <span>Resposta em &lt;10 segundos</span>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6">
              <p className="lume-eyebrow text-[#D9531C]">Caso 3 · Construção &amp; Imobiliário</p>
              <p className="mt-3 font-heading text-lg font-bold text-[#101D35]">
                Construtora, Luanda
              </p>
              <p className="mt-2 text-sm text-[#5B6B8C] leading-relaxed">
                Contacto qualificado e reunião marcada em 2 minutos. A equipa de vendas deixou de
                responder dúvidas repetidas.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#2E9E6B] text-sm font-semibold tabular-nums">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                <span>23 reuniões numa semana</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Testimonials */}
        <Reveal delay={190}>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 text-[#F5F3EE] flex flex-col justify-between">
              <p className="text-sm leading-relaxed">
                &ldquo;O sistema agendou 23 reuniões numa semana sem que a minha equipa tocasse num
                único WhatsApp.&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-[#F4C542]">
                Diretor Comercial · Empresa de construção civil, Luanda
              </p>
            </div>

            <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 text-[#F5F3EE] flex flex-col justify-between">
              <p className="text-sm leading-relaxed">
                &ldquo;Passámos de 2h para menos de 10 segundos no primeiro contacto. A taxa de
                conversão subiu 35%.&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-[#F4C542]">
                CEO · Clínica médica, Luanda
              </p>
            </div>

            <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 text-[#F5F3EE] flex flex-col justify-between">
              <p className="text-sm leading-relaxed">
                &ldquo;O sistema pagou-se no primeiro mês, com 4 reuniões que antes teriam sido
                contactos perdidos.&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-[#F4C542]">
                CEO · Empresa de consultoria
              </p>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={240}>
          <div className="mt-12 flex justify-center">
            <a
              href="/#contacto"
              className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
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
