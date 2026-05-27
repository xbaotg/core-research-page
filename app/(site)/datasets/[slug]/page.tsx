import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getI18n } from "@/lib/i18n";
import DatasetGallery from "@/components/DatasetGallery";

export const dynamic = "force-dynamic";

function parseJSON<T>(raw: string, fb: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fb;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = await prisma.dataset.findUnique({ where: { slug } });
  return { title: d?.name ?? "Dataset" };
}

export default async function DatasetDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [{ t }, d] = await Promise.all([
    getI18n(),
    prisma.dataset.findUnique({ where: { slug } }),
  ]);
  if (!d) notFound();

  const stats = parseJSON<{ label: string; value: string }[]>(d.stats, []);
  const samples = parseJSON<{ src: string; caption?: string; texts?: string[] }[]>(
    d.samples,
    [],
  );

  return (
    <>
      {/* Hero (dark) */}
      <section className="sunset-mesh relative">
        <div className="container-core py-16 text-on-dark md:py-20">
          <Link href="/datasets" className="text-sm text-white/70 hover:text-white">
            ← {t.datasetsTitle}
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {d.modality && <span className="badge badge-cream">{d.modality}</span>}
            {d.task && <span className="badge badge-cream">{d.task}</span>}
            {d.year && <span className="badge badge-cream">{d.year}</span>}
          </div>
          <h1 className="mt-4 font-display text-5xl text-white sm:text-6xl">{d.name}</h1>
          {d.tagline && <p className="mt-3 max-w-2xl text-lg text-white/90">{d.tagline}</p>}

          {stats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl text-white">{s.value}</div>
                  <div className="text-xs uppercase tracking-wide text-white/70">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {d.driveUrl && (
              <a href={d.driveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {t.dsExplore}
              </a>
            )}
            {d.paperUrl && (
              <a href={d.paperUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-cream">
                {t.dsPaper}
              </a>
            )}
            {d.codeUrl && (
              <a href={d.codeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-on-cream">
                {t.dsCode}
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="container-core grid gap-12 py-16 md:py-20 lg:grid-cols-[1fr_300px]">
        <div className="min-w-0 space-y-12">
          {samples.length > 0 && (
            <section>
              <div className="eyebrow mb-5">{t.dsSamples}</div>
              <DatasetGallery
                samples={samples}
                labels={{ detected: t.dsDetected, show: t.dsShow, hide: t.dsHide, region: t.dsRegion }}
              />
            </section>
          )}

          {d.description && (
            <section>
              <div className="eyebrow mb-3">{t.dsAbout}</div>
              <p className="text-lg leading-relaxed text-slate">{d.description}</p>
            </section>
          )}
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          {d.license && (
            <div className="card-cream">
              <div className="eyebrow mb-2">{t.dsLicense}</div>
              <p className="text-sm leading-relaxed text-steel">{d.license}</p>
            </div>
          )}
          <div className="card">
            <div className="flex flex-col gap-2.5 text-sm">
              {d.driveUrl && (
                <a href={d.driveUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-link hover:underline">
                  {t.dsExplore}
                </a>
              )}
              {d.paperUrl && (
                <a href={d.paperUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-link hover:underline">
                  {t.dsPaper}
                </a>
              )}
              {d.codeUrl && (
                <a href={d.codeUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-link hover:underline">
                  {t.dsCode}
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
