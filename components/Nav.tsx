"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { getDict, type Locale } from "@/lib/dict";

export default function Nav({
  labName = "CORE",
  locale = "en",
}: {
  labName?: string;
  locale?: Locale;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const t = getDict(locale);

  const LINKS = [
    { href: "/", label: t.navHome },
    { href: "/people", label: t.navPeople },
    { href: "/publications", label: t.navPublications },
    { href: "/datasets", label: t.navDatasets },
    { href: "/awards", label: t.navAwards },
    { href: "/conferences", label: t.navConferences },
    { href: "/contact", label: t.navContact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline-soft bg-canvas/90 backdrop-blur">
      <nav className="container-core flex h-16 items-center justify-between">
        <Logo name={labName} />

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(l.href) ? "text-primary" : "text-slate hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher locale={locale} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            className="grid h-10 w-10 place-items-center rounded-md"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 bg-ink" />
              <span className="h-0.5 w-5 bg-ink" />
              <span className="h-0.5 w-5 bg-ink" />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-hairline-soft bg-canvas md:hidden">
          <div className="container-core flex flex-col py-3">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-3 text-sm font-medium ${
                  isActive(l.href) ? "text-primary" : "text-slate"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
