import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Lightbulb, Target, Eye } from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    title: "Creative Direction",
    desc: "Every event starts with a bold idea — we bring the vision others can't.",
  },
  {
    icon: Shield,
    title: "End-to-End Mastery",
    desc: "From first concept to final curtain call, we own every detail.",
  },
  {
    icon: Target,
    title: "Precision Execution",
    desc: "Timelines, logistics, and teams — orchestrated with military precision.",
  },
  {
    icon: Eye,
    title: "Obsessive Detail",
    desc: "The difference between good and unforgettable lives in the details.",
  },
];

const WhySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
            The VION Difference
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Why Choose <span className="text-gold-gradient">VION</span>
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
              <p className="text-muted-foreground font-body text-sm leading-relaxed">
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
