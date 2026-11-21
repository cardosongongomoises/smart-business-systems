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
      "Olá. Gostaria de falar com um especialista sobre atendimento com inteligência artificial e automatização de processos na minha empresa.",
    ),
    label: "Falar com um especialista",
  },
  whatsapp: {
    number: WHATSAPP_DISPLAY,
  },
  email: EMAIL,
  location: LOCATION,
};

export const CTA = {
  specialist: whatsappLink(
    "Olá. Gostaria de falar com um especialista sobre como melhorar o atendimento e automatizar processos na minha empresa.",
  ),
  diagnostic: whatsappLink(
    "Olá. Gostaria de solicitar um diagnóstico para avaliar o atendimento e os processos comerciais da minha empresa.",
  ),
  proposal: whatsappLink("Olá. Gostaria de pedir uma proposta personalizada para a minha empresa."),
  aiService: whatsappLink(
    "Olá. Tenho interesse na implementação de inteligência artificial para atendimento, qualificação e marcação de reuniões.",
  ),
  automationService: whatsappLink(
    "Olá. Tenho interesse na automatização de processos empresariais, follow-ups e integração de ferramentas.",
  ),
  meeting: whatsappLink(
    "Olá. Gostaria de marcar uma conversa para perceber como a Agentes Digital pode ajudar a minha empresa.",
  ),
  planPresenca: whatsappLink(
    "Olá. Tenho interesse no plano Presença para estruturar o website e os contactos da minha empresa.",
  ),
  planProfissional: whatsappLink(
    "Olá. Tenho interesse no plano Profissional com website, atendimento automático e marcação de reuniões.",
  ),
  planAutoridade: whatsappLink(
    "Olá. Tenho interesse no plano Autoridade com automatização de follow-ups, lembretes e acompanhamento comercial.",
  ),
  planDominioIA: whatsappLink(
    "Olá. Tenho interesse no plano Operação Completa para organizar o atendimento e os processos da minha empresa.",
  ),
  automatePro: whatsappLink(
    "Olá. Já tenho website e gostaria de implementar atendimento com IA e automatização de processos sem o refazer (Automate Pro).",
  ),
  automateDemo: whatsappLink(
    "Olá. Já tenho website e gostaria de ver como o Automate Pro pode ligar-se à minha operação atual.",
  ),
};
