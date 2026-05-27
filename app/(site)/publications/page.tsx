import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n";
import PublicationsBrowser from "@/components/PublicationsBrowser";

export const dynamic = "force-dynamic";
export const metadata = { title: "Publications" };

export default async function PublicationsPage() {
  const [{ t }, pubs] = await Promise.all([
    getI18n(),
    prisma.publication.findMany({
      orderBy: [{ year: "desc" }, { order: "asc" }],
      select: {
        id: true,
        title: true,
        authors: true,
        venue: true,
        year: true,
        slug: true,
        abstract: true,
        codeUrl: true,
        projectUrl: true,
        featured: true,
      },
    }),
  ]);

  return (
    <>
      <section className="hero-sunset">
        <div className="container-core py-16 md:py-20">
          <div className="eyebrow mb-3 text-ink/70">{t.pubsEyebrow}</div>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">{t.navPublications}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-tint">{t.pubsSubtitle}</p>
        </div>
      </section>

      <div className="container-core py-12 md:py-16">
        {pubs.length === 0 ? (
          <p className="text-steel">{t.pubsEmpty}</p>
        ) : (
          <PublicationsBrowser
            pubs={pubs}
            labels={{
              search: t.pubSearch,
              allAuthors: t.pubAllAuthors,
              allVenues: t.pubAllVenues,
              clear: t.pubClear,
              noMatch: t.pubNoMatch,
              count: t.pubCount,
              prev: t.pubPrev,
              next: t.pubNext,
              view: t.viewHighlights,
              code: t.code,
              project: t.projectPage,
              featured: t.featured,
            }}
          />
        )}
      </div>
    </>
  );
}
