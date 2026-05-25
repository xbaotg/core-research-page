import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";

export const metadata = { title: "Publications · Admin" };

export default async function AdminPublications() {
  await requireAuth();
  const initial = await prisma.publication.findMany({
    orderBy: [{ year: "desc" }, { order: "asc" }],
  });
  return (
    <AdminShell title="Publications">
      <ResourceManager resourceKey="publications" initial={initial} />
    </AdminShell>
  );
}
