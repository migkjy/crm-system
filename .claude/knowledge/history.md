# Project History

## Timeline

### 2026-02 — Initial MVP (commit 342a02f)
- CRM MVP created: contacts, pipeline, dashboard
- Tech: Next.js + Drizzle ORM + Neon PostgreSQL + shadcn/ui
- Pages: Dashboard, Contact list, New contact form, Pipeline kanban

### 2026-02 — Bug Fixes
- Fixed SQL query leak in duplicate email error response (e530215)
- Improved duplicate email detection with PostgreSQL error code 23505 (71a3710)
- Used error.cause.code for Neon duplicate email detection (6fe112a)

### 2026-02-26 — Deployment Config
- Added vercel.json to disable preview deployments (1219915)
- Disabled Vercel preview deployments (2dfa356)

### 2026-02 — Documentation
- Added project CLAUDE.md (6059f9d)

## Current State
- MVP functional with basic CRUD for contacts and deal pipeline
- Deployed on Vercel, auto-deploy from main branch
- Preview deployments disabled to conserve Vercel quota
- Total commits: 7
