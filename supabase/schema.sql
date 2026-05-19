-- Facez.lk — Supabase schema
-- Run this in the Supabase SQL editor (or via psql) to provision the database.
-- The app falls back to local mock data if Supabase env vars are not set,
-- so this is only required when going to production.

-- Extensions ---------------------------------------------------------
create extension if not exists "uuid-ossp";

-- ENUMs --------------------------------------------------------------
do $$ begin
  create type product_category as enum ('face', 'cheek', 'eyes', 'lips');
exception when duplicate_object then null; end $$;

do $$ begin
  create type product_condition as enum ('new', 'gently-used');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_method as enum ('cod', 'payhere', 'bank-transfer');
exception when duplicate_object then null; end $$;

-- Tables -------------------------------------------------------------

create table if not exists brands (
  id          uuid primary key default uuid_generate_v4(),
  slug        text unique not null,
  name        text not null,
  logo        text,
  description text,
  created_at  timestamptz not null default now()
);

create table if not exists products (
  id              uuid primary key default uuid_generate_v4(),
  slug            text unique not null,
  name            text not null,
  brand_slug      text not null references brands(slug) on delete restrict,
  category        product_category not null,
  subcategory     text not null,
  price           numeric(10,2) not null check (price >= 0),
  original_price  numeric(10,2) check (original_price is null or original_price >= price),
  condition       product_condition not null default 'new',
  description     text,
  images          text[] not null default '{}',
  stock           integer not null default 0 check (stock >= 0),
  authenticity_note text,
  tags            text[] not null default '{}',
  rating          numeric(2,1) check (rating is null or (rating >= 0 and rating <= 5)),
  reviews         integer not null default 0,
  created_at      timestamptz not null default now()
);

create index if not exists products_brand_idx on products(brand_slug);
create index if not exists products_category_idx on products(category);
create index if not exists products_tags_idx on products using gin(tags);

create table if not exists orders (
  id              text primary key,                      -- e.g. FCZ-XXXX-XXXX
  customer_name   text not null,
  phone           text not null,
  email           text,
  address         text not null,
  city            text not null,
  notes           text,
  items           jsonb not null,                        -- snapshot of OrderItem[]
  subtotal        numeric(10,2) not null,
  shipping        numeric(10,2) not null default 0,
  total           numeric(10,2) not null,
  payment_method  payment_method not null,
  status          order_status not null default 'pending',
  created_at      timestamptz not null default now()
);

create index if not exists orders_status_idx on orders(status);
create index if not exists orders_created_idx on orders(created_at desc);

-- Optional users (for future auth)
create table if not exists profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  email       text,
  phone       text,
  created_at  timestamptz not null default now()
);

-- Row Level Security ------------------------------------------------
alter table brands enable row level security;
alter table products enable row level security;
alter table orders enable row level security;

-- Public read access for storefront catalog
create policy "Public read brands"   on brands   for select using (true);
create policy "Public read products" on products for select using (true);

-- Orders: anonymous can insert (checkout); only authenticated admins can read.
-- Tighten this in production by introducing an admin role.
create policy "Anyone can place an order" on orders for insert with check (true);
create policy "Authenticated read orders" on orders for select using (auth.role() = 'authenticated');
create policy "Authenticated update orders" on orders for update using (auth.role() = 'authenticated');

-- Storage bucket for product images (run separately in dashboard if needed):
-- insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);
