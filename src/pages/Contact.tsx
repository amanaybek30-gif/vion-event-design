import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 px-6" ref={ref}>
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
              {c.subtitle}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              {c.title_start} <span className="text-gold-gradient">{c.title_highlight}</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg mt-6 max-w-xl mx-auto">
              {c.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-12"
          >
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold">{c.email_label}</h3>
              <a
                href={`mailto:${c.email}`}
                className="inline-block bg-gold-gradient text-primary-foreground px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity font-body"
              >
                Send Email
              </a>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold">{c.phone_label}</h3>
              <a
                href={`tel:${c.phone.replace(/\s/g, "")}`}
                className="inline-block bg-gold-gradient text-primary-foreground px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity font-body"
              >
                {c.phone}
              </a>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold">{c.locations_label}</h3>
              <p className="text-muted-foreground font-body text-sm">{c.locations}</p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
