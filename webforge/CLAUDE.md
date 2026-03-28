# WebForge — Execution Engine

> Bu dosya projeye kopyalandiginda Claude Code'un GERCEKTEN okuyup calistiracagi dosyadir.
> BOOTSTRAP.md mimari referanstir. Bu dosya ise CALISMA TALIMATIDIR.
> v3.0.0 | 2026-03-27

---

## TEMEL KURAL: Basitlik Kazanir

Bu sistem 11 agent tanimlar ama HEPSINI ayni anda kullanma.
Projenin buyuklugune gore sadece GEREKLI olanlari aktiflestir.

---

## QUICK START (Claude icin talimat)

### Adim 1: Projeyi Tara
```
Glob + Grep ile tara:
- package.json → framework
- src/ veya app/ → mimari
- .env.example → servisler
```

### Adim 2: Hizli Kesif (TEK SEFERDE sor)

Kullaniciya TEK MESAJDA su sorulari sor (14 faz degil, 1 blok):

```
Web projenizi kurmak icin bilgiye ihtiyacim var:

1. SITE: Ne turu bir site? (kurumsal / e-ticaret / SaaS / blog / landing)
2. MARKA: Marka adi ve slogani var mi? Yoksa olusturulsun mu?
3. RENKLER: Marka renkleri belli mi? (hex kodlari verin veya "onerilen" deyin)
4. FONT: Font tercihi? (modern/klasik/sistem fontu)
5. TON: Nasil konussun? (resmi / yari-resmi / samimi)
6. DIL: Kac dil? (TR / TR+EN / diger)
7. SAYFALAR: Hangi sayfalar? (ana, hakkimizda, iletisim, blog, sss...)
8. HEDEF: Ziyaretci ne yapsin? (form gondersin / arasin / satin alsin)
9. ANAHTAR KELIMELER: Bildiginiz hedef kelimeler? (varsa yazin, yoksa "arastirilsin")
10. RAKIPLER: Begendiginiz/rakip siteler? (URL verin)
11. OZEL ISTEKLER: Baska bir sey var mi?

Bilmediginiz veya kararsiz oldugunuz sorulara "sen karar ver" yazabilirsiniz.
```

### Adim 3: Proje Buyuklugune Gore Agent Sec

**Kucuk (1-5 sayfa, tanitim sitesi):**
```
Aktif: frontend-dev + seo-sem-expert
Pasif: diger hersey
Calisma modu: Direkt kendin yap, agent KULLANMA, cok kucuk is.
```

**Orta (5-15 sayfa, kurumsal/blog):**
```
Aktif agentlar:
1. brand-strategist (once calistir → brand-guide olustur)
2. keyword-analyst (brand ile paralel calistir)
3. Sonra: frontend-dev + seo-sem-expert + infra-engineer (paralel)
4. Son: test-engineer (kalite kontrol)

Toplam: 5 agent, 2 faz
```

**Buyuk (15+ sayfa, SaaS, e-ticaret, cok dilli):**
```
Tam 11 agent, 4 faz (Phase A/B/C/D)
BOOTSTRAP.md'deki tam akisi kullan.
```

### Adim 4: Calistir

**PARALEL BASLATMA KURALI:**
Her fazda bagimsiz agentlari TEK MESAJDA baslat.
```
// DOGRU — ayni anda:
Agent(brand-strategist, prompt: "...") + Agent(keyword-analyst, prompt: "...")

// YANLIS — sirayla:
Agent(brand-strategist) → bekle → Agent(keyword-analyst)
```

**AGENT PROMPT KURALI:**
Her agent'a verdigin prompt TAMAMEN BAGIMSIZ olmali.
Agent baskalarinin ne yaptigini bilmez. Tum bilgiyi prompt icinde ver.

---

## AGENT CAGIRMA SABLONU

### brand-strategist Cagrisi
```
Agent(
  subagent_type: "brand-strategist",
  name: "brand",
  prompt: "
    PROJE: [site adi/turu]
    SEKTOR: [sektor]
    KITLE: [hedef kitle]
    TON: [resmi/yari-resmi/samimi]
    KISILIK: [3-5 ozellik]
    RENKLER: [kullanicinin verdigi veya 'olustur']
    FONT: [tercih veya 'olustur']
    RAKIPLER: [varsa listele]

    GOREV: brand-guide.json olustur.
    Icermeli: renkler (hex+hsl, light/dark), fontlar, ton kurallari,
    CTA stili, kelime kullanim kurallari, gorsel dil.

    CIKTI: brand-guide.json icerigini SendMessage ile lead-manager'a gonder.
  "
)
```

### keyword-analyst Cagrisi
```
Agent(
  subagent_type: "keyword-analyst",
  name: "keywords",
  prompt: "
    PROJE: [site adi/turu]
    SEKTOR: [sektor]
    HEDEF PAZAR: [ulke/sehir]
    DIL: [tr/en]
    BILINEN KELIMELER: [kullanicinin verdikleri]
    RAKIPLER: [domain listesi]
    DONUSUM HEDEFI: [form/arama/satin alma]
    SAYFALAR: [sayfa listesi]

    GOREV: keyword-report.json olustur.
    Her sayfa icin: primary keyword, secondary keywords, meta title, meta description, H1 onerisi.
    FAQ sayfasi icin: soru bazli anahtar kelimeler.
    AI arama icin: ChatGPT/Perplexity'de sorulan tipik sorular.

    CIKTI: keyword-report.json icerigini SendMessage ile lead-manager'a gonder.
  "
)
```

### seo-sem-expert Cagrisi
```
Agent(
  subagent_type: "seo-sem-expert",
  name: "seo",
  prompt: "
    BRAND GUIDE: [brand-guide.json icerigi BURAYA YAPISTIR]
    KEYWORD REPORT: [keyword-report.json icerigi BURAYA YAPISTIR]
    FRAMEWORK: Next.js App Router
    SAYFALAR: [sayfa listesi]

    GOREV:
    1. src/lib/seo/metadata.ts → generatePageMetadata helper
    2. src/lib/seo/keyword-map.ts → keyword-report'tan sayfa bazli esleme
    3. src/lib/seo/schemas.ts → JSON-LD generators
    4. src/components/seo/json-ld.tsx → component
    5. src/app/sitemap.ts → dinamik sitemap
    6. src/app/robots.ts → AI bot kurallari dahil
    7. public/llms.txt → site ozeti
    8. public/llms-full.txt → detayli icerik haritasi

    KURALLAR:
    - Meta title formulu: keyword-map'teki meta_title'i kullan
    - Her sayfada canonical URL
    - JSON-LD schema.org/validator'da gecerli olmali
    - Keyword density: %1-2 primary, dogal secondary
  "
)
```

---

## PROGRESSIVE STORAGE — KULLANICI TERCIHLERI

Tema, dil, font boyutu, blog tercihleri — hepsi ayni katman:

```
DB yok → localStorage + cookie (aninda, sunucusuz)
DB var + auth var → DB per user + localStorage cache + cookie
```

### KURALLAR:
1. **localStorage HER ZAMAN ilk okunur** (aninda tepki, FOUC yok)
2. **Cookie HER ZAMAN yazilir** (tema/dil icin SSR uyumu)
3. **DB varsa arka planda senkronize edilir** (async, hata olursa local kalir)
4. **Kullanici fark etmez** — ayni API, ayni `usePreferences()` hook

### Hangi Veri Nerede:
```
localStorage:  tema, dil, font, blog okuma gecmisi (HER ZAMAN)
cookie:        tema, dil, cookie consent (SSR icin HER ZAMAN)
DB:            tema, dil, font, blog bookmarks (SADECE auth + DB varsa)
```

Detay: `specs/user-preferences.md`

---

## KULLANICI MESAJI ISLEME

user-liaison agent'i KULLANMA. Bunun yerine:

1. Kullanici herhangi bir dilde yazar
2. SEN (ana Claude) mesaji anla
3. Anlasilmayan yer varsa DIREKT kullaniciya sor
4. Anlasildiktan sonra agent'lara INGILIZCE prompt yaz

Bu 2 hop'u (user-liaison + prompt-engineer) ortadan kaldirir.
**Sonuc: Daha hizli, daha az hata.**

---

## DURUM RAPORU (kullaniciya goster)

Her agent bittiginde kullaniciya kisa ozet goster:

```
✅ Marka kimligi tamamlandi
   → Renkler: #2563EB (mavi), #F59E0B (turuncu)
   → Font: Inter
   → Ton: Yari resmi, profesyonel

✅ Anahtar kelime raporu hazir
   → 12 birincil kelime, 28 ikincil kelime
   → 8 soru bazli kelime (FAQ icin)

🔄 Frontend gelistirme devam ediyor...
   → Ana sayfa %80, Iletisim %40

⏳ SEO yapilandirmasi bekliyor (frontend'e bagimli)
```

---

## DETAYLI REFERANSLAR

Daha derin bilgi gerektiginde bu dosyalari oku:

| Konu | Dosya |
|------|-------|
| Tam mimari ve agent akisi | BOOTSTRAP.md |
| Agent sablonlari | agents/*.md |
| Discovery sorulari (detay) | discovery/*.md |
| Cookie consent spec | specs/cookie-consent.md |
| Dosya yapisi haritasi | specs/file-structure.md |
| Uygulama sirasi | specs/implementation-order.md |
| llms.txt formati | specs/llms-txt.md |
| Blog sistemi spec | specs/blog-system.md |
| Kullanici tercihleri (tema, dil) | specs/user-preferences.md |
| E-posta sistemi | specs/email-system.md |
| Gorsel/medya stratejisi | specs/media-strategy.md |
| Hata izleme (Sentry) | specs/error-monitoring.md |
| CI/CD pipeline | specs/cicd-pipeline.md |
| Favicon/icon uretimi | specs/favicon-icons.md |
| URL normalizasyonu & redirect | specs/url-normalization.md |
| Test altyapisi (Playwright) | specs/test-setup.md |
| Cache/ISR stratejisi | specs/cache-strategy.md |
| GDPR/KVKK veri haklari | specs/gdpr-data-rights.md |
| Dependency guncelleme | specs/dependency-management.md |
| Bakim modu | specs/maintenance-mode.md |
| Animasyon/motion sistemi | specs/animation-motion.md |
| Loglama stratejisi | specs/logging-strategy.md |
| Kalite kontrol listesi | checklists/quality-gate.md |
| Erisilebilirlik testi | checklists/accessibility.md |
| Altyapi discovery | discovery/16-infrastructure.md |
| Dil kurallari, arac onceligi | CONFIG.md |

**KURAL: Tum dosyalari basta okuma. Sadece O AN gerekli olani oku.**

---

## BLOG SISTEMI KURALLARI

Blog istendiyse `specs/blog-system.md` dosyasini oku. Ozetle:

### Progressive Architecture (ASLA varsayma, her zaman sor)
```
Level 0 (varsayilan) → MDX dosyalari + localStorage (backend yok)
Level 1 (+ import)   → WordPress/Wix XML import → MDX'e donustur
Level 2 (+ admin)    → Admin paneli (SADECE istenirse)
Level 3 (+ auth)     → Clerk/NextAuth (SADECE istenirse)
Level 4 (+ DB)       → Veritabani baglantisi (SADECE istenirse)
```

### KRITIK KURALLAR:
1. **Admin paneli SORULMADAN eklenmez**
2. **Auth sistemi SORULMADAN eklenmez**
3. **Veritabani SORULMADAN bagllanmaz**
4. **Varsayilan: localStorage + MDX — en basit, en hizli**
5. **"Ileride eklenebilsin" denirse: abstraction layer kur, DB ekleme**

### Veri Katmani Soyutlamasi (HER ZAMAN kur)
```typescript
// BlogDataSource interface — ayni API, arka planda localStorage veya DB
const source = createDataSource(); // config'e gore MDX veya DB doner
const posts = await source.getAllPosts();
const post = await source.getPostBySlug('yazi-slug');
```
Bu soyutlama sayesinde localStorage → DB gecisi tek satir degisiklik.

### Crawlability (TUM LEVEL'LARDA GECERLI)
```
KURAL: Blog icerik sayfasi (/blog/[slug]) TAMAMEN SSG olmali.
generateStaticParams ile tum sluglar build time'da uretilmeli.
HTML source'da <article> icinde TUM metin gorunmeli.
Google "view source" yaptiginda tum yaziyi gormeli.
ChatGPT/Perplexity crawl ettiginde tum baslik + paragraf + tablo gorunmeli.
Hicbir icerik "load more" arkasinda gizlenemez.
Hicbir metin JavaScript ile yuklenemez.
```

### Her Blog Yazisi ICERMELI:
- Article JSON-LD schema
- Benzersiz meta title + description
- Open Graph + Twitter Card
- Canonical URL
- Author bilgisi + Published/Updated date
- Reading time + Table of Contents
- Category + tags + Breadcrumb schema

---

## HATA ONLEME KURALLARI

1. **Agent'a 1000+ satirlik dosya gonderme** → ozetle, gereken kismi gonder
2. **11 agent'i ayni anda baslatma** → faz faz ilerle
3. **Agent ciktisini tahmin etme** → bildirim gelene kadar bekle
4. **Ayni dosyaya 2 agent yazdirma** → cakisma olur, sirayla yap
5. **Brand-guide olmadan frontend baslatma** → renkler/fontlar belirsiz olur
6. **Keyword-report olmadan SEO baslatma** → meta tag'ler icerik olmaz
7. **Blog icerigini client-side render etme** → SSR/SSG ZORUNLU, crawlability bozulur
8. **Import sirasinda eski URL'leri unutma** → 301 redirect haritasi ZORUNLU
