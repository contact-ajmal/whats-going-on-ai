-- Add new columns for extended profile details
alter table public.profiles
add column if not exists bio text,
add column if not exists website text,
add column if not exists country text;

-- Ensure RLS allows updates to these columns (Covered by existing "Users can update own profile" policy)
