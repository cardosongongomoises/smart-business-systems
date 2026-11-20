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
    "Atendimento imediato no WhatsApp e no website em menos de 10 segundos, marcação automática de reuniões e acompanhamento comercial para empresas em Angola.",
  telephone: "+244934024904",
  email: "agentesdigital.suporte@gmail.com",
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
    name: "Atendimento Comercial 24h e Websites para Empresas",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Atendimento Imediato no WhatsApp e Website",
          description:
            "Resposta em menos de 10 segundos, qualificação de pedidos e marcação automática de reuniões para empresas em Angola.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Websites que Transformam Visitas em Contactos",
          description:
            "Websites rápidos com SEO local e ligação direta ao WhatsApp para gerar pedidos de orçamento.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automate Pro: Atendimento Imediato em Website Existente",
          description:
            "Ligação de atendimento automático no WhatsApp, qualificação e marcação de reuniões ao site que a empresa já tem, sem o refazer.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Registo e Acompanhamento Comercial",
          description:
            "Centralização de contactos, histórico completo, lembretes de reunião e acompanhamento automático para equipas de vendas em Angola.",
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
  description:
    "Atendimento 24h no WhatsApp, marcação automática de reuniões e websites comerciais para empresas em Angola",
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
      name: "Preciso de saber programar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Tratamos da configuração, do WhatsApp, do registo de contactos e do painel. A sua equipa usa como usa o WhatsApp.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo demora a ver resultados?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O sistema arranca em dias. No primeiro mês mede-se o tempo de resposta em menos de 10 segundos e quantos contactos passaram a reunião marcada.",
      },
    },
    {
      "@type": "Question",
      name: "Funciona com o WhatsApp que já uso?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ligamos ao WhatsApp da empresa através da API oficial da Meta para responder automaticamente, qualificar contactos e marcar reuniões.",
      },
    },
    {
      "@type": "Question",
      name: "E se houver um problema?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Monitorizamos o sistema de forma contínua e tem suporte técnico incluído. Quando uma conversa exige uma pessoa, passa para a sua equipa com o histórico completo.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto custa realmente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Os planos começam em 125.000 Kz de implementação (20.000 Kz ao mês) no plano Presença, 250.000 Kz (50.000 Kz ao mês) no plano Profissional, 450.000 Kz (85.000 Kz ao mês) no Autoridade e 700.000 Kz (150.000 Kz ao mês) na Operação Completa, além do Automate Pro (300.000 Kz e 65.000 Kz ao mês). Só os custos de plataformas de terceiros variam com a utilização.",
      },
    },
    {
      "@type": "Question",
      name: "Preciso de mudar tudo o que já tenho?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Se já tem website, acrescentamos o atendimento automático por cima com o Automate Pro, sem migração e sem o tirar do ar.",
      },
    },
    {
      "@type": "Question",
      name: "E se não gostar do resultado?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tem 30 dias de garantia. Se não entregarmos o que prometemos, devolvemos 100% do investimento.",
      },
    },
  ],
};
