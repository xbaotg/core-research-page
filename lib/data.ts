import { prisma } from "./prisma";

export type SettingsMap = Record<string, string>;

export const DEFAULT_SETTINGS: SettingsMap = {
  labName: "CORE",
  labFullName: "CORE Lab",
  heroKicker: "CORE Lab",
  heroTitle: "Computer Vision\n& Retrieval.",
  heroSubtitle: "A research group at the University of Information Technology, VNU-HCM.",
  about: "",
  affiliation: "University of Information Technology, VNU-HCM",
  focus: "Computer Vision & Retrieval",
  since: "2025",
  email: "core@uit.edu.vn",
  location: "Ho Chi Minh City, Vietnam",
  address: "",
  linkScholar: "",
  linkGithub: "",
  linkX: "",
  footerNote: "CORE Lab — Computer Vision & Retrieval.",
  // Vietnamese variants (fall back to the English key when empty)
  heroTitle_vi: "",
  heroSubtitle_vi: "",
  about_vi: "",
  footerNote_vi: "",
  focus_vi: "",
  affiliation_vi: "",
  location_vi: "",
};

export async function getSettings(): Promise<SettingsMap> {
  const rows = await prisma.setting.findMany();
  const map: SettingsMap = { ...DEFAULT_SETTINGS };
  for (const r of rows) map[r.key] = r.value;
  return map;
}

export type MemberLinks = {
  scholar?: string;
  homepage?: string;
  github?: string;
  linkedin?: string;
};

export function parseLinks(raw: string | null | undefined): MemberLinks {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as MemberLinks;
  } catch {
    return {};
  }
}

/** Pick the soonest future date for a conference (deadline first, else start). */
export function nextDate(c: { deadline: Date | null; startDate: Date | null }): {
  date: Date | null;
  kind: "deadline" | "event" | null;
} {
  const now = Date.now();
  if (c.deadline && c.deadline.getTime() > now) return { date: c.deadline, kind: "deadline" };
  if (c.startDate && c.startDate.getTime() > now) return { date: c.startDate, kind: "event" };
  // both passed → fall back to whichever exists for display
  if (c.startDate) return { date: c.startDate, kind: "event" };
  if (c.deadline) return { date: c.deadline, kind: "deadline" };
  return { date: null, kind: null };
}
