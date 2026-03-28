# Implementation Order

## Phase 1: Foundation (Sequential — dependencies exist)

Each step depends on the previous one.

### 1.1 Project Scaffolding
```bash
npx create-next-app@latest project-name --typescript --tailwind --eslint --app --src-dir
cd project-name
npm install
```

### 1.2 Install Core Dependencies
```bash
# UI Library (shadcn/ui)
npx shadcn@latest init

# Theme
npm install next-themes

# i18n (if multi-language)
npm install next-intl

# Icons
npm install lucide-react

# Form handling
npm install react-hook-form @hookform/resolvers zod

# SEO
# (built into Next.js — no extra package needed)
```

### 1.3 Design Tokens & Theme System
1. Define CSS custom properties in `globals.css` (light + dark)
2. Configure `tailwind.config.ts` to use CSS variables
3. Create `ThemeProvider` component (wraps next-themes)
4. Add FOUC prevention script to root layout
5. Create `ThemeToggle` component

### 1.4 Base Layout
1. Create root layout (`src/app/layout.tsx`)
   - ThemeProvider
   - i18n Provider (if applicable)
   - Cookie Consent Provider
   - Analytics scripts (consent-aware)
   - Global JSON-LD (Organization)
2. Create `Header` component (responsive, mobile menu, nav links)
3. Create `Footer` component (links, legal, social, cookie preferences link)
4. Add skip navigation link (first element in body)
5. Create `Breadcrumb` component

### 1.5 Accessibility Foundation
1. Install shadcn/ui base components (Button, Dialog, Sheet, etc.)
2. Configure ESLint a11y rules (`eslint-plugin-jsx-a11y`)
3. Set up focus-visible styles
4. Verify keyboard navigation works on base components

### 1.6 i18n Setup (if multi-language)
1. Configure next-intl (middleware, routing)
2. Create message files (`messages/tr.json`, `messages/en.json`)
3. Create language switcher component
4. Set up locale-based routing

---

## Phase 2: Infrastructure (Parallel — independent systems)

All Phase 2 tasks can run in PARALLEL:

### 2.1 Cookie Consent (infra-engineer)
- Cookie banner component
- Preferences modal component
- Consent state management
- Google Consent Mode v2 integration
- Footer re-access link

### 2.2 Security Headers (infra-engineer)
- middleware.ts or next.config.js headers
- CSP, HSTS, COOP, CORP, etc.
- .env.example template

### 2.3 SEO Foundation (seo-engineer)
- `generateMetadata` utility function
- JSON-LD component library (Organization, WebSite, BreadcrumbList)
- robots.txt (including AI bot rules)
- sitemap.ts (dynamic generation)
- Default OG image

### 2.4 Analytics Setup (infra-engineer)
- GA4 integration (consent-aware)
- GTM setup (consent-aware)
- Clarity integration (consent-aware)
- Event tracking utilities
- UTM capture

### 2.5 Error Pages (frontend-dev)
- Custom 404 page (with search/suggestions)
- Custom 500 page
- Error boundary component

---

## Phase 3: Content & Pages (Parallel per page)

Each page can be built in PARALLEL:

### Per Page Checklist
1. Create page component (`src/app/[locale]/page-name/page.tsx`)
2. Add `generateMetadata` export (unique title + description)
3. Add JSON-LD (page-specific schema)
4. Add breadcrumb data
5. Create page-specific components
6. Add translations (if i18n)
7. Test accessibility (keyboard + axe-core)
8. Test responsive (mobile, tablet, desktop)
9. Test both themes (light + dark)

### Page Priority Order
1. Homepage (highest traffic, most complex)
2. Legal pages (required for cookie consent links)
3. Contact page (form + API route)
4. About page
5. FAQ page (FAQ Schema for GEO)
6. Other content pages
7. Blog (if applicable)

---

## Phase 4: AI & Advanced SEO (Parallel)

### 4.1 GEO Files (seo-engineer)
- Create `public/llms.txt`
- Create `public/llms-full.txt`

### 4.2 Enhanced Structured Data (seo-engineer)
- FAQ Schema on FAQ page
- HowTo Schema where applicable
- LocalBusiness Schema (if physical location)
- Article Schema (if blog)

### 4.3 OG Images (seo-engineer or frontend-dev)
- Default OG image (1200x630)
- Dynamic OG generation API route (optional)
- Per-page static OG images (optional)

### 4.4 HTML Sitemap (frontend-dev)
- `/sitemap` page with all links organized by category

### 4.5 Blog System (if enabled — frontend-dev + seo-sem-expert)
- Set up MDX infrastructure (`content/blog/`, compiler config)
- Blog index, post page, category, tag, author, archive routes
- RSS + Atom + JSON Feed generation
- Blog search (Fuse.js)
- Import CLI tools (WordPress XML parser)
- Article JSON-LD per post
- See: `specs/blog-system.md`

### 4.6 Email System (if contact form — backend-dev + infra-engineer)
- Email service abstraction (Resend/SendGrid/SMTP)
- Contact form API route
- Email templates (notification + confirmation)
- See: `specs/email-system.md`

---

## Phase 4.5: DevOps & Monitoring (Parallel with Phase 4)

### 4.7 Error Monitoring (infra-engineer)
- Sentry setup (client + server + edge)
- Error boundaries (global-error.tsx, error.tsx)
- Health check endpoint (/api/health)
- See: `specs/error-monitoring.md`

### 4.8 Maintenance Mode (infra-engineer)
- Maintenance page + middleware bypass
- 503 status with retry-after header
- See: `specs/maintenance-mode.md`

### 4.9 Favicon & Icons (frontend-dev)
- Generate all icon sizes from source
- Web manifest
- See: `specs/favicon-icons.md`

### 4.10 URL Normalization (infra-engineer)
- www/non-www redirect
- Trailing slash normalization
- Lowercase enforcement
- 301 redirect map (imported URLs)
- See: `specs/url-normalization.md`

### 4.11 CI/CD Pipeline (infra-engineer)
- GitHub Actions or hosting built-in
- Lint → type-check → build → test → deploy
- Preview deployments per PR
- See: `specs/cicd-pipeline.md`

### 4.12 Dependency Management (infra-engineer)
- Renovate or Dependabot config
- Auto-merge minor/patch, manual review major
- See: `specs/dependency-management.md`

---

## Phase 5: Quality Gate (Sequential)

Run `test-engineer` with full checklist from `checklists/quality-gate.md`.

```
1. Build check (npm run build)
2. Lint check (npm run lint)
3. TypeScript check (tsc --noEmit)
4. Accessibility audit (per page)
5. SEO audit (per page)
6. Performance audit (Lighthouse)
7. Security headers check
8. Cookie consent flow test
9. Responsive test (3 viewports)
10. i18n test (if applicable)
11. Blog tests (if blog enabled)
12. Email system test (if contact form)
13. File verification (robots.txt, sitemap, llms.txt, favicon, manifest)
14. URL normalization test (redirects, canonical)
15. Error monitoring test (Sentry captures)
16. 301 redirect map verification
```

If ANY check fails → fix → re-test → approve.
