import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 px-6 section-dark" ref={ref}>
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            Who We Are
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Not Just Events.{" "}
            <span className="text-gold-gradient">Experiences.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-body font-light max-w-3xl mx-auto">
            We are a full-service event company turning ideas into powerful
            experiences — from corporate forums to cultural activations and
            premium social events.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-3 gap-8 mt-16"
        >
          {[
            { label: "Creativity", desc: "Bold ideas that push boundaries" },
            { label: "Precision", desc: "Flawless execution, every detail" },
            { label: "Storytelling", desc: "Narratives that resonate deeply" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <h3 className="text-primary font-display text-xl font-semibold mb-2">
                {item.label}
              </h3>
              <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
