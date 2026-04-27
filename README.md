# 2026 Senior Engineer Roadmap Tracker

A Next.js 14 fullstack app to track progress across the 2026 Senior Software Engineer Roadmap.
Editorial dark UI, Turso-backed persistence, serverless-friendly.

## What it does

- **Four pillars** (Technical Foundation, Production Architecture, Positioning & Interviews, AI Skills) with all categories, subgroups, and ~150 items pre-seeded.
- **Tap any item to toggle done**. Progress saves instantly via API to a hosted Turso database.
- **Live progress** at every level: per-item, per-category, per-pillar, and overall mastery percentage with an animated ring.
- **Filter by pillar** via the sticky top strip.
- **Reset all** when you want to start a new cycle.

## Stack Outline

- Next.js 14 (App Router) + TypeScript
- React 18 (server + client components)
- Turso / libSQL via `@libsql/client` for hosted persistence
- CSS Modules with a custom design system (Fraunces / Inter Tight / JetBrains Mono)

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Before running locally, set these environment variables in `.env.local`:

```bash
TURSO_DATABASE_URL=libsql://your-database-name-your-org.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

The `progress` table is created and seeded automatically on first request.

## Architecture

```
src/
  app/
    api/
      items/route.ts          GET   all progress
      items/[id]/route.ts     PATCH toggle one item
      reset/route.ts          POST  reset all to undone
    layout.tsx                root layout
    page.tsx                  server component, loads data
    globals.css               design tokens + grain texture
  components/
    Tracker.tsx               client component, all interactivity
    Tracker.module.css        scoped editorial styles
  lib/
    db.ts                     Turso connection + queries + auto-seed
    roadmap-data.ts           full roadmap tree (pillars/categories/items)
```

## Production

```bash
npm run build
npm start
```

## Free Serverless Deployment

This app is now designed to run on a free serverless stack such as Vercel + Turso.

### 1. Create a Turso database

```bash
turso db create roadmap-tracker
turso db show roadmap-tracker --url
turso db tokens create roadmap-tracker
```

Use the printed URL and token for your environment variables.

### 2. Local environment

Create `.env.local`:

```bash
TURSO_DATABASE_URL=libsql://your-database-name-your-org.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

### 3. Deploy to Vercel

- Import the repo into Vercel
- Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` to the project environment variables
- Deploy

The database schema and seed data are created automatically during the app's first request.

## Docker Deployment

Docker still works as an alternative deployment option, but it no longer needs local SQLite storage:

- Next.js runs in a single Docker container
- One instance only
- HTTPS / reverse proxy can be handled by your hosting platform

### Run with Docker Compose

Set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in your shell or in a local `.env` file first, then run:

```bash
docker compose up -d --build
```

The app will be available on `http://localhost:3000`.

To stop the app without deleting data:

```bash
docker compose down
```

### Run Without Compose

```bash
docker build -t roadmap-tracker .
docker run -d \
  --name roadmap-tracker \
  -p 3000:3000 \
  -e TURSO_DATABASE_URL=libsql://your-database-name-your-org.turso.io \
  -e TURSO_AUTH_TOKEN=your-turso-auth-token \
  -e NODE_ENV=production \
  -e HOSTNAME=0.0.0.0 \
  -e PORT=3000 \
  roadmap-tracker
```

### Deployment Notes 

- Add `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in every environment.
- Put a reverse proxy or managed HTTPS layer in front if you expose it publicly.
