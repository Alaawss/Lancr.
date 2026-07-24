-- Users table (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  display_name TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Campaigns
CREATE TABLE public.campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('mobile_app','saas','website','product','event','course','community','newsletter','game','other')),
  slug TEXT NOT NULL UNIQUE,
  logo_url TEXT,
  banner_url TEXT,
  launch_date TIMESTAMPTZ,
  theme TEXT NOT NULL DEFAULT 'default',
  accent_color TEXT NOT NULL DEFAULT '#7c3aed',
  signup_cap INTEGER DEFAULT 100,
  confirmation_message TEXT,
  thank_you_redirect_url TEXT,
  remove_branding BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','ended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Benefits
CREATE TABLE public.benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Signups
CREATE TABLE public.signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  referral_code TEXT NOT NULL UNIQUE,
  referred_by UUID REFERENCES public.signups(id),
  source TEXT NOT NULL DEFAULT 'direct' CHECK (source IN ('direct','referral')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(campaign_id, email)
);

-- Subscriptions
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  paddle_subscription_id TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','cancelled','past_due','paused','trialing')),
  plan TEXT NOT NULL DEFAULT 'premium',
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Campaign Views
CREATE TABLE public.campaign_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES public.campaigns(id) ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  referrer TEXT
);

-- Indexes
CREATE INDEX idx_campaigns_user_id ON public.campaigns(user_id);
CREATE INDEX idx_campaigns_slug ON public.campaigns(slug);
CREATE INDEX idx_benefits_campaign_id ON public.benefits(campaign_id);
CREATE INDEX idx_signups_campaign_id ON public.signups(campaign_id);
CREATE INDEX idx_signups_referral_code ON public.signups(referral_code);
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_campaign_views_campaign_id ON public.campaign_views(campaign_id);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_views ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users: read/update own row only
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Campaigns: owners manage own; anon can SELECT published campaigns
CREATE POLICY "Owners can manage own campaigns" ON public.campaigns FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Anyone can view published campaigns" ON public.campaigns FOR SELECT USING (status = 'published');

-- Benefits: owners manage; anon can SELECT for published campaigns
CREATE POLICY "Owners can manage own campaign benefits" ON public.benefits FOR ALL USING (
  EXISTS (SELECT 1 FROM public.campaigns WHERE id = campaign_id AND user_id = auth.uid())
);
CREATE POLICY "Anyone can view published campaign benefits" ON public.benefits FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.campaigns WHERE id = campaign_id AND status = 'published')
);

-- Signups: owners SELECT own campaign signups; anon can INSERT
CREATE POLICY "Owners can view own campaign signups" ON public.signups FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.campaigns WHERE id = campaign_id AND user_id = auth.uid())
);
CREATE POLICY "Anyone can insert signups" ON public.signups FOR INSERT WITH CHECK (true);

-- Subscriptions: owners view own
CREATE POLICY "Owners can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Campaign views: anyone INSERT; owners SELECT own
CREATE POLICY "Anyone can insert campaign views" ON public.campaign_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Owners can view own campaign views" ON public.campaign_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.campaigns WHERE id = campaign_id AND user_id = auth.uid())
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Auto-user-creation trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, display_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'display_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Storage bucket for campaign assets
INSERT INTO storage.buckets (id, name, public) VALUES ('campaign-assets', 'campaign-assets', true);

CREATE POLICY "Anyone can read campaign-assets" ON storage.objects FOR SELECT USING (bucket_id = 'campaign-assets');
CREATE POLICY "Authenticated users can upload campaign-assets" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'campaign-assets' AND auth.role() = 'authenticated'
);
CREATE POLICY "Users can update own campaign-assets" ON storage.objects FOR UPDATE USING (
  bucket_id = 'campaign-assets' AND auth.uid() = owner
);
CREATE POLICY "Users can delete own campaign-assets" ON storage.objects FOR DELETE USING (
  bucket_id = 'campaign-assets' AND auth.uid() = owner
);
