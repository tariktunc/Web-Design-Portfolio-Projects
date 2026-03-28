# Phase 13: Security & Infrastructure

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 13: Guvenlik & Altyapi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

30. Guvenlik header'lari (varsayilan: HEPSI AKTIF):
    - [x] Content-Security-Policy (CSP)
    - [x] X-Content-Type-Options: nosniff
    - [x] X-Frame-Options: DENY
    - [x] Referrer-Policy: strict-origin-when-cross-origin
    - [x] Permissions-Policy (camera, microphone, geolocation kapali)
    - [x] Strict-Transport-Security (HSTS)
    - [x] Cross-Origin-Opener-Policy (COOP)
    - [x] Cross-Origin-Resource-Policy (CORP)

31. Uygulama guvenligi:
    - [x] Input sanitization (XSS onleme)
    - [x] HTTPS zorunlu (HTTP → HTTPS redirect)
    - [x] Environment variables (.env — ASLA commit edilmez)
    - [ ] CSRF koruması (form submission — backend varsa)
    - [ ] Rate limiting (API endpoints — backend varsa)
    - [ ] SQL injection koruması (ORM — DB varsa)
    - [ ] Authentication (hangi provider: ___)
    - [ ] Authorization (RBAC / ABAC)
    - [ ] Dependency audit (npm audit / snyk)

32. Hosting & Deployment:
    - [ ] Vercel (ONERILEN Next.js icin)
    - [ ] Netlify
    - [ ] AWS (Amplify / CloudFront + S3)
    - [ ] Google Cloud Run
    - [ ] Azure Static Web Apps
    - [ ] Self-hosted (Docker)
    - [ ] Henuz karar vermedim

33. CI/CD:
    - [ ] GitHub Actions
    - [ ] GitLab CI
    - [ ] Vercel auto-deploy (Git push → deploy)
    - [ ] Preview deployments (PR bazli)
    - [ ] Staging environment
```

## Defaults
- All security headers: ON
- XSS protection, HTTPS, env vars: ON
- CSRF, rate limiting, auth: OFF (depends on backend)
- Hosting: User choice
- CI/CD: User choice

## Security Headers Implementation

### Next.js (next.config.js)
```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://www.clarity.ms https://region1.google-analytics.com",
      "frame-src 'self' https://www.google.com https://www.youtube.com",
      "frame-ancestors 'none'",
    ].join('; ')
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
];

module.exports = {
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
};
```

### .env.example Template
```bash
# App
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_SITE_NAME="Site Name"

# Analytics (NEVER commit actual values)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx

# API Keys (server-side only — NO NEXT_PUBLIC_ prefix)
DATABASE_URL=
AUTH_SECRET=
```

## Output Format
```json
{
  "phase": "security",
  "security_headers": "full",
  "xss_protection": true,
  "https": true,
  "csrf": false,
  "rate_limiting": false,
  "auth": null,
  "hosting": "tbd",
  "cicd": "tbd"
}
```
