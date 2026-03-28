# Quality Gate Checklist

> Run this checklist AFTER implementation is complete.
> Every item must pass before the site can be considered ready.

---

## 1. Build & Code Quality

```bash
npm run build      # 0 errors
npm run lint       # 0 errors
npx tsc --noEmit   # 0 type errors
```

- [ ] Build completes with 0 errors
- [ ] ESLint reports 0 errors
- [ ] TypeScript reports 0 type errors
- [ ] No console.log left in production code
- [ ] No TODO/FIXME comments left unresolved
- [ ] .env is git-ignored, .env.example exists

---

## 2. Accessibility (Per Page)

### Automated
- [ ] axe-core reports 0 violations
- [ ] Lighthouse accessibility score >= 95

### Keyboard
- [ ] Tab reaches all interactive elements
- [ ] Tab order is logical (left→right, top→bottom)
- [ ] Focus indicator is clearly visible
- [ ] Enter/Space activates buttons and links
- [ ] Escape closes modals/popups
- [ ] Focus trapped inside open modals
- [ ] Focus returns to trigger after modal closes
- [ ] Skip navigation link works

### Screen Reader
- [ ] Page has descriptive `<title>`
- [ ] Single H1, logical H2-H6 hierarchy
- [ ] All images have appropriate alt text
- [ ] Form fields have associated `<label>`
- [ ] Error messages are announced
- [ ] ARIA live regions for dynamic content
- [ ] Landmark roles present (banner, nav, main, contentinfo)

### Visual
- [ ] Color contrast meets WCAG AA (4.5:1 normal, 3:1 large)
- [ ] No information conveyed by color alone
- [ ] Text readable at 200% zoom without layout break
- [ ] Content readable in both light and dark mode
- [ ] prefers-reduced-motion respected
- [ ] Touch targets >= 44x44px on mobile

### Forms
- [ ] All fields have visible labels (not just placeholders)
- [ ] Required fields indicated (not just by color)
- [ ] Error messages are specific and field-associated
- [ ] Submit button has clear label

---

## 3. SEO (Per Page)

### Meta
- [ ] Unique title tag (50-60 chars)
- [ ] Unique meta description (150-160 chars)
- [ ] Canonical URL present and correct
- [ ] Open Graph tags complete (title, description, image, url, type)
- [ ] Twitter Card tags complete
- [ ] Lighthouse SEO score >= 95

### Structure
- [ ] Single H1 per page
- [ ] Logical heading hierarchy
- [ ] All images have alt text
- [ ] URLs are semantic, kebab-case, lowercase
- [ ] Internal links use descriptive anchor text

### Structured Data
- [ ] JSON-LD validates (test with schema.org/validator)
- [ ] Organization schema on every page
- [ ] BreadcrumbList on every page (except home)
- [ ] Page-specific schema where applicable
- [ ] Google Rich Results Test passes

### Files
- [ ] robots.txt exists and allows crawling
- [ ] AI bot rules in robots.txt
- [ ] sitemap.xml exists and lists all pages
- [ ] sitemap matches actual site pages
- [ ] llms.txt exists and is accurate
- [ ] llms-full.txt exists (if GEO enabled)

### Multi-Language (if i18n)
- [ ] hreflang tags present and bidirectional
- [ ] x-default hreflang present
- [ ] Each language has own meta title/description
- [ ] Language-specific sitemap entries

---

## 4. Performance

### Lighthouse
- [ ] Performance score >= 90
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1

### Optimization
- [ ] Images use WebP/AVIF format
- [ ] Images have width/height (prevent CLS)
- [ ] Fonts use font-display: swap or next/font
- [ ] No render-blocking resources
- [ ] Code splitting active (dynamic imports)
- [ ] Third-party scripts deferred/async

---

## 5. Security

### Headers (check with securityheaders.com)
- [ ] Content-Security-Policy present
- [ ] X-Content-Type-Options: nosniff
- [ ] X-Frame-Options: DENY
- [ ] Referrer-Policy present
- [ ] Permissions-Policy present
- [ ] Strict-Transport-Security (HSTS) present
- [ ] Cross-Origin-Opener-Policy present

### Application
- [ ] No API keys in client-side code
- [ ] .env not committed to git
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] No mixed content warnings
- [ ] Input sanitization on forms
- [ ] Honeypot or CAPTCHA on public forms

---

## 6. Cookie Consent

### Banner Flow
- [ ] Banner appears on first visit
- [ ] Banner does NOT appear after choice is saved
- [ ] "Tumunu Kabul Et" saves all consents
- [ ] "Tumunu Reddet" saves only essential
- [ ] "Tercihler" opens preferences modal
- [ ] Modal shows all categories with toggles
- [ ] Essential category cannot be disabled
- [ ] "Secimleri Kaydet" saves individual choices
- [ ] Footer link reopens preferences modal
- [ ] Consent persists across page navigation
- [ ] Consent persists after browser restart

### Google Consent Mode v2
- [ ] Default consent fires BEFORE any tracking script
- [ ] Consent update fires immediately after user choice
- [ ] GTM debug mode shows correct consent states
- [ ] Analytics fires ONLY after analytics consent
- [ ] Ad tracking fires ONLY after marketing consent

### Accessibility
- [ ] Banner is keyboard navigable
- [ ] Modal has focus trap
- [ ] Screen reader can read all banner content
- [ ] Works in both light and dark mode

---

## 7. Responsive Design

### Mobile (375px)
- [ ] All content is accessible
- [ ] Navigation works (hamburger menu)
- [ ] No horizontal scroll
- [ ] Touch targets >= 44x44px
- [ ] Text is readable without zooming
- [ ] Forms are usable

### Tablet (768px)
- [ ] Layout adjusts appropriately
- [ ] Navigation adapts
- [ ] Images scale properly

### Desktop (1280px)
- [ ] Full layout displays correctly
- [ ] Max-width container prevents ultra-wide stretching
- [ ] All features functional

---

## 8. Theme

- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] System preference detection works
- [ ] Theme toggle switches correctly
- [ ] Theme persists after page reload
- [ ] No FOUC (flash of unstyled content) on load
- [ ] All components look good in both themes
- [ ] Cookie banner looks good in both themes

---

## 9. i18n (If Multi-Language)

- [ ] All translation keys have values in all languages
- [ ] No untranslated strings visible in UI
- [ ] Language switcher works
- [ ] URL changes with language (/tr/ ↔ /en/)
- [ ] Browser language detection works (if enabled)
- [ ] Date/number formats match locale
- [ ] hreflang tags are correct

---

## 10. Required Pages

- [ ] Homepage loads and looks correct
- [ ] 404 page shows custom design with helpful links
- [ ] 500 error page shows custom design
- [ ] Privacy policy page exists and is linked
- [ ] Terms of service page exists and is linked
- [ ] Cookie policy page exists and is linked
- [ ] Cookie policy link works from cookie banner
- [ ] All navigation links work (no broken links)

---

## 11. Blog (If Enabled)

- [ ] Blog index page loads and shows posts
- [ ] Individual blog post renders full content in HTML source
- [ ] View source shows all headings, paragraphs, text (SSR/SSG verified)
- [ ] Article JSON-LD schema validates
- [ ] Blog categories and tags work
- [ ] Blog search works
- [ ] Pagination works (with proper SEO meta)
- [ ] RSS feed returns valid XML
- [ ] Reading time displays correctly
- [ ] Table of contents generates from headings
- [ ] Related posts show relevant content
- [ ] Author page works
- [ ] Import/export CLI tools work (if configured)

---

## 12. Email System (If Contact Form Exists)

- [ ] Contact form submits successfully
- [ ] Site owner receives notification email
- [ ] User receives confirmation email
- [ ] Honeypot catches bots (hidden field test)
- [ ] Validation errors display correctly
- [ ] Rate limiting works (if configured)
- [ ] Email works in production (not just console)

---

## 13. Infrastructure

### Files Verification
- [ ] robots.txt exists and is correct (including AI bot rules)
- [ ] sitemap.xml exists and lists all pages
- [ ] llms.txt exists (if GEO enabled)
- [ ] llms-full.txt exists (if GEO enabled)
- [ ] favicon.ico exists
- [ ] apple-touch-icon.png exists
- [ ] og-default.jpg exists (1200x630)
- [ ] manifest.json exists (if PWA)
- [ ] .env.example exists (all required vars documented)
- [ ] .env is NOT committed to git

### URL Normalization
- [ ] HTTP redirects to HTTPS
- [ ] www/non-www redirects to chosen version
- [ ] Trailing slash behavior is consistent
- [ ] Uppercase URLs redirect to lowercase
- [ ] Old URLs (imported) redirect via 301

### Error Monitoring
- [ ] Sentry captures errors (test with intentional error)
- [ ] Error boundary shows user-friendly message
- [ ] Health check endpoint returns 200 (/api/health)

### Maintenance Mode
- [ ] MAINTENANCE_MODE=true shows maintenance page
- [ ] Bypass secret works for developers
- [ ] Returns 503 status code (not 200)

---

## Final Sign-Off

```
Date: ___
All checks passed: YES / NO
Remaining issues: ___
Approved by: ___
```
