import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const COOKIE_NAME = "core_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret(): string {
  return process.env.AUTH_SECRET || "dev-insecure-secret-change-me";
}

function hmac(data: string): string {
  return crypto.createHmac("sha256", secret()).update(data).digest("hex");
}

/** token = "<expiryEpochSec>.<hmac>" */
export function signSession(): string {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${exp}.${hmac(String(exp))}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expStr, sig] = token.split(".");
  if (!expStr || !sig) return false;
  const expected = hmac(expStr);
  // constant-time compare
  if (
    sig.length !== expected.length ||
    !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
  )
    return false;
  return Number(expStr) > Math.floor(Date.now() / 1000);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "core-admin";
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

/** Use in protected admin server pages. Redirects to login if not authed. */
export async function requireAuth(): Promise<void> {
  if (!(await isAuthed())) redirect("/admin/login");
}

export const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: MAX_AGE,
  secure: process.env.NODE_ENV === "production",
};
