# CORE Lab — website

Research-group site for **CORE Lab** (Computer Vision & Retrieval), University of
Information Technology, VNU-HCM. Public pages + an admin panel that manages all
content, plus a live conference-deadline countdown.

Built with **Next.js 16** (App Router), **Prisma + SQLite**, **Tailwind v4**.
Visual design follows `DESIGN.md` (Mistral AI sunset system).

## Stack & structure

```
app/(site)/        public pages — home, people, publications, conferences, contact
app/admin/         admin dashboard + per-resource managers + login
app/api/           auth + CRUD API routes
components/        Nav, Footer, Countdown, ConferenceCard, admin UI
lib/               prisma client, auth (cookie/HMAC), data helpers, resource config
prisma/            schema.prisma, migrations, seed.mjs, dev.db (SQLite)
```

## First-time setup (fresh clone)

`.env` and the SQLite db are gitignored, so after cloning:

```bash
npm install
cp .env.example .env          # then edit ADMIN_PASSWORD + AUTH_SECRET
npx prisma migrate deploy     # create the database schema
npm run seed                  # load CORE Lab content (members, paper, conferences)
```

> Member photos and paper figures live in `public/` and are committed. The raw
> manuscript PDFs in `/publications` are **not** committed (kept private).

## Run

```bash
PORT=5002 npm run dev   # http://localhost:5002/core
```

**Base path:** the site is served under `/core` (set by `NEXT_PUBLIC_BASE_PATH` in `.env`).
Open **http://localhost:5002/core** — the bare root `/` returns 404 by design. To serve at
root instead, set `NEXT_PUBLIC_BASE_PATH=""` and rebuild.

Database is already migrated and seeded. To reset + reseed:

```bash
npm run db:reset
```

## Admin

- URL: **/admin** (sign in at `/admin/login`)
- Password: env var `ADMIN_PASSWORD` (default `core-admin` — **change it**)
- Session: signed HTTP-only cookie (HMAC with `AUTH_SECRET`)

From the admin you can manage:
- **People** — faculty/advisors, members, students, alumni (bio, photo URL, links)
- **Publications** — title, authors, venue, year, abstract, PDF/code/project links, featured
- **Conferences** — name, deadline + dates (drive the countdowns), location, accent color
- **News** — dated entries shown on the home page
- **Site settings** — hero text, about, contact, footer, social links

Edit `.env` to change `ADMIN_PASSWORD` and `AUTH_SECRET` before deploying.

## Conference countdown

Each conference has an optional `deadline` and `startDate`. The countdown targets
the **soonest future date** (deadline first, then start). The home hero shows the
single nearest target; `/conferences` shows a big animated countdown plus per-card
mini countdowns. Seeded with CVPR, WACV, ACM MM, NeurIPS, ICCV, AAAI.

## Notes

- The display typeface is **Fraunces** (free, via next/font) standing in for the
  commercial *PP Editorial Old* named in `DESIGN.md`. Swap in the real face by
  changing `app/layout.tsx` + `--font-display` in `app/globals.css`.
- Member/advisor bios are seeded as placeholders ("edit in admin") — fill them in
  from the People manager.
- Public pages are `force-dynamic`, so admin edits appear on next page load.
