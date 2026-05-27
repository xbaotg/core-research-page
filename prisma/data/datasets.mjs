// Published datasets — shared by prisma/seed.mjs (full reseed) and
// prisma/ensure-datasets.mjs (idempotent create-if-missing on deploy).
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
    driveUrl: "https://drive.google.com/drive/folders/1FXlwo0IHZ2IxxMcuYsyT-32ianL7xjyK?usp=sharing",
    paperUrl: "https://doi.org/10.1109/ACCESS.2024.3395374",
    codeUrl: "https://github.com/aiclub-uit/SignboardText",
    featured: true,
    order: 0,
  },
];
