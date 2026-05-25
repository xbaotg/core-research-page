"use client";

import { useState } from "react";
import { getDict, type Locale } from "@/lib/dict";

export default function ContactForm({
  email,
  locale = "en",
}: {
  email: string;
  locale?: Locale;
}) {
  const t = getDict(locale);
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = `From: ${name} <${from}>\n\n${message}`;
    const href = `mailto:${email}?subject=${encodeURIComponent(
      subject || "CORE Lab enquiry"
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-lg border border-beige-deep bg-cream p-8"
    >
      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="field-label" htmlFor="name">
              {t.fName}
            </label>
            <input
              id="name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="field-label" htmlFor="from">
              {t.fYourEmail}
            </label>
            <input
              id="from"
              type="email"
              className="input"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="field-label" htmlFor="subject">
            {t.fSubject}
          </label>
          <input
            id="subject"
            className="input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="message">
            {t.fMessage}
          </label>
          <textarea
            id="message"
            className="textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-dark w-full">
          {t.fSend}
        </button>
        <p className="text-xs text-steel">
          {t.fNotePre}
          {email}.
        </p>
      </div>
    </form>
  );
}
