import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HomeCarousel from "@/components/HomeCarousel";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import WhySection from "@/components/WhySection";
import BrandStatement from "@/components/BrandStatement";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import DocumentarySection from "@/components/DocumentarySection";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import PageBackground from "@/components/PageBackground";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground relative overflow-hidden">
      <SEOHead
        title="VION Events | Premium Event Management & Experience Design in Ethiopia"
        description="VION Events is a premium event management company in Ethiopia delivering corporate events, forums, and brand experiences powered by VERS event technology."
        path="/"
      />
      <PageBackground />
      <Navbar />
      <NewsTicker />
      <HeroSection />
      <HomeCarousel />
      <AnnouncementsSection />
      <AboutSection />
      <ServicesSection />
      <DocumentarySection />
      <ProcessSection />
      <WhySection />
      <BrandStatement />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
