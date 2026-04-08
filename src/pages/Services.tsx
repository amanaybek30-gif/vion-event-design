import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import SEOHead from "@/components/SEOHead";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CalendarCheck, Palette, Building2, PenTool, Monitor, Music,
  UtensilsCrossed, Clapperboard, Truck, Gift,
} from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import servicesBg from "@/assets/services-bg.jpg";

const iconMap = [CalendarCheck, Palette, Building2, PenTool, Monitor, Music, UtensilsCrossed, Clapperboard, Truck, Gift];

const defaults: Record<string, string> = {
  subtitle: "What We Do",
  title_start: "Our",
  title_highlight: "Services",
  description: "End-to-end event solutions crafted with creativity, precision, and passion.",
  service1_title: "Event Planning & Execution",
  service1_desc: "From concept to execution, we plan every detail to ensure your event runs flawlessly and exceeds expectations.",
  service2_title: "Theme & Budget Designing",
  service2_desc: "Creative theme development and strategic budget planning to maximize impact within your investment.",
  service3_title: "Venue Selection & Setup",
  service3_desc: "Expert venue sourcing and professional setup to create the perfect atmosphere for your event.",
  service4_title: "Event Branding & Creative Design",
  service4_desc: "Professional branding solutions and creative design services to make your event visually stunning.",
  service5_title: "Digital Experience",
  service5_desc: "Modern event technology, live streaming, and digital event solutions.",
  service6_title: "Entertainment",
  service6_desc: "Curated entertainment options including live performances, DJs, and interactive experiences.",
  service7_title: "Catering Coordination",
  service7_desc: "Exceptional food and beverage services that delight guests and complement your event theme.",
  service8_title: "Technical Production",
  service8_desc: "Sound systems, lighting, AV equipment, and stage setup for impactful presentations.",
  service9_title: "Logistics Management",
  service9_desc: "Transportation, accommodation, and on-site coordination for seamless event flow.",
  service10_title: "Guest Experience",
  service10_desc: "Registration management, gift coordination, and personalized guest services.",
};

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("services", defaults);

  const services = Array.from({ length: 10 }, (_, i) => ({
    icon: iconMap[i],
    title: c[`service${i + 1}_title`],
    description: c[`service${i + 1}_desc`],
  }));

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <SEOHead title="Services | VION Events" description="End-to-end event solutions crafted with creativity, precision, and passion." path="/services" />
      
      <div className="fixed inset-0 -z-20">
        <img src={servicesBg} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-background/85" />
      </div>
      
      <PageBackground />
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12 sm:mb-20">
            <p className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">{c.subtitle}</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{c.title_start} <span className="text-gold-gradient">{c.title_highlight}</span></h1>
            <p className="text-muted-foreground font-body text-sm sm:text-lg mt-4 sm:mt-6 max-w-2xl mx-auto">{c.description}</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {services.map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} whileHover={{ y: -8, borderColor: "hsl(var(--primary) / 0.5)" }} className="border border-border rounded-sm p-6 sm:p-8 hover:border-primary/40 transition-all duration-500 group cursor-default backdrop-blur-sm bg-background/40">
                <motion.div whileHover={{ rotate: 5, scale: 1.1 }} transition={{ duration: 0.3 }}>
                  <service.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300" />
                </motion.div>
                <h3 className="font-display text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-muted-foreground font-body text-xs sm:text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
