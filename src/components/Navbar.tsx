import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import vionLogo from "@/assets/vion-logo.jpg";

const solutionsLinks = [
  { label: "VERS", href: "/vers" },
  { label: "Momentique", href: "/momentique" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "#", dropdown: solutionsLinks },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    if (latest > previous && latest > 120 && !open) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isSolutionActive = solutionsLinks.some((l) => location.pathname === l.href);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "md:bg-secondary/80 md:backdrop-blur-xl md:border-b md:border-primary/10 md:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.5)]"
          : "md:bg-transparent md:border-b md:border-transparent"
      }`}
    >

      <div className="container mx-auto flex items-center justify-between py-2 px-6">
        <Link to="/" className="group">
          <motion.img
            src={vionLogo}
            alt="VION Events"
            className="h-12 w-auto"
            style={{ mixBlendMode: "screen" }}
            whileHover={{ scale: 1.06, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setSolutionsOpen(!solutionsOpen)}
                  className={`text-xs font-body tracking-widest uppercase transition-colors duration-300 inline-flex items-center gap-1.5 ${
                    isSolutionActive
                      ? "text-primary"
                      : "text-secondary-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${solutionsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {solutionsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 min-w-[220px] overflow-hidden rounded-lg border border-primary/15 bg-secondary/98 backdrop-blur-xl shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)]"
                    >
                      <div className="p-1.5">
                        {link.dropdown.map((sub, idx) => (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={() => setSolutionsOpen(false)}
                            className={`group flex items-center gap-3 px-4 py-3 rounded-md text-xs font-body tracking-widest uppercase transition-all duration-200 ${
                              location.pathname === sub.href
                                ? "text-primary bg-primary/10"
                                : "text-secondary-foreground/70 hover:text-primary hover:bg-primary/5"
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                              location.pathname === sub.href
                                ? "bg-primary scale-100"
                                : "bg-secondary-foreground/20 group-hover:bg-primary group-hover:scale-110"
                            }`} />
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                      <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                      <div className="px-4 py-2.5 text-center">
                        <span className="text-[10px] font-body tracking-wider uppercase text-secondary-foreground/30">
                          Powered by VION
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-body tracking-widest uppercase transition-colors duration-300 ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-secondary-foreground/70 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-secondary-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-secondary border-t border-border/20 px-6 pb-6 space-y-4"
        >
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <button
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                  className="flex items-center gap-1 text-xs tracking-widest uppercase text-secondary-foreground/70 hover:text-primary transition-colors w-full"
                >
                  {link.label}
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-200 ${mobileSolutionsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileSolutionsOpen && (
                  <div className="pl-4 mt-2 space-y-3 border-l border-border/20">
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        onClick={() => {
                          setOpen(false);
                          setMobileSolutionsOpen(false);
                        }}
                        className={`block text-xs tracking-widest uppercase transition-colors ${
                          location.pathname === sub.href
                            ? "text-primary"
                            : "text-secondary-foreground/70 hover:text-primary"
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="block text-xs tracking-widest uppercase text-secondary-foreground/70 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
