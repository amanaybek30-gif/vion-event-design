import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Palette, Music } from "lucide-react";
import { usePageContent } from "@/hooks/usePageContent";

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
    { icon: icons[0], title: c.cat1_title, items: c.cat1_items.split(",").map((s) => s.trim()) },
    { icon: icons[1], title: c.cat2_title, items: c.cat2_items.split(",").map((s) => s.trim()) },
    { icon: icons[2], title: c.cat3_title, items: c.cat3_items.split(",").map((s) => s.trim()) },
  ];

  return (
    <section id="services" className="py-16 sm:py-32 px-4 sm:px-6" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-20"
        >
          <p className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">
            {c.subtitle}
          </p>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold">
            {c.title_start} <span className="text-gold-gradient">{c.title_highlight}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ y: -8, borderColor: "hsl(var(--primary) / 0.5)" }}
              className="border border-border rounded-sm p-6 sm:p-8 hover:border-primary/40 transition-all duration-500 group cursor-default"
            >
              <cat.icon className="w-6 sm:w-8 h-6 sm:h-8 text-primary mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" />
              <h3 className="font-display text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                {cat.title}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li key={item} className="text-white/60 font-body text-xs sm:text-sm flex items-center gap-2">
                    <motion.span className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" whileHover={{ scale: 2 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

export { defaults as servicesDefaults };
