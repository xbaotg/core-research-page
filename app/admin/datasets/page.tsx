import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";

export const metadata = { title: "Datasets · Admin" };

export default async function AdminDatasets() {
  await requireAuth();
  const initial = await prisma.dataset.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });
  return (
    <AdminShell title="Datasets">
      <ResourceManager resourceKey="datasets" initial={initial} />
    </AdminShell>
  );
}
