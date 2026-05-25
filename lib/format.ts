export function fmtDate(d: Date | string | null | undefined): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function fmtRange(
  start: Date | null | undefined,
  end: Date | null | undefined
): string {
  if (!start) return "";
  const s = new Date(start);
  if (!end) return fmtDate(s);
  const e = new Date(end);
  const sameMonth =
    s.getUTCFullYear() === e.getUTCFullYear() && s.getUTCMonth() === e.getUTCMonth();
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", timeZone: "UTC" };
  if (sameMonth) {
    return `${s.toLocaleDateString("en-US", opts)}–${e.getUTCDate()}, ${e.getUTCFullYear()}`;
  }
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", {
    ...opts,
    year: "numeric",
  })}`;
}
