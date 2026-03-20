import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Palette, Music } from "lucide-react";

const categories = [
  {
    icon: Briefcase,
    title: "Corporate & Professional",
    items: ["Conferences", "Forums", "Business Events"],
  },
  {
    icon: Palette,
    title: "Brand & Creative",
    items: ["Brand Activations", "Product Launches", "Experience Design"],
  },
  {
    icon: Music,
    title: "Social & Cultural",
    items: ["Festivals", "Youth Events", "Private Gatherings"],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-32 px-6" ref={ref}>
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
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            Crafting Every <span className="text-gold-gradient">Dimension</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="border border-border rounded-sm p-8 hover:border-primary/40 transition-colors duration-500 group"
            >
              <cat.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-xl font-semibold mb-4">
                {cat.title}
              </h3>
              <ul className="space-y-2">
                {cat.items.map((item) => (
                  <li
                    key={item}
                    className="text-muted-foreground font-body text-sm flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
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
