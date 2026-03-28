# Phase 5: Legal & Privacy (GDPR/KVKK/CCPA)

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 5: Yasal Uyumluluk & Gizlilik
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

5. Hangi yasal mevzuatlara uyumlu olmali?
   - [ ] GDPR (AB kullanicilari varsa ZORUNLU)
   - [ ] KVKK (Turkiye kullanicilari varsa ZORUNLU)
   - [ ] CCPA (Kaliforniya kullanicilari varsa ZORUNLU)
   - [ ] ePrivacy Directive

6. Cookie Consent Banner:
   Asagidaki ozellikler varsayilan olarak AKTIF:
   - [x] "Tumunu Kabul Et" butonu
   - [x] "Tumunu Reddet" butonu (Google ZORUNLU kilar)
   - [x] "Tercihleri Yonet" butonu (kategori bazli secim)
   - [x] Cookie kategorileri:
     - [x] Zorunlu (always active)
     - [x] Analitik / Performans
     - [x] Pazarlama / Reklam
     - [x] Fonksiyonel / Tercih
   - [x] Tercih hafizasi (secimi hatirla)
   - [x] Footer'dan yeniden erisim
   - [x] Google Consent Mode v2 entegrasyonu

   Devre disi birakmak istediginiz bir ozellik var mi?

7. Yasal sayfalar (hangilerini istiyorsunuz?):
   - [x] Gizlilik Politikasi (Privacy Policy)
   - [x] Cerez Politikasi (Cookie Policy)
   - [x] Kullanim Sartlari (Terms of Service)
   - [ ] KVKK Aydinlatma Metni (Turkiye icin)
   - [ ] Acik Riza Metni (Turkiye icin)
   - [ ] Veri Sorumlusuna Basvuru Formu
   - [ ] Imprint / Yasal Bildirim (AB icin)
```

## Defaults
- Regulations: KVKK + GDPR
- Cookie banner: All features active, Google Consent Mode v2
- Legal pages: Privacy Policy, Cookie Policy, Terms of Service, KVKK Aydinlatma Metni

## Google Consent Mode v2 Signals

These MUST be implemented regardless of user choices:

| Signal | Purpose | Default |
|--------|---------|---------|
| `ad_storage` | Ad cookies | denied |
| `ad_user_data` | User data for ads | denied |
| `ad_personalization` | Personalized ads | denied |
| `analytics_storage` | Analytics cookies | denied |
| `functionality_storage` | Functional cookies | denied |
| `personalization_storage` | Personalization | denied |
| `security_storage` | Security cookies | granted (always) |

## Output Format
```json
{
  "phase": "legal-privacy",
  "regulations": ["kvkk", "gdpr"],
  "cookie_consent": {
    "accept_all": true,
    "reject_all": true,
    "manage_preferences": true,
    "categories": ["essential", "analytics", "marketing", "functional"],
    "google_consent_mode_v2": true,
    "footer_reaccess": true
  },
  "legal_pages": ["privacy", "cookies", "terms", "kvkk"]
}
```
