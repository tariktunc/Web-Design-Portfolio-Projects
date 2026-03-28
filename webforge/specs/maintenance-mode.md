# Maintenance Mode Specification

> Site guncellenirken veya bakim sirasinda kullaniciya ne gosterilecek.

---

## How It Works

```
ENV: MAINTENANCE_MODE=true → Tum sayfalar maintenance sayfasina yonlendirilir
ENV: MAINTENANCE_MODE=false (veya yok) → Normal calisma
```

### Middleware Implementation

```typescript
// src/middleware.ts — add to existing middleware

const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true';
const MAINTENANCE_BYPASS_SECRET = process.env.MAINTENANCE_BYPASS_SECRET;

export function middleware(request: NextRequest) {
  // Maintenance mode check
  if (MAINTENANCE_MODE) {
    const url = request.nextUrl;

    // Allow: maintenance page itself, static assets, API health check
    const allowedPaths = ['/maintenance', '/api/health', '/_next/', '/favicon.ico'];
    if (allowedPaths.some(p => url.pathname.startsWith(p))) {
      return NextResponse.next();
    }

    // Allow: bypass with secret cookie (for developers)
    const bypassCookie = request.cookies.get('maintenance_bypass')?.value;
    if (bypassCookie === MAINTENANCE_BYPASS_SECRET) {
      return NextResponse.next();
    }

    // Allow: bypass via query param (sets cookie)
    if (url.searchParams.get('bypass') === MAINTENANCE_BYPASS_SECRET) {
      const response = NextResponse.redirect(new URL(url.pathname, url));
      response.cookies.set('maintenance_bypass', MAINTENANCE_BYPASS_SECRET, {
        httpOnly: true, maxAge: 3600 // 1 hour
      });
      return response;
    }

    // Everyone else → maintenance page
    return NextResponse.rewrite(new URL('/maintenance', url));
  }

  // ... rest of middleware (URL normalization, security headers, etc.)
}
```

### Maintenance Page

```tsx
// src/app/maintenance/page.tsx

export const metadata = {
  title: 'Bakim Calismasi',
  robots: { index: false, follow: false }, // don't index maintenance page
};

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-8">
      <div className="max-w-md text-center space-y-6">
        <div className="text-6xl">⚙️</div>
        <h1 className="text-3xl font-bold">Bakim Calismasi</h1>
        <p className="text-lg text-muted-foreground">
          Sitemizde bakim calismasi yapilmaktadir.
          Kisa sure icinde tekrar erisime acilacaktir.
        </p>
        <p className="text-sm text-muted-foreground">
          Acil durumlarda bize ulasin:
          <a href="mailto:info@site.com" className="underline ml-1">
            info@site.com
          </a>
        </p>
      </div>
    </div>
  );
}
```

### Env Variables
```bash
# .env
MAINTENANCE_MODE=false
MAINTENANCE_BYPASS_SECRET=random-secret-string-here

# To enable: set MAINTENANCE_MODE=true in hosting env vars
# To bypass: visit site.com/any-page?bypass=random-secret-string-here
```

### SEO: Return 503 During Maintenance

```typescript
// src/app/maintenance/page.tsx — add to header
export async function generateMetadata() {
  return {
    robots: { index: false, follow: false },
    other: { 'http-equiv': 'retry-after', content: '3600' }, // retry in 1 hour
  };
}
```

Google sees: `503 Service Unavailable + Retry-After: 3600`
This tells Google "come back later" without hurting SEO rankings.
