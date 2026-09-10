export const WHATSAPP_NUMBER = "244923000000"; // Número oficial Angola (+244)
export const DOMAIN = "agentes-digital.com";
export const EMAIL = "contacto@agentes-digital.com";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CTA = {
  specialist: whatsappLink(
    "Olá, Agentes Digital. Gostaria de falar com um especialista sobre website, IA e automação para a minha empresa.",
  ),
  diagnostic: whatsappLink(
    "Olá, Agentes Digital. Gostaria de agendar um diagnóstico gratuito da operação digital da minha empresa.",
  ),
  meeting: whatsappLink(
    "Olá, Agentes Digital. Gostaria de agendar uma reunião comercial para conhecer as soluções de IA e automação.",
  ),
  planPresenca: whatsappLink(
    "Olá, Agentes Digital. Tenho interesse no Pacote 01 - Presença (Kz 125.000). Gostaria de avançar com a implementação.",
  ),
  planProfissional: whatsappLink(
    "Olá, Agentes Digital. Tenho interesse no Pacote 02 - Profissional (Kz 250.000). Gostaria de avançar com a implementação.",
  ),
  planAutoridade: whatsappLink(
    "Olá, Agentes Digital. Tenho interesse no Pacote 03 - Autoridade (Kz 450.000). Gostaria de avançar com a implementação.",
  ),
  planDominioIA: whatsappLink(
    "Olá, Agentes Digital. Tenho interesse no Pacote 04 - Domínio IA (Kz 700.000). Gostaria de falar com um especialista sobre a operação completa.",
  ),
  automatePro: whatsappLink(
    "Olá, Agentes Digital. Já tenho website e gostaria de implementar o AUTOMATE PRO para automatizar o atendimento e qualificação da minha empresa.",
  ),
  automateDemo: whatsappLink(
    "Olá, Agentes Digital. Gostaria de agendar uma demonstração do AUTOMATE PRO para a minha empresa.",
  ),
};
