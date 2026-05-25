import { NextResponse } from "next/server";
import { BASE_PATH } from "@/lib/basePath";
import { LOCALE_COOKIE } from "@/lib/dict";

// GET /api/locale?l=vi&to=/people
// Sets the locale cookie server-side, then redirects back (relative Location
// so it resolves against the public origin — works behind a proxy/domain).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const l = url.searchParams.get("l") === "vi" ? "vi" : "en";
  const toRaw = url.searchParams.get("to") || "/";
  const to = toRaw.startsWith("/") ? toRaw : `/${toRaw}`;
  const dest = `${BASE_PATH}${to}`;

  const res = new NextResponse(null, { status: 303, headers: { Location: dest } });
  res.cookies.set(LOCALE_COOKIE, l, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return res;
}
