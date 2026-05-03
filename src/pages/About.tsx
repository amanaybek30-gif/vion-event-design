import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef } from "react";
import aboutBg from "@/assets/about-bg.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

const SectionCard = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, delay: index * 0.05, ease: EASE }}
    className="relative mb-20 sm:mb-28 group"
  >
    {/* Outer glow ring */}
    <div className="pointer-events-none absolute -inset-px rounded-[1.25rem] bg-gradient-to-br from-primary/30 via-transparent to-primary/20 opacity-40 blur-[2px] group-hover:opacity-70 transition-opacity duration-700" />

    <div className="relative rounded-[1.25rem] overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-2xl p-7 sm:p-12 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      {/* gradient sheen */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-primary/[0.05]" />
      {/* top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      {/* bottom hairline */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* corner glow */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/[0.10] blur-3xl" />

      <div className="relative">{children}</div>
    </div>
  </motion.div>
);

const Stagger = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const Item = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 0.4 });
  const bgY = useTransform(smooth, [0, 1], ["-8%", "18%"]);
  const bgScale = useTransform(smooth, [0, 1], [1.1, 1.25]);
  const overlayOpacity = useTransform(smooth, [0, 0.5, 1], [0.55, 0.7, 0.85]);

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
    <div className="min-h-screen relative bg-[#08080a] text-white" ref={scrollRef}>
      <SEOHead
        title="About | VION Events"
        description="Learn about VION Events — a premium event company focused on delivering well-crafted experiences designed to be remembered."
        path="/about"
      />

      {/* Parallax background image with cinematic overlays */}
      <motion.div
        aria-hidden
        style={{ y: bgY, scale: bgScale }}
        className="fixed inset-0 z-0 will-change-transform pointer-events-none"
      >
        <img
          src={aboutBg}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Cinematic dark gradient (scroll-reactive) */}
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity }}
        className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-black/85 via-black/70 to-black/95"
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Floating gold orbs */}
      <div aria-hidden className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 40, -10, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-32 w-[32rem] h-[32rem] rounded-full bg-primary/[0.10] blur-[140px]"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-32 w-[32rem] h-[32rem] rounded-full bg-primary/[0.08] blur-[140px]"
        />
      </div>
      {/* Grain */}
      <div
        aria-hidden
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <Navbar />

      <section className="relative z-10 pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: EASE }}
            className="text-center mb-20 sm:mb-28"
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1.2, ease: EASE }}
              className="text-primary uppercase text-xs sm:text-sm font-body mb-4"
            >
              About
            </motion.p>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-[1.05] text-white">
              About <span className="text-gold-gradient italic">VION Events</span>
            </h1>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8" />
            <p className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed font-body font-light max-w-3xl mx-auto">
              At VION Events, everything we create is designed to be remembered.
            </p>
            <p className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed font-body font-light max-w-3xl mx-auto mt-5">
              We are an event company focused on delivering well-crafted experiences where people connect, engage, and enjoy moments that stay with them long after the event ends.
            </p>
          </motion.div>

          {/* Who We Are */}
          <SectionCard index={0}>
            <Stagger>
              <Item>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 text-white">
                  Who We <span className="text-gold-gradient italic">Are</span>
                </h2>
              </Item>
              <Item>
                <div className="w-12 h-px bg-primary/60 mx-auto mb-8" />
              </Item>
              <Item>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto">
                  VION Events was built with a simple belief —{" "}
                  <span className="text-primary/90 italic">
                    great events are not accidental, they are designed with purpose.
                  </span>
                </p>
              </Item>
              <Item>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed font-body font-light text-center max-w-3xl mx-auto mt-5">
                  We bring together structure, creativity, and attention to detail to create environments where guests feel comfortable, engaged, and present.
                </p>
              </Item>
            </Stagger>
          </SectionCard>

          {/* What We Do */}
          <SectionCard index={1}>
            <Stagger>
              <Item>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 text-white">
                  What We <span className="text-gold-gradient italic">Do</span>
                </h2>
              </Item>
              <Item>
                <div className="w-12 h-px bg-primary/60 mx-auto mb-8" />
              </Item>
              <Item>
                <p className="text-white/75 text-base sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto mb-10">
                  We create events that balance experience and intention, including:
                </p>
              </Item>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {services.map((s, i) => (
                  <motion.div
                    key={s}
                    variants={{
                      hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.6, delay: i * 0.07, ease: EASE },
                      },
                    }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="relative flex items-center gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md overflow-hidden group/item transition-colors hover:bg-primary/[0.08] hover:border-primary/30"
                  >
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-primary/60 to-transparent" />
                    <span className="text-primary font-display text-lg font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-white/90 text-sm sm:text-base font-body">{s}</span>
                  </motion.div>
                ))}
              </div>

              <Item>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed font-body font-light text-center max-w-3xl mx-auto mt-10">
                  Every event is thoughtfully planned to ensure a smooth flow and a meaningful guest experience.
                </p>
              </Item>
            </Stagger>
          </SectionCard>

          {/* Our Approach */}
          <SectionCard index={2}>
            <Stagger>
              <Item>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 text-white">
                  Our <span className="text-gold-gradient italic">Approach</span>
                </h2>
              </Item>
              <Item>
                <div className="w-12 h-px bg-primary/60 mx-auto mb-8" />
              </Item>
              <Item>
                <p className="text-white/75 text-base sm:text-lg leading-relaxed font-body font-light text-center max-w-3xl mx-auto mb-12">
                  We focus on three things:
                </p>
              </Item>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {pillars.map((item, i) => (
                  <motion.div
                    key={item.title}
                    variants={{
                      hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
                      show: {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        transition: { duration: 0.7, delay: i * 0.12, ease: EASE },
                      },
                    }}
                    whileHover={{ y: -10, scale: 1.03 }}
                    className="text-center group/p"
                  >
                    <div className="relative w-16 h-16 mx-auto mb-5">
                      <div className="absolute inset-0 rounded-full bg-primary/15 blur-xl opacity-0 group-hover/p:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center group-hover/p:border-primary/60 transition-all duration-500">
                        <span className="text-primary font-display text-lg font-bold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-primary font-display text-xl sm:text-2xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/65 text-sm font-body">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <Item>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed font-body font-light text-center max-w-3xl mx-auto mt-12">
                  From the first impression to the final moment, we design events that feel natural, organized, and engaging.
                </p>
              </Item>
            </Stagger>
          </SectionCard>

          {/* Our Vision */}
          <SectionCard index={3}>
            <Stagger>
              <Item>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 text-white">
                  Our <span className="text-gold-gradient italic">Vision</span>
                </h2>
              </Item>
              <Item>
                <div className="w-12 h-px bg-primary/60 mx-auto mb-8" />
              </Item>
              <Item>
                <p className="text-white/85 text-base sm:text-lg md:text-xl leading-relaxed font-body font-light text-center max-w-3xl mx-auto italic">
                  To build a brand known for creating experiences that stand out — not because they are loud, but because they are well thought out and unforgettable.
                </p>
              </Item>
            </Stagger>
          </SectionCard>

          {/* Closing */}
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="text-center pt-4"
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gold-gradient italic">VION Events</span>
            </h2>
            <p className="text-white/70 text-base sm:text-lg font-body font-light italic tracking-wide">
              Designed to be remembered.
            </p>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default About;
