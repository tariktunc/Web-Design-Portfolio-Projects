# Project File Structure

## Full Directory Map (Next.js App Router)

```
project-root/
│
├── public/
│   ├── robots.txt                 # Crawler rules (AI bots included)
│   ├── sitemap.xml                # Or dynamic via src/app/sitemap.ts
│   ├── llms.txt                   # AI crawler site summary (GEO)
│   ├── llms-full.txt              # Detailed AI content map (GEO)
│   ├── manifest.json              # PWA manifest (if applicable)
│   ├── favicon.ico                # Favicon (32x32)
│   ├── icon-192.png               # PWA icon (192x192)
│   ├── icon-512.png               # PWA icon (512x512)
│   ├── apple-touch-icon.png       # iOS bookmark (180x180)
│   ├── og-default.jpg             # Default OG image (1200x630)
│   └── images/                    # Static images
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (theme, i18n, consent, analytics, JSON-LD)
│   │   ├── page.tsx               # Homepage
│   │   ├── not-found.tsx          # 404 page
│   │   ├── error.tsx              # Error boundary (500)
│   │   ├── globals.css            # Design tokens, theme vars, base styles
│   │   ├── sitemap.ts             # Dynamic sitemap generation
│   │   ├── robots.ts              # Dynamic robots.txt generation
│   │   │
│   │   ├── [locale]/              # i18n routing (if multi-language)
│   │   │   ├── layout.tsx         # Locale layout
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── hakkimizda/        # About
│   │   │   │   └── page.tsx
│   │   │   ├── iletisim/          # Contact
│   │   │   │   └── page.tsx
│   │   │   ├── sss/               # FAQ
│   │   │   │   └── page.tsx
│   │   │   ├── blog/              # Blog (if applicable)
│   │   │   │   ├── page.tsx       # Blog index
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx   # Blog post
│   │   │   ├── gizlilik/          # Privacy Policy
│   │   │   │   └── page.tsx
│   │   │   ├── kullanim-sartlari/ # Terms of Service
│   │   │   │   └── page.tsx
│   │   │   ├── cerez-politikasi/  # Cookie Policy
│   │   │   │   └── page.tsx
│   │   │   └── site-haritasi/     # HTML Sitemap
│   │   │       └── page.tsx
│   │   │
│   │   └── api/                   # API routes (if backend needed)
│   │       ├── contact/
│   │       │   └── route.ts       # Contact form handler
│   │       └── og/
│   │           └── route.tsx      # Dynamic OG image generation
│   │
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── toggle.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ...
│   │   │
│   │   ├── layout/                # Layout components
│   │   │   ├── header.tsx         # Site header + navigation
│   │   │   ├── footer.tsx         # Site footer
│   │   │   ├── mobile-nav.tsx     # Mobile navigation (Sheet)
│   │   │   ├── breadcrumb.tsx     # Breadcrumb navigation
│   │   │   ├── skip-nav.tsx       # Skip to content link
│   │   │   └── back-to-top.tsx    # Back to top button (optional)
│   │   │
│   │   ├── cookie-consent/        # Cookie consent system
│   │   │   ├── cookie-banner.tsx  # Banner component
│   │   │   ├── preferences-modal.tsx  # Category selection modal
│   │   │   ├── category-toggle.tsx    # Individual category toggle
│   │   │   └── consent-provider.tsx   # React context provider
│   │   │
│   │   ├── seo/                   # SEO components
│   │   │   ├── json-ld.tsx        # JSON-LD script component
│   │   │   ├── breadcrumb-jsonld.tsx  # BreadcrumbList schema
│   │   │   └── faq-jsonld.tsx     # FAQ schema
│   │   │
│   │   ├── theme/                 # Theme components
│   │   │   ├── theme-provider.tsx # next-themes wrapper
│   │   │   └── theme-toggle.tsx   # Light/Dark/System toggle
│   │   │
│   │   ├── forms/                 # Form components
│   │   │   ├── contact-form.tsx   # Contact form
│   │   │   └── newsletter-form.tsx # Newsletter signup (optional)
│   │   │
│   │   └── sections/              # Page sections (reusable)
│   │       ├── hero.tsx
│   │       ├── features.tsx
│   │       ├── testimonials.tsx
│   │       ├── cta.tsx
│   │       ├── faq-section.tsx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── consent/               # Consent state management
│   │   │   ├── index.ts           # getConsent, setConsent, hasConsent
│   │   │   ├── google-consent.ts  # Google Consent Mode v2 helpers
│   │   │   └── types.ts           # ConsentState, ConsentCategory
│   │   │
│   │   ├── analytics/             # Analytics (consent-aware)
│   │   │   ├── index.ts           # initAnalytics, trackEvent
│   │   │   ├── ga4.ts             # GA4 specific
│   │   │   ├── gtm.ts            # GTM specific
│   │   │   ├── clarity.ts         # Clarity specific
│   │   │   └── utm.ts             # UTM capture and storage
│   │   │
│   │   ├── seo/                   # SEO utilities
│   │   │   ├── metadata.ts        # generatePageMetadata helper
│   │   │   ├── schemas.ts         # JSON-LD schema generators
│   │   │   └── constants.ts       # SITE_URL, SITE_NAME, defaults
│   │   │
│   │   ├── i18n/                  # Internationalization
│   │   │   ├── config.ts          # Locales, default locale
│   │   │   ├── request.ts         # getRequestConfig for next-intl
│   │   │   └── navigation.ts      # Localized Link, redirect, etc.
│   │   │
│   │   └── utils/                 # Shared utilities
│   │       ├── cn.ts              # clsx + tailwind-merge
│   │       └── format.ts          # Date, number formatters
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── use-consent.ts         # useConsent hook
│   │   ├── use-media-query.ts     # Responsive media query hook
│   │   └── use-scroll.ts          # Scroll position hook
│   │
│   ├── types/                     # TypeScript types
│   │   ├── index.ts               # Shared types
│   │   └── seo.ts                 # SEO-related types
│   │
│   ├── messages/                  # Translation files
│   │   ├── tr.json                # Turkish translations
│   │   └── en.json                # English translations (if i18n)
│   │
│   └── middleware.ts              # Security headers, locale redirect
│
├── .env.example                   # Required env vars (NEVER commit .env)
├── .env.local                     # Local env vars (git-ignored)
├── .eslintrc.json                 # ESLint config (includes jsx-a11y)
├── .prettierrc                    # Prettier config
├── .gitignore                     # Git ignore rules
├── components.json                # shadcn/ui configuration
├── next.config.js                 # Next.js config (headers, images, i18n)
├── tailwind.config.ts             # Tailwind config (theme tokens)
├── tsconfig.json                  # TypeScript config
├── postcss.config.js              # PostCSS config
└── package.json                   # Dependencies and scripts
```

## Minimal Structure (No i18n, No Backend)

If single language and no API routes needed, simplify:

```
src/app/
├── layout.tsx
├── page.tsx
├── not-found.tsx
├── error.tsx
├── globals.css
├── sitemap.ts
├── robots.ts
├── hakkimizda/page.tsx
├── iletisim/page.tsx
├── sss/page.tsx
├── gizlilik/page.tsx
├── kullanim-sartlari/page.tsx
└── cerez-politikasi/page.tsx
```

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `CookieBanner.tsx` or `cookie-banner.tsx` |
| Pages | lowercase, kebab-case directory | `hakkimizda/page.tsx` |
| Utilities | camelCase | `generateMetadata.ts` |
| Types | PascalCase | `ConsentState.ts` |
| Constants | UPPER_SNAKE_CASE in file | `SITE_URL`, `DEFAULT_LOCALE` |
| CSS | kebab-case | `globals.css` |
| Translation keys | dot.notation | `header.nav.about` |
