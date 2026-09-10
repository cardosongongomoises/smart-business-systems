import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPolicy } from "@/components/site/PrivacyPolicy";

export const Route = createFileRoute("/privacidade")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return <PrivacyPolicy />;
}
