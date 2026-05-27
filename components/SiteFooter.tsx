import Link from "next/link";
import type { SettingsMap } from "@/lib/data";
import { ls, type Locale } from "@/lib/i18n";
import { getDict } from "@/lib/dict";

export default function SiteFooter({
  settings,
  locale = "en",
}: {
  settings: SettingsMap;
  locale?: Locale;
}) {
  const t = getDict(locale);
  const COLS = [
    {
      title: t.footerLab,
      links: [
        { href: "/people", label: t.navPeople },
        { href: "/publications", label: t.navPublications },
        { href: "/datasets", label: t.navDatasets },
        { href: "/conferences", label: t.navConferences },
      ],
    },
    {
      title: t.footerConnect,
      links: [{ href: "/contact", label: t.navContact }],
    },
  ];

  return (
    <footer className="mt-auto">
      {/* THE signature: sunset stripe band closes every page */}
      <div className="sunset-stripe" aria-hidden />

      <div className="bg-footer-cream">
        <div className="container-core grid grid-cols-2 gap-8 py-16 md:grid-cols-4">
          <div className="col-span-2 md:col-span-2">
            <div className="font-display text-2xl text-ink">{settings.labFullName}</div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
              {ls(settings, "footerNote", locale)}
            </p>
            <p className="mt-4 text-sm text-steel">{ls(settings, "affiliation", locale)}</p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="eyebrow mb-3">{col.title}</div>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-link hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-beige-deep/50">
          <div className="container-core flex flex-col items-start justify-between gap-2 py-6 text-xs text-steel sm:flex-row sm:items-center">
            <span>
              © {new Date().getFullYear()} {settings.labFullName}.{" "}
              {ls(settings, "location", locale)}.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
