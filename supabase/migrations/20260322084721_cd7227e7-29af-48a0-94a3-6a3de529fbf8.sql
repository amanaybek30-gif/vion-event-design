
ALTER TABLE public.portfolio_items
  ADD COLUMN service_provided text NOT NULL DEFAULT '',
  ADD COLUMN event_date text NOT NULL DEFAULT '',
  ADD COLUMN location text NOT NULL DEFAULT '',
  ADD COLUMN video_urls jsonb NOT NULL DEFAULT '[]'::jsonb;
