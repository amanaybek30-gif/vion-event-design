import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import heroImg from "@/assets/hero-event.jpg";

const HeroSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={heroImg}
          alt="Premium event with dramatic gold lighting"
          className="w-full h-[120%] object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </motion.div>

      {/* Particles - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary/40"
            style={{ left: `${10 + i * 10}%`, top: `${15 + (i % 4) * 20}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto" style={{ y: textY, opacity }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-4 sm:mb-6"
        >
          VION Events
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6 text-white"
        >
          Designed to Be{" "}
          <span className="text-gold-gradient">Remembered</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-base sm:text-lg md:text-xl font-body font-light max-w-2xl mx-auto mb-6 sm:mb-10"
          style={{ color: "hsl(0, 0%, 80%)" }}
        >
          We create experiences, not just events.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link
            to="/portfolio"
            className="bg-gold-gradient text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-all hover:scale-[1.03] duration-300 text-center"
          >
            View Our Work
          </Link>
          <Link
            to="/contact"
            className="border border-primary/40 text-white px-6 sm:px-8 py-3 sm:py-4 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-primary/10 transition-all hover:scale-[1.03] duration-300 text-center"
          >
            Plan Your Event
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
