# Blog & Content System Specification

> Progressive complexity: Start simple, scale when needed.
> Default: MDX files + localStorage
> Optional: Admin panel, auth (Clerk), database — ALL asked during discovery.

---

## Core Principle: Progressive Architecture

```
Level 0 (Default)     → MDX files + localStorage (no backend needed)
Level 1 (+ Import)    → WordPress/Wix XML import → MDX files
Level 2 (+ Admin)     → Admin panel (asked, not assumed)
Level 3 (+ Auth)      → Clerk/NextAuth (asked, not assumed)
Level 4 (+ Database)  → DB connected → schema built per choice
```

**RULE: Never assume a level. Always ask. Always start at Level 0.**

---

## Level 0: Default (MDX + localStorage)

### How It Works
- Blog posts live as `.mdx` files in `content/blog/`
- Post metadata cached in localStorage for fast client-side filtering/search
- No backend, no database, no auth needed
- Static generation (SSG) — fastest possible
- Works on any hosting (Vercel, Netlify, even GitHub Pages)

### Data Flow
```
content/blog/*.mdx
      │
      ▼ (build time)
generateStaticParams() reads all MDX files
      │
      ▼
Static HTML pages generated
      │
      ▼ (client-side)
localStorage caches: post index, search index, user preferences
```

### localStorage Usage
```typescript
// src/lib/blog/storage.ts

interface BlogStorage {
  // Post index (built at first visit from static JSON)
  postIndex: PostMeta[];          // title, slug, date, category, tags
  postIndexUpdatedAt: string;     // ISO date — invalidate on new deploy

  // User preferences
  readPosts: string[];            // slugs of read posts
  bookmarkedPosts: string[];      // saved for later
  searchHistory: string[];        // recent searches
  preferredCategory: string;      // last viewed category
  fontSize: 'small' | 'medium' | 'large';  // reading preference

  // Draft (if admin panel exists)
  draftPost: Partial<PostData>;   // auto-saved draft in progress
}

// Abstraction layer — same API whether localStorage or DB
export const storage = {
  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;
    const item = localStorage.getItem(`blog_${key}`);
    return item ? JSON.parse(item) : null;
  },

  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`blog_${key}`, JSON.stringify(value));
  },

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`blog_${key}`);
  }
};
```

### Post Index (Static JSON)
At build time, generate a lightweight post index:
```typescript
// scripts/generate-post-index.ts (runs at build time)
// Creates: public/blog-index.json

const index = allPosts.map(post => ({
  slug: post.slug,
  title: post.title,
  description: post.description,
  date: post.date,
  category: post.category,
  tags: post.tags,
  author: post.author,
  readingTime: post.readingTime,
  image: post.image?.src,
}));

// Client loads this once, caches in localStorage
// Invalidated when build hash changes
```

---

## Level 1: WordPress/Wix Import

### Supported Import Sources

| Source | Method | Format |
|--------|--------|--------|
| WordPress | Export → XML file | WXR (WordPress eXtended RSS) |
| Wix | Export → WordPress format | WXR (same) |
| Ghost | Export → JSON | Ghost JSON |
| Blogger | Export → XML | Atom XML |
| Medium | Export → ZIP | HTML files |
| CSV | Manual/bulk | CSV with metadata |
| JSON | Universal | Custom JSON schema |
| Any RSS feed | Pull from URL | RSS/Atom XML |

### Import Process
```
1. User provides export file (XML/JSON/CSV)
2. CLI tool parses the file
3. For each post:
   a. HTML content → converted to MDX (clean markdown)
   b. Images → downloaded to public/images/blog/
   c. SEO meta (Yoast/RankMath) → preserved in frontmatter
   d. Categories/tags → created if not exist
   e. Authors → created if not exist
   f. Old URL → 301 redirect mapped
4. MDX files written to content/blog/
5. Redirect map written to next.config.js
6. Import report generated
```

### CLI Commands
```bash
# WordPress/Wix import
npx blog import wordpress ./export.xml

# Other sources
npx blog import ghost ./ghost-export.json
npx blog import medium ./medium-export.zip
npx blog import csv ./posts.csv
npx blog import rss https://old-site.com/feed

# Export (for migration away)
npx blog export wordpress ./output.xml
npx blog export json ./output.json
npx blog export csv ./metadata.csv

# Management
npx blog new "Yazi Basligi"       # scaffold new post
npx blog list                     # list all posts
npx blog validate                 # check for errors
npx blog stats                    # counts, word totals
```

### HTML → MDX Conversion Rules
```
<h2>Title</h2>              → ## Title
<p>Text</p>                 → Text\n
<strong>bold</strong>        → **bold**
<em>italic</em>              → *italic*
<a href="url">text</a>      → [text](url)
<img src="url" alt="text">  → ![text](/images/blog/imported/filename.jpg)
<ul><li>item</li></ul>      → - item
<ol><li>item</li></ol>      → 1. item
<blockquote>text</blockquote> → > text
<pre><code>code</code></pre>  → ```code```
<table>...</table>           → | Markdown | Table |
<iframe src="youtube">       → <YouTube id="xxx" />
WordPress [shortcodes]       → stripped (flagged for manual review)
Wix widgets                  → stripped (flagged for manual review)
<div class="wp-block-*">    → cleaned to semantic markdown
```

### Post-Import Report
```
━━━━━━━━━━━━━━━━━━━━━━━
IMPORT RAPORU
━━━━━━━━━━━━━━━━━━━━━━━
Kaynak: WordPress (site-adi.com)
Tarih: 2026-03-27

Basarili: 42 yazi import edildi
Kategoriler: 8 olusturuldu
Etiketler: 24 olusturuldu
Yazarlar: 3 olusturuldu
Gorseller: 67 indirildi → public/images/blog/imported/
Yonlendirmeler: 42 adet 301 redirect haritasi olusturuldu

Dikkat gerektiren: 5 yazi
├── yazi-3: YouTube iframe → otomatik donusturuldu
├── yazi-15: [gallery] shortcode → kaldirildi, manuel ekleme gerekli
├── yazi-22: Gorsel bulunamadi (404)
├── yazi-31: Wix widget → kaldirildi
└── yazi-38: 2 adet broken link tespit edildi

SEO verisi: 40/42 yazida meta title + description korundu
```

---

## Level 2: Admin Panel (ONLY if asked)

> **RULE: Do NOT add admin panel unless user explicitly requests it.**
> Ask during discovery: "Blog yazilarini kim girecek? Teknik kisi mi, icerik ekibi mi?"

### If Admin Panel Requested

Lightweight admin — NOT a full CMS. Just enough to:
- Create/edit blog posts (WYSIWYG or Markdown editor)
- Manage categories and tags
- Upload images
- Set SEO meta per post
- Preview before publishing
- Save drafts (localStorage by default, DB if connected)
- Import/export tools (UI for CLI commands)

### Admin Routes
```
/admin                    → Dashboard (post count, recent, drafts)
/admin/posts              → Post list (filter, search, sort)
/admin/posts/new          → Create new post
/admin/posts/[id]/edit    → Edit post
/admin/categories         → Category management
/admin/tags               → Tag management
/admin/media              → Media library (uploaded images)
/admin/import             → Import wizard (upload XML/JSON/CSV)
/admin/export             → Export wizard
/admin/settings           → Blog settings
```

### Admin Storage Flow
```
WITHOUT database (default):
  Editor → save → writes MDX file to content/blog/
  (requires: Node.js API route that writes to filesystem)
  (works on: local dev, self-hosted, NOT serverless like Vercel)

WITH database (if connected):
  Editor → save → writes to DB
  Build process reads DB → generates static pages
  (works on: any hosting, including serverless)
```

### Editor Component
```
Use: @mdxeditor/editor (React MDX WYSIWYG)
OR:  Novel.sh (Notion-like editor)
OR:  TipTap (extensible, headless)

Decision asked during discovery:
"Editor tercihi: Markdown mi, Notion-like mi, klasik WYSIWYG mi?"
```

---

## Level 3: Authentication (ONLY if asked)

> **RULE: Do NOT add auth unless user explicitly requests it.**
> Ask during discovery: "Blog'a giris sistemi gerekli mi? Admin paneli koruma?"

### If Auth Requested — Provider Options

| Provider | How | Best For |
|----------|-----|----------|
| Clerk | `@clerk/nextjs` | Fastest setup, rich UI, free tier |
| NextAuth (Auth.js) | `next-auth` | Self-hosted, flexible, free |
| Supabase Auth | `@supabase/auth-helpers-nextjs` | If Supabase DB chosen |
| Firebase Auth | `firebase/auth` | If Firebase ecosystem |
| Custom | JWT + cookies | Full control, most work |

**Decision asked during discovery, NOT pre-determined.**

### Auth Usage Scenarios
```
Scenario A: Only admin protection
  → Admin routes behind auth
  → Blog is public (no login to read)
  → 1-2 admin users hardcoded or invite-only

Scenario B: User accounts
  → Readers can sign up
  → Bookmarks, reading history synced
  → Comments require login
  → Newsletter preference saved

Scenario C: Multi-author
  → Multiple writers with own profiles
  → Role-based: admin, editor, author
  → Draft review workflow
```

### Clerk Integration (if chosen)
```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

export default clerkMiddleware((auth, request) => {
  if (isAdminRoute(request)) {
    auth().protect(); // requires login
  }
});

// Only admin routes are protected
// Blog reading is always public
```

---

## Level 4: Database (ONLY if asked)

> **RULE: Do NOT add database unless user explicitly requests it.**
> Ask: "Veritabani kullanmak istiyor musunuz? Hangi veritabani?"
> If no DB → localStorage + MDX files is the architecture.

### If Database Requested — Options

| Database | ORM | Hosting | Best For |
|----------|-----|---------|----------|
| PostgreSQL (Neon/Supabase) | Prisma / Drizzle | Serverless-ready | Production, scalable |
| SQLite (Turso/LibSQL) | Drizzle | Edge-ready, cheap | Small-medium, fast |
| MongoDB (Atlas) | Mongoose | Cloud | Document-heavy content |
| Supabase (PostgreSQL) | Supabase client | Built-in auth+storage | All-in-one |
| PlanetScale (MySQL) | Prisma / Drizzle | Serverless | MySQL preference |
| Firebase Firestore | Firebase SDK | Google Cloud | Real-time features |

**Decision asked during discovery, NOT pre-determined.**

### Migration: localStorage → Database

When user decides to add a DB, this migration runs:

```typescript
// scripts/migrate-to-db.ts

async function migrateToDatabase() {
  // 1. Read all MDX files
  const posts = getAllMdxPosts();

  // 2. Create DB schema (based on chosen DB)
  await createSchema();

  // 3. Insert all posts into DB
  for (const post of posts) {
    await db.post.create({
      data: {
        slug: post.slug,
        title: post.title,
        content: post.rawContent,     // MDX content
        contentHtml: post.htmlContent, // Pre-rendered HTML
        description: post.description,
        date: post.date,
        updatedAt: post.updatedAt,
        status: post.status,
        featured: post.featured,
        readingTime: post.readingTime,
        language: post.language,
        seo: post.seo,               // JSON field
        image: post.image,            // JSON field
        authorId: post.author,
        categoryId: post.category,
        tags: post.tags,
      }
    });
  }

  // 4. Migrate localStorage user data
  console.log('Migration complete. localStorage data will sync on next user visit.');
}
```

### Database Schema (Prisma example)

```prisma
model Post {
  id          String   @id @default(cuid())
  slug        String   @unique
  title       String
  content     String   @db.Text        // MDX source
  contentHtml String   @db.Text        // Pre-rendered HTML (for SSR speed)
  description String
  date        DateTime
  updatedAt   DateTime @updatedAt
  status      PostStatus @default(DRAFT)
  featured    Boolean  @default(false)
  readingTime Int?
  language    String   @default("tr")
  views       Int      @default(0)

  // SEO (JSON field — flexible)
  seoTitle       String?
  seoDescription String?
  seoKeywords    String[]
  seoCanonical   String?
  ogImage        String?

  // Relations
  author     Author    @relation(fields: [authorId], references: [id])
  authorId   String
  category   Category  @relation(fields: [categoryId], references: [id])
  categoryId String
  tags       Tag[]

  // Image
  imageSrc   String?
  imageAlt   String?

  // Import tracking
  importSource  String?    // "wordpress", "wix", null
  importOrigUrl String?    // original URL for redirect

  createdAt  DateTime @default(now())

  @@index([slug])
  @@index([status, date])
  @@index([categoryId])
  @@index([authorId])
}

model Author {
  id        String   @id @default(cuid())
  slug      String   @unique
  name      String
  email     String?
  bio       String?  @db.Text
  avatar    String?
  jobTitle  String?
  social    Json?    // { twitter, linkedin, github }
  posts     Post[]
}

model Category {
  id          String @id @default(cuid())
  slug        String @unique
  name        String
  description String?
  posts       Post[]
}

model Tag {
  id    String @id @default(cuid())
  slug  String @unique
  name  String
  posts Post[]
}

enum PostStatus {
  DRAFT
  PUBLISHED
  SCHEDULED
  ARCHIVED
}
```

### Storage Abstraction Layer

The key: **same API regardless of storage backend.**

```typescript
// src/lib/blog/data-source.ts

interface BlogDataSource {
  // Posts
  getAllPosts(options?: { status?: string; limit?: number; offset?: number }): Promise<PostMeta[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  getPostsByCategory(category: string): Promise<PostMeta[]>;
  getPostsByTag(tag: string): Promise<PostMeta[]>;
  getPostsByAuthor(author: string): Promise<PostMeta[]>;
  searchPosts(query: string): Promise<PostMeta[]>;
  getRelatedPosts(slug: string, limit?: number): Promise<PostMeta[]>;

  // Taxonomy
  getAllCategories(): Promise<Category[]>;
  getAllTags(): Promise<Tag[]>;
  getAllAuthors(): Promise<Author[]>;

  // Write (only if admin panel exists)
  createPost?(data: CreatePostData): Promise<Post>;
  updatePost?(slug: string, data: UpdatePostData): Promise<Post>;
  deletePost?(slug: string): Promise<void>;

  // Import/Export
  importPosts(source: ImportSource, data: Buffer | string): Promise<ImportReport>;
  exportPosts(format: ExportFormat): Promise<Buffer | string>;
}

// Implementation A: MDX files (Level 0-1)
export class MdxDataSource implements BlogDataSource {
  // Reads from content/blog/*.mdx at build time
  // Uses static JSON index for client-side operations
}

// Implementation B: Database (Level 4)
export class DatabaseDataSource implements BlogDataSource {
  // Reads from database via Prisma/Drizzle
  // Write operations available
}

// Factory — returns correct implementation based on config
export function createDataSource(): BlogDataSource {
  if (process.env.DATABASE_URL) {
    return new DatabaseDataSource();
  }
  return new MdxDataSource();
}
```

---

## Crawlability (ALL Levels)

Regardless of storage backend, these rules ALWAYS apply:

### Mandatory
- ALL blog content rendered server-side (SSR or SSG)
- HTML source contains FULL post text
- Every `<h1>`, `<h2>`, `<h3>`, `<p>` is in the HTML
- Meta tags in `<head>` (not injected by client JS)
- JSON-LD in HTML source
- Images have `alt` attributes
- No content behind "Read More" click
- No infinite scroll hiding content from crawlers

### Per Post HTML Output
```html
<!-- What Google/Perplexity/ChatGPT sees in page source: -->
<article itemscope itemtype="https://schema.org/Article">
  <header>
    <h1 itemprop="headline">Web Tasarim Rehberi 2026</h1>
    <div>
      <span itemprop="author">Ahmet Yilmaz</span>
      <time itemprop="datePublished" datetime="2026-03-15">15 Mart 2026</time>
      <span>12 dk okuma</span>
    </div>
  </header>

  <div itemprop="articleBody">
    <p>Modern web tasarim, sadece guzel gorunum degil...</p>
    <h2>Neden Modern Web Tasarim Onemli?</h2>
    <p>Web siteniz dijital kartvizitinizdir...</p>
    <!-- ALL content here in HTML, visible to crawlers -->
  </div>

  <footer>
    <div class="tags">
      <a href="/blog/etiket/web-tasarim">web-tasarim</a>
      <a href="/blog/etiket/rehber">rehber</a>
    </div>
  </footer>
</article>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Web Tasarim Rehberi 2026",
  "datePublished": "2026-03-15",
  "author": { "@type": "Person", "name": "Ahmet Yilmaz" }
}
</script>
```

---

## Discovery Questions (Phase 15)

These questions determine which Level to build:

```
BLOG SORULARI:

1. Mevcut icerik var mi, nereden gelecek?
   → WordPress/Wix varsa: Level 1 (import)
   → Yoksa: Level 0

2. Blog yazilarini kim girecek?
   → Gelistirici: Level 0 (MDX dosyalari yeterli)
   → Icerik ekibi: Level 2 (admin panel gerekli)

3. Admin paneli icin giris sistemi gerekli mi?
   → Hayir: admin yok veya sifresiz
   → Evet: Level 3 → Clerk mi, NextAuth mi, baska mi?

4. Veritabani kullanmak istiyor musunuz?
   → Hayir: localStorage + MDX (Level 0)
   → Evet: Level 4 → Hangi DB? → Schema insa edilir

5. Veritabani secimi (sadece Level 4):
   → PostgreSQL (Neon/Supabase)
   → SQLite (Turso)
   → MongoDB
   → Supabase (hepsi bir arada)
   → Firebase
   → Baska: ___
```

---

## File Structure Per Level

### Level 0 (MDX + localStorage)
```
content/blog/*.mdx              ← blog posts
src/lib/blog/index.ts           ← read MDX files
src/lib/blog/storage.ts         ← localStorage abstraction
public/blog-index.json          ← static post index (build time)
```

### Level 1 (+ Import)
```
+ src/lib/blog/import/wordpress.ts
+ src/lib/blog/import/json.ts
+ src/lib/blog/import/csv.ts
+ src/lib/blog/export/wordpress.ts
+ src/lib/blog/export/json.ts
+ scripts/blog-cli.ts           ← CLI commands
```

### Level 2 (+ Admin Panel)
```
+ src/app/admin/                ← admin routes
+ src/components/admin/         ← admin UI
+ src/lib/blog/data-source.ts   ← abstraction layer
```

### Level 3 (+ Auth)
```
+ src/middleware.ts              ← route protection
+ src/lib/auth/                  ← auth config (Clerk/NextAuth)
```

### Level 4 (+ Database)
```
+ prisma/schema.prisma           ← DB schema
+ src/lib/db/                    ← DB client
+ src/lib/blog/db-source.ts      ← DB implementation of data source
+ scripts/migrate-to-db.ts       ← migration script
```
