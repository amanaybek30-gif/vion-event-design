import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

type ContentMap = Record<string, string>;

export function usePageContent(page: string, defaults: ContentMap) {
  const [content, setContent] = useState<ContentMap>(defaults);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await supabase
        .from("page_contents")
        .select("section_key, content")
        .eq("page", page);
      if (data && data.length > 0) {
        const merged = { ...defaults };
        data.forEach((row) => {
          merged[row.section_key] = row.content;
        });
        setContent(merged);
      }
      setLoading(false);
    };
    fetchContent();
  }, [page]);

  return { content, loading };
}

export async function savePageContent(page: string, key: string, value: string) {
  const { error } = await supabase
    .from("page_contents")
    .upsert({ page, section_key: key, content: value }, { onConflict: "page,section_key" });
  return !error;
}

export async function fetchAllPageContents(page: string): Promise<ContentMap> {
  const { data } = await supabase
    .from("page_contents")
    .select("section_key, content")
    .eq("page", page);
  const map: ContentMap = {};
  if (data) data.forEach((r) => (map[r.section_key] = r.content));
  return map;
}
