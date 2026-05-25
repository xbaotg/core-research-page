import { getSettings } from "@/lib/data";
import { getI18n, ls } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const [{ locale, t }, settings] = await Promise.all([getI18n(), getSettings()]);
  return (
    <>
      <section className="hero-sunset">
        <div className="container-core py-16 md:py-20">
          <div className="eyebrow mb-3 text-ink/70">{t.contactEyebrow}</div>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">{t.contactHeading}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-tint">{t.contactSubtitle}</p>
        </div>
      </section>

      <div className="container-core grid gap-12 py-20 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <div>
            <div className="eyebrow mb-1">{t.cEmail}</div>
            <a href={`mailto:${settings.email}`} className="text-link hover:underline">
              {settings.email}
            </a>
          </div>
          <div>
            <div className="eyebrow mb-1">{t.cAffiliation}</div>
            <p className="text-ink">{ls(settings, "affiliation", locale)}</p>
          </div>
          {settings.address && (
            <div>
              <div className="eyebrow mb-1">{t.cAddress}</div>
              <p className="text-slate">{ls(settings, "address", locale)}</p>
            </div>
          )}
          <div>
            <div className="eyebrow mb-1">{t.cLocation}</div>
            <p className="text-slate">{ls(settings, "location", locale)}</p>
          </div>
        </div>

        <ContactForm email={settings.email} locale={locale} />
      </div>
    </>
  );
}
