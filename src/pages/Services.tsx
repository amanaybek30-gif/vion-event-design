import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  CalendarCheck,
  Palette,
  Building2,
  PenTool,
  Monitor,
  Music,
  UtensilsCrossed,
  Clapperboard,
  Truck,
  Gift,
} from "lucide-react";

const services = [
  {
    icon: CalendarCheck,
    title: "Event Planning & Execution",
    description:
      "From concept to execution, we plan every detail to ensure your event runs flawlessly and exceeds expectations.",
  },
  {
    icon: Palette,
    title: "Theme & Budget Designing",
    description:
      "Creative theme development and strategic budget planning to maximize impact within your investment. We create cohesive visual concepts that reflect your style and objectives.",
  },
  {
    icon: Building2,
    title: "Venue Selection & Setup",
    description:
      "Expert venue sourcing and professional setup to create the perfect atmosphere for your event. From intimate spaces to grand halls, we find and transform venues to match your vision.",
  },
  {
    icon: PenTool,
    title: "Event Branding & Creative Design",
    description:
      "Professional branding solutions and creative design services to make your event visually stunning and memorable. From invitations to signage, we create cohesive brand experiences.",
  },
  {
    icon: Monitor,
    title: "Digital Experience",
    description:
      "Modern event technology, live streaming, and digital event solutions to maximize the efficiency and reach.",
  },
  {
    icon: Music,
    title: "Entertainment",
    description:
      "Curated entertainment options including live performances, DJs, and interactive experiences.",
  },
  {
    icon: UtensilsCrossed,
    title: "Catering Coordination",
    description:
      "Exceptional food and beverage services that delight guests and complement your event theme.",
  },
  {
    icon: Clapperboard,
    title: "Technical Production",
    description:
      "Sound systems, lighting, AV equipment, and stage setup for impactful presentations.",
  },
  {
    icon: Truck,
    title: "Logistics Management",
    description:
      "Transportation, accommodation, and on-site coordination for seamless event flow.",
  },
  {
    icon: Gift,
    title: "Guest Experience",
    description:
      "Registration management, gift coordination, and personalized guest services for memorable experiences.",
  },
];

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 px-6" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
              What We Do
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Our <span className="text-gold-gradient">Services</span>
            </h1>
            <p className="text-muted-foreground font-body text-lg mt-6 max-w-2xl mx-auto">
              End-to-end event solutions crafted with creativity, precision, and passion.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border border-border rounded-sm p-8 hover:border-primary/40 transition-colors duration-500 group"
              >
                <service.icon className="w-8 h-8 text-primary mb-5 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="font-display text-xl font-semibold mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Services;
