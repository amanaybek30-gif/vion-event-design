import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Megaphone } from "lucide-react";

interface TickerItem {
  id: string;
  title: string;
  link_url: string;
}

const NewsTicker = () => {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("announcements")
        .select("id, title, link_url")
        .eq("is_published", true)
        .eq("is_ticker", true)
        .order("sort_order");
      if (data && data.length > 0) setItems(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((c) => (c + 1) % items.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl flex items-center gap-3">
        <Megaphone className="w-4 h-4 text-primary flex-shrink-0" />
        <div className="relative h-5 flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={items[current].id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex items-center"
            >
              {items[current].link_url ? (
                <a
                  href={items[current].link_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm font-body text-primary hover:text-primary/80 transition-colors truncate"
                >
                  {items[current].title}
                </a>
              ) : (
                <span className="text-xs sm:text-sm font-body text-primary truncate">
                  {items[current].title}
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
