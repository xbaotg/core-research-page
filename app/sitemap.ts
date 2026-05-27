import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pubs, datasets] = await Promise.all([
    prisma.publication.findMany({ where: { slug: { not: null } }, select: { slug: true } }),
    prisma.dataset.findMany({ where: { slug: { not: null } }, select: { slug: true } }),
  ]);

  const now = new Date();
  const staticRoutes = [
    "",
    "/people",
    "/publications",
    "/datasets",
    "/awards",
    "/conferences",
    "/contact",
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: `${SITE_URL}${r}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: r === "" ? 1 : 0.7,
    })),
    ...pubs.map((p) => ({
      url: `${SITE_URL}/publications/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...datasets.map((d) => ({
      url: `${SITE_URL}/datasets/${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
