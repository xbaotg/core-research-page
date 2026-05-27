"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "@/lib/basePath";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/members", label: "People" },
  { href: "/admin/publications", label: "Publications" },
  { href: "/admin/conferences", label: "Conferences" },
  { href: "/admin/awards", label: "Awards" },
  { href: "/admin/datasets", label: "Datasets" },
  { href: "/admin/news", label: "News" },
  { href: "/admin/settings", label: "Site settings" },
];

export default function AdminShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch(api("/api/auth/logout"), { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const active = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-surface">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-hairline bg-canvas p-4 md:flex">
        <Link href="/" className="mb-6 px-2 font-display text-xl text-ink">
          CORE Lab<span className="text-primary">_</span>
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                active(n.href)
                  ? "bg-cream text-ink"
                  : "text-slate hover:bg-surface hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1 pt-4">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm text-steel hover:text-ink"
          >
            ↗ View site
          </Link>
          <button
            onClick={logout}
            className="rounded-md px-3 py-2 text-left text-sm text-primary-deep hover:bg-cream"
          >
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1">
        {/* mobile top bar */}
        <div className="flex items-center gap-3 overflow-x-auto border-b border-hairline bg-canvas px-4 py-3 md:hidden">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`whitespace-nowrap text-sm font-medium ${
                active(n.href) ? "text-primary" : "text-steel"
              }`}
            >
              {n.label}
            </Link>
          ))}
          <button onClick={logout} className="whitespace-nowrap text-sm text-primary-deep">
            Sign out
          </button>
        </div>

        <main className="mx-auto max-w-4xl p-6 md:p-10">
          <h1 className="font-display text-3xl text-ink">{title}</h1>
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
