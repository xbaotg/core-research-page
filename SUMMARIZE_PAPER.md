---
name: summarize-paper
description: Turn a paper PDF into a private-safe publication highlight page (overview, results, figures) on the CORE Lab site — extract text + figures from the PDF, author a concise summary, and add a Publication record. The raw PDF is never hosted or linked. Use when someone drops a paper in /publications and wants a /publications/<slug> page.
---

# Skill: Summarize a paper → highlight page

Repeatable procedure used to build the page for *“Towards Scalable and
Context-Aware Multimodal Interactive Video Retrieval.”* Apply it to any paper.

**Golden rule — privacy:** the raw manuscript PDF is **never** committed,
hosted, or linked. It lives in `/publications` (gitignored). Only extracted
**figures** + your **written summary** go on the site.

---

## What you produce

A `Publication` row that renders at `/publications/<slug>` with:
abstract · overview · figures (with captions) · results · highlights, and a
“full paper kept private — contact the team” note. No download link.

## Prerequisites (already in this repo)

- `pdfjs-dist` + `sharp` (text + figure extraction / image encoding).
- `scripts/extract-pdf.mjs` (the extractor).
- `Publication` model fields: `title, authors, venue, venueDetail, year, slug,
  abstract, overview, results, highlights, figures, featured, order`
  (+ `pdfUrl/codeUrl/projectUrl` — leave `pdfUrl` blank to stay private).
- Detail page: `app/(site)/publications/[slug]/page.tsx`.

---

## Steps

### 1. Place the PDF (private)
Put the file in `/publications/`. Confirm it is gitignored
(`git check-ignore publications/<file>.pdf` prints the path). Never move it into
`public/`.

### 2. Extract text + figures
Edit the `PDF` constant at the top of `scripts/extract-pdf.mjs` to point at the
file, then run:

```bash
node scripts/extract-pdf.mjs
```

Outputs:
- `/tmp/paper.txt` — full text, one block per page (`===== PAGE n =====`).
- `/tmp/figs/p<page>_<idx>_<w>x<h>.png` — every embedded raster image, filtered
  to `min(w,h) ≥ 180` and `area ≥ 90k` (skips icons), printed sorted by area.

Tuning: lower the size threshold if a wanted figure is missing; raise it if you
get logo/UI clutter. The script handles RGB(3ch)/RGBA(4ch)/grayscale(1ch); it
skips `ImageBitmap`-only objects (no canvas in Node).

### 3. Read the text, pull the facts
From `/tmp/paper.txt` (read the first 1–2 pages + Results/Conclusion):
- **title, authors, affiliations, venue/status** (e.g. “Multimedia Systems
  (Springer) · Journal article”), **year**.
- **abstract** (condense to ~4–6 sentences, plain).
- **contributions** (usually numbered in the intro) → becomes *overview*.
- **results / benchmarks / wins / datasets + sizes** → becomes *results*.
- **figure captions** (grep `Fig`, `Table`) to label images correctly.

### 4. Choose + compress figures
Open the largest candidates with the image viewer and keep **3–6** that tell the
story:
- the **system/architecture** diagram (hero figure),
- **headline results** (a chart/leaderboard where the method wins),
- a **qualitative** example (UI / outputs),
- optionally an ablation or a second results chart.
Skip dense text pages, tiny crops, and anything that needs the paper to read.

Compress the chosen ones into `public/figures/<slug>/` (resize down — source
figures are often huge):

```bash
mkdir -p public/figures/<slug>
node --input-type=module -e '
import sharp from "sharp";
const map = [
  ["/tmp/figs/pX_0_WxH.png", "public/figures/<slug>/fig1-architecture.png", 1600],
  // ...add the chosen figures with sensible widths (1400–1600)
];
for (const [src,out,w] of map)
  await sharp(src).resize({width:w, withoutEnlargement:true}).png({quality:82, compressionLevel:9}).toFile(out);
'
```

Name files `fig1-...png`, `fig2-...png`, … in reading order.

### 5. Write the summary (concise, factual)
- **overview** — 1–2 short paragraphs: the architecture/approach + the
  numbered contributions. Use `\n\n` to separate paragraphs.
- **results** — 1 paragraph: placements/wins, datasets (with sizes), benchmark
  counts. Quote concrete numbers from the paper.
- **highlights** — 4–6 bullet points, **one per line** (newline-separated).
  Lead with the strongest wins (e.g. `🥇 1st place — VBS 2025`).
- **figure captions** — one factual sentence each; don’t copy the paper’s
  caption verbatim, describe what the reader sees + why it matters.

### 6. Create the Publication record
**Option A — Admin (preferred for one-off):** `/admin → Publications → Add`.
- `slug`: leave blank to auto-generate from the title.
- `figures` field: one per line — `/figures/<slug>/fig1-architecture.png | Caption text`.
- `highlights` field: one bullet per line.
- leave `pdfUrl` blank.

**Option B — Seed (for reproducible/committed content):** add the object to
`prisma/seed.mjs` `publications[]` (mirror the IVR entry: `figures` is a
`JSON.stringify([{src, caption}, …])` string), then `npm run db:reset`
(wipes + reseeds) or write a one-off `prisma` upsert script to avoid wiping.

### 7. Verify + privacy check
```bash
npm run build            # type-check
# visit /<basePath>/publications/<slug>
git status               # confirm the PDF is NOT staged
git check-ignore publications/<file>.pdf   # must print the path
```
Confirm the page shows figures + summary and **no** link to the PDF.

---

## Field reference

| Field | Source | Notes |
|---|---|---|
| `title` | PDF title | — |
| `authors` | PDF byline | comma-separated |
| `venue` | short, e.g. `Multimedia Systems` | shown as a badge |
| `venueDetail` | longer status line | e.g. `… (Springer) · Journal article` |
| `year` | publication year | integer |
| `slug` | from title | URL: `/publications/<slug>`; blank = auto |
| `abstract` | condensed abstract | plain text |
| `overview` | contributions + approach | `\n\n` = new paragraph |
| `results` | findings/wins/datasets | quote numbers |
| `highlights` | key bullets | one per line |
| `figures` | chosen images | `[{src, caption}]` (JSON) or `src | caption` lines in admin |
| `featured` | boolean | feature the flagship paper |
| `pdfUrl` | **leave blank** | setting it would expose the file |

## Pitfalls
- Don’t host the PDF — keep `pdfUrl` empty and the file out of `public/`.
- Re-running `extract-pdf.mjs` overwrites `/tmp/figs`; copy keepers out first.
- Vector figures (pure SVG/paths) aren’t raster XObjects and won’t extract —
  screenshot the rendered page region or recreate if essential.
- Keep captions/summaries factual; never invent results not in the paper.
