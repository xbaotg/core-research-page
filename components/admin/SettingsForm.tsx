"use client";

import { useState } from "react";
import { api } from "@/lib/basePath";

type FieldDef = { name: string; label: string; type?: "text" | "textarea"; hint?: string };

const GROUPS: { title: string; fields: FieldDef[] }[] = [
  {
    title: "Identity",
    fields: [
      { name: "labName", label: "Short name", hint: "Used in the logo, e.g. CORE" },
      { name: "labFullName", label: "Full name" },
      { name: "focus", label: "Research focus" },
      { name: "since", label: "Active since" },
    ],
  },
  {
    title: "Hero",
    fields: [
      { name: "heroKicker", label: "Hero kicker (small label)" },
      { name: "heroTitle", label: "Hero title", type: "textarea", hint: "Each new line becomes a new line in the headline." },
      { name: "heroSubtitle", label: "Hero subtitle", type: "textarea" },
    ],
  },
  {
    title: "About & contact",
    fields: [
      { name: "about", label: "About paragraph", type: "textarea" },
      { name: "affiliation", label: "Affiliation" },
      { name: "email", label: "Contact email" },
      { name: "location", label: "Location" },
      { name: "address", label: "Address", type: "textarea" },
    ],
  },
  {
    title: "Footer & links",
    fields: [
      { name: "footerNote", label: "Footer note", type: "textarea" },
      { name: "linkScholar", label: "Google Scholar URL" },
      { name: "linkGithub", label: "GitHub URL" },
      { name: "linkX", label: "X / Twitter URL" },
    ],
  },
  {
    title: "Vietnamese (Tiếng Việt) — shown when site language is VI; blank falls back to English",
    fields: [
      { name: "heroTitle_vi", label: "Hero title (VI)", type: "textarea", hint: "Each new line becomes a new line in the headline." },
      { name: "heroSubtitle_vi", label: "Hero subtitle (VI)", type: "textarea" },
      { name: "about_vi", label: "About paragraph (VI)", type: "textarea" },
      { name: "focus_vi", label: "Research focus (VI)" },
      { name: "affiliation_vi", label: "Affiliation (VI)" },
      { name: "location_vi", label: "Location (VI)" },
      { name: "footerNote_vi", label: "Footer note (VI)", type: "textarea" },
    ],
  },
];

export default function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function set(name: string, v: string) {
    setValues((s) => ({ ...s, [name]: v }));
    setSaved(false);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch(api("/api/admin/settings"), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setBusy(false);
    if (res.ok) setSaved(true);
    else setError("Save failed.");
  }

  return (
    <form onSubmit={save} className="space-y-8">
      {GROUPS.map((g) => (
        <section key={g.title} className="card-feature">
          <h2 className="mb-4 text-lg font-medium text-ink">{g.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {g.fields.map((f) => (
              <div key={f.name} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                <label className="field-label" htmlFor={f.name}>
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    id={f.name}
                    className="textarea"
                    value={values[f.name] ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                ) : (
                  <input
                    id={f.name}
                    className="input"
                    value={values[f.name] ?? ""}
                    onChange={(e) => set(f.name, e.target.value)}
                  />
                )}
                {f.hint && <p className="mt-1 text-xs text-stone">{f.hint}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="sticky bottom-4 flex items-center gap-4 rounded-lg border border-hairline bg-canvas/95 p-4 shadow-[0_4px_12px_rgba(0,0,0,0.06)] backdrop-blur">
        <button type="submit" className="btn btn-primary" disabled={busy}>
          {busy ? "Saving…" : "Save settings"}
        </button>
        {saved && <span className="text-sm text-steel">Saved ✓</span>}
        {error && <span className="text-sm text-primary-deep">{error}</span>}
      </div>
    </form>
  );
}
