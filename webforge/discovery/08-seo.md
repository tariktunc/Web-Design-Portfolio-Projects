# Phase 8: SEO (Search Engine Optimization)

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 8: SEO — Arama Motoru Optimizasyonu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

17. Teknik SEO (varsayilan: HEPSI AKTIF):
    - [x] Dinamik meta title + description (sayfa bazli)
    - [x] Open Graph meta tags (og:title, og:description, og:image, og:type, og:url)
    - [x] Twitter Card meta tags
    - [x] Canonical URL yonetimi
    - [x] XML Sitemap (otomatik uretim)
    - [x] robots.txt
    - [x] Breadcrumb navigasyonu
    - [x] Image SEO (alt text, lazy loading, WebP/AVIF, srcset)
    - [x] URL yapisi (clean, semantic, kebab-case)
    - [x] 301 redirect yonetimi
    - [x] 404 sayfasi (ozel tasarim + oneri)
    - [x] Mobile-first indexing uyumu
    - [x] Core Web Vitals optimizasyonu

18. Structured Data / JSON-LD — Hangileri gerekli?
    - [x] Organization (site geneli)
    - [x] WebSite (sitelinks search box)
    - [x] BreadcrumbList (her sayfada)
    - [ ] Article / BlogPosting (blog varsa)
    - [ ] Product (e-ticaret varsa)
    - [x] FAQ (SSS sayfasi varsa)
    - [ ] HowTo (talimat icerigi varsa)
    - [ ] LocalBusiness (fiziksel lokasyon varsa)
    - [ ] Review / AggregateRating (yorum sistemi varsa)
    - [ ] Event (etkinlik sayfasi varsa)
    - [ ] JobPosting (kariyer sayfasi varsa)
    - [ ] VideoObject (video icerigi varsa)
    - [ ] SoftwareApplication (uygulama tanitimi varsa)

19. Cok dilli SEO (i18n aktifse):
    - [x] hreflang tags (dil/bolge eslesmesi)
    - [x] x-default hreflang
    - [x] Dil bazli sitemap
    - [x] Dil bazli meta title/description
```

## Defaults
- All technical SEO: ON
- Structured Data: Organization + WebSite + BreadcrumbList + FAQ
- Multi-language SEO: ON if i18n is enabled

## Implementation Notes

### Meta Tags Pattern (Next.js)
```typescript
// src/lib/seo/metadata.ts
export function generatePageMetadata({
  title, description, path, image, locale
}: PageMetaProps): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
      languages: generateHreflang(path),
    },
    openGraph: {
      title, description, url,
      images: [{ url: image || DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
      type: 'website', locale, siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title, description,
      images: [image || DEFAULT_OG_IMAGE],
    },
  };
}
```

### JSON-LD Pattern
```typescript
// src/components/seo/JsonLd.tsx
export function OrganizationJsonLd() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "logo": `${SITE_URL}/logo.png`,
      "sameAs": SOCIAL_LINKS,
    })}} />
  );
}
```

### Sitemap Pattern (Next.js App Router)
```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();
  return pages.map(page => ({
    url: `${SITE_URL}${page.path}`,
    lastModified: page.updatedAt,
    changeFrequency: page.changeFreq,
    priority: page.priority,
    alternates: { languages: page.hreflang },
  }));
}
```

## Output Format
```json
{
  "phase": "seo",
  "technical_seo": "full",
  "structured_data": ["Organization", "WebSite", "BreadcrumbList", "FAQ"],
  "multilingual_seo": true,
  "core_web_vitals": true
}
```
