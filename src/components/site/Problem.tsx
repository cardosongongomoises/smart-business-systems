import { MessageSquare, Clock, LogOut } from "lucide-react";
import { Reveal } from "./Reveal";

const flow = [
  {
    icon: MessageSquare,
    title: "Cliente manda mensagem",
    text: "Olá, gostaria de saber mais sobre o serviço.",
    status: "Interessado",
  },
  {
    icon: Clock,
    title: "Ninguém responde",
    text: "5 minutos sem resposta. O lead começa a pensar: será que esta empresa é séria?",
    status: "A esfriar",
  },
  {
    icon: LogOut,
    title: "Cliente vai embora",
    text: "Enquanto procura outro fornecedor, já perdeu a oportunidade — e o dinheiro que ela representaria.",
    status: "Lead perdido",
  },
];

export function Problem() {
  return (
    <section
      id="problema"
      className="relative py-20 sm:py-28 bg-[#0E121A] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#EF4444]/30 bg-[#EF4444]/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#EF4444] uppercase">
            O custo invisível
          </span>
          <h2 className="mt-5 max-w-3xl text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Enquanto sua equipa trabalha, quantos negócios estão a ser fechados pela concorrência?
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-5 max-w-2xl space-y-2 text-base leading-relaxed text-[#A7B0BF]">
            <p>
              Muitas empresas em Angola têm excelentes serviços, boa reputação e clientes
              interessados.
            </p>
            <p>
              O problema não é a qualidade. É a velocidade. Cada minuto sem resposta é um cliente
              que vai para a concorrência — e nunca volta. Em Angola, onde o WhatsApp é o principal
              canal de contacto, isto acontece{" "}
              <strong className="text-[#EF4444]">todos os dias</strong>.
            </p>
            <p className="text-sm text-[#EF4444] font-medium">
              O resultado? Leads perdidos, receita que podia ter entrado, e concorrência que cresce
              enquanto você dorme.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {flow.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 100}>
              <div className="glass-card flex h-full flex-col justify-between rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 transition-[border-color,transform] hover:border-[#EF4444]/50 hover:-translate-y-0.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444]">
                      <c.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#EF4444]">
                      Etapa 0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#F5F7FA] tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A7B0BF]">{c.text}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#252C38]/60 flex items-center justify-between text-xs">
                  <span className="text-[#667085]">Status do lead</span>
                  <span className={i === 2 ? "text-[#EF4444] font-bold" : "text-[#A7B0BF]"}>
                    {c.status}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Stat Callout */}
        <Reveal delay={80}>
          <div className="mt-10 rounded-[12px] border border-[#EF4444]/30 bg-[#EF4444]/5 p-5 flex items-center gap-4">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-[#EF4444]">70%</span>
            <p className="text-sm text-[#A7B0BF]">
              dos leads desistem se não receberem resposta nos{" "}
              <strong className="text-[#F5F7FA]">primeiros 5 minutos</strong>. Em Angola, a maioria
              das empresas leva 2 a 24 horas — ou nunca responde.
            </p>
          </div>
        </Reveal>

        {/* Before/After Comparison */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252C38] pb-5">
              <div>
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#EF4444] uppercase">
                  O que está a acontecer agora
                </span>
                <h3 className="text-xl font-bold text-[#F5F7FA] mt-1">
                  Quanto dinheiro está a deixar na mesa?
                </h3>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-[12px] border border-[#EF4444]/30 bg-[#EF4444]/5 p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#EF4444]/20">
                  <span className="text-sm font-bold text-[#EF4444] uppercase tracking-wider">
                    Sem Sistema Automatizado
                  </span>
                  <span className="text-xs font-mono text-[#EF4444]">Perda diária</span>
                </div>
                <ul className="mt-4 space-y-3 text-xs sm:text-sm text-[#A7B0BF]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>
                      <strong>Tempo de resposta:</strong> 2h a 24h — enquanto o lead procura outro
                      fornecedor.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>
                      <strong>Noites e Fins de semana:</strong> 0% de resposta — cada mensagem é um
                      lead perdido.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>
                      <strong>Equipa sobrecarregada:</strong> Repetem as mesmas perguntas o dia todo
                      em vez de fechar negócios.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>
                      <strong>Gestão:</strong> Mensagens perdidas em telemóveis individuais — sem
                      saber quantos leads ficaram sem resposta.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-[12px] border border-[#22C55E]/40 bg-[#22C55E]/5 p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#22C55E]/30">
                  <span className="text-sm font-bold text-[#22C55E] uppercase tracking-wider">
                    Com o sistema a funcionar
                  </span>
                  <span className="text-xs font-mono text-[#22C55E]">Resultado diário</span>
                </div>
                <ul className="mt-4 space-y-3 text-xs sm:text-sm text-[#F5F7FA]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>
                      <strong>Resposta imediata:</strong> Menos de 10 segundos, 24 horas por dia —
                      sem depender de ninguém.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>
                      <strong>Qualificação automática:</strong> Filtra quem está pronto para comprar
                      — sem desperdiçar tempo.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>
                      <strong>Agendamento direto:</strong> Reuniões marcadas automaticamente — mais
                      negócios fechados.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>
                      <strong>Visibilidade total:</strong> Cada lead rastreável — saiba exactamente
                      quantos negócios está a fechar.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Social Proof — Results in Numbers */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] border border-[#8B5CF6]/30 bg-[#151A23] p-6 sm:p-8">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#C084FC] uppercase">
                Resultados reais de empresas em Angola
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-[#22C55E] font-mono">+50</p>
                <p className="text-xs text-[#A7B0BF] mt-1">Empresas a fechar negócios 24/7</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#22C55E] font-mono">+40%</p>
                <p className="text-xs text-[#A7B0BF] mt-1">Mais agendamentos confirmados</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#22C55E] font-mono">-75%</p>
                <p className="text-xs text-[#A7B0BF] mt-1">Redução em faltas de reuniões</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#22C55E] font-mono">+35%</p>
                <p className="text-xs text-[#A7B0BF] mt-1">Aumento na taxa de conversão</p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5">
                <p className="text-sm text-[#F5F7FA] italic">
                  "O sistema agendou 23 reuniões numa semana sem que a minha equipa tocasse num
                  único WhatsApp."
                </p>
                <p className="mt-3 text-xs text-[#A7B0BF]">
                  — Diretor Comercial, Empresa de Construção Civil
                </p>
              </div>
              <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5">
                <p className="text-sm text-[#F5F7FA] italic">
                  "Passámos de 2h para 8 segundos no primeiro contacto. A taxa de conversão subiu
                  35%."
                </p>
                <p className="mt-3 text-xs text-[#A7B0BF]">— CEO, Clínica em Luanda</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-[16px] border border-[#3B82F6]/30 bg-[#151A23] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-base sm:text-lg font-bold text-[#F5F7FA]">
                Cada minuto sem o Motor ATQA são{" "}
                <span className="text-gradient">leads perdidos para a concorrência.</span>
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#A7B0BF]">
                Atendimento automático imediato, qualificação estruturada e agendamento direto na
                sua agenda.
              </p>
            </div>
            <a
              href="#como-funciona"
              className="shrink-0 inline-flex h-[42px] items-center justify-center gap-2 rounded-[8px] bg-[#22C55E] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#16A34A]"
            >
              Ver como funciona
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
