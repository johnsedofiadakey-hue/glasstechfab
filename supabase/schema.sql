-- Supabase Schema for LuxeSpace Project Management Platform

-- 1. Profiles Table (Extends Auth)
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
  location TEXT,
  area TEXT,
  duration TEXT,
  style TEXT,
  description TEXT,
  hero_image TEXT,
  before_image TEXT,
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
  method TEXT,
  date DATE DEFAULT CURRENT_DATE,
  invoice_url TEXT
);

-- 4. Shipments Table
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  item TEXT NOT NULL,
  supplier TEXT,
  status TEXT DEFAULT 'Order Placed' CHECK (status IN ('Order Placed', 'Shipped', 'At Customs', 'Delivered')),
  eta TEXT,
  container_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  user_name TEXT,
  type TEXT, -- 'Stage', 'Payment', 'Staff', 'Alert'
  action TEXT NOT NULL,
  project_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Notes Table
CREATE TABLE IF NOT EXISTS public.notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id),
  author_name TEXT,
  content TEXT NOT NULL,
  is_client_visible BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CMS Content Table
CREATE TABLE IF NOT EXISTS public.cms_content (
  id TEXT PRIMARY KEY, -- 'hero', 'about', 'services', 'brand'
  content JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

-- 9. Policies

-- Profiles: Admins see all, others see self
CREATE POLICY "Admins see all profiles" ON public.profiles FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users see own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());

-- Projects: Admins/Managers see all, Clients see own
CREATE POLICY "Admins/Managers see all projects" ON public.projects FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'manager'))
);
CREATE POLICY "Clients see own projects" ON public.projects FOR SELECT TO authenticated USING (client_id = auth.uid());

-- Real-time: Enable for logs and projects
-- SUPABASE_REALTIME: public.activity_logs, public.projects
