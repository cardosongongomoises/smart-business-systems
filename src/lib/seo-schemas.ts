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
    "Implementação de inteligência artificial e automatização de processos empresariais em Angola para melhorar o atendimento, acompanhar oportunidades comerciais e reduzir tarefas repetitivas.",
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
    name: "Inteligência Artificial e Automatização de Processos Empresariais",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Implementação de Inteligência Artificial",
          description:
            "Atendimento rápido a clientes, respostas a perguntas frequentes, recolha e qualificação de contactos, marcação de reuniões e encaminhamento para colaboradores.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automatização de Processos Empresariais",
          description:
            "Follow-ups comerciais automáticos, lembretes, notificações, relatórios automáticos, organização de dados e integração entre ferramentas.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Automate Pro: Integração sobre Website Existente",
          description:
            "Implementação de atendimento automático e fluxo de marcação de reuniões sobre o website que a empresa já possui, sem o reconstruir.",
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
    "Implementação de inteligência artificial e automatização de processos para empresas em Angola",
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
      name: "O que faz a Agentes Digital?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ajudamos empresas em Angola a atender clientes mais rápido, acompanhar oportunidades comerciais e reduzir tarefas repetitivas através da implementação de inteligência artificial e da automatização de processos empresariais.",
      },
    },
    {
      "@type": "Question",
      name: "Qual é a diferença entre os dois serviços?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A implementação de inteligência artificial foca-se no atendimento: responder a dúvidas, recolher e qualificar contactos, marcar reuniões e encaminhar para a equipa. A automatização de processos foca-se na operação interna e comercial: follow-ups, lembretes, relatórios automáticos, atualização de dados e ligação entre ferramentas.",
      },
    },
    {
      "@type": "Question",
      name: "A solução substitui funcionários?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. O objetivo é retirar o peso das respostas repetitivas e das tarefas manuais para que a sua equipa se concentre na negociação, no atendimento humano de qualidade e no fecho de negócios.",
      },
    },
    {
      "@type": "Question",
      name: "É possível encaminhar conversas para pessoas?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Sempre que o pedido exige análise humana, negociação ou decisão da sua equipa, a conversa é encaminhada para um colaborador com o resumo e o histórico completo.",
      },
    },
    {
      "@type": "Question",
      name: "É possível utilizar ferramentas existentes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Trabalhamos sobre o WhatsApp, e-mail, calendário, CRM e website que a empresa já utiliza, evitando reconstruções desnecessárias sempre que possível.",
      },
    },
    {
      "@type": "Question",
      name: "É possível automatizar apenas um processo?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. Os serviços funcionam individualmente ou em conjunto. Pode começar apenas pelo atendimento no WhatsApp, pela marcação de reuniões ou por um fluxo específico de follow-up.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo demora a implementação?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O prazo depende da complexidade das integrações e do fluxo definido no diagnóstico. Na proposta apresentamos o calendário realista de planeamento, configuração, testes e entrada em funcionamento.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona o suporte?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Os planos com mensalidade incluem acompanhamento técnico, monitorização e ajustes conforme o plano contratado, com atendimento directo da nossa equipa.",
      },
    },
    {
      "@type": "Question",
      name: "Quais são os custos?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Temos planos definidos a partir de 125.000 Kz de implementação e 20.000 Kz ao mês, além de soluções personalizadas sob diagnóstico. Custos externos de plataformas de terceiros variam consoante a utilização.",
      },
    },
    {
      "@type": "Question",
      name: "É necessário conhecimento técnico?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Tratamos do diagnóstico, configuração, integrações, testes e documentação, e orientamos a sua equipa para utilizar tudo no dia a dia com simplicidade.",
      },
    },
    {
      "@type": "Question",
      name: "Como saber se a solução é adequada à empresa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Basta solicitar um diagnóstico. Avaliamos o seu fluxo de atendimento e processos actuais para indicar com transparência o que faz sentido implementar primeiro.",
      },
    },
  ],
};
