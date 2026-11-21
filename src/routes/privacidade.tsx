import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPolicy } from "@/components/site/PrivacyPolicy";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Agentes Digital Angola" },
      {
        name: "description",
        content:
          "Consulte como a Agentes Digital recolhe, trata e protege dados pessoais em conformidade com a legislação aplicável em Angola.",
      },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "Política de Privacidade | Agentes Digital Angola" },
      { property: "og:url", content: "https://agentes-digital.com/privacidade" },
    ],
    links: [
      { rel: "canonical", href: "https://agentes-digital.com/privacidade" },
      { rel: "alternate", hrefLang: "pt-AO", href: "https://agentes-digital.com/privacidade" },
      { rel: "alternate", hrefLang: "x-default", href: "https://agentes-digital.com/privacidade" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <PrivacyPolicy />;
}
