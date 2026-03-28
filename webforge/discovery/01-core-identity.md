# Phase 1: Core Identity & Business

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 1: Temel Bilgiler
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Site turu nedir?
   [ ] Kurumsal / Tanitim sitesi
   [ ] E-ticaret
   [ ] SaaS / Web uygulamasi
   [ ] Blog / Icerik platformu
   [ ] Landing page / Tek sayfa
   [ ] Portfolio
   [ ] Diger: ___

2. Hedef kitle kimdir?
   - Ulke/bolge: ___
   - Yas araligi: ___
   - Sektorel mi, genel mi: ___

3. Kac dil desteklenecek?
   - [ ] Tek dil (hangi dil: ___)
   - [ ] Cok dil (hangileri: ___)
   - [ ] Otomatik tarayici dili algilama?
   - [ ] URL yapisi: /tr/sayfa mi, tr.site.com mu, site.com?lang=tr mi?

4. Marka/tasarim rehberi var mi?
   - [ ] Figma/Sketch dosyasi var
   - [ ] Renk paleti ve fontlar belli
   - [ ] Sifirdan tasarlanacak

5. Projenin adi/domain'i nedir? ___
```

## Defaults (if user says "varsayilan")
- Site type: Corporate / Presentation
- Audience: Turkey, general, all ages
- Language: Turkish only, no i18n
- Design: From scratch
- Domain: TBD

## Output Format
After collecting answers, store as:
```json
{
  "phase": "core-identity",
  "site_type": "corporate",
  "audience": { "country": "TR", "age": "all", "sector": "general" },
  "languages": ["tr"],
  "i18n_url_strategy": "prefix",
  "design_source": "from_scratch",
  "domain": "example.com"
}
```
