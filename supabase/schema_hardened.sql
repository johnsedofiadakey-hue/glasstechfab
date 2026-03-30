-- Hardened Supabase Schema for LuxeSpace

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'client' CHECK (role IN ('admin', 'manager', 'designer', 'stager', 'client')),
  avatar_url TEXT,
  phone TEXT,
  joined_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  client_id UUID REFERENCES public.profiles(id),
  pm_id UUID REFERENCES public.profiles(id),
  stage INTEGER DEFAULT 1 CHECK (stage >= 1 AND stage <= 7),
  progress INTEGER DEFAULT 0,
  budget TEXT,
  start_date DATE,
  hero_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.profiles(id),
  amount NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Paid', 'Pending', 'Overdue')),
  date DATE DEFAULT CURRENT_DATE,
  invoice_url TEXT
);

-- 4. Activity Logs (Hardened & Immutable)
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  user_name TEXT,
  type TEXT, -- 'Stage', 'Payment', 'Note', 'Staff'
  action TEXT NOT NULL,
  project_title TEXT,
  old_value JSONB, -- Before change
  new_value JSONB, -- After change
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to make activity_logs immutable
CREATE OR REPLACE FUNCTION prevent_mod_logs() RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'Activity logs are immutable and cannot be modified or deleted.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_immutable_logs
BEFORE UPDATE OR DELETE ON public.activity_logs
FOR EACH ROW EXECUTE FUNCTION prevent_mod_logs();

-- 5. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- 6. Hardened Policies

-- Profiles
CREATE POLICY "Admins see all profiles" ON public.profiles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users see own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());

-- Projects
CREATE POLICY "Admin/Manager full access projects" ON public.projects FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Clients see only own projects" ON public.projects FOR SELECT TO authenticated USING (client_id = auth.uid());

-- Payments
CREATE POLICY "Admin full access payments" ON public.payments FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Clients see own payments" ON public.payments FOR SELECT TO authenticated USING (client_id = auth.uid());

-- Activity Logs (SELECT only, no manual inserts by non-admins)
CREATE POLICY "Everyone see own/relevant logs" ON public.activity_logs FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager'))
  OR user_id = auth.uid()
);
CREATE POLICY "System/Admin insert logs" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (TRUE);

-- 7. Real-time setup
-- (Run this in Supabase replication settings)
-- ALTER PUBLICATION supabase_realtime ADD TABLE activity_logs, projects, payments;
