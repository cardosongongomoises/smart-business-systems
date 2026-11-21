import { createFileRoute } from "@tanstack/react-router";
import { EmpresaIAPillar } from "@/components/site/EmpresaIAPillar";
import {
  enterpriseArticleSchema,
  enterpriseBreadcrumbSchema,
  enterpriseFaqSchema,
  enterpriseServiceSchema,
} from "@/lib/seo-schemas";

export const Route = createFileRoute("/implementacao-ia-empresas-angola")({
  head: () => ({
    meta: [
      {
        title: "Implementação de IA para Empresas em Angola | Agentes Digital",
      },
      {
        name: "description",
        content:
          "Guia prático de implementação de IA para empresas em Angola: atendimento pelo WhatsApp, triagem comercial e automação de processos com diagnóstico em Luanda.",
      },
      {
        name: "keywords",
        content:
          "implementacao de ia para empresas em angola, inteligencia artificial empresas angola, automacao whatsapp empresas luanda, agentes de ia angola, agentes digital",
      },
      {
        name: "robots",
        content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      },
      {
        property: "og:title",
        content: "Implementação de IA para Empresas em Angola | Agentes Digital",
      },
      {
        property: "og:description",
        content:
          "Como implementar inteligência artificial para empresas em Angola com foco em atendimento no WhatsApp, ligação à agenda e encaminhamento para equipa humana.",
      },
      {
        property: "og:url",
        content: "https://agentes-digital.com/implementacao-ia-empresas-angola",
      },
      {
        name: "twitter:title",
        content: "Implementação de IA para Empresas em Angola | Agentes Digital",
      },
      {
        name: "twitter:description",
        content:
          "Guia técnico sobre implementação de IA para empresas em Angola: etapas, critérios operacionais e diagnóstico em Luanda.",
      },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://agentes-digital.com/implementacao-ia-empresas-angola",
      },
      {
        rel: "alternate",
        hrefLang: "pt-AO",
        href: "https://agentes-digital.com/implementacao-ia-empresas-angola",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://agentes-digital.com/implementacao-ia-empresas-angola",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(enterpriseServiceSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(enterpriseArticleSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(enterpriseBreadcrumbSchema),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(enterpriseFaqSchema),
      },
    ],
  }),
  component: EnterpriseAIPage,
});

function EnterpriseAIPage() {
  return <EmpresaIAPillar />;
}
