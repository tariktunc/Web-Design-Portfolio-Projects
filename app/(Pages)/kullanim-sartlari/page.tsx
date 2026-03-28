import type { Metadata } from "next";
import FadeInSection from "@/app/Components/FadeInSection";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description:
    "Tarık Tunç kişisel web sitesi kullanım şartları ve koşulları.",
  robots: { index: true, follow: true },
};

export default function KullanimSartlariPage() {
  return (
    <section className="max-w-3xl mx-auto py-20 px-4">
      <Breadcrumb items={[{ label: "Kullanım Şartları" }]} />
      <FadeInSection>
        <h1 className="text-3xl font-bold text-lightest-slate mb-8">
          Kullanım Şartları
        </h1>
      </FadeInSection>

      {/* Genel Koşullar */}
      <FadeInSection delay={100}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          1. Genel Koşullar
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu web sitesine (<a href="https://tariktunc.com" className="text-green hover:underline">tariktunc.com</a>)
          erişerek ve siteyi kullanarak aşağıda belirtilen kullanım şartlarını
          kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız siteyi
          kullanmayı bırakmanız gerekmektedir.
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          Site, Tarık Tunç tarafından kişisel portföy ve blog amacıyla
          işletilmektedir. Sitede yer alan içerikler bilgilendirme amaçlıdır ve
          herhangi bir profesyonel danışmanlık hizmeti yerine geçmez.
        </p>
      </FadeInSection>

      {/* Fikri Mülkiyet */}
      <FadeInSection delay={150}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          2. Fikri Mülkiyet Hakları
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu web sitesinde yer alan tüm içerikler — metin, grafik, logo, ikon,
          görsel, ses, video, yazılım ve tasarım dahil olmak üzere — Tarık
          Tunç&apos;a aittir veya lisanslıdır. Bu içerikler 5846 sayılı Fikir ve Sanat
          Eserleri Kanunu ve ilgili uluslararası mevzuat kapsamında korunmaktadır.
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          Sitedeki içeriklerin izinsiz kopyalanması, çoğaltılması, dağıtılması
          veya ticari amaçla kullanılması yasaktır. Blog yazıları veya teknik
          makaleler, kaynak belirtilmesi koşuluyla kısmen alıntılanabilir.
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          Açık kaynaklı olarak paylaşılan projeler, ilgili lisans koşullarına
          tabidir. Her projenin kendi deposunda belirtilen lisans geçerlidir.
        </p>
      </FadeInSection>

      {/* Sorumluluk Sınırlaması */}
      <FadeInSection delay={200}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          3. Sorumluluk Sınırlaması
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu web sitesi &quot;olduğu gibi&quot; sunulmakta olup herhangi bir garanti
          verilmemektedir. Tarık Tunç, aşağıdaki durumlardan dolayı sorumluluk
          kabul etmez:
        </p>
        <ul className="list-disc list-inside text-slate-custom leading-relaxed mb-4 space-y-1">
          <li>
            Sitedeki bilgilerin doğruluğu, güncelliği veya eksiksizliği konusunda
          </li>
          <li>
            Sitenin kesintisiz veya hatasız çalışacağına dair
          </li>
          <li>
            Site üzerinden erişilen üçüncü taraf web sitelerinin içerikleri
            hakkında
          </li>
          <li>
            Sitedeki bilgilere dayanarak alınan kararlar sonucunda oluşabilecek
            doğrudan veya dolaylı zararlar hakkında
          </li>
        </ul>
        <p className="text-slate-custom leading-relaxed mb-4">
          Site üzerindeki dış bağlantılar (linkler) yalnızca kolaylık sağlamak
          amacıyla verilmektedir. Bu bağlantılara tıklayarak ulaşacağınız
          sitelerin içeriklerinden Tarık Tunç sorumlu değildir.
        </p>
      </FadeInSection>

      {/* Değişiklikler */}
      <FadeInSection delay={250}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          4. Değişiklikler
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu kullanım şartları herhangi bir zamanda önceden bildirimde
          bulunmaksızın güncellenebilir. Değişiklikler sitede yayınlandığı andan
          itibaren geçerlidir. Siteyi kullanmaya devam etmeniz, güncellenmiş
          şartları kabul ettiğiniz anlamına gelir.
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          Kullanım şartlarındaki önemli değişiklikler, sayfanın altındaki
          &quot;son güncelleme&quot; tarihine yansıtılacaktır.
        </p>
      </FadeInSection>

      {/* Uygulanacak Hukuk */}
      <FadeInSection delay={300}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          5. Uygulanacak Hukuk
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu kullanım şartları Türkiye Cumhuriyeti kanunlarına tabidir.
          Herhangi bir uyuşmazlık halinde Türkiye Cumhuriyeti mahkemeleri
          yetkilidir.
        </p>
      </FadeInSection>

      {/* İletişim */}
      <FadeInSection delay={350}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          6. İletişim
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Kullanım şartları hakkında sorularınız için aşağıdaki kanallardan
          iletişime geçebilirsiniz:
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          <strong className="text-lightest-slate">E-posta:</strong>{" "}
          <a href="mailto:developer@tariktunc.com" className="text-green hover:underline">
            developer@tariktunc.com
          </a>
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          <strong className="text-lightest-slate">Freelancer:</strong>{" "}
          <a
            href="https://blakfy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green hover:underline"
          >
            blakfy.com
          </a>
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
