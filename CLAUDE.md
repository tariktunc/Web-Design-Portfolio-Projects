# Claude Code Kuralları

## Geliştirme Süreci

1. **Önce açıkla, sonra yaz.** Herhangi bir kod yazmadan önce yaklaşımını açıkla ve onay bekle.

2. **Önce açıklayıcı sorular sor.** Belirsiz veya eksik gereksinimlerde tahmin yürütme — sor.

3. **Edge case'leri listele.** Kod yazmayı bitirdikten sonra, olası ekstrem durumları listele ve bunları kapsayacak test senaryoları öner.

4. **Büyük görevleri böl.** Bir görev 3'ten fazla dosyada değişiklik gerektiriyorsa, dur ve önce daha küçük görevlere böl.

5. **Önce test, sonra düzeltme.** Bir hata olduğunda, öncelikle hatayı yeniden oluşturacak bir test yaz, ardından test başarılı olana kadar hatayı düzelt.

6. **Hatalardan öğren.** Her düzeltme yaptığında, neyi yanlış yaptığını düşün ve aynı hatayı bir daha asla yapmamak için bir plan geliştir.

## Proje Bilgileri

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19, Tailwind CSS 3.4 (Radix UI sadece alt sayfalarda)
- **Dil:** TypeScript 5.7
- **Font:** Inter (Google Fonts)
- **Deploy:** Vercel — https://tariktunc.com
- **Node.js:** >=24

## Tasarım Sistemi (Asto-Tech Tarzı)

### Renk Paleti
- **Dark mod arkaplan:** `#0a0a0f`
- **Kart/panel arkaplan:** `#141419`
- **Border:** `#1e1e28`
- **Text (body):** `#a3a3a3`
- **Text (heading):** `#e5e5e5`
- **Accent 1 (primary/blue):** `#3b82f6` — CSS variable: `--green`
- **Accent 2 (emerald):** `#10b981` — CSS variable: `--accent-2`
- **Accent 3 (cyan):** `#06b6d4` — CSS variable: `--accent-cyan`
- **Light mod:** Arka plan `#ffffff`, accent `#2563eb` / `#059669` / `#0891b2`
- **YASAKLI RENKLER:** `#64ffda`, `#0a192f`, `#818cf8`, `#0b0d17` — bunlar asla kullanılmamalı

### Tasarım İlkeleri
- **Referans:** asto-tech-systems projesinin tasarım dili
- **Animasyon:** Framer Motion — `staggerChildren`, `whileInView`, `fadeUp` variants. Sticky/pinned scroll section KULLANMA. anime.js sadece alt sayfalarda.
- **Hero:** Split layout (sol metin + sağ görsel), dot grid arka plan, gradient blob'lar, gradient text
- **Kartlar:** `rounded-2xl border border-navy-lighter/60 bg-navy-light/50` + `border-t-2 border-t-{color}` accent + hover'da shadow glow
- **Section başlıkları:** Üstte küçük renkli `tracking-[0.2em] uppercase text-[11px]` label + büyük bold başlık + açıklama
- **Tag/Badge:** `text-[10px] px-2 py-0.5 rounded-md bg-navy-lighter/80 text-slate-custom-light`
- **CTA Butonları:** Primary: `bg-green text-white rounded-xl shadow-xl shadow-green/25`, Secondary: `border border-navy-lighter bg-lightest-slate/[0.06] rounded-xl`
- **Footer:** Minimal, border-t, copyright + tech stack tek satır
