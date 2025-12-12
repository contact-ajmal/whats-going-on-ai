-- Rename this file to something like schema.sql and copy contents to Supabase SQL Editor

create table public.tools (
  id uuid default gen_random_uuid() primary key,
  slug text unique,
  name text not null,
  description text,
  category text,
  url text,
  icon text,
  tags text[],
  is_new boolean default false,
  pricing text,
  how_to_use text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.tools enable row level security;

-- Create policy to allow everyone to READ tools
create policy "Enable read access for all users" on public.tools
  for select using (true);

-- Create policy to allow ONLY authenticated users to INSERT/UPDATE (For Admin Dashboard later)
create policy "Enable insert for authenticated users only" on public.tools
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.tools
  for update using (auth.role() = 'authenticated');
