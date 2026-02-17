import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TreatmentsSection from "@/components/TreatmentsSection";
import SmileGallery from "@/components/SmileGallery";
import ProductsSection from "@/components/ProductsSection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="bg-white dark:bg-slate-950">
      <Navbar />
      <HeroSection />
      <TreatmentsSection />
      <SmileGallery />
      <ProductsSection />
      <TestimonialsCarousel />
      <FAQSection />
      <ContactSection />
    </main>
  );
}
