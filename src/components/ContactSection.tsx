import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32 px-6" ref={ref}>
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Let's <span className="text-gold-gradient">Connect</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-12 text-center"
        >
          <div className="space-y-3">
            <Mail className="w-6 h-6 text-primary mx-auto" />
            <h3 className="font-display text-lg font-semibold">Email</h3>
            <a
              href="mailto:info@vionevents.com"
              className="text-muted-foreground font-body text-sm hover:text-primary transition-colors"
            >
              info@vionevents.com
            </a>
          </div>
          <div className="space-y-3">
            <Phone className="w-6 h-6 text-primary mx-auto" />
            <h3 className="font-display text-lg font-semibold">Phone</h3>
            <a
              href="tel:+251911000000"
              className="text-muted-foreground font-body text-sm hover:text-primary transition-colors"
            >
              +251 911 000 000
            </a>
          </div>
          <div className="space-y-3">
            <MapPin className="w-6 h-6 text-primary mx-auto" />
            <h3 className="font-display text-lg font-semibold">Locations</h3>
            <p className="text-muted-foreground font-body text-sm">
              Addis Ababa · Hawassa
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
