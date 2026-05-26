import Link from "next/link";

export default function Logo({ name = "CORE" }: { name?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${name} Lab — home`}
      className="group inline-flex items-baseline"
    >
      <span className="font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-primary">
        {name}
      </span>
      <span className="ml-1.5 font-display text-xl font-normal tracking-tight text-stone">
        Lab
      </span>
    </Link>
  );
}
