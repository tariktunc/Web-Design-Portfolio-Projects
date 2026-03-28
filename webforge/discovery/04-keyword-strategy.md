# Phase 4: Keyword & Traffic Strategy

> Ask these questions in TURKISH. Wait for answers before proceeding.
> Answers feed into: keyword-analyst agent

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 4: Anahtar Kelime & Trafik Stratejisi
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

18. Hedef anahtar kelimeler var mi?
    - [ ] Evet, hedef kelimelerimiz belli:
      - Birincil: ___
      - Ikincil: ___
      - Ucuncu: ___
    - [ ] Hayir, sektorumuze gore arastirma yapilsin
    - [ ] Bir fikrimiz var ama dogrulanmasi lazim: ___

19. Rakip siteler (SEO acisindan):
    - Rakip 1 domain: ___
    - Rakip 2 domain: ___
    - Rakip 3 domain: ___

    Bu rakiplerin hangi konularda iyi siralandığını
    biliyor musunuz? ___

20. Trafik hedefleri:
    - [ ] Organik trafik (Google aramadan gelsin)
    - [ ] Reklamli trafik (Google Ads, Meta Ads)
    - [ ] Sosyal medya trafigi
    - [ ] Referans trafigi (baska sitelerden link)
    - [ ] AI arama trafigi (ChatGPT, Perplexity cevaplarinda gorun)

21. Hedef donusum (site ziyaretcileri ne yapsin?):
    - [ ] Iletisim formu gondersin
    - [ ] Telefon etsin
    - [ ] WhatsApp'tan yazsin
    - [ ] Urun/hizmet satin alsin
    - [ ] Newsletter'a abone olsun
    - [ ] Ucretsiz deneme baslatsin
    - [ ] Dosya/katalog indirsin
    - [ ] Randevu alsin
    - [ ] Diger: ___

22. Yerel SEO gerekli mi?
    - [ ] Evet — fiziksel lokasyon var (sehir: ___)
    - [ ] Evet — belirli sehirleri hedefliyoruz: ___
    - [ ] Hayir — ulke geneli / uluslararasi

23. Icerik plani:
    - [ ] Blog olacak (konular: ___)
    - [ ] Blog olmayacak, sadece ana sayfalar
    - [ ] SSS (Sikca Sorulan Sorular) sayfasi olacak
    - [ ] Kaynak/Rehber sayfasi olacak

24. Keyword arastirma araci erisimi var mi?
    - [ ] Google Keyword Planner erişimim var
    - [ ] Ahrefs / SEMrush erişimim var
    - [ ] Google Search Console verim var
    - [ ] Hicbiri yok — en iyi tahminle ilerleyelim
```

## Defaults
- Keywords: To be researched by keyword-analyst
- Traffic targets: Organic + AI search
- Conversion: Contact form submission
- Local SEO: Based on Discovery Phase 01 (audience location)
- Content: Main pages + FAQ
- Tools: None (estimate-based research)

## What keyword-analyst Does With This Data

1. Takes user's seed keywords (if provided) as starting point
2. Expands with industry knowledge and search patterns
3. Classifies by intent (informational, commercial, transactional)
4. Maps keywords to pages
5. Identifies content gaps
6. Creates FAQ suggestions from question keywords
7. Analyzes AI search patterns for GEO opportunities
8. Outputs keyword-report.json

## Output Format
```json
{
  "phase": "keyword-strategy",
  "seed_keywords": [],
  "competitors": [],
  "traffic_targets": ["organic", "ai-search"],
  "conversion_goals": ["contact-form"],
  "local_seo": { "needed": false, "cities": [] },
  "content_plan": ["main-pages", "faq"],
  "blog_planned": false,
  "keyword_tools_available": "none"
}
```
