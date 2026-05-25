import { prisma } from "@/lib/prisma";
import { nextDate } from "@/lib/data";
import { getI18n } from "@/lib/i18n";
import { fmtDate } from "@/lib/format";
import { Countdown } from "@/components/Countdown";
import ConferenceCard from "@/components/ConferenceCard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Conferences" };

export default async function ConferencesPage() {
  const [{ locale, t }, conferences] = await Promise.all([
    getI18n(),
    prisma.conference.findMany({ orderBy: { order: "asc" } }),
  ]);

  const withDates = conferences.map((c) => ({ conf: c, ...nextDate(c) })).filter((x) => x.date);
  const upcoming = withDates
    .filter((x) => x.date!.getTime() > Date.now())
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());
  const soonest = upcoming[0];

  return (
    <>
      <section className="sunset-mesh relative">
        <div className="container-core py-16 text-on-dark md:py-20">
          <div className="eyebrow mb-3 text-white/80">{t.confEyebrow}</div>
          <h1 className="font-display text-5xl text-white sm:text-6xl">{t.confHeading}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{t.confSubtitle}</p>

          {soonest && (
            <div className="mt-10 inline-block rounded-2xl bg-cream-light/95 p-6 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.3)] sm:p-8">
              <div className="flex items-center gap-2">
                <span className="badge badge-orange">
                  {soonest.kind === "deadline" ? t.nextDeadline : t.nextConference}
                </span>
                <span className="font-display text-2xl text-ink">{soonest.conf.name}</span>
                <span className="text-stone">{soonest.conf.location}</span>
              </div>
              <p className="mt-1 text-sm text-steel">
                {soonest.kind === "deadline" ? t.submissionCloses : t.starts} {fmtDate(soonest.date)}
              </p>
              <div className="mt-6">
                <Countdown iso={soonest.date!.toISOString()} kind={soonest.kind} locale={locale} />
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="container-core py-20">
        {upcoming.length > 0 && (
          <>
            <div className="eyebrow mb-6">{t.upcoming}</div>
            <div className="grid gap-6 lg:grid-cols-2">
              {upcoming.map(({ conf }) => (
                <ConferenceCard key={conf.id} conf={conf} locale={locale} />
              ))}
            </div>
          </>
        )}

        {conferences.length === 0 && <p className="text-steel">{t.confEmpty}</p>}
      </div>
    </>
  );
}
