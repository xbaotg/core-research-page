// Idempotent: create each published dataset only if its slug is not already
// in the database. Never deletes or overwrites — safe to run on every deploy
// (unlike `seed.mjs`, which wipes + recreates everything).
import { PrismaClient } from "@prisma/client";
import { datasets } from "./data/datasets.mjs";

const prisma = new PrismaClient();

async function main() {
  let created = 0;
  let skipped = 0;
  for (const d of datasets) {
    if (!d.slug) {
      console.warn(`! skip "${d.name}" — no slug`);
      continue;
    }
    const existing = await prisma.dataset.findUnique({ where: { slug: d.slug } });
    if (existing) {
      skipped++;
      console.log(`= exists: ${d.slug}`);
      continue;
    }
    await prisma.dataset.create({ data: d });
    created++;
    console.log(`+ created: ${d.slug}`);
  }
  console.log(`ensure-datasets: created ${created}, skipped ${skipped} (already present).`);
}

main()
  .catch((e) => {
    console.error("ensure-datasets failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
