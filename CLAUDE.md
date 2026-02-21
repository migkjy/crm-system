# CRM System

## Overview
Integrated CRM MVP for AppPro. Contact management, lead tracking, deal pipeline.

## Tech Stack
- Next.js 15+ (App Router), TypeScript
- Drizzle ORM + @neondatabase/serverless
- shadcn/ui + Tailwind CSS

## DB
- Uses existing neondb CRM tables (crm_contacts, crm_companies, crm_deals, crm_activities, crm_tags, crm_contact_tags)
- App runtime: app_user (DML only)
- No new table creation allowed

## Pages
- `/` - Dashboard (stats overview)
- `/contacts` - Contact list with search/filter
- `/contacts/new` - New lead form
- `/pipeline` - Deal pipeline kanban view

## Deployment
- GitHub: https://github.com/migkjy/crm-system
- Vercel: https://crm-system-alpha-seven.vercel.app
- Env: DATABASE_URL set in Vercel
