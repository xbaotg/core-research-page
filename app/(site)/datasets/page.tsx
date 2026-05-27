import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n";
import { asset } from "@/lib/basePath";

export const dynamic = "force-dynamic";
export const metadata = { title: "Datasets" };

function parseJSON<T>(raw: string, fb: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fb;
  }
}

export default async function DatasetsPage() {
  const [{ t }, datasets] = await Promise.all([
    getI18n(),
    prisma.dataset.findMany({ orderBy: [{ featured: "desc" }, { order: "asc" }] }),
  ]);

  return (
    <>
      <section className="sunset-mesh relative">
        <div className="container-core py-16 text-on-dark md:py-20">
          <div className="eyebrow mb-3 text-white/80">{t.datasetsEyebrow}</div>
          <h1 className="font-display text-5xl text-white sm:text-6xl">{t.datasetsTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/90">{t.datasetsSubtitle}</p>
        </div>
      </section>

      <div className="container-core py-16 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {datasets.map((d) => {
            const samples = parseJSON<{ src: string }[]>(d.samples, []);
            const stats = parseJSON<{ label: string; value: string }[]>(d.stats, []);
            const cover = samples[0]?.src;
            return (
              <Link
                key={d.id}
                href={d.slug ? `/datasets/${d.slug}` : "/datasets"}
                className="reveal-scroll group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_40px_rgba(0,0,0,0.12)]"
              >
                {cover && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-ink/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(cover)}
                      alt={d.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="ds-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 opacity-0 transition-opacity group-hover:opacity-100" />
                    {d.modality && (
                      <span className="badge badge-dark absolute left-3 top-3">{d.modality}</span>
                    )}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2">
                    {d.featured && <span className="badge badge-orange">★ {t.featured}</span>}
                    {d.year && <span className="font-mono text-sm text-stone">{d.year}</span>}
                  </div>
                  <h2 className="mt-2 font-display text-2xl text-ink">{d.name}</h2>
                  {d.tagline && <p className="mt-1 text-sm text-steel">{d.tagline}</p>}
                  {stats.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      {stats.slice(0, 4).map((s) => (
                        <div key={s.label}>
                          <div className="font-display text-lg text-ink">{s.value}</div>
                          <div className="text-xs uppercase tracking-wide text-stone">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <span className="mt-5 text-sm font-medium text-link group-hover:underline">
                    {t.dsView} →
                  </span>
                </div>
              </Link>
            );
          })}
          {datasets.length === 0 && <p className="text-steel">{t.dsEmpty}</p>}
        </div>
      </div>
    </>
  );
}
