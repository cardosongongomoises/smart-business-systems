export const WHATSAPP_NUMBER = "244934024904";
export const WHATSAPP_DISPLAY = "+244 934 024 904";
export const DOMAIN = "agentes-digital.com";
export const EMAIL = "agentesdigital.suporte@gmail.com";
export const LOCATION = "Luanda, Angola";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEMO_CTA_LABEL = "Ver a demonstração de 7 minutos";

export const site = {
  ctaSecond: {
    href: whatsappLink(
      "Olá, vi o site da Agentes Digital. Gostava de ver a demonstração da recepção digital para o meu espaço.",
    ),
    label: DEMO_CTA_LABEL,
  },
  whatsapp: {
    number: WHATSAPP_DISPLAY,
  },
  email: EMAIL,
  location: LOCATION,
};

export const CTA = {
  demo: whatsappLink(
    "Olá, vi o site da Agentes Digital. Gostava de ver a demonstração da recepção digital para o meu espaço.",
  ),
  proposal: whatsappLink(
    "Olá, vi o site da Agentes Digital. Gostava de pedir uma proposta da Recepção Inteligente para o meu espaço de estética.",
  ),
  whatsappAssessment: whatsappLink(
    "Olá, fiz a avaliação de atendimento do meu WhatsApp no site da Agentes Digital e gostava de ver a demonstração de 7 minutos.",
  ),
  otherBusiness: whatsappLink(
    "Olá, tenho um negócio noutra área e gostaria de saber como funciona o vosso atendimento digital.",
  ),
  enterpriseDiagnostic: whatsappLink(
    "Olá, vi o guia de implementação de IA para empresas em Angola no site da Agentes Digital e gostava de pedir um diagnóstico.",
  ),
};
