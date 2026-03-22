import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const Gallery = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase.from("gallery_images").select("*").order("created_at");
      if (data) setImages(data);
    };
    fetchImages();
  }, []);

  const navigate = (dir: 1 | -1) => {
    if (selectedIdx === null) return;
    const next = (selectedIdx + dir + images.length) % images.length;
    setSelectedIdx(next);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 px-6" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-body mb-4">
              Gallery
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              Our <span className="text-gold-gradient">Moments</span>
            </h1>
          </motion.div>

          {images.length === 0 ? (
            <p className="text-center text-muted-foreground font-body">
              Gallery images coming soon.
            </p>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="break-inside-avoid cursor-pointer overflow-hidden rounded-sm group"
                  onClick={() => setSelectedIdx(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full rounded-sm group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox with navigation */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <motion.img
              key={selectedIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={images[selectedIdx].src}
              alt={images[selectedIdx].alt}
              className="max-w-full max-h-[90vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <p className="absolute bottom-4 text-white/40 font-body text-sm">
              {selectedIdx + 1} / {images.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
