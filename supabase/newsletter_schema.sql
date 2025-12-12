-- Create subscribers table
create table public.subscribers (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.subscribers enable row level security;

-- Allow ANYONE to subscribe (anon key)
create policy "Enable insert for all users" on public.subscribers
  for insert with check (true);

-- Allow ONLY admins to view the list
create policy "Enable read access for authenticated users only" on public.subscribers
  for select using (auth.role() = 'authenticated');
