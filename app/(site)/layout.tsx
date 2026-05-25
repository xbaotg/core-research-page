import Nav from "@/components/Nav";
import SiteFooter from "@/components/SiteFooter";
import { getSettings } from "@/lib/data";
import { getLocale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, locale] = await Promise.all([getSettings(), getLocale()]);
  return (
    <>
      <Nav labName={settings.labName} locale={locale} />
      <main className="flex-1">{children}</main>
      <SiteFooter settings={settings} locale={locale} />
    </>
  );
}
