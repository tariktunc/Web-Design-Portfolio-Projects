# Phase 12: Analytics & Performance

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 12: Analitik & Performans
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

26. Analitik araclari:
    - [x] Google Analytics 4 (GA4)
    - [x] Google Search Console (dogrudan entegrasyon yok, sadece meta tag)
    - [ ] Bing Webmaster Tools
    - [x] Microsoft Clarity (ucretsiz heatmap + session recording)
    - [ ] Plausible (privacy-first, ucretli)
    - [ ] Umami (self-hosted, ucretsiz)
    - [ ] Matomo (self-hosted)
    - [ ] Vercel Analytics (Vercel kullaniliyorsa)
    - [ ] Vercel Speed Insights

27. Core Web Vitals hedefleri:
    - [x] LCP (Largest Contentful Paint) < 2.5s
    - [x] INP (Interaction to Next Paint) < 200ms
    - [x] CLS (Cumulative Layout Shift) < 0.1

    Bunlar Google'in "iyi" esik degerleri. Daha agresif
    hedefler ister misiniz?

28. Performans optimizasyonlari (varsayilan: AKTIF):
    - [x] Image optimization (next/image — WebP/AVIF)
    - [x] Font optimization (next/font, font-display: swap)
    - [x] Code splitting / lazy loading (dynamic imports)
    - [x] Prefetching (link prefetch, route prefetch)
    - [x] Compression (Brotli / Gzip — hosting tarafinda)
    - [x] Critical CSS inlining
    - [x] Third-party script yonetimi (defer/async/partytown)
    - [ ] Bundle analysis (@next/bundle-analyzer)
    - [ ] CDN / Edge caching (hosting'e bagli)

29. PWA (Progressive Web App) isteniyor mu?
    - [ ] Hayir, standart web sitesi yeterli
    - [ ] Evet — Offline fallback sayfasi
    - [ ] Evet — Installable (app manifest)
    - [ ] Evet — Push notifications
```

## Defaults
- Analytics: GA4 + Clarity (both consent-aware)
- CWV targets: Google "good" thresholds
- All performance optimizations: ON
- PWA: OFF

## Consent-Aware Analytics Pattern

```typescript
// src/lib/analytics/index.ts

// NEVER fire analytics without consent check
export function initAnalytics() {
  if (!hasConsent('analytics')) return;

  // GA4 — only after consent
  gtag('config', 'G-XXXXXXX', {
    page_path: window.location.pathname,
    anonymize_ip: true,
  });
}

// Clarity — only after consent
export function initClarity() {
  if (!hasConsent('analytics')) return;

  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window,document,"clarity","script","XXXXXXXXXX");
}
```

## Performance Budget

| Metric | Budget | How |
|--------|--------|-----|
| Total page weight | < 500KB (initial) | Code splitting, lazy loading |
| JavaScript | < 200KB (compressed) | Tree shaking, dynamic imports |
| CSS | < 50KB (compressed) | Purge unused, critical inline |
| Largest image | < 100KB | WebP/AVIF, srcset, lazy load |
| Font files | < 100KB total | Subset, swap, preload |
| Time to Interactive | < 3.5s (3G) | Defer non-critical scripts |

## Output Format
```json
{
  "phase": "analytics-performance",
  "analytics": ["ga4", "clarity"],
  "cwv_targets": { "lcp": "2.5s", "inp": "200ms", "cls": "0.1" },
  "optimizations": ["images", "fonts", "code-splitting", "prefetch", "compression", "critical-css"],
  "pwa": false
}
```
