import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  extra: "More content coming soon. Stay tuned to learn more about our story, our team, and what drives us to create moments people remember.",
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("about", defaults);

  const pillars = [
    { label: c.pillar1_title, desc: c.pillar1_desc },
    { label: c.pillar2_title, desc: c.pillar2_desc },
    { label: c.pillar3_title, desc: c.pillar3_desc },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 px-6" ref={ref}>
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
              {c.subtitle}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              {c.title_start}{" "}
              <span className="text-gold-gradient">{c.title_highlight}</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-body font-light max-w-3xl mx-auto">
              {c.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16"
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
                <h3 className="text-primary font-display text-xl font-semibold mb-2">
                  {item.label}
                </h3>
                <p className="text-muted-foreground text-sm font-body">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 text-muted-foreground font-body text-lg leading-relaxed"
          >
            <p>{c.extra}</p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
