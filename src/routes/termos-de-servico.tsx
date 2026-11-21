import { createFileRoute } from "@tanstack/react-router";
import { TermsOfService } from "@/components/site/TermsOfService";

export const Route = createFileRoute("/termos-de-servico")({
  head: () => ({
    meta: [
      { title: "Termos de Serviço | Agentes Digital Angola" },
      {
        name: "description",
        content:
          "Leia os Termos de Serviço aplicáveis à utilização do website e à contratação de soluções da Agentes Digital em Angola.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
    links: [{ rel: "canonical", href: "https://agentes-digital.com/termos" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return <TermsOfService />;
}
