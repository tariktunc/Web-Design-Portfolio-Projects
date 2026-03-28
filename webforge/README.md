# WebForge v3.0

AI-Orchestrated Web Project Blueprint System.
Yapay zeka agentlari ile sorular sorarak web projesi tasarlayan ve insa eden sistem.
Marka, keyword, SEO/SEM/GEO/AIO, erisilebilirlik, cookie consent, blog, email
ve 19 teknik spec kapsayan 11 uzman agent ile calisir.

## Kullanim

### Yontem 1: Projeye kopyala
```bash
cp -r webforge/ /proje-dizini/
```
Sonra projenin `CLAUDE.md` dosyasina ekle:
```markdown
@webforge/BOOTSTRAP.md dosyasini oku ve uygula.
```

### Yontem 2: Direkt referans
Claude Code'a soyle:
```
webforge klasorunu oku ve web projemi kur
```

## Ne yapar?

```
KULLANICI (herhangi bir dilde)
    │
    ▼
[user-liaison] ← Duzeltir, netlestirir, Ingilizceye cevirir
    │
    ▼
[prompt-engineer] ← Yapilandirilmis Task JSON olusturur
    │
    ▼
[lead-manager] ← Ajanslari paralel/sirayla calistirir
    │
    ├── Phase A: Arastirma
    │   ├── [brand-strategist] → Marka kimligi, renkler, ton
    │   └── [keyword-analyst]  → Anahtar kelime, trafik hedefleri
    │
    ├── Phase B: Strateji
    │   ├── [seo-sem-expert]     → SEO/SEM/GEO/AIO stratejisi
    │   └── [content-strategist] → Icerik plani, mesajlasma
    │
    ├── Phase C: Gelistirme
    │   ├── [frontend-dev]   → UI, sayfalar, a11y, tema, i18n
    │   ├── [backend-dev]    → API, DB, auth, email
    │   └── [infra-engineer] → Cookie, analytics, guvenlik
    │
    └── Phase D: Kalite
        └── [test-engineer]  → A11y, SEO, performans, guvenlik audit
    │
    ▼
[prompt-engineer] ← Sonuc raporunu derler
    │
    ▼
[user-liaison] ← Kullanicinin diline cevirir
    │
    ▼
KULLANICI (sonuclari kendi dilinde gorur)
```

## Klasor Yapisi

```
webforge/
├── BOOTSTRAP.md                ← Ana giris noktasi (mimari + akis)
├── CONFIG.md                   ← Dil kurallari, agent temelleri
├── README.md                   ← Bu dosya
│
├── discovery/ (16 faz)         ← Sira sira sorulacak sorular
│   ├── 01-core-identity.md     Site turu, kitle, dil, domain
│   ├── 02-brand-strategy.md    Marka kimligi, ton, kisilik
│   ├── 03-visual-identity.md   Renkler, font, logo, gorsel dil
│   ├── 04-keyword-strategy.md  Anahtar kelimeler, trafik, rakip
│   ├── 05-legal-privacy.md     Cookie, GDPR/KVKK, yasal sayfalar
│   ├── 06-accessibility.md     WCAG, UI kutuphane, a11y
│   ├── 07-theme-visual.md      Light/Dark/System, design tokens
│   ├── 08-seo.md               Meta, JSON-LD, sitemap, CWV
│   ├── 09-sem.md               GTM, pixel, conversion tracking
│   ├── 10-geo.md               AI arama (llms.txt)
│   ├── 11-aio-llmo.md          AI bot yonetimi, icerik yapisi
│   ├── 12-analytics-performance.md  GA4, Clarity, performans
│   ├── 13-security.md          Header, auth, hosting, CI/CD
│   ├── 14-ux-social.md         Sayfalar, bilesenler, sosyal medya
│   ├── 15-blog-system.md       Blog (progressive Level 0-4)
│   └── 16-infrastructure.md    Email, medya, Sentry, CI/CD, URL
│
├── agents/ (11 ajan)           ← Proje icine kopyalanacak sablonlar
│   ├── user-liaison.md         Kullanici iletisimi, ceviri, duzeltme  ★
│   ├── prompt-engineer.md      Task JSON olusturucu                   ★
│   ├── lead-manager.md         Koordinasyon, gorev dagitimi
│   ├── brand-strategist.md     Marka kimligi, renk, ton, kisilik     ★
│   ├── keyword-analyst.md      Anahtar kelime arastirmasi             ★
│   ├── seo-sem-expert.md       SEO/SEM/GEO/AIO hepsi bir arada       ★
│   ├── content-strategist.md   Icerik plani, mesajlasma, kopya        ★
│   ├── frontend-dev.md         UI, sayfalar, a11y, tema, i18n
│   ├── backend-dev.md          API, DB, auth, email
│   ├── infra-engineer.md       Cookie consent, analytics, guvenlik
│   └── test-engineer.md        Kalite kontrolu, audit
│
├── specs/ (19 dosya)           ← Teknik sartnameler
│   ├── implementation-order.md Uygulama sirasi (5+ faz)
│   ├── file-structure.md       Proje dosya haritasi
│   ├── cookie-consent.md       Cookie consent (Google CM v2)
│   ├── llms-txt.md             AI icin site ozeti
│   ├── blog-system.md          Blog (progressive Level 0-4)
│   ├── user-preferences.md     Tema/dil storage (local → DB)
│   ├── email-system.md         E-posta (Resend/SendGrid/SMTP)
│   ├── media-strategy.md       Gorsel yonetimi (local → cloud)
│   ├── error-monitoring.md     Sentry + uptime + health check
│   ├── cicd-pipeline.md        GitHub Actions + deploy
│   ├── favicon-icons.md        Icon uretimi
│   ├── url-normalization.md    www, slash, redirect, 404
│   ├── test-setup.md           Playwright + Vitest + a11y
│   ├── cache-strategy.md       SSG/ISR/SSR, revalidation
│   ├── gdpr-data-rights.md     Veri export/silme (auth varsa)
│   ├── dependency-management.md Renovate/Dependabot
│   ├── maintenance-mode.md     Bakim modu (503 + bypass)
│   ├── animation-motion.md     Animasyon + reduced-motion
│   └── logging-strategy.md     Structured logging
│
└── checklists/ (2 dosya)       ← Kalite kontrol
    ├── quality-gate.md         13 kategorili tam checklist
    └── accessibility.md        WCAG 2.2 AA detay
```

## Agent Iletisim Akisi

```
user-liaison ←→ prompt-engineer ←→ lead-manager
                                        │
                    ┌───────────────────┼───────────────────┐
                    ▼                   ▼                   ▼
            brand-strategist    keyword-analyst     seo-sem-expert
                    │                   │                   │
                    └─────────┬─────────┘                   │
                              ▼                             │
                      content-strategist ←──────────────────┘
                              │
                    ┌─────────┼─────────┐
                    ▼         ▼         ▼
              frontend   backend    infra
                    │         │         │
                    └─────────┼─────────┘
                              ▼
                        test-engineer
```

## Kisayol Komutlari

| Komut | Eylem |
|-------|-------|
| `varsayilan` | Mevcut faz icin varsayilanlari kullan |
| `atla` | Mevcut fazi atla |
| `hepsini varsayilan` | Kalan tum fazlar icin varsayilan |
| `geri` | Onceki faza don |
| `matris` | Gereksinim matrisini goster |
| `durum` | Agent durum panosunu goster |
| `baslat` | Soru sormadan insaya basla |

## Onemli Kurallar

1. **Kullanici ASLA dogrudan agent'larla konusmaz** — her sey user-liaison uzerinden akar
2. **Agent'lar arasi iletisim INGILIZCE** — kullaniciya donus HER ZAMAN kullanici dilinde
3. **Kullanici mesaji duzeltilmeden iletilmez** — user-liaison once duzeltir, sonra ceviri yapar
4. **Her agent gorev bitiminde durum raporu verir** — JSON formatinda, lead-manager'a
5. **Paralel calisabilecek gorevler TEK MESAJDA baslatilir** — sirayla degil

## Versiyon

- v3.0.0 (2026-03-27): WebForge olarak yeniden adlandirildi. 19 spec, 16 discovery, 13 checklist kategorisi. Cache, GDPR, dependency, maintenance, animation, logging eklendi. 1000+ site olcegi arastirmasi tamamlandi.
- v2.0.0 (2026-03-27): Tam agent zinciri, marka/keyword/content agentlari eklendi
- v1.0.0 (2026-03-27): Ilk surum (claude-web-setup)
