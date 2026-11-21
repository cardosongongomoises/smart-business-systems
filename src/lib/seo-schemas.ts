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
    "Implementação de inteligência artificial e recepção digital pelo WhatsApp para empresas e espaços de estética em Angola. Resposta rápida, qualificação e marcações ligadas à agenda.",
  telephone: "+244934024904",
  email: "agentesdigital.suporte@gmail.com",
  currenciesAccepted: "AOA",
  paymentAccepted: "Transferência Bancária, Multicaixa Express",
  knowsAbout: [
    "Implementação de Inteligência Artificial para Empresas",
    "Recepção Digital no WhatsApp",
    "Automação de Processos Empresariais",
    "Agendamento e Triagem Comercial em Angola",
  ],
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
  areaServed: [
    {
      "@type": "City",
      name: "Luanda",
    },
    {
      "@type": "Country",
      name: "Angola",
    },
  ],
  sameAs: ["https://instagram.com/agentesdigital", "https://linkedin.com/company/agentes-digital"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de Recepção Digital e IA para Empresas em Angola",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Recepção Inteligente para Espaços de Estética",
          description:
            "Implementação de recepção digital no WhatsApp ligada à agenda do espaço de estética: responde a perguntas autorizadas, apresenta serviços, regista e confirma marcações e encaminha para atendimento humano quando necessário.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Implementação de IA para Empresas em Angola",
          description:
            "Implementação à medida de atendimento digital no WhatsApp, triagem comercial, integração com agenda ou CRM e encaminhamento para equipa humana em empresas em Angola.",
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
    "Recepção digital pelo WhatsApp e implementação de inteligência artificial para empresas e espaços de estética em Angola.",
  inLanguage: "pt-AO",
  publisher: {
    "@id": "https://agentes-digital.com/#organization",
  },
};

export const homeBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: "https://agentes-digital.com/",
    },
  ],
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Já tenho recepcionista. Isto vem substituí-la?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. A recepção digital trata das tarefas repetitivas e a sua equipa continua a atender.",
      },
    },
    {
      "@type": "Question",
      name: "Já tenho uma agenda. Funciona com ela?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Primeiro verificamos se é possível ligar ao sistema que usa. Dizemo-lo no diagnóstico.",
      },
    },
    {
      "@type": "Question",
      name: "E se responder mal a uma cliente?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Só responde com informação que o seu espaço autorizou. Testamos antes de ativar e definimos quando a conversa passa para uma pessoa.",
      },
    },
    {
      "@type": "Question",
      name: "As minhas clientes preferem falar com pessoas.",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A cliente pode pedir atendimento humano. A recepção digital trata das tarefas simples.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto custa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Há uma implementação inicial e uma mensalidade de acompanhamento, mais os custos das plataformas externas. Enviamos uma proposta para o seu espaço depois do diagnóstico.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto tempo demora a ficar a funcionar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Depende da agenda e do número de serviços. Indicamos o prazo no diagnóstico.",
      },
    },
    {
      "@type": "Question",
      name: "Como sei se vale a pena?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Medimos o tempo de resposta, o trabalho manual e as marcações registadas durante um período de teste, e vemos os números consigo.",
      },
    },
    {
      "@type": "Question",
      name: "O que acontece aos dados das minhas clientes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Só se recolhe o necessário para atender e marcar, de acordo com a nossa Política de Privacidade.",
      },
    },
    {
      "@type": "Question",
      name: "E se o meu negócio não for de estética?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Neste momento, a Recepção Inteligente é feita para espaços de estética não médica. Se tem outro negócio de serviços com o mesmo problema, fale connosco.",
      },
    },
  ],
};

export const enterpriseServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://agentes-digital.com/implementacao-ia-empresas-angola#service",
  name: "Implementação de IA para Empresas em Angola",
  serviceType: "Implementação de Inteligência Artificial e Automação de Processos Empresariais",
  provider: {
    "@id": "https://agentes-digital.com/#organization",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Luanda",
    },
    {
      "@type": "Country",
      name: "Angola",
    },
  ],
  url: "https://agentes-digital.com/implementacao-ia-empresas-angola",
  description:
    "Implementação prática de inteligência artificial para empresas em Angola: atendimento organizado pelo WhatsApp, qualificação de pedidos comerciais, integração com agenda e encaminhamento para equipa humana.",
};

export const enterpriseArticleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Implementação de IA para Empresas em Angola: Guia Prático de Operação e Atendimento",
  description:
    "Guia estruturado sobre como implementar inteligência artificial numa empresa em Angola sem promessas irreais, com foco em atendimento no WhatsApp, triagem e integração com agenda.",
  inLanguage: "pt-AO",
  datePublished: "2026-11-21",
  dateModified: "2026-11-21",
  author: {
    "@id": "https://agentes-digital.com/#organization",
  },
  publisher: {
    "@id": "https://agentes-digital.com/#organization",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://agentes-digital.com/implementacao-ia-empresas-angola",
  },
};

export const enterpriseBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Início",
      item: "https://agentes-digital.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Implementação de IA para Empresas em Angola",
      item: "https://agentes-digital.com/implementacao-ia-empresas-angola",
    },
  ],
};

export const enterpriseFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Que tipos de empresas em Angola beneficiam primeiro da implementação de IA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Empresas de serviços com volume recorrente de pedidos no WhatsApp, como espaços de estética, clínicas privadas, escritórios de consultoria, imobiliárias e negócios com marcação ou triagem diária.",
      },
    },
    {
      "@type": "Question",
      name: "A implementação de IA exige substituir os sistemas atuais da empresa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não necessariamente. No diagnóstico inicial verificamos se é possível ligar a recepção digital à agenda, folha de cálculo ou ferramenta que a empresa já utiliza no dia a dia.",
      },
    },
    {
      "@type": "Question",
      name: "Como se evita que o agente de IA dê informações erradas aos clientes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O sistema responde apenas com base nos serviços, preços, horários e regras previamente aprovados pela empresa. Antes de entrar em produção, testamos cenários reais e definimos gatilhos claros para passar a conversa a um colaborador.",
      },
    },
    {
      "@type": "Question",
      name: "Quanto custa implementar inteligência artificial numa empresa em Angola?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O orçamento depende dos fluxos a ligar, da agenda utilizada e do volume de serviços. Trabalhamos com um valor de implementação inicial e uma mensalidade de acompanhamento, sendo os custos das plataformas externas separados e apresentados de forma transparente.",
      },
    },
    {
      "@type": "Question",
      name: "A Agentes Digital atende empresas fora de Luanda?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim. A equipa opera a partir de Luanda e realiza diagnósticos, implementações e acompanhamento remoto para empresas em qualquer província de Angola.",
      },
    },
  ],
};
