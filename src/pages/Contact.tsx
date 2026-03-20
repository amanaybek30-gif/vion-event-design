import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
              Get in Touch
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Let's <span className="text-gold-gradient">Connect</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg mt-6 max-w-xl mx-auto">
              Ready to create something unforgettable? Reach out and let's start planning.
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
              <h3 className="font-display text-lg font-semibold">Email Us</h3>
              <a
                href="mailto:info@vionevents.com"
                className="inline-block bg-gold-gradient text-primary-foreground px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity font-body"
              >
                Send Email
              </a>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Phone className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold">Call Us</h3>
              <a
                href="tel:+251944010908"
                className="inline-block bg-gold-gradient text-primary-foreground px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity font-body"
              >
                +251 944 010 908
              </a>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold">Locations</h3>
              <p className="text-muted-foreground font-body text-sm">
                Addis Ababa · Hawassa
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Contact;
