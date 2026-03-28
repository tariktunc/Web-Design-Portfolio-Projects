# Kurulum Talimatlari

## Yeni Projeye Nasil Eklenir?

### 1. Proje olustur
```bash
npx create-next-app@latest proje-adi --typescript --tailwind --eslint --app --src-dir
cd proje-adi
```

### 2. webforge klasorunu kopyala
```bash
# Klasoru projeye kopyala
cp -r /path/to/webforge ./webforge

# Agent dosyalarini .claude/agents/ altina kopyala
mkdir -p .claude/agents
cp webforge/agents/*.md .claude/agents/
```

### 3. CLAUDE.md olustur
Proje kokune `CLAUDE.md` dosyasi olustur:

```markdown
# Project Rules

## Web Setup
Bu proje webforge sistemi ile yonetilir.
Detaylar icin: webforge/CLAUDE.md

## Agent Yapisi
Agent dosyalari .claude/agents/ altindadir.
Her agent'in ne yaptigini ogren: webforge/BOOTSTRAP.md

## Tech Stack
- Framework: Next.js 15 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS v4
- UI: shadcn/ui (Radix tabanli)
- Theme: next-themes
- i18n: next-intl (cok dil gerekiyorsa)

## Code Rules
- Semantic HTML kullan (div soup yapma)
- Tum renkler CSS custom property uzerinden
- Tum metin i18n key uzerinden (hardcode string yasak)
- Her interaktif eleman klavye ile erisilebilir olmali
- Her gorsel alt text icermeli
- Console.log uretimde yasak
```

### 4. Claude Code'u baslat
```bash
claude
```
Sonra yaz:
```
webforge/CLAUDE.md dosyasini oku ve web projemi kurmaya basla.
```

### 5. Sorulari cevapla
Claude sana 11 soru soracak. Cevapla.
Bilmedigin sorulara "sen karar ver" yaz.

### 6. Beklenen sonuc
Claude sirayla:
1. brand-guide olusturur (renkler, fontlar, ton)
2. keyword raporu olusturur (hedef kelimeler)
3. SEO yapisini kurar (meta, sitemap, JSON-LD, llms.txt)
4. Cookie consent sistemi kurar
5. Sayfalari olusturur (a11y + responsive + theme)
6. Kalite kontrolu yapar

---

## Mevcut Projeye Nasil Eklenir?

Ayni adimlar, tek fark: Step 1'i atla (proje zaten var).
Claude projeyi tarayip mevcut yapiya gore uyarlayacaktir.

---

## Dosya Yapisi (Kurulumdan Sonra)

```
proje-adi/
├── .claude/
│   └── agents/              ← Agent dosyalari (Claude Code bunlari okur)
│       ├── brand-strategist.md
│       ├── keyword-analyst.md
│       ├── seo-sem-expert.md
│       ├── content-strategist.md
│       ├── frontend-dev.md
│       ├── backend-dev.md
│       ├── infra-engineer.md
│       ├── lead-manager.md
│       ├── prompt-engineer.md
│       ├── user-liaison.md
│       └── test-engineer.md
├── webforge/        ← Referans dosyalar (Claude gerektiginde okur)
│   ├── CLAUDE.md            ← Ana calisma talimati
│   ├── BOOTSTRAP.md         ← Mimari referans
│   ├── CONFIG.md
│   ├── discovery/           ← Detayli sorular (gerektiginde okur)
│   ├── specs/               ← Teknik sartnameler
│   └── checklists/          ← Kalite kontrol
├── CLAUDE.md                ← Proje CLAUDE.md (agent yapisi, kurallar)
├── src/                     ← Proje kaynak kodu
└── ...
```
