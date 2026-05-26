import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";

export const metadata = { title: "Awards · Admin" };

export default async function AdminAwards() {
  await requireAuth();
  const initial = await prisma.award.findMany({ orderBy: [{ year: "desc" }, { order: "asc" }] });
  return (
    <AdminShell title="Awards">
      <ResourceManager resourceKey="awards" initial={initial} />
    </AdminShell>
  );
}
