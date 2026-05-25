import Link from "next/link";
import { redirect } from "next/navigation";
import { BASE_PATH } from "@/lib/basePath";
import { isAuthed } from "@/lib/auth";

export const metadata = { title: "Admin sign in" };

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  // already signed in → go straight to dashboard
  if (await isAuthed()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <div className="hero-sunset flex min-h-screen items-center justify-center p-6">
      <form
        method="post"
        action={`${BASE_PATH}/api/auth/login`}
        className="w-full max-w-sm rounded-xl border border-hairline bg-canvas p-8 shadow-layered"
      >
        <Link href="/" className="font-display text-2xl text-ink">
          CORE Lab<span className="text-primary">_</span>
        </Link>
        <h1 className="mt-4 text-xl font-medium text-ink">Admin sign in</h1>
        <p className="mt-1 text-sm text-steel">Enter the admin password to manage content.</p>

        <label className="field-label mt-6" htmlFor="pw">
          Password
        </label>
        <input
          id="pw"
          name="password"
          type="password"
          className="input"
          autoFocus
          required
        />
        {error && <p className="mt-2 text-sm text-primary-deep">Incorrect password.</p>}

        <button type="submit" className="btn btn-dark mt-5 w-full">
          Sign in
        </button>
        <Link href="/" className="mt-4 block text-center text-sm text-link hover:underline">
          ← Back to site
        </Link>
      </form>
    </div>
  );
}
