import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";

export const metadata = { title: "Conferences · Admin" };

export default async function AdminConferences() {
  await requireAuth();
  const initial = await prisma.conference.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminShell title="Conferences">
      <ResourceManager resourceKey="conferences" initial={initial} />
    </AdminShell>
  );
}
