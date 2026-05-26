import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

// Usage: node scripts/extract-pdf.mjs [pdfPath] [outDir] [txtPath]
// Args override the defaults so multiple PDFs can be processed into separate dirs.
const PDF =
  process.argv[2] ||
  "publications/_Journal___Multimedia_Systems___Review__Towards_Scalable_and_Context_Aware_Multimodal_Interactive_Video_Retrieval__Non_Highlighted_ (3).pdf";
const OUT = process.argv[3] || "/tmp/figs";
const TXT = process.argv[4] || "/tmp/paper.txt";
fs.mkdirSync(OUT, { recursive: true });

const data = new Uint8Array(fs.readFileSync(PDF));
const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
console.log("PAGES", doc.numPages);

function getObj(page, id) {
  // Some XObjects never resolve their callback (object not materialized);
  // race against a timeout so a missing image can't hang the top-level await.
  return new Promise((resolve) => {
    let done = false;
    const finish = (v) => {
      if (done) return;
      done = true;
      clearTimeout(t);
      resolve(v);
    };
    const t = setTimeout(() => finish(null), 4000);
    try {
      page.objs.get(id, finish);
    } catch {
      finish(null);
    }
  });
}

let textAll = "";
const inventory = [];

for (let p = 1; p <= doc.numPages; p++) {
  const page = await doc.getPage(p);

  // text
  const tc = await page.getTextContent();
  const pageText = tc.items.map((i) => i.str).join(" ");
  textAll += `\n\n===== PAGE ${p} =====\n` + pageText;

  // images
  const ops = await page.getOperatorList();
  const ids = new Set();
  for (let i = 0; i < ops.fnArray.length; i++) {
    const fn = ops.fnArray[i];
    if (
      fn === pdfjs.OPS.paintImageXObject ||
      fn === pdfjs.OPS.paintJpegXObject ||
      fn === pdfjs.OPS.paintImageXObjectRepeat
    ) {
      const arg = ops.argsArray[i][0];
      if (typeof arg === "string") ids.add(arg);
    }
  }

  let idx = 0;
  for (const id of ids) {
   try {
    const img = await getObj(page, id);
    if (!img || !img.width || !img.height) continue;
    const { width: w, height: h } = img;
    if (Math.min(w, h) < 180 || w * h < 90000) continue; // skip small/icons

    let buf = img.data;
    if (!buf && img.bitmap) {
      // ImageBitmap path — skip (no canvas in node)
      continue;
    }
    if (!buf) continue;

    const len = buf.length;
    let channels = 0;
    if (len === w * h * 4) channels = 4;
    else if (len === w * h * 3) channels = 3;
    else if (len === w * h) channels = 1;
    else continue;

    const file = path.join(OUT, `p${p}_${idx}_${w}x${h}.png`);
    try {
      await sharp(Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength), {
        raw: { width: w, height: h, channels },
      })
        .png()
        .toFile(file);
      inventory.push({ page: p, file, w, h, area: w * h });
      idx++;
    } catch (e) {
      console.log("encode fail", id, e.message);
    }
   } catch (e) {
    console.log("skip image on page", p, e.message);
   }
  }
}

fs.writeFileSync(TXT, textAll);
console.log("TEXT chars", textAll.length, "->", TXT);
inventory.sort((a, b) => b.area - a.area);
console.log("\nTOP IMAGES (by area):");
for (const im of inventory.slice(0, 25)) {
  console.log(`p${im.page}  ${im.w}x${im.h}  ${im.file}`);
}
console.log("\nTOTAL images saved:", inventory.length);
