#!/bin/sh
set -e

# DB lives on a mounted volume (see docker-compose.yml: DATABASE_URL=file:/app/data/app.db).
DB_FILE="/app/data/app.db"

# Was the database missing before this boot? (migrate deploy creates it, so check first.)
FRESH=false
[ -f "$DB_FILE" ] || FRESH=true

echo "[entrypoint] Applying migrations..."
npx prisma migrate deploy

# Seed on first boot, or whenever SEED_ON_START=true is set explicitly.
# (Seeding wipes + recreates rows, so it is NOT run on every restart by default —
#  this preserves any edits made through the admin panel.)
if [ "$FRESH" = "true" ] || [ "$SEED_ON_START" = "true" ]; then
  echo "[entrypoint] Seeding database (full)..."
  node prisma/seed.mjs
else
  # Existing DB: don't wipe admin-managed content, but make sure published
  # datasets are present (idempotent create-if-missing).
  echo "[entrypoint] Existing database — ensuring datasets exist (no wipe)..."
  node prisma/ensure-datasets.mjs
fi

echo "[entrypoint] Starting Next.js on 0.0.0.0:3000 ..."
exec npm run start -- -p 3000 -H 0.0.0.0
