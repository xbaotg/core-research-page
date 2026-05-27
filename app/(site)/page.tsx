import type { CSSProperties } from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings, nextDate, parseLinks } from "@/lib/data";
import { getI18n, ls } from "@/lib/i18n";
import { fmtDate } from "@/lib/format";
import { asset } from "@/lib/basePath";
import { MiniCountdown } from "@/components/Countdown";
import HeroVisual from "@/components/HeroVisual";

export default async function HomePage() {
  const [{ locale, t }, settings, featured, members, conferences, news] = await Promise.all([
    getI18n(),
    getSettings(),
    prisma.publication.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }], take: 3 }),
    prisma.member.findMany({ orderBy: { order: "asc" }, take: 6 }),
    prisma.conference.findMany(),
    prisma.news.findMany({ orderBy: { date: "desc" }, take: 3 }),
  ]);

  const upcoming = conferences
    .map((c) => ({ conf: c, ...nextDate(c) }))
    .filter((x) => x.date && x.date.getTime() > Date.now())
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());
  const soonest = upcoming[0];

  const heroLines = ls(settings, "heroTitle", locale).split("\n");

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero-sunset relative overflow-hidden">
        <div className="hero-aurora" aria-hidden />
        <div className="container-core relative z-10 grid gap-10 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <div>
            <div
              className="reveal mb-5 inline-flex items-center gap-2 rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold text-ink"
              style={{ "--d": "0.05s" } as CSSProperties}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary-deep" />
              {settings.heroKicker}
            </div>
            <h1 className="font-display text-5xl leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {heroLines.map((l, i) => (
                <span
                  key={i}
                  className="reveal block"
                  style={{ "--d": `${0.15 + i * 0.09}s` } as CSSProperties}
                >
                  {l}
                </span>
              ))}
            </h1>
            <p
              className="reveal mt-6 max-w-xl text-lg leading-relaxed text-ink-tint"
              style={{ "--d": "0.42s" } as CSSProperties}
            >
              {ls(settings, "heroSubtitle", locale)}
            </p>
            <div
              className="reveal mt-8 flex flex-wrap gap-3"
              style={{ "--d": "0.52s" } as CSSProperties}
            >
              <Link href="/publications" className="btn btn-dark">
                {t.heroCtaResearch}
              </Link>
              <Link href="/people" className="btn btn-secondary">
                {t.heroCtaTeam}
              </Link>
            </div>

            {soonest && (
              <Link
                href="/conferences"
                className="reveal group mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-hairline bg-canvas/60 px-4 py-2.5 backdrop-blur transition-colors hover:border-hairline-strong"
                style={{ "--d": "0.62s" } as CSSProperties}
              >
                <span className="badge badge-orange">
                  {soonest.kind === "deadline" ? t.badgeDeadline : t.badgeConference}
                </span>
                <span className="text-sm font-medium text-ink">
                  {soonest.conf.name}
                  <span className="text-stone"> · {fmtDate(soonest.date)}</span>
                </span>
                <MiniCountdown iso={soonest.date!.toISOString()} locale={locale} />
              </Link>
            )}
          </div>

          {/* Computer-vision hero visual */}
          <div className="reveal self-center" style={{ "--d": "0.3s" } as CSSProperties}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* ============ FOCUS STRIP ============ */}
      <section className="border-b border-hairline-soft bg-surface">
        <div className="reveal-scroll container-core grid gap-6 py-10 sm:grid-cols-2">
          {[
            { k: t.sFocus, v: ls(settings, "focus", locale) },
            { k: t.sAffiliation, v: ls(settings, "affiliation", locale) },
          ].map((x) => (
            <div key={x.k}>
              <div className="eyebrow mb-1">{x.k}</div>
              <div className="text-base font-medium text-ink">{x.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ABOUT + FEATURED PUBLICATION ============ */}
      <section className="container-core py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal-scroll">
            <div className="eyebrow mb-3">{t.aboutEyebrow}</div>
            <h2 className="font-display text-4xl leading-tight text-ink">{t.aboutHeading}</h2>
            <p className="mt-5 leading-relaxed text-slate">{ls(settings, "about", locale)}</p>
          </div>

          <div className="reveal-scroll" style={{ "--rd": "0.12s" } as CSSProperties}>
            <div className="eyebrow mb-3">{t.featuredWork}</div>
            <div className="space-y-4">
              {featured.map((p) => (
                <Link
                  key={p.id}
                  href={p.slug ? `/publications/${p.slug}` : "/publications"}
                  className="card-feature block transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
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
        </div>
      </section>

      {/* ============ RESEARCH AREAS (chromatic category cards) ============ */}
      <section className="container-core pb-20 md:pb-24">
        <div className="eyebrow mb-3">{t.areasEyebrow}</div>
        <h2 className="font-display text-4xl text-ink">{t.areasHeading}</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { cls: "cat-purple", n: "01", title: "Computer Vision", desc: "Visual recognition, representation learning and detection." },
            { cls: "cat-blue", n: "02", title: "Interactive Video Retrieval", desc: "Real-time, multimodal search over large video archives." },
            { cls: "cat-pink", n: "03", title: "Multimodal Learning", desc: "Vision–language fusion across text, speech and objects." },
            { cls: "cat-orange", n: "04", title: "Scene Text & OCR", desc: "Reading text in images and broadcast video." },
            { cls: "cat-green", n: "05", title: "Multimedia Indexing", desc: "Scalable indexing and content-based retrieval." },
          ].map((c, i) => (
            <div
              key={c.n}
              className={`reveal-scroll category-card ${c.cls}`}
              style={{ "--rd": `${i * 0.08}s` } as CSSProperties}
            >
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
      </section>

      {/* ============ UPCOMING CONFERENCES PREVIEW ============ */}
      <section className="bg-surface-cream">
        <div className="container-core py-20 md:py-24">
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
            {upcoming.slice(0, 4).map(({ conf, date, kind }, i) => (
              <Link
                key={conf.id}
                href="/conferences"
                className="reveal-scroll card block bg-canvas transition-shadow hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
                style={{ "--rd": `${i * 0.07}s` } as CSSProperties}
              >
                <div
                  className="mb-3 h-1 w-10 rounded-full"
                  style={{ background: conf.color || "#fa520f" }}
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
        </div>
      </section>

      {/* ============ PEOPLE PREVIEW ============ */}
      <section className="container-core py-20 md:py-24">
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
          {members.map((m, i) => {
            const links = parseLinks(m.links);
            return (
              <div
                key={m.id}
                className="reveal-scroll card"
                style={{ "--rd": `${i * 0.07}s` } as CSSProperties}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full font-display text-xl text-on-primary"
                    style={{
                      background: m.photo
                        ? `center/cover url(${asset(m.photo)})`
                        : "linear-gradient(135deg, var(--color-sunshine-700), var(--color-primary))",
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
      </section>

      {/* ============ NEWS + CTA ============ */}
      <section className="bg-surface">
        <div className="container-core py-20 md:py-24">
          <div className="grid gap-12 md:grid-cols-[1fr_1fr]">
            <div className="reveal-scroll">
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

            <div className="reveal-scroll self-center" style={{ "--rd": "0.12s" } as CSSProperties}>
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
          </div>
        </div>
      </section>
    </>
  );
}
