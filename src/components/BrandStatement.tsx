import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePageContent } from "@/hooks/usePageContent";

const defaults = {
  line1: "We don't just organize events.",
  line2: "We design moments people remember.",
};

const DRIVE_VIDEO_ID = "1bTDqeWvrQmENKYJgttDw-5Q3yaRD7LY_";

const BrandStatement = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("brand_section", defaults);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section className="py-32 px-6 relative overflow-hidden" ref={ref}>
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <iframe
          src={`https://drive.google.com/file/d/${DRIVE_VIDEO_ID}/preview`}
          className="w-full h-full object-cover pointer-events-none"
          style={{ border: "none", position: "absolute", top: "-60px", left: 0, width: "100%", height: "calc(100% + 120px)" }}
          allow="autoplay"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-secondary/80" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ scale }}
        transition={{ duration: 1 }}
        className="container mx-auto max-w-4xl text-center relative z-10"
      >
        <motion.div
          className="w-16 h-px bg-primary mx-auto mb-12"
          initial={{ width: 0 }}
          animate={inView ? { width: 64 } : {}}
          transition={{ duration: 0.8 }}
        />
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {c.line1}
          <br />
          <span className="text-gold-gradient">{c.line2}</span>
        </h2>
        <motion.div
          className="w-16 h-px bg-primary mx-auto mt-12"
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
