# URL Normalization & Redirect Specification

> Tek bir canonical URL. Duplicate yok. Eski linkler kirilmaz.

---

## Rules (ALWAYS Apply)

### 1. HTTPS Zorunlu
```
http://site.com  → 301 → https://site.com
```

### 2. www vs non-www (TEK secim)
```
Discovery'de sorulur:
- [ ] www.site.com (ONERILEN kurumsal)
- [ ] site.com (ONERILEN teknoloji/startup)

Secilen:  site.com
Redirect: www.site.com → 301 → site.com
```

### 3. Trailing Slash (TEK secim)
```
Discovery'de sorulur:
- [x] Trailing slash YOK (ONERILEN — /about)
- [ ] Trailing slash VAR (/about/)

Next.js config:
// next.config.js
module.exports = { trailingSlash: false }
```

### 4. Lowercase Zorunlu
```
/About-Us → 301 → /about-us
/BLOG     → 301 → /blog
```

### 5. Index Sayfalar
```
/index     → 301 → /
/index.html → 301 → /
```

---

## Implementation (Next.js Middleware)

```typescript
// src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL!; // https://site.com
const USE_WWW = false;         // discovery'den gelir
const TRAILING_SLASH = false;  // discovery'den gelir

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  let needsRedirect = false;

  // 1. www normalization
  if (USE_WWW && !url.hostname.startsWith('www.')) {
    url.hostname = `www.${url.hostname}`;
    needsRedirect = true;
  }
  if (!USE_WWW && url.hostname.startsWith('www.')) {
    url.hostname = url.hostname.replace('www.', '');
    needsRedirect = true;
  }

  // 2. Trailing slash normalization
  if (url.pathname !== '/' && url.pathname.length > 1) {
    if (TRAILING_SLASH && !url.pathname.endsWith('/')) {
      url.pathname += '/';
      needsRedirect = true;
    }
    if (!TRAILING_SLASH && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.slice(0, -1);
      needsRedirect = true;
    }
  }

  // 3. Lowercase enforcement
  const lowered = url.pathname.toLowerCase();
  if (url.pathname !== lowered) {
    url.pathname = lowered;
    needsRedirect = true;
  }

  // 4. Redirect if any normalization applied
  if (needsRedirect) {
    return NextResponse.redirect(url, 301);
  }

  // 5. Security headers (from security spec)
  const response = NextResponse.next();
  // ... headers applied here
  return response;
}

export const config = {
  matcher: [
    // Skip static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

---

## 301 Redirect Map

### Static Redirects (next.config.js)

```javascript
// next.config.js
module.exports = {
  async redirects() {
    return [
      // Old URL structure → new
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/anasayfa', destination: '/', permanent: true },

      // WordPress import redirects (auto-generated)
      { source: '/2024/01/eski-yazi-basligi', destination: '/blog/eski-yazi-basligi', permanent: true },
      { source: '/?p=123', destination: '/blog/yazi-slug', permanent: true },
      { source: '/category/:slug', destination: '/blog/kategori/:slug', permanent: true },
      { source: '/tag/:slug', destination: '/blog/etiket/:slug', permanent: true },

      // Language changes
      { source: '/en/about', destination: '/en/about-us', permanent: true },
    ];
  },
};
```

### Dynamic Redirects (Database — Level 4)

```prisma
model Redirect {
  id          String   @id @default(cuid())
  source      String   @unique    // old URL path
  destination String              // new URL path
  statusCode  Int      @default(301) // 301 permanent, 302 temporary
  hits        Int      @default(0)   // tracking
  createdAt   DateTime @default(now())
  note        String?              // "WordPress import" etc.

  @@index([source])
}
```

```typescript
// In middleware — check DB redirects
const redirect = await db.redirect.findUnique({
  where: { source: url.pathname }
});
if (redirect) {
  await db.redirect.update({
    where: { id: redirect.id },
    data: { hits: { increment: 1 } }
  });
  return NextResponse.redirect(
    new URL(redirect.destination, url),
    redirect.statusCode
  );
}
```

---

## 404 Tracking

```typescript
// src/app/not-found.tsx
import { trackEvent } from '@/lib/monitoring';

export default function NotFound() {
  // Log the 404 for broken link detection
  if (typeof window !== 'undefined') {
    trackEvent(`404: ${window.location.pathname}`, 'warning');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">Sayfa bulunamadi</p>
      <p className="text-muted-foreground">
        Aradiginiz sayfa kaldirilmis veya tasinmis olabilir.
      </p>
      <div className="flex gap-4">
        <a href="/" className="btn btn-primary">Ana Sayfaya Don</a>
        <a href="/site-haritasi" className="btn btn-secondary">Site Haritasi</a>
      </div>
    </div>
  );
}
```

---

## Canonical URL Checklist

```
Every page MUST have exactly ONE canonical URL:
├── <link rel="canonical" href="https://site.com/about" />
├── No duplicate: /about and /about/ both exist → only ONE is canonical
├── No duplicate: http and https → only https is canonical
├── No duplicate: www and non-www → only chosen version is canonical
├── Pagination: /blog?page=2 canonical is self (not /blog)
├── Filters: /blog?category=x has canonical /blog/kategori/x
└── Language: each language version has own canonical + hreflang
```
