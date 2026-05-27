// Central site metadata — used by layout, sitemap, robots and JSON-LD.
// Set NEXT_PUBLIC_SITE_URL to your production origin (no trailing slash).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://core.uit.edu.vn"
).replace(/\/+$/, "");

export const SITE_NAME = "CORE Lab";
export const SITE_TITLE = "CORE Lab — Computer Vision & Retrieval";
export const SITE_DESCRIPTION =
  "CORE Lab is a computer-vision and information-retrieval research group at the University of Information Technology (UIT), VNU-HCM. We work on computer vision, image & video retrieval, multimodal/multimedia learning, scene-text recognition, multi-agent tracking and conversational image retrieval.";

export const SITE_KEYWORDS = [
  "CORE Lab",
  "computer vision",
  "image retrieval",
  "video retrieval",
  "interactive video retrieval",
  "multimodal learning",
  "multimedia",
  "scene text recognition",
  "OCR",
  "multi-agent tracking",
  "conversational image retrieval",
  "vision-language",
  "UIT",
  "VNU-HCM",
  "Vietnam",
  "research lab",
];
