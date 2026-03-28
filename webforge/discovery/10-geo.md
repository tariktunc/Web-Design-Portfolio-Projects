# Phase 10: GEO (Generative Engine Optimization)

> Ask these questions in TURKISH. Wait for answers before proceeding.

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 10: GEO — Generative Engine Optimization (AI Arama)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sitenizin ChatGPT Search, Perplexity, Google AI Overview, Bing Copilot
gibi yapay zeka arama motorlarinda gorunur olmasi icin optimizasyon.

22. Teknik altyapi (varsayilan: AKTIF):
    - [x] llms.txt dosyasi (AI crawler'lar icin site ozeti)
    - [x] llms-full.txt (detayli versiyon)
    - [x] Structured Data zenginlestirme (JSON-LD)
    - [x] FAQ Schema (AI'in en cok cektigi format)
    - [x] HowTo Schema (adim adim talimatlar)
    - [x] Entity-based content (net tanimlar, kavramlar)

23. Icerik stratejisi (varsayilan: AKTIF):
    - [x] Authoritative tone (kaynak gosterimli, net ifadeler)
    - [x] Concise answers (ilk paragrafta net cevap — AI snippet)
    - [x] Unique data / Original research
    - [x] Topical authority (derinlemesine icerik kumesi)
    - [x] E-E-A-T sinyalleri (Experience, Expertise, Authoritativeness, Trust)
    - [x] Last updated date per page
    - [x] Author bilgisi + credentials

    Bu stratejileri icerik olusturma asamasinda uygulamak
    ister misiniz, yoksa sadece teknik altyapi mi kurulsun?
```

## Defaults
- All technical GEO infrastructure: ON
- Content strategy guidelines: ON (applied during content creation)

## llms.txt Template

```markdown
# [Site Name]

> [One-line description of the site and its purpose]

## About
[2-3 paragraphs: who you are, what you do, why it matters]

## Key Topics
- [Topic 1]: [Brief description]
- [Topic 2]: [Brief description]
- [Topic 3]: [Brief description]

## Important Pages
- [Home](https://site.com/): [Description]
- [About](https://site.com/about): [Description]
- [Services](https://site.com/services): [Description]
- [Contact](https://site.com/contact): [Description]
- [FAQ](https://site.com/faq): [Description]

## Products / Services
- [Product 1]: [Description, key features]
- [Product 2]: [Description, key features]

## Contact
- Email: [email]
- Phone: [phone]
- Location: [city, country]
- Social: [links]
```

## llms-full.txt Additions

Extended version adds:
- Complete page inventory with descriptions
- Detailed FAQ (all questions and answers)
- Key statistics, facts, data points
- Team/founder information
- Technical specifications (if applicable)
- Content categories and taxonomy
- Recent updates / changelog

## FAQ Schema Pattern (GEO-Optimized)

```typescript
// src/components/seo/FaqJsonLd.tsx
interface FaqItem { question: string; answer: string; }

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": items.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    })}} />
  );
}
```

## Output Format
```json
{
  "phase": "geo",
  "llms_txt": true,
  "llms_full_txt": true,
  "faq_schema": true,
  "howto_schema": true,
  "entity_content": true,
  "eeat_signals": true,
  "content_strategy": true
}
```
