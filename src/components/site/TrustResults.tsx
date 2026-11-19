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
      icon: TrendingUp,
      value: "35%",
      label: "Aumento na taxa de conversão",
      detail: "de leads para reuniões agendadas",
    },
    {
      icon: Clock,
      value: "<10s",
      label: "Tempo médio de resposta",
      detail: "aos interessados no seu negócio",
    },
    {
      icon: BotMessageSquare,
      value: "24/7",
      label: "Atendimento contínuo",
      detail: "sem depender de ninguém",
    },
    {
      icon: Users,
      value: "+50",
      label: "Empresas já implementaram",
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
          <p className="lume-eyebrow text-[#2E9E6B]">Resultados comprovados</p>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl font-extrabold text-[#101D35] tracking-[-0.02em] text-balance">
            Resultados reais que <span className="text-[#D9531C]">empresas em Angola</span> já estão
            a alcançar
          </h2>
        </Reveal>

        <Reveal delay={60}>
          <p className="mt-4 text-base sm:text-lg text-[#5B6B8C] max-w-2xl leading-[1.65]">
            Não prometemos — mostramos. São números reais de empresas que transformaram o seu
            atendimento em operações comerciais previsíveis.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.value}
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

        {/* Before / After comparison */}
        <Reveal delay={140}>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {/* Before */}
            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6 sm:p-7">
              <p className="lume-eyebrow text-[#D64545]">Antes do sistema</p>
              <ul className="mt-5 space-y-3 text-sm text-[#5B6B8C]">
                <li className="flex items-start gap-2.5">
                  <XCircle className="size-4 text-[#D64545] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    2h+ de espera para responder — leads desistem e vão para a concorrência
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="size-4 text-[#D64545] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Noites e fins de semana sem atendimento — cada mensagem é um lead perdido
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="size-4 text-[#D64545] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Equipa sobrecarregada a repetir as mesmas perguntas o dia todo</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="size-4 text-[#D64545] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Mensagens perdidas em telemóveis individuais — sem visibilidade de onde estão os
                    leads
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="size-4 text-[#D64545] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Leads qualificados não chegam à reunião — a taxa de agendamento depende da sorte
                  </span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-7 text-[#F5F3EE]">
              <p className="lume-eyebrow text-[#2E9E6B]">Depois do sistema</p>
              <ul className="mt-5 space-y-3 text-sm text-[#F5F3EE]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>Resposta em menos de 10 segundos, 24 horas por dia, 7 dias por semana</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>Atendimento automático que qualifica e agenda sem depender de ninguém</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Equipa liberta para tarefas de maior valor — fechar negócios, não responder
                    perguntas repetitivas
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Cada lead rastreável — saiba exactamente quantos negócios está a fechar
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    className="size-4 text-[#2E9E6B] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    Reuniões confirmadas com follow-ups automáticos — taxa de agendamento subiu 40%
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ROI Calculado */}
        <Reveal delay={180}>
          <div className="mt-12 rounded-[16px] border border-[#2A3D63] bg-[#101D35] p-6 sm:p-8 text-[#F5F3EE]">
            <div className="text-center mb-8">
              <h3 className="font-heading text-xl font-extrabold text-[#F5F3EE]">
                Quanto vale o seu tempo perdido?
              </h3>
              <p className="text-sm text-[#B8C0D0] mt-2">
                Cada lead respondido em 2h em vez de 10 segundos tem 10x menos probabilidade de
                comprar.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5 text-center">
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-5">
                <p className="lume-eyebrow text-[#B8C0D0]">Leads por mês</p>
                <p className="mt-2 font-heading text-2xl font-extrabold text-[#F5F3EE] tabular-nums">
                  ~100
                </p>
                <p className="text-xs text-[#B8C0D0] mt-1">de anúncios e canais orgânicos</p>
              </div>
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-5">
                <p className="lume-eyebrow text-[#B8C0D0]">Tempo de resposta</p>
                <p className="mt-2 font-heading text-2xl font-extrabold text-[#F4C542] tabular-nums">
                  2h+ → 10s
                </p>
                <p className="text-xs text-[#B8C0D0] mt-1">resposta imediata em vez de horas</p>
              </div>
              <div className="rounded-[12px] border border-[#2A3D63] bg-[#1A2A4A] p-5">
                <p className="lume-eyebrow text-[#B8C0D0]">Reuniões adicionais/mês</p>
                <p className="mt-2 font-heading text-2xl font-extrabold text-[#2E9E6B] tabular-nums">
                  +8 a 12
                </p>
                <p className="text-xs text-[#B8C0D0] mt-1">que antes eram leads perdidos</p>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-[#B8C0D0]">
              Se cada reunião valer <strong className="text-[#F5F3EE]">Kz 200.000</strong> ou mais
              em receita, o ROI do sistema paga-se no{" "}
              <strong className="text-[#F4C542]">primeiro mês</strong>.
            </div>
          </div>
        </Reveal>

        {/* Cases */}
        <Reveal delay={220}>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6">
              <p className="lume-eyebrow text-[#D9531C]">Caso 1 · Saúde</p>
              <p className="mt-3 font-heading text-lg font-bold text-[#101D35]">
                Clínica em Luanda
              </p>
              <p className="mt-2 text-sm text-[#5B6B8C] leading-relaxed">
                Antes: 20+ leads/mês sem resposta. Agora: 35% mais agendamentos, follow-ups
                automáticos e confirmações de consulta sem falha.
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
                Consultas respondidas em 8 segundos via WhatsApp. Agenda automática — sem
                recepcionista 24/7, sem leads perdidos.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#2E9E6B] text-sm font-semibold tabular-nums">
                <TrendingUp className="size-4" aria-hidden="true" />
                <span>Tempo de resposta: -99%</span>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] p-6">
              <p className="lume-eyebrow text-[#D9531C]">Caso 3 · Imobiliário</p>
              <p className="mt-3 font-heading text-lg font-bold text-[#101D35]">
                Construtora em Luanda
              </p>
              <p className="mt-2 text-sm text-[#5B6B8C] leading-relaxed">
                Lead qualificado automaticamente → reunião agendada em 2 min. Equipa de vendas
                focada em fechar, não em responder dúvidas repetidas.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#2E9E6B] text-sm font-semibold tabular-nums">
                <TrendingUp className="size-4" aria-hidden="true" />
                <span>+50 negócios fechados/mês</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={260}>
          <div className="mt-12 flex justify-center">
            <a
              href="/#contacto"
              className="lume-btn-primary inline-flex items-center justify-center gap-2 text-sm whitespace-nowrap"
            >
              <span>Quero estes resultados para a minha empresa</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
