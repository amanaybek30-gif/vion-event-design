import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import SEOHead from "@/components/SEOHead";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const defaults = {
  subtitle: "Get in Touch",
  title_start: "Let's",
  title_highlight: "Connect",
  description: "Ready to create something unforgettable? Reach out and let's start planning.",
  email_label: "Email Us",
  email: "info@vionevents.com",
  phone_label: "Call Us",
  phone: "+251 944 010 908",
  locations_label: "Locations",
  locations: "Addis Ababa · Hawassa",
};

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("contact", defaults);

  const contactItems = [
    {
      icon: Mail, label: c.email_label,
      content: <a href={`mailto:${c.email}`} className="inline-block bg-gold-gradient text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 hover:scale-[1.03] transition-all duration-300 font-body">Send Email</a>,
    },
    {
      icon: Phone, label: c.phone_label,
      content: <a href={`tel:${c.phone.replace(/\s/g, "")}`} className="inline-block bg-gold-gradient text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 hover:scale-[1.03] transition-all duration-300 font-body">{c.phone}</a>,
    },
    {
      icon: MapPin, label: c.locations_label,
      content: <p className="text-muted-foreground font-body text-xs sm:text-sm">{c.locations}</p>,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <SEOHead title="Contact | VION Events" description="Get in touch with VION Events. Let's plan your next unforgettable experience." path="/contact" />
      <PageBackground />
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6" ref={ref}>
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-10 sm:mb-16">
            <p className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">{c.subtitle}</p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{c.title_start} <span className="text-gold-gradient">{c.title_highlight}</span></h1>
            <p className="text-muted-foreground font-body text-sm sm:text-lg mt-4 sm:mt-6 max-w-xl mx-auto">{c.description}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {contactItems.map((item) => (
              <motion.div key={item.label} className="text-center space-y-3 sm:space-y-4" whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
                <motion.div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto" whileHover={{ scale: 1.1 }}>
                  <item.icon className="w-6 sm:w-7 h-6 sm:h-7 text-primary" />
                </motion.div>
                <h3 className="font-display text-base sm:text-lg font-semibold">{item.label}</h3>
                {item.content}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
