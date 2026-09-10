import {
  Building2,
  Stethoscope,
  Briefcase,
  Truck,
  CheckCircle2,
  TrendingUp,
  Clock,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";

const metrics = [
  {
    value: "< 10s",
    label: "Tempo Médio de Primeira Resposta",
    desc: "Atendimento imediato no WhatsApp em qualquer horário, inclusive madrugadas e feriados.",
    icon: Clock,
  },
  {
    value: "+40%",
    label: "Taxa de Qualificação de Contactos",
    desc: "Filtro automático de intenção, orçamento e urgência antes de passar ao vendedor humano.",
    icon: TrendingUp,
  },
  {
    value: "100%",
    label: "Sincronização com a Equipa",
    desc: "Dados organizados, histórico registado e alertas instantâneos no CRM e telemóvel.",
    icon: Users,
  },
];

const industries = [
  {
    icon: Stethoscope,
    sector: "Clínicas & Centros Médicos",
    location: "Luanda & Províncias",
    problem: "Receção ocupada em horário de pico e perda de agendamentos à noite.",
    solution:
      "Agente IA esclarece especialidades, recolhe dados do paciente e agenda consultas no calendário oficial.",
    result: "Fim das chamadas perdidas e aumento de 35% nos agendamentos confirmados.",
  },
  {
    icon: Building2,
    sector: "Imobiliárias & Promoção Habitacional",
    location: "Talatona / Luanda Sul",
    problem: "Centenas de mensagens no Instagram/WhatsApp sem triagem de capacidade financeira.",
    solution:
      "Qualificação instantânea por tipologia, orçamento e localização com envio automático de fichas técnicas.",
    result: "Corretores atendem apenas compradores com perfil real de aquisição.",
  },
  {
    icon: Briefcase,
    sector: "Escritórios Jurídicos & Consultoria",
    location: "Ingombota / Baixa de Luanda",
    problem:
      "Sócios gastando horas respondendo dúvidas genéricas em vez de atender casos faturáveis.",
    solution:
      "Portal institucional de alta autoridade com triagem prévia e agendamento de diagnóstico preliminar.",
    result: "Posicionamento de autoridade e valor hora preservado.",
  },
  {
    icon: Truck,
    sector: "Logística, Distribuição & B2B",
    location: "Viana & Cacuaco",
    problem:
      "Dificuldade de clientes encontrarem tabela de serviços, localização e canais de cotação.",
    solution:
      "Website comercial indexado no Google + agente de cotações automáticas conectado ao WhatsApp.",
    result: "Aumento de 4x no volume de pedidos de cotação corporativa online.",
  },
];

export function TrustResults() {
  return (
    <section
      id="resultados"
      className="relative py-20 sm:py-28 border-t border-[#252C38] bg-[#0E121A] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase">
              Impacto no Mercado Angolano
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
              Tecnologia testada na realidade das{" "}
              <span className="text-gradient">empresas em Angola.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 text-base leading-relaxed text-[#A7B0BF]">
              Em Luanda e em todo o país, a diferença entre fechar um contrato corporativo ou perder
              para a concorrência está na rapidez da resposta e na credibilidade da sua estrutura
              digital.
            </p>
          </Reveal>
        </div>

        {/* Métricas Chave */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 90}>
              <div className="rounded-[16px] p-6 border border-[#252C38] bg-[#151A23] transition-colors hover:border-[#3B82F6]/50">
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#3B82F6] font-mono tabular-nums">
                    {m.value}
                  </span>
                  <span className="size-10 rounded-[10px] bg-[#0E121A] border border-[#252C38] flex items-center justify-center text-[#3B82F6]">
                    <m.icon className="size-5" aria-hidden="true" />
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-[#F5F7FA]">{m.label}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B0BF]">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Casos Práticos por Setor */}
        <div className="mt-16">
          <Reveal>
            <div className="flex items-center justify-between border-b border-[#252C38] pb-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A7B0BF]">
                Aplicações Práticas por Ramo de Atividade
              </h3>
              <span className="text-[11px] font-mono text-[#3B82F6] uppercase tracking-wider">
                Luanda • Angola
              </span>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {industries.map((ind, i) => (
              <Reveal key={ind.sector} delay={i * 100}>
                <div className="rounded-[16px] p-6 sm:p-7 border border-[#252C38] bg-[#151A23] flex flex-col justify-between h-full hover:border-[#3B82F6]/40 transition-[border-color,transform]">
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="size-10 rounded-[10px] bg-[#0E121A] border border-[#252C38] flex items-center justify-center text-[#3B82F6]">
                          <ind.icon className="size-5" aria-hidden="true" />
                        </span>
                        <div>
                          <h4 className="text-base font-bold text-[#F5F7FA]">{ind.sector}</h4>
                          <span className="text-[11px] font-mono text-[#A7B0BF]">
                            {ind.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2.5 text-xs leading-relaxed">
                      <div className="rounded-[10px] bg-[#0E121A] border border-[#252C38] p-3.5">
                        <span className="font-semibold text-[#F5F7FA] block mb-1">
                          Desafio comum:
                        </span>
                        <span className="text-[#A7B0BF]">{ind.problem}</span>
                      </div>
                      <div className="rounded-[10px] bg-[#3B82F6]/10 border border-[#3B82F6]/25 p-3.5">
                        <span className="font-semibold text-[#3B82F6] block mb-1">
                          Solução corporativa:
                        </span>
                        <span className="text-[#F5F7FA]">{ind.solution}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#252C38] flex items-center gap-2 text-xs font-semibold text-[#22C55E]">
                    <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
                    <span>{ind.result}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Enterprise Security & Compliance Guarantee */}
        <Reveal delay={140}>
          <div className="mt-16 rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#252C38] pb-5">
              <div>
                <span className="text-[11px] font-mono font-semibold tracking-wider text-[#3B82F6] uppercase">
                  Conformidade, Estabilidade & Segurança
                </span>
                <h3 className="text-xl font-bold text-[#F5F7FA] mt-1">
                  Infraestrutura Corporativa Desenhada para Operações Críticas
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/30 px-3 py-1 rounded-full w-fit">
                <span className="size-1.5 rounded-full bg-[#22C55E]" /> SLA 99.9% GARANTIDO
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-[10px] border border-[#252C38] bg-[#0E121A] p-4">
                <p className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
                  API Oficial Meta
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B0BF]">
                  Integração direta com o WhatsApp Cloud API oficial, eliminando riscos de bloqueio
                  do número empresarial.
                </p>
              </div>
              <div className="rounded-[10px] border border-[#252C38] bg-[#0E121A] p-4">
                <p className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
                  Proteção & Sigilo
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B0BF]">
                  Dados dos clientes isolados e criptografados em trânsito e repouso, respeitando
                  normas de confidencialidade.
                </p>
              </div>
              <div className="rounded-[10px] border border-[#252C38] bg-[#0E121A] p-4">
                <p className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
                  Backups Diários
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B0BF]">
                  Histórico completo de conversas, leads e oportunidades sincronizado e protegido
                  contra perdas operacionais.
                </p>
              </div>
              <div className="rounded-[10px] border border-[#252C38] bg-[#0E121A] p-4">
                <p className="text-xs font-bold text-[#F5F7FA] uppercase tracking-wider">
                  Suporte Especializado
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B0BF]">
                  Equipa técnica em Angola pronta para ajustes de fluxo, novas regras e manutenção
                  proativa mensal.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
