import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePageContent } from "@/hooks/usePageContent";

const defaults = {
  line1: "We don't just organize events.",
  line2: "We design moments people remember.",
};

const DRIVE_VIDEO_URL = "https://drive.google.com/uc?export=download&id=1bTDqeWvrQmENKYJgttDw-5Q3yaRD7LY_";

const BrandStatement = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("brand_section", defaults);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 relative overflow-hidden" ref={ref}>
      {/* Video background - auto-plays, loops, muted */}
      <div className="absolute inset-0 z-0">
        <video
          src={DRIVE_VIDEO_URL}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-secondary/75" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ scale }}
        transition={{ duration: 1 }}
        className="container mx-auto max-w-4xl text-center relative z-10"
      >
        <motion.div
          className="w-12 sm:w-16 h-px bg-primary mx-auto mb-8 sm:mb-12"
          initial={{ width: 0 }}
          animate={inView ? { width: 64 } : {}}
          transition={{ duration: 0.8 }}
        />
        <h2 className="font-display text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {c.line1}
          <br />
          <span className="text-gold-gradient">{c.line2}</span>
        </h2>
        <motion.div
          className="w-12 sm:w-16 h-px bg-primary mx-auto mt-8 sm:mt-12"
          initial={{ width: 0 }}
          animate={inView ? { width: 64 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>
    </section>
  );
};

export default BrandStatement;

export { defaults as brandDefaults };
