import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorkSection from "@/components/WorkSection";
import ProcessSection from "@/components/ProcessSection";
import WhySection from "@/components/WhySection";
import BrandStatement from "@/components/BrandStatement";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WorkSection />
      <ProcessSection />
      <WhySection />
      <BrandStatement />
      <CTASection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
