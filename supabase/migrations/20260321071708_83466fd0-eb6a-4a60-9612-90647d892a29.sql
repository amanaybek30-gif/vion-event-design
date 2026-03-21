
CREATE TABLE public.page_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  section_key text NOT NULL,
  content text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page, section_key)
);

ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Page contents are publicly readable"
ON public.page_contents FOR SELECT TO public
USING (true);

CREATE POLICY "Authenticated users can insert page contents"
ON public.page_contents FOR INSERT TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update page contents"
ON public.page_contents FOR UPDATE TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete page contents"
ON public.page_contents FOR DELETE TO authenticated
USING (true);
