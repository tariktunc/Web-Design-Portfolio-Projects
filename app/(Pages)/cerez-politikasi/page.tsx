import type { Metadata } from "next";
import FadeInSection from "@/app/Components/FadeInSection";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description:
    "Tarık Tunç kişisel web sitesi çerez politikası. Kullanılan çerez türleri ve yönetimi hakkında bilgi.",
  robots: { index: true, follow: true },
};

export default function CerezPolitikasiPage() {
  return (
    <section className="max-w-3xl mx-auto py-20 px-4">
      <Breadcrumb items={[{ label: "Çerez Politikası" }]} />
      <FadeInSection>
        <h1 className="text-3xl font-bold text-lightest-slate mb-8">
          Çerez Politikası
        </h1>
      </FadeInSection>

      {/* Çerez Nedir */}
      <FadeInSection delay={100}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          1. Çerez Nedir?
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Çerezler (cookies), web sitelerinin tarayıcınıza gönderdiği ve
          cihazınızda saklanan küçük metin dosyalarıdır. Bu dosyalar, siteyi bir
          sonraki ziyaretinizde sizi tanımak, tercihlerinizi hatırlamak ve
          kullanıcı deneyimini iyileştirmek amacıyla kullanılır.
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          Çerezler, kişisel bilgilerinize zarar vermez ve cihazınıza virüs
          bulaştırmaz.
        </p>
      </FadeInSection>

      {/* Kullanılan Çerez Türleri */}
      <FadeInSection delay={150}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          2. Kullanılan Çerez Türleri
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu web sitesinde (<a href="https://tariktunc.vercel.app" className="text-green hover:underline">tariktunc.vercel.app</a>)
          aşağıdaki çerez türleri kullanılmaktadır:
        </p>

        <div className="overflow-x-auto mb-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-navy-lighter">
                <th className="text-left py-3 px-4 text-lightest-slate font-semibold">
                  Çerez Türü
                </th>
                <th className="text-left py-3 px-4 text-lightest-slate font-semibold">
                  Amaç
                </th>
                <th className="text-left py-3 px-4 text-lightest-slate font-semibold">
                  Süre
                </th>
              </tr>
            </thead>
            <tbody className="text-slate-custom">
              <tr className="border-b border-navy-lighter">
                <td className="py-3 px-4 font-medium text-green">Zorunlu</td>
                <td className="py-3 px-4">
                  Sitenin temel işlevlerinin çalışması için gereklidir. Oturum
                  yönetimi ve güvenlik gibi kritik fonksiyonları sağlar.
                </td>
                <td className="py-3 px-4">Oturum</td>
              </tr>
              <tr className="border-b border-navy-lighter">
                <td className="py-3 px-4 font-medium text-green">Analitik</td>
                <td className="py-3 px-4">
                  Ziyaretçi sayısı, sayfa görüntülenmeleri ve trafik kaynakları
                  gibi istatistiksel verileri toplar. Veriler anonim olarak
                  işlenir.
                </td>
                <td className="py-3 px-4">2 yıl</td>
              </tr>
              <tr className="border-b border-navy-lighter">
                <td className="py-3 px-4 font-medium text-green">Fonksiyonel</td>
                <td className="py-3 px-4">
                  Dil tercihi, tema seçimi gibi kullanıcı tercihlerini hatırlar.
                  Kişiselleştirilmiş bir deneyim sunar.
                </td>
                <td className="py-3 px-4">1 yıl</td>
              </tr>
              <tr className="border-b border-navy-lighter">
                <td className="py-3 px-4 font-medium text-green">Pazarlama</td>
                <td className="py-3 px-4">
                  Ziyaretçilere ilgi alanlarına uygun reklamlar göstermek
                  amacıyla kullanılır. Üçüncü taraf reklam ağları tarafından
                  yerleştirilebilir.
                </td>
                <td className="py-3 px-4">6 ay</td>
              </tr>
            </tbody>
          </table>
        </div>
      </FadeInSection>

      {/* Çerez Yönetimi */}
      <FadeInSection delay={200}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          3. Çerez Yönetimi
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Tarayıcı ayarlarınızı değiştirerek çerezleri kabul etmeyi veya
          reddetmeyi tercih edebilirsiniz. Çerezleri devre dışı bırakmak,
          sitedeki bazı özelliklerin düzgün çalışmamasına neden olabilir.
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          Yaygın tarayıcılarda çerez ayarlarını yönetmek için:
        </p>
        <ul className="list-disc list-inside text-slate-custom leading-relaxed mb-4 space-y-1">
          <li>
            <strong className="text-lightest-slate">Chrome:</strong> Ayarlar &rarr;
            Gizlilik ve Güvenlik &rarr; Çerezler
          </li>
          <li>
            <strong className="text-lightest-slate">Firefox:</strong> Ayarlar &rarr;
            Gizlilik ve Güvenlik &rarr; Çerezler ve Site Verileri
          </li>
          <li>
            <strong className="text-lightest-slate">Safari:</strong> Tercihler &rarr;
            Gizlilik &rarr; Çerezleri Yönet
          </li>
          <li>
            <strong className="text-lightest-slate">Edge:</strong> Ayarlar &rarr;
            Çerezler ve Site İzinleri
          </li>
        </ul>
      </FadeInSection>

      {/* Üçüncü Taraf Çerezleri */}
      <FadeInSection delay={250}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          4. Üçüncü Taraf Çerezleri
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu sitede aşağıdaki üçüncü taraf hizmetleri çerez kullanabilir:
        </p>
        <ul className="list-disc list-inside text-slate-custom leading-relaxed mb-4 space-y-1">
          <li>
            <strong className="text-lightest-slate">Google Analytics</strong> —
            Site trafiği ve kullanıcı davranışı analizi
          </li>
          <li>
            <strong className="text-lightest-slate">Vercel Analytics</strong> —
            Performans izleme ve web vitals metrikleri
          </li>
        </ul>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu hizmet sağlayıcıların çerez politikaları hakkında detaylı bilgi
          almak için ilgili sağlayıcıların gizlilik sayfalarını ziyaret
          edebilirsiniz.
        </p>
      </FadeInSection>

      {/* Güncellemeler */}
      <FadeInSection delay={300}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          5. Güncellemeler
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu çerez politikası, yasal düzenlemeler veya site altyapısındaki
          değişikliklere bağlı olarak güncellenebilir. Değişiklikler bu sayfada
          yayınlandığı andan itibaren geçerlidir.
        </p>
      </FadeInSection>

      {/* İletişim */}
      <FadeInSection delay={350}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          6. İletişim
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Çerez politikamız hakkında sorularınız için bizimle iletişime
          geçebilirsiniz:
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          <strong className="text-lightest-slate">E-posta:</strong>{" "}
          <a href="mailto:me@tariktunc.com" className="text-green hover:underline">
            me@tariktunc.com
          </a>
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          Ayrıca{" "}
          <a href="/gizlilik" className="text-green hover:underline">
            Gizlilik Politikası
          </a>{" "}
          ve{" "}
          <a href="/kullanim-sartlari" className="text-green hover:underline">
            Kullanım Şartları
          </a>{" "}
          sayfalarımızı da incelemenizi öneririz.
        </p>
      </FadeInSection>

      {/* Son Güncelleme */}
      <FadeInSection delay={400}>
        <p className="text-sm text-slate-custom opacity-70 mt-12">
          Son güncelleme: 27 Mart 2026
        </p>
      </FadeInSection>
    </section>
  );
}
