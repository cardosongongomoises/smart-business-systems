export const WHATSAPP_NUMBER = "244900000000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CTA = {
  specialist: whatsappLink(
    "Olá, Agentes Digital. Gostaria de falar com um especialista sobre website, IA e automação.",
  ),
  diagnostic: whatsappLink(
    "Olá, Agentes Digital. Gostaria de agendar um diagnóstico gratuito da minha operação digital.",
  ),
};

export const EMAIL = "contacto@agentes-digital.com";
