-- Initial Supabase Schema for Enitan Afolabi & Company

-- 1. Enums
CREATE TYPE contact_status AS ENUM ('new', 'read', 'replied');
CREATE TYPE career_status AS ENUM ('new', 'reviewing', 'shortlisted', 'rejected');

-- 2. Tables
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  author TEXT NOT NULL,
  featured_image TEXT,
  published BOOLEAN DEFAULT FALSE NOT NULL,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE career_applications (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position TEXT,
  cover_note TEXT NOT NULL,
  cv_url TEXT,
  status career_status DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status contact_status DEFAULT 'new' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- 3. Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for admin_users
-- Only service_role can access admin_users (App uses service_role for admin auth logic)
CREATE POLICY "Service role full access" ON admin_users TO service_role USING (true) WITH CHECK (true);

-- Policies for blog_posts
-- Public can read published posts
CREATE POLICY "Public read access for published posts" ON blog_posts 
  FOR SELECT TO anon USING (published = true);
-- Service role can do anything
CREATE POLICY "Service role full access" ON blog_posts TO service_role USING (true) WITH CHECK (true);

-- Policies for career_applications
-- Public can submit applications
CREATE POLICY "Public insert access" ON career_applications 
  FOR INSERT TO anon WITH CHECK (true);
-- Service role can read and manage
CREATE POLICY "Service role full access" ON career_applications TO service_role USING (true) WITH CHECK (true);

-- Policies for contact_messages
-- Public can submit messages
CREATE POLICY "Public insert access" ON contact_messages 
  FOR INSERT TO anon WITH CHECK (true);
-- Service role can read and manage
CREATE POLICY "Service role full access" ON contact_messages TO service_role USING (true) WITH CHECK (true);
