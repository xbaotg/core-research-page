import { PrismaClient } from "@prisma/client";
import { datasets } from "./data/datasets.mjs";
import { publications } from "./data/publications.mjs";

const prisma = new PrismaClient();

const settings = {
  labName: "CORE",
  labFullName: "CORE Lab",
  heroKicker: "CORE Lab · UIT, VNU-HCM",
  heroTitle: "Computer Vision\n& Retrieval.",
  heroSubtitle:
    "A research group at the University of Information Technology, VNU-HCM. We build models that see, read, and retrieve — from multimodal interactive video retrieval to large-scale visual search.",
  about:
    "CORE Lab is a computer-vision and information-retrieval research group founded in 2025 at the University of Information Technology, VNU-HCM. Our work spans multimodal interactive video retrieval, vision-language representation learning, scene-text understanding and content-based retrieval at scale. We compete and publish at top venues — first place at the Video Browser Showdown (VBS) 2025 and three consecutive wins at the Ho Chi Minh AI Challenge.",
  affiliation: "University of Information Technology, VNU-HCM",
  focus: "Computer Vision & Retrieval",
  since: "2025",
  email: "thanhnd@uit.edu.vn",
  location: "Ho Chi Minh City, Vietnam",
  address: "University of Information Technology, Han Thuyen St., Thu Duc, Ho Chi Minh City",
  linkScholar: "",
  linkGithub: "",
  linkX: "",
  footerNote: "CORE Lab — Computer Vision & Retrieval. University of Information Technology, VNU-HCM.",
  // Vietnamese variants (used when the site language is set to Tiếng Việt)
  heroTitle_vi: "Thị giác máy tính\n& Truy vấn Thông tin.",
  heroSubtitle_vi:
    "Nhóm nghiên cứu tại Trường Đại học Công nghệ Thông tin, ĐHQG-HCM. Chúng tôi xây dựng các mô hình biết nhìn, đọc và truy xuất — từ truy hồi video tương tác đa phương thức đến tìm kiếm thị giác quy mô lớn.",
  about_vi:
    "CORE Lab là nhóm nghiên cứu về thị giác máy tính và truy hồi thông tin, thành lập năm 2025 tại Trường Đại học Công nghệ Thông tin, ĐHQG-HCM. Chúng tôi nghiên cứu truy hồi video tương tác đa phương thức, học biểu diễn thị giác–ngôn ngữ, hiểu văn bản trong ảnh và truy xuất theo nội dung ở quy mô lớn. Nhóm đạt giải Nhất tại Video Browser Showdown (VBS) 2025 và ba lần liên tiếp vô địch Ho Chi Minh AI Challenge.",
  footerNote_vi: "CORE Lab — Thị giác máy tính & Truy vấn Thông tin. Trường Đại học Công nghệ Thông tin, ĐHQG-HCM.",
  focus_vi: "Thị giác máy tính & Truy vấn Thông tin",
  affiliation_vi: "Trường Đại học Công nghệ Thông tin, ĐHQG-HCM",
  location_vi: "Thành phố Hồ Chí Minh, Việt Nam",
};

const UIT = "University of Information Technology, VNU-HCM";
const members = [
  {
    name: "Thanh Duc Ngo",
    title: "Dr.",
    role: "Principal Investigator · Computer Vision & Multimedia",
    affiliation: UIT,
    bio: "Faculty at UIT, VNU-HCM and principal investigator of CORE Lab, researching computer vision, multimedia analysis and large-scale information retrieval.",
    email: "thanhnd@uit.edu.vn",
    photo: "/thanh-duc-ngo.png",
    links: JSON.stringify({ scholar: "", homepage: "", github: "" }),
    category: "faculty",
    order: 0,
  },
  {
    name: "Tien Do",
    title: "MSc.",
    role: "Co-advisor · Computer Vision & Retrieval",
    affiliation: UIT,
    bio: "Researcher and co-advisor at UIT, VNU-HCM, focusing on visual recognition, multimodal representation learning and content-based video retrieval.",
    email: "tiendv@uit.edu.vn",
    photo: "/tien-do.png",
    links: JSON.stringify({ scholar: "", homepage: "", github: "" }),
    category: "faculty",
    order: 1,
  },
  {
    name: "Thua Nguyen",
    title: "MSc.",
    role: "Research Member · Computer Vision & Retrieval",
    affiliation: UIT,
    bio: "Master's researcher at CORE Lab working on multimodal retrieval and vision-language models for scalable, accurate video and image search.",
    email: "",
    photo: "/thua-nguyen-ngoc.png",
    links: JSON.stringify({ scholar: "", homepage: "", github: "" }),
    category: "member",
    order: 2,
  },
  {
    name: "Bao Tran",
    title: "",
    role: "Research Member · Multimodal Video Retrieval",
    affiliation: UIT,
    bio: "Research member at CORE Lab and lead author on scalable, context-aware interactive video retrieval; builds real-time multimodal search systems at million-scale.",
    email: "",
    photo: "/bao-tran.png",
    links: JSON.stringify({ scholar: "", homepage: "", github: "" }),
    category: "member",
    order: 3,
  },
  {
    name: "Khiem Le",
    title: "",
    role: "Research Member · Computer Vision & Retrieval",
    affiliation: UIT,
    bio: "Research member at CORE Lab working on multimodal fusion and interactive video retrieval within award-winning international competition systems.",
    email: "",
    photo: "/khiem-le.png",
    links: JSON.stringify({ scholar: "", homepage: "", github: "" }),
    category: "member",
    order: 4,
  },
  {
    name: "Thuyen Tran",
    title: "",
    role: "Research Member · Computer Vision & Retrieval",
    affiliation: UIT,
    bio: "Research member at CORE Lab studying computer vision and retrieval, with interests in vision-language models and large-scale multimedia indexing.",
    email: "",
    photo: "/thuyen-tran.png",
    links: JSON.stringify({ scholar: "", homepage: "", github: "" }),
    category: "member",
    order: 5,
  },
  {
    name: "Duy-Dinh Le",
    title: "Dr.",
    // NOTE: placeholder role (ranked above the PI). Adjust to taste —
    // e.g. "Director", "Head of Lab", "Founding Director", "Scientific Director".
    role: "Lab Director · Computer Vision & Multimedia Retrieval",
    affiliation: UIT,
    bio: "Dr. Duy-Dinh Le is a senior researcher at the University of Information Technology, VNU-HCM, working in computer vision, pattern recognition and multimedia retrieval. Through a long-standing collaboration with Prof. Shin'ichi Satoh at the National Institute of Informatics (NII), Japan, he co-developed the NII-UIT multimodal video search systems that compete at TRECVID and the Video Browser Showdown. At CORE Lab he oversees research in large-scale video search and multimodal understanding.",
    email: "duyld@uit.edu.vn",
    photo: "",
    links: JSON.stringify({
      scholar: "https://scholar.google.com/citations?user=6lbtgt4AAAAJ",
      homepage: "",
      github: "",
      linkedin: "https://www.linkedin.com/in/ledduy/",
    }),
    category: "faculty",
    order: -1,
  },
  {
    name: "Shin'ichi Satoh",
    title: "Prof.",
    role: "Collaborating Professor · NII, Japan",
    affiliation: "National Institute of Informatics (NII), Japan",
    bio: "Professor at the National Institute of Informatics (NII), Tokyo; long-term collaborator with CORE Lab on large-scale video retrieval and multimedia analysis.",
    email: "satoh@nii.ac.jp",
    photo: "/shinichi-satoh.jpg",
    links: JSON.stringify({
      scholar: "https://scholar.google.com/citations?user=7aEF5cQAAAAJ",
      homepage: "",
      github: "",
    }),
    category: "collaborator",
    order: 0,
  },
];

const D = (s) => new Date(s + "T23:59:00Z");

const conferences = [
  {
    name: "CVPR",
    fullName: "IEEE/CVF Conference on Computer Vision and Pattern Recognition",
    location: "Nashville, USA",
    deadline: D("2026-11-13"),
    startDate: D("2027-06-12"),
    endDate: D("2027-06-16"),
    url: "https://cvpr.thecvf.com/",
    tags: "Vision, Pattern Recognition",
    color: "#fa520f",
    order: 0,
  },
  {
    name: "WACV",
    fullName: "IEEE/CVF Winter Conference on Applications of Computer Vision",
    location: "Tucson, USA",
    deadline: D("2026-07-08"),
    startDate: D("2027-01-05"),
    endDate: D("2027-01-09"),
    url: "https://wacv.thecvf.com/",
    tags: "Vision, Applications",
    color: "#ff8105",
    order: 1,
  },
  {
    name: "ACM MM",
    fullName: "ACM International Conference on Multimedia",
    location: "Dublin, Ireland",
    deadline: D("2026-04-10"),
    startDate: D("2026-10-27"),
    endDate: D("2026-10-31"),
    url: "https://www.acmmm.org/",
    tags: "Multimedia, Retrieval",
    color: "#ffa110",
    order: 2,
  },
  {
    name: "NeurIPS",
    fullName: "Conference on Neural Information Processing Systems",
    location: "Vancouver, Canada",
    deadline: D("2026-05-15"),
    startDate: D("2026-12-08"),
    endDate: D("2026-12-14"),
    url: "https://neurips.cc/",
    tags: "Machine Learning",
    color: "#cc3a05",
    order: 3,
  },
  {
    name: "ICCV",
    fullName: "IEEE/CVF International Conference on Computer Vision",
    location: "Hong Kong",
    deadline: D("2027-03-08"),
    startDate: D("2027-10-19"),
    endDate: D("2027-10-25"),
    url: "https://iccv.thecvf.com/",
    tags: "Vision",
    color: "#ffb83e",
    order: 4,
  },
  {
    name: "AAAI",
    fullName: "AAAI Conference on Artificial Intelligence",
    location: "Singapore",
    deadline: D("2026-08-15"),
    startDate: D("2027-02-09"),
    endDate: D("2027-02-16"),
    url: "https://aaai.org/conference/aaai/",
    tags: "AI",
    color: "#ff8a00",
    order: 5,
  },
  {
    name: "MAPR",
    fullName: "International Conference on Multimedia Analysis and Pattern Recognition",
    location: "Hue, Vietnam",
    deadline: D("2026-05-15"),
    startDate: D("2026-08-13"),
    endDate: D("2026-08-14"),
    url: "https://mapr.uit.edu.vn/",
    tags: "Multimedia, Pattern Recognition",
    color: "#00b85c",
    order: 6,
  },
  {
    name: "MMM",
    fullName: "International Conference on Multimedia Modeling",
    location: "Siem Reap, Cambodia",
    deadline: D("2026-08-16"),
    startDate: D("2027-01-05"),
    endDate: D("2027-01-08"),
    url: "https://mmm2027.net/",
    tags: "Multimedia, Retrieval",
    color: "#3b89ff",
    order: 7,
  },
  {
    name: "RIVF",
    fullName: "International Conference on Computing and Communication Technologies",
    location: "Hanoi, Vietnam",
    deadline: D("2026-07-15"),
    startDate: D("2026-12-18"),
    endDate: D("2026-12-20"),
    url: "https://rivf2026.org/",
    tags: "Computing, AI",
    color: "#7a3dff",
    order: 8,
  },
  {
    name: "KSE",
    fullName: "International Conference on Knowledge and Systems Engineering",
    location: "Kanazawa, Japan",
    deadline: D("2026-07-15"),
    startDate: D("2026-11-11"),
    endDate: D("2026-11-14"),
    url: "https://kse2026.kse-conferences.org/",
    tags: "Knowledge, Systems",
    color: "#ed52cb",
    order: 9,
  },
];

const awards = [
  {
    title: "Video Browser Showdown",
    event: "MMM 2025 · Japan · Interactive Video Retrieval",
    prize: "Best Overall & Best Experts",
    rank: 1,
    scope: "international",
    year: 2025,
    description:
      "First Prize at the premier global competition in interactive video retrieval, hosted at MMM 2025 in Japan. Our system managed 9 TB of video data with under one-second query performance, outperforming teams from top institutions worldwide.",
    image: "/prizes/vbs-2025.png",
    featured: true,
    order: 0,
  },
  {
    title: "Science & Technology Award for University Students",
    event: "Ministry of Education and Training, Vietnam",
    prize: "First Prize",
    rank: 1,
    scope: "national",
    year: 2025,
    description:
      "Prestigious national award recognizing outstanding scientific research contributions by university students across all disciplines in Vietnam.",
    image: "/prizes/science-technology-2025.png",
    featured: false,
    order: 1,
  },
  {
    title: "TRECVID Ad-hoc Video Search",
    event: "NIST · Ad-hoc Video Search benchmark",
    prize: "First Prize",
    rank: 1,
    scope: "international",
    year: 2024,
    description:
      "Top performance at NIST's benchmark for interpreting complex textual queries against large-scale video datasets, using advanced vision-language models and multimodal retrieval.",
    image: "/prizes/trecvid-2024.png",
    featured: false,
    order: 0,
  },
  {
    title: "AI City Challenge",
    event: "NVIDIA & CVPR 2024",
    prize: "First Prize (Track 4) · Top 4",
    rank: 1,
    scope: "international",
    year: 2024,
    description:
      "Resounding win on Road Object Detection in Fish-Eye Cameras (Track 4); 4th place on Track 5 — a challenging real-world task with severe lens distortion, outperformed by only a few major companies globally.",
    image: "/prizes/ai-city-2024.png",
    featured: false,
    order: 1,
  },
  {
    title: "Ho Chi Minh AI Challenge",
    event: "Video Retrieval & Multimodal Understanding",
    prize: "First Prize",
    rank: 1,
    scope: "national",
    year: 2024,
    description:
      "Vietnam's flagship AI competition, building innovative AI solutions for the country's unique challenges in video retrieval and multimodal understanding.",
    image: "/prizes/hcm-ai-2024.png",
    featured: false,
    order: 2,
  },
  {
    title: "Key Information Localization & Extraction (KILE)",
    event: "ICDAR 2023 · CLEF",
    prize: "Third Prize",
    rank: 3,
    scope: "international",
    year: 2023,
    description:
      "Top 3 globally in designing systems for extracting key information from complex document layouts at ICDAR 2023's Key Information Extraction challenge (CLEF 2023).",
    image: "/prizes/icdar-2023.png",
    featured: false,
    order: 0,
  },
  {
    title: "Ho Chi Minh AI Challenge",
    event: "Video Retrieval",
    prize: "First Prize",
    rank: 1,
    scope: "national",
    year: 2023,
    description:
      "Won first place in Vietnam's flagship AI competition, demonstrating excellence in video retrieval systems for real-world AI challenges.",
    image: "/prizes/hcm-ai-2023.png",
    featured: false,
    order: 1,
  },

  // ---- Additional awards (CS-UIT AI Club record) ----
  {
    title: "Ho Chi Minh AI Challenge",
    event: "Department of Science & Technology, HCMC",
    prize: "First / Second / Third Prize",
    rank: 1,
    year: 2025,
    description:
      "Fourth consecutive championship at the city's largest AI arena, sweeping the top placements.",
    image: "/prizes/hcm-ai-2025.jpg",
    featured: false,
    order: 2,
  },
  {
    title: "TRECVID Video Question Answering",
    event: "NIST (USA)",
    prize: "First Prize (VQA)",
    rank: 1,
    year: 2025,
    description:
      "Top global ranking on the Video Question Answering task at NIST's prestigious benchmark.",
    image: "",
    featured: false,
    order: 3,
  },
  {
    title: "Vietnam Student AI Olympiad (1st edition)",
    event: "Vietnam Informatics Association",
    prize: "First & Third Prize (national round)",
    rank: 1,
    year: 2025,
    description:
      "Leading results at the first national in-depth AI olympiad for students.",
    image: "/prizes/olpai-2025.jpg",
    featured: false,
    order: 4,
  },
  {
    title: "Ho Chi Minh City AI Olympiad",
    event: "Ho Chi Minh City People's Committee",
    prize: "Second Prize",
    rank: 2,
    year: 2025,
    description: "Strong showing at the city's flagship AI competition.",
    image: "/prizes/oai-hcmc-2025.jpg",
    featured: false,
    order: 5,
  },
  {
    title: "Vietnam Electronic Design Award",
    event: "VEEA",
    prize: "Third Prize",
    rank: 3,
    year: 2025,
    description: "Applying AI to electronic-component design and optimization.",
    image: "/prizes/electronic-design-2025.jpg",
    featured: false,
    order: 6,
  },
  {
    title: "Explainable AI for Educational Question-Answering",
    event: "EAI Challenge",
    prize: "Third Prize",
    rank: 3,
    year: 2025,
    description: "International award for explainable AI models in education.",
    image: "",
    featured: false,
    order: 7,
  },
  {
    title: "Viettel AI Race",
    event: "Viettel Group",
    prize: "Consolation Prize",
    rank: 0,
    year: 2025,
    description: "Solving large-scale, real-world AI problems under competition conditions.",
    image: "/prizes/viettel-2025.jpg",
    featured: false,
    order: 8,
  },
  {
    title: "Science & Technology Award",
    event: "Ministry of Education & Training",
    prize: "Second Prize",
    rank: 2,
    year: 2024,
    description: "Outstanding ministry-level scientific research achievement.",
    image: "/prizes/scitech-2024.jpg",
    featured: false,
    order: 3,
  },
  {
    title: "BKAI – SoICT Hackathon",
    event: "HUST & BKAI",
    prize: "Second Prize",
    rank: 2,
    year: 2024,
    description: "Excellent performance at an in-depth AI hackathon.",
    image: "/prizes/bkai-2024.jpg",
    featured: false,
    order: 4,
  },

  // ---- 2026 (CS-UIT AI Club, via aiclub.uit.edu.vn/api/data) ----
  {
    title: "Top-View Person Re-Identification — ICPR 2026",
    event: "International Conference on Pattern Recognition 2026",
    prize: "First Prize",
    rank: 1,
    year: 2026,
    description:
      "First place at the ICPR 2026 competition on re-identifying people across top-view (overhead) camera networks.",
    image: "/prizes/top-view-reid-2026.jpg",
    featured: false,
    order: 0,
  },
  {
    title: "ICDAR 2026 — CircleID Pen Classification",
    event: "ICDAR 2026",
    prize: "First Prize",
    rank: 1,
    year: 2026,
    description:
      "First place at the ICDAR 2026 CircleID challenge on pen-based handwriting / instrument classification.",
    image: "/prizes/circleid-pen-2026.jpg",
    featured: false,
    order: 1,
  },
  {
    title: "Low-Resolution License Plate Recognition — ICPR 2026",
    event: "ICPR 2026",
    prize: "Top 5",
    rank: 0,
    year: 2026,
    description:
      "Top-5 finish at the ICPR 2026 competition on recognizing license plates in low-resolution imagery.",
    image: "/prizes/license-plate-2026.jpg",
    featured: false,
    order: 2,
  },
];

// datasets[] is imported from ./data/datasets.mjs (shared with ensure-datasets.mjs)

const news = [
  {
    title: "CORE Lab website goes live",
    date: new Date("2025-09-01T00:00:00Z"),
    body: "We launched the CORE Lab website to share our research on computer vision and retrieval.",
    link: "",
  },
  {
    title: "First place at the Video Browser Showdown (VBS) 2025",
    date: new Date("2025-02-01T00:00:00Z"),
    body: "Our multimodal interactive video retrieval framework placed first at VBS 2025, ahead of all established systems.",
    link: "",
  },
  {
    title: "Three consecutive wins at the Ho Chi Minh AI Challenge",
    date: new Date("2024-12-01T00:00:00Z"),
    body: "CORE Lab secured three straight first-place finishes at the Ho Chi Minh AI Challenge (2022–2024) on multilingual broadcast video.",
    link: "",
  },
];

async function main() {
  await prisma.member.deleteMany();
  await prisma.publication.deleteMany();
  await prisma.conference.deleteMany();
  await prisma.award.deleteMany();
  await prisma.dataset.deleteMany();
  await prisma.news.deleteMany();
  await prisma.setting.deleteMany();

  await prisma.member.createMany({ data: members });
  await prisma.publication.createMany({ data: publications });
  await prisma.conference.createMany({ data: conferences });
  await prisma.award.createMany({ data: awards });
  await prisma.dataset.createMany({ data: datasets });
  await prisma.news.createMany({ data: news });
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.create({ data: { key, value } });
  }
  console.log("Seeded:", {
    members: members.length,
    publications: publications.length,
    conferences: conferences.length,
    awards: awards.length,
    datasets: datasets.length,
    news: news.length,
    settings: Object.keys(settings).length,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
