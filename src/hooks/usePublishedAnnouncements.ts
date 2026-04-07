import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PublishedAnnouncement {
  id: string;
  title: string;
  header: string;
  body: string;
  image_url: string;
  video_url: string;
  link_url: string;
  link_label: string;
  button_text: string;
  button_url: string;
  category: string;
  is_ticker: boolean;
  sort_order: number;
}

export function usePublishedAnnouncements() {
  const [announcements, setAnnouncements] = useState<PublishedAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = useCallback(async (showLoader = false) => {
    if (showLoader) {
      setLoading(true);
    }

    const { data, error } = await supabase
      .from("announcements")
      .select("id, title, header, body, image_url, video_url, link_url, link_label, button_text, button_url, category, is_ticker, sort_order")
      .eq("is_published", true)
      .order("sort_order");

    if (error) {
      console.error("Failed to load published announcements", error);
      setAnnouncements([]);
      setLoading(false);
      return;
    }

    setAnnouncements(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    void fetchAnnouncements(true);

    const handleFocus = () => {
      void fetchAnnouncements();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        void fetchAnnouncements();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchAnnouncements]);

  return { announcements, loading, refetch: fetchAnnouncements };
}