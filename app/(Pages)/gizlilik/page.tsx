import type { Metadata } from "next";
import FadeInSection from "@/app/Components/FadeInSection";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Tarık Tunç kişisel web sitesi gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, işlendiği ve korunduğu hakkında bilgi.",
  robots: { index: true, follow: true },
};

export default function GizlilikPage() {
  return (
    <section className="max-w-3xl mx-auto py-20 px-4">
      <Breadcrumb items={[{ label: "Gizlilik Politikası" }]} />
      <FadeInSection>
        <h1 className="text-3xl font-bold text-lightest-slate mb-8">
          Gizlilik Politikası
        </h1>
      </FadeInSection>

      {/* Veri Sorumlusu */}
      <FadeInSection delay={100}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          1. Veri Sorumlusu
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu web sitesi (<a href="https://tariktunc.vercel.app" className="text-green hover:underline">tariktunc.vercel.app</a>),
          Tarık Tunç tarafından işletilmektedir. 6698 sayılı Kişisel Verilerin Korunması Kanunu
          (KVKK) kapsamında veri sorumlusu sıfatıyla hareket etmektedir.
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          <strong className="text-lightest-slate">İletişim:</strong>{" "}
          <a href="mailto:me@tariktunc.com" className="text-green hover:underline">
            me@tariktunc.com
          </a>
        </p>
      </FadeInSection>

      {/* Toplanan Veriler */}
      <FadeInSection delay={150}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          2. Toplanan Veriler
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu web sitesini ziyaret ettiğinizde aşağıdaki veriler otomatik olarak
          toplanabilir:
        </p>
        <ul className="list-disc list-inside text-slate-custom leading-relaxed mb-4 space-y-1">
          <li>IP adresi</li>
          <li>Tarayıcı türü ve sürümü</li>
          <li>İşletim sistemi bilgisi</li>
          <li>Ziyaret edilen sayfalar ve ziyaret süresi</li>
          <li>Yönlendiren URL (referrer)</li>
        </ul>
        <p className="text-slate-custom leading-relaxed mb-4">
          İletişim formu veya e-posta aracılığıyla iletişime geçmeniz halinde
          adınız, e-posta adresiniz ve mesaj içeriğiniz de tarafımızca işlenebilir.
        </p>
      </FadeInSection>

      {/* Çerezler */}
      <FadeInSection delay={200}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          3. Çerezler
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu site, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz
          etmek amacıyla çerezler kullanmaktadır. Çerezler hakkında detaylı bilgi
          için{" "}
          <a href="/cerez-politikasi" className="text-green hover:underline">
            Çerez Politikası
          </a>{" "}
          sayfamızı inceleyebilirsiniz.
        </p>
      </FadeInSection>

      {/* Verilerin İşlenme Amacı */}
      <FadeInSection delay={250}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          4. Verilerin İşlenme Amacı
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Toplanan kişisel veriler aşağıdaki amaçlarla işlenmektedir:
        </p>
        <ul className="list-disc list-inside text-slate-custom leading-relaxed mb-4 space-y-1">
          <li>Web sitesinin düzgün çalışmasını sağlamak</li>
          <li>Kullanıcı deneyimini iyileştirmek ve kişiselleştirmek</li>
          <li>Site trafiğini analiz etmek ve istatistiksel veriler elde etmek</li>
          <li>İletişim taleplerine yanıt vermek</li>
          <li>Yasal yükümlülükleri yerine getirmek</li>
        </ul>
      </FadeInSection>

      {/* Üçüncü Taraf Paylaşımı */}
      <FadeInSection delay={300}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          5. Üçüncü Taraf Paylaşımı
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Kişisel verileriniz, yasal zorunluluklar dışında üçüncü taraflarla
          paylaşılmamaktadır. Ancak aşağıdaki hizmet sağlayıcılar teknik altyapı
          kapsamında verilere erişebilir:
        </p>
        <ul className="list-disc list-inside text-slate-custom leading-relaxed mb-4 space-y-1">
          <li>
            <strong className="text-lightest-slate">Vercel</strong> — Hosting ve
            dağıtım hizmeti
          </li>
          <li>
            <strong className="text-lightest-slate">Google Analytics</strong> —
            Site trafiği analizi (anonim veri)
          </li>
        </ul>
        <p className="text-slate-custom leading-relaxed mb-4">
          Bu hizmet sağlayıcılar, kendi gizlilik politikaları doğrultusunda
          verileri işlemektedir.
        </p>
      </FadeInSection>

      {/* Haklarınız */}
      <FadeInSection delay={350}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          6. KVKK Kapsamındaki Haklarınız
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          6698 sayılı KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara
          sahipsiniz:
        </p>
        <ul className="list-disc list-inside text-slate-custom leading-relaxed mb-4 space-y-1">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>
            İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını
            öğrenme
          </li>
          <li>
            Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü
            kişileri bilme
          </li>
          <li>
            Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme
          </li>
          <li>KVKK&apos;nın 7. maddesi kapsamında silinmesini veya yok edilmesini isteme</li>
          <li>
            İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz
            edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme
          </li>
          <li>
            Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde
            zararın giderilmesini talep etme
          </li>
        </ul>
      </FadeInSection>

      {/* İletişim */}
      <FadeInSection delay={400}>
        <h2 className="text-xl font-semibold text-lightest-slate mt-10 mb-4">
          7. İletişim
        </h2>
        <p className="text-slate-custom leading-relaxed mb-4">
          Gizlilik politikamız hakkında sorularınız veya KVKK kapsamındaki
          talepleriniz için aşağıdaki kanallardan bizimle iletişime geçebilirsiniz:
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          <strong className="text-lightest-slate">E-posta:</strong>{" "}
          <a href="mailto:me@tariktunc.com" className="text-green hover:underline">
            me@tariktunc.com
          </a>
        </p>
        <p className="text-slate-custom leading-relaxed mb-4">
          <strong className="text-lightest-slate">Web:</strong>{" "}
          <a
            href="https://tariktunc.vercel.app"
            className="text-green hover:underline"
          >
            tariktunc.vercel.app
          </a>
        </p>
      </FadeInSection>

      {/* Son Güncelleme */}
      <FadeInSection delay={450}>
        <p className="text-sm text-slate-custom opacity-70 mt-12">
          Son güncelleme: 27 Mart 2026
        </p>
      </FadeInSection>
    </section>
  );
}
