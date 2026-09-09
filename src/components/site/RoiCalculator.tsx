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
    <section id="valor" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Quanto custa uma oportunidade perdida?
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <div className="glass-card space-y-8 rounded-3xl p-7">
              <div>
                <label htmlFor="contacts" className="text-sm font-medium">
                  Quantos contactos sua empresa recebe por mês?{" "}
                  <span className="text-primary">{contacts}</span>
                </label>
                <input
                  id="contacts"
                  type="range"
                  min={10}
                  max={500}
                  step={5}
                  value={contacts}
                  onChange={(e) => setContacts(Number(e.target.value))}
                  className="mt-4 w-full accent-[var(--primary)]"
                />
              </div>
              <div>
                <label htmlFor="missed" className="text-sm font-medium">
                  Quantos ficam sem resposta ou demoram a ser atendidos?{" "}
                  <span className="text-primary">{missed}%</span>
                </label>
                <input
                  id="missed"
                  type="range"
                  min={0}
                  max={80}
                  step={1}
                  value={missed}
                  onChange={(e) => setMissed(Number(e.target.value))}
                  className="mt-4 w-full accent-[var(--primary)]"
                />
              </div>
              <div>
                <label htmlFor="value" className="text-sm font-medium">
                  Quanto vale um novo cliente para sua empresa?{" "}
                  <span className="text-primary">Kz {fmt(value)}</span>
                </label>
                <input
                  id="value"
                  type="range"
                  min={10000}
                  max={2000000}
                  step={10000}
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="mt-4 w-full accent-[var(--primary)]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="glass-card shadow-elegant flex h-full flex-col justify-center rounded-3xl p-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Estimativa mensal
              </p>
              <p className="mt-4 text-sm text-muted-foreground">Contactos sem atendimento rápido</p>
              <p className="text-4xl font-extrabold">{missedContacts}</p>
              <p className="mt-6 text-sm text-muted-foreground">Valor potencial em jogo</p>
              <p className="text-gradient text-3xl font-extrabold">Kz {fmt(potential)}</p>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                Simulação ilustrativa baseada nos valores que você indicou. O objetivo é criar uma
                estrutura que reduza tarefas repetitivas e facilite o aproveitamento das
                oportunidades — não uma promessa de resultado financeiro.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
