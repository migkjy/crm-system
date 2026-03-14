# Architecture

## Tech Stack
- **Next.js 16.1.6** (App Router) — React 19.2.3
- **TypeScript 5** — strict mode
- **Drizzle ORM 0.45.1** + @neondatabase/serverless 1.0.2
- **UI**: shadcn/ui (Radix UI 1.4.3) + Tailwind CSS 4 + Lucide React
- **Styling utils**: clsx, tailwind-merge, class-variance-authority, tw-animate-css

## Directory Structure
```
src/
├── app/
│   ├── api/            # API routes
│   ├── contacts/       # Contact list + new contact form
│   ├── pipeline/       # Deal pipeline kanban
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Dashboard
│   └── globals.css
├── components/         # Shared UI components (shadcn/ui)
├── db/
│   ├── index.ts        # DB connection (Neon serverless)
│   └── schema.ts       # Drizzle schema definitions
└── lib/                # Utility functions
```

## Database
- **Provider**: Neon PostgreSQL (serverless driver, connection pooling)
- **Host**: ap-southeast-1.aws.neon.tech
- **Database**: neondb (shared, CRM tables prefixed with `crm_`)
- **Tables**: crm_contacts, crm_companies, crm_deals, crm_activities, crm_tags, crm_contact_tags
- **Runtime user**: app_user (SELECT/INSERT/UPDATE/DELETE only)

## Deployment
- **Platform**: Vercel (auto-deploy on push to main)
- **URL**: https://crm-system-alpha-seven.vercel.app
- **Env vars**: DATABASE_URL set in Vercel dashboard
- **Preview deploys**: Disabled (vercel.json)

## Config Files
- `components.json` — shadcn/ui configuration
- `vercel.json` — Preview deployment disabled
- `postcss.config.mjs` — Tailwind PostCSS plugin
- `eslint.config.mjs` — ESLint with next config
