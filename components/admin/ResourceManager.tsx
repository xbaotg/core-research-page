"use client";

import { useState, useRef, useEffect } from "react";
import { api } from "@/lib/basePath";

/* eslint-disable @typescript-eslint/no-explicit-any */

type FieldType = "text" | "textarea" | "number" | "checkbox" | "date" | "select" | "color";
type Field = {
  name: string;
  label: string;
  type?: FieldType;
  options?: { value: string; label: string }[];
  placeholder?: string;
  full?: boolean;
};
type Cfg = {
  singular: string;
  fields: Field[];
  toForm?: (rec: any) => Record<string, any>;
  toApi?: (form: Record<string, any>) => Record<string, any>;
  summary: (rec: any) => { title: string; sub?: string };
};

const dstr = (v: any) => {
  if (!v) return "";
  const d = new Date(v);
  return isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
};

function parseLinks(raw: any) {
  if (!raw) return {};
  try {
    return typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch {
    return {};
  }
}

const CONFIG: Record<string, Cfg> = {
  members: {
    singular: "person",
    fields: [
      { name: "name", label: "Name" },
      { name: "title", label: "Title (Dr., MSc…)" },
      { name: "role", label: "Role / focus", full: true },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: [
          { value: "faculty", label: "Faculty & Advisors" },
          { value: "member", label: "Research Members" },
          { value: "student", label: "Students" },
          { value: "alumni", label: "Alumni" },
        ],
      },
      { name: "order", label: "Sort order", type: "number" },
      { name: "affiliation", label: "Affiliation", full: true },
      { name: "email", label: "Email" },
      { name: "photo", label: "Photo URL" },
      { name: "bio", label: "Bio", type: "textarea", full: true },
      { name: "scholar", label: "Google Scholar URL" },
      { name: "homepage", label: "Homepage URL" },
      { name: "github", label: "GitHub URL" },
      { name: "linkedin", label: "LinkedIn URL" },
    ],
    toForm: (r) => ({
      ...r,
      ...parseLinks(r.links),
    }),
    toApi: (f) => {
      const { scholar, homepage, github, linkedin, ...rest } = f;
      return {
        ...rest,
        links: JSON.stringify({ scholar, homepage, github, linkedin }),
      };
    },
    summary: (r) => ({ title: `${r.title ? r.title + " " : ""}${r.name}`, sub: r.role }),
  },

  publications: {
    singular: "publication",
    fields: [
      { name: "title", label: "Title", full: true },
      { name: "authors", label: "Authors", full: true },
      { name: "venue", label: "Venue short (e.g. CVPR)" },
      { name: "year", label: "Year", type: "number" },
      { name: "venueDetail", label: "Venue detail / status", full: true, placeholder: "e.g. Multimedia Systems (Springer) · Journal article" },
      { name: "slug", label: "URL slug (blank = auto from title)", full: true },
      { name: "featured", label: "Featured" , type: "checkbox" },
      { name: "order", label: "Sort order", type: "number" },
      { name: "abstract", label: "Abstract", type: "textarea", full: true },
      { name: "overview", label: "Overview (blank line = new paragraph)", type: "textarea", full: true },
      { name: "results", label: "Results (blank line = new paragraph)", type: "textarea", full: true },
      { name: "highlights", label: "Highlights — one bullet per line", type: "textarea", full: true },
      {
        name: "figures",
        label: "Figures — one per line:  /figures/foo.png | Caption text",
        type: "textarea",
        full: true,
        placeholder: "/figures/ivr/fig1-architecture.png | System architecture overview.",
      },
      { name: "pdfUrl", label: "PDF URL (leave blank to keep private)" },
      { name: "codeUrl", label: "Code URL" },
      { name: "projectUrl", label: "Project page URL" },
      { name: "image", label: "Card image URL" },
    ],
    toForm: (r) => ({
      ...r,
      figures: (() => {
        try {
          const arr = JSON.parse(r.figures || "[]");
          return (Array.isArray(arr) ? arr : [])
            .map((f: any) => `${f.src} | ${f.caption || ""}`)
            .join("\n");
        } catch {
          return "";
        }
      })(),
    }),
    toApi: (f) => {
      const figs = String(f.figures || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const i = line.indexOf("|");
          if (i === -1) return { src: line.trim(), caption: "" };
          return { src: line.slice(0, i).trim(), caption: line.slice(i + 1).trim() };
        })
        .filter((x) => x.src);
      return { ...f, figures: JSON.stringify(figs) };
    },
    summary: (r) => ({
      title: r.title,
      sub: [r.authors, r.venue && `${r.venue}${r.year ? " " + r.year : ""}`]
        .filter(Boolean)
        .join(" · "),
    }),
  },

  conferences: {
    singular: "conference",
    fields: [
      { name: "name", label: "Short name (CVPR)" },
      { name: "color", label: "Accent color", type: "color" },
      { name: "fullName", label: "Full name", full: true },
      { name: "location", label: "Location" },
      { name: "url", label: "Website URL" },
      { name: "deadline", label: "Paper deadline", type: "date" },
      { name: "startDate", label: "Start date", type: "date" },
      { name: "endDate", label: "End date", type: "date" },
      { name: "tags", label: "Tags (comma separated)", full: true },
      { name: "order", label: "Sort order", type: "number" },
    ],
    toForm: (r) => ({
      ...r,
      deadline: dstr(r.deadline),
      startDate: dstr(r.startDate),
      endDate: dstr(r.endDate),
      color: r.color || "#fa520f",
    }),
    summary: (r) => ({ title: r.name, sub: r.location }),
  },

  awards: {
    singular: "award",
    fields: [
      { name: "title", label: "Title (competition)", full: true },
      { name: "event", label: "Event / host line (e.g. MMM 2025 · Japan)", full: true },
      { name: "prize", label: "Prize (e.g. First Prize)" },
      {
        name: "rank",
        label: "Medal tier",
        type: "select",
        options: [
          { value: "1", label: "🥇 Gold (1st)" },
          { value: "2", label: "🥈 Silver (2nd)" },
          { value: "3", label: "🥉 Bronze (3rd)" },
          { value: "0", label: "Other / honorable" },
        ],
      },
      { name: "year", label: "Year", type: "number" },
      { name: "order", label: "Sort order", type: "number" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "image", label: "Image URL (e.g. /prizes/vbs-2025.png)", full: true },
      { name: "link", label: "Link URL" },
    ],
    summary: (r) => ({
      title: r.title,
      sub: [r.prize, r.year].filter(Boolean).join(" · "),
    }),
  },

  datasets: {
    singular: "dataset",
    fields: [
      { name: "name", label: "Name", full: true },
      { name: "slug", label: "URL slug (blank = auto from name)", full: true },
      { name: "tagline", label: "Tagline", full: true },
      { name: "modality", label: "Modality (e.g. Image + Text)" },
      { name: "task", label: "Task" },
      { name: "year", label: "Year", type: "number" },
      { name: "featured", label: "Featured", type: "checkbox" },
      { name: "order", label: "Sort order", type: "number" },
      { name: "description", label: "Description", type: "textarea", full: true },
      { name: "license", label: "License & access", type: "textarea", full: true },
      {
        name: "stats",
        label: 'Stats — JSON array of { label, value }',
        type: "textarea",
        full: true,
        placeholder: '[{"label":"Images","value":"2,104"},{"label":"Text instances","value":"79,849"}]',
      },
      {
        name: "samples",
        label: 'Samples — JSON array of { src, caption, texts[] }',
        type: "textarea",
        full: true,
        placeholder: '[{"src":"/datasets/foo/1.jpg","caption":"...","texts":["text 1","text 2"]}]',
      },
      { name: "driveUrl", label: "Explore / download URL" },
      { name: "paperUrl", label: "Paper URL" },
      { name: "codeUrl", label: "Code URL" },
    ],
    summary: (r) => ({
      title: r.name,
      sub: [r.modality, r.task, r.year].filter(Boolean).join(" · "),
    }),
  },

  news: {
    singular: "news item",
    fields: [
      { name: "title", label: "Title", full: true },
      { name: "date", label: "Date", type: "date" },
      { name: "body", label: "Body", type: "textarea", full: true },
      { name: "link", label: "Link URL" },
    ],
    toForm: (r) => ({ ...r, date: dstr(r.date) }),
    summary: (r) => ({ title: r.title, sub: dstr(r.date) }),
  },
};

function emptyForm(cfg: Cfg, order: number): Record<string, any> {
  const f: Record<string, any> = {};
  for (const fl of cfg.fields) {
    if (fl.type === "checkbox") f[fl.name] = false;
    else if (fl.name === "order") f[fl.name] = order;
    else if (fl.type === "color") f[fl.name] = "#fa520f";
    else f[fl.name] = "";
  }
  if (cfg.singular === "person") f.category = "member";
  return f;
}

export default function ResourceManager({
  resourceKey,
  initial,
}: {
  resourceKey: string;
  initial: any[];
}) {
  const cfg = CONFIG[resourceKey];
  const [items, setItems] = useState<any[]>(initial);
  const [editing, setEditing] = useState<number | "new" | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // The edit/new form renders above a potentially long list — bring it into
  // view when it opens, otherwise editing a lower item looks like a no-op.
  useEffect(() => {
    if (editing !== null) {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editing]);

  function openNew() {
    setForm(emptyForm(cfg, items.length));
    setEditing("new");
    setError("");
  }
  function openEdit(rec: any) {
    setForm(cfg.toForm ? cfg.toForm(rec) : { ...rec });
    setEditing(rec.id);
    setError("");
  }
  function close() {
    setEditing(null);
    setForm({});
  }
  function setField(name: string, value: any) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const body = cfg.toApi ? cfg.toApi(form) : form;
    const isNew = editing === "new";
    const url = isNew
      ? api(`/api/admin/${resourceKey}`)
      : api(`/api/admin/${resourceKey}/${editing}`);
    const res = await fetch(url, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setBusy(false);
    if (!res.ok) {
      setError("Save failed. Check the fields and try again.");
      return;
    }
    const saved = await res.json();
    setItems((list) => {
      if (isNew) return [...list, saved];
      return list.map((it) => (it.id === saved.id ? saved : it));
    });
    close();
  }

  async function remove(id: number) {
    if (!confirm(`Delete this ${cfg.singular}? This cannot be undone.`)) return;
    const res = await fetch(api(`/api/admin/${resourceKey}/${id}`), { method: "DELETE" });
    if (res.ok) setItems((list) => list.filter((it) => it.id !== id));
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-steel">
          {items.length} {items.length === 1 ? cfg.singular : cfg.singular + "s"}
        </p>
        {editing === null && (
          <button onClick={openNew} className="btn btn-primary">
            + Add {cfg.singular}
          </button>
        )}
      </div>

      {editing !== null && (
        <form ref={formRef} onSubmit={save} className="card-feature mb-8">
          <h2 className="mb-4 text-lg font-medium text-ink">
            {editing === "new" ? `New ${cfg.singular}` : `Edit ${cfg.singular}`}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cfg.fields.map((fl) => (
              <div key={fl.name} className={fl.full ? "sm:col-span-2" : ""}>
                {fl.type !== "checkbox" && (
                  <label className="field-label" htmlFor={fl.name}>
                    {fl.label}
                  </label>
                )}
                {fl.type === "textarea" ? (
                  <textarea
                    id={fl.name}
                    className="textarea"
                    value={form[fl.name] ?? ""}
                    placeholder={fl.placeholder}
                    onChange={(e) => setField(fl.name, e.target.value)}
                  />
                ) : fl.type === "select" ? (
                  <select
                    id={fl.name}
                    className="select"
                    value={form[fl.name] ?? ""}
                    onChange={(e) => setField(fl.name, e.target.value)}
                  >
                    {fl.options?.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                ) : fl.type === "checkbox" ? (
                  <label className="mt-6 flex items-center gap-2 text-sm font-medium text-ink">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-[var(--color-primary)]"
                      checked={!!form[fl.name]}
                      onChange={(e) => setField(fl.name, e.target.checked)}
                    />
                    {fl.label}
                  </label>
                ) : fl.type === "color" ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      className="h-11 w-14 rounded-md border border-hairline-strong"
                      value={form[fl.name] || "#fa520f"}
                      onChange={(e) => setField(fl.name, e.target.value)}
                    />
                    <input
                      className="input"
                      value={form[fl.name] ?? ""}
                      onChange={(e) => setField(fl.name, e.target.value)}
                    />
                  </div>
                ) : (
                  <input
                    id={fl.name}
                    type={fl.type === "number" ? "number" : fl.type === "date" ? "date" : "text"}
                    className="input"
                    value={form[fl.name] ?? ""}
                    placeholder={fl.placeholder}
                    onChange={(e) => setField(fl.name, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          {error && <p className="mt-4 text-sm text-primary-deep">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button type="submit" className="btn btn-dark" disabled={busy}>
              {busy ? "Saving…" : "Save"}
            </button>
            <button type="button" onClick={close} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      <ul className="space-y-3">
        {items.map((it) => {
          const s = cfg.summary(it);
          return (
            <li
              key={it.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-hairline-soft bg-canvas px-4 py-3"
            >
              <div className="min-w-0">
                <div className="truncate font-medium text-ink">{s.title}</div>
                {s.sub && <div className="truncate text-sm text-steel">{s.sub}</div>}
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => openEdit(it)} className="btn btn-secondary py-1.5!">
                  Edit
                </button>
                <button
                  onClick={() => remove(it.id)}
                  className="btn btn-secondary py-1.5! text-primary-deep!"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
        {items.length === 0 && (
          <li className="rounded-lg border border-dashed border-hairline px-4 py-8 text-center text-steel">
            Nothing yet. Click “Add {cfg.singular}”.
          </li>
        )}
      </ul>
    </div>
  );
}
