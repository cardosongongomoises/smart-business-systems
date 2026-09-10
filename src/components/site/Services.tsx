import { Globe, Bot, Workflow, LayoutDashboard, Check } from "lucide-react";
import { Reveal } from "./Reveal";

const services = [
  {
    n: "01",
    icon: Globe,
    title: "Websites Profissionais & Landing Pages",
    desc: "Websites rápidos, responsivos e construídos para transformar visitantes em contactos comerciais em Angola.",
    items: [
      "Landing Pages de Alta Conversão",
      "Websites institucionais e corporativos",
      "Websites comerciais e catálogo",
      "Otimização para SEO local (Luanda e Províncias)",
      "Páginas de serviços especializadas",
      "Design mobile-first de alta velocidade",
    ],
  },
  {
    n: "02",
    icon: Bot,
    title: "Agentes de Inteligência Artificial",
    desc: "Canais: WhatsApp Oficial + Website + E-mail corporativo.",
    items: [
      "Atendimento 24 horas por dia",
      "Qualificação automática de leads",
      "Respostas inteligentes a dúvidas frequentes",
      "Consultar serviços e orçamentos",
      "Encaminhar pedidos comerciais",
      "Agendar e confirmar reuniões",
      "Follow-up de oportunidades abertas",
      "Transferência transparente para atendente humano",
    ],
  },
  {
    n: "03",
    icon: Workflow,
    title: "Automação Comercial & WhatsApp",
    desc: "Transformamos tarefas repetitivas em processos que funcionam automaticamente para sua equipa.",
    items: [
      "Captação e triagem de leads",
      "Integração API WhatsApp Business",
      "Sequências de e-mail e lembretes",
      "Agendamento direto no calendário",
      "Follow-up com lembretes automáticos",
      "Sincronização com base CRM",
      "Alertas em tempo real para vendedores",
      "Eliminação de trabalho manual repetitivo",
    ],
  },
  {
    n: "04",
    icon: LayoutDashboard,
    title: "Sistemas Digitais & CRM Empresarial",
    desc: "Software sob medida para a operação, gestão de clientes e vendas da sua empresa.",
    items: [
      "Painéis de controlo e dashboards",
      "Aplicações web corporativas",
      "Sistemas de gestão de clientes (CRM)",
      "Portais de atendimento ao cliente",
      "Integrações de API e bases de dados",
      "Sistemas personalizados para o mercado angolano",
    ],
  },
];

export function Services() {
  return (
    <section id="servicos" className="py-20 sm:py-28 bg-[#0E121A] border-t border-[#252C38] scroll-mt-20">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#252C38] bg-[#151A23] px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-[#3B82F6] uppercase mb-4">
            Serviços Especializados em Angola
          </span>
          <h2 className="max-w-3xl text-3xl leading-[1.15] font-bold tracking-[-0.03em] text-[#F5F7FA] sm:text-4xl text-balance">
            Tudo o que sua empresa precisa para operar com excelência no digital.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-[#A7B0BF]">
            Estruturas completas que unem design corporativo, automação inteligente e inteligência artificial para gerar negócios todos os dias.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 90}>
              <article className="glass-card flex h-full flex-col justify-between rounded-[16px] border border-[#252C38] bg-[#151A23] p-6 sm:p-7 transition-[border-color,transform] hover:border-[#3B82F6]/50 hover:-translate-y-0.5">
                <div>
                  <div className="flex items-start justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-[10px] border border-[#252C38] bg-[#0E121A] text-[#3B82F6]">
                      <s.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#667085]">{s.n}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-tight text-[#F5F7FA]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#A7B0BF]">{s.desc}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.items.map((it) => (
                      <li key={it} className="flex items-start gap-2 text-xs sm:text-sm text-[#A7B0BF]">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#3B82F6]" aria-hidden="true" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-7 pt-4 border-t border-[#252C38]/60 flex items-center justify-between text-xs">
                  <span className="text-[#667085]">Mercado Corporativo</span>
                  <a
                    href="#contacto"
                    className="font-semibold text-[#3B82F6] hover:text-[#2563EB] transition-colors"
                  >
                    Consultar implementação →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
