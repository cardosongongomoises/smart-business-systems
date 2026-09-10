import { useState } from "react";
import { Reveal } from "./Reveal";

const fmt = (v: number) => new Intl.NumberFormat("pt-AO").format(Math.round(v));

export function RoiCalculator() {
  const [contacts, setContacts] = useState(60);
  const [missed, setMissed] = useState(25);
  const [value, setValue] = useState(150000);

  const missedContacts = Math.round((contacts * missed) / 100);
  const potential = missedContacts * value;

  return (
    <section
      id="valor"
      className="py-20 sm:py-28 bg-[#0E121A] border-t border-[#252C38] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase mb-4">
            Simulador de Oportunidades
          </span>
          <h2 className="text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Quanto custa uma oportunidade perdida por falta de resposta?
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#A7B0BF]">
            Avalie o impacto comercial das mensagens de clientes que chegam fora do horário ou ficam
            sem atendimento imediato.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="space-y-8 rounded-[16px] p-7 border border-[#252C38] bg-[#151A23]">
              <div>
                <label
                  htmlFor="contacts"
                  className="text-xs sm:text-sm font-semibold text-[#F5F7FA] flex justify-between items-center"
                >
                  <span>Quantos contactos a sua empresa recebe por mês?</span>
                  <span className="text-[#3B82F6] font-mono font-bold tabular-nums text-base">
                    {contacts}
                  </span>
                </label>
                <input
                  id="contacts"
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={contacts}
                  aria-valuemin={10}
                  aria-valuemax={500}
                  aria-valuenow={contacts}
                  aria-valuetext={`${contacts} contactos por mês`}
                  onChange={(e) => setContacts(Number(e.target.value))}
                  className="mt-4 w-full accent-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded h-2 bg-[#0E121A]"
                />
              </div>
              <div>
                <label
                  htmlFor="missed"
                  className="text-xs sm:text-sm font-semibold text-[#F5F7FA] flex justify-between items-center"
                >
                  <span>Percentagem que demora a ser atendida ou fica sem resposta:</span>
                  <span className="text-[#3B82F6] font-mono font-bold tabular-nums text-base">
                    {missed}%
                  </span>
                </label>
                <input
                  id="missed"
                  type="range"
                  min={0}
                  max={80}
                  step={1}
                  value={missed}
                  aria-valuemin={0}
                  aria-valuemax={80}
                  aria-valuenow={missed}
                  aria-valuetext={`${missed} porcento de contactos sem resposta`}
                  onChange={(e) => setMissed(Number(e.target.value))}
                  className="mt-4 w-full accent-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded h-2 bg-[#0E121A]"
                />
              </div>
              <div>
                <label
                  htmlFor="value"
                  className="text-xs sm:text-sm font-semibold text-[#F5F7FA] flex justify-between items-center"
                >
                  <span>Ticket médio estimado de um novo cliente:</span>
                  <span className="text-[#3B82F6] font-mono font-bold tabular-nums text-base">
                    Kz {fmt(value)}
                  </span>
                </label>
                <input
                  id="value"
                  type="range"
                  min={10000}
                  max={2000000}
                  step={10000}
                  value={value}
                  aria-valuemin={10000}
                  aria-valuemax={2000000}
                  aria-valuenow={value}
                  aria-valuetext={`Kz ${fmt(value)}`}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="mt-4 w-full accent-[#3B82F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] rounded h-2 bg-[#0E121A]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-between rounded-[16px] p-7 border border-[#3B82F6]/35 bg-[#151A23] shadow-[0_8px_30px_rgba(59,130,246,0.12)]">
              <div>
                <p className="text-[11px] font-bold tracking-[0.18em] text-[#3B82F6] uppercase">
                  Estimativa Mensal de Oportunidades
                </p>
                <p className="mt-5 text-xs text-[#A7B0BF]">Leads com risco de evasão por espera:</p>
                <p className="text-3xl sm:text-4xl font-mono font-bold text-[#F5F7FA] tabular-nums mt-1">
                  {missedContacts}{" "}
                  <span className="text-sm font-sans font-normal text-[#A7B0BF]">
                    contactos/mês
                  </span>
                </p>

                <p className="mt-6 text-xs text-[#A7B0BF]">Receita potencial em risco mensal:</p>
                <p className="text-gradient text-3xl sm:text-4xl font-mono font-bold tabular-nums mt-1">
                  Kz {fmt(potential)}
                </p>
              </div>

              <div className="mt-7 pt-4 border-t border-[#252C38]">
                <p className="text-[11px] leading-relaxed text-[#667085]">
                  * Simulação analítica com base nas variáveis informadas. A automação com Agente
                  Digital visa assegurar taxa de resposta de 100% em menos de 10 segundos,
                  convertendo contactos em agendamentos qualificados.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
