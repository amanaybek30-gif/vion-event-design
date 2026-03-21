import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Users, QrCode, BarChart3, UserCircle, Brain, Settings, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import versHeroBg from "@/assets/vers-hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const capabilities = [
  {
    icon: Users,
    title: "Smart Registration",
    points: ["Custom forms", "Ticket types", "Registration tracking"],
  },
  {
    icon: QrCode,
    title: "Seamless Check-In",
    points: ["QR code scanning", "Self check-in", "Multi-staff support"],
  },
  {
    icon: BarChart3,
    title: "Live Event Intelligence",
    points: ["Real-time tracking", "Attendance analytics", "Performance metrics"],
  },
  {
    icon: UserCircle,
    title: "Attendee CRM",
    points: ["Attendee profiles", "Segmentation", "Engagement tracking"],
  },
  {
    icon: Brain,
    title: "AI Insights",
    points: ["Behavior analysis", "Attendance prediction", "Smart recommendations"],
  },
  {
    icon: Settings,
    title: "Organizer Tools",
    points: ["Dashboards", "Team roles", "Multi-event management"],
  },
];

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

const Vers = () => {
  return (
    <div className="min-h-screen bg-secondary text-secondary-foreground">
      <Navbar />

      {/* Hero */}
      <Section className="relative pt-32 pb-24 px-6">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${versHeroBg})` }}
        />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-6"
          >
            VION Event Registration System
          </motion.p>
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] mb-6"
            style={{ lineHeight: 1.05 }}
          >
            Run Smarter Events{" "}
            <span className="text-gold-gradient">with VERS</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-base md:text-lg max-w-2xl mx-auto mb-10"
            style={{ color: "hsl(0,0%,60%)" }}
          >
            Manage registration, check-in, and event performance — all in one platform.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://vers.vionevents.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-gradient text-primary-foreground px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2"
            >
              Get Started <ArrowRight size={16} />
            </a>
            <a
              href="https://vers.vionevents.com/events"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/40 px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase hover:bg-primary/10 transition-colors inline-flex items-center justify-center"
              style={{ color: "hsl(0,0%,95%)" }}
            >
              Register for an Event
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Capabilities grid */}
      <Section className="py-24 px-6 section-dark">
        <div className="container mx-auto max-w-6xl">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-4"
            style={{ lineHeight: 1.1 }}
          >
            Everything You Need,{" "}
            <span className="text-gold-gradient">Built In</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-body text-sm text-center max-w-xl mx-auto mb-16"
            style={{ color: "hsl(0,0%,55%)" }}
          >
            VERS combines registration, analytics, and attendee management into a single seamless experience.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="border border-border/20 rounded-sm p-8 hover:border-primary/30 transition-colors duration-300 group"
              >
                <cap.icon
                  size={28}
                  className="text-primary mb-4 group-hover:scale-105 transition-transform duration-300"
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-lg font-semibold mb-3">{cap.title}</h3>
                <ul className="space-y-1.5">
                  {cap.points.map((p) => (
                    <li
                      key={p}
                      className="font-body text-xs tracking-wide"
                      style={{ color: "hsl(0,0%,55%)" }}
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section className="py-28 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl font-bold text-center mb-16"
            style={{ lineHeight: 1.1 }}
          >
            How It <span className="text-gold-gradient">Works</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Attendee */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <h3 className="font-display text-xl font-semibold mb-6 text-primary">
                For Attendees
              </h3>
              <ol className="space-y-4">
                {[
                  "Browse events on the VION website",
                  "Click Register — powered by VERS",
                  "Complete registration & receive QR code",
                  "Use QR code for instant check-in",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="font-display text-2xl font-bold text-primary/30 leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-sm" style={{ color: "hsl(0,0%,70%)" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>

            {/* Organizer */}
            <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.08 }}>
              <h3 className="font-display text-xl font-semibold mb-6 text-primary">
                For Organizers
              </h3>
              <ol className="space-y-4">
                {[
                  "Create & configure your event in VERS",
                  "Share or embed on the VION website",
                  "Track registrations in real time",
                  "Analyze attendance & engagement data",
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <span className="font-display text-2xl font-bold text-primary/30 leading-none mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-body text-sm" style={{ color: "hsl(0,0%,70%)" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Platform control strip */}
      <Section className="py-20 px-6 section-dark">
        <div className="container mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8">
          <motion.div variants={fadeUp} transition={{ duration: 0.5 }} className="flex-1">
            <Shield size={32} className="text-primary mb-4" strokeWidth={1.5} />
            <h3 className="font-display text-2xl font-bold mb-2">Platform Control</h3>
            <p className="font-body text-sm" style={{ color: "hsl(0,0%,55%)" }}>
              Role-based access, data privacy per organizer, secure QR validation, and admin-level controls — all built in.
            </p>
          </motion.div>
          <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <a
              href="https://vers.vionevents.com/auth"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-gradient text-primary-foreground px-8 py-3 font-body text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity inline-flex items-center gap-2"
            >
              Organizer Login <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </Section>

      {/* Powered by VERS CTA */}
      <Section className="py-28 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-5xl font-bold mb-6"
            style={{ lineHeight: 1.05 }}
          >
            Ready to Elevate Your{" "}
            <span className="text-gold-gradient">Events?</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-body text-base mb-10"
            style={{ color: "hsl(0,0%,60%)" }}
          >
            Join organizers who trust VERS to power seamless, data-driven event experiences.
          </motion.p>
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://vers.vionevents.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-gradient text-primary-foreground px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
            <a
              href="https://vers.vionevents.com/events"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/40 px-10 py-4 font-body text-sm font-semibold tracking-widest uppercase hover:bg-primary/10 transition-colors"
              style={{ color: "hsl(0,0%,95%)" }}
            >
              Browse Events
            </a>
          </motion.div>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-body text-[10px] tracking-widest uppercase mt-8"
            style={{ color: "hsl(0,0%,40%)" }}
          >
            Powered by VERS
          </motion.p>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Vers;
