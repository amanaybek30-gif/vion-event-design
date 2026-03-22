import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Film, Droplets, Users, Play } from "lucide-react";

const DocumentarySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-32 px-6 section-dark" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
            🎥 Flow Fest 2025 Documentary Trailer
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            📍 Sidama Cultural Hall, <span className="text-gold-gradient">Hawassa</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-video rounded-sm overflow-hidden border border-border/30 mb-8 relative group"
        >
          {!isPlaying ? (
            <div
              className="w-full h-full bg-secondary flex items-center justify-center cursor-pointer"
              onClick={() => setIsPlaying(true)}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center"
                whileHover={{ scale: 1.15 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="w-8 h-8 text-primary-foreground ml-1" />
              </motion.div>
              <p className="absolute bottom-6 font-body text-sm text-white/60">Click to play trailer</p>
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
          <p className="text-white/80 font-body leading-relaxed max-w-2xl mx-auto mb-8">
            Official trailer revealing the struggle, the unheard stories, and dedication 
            of those working at Hawassa Regional Blood Bank.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { icon: Film, label: "Trailer" },
              { icon: Droplets, label: "Blood Donation" },
              { icon: Users, label: "Community" },
            ].map(({ icon: Icon, label }) => (
              <motion.span
                key={label}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
                className="inline-flex items-center gap-2 border border-border/30 px-4 py-2 rounded-sm font-body text-sm text-white/80 cursor-default"
              >
                <Icon className="w-4 h-4 text-primary" /> {label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentarySection;
