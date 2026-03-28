# Logging Strategy Specification

> console.log production'da yetmez. Structured logging + log levels.

---

## Progressive Levels

```
Level 0 (default)   → Structured console (JSON format) — ucretsiz, yeterli
Level 1 (basic)     → + Sentry breadcrumbs (zaten Sentry varsa dahil)
Level 2 (advanced)  → External log service (Axiom, Logtail, Datadog)
```

---

## Level 0: Structured Logger (Default)

```typescript
// src/lib/logger/index.ts

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: { name: string; message: string; stack?: string };
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0, info: 1, warn: 2, error: 3
};

const MIN_LEVEL = (process.env.LOG_LEVEL as LogLevel) || (
  process.env.NODE_ENV === 'production' ? 'info' : 'debug'
);

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[MIN_LEVEL];
}

function log(level: LogLevel, message: string, context?: Record<string, any>) {
  if (!shouldLog(level)) return;

  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
  };

  if (context?.error instanceof Error) {
    entry.error = {
      name: context.error.name,
      message: context.error.message,
      stack: context.error.stack,
    };
    delete context.error;
  }

  // Production: JSON (parseable by log services)
  // Development: readable format
  if (process.env.NODE_ENV === 'production') {
    console[level === 'debug' ? 'log' : level](JSON.stringify(entry));
  } else {
    const prefix = { debug: '🔍', info: 'ℹ️', warn: '⚠️', error: '❌' }[level];
    console[level === 'debug' ? 'log' : level](
      `${prefix} [${entry.timestamp}] ${message}`,
      context || ''
    );
  }
}

export const logger = {
  debug: (msg: string, ctx?: Record<string, any>) => log('debug', msg, ctx),
  info:  (msg: string, ctx?: Record<string, any>) => log('info', msg, ctx),
  warn:  (msg: string, ctx?: Record<string, any>) => log('warn', msg, ctx),
  error: (msg: string, ctx?: Record<string, any>) => log('error', msg, ctx),
};
```

### Usage

```typescript
// API route
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  logger.info('Contact form submitted', { endpoint: '/api/contact' });

  try {
    const body = await request.json();
    logger.debug('Request body parsed', { fields: Object.keys(body) });

    await sendEmail(body);
    logger.info('Contact email sent', { to: process.env.CONTACT_EMAIL });

    return Response.json({ success: true });
  } catch (error) {
    logger.error('Contact form failed', { error, endpoint: '/api/contact' });
    return Response.json({ error: 'Failed' }, { status: 500 });
  }
}

// Blog import
logger.info('WordPress import started', { file: 'export.xml' });
logger.info('Post imported', { slug: 'yazi-slug', status: 'published' });
logger.warn('Image not found', { url: 'http://old-site.com/image.jpg', post: 'yazi-slug' });
logger.info('Import completed', { total: 42, success: 40, failed: 2 });
```

---

## Log Levels Guide

| Level | When | Example |
|-------|------|---------|
| `debug` | Development only — verbose | Request body, DB query, cache hit/miss |
| `info` | Normal operations | Form submitted, email sent, import completed |
| `warn` | Unexpected but handled | Missing image, fallback used, deprecated API |
| `error` | Failed operations | Email failed, DB error, import crashed |

### Production: Only `info`, `warn`, `error`
### Development: All levels including `debug`

---

## What to Log / What NOT to Log

### DO Log
```
✅ API request received (method, path, status)
✅ Email sent/failed (to address domain, not full address)
✅ Auth events (login, logout, failed attempt — no passwords)
✅ Import/export operations (counts, durations)
✅ Cache events (hit, miss, revalidation)
✅ Error details (stack trace, context)
✅ Performance markers (slow queries, timeouts)
```

### DO NOT Log
```
❌ Passwords or tokens
❌ Full email addresses (log domain only: *@gmail.com)
❌ Credit card numbers
❌ Session cookies
❌ API keys
❌ Personal data (GDPR compliance)
❌ Request body with sensitive fields
```

### Sanitization
```typescript
// Automatically strip sensitive fields before logging
function sanitize(obj: Record<string, any>): Record<string, any> {
  const SENSITIVE = ['password', 'token', 'secret', 'apiKey', 'cookie', 'authorization'];
  const sanitized = { ...obj };
  for (const key of Object.keys(sanitized)) {
    if (SENSITIVE.some(s => key.toLowerCase().includes(s))) {
      sanitized[key] = '[REDACTED]';
    }
  }
  return sanitized;
}
```

---

## Env Variables

```bash
# .env
LOG_LEVEL=debug        # development
# LOG_LEVEL=info       # production (default)
```
