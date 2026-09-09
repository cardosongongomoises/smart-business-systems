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
  if (value === true) return <Check className="mx-auto size-4 text-primary" />;
  if (value === false) return <Minus className="mx-auto size-4 text-muted-foreground/50" />;
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

export function Comparison() {
  return (
    <section id="comparacao" className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Compare os quatro planos.
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="glass-card mt-10 overflow-x-auto rounded-3xl">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                    Recurso
                  </th>
                  {columns.map((c, i) => (
                    <th
                      key={c}
                      className={`p-4 text-center text-sm font-bold ${
                        i === 1 ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map(([label, values]) => (
                  <tr key={label} className="border-b border-border last:border-0">
                    <td className="p-4 text-sm font-medium">{label}</td>
                    {values.map((v, i) => (
                      <td key={i} className={`p-4 text-center ${i === 1 ? "bg-primary/5" : ""}`}>
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 text-xs text-muted-foreground">
          Deslize horizontalmente para ver todos os planos.
        </p>
      </div>
    </section>
  );
}
