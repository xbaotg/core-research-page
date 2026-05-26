import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n";
import { asset } from "@/lib/basePath";

export const dynamic = "force-dynamic";
export const metadata = { title: "Awards" };

// Medal styling per rank tier (1=gold, 2=silver, 3=bronze, 0=other).
const MEDALS: Record<number, { emoji: string; ring: string; chip: string }> = {
  1: { emoji: "🥇", ring: "var(--color-accent-yellow)", chip: "bg-[var(--color-accent-yellow)] text-ink" },
  2: { emoji: "🥈", ring: "var(--color-stone)", chip: "bg-[var(--color-stone)] text-on-dark" },
  3: { emoji: "🥉", ring: "var(--color-accent-orange)", chip: "bg-[var(--color-accent-orange)] text-on-dark" },
  0: { emoji: "🏅", ring: "var(--color-accent-blue)", chip: "bg-[var(--color-accent-blue)] text-on-dark" },
};
const medal = (rank: number) => MEDALS[rank] ?? MEDALS[0];

export default async function AwardsPage() {
  const [{ t }, awards] = await Promise.all([
    getI18n(),
    prisma.award.findMany({ orderBy: [{ year: "desc" }, { order: "asc" }] }),
  ]);

  const total = awards.length;
  const intl = awards.filter((a) => a.scope === "international").length;
  const national = awards.filter((a) => a.scope === "national").length;
  const golds = awards.filter((a) => a.rank === 1).length;

  const stats = [
    { v: total, k: t.awTotal },
    { v: intl, k: t.awIntl },
    { v: national, k: t.awNational },
    { v: golds, k: t.awGolds },
  ];

  // Group by year, newest first.
  const byYear = new Map<string, typeof awards>();
  for (const a of awards) {
    const y = a.year ? String(a.year) : "Other";
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(a);
  }
  const years = [...byYear.keys()];

  return (
    <>
      {/* ============ HERO (dark) ============ */}
      <section className="sunset-mesh relative">
        <div className="container-core py-16 text-on-dark md:py-20">
          <div className="eyebrow mb-3 text-white/80">{t.awardsEyebrow}</div>
          <h1 className="font-display text-5xl text-white sm:text-6xl">{t.awardsHeading}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{t.awardsSubtitle}</p>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      {total > 0 && (
        <section className="border-b border-hairline-soft bg-surface">
          <div className="container-core grid grid-cols-2 gap-6 py-10 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.k}>
                <div className="font-display text-4xl text-ink">{s.v}</div>
                <div className="eyebrow mt-1">{s.k}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ============ AWARDS BY YEAR ============ */}
      <div className="container-core space-y-16 py-20">
        {years.map((y) => (
          <section key={y}>
            <div className="mb-8 flex items-center gap-4">
              <h2 className="font-display text-3xl text-ink">{y}</h2>
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <div className="space-y-6">
              {byYear.get(y)!.map((a, i) => {
                const m = medal(a.rank);
                const scopeLabel = a.scope === "national" ? t.awScopeNational : t.awScopeIntl;
                const reversed = i % 2 === 1; // alternate image side
                return (
                  <article
                    key={a.id}
                    className="rise grid overflow-hidden rounded-xl border border-hairline bg-canvas shadow-layered transition-shadow hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] md:grid-cols-[420px_1fr]"
                  >
                    {/* Media */}
                    {a.image && (
                      <div
                        className={`relative min-h-[220px] bg-surface ${reversed ? "md:order-2" : ""}`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={asset(a.image)}
                          alt={a.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                        <span
                          className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-canvas text-2xl shadow-layered"
                          style={{ boxShadow: `0 0 0 3px ${m.ring}` }}
                          aria-hidden
                        >
                          {m.emoji}
                        </span>
                      </div>
                    )}

                    {/* Body */}
                    <div className="flex flex-col justify-center gap-2 p-8">
                      <div className="flex flex-wrap items-center gap-2">
                        {a.featured && <span className="badge badge-orange">{t.featured}</span>}
                        <span className={`badge ${m.chip}`}>
                          {!a.image && <span aria-hidden>{m.emoji} </span>}
                          {a.prize}
                        </span>
                        <span className="badge badge-cream">{scopeLabel}</span>
                      </div>

                      <h3 className="mt-1 text-2xl font-medium leading-snug text-ink">{a.title}</h3>
                      {a.event && <p className="text-sm font-medium text-steel">{a.event}</p>}
                      {a.description && (
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">
                          {a.description}
                        </p>
                      )}
                      {a.link && (
                        <a
                          href={a.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 text-sm font-medium text-link hover:underline"
                        >
                          {t.visit}
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}

        {total === 0 && (
          <p className="text-steel">
            {t.awEmpty}{" "}
            <Link href="/admin/awards" className="text-link underline">
              Add the first award →
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
