
-- Create portfolio_items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image TEXT NOT NULL DEFAULT '',
  title TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  impact TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Portfolio items are publicly readable"
  ON public.portfolio_items FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert portfolio items"
  ON public.portfolio_items FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update portfolio items"
  ON public.portfolio_items FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete portfolio items"
  ON public.portfolio_items FOR DELETE TO authenticated USING (true);

-- Create gallery_images table
CREATE TABLE public.gallery_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  src TEXT NOT NULL DEFAULT '',
  alt TEXT NOT NULL DEFAULT 'Gallery image',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gallery images are publicly readable"
  ON public.gallery_images FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert gallery images"
  ON public.gallery_images FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update gallery images"
  ON public.gallery_images FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete gallery images"
  ON public.gallery_images FOR DELETE TO authenticated USING (true);
