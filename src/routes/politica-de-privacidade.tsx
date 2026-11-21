import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPolicy } from "@/components/site/PrivacyPolicy";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Agentes Digital Angola" },
      {
        name: "description",
        content:
          "Consulte como a Agentes Digital recolhe, trata e protege dados pessoais em conformidade com a legislação aplicável em Angola.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://agentes-digital.com/privacidade" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return <PrivacyPolicy />;
}
