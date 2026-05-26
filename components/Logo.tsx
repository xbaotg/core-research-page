import Link from "next/link";

export default function Logo({ name = "CORE" }: { name?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${name} Lab — home`}
      className="group flex items-center gap-2.5"
    >
      <span
        className="grid h-8 w-8 place-items-center rounded-md bg-ink font-display text-[15px] font-bold leading-none text-white shadow-sm transition-transform duration-200 group-hover:scale-105"
        aria-hidden
      >
        {name.charAt(0) || "C"}
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        {name} <span className="font-normal text-stone">Lab</span>
      </span>
    </Link>
  );
}
