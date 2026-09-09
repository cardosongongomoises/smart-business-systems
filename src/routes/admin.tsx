import { createFileRoute } from "@tanstack/react-router";
import { OperationsCenter } from "@/components/operations/OperationsCenter";
import { AdminAuthGuard } from "@/components/operations/AdminAuthGuard";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  return (
    <AdminAuthGuard>
      <OperationsCenter />
    </AdminAuthGuard>
  );
}
