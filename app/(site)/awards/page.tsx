import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n";
import { asset } from "@/lib/basePath";

export const dynamic = "force-dynamic";
export const metadata = { title: "Awards" };

// Medal styling per rank tier (1=gold, 2=silver, 3=bronze, 0=other).
type Medal = { emoji: string; bar: string; chip: string; grad: string };
const MEDALS: Record<number, Medal> = {
  1: {
    emoji: "🥇",
    bar: "var(--color-accent-yellow)",
    chip: "bg-[var(--color-accent-yellow)] text-ink",
    grad: "linear-gradient(135deg,#ffae13,#ff6b00)",
  },
  2: {
    emoji: "🥈",
    bar: "var(--color-stone)",
    chip: "bg-[var(--color-stone)] text-on-dark",
    grad: "linear-gradient(135deg,#c7c7c7,#5a5a5a)",
  },
  3: {
    emoji: "🥉",
    bar: "var(--color-accent-orange)",
    chip: "bg-[var(--color-accent-orange)] text-on-dark",
    grad: "linear-gradient(135deg,#ff8105,#cc3a05)",
  },
  0: {
    emoji: "🏅",
    bar: "var(--color-accent-blue)",
    chip: "bg-[var(--color-accent-blue)] text-on-dark",
    grad: "linear-gradient(135deg,#3b89ff,#006acc)",
  },
};
const medal = (rank: number) => MEDALS[rank] ?? MEDALS[0];

type Award = Awaited<ReturnType<typeof prisma.award.findMany>>[number];

export default async function AwardsPage() {
  const [{ t }, awards] = await Promise.all([
    getI18n(),
    prisma.award.findMany({ orderBy: [{ year: "desc" }, { order: "asc" }] }),
  ]);

  const featured = awards.filter((a) => a.featured);
  const rest = awards.filter((a) => !a.featured);

  // Group the rest by year, newest first.
  const byYear = new Map<string, Award[]>();
  for (const a of rest) {
    const y = a.year ? String(a.year) : "Other";
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(a);
  }
  const yearKeys = [...byYear.keys()];

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

      <div className="container-core space-y-16 py-16 md:py-20">
        {/* ============ FEATURED BANNERS ============ */}
        {featured.length > 0 && (
          <section className="space-y-6">
            {featured.map((a) => {
              const m = medal(a.rank);
              return (
                <article
                  key={a.id}
                  className="rise grid overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-layered md:grid-cols-2"
                >
                  <div
                    className="relative min-h-[260px] overflow-hidden"
                    style={a.image ? undefined : { background: m.grad }}
                  >
                    {a.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={asset(a.image)}
                        alt={a.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="grid h-full place-items-center text-7xl">{m.emoji}</div>
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-3 p-8 md:p-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge badge-orange">★ {t.featured}</span>
                      <span className={`badge ${m.chip}`}>
                        {m.emoji} {a.prize}
                      </span>
                    </div>
                    <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                      {a.title}
                    </h2>
                    {a.event && <p className="text-sm font-medium text-steel">{a.event}</p>}
                    {a.description && (
                      <p className="max-w-xl leading-relaxed text-slate">{a.description}</p>
                    )}
                    {(a.year || a.link) && (
                      <div className="mt-1 flex items-center gap-4 text-sm">
                        {a.year && <span className="font-mono text-stone">{a.year}</span>}
                        {a.link && (
                          <a
                            href={a.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-link hover:underline"
                          >
                            {t.visit}
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {/* ============ AWARDS BY YEAR ============ */}
        {yearKeys.map((y) => (
          <section key={y}>
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-display text-3xl text-ink">{y}</h2>
              <span className="text-sm text-stone">
                {byYear.get(y)!.length} {byYear.get(y)!.length === 1 ? "award" : "awards"}
              </span>
              <span className="h-px flex-1 bg-hairline" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {byYear.get(y)!.map((a) => {
                const m = medal(a.rank);
                return (
                  <article
                    key={a.id}
                    className="rise group flex flex-col overflow-hidden rounded-xl border border-hairline bg-canvas transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]"
                  >
                    {/* color accent bar — instant rank cue */}
                    <div className="h-1 w-full" style={{ background: m.bar }} />

                    {/* media */}
                    <div
                      className="relative h-44 overflow-hidden"
                      style={a.image ? undefined : { background: m.grad }}
                    >
                      {a.image ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={asset(a.image)}
                            alt={a.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                        </>
                      ) : (
                        <div className="grid h-full place-items-center text-6xl drop-shadow-sm">
                          {m.emoji}
                        </div>
                      )}
                      <span
                        className={`badge ${m.chip} absolute bottom-3 left-3 shadow-sm`}
                      >
                        {m.emoji} {a.prize}
                      </span>
                    </div>

                    {/* body */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="eyebrow">
                        {a.year}
                        {a.event ? ` · ${a.event}` : ""}
                      </div>
                      <h3 className="mt-2 text-lg font-medium leading-snug text-ink">{a.title}</h3>
                      {a.description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate">
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

        {awards.length === 0 && <p className="text-steel">{t.awEmpty}</p>}
      </div>
    </>
  );
}
