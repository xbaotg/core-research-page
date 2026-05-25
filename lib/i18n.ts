import "server-only";
import { cookies } from "next/headers";
import { type Locale, LOCALE_COOKIE, getDict } from "./dict";

export type { Locale } from "./dict";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return store.get(LOCALE_COOKIE)?.value === "vi" ? "vi" : "en";
}

export async function getI18n() {
  const locale = await getLocale();
  return { locale, t: getDict(locale) };
}

/** Localized setting value: prefer `<key>_vi` when locale is vi and it's non-empty. */
export function ls(
  settings: Record<string, string>,
  key: string,
  locale: Locale
): string {
  if (locale === "vi") {
    const v = settings[`${key}_vi`];
    if (v && v.trim()) return v;
  }
  return settings[key] ?? "";
}
