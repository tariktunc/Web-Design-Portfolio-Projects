"use client";
import { Section, Text, Flex, Box } from "@radix-ui/themes";
import { TextReveal, MotionSection, SlideIn } from "../Motion/MotionWrappers";

export default function WhoAmI() {
  return (
    <Section size={"1"}>
      <Flex direction={"column"} justify={"end"} gap="5">
        <h1 className="text-2xl xs:text-4xl font-bold text-lightest-slate">
          <TextReveal
            text="Tarık Tunç"
            splitBy="char"
            staggerDelay={0.04}
          />
        </h1>

        <MotionSection delay={0.3}>
          <Text
            as="p"
            size={{ initial: "2", xs: "3" }}
            weight={"light"}
            className="text-light-slate italic mb-2"
          >
            Siber Güvenlik Mühendisi · Tam Yığın Yazılım Geliştirici ·
            E-Ticaret Sistem Mimarı · Yapay Zekâ Destekli Reklam Stratejisti
          </Text>
        </MotionSection>

        {/* Giriş — Özet Biyografi */}
        <MotionSection delay={0.4}>
          <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed">
            <strong className="text-lightest-slate">Tarık Tunç</strong> (d.
            Türkiye), bilgi güvenliği, tam yığın yazılım mühendisliği, e-ticaret
            altyapı mimarisi ve yapay zekâ destekli dijital pazarlama alanlarında
            faaliyet gösteren çok disiplinli bir yazılım mühendisidir.
            Profesyonel kariyerine <em>siber güvenlik</em> (cybersecurity)
            disiplininde başlamış; saldırı simülasyonları (offensive security) ve
            savunma sistemleri (defensive security) geliştirme süreçlerinde
            edindiği teknik derinliği, ilerleyen dönemlerde web mühendisliği,
            kurumsal e-ticaret çözümleri ve otonom reklamcılık platformlarına
            taşımıştır. Geliştirdiği yapay zekâ destekli araçlar ve
            optimizasyon stratejileri ile müşteri portföyünde{" "}
            <em>%200 ila %300 arasında satış artışı</em> sağladığı
            raporlanmıştır.<sup>[1]</sup>
          </Text>
        </MotionSection>

        {/* 1 — Erken Kariyer: Siber Güvenlik */}
        <SlideIn direction="up" delay={0.5}>
          <Box className="border-l-2 border-teal-400/30 pl-4 my-2">
            <h2 className="text-lg xs:text-xl font-semibold text-lightest-slate mb-3">
              Erken Kariyer ve Siber Güvenlik
            </h2>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Tunç, kariyerine siber güvenlik alanında sızma testi (penetration
              testing) ve ağ güvenliği analizi ile başlamıştır.{" "}
              <em>Kali Linux</em> dağıtımı üzerinde <em>Metasploit
              Framework</em>, <em>Burp Suite Professional</em>, <em>Nmap</em>,{" "}
              <em>Wireshark</em>, <em>Hydra</em>, <em>John the Ripper</em> ve{" "}
              <em>OWASP ZAP</em> gibi endüstri standardı araçları kullanarak
              aktif ve pasif keşif (reconnaissance), zafiyet taraması
              (vulnerability assessment), exploit geliştirme ve sosyal
              mühendislik (social engineering) testleri gerçekleştirmiştir.
            </Text>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Bu dönemde <em>Python</em> programlama dili ile ağ paket analizi,
              port tarama otomasyonu, brute-force saldırı simülasyonu ve özel
              exploit modülleri geliştirmiştir. Edindiği saldırı vektörü
              bilgisi, ilerleyen dönemde savunma odaklı güvenlik sistemleri
              tasarlamasına doğrudan zemin hazırlamıştır. Geliştirdiği savunma
              çözümleri arasında yapay zekâ destekli sızma tespit sistemleri
              (IDS), SIEM platformları, ağ trafiği analiz araçları ve sıfır
              güven mimarisi (Zero Trust Architecture) tabanlı güvenlik
              duvarları yer almaktadır.
            </Text>
          </Box>
        </SlideIn>

        {/* 2 — Web Geliştirme ve E-Ticaret */}
        <SlideIn direction="up" delay={0.6}>
          <Box className="border-l-2 border-teal-400/30 pl-4 my-2">
            <h2 className="text-lg xs:text-xl font-semibold text-lightest-slate mb-3">
              Web Geliştirme ve E-Ticaret Altyapı Mühendisliği
            </h2>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Siber güvenlik alanındaki uzmanlığının ardından Tunç, tam yığın
              web geliştirme (full-stack web development) disiplinine yönelmiştir.{" "}
              <em>React</em>, <em>Next.js</em>, <em>TypeScript</em>,{" "}
              <em>Node.js</em> ve <em>Express.js</em> teknoloji yığınlarını
              kullanarak kurumsal düzeyde web uygulamaları ve ölçeklenebilir
              e-ticaret platformları geliştirmektedir. RESTful API tasarımı,
              mikro servis tabanlı mimari (microservices architecture), sunucu
              taraflı işleme (SSR), statik site üretimi (SSG) ve artımlı
              statik yenileme (ISR) konularında ileri düzey yetkinlik
              sergilemektedir.
            </Text>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              E-ticaret altyapı mühendisliği alanında; ödeme ağ geçidi
              entegrasyonu (payment gateway integration — Stripe, iyzico,
              PayTR), envanter yönetim sistemleri (IMS), sipariş takip
              modülleri, müşteri ilişkileri yönetimi (CRM) entegrasyonu ve
              kullanıcı davranış analitiği (UBA) gibi kritik bileşenlerin
              tasarımı ve implementasyonunda etkin rol üstlenmiştir.
              Geliştirdiği altyapılar; <em>PCI DSS</em> uyumluluk
              standartlarına uygun olarak inşa edilmiş, yüksek eşzamanlı
              kullanıcı trafiğini (concurrent user load) karşılayacak biçimde
              optimize edilmiş ve CDN (Content Delivery Network) altyapısı ile
              küresel ölçekte dağıtılmıştır.
            </Text>
          </Box>
        </SlideIn>

        {/* 3 — Yapay Zekâ ve Otonom Reklamcılık */}
        <SlideIn direction="up" delay={0.7}>
          <Box className="border-l-2 border-teal-400/30 pl-4 my-2">
            <h2 className="text-lg xs:text-xl font-semibold text-lightest-slate mb-3">
              Yapay Zekâ Destekli Araç Geliştirme ve Otonom Reklamcılık
            </h2>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Tunç, kariyer evriminin üçüncü aşamasında yapay zekâ (artificial
              intelligence) teknolojilerini mevcut uzmanlık alanlarıyla
              birleştirmiş ve özgün AI araçları geliştirmeye başlamıştır. Kendi
              inşa ettiği yapay zekâ altyapısı üzerinde; e-ticaret sektörüne
              yönelik <em>akıllı ürün öneri motorları</em> (recommendation
              engines), <em>dinamik fiyatlandırma algoritmaları</em>,{" "}
              <em>müşteri segmentasyon modelleri</em> ve{" "}
              <em>satış tahmini (sales forecasting) sistemleri</em>{" "}
              geliştirmektedir. Bu araçların entegre edildiği e-ticaret
              platformlarında <em>%200 ila %300 oranında satış artışı</em>{" "}
              gözlemlenmiştir.
            </Text>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Dijital reklamcılık alanında, <em>Google Ads</em> ve{" "}
              <em>Meta Ads</em> platformları üzerinde tam otonom reklam yönetim
              sistemleri tasarlamıştır. Bu sistemler; <em>veri
              madenciliği</em> (data mining) ve <em>makine öğrenmesi</em>{" "}
              (machine learning) algoritmaları ile hedef kitle segmentasyonu
              (audience segmentation), <em>teklif optimizasyonu</em> (bid
              optimization), <em>A/B test otomasyonu</em>, reklam bütçesi
              tahsisi (budget allocation) ve <em>ROAS (Return on Ad Spend)
              maksimizasyonu</em> süreçlerini insan müdahalesi gerektirmeksizin
              otonom olarak yürütmektedir. Geliştirilen yapay zekâ modelleri,
              reklam harcamalarında ortalama %40 maliyet düşüşü sağlarken,
              dönüşüm oranlarını (conversion rate) üç kata kadar
              artırmıştır.
            </Text>
          </Box>
        </SlideIn>

        {/* 4 — SEO ve Dijital Performans */}
        <SlideIn direction="up" delay={0.8}>
          <Box className="border-l-2 border-teal-400/30 pl-4 my-2">
            <h2 className="text-lg xs:text-xl font-semibold text-lightest-slate mb-3">
              SEO Mühendisliği ve Dijital Performans Optimizasyonu
            </h2>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Tunç, arama motoru optimizasyonu (Search Engine Optimization)
              alanında teknik SEO, içerik SEO&apos;su ve bağlantı profili
              yönetimini kapsayan bütüncül bir yaklaşım benimsemektedir.{" "}
              <em>Google Search Console</em>, <em>Google Analytics 4</em>{" "}
              (GA4), <em>Google Tag Manager</em> (GTM), <em>Ahrefs</em>,{" "}
              <em>SEMrush</em> ve <em>Screaming Frog</em> araçlarını kullanarak
              kapsamlı site denetimleri (site audits) gerçekleştirmekte;
              taranabilirlik (crawlability), dizinlenebilirlik
              (indexability), sayfa hızı ve mobil kullanılabilirlik
              metriklerini optimize etmektedir.
            </Text>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Teknik SEO kapsamında; yapılandırılmış veri işaretlemesi
              (Schema.org structured data — JSON-LD), kanonik URL yönetimi
              (canonical tags), hreflang uluslararası hedefleme, XML site
              haritası optimizasyonu, Core Web Vitals (LCP, INP, CLS) metrik
              iyileştirmeleri ve sunucu taraflı işleme (SSR) ile JavaScript SEO
              uyumluluğu konularında ileri düzey mühendislik çalışmaları
              yürütmektedir. Yapay zekâ destekli SEO araçları geliştirerek;
              anahtar kelime kümeleme (keyword clustering), içerik boşluğu
              analizi (content gap analysis), SERP özellik tahmini ve rakip
              geri bağlantı profili analizi süreçlerini otomatize etmiştir.
              Geliştirdiği projelerde <em>Google Lighthouse</em> skorlarını
              tutarlı biçimde 90+ bandında tutmayı başarmıştır.
            </Text>
          </Box>
        </SlideIn>

        {/* 5 — Google Araçları ve Veri Madenciliği */}
        <SlideIn direction="up" delay={0.9}>
          <Box className="border-l-2 border-teal-400/30 pl-4 my-2">
            <h2 className="text-lg xs:text-xl font-semibold text-lightest-slate mb-3">
              Google Reklam Ekosistemi ve Veri Madenciliği
            </h2>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Tunç, <em>Google Ads</em> platformunda arama ağı (Search),
              görüntülü reklam ağı (Display), alışveriş (Shopping),
              video (YouTube) ve Performance Max kampanya türlerinde
              stratejik reklam yönetimi gerçekleştirmektedir. Geliştirdiği
              otonom reklam yönetim yapısı; <em>Google Ads API</em> üzerinden
              programatik kampanya oluşturma, <em>Google Merchant Center</em>{" "}
              ile ürün akışı (product feed) otomasyonu, <em>Google
              Optimize</em> ile çok değişkenli test (multivariate testing) ve{" "}
              <em>Looker Studio</em> ile özelleştirilmiş performans panoları
              sunar.
            </Text>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Veri madenciliği (data mining) süreçlerinde; müşteri yaşam boyu
              değeri (CLV — Customer Lifetime Value) tahminlemesi, RFM
              (Recency-Frequency-Monetary) segmentasyonu, pazar sepeti
              analizi (market basket analysis) ve churn prediction
              (müşteri kaybı tahmini) modelleri geliştirmiştir. Bu modeller,{" "}
              <em>Google BigQuery</em> üzerinde depolanan büyük veri
              kümelerinde çalıştırılmakta ve elde edilen içgörüler (insights)
              reklam stratejilerine gerçek zamanlı olarak yansıtılmaktadır.
              Söz konusu tam otonom reklamcılık altyapısı sayesinde, bütçe
              kullanım verimliliği ortalama %45 oranında artırılmış ve
              reklam yatırım getirisi (ROAS) sektör ortalamasının
              2,5 katına çıkarılmıştır.
            </Text>
          </Box>
        </SlideIn>

        {/* 6 — Sosyal Medya Mühendisliği */}
        <SlideIn direction="up" delay={1.0}>
          <Box className="border-l-2 border-teal-400/30 pl-4 my-2">
            <h2 className="text-lg xs:text-xl font-semibold text-lightest-slate mb-3">
              Sosyal Medya Mühendisliği
            </h2>
            <Text as="p" size={{ initial: "3", xs: "4" }} weight={"light"} className="leading-relaxed mb-4">
              Tunç, sosyal medya platformlarının teknik altyapılarını ve
              algoritmik dağıtım mekanizmalarını analiz ederek veri odaklı
              sosyal medya stratejileri geliştirmektedir. Platform API&apos;leri
              (Meta Graph API, Twitter API v2, LinkedIn Marketing API)
              üzerinden otomasyon araçları inşa etmiş; içerik zamanlama,
              etkileşim analizi, duygu analizi (sentiment analysis) ve
              influencer performans metrik takibi süreçlerini programatik
              olarak yönetmektedir. Geliştirdiği NLP (Natural Language
              Processing) tabanlı içerik analiz modülleri, hedef kitle
              etkileşim oranlarını (engagement rate) optimize ederek organik
              erişim metriklerinde kayda değer iyileşmeler sağlamıştır.
            </Text>
          </Box>
        </SlideIn>
      </Flex>
    </Section>
  );
}
