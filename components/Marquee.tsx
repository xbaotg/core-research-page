export default function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee border-y border-hairline bg-surface">
      <div className="marquee__track py-3">
        {doubled.map((it, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-mono text-sm text-stone">{it}</span>
            <span className="text-hairline-strong" aria-hidden>
              •
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
