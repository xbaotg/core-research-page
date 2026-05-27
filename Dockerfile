# syntax=docker/dockerfile:1

# ── Base ────────────────────────────────────────────────────────────────
FROM node:22-bookworm-slim AS base
WORKDIR /app
# openssl is required by Prisma; ca-certificates for outbound TLS at build.
RUN apt-get update \
  && apt-get install -y --no-install-recommends openssl ca-certificates \
  && rm -rf /var/lib/apt/lists/*

# ── Dependencies (incl. dev — needed to build) ──────────────────────────
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci --include=dev

# ── Build ───────────────────────────────────────────────────────────────
FROM base AS build
# basePath is baked into the client bundle at build time, so it must be set here.
ARG NEXT_PUBLIC_BASE_PATH=
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
ARG NEXT_PUBLIC_SITE_URL=https://core.uit.edu.vn
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate the Prisma client, then build Next.
RUN npx prisma generate && npm run build

# ── Runtime ─────────────────────────────────────────────────────────────
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Carry over everything needed to run `next start`, plus Prisma CLI + seed
# (full node_modules from the build stage already contains the generated client).
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json /app/next.config.ts ./
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh && mkdir -p /app/data
EXPOSE 3000
# entrypoint applies migrations, seeds on first boot, then starts Next.
ENTRYPOINT ["./docker-entrypoint.sh"]
