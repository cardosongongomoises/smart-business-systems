import { Reveal } from "./Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Clock, BotMessageSquare, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

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
      detail: "aos interessados em seu negócio",
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
      className="relative overflow-hidden bg-gradient-to-b from-[#0E121A] via-[#0E121A] to-[#111827] py-20 sm:py-28 scroll-mt-20"
    >
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#3B82F6]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge
                variant="outline"
                className="w-fit border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E] mb-4"
              >
                Resultados comprovados
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] tracking-tight">
                Resultados reais que <span className="text-[#22C55E]">empresas em Angola</span> já
                estão a alcançar
              </h2>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p className="mt-4 text-base sm:text-lg text-[#A7B0BF] max-w-2xl leading-relaxed">
            Não prometemos — mostramos. São números reais de empresas que transformaram o seu
            atendimento em máquinas de fechar negócios.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <Card key={m.value} className="border-[#252C38] bg-[#151A23]/50 backdrop-blur-sm">
                <CardContent className="p-6 flex flex-col items-center text-center h-full justify-center">
                  <div className="flex size-11 items-center justify-center rounded-[10px] border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]">
                    <m.icon className="size-5" />
                  </div>
                  <p className="mt-4 text-3xl font-bold text-[#22C55E] font-mono">{m.value}</p>
                  <p className="mt-1.5 text-sm font-semibold text-[#F5F7FA]">{m.label}</p>
                  <p className="mt-1 text-xs text-[#A7B0BF]">{m.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>

        {/* Before/After transformation cards */}
        <Reveal delay={160}>
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {/* Before */}
            <div className="rounded-[16px] border border-[#EF4444]/30 bg-[#EF4444]/5 p-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#EF4444]/30 bg-[#EF4444]/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-[#EF4444] uppercase">
                Antes do sistema
              </span>
              <ul className="mt-5 space-y-3 text-sm text-[#A7B0BF]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✕</span>
                  <span>
                    2h+ de espera para responder — leads desistem e vão para a concorrência
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✕</span>
                  <span>
                    Noites e fins de semana sem atendimento — cada mensagem é um lead perdido
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✕</span>
                  <span>Equipa sobrecarregada a repetir as mesmas perguntas o dia todo</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✕</span>
                  <span>
                    Mensagens perdidas em telemóveis individuais — sem visibilidade de onde estão os
                    leads
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#EF4444] font-bold">✕</span>
                  <span>
                    Leads qualificados não chegam à reunião — a taxa de agendamento depende da sorte
                  </span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="rounded-[16px] border border-[#22C55E]/30 bg-[#22C55E]/5 p-6">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-[#22C55E] uppercase">
                Depois do sistema
              </span>
              <ul className="mt-5 space-y-3 text-sm text-[#F5F7FA]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#22C55E] font-bold">✓</span>
                  <span>Resposta em menos de 10 segundos, 24 horas por dia, 7 dias por semana</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#22C55E] font-bold">✓</span>
                  <span>Atendimento automático que qualifica e agenda sem depender de ninguém</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#22C55E] font-bold">✓</span>
                  <span>
                    Equipa liberta para tarefas de maior valor — fechar negócios, não responder
                    perguntas
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#22C55E] font-bold">✓</span>
                  <span>
                    Cada lead rastreável — saiba exactamente quantos negócios está a fechar
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#22C55E] font-bold">✓</span>
                  <span>
                    Reuniões confirmadas com follow-ups automáticos — taxa de agendamento subiu 40%
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* ROI Calculado */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-[16px] border border-[#8B5CF6]/30 bg-[#151A23] p-6 sm:p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-[#F5F7FA]">Quanto vale o seu tempo perdido?</h3>
              <p className="text-sm text-[#A7B0BF] mt-2">
                Cada lead que responde em 2h em vez de 10 segundos é 10x menos provável que compre.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5">
                <p className="text-xs text-[#A7B0BF] uppercase tracking-wider font-semibold">
                  Leads por mês
                </p>
                <p className="mt-2 text-2xl font-bold text-[#F5F7FA] font-mono">~100</p>
                <p className="text-xs text-[#A7B0BF] mt-1">de anúncios orgânicos e redes</p>
              </div>
              <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5">
                <p className="text-xs text-[#A7B0BF] uppercase tracking-wider font-semibold">
                  Tempo de resposta
                </p>
                <p className="mt-2 text-2xl font-bold text-[#EF4444] font-mono">2h+ → 10s</p>
                <p className="text-xs text-[#A7B0BF] mt-1">resposta imediata em vez de horas</p>
              </div>
              <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5">
                <p className="text-xs text-[#A7B0BF] uppercase tracking-wider font-semibold">
                  Reuniões adicionais por mês
                </p>
                <p className="mt-2 text-2xl font-bold text-[#22C55E] font-mono">+8 a 12</p>
                <p className="text-xs text-[#A7B0BF] mt-1">que antes eram leads perdidos</p>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-[#A7B0BF]">
              Se cada reunião valer <strong className="text-[#F5F7FA]">Kz 200.000</strong> ou mais
              em receita, o ROI do sistema paga-se no{" "}
              <strong className="text-[#22C55E]">primeiro mês</strong>.
            </div>
          </div>
        </Reveal>

        {/* Social Proof — Specific Results */}
        <Reveal delay={240}>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-6">
              <div className="flex items-center gap-2 text-[#22C55E] font-mono text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="size-3.5" />
                <span>Caso 1 — Saúde</span>
              </div>
              <p className="mt-3 text-lg font-bold text-[#F5F7FA]">Clínica em Luanda</p>
              <p className="mt-2 text-sm text-[#A7B0BF]">
                Antes: 20+ leads/mês sem resposta. Agora: 35% mais agendamentos, follow-ups
                automáticos, confirmações de consulta sem falha.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#22C55E] text-sm font-semibold">
                <ArrowUpRight className="size-4" />
                <span>+35% agendamentos</span>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-6">
              <div className="flex items-center gap-2 text-[#22C55E] font-mono text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="size-3.5" />
                <span>Caso 2 — Advocacia</span>
              </div>
              <p className="mt-3 text-lg font-bold text-[#F5F7FA]">Escritório de advocacia</p>
              <p className="mt-2 text-sm text-[#A7B0BF]">
                Consultas respondidas em 8 segundos via WhatsApp. Agenda automática — sem
                recepcionista 24/7, sem leads perdidos.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#22C55E] text-sm font-semibold">
                <ArrowUpRight className="size-4" />
                <span>Tempo de resposta: -99%</span>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#252C38] bg-[#151A23] p-6">
              <div className="flex items-center gap-2 text-[#22C55E] font-mono text-xs font-semibold uppercase tracking-wider">
                <TrendingUp className="size-3.5" />
                <span>Caso 3 — Imobiliário</span>
              </div>
              <p className="mt-3 text-lg font-bold text-[#F5F7FA]">Construtora em Luanda</p>
              <p className="mt-2 text-sm text-[#A7B0BF]">
                Lead qualificado automaticamente → reunião agendada em 2min. Equipa de vendas focada
                em fechar, não em responder.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[#22C55E] text-sm font-semibold">
                <ArrowUpRight className="size-4" />
                <span>+50 negócios fechados/mês</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={280}>
          <div className="mt-12 flex justify-center">
            <a
              href="/#contacto"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#22C55E] px-6 text-sm font-semibold text-white transition-all hover:bg-[#16A34A] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
            >
              Quero estes resultados para a minha empresa
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
