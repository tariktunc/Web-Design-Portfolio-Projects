# User Preferences — Unified Storage Specification

> Tek API, arka planda localStorage veya Database.
> Proje buyuklugune gore otomatik secilir.
> Tema, dil, cookie consent, font boyutu, blog tercihleri — hepsi ayni katman.

---

## Core Principle

```
Kucuk site (DB yok)  → localStorage + cookie
Buyuk site (DB var)   → Database (kullanici girisliyse) + localStorage (giris yapmamissa)
```

**Karar otomatik:** `DATABASE_URL` varsa ve kullanici giris yapmissa → DB.
Diger her durumda → localStorage.

---

## What Gets Stored

| Preference | Type | localStorage | DB (if auth + DB) |
|-----------|------|-------------|-------------------|
| Theme (light/dark/system) | string | ✅ always | ✅ per user |
| Language (tr/en) | string | ✅ always | ✅ per user |
| Cookie consent | JSON | ✅ always (cookie too) | ❌ stays in cookie |
| Font size (sm/md/lg) | string | ✅ always | ✅ per user |
| Reduced motion | boolean | ✅ always | ✅ per user |
| High contrast | boolean | ✅ always | ✅ per user |
| Blog: read posts | string[] | ✅ always | ✅ per user |
| Blog: bookmarks | string[] | ✅ always | ✅ per user |
| Blog: search history | string[] | ✅ always | ❌ stays local |
| Sidebar collapsed | boolean | ✅ always | ✅ per user |
| Admin: last view | string | ✅ always | ❌ stays local |

**Cookie consent ALWAYS stays in cookie** — needs to be readable server-side before JS loads.

---

## Implementation

### The Abstraction Layer

```typescript
// src/lib/preferences/index.ts

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: 'sm' | 'md' | 'lg';
  reducedMotion: boolean;
  highContrast: boolean;
  blog: {
    readPosts: string[];
    bookmarks: string[];
    searchHistory: string[];
  };
}

const DEFAULTS: UserPreferences = {
  theme: 'system',
  language: 'tr',
  fontSize: 'md',
  reducedMotion: false,
  highContrast: false,
  blog: {
    readPosts: [],
    bookmarks: [],
    searchHistory: [],
  },
};

// --- Storage Backend Interface ---

interface PreferenceStorage {
  get<K extends keyof UserPreferences>(key: K): Promise<UserPreferences[K]>;
  set<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]): Promise<void>;
  getAll(): Promise<UserPreferences>;
  clear(): Promise<void>;
}
```

### Backend A: localStorage (Default — always available)

```typescript
// src/lib/preferences/local-storage.ts

export class LocalPreferenceStorage implements PreferenceStorage {
  private PREFIX = 'pref_';

  async get<K extends keyof UserPreferences>(key: K): Promise<UserPreferences[K]> {
    if (typeof window === 'undefined') return DEFAULTS[key];
    const raw = localStorage.getItem(`${this.PREFIX}${key}`);
    if (raw === null) return DEFAULTS[key];
    try { return JSON.parse(raw); }
    catch { return DEFAULTS[key]; }
  }

  async set<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]): Promise<void> {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`${this.PREFIX}${key}`, JSON.stringify(value));

    // Theme also needs cookie for SSR (prevent FOUC)
    if (key === 'theme') {
      document.cookie = `theme=${value}; path=/; max-age=31536000; SameSite=Lax`;
    }

    // Language also needs cookie for SSR middleware
    if (key === 'language') {
      document.cookie = `language=${value}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }

  async getAll(): Promise<UserPreferences> {
    const result = { ...DEFAULTS };
    for (const key of Object.keys(DEFAULTS) as (keyof UserPreferences)[]) {
      result[key] = await this.get(key) as any;
    }
    return result;
  }

  async clear(): Promise<void> {
    if (typeof window === 'undefined') return;
    for (const key of Object.keys(DEFAULTS)) {
      localStorage.removeItem(`${this.PREFIX}${key}`);
    }
  }
}
```

### Backend B: Database (When auth + DB exist)

```typescript
// src/lib/preferences/db-storage.ts

export class DatabasePreferenceStorage implements PreferenceStorage {
  private local = new LocalPreferenceStorage(); // fallback
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async get<K extends keyof UserPreferences>(key: K): Promise<UserPreferences[K]> {
    try {
      const record = await db.userPreference.findUnique({
        where: { userId_key: { userId: this.userId, key } }
      });
      if (!record) return this.local.get(key); // fallback to local
      return JSON.parse(record.value);
    } catch {
      return this.local.get(key); // DB error → fallback
    }
  }

  async set<K extends keyof UserPreferences>(key: K, value: UserPreferences[K]): Promise<void> {
    // Always write to local too (instant, no network wait)
    await this.local.set(key, value);

    // Then sync to DB (async, can fail silently)
    try {
      await db.userPreference.upsert({
        where: { userId_key: { userId: this.userId, key } },
        create: { userId: this.userId, key, value: JSON.stringify(value) },
        update: { value: JSON.stringify(value) },
      });
    } catch {
      // DB write failed — localStorage has the value, sync later
      this.queueSync(key, value);
    }
  }

  // Offline-resilient: queue failed writes for retry
  private queueSync(key: string, value: any) {
    const queue = JSON.parse(localStorage.getItem('pref_sync_queue') || '[]');
    queue.push({ key, value, timestamp: Date.now() });
    localStorage.setItem('pref_sync_queue', JSON.stringify(queue));
  }

  async getAll(): Promise<UserPreferences> {
    try {
      const records = await db.userPreference.findMany({
        where: { userId: this.userId }
      });
      const result = { ...DEFAULTS };
      for (const record of records) {
        (result as any)[record.key] = JSON.parse(record.value);
      }
      return result;
    } catch {
      return this.local.getAll();
    }
  }

  async clear(): Promise<void> {
    await this.local.clear();
    try {
      await db.userPreference.deleteMany({ where: { userId: this.userId } });
    } catch { /* silent */ }
  }
}
```

### Factory — Auto-Select Backend

```typescript
// src/lib/preferences/factory.ts

import { auth } from '@/lib/auth';  // Clerk or NextAuth

export async function createPreferenceStorage(): Promise<PreferenceStorage> {
  // Check: DB available?
  const hasDB = !!process.env.DATABASE_URL;

  // Check: User logged in?
  const session = await auth();
  const userId = session?.user?.id;

  // Decision
  if (hasDB && userId) {
    return new DatabasePreferenceStorage(userId);
  }

  return new LocalPreferenceStorage();
}

// Shortcut for client components
export function usePreferences() {
  // Client-side: always starts with localStorage (instant)
  // If user is logged in + DB exists: syncs in background
  const [storage] = useState(() => {
    if (typeof window === 'undefined') return new LocalPreferenceStorage();

    // Check if logged in (from cookie/session)
    const userId = getUserIdFromSession();
    if (userId && process.env.NEXT_PUBLIC_HAS_DB === 'true') {
      return new DatabasePreferenceStorage(userId);
    }
    return new LocalPreferenceStorage();
  });

  return storage;
}
```

### Database Schema Addition (Level 4 only)

```prisma
// Add to prisma/schema.prisma (only when DB is connected)

model UserPreference {
  id        String   @id @default(cuid())
  userId    String
  key       String
  value     String   @db.Text
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, key])
  @@index([userId])
}
```

---

## Theme System — How It Uses Preferences

### Small Site (No DB)
```
1. Page loads
2. <head> script reads cookie "theme" → applies class (prevents FOUC)
3. next-themes reads localStorage → manages toggle
4. User clicks toggle → localStorage + cookie updated
5. Done. No server call needed.
```

### Large Site (DB + Auth)
```
1. Page loads
2. <head> script reads cookie "theme" → applies class (prevents FOUC)
3. next-themes reads localStorage → manages toggle (INSTANT)
4. usePreferences() detects logged-in user → creates DatabasePreferenceStorage
5. User clicks toggle:
   a. localStorage + cookie updated IMMEDIATELY (user sees change)
   b. DB updated in background (async, can fail silently)
6. User logs in on another device:
   a. DB preference loaded
   b. localStorage synced from DB
   c. Theme applied from DB value
```

### Key: localStorage is ALWAYS the first read

Even with DB, localStorage is read first for instant response.
DB is the "source of truth" for cross-device sync, but never blocks the UI.

```
READ:  localStorage first (instant) → DB sync in background
WRITE: localStorage + cookie first (instant) → DB async
```

---

## Theme + SSR (FOUC Prevention)

This works identically for both localStorage-only and DB sites:

### Step 1: Cookie (set on every theme change)
```typescript
document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
```

### Step 2: Server reads cookie in middleware
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const theme = request.cookies.get('theme')?.value || 'system';
  // Pass to layout via header or cookie
}
```

### Step 3: Root layout applies class
```tsx
// layout.tsx
<html className={theme === 'dark' ? 'dark' : ''} suppressHydrationWarning>
```

### Step 4: Inline script (fallback for first visit)
```html
<script>
  (function() {
    var t = document.cookie.match(/theme=(\w+)/);
    var theme = t ? t[1] : null;
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

---

## Migration: localStorage → DB

When user adds DB to an existing site:

```typescript
// scripts/migrate-preferences-to-db.ts

async function migratePreferencesToDB(userId: string) {
  const local = new LocalPreferenceStorage();
  const prefs = await local.getAll();

  for (const [key, value] of Object.entries(prefs)) {
    await db.userPreference.upsert({
      where: { userId_key: { userId, key } },
      create: { userId, key, value: JSON.stringify(value) },
      update: { value: JSON.stringify(value) },
    });
  }

  console.log(`Migrated preferences for user ${userId}`);
}
```

Auto-migration on first login:
```typescript
// In auth callback or first-load hook
const dbPrefs = await db.userPreference.count({ where: { userId } });
if (dbPrefs === 0) {
  // First time this user has DB prefs — migrate from localStorage
  await migratePreferencesToDB(userId);
}
```
