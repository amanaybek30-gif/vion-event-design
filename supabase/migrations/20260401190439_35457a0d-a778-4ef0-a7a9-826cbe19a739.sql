
CREATE TABLE public.announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  title TEXT NOT NULL DEFAULT '',
  header TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  link_url TEXT NOT NULL DEFAULT '',
  link_label TEXT NOT NULL DEFAULT '',
  button_text TEXT NOT NULL DEFAULT '',
  button_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'announcement',
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_ticker BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Announcements are publicly readable"
  ON public.announcements FOR SELECT TO public
  USING (true);

CREATE POLICY "Authenticated users can insert announcements"
  ON public.announcements FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update announcements"
  ON public.announcements FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete announcements"
  ON public.announcements FOR DELETE TO authenticated
  USING (true);
