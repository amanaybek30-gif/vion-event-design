import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Play, X, MapPin, Calendar, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [videoProject, setVideoProject] = useState<PortfolioItem | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

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

  const getEmbedUrl = (url: string) => {
    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
    // Google Drive
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    return url;
  };

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

                    {/* Meta details */}
                    <div className="flex flex-wrap gap-4 mb-4 text-sm font-body">
                      {project.service_provided && (
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Briefcase className="w-3.5 h-3.5 text-primary" />
                          {project.service_provided}
                        </span>
                      )}
                      {project.event_date && (
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <Calendar className="w-3.5 h-3.5 text-primary" />
                          {project.event_date}
                        </span>
                      )}
                      {project.location && (
                        <span className="flex items-center gap-1.5 text-muted-foreground">
                          <MapPin className="w-3.5 h-3.5 text-primary" />
                          {project.location}
                        </span>
                      )}
                    </div>

                    <p className="text-primary/80 text-sm font-body tracking-wide mb-4">
                      {project.impact}
                    </p>

                    {project.video_urls.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-primary/30 text-primary hover:bg-primary/10"
                        onClick={() => setVideoProject(project)}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Event Videos ({project.video_urls.length})
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Gallery Dialog */}
      <Dialog open={!!videoProject} onOpenChange={() => { setVideoProject(null); setActiveVideo(null); }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              {videoProject?.title} — Event Videos
            </DialogTitle>
          </DialogHeader>

          {activeVideo ? (
            <div className="space-y-4">
              <Button variant="ghost" size="sm" onClick={() => setActiveVideo(null)}>
                ← Back to videos
              </Button>
              <div className="aspect-video w-full rounded-sm overflow-hidden bg-black">
                <iframe
                  src={getEmbedUrl(activeVideo)}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {videoProject?.video_urls.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveVideo(url)}
                  className="group relative aspect-video bg-muted rounded-sm overflow-hidden border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                    </div>
                  </div>
                  <p className="absolute bottom-3 left-3 text-sm font-body text-foreground/80">
                    Video {idx + 1}
                  </p>
                </button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Portfolio;
