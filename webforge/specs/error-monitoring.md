# Error Monitoring & Logging Specification

> Production'da hatalari gormek sart. Kullanici "site bozuk" demeden once sen bilmelisin.

---

## Progressive Levels

```
Level 0 (default)    → Next.js error boundary + console (dev only)
Level 1 (basic)      → Sentry free tier (10K events/month)
Level 2 (advanced)   → Sentry + LogRocket/Clarity session replay + uptime monitoring
```

---

## Discovery Questions

```
Hata izleme:
- [x] Sentry (ONERILEN — ucretsiz tier yeterli, en yaygin)
- [ ] LogRocket (session replay + error tracking)
- [ ] Bugsnag
- [ ] Datadog RUM
- [ ] Simdilik gerekmiyor, sonra ekleriz

Uptime izleme:
- [ ] BetterStack (UptimeRobot alternatifi, ucretsiz)
- [ ] UptimeRobot (ucretsiz 50 monitor)
- [ ] Vercel analytics (Vercel kullaniyorsa dahil)
- [ ] Simdilik gerekmiyor
```

---

## Level 1: Sentry Setup (Recommended Default)

### Installation
```bash
npx @sentry/wizard@latest -i nextjs
```

This auto-creates:
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- `src/app/global-error.tsx`
- Updates `next.config.js` with Sentry webpack plugin

### Configuration
```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Performance — sample 10% of transactions in production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Session replay — 1% normal, 100% on error
  replaysSessionSampleRate: 0.01,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],

  // Don't send PII
  beforeSend(event) {
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  },

  // Ignore noisy errors
  ignoreErrors: [
    'ResizeObserver loop',
    'Non-Error promise rejection',
    /Loading chunk \d+ failed/,
    'Network request failed',
  ],
});
```

### Cookie Consent Integration

```typescript
// IMPORTANT: Sentry loads ONLY after analytics consent
// Because Sentry collects performance data = analytics category

import { hasConsent } from '@/lib/consent';

export function initSentry() {
  if (!hasConsent('analytics')) {
    // Load Sentry without performance/replay (essential error tracking only)
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: 0,
      replaysSessionSampleRate: 0,
      replaysOnErrorSampleRate: 0,
      // Only catches unhandled exceptions — no tracking
    });
    return;
  }

  // Full Sentry with performance + replay
  Sentry.init({ /* full config above */ });
}
```

### Error Boundaries

```tsx
// src/app/global-error.tsx (Next.js app-level error)
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <h1>Bir hata olustu</h1>
          <p>Ozur dileriz, bir sorunla karsilastik. Ekibimiz bilgilendirildi.</p>
          <button onClick={reset}>Tekrar Dene</button>
        </div>
      </body>
    </html>
  );
}

// src/app/error.tsx (route-level error boundary)
'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function Error({ error, reset }: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <h2 className="text-2xl font-bold">Bir sorun olustu</h2>
      <p className="text-muted-foreground">Bu hata otomatik olarak raporlandi.</p>
      <button onClick={reset} className="btn btn-primary">
        Tekrar Dene
      </button>
    </div>
  );
}
```

### Custom Error Tracking

```typescript
// src/lib/monitoring/index.ts

import * as Sentry from '@sentry/nextjs';

// Track specific business errors
export function trackError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, { extra: context });
}

// Track non-error events (warnings, info)
export function trackEvent(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  Sentry.captureMessage(message, level);
}

// Track API errors
export function trackApiError(endpoint: string, status: number, body?: any) {
  Sentry.captureMessage(`API Error: ${endpoint} → ${status}`, {
    level: 'error',
    extra: { endpoint, status, body },
  });
}

// Usage in API routes:
// try { ... } catch (e) { trackError(e, { route: '/api/contact' }); }
```

---

## Level 2: Uptime Monitoring

```
BetterStack (or UptimeRobot):
- Monitor: https://site.com (every 1 min)
- Monitor: https://site.com/api/health (every 1 min)
- Alert: email + Slack/Discord webhook
```

### Health Check Endpoint
```typescript
// src/app/api/health/route.ts
export async function GET() {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: await checkDatabase(),
      email: await checkEmail(),
    }
  };

  const allOk = Object.values(checks.checks).every(c => c === 'ok');

  return Response.json(checks, {
    status: allOk ? 200 : 503,
    headers: { 'Cache-Control': 'no-cache' }
  });
}

async function checkDatabase(): Promise<string> {
  if (!process.env.DATABASE_URL) return 'not_configured';
  try {
    await db.$queryRaw`SELECT 1`;
    return 'ok';
  } catch { return 'error'; }
}

async function checkEmail(): Promise<string> {
  if (!process.env.EMAIL_PROVIDER) return 'not_configured';
  return 'ok'; // basic check — provider SDK loaded
}
```

---

## Env Variables

```bash
# .env.example
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_AUTH_TOKEN=sntrys_xxx     # for source maps upload
SENTRY_ORG=org-name
SENTRY_PROJECT=project-name
```

---

## File Structure

```
src/
├── lib/monitoring/
│   └── index.ts              → trackError, trackEvent, trackApiError
├── app/
│   ├── global-error.tsx      → App-level error boundary
│   ├── error.tsx             → Route-level error boundary
│   └── api/health/route.ts   → Health check endpoint
sentry.client.config.ts       → Client-side Sentry config
sentry.server.config.ts       → Server-side Sentry config
sentry.edge.config.ts         → Edge runtime Sentry config
```
