-- Add new columns to existing contact_submissions table
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS ip_address text,
  ADD COLUMN IF NOT EXISTS user_agent text;

-- Add index for sorting
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON public.contact_submissions (created_at DESC);
