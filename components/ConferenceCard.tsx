import { MiniCountdown } from "./Countdown";
import { fmtDate, fmtRange } from "@/lib/format";
import { nextDate } from "@/lib/data";
import { getDict, type Locale } from "@/lib/dict";

type Conf = {
  id: number;
  name: string;
  fullName: string | null;
  location: string | null;
  deadline: Date | null;
  startDate: Date | null;
  endDate: Date | null;
  url: string | null;
  tags: string | null;
  color: string | null;
};

export default function ConferenceCard({
  conf,
  locale = "en",
}: {
  conf: Conf;
  locale?: Locale;
}) {
  const { date, kind } = nextDate(conf);
  const t = getDict(locale);
  const accent = conf.color || "#fa520f";
  const tags = (conf.tags || "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="card-feature glow relative overflow-hidden">
      <span
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: accent }}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl text-ink">{conf.name}</span>
            {conf.location && (
              <span className="badge badge-cream">{conf.location}</span>
            )}
          </div>
          {conf.fullName && (
            <p className="mt-1 max-w-md text-sm leading-snug text-steel">
              {conf.fullName}
            </p>
          )}
        </div>
        {conf.url && (
          <a
            href={conf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-link hover:underline"
          >
            {t.visit}
          </a>
        )}
      </div>

      <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <div className="eyebrow mb-0.5">{t.paperDeadline}</div>
          <div className="font-medium text-ink">
            {conf.deadline ? fmtDate(conf.deadline) : t.tba}
          </div>
        </div>
        <div>
          <div className="eyebrow mb-0.5">{t.conference}</div>
          <div className="font-medium text-ink">
            {conf.startDate ? fmtRange(conf.startDate, conf.endDate) : t.tba}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between rounded-md bg-cream px-4 py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-steel">
          {kind === "deadline" ? t.untilDeadline : t.untilStart}
        </span>
        {date ? (
          <MiniCountdown iso={date.toISOString()} locale={locale} />
        ) : (
          <span className="text-sm text-steel">{t.tba}</span>
        )}
      </div>

      {tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-hairline px-2.5 py-0.5 text-xs text-steel"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
