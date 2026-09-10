import { createFileRoute } from "@tanstack/react-router";
import { TermsOfService } from "@/components/site/TermsOfService";

export const Route = createFileRoute("/termos")({
  component: TermsPage,
});

function TermsPage() {
  return <TermsOfService />;
}
