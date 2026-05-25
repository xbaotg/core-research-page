import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings, nextDate, parseLinks } from "@/lib/data";
import { getI18n, ls } from "@/lib/i18n";
import { fmtDate } from "@/lib/format";
import { asset } from "@/lib/basePath";
import { Countdown } from "@/components/Countdown";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";
import Marquee from "@/components/Marquee";

export default async function HomePage() {
  const [
    { locale, t },
    settings,
    featured,
    members,
    conferences,
    news,
    pubCount,
    memberCount,
  ] = await Promise.all([
    getI18n(),
    getSettings(),
    prisma.publication.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }], take: 3 }),
    prisma.member.findMany({ orderBy: { order: "asc" }, take: 6 }),
    prisma.conference.findMany(),
    prisma.news.findMany({ orderBy: { date: "desc" }, take: 3 }),
    prisma.publication.count(),
    prisma.member.count(),
  ]);

  const upcoming = conferences
    .map((c) => ({ conf: c, ...nextDate(c) }))
    .filter((x) => x.date && x.date.getTime() > Date.now())
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());
  const soonest = upcoming[0];

  const heroLines = ls(settings, "heroTitle", locale).split("\n");
  const marqueeItems = [
    "VBS 2025 — 1st place",
    "HCM AI Challenge — 3× 1st",
    "CVPR",
    "ACM Multimedia",
    "WACV",
    "NeurIPS",
    "ICCV",
    "AAAI",
    "Multimedia Systems",
  ];

  const bento = [
    { cls: "cat-purple", n: "01", title: "Computer Vision", desc: "Visual recognition, representation learning and detection.", span: "md:col-span-2 md:row-span-2" },
    { cls: "cat-blue", n: "02", title: "Interactive Video Retrieval", desc: "Real-time multimodal search over large archives.", span: "" },
    { cls: "cat-pink", n: "03", title: "Multimodal Learning", desc: "Vision–language fusion.", span: "" },
    { cls: "cat-orange", n: "04", title: "Scene Text & OCR", desc: "Reading text in images and broadcast video.", span: "md:col-span-2" },
    { cls: "cat-green", n: "05", title: "Multimedia Indexing", desc: "Scalable content-based retrieval.", span: "" },
  ];

  return (
    <>
      {/* ============ HERO (dark, animated aurora) ============ */}
      <section className="hero-dark">
        <span className="aurora aurora-a" aria-hidden />
        <span className="aurora aurora-b" aria-hidden />
        <span className="aurora aurora-c" aria-hidden />

        <div className="container-core grid gap-12 py-24 md:grid-cols-[1.1fr_0.9fr] md:py-32">
          <div className="rise">
            <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              {settings.heroKicker}
            </div>
            <h1 className="font-display text-5xl leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">
              {heroLines.map((l, i) => (
                <span key={i} className="block">
                  {i === heroLines.length - 1 ? <span className="text-gradient">{l}</span> : l}
                </span>
              ))}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
              {ls(settings, "heroSubtitle", locale)}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/publications"
                className="inline-flex items-center rounded-sm bg-white px-5 py-3 text-base font-medium text-ink transition hover:bg-white/90"
              >
                {t.heroCtaResearch}
              </Link>
              <Link
                href="/people"
                className="inline-flex items-center rounded-sm border border-white/25 px-5 py-3 text-base font-medium text-white transition hover:border-white/60"
              >
                {t.heroCtaTeam}
              </Link>
            </div>
          </div>

          {/* Next deadline — white card floating on dark */}
          <div className="rise self-center">
            {soonest ? (
              <div className="rounded-xl border border-hairline bg-canvas p-6 shadow-layered sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="eyebrow">{t.nextUp}</span>
                  <span className="badge badge-orange">
                    {soonest.kind === "deadline" ? t.badgeDeadline : t.badgeConference}
                  </span>
                </div>
                <div className="mt-2 font-display text-3xl text-ink">
                  {soonest.conf.name} <span className="text-stone">{soonest.conf.location}</span>
                </div>
                <p className="mt-1 text-sm text-steel">
                  {soonest.kind === "deadline" ? t.submissionCloses : t.starts}{" "}
                  {fmtDate(soonest.date)}
                </p>
                <div className="mt-6">
                  <Countdown iso={soonest.date!.toISOString()} kind={soonest.kind} locale={locale} />
                </div>
                <Link
                  href="/conferences"
                  className="mt-6 inline-block text-sm font-medium text-link hover:underline"
                >
                  {t.allConfDeadlines}
                </Link>
              </div>
            ) : (
              <div className="rounded-xl border border-hairline bg-canvas p-8 text-ink">
                <p className="font-display text-2xl">{t.noUpcoming}</p>
                <Link href="/conferences" className="mt-3 inline-block text-link">
                  {t.manageConferences}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============ VENUE MARQUEE ============ */}
      <Marquee items={marqueeItems} />

      {/* ============ STATS (count-up) ============ */}
      <section className="container-core py-16">
        <Reveal className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { v: 1, suffix: "st", label: "Video Browser Showdown 2025" },
            { v: 3, suffix: "×", label: "AIC first places (2022–24)" },
            { v: memberCount, suffix: "", label: t.statResearchers },
            { v: pubCount, suffix: "", label: t.navPublications },
          ].map((s, i) => (
            <div key={i}>
              <div className="font-display text-5xl text-ink">
                <CountUp value={s.v} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-sm text-steel">{s.label}</div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============ ABOUT + FEATURED PUBLICATION ============ */}
      <section className="container-core py-16 md:py-20">
        <Reveal className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="eyebrow mb-3">{t.aboutEyebrow}</div>
            <h2 className="font-display text-4xl leading-tight text-ink">{t.aboutHeading}</h2>
            <p className="mt-5 leading-relaxed text-slate">{ls(settings, "about", locale)}</p>
          </div>

          <div>
            <div className="eyebrow mb-3">{t.featuredWork}</div>
            <div className="space-y-4">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href={p.slug ? `/publications/${p.slug}` : "/publications"}
                  className="card-feature glow block"
                >
                  <div className="flex items-center gap-2">
                    {p.featured && <span className="badge badge-orange">{t.featured}</span>}
                    {p.venue && (
                      <span className="badge badge-cream">
                        {p.venue}
                        {p.year ? ` ${p.year}` : ""}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-xl font-medium text-ink">{p.title}</h3>
                  <p className="mt-1 text-sm text-steel">{p.authors}</p>
                </Link>
              ))}
              {featured.length === 0 && <p className="text-sm text-steel">{t.noPubs}</p>}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ RESEARCH AREAS — bento chromatic grid ============ */}
      <section className="container-core pb-16 md:pb-20">
        <Reveal>
          <div className="eyebrow mb-3">{t.areasEyebrow}</div>
          <h2 className="font-display text-4xl text-ink">{t.areasHeading}</h2>
          <div className="mt-10 grid auto-rows-[180px] grid-cols-1 gap-4 md:grid-cols-4">
            {bento.map((c) => (
              <div key={c.n} className={`category-card glow ${c.cls} ${c.span}`}>
                <div className="text-sm font-semibold opacity-80">{c.n}</div>
                <div>
                  <div className="font-display text-2xl" style={{ color: "inherit" }}>
                    {c.title}
                  </div>
                  <p className="mt-2 text-sm opacity-90">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ UPCOMING CONFERENCES PREVIEW ============ */}
      <section className="bg-surface-cream">
        <div className="container-core py-16 md:py-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <div className="eyebrow mb-3">{t.deadlinesEyebrow}</div>
                <h2 className="font-display text-4xl text-ink">{t.upcomingConferences}</h2>
              </div>
              <Link href="/conferences" className="btn btn-dark hidden sm:inline-flex">
                {t.viewAll}
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {upcoming.slice(0, 4).map(({ conf, date, kind }) => (
                <Link
                  key={conf.id}
                  href="/conferences"
                  className="card glow block bg-canvas"
                >
                  <div
                    className="mb-3 h-1 w-10 rounded-full"
                    style={{ background: conf.color || "#7a3dff" }}
                  />
                  <div className="font-display text-2xl text-ink">{conf.name}</div>
                  <p className="text-sm text-steel">{conf.location}</p>
                  <p className="mt-4 text-xs uppercase tracking-wide text-stone">
                    {kind === "deadline" ? t.badgeDeadline : t.starts}
                  </p>
                  <p className="text-sm font-medium text-ink">{fmtDate(date)}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PEOPLE PREVIEW ============ */}
      <section className="container-core py-16 md:py-20">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <div className="eyebrow mb-3">{t.teamEyebrow}</div>
              <h2 className="font-display text-4xl text-ink">{t.peopleHeading}</h2>
            </div>
            <Link href="/people" className="text-sm font-medium text-link hover:underline">
              {t.allMembers}
            </Link>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => {
              const links = parseLinks(m.links);
              return (
                <div key={m.id} className="card glow">
                  <div className="flex items-center gap-4">
                    <div
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-xl text-on-primary"
                      style={{
                        background: m.photo
                          ? `center/cover url(${asset(m.photo)})`
                          : "linear-gradient(135deg, var(--color-accent-purple), var(--color-accent-blue))",
                      }}
                    >
                      {!m.photo && m.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-ink">
                        {m.title ? `${m.title} ` : ""}
                        {m.name}
                      </div>
                      <div className="text-sm text-steel">{m.role}</div>
                    </div>
                  </div>
                  {(links.scholar || links.homepage) && (
                    <div className="mt-3 flex gap-3 text-sm">
                      {links.scholar && (
                        <a href={links.scholar} className="text-link hover:underline" target="_blank" rel="noopener noreferrer">
                          {t.linkScholar}
                        </a>
                      )}
                      {links.homepage && (
                        <a href={links.homepage} className="text-link hover:underline" target="_blank" rel="noopener noreferrer">
                          {t.linkHomepage}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </section>

      {/* ============ NEWS + CTA ============ */}
      <section className="bg-surface">
        <div className="container-core py-16 md:py-20">
          <Reveal className="grid gap-12 md:grid-cols-[1fr_1fr]">
            <div>
              <div className="eyebrow mb-3">{t.newsEyebrow}</div>
              <h2 className="font-display text-4xl text-ink">{t.latest}</h2>
              <ul className="mt-8 space-y-6">
                {news.map((n) => (
                  <li key={n.id} className="border-b border-hairline-soft pb-6">
                    <div className="text-xs uppercase tracking-wide text-stone">{fmtDate(n.date)}</div>
                    <div className="mt-1 text-lg font-medium text-ink">{n.title}</div>
                    {n.body && <p className="mt-1 text-sm text-slate">{n.body}</p>}
                  </li>
                ))}
                {news.length === 0 && <p className="text-sm text-steel">{t.noNews}</p>}
              </ul>
            </div>

            <div className="self-center">
              <div className="card-cream">
                <h3 className="font-display text-3xl leading-tight text-ink">{t.ctaHeading}</h3>
                <p className="mt-3 text-slate">{t.ctaBody}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn btn-dark">
                    {t.getInTouch}
                  </Link>
                  <a href={`mailto:${settings.email}`} className="btn btn-on-cream">
                    {settings.email}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
