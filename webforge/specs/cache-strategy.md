# Cache & Rendering Strategy Specification

> Her sayfa icin dogru rendering yontemi: Static, ISR, SSR, veya Client.
> Yanlis secim = yavas site veya eski icerik.

---

## Rendering Decision Matrix

| Sayfa Tipi | Yontem | Neden |
|-----------|--------|-------|
| Ana sayfa | ISR (60s) | Nadiren degisir ama guncel olmali |
| Hakkimizda | Static (SSG) | Neredeyse hic degismez |
| Iletisim | Static (SSG) | Form var ama sayfa statik |
| SSS/FAQ | ISR (3600s) | Ara sira guncellenir |
| Gizlilik/Kullanim | Static (SSG) | Cok nadir degisir |
| Blog listesi | ISR (60s) | Yeni yazi eklendiginde guncellenmeli |
| Blog yazisi | Static + on-demand | Build'de uretilir, guncelleme gelince revalidate |
| Blog kategori | ISR (300s) | Yazi eklendikce degisir |
| Blog arama | Client | Kullaniciya ozel, arama indexi client'ta |
| Admin panel | SSR (no-cache) | Her zaman guncel, auth gerekli |
| Sitemap | ISR (3600s) | Yazilar eklenince guncellenir |
| RSS feed | ISR (3600s) | Yazilar eklenince guncellenir |
| API routes | No cache | Dinamik, her istek taze |

---

## Implementation

### Static (SSG) — Build Time
```typescript
// Hakkimizda, Gizlilik, Kullanim Sartlari
// Bu sayfalar build sirasinda uretilir, deploy'a kadar degismez

// Next.js App Router — varsayilan olarak static
// Ozel bir sey yapmaya gerek yok
export default function AboutPage() {
  return <div>...</div>;
}
```

### ISR (Incremental Static Regeneration)
```typescript
// Blog listesi, Ana sayfa, FAQ
// Belirli araliklarla arka planda yeniden uretilir

export const revalidate = 60; // 60 saniyede bir kontrol et

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <div>...</div>;
}
```

### On-Demand Revalidation
```typescript
// Blog yazisi guncellendi → aninda yenile (ISR bekleme suresi yok)

// src/app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const { secret, path, tag } = await request.json();

  // Guvenlik: sadece bilinen secret ile
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 });
  }

  if (path) revalidatePath(path);     // /blog/yazi-slug
  if (tag) revalidateTag(tag);        // 'blog-posts'

  return Response.json({ revalidated: true });
}

// Kullanim: Admin panelden yazi kaydedildiginde
// POST /api/revalidate { secret: "xxx", path: "/blog/yazi-slug" }
```

### SSR (Server-Side Rendering)
```typescript
// Admin panel — her zaman taze, auth gerekli

export const dynamic = 'force-dynamic'; // SSR zorla
export const revalidate = 0;            // cache yok

export default async function AdminPage() {
  const session = await auth();
  if (!session) redirect('/login');
  return <div>...</div>;
}
```

---

## Cache Headers

### Static Assets (Images, Fonts, JS/CSS)
```
Cache-Control: public, max-age=31536000, immutable
```
Next.js `_next/static/` icin bunu otomatik yapar.

### HTML Pages
```
Cache-Control: public, s-maxage=60, stale-while-revalidate=300
```
ISR sayfalar icin: 60s taze, 300s boyunca eski veriyi goster + arka planda yenile.

### API Routes
```
Cache-Control: no-store, no-cache, must-revalidate
```
API route'lar asla cache'lenmez.

### CDN / Edge Caching
```
Vercel: Otomatik — ISR + Edge cache dahil
Netlify: _headers dosyasi ile konfigüre
CloudFront: Cache-Control header'ina uyar
Self-hosted: nginx/Caddy ile proxy_cache
```

---

## Data Fetching Cache (fetch API)

```typescript
// Cache'li fetch (varsayilan Next.js davranisi)
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 } // 1 saat cache
});

// Cache'siz fetch (her seferinde taze)
const data = await fetch('https://api.example.com/data', {
  cache: 'no-store'
});

// Tag bazli invalidation
const data = await fetch('https://api.example.com/posts', {
  next: { tags: ['blog-posts'] }
});
// Sonra: revalidateTag('blog-posts') ile aninda yenile
```

---

## Recommended Revalidation Intervals

| Icerik | Interval | Neden |
|--------|----------|-------|
| Ana sayfa | 60s | Guncel olmali ama her istekte degismez |
| Blog listesi | 60s | Yeni yazi hemen gorunsun |
| Blog yazisi | On-demand | Sadece guncelleme gelince |
| FAQ | 3600s (1 saat) | Nadiren degisir |
| Sitemap | 3600s | Yazi eklenince yeterli |
| RSS feed | 3600s | Feed okuyucular sik ceker |
| Statik sayfalar | Build time | Deploy'da guncellenir |
| Admin | 0 (no cache) | Her zaman taze |

---

## SWR Pattern (Client-Side)

```typescript
// Client-side data that needs periodic refresh
// Blog arama, admin dashboard, real-time veri

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function BlogSearch({ query }: { query: string }) {
  const { data, error, isLoading } = useSWR(
    query ? `/api/blog/search?q=${query}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  // ...
}
```
