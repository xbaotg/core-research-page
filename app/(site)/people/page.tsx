import { prisma } from "@/lib/prisma";
import { parseLinks } from "@/lib/data";
import { asset } from "@/lib/basePath";
import { getI18n } from "@/lib/i18n";

export const dynamic = "force-dynamic";
export const metadata = { title: "People" };

function LinkRow({
  raw,
  labels,
}: {
  raw: string;
  labels: { scholar: string; homepage: string; github: string; linkedin: string };
}) {
  const links = parseLinks(raw);
  const items = [
    [labels.scholar, links.scholar],
    [labels.homepage, links.homepage],
    [labels.github, links.github],
    [labels.linkedin, links.linkedin],
  ].filter(([, v]) => v) as [string, string][];
  if (items.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-3 text-sm">
      {items.map(([label, href]) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-link hover:underline">
          {label}
        </a>
      ))}
    </div>
  );
}

export default async function PeoplePage() {
  const [{ t }, members] = await Promise.all([
    getI18n(),
    prisma.member.findMany({ orderBy: { order: "asc" } }),
  ]);

  const GROUPS = [
    { key: "faculty", label: t.grpFaculty },
    { key: "collaborator", label: t.grpCollaborator },
    { key: "member", label: t.grpMember },
    { key: "student", label: t.grpStudent },
    { key: "alumni", label: t.grpAlumni },
  ];
  const linkLabels = {
    scholar: t.linkScholar,
    homepage: t.linkHomepage,
    github: t.linkGithub,
    linkedin: t.linkLinkedin,
  };

  return (
    <>
      <section className="hero-sunset">
        <div className="container-core py-16 md:py-20">
          <div className="eyebrow mb-3 text-ink/70">{t.navPeople}</div>
          <h1 className="font-display text-5xl text-ink sm:text-6xl">{t.teamEyebrow}</h1>
          <p className="mt-4 max-w-xl text-lg text-ink-tint">{t.peopleSubtitle}</p>
        </div>
      </section>

      <div className="container-core space-y-16 py-20">
        {GROUPS.map((g) => {
          const list = members.filter((m) => m.category === g.key);
          if (list.length === 0) return null;
          return (
            <section key={g.key}>
              <div className="eyebrow mb-6">{g.label}</div>
              {g.key === "faculty" || g.key === "collaborator" ? (
                /* Highlighted faculty / advisors / collaborators — larger feature cards */
                <div className="grid gap-6 md:grid-cols-2">
                  {list.map((m) => (
                    <div
                      key={m.id}
                      className="card-feature flex flex-col gap-5 sm:flex-row sm:items-start"
                    >
                      <div
                        className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl font-display text-3xl text-on-primary"
                        style={{
                          background: m.photo
                            ? `center/cover url(${asset(m.photo)})`
                            : "linear-gradient(135deg, var(--color-accent-blue), var(--color-primary))",
                        }}
                      >
                        {!m.photo && m.name.charAt(0)}
                      </div>
                      <div className="min-w-0 flex-1">
                        {m.role && (
                          <span className="badge badge-cream">{m.role.split("·")[0].trim()}</span>
                        )}
                        <div className="mt-2 font-display text-2xl leading-tight text-ink">
                          {m.title ? `${m.title} ` : ""}
                          {m.name}
                        </div>
                        {m.role && <div className="text-sm text-steel">{m.role}</div>}
                        {m.affiliation && <p className="mt-3 text-sm text-slate">{m.affiliation}</p>}
                        {m.bio && <p className="mt-2 text-sm leading-relaxed text-steel">{m.bio}</p>}
                        {m.email && (
                          <a href={`mailto:${m.email}`} className="mt-3 block text-sm text-link hover:underline">
                            {m.email}
                          </a>
                        )}
                        <LinkRow raw={m.links} labels={linkLabels} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {list.map((m) => (
                    <div key={m.id} className="card-feature">
                      <div className="flex items-center gap-4">
                        <div
                          className="grid h-16 w-16 shrink-0 place-items-center rounded-full font-display text-2xl text-on-primary"
                          style={{
                            background: m.photo
                              ? `center/cover url(${asset(m.photo)})`
                              : "linear-gradient(135deg, var(--color-accent-blue), var(--color-primary))",
                          }}
                        >
                          {!m.photo && m.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-lg font-medium text-ink">
                            {m.title ? `${m.title} ` : ""}
                            {m.name}
                          </div>
                          {m.role && <div className="text-sm text-steel">{m.role}</div>}
                        </div>
                      </div>
                      {m.affiliation && <p className="mt-4 text-sm text-slate">{m.affiliation}</p>}
                      {m.bio && <p className="mt-2 text-sm leading-relaxed text-steel">{m.bio}</p>}
                      {m.email && (
                        <a href={`mailto:${m.email}`} className="mt-3 block text-sm text-link hover:underline">
                          {m.email}
                        </a>
                      )}
                      <LinkRow raw={m.links} labels={linkLabels} />
                    </div>
                  ))}
                </div>
              )}
            </section>
          );
        })}
        {members.length === 0 && <p className="text-steel">{t.peopleEmpty}</p>}
      </div>
    </>
  );
}
