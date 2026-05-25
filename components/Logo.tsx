import Link from "next/link";

export default function Logo({ name = "CORE" }: { name?: string }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <span
        className="grid h-7 w-7 place-items-center rounded-sm bg-ink text-on-primary font-display text-[15px] leading-none"
        aria-hidden
      >
        C
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        {name} Lab
      </span>
    </Link>
  );
}
