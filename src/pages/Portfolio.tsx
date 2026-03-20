import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import flowfestImg from "@/assets/flowfest.jpg";
import leadImg from "@/assets/lead-business.jpg";
import gradImg from "@/assets/graduation.jpg";

const projects = [
  {
    image: flowfestImg,
    title: "Flow Fest",
    category: "Festival",
    description:
      "A groundbreaking music and culture festival that brought together thousands for an unforgettable celebration of sound, art, and community.",
    impact: "5,000+ attendees · 3 stages · 24 artists",
  },
  {
    image: leadImg,
    title: "LEAD Business Event",
    category: "Corporate",
    description:
      "A premium business forum connecting Ethiopia's leading entrepreneurs, investors, and innovators for a day of insight and connection.",
    impact: "500+ executives · 12 speakers · Full-day program",
  },
  {
    image: gradImg,
    title: "Graduation Ceremonies",
    category: "Celebration",
    description:
      "Transforming graduation into a cinematic milestone — from stage design to emotional storytelling that honors achievement.",
    impact: "2,000+ graduates · Premium production · Lasting memories",
  },
];

const Portfolio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 px-6" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
              Portfolio
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Our Work <span className="text-gold-gradient">Speaks</span>
            </h1>
          </motion.div>

          <div className="space-y-24">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: i * 0.2 }}
                className={`grid md:grid-cols-2 gap-12 items-center`}
              >
                <div className={i % 2 === 1 ? "md:order-2" : ""}>
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "md:order-1" : ""}>
                  <span className="text-primary text-xs tracking-[0.3em] uppercase font-body">
                    {project.category}
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">
                    {project.title}
                  </h2>
                  <p className="text-muted-foreground font-body leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <p className="text-primary/80 text-sm font-body tracking-wide">
                    {project.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Portfolio;
