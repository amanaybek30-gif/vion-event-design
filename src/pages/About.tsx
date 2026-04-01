import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import SEOHead from "@/components/SEOHead";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay },
  });

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: inView ? { opacity: 1 } : {},
    transition: { duration: 1, delay },
  });

  const services = [
    "Business and networking events",
    "Social and lifestyle gatherings",
    "Brand-led experiences",
    "Curated concept events",
  ];

  const pillars = [
    { title: "Clarity", desc: "Every event has a clear purpose" },
    { title: "Experience", desc: "Guests are at the center of everything" },
    { title: "Execution", desc: "Every detail is handled with precision" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <SEOHead title="About | VION Events" description="Learn about VION Events — a premium event company focused on delivering well-crafted experiences designed to be remembered." path="/about" />
      <PageBackground />
      <Navbar />

      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 relative" ref={ref}>
        <div className="container mx-auto max-w-4xl">
          {/* Hero */}
          <motion.div {...fadeUp()} className="text-center mb-20 sm:mb-28">
            <motion.p {...fadeIn(0.1)} className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">About</motion.p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">About <span className="text-gold-gradient">VION Events</span></h1>
            <p className="text-muted-foreground text-sm sm:text-lg md:text-xl leading-relaxed font-body font-light max-w-3xl mx-auto">At VION Events, everything we create is designed to be remembered.</p>
            <p className="text-muted-foreground text-sm sm:text-lg md:text-xl leading-relaxed font-body font-light max-w-3xl mx-auto mt-4">We are an event company focused on delivering well-crafted experiences where people connect, engage, and enjoy moments that stay with them long after the event ends.</p>
          </motion.div>

          {/* Who We Are */}
          <motion.div {...fadeUp(0.15)} className="mb-20 sm:mb-28 relative">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">Who We <span className="text-gold-gradient">Are</span></h2>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto">
              VION Events was built with a simple belief:{" "}
              <span className="text-muted-foreground font-light">great events are not accidental, they are designed with purpose.</span>
            </p>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto mt-4">We bring together structure, creativity, and attention to detail to create environments where guests feel comfortable, engaged, and present.</p>
          </motion.div>

          {/* What We Do */}
          <motion.div {...fadeUp(0.3)} className="mb-20 sm:mb-28 relative">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">What We <span className="text-gold-gradient">Do</span></h2>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto mb-8">We create events that balance experience and intention, including:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {services.map((s, i) => (
                <motion.div key={s} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }} whileHover={{ scale: 1.03, y: -2 }} className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/10 backdrop-blur-sm transition-colors hover:bg-primary/10">
                  <span className="text-primary font-display text-sm font-bold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-foreground text-sm sm:text-base font-body">{s}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto mt-8">Every event is thoughtfully planned to ensure a smooth flow and a meaningful guest experience.</p>
          </motion.div>

          {/* Our Approach */}
          <motion.div {...fadeUp(0.45)} className="mb-20 sm:mb-28 relative">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">Our <span className="text-gold-gradient">Approach</span></h2>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto mb-10">We focus on three things:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {pillars.map((item, i) => (
                <motion.div key={item.title} className="text-center group" whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }} className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                    <span className="text-primary font-display text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>
                  </motion.div>
                  <h3 className="text-primary font-display text-lg sm:text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm font-body">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto mt-10">From the first impression to the final moment, we design events that feel natural, organized, and engaging.</p>
          </motion.div>

          {/* Our Vision */}
          <motion.div {...fadeUp(0.6)} className="mb-20 sm:mb-28 relative">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6">Our <span className="text-gold-gradient">Vision</span></h2>
            <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto">To build a brand known for creating experiences that stand out — not because they are loud, but because they are well thought out and unforgettable.</p>
          </motion.div>

          {/* Closing */}
          <motion.div {...fadeUp(0.75)} className="text-center">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4"><span className="text-gold-gradient">VION Events</span></h2>
            <p className="text-muted-foreground text-sm sm:text-lg font-body font-light italic">Designed to be remembered.</p>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
