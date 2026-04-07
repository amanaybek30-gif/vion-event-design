import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { usePublishedAnnouncements } from "@/hooks/usePublishedAnnouncements";

const categoryColors: Record<string, string> = {
  announcement: "bg-primary/15 text-primary border border-primary/30",
  news: "bg-accent/15 text-accent-foreground border border-accent/30",
  other: "bg-muted/70 text-muted-foreground border border-border",
};

const AnnouncementsSection = () => {
  const { announcements, loading } = usePublishedAnnouncements();

  if (loading || announcements.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 relative">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-primary text-xs font-body tracking-widest uppercase">
              Latest Updates
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-secondary-foreground">
            News & <span className="text-gold-gradient">Announcements</span>
          </h2>
          <p className="text-secondary-foreground/70 font-body text-sm sm:text-base mt-4 max-w-xl mx-auto">
            Stay informed with our latest events, updates, and exciting announcements.
          </p>
        </motion.div>

        <div
          className={`grid gap-8 ${
            announcements.length === 1
              ? "grid-cols-1 max-w-2xl mx-auto"
              : announcements.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {announcements.map((item, i) => {
            const primaryActionUrl = item.button_url || item.link_url;
            const showSecondaryLink = Boolean(item.link_url && item.link_label && item.link_url !== primaryActionUrl);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <article className="relative border border-border/60 rounded-xl overflow-hidden bg-card/80 text-card-foreground backdrop-blur-md hover:border-primary/40 transition-all duration-500 h-full flex flex-col shadow-lg shadow-background/10">
                  {item.image_url && !item.video_url && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-block text-[10px] sm:text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
                            categoryColors[item.category] || categoryColors.other
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>
                  )}

                  {item.video_url && (
                    <div className="relative h-56 overflow-hidden">
                      <video
                        src={item.video_url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        autoPlay
                        loop
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-block text-[10px] sm:text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm ${
                            categoryColors[item.category] || categoryColors.other
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col">
                    {!item.image_url && !item.video_url && (
                      <span
                        className={`inline-block text-[10px] sm:text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full w-fit ${
                          categoryColors[item.category] || categoryColors.other
                        }`}
                      >
                        {item.category}
                      </span>
                    )}

                    <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-card-foreground group-hover:text-primary transition-colors duration-300">
                      {item.title}
                    </h3>

                    {item.header && (
                      <p className="text-card-foreground/80 text-sm sm:text-base font-body font-medium">
                        {item.header}
                      </p>
                    )}

                    {item.body && (
                      <p className="text-card-foreground/70 text-sm font-body leading-relaxed line-clamp-4 flex-1">
                        {item.body}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 pt-3 mt-auto">
                      {item.button_text && primaryActionUrl && (
                        <a
                          href={primaryActionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gold-gradient text-primary-foreground px-5 py-2.5 text-xs font-body font-semibold tracking-wider uppercase rounded-lg hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                        >
                          {item.button_text}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {showSecondaryLink && (
                        <a
                          href={item.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary text-sm font-body tracking-wider hover:text-primary/80 transition-colors border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/5"
                        >
                          {item.link_label}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {!item.button_text && item.link_url && (
                        <a
                          href={item.link_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary text-sm font-body tracking-wider hover:text-primary/80 transition-colors border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/5"
                        >
                          {item.link_label || "Learn More"}
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AnnouncementsSection;

