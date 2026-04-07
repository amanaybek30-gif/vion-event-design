import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone } from "lucide-react";
import { usePublishedAnnouncements } from "@/hooks/usePublishedAnnouncements";

const NewsTicker = () => {
  const { announcements } = usePublishedAnnouncements();
  const [current, setCurrent] = useState(0);
  const items = announcements.filter((item) => item.is_ticker && item.title.trim().length > 0);

  useEffect(() => {
    if (items.length > 0 && current >= items.length) {
      setCurrent(0);
    }
  }, [current, items.length]);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  const activeItem = items[current];

  return (
    <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl flex items-center gap-3">
        <Megaphone className="w-4 h-4 text-primary flex-shrink-0" />
        <div className="relative h-5 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center"
            >
              {activeItem.link_url ? (
                <a
                  href={activeItem.link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-body text-primary hover:text-primary/80 transition-colors truncate"
                >
                  {activeItem.title}
                </a>
              ) : (
                <span className="text-xs sm:text-sm font-body text-primary truncate">
                  {activeItem.title}
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
