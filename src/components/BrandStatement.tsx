import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { usePageContent } from "@/hooks/usePageContent";
import { supabase } from "@/integrations/supabase/client";

const defaults = {
  line1: "We don't just organize events.",
  line2: "We design moments people remember.",
};

const BrandStatement = () => {
  const ref = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { content: c } = usePageContent("brand_section", defaults);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data } = await supabase
        .from("page_contents")
        .select("content")
        .eq("page", "home")
        .eq("section_key", "brand_video_url")
        .maybeSingle();
      if (data?.content) setVideoUrl(data.content);
    };
    fetchVideo();
  }, []);

  const handleVideoRef = useCallback((el: HTMLVideoElement | null) => {
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

  return (
    <section className="py-16 sm:py-32 px-4 sm:px-6 relative overflow-hidden" ref={ref}>
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        {videoUrl ? (
          <video
            ref={handleVideoRef}
            src={videoUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        style={{ scale }}
        transition={{ duration: 1 }}
        className="container mx-auto max-w-4xl text-center relative z-10"
      >
        <motion.div
          className="w-12 sm:w-16 h-px bg-primary mx-auto mb-8 sm:mb-12"
          initial={{ width: 0 }}
          animate={inView ? { width: 64 } : {}}
          transition={{ duration: 0.8 }}
        />
        <h2 className="font-display text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          {c.line1}
          <br />
          <span className="text-gold-gradient">{c.line2}</span>
        </h2>
        <motion.div
          className="w-12 sm:w-16 h-px bg-primary mx-auto mt-8 sm:mt-12"
          initial={{ width: 0 }}
          animate={inView ? { width: 64 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>
    </section>
  );
};

export default BrandStatement;

export { defaults as brandDefaults };
