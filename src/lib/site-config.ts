export const WHATSAPP_NUMBER = "244941647752";
export const WHATSAPP_DISPLAY = "+244 941 647 752";
export const DOMAIN = "agentes-digital.com";
export const EMAIL = "contacto@agentes-digital.com";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const CTA = {
  specialist: whatsappLink(
    "Olá. Quero que a minha empresa comece a fechar negócios enquanto dorme. Gostaria de falar com um especialista.",
  ),
  diagnostic: whatsappLink(
    "Olá. Quero descobrir quantos leads a minha empresa está perdendo todos os dias. Gostaria de um diagnóstico gratuito.",
  ),
  meeting: whatsappLink(
    "Olá. Quero ver como outras empresas em Angola estão a fechar negócios 24/7. Agende uma demonstração para mim.",
  ),
  planPresenca: whatsappLink(
    "Olá. Quero que a minha empresa tenha presença digital profissional e comece a receber contactos automaticamente. Pacote Presença.",
  ),
  planProfissional: whatsappLink(
    "Olá. Quero que o meu website atenda, qualifique e agende reuniões automaticamente. Pacote Profissional — quero este.",
  ),
  planAutoridade: whatsappLink(
    "Olá. Quero dominar o Google, automatizar o atendimento e escalar vendas. Pacote Autoridade.",
  ),
  planDominioIA: whatsappLink(
    "Olá. Quero uma operação digital completa — website, IA, automação, CRM. Pacote Domínio IA. Falar com especialista.",
  ),
  automatePro: whatsappLink(
    "Olá. Já tenho website e quero que ele comece a fechar negócios sozinho. Quero o AUTOMATE PRO.",
  ),
  automateDemo: whatsappLink(
    "Olá. Quero ver o AUTOMATE PRO a fechar negócios em tempo real. Agende uma demonstração.",
  ),
};
