// Preview-seed DRAFT datasets into the local DB so they render before publishing.
// Upsert by slug — safe to re-run. Does NOT touch published datasets.
import { PrismaClient } from "@prisma/client";
import { draftDatasets } from "./data/datasets.draft.mjs";

const prisma = new PrismaClient();

async function main() {
  for (const d of draftDatasets) {
    if (!d.slug) continue;
    await prisma.dataset.upsert({
      where: { slug: d.slug },
      create: d,
      update: d,
    });
    console.log(`~ upserted draft: ${d.slug}`);
  }
}

main()
  .catch((e) => {
    console.error("seed-draft failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
