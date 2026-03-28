# Phase 15: Blog System

> Ask these questions in TURKISH. Only if user indicated blog.
> Questions determine the Level (0-4). NEVER assume a level.
> Default is ALWAYS Level 0 (simplest).

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 15: Blog Sistemi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

41. Mevcut icerik var mi?
    - [ ] WordPress'ten icerik aktarilacak (XML dosyaniz var mi?)
    - [ ] Wix'ten icerik aktarilacak
    - [ ] Baska platformdan (hangi: ___)
    - [ ] Hayir, sifirdan basliyoruz
    → WordPress/Wix secildiyse: import sistemi kurulacak

42. Blog yazilarini kim girecek?
    - [ ] Ben (gelistirici) — kod editoru ile (Level 0 yeterli)
    - [ ] Icerik ekibi / musteri — tarayicida panel gerekli (Level 2)
    - [ ] Henuz bilmiyorum, sonra karar veririm (Level 0 basla)
    → "Icerik ekibi" secildiyse admin paneli sorulacak

43. (Sadece admin panel secildiyse) Editor tercihi:
    - [ ] Markdown editoru (teknik kullanicilar icin)
    - [ ] Notion-like editor (kolay, gorsel)
    - [ ] Klasik WYSIWYG (Word benzeri)
    - [ ] Sen karar ver

44. (Sadece admin panel secildiyse) Giris sistemi:
    - [ ] Clerk (hizli kurulum, hazir UI)
    - [ ] NextAuth / Auth.js (acik kaynak, esnek)
    - [ ] Supabase Auth (Supabase kullaniliyorsa)
    - [ ] Simdilik gerekmiyor, sonra ekleriz
    - [ ] Diger: ___

45. Veritabani kullanilsin mi?
    - [ ] Hayir — dosya sistemi + localStorage yeterli (ONERILEN baslangic)
    - [ ] Evet — veritabani istiyorum
    - [ ] Simdilik hayir, ama ileride eklenebilsin (abstraction layer kur)
    → "Evet" secildiyse veritabani sorulacak

46. (Sadece DB secildiyse) Hangi veritabani?
    - [ ] PostgreSQL — Neon (serverless, ucretsiz tier)
    - [ ] PostgreSQL — Supabase (auth + storage dahil)
    - [ ] SQLite — Turso (edge-ready, cok hizli)
    - [ ] MongoDB — Atlas (document-based)
    - [ ] MySQL — PlanetScale
    - [ ] Firebase Firestore
    - [ ] Diger: ___

47. Blog ozellikleri (varsayilan AKTIF):
    - [x] Kategori + Etiket sistemi
    - [x] Yazar profilleri
    - [x] Okuma suresi
    - [x] Icerik tablosu (TOC)
    - [x] Ilgili yazilar
    - [x] Paylasim butonlari
    - [x] RSS + Atom + JSON Feed
    - [x] Blog ici arama
    - [x] Sayfalama
    - [x] Arsiv sayfasi

    Opsiyonel:
    - [ ] Yorum sistemi
    - [ ] Begeni/alkis butonu
    - [ ] Newsletter entegrasyonu
    - [ ] Okunma sayaci

48. Ice aktarim / Disa aktarim (varsayilan AKTIF):
    - [x] WordPress XML (WXR) import/export
    - [x] JSON import/export
    - [x] CSV metadata import/export
    - [x] RSS/Atom/JSON Feed ciktisi
```

## Level Determination Logic

```
Q41: Import var mi?
  → Evet → Level 1+ (import sistemi)
  → Hayir → Level 0+

Q42: Kim girecek?
  → Gelistirici → Level 0-1
  → Icerik ekibi → Level 2+

Q44: Auth gerekli mi?
  → Evet → Level 3+
  → Hayir → no auth

Q45: DB var mi?
  → Evet → Level 4
  → Hayir → localStorage
  → "Ileride eklensin" → abstraction layer + localStorage
```

## Output Format
```json
{
  "phase": "blog-system",
  "level": 0,
  "import_source": null,
  "admin_panel": false,
  "editor": null,
  "auth": null,
  "database": null,
  "features": { "...defaults..." },
  "import_export": ["wordpress-xml", "json", "csv", "rss"],
  "abstraction_layer": true
}
```
