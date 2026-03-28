# Phase 2: Brand Strategy

> Ask these questions in TURKISH. Wait for answers before proceeding.
> Answers feed into: brand-strategist agent

## Questions

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FASE 2: Marka Stratejisi & Kimlik
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

6. Marka durumu:
   - [ ] Yeni marka — sifirdan olusturulacak
   - [ ] Mevcut marka — dijitale uyarlanacak
   - [ ] Mevcut marka var ama yenilenmeli (rebrand)

7. Marka adi:
   - [ ] Marka adi belli: ___
   - [ ] Isim onerileri istiyorum (sektore uygun)
   - [ ] Birden fazla secenek arasindan karar vermem lazim

8. Marka kisilik ozellikleri (en cok uyanları secin, maks 5):
   - [ ] Profesyonel       - [ ] Samimi
   - [ ] Yenilikci         - [ ] Geleneksel
   - [ ] Guvenilir         - [ ] Cesur
   - [ ] Eglenceli         - [ ] Ciddi
   - [ ] Luks              - [ ] Erisilebilir/uygun
   - [ ] Minimal           - [ ] Zengin/detayli
   - [ ] Teknoloji odakli  - [ ] Insan odakli
   - [ ] Diger: ___

9. Iletisim tonu (nasil konusmali?):
   - [ ] Resmi (siz dili, kurumsal ton)
   - [ ] Yari resmi (siz dili ama samimi — ONERILEN)
   - [ ] Samimi (sen dili, arkadas gibi)
   - [ ] Teknik (sektore ozel terimler)
   - [ ] Basit (herkesin anlayacagi dil)

10. Rakipler — referans aldıginız markalar:
    - Rakip 1 (site/marka): ___
    - Rakip 2 (site/marka): ___
    - Rakip 3 (site/marka): ___

    Bu rakiplerde neyi begeniyorsunuz?
    Bu rakiplerden neyi FARKLI yapmak istiyorsunuz?

11. Marka mesaji — esas ne anlatmak istiyorsunuz?
    Tek cumleyle: ___

    Ornek: "Turkiye'nin en guvenilir web tasarim partneri"
    Ornek: "Teknolojik cozumlerle isletmenizi buyutuyoruz"
    Ornek: "Basit, hizli ve etkili dijital cozumler"
```

## Defaults
- Brand status: New (from scratch)
- Personality: Professional, Innovative, Reliable
- Tone: Semi-formal (siz dili, samimi)
- Competitors: None provided
- Brand message: To be defined by brand-strategist

## Output Format
```json
{
  "phase": "brand-strategy",
  "brand_status": "new | existing | rebrand",
  "brand_name": "name or null",
  "personality_traits": ["professional", "innovative", "reliable"],
  "tone": "semi-formal",
  "competitors": [],
  "brand_message": "core message or null",
  "needs_naming": false,
  "differentiation": "what makes this brand different"
}
```
