import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { number: "01", title: "Concept", desc: "We listen, research, and ideate to shape the vision." },
  { number: "02", title: "Design", desc: "Crafting the visual and experiential blueprint." },
  { number: "03", title: "Planning", desc: "Logistics, timelines, and resource orchestration." },
  { number: "04", title: "Execution", desc: "Flawless delivery with precision and passion." },
  { number: "05", title: "Experience", desc: "The moment everything comes alive." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
            Our Process
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            How We <span className="text-gold-gradient">Work</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
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
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 z-10" />

              {/* Content */}
              <div
                className={`ml-20 md:ml-0 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"
                }`}
              >
                <span className="text-primary/40 font-display text-4xl font-bold">
                  {step.number}
                </span>
                <h3 className="font-display text-2xl font-semibold mt-1 mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
