"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export type Pub = {
  id: number;
  title: string;
  authors: string;
  venue: string | null;
  year: number | null;
  slug: string | null;
  abstract: string | null;
  codeUrl: string | null;
  projectUrl: string | null;
  featured: boolean;
};

type Labels = {
  search: string;
  allAuthors: string;
  allVenues: string;
  clear: string;
  noMatch: string;
  count: string;
  prev: string;
  next: string;
  view: string;
  code: string;
  project: string;
  featured: string;
};

const PAGE_SIZE = 10;

export default function PublicationsBrowser({ pubs, labels }: { pubs: Pub[]; labels: Labels }) {
  const [q, setQ] = useState("");
  const [author, setAuthor] = useState("");
  const [venue, setVenue] = useState("");
  const [page, setPage] = useState(1);

  const authors = useMemo(() => {
    const s = new Set<string>();
    for (const p of pubs)
      for (const a of p.authors.split(",").map((x) => x.trim()).filter(Boolean)) s.add(a);
    return [...s].sort((a, b) => a.localeCompare(b));
  }, [pubs]);

  const venues = useMemo(
    () => [...new Set(pubs.map((p) => p.venue).filter(Boolean) as string[])].sort(),
    [pubs],
  );

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const al = author.toLowerCase();
    return pubs.filter((p) => {
      if (author && !p.authors.toLowerCase().includes(al)) return false;
      if (venue && p.venue !== venue) return false;
      if (ql && !(p.title.toLowerCase().includes(ql) || p.authors.toLowerCase().includes(ql)))
        return false;
      return true;
    });
  }, [pubs, q, author, venue]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const cur = Math.min(page, pageCount);
  const slice = filtered.slice((cur - 1) * PAGE_SIZE, cur * PAGE_SIZE);
  const active = q || author || venue;

  const reset = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="sticky top-16 z-20 -mx-4 mb-8 flex flex-wrap items-center gap-3 border-b border-hairline-soft bg-canvas/85 px-4 py-4 backdrop-blur">
        <input
          value={q}
          onChange={(e) => reset(() => setQ(e.target.value))}
          placeholder={labels.search}
          className="input min-w-0 flex-1 sm:max-w-xs"
          aria-label={labels.search}
        />
        <select
          value={author}
          onChange={(e) => reset(() => setAuthor(e.target.value))}
          className="select w-auto"
          aria-label={labels.allAuthors}
        >
          <option value="">{labels.allAuthors}</option>
          {authors.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          value={venue}
          onChange={(e) => reset(() => setVenue(e.target.value))}
          className="select w-auto"
          aria-label={labels.allVenues}
        >
          <option value="">{labels.allVenues}</option>
          {venues.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {active && (
          <button
            onClick={() => reset(() => { setQ(""); setAuthor(""); setVenue(""); })}
            className="btn btn-secondary py-2!"
          >
            {labels.clear}
          </button>
        )}
        <span className="ml-auto text-sm text-steel">
          {filtered.length} {labels.count}
        </span>
      </div>

      {/* Results */}
      <div className="space-y-4">
        {slice.map((p) => (
          <article key={p.id} className="card-feature">
            <div className="flex flex-wrap items-center gap-2">
              {p.featured && <span className="badge badge-orange">{labels.featured}</span>}
              {p.venue && (
                <span className="badge badge-cream">
                  {p.venue}
                  {p.year ? ` ${p.year}` : ""}
                </span>
              )}
            </div>
            <h3 className="mt-3 text-2xl font-medium leading-snug text-ink">
              {p.slug ? (
                <Link href={`/publications/${p.slug}`} className="hover:text-primary">
                  {p.title}
                </Link>
              ) : (
                p.title
              )}
            </h3>
            <p className="mt-1 text-sm text-steel">{p.authors}</p>
            {p.abstract && (
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate line-clamp-3">
                {p.abstract}
              </p>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              {p.slug && (
                <Link className="btn btn-dark" href={`/publications/${p.slug}`}>
                  {labels.view}
                </Link>
              )}
              {p.codeUrl && (
                <a className="btn btn-secondary" href={p.codeUrl} target="_blank" rel="noopener noreferrer">
                  {labels.code}
                </a>
              )}
              {p.projectUrl && (
                <a className="btn btn-secondary" href={p.projectUrl} target="_blank" rel="noopener noreferrer">
                  {labels.project}
                </a>
              )}
            </div>
          </article>
        ))}
        {filtered.length === 0 && <p className="py-12 text-center text-steel">{labels.noMatch}</p>}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={cur === 1}
            className="btn btn-secondary py-2! disabled:opacity-40"
          >
            ← {labels.prev}
          </button>
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`h-9 w-9 rounded-md text-sm font-medium ${
                cur === i + 1 ? "bg-ink text-white" : "text-slate hover:bg-surface"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={cur === pageCount}
            className="btn btn-secondary py-2! disabled:opacity-40"
          >
            {labels.next} →
          </button>
        </div>
      )}
    </div>
  );
}
