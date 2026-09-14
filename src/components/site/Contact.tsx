import { Reveal } from "./Reveal";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  Calendar,
  Shield,
} from "lucide-react";
import { site } from "@/lib/site-config";

export function Contact() {
  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-b from-[#0E121A] via-[#0E121A] to-[#111827] py-20 sm:py-28 scroll-mt-20"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#22C55E]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <Badge className="mb-4 border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]">
              Comece Agora
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F5F7FA] tracking-tight">
              Cada dia sem o sistema é um dia de{" "}
              <span className="text-[#EF4444]">leads perdidos</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-[#A7B0BF] leading-relaxed">
              Não espere mais. Enquanto está a ler isto, a concorrência já está a fechar negócios
              que podiam ser seus. Comece hoje — o primeiro mês é sobre recuperar o que está a
              perder.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_400px]">
            {/* Form */}
            <Card className="border-[#252C38] bg-[#151A23]/80 backdrop-blur-sm">
              <CardContent className="p-7">
                <h3 className="text-lg font-bold text-[#F5F7FA]">
                  Diagnóstico gratuito — Apenas 5 empresas/mês
                </h3>
                <p className="mt-2 text-sm text-[#A7B0BF]">
                  Preencha e receba em 24h um plano personalizado com os seus números.
                </p>

                <form className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#A7B0BF]">Nome da Empresa</label>
                      <input
                        type="text"
                        placeholder="Ex: Construções Silva"
                        className="h-10 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3.5 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[#A7B0BF]">
                        Contacto (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        placeholder="+244 9XX XXX XXX"
                        className="h-10 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3.5 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#A7B0BF]">
                      Sector de Actividade
                    </label>
                    <select className="h-10 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3.5 text-sm text-[#F5F7FA] focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] outline-none transition-colors">
                      <option value="">Selecione o seu sector</option>
                      <option value="construcao">Construção Civil / Imobiliário</option>
                      <option value="saude">Saúde / Clínicas</option>
                      <option value="advocacia">Advocacia / Jurídico</option>
                      <option value="educacao">Educação / Formação</option>
                      <option value="consultoria">Consultoria / Serviços</option>
                      <option value="comercio">Comércio / Retalho</option>
                      <option value="tecnologia">Tecnologia / Software</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#A7B0BF]">
                      Quantos contactos recebem por mês? (WhatsApp, email, formulário)
                    </label>
                    <select className="h-10 w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3.5 text-sm text-[#F5F7FA] focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] outline-none transition-colors">
                      <option value="">Selecione</option>
                      <option value="10-30">10 a 30</option>
                      <option value="30-100">30 a 100</option>
                      <option value="100-500">100 a 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#A7B0BF]">
                      Que resultado quer alcançar?
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ex: Responder mais rápido, agendar mais reuniões, perder menos leads..."
                      className="w-full rounded-[8px] border border-[#252C38] bg-[#0E121A] px-3.5 py-2.5 text-sm text-[#F5F7FA] placeholder:text-[#667085] focus:border-[#22C55E] focus:ring-1 focus:ring-[#22C55E] outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-[#22C55E] text-sm font-semibold text-white transition-all hover:bg-[#16A34A] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                  >
                    <Calendar className="size-4" />
                    {site.ctaSecond.label}
                    <ArrowUpRight className="size-4" />
                  </button>

                  <p className="text-center text-[11px] text-[#667085]">
                    Sem compromisso. Resposta em 24h. Apenas 5 vagas por mês.
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Info */}
            <div className="space-y-6">
              <Card className="border-[#252C38] bg-[#151A23]/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-base font-bold text-[#F5F7FA]">Contacte-nos directamente</h3>
                  <p className="mt-2 text-sm text-[#A7B0BF]">
                    Prefere falar directamente? Estamos disponíveis no WhatsApp — resposta em
                    minutos, não em horas.
                  </p>

                  <ul className="mt-5 space-y-3.5 text-sm">
                    <li className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]">
                        <Phone className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs text-[#667085]">WhatsApp</p>
                        <p className="font-medium text-[#F5F7FA]">{site.whatsapp.number}</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#3B82F6]/30 bg-[#3B82F6]/10 text-[#60A5FA]">
                        <Mail className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs text-[#667085]">Email</p>
                        <p className="font-medium text-[#F5F7FA]">{site.email}</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 text-[#C084FC]">
                        <MapPin className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs text-[#667085]">Localização</p>
                        <p className="font-medium text-[#F5F7FA]">{site.location}</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-[8px] border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]">
                        <Clock className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs text-[#667085]">Horário</p>
                        <p className="font-medium text-[#F5F7FA]">Seg–Sex: 08h–17h</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Garantia */}
              <Card className="border-[#22C55E]/30 bg-[#22C55E]/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-full border border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E] shrink-0">
                      <Shield className="size-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#F5F7FA]">
                        Garantia de Satisfação 30 Dias
                      </h3>
                      <p className="mt-2 text-xs text-[#A7B0BF] leading-relaxed">
                        Se o sistema não entregar o que prometemos nos primeiros 30 dias, devolvemos
                        100% do investimento. Sem perguntas, sem burocracia. O risco é nosso, não
                        seu.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Urgência */}
              <Card className="border-[#EF4444]/30 bg-[#EF4444]/5">
                <CardContent className="p-5 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full border border-[#EF4444]/30 bg-[#EF4444]/10 text-[#EF4444] shrink-0">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#EF4444] uppercase tracking-wider">
                      Apenas 5 vagas/mês
                    </p>
                    <p className="text-xs text-[#A7B0BF]">
                      Limitamos a 5 diagnósticos por mês para garantir qualidade.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
