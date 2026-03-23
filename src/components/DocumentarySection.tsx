import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Film, Droplets, Users, Play } from "lucide-react";

const DocumentarySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 section-dark" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">
            🎥 Flow Fest 2025 Documentary Trailer
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            📍 Sidama Cultural Hall, <span className="text-gold-gradient">Hawassa</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-video rounded-sm overflow-hidden border border-border/30 mb-6 sm:mb-8 relative group"
        >
          {!isPlaying ? (
            <div
              className="w-full h-full bg-secondary flex items-center justify-center cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <motion.div
                className="w-14 sm:w-20 h-14 sm:h-20 rounded-full bg-primary/90 flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="w-6 sm:w-8 h-6 sm:h-8 text-primary-foreground ml-0.5" />
              </motion.div>
              <p className="absolute bottom-4 sm:bottom-6 font-body text-xs sm:text-sm text-white/60">Click to play trailer</p>
            </div>
          ) : (
            <iframe
              src="https://drive.google.com/file/d/1DdOKF7NZrYu6IRP79TsmOIHc40xia-B1/preview"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
              title="Flow Fest 2025 Documentary Trailer"
            />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-white/80 font-body text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
            Official trailer revealing the struggle, the unheard stories, and dedication 
            of those working at Hawassa Regional Blood Bank.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {[
              { icon: Film, label: "Trailer" },
              { icon: Droplets, label: "Blood Donation" },
              { icon: Users, label: "Community" },
            ].map(({ icon: Icon, label }) => (
              <motion.span
                key={label}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
                className="inline-flex items-center gap-1.5 sm:gap-2 border border-border/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm font-body text-xs sm:text-sm text-white/80 cursor-default"
              >
                <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" /> {label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentarySection;
