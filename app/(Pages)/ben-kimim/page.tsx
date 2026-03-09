import type { Metadata } from "next";
import { Text, Heading, Link, Box } from "@radix-ui/themes";
import Avatar from "@/app/Components/WhoAmI/Avatar";
import SoftwareLanguages from "./Components/SoftwareLanguages";
import WhoAmI from "@/app/Components/WhoAmI/WhoAmI";
import {
  ClipReveal,
  ParallaxImage,
  MotionSection,
  SlideIn,
  GlowLine,
} from "@/app/Components/Motion/MotionWrappers";

export const metadata: Metadata = {
  title: "Hakkımda — Tarık Tunç | Full Stack Developer & Siber Güvenlik Uzmanı",
  description:
    "Tarık Tunç hakkında — Türkiye merkezli Full Stack Developer ve Siber Güvenlik Araştırmacısı. React, Next.js, TypeScript, Python, Kali Linux, penetrasyon testi ve e-ticaret altyapı mühendisliği.",
  openGraph: {
    title: "Hakkımda — Tarık Tunç | Full Stack Developer & Siber Güvenlik Uzmanı",
    description:
      "Tarık Tunç — tam yığın yazılım mühendisi, siber güvenlik uzmanı, e-ticaret altyapı mimarı. Teknolojiler, projeler ve uzmanlık alanları.",
    images: [{ url: "/whoami/whoamitablo.webp", width: 1600, height: 800 }],
  },
  alternates: {
    canonical: "https://tariktunc.vercel.app/ben-kimim",
  },
};

export default function WhoAmIPage() {
  return (
    <>
      {/* Banner — circle clip reveal + parallax */}
      <ClipReveal direction="circle" className="mb-10 rounded overflow-hidden">
        <ParallaxImage
          src="/whoami/whoamitablo.webp"
          alt="Hakkımda - Tarık Tunç"
          width={1600}
          height={800}
          speed={0.25}
          priority
          className="rounded"
        />
      </ClipReveal>

      {/* Avatar — pop-in with float */}
      <MotionSection delay={0.1}>
        <Avatar />
      </MotionSection>

      {/* Who Am I content — Wikipedia-style biography */}
      <MotionSection delay={0.15}>
        <WhoAmI />
      </MotionSection>

      {/* Glow separator */}
      <GlowLine className="my-6" delay={0.2} />

      {/* Software Languages & Cyber Security Tools */}
      <MotionSection delay={0.1}>
        <SoftwareLanguages />
      </MotionSection>

      {/* Glow separator */}
      <GlowLine className="my-6" delay={0.2} />

      {/* Contact section — slide-in */}
      <SlideIn direction="up" delay={0.2}>
        <Box my={"5"}>
          <Heading as="h2" size={{ initial: "4", xs: "5" }} mb={"3"}>
            İletişime Geçelim!
          </Heading>
          <Text as="p" weight={"light"} mb={"2"}>
            Bana{" "}
            <Link href="mailto:developer@tariktunc.com?subject=Web%20Sitemiz%20Hakkında&body=Merhaba,%20web%20sitenizle%20ilgili%20bir%20soruyum%20var.">
              <em>developer@tariktunc.com</em>
            </Link>{" "}
            adresinden de e-posta gönderebilirsiniz, ancak hemen yanıt
            beklemeyin (ya da hiç yanıt gelmeyebilir).
          </Text>
          <Text as="p" weight={"light"}>
            Uğradığınız için teşekkürler. Kaynak kod seninle olsun, Tarık.
          </Text>
        </Box>
      </SlideIn>
    </>
  );
}
