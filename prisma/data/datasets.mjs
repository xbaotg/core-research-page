// Published datasets — shared by prisma/seed.mjs (full reseed) and
// prisma/ensure-datasets.mjs (idempotent create-if-missing on deploy).

// ATTW challenge-grid samples: artistic-text word crops grouped by the 5
// challenge categories (see chapter4_dataset_examples_v4.pptx / ICDAR'25 Fig.1).
const ATTW_CAT = {
  geo: "Biến thiên hình học mạnh",
  noise: "Nhiễu nền",
  font: "Đa dạng về font chữ",
  bold: "Hiệu ứng Bolden / 3D",
  neon: "Hiệu ứng Neon / Reflection",
};
const attwSample = (cat, n, text) => ({
  src: `/datasets/attw/challenges/${cat}${n}.png`,
  caption: text,
  texts: text ? [text] : [],
  category: ATTW_CAT[cat],
});

export const datasets = [
  {
    name: "SignboardText",
    slug: "signboardtext",
    tagline: "Scene-text detection & recognition on in-the-wild signboards",
    description:
      "SignboardText is a benchmark for reading text on real-world signboards — storefronts, billboards and shop signs with diverse fonts, sizes, artistic styles, languages and cluttered backgrounds. It provides both word-level and line-level annotations and extends established scene-text benchmarks (ICDAR-2015, Total-Text, VinText) toward the harder, real-world signboard setting. The samples below are a small preview; the full dataset is available on request.",
    modality: "Image + Text",
    task: "Scene-text detection & recognition",
    year: 2024,
    license:
      "Research & educational use only — citation required; full data available on request (see the GitHub repo).",
    stats: JSON.stringify([
      { label: "Images", value: "2,104" },
      { label: "Text instances", value: "79,849" },
      { label: "Annotation", value: "Word + line" },
      { label: "Languages", value: "Multilingual" },
    ]),
    samples: JSON.stringify([
      {
        src: "/datasets/signboardtext/1.jpg",
        caption: "International English school — multi-line Vietnamese signage on a large façade.",
        texts: ["TRƯỜNG ANH NGỮ", "QUỐC TẾ", "ÂU MỸ", "IWEP", "TOEFL", "IELTS", "TOEIC", "ANH VĂN GIAO TIẾP"],
      },
      {
        src: "/datasets/signboardtext/2.jpg",
        caption: "Roberts Hardware — curved, partly-occluded English lettering.",
        texts: ["ROBERTS", "HARDWARE", "PLUMBING", "TOOLS", "ELECTRIC", "Benjamin Moore", "Do it Best", "Serving the Haight Ashbury Since 1931"],
      },
      {
        src: "/datasets/signboardtext/3.jpg",
        caption: "American Japanese Language Center — low-light, dense mixed-language layout.",
        texts: ["AMERICAN JAPANESE LANGUAGE CENTER", "ĐC: 26 Gò Dầu, P. Tân Sơn", "ĐT: (08) 6676 9580", "BẢNG CẢNH GRE"],
      },
      {
        src: "/datasets/signboardtext/4.jpg",
        caption: "Gusto Cafe — logo mark with stylized lettering.",
        texts: ["GUSTO CAFE", "PC 0003249-H"],
      },
      {
        src: "/datasets/signboardtext/5.jpg",
        caption: "Fashion Polaris — artistic font on a monochrome panel.",
        texts: ["Fashion", "Polaris", "Sỉ - Lẻ Thời Trang Thiết Kế / Xuất Khẩu", "ĐC: 57 Nguyễn Hồng Đào, Q. Tân Bình", "ĐT: 0978 990 876"],
      },
      {
        src: "/datasets/signboardtext/6.jpg",
        caption: "Restoran Tajuddin Hussain — curved Malay text, indoor lighting.",
        texts: ["RESTORAN TAJUDDIN HUSSAIN", "ISTIMEWA TIAP-TIAP HARI", "NASI TOMATO DAN ROS AYAM", "KELUAR"],
      },
    ]),
    driveUrl: "",
    paperUrl: "https://doi.org/10.1109/ACCESS.2024.3395374",
    codeUrl: "https://github.com/aiclub-uit/SignboardText",
    featured: true,
    order: 0,
  },
  {
    name: "ATTW",
    slug: "attw",
    tagline: "Artistic Text in the Wild — recognition of stylized scene text",
    description:
      "Artistic Text in the Wild (ATTW) is a benchmark for recognising decorative, stylized and hand-crafted lettering — logos, storefront branding and word-art — where text departs from regular fonts through warping, ornamentation, custom glyphs and heavy background blending. It comprises 16,627 artistic word instances curated from seven established scene-text datasets (WordArt, TotalText, VinText, SignboardText, BKAI-Text, ICDAR-2013, CUTE80) and captures real-world interferences — uneven lighting, clutter, noise, overlapping characters and out-of-vocabulary brand names — grouped along five recurring challenge axes: strong geometric deformation, cluttered background, diverse font styles, bolden/3D effects and neon/reflection effects. ATTW was first introduced at ICDAR 2025 (https://doi.org/10.1007/978-3-032-04630-7_17) and extended in IJDAR 2025 (https://doi.org/10.1007/s10032-025-00565-3). The samples below are a small preview; the full dataset is available on request.",
    modality: "Image + Text",
    task: "Scene-text recognition (artistic)",
    year: 2025,
    license:
      "Research & educational use only — citation required; full data available on request.",
    stats: JSON.stringify([
      { label: "Artistic instances", value: "16,627" },
      { label: "Source datasets", value: "7" },
      { label: "Challenge types", value: "5" },
      { label: "Annotation", value: "Word-level" },
    ]),
    samples: JSON.stringify([
      // Biến thiên hình học mạnh — geometric deformation
      attwSample("geo", 1, "MANCHESTER"),
      attwSample("geo", 2, "JIMMYZ"),
      attwSample("geo", 3, "COFFEE"),
      attwSample("geo", 4, "COSENTINO'S"),
      attwSample("geo", 5, "Slumberland"),
      attwSample("geo", 6, "Far West Fungi"),
      attwSample("geo", 7, "Abbondanza Cafe"),
      attwSample("geo", 8, "A GENTLEMAN'S GUIDE"),
      // Nhiễu nền — cluttered background
      attwSample("noise", 1, "Thúy"),
      attwSample("noise", 2, "Payom"),
      attwSample("noise", 3, "SHINE"),
      attwSample("noise", 4, "Ratchada"),
      attwSample("noise", 5, "Sag Harbor Baking"),
      attwSample("noise", 6, "UNIVERSITARIE"),
      attwSample("noise", 7, "PHONG"),
      attwSample("noise", 8, "Cúc"),
      // Đa dạng về font chữ — diverse font styles
      attwSample("font", 1, "Khải"),
      attwSample("font", 2, "KHÁNH"),
      attwSample("font", 3, "London"),
      attwSample("font", 4, "COOPER'S"),
      attwSample("font", 5, "WINES"),
      attwSample("font", 6, "McCafé"),
      attwSample("font", 7, "Cánh Linh"),
      attwSample("font", 8, "Matto"),
      // Hiệu ứng Bolden / 3D
      attwSample("bold", 1, "STORE"),
      attwSample("bold", 2, "BOUTIQUE"),
      attwSample("bold", 3, "MOTEL"),
      attwSample("bold", 4, "CANIFA"),
      // Hiệu ứng Neon / Reflection
      attwSample("neon", 1, "Phone"),
      attwSample("neon", 2, "Mì"),
      attwSample("neon", 3, "OPEN"),
      attwSample("neon", 4, "Kim"),
      attwSample("neon", 5, "Tóc"),
      attwSample("neon", 6, ""),
      attwSample("neon", 7, "Một"),
      attwSample("neon", 8, "BA"),
    ]),
    driveUrl: "",
    paperUrl: "https://link.springer.com/article/10.1007/s10032-025-00565-3",
    codeUrl: "https://github.com/aiclub-uit/Skeleton-Guided-Artistic-Text-Recognition",
    featured: true,
    order: 1,
  },
];
