import { PrismaClient } from "@prisma/client";

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
  heroTitle_vi: "Thị giác máy tính\n& Truy xuất.",
  heroSubtitle_vi:
    "Nhóm nghiên cứu tại Trường Đại học Công nghệ Thông tin, ĐHQG-HCM. Chúng tôi xây dựng các mô hình biết nhìn, đọc và truy xuất — từ truy hồi video tương tác đa phương thức đến tìm kiếm thị giác quy mô lớn.",
  about_vi:
    "CORE Lab là nhóm nghiên cứu về thị giác máy tính và truy hồi thông tin, thành lập năm 2025 tại Trường Đại học Công nghệ Thông tin, ĐHQG-HCM. Chúng tôi nghiên cứu truy hồi video tương tác đa phương thức, học biểu diễn thị giác–ngôn ngữ, hiểu văn bản trong ảnh và truy xuất theo nội dung ở quy mô lớn. Nhóm đạt giải Nhất tại Video Browser Showdown (VBS) 2025 và ba lần liên tiếp vô địch Ho Chi Minh AI Challenge.",
  footerNote_vi: "CORE Lab — Thị giác máy tính & Truy xuất. Trường Đại học Công nghệ Thông tin, ĐHQG-HCM.",
  focus_vi: "Thị giác máy tính & Truy xuất",
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
];

const ivrFigures = [
  {
    src: "/figures/ivr/fig1-architecture.png",
    caption:
      "System architecture. The offline phase segments videos into shots, extracts keyframes and indexes multimodal features — semantic embeddings, scene text, speech transcripts and object detections (Milvus for vector search, Elasticsearch for text). The online phase runs hybrid multimodal search with adaptive score fusion and sequential event retrieval.",
  },
  {
    src: "/figures/ivr/fig2-vbs2025.png",
    caption:
      "Video Browser Showdown (VBS) 2025 — final team scores. Our team (NII-UIT) placed first with 7,566 points, ahead of all established interactive systems.",
  },
  {
    src: "/figures/ivr/fig3-aic.png",
    caption:
      "Ho Chi Minh AI Challenge — top-40 team scores. The framework secured three consecutive first-place finishes (2022–2024) on multilingual broadcast media.",
  },
  {
    src: "/figures/ivr/fig4-system-ui.png",
    caption:
      "The interactive retrieval interface answering a Known-Item Search (KIS) query, ranking candidate keyframes from the large-scale V3C collection in real time.",
  },
  {
    src: "/figures/ivr/fig5-browsing.png",
    caption:
      "Browsing interactions: from any result, users expand to temporally nearby keyframes, visually similar keyframes, or jump straight to video playback.",
  },
];

const publications = [
  {
    title: "Towards Scalable and Context-Aware Multimodal Interactive Video Retrieval",
    authors: "Bao Tran, Khiem Le, Thanh Duc Ngo",
    venue: "Multimedia Systems",
    venueDetail: "Multimedia Systems (Springer) · Journal article",
    year: 2025,
    slug: "scalable-context-aware-multimodal-interactive-video-retrieval",
    abstract:
      "Interactive video retrieval (IVR) is challenging due to its multimodal nature, ambiguous user intent and strict real-time constraints. We introduce a unified, multimodal, context-aware framework for large-scale IVR. A fast, scalable design leverages GPU-accelerated indexing, parallel inference and lightweight fusion for sub-second responsiveness at million-scale; a multimodal architecture integrates vision-language embeddings, scene text, speech transcripts and object-level cues through adaptive score fusion to mitigate modality bias; and a multi-stage sequential retrieval paradigm handles ambiguous or partially ordered queries via coarse-to-fine expansion and context-aware alignment.",
    overview:
      "The framework follows a unified two-phase architecture. Offline, videos are segmented into shots; keyframes are extracted and indexed with multimodal representations — semantic embeddings, scene text, speech transcripts and object detections — using Milvus for vector search and Elasticsearch for text. Online, user queries are encoded with the same models, candidates are retrieved via hybrid multimodal search, then refined through reliability-weighted score fusion, optional object/audio alignment and sequential event retrieval.\n\nThree contributions: (1) a GPU-accelerated, scalable backend that sustains real-time interaction at million-scale; (2) reliability-weighted multimodal fusion across an ensemble of vision-language models (CLIP, BEiT-3, InternVL-G) plus text-in-image and spoken-content retrieval, mitigating modality bias under noisy evidence; (3) a two-stage context-aware sequential event retrieval that expands candidates within a temporal neighborhood for robust reasoning over loosely ordered events.",
    results:
      "First place at the Video Browser Showdown (VBS) 2025, surpassing established state-of-the-art interactive systems under heterogeneous, time-critical conditions. Three consecutive first-place finishes at the Ho Chi Minh AI Challenge (AIC) 2022–2024 on multilingual broadcast media. The framework was further validated on four datasets spanning open-domain web video (V3C, ~28,450 videos / 3,800 hours), underwater footage (MVK), laparoscopic surgical recordings (LapGynLHE) and Vietnamese news (AIC, 1,471 videos / 328 hours), using a benchmark of 72 VBS and 50 AVS queries — confirming scalability, robustness and cross-domain generalization.",
    highlights: [
      "Sub-second retrieval at million-scale via a GPU-accelerated hybrid Milvus + Elasticsearch backend",
      "Reliability-weighted fusion across CLIP, BEiT-3 and InternVL-G plus text-in-image, speech and object cues",
      "Two-stage context-aware sequential event retrieval with temporal-neighborhood expansion",
      "🥇 1st place — Video Browser Showdown (VBS) 2025",
      "🥇 3× consecutive 1st place — Ho Chi Minh AI Challenge (AIC) 2022–2024",
      "Validated on V3C, MVK, LapGynLHE and Vietnamese News datasets",
    ].join("\n"),
    figures: JSON.stringify(ivrFigures),
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    image: "/figures/ivr/fig1-architecture.png",
    featured: true,
    order: 0,
  },

  // ── Thanh Duc Ngo — publications imported from Google Scholar (2025–2026) ──
  // Flagship, openly-accessible papers (CVF / arXiv) get a full highlight page
  // (figures + overview/results/highlights); the rest carry metadata + abstract.
  // No raw manuscript PDF is hosted or linked (pdfUrl stays blank).

  // ----- 2026 -----
  {
    title: "ITSELF: Attention Guided Fine-Grained Alignment for Vision-Language Retrieval",
    authors: "Tien-Huy Nguyen, Huu-Loc Tran, Thanh Duc Ngo",
    venue: "WACV",
    venueDetail: "WACV 2026 · IEEE/CVF Winter Conference on Applications of Computer Vision",
    year: 2026,
    slug: "itself-vision-language-retrieval",
    abstract:
      "Vision Language Models (VLMs) have rapidly advanced and show strong promise for text-based person search (TBPS), a task that requires capturing fine-grained relationships between images and text to distinguish individuals. Previous methods address these challenges through local alignment, yet they are often prone to shortcut learning and spurious correlations, yielding misalignment. Motivated by the finding that encoder attention surfaces spatially precise evidence from the earliest training epochs, we introduce ITSELF, an attention-guided framework for implicit local alignment. At its core, Guided Representation with Attentive Bank (GRAB) converts the model's own attention into an Attentive Bank of high-saliency tokens and applies local objectives on this bank, learning fine-grained correspondences without extra supervision. Multi-Layer Attention for Robust Selection (MARS) aggregates attention across layers with diversity-aware top-k selection, and an Adaptive Token Scheduler (ATS) schedules the retention budget from coarse to fine over training.",
    overview:
      "ITSELF targets text-based person search (TBPS), where a system must retrieve the right individual from fine-grained image–text relationships. Rather than relying on explicit local alignment — which is prone to shortcut learning and spurious correlations — ITSELF performs implicit local alignment guided by the model's own attention.\n\nAt its core, Guided Representation with Attentive Bank (GRAB) converts encoder attention into an Attentive Bank of high-saliency tokens and applies local objectives on that bank, learning fine-grained correspondences without extra supervision. Multi-Layer Attention for Robust Selection (MARS) aggregates attention across layers and performs diversity-aware top-k selection, while the Adaptive Token Scheduler (ATS) anneals the token-retention budget from coarse to fine over training — preserving context early and focusing on discriminative detail later.",
    results:
      "On three widely used TBPS benchmarks, ITSELF reaches state-of-the-art performance and strong cross-dataset generalization, without any additional prior supervision. The work appears at WACV 2026 (IEEE/CVF Winter Conference on Applications of Computer Vision).",
    highlights: [
      "Attention-guided implicit local alignment for text-based person search",
      "GRAB — an Attentive Bank of high-saliency tokens from the model's own attention",
      "MARS — multi-layer, diversity-aware top-k token selection",
      "ATS — coarse-to-fine token-retention schedule",
      "State-of-the-art on 3 TBPS benchmarks + strong cross-dataset generalization",
      "WACV 2026 (main conference)",
    ].join("\n"),
    figures: JSON.stringify([
      {
        src: "/figures/itself-vision-language-retrieval/fig1-grab-architecture.png",
        caption:
          "ITSELF architecture. GRAB turns the encoder's own attention into a bank of high-saliency tokens; MARS performs multi-layer, diversity-aware selection and the Adaptive Token Scheduler drives implicit local alignment under combined global and local objectives.",
      },
      {
        src: "/figures/itself-vision-language-retrieval/fig2-ablations.png",
        caption:
          "Analysis and ablations: per-layer attention entropy across training, and the effect of layer-setting and token discard-ratio choices on retrieval performance.",
      },
      {
        src: "/figures/itself-vision-language-retrieval/fig3-qualitative.png",
        caption:
          "Qualitative text-based person search. For each query, ITSELF (\"Ours\") retrieves more accurate matches than the RDE baseline, with attention concentrating on discriminative regions.",
      },
    ]),
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "https://trhuuloc.github.io/itself",
    image: "/figures/itself-vision-language-retrieval/fig1-grab-architecture.png",
    featured: false,
    order: 1,
  },
  {
    title: "Visual Question Answering for Interactive Multimodal Video Retrieval",
    authors: "Bao Tran, Tien Do, Thanh Duc Ngo, Duy-Dinh Le",
    venue: "MMM",
    venueDetail: "MMM 2026 · 32nd International Conference on Multimedia Modeling",
    year: 2026,
    abstract:
      "Presented at the 32nd International Conference on Multimedia Modeling (MMM 2026). The work studies visual question answering for interactive, multimodal video retrieval. A public abstract was not available at the time of import — see the conference proceedings for the full text.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 2,
  },
  {
    title:
      "NII-UIT at VBS2026: Towards Effective Visual Question Answering for Interactive and Multimodal Video Retrieval",
    authors: "Bao Tran, Tien Do, Thanh Duc Ngo, Duy-Dinh Le, Shin'ichi Satoh",
    venue: "MMM",
    venueDetail: "MMM 2026 · Video Browser Showdown (VBS) 2026",
    year: 2026,
    abstract:
      "Interactive video retrieval increasingly requires answering targeted questions about fleeting moments in long videos, under ambiguous queries and tight time limits. This paper presents the NII-UIT system for the Video Browser Showdown (VBS) 2026, addressing three limitations of current systems: localizing brief answer-bearing segments, the high verification effort demanded of users under time pressure, and limited integration of diverse modalities such as visual content and speech. The system introduces an Answer Span Prediction module to highlight candidate temporal regions, a Candidate Answer Suggestion mechanism that aggregates multimodal cues into verifiable answer options, and a dedicated In-Video Retrieval component.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 3,
  },

  // ----- 2025 -----
  {
    title: "Skeleton-guided artistic text recognition",
    authors: "Tien Do, Thuyen Tran, Khiem Le, Duy-Dinh Le, Thanh Duc Ngo",
    venue: "IJDAR",
    venueDetail:
      "IJDAR · International Journal on Document Analysis and Recognition (Springer)",
    year: 2025,
    abstract:
      "Artistic text recognition remains insufficiently addressed: stylized fonts, geometric distortions, visual effects and background noise — designed for aesthetics — are detrimental to accurate recognition. To study this, the authors introduce the Artistic Text-In-The-Wild (ATTW) benchmark, comprising 16,627 diverse artistic-text instances. They propose a skeleton-guided recognition approach, arguing that skeletal structure information is essential for improving accuracy on artistic text. Experiments show the skeleton-guided method outperforms state-of-the-art methods on the ATTW benchmark.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 4,
  },
  {
    title: "Zero-shot Artistic Text Recognition with Multimodal Language Models",
    authors: "Tien Do, Thuyen Tran, Duy-Dinh Le, Thanh Duc Ngo",
    venue: "APSIPA ASC",
    venueDetail:
      "APSIPA ASC 2025 · Asia Pacific Signal and Information Processing Association Annual Summit and Conference",
    year: 2025,
    abstract:
      "Artistic Text (AT), characterized by stylized fonts, geometric distortions, and complex visual effects, frequently appears in real-world contexts such as advertising, signage, and branding. Recognizing such text is crucial for downstream tasks like image understanding and multimodal reasoning. While recent Multimodal Language Models (MLLMs) demonstrate strong general vision-language capabilities, it remains unclear whether they can effectively perceive and interpret artistic text. In this work, we conduct a comprehensive zero-shot evaluation of representative MLLMs on a diverse benchmark of artistic text, revealing key limitations and motivating the need for hybrid approaches that combine visual grounding with robust language modeling.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 5,
  },
  {
    title: "Towards Understanding the Logical Layout of Scene Text in Signboard Images",
    authors: "Giang Tran Thi Cam, Cam-Nguyen Tran-Nhu, Thuyen Tran Doan, Thanh Duc Ngo",
    venue: "ICDAR",
    venueDetail: "ICDAR 2025 · International Conference on Document Analysis and Recognition",
    year: 2025,
    abstract:
      "Logical layout analysis decodes the semantic roles of text regions and is pivotal for scene understanding. While prior research focuses on structured documents, scene text is unstructured and visually diverse. This work extends logical layout analysis to signboard images — a domain of complex backgrounds, irregular text placements, diverse viewpoints, unique fonts, varying text sizes and personalized designs. The authors introduce a benchmark of 2,025 manually annotated images from diverse urban environments, containing 44,227 text instances across 9 semantic categories common to signboards, and evaluate state-of-the-art logical layout analysis methods on it.",
    pdfUrl: "",
    codeUrl: "https://github.com/Yangchann/LLASignboard",
    projectUrl: "",
    featured: false,
    order: 6,
  },
  {
    title:
      "Few-Shot Instance Segmentation: An Exploration in the Frequency Domain for Camouflage Instances",
    authors: "Thanh-Danh Nguyen, Hung-Phu Cao, Thanh Duc Ngo, Vinh-Tiep Nguyen, Tam V. Nguyen",
    venue: "MAPR",
    venueDetail:
      "MAPR 2025 · International Conference on Multimedia Analysis and Pattern Recognition",
    year: 2025,
    abstract:
      "Few-shot instance segmentation is an intense yet essential task, particularly in camouflaged scenarios where visual ambiguity between foreground and background makes instance-level recognition more difficult. Prior approaches primarily focused on image augmentations in the color space domain. However, this often fails to capture the full range of visual characteristics needed for robust generalization in camouflage images. To this end, we propose a novel framework for few-shot camouflage instance segmentation via instance-aware frequency-based augmentation, dubbed FS-CAMOFreq, to enhance image diversity while preserving semantic structure. Extensive experiments on the challenging CAMO-FS benchmark demonstrate superior performance compared to state-of-the-art baselines.",
    pdfUrl: "",
    codeUrl: "https://github.com/danhntd/FS-CAMOFreq",
    projectUrl: "",
    featured: false,
    order: 7,
  },
  {
    title: "UDP-Edit: Union Dual-Prompt Attention for Local Image Editing in Fast Diffusion Models",
    authors:
      "Trong-Tai Dam Vu, Vinh-Tiep Nguyen, Van Kiet Nguyen, Thanh Duc Ngo, Duy-Dinh Le, Ngan Luu-Thuy Nguyen",
    venue: "MAPR",
    venueDetail:
      "MAPR 2025 · International Conference on Multimedia Analysis and Pattern Recognition",
    year: 2025,
    abstract:
      "Fast-sampling diffusion models have become prominent in text-to-image editing due to their significantly reduced inference time. However, achieving precise local edits with these models remains challenging — altering a teddy bear to a wooden bear should affect only the object, not the background. Prior approaches fail to balance precision and efficiency, often resulting in either global changes or slow inference. In this paper, we propose UDP-Edit, a union dual-prompt cross-attention editing framework for controlled local editing under fast diffusion sampling. UDP-Edit merges cross-attention maps from both source and target prompts to generate a soft semantic mask that constrains edits to relevant regions, preserving global structure while enabling localized transformation.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 8,
  },
  {
    title:
      "Robust Traffic Vehicle Detection under Real-World Conditions with Misclassified Vehicles Minimization and Weighted Box Fusion",
    authors:
      "Thai Hoang Minh, Long Le Bao, Phat Nguyen Thuan, Thang Nguyen Tien, Huy Nguyen Phong, Tien Do, Duy-Dinh Le, Thanh Duc Ngo",
    venue: "MAPR",
    venueDetail:
      "MAPR 2025 · International Conference on Multimedia Analysis and Pattern Recognition",
    year: 2025,
    abstract:
      "Traffic vehicle detection is a vital component of intelligent transportation systems. However, real-world conditions — especially the frequent misclassification of pedestrians as motorbikes in crowded urban environments — pose significant challenges. To tackle these, we employ two techniques: a misclassified-vehicle minimization strategy to reduce false positives and false negatives, and Weighted Box Fusion to refine detection by aggregating predictions from multiple models. Our pipeline integrates state-of-the-art detectors with targeted post-processing, securing 2nd place in the SoICT Hackathon 2024 \"Traffic Vehicle Detection\" Track, which required detecting motorbikes, cars, buses and trucks.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 9,
  },
  {
    title: "Context-Aware Question Answering for Vietnamese University Admissions via Multi-LLM Architecture",
    authors:
      "Tam Le Thi Thanh, Hien Ho Trong, Bao Tran Gia, Thua Nguyen, Tien Do, Thanh Duc Ngo, Ngan Luu-Thuy Nguyen",
    venue: "MAPR",
    venueDetail:
      "MAPR 2025 · International Conference on Multimedia Analysis and Pattern Recognition",
    year: 2025,
    abstract:
      "The increasing demand for transparent, accessible communication in university admissions highlights the need for intelligent systems to support students, especially in complex contexts like Vietnam. Traditional QA approaches based on rule-based systems and basic retrieval face scalability and contextual-understanding challenges, and current Vietnamese benchmarks do not fully address admissions-specific needs. We introduce a contextual chunking framework and a modular multi-LLM architecture to improve question answering over long, complex admission documents. Experiments on a newly constructed multimodal Vietnamese admissions dataset show substantial gains in retrieval accuracy and answer-generation quality over baselines.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 10,
  },
  {
    title: "Can LLMs Play Ô Ăn Quan? A Study of Multi-Step Planning and Decision Making",
    authors:
      "Sang Quang Nguyen, Kiet Van Nguyen, Vinh-Tiep Nguyen, Thanh Duc Ngo, Ngan Luu-Thuy Nguyen, Duy-Dinh Le",
    venue: "MAPR",
    venueDetail:
      "MAPR 2025 · International Conference on Multimedia Analysis and Pattern Recognition",
    year: 2025,
    abstract:
      "In this paper, we explore the ability of large language models (LLMs) to plan and make decisions through the lens of the traditional Vietnamese board game, Ô Ăn Quan. This game, which involves a series of strategic token movements and captures, offers a unique environment for evaluating the decision-making and strategic capabilities of LLMs. We develop agent personas ranging from aggressive to defensive and use the game as a testbed across different strategies. Through experiments with models like Llama-3.2-3B-Instruct, Llama-3.1-8B-Instruct, and Llama-3.3-70B-Instruct, we examine how these models execute strategic decision-making, plan moves, and manage dynamic game states — offering insights into the strengths and weaknesses of LLMs in reasoning and strategy.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 11,
  },
  {
    title: "A Two-Stage Refinement Framework for Robust Vehicle Detection in Traffic Surveillance",
    authors: "Kim Nguyen, Hoang Tran Van, Nhan Nguyen Viet Thien, Dat Phan Thanh, Tien Do, Thanh Duc Ngo",
    venue: "CITA",
    venueDetail: "CITA 2025 · Conference on Information Technology and its Applications",
    year: 2025,
    abstract:
      "Published in the Conference on Information Technology and its Applications (CITA 2025). The work proposes a two-stage refinement framework for robust vehicle detection in traffic surveillance. A public abstract was not available at the time of import — see the conference proceedings for the full text.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 12,
  },
  {
    title: "CAMUL: Context-Aware Multi-conditional Instance Synthesis for Image Segmentation",
    authors:
      "Thanh-Danh Nguyen, Trong-Tai Dam Vu, Bich-Nga Pham, Thanh Duc Ngo, Tam V. Nguyen, Vinh-Tiep Nguyen",
    venue: "IEEE MultiMedia",
    venueDetail: "IEEE MultiMedia · Journal article",
    year: 2025,
    abstract:
      "Instance image segmentation requires abundant annotated data to achieve high accuracy. Conditional image synthesis has shown effectiveness in generating synthetic data, but existing models struggle to generate target instances matching masks with complex shapes, and often fail to create diverse instances due to low-context, simple text prompts. We propose CAMUL, a framework for context-aware multi-conditional instance synthesis. CAMUL introduces CARP (cross-attention refinement prompting) to align generated instances with conditional masks, and iCAFF (incremental context-aware feature fusion) for more precise context understanding. Our method increases performance by up to 15.34% average precision (AP) on Cityscapes and 3.34% AP on the large-scale ADE20K benchmark compared to baselines.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 13,
  },
  {
    title: "Stratified Domain Adaptation: A Progressive Self-Training Approach for Scene Text Recognition",
    authors: "Kha Nhat Le, Hoang-Tuan Nguyen, Hung Tien Tran, Thanh Duc Ngo",
    venue: "WACV",
    venueDetail: "WACV 2025 · IEEE/CVF Winter Conference on Applications of Computer Vision",
    year: 2025,
    slug: "stratified-domain-adaptation-str",
    abstract:
      "Unsupervised domain adaptation (UDA) has become increasingly prevalent in scene text recognition (STR), especially where training and testing data reside in different domains. The efficacy of existing UDA approaches tends to degrade when there is a large gap between the source and target domains. To deal with this, gradually shifting from domain to domain is the key. We introduce the Stratified Domain Adaptation (StrDA) approach, which examines the gradual escalation of the domain gap during learning: it partitions the target data into subsets so a progressively self-trained model can adapt to gradual changes, using domain discriminators to estimate the out-of-distribution and domain-discriminative levels of each sample. Extensive experiments on benchmark scene-text datasets show that our approach significantly improves baseline source-trained STR models.",
    overview:
      "Stratified Domain Adaptation (StrDA) is an unsupervised domain-adaptation method for scene text recognition (STR). When the gap between the source (training) and target (test) domains is large, existing UDA methods degrade; StrDA instead shifts gradually, domain by domain.\n\nThe key idea is to partition the unlabeled target data into ordered subsets of increasing domain gap, then progressively self-train the model so it adapts to gradual change. StrDA measures each sample's proximity to the source and target domains using domain discriminators that estimate out-of-distribution and domain-discriminative levels, and uses these estimates to stratify the data for staged self-training.",
    results:
      "On standard scene-text benchmarks — six core benchmarks plus additional datasets — StrDA significantly improves the performance of baseline (source-trained) STR models across multiple recognizer architectures (e.g. CRNN, TRBA, ABINet). The method appears at WACV 2025 (IEEE/CVF Winter Conference on Applications of Computer Vision); source code is publicly available.",
    highlights: [
      "Unsupervised domain adaptation for scene text recognition",
      "Stratifies target data into subsets of gradually increasing domain gap",
      "Progressive self-training adapts the model stage by stage",
      "Domain discriminators estimate OOD & domain-discriminative levels",
      "Significant gains over source-trained baselines on STR benchmarks",
      "WACV 2025 · code available",
    ].join("\n"),
    figures: "[]",
    pdfUrl: "",
    codeUrl: "https://github.com/KhaLee2307/StrDA",
    projectUrl: "",
    featured: false,
    order: 14,
  },
  {
    title: "Multi-Perspective Data Augmentation for Few-shot Object Detection",
    authors:
      "Anh-Khoa Nguyen Vu, Quoc-Truong Truong, Vinh-Tiep Nguyen, Thanh Duc Ngo, Thanh-Toan Do, Tam V. Nguyen",
    venue: "ICLR",
    venueDetail: "ICLR 2025 · International Conference on Learning Representations",
    year: 2025,
    slug: "mpad-few-shot-object-detection",
    abstract:
      "Recent few-shot object detection (FSOD) methods have focused on augmenting synthetic samples for novel classes, showing promising results with the rise of diffusion models. However, the diversity of such datasets is often limited because they lack awareness of typical and hard samples, especially regarding foreground and background relationships. To tackle this, we propose a Multi-Perspective Data Augmentation (MPAD) framework. For foreground-foreground relationships, we propose in-context learning for object synthesis (ICOS) with bounding box adjustments to enhance the detail and spatial information of synthetic samples. Inspired by the large margin principle, we design a Harmonic Prompt Aggregation Scheduler (HPAS) to mix prompt embeddings at each timestep of the diffusion generation process, producing hard novel samples. For foreground-background relationships, we introduce a Background Proposal method (BAP) to sample typical and hard backgrounds. Our framework significantly outperforms traditional methods, achieving an average increase of 17.5% in nAP50 over the baseline on PASCAL VOC.",
    overview:
      "MPAD (Multi-Perspective Data Augmentation) improves few-shot object detection by generating better synthetic training data with diffusion models. Existing diffusion-based augmentation lacks awareness of typical vs. hard samples and of foreground–background relationships, which limits diversity.\n\nMPAD attacks this from three angles. For foreground–foreground relationships, In-Context learning for Object Synthesis (ICOS) with bounding-box adjustment sharpens the detail and spatial information of synthesized instances. Inspired by the large-margin principle, a Harmonic Prompt Aggregation Scheduler (HPAS) mixes prompt embeddings at each diffusion timestep to produce hard novel samples that tighten class boundaries. For foreground–background relationships, a Background Proposal method (BAP) samples both typical and hard backgrounds.",
    results:
      "Across multiple few-shot object detection benchmarks, MPAD significantly outperforms traditional augmentation, with an average gain of 17.5% in nAP50 over the baseline on PASCAL VOC. The paper was published at ICLR 2025; code is publicly available.",
    highlights: [
      "Diffusion-based data augmentation for few-shot object detection",
      "ICOS — in-context object synthesis with bounding-box adjustment",
      "HPAS — harmonic prompt aggregation for hard novel samples",
      "BAP — typical + hard background proposals",
      "+17.5% average nAP50 over baseline on PASCAL VOC",
      "ICLR 2025 · code available",
    ].join("\n"),
    figures: JSON.stringify([
      {
        src: "/figures/mpad-few-shot-object-detection/fig1-synthesis-process.png",
        caption:
          "MPAD generates hard novel-class samples with diffusion: the Harmonic Prompt Aggregation Scheduler (HPAS) mixes prompt embeddings across denoising steps, turning noise into a detection-ready instance.",
      },
      {
        src: "/figures/mpad-few-shot-object-detection/fig2-generated-sample.png",
        caption:
          "A synthesized novel-class instance with its bounding box — augmented training data produced by MPAD's in-context object synthesis (ICOS).",
      },
    ]),
    pdfUrl: "",
    codeUrl: "https://github.com/nvakhoa/MPAD",
    projectUrl: "",
    image: "/figures/mpad-few-shot-object-detection/fig1-synthesis-process.png",
    featured: false,
    order: 15,
  },
  {
    title: "A Lightweight and Data-Centric Framework for Real-Time Object Detection in Fisheye Cameras",
    authors:
      "An To Vinh, Nguyen Mai Vinh, Nguyen Luong Si, Duy Do Quoc, Duy Tran Khanh, Nguyen Nguyen Hoang, Tien Do, Thanh Duc Ngo, Duy-Dinh Le, Shin'ichi Satoh",
    venue: "ICCVW",
    venueDetail: "ICCV 2025 Workshops (ICCVW) · AI City Challenge",
    year: 2025,
    abstract:
      "Fisheye cameras offer wide-area coverage in traffic surveillance but introduce severe radial distortion that complicates general object detection — especially near image peripheries. We propose a lightweight, data-centric framework for real-time, general-purpose object detection in fisheye imagery. It has three components: a distortion-aware copy-paste augmentation strategy that preserves geometric alignment and contextual plausibility; a multi-source synthetic data pipeline combining fisheye simulation, style transfer and background generation; and a dual-detector inference module using YOLOv11 and D-FINE fused via Weighted Boxes Fusion. The framework is model- and category-agnostic and currently ranks 1st on the public leaderboard of the AI City Challenge 2025 (Track 4), achieving an F1 score of 0.6493.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 16,
  },
  {
    title:
      "Generalizable Sign Language Recognition via Local Temporal Convolutions and Region-Aware Pose Encoding",
    authors:
      "Sieu Tran, Duc Nguyen Minh, Truong Nguyen Thanh, Hao Vo, Thanh Duc Ngo, Tien Do, Khiem Le, Duy-Dinh Le",
    venue: "ICCVW",
    venueDetail: "ICCV 2025 Workshops (ICCVW) · MSLR workshop",
    year: 2025,
    abstract:
      "Continuous Sign Language Recognition (CSLR) aims to translate sign language videos into gloss-level annotations. RGB-based models with global sequence models perform well but struggle to generalize to unseen sentence compositions. We present a lightweight pose-only CSLR framework that improves robustness in the unseen-sentence setting, using pose keypoints as the sole input to reduce visual redundancy and background noise. A locally conditioned decoding strategy based on temporal convolution mitigates the overfitting associated with global sequence models. On a large-scale signer-independent benchmark, the method achieves competitive performance versus published RGB-based baselines despite relying solely on 2D pose input, suggesting pose-driven representations with localized temporal modeling are a promising, efficient direction for robust CSLR.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 17,
  },
  {
    title: "Efficient and Distortion-Aware Fisheye Object Detection for Edge Devices",
    authors:
      "Bao Tran Gia, Tuong Bui Cong Khanh, Tam Le Thi Thanh, Hien Ho Trong, Tien Do, Thanh Duc Ngo, Duy-Dinh Le, Shin'ichi Satoh",
    venue: "ICCVW",
    venueDetail: "ICCV 2025 Workshops (ICCVW) · AI City Challenge",
    year: 2025,
    abstract:
      "Fisheye cameras are increasingly used in traffic surveillance for their ultra-wide field of view, but object detection in fisheye images remains challenging for real-time applications. Many recent methods rely on multi-model ensembles that incur high computational cost and latency, and fisheye distortion makes peripheral objects appear small and warped, causing unstable convergence. We present an efficient, scalable framework that tackles these from both algorithmic and system perspectives: a distortion-aware learning strategy that improves detection in highly distorted regions, a spatially guided augmentation method for robustness, and GPU-level runtime optimizations that significantly reduce memory and latency. Experiments show competitive accuracy at high inference speed (FPS), making it well-suited for edge-device deployment.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 18,
  },
  {
    title:
      "Region-Aware Pose Modeling and Permutation Decoding for Signer-Independent Sign Language Recognition",
    authors:
      "Sieu Tran, Duc Nguyen Minh, Truong Nguyen Thanh, Hao Vo, Thanh Duc Ngo, Tien Do, Khiem Le, Duy-Dinh Le",
    venue: "ICCVW",
    venueDetail: "ICCV 2025 Workshops (ICCVW) · MSLR workshop",
    year: 2025,
    abstract:
      "Continuous Sign Language Recognition (CSLR) under signer-independent conditions remains a major challenge due to high intra-class variability in body structure and articulation style. While RGB-based systems dominate, pose-only input offers a lightweight, privacy-preserving alternative that has typically underperformed. This paper proposes a skeleton-only CSLR framework addressing two limitations of prior work: imbalanced regional features and rigid decoding constraints. It introduces region-specific GCN encoders and auxiliary gloss decoders for the hands, lips and torso, and replaces CTC with a permutation-trained Transformer decoder that captures bidirectional gloss dependencies without assuming monotonic alignment. Using only 2D pose input, the model achieves a word error rate of 13.5% on a signer-independent subset of the Isharah dataset, surpassing previous RGB-based methods on comparable splits.",
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    featured: false,
    order: 19,
  },
  {
    title: "VRAG: Retrieval-Augmented Video Question Answering for Long-Form Videos",
    authors:
      "Bao Tran Gia, Khiem Le, Tien Do, Tien-Dung Mai, Thanh Duc Ngo, Duy-Dinh Le, Shin'ichi Satoh",
    venue: "CVPRW",
    venueDetail: "CVPR 2025 Workshops (CVPRW)",
    year: 2025,
    slug: "vrag-retrieval-augmented-video-qa",
    abstract:
      "The rapid expansion of video data across various domains has heightened the demand for efficient retrieval and question-answering systems, particularly for long-form videos. Existing Video Question Answering (VQA) approaches struggle with extended video sequences due to high computational costs, loss of contextual coherence, and challenges in retrieving relevant information. We introduce VRAG: Retrieval-Augmented Video Question Answering for Long-Form Videos, a framework that brings a retrieval-augmented generation (RAG) architecture to the video domain. VRAG first retrieves the most relevant video segments, then applies chunking and refinement to identify key sub-segments, enabling precise and focused answer generation. This maximizes the effectiveness of the Multimodal Large Language Model (MLLM) by ensuring only the most relevant content is processed.",
    overview:
      "VRAG brings retrieval-augmented generation (RAG) to long-form video question answering. A query — Known-Item Search or VQA — is encoded and run through a multimodal retrieval system that combines semantic-embedding search, on-screen text search, audio-based search, object filtering and temporal search. The top candidates are then re-scored by an MLLM-based re-ranking module before a dedicated VQA module produces the final answer.\n\nThe re-ranking module merges each candidate shot with its temporal neighbours and prompts a multimodal LLM to assess relevance, sharpening the ranking. The VQA module then chunks the selected long video, uses the MLLM to keep only the segments relevant to the question, and reasons over that focused short segment — so the model spends its context budget only on content that matters.",
    results:
      "Evaluated on a benchmark of KIS and VQA tasks derived from the Video Browser Showdown (VBS) 2019–2025, VRAG improves both retrieval precision and answer quality over a no-re-rank baseline and naive VQA prompting, across several multimodal LLMs. The work was presented in the CVPR 2025 Workshops (CVPRW).",
    highlights: [
      "Retrieval-augmented generation (RAG) adapted to long-form video QA",
      "Multimodal retrieval: semantic, on-screen text, audio, object & temporal search",
      "MLLM re-ranking with temporal-neighbour merging",
      "Chunk-and-refine VQA module focuses the MLLM on answer-bearing segments",
      "Evaluated on KIS + VQA tasks from VBS 2019–2025",
      "CVPR 2025 Workshops (CVPRW)",
    ].join("\n"),
    figures: JSON.stringify([
      {
        src: "/figures/vrag-retrieval-augmented-video-qa/fig1-framework.png",
        caption:
          "The VRAG framework. A query is routed through multimodal retrieval (semantic, on-screen text, audio, object and temporal search); an MLLM re-ranking module re-scores the top-N candidates; and a VQA module chunks and refines the chosen video to generate the answer.",
      },
      {
        src: "/figures/vrag-retrieval-augmented-video-qa/fig2-reranking.png",
        caption:
          "Re-ranking module: the retrieved shot T is merged with its temporal neighbours (T−3 … T+3) and scored by a multimodal LLM, sharpening relevance before answer generation.",
      },
      {
        src: "/figures/vrag-retrieval-augmented-video-qa/fig3-vqa-module.png",
        caption:
          "VQA module: a long video is split into segments; the MLLM selects the segments relevant to the question, then reasons over the focused short segment to produce the answer.",
      },
    ]),
    pdfUrl: "",
    codeUrl: "",
    projectUrl: "",
    image: "/figures/vrag-retrieval-augmented-video-qa/fig1-framework.png",
    featured: false,
    order: 20,
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
    event: "NVIDIA · CVPR 2024 Workshop",
    prize: "Fourth Prize",
    rank: 0,
    scope: "international",
    year: 2024,
    description:
      "Road object detection with fisheye cameras — a challenging real-world task requiring handling of severe lens distortion. Outperformed by only a few major companies globally.",
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
];

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
  await prisma.news.deleteMany();
  await prisma.setting.deleteMany();

  await prisma.member.createMany({ data: members });
  await prisma.publication.createMany({ data: publications });
  await prisma.conference.createMany({ data: conferences });
  await prisma.award.createMany({ data: awards });
  await prisma.news.createMany({ data: news });
  for (const [key, value] of Object.entries(settings)) {
    await prisma.setting.create({ data: { key, value } });
  }
  console.log("Seeded:", {
    members: members.length,
    publications: publications.length,
    conferences: conferences.length,
    awards: awards.length,
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
