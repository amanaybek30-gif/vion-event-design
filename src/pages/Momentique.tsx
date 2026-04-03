import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  QrCode,
  Upload,
  Camera,
  FolderOpen,
  Zap,
  Clock,
  Video,
  LayoutDashboard,
  Smartphone,
  Palette,
  CheckCircle2,
  GraduationCap,
  Building2,
  Users,
  Heart,
  PartyPopper,
  Mail,
  Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import heroImg from "@/assets/momentique-hero.jpg";
import howImg from "@/assets/momentique-how.jpg";
import whyImg from "@/assets/momentique-why.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.section ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger} className={className}>
      {children}
    </motion.section>
  );
}

const steps = [
  { icon: FolderOpen, title: "Event Setup", desc: "We create your event on Momentique with a custom cover and unique access link." },
  { icon: QrCode, title: "Share QR Code", desc: "A QR code is generated for your event. Display it on screens, print materials, or invitations." },
  { icon: Upload, title: "Guests Capture & Upload", desc: "Attendees scan the QR code, take photos or videos, and upload instantly." },
  { icon: Camera, title: "Access Your Gallery", desc: "All content is collected in one place. Organizers can view, manage, and download everything at any time." },
];

const features = [
  { icon: Zap, title: "Seamless Access", desc: "No apps. No sign-ups. Just scan and upload." },
  { icon: Clock, title: "Real-Time Media Collection", desc: "Capture moments from multiple angles as they happen." },
  { icon: Video, title: "Photo & Video Support", desc: "Collect both images and videos in one centralized gallery." },
  { icon: LayoutDashboard, title: "Organizer Dashboard", desc: "Easily view, manage, and download all event media." },
  { icon: Smartphone, title: "Mobile-First Experience", desc: "Optimized for fast performance, even on slower networks." },
  { icon: Palette, title: "Custom Event Branding", desc: "Each event includes its own identity with cover image and theme." },
];

const whyPoints = [
  "Get hundreds of authentic moments",
  "Capture different perspectives",
  "Reduce reliance on a single photographer",
  "Build a richer, more engaging event archive",
];

const useCases = [
  { icon: GraduationCap, label: "Graduation Ceremonies" },
  { icon: Building2, label: "Corporate Events" },
  { icon: Users, label: "Conferences & Workshops" },
  { icon: Heart, label: "Weddings & Private Celebrations" },
  { icon: PartyPopper, label: "Festivals & Community Events" },
];

const Momentique = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground relative overflow-hidden">
      <SEOHead
        title="Momentique | Smart Event Media Platform"
        description="Capture every angle and relive every moment with Momentique — a QR-powered event media platform by VION Events."
        path="/momentique"
      />
      <Navbar />

      {/* Hero with Background Image */}
      <section ref={heroRef} className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img src={heroImg} alt="Event crowd capturing moments" className="w-full h-[120%] object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </motion.div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/40"
              style={{ left: `${8 + i * 9}%`, top: `${12 + (i % 5) * 18}%` }}
              animate={{ y: [0, -40, 0], opacity: [0.1, 0.7, 0.1], scale: [1, 1.8, 1] }}
              transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </div>

        <motion.div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto" style={{ opacity: heroOpacity }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-body text-xs tracking-[0.25em] sm:tracking-[0.3em] uppercase text-primary mb-4 sm:mb-6"
          >
            Smart Event Media Platform
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-secondary-foreground"
            style={{ lineHeight: 1.05 }}
          >
            Capture Every Angle.{" "}
            <span className="text-gold-gradient">Relive Every Moment.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 sm:mb-10"
            style={{ color: "hsl(0, 0%, 78%)" }}
          >
            From private events to conferences, Momentique transforms every attendee into a content creator, ensuring no moment is missed.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 sm:h-16 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* What is Momentique */}
      <Section className="py-20 sm:py-32 px-4 sm:px-6 section-dark">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-5 sm:mb-8" style={{ lineHeight: 1.1 }}>
            What is <span className="text-gold-gradient">Momentique?</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-sm sm:text-base md:text-lg text-secondary-foreground/80 mb-4 leading-relaxed">
            Momentique is a QR-powered platform that allows event guests to instantly upload photos and videos to a shared event gallery—without downloading any app or creating an account.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="font-body text-xs sm:text-sm text-secondary-foreground/50">
            Organizers get full access to all content, beautifully organized and ready to download anytime.
          </motion.p>
        </div>
      </Section>

      {/* How It Works - with blurred background image */}
      <Section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={howImg} alt="" className="w-full h-full object-cover blur-sm scale-105" loading="lazy" width={1920} height={1080} />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-12 sm:mb-20 text-secondary-foreground" style={{ lineHeight: 1.1 }}>
            How It <span className="text-gold-gradient">Works</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
            {steps.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full border border-primary/30 bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-300">
                  <step.icon size={24} className="text-primary" strokeWidth={1.5} />
                </div>
                <span className="font-display text-xs text-primary/50 tracking-widest uppercase">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-base sm:text-lg font-semibold mt-2 mb-3 text-secondary-foreground">{step.title}</h3>
                <p className="font-body text-xs sm:text-sm text-secondary-foreground/70 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Key Features */}
      <Section className="py-20 sm:py-32 px-4 sm:px-6 section-dark">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-4 sm:mb-5" style={{ lineHeight: 1.1 }}>
            Key <span className="text-gold-gradient">Features</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-xs sm:text-sm text-center max-w-xl mx-auto mb-12 sm:mb-20 text-secondary-foreground/50">
            Everything you need to capture and manage event media effortlessly.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {features.map((feat, i) => (
              <motion.div key={feat.title} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="border border-border/10 rounded-sm p-7 sm:p-9 hover:border-primary/30 bg-secondary-foreground/[0.02] backdrop-blur-sm transition-all duration-300 group hover:bg-secondary-foreground/[0.05]">
                <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center mb-4 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all duration-300">
                  <feat.icon size={20} className="text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-base sm:text-lg font-semibold mb-2 text-secondary-foreground">{feat.title}</h3>
                <p className="font-body text-xs sm:text-sm text-secondary-foreground/60 leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Momentique - with blurred background image */}
      <Section className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={whyImg} alt="" className="w-full h-full object-cover blur-sm scale-105" loading="lazy" width={1920} height={1080} />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-5 sm:mb-8 text-secondary-foreground" style={{ lineHeight: 1.1 }}>
            Why <span className="text-gold-gradient">Momentique?</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-sm sm:text-base md:text-lg text-secondary-foreground/80 mb-10 sm:mb-12 leading-relaxed">
            Traditional event coverage is limited. Momentique unlocks the full potential of your audience by turning every guest into a contributor.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg mx-auto">
            {whyPoints.map((point, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-center gap-3 bg-black/30 backdrop-blur-sm rounded-sm px-4 py-3 border border-primary/10">
                <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                <span className="font-body text-xs sm:text-sm text-secondary-foreground/90 text-left">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Use Cases */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6 section-dark">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-center mb-12 sm:mb-16" style={{ lineHeight: 1.1 }}>
            Use <span className="text-gold-gradient">Cases</span>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
            {useCases.map((uc, i) => (
              <motion.div key={uc.label} variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center gap-3 border border-border/15 rounded-sm px-6 py-4 hover:border-primary/30 hover:bg-secondary-foreground/[0.03] transition-all duration-300 group">
                <uc.icon size={18} className="text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <span className="font-body text-xs tracking-wide uppercase text-secondary-foreground/80">{uc.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Designed for Modern Events */}
      <Section className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-5 sm:mb-8" style={{ lineHeight: 1.1 }}>
            Designed for <span className="text-gold-gradient">Modern Events</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-sm sm:text-base text-secondary-foreground/70 mb-3 leading-relaxed">
            Momentique is built for speed, simplicity, and scale—making it the perfect addition to any event experience.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="font-body text-xs sm:text-sm text-secondary-foreground/50 leading-relaxed">
            Whether you're organizing a small gathering or a large-scale event, Momentique ensures every moment is captured, shared, and remembered.
          </motion.p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-20 sm:py-32 px-4 sm:px-6 section-dark">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-5 sm:mb-8" style={{ lineHeight: 1.05 }}>
            Get <span className="text-gold-gradient">Started</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-sm sm:text-base mb-3 text-secondary-foreground/70">
            Bring your event to life with Momentique.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="font-body text-xs sm:text-sm mb-10 sm:mb-12 text-secondary-foreground/50">
            Contact us today to activate Momentique for your next event.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="mailto:eventcoordinator@vionevents.com"
              className="bg-gold-gradient text-primary-foreground px-8 sm:px-10 py-3.5 sm:py-4 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-all hover:scale-[1.03] duration-300 inline-flex items-center justify-center gap-2">
              <Mail size={14} /> Send Email
            </a>
            <a href="tel:+251944010908"
              className="border border-primary/40 px-8 sm:px-10 py-3.5 sm:py-4 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-primary/10 transition-all hover:scale-[1.03] duration-300 inline-flex items-center justify-center gap-2 text-secondary-foreground">
              <Phone size={14} /> 0944 010 908
            </a>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Momentique;
