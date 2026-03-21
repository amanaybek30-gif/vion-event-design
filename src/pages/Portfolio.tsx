import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  impact: string;
}

const Portfolio = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<PortfolioItem[]>([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase.from("portfolio_items").select("*").order("created_at");
      if (data) setProjects(data);
    };
    fetchPortfolio();
  }, []);

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

          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground font-body">
              Portfolio items coming soon.
            </p>
          ) : (
            <div className="space-y-24">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="grid md:grid-cols-2 gap-12 items-center"
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
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Portfolio;
