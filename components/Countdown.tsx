"use client";

import { useEffect, useState } from "react";
import { getDict, type Locale } from "@/lib/dict";

type Parts = { days: number; hours: number; mins: number; secs: number };

function diff(target: number): Parts | null {
  const ms = target - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    mins: Math.floor((s % 3600) / 60),
    secs: s % 60,
  };
}

function useCountdown(iso: string) {
  const target = new Date(iso).getTime();
  const [parts, setParts] = useState<Parts | null>(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return { parts, mounted };
}

const pad = (n: number) => String(n).padStart(2, "0");

/* ---- Large hero variant: big flip tiles on a drifting sunset mesh ---- */
function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden rounded-lg bg-ink/85 px-4 py-3 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.25)] backdrop-blur sm:px-6 sm:py-4">
        <span
          key={value}
          className="tick-anim block font-display text-4xl tabular-nums text-on-dark sm:text-5xl"
        >
          {value}
        </span>
      </div>
      <span className="mt-2 text-[11px] font-semibold uppercase tracking-[1px] text-ink/70">
        {label}
      </span>
    </div>
  );
}

export function Countdown({
  iso,
  kind,
  locale = "en",
}: {
  iso: string;
  kind?: "deadline" | "event" | null;
  locale?: Locale;
}) {
  const { parts, mounted } = useCountdown(iso);
  const t = getDict(locale);

  if (!mounted) {
    return <div className="h-[120px]" aria-hidden />;
  }
  if (!parts) {
    return (
      <div className="font-display text-2xl text-ink">
        {kind === "deadline" ? t.cdDeadlinePassed : t.cdHappening}
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3 sm:gap-4">
      <Tile value={pad(parts.days)} label={t.cdDays} />
      <span className="pb-7 font-display text-3xl text-ink/40">:</span>
      <Tile value={pad(parts.hours)} label={t.cdHrs} />
      <span className="pb-7 font-display text-3xl text-ink/40">:</span>
      <Tile value={pad(parts.mins)} label={t.cdMin} />
      <span className="pb-7 font-display text-3xl text-ink/40">:</span>
      <Tile value={pad(parts.secs)} label={t.cdSec} />
    </div>
  );
}

/* ---- Compact inline variant for conference cards ---- */
export function MiniCountdown({ iso, locale = "en" }: { iso: string; locale?: Locale }) {
  const { parts, mounted } = useCountdown(iso);

  if (!mounted) return <span className="inline-block h-6 w-32" aria-hidden />;
  if (!parts)
    return (
      <span className="text-sm font-medium text-steel">{getDict(locale).cdClosed}</span>
    );

  const cell = (v: number, l: string) => (
    <div className="flex flex-col items-center">
      <span
        key={v}
        className="tick-anim font-mono text-lg font-medium tabular-nums text-ink"
      >
        {pad(v)}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-stone">{l}</span>
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      {cell(parts.days, "d")}
      <span className="text-stone">:</span>
      {cell(parts.hours, "h")}
      <span className="text-stone">:</span>
      {cell(parts.mins, "m")}
      <span className="text-stone">:</span>
      {cell(parts.secs, "s")}
    </div>
  );
}
