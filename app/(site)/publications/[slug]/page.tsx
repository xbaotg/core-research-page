import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { asset } from "@/lib/basePath";
import { getI18n } from "@/lib/i18n";

export const dynamic = "force-dynamic";

type Figure = { src: string; caption?: string };

function paragraphs(text: string | null | undefined) {
  if (!text) return [];
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
function bullets(text: string | null | undefined) {
  if (!text) return [];
  return text.split("\n").map((b) => b.trim()).filter(Boolean);
}
function parseFigures(raw: string): Figure[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((f) => f && f.src) : [];
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = await prisma.publication.findUnique({ where: { slug } });
  return { title: pub?.title ?? "Publication" };
}

export default async function PublicationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ t }, pub] = await Promise.all([
    getI18n(),
    prisma.publication.findUnique({ where: { slug } }),
  ]);
  if (!pub) notFound();

  const figures = parseFigures(pub.figures);
  const overview = paragraphs(pub.overview);
  const results = paragraphs(pub.results);
  const points = bullets(pub.highlights);

  return (
    <>
      {/* Hero */}
      <section className="hero-sunset">
        <div className="container-core py-16 md:py-20">
          <Link
            href="/publications"
            className="text-sm font-medium text-ink/70 hover:text-ink"
          >
            {t.allPublications}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {pub.featured && <span className="badge badge-orange">{t.featured}</span>}
            {pub.venueDetail ? (
              <span className="badge badge-dark">{pub.venueDetail}</span>
            ) : (
              pub.venue && (
                <span className="badge badge-dark">
                  {pub.venue}
                  {pub.year ? ` ${pub.year}` : ""}
                </span>
              )
            )}
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-ink sm:text-5xl">
            {pub.title}
          </h1>
          <p className="mt-4 text-lg text-ink-tint">{pub.authors}</p>
        </div>
      </section>

      <article className="container-core grid gap-12 py-16 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-12">
          {/* Abstract */}
          {pub.abstract && (
            <section>
              <div className="eyebrow mb-3">{t.abstract}</div>
              <p className="text-lg leading-relaxed text-slate">{pub.abstract}</p>
            </section>
          )}

          {/* Overview */}
          {overview.length > 0 && (
            <section>
              <div className="eyebrow mb-3">{t.overview}</div>
              <div className="space-y-4">
                {overview.map((p, i) => (
                  <p key={i} className="leading-relaxed text-slate">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Figures */}
          {figures.length > 0 && (
            <section>
              <div className="eyebrow mb-5">{t.figures}</div>
              <div className="space-y-8">
                {figures.map((f, i) => (
                  <figure key={i} className="overflow-hidden rounded-lg border border-hairline-soft bg-canvas">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(f.src)}
                      alt={f.caption || `Figure ${i + 1}`}
                      className="w-full"
                      loading="lazy"
                    />
                    {f.caption && (
                      <figcaption className="border-t border-hairline-soft bg-surface px-4 py-3 text-sm text-steel">
                        <span className="font-semibold text-ink">
                          {t.fig} {i + 1}.
                        </span>{" "}
                        {f.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Results */}
          {results.length > 0 && (
            <section>
              <div className="eyebrow mb-3">{t.results}</div>
              <div className="space-y-4">
                {results.map((p, i) => (
                  <p key={i} className="leading-relaxed text-slate">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {points.length > 0 && (
            <div className="card-cream">
              <div className="eyebrow mb-3">{t.highlights}</div>
              <ul className="space-y-2.5">
                {points.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm leading-snug text-ink">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="card">
            <div className="eyebrow mb-2">{t.fullPaper}</div>
            <p className="text-sm leading-relaxed text-steel">
              {t.fullPaperBodyPre}
              <Link href="/contact" className="text-link hover:underline">
                {t.contactTheTeam}
              </Link>
              .
            </p>
          </div>
        </aside>
      </article>
    </>
  );
}
