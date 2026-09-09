import { createFileRoute } from "@tanstack/react-router";
import { OperationsCenter } from "@/components/operations/OperationsCenter";
import { AdminAuthGuard } from "@/components/operations/AdminAuthGuard";

export const Route = createFileRoute("/operacoes")({
  component: OperationsPage,
});

function OperationsPage() {
  return (
    <AdminAuthGuard>
      <OperationsCenter />
    </AdminAuthGuard>
  );
}
