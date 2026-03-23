import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePageContent } from "@/hooks/usePageContent";

const defaults = {
  subtitle: "Who We Are",
  title_start: "Not Just Events.",
  title_highlight: "Experiences.",
  description: "We are a full-service event company turning ideas into powerful experiences — from corporate forums to cultural activations and premium social events.",
  pillar1_title: "Creativity",
  pillar1_desc: "Bold ideas that push boundaries",
  pillar2_title: "Precision",
  pillar2_desc: "Flawless execution, every detail",
  pillar3_title: "Storytelling",
  pillar3_desc: "Narratives that resonate deeply",
};

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("about_section", defaults);

  const pillars = [
    { label: c.pillar1_title, desc: c.pillar1_desc },
    { label: c.pillar2_title, desc: c.pillar2_desc },
    { label: c.pillar3_title, desc: c.pillar3_desc },
  ];

  return (
    <section id="about" className="py-16 sm:py-32 px-4 sm:px-6 section-dark" ref={ref}>
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">
            {c.subtitle}
          </p>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
            {c.title_start}{" "}
            <span className="text-gold-gradient">{c.title_highlight}</span>
          </h2>
          <p className="text-white/70 text-sm sm:text-lg md:text-xl leading-relaxed font-body font-light max-w-3xl mx-auto">
            {c.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-16"
        >
          {pillars.map((item, i) => (
            <motion.div
              key={item.label}
              className="text-center group"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors"
              >
                <span className="text-primary font-display text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>
              </motion.div>
              <h3 className="text-primary font-display text-lg sm:text-xl font-semibold mb-2">
                {item.label}
              </h3>
              <p className="text-white/60 text-xs sm:text-sm font-body">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

export { defaults as aboutDefaults };
