import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HomeCarousel from "@/components/HomeCarousel";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WhySection from "@/components/WhySection";
import BrandStatement from "@/components/BrandStatement";
import CTASection from "@/components/CTASection";
import DocumentarySection from "@/components/DocumentarySection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <DocumentarySection />
      <ProcessSection />
      <WhySection />
      <BrandStatement />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
