"use client";

import { useRouter } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/dict";

const LABEL: Record<Locale, string> = { en: "EN", vi: "VI" };

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const router = useRouter();

  function setLocale(l: Locale) {
    if (l === locale) return;
    // path=/ so it applies across the whole site (incl. the base path)
    document.cookie = `locale=${l}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <div
      className="inline-flex overflow-hidden rounded-full border border-hairline text-xs font-semibold"
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={l === locale}
          className={`px-2.5 py-1 transition-colors ${
            l === locale ? "bg-ink text-on-dark" : "text-steel hover:text-ink"
          }`}
        >
          {LABEL[l]}
        </button>
      ))}
    </div>
  );
}
