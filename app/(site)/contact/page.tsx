import { getSettings } from "@/lib/data";
import { getI18n, ls } from "@/lib/i18n";
import { asset } from "@/lib/basePath";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Contact" };

// CORE Lab advisors — listed explicitly so the page always shows both,
// independent of database/admin edits, with each email tied to its owner.
const ADVISORS = [
  {
    name: "Thanh Duc Ngo",
    title: "Dr.",
    badge: "Principal Investigator",
    role: "Principal Investigator · Computer Vision & Multimedia",
    email: "thanhnd@uit.edu.vn",
    photo: "/thanh-duc-ngo.png",
  },
  {
    name: "Tien Do",
    title: "MSc.",
    badge: "Co-advisor",
    role: "Co-advisor · Computer Vision & Retrieval",
    email: "tiendv@uit.edu.vn",
    photo: "/tien-do.png",
  },
];

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
          <div className="space-y-4">
            {ADVISORS.map((a) => {
              const tag = a.badge === "Principal Investigator" ? t.cPI : a.badge;
              return (
                <div key={a.name} className="card-cream">
                  <div className="flex items-center gap-4">
                    <div
                      className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-ink/10 font-display text-xl text-ink"
                      style={{ background: `center/cover url(${asset(a.photo)})` }}
                    />
                    <div className="min-w-0">
                      <span className="badge badge-orange">{tag}</span>
                      <div className="mt-1.5 font-display text-xl leading-tight text-ink">
                        {a.title ? `${a.title} ` : ""}
                        {a.name}
                      </div>
                      <div className="text-sm text-steel">{a.role}</div>
                    </div>
                  </div>
                  <a href={`mailto:${a.email}`} className="btn btn-dark mt-4">
                    {a.email}
                  </a>
                </div>
              );
            })}
            <p className="text-sm leading-relaxed text-slate">{t.cPINote}</p>
          </div>
          <div>
            <div className="eyebrow mb-1">{locale === "vi" ? "Email chung" : "Lab email"}</div>
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
