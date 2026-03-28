# Phase 7: Theme & Visual System

> Ask these questions in TURKISH. Wait for answers before proceeding.
> Theme storage follows the progressive architecture:
> No DB → localStorage + cookie | DB + Auth → database per user

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 7: Tema & Gorsel Sistem
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

12. Tema destegi:
    - [ ] Sadece Light mode
    - [ ] Sadece Dark mode
    - [ ] Light + Dark (kullanici secimi)
    - [x] Light + Dark + System (isletim sistemi tercihine uyum — ONERILEN)
    - [ ] Ozel temalar (high contrast, sepia vb.)

13. Tema teknik altyapisi:
    - [x] CSS custom properties (variables) — ONERILEN
    - [x] next-themes (Next.js icin) — ONERILEN
    - [x] Tailwind dark: prefix
    - [x] FOUC (flash of unstyled content) onleme
    Tema tercihi nerede saklansin:
    - [x] localStorage + cookie (varsayilan — DB yoksa)
    - [x] Veritabaninda per-user (DB + auth varsa otomatik)
    NOT: Bu otomatik secilir. DB + auth varsa DB'ye yazar,
    yoksa localStorage'a yazar. Ayni API, farkli arka uc.

14. Design tokens — Renk paleti var mi?
    - [ ] Evet, renklerim belli (belirtin: ___)
    - [ ] Hayir, onerin (sektore gore onerilen palet istiyorum)
    - [ ] Figma'dan cekilecek

15. Typography:
    - [ ] Belirli fontlar var (belirtin: ___)
    - [ ] Google Fonts kullanilacak (oneri istiyorum)
    - [ ] Sistem fontlari yeterli (system-ui stack)

16. Spacing & Layout:
    - [x] 4px grid sistemi (varsayilan)
    - [x] Responsive breakpoints: 640/768/1024/1280/1536px
    - [ ] Farkli breakpoint'ler istiyorum: ___

17. Ek gorsel tercihler:
    - [ ] Font boyutu ayar paneli (A- A A+)
    - [ ] Yuksek kontrast modu
    - [ ] Hareket azaltma secenegi (prefers-reduced-motion)
    NOT: Bu tercihler de ayni soyutlama katmaninda saklanir.
```

## Storage Decision (AUTOMATIC)

```
DB yoksa:
  theme → localStorage + cookie (SSR icin)
  fontSize → localStorage
  highContrast → localStorage
  reducedMotion → localStorage

DB + Auth varsa:
  theme → DB per user + localStorage cache + cookie (SSR icin)
  fontSize → DB per user + localStorage cache
  highContrast → DB per user + localStorage cache
  reducedMotion → DB per user + localStorage cache

HER IKI DURUMDA:
  localStorage ILCE okunur (aninda tepki)
  Cookie HER ZAMAN yazilir (SSR FOUC onleme)
  DB varsa arka planda senkronize edilir
```

## FOUC Prevention (ALWAYS — regardless of storage)

```html
<script>
  (function() {
    var t = document.cookie.match(/theme=(\w+)/);
    var theme = t ? t[1] : null;
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

## Design Token Structure

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222 47% 11%;
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222 47% 11%;
  --accent: 210 40% 96%;
  --accent-foreground: 222 47% 11%;
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;
  --destructive: 0 84% 60%;
  --destructive-foreground: 210 40% 98%;
  --border: 214 32% 91%;
  --input: 214 32% 91%;
  --ring: 221 83% 53%;
  --radius: 0.5rem;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}

.dark {
  --background: 222 47% 11%;
  --foreground: 210 40% 98%;
  /* ... inverted values */
}
```

## Defaults
- Theme: Light + Dark + System
- Storage: localStorage + cookie (auto-upgrades to DB when available)
- FOUC prevention: ON (always)
- Grid: 4px base
- Breakpoints: Tailwind defaults

## Output Format
```json
{
  "phase": "theme-visual",
  "theme_modes": ["light", "dark", "system"],
  "storage": "progressive",
  "fouc_prevention": true,
  "colors": "default-or-custom",
  "typography": { "sans": "Inter", "mono": "JetBrains Mono" },
  "grid": "4px",
  "breakpoints": "tailwind-default",
  "extras": { "font_size_panel": false, "high_contrast": false, "reduced_motion": true }
}
```
