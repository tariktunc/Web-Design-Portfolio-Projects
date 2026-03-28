# Phase 6: Accessibility

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 6: Erisilebilirlik (Accessibility)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

8. WCAG uyumluluk seviyesi:
   - [ ] WCAG 2.1 Level A (minimum)
   - [x] WCAG 2.2 Level AA (onerilen — cogu yasal gereksinime yeter)
   - [ ] WCAG 2.2 Level AAA (en yuksek — nadiren tam uygulanir)

9. UI Component kutuphanesi tercihi:
   - [ ] Radix UI (tamamen erisilebilir, headless)
   - [x] shadcn/ui (Radix tabanli, Tailwind uyumlu — ONERILEN)
   - [ ] Headless UI (Tailwind Labs)
   - [ ] React Aria (Adobe — en detayli ARIA)
   - [ ] Ark UI (Chakra ekibinden)
   - [ ] Mevcut kutuphane var: ___

10. Erisilebilirlik gereksinimleri:
    Asagidakiler varsayilan olarak AKTIF:
    - [x] Klavye navigasyonu (Tab, Enter, Escape, Arrow keys)
    - [x] Focus yonetimi (visible focus ring, focus trap in modals)
    - [x] Screen reader uyumu (ARIA labels, roles, live regions)
    - [x] Renk kontrast oranlari (AA: 4.5:1 normal, 3:1 buyuk metin)
    - [x] Metin boyutu olcekleme (200% zoom'a kadar)
    - [x] Hareket azaltma (prefers-reduced-motion)
    - [x] Skip navigation linki
    - [x] Semantic HTML (header, nav, main, footer, article, section)
    - [x] Form erisilebilirligi (label association, error announcement)
    - [x] Gorsel icin alt text zorunlulugu
    - [x] Video altyazi/transkript destegi

    Opsiyonel (aktif etmek ister misiniz?):
    - [ ] Yuksek kontrast modu
    - [ ] Dyslexia-friendly font secenegi
    - [ ] Font boyutu ayar paneli (A- A A+)
    - [ ] Animasyonlari tamamen kapatma secenegi

11. Test araclari:
    - [x] axe-core (otomatik test — ONERILEN)
    - [x] Lighthouse accessibility audit
    - [ ] Pa11y CI (CI/CD entegrasyonu)
    - [ ] Manuel screen reader testi (NVDA/VoiceOver)
```

## Defaults
- WCAG: 2.2 Level AA
- UI Library: shadcn/ui (Radix-based)
- All mandatory a11y features: ON
- Optional features: OFF
- Test tools: axe-core + Lighthouse

## Implementation Notes

### shadcn/ui + Radix UI provides:
- Keyboard navigation out of the box
- Focus management (focus trap, focus return)
- ARIA attributes automatically
- Screen reader announcements
- Reduced motion support

### What STILL needs manual implementation:
- Skip navigation link (add to layout)
- Alt text enforcement (ESLint rule: jsx-a11y/alt-text)
- Color contrast verification (design tokens)
- Semantic HTML structure (developer discipline)
- Form error announcements (aria-describedby pattern)
- Language attribute on <html>
- Page titles (unique per route)

## Output Format
```json
{
  "phase": "accessibility",
  "wcag_level": "2.2-AA",
  "ui_library": "shadcn-ui",
  "features": {
    "keyboard_nav": true,
    "focus_management": true,
    "screen_reader": true,
    "color_contrast": true,
    "text_scaling": true,
    "reduced_motion": true,
    "skip_nav": true,
    "semantic_html": true,
    "form_a11y": true,
    "alt_text": true,
    "video_captions": true,
    "high_contrast_mode": false,
    "dyslexia_font": false,
    "font_size_panel": false
  },
  "test_tools": ["axe-core", "lighthouse"]
}
```
