import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { usePageContent } from "@/hooks/usePageContent";

const defaults = {
  title_start: "Let's Build Something",
  title_highlight: "Unforgettable",
  description: "Ready to turn your vision into an experience? Let's talk.",
  cta1: "Plan Your Event",
  cta2: "Contact Us",
};

const CTASection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("cta_section", defaults);

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 section-dark" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-white">
          {c.title_start}{" "}
          <span className="text-gold-gradient">{c.title_highlight}</span>
        </h2>
        <p className="font-body text-sm sm:text-lg mb-6 sm:mb-10 max-w-xl mx-auto text-white/80">
          {c.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Link
            to="/contact"
            className="bg-gold-gradient text-primary-foreground px-6 sm:px-10 py-3 sm:py-4 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-all hover:scale-[1.03] duration-300 text-center"
          >
            {c.cta1}
          </Link>
          <Link
            to="/contact"
            className="border border-primary/40 px-6 sm:px-10 py-3 sm:py-4 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-primary/10 transition-all hover:scale-[1.03] duration-300 text-white text-center"
          >
            {c.cta2}
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;

export { defaults as ctaDefaults };
