import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 section-dark" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: "hsl(0, 0%, 95%)" }}>
          Let's Build Something{" "}
          <span className="text-gold-gradient">Unforgettable</span>
        </h2>
        <p className="font-body text-lg mb-10 max-w-xl mx-auto" style={{ color: "hsl(0, 0%, 60%)" }}>
          Ready to turn your vision into an experience? Let's talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-gold-gradient text-primary-foreground px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity"
          >
            Plan Your Event
          </Link>
          <Link
            to="/contact"
            className="border border-primary/40 px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase hover:bg-primary/10 transition-colors"
            style={{ color: "hsl(0, 0%, 95%)" }}
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
