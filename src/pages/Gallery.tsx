import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const Gallery = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await supabase.from("gallery_images").select("*").order("created_at");
      if (data) setImages(data);
    };
    fetchImages();
  }, []);

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
                  className="break-inside-avoid cursor-pointer"
                  onClick={() => setSelected(img)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full rounded-sm hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-secondary/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected.src}
            alt={selected.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-sm"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
