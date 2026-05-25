import { NextResponse } from "next/server";
import { checkPassword, signSession, COOKIE_NAME, cookieOptions } from "@/lib/auth";
import { BASE_PATH } from "@/lib/basePath";

export async function POST(req: Request) {
  const ctype = req.headers.get("content-type") || "";
  let password = "";
  let isForm = false;

  if (ctype.includes("application/json")) {
    const b = await req.json().catch(() => ({} as Record<string, unknown>));
    password = String((b as { password?: unknown }).password ?? "");
  } else {
    const f = await req.formData().catch(() => null);
    if (f) {
      password = String(f.get("password") ?? "");
      isForm = true;
    }
  }

  const ok = checkPassword(password);

  // Native <form> submit → set cookie on a 303 redirect so the browser stores it
  // before following to /admin. Use a RELATIVE Location so it resolves against the
  // public origin (behind a proxy/domain, req.url is the internal host:port).
  if (isForm) {
    const dest = ok ? `${BASE_PATH}/admin` : `${BASE_PATH}/admin/login?error=1`;
    const res = new NextResponse(null, { status: 303, headers: { Location: dest } });
    if (ok) res.cookies.set(COOKIE_NAME, signSession(), cookieOptions);
    return res;
  }

  // JSON path (programmatic)
  if (!ok) {
    return NextResponse.json({ ok: false, error: "Incorrect password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, signSession(), cookieOptions);
  return res;
}
