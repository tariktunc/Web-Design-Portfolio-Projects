import Navbar from "@/app/Components/Navbar/Navbar";
import SocialMedia from "@/app/Components/SocialMedia/SocialMedia";
import Footer from "@/app/Components/Footer/Footer";
import { Container } from "@radix-ui/themes";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Tüm sayfa yapılarının eşit olunması için container kullanıldı. */}
      <Container size="3" className="initial:p-3 xs:px-3 md:px-5">
        {children}
      </Container>
      <SocialMedia />
      <Footer />
    </>
  );
}
