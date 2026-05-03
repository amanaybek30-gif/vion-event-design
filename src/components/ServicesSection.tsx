import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Palette, Music, Sparkles } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";
import servicesBg from "@/assets/services-bg.jpg";

const icons = [Briefcase, Palette, Music];

const defaults = {
  subtitle: "What We Do",
  title_start: "Crafting Every",
  title_highlight: "Dimension",
  cat1_title: "Corporate & Professional",
  cat1_items: "Conferences, Forums, Business Events",
  cat2_title: "Brand & Creative",
  cat2_items: "Brand Activations, Product Launches, Experience Design",
  cat3_title: "Social & Cultural",
  cat3_items: "Festivals, Youth Events, Private Gatherings",
};

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("services_section", defaults);

  const categories = [
    {
      icon: icons[0],
      title: c.cat1_title,
      items: c.cat1_items.split(",").map((s) => s.trim()),
      number: "01",
    },
    {
      icon: icons[1],
      title: c.cat2_title,
      items: c.cat2_items.split(",").map((s) => s.trim()),
      number: "02",
    },
    {
      icon: icons[2],
      title: c.cat3_title,
      items: c.cat3_items.split(",").map((s) => s.trim()),
      number: "03",
    },
  ];

  return (
    <section
      id="services"
      className="relative py-20 sm:py-32 px-4 sm:px-6 overflow-hidden"
      ref={ref}
    >
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={servicesBg}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="w-full h-full object-cover scale-105 opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/70 to-background/90" />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <div className="absolute top-1/4 -left-32 w-[28rem] h-[28rem] rounded-full bg-primary/[0.10] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-primary/[0.08] blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-6">
            <Sparkles className="w-3 h-3 text-primary" />
            <p className="text-primary tracking-[0.25em] uppercase text-[10px] sm:text-xs font-body">
              {c.subtitle}
            </p>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1]">
            {c.title_start}{" "}
            <span className="text-gold-gradient italic">{c.title_highlight}</span>
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8" />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glow on hover */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-primary/0 to-primary/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 -z-10" />

              <div className="relative h-full rounded-2xl border border-border/60 bg-secondary/40 backdrop-blur-md p-7 sm:p-8 overflow-hidden transition-all duration-500 group-hover:border-primary/40 group-hover:bg-secondary/60">
                {/* Animated gradient sheen */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Big faint number */}
                <span className="absolute top-4 right-5 font-display text-5xl sm:text-6xl font-bold text-primary/[0.08] group-hover:text-primary/20 transition-colors duration-500 select-none">
                  {cat.number}
                </span>

                <div className="relative">
                  {/* Icon */}
                  <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-6 group-hover:bg-primary/15 group-hover:border-primary/40 transition-all duration-500">
                    <cat.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 rounded-xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-semibold mb-5 leading-tight">
                    {cat.title}
                  </h3>

                  {/* Divider */}
                  <div className="w-10 h-px bg-primary/40 mb-5 group-hover:w-20 transition-all duration-500" />

                  {/* Items */}
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-white/70 font-body text-sm"
                      >
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
                        <span className="group-hover:text-white/90 transition-colors duration-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Bottom accent line */}
                  <div className="mt-7 pt-5 border-t border-border/40">
                    <div className="h-px w-0 bg-gradient-to-r from-primary via-primary/60 to-transparent group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

export { defaults as servicesDefaults };
