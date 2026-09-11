export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "Organization"],
  "@id": "https://agentes-digital.com/#organization",
  name: "Agentes Digital",
  alternateName: "Agentes Digital Angola",
  url: "https://agentes-digital.com",
  logo: "https://agentes-digital.com/favicon-512.png",
  image: "https://agentes-digital.com/favicon-512.png",
  description:
    "Especialistas em criação de websites profissionais, agentes de Inteligência Artificial para WhatsApp e automação comercial para empresas em Angola.",
  telephone: "+244941647752",
  email: "contacto@agentes-digital.com",
  priceRange: "Kz 125.000 - Kz 700.000",
  currenciesAccepted: "AOA",
  paymentAccepted: "Transferência Bancária, Multicaixa Express",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Luanda",
    addressRegion: "Luanda",
    addressCountry: "AO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "-8.8390",
    longitude: "13.2894",
  },
  areaServed: {
    "@type": "Country",
    name: "Angola",
  },
  sameAs: ["https://instagram.com/agentesdigital", "https://linkedin.com/company/agentes-digital"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços Digitais e Automação com IA",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Criação de Websites e Landing Pages",
          description:
            "Websites profissionais responsivos e otimizados para conversão e SEO local em Angola.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Agentes de IA para Atendimento WhatsApp",
          description:
            "Assistentes inteligentes que atendem, tiram dúvidas e qualificam clientes 24/7 no WhatsApp.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automate Pro: Automação sobre Website Existente",
          description:
            "Camada de inteligência e qualificação conectando site existente ao WhatsApp, CRM e agendamento.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sistemas Web e Gestão Comercial",
          description:
            "Dashboards, CRM integrado e automação de follow-up para equipas de vendas em Angola.",
        },
      },
    ],
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://agentes-digital.com/#website",
  url: "https://agentes-digital.com",
  name: "Agentes Digital",
  description: "Websites, Inteligência Artificial, Automação e Sistemas Digitais em Angola",
  inLanguage: "pt-AO",
  publisher: {
    "@id": "https://agentes-digital.com/#organization",
  },
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é um agente de inteligência artificial para atendimento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "É um assistente virtual inteligente treinado com as informações específicas da sua empresa. Ele atende no WhatsApp e no website 24 horas por dia, entende a intenção do cliente, tira dúvidas, qualifica a oportunidade e agenda reuniões automaticamente.",
      },
    },
    {
      "@type": "Question",
      name: "Se a minha empresa já tem um website, preciso criar outro do zero?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Com a solução AUTOMATE PRO, instalamos uma camada inteligente de chat, qualificação e automação diretamente sobre o seu website atual, integrando-o ao WhatsApp e ao CRM sem precisar reconstruir o site.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo demora para implementar um website ou automação com IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A entrega varia entre 7 a 21 dias úteis dependendo da complexidade do plano escolhido, incluindo design, engenharia de prompt, testes e integração com o WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "A minha equipa pode intervir no atendimento a qualquer momento?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. O sistema possui transferência humana transparente. A equipa recebe notificações em tempo real e pode assumir o chat no WhatsApp ou painel instantaneamente.",
      },
    },
    {
      "@type": "Question",
      name: "A inteligência artificial funciona diretamente no WhatsApp em Angola?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, conectamos diretamente com a infraestrutura oficial de WhatsApp (Cloud API), permitindo que o número da sua empresa atenda clientes com inteligência artificial, envie lembretes e qualifique potenciais compradores 24 horas por dia.",
      },
    },
    {
      "@type": "Question",
      name: "Quais são os pacotes de websites e automação disponíveis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Temos 4 pacotes estruturados em Kwanzas: Presença (Kz 125.000), Profissional (Kz 250.000, o mais escolhido), Autoridade (Kz 450.000) e Domínio IA (Kz 700.000), além da solução AUTOMATE PRO para empresas que já possuem website.",
      },
    },
  ],
};
