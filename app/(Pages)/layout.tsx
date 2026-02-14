import Navbar from "@/app/Components/Navbar/Navbar";
import SocialMedia from "@/app/Components/SocialMedia/SocialMedia";
import Footer from "@/app/Components/Footer/Footer";
import { Container } from "@radix-ui/themes";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Container
          size="4"
          px={{ initial: "4", xs: "5", sm: "6" }}
          style={{ maxWidth: 1600 }}
        >
          {children}
        </Container>
      </main>
      <SocialMedia />
      <Footer />
    </>
  );
}
