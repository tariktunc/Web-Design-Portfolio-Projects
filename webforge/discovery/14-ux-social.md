# Phase 14: UX Essentials & Social/Communication

> Ask these questions in TURKISH. Wait for answers before proceeding.
> Combines UX requirements, social media, and communication channels.

## Questions — Part A: UX

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 14A: UX Temelleri
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

34. Sitenizde hangi sayfalar olacak?
    Zorunlu (varsayilan AKTIF):
    - [x] Ana sayfa (/)
    - [x] 404 Sayfa Bulunamadi
    - [x] 500 Sunucu Hatasi
    - [x] Gizlilik Politikasi (/privacy veya /gizlilik)
    - [x] Kullanim Sartlari (/terms veya /kullanim-sartlari)
    - [x] Cerez Politikasi (/cookies veya /cerez-politikasi)

    Opsiyonel:
    - [ ] Hakkimizda (/about veya /hakkimizda)
    - [ ] Iletisim (/contact veya /iletisim)
    - [ ] SSS / FAQ (/faq veya /sss)
    - [ ] Blog (/blog)
    - [ ] Hizmetler (/services veya /hizmetler)
    - [ ] Urunler (/products veya /urunler)
    - [ ] Kariyer (/careers veya /kariyer)
    - [ ] Referanslar (/references veya /referanslar)
    - [ ] Site Haritasi (/sitemap — HTML versiyon)
    - [ ] Bakim Modu sayfasi (maintenance)
    - [ ] Diger: ___

35. Global UI bilesenleri:
    Varsayilan AKTIF:
    - [x] Header / Navigation (responsive, mobile menu)
    - [x] Footer (linkler, yasal, sosyal medya)
    - [x] Cookie banner
    - [x] Breadcrumb
    - [x] Loading states (skeleton / spinner)
    - [x] Toast / notification sistemi

    Opsiyonel:
    - [ ] Back to top butonu
    - [ ] Site ici arama (search)
    - [ ] Error boundaries (React)
    - [ ] Newsletter signup (footer veya popup)
    - [ ] WhatsApp/chat widget
    - [ ] Announcement bar (header ustu banner)

36. Form & Etkilesim:
    - [x] Form validation (client + server)
    - [x] Error mesajlari (field bazli, erisilebilir)
    - [x] Success feedback (toast / redirect)
    - [x] Loading state (submit butonunda)
    - [x] Honeypot spam koruması
    - [ ] reCAPTCHA v3
    - [ ] Autosave (uzun formlar icin)

37. Responsive design:
    - [x] Mobile-first yaklasim
    - [x] Touch-friendly hedefler (min 44x44px)
    - [x] Hamburger menu / mobile navigation
    - [x] Responsive images (srcset + sizes)
    - [x] Responsive typography (clamp())
```

## Defaults
- Required pages: Home, 404, 500, Privacy, Terms, Cookies
- Optional pages: User choice
- Global components: Header, Footer, Cookie banner, Breadcrumb, Loading, Toast
- Forms: Full validation + honeypot
- Responsive: Mobile-first, all defaults ON

## Page URL Strategy

### Turkish Project
```
/                   → Ana Sayfa
/hakkimizda         → Hakkimizda
/hizmetler          → Hizmetler
/iletisim           → Iletisim
/blog               → Blog
/sss                → SSS
/gizlilik           → Gizlilik Politikasi
/kullanim-sartlari  → Kullanim Sartlari
/cerez-politikasi   → Cerez Politikasi
```

### Multi-Language Project
```
/tr/                → Ana Sayfa (TR)
/en/                → Home (EN)
/tr/hakkimizda      → Hakkimizda
/en/about           → About
/tr/iletisim        → Iletisim
/en/contact         → Contact
```

## Navigation Structure Template
```
Header:
├── Logo (link to /)
├── Main Nav
│   ├── Hakkimizda
│   ├── Hizmetler
│   ├── Blog
│   ├── SSS
│   └── Iletisim
├── Theme Toggle (light/dark)
├── Language Switcher (if i18n)
└── CTA Button (optional)

Footer:
├── Column 1: Hakkimizda (kisa tanitim)
├── Column 2: Hizli Linkler
├── Column 3: Yasal (Gizlilik, Kullanim, Cerez)
├── Column 4: Iletisim bilgileri
├── Bottom: © 2026 Site Adi | Cerez Tercihleri
└── Social Media Icons
```

---

## Questions — Part B: Social & Communication

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 14B: Sosyal Medya & Iletisim
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

38. Sosyal medya entegrasyonu:
    - [x] Open Graph gorsel (1200x630px — her sayfa icin)
    - [x] Twitter Card gorsel
    - [ ] Sosyal medya hesap linkleri (hangileri: ___)
    - [ ] Paylasim butonlari (icerik sayfalari)
    - [ ] WhatsApp paylasim butonu
    - [ ] Social proof (testimonial, musteri logolari)

    Sosyal medya hesaplariniz:
    - Instagram: ___
    - Twitter/X: ___
    - LinkedIn: ___
    - Facebook: ___
    - YouTube: ___
    - TikTok: ___
    - GitHub: ___

39. Iletisim kanallari:
    - [ ] Iletisim formu
    - [ ] E-posta adresi
    - [ ] Telefon numarasi
    - [ ] WhatsApp Business butonu
    - [ ] Canli destek / Chat widget (hangi servis: ___)
    - [ ] Google Maps embed
    - [ ] Fiziksel adres

40. E-posta entegrasyonu:
    - [ ] Iletisim formu → e-posta gonderimi:
      - [ ] Resend
      - [ ] SendGrid
      - [ ] Amazon SES
      - [ ] SMTP
    - [ ] Newsletter kayit formu
```

## Output Format
```json
{
  "phase": "ux-social",
  "pages": {
    "required": ["/", "404", "500", "/privacy", "/terms", "/cookies"],
    "optional": ["/about", "/contact", "/faq"]
  },
  "global_components": ["header", "footer", "cookie-banner", "breadcrumb", "loading", "toast"],
  "forms": { "validation": "client+server", "spam": "honeypot" },
  "responsive": "mobile-first",
  "social": {
    "og_images": true,
    "accounts": {},
    "share_buttons": false
  },
  "contact": {
    "form": true,
    "email": "",
    "phone": "",
    "whatsapp": false
  },
  "email_service": null
}
```
