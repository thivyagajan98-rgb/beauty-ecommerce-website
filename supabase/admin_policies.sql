-- Facez.lk — Admin RLS policies
--
-- Run this AFTER schema.sql if you've already provisioned the database.
-- These policies grant any authenticated Supabase user (i.e. admin) the
-- ability to manage the catalog from the storefront's admin panel.
--
-- Idempotent: safe to re-run.

-- Brands ------------------------------------------------------------
drop policy if exists "Authenticated insert brands" on brands;
create policy "Authenticated insert brands" on brands
  for insert with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated update brands" on brands;
create policy "Authenticated update brands" on brands
  for update using (auth.role() = 'authenticated');

drop policy if exists "Authenticated delete brands" on brands;
create policy "Authenticated delete brands" on brands
  for delete using (auth.role() = 'authenticated');

-- Products ----------------------------------------------------------
drop policy if exists "Authenticated insert products" on products;
create policy "Authenticated insert products" on products
  for insert with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated update products" on products;
create policy "Authenticated update products" on products
  for update using (auth.role() = 'authenticated');

drop policy if exists "Authenticated delete products" on products;
create policy "Authenticated delete products" on products
  for delete using (auth.role() = 'authenticated');

-- Orders (already in schema.sql, repeated here for completeness on
-- environments that ran an older schema) -----------------------------
drop policy if exists "Authenticated update orders" on orders;
create policy "Authenticated update orders" on orders
  for update using (auth.role() = 'authenticated');
