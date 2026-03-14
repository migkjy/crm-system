# CRM System — PL Session Guide

## Overview
Internal CRM MVP for AppPro. Contact management, lead tracking, deal pipeline dashboard.

## Tech Stack
- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5
- **ORM/DB**: Drizzle ORM + @neondatabase/serverless → NeonDB (PostgreSQL)
- **UI**: shadcn/ui (Radix UI) + Tailwind CSS 4 + Lucide icons
- **Deployment**: Vercel (Git push only, CLI deploy 금지)

## Key Routes
| Route | Purpose |
|-------|---------|
| `/` | Dashboard (stats overview) |
| `/contacts` | Contact list (search/filter) |
| `/contacts/new` | New lead form |
| `/pipeline` | Deal pipeline kanban |

## DB Rules
- Runtime: `app_user` only (DML only, no DDL)
- Tables: crm_contacts, crm_companies, crm_deals, crm_activities, crm_tags, crm_contact_tags
- `drizzle-kit push` 절대 금지 — generate → SQL 확인 → 승인 후 실행
- DROP TABLE / TRUNCATE 발견 시 즉시 중단 + CEO 보고

## Deployment
- GitHub: migkjy/crm-system
- Vercel: https://crm-system-alpha-seven.vercel.app
- Branch: main (단일 브랜치)
- `vercel deploy` / `vercel --prod` 절대 금지 → Git push만

## Session Protocol
- 자비스 회신: `scripts/project-reply.sh "메시지" "crm-system"`
- 세션 시작 시: `.claude/knowledge/` 하위 파일 읽기
- 세션 종료 전: learnings.md 업데이트 + git commit & push
- 내부 전용 도구 — SEO/마케팅/Lighthouse 최적화 금지

## Commands
```bash
npm run dev    # 개발 서버
npm run build  # 프로덕션 빌드
npm run lint   # ESLint
```
