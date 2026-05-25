import { prisma } from "./prisma";

type Body = Record<string, unknown>;

const str = (v: unknown) => (v == null ? "" : String(v));
const strOrNull = (v: unknown) => {
  const s = v == null ? "" : String(v).trim();
  return s === "" ? null : s;
};
const intOrNull = (v: unknown) => {
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : null;
};
const intDefault = (v: unknown, d = 0) => {
  const n = intOrNull(v);
  return n == null ? d : n;
};
const bool = (v: unknown) => v === true || v === "true" || v === "on" || v === 1;
const dateOrNull = (v: unknown) => {
  if (!v) return null;
  const d = new Date(String(v));
  return isNaN(d.getTime()) ? null : d;
};
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

export type ResourceKey = "members" | "publications" | "conferences" | "news";

type ResourceConfig = {
  // prisma delegate (typed loosely on purpose for the generic handler)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delegate: any;
  orderBy: object;
  parse: (b: Body) => Body;
};

export const RESOURCES: Record<ResourceKey, ResourceConfig> = {
  members: {
    delegate: prisma.member,
    orderBy: { order: "asc" },
    parse: (b) => ({
      name: str(b.name),
      title: strOrNull(b.title),
      role: strOrNull(b.role),
      affiliation: strOrNull(b.affiliation),
      bio: strOrNull(b.bio),
      email: strOrNull(b.email),
      photo: strOrNull(b.photo),
      links: typeof b.links === "string" ? b.links : JSON.stringify(b.links ?? {}),
      category: str(b.category) || "member",
      order: intDefault(b.order),
    }),
  },
  publications: {
    delegate: prisma.publication,
    orderBy: [{ year: "desc" }, { order: "asc" }],
    parse: (b) => {
      const title = str(b.title);
      const slug = strOrNull(b.slug) || slugify(title) || null;
      // figures: accept a JSON string already built by the client; fall back to []
      let figures = "[]";
      if (typeof b.figures === "string" && b.figures.trim()) figures = b.figures;
      else if (Array.isArray(b.figures)) figures = JSON.stringify(b.figures);
      return {
        title,
        authors: str(b.authors),
        venue: strOrNull(b.venue),
        venueDetail: strOrNull(b.venueDetail),
        year: intOrNull(b.year),
        slug,
        abstract: strOrNull(b.abstract),
        overview: strOrNull(b.overview),
        results: strOrNull(b.results),
        highlights: strOrNull(b.highlights),
        figures,
        pdfUrl: strOrNull(b.pdfUrl),
        codeUrl: strOrNull(b.codeUrl),
        projectUrl: strOrNull(b.projectUrl),
        image: strOrNull(b.image),
        featured: bool(b.featured),
        order: intDefault(b.order),
      };
    },
  },
  conferences: {
    delegate: prisma.conference,
    orderBy: { order: "asc" },
    parse: (b) => ({
      name: str(b.name),
      fullName: strOrNull(b.fullName),
      location: strOrNull(b.location),
      deadline: dateOrNull(b.deadline),
      startDate: dateOrNull(b.startDate),
      endDate: dateOrNull(b.endDate),
      url: strOrNull(b.url),
      tags: strOrNull(b.tags),
      color: strOrNull(b.color),
      order: intDefault(b.order),
    }),
  },
  news: {
    delegate: prisma.news,
    orderBy: { date: "desc" },
    parse: (b) => ({
      title: str(b.title),
      date: dateOrNull(b.date) ?? new Date(),
      body: strOrNull(b.body),
      link: strOrNull(b.link),
    }),
  },
};

export function isResource(key: string): key is ResourceKey {
  return key in RESOURCES;
}
