import { Check, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

const columns = ["Presença", "Profissional", "Autoridade", "Domínio IA"];

const rows: Array<[string, (boolean | string)[]]> = [
  ["Website", ["Landing Page", "Até 5 páginas", "Até 10 páginas", "Personalizado"]],
  ["Domínio", [true, true, true, true]],
  ["Hospedagem", [true, true, true, true]],
  ["SSL", [true, true, true, true]],
  ["WhatsApp", ["Link direto", "Integrado", "Automatizado", "Agentes de IA"]],
  ["Agendamento", [false, true, "Automático", "Automático"]],
  ["Google", ["Maps", "Business Profile", "Business + Blog", "Completo"]],
  ["SEO", ["Básico", "Local", "Avançado", "Avançado"]],
  ["IA", [false, "Básica", "Avançada", "Agentes dedicados"]],
  ["E-mail", [false, "Automatizado", "Automatizado", "Automatizado"]],
  ["CRM", [false, false, true, true]],
  ["Automação", [false, "Respostas", "Processos", "Operação completa"]],
  ["Follow-up", [false, false, true, true]],
  ["Analytics", [false, true, true, "Dashboards"]],
  ["Suporte", ["Padrão", "Prioritário", "Prioritário", "Premium"]],
  ["Optimização", [false, false, "Contínua", "Contínua + consultoria"]],
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return (
      <span className="inline-flex items-center justify-center">
        <Check className="size-4 text-primary" aria-hidden="true" />
        <span className="sr-only">Incluído</span>
      </span>
    );
  if (value === false)
    return (
      <span className="inline-flex items-center justify-center">
        <Minus className="size-4 text-muted-foreground/40" aria-hidden="true" />
        <span className="sr-only">Não incluído</span>
      </span>
    );
  return <span className="text-xs font-medium text-muted-foreground">{value}</span>;
}

export function Comparison() {
  return (
    <section
      id="comparacao"
      className="py-20 sm:py-28 bg-[#080A0F] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase mb-4">
            Matriz Comparativa Detalhada
          </span>
          <h2 className="text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Compare minuciosamente os quatro planos.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#A7B0BF]">
            Transparência total sobre escopo, entregáveis e infraestrutura técnica de cada pacote.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div
            tabIndex={0}
            role="region"
            aria-label="Tabela comparativa de planos"
            className="mt-12 overflow-x-auto rounded-[16px] border border-[#252C38] bg-[#151A23] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6]"
          >
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">
                Tabela comparativa de funcionalidades dos planos Presença, Profissional, Autoridade
                e Domínio IA
              </caption>
              <thead>
                <tr className="border-b border-[#252C38] bg-[#0E121A]">
                  <th
                    scope="col"
                    className="p-4 sm:p-5 text-xs font-semibold tracking-[0.16em] text-[#A7B0BF] uppercase"
                  >
                    Funcionalidade / Entregável
                  </th>
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`p-4 sm:p-5 text-center text-sm font-bold ${
                        i === 1
                          ? "bg-[#3B82F6]/10 text-[#3B82F6] border-x border-[#3B82F6]/30"
                          : "text-[#F5F7FA]"
                      }`}
                    >
                      {c}
                      {i === 1 && (
                        <span className="block text-[10px] font-mono font-normal text-[#3B82F6] uppercase tracking-wider mt-0.5">
                          RECOMENDADO
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252C38]/60">
                {rows.map(([label, values]) => (
                  <tr key={label} className="hover:bg-[#0E121A]/50 transition-colors">
                    <th
                      scope="row"
                      className="p-4 text-xs sm:text-sm font-medium text-[#F5F7FA] text-left"
                    >
                      {label}
                    </th>
                    {values.map((v, i) => (
                      <td
                        key={i}
                        className={`p-4 text-center ${i === 1 ? "bg-[#3B82F6]/5 border-x border-[#3B82F6]/20" : ""}`}
                      >
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 text-xs text-[#667085]">
          * Deslize horizontalmente em dispositivos móveis para conferir todas as colunas.
        </p>
      </div>
    </section>
  );
}
