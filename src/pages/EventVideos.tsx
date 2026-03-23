import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Play, ArrowLeft, Image as ImageIcon } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  video_urls: string[];
}

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

const getEmbedUrl = (url: string) => {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1`;
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  // Direct video URL (uploaded file)
  return url;
};

const isDirectVideo = (url: string) => {
  return /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url);
};

const getYouTubeThumbnail = (url: string) => {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return null;
};

const getYouTubeThumbnail = (url: string) => {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
  return null;
};

const EventVideos = () => {
  const { id } = useParams<{ id: string }>();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [project, setProject] = useState<PortfolioItem | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("portfolio_items").select("id, title, category, video_urls").eq("id", id!).single();
      if (data) setProject({ ...data, video_urls: Array.isArray(data.video_urls) ? data.video_urls as string[] : [] });
      
      const { data: gallery } = await supabase.from("gallery_images").select("*").order("created_at");
      if (gallery) setGalleryImages(gallery);
    };
    if (id) fetch();
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <div className="pt-32 pb-20 px-6 text-center">
          <p className="text-muted-foreground font-body">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-32 pb-20 px-6" ref={ref}>
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary font-body text-sm mb-6 hover:opacity-80 transition-opacity group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Portfolio
            </Link>
            <p className="text-primary tracking-[0.3em] uppercase text-xs font-body mb-2">{project.category}</p>
            <h1 className="font-display text-3xl md:text-5xl font-bold">
              {project.title} — <span className="text-gold-gradient">Event Videos</span>
            </h1>
          </motion.div>

          {/* Active video player */}
          {activeVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-12"
            >
              <div className="aspect-video w-full rounded-sm overflow-hidden bg-secondary border border-border/30">
                <iframe
                  src={getEmbedUrl(activeVideo)}
                  className="w-full h-full"
                  allowFullScreen
                  allow="autoplay; encrypted-media"
                />
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="mt-4 text-sm text-muted-foreground hover:text-primary transition-colors font-body"
              >
                ← Back to all videos
              </button>
            </motion.div>
          )}

          {/* Video grid */}
          {!activeVideo && (
            <>
              {project.video_urls.length === 0 ? (
                <p className="text-center text-muted-foreground font-body py-12">No videos available yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                  {project.video_urls.map((url, idx) => {
                    const thumb = getYouTubeThumbnail(url);
                    return (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        onClick={() => setActiveVideo(url)}
                        className="group relative aspect-video rounded-sm overflow-hidden border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10"
                      >
                        {thumb ? (
                          <img src={thumb} alt={`Video ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="w-full h-full bg-secondary" />
                        )}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <Play className="w-7 h-7 text-primary-foreground ml-0.5" />
                          </div>
                        </div>
                        <p className="absolute bottom-4 left-4 text-sm font-body text-white font-medium">
                          Video {idx + 1}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Gallery section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <button
                  onClick={() => setShowGallery(!showGallery)}
                  className="flex items-center gap-2 text-primary font-body text-sm tracking-wider uppercase mb-6 hover:opacity-80 transition-opacity"
                >
                  <ImageIcon className="w-4 h-4" />
                  {showGallery ? "Hide" : "View"} Event Gallery
                </button>

                {showGallery && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
                  >
                    {galleryImages.map((img, i) => (
                      <motion.div
                        key={img.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.03 }}
                        className="cursor-pointer group overflow-hidden rounded-sm"
                        onClick={() => setSelectedImage(img)}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            className="max-w-full max-h-[90vh] object-contain rounded-sm"
          />
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default EventVideos;
