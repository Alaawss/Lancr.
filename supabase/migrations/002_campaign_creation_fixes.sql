-- Apply this migration to existing Supabase projects after 001_initial_schema.sql.
-- It keeps the database category constraint in sync with the dashboard form.
ALTER TABLE public.campaigns
  DROP CONSTRAINT IF EXISTS campaigns_category_check;

ALTER TABLE public.campaigns
  ADD CONSTRAINT campaigns_category_check
  CHECK (category IN ('mobile_app','saas','website','product','event','course','community','newsletter','game','other'));

-- Be explicit about the INSERT check. This guarantees an authenticated campaign
-- owner may create benefits for a campaign they own.
DROP POLICY IF EXISTS "Owners can manage own campaign benefits" ON public.benefits;

CREATE POLICY "Owners can manage own campaign benefits" ON public.benefits
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE id = campaign_id AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.campaigns
      WHERE id = campaign_id AND user_id = auth.uid()
    )
  );
