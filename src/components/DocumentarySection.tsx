import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Film, Droplets, Users } from "lucide-react";

const DocumentarySection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
          className="aspect-video rounded-sm overflow-hidden border border-border/30 mb-8"
        >
          <iframe
            src="https://drive.google.com/file/d/1DdOKF7NZrYu6IRP79TsmOIHc40xia-B1/preview"
            className="w-full h-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
            title="Flow Fest 2025 Documentary Trailer"
          />
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
            <span className="inline-flex items-center gap-2 border border-border/30 px-4 py-2 rounded-sm font-body text-sm text-white/80">
              <Film className="w-4 h-4 text-primary" /> Trailer
            </span>
            <span className="inline-flex items-center gap-2 border border-border/30 px-4 py-2 rounded-sm font-body text-sm" style={{ color: "hsl(0, 0%, 70%)" }}>
              <Droplets className="w-4 h-4 text-primary" /> Blood Donation
            </span>
            <span className="inline-flex items-center gap-2 border border-border/30 px-4 py-2 rounded-sm font-body text-sm" style={{ color: "hsl(0, 0%, 70%)" }}>
              <Users className="w-4 h-4 text-primary" /> Community
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentarySection;
