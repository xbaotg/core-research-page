import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: "Publications" };

export default async function PublicationsPage() {
  const [{ t }, pubs] = await Promise.all([
    getI18n(),
    prisma.publication.findMany({ orderBy: [{ year: "desc" }, { order: "asc" }] }),
  ]);

  const byYear = new Map<string, typeof pubs>();
  for (const p of pubs) {
    const y = p.year ? String(p.year) : "Other";
    if (!byYear.has(y)) byYear.set(y, []);
    byYear.get(y)!.push(p);
  }
  const years = [...byYear.keys()];

  return (
    <>
      <section className="hero-sunset">
        <div className="container-core py-16 md:py-20">
          <div className="eyebrow mb-3 text-ink/70">{t.pubsEyebrow}</div>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">{t.navPublications}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-tint">{t.pubsSubtitle}</p>
        </div>
      </section>

      <div className="container-core space-y-14 py-20">
        {years.map((y) => (
          <section key={y}>
            <div className="mb-6 flex items-center gap-4">
              <h2 className="font-display text-3xl text-ink">{y}</h2>
              <span className="h-px flex-1 bg-hairline" />
            </div>
            <div className="space-y-4">
              {byYear.get(y)!.map((p) => (
                <article key={p.id} className="card-feature">
                  <div className="flex flex-wrap items-center gap-2">
                    {p.featured && <span className="badge badge-orange">{t.featured}</span>}
                    {p.venue && (
                      <span className="badge badge-cream">
                        {p.venue}
                        {p.year ? ` ${p.year}` : ""}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-2xl font-medium leading-snug text-ink">
                    {p.slug ? (
                      <Link href={`/publications/${p.slug}`} className="hover:text-primary">
                        {p.title}
                      </Link>
                    ) : (
                      p.title
                    )}
                  </h3>
                  <p className="mt-1 text-sm text-steel">{p.authors}</p>
                  {p.abstract && (
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate">{p.abstract}</p>
                  )}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
                    {p.slug && (
                      <Link className="btn btn-dark" href={`/publications/${p.slug}`}>
                        {t.viewHighlights}
                      </Link>
                    )}
                    {p.pdfUrl && (
                      <a className="btn btn-secondary" href={p.pdfUrl} target="_blank" rel="noopener noreferrer">
                        {t.pdf}
                      </a>
                    )}
                    {p.codeUrl && (
                      <a className="btn btn-secondary" href={p.codeUrl} target="_blank" rel="noopener noreferrer">
                        {t.code}
                      </a>
                    )}
                    {p.projectUrl && (
                      <a className="btn btn-secondary" href={p.projectUrl} target="_blank" rel="noopener noreferrer">
                        {t.projectPage}
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        {pubs.length === 0 && <p className="text-steel">{t.pubsEmpty}</p>}
      </div>
    </>
  );
}
