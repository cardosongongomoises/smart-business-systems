import { createFileRoute } from "@tanstack/react-router";
import { OperationsCenter } from "@/components/operations/OperationsCenter";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  return <OperationsCenter />;
}
