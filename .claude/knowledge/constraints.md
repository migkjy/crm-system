# Constraints

## Internal Tool Designation
내부 전용 도구 — SEO/마케팅/Lighthouse 최적화 금지

This is an internal-only tool. The following are explicitly prohibited:
- SEO optimization (meta tags, sitemap, robots.txt, structured data)
- Marketing features (analytics, tracking, conversion optimization)
- Lighthouse/performance score optimization
- Public-facing content optimization

## DB Protection Rules
1. App runtime must use `app_user` (no DROP/TRUNCATE/CREATE)
2. `neondb_owner` is for migrations only — never in app code
3. `drizzle-kit push` absolutely prohibited — use `drizzle-kit generate` → review SQL → execute after approval
4. Any migration with DROP TABLE / TRUNCATE → immediate stop + CEO report
5. CRM tables live in shared neondb — do not create tables for other projects

## Deployment Rules
- `vercel deploy` / `vercel --prod` CLI commands prohibited
- Deploy only via Git push to main
- No new Vercel project creation without CEO approval
- Preview deployments are disabled

## General Prohibitions
- No destructive commands (reset, rm -rf, DROP, TRUNCATE, --force-reset) without CEO approval
- No sample/dummy data exceeding 10 records without CEO request
- No .vercel.app link exposure to external users
- No cross-service promotion or ecosystem links
