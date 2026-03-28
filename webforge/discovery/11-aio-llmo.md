# Phase 11: AIO / LLMO / GAIO (AI Optimization)

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 11: AIO / LLMO / GAIO — Yapay Zeka Optimizasyonu
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AIO = AI Optimization
LLMO = LLM Optimization
GAIO = Generative AI Optimization

24. AI Crawler & Bot yonetimi:
    Asagidaki AI botlari icin kural belirleyin:

    | Bot | Sirket | Varsayilan |
    |-----|--------|-----------|
    | GPTBot | OpenAI | Allow |
    | ChatGPT-User | OpenAI (browse) | Allow |
    | Google-Extended | Google (Gemini) | Allow |
    | Amazonbot | Amazon/Alexa | Allow |
    | anthropic-ai | Anthropic | Allow |
    | ClaudeBot | Anthropic (web) | Allow |
    | Bytespider | TikTok/ByteDance | Disallow |
    | PerplexityBot | Perplexity | Allow |
    | Cohere-ai | Cohere | Allow |
    | FacebookBot | Meta | Allow |
    | Applebot-Extended | Apple Intelligence | Allow |

    Degistirmek istediginiz bir bot var mi?
    Icerik lisanslama: AI egitim verisi olarak kullanilabilir mi?
    - [ ] Evet, tum botlar erisebilir
    - [ ] Secici (bazi botlar engellensin)
    - [ ] Hayir, sadece arama/snippet icin

25. AI-friendly icerik yapisi (varsayilan: AKTIF):
    - [x] Clear heading hierarchy (H1 > H2 > H3 — tek H1 per page)
    - [x] Definition-style paragraphs (kavram tanimlari net)
    - [x] Comparison tables (X vs Y)
    - [x] Numbered lists (adim adim talimatlar)
    - [x] Summary/TL;DR bloklari (sayfa basinda ozet)
    - [x] Last updated date
    - [x] Author bilgisi + credentials
    - [x] About page ile entity disambiguation
```

## Defaults
- Most AI bots: Allow (except Bytespider)
- Content licensing: Allow for search/snippet, decision on training data per user
- All AI-friendly content structure: ON

## robots.txt AI Bot Section

```
# ===== AI Crawlers =====

# OpenAI
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Google AI (Gemini)
User-agent: Google-Extended
Allow: /

# Anthropic (Claude)
User-agent: anthropic-ai
Allow: /

User-agent: ClaudeBot
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Apple Intelligence
User-agent: Applebot-Extended
Allow: /

# Amazon/Alexa
User-agent: Amazonbot
Allow: /

# Meta
User-agent: FacebookBot
Allow: /

# Cohere
User-agent: Cohere-ai
Allow: /

# ByteDance/TikTok — blocked by default
User-agent: Bytespider
Disallow: /

# ===== Standard Crawlers =====
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
Sitemap: https://site.com/sitemap.xml
```

## AI-Friendly Content Checklist

For EVERY content page, ensure:
1. Single H1 at top of page
2. Logical H2 → H3 hierarchy (no skipping levels)
3. First paragraph answers "what is this page about?" directly
4. Key facts are in structured format (lists, tables)
5. Statistics have sources cited
6. Definitions are explicit ("X is Y that does Z")
7. Page has a "Last updated: YYYY-MM-DD" indicator
8. Author name and credentials are visible (or linked)

## Output Format
```json
{
  "phase": "aio-llmo",
  "ai_bots": {
    "GPTBot": "allow",
    "ChatGPT-User": "allow",
    "Google-Extended": "allow",
    "anthropic-ai": "allow",
    "ClaudeBot": "allow",
    "PerplexityBot": "allow",
    "Applebot-Extended": "allow",
    "Amazonbot": "allow",
    "FacebookBot": "allow",
    "Cohere-ai": "allow",
    "Bytespider": "disallow"
  },
  "content_licensing": "search-and-snippet",
  "ai_content_structure": true
}
```
