import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, Sparkles, Eye } from "lucide-react";
import { usePublishedAnnouncements, PublishedAnnouncement } from "@/hooks/usePublishedAnnouncements";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import announcementsBg from "@/assets/announcements-bg.jpg";

const categoryColors: Record<string, string> = {
  announcement: "bg-[hsl(45,80%,55%)]/15 text-[hsl(45,90%,65%)] border border-[hsl(45,80%,55%)]/30",
  news: "bg-white/10 text-white/90 border border-white/20",
  other: "bg-white/5 text-white/60 border border-white/10",
};

const AnnouncementsSection = () => {
  const { announcements, loading } = usePublishedAnnouncements();
  const [selected, setSelected] = useState<PublishedAnnouncement | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (loading || announcements.length === 0) return null;

  const renderActions = (item: PublishedAnnouncement, size: "sm" | "lg" = "sm") => {
    const primaryActionUrl = item.button_url || item.link_url;
    const showSecondaryLink = Boolean(item.link_url && item.link_label && item.link_url !== primaryActionUrl);
    const btnPadding = size === "lg" ? "px-6 py-3 text-sm" : "px-5 py-2.5 text-xs";

    return (
      <div className="flex flex-wrap gap-3">
        {item.button_text && primaryActionUrl && (
          <a
            href={primaryActionUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className={`inline-flex items-center gap-2 bg-gradient-to-r from-[hsl(45,80%,55%)] to-[hsl(35,85%,45%)] text-black ${btnPadding} font-body font-semibold tracking-wider uppercase rounded-lg hover:shadow-lg hover:shadow-[hsl(45,80%,55%)]/30 transition-all duration-300`}
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
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[hsl(45,80%,65%)] text-sm font-body tracking-wider hover:text-[hsl(45,90%,75%)] transition-colors border border-[hsl(45,80%,55%)]/30 px-4 py-2 rounded-lg hover:bg-[hsl(45,80%,55%)]/10"
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
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 text-[hsl(45,80%,65%)] text-sm font-body tracking-wider hover:text-[hsl(45,90%,75%)] transition-colors border border-[hsl(45,80%,55%)]/30 px-4 py-2 rounded-lg hover:bg-[hsl(45,80%,55%)]/10"
          >
            {item.link_label || "Learn More"}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    );
  };

  return (
    <>
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={announcementsBg}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Animated floating gold particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[hsl(45,80%,55%)]"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
          ))}
          {/* Gold glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[hsl(45,80%,55%)]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[hsl(45,80%,55%)]/8 rounded-full blur-[80px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 sm:mb-20"
          >
            <div className="inline-flex items-center gap-2 bg-[hsl(45,80%,55%)]/10 border border-[hsl(45,80%,55%)]/25 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-[hsl(45,80%,65%)]" />
              <span className="text-[hsl(45,80%,65%)] text-xs font-body tracking-[0.2em] uppercase">
                Latest Updates
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              News & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(45,80%,65%)] to-[hsl(35,85%,50%)]">Announcements</span>
            </h2>
            <p className="text-white/60 font-body text-sm sm:text-base mt-4 max-w-xl mx-auto">
              Stay informed with our latest events, updates, and exciting announcements.
            </p>
            {/* Decorative gold line */}
            <div className="mx-auto mt-6 w-24 h-px bg-gradient-to-r from-transparent via-[hsl(45,80%,55%)] to-transparent" />
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
            {announcements.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group cursor-pointer"
                onClick={() => setSelected(item)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Hover glow */}
                <motion.div
                  className="absolute -inset-1 rounded-xl bg-gradient-to-b from-[hsl(45,80%,55%)]/25 via-[hsl(45,80%,55%)]/10 to-transparent blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredId === item.id ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />

                <article className="relative border border-white/10 rounded-xl overflow-hidden bg-black/60 backdrop-blur-md hover:border-[hsl(45,80%,55%)]/40 transition-all duration-500 h-full flex flex-col shadow-2xl shadow-black/30">
                  {item.image_url && !item.video_url && (
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-block text-[10px] sm:text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm ${categoryColors[item.category] || categoryColors.other}`}>
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className={`inline-block text-[10px] sm:text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-sm ${categoryColors[item.category] || categoryColors.other}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col">
                    {!item.image_url && !item.video_url && (
                      <span className={`inline-block text-[10px] sm:text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full w-fit ${categoryColors[item.category] || categoryColors.other}`}>
                        {item.category}
                      </span>
                    )}

                    <h3 className="font-display text-xl sm:text-2xl font-bold leading-tight text-white group-hover:text-[hsl(45,80%,65%)] transition-colors duration-300">
                      {item.title}
                    </h3>

                    {item.header && (
                      <p className="text-white/80 text-sm sm:text-base font-body font-medium">
                        {item.header}
                      </p>
                    )}

                    {item.body && (
                      <p className="text-white/50 text-sm font-body leading-relaxed line-clamp-3 flex-1">
                        {item.body}
                      </p>
                    )}

                    <div className="flex items-center gap-1.5 text-[hsl(45,80%,65%)] text-xs font-body tracking-wider uppercase pt-2 mt-auto group-hover:gap-3 transition-all duration-300">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tap to view</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full article modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[hsl(0,0%,8%)] border-[hsl(45,80%,55%)]/20 backdrop-blur-xl p-0">
          {selected && (
            <>
              {selected.image_url && !selected.video_url && (
                <div className="relative w-full h-64 sm:h-80">
                  <img
                    src={selected.image_url}
                    alt={selected.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,8%)] via-transparent to-transparent" />
                </div>
              )}
              {selected.video_url && (
                <div className="relative w-full h-64 sm:h-80">
                  <video
                    src={selected.video_url}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    playsInline
                  />
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-5">
                <DialogHeader className="space-y-3">
                  <span className={`inline-block text-[10px] sm:text-xs font-body tracking-widest uppercase px-3 py-1 rounded-full w-fit ${categoryColors[selected.category] || categoryColors.other}`}>
                    {selected.category}
                  </span>
                  <DialogTitle className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {selected.title}
                  </DialogTitle>
                  {selected.header && (
                    <DialogDescription className="text-white/70 text-base font-body font-medium !mt-2">
                      {selected.header}
                    </DialogDescription>
                  )}
                </DialogHeader>

                {selected.body && (
                  <p className="text-white/60 text-sm sm:text-base font-body leading-relaxed whitespace-pre-line">
                    {selected.body}
                  </p>
                )}

                <div className="pt-4 border-t border-white/10">
                  {renderActions(selected, "lg")}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnnouncementsSection;
