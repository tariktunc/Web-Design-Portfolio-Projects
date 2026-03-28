# Phase 9: SEM (Search Engine Marketing)

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 9: SEM — Arama Motoru Pazarlamasi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

20. Reklam & Donusum altyapisi:
    - [x] Google Tag Manager (GTM) entegrasyonu
    - [ ] Google Ads conversion tracking
    - [ ] Google Ads remarketing pixel
    - [ ] Meta (Facebook) Pixel
    - [ ] LinkedIn Insight Tag
    - [ ] TikTok Pixel
    - [ ] Microsoft Advertising UET Tag
    - [ ] Conversion API (server-side tracking)

    Hangi platformlarda reklam vereceksiniz? ___

21. Landing page altyapisi:
    - [x] UTM parametre yakalama ve saklama
    - [ ] Dinamik icerik (UTM'e gore baslik degisimi)
    - [ ] A/B test altyapisi
    - [x] Form tracking (submission events)
    - [x] Click tracking (CTA butonlari)
    - [x] Scroll depth tracking
    - [ ] Heatmap altyapisi (Hotjar/Clarity)
```

## Defaults
- GTM: ON (consent-aware)
- UTM capture: ON
- Form/click/scroll tracking: ON via GTM dataLayer
- Ad pixels: OFF until specified

## Implementation Notes

### GTM Setup (Consent-Aware)
```html
<!-- MUST load AFTER consent default is set -->
<script>
  // This fires AFTER gtag consent default in cookie-consent
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');
</script>
```

### UTM Capture Pattern
```typescript
// src/lib/analytics/utm.ts
export function captureUTM() {
  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content'),
  };
  if (Object.values(utm).some(Boolean)) {
    sessionStorage.setItem('utm_params', JSON.stringify(utm));
  }
}
```

### DataLayer Event Pattern
```typescript
// src/lib/analytics/events.ts
export function trackEvent(event: string, data?: Record<string, any>) {
  if (typeof window === 'undefined') return;
  window.dataLayer?.push({ event, ...data });
}

// Usage:
trackEvent('form_submit', { form_name: 'contact', form_location: 'footer' });
trackEvent('cta_click', { cta_text: 'Get Started', cta_location: 'hero' });
trackEvent('scroll_depth', { depth: '50%' });
```

## Output Format
```json
{
  "phase": "sem",
  "gtm": true,
  "ad_pixels": [],
  "utm_capture": true,
  "tracking": ["form_submit", "cta_click", "scroll_depth"],
  "heatmap": false
}
```
