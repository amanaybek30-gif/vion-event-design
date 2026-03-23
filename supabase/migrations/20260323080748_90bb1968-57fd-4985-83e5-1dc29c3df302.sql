
CREATE TABLE public.carousel_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  src text NOT NULL DEFAULT '',
  alt text NOT NULL DEFAULT 'Carousel image',
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE public.carousel_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Carousel images are publicly readable" ON public.carousel_images FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can insert carousel images" ON public.carousel_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update carousel images" ON public.carousel_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated users can delete carousel images" ON public.carousel_images FOR DELETE TO authenticated USING (true);

-- Create videos storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', true) ON CONFLICT DO NOTHING;

CREATE POLICY "Videos are publicly readable" ON storage.objects FOR SELECT TO public USING (bucket_id = 'videos');
CREATE POLICY "Authenticated users can upload videos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'videos');
CREATE POLICY "Authenticated users can delete videos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'videos');
