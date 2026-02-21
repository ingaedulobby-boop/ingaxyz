-- Explicit deny for anonymous/public SELECT on contact_submissions
CREATE POLICY "Deny public select on contact_submissions"
ON public.contact_submissions
FOR SELECT
TO anon
USING (false);
