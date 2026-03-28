import type { Metadata } from "next";
import Breadcrumb from "@/app/Components/Breadcrumb/Breadcrumb";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Tarık Tunç ile iletişime geçin. Projeler, işbirlikleri veya sorularınız için WhatsApp veya e-posta ile ulaşabilirsiniz.",
  alternates: {
    canonical: "https://tariktunc.com/iletisim",
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <Breadcrumb items={[{ label: "İletişim" }]} />
      <ContactPageClient />
    </div>
  );
}
