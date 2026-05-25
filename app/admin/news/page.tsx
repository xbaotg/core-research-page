import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";
import ResourceManager from "@/components/admin/ResourceManager";

export const metadata = { title: "News · Admin" };

export default async function AdminNews() {
  await requireAuth();
  const initial = await prisma.news.findMany({ orderBy: { date: "desc" } });
  return (
    <AdminShell title="News">
      <ResourceManager resourceKey="news" initial={initial} />
    </AdminShell>
  );
}
