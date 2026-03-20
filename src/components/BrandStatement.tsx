import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BrandStatement = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-32 px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 animate-shimmer" />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="container mx-auto max-w-4xl text-center relative z-10"
      >
        <div className="w-16 h-px bg-primary mx-auto mb-12" />
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          We don't just organize events.
          <br />
          <span className="text-gold-gradient">
            We design moments people remember.
          </span>
        </h2>
        <div className="w-16 h-px bg-primary mx-auto mt-12" />
      </motion.div>
    </section>
  );
};

export default BrandStatement;
