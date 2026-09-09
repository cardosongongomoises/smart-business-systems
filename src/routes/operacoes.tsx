import { createFileRoute } from "@tanstack/react-router";
import { OperationsCenter } from "@/components/operations/OperationsCenter";

export const Route = createFileRoute("/operacoes")({
  component: OperationsPage,
});

function OperationsPage() {
  return <OperationsCenter />;
}
