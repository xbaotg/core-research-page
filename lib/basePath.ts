// Path prefix the app is served under (mirrors next.config basePath).
// next/link and next/navigation handle basePath automatically, but raw <img>,
// CSS url() and fetch() to /api do NOT — use asset()/api() for those.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a root-relative asset path (e.g. "/figures/x.png"); external/relative URLs pass through. */
export function asset(p: string | null | undefined): string {
  if (!p) return "";
  return p.startsWith("/") ? `${BASE_PATH}${p}` : p;
}

/** Build an API URL that respects the base path. */
export function api(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${p}`;
}
