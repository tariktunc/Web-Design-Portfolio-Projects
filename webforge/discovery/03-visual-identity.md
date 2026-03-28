# Phase 3: Visual Identity

> Ask these questions in TURKISH. Wait for answers before proceeding.
> Answers feed into: brand-strategist agent

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 3: Gorsel Kimlik
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

12. Logo durumu:
    - [ ] Logomuz var (dosya yolu veya URL: ___)
    - [ ] Logo tasarlanacak (tercihen nasil? ___)
    - [ ] Sadece metin logo (wordmark) yeterli

13. Renk tercihi:
    - [ ] Belirli renklerimiz var:
      - Ana renk (primary): #___
      - Ikincil renk (secondary): #___
      - Vurgu renk (accent): #___
    - [ ] Sektore uygun renk onerileri istiyorum
    - [ ] Begendigim bir sitenin/markanin renkleri var: ___
    - [ ] Renk psikolojisine gore secilsin:
      - [ ] Mavi (guven, teknoloji, profesyonellik)
      - [ ] Yesil (dogallik, buyume, saglik)
      - [ ] Kirmizi (enerji, tutku, aciliyet)
      - [ ] Turuncu (yaraticilik, sicaklik, enerji)
      - [ ] Mor (luks, yaraticilik, bilgelik)
      - [ ] Siyah (luks, guc, elegans)
      - [ ] Diger: ___

14. Tipografi (font) tercihi:
    - [ ] Belirli fontlarimiz var:
      - Baslik fontu: ___
      - Metin fontu: ___
    - [ ] Google Fonts'tan secilsin (oneri istiyorum)
    - [ ] Sistem fontlari yeterli (Inter, system-ui)
    - [ ] Modern/geometrik (Inter, Poppins, Outfit)
    - [ ] Klasik/serif (Playfair Display, Lora, Merriweather)
    - [ ] El yazisi/organik (Caveat, Dancing Script)

15. Gorsel dil:
    - [ ] Fotograf agirlikli (gercek fotograflar)
    - [ ] Illustrasyon agirlikli (cizim, flat design)
    - [ ] Minimal (cok az gorsel, tipografi odakli)
    - [ ] Ikon agirlikli (ikonlar + metin)
    - [ ] Karisik (fotograf + ikon + illustrasyon)

16. Tasarim referanslari — begendiginiz siteler:
    - Site 1: ___  (neyi begeniyorsunuz: ___)
    - Site 2: ___  (neyi begeniyorsunuz: ___)
    - Site 3: ___  (neyi begeniyorsunuz: ___)

17. Tasarim tarzı:
    - [ ] Minimal / clean (az eleman, cok bosluk)
    - [ ] Modern / dinamik (animasyonlar, paralax)
    - [ ] Kurumsal / corporate (duzgun, ciddi)
    - [ ] Yaratici / bold (cesur renkler, buyuk tipografi)
    - [ ] Klasik / timeless (zarif, sade)
```

## Defaults
- Logo: Text-based (wordmark)
- Colors: Blue primary (tech/trust), to be defined by brand-strategist
- Typography: Inter (modern, highly readable, free)
- Visual language: Icon-heavy + minimal photography
- Design style: Minimal / clean

## Color System Guidelines

When brand-strategist creates the palette, it MUST include:

```
Primary:     Main brand color (CTAs, links, accents)
Secondary:   Supporting color (highlights, secondary actions)
Accent:      Attention color (badges, notifications)
Neutral:     Text and background scale (50-950)
Success:     Positive actions (green family)
Warning:     Caution states (amber family)
Error:       Destructive actions (red family)
Info:        Informational (blue family)
```

Each color needs:
- Hex value
- HSL value (for CSS custom properties)
- Light mode variant
- Dark mode variant
- Usage guideline
- Contrast ratio verification (WCAG AA)

## Output Format
```json
{
  "phase": "visual-identity",
  "logo": "existing | wordmark | to-design",
  "colors": {
    "provided": false,
    "preference": "blue-tech",
    "reference_sites": []
  },
  "typography": {
    "provided": false,
    "preference": "modern-geometric"
  },
  "visual_language": "icon-heavy-minimal",
  "design_style": "minimal-clean",
  "references": []
}
```
