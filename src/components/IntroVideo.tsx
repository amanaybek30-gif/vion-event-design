import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface IntroVideoProps {
  onComplete: () => void;
}

const IntroVideo = ({ onComplete }: IntroVideoProps) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if intro was already shown this session
    const shown = sessionStorage.getItem("vion_intro_shown");
    if (shown) {
      setShow(false);
      onComplete();
      return;
    }

    const fetchIntro = async () => {
      const { data } = await supabase
        .from("page_contents")
        .select("content")
        .eq("page", "home")
        .eq("section_key", "intro_video_url")
        .maybeSingle();

      if (data?.content) {
        setVideoUrl(data.content);
      } else {
        // No intro video set — skip
        sessionStorage.setItem("vion_intro_shown", "1");
        setShow(false);
        onComplete();
      }
      setLoading(false);
    };

    fetchIntro();
  }, [onComplete]);

  const handleEnd = useCallback(() => {
    sessionStorage.setItem("vion_intro_shown", "1");
    setShow(false);
    setTimeout(onComplete, 600); // wait for exit animation
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    if (videoRef.current) videoRef.current.pause();
    handleEnd();
  }, [handleEnd]);

  if (!show || loading) return null;
  if (!videoUrl) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          onClick={handleSkip}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleEnd}
            onError={handleEnd}
            onCanPlay={() => videoRef.current?.play().catch(() => {})}
            className="w-full h-full object-cover"
          />

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleSkip}
            className="absolute bottom-8 right-8 text-white/40 hover:text-white/80 text-xs font-body tracking-[0.2em] uppercase transition-colors"
          >
            Skip
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo;
