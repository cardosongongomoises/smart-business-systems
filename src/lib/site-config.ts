export const WHATSAPP_NUMBER = "244934024904";
export const WHATSAPP_DISPLAY = "+244 934 024 904";
export const DOMAIN = "agentes-digital.com";
export const EMAIL = "agentesdigital.suporte@gmail.com";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const LOCATION = "Luanda, Angola";

export const site = {
  ctaSecond: {
    href: whatsappLink(
      "Olá. Estou a perder clientes por demora no atendimento e quero falar com um especialista.",
    ),
    label: "Quero parar de perder clientes",
  },
  whatsapp: {
    number: WHATSAPP_DISPLAY,
  },
  email: EMAIL,
  location: LOCATION,
};

export const CTA = {
  specialist: whatsappLink(
    "Olá. Estou a perder clientes por demora no atendimento e quero falar com um especialista.",
  ),
  diagnostic: whatsappLink(
    "Olá. Quero o meu diagnóstico gratuito para descobrir quantos clientes estou a perder por demora no atendimento.",
  ),
  meeting: whatsappLink(
    "Olá. Quero ver como o atendimento imediato pode parar a perda de clientes na minha empresa.",
  ),
  planPresenca: whatsappLink(
    "Olá. Quero um site que gere contactos para a minha empresa. Tenho interesse no plano Presença.",
  ),
  planProfissional: whatsappLink(
    "Olá. Quero parar de perder pedidos no WhatsApp e marcar reuniões automaticamente. Tenho interesse no plano Profissional.",
  ),
  planAutoridade: whatsappLink(
    "Olá. Quero acompanhar e fechar mais contactos automaticamente. Tenho interesse no plano Autoridade.",
  ),
  planDominioIA: whatsappLink(
    "Olá. Quero organizar toda a operação comercial da minha empresa. Tenho interesse no plano Operação Completa.",
  ),
  automatePro: whatsappLink(
    "Olá. Já tenho website e quero ligar o atendimento automático sem o refazer. Tenho interesse no Automate Pro.",
  ),
  automateDemo: whatsappLink(
    "Olá. Já tenho website e quero ver na prática como o atendimento imediato funciona no Automate Pro.",
  ),
};
