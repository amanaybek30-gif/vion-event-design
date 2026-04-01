import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, ExternalLink } from "lucide-react";

interface Announcement {
  id: string;
  title: string;
  header: string;
  body: string;
  image_url: string;
  video_url: string;
  link_url: string;
  link_label: string;
  button_text: string;
  button_url: string;
  category: string;
}

const categoryColors: Record<string, string> = {
  announcement: "bg-primary/20 text-primary",
  news: "bg-blue-500/20 text-blue-400",
  other: "bg-accent/20 text-accent-foreground",
};

const AnnouncementsSection = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("announcements")
        .select("*")
        .eq("is_published", true)
        .order("sort_order");
      if (data) setAnnouncements(data);
    };
    fetch();
  }, []);

  if (announcements.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">
            Latest Updates
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            News & <span className="text-gold-gradient">Announcements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {announcements.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="border border-border rounded-lg overflow-hidden bg-card/50 backdrop-blur-sm group hover:border-primary/30 transition-all duration-500"
            >
              {/* Media */}
              {item.image_url && !item.video_url && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              )}
              {item.video_url && (
                <div className="relative h-48 overflow-hidden">
                  <video
                    src={item.video_url}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    autoPlay
                    loop
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                </div>
              )}

              <div className="p-5 sm:p-6 space-y-3">
                {/* Category badge */}
                <span
                  className={`inline-block text-[10px] sm:text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full ${
                    categoryColors[item.category] || categoryColors.other
                  }`}
                >
                  {item.category}
                </span>

                <h3 className="font-display text-lg sm:text-xl font-semibold leading-tight">
                  {item.title}
                </h3>

                {item.header && (
                  <p className="text-muted-foreground text-sm font-body font-medium">
                    {item.header}
                  </p>
                )}

                {item.body && (
                  <p className="text-muted-foreground text-xs sm:text-sm font-body leading-relaxed line-clamp-3">
                    {item.body}
                  </p>
                )}

                {/* Links and buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {item.button_text && item.button_url && (
                    <a
                      href={item.button_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground px-4 py-2 text-xs font-body font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity"
                    >
                      {item.button_text}
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  )}
                  {item.link_url && item.link_label && (
                    <a
                      href={item.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary text-xs font-body tracking-wider hover:text-primary/80 transition-colors"
                    >
                      {item.link_label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;
