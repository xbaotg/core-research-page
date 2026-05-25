"use client";

import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/dict";
import { BASE_PATH } from "@/lib/basePath";

const LABEL: Record<Locale, string> = { en: "EN", vi: "VI" };

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  // Server route sets the cookie + 303 redirects back to the current page.
  const href = (l: Locale) =>
    `${BASE_PATH}/api/locale?l=${l}&to=${encodeURIComponent(pathname)}`;

  return (
    <div
      className="inline-flex overflow-hidden rounded-full border border-hairline text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => (
        <a
          key={l}
          href={href(l)}
          aria-current={l === locale ? "true" : undefined}
          className={`cursor-pointer px-2.5 py-1 transition-colors ${
            l === locale ? "bg-ink text-on-dark" : "text-steel hover:text-ink"
          }`}
        >
          {LABEL[l]}
        </a>
      ))}
    </div>
  );
}
