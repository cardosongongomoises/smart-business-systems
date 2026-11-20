import { useState } from "react";
import { Reveal } from "./Reveal";
import { ArrowRight } from "lucide-react";

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
      className="py-20 sm:py-28 bg-[#FFFFFF] text-[#101D35] border-t border-[#E7E3D9] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="lume-eyebrow text-[#D9531C]">Simulador de Impacto</p>
          <h2 className="mt-4 font-heading text-3xl leading-[1.15] font-extrabold tracking-[-0.02em] text-[#101D35] sm:text-4xl text-balance">
            Quanto dinheiro está a <span className="text-[#D64545]">deixar na mesa</span> todos os
            meses?
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#5B6B8C] leading-[1.65]">
            Use o simulador abaixo para ver o impacto real com base nos seus números, não em
            estimativas genéricas. Cada contacto sem resposta é receita que vai para a concorrência.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="space-y-8 rounded-[16px] p-7 border border-[#E7E3D9] bg-[#F5F3EE]">
              <div>
                <label
                  htmlFor="contacts"
                  className="text-xs sm:text-sm font-semibold text-[#101D35] flex justify-between items-center gap-4"
                >
                  <span>Quantos contactos a sua empresa recebe por mês?</span>
                  <span className="font-heading text-[#D9531C] font-extrabold tabular-nums text-base shrink-0">
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
                  className="mt-4 w-full accent-[#F36B32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] rounded h-2 bg-[#E7E3D9] cursor-pointer"
                />
              </div>

              <div>
                <label
                  htmlFor="missed"
                  className="text-xs sm:text-sm font-semibold text-[#101D35] flex justify-between items-center gap-4"
                >
                  <span>Percentagem que demora a ser atendida ou fica sem resposta:</span>
                  <span className="font-heading text-[#D9531C] font-extrabold tabular-nums text-base shrink-0">
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
                  className="mt-4 w-full accent-[#F36B32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] rounded h-2 bg-[#E7E3D9] cursor-pointer"
                />
              </div>

              <div>
                <label
                  htmlFor="value"
                  className="text-xs sm:text-sm font-semibold text-[#101D35] flex justify-between items-center gap-4"
                >
                  <span>Ticket médio estimado de um novo cliente:</span>
                  <span className="font-heading text-[#D9531C] font-extrabold tabular-nums text-base shrink-0">
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
                  className="mt-4 w-full accent-[#F36B32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F36B32] rounded h-2 bg-[#E7E3D9] cursor-pointer"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col justify-between rounded-[16px] p-7 border border-[#2A3D63] bg-[#101D35] text-[#F5F3EE]">
              <div>
                <p className="lume-eyebrow text-[#F4C542]">Quanto está a perder por mês?</p>
                <p className="mt-5 text-xs text-[#B8C0D0]">
                  Contactos que ficam à porta por demora:
                </p>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F36B32] tabular-nums mt-1">
                  {missedContacts}{" "}
                  <span className="text-sm font-sans font-normal text-[#B8C0D0]">clientes/mês</span>
                </p>

                <p className="mt-6 text-xs text-[#B8C0D0]">Receita mensal que fica na mesa:</p>
                <p className="font-heading text-3xl sm:text-4xl font-extrabold text-[#F4C542] tabular-nums mt-1">
                  Kz {fmt(potential)}
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-[#2A3D63] space-y-4">
                <p className="text-xs leading-relaxed text-[#B8C0D0]">
                  * Simulação com base nos seus números. Com resposta em menos de 10 segundos e
                  marcação automática no chat,{" "}
                  <span className="text-[#F5F3EE] font-semibold">
                    este valor pode começar a ser recuperado já no primeiro mês.
                  </span>
                </p>
                <a
                  href="#contacto"
                  className="lume-btn-primary inline-flex w-full items-center justify-center gap-2 text-sm whitespace-nowrap"
                >
                  <span>Recuperar esta receita</span>
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
