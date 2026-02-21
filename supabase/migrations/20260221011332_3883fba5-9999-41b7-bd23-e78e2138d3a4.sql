
-- Remove all existing SELECT policies on contact_submissions
DROP POLICY IF EXISTS "Allow authenticated users to read contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "No public read access" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only my account can read submissions" ON public.contact_submissions;

-- Remove duplicate INSERT policies (keep one)
DROP POLICY IF EXISTS "Allow public insert contact submissions" ON public.contact_submissions;

-- Create single secure SELECT policy for admin only
CREATE POLICY "Admin can read contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (auth.email() = 'Ingakali95@gmail.com');
