import { MessageSquare, Clock, LogOut } from "lucide-react";
import { Reveal } from "./Reveal";

const cards = [
  {
    icon: MessageSquare,
    title: "Cliente envia mensagem",
    text: "Olá, gostaria de saber mais sobre o serviço — espera.",
  },
  {
    icon: Clock,
    title: "Ninguém responde imediatamente",
    text: "5 minutos sem resposta. O lead começa a pensar: Será que esta empresa é séria?",
  },
  {
    icon: LogOut,
    title: "O cliente procura outra empresa",
    text: "Enquanto procura o contacto de outro fornecedor, já perdeu a oportunidade.",
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
          <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
            Diagnóstico Operacional
          </span>
          <h2 className="mt-5 max-w-3xl text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Enquanto sua equipa trabalha, quantas oportunidades ficam esperando?
          </h2>
        </Reveal>
        <Reveal delay={80}>
          <div className="mt-5 max-w-2xl space-y-2 text-base leading-relaxed text-[#A7B0BF]">
            <p>
              Muitas empresas em Angola têm excelentes serviços, boa reputação e clientes
              interessados.
            </p>
            <p>
              O gargalo surge quando o atendimento depende exclusivamente de alguém estar livre
              naquele exato minuto. E em Angola, onde o WhatsApp é o principal canal de contacto,
              cada minuto sem resposta é um cliente que vai para a concorrência - e nunca volta.
            </p>
            <p className="text-sm text-[#EF4444] font-medium">
              Isto chama-se perda de oportunidade. E acontece todos os dias, mesmo que a sua equipa trabalhe 12 horas.
            </p>
          </div>
        </Reveal>

        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 100}>
              <div className="glass-card flex h-full flex-col justify-between rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 transition-[border-color,transform] hover:border-[#3B82F6]/50 hover:-translate-y-0.5">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#252C38] bg-[#0E121A] text-[#3B82F6]">
                      <c.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#667085]">
                      Etapa 0{i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#F5F7FA] tracking-tight">
                    {c.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#A7B0BF]">{c.text}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#252C38]/60 flex items-center justify-between text-xs text-[#667085]">
                  <span>Status do lead</span>
                  <span className={i === 2 ? "text-[#EF4444] font-medium" : "text-[#A7B0BF]"}>
                    {i === 0
                      ? "Interessado"
                      : i === 1
                        ? "Tempo de espera elevado"
                        : "Contacto abandonado"}
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
              dos leads desistem se não receberem resposta nos <strong className="text-[#F5F7FA]">primeiros 5 minutos</strong>.
              Em Angola, a maioria das empresas leva 2 a 24 horas - ou nunca responde.
            </p>
          </div>
        </Reveal>

        {/* Executive Comparison Panel */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252C38] pb-5">
              <div>
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#3B82F6] uppercase">
                  Análise Comparativa de Eficiência
                </span>
                <h3 className="text-xl font-bold text-[#F5F7FA] mt-1">
                  Quanto custa perder um cliente por demora no atendimento?
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-3 py-1 rounded-full w-fit">
                <span className="size-1.5 rounded-full bg-[#22C55E]" /> EFICIÊNCIA COMPROVADA
              </span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {/* Modelo Tradicional */}
              <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#252C38]">
                  <span className="text-sm font-bold text-[#EF4444] uppercase tracking-wider">
                    Operação Manual (Sem Sistema)
                  </span>
                  <span className="text-xs font-mono text-[#667085]">Cenário de Perda</span>
                </div>
                <ul className="mt-4 space-y-3 text-xs sm:text-sm text-[#A7B0BF]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>
                      <strong>Tempo de resposta:</strong> 2h a 24h para responder um primeiro
                      WhatsApp.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>
                      <strong>Noites e Fins de semana:</strong> 0% de resposta imediata; lead esfria
                      e busca concorrente.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>
                      <strong>Equipa sobrecarregada:</strong> Consultores repetem preços e perguntas
                      básicas o dia todo.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#EF4444] font-bold">✕</span>
                    <span>
                      <strong>Gestão de oportunidades:</strong> Mensagens perdidas em telemóveis
                      individuais sem CRM.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Modelo Agentes Digital */}
              <div className="rounded-[12px] border border-[#3B82F6]/40 bg-[#3B82F6]/10 p-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#3B82F6]/30">
                  <span className="text-sm font-bold text-[#3B82F6] uppercase tracking-wider">
                    Com Agentes Digital
                  </span>
                  <span className="text-xs font-mono text-[#22C55E]">Sistema Ativo</span>
                </div>
                <ul className="mt-4 space-y-3 text-xs sm:text-sm text-[#F5F7FA]">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>
                      <strong>Resposta imediata:</strong> Menos de 10 segundos no WhatsApp oficial,
                      24 horas por dia.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>
                      <strong>Qualificação automática:</strong> Filtra orçamento, perfil do cliente
                      e urgência da compra.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>
                      <strong>Agendamento direto:</strong> Reunião marcada no Google Calendar com
                      confirmação prévia.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#22C55E] font-bold">✓</span>
                    <span>
                      <strong>CRM unificado:</strong> Cada conversa vira um lead rastreável para a
                      equipa fechar negócios.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Social Proof Section */}
        <Reveal delay={160}>
          <div className="mt-12 rounded-[16px] border border-[#8B5CF6]/30 bg-[#151A23] p-6 sm:p-8">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#C084FC] uppercase">
                Empresas em Angola já estão a vender enquanto dormem
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-[#3B82F6] font-mono">+50</p>
                <p className="text-xs text-[#A7B0BF] mt-1">Empresas automatizadas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#22C55E] font-mono">98.7%</p>
                <p className="text-xs text-[#A7B0BF] mt-1">Uptime garantido</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#8B5CF6] font-mono">&lt;10s</p>
                <p className="text-xs text-[#A7B0BF] mt-1">Tempo de resposta</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#F59E0B] font-mono">+40%</p>
                <p className="text-xs text-[#A7B0BF] mt-1">Aumento em agendamentos</p>
              </div>
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5">
                <p className="text-sm text-[#F5F7FA] italic">"O sistema agendou 23 reuniões numa semana sem que a minha equipa tocasse num único WhatsApp."</p>
                <p className="mt-3 text-xs text-[#A7B0BF]">- Diretor Comercial, Empresa de Construção Civil</p>
              </div>
              <div className="rounded-[12px] border border-[#252C38] bg-[#0E121A] p-5">
                <p className="text-sm text-[#F5F7FA] italic">"Passámos de 2h para 8 segundos no primeiro contacto. A taxa de conversão subiu 35%."</p>
                <p className="mt-3 text-xs text-[#A7B0BF]">- CEO, Clínica em Luanda</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Why Us Section */}
        <Reveal delay={200}>
          <div className="mt-12 rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-8">
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-[#F5F7FA]">
                Por que a Agentes Digital é diferente?
              </h3>
            </div>
            
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center p-4">
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#3B82F6]/10 text-[#3B82F6] mb-3">
                  <span className="text-lg">🏠</span>
                </div>
                <p className="text-xs font-bold text-[#F5F7FA]">Suporte Local</p>
                <p className="text-[10px] text-[#A7B0BF] mt-1">Equipa técnica em Luanda</p>
              </div>
              <div className="text-center p-4">
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#22C55E]/10 text-[#22C55E] mb-3">
                  <span className="text-lg">🔒</span>
                </div>
                <p className="text-xs font-bold text-[#F5F7FA]">API Oficial</p>
                <p className="text-[10px] text-[#A7B0BF] mt-1">WhatsApp da Meta</p>
              </div>
              <div className="text-center p-4">
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] mb-3">
                  <span className="text-lg">🧠</span>
                </div>
                <p className="text-xs font-bold text-[#F5F7FA]">IA Sem Alucinações</p>
                <p className="text-[10px] text-[#A7B0BF] mt-1">Respostas autorizadas</p>
              </div>
              <div className="text-center p-4">
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B] mb-3">
                  <span className="text-lg">⚡</span>
                </div>
                <p className="text-xs font-bold text-[#F5F7FA]">Motor ATQA</p>
                <p className="text-[10px] text-[#A7B0BF] mt-1">Sistema próprio</p>
              </div>
              <div className="text-center p-4">
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-[#22C55E]/10 text-[#22C55E] mb-3">
                  <span className="text-lg">📊</span>
                </div>
                <p className="text-xs font-bold text-[#F5F7FA]">SLA 99.9%</p>
                <p className="text-[10px] text-[#A7B0BF] mt-1">Monitoramento 24/7</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-8 rounded-[16px] border border-[#3B82F6]/30 bg-[#151A23] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
              Ver o pipeline completo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
