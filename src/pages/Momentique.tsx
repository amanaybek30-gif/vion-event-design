import { motion, useInView } from "framer-motion";
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
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
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
  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground relative overflow-hidden">
      <SEOHead
        title="Momentique | Smart Event Media Platform"
        description="Capture every angle and relive every moment with Momentique — a QR-powered event media platform by VION Events."
        path="/momentique"
      />
      <Navbar />

      {/* Hero */}
      <Section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-xs tracking-[0.2em] sm:tracking-[0.3em] uppercase text-primary mb-4 sm:mb-6">
            Smart Event Media Platform
          </motion.p>
          <motion.h1 variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6" style={{ lineHeight: 1.05 }}>
            Capture Every Angle.{" "}<span className="text-gold-gradient">Relive Every Moment.</span>
          </motion.h1>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="font-body text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-6 sm:mb-10 text-secondary-foreground/70">
            Momentique is a smart event media platform designed to collect, organize, and deliver photos and videos from your event—captured by your audience, in real time.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="font-body text-xs sm:text-sm max-w-xl mx-auto text-secondary-foreground/50">
            From graduations to conferences, Momentique transforms every attendee into a content creator, ensuring no moment is missed.
          </motion.p>
        </div>
      </Section>

      {/* What is Momentique */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6 section-dark">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ lineHeight: 1.1 }}>
            What is <span className="text-gold-gradient">Momentique?</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-sm sm:text-base text-secondary-foreground/70 mb-4">
            Momentique is a QR-powered platform that allows event guests to instantly upload photos and videos to a shared event gallery—without downloading any app or creating an account.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="font-body text-xs sm:text-sm text-secondary-foreground/50">
            Organizers get full access to all content, beautifully organized and ready to download anytime.
          </motion.p>
        </div>
      </Section>

      {/* How It Works */}
      <Section className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16" style={{ lineHeight: 1.1 }}>
            How It <span className="text-gold-gradient">Works</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, i) => (
              <motion.div key={step.title} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.07 }} className="text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full border border-primary/20 flex items-center justify-center group-hover:border-primary/50 transition-colors duration-300">
                  <step.icon size={22} className="text-primary" strokeWidth={1.5} />
                </div>
                <span className="font-display text-xs text-primary/40 tracking-widest uppercase">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-base sm:text-lg font-semibold mt-1 mb-2">{step.title}</h3>
                <p className="font-body text-xs text-secondary-foreground/60">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Key Features */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6 section-dark">
        <div className="container mx-auto max-w-6xl">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 sm:mb-4" style={{ lineHeight: 1.1 }}>
            Key <span className="text-gold-gradient">Features</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-xs sm:text-sm text-center max-w-xl mx-auto mb-10 sm:mb-16 text-secondary-foreground/50">
            Everything you need to capture and manage event media effortlessly.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feat, i) => (
              <motion.div key={feat.title} variants={fadeUp} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="border border-border/20 rounded-sm p-6 sm:p-8 hover:border-primary/30 transition-colors duration-300 group">
                <feat.icon size={24} className="text-primary mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300" strokeWidth={1.5} />
                <h3 className="font-display text-base sm:text-lg font-semibold mb-2">{feat.title}</h3>
                <p className="font-body text-xs text-secondary-foreground/60">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Momentique */}
      <Section className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ lineHeight: 1.1 }}>
            Why <span className="text-gold-gradient">Momentique?</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-sm sm:text-base text-secondary-foreground/70 mb-8 sm:mb-10">
            Traditional event coverage is limited. Momentique unlocks the full potential of your audience by turning every guest into a contributor.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {whyPoints.map((point, i) => (
              <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-primary flex-shrink-0" />
                <span className="font-body text-xs sm:text-sm text-secondary-foreground/70 text-left">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Use Cases */}
      <Section className="py-12 sm:py-20 px-4 sm:px-6 section-dark">
        <div className="container mx-auto max-w-4xl">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-14" style={{ lineHeight: 1.1 }}>
            Use <span className="text-gold-gradient">Cases</span>
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {useCases.map((uc, i) => (
              <motion.div key={uc.label} variants={fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-center gap-3 border border-border/20 rounded-sm px-5 py-3 hover:border-primary/30 transition-colors duration-300">
                <uc.icon size={18} className="text-primary" strokeWidth={1.5} />
                <span className="font-body text-xs tracking-wide uppercase">{uc.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Designed for Modern Events */}
      <Section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ lineHeight: 1.1 }}>
            Designed for <span className="text-gold-gradient">Modern Events</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-sm sm:text-base text-secondary-foreground/70 mb-3">
            Momentique is built for speed, simplicity, and scale—making it the perfect addition to any event experience.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="font-body text-xs sm:text-sm text-secondary-foreground/50">
            Whether you're organizing a small gathering or a large-scale event, Momentique ensures every moment is captured, shared, and remembered.
          </motion.p>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16 sm:py-28 px-4 sm:px-6 section-dark">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6" style={{ lineHeight: 1.05 }}>
            Get <span className="text-gold-gradient">Started</span>
          </motion.h2>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="font-body text-sm sm:text-base mb-3 text-secondary-foreground/70">
            Bring your event to life with Momentique.
          </motion.p>
          <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="font-body text-xs sm:text-sm mb-8 sm:mb-10 text-secondary-foreground/50">
            Contact us today to activate Momentique for your next event.
          </motion.p>
          <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.15 }} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <a href="mailto:eventcoordinator@vionevents.com"
              className="bg-gold-gradient text-primary-foreground px-6 sm:px-10 py-3 sm:py-4 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
              <Mail size={14} /> Send Email
            </a>
            <a href="tel:+251944010908"
              className="border border-primary/40 px-6 sm:px-10 py-3 sm:py-4 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase hover:bg-primary/10 transition-colors inline-flex items-center justify-center gap-2 text-secondary-foreground">
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
