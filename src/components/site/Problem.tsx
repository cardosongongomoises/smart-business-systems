import { MessageSquare, Clock, LogOut } from "lucide-react";
import { Reveal } from "./Reveal";

const cards = [
  {
    icon: MessageSquare,
    title: "Cliente envia mensagem",
    text: "“Olá, gostaria de saber mais sobre o serviço.”",
  },
  {
    icon: Clock,
    title: "Ninguém responde imediatamente",
    text: "O potencial cliente espera.",
  },
  {
    icon: LogOut,
    title: "O cliente procura outra empresa",
    text: "A oportunidade é perdida.",
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
              naquele exato minuto.
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

        {/* Executive Comparison Panel */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252C38] pb-5">
              <div>
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#3B82F6] uppercase">
                  Análise Comparativa de Eficiência
                </span>
                <h3 className="text-xl font-bold text-[#F5F7FA] mt-1">
                  Atendimento Manual Tradicional vs. Sistema Agentes Digital
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

        <Reveal delay={160}>
          <div className="mt-8 rounded-[16px] border border-[#3B82F6]/30 bg-[#151A23] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-base sm:text-lg font-bold text-[#F5F7FA]">
                A Agentes Digital{" "}
                <span className="text-gradient">transforma esse processo em sistema contínuo.</span>
              </p>
              <p className="mt-1 text-xs sm:text-sm text-[#A7B0BF]">
                Atendimento automático imediato, qualificação estruturada e agendamento direto na
                sua agenda.
              </p>
            </div>
            <a
              href="#jornada"
              className="shrink-0 inline-flex h-[42px] items-center justify-center gap-2 rounded-[8px] bg-[#3B82F6] px-5 text-xs font-semibold text-white transition-colors hover:bg-[#2563EB]"
            >
              Ver o pipeline completo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
