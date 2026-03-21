import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Lightbulb, Target, Eye } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

const icons = [Lightbulb, Shield, Target, Eye];

const defaults = {
  subtitle: "The VION Difference",
  title_start: "Why Choose",
  title_highlight: "VION",
  reason1_title: "Creative Direction",
  reason1_desc: "Every event starts with a bold idea — we bring the vision others can't.",
  reason2_title: "End-to-End Mastery",
  reason2_desc: "From first concept to final curtain call, we own every detail.",
  reason3_title: "Precision Execution",
  reason3_desc: "Timelines, logistics, and teams — orchestrated with military precision.",
  reason4_title: "Obsessive Detail",
  reason4_desc: "The difference between good and unforgettable lives in the details.",
};

const WhySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("why_section", defaults);

  const reasons = [
    { icon: icons[0], title: c.reason1_title, desc: c.reason1_desc },
    { icon: icons[1], title: c.reason2_title, desc: c.reason2_desc },
    { icon: icons[2], title: c.reason3_title, desc: c.reason3_desc },
    { icon: icons[3], title: c.reason4_title, desc: c.reason4_desc },
  ];

  return (
    <section className="py-32 px-6 section-dark" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            {c.subtitle}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            {c.title_start} <span className="text-gold-gradient">{c.title_highlight}</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center p-6"
            >
              <r.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg font-semibold mb-2">{r.title}</h3>
              <p className="text-white/60 font-body text-sm leading-relaxed">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;

export { defaults as whyDefaults };
