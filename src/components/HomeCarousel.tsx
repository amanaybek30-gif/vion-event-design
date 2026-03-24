import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  sort_order: number;
}

const HomeCarousel = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("carousel_images")
        .select("*")
        .order("sort_order");
      if (data) setImages(data);
    };
    fetch();
  }, []);

  const next = useCallback(() => {
    if (images.length === 0) return;
    setDirection(1);
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    if (images.length === 0) return;
    setDirection(-1);
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, 2500);
    return () => clearInterval(timer);
  }, [images.length, next]);

  if (images.length === 0) return null;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-secondary">
      <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1] w-full">
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.img
            key={images[current].id}
            src={images[current].src}
            alt={images[current].alt}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-secondary/30 pointer-events-none" />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-secondary/50 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-secondary/70 transition-colors"
            >
              <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-secondary/50 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-secondary/70 transition-colors"
            >
              <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </button>
          </>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 sm:gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                  i === current ? "bg-primary w-4 sm:w-6" : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HomeCarousel;
