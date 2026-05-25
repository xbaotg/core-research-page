import Link from "next/link";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = { title: "Admin" };

export default async function AdminDashboard() {
  await requireAuth();

  const [members, publications, conferences, news] = await Promise.all([
    prisma.member.count(),
    prisma.publication.count(),
    prisma.conference.count(),
    prisma.news.count(),
  ]);

  const cards = [
    { href: "/admin/members", label: "People", count: members },
    { href: "/admin/publications", label: "Publications", count: publications },
    { href: "/admin/conferences", label: "Conferences", count: conferences },
    { href: "/admin/news", label: "News", count: news },
  ];

  return (
    <AdminShell title="Dashboard">
      <p className="text-slate">
        Manage everything on the CORE Lab site — people, publications, conference
        deadlines, news and site-wide settings.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="card hover:border-primary">
            <div className="font-display text-4xl text-ink">{c.count}</div>
            <div className="mt-1 text-sm text-steel">{c.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 card-cream">
        <h2 className="text-lg font-medium text-ink">Quick start</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate">
          <li>Edit hero text, about and contact info under <Link href="/admin/settings" className="text-link underline">Site settings</Link>.</li>
          <li>Add conference deadlines under <Link href="/admin/conferences" className="text-link underline">Conferences</Link> — countdowns update live.</li>
          <li>Fill in member bios and links under <Link href="/admin/members" className="text-link underline">People</Link>.</li>
        </ul>
      </div>
    </AdminShell>
  );
}
