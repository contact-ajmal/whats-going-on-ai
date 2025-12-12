-- RUN THIS IN SUPABASE SQL EDITOR TO SECURE YOUR DB

-- Drop the temporary permissive policies
drop policy if exists "Enable insert for everyone" on public.tools;
drop policy if exists "Enable update for everyone" on public.tools;

-- Restore strict policies (Public Read, Admin Write)
-- Note: 'create policy' might fail if they already exist, so we drop them first just in case
drop policy if exists "Enable read access for all users" on public.tools;
drop policy if exists "Enable insert for authenticated users only" on public.tools;
drop policy if exists "Enable update for authenticated users only" on public.tools;

create policy "Enable read access for all users" on public.tools
  for select using (true);

create policy "Enable insert for authenticated users only" on public.tools
  for insert with check (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.tools
  for update using (auth.role() = 'authenticated');
