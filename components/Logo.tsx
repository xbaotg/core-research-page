import Link from "next/link";

export default function Logo({ name = "CORE" }: { name?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span
        className="grid h-8 w-8 place-items-center rounded-md text-on-primary font-display text-[17px] leading-none"
        style={{
          background:
            "linear-gradient(135deg, var(--color-sunshine-700), var(--color-primary) 70%, var(--color-primary-deep))",
        }}
        aria-hidden
      >
        C
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        {name} LAB<span className="text-primary">_</span>
      </span>
    </Link>
  );
}
