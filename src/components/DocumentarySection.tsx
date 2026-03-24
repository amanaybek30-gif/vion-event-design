import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Film, Droplets, Users, Volume2, VolumeX, Maximize } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const DocumentarySection = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [isMuted, setIsMuted] = useState(true);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrailer = async () => {
      const { data } = await supabase
        .from("page_contents")
        .select("content")
        .eq("page", "home")
        .eq("section_key", "trailer_video_url")
        .maybeSingle();
      if (data?.content) setVideoUrl(data.content);
    };
    fetchTrailer();
  }, []);

  const handleVideoMount = useCallback((el: HTMLVideoElement | null) => {
    (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    if (el) {
      el.muted = true;
      el.playsInline = true;
      el.loop = true;
      el.autoplay = true;
      el.setAttribute("playsinline", "");
      el.setAttribute("webkit-playsinline", "");
      el.load();
      const tryPlay = () => {
        el.play().catch(() => setTimeout(tryPlay, 500));
      };
      tryPlay();
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const goFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitEnterFullscreen) {
        (videoRef.current as any).webkitEnterFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen();
      }
    }
  };

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 section-dark" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <p className="text-primary tracking-[0.2em] sm:tracking-[0.3em] uppercase text-xs sm:text-sm font-body mb-3 sm:mb-4">
            🎥 Flow Fest 2025 Documentary Trailer
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            📍 Sidama Cultural Hall, <span className="text-gold-gradient">Hawassa</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-video rounded-sm overflow-hidden border border-border/30 mb-6 sm:mb-8 relative group"
        >
          {videoUrl ? (
            <>
              <video
                ref={handleVideoMount}
                src={videoUrl}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
              {/* Controls overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={goFullscreen}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
              </div>
              {/* Muted indicator always visible on mobile */}
              {isMuted && (
                <button
                  onClick={toggleMute}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center group-hover:opacity-0 transition-opacity"
                >
                  <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/80" />
                </button>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <p className="text-muted-foreground font-body text-sm">No trailer uploaded yet</p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-white/80 font-body text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-8">
            Official trailer revealing the struggle, the unheard stories, and dedication 
            of those working at Hawassa Regional Blood Bank.
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
            {[
              { icon: Film, label: "Trailer" },
              { icon: Droplets, label: "Blood Donation" },
              { icon: Users, label: "Community" },
            ].map(({ icon: Icon, label }) => (
              <motion.span
                key={label}
                whileHover={{ scale: 1.05, borderColor: "hsl(var(--primary) / 0.5)" }}
                className="inline-flex items-center gap-1.5 sm:gap-2 border border-border/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-sm font-body text-xs sm:text-sm text-white/80 cursor-default"
              >
                <Icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" /> {label}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DocumentarySection;
