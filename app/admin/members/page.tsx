import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";

export const metadata = { title: "People · Admin" };

export default async function AdminMembers() {
  await requireAuth();
  const initial = await prisma.member.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminShell title="People">
      <ResourceManager resourceKey="members" initial={initial} />
    </AdminShell>
  );
}
