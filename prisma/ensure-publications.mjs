// Idempotent: create each publication only if it is not already in the DB
// (matched by slug when present, otherwise by exact title). Never deletes or
// overwrites existing rows — safe to run on every deploy to migrate NEW papers
// without touching production edits (unlike seed.mjs, which wipes + recreates).
import { PrismaClient } from "@prisma/client";
import { publications } from "./data/publications.mjs";

const prisma = new PrismaClient();

async function main() {
  let created = 0;
  let skipped = 0;
  for (const p of publications) {
    const existing = p.slug
      ? await prisma.publication.findUnique({ where: { slug: p.slug } })
      : await prisma.publication.findFirst({ where: { title: p.title } });
    if (existing) {
      skipped++;
      console.log(`= exists: ${p.slug || p.title}`);
      continue;
    }
    await prisma.publication.create({ data: p });
    created++;
    console.log(`+ created: ${p.slug || p.title}`);
  }
  console.log(`ensure-publications: created ${created}, skipped ${skipped} (already present).`);
}

main()
  .catch((e) => {
    console.error("ensure-publications failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
