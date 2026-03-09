import Navbar from "@/app/Components/Navbar/Navbar";
import SocialMedia from "@/app/Components/SocialMedia/SocialMedia";
import Footer from "@/app/Components/Footer/Footer";
import {
  ScrollProgress,
  FloatingOrbs,
  PageTransition,
} from "@/app/Components/Motion/MotionWrappers";

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <FloatingOrbs />
      <Navbar />
      <main id="main-content" className="px-4 xs:px-5 sm:px-6">
        <PageTransition>{children}</PageTransition>
      </main>
      <SocialMedia />
      <Footer />
    </>
  );
}
