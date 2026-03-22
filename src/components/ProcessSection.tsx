import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePageContent } from "@/hooks/usePageContent";

const defaults = {
  subtitle: "Our Process",
  title_start: "How We",
  title_highlight: "Work",
  step1_title: "Concept",
  step1_desc: "We listen, research, and ideate to shape the vision.",
  step2_title: "Design",
  step2_desc: "Crafting the visual and experiential blueprint.",
  step3_title: "Planning",
  step3_desc: "Logistics, timelines, and resource orchestration.",
  step4_title: "Execution",
  step4_desc: "Flawless delivery with precision and passion.",
  step5_title: "Experience",
  step5_desc: "The moment everything comes alive.",
};

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("process_section", defaults);

  const steps = [
    { number: "01", title: c.step1_title, desc: c.step1_desc },
    { number: "02", title: c.step2_title, desc: c.step2_desc },
    { number: "03", title: c.step3_title, desc: c.step3_desc },
    { number: "04", title: c.step4_title, desc: c.step4_desc },
    { number: "05", title: c.step5_title, desc: c.step5_desc },
  ];

  return (
    <section id="process" className="py-32 px-6" ref={ref}>
      <div className="container mx-auto max-w-5xl">
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

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative flex items-center mb-12 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              <motion.div
                className="absolute left-8 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 z-10"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
              />
              <motion.div
                className={`ml-20 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-primary/40 font-display text-4xl font-bold">
                  {step.number}
                </span>
                <h3 className="font-display text-2xl font-semibold mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-white/60 font-body text-sm">
                  {step.desc}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;

export { defaults as processDefaults };
