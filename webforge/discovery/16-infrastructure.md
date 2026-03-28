# Phase 16: Infrastructure & DevOps

> Ask these questions in TURKISH. Covers email, media, monitoring, CI/CD, URL rules.
> All have sensible defaults — user can say "varsayilan" to accept all.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 16: Altyapi & DevOps
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

49. E-posta servisi (iletisim formu icin):
    - [ ] Resend (modern, kolay — ONERILEN)
    - [ ] SendGrid (yaygin, ucretsiz tier)
    - [ ] Amazon SES (ucuz, yuksek hacim)
    - [ ] SMTP (kendi sunucu)
    - [ ] Simdilik gerekmiyor

50. Gorsel/medya yonetimi:
    - [x] Local (public/ klasoru + next/image) — ONERILEN baslangic
    - [ ] Cloudinary (otomatik optimizasyon)
    - [ ] Uploadthing (Next.js-native upload)
    - [ ] AWS S3 + CloudFront
    - [ ] Supabase Storage

51. Hata izleme (production):
    - [x] Sentry (ONERILEN — ucretsiz tier yeterli)
    - [ ] Simdilik gerekmiyor, sonra ekleriz

52. Uptime izleme:
    - [ ] BetterStack (ucretsiz)
    - [ ] UptimeRobot (ucretsiz)
    - [ ] Simdilik gerekmiyor

53. Hosting:
    - [ ] Vercel (ONERILEN — CI/CD dahil)
    - [ ] Netlify
    - [ ] AWS Amplify
    - [ ] Docker (self-hosted)
    - [ ] Diger: ___

54. CI/CD:
    - [ ] Hosting'in dahili CI/CD'si yeterli (Vercel/Netlify)
    - [ ] GitHub Actions (ozel pipeline: lint → build → test → deploy)
    - [ ] Ikisi birden

55. Preview deployments:
    - [x] PR acildiginda otomatik preview URL (ONERILEN)
    - [ ] Sadece main branch deploy olsun

56. URL kurallari:
    - www: [ ] www.site.com  /  [x] site.com (www'suz — ONERILEN)
    - Trailing slash: [x] Yok (/about)  /  [ ] Var (/about/)
    - HTTP → HTTPS: [x] Otomatik redirect (HER ZAMAN)
    - Lowercase: [x] Zorunlu (HER ZAMAN)

57. Favicon/icon:
    - [ ] Logomuz var, ondan uretilsin
    - [ ] Metin bazli icon (marka basligi)
    - [ ] Sonra ekleriz

58. Test altyapisi:
    - [x] ESLint + TypeScript check (HER ZAMAN)
    - [ ] Playwright E2E testleri
    - [ ] Playwright a11y testleri
    - [ ] Vitest unit testleri
    - [ ] Lighthouse CI (performans gate)
```

## Defaults
- Email: None (console in dev, asked for production)
- Media: Local + next/image
- Monitoring: Sentry free tier
- Hosting: User choice (Vercel recommended)
- CI/CD: Hosting built-in
- URL: non-www, no trailing slash, HTTPS, lowercase
- Favicon: To be generated
- Tests: ESLint + TypeScript (minimum)

## Output Format
```json
{
  "phase": "infrastructure",
  "email": { "provider": null, "templates": ["contact-notification", "contact-confirmation"] },
  "media": "local",
  "monitoring": "sentry",
  "uptime": null,
  "hosting": "tbd",
  "cicd": "hosting-builtin",
  "preview_deploys": true,
  "url_rules": { "www": false, "trailing_slash": false, "https": true, "lowercase": true },
  "favicon": "to-generate",
  "tests": ["eslint", "typescript"]
}
```
