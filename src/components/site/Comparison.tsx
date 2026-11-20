import { Check, Minus } from "lucide-react";
import { Reveal } from "./Reveal";

const columns = ["Presença", "Profissional", "Autoridade", "Operação Completa"];

const rows: Array<[string, (boolean | string)[]]> = [
  ["Website", ["Site profissional", "Até 5 páginas", "Até 10 páginas", "Personalizado"]],
  ["Domínio e Hospedagem", [true, true, true, true]],
  ["WhatsApp", ["Link direto", "Atendimento 24h", "Atendimento 24h", "Operação completa"]],
  ["Marcação de reuniões", [false, true, "Automática + lembretes", "Automática + lembretes"]],
  ["Google e SEO", ["Básico", "Local", "Avançado", "Completo"]],
  ["E-mail", [false, "Automatizado", "Automatizado", "Automatizado"]],
  ["Registo de contactos (CRM)", [false, true, true, true]],
  ["Follow-up automático", [false, false, true, true]],
  ["Painel de métricas", [false, true, true, "Completo"]],
  ["Suporte técnico", ["Incluído", "Prioritário", "Dedicado", "VIP Dedicado"]],
  ["Acompanhamento mensal", [false, false, "Contínuo", "Contínuo + consultoria"]],
];

function Cell({ value, highlighted }: { value: boolean | string; highlighted?: boolean }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center">
        <Check className="size-4 text-[#2E9E6B]" aria-hidden="true" />
        <span className="sr-only">Incluído</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center">
        <Minus className="size-4 text-[#B8C0D0]" aria-hidden="true" />
        <span className="sr-only">Não incluído</span>
      </span>
    );
  }
  return (
    <span
      className={`text-xs font-medium ${highlighted ? "text-[#101D35] font-semibold" : "text-[#5B6B8C]"}`}
    >
      {value}
    </span>
  );
}

export function Comparison() {
  return (
    <section
      id="comparacao"
      className="py-20 sm:py-28 bg-[#F5F3EE] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#D9531C]">Comparação de Planos</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
            Compare o que entra em cada plano.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#5B6B8C] leading-[1.65]">
            Transparência total para escolher exatamente o que a sua empresa precisa agora.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div
            tabIndex={0}
            role="region"
            aria-label="Tabela comparativa de planos"
            className="mt-12 overflow-x-auto rounded-[16px] border border-[#E7E3D9] bg-[#FFFFFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32]"
          >
            <table className="w-full min-w-[760px] border-collapse text-left">
              <caption className="sr-only">
                Tabela comparativa de funcionalidades dos planos Presença, Profissional, Autoridade
                e Operação Completa
              </caption>
              <thead>
                <tr className="border-b border-[#E7E3D9] bg-[#F5F3EE]">
                  <th
                    scope="col"
                    className="p-4 sm:p-5 font-heading text-xs font-bold tracking-[0.12em] text-[#5B6B8C] uppercase"
                  >
                    Funcionalidade / Entregável
                  </th>
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      scope="col"
                      className={`p-4 sm:p-5 text-center font-heading text-sm font-bold ${
                        i === 1 ? "bg-[#101D35] text-[#F5F3EE]" : "text-[#101D35]"
                      }`}
                    >
                      {c}
                      {i === 1 && (
                        <span className="block font-heading text-[10px] font-bold text-[#F4C542] uppercase tracking-wider mt-0.5">
                          Recomendado
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E3D9]">
                {rows.map(([label, values]) => (
                  <tr key={label} className="hover:bg-[#F5F3EE]/60 transition-colors">
                    <th
                      scope="row"
                      className="p-4 text-xs sm:text-sm font-semibold text-[#101D35] text-left"
                    >
                      {label}
                    </th>
                    {values.map((v, i) => (
                      <td
                        key={i}
                        className={`p-4 text-center ${
                          i === 1 ? "bg-[#FCF0C8]/35 border-x border-[#E7E3D9]" : ""
                        }`}
                      >
                        <Cell value={v} highlighted={i === 1} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 text-xs text-[#5B6B8C]">
          * Deslize horizontalmente em dispositivos móveis para conferir todas as colunas.
        </p>
      </div>
    </section>
  );
}
