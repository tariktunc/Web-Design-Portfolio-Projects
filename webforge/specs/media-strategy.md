# Media & Image Strategy Specification

> Where do images live? How are they optimized? Progressive like everything else.

---

## Progressive Levels

```
Level 0 (default)    → public/ folder + next/image (local, no external service)
Level 1 (CDN)        → Vercel Image Optimization / Netlify (hosting handles it)
Level 2 (cloud)      → Cloudinary / Uploadthing / AWS S3 + CloudFront
```

---

## Discovery Questions

```
Gorsel/medya yonetimi:
- [x] Local (public/ klasoru) — ONERILEN baslangic
- [ ] Cloudinary (otomatik optimizasyon, transform)
- [ ] Uploadthing (Next.js-native upload)
- [ ] AWS S3 + CloudFront
- [ ] Supabase Storage
- [ ] Firebase Storage
- [ ] Henuz bilmiyorum

Blog icin gorsel yukleme:
- [ ] Admin panelden yukle (Level 2 gerekli)
- [ ] Manuel kopyala (public/ klasorune)
- [ ] URL ile referans (dis kaynak)
```

---

## Level 0: Local Images (Default)

```
public/
├── images/
│   ├── logo.svg                → Site logo
│   ├── og-default.jpg          → Default OG image (1200x630)
│   ├── hero/                   → Hero section images
│   ├── team/                   → Team member photos
│   ├── blog/                   → Blog post images
│   │   ├── imported/           → WordPress/Wix'ten gelen
│   │   └── 2026/               → Yil bazli organizasyon
│   └── icons/                  → Custom icons (if not using Lucide)
```

### Optimization Rules (next/image)
```tsx
// ALWAYS use next/image — never raw <img>
import Image from 'next/image';

<Image
  src="/images/hero/main.jpg"
  alt="Descriptive alt text — MANDATORY"   // SEO + a11y
  width={1200}                              // Prevent CLS
  height={630}                              // Prevent CLS
  priority={isAboveFold}                    // LCP optimization
  placeholder="blur"                        // Better UX
  blurDataURL={blurHash}                    // Tiny placeholder
  sizes="(max-width: 768px) 100vw, 50vw"   // Responsive
  quality={80}                              // Good balance
/>
```

### Image Formats
```
Source format → next/image auto-converts:
  .jpg/.png → WebP (Chrome, Edge, Firefox)
  .jpg/.png → AVIF (Chrome, newer browsers)

Always provide: width + height (prevents CLS)
Always provide: alt text (SEO + accessibility)
Above fold: priority={true} (preload, no lazy)
Below fold: automatic lazy loading (default)
```

---

## Level 2: Cloud Storage (When Needed)

### Cloudinary
```typescript
// src/lib/media/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(file: Buffer, folder: string): Promise<string> {
  const result = await cloudinary.uploader.upload(
    `data:image/jpeg;base64,${file.toString('base64')}`,
    { folder: `site/${folder}`, quality: 'auto', format: 'auto' }
  );
  return result.secure_url;
}

// Auto-optimization URL
export function optimizedUrl(publicId: string, width: number): string {
  return cloudinary.url(publicId, {
    width, crop: 'fill', quality: 'auto', format: 'auto', fetch_format: 'auto'
  });
}
```

### Uploadthing (Next.js Native)
```typescript
// src/lib/media/uploadthing.ts
import { createUploadthing } from 'uploadthing/next';

const f = createUploadthing();

export const uploadRouter = {
  blogImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // auth check if admin panel
      return { userId: 'admin' };
    })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url };
    }),
};
```

---

## Image Size Guide

| Usage | Dimensions | Format | Max Size |
|-------|-----------|--------|----------|
| OG Image | 1200x630 | jpg | 200KB |
| Blog hero | 1200x630 | jpg/webp | 150KB |
| Blog thumbnail | 400x210 | jpg/webp | 50KB |
| Team photo | 400x400 | jpg/webp | 80KB |
| Logo (header) | SVG or 200xAuto | svg/png | 20KB |
| Logo (OG) | 400x400 | png | 50KB |
| Favicon | 32x32 | ico | 5KB |
| Apple touch | 180x180 | png | 15KB |
| PWA icon | 512x512 | png | 30KB |

---

## Responsive Images Pattern

```tsx
// Hero image — full width on mobile, half on desktop
<Image
  src="/images/hero/main.jpg"
  alt="Hero description"
  width={1920}
  height={1080}
  priority
  sizes="100vw"
  className="w-full h-auto"
/>

// Blog post image — full on mobile, contained on desktop
<Image
  src={post.image.src}
  alt={post.image.alt}
  width={1200}
  height={630}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
  className="rounded-lg"
/>

// Team member — small, fixed size
<Image
  src={member.avatar}
  alt={`${member.name} — ${member.role}`}
  width={200}
  height={200}
  className="rounded-full"
/>
```

---

## File Structure

```
src/lib/media/
├── index.ts           → createMediaService factory
├── local.ts           → Local file handling
├── cloudinary.ts      → Cloudinary (if chosen)
├── uploadthing.ts     → Uploadthing (if chosen)
└── optimize.ts        → Sharp-based local optimization (build time)
```
