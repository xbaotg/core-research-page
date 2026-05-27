import { getSettings } from "@/lib/data";
import { getI18n, ls } from "@/lib/i18n";
import { prisma } from "@/lib/prisma";
import { asset } from "@/lib/basePath";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contact" };

export default async function ContactPage() {
  const [{ locale, t }, settings, pi] = await Promise.all([
    getI18n(),
    getSettings(),
    prisma.member.findFirst({
      where: { category: "faculty" },
      orderBy: { order: "asc" },
    }),
  ]);
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
          {pi && (
            <div className="card-cream">
              <div className="flex items-center gap-4">
                <div
                  className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-ink/10 font-display text-xl text-ink"
                  style={pi.photo ? { background: `center/cover url(${asset(pi.photo)})` } : undefined}
                >
                  {!pi.photo && pi.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <span className="badge badge-orange">{t.cPI}</span>
                  <div className="mt-1.5 font-display text-xl leading-tight text-ink">
                    {pi.title ? `${pi.title} ` : ""}
                    {pi.name}
                  </div>
                  {pi.role && <div className="text-sm text-steel">{pi.role}</div>}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate">{t.cPINote}</p>
              {pi.email && (
                <a href={`mailto:${pi.email}`} className="btn btn-dark mt-4">
                  {pi.email}
                </a>
              )}
            </div>
          )}
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
