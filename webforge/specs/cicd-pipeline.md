# CI/CD Pipeline Specification

> Push to git → auto deploy. Preview per PR. Quality gate before production.

---

## Discovery Questions

```
Hosting:
- [ ] Vercel (ONERILEN Next.js icin — CI/CD dahil)
- [ ] Netlify
- [ ] AWS Amplify
- [ ] Self-hosted (Docker)
- [ ] Diger: ___

CI/CD:
- [ ] Vercel auto-deploy (git push → deploy — en basit)
- [ ] GitHub Actions (ozel pipeline)
- [ ] GitLab CI
- [ ] Ikisi birden (GitHub Actions → Vercel deploy)

Preview deployments:
- [x] PR acildiginda otomatik preview URL (ONERILEN)
- [ ] Sadece main branch deploy olsun
```

---

## Option A: Vercel (Recommended — Zero Config)

Vercel kullaniliyorsa CI/CD zaten dahil:
```
git push main     → Production deploy (otomatik)
git push branch   → Preview deploy (otomatik)
PR acildiginda    → Preview URL PR'a yorum olarak eklenir
```

Ekstra config gerekmez. Sadece Vercel'e repo bagla.

### Vercel Environment Variables
```
Production:  Vercel dashboard → Settings → Environment Variables
Preview:     Ayni yerden, "Preview" scope ile
Development: .env.local (git-ignored)
```

---

## Option B: GitHub Actions (Custom Pipeline)

### Full Pipeline: Lint → Type Check → Build → Test → Deploy

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  quality:
    name: Quality Gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: https://site.com
          NEXT_PUBLIC_GA_ID: ${{ secrets.GA_ID }}

      # Accessibility audit (optional — if Playwright setup exists)
      # - name: Accessibility audit
      #   run: npx playwright test --project=a11y

  deploy-preview:
    name: Preview Deploy
    needs: quality
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          github-comment: true    # PR'a preview URL yazar

  deploy-production:
    name: Production Deploy
    needs: quality
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      # Notify Sentry of new release
      - name: Sentry Release
        uses: getsentry/action-release@v1
        env:
          SENTRY_AUTH_TOKEN: ${{ secrets.SENTRY_AUTH_TOKEN }}
          SENTRY_ORG: ${{ secrets.SENTRY_ORG }}
          SENTRY_PROJECT: ${{ secrets.SENTRY_PROJECT }}
        with:
          environment: production
```

### Lighthouse CI (Optional — Performance Gate)

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci && npm run build

      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v11
        with:
          uploadArtifacts: true
          budgetPath: '.github/lighthouse-budget.json'

# .github/lighthouse-budget.json
[
  {
    "path": "/",
    "timings": [{ "metric": "largest-contentful-paint", "budget": 2500 }],
    "resourceSizes": [{ "resourceType": "total", "budget": 500 }],
    "resourceCounts": [{ "resourceType": "third-party", "budget": 5 }]
  }
]
```

---

## Option C: Docker (Self-Hosted)

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - NEXT_PUBLIC_SITE_URL=${SITE_URL}
    restart: unless-stopped
```

---

## Branch Strategy

```
main         → Production (auto-deploy)
develop      → Staging (optional preview environment)
feature/*    → Feature branches (PR → preview deploy)
hotfix/*     → Urgent fixes (PR → fast-track to main)
```

### Commit Convention
```
feat: add contact form
fix: resolve dark mode FOUC
docs: update README
style: adjust header spacing
refactor: extract email service
test: add a11y tests for blog
chore: update dependencies
perf: optimize hero image loading
```

---

## Secrets Management

```
GitHub Secrets (Settings → Secrets → Actions):
├── VERCEL_TOKEN
├── VERCEL_ORG_ID
├── VERCEL_PROJECT_ID
├── SENTRY_AUTH_TOKEN
├── SENTRY_ORG
├── SENTRY_PROJECT
├── GA_ID
└── (other API keys)

NEVER in code. NEVER in .env committed to git.
```
