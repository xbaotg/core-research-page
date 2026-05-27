"use client";

import { useState, useEffect, useCallback, type CSSProperties } from "react";
import { asset } from "@/lib/basePath";

type Sample = { src: string; caption?: string; texts?: string[] };

export default function DatasetGallery({
  samples,
  labels,
}: {
  samples: Sample[];
  labels: { detected: string; show: string; hide: string; region: string };
}) {
  const [open, setOpen] = useState<number | null>(null);
  const [showText, setShowText] = useState(true);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (d: number) =>
      setOpen((o) => (o === null ? o : (o + d + samples.length) % samples.length)),
    [samples.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close, go]);

  const cur = open === null ? null : samples[open];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {samples.map((s, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            className="group relative block aspect-[4/3] overflow-hidden rounded-xl border border-hairline bg-ink/5 text-left"
            aria-label={`Open sample ${i + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(s.src)}
              alt={s.caption || `Sample ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="ds-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-3 pb-2.5 pt-8 text-xs font-medium text-white">
              <span className="truncate">{s.caption?.split(" — ")[0]}</span>
              {s.texts?.length ? (
                <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 backdrop-blur">
                  {s.texts.length} {labels.region}
                </span>
              ) : null}
            </span>
          </button>
        ))}
      </div>

      {cur && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-6"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative grid max-h-[92vh] w-full max-w-5xl gap-5 overflow-auto rounded-2xl bg-canvas p-4 sm:p-5 md:grid-cols-[1.5fr_0.5fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative self-center overflow-hidden rounded-xl bg-ink/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(cur.src)}
                alt={cur.caption || "Sample"}
                className="max-h-[68vh] w-full object-contain"
              />
              {showText && (
                <span className="ds-scan-run pointer-events-none absolute inset-x-0 top-0 h-1/4" />
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="eyebrow">{labels.detected}</div>
                <button
                  onClick={() => setShowText((v) => !v)}
                  className="btn btn-secondary py-1!"
                >
                  {showText ? labels.hide : labels.show}
                </button>
              </div>
              {cur.caption && <p className="mt-3 text-sm leading-relaxed text-slate">{cur.caption}</p>}
              {showText && cur.texts?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {cur.texts.map((tx, k) => (
                    <span
                      key={k}
                      className="ds-chip rounded-md border border-hairline bg-surface px-2 py-1 font-mono text-xs text-ink"
                      style={{ "--d": `${k * 0.05}s` } as CSSProperties}
                    >
                      {tx}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <button
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-canvas/90 text-xl text-ink shadow-layered hover:bg-canvas"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-canvas/90 text-xl text-ink shadow-layered hover:bg-canvas md:right-[calc(33%+0.5rem)]"
              aria-label="Next"
            >
              ›
            </button>
            <button
              onClick={close}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-ink/80 text-sm text-white hover:bg-ink"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
