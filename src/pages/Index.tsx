import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HomeCarousel from "@/components/HomeCarousel";
import Footer from "@/components/Footer";
import NewsTicker from "@/components/NewsTicker";
import AnnouncementsSection from "@/components/AnnouncementsSection";
import PageBackground from "@/components/PageBackground";
import SEOHead from "@/components/SEOHead";

// Lazy load below-fold sections
const AboutSection = lazy(() => import("@/components/AboutSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const ProcessSection = lazy(() => import("@/components/ProcessSection"));
const WhySection = lazy(() => import("@/components/WhySection"));
const BrandStatement = lazy(() => import("@/components/BrandStatement"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/CTASection"));
const DocumentarySection = lazy(() => import("@/components/DocumentarySection"));

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
      <Suspense fallback={null}>
        <AboutSection />
        <ServicesSection />
        <DocumentarySection />
        <ProcessSection />
        <WhySection />
        <BrandStatement />
        <TestimonialsSection />
        <CTASection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Index;
