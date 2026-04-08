import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import SEOHead from "@/components/SEOHead";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Play, MapPin, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import portfolioBg from "@/assets/portfolio-bg.jpg";

interface PortfolioItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
  impact: string;
  service_provided: string;
  event_date: string;
  location: string;
  video_urls: string[];
}

const Portfolio = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.15], [0, -40]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.85]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const { data } = await supabase.from("portfolio_items").select("*").order("created_at");
      if (data) {
        setProjects(data.map((d: any) => ({
          ...d,
          video_urls: Array.isArray(d.video_urls) ? d.video_urls : [],
        })));
      }
    };
    fetchPortfolio();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <SEOHead title="Portfolio | VION Events" description="Explore our portfolio of premium events, corporate forums, and brand experiences." path="/portfolio" />
      
      <div className="fixed inset-0 -z-20">
        <img src={portfolioBg} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-background/85" />
      </div>
      
      <PageBackground />
      <Navbar />
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            ref={heroRef}
            style={{ y: headerY, opacity: headerOpacity }}
            initial={{ opacity: 0, y: 40 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-20"
          >
            <p className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">
              Portfolio
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Our Work <span className="text-gold-gradient">Speaks</span>
            </h1>
          </motion.div>

          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground font-body">
              Portfolio items coming soon.
            </p>
          ) : (
            <div className="space-y-16 sm:space-y-32">
              {projects.map((project, i) => (
                <PortfolioCard key={project.id} project={project} index={i} onWatchVideos={() => navigate(`/portfolio/${project.id}/videos`)} />
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

function PortfolioCard({ project, index, onWatchVideos }: { project: PortfolioItem; index: number; onWatchVideos: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const services = project.service_provided
    ? project.service_provided.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 items-center"
    >
      <div className={isEven ? "" : "md:order-2"}>
        <motion.div
          className="overflow-hidden rounded-sm group cursor-pointer"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[220px] sm:h-[350px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>

      <div className={isEven ? "" : "md:order-1"}>
        <motion.span initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 }} className="text-primary text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase font-body">
          {project.category}
        </motion.span>
        <motion.h2 initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mt-1 sm:mt-2 mb-3 sm:mb-4">
          {project.title}
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }} className="text-muted-foreground font-body text-sm leading-relaxed mb-3 sm:mb-4">
          {project.description}
        </motion.p>

        {project.impact && (
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.45 }} className="text-primary/80 text-xs sm:text-sm font-body tracking-wide mb-4 sm:mb-5 font-medium">
            ✦ {project.impact}
          </motion.p>
        )}

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-5 text-xs sm:text-sm font-body">
          {project.event_date && (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary" />
              {project.event_date}
            </span>
          )}
          {project.location && (
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary" />
              {project.location}
            </span>
          )}
        </motion.div>

        {services.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.55 }} className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
            {services.map((service) => (
              <Badge key={service} variant="outline" className="border-primary/30 text-primary bg-primary/5 cursor-default hover:bg-primary/5 font-body text-[10px] sm:text-xs tracking-wide px-2 sm:px-3 py-0.5 sm:py-1">
                <Briefcase className="w-2.5 sm:w-3 h-2.5 sm:h-3 mr-1" />
                {service}
              </Badge>
            ))}
          </motion.div>
        )}

        {project.video_urls.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }}>
            <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10 hover:scale-[1.02] transition-all duration-300 group text-xs sm:text-sm" onClick={onWatchVideos}>
              <Play className="w-3.5 sm:w-4 h-3.5 sm:h-4 mr-1.5 sm:mr-2 group-hover:scale-110 transition-transform" />
              Watch Event Videos ({project.video_urls.length})
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default Portfolio;
