create extension if not exists "pgcrypto";

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,
  full_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  onboarded boolean not null default false,
  profile_photo text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists barbershops (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid references profiles(id) on delete set null,
  owner_email text,
  name text not null,
  description text,
  address text not null,
  phone text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  cover_image text,
  logo text,
  opening_hour text,
  closing_hour text,
  working_days text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_barbershops_owner_profile_id on barbershops(owner_profile_id);
create index if not exists idx_barbershops_owner_email on barbershops(owner_email);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  barbershop_id uuid not null references barbershops(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  duration_minutes integer not null,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_services_barbershop_id on services(barbershop_id);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  barbershop_id uuid not null references barbershops(id) on delete cascade,
  service_id uuid not null references services(id) on delete restrict,
  client_email text,
  client_name text not null,
  date date not null,
  time text not null,
  status text not null default 'pendente' check (status in ('pendente', 'confirmado', 'cancelado', 'concluido')),
  service_name text,
  service_price numeric(10, 2),
  barbershop_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_appointments_profile_id on appointments(profile_id);
create index if not exists idx_appointments_client_email on appointments(client_email);
create index if not exists idx_appointments_barbershop_id on appointments(barbershop_id);
create index if not exists idx_appointments_date on appointments(date);

create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references profiles(id) on delete set null,
  barbershop_id uuid not null references barbershops(id) on delete cascade,
  client_email text not null,
  client_name text,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (barbershop_id, client_email)
);

create index if not exists idx_reviews_barbershop_id on reviews(barbershop_id);

create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  barbershop_id uuid not null references barbershops(id) on delete cascade,
  image_url text not null,
  title text,
  category text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_gallery_photos_barbershop_id on gallery_photos(barbershop_id);

create table if not exists coupons (
  id uuid primary key default gen_random_uuid(),
  barbershop_id uuid not null references barbershops(id) on delete cascade,
  barbershop_name text,
  code text not null,
  title text not null,
  description text,
  discount_type text not null check (discount_type in ('percent', 'fixed')),
  discount_value numeric(10, 2) not null,
  expires_at date,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (barbershop_id, code)
);

create index if not exists idx_coupons_barbershop_id on coupons(barbershop_id);
create index if not exists idx_coupons_active on coupons(active);

drop trigger if exists profiles_set_updated_at on profiles;
create trigger profiles_set_updated_at before update on profiles
for each row execute function set_updated_at();

drop trigger if exists barbershops_set_updated_at on barbershops;
create trigger barbershops_set_updated_at before update on barbershops
for each row execute function set_updated_at();

drop trigger if exists services_set_updated_at on services;
create trigger services_set_updated_at before update on services
for each row execute function set_updated_at();

drop trigger if exists appointments_set_updated_at on appointments;
create trigger appointments_set_updated_at before update on appointments
for each row execute function set_updated_at();

drop trigger if exists reviews_set_updated_at on reviews;
create trigger reviews_set_updated_at before update on reviews
for each row execute function set_updated_at();

drop trigger if exists gallery_photos_set_updated_at on gallery_photos;
create trigger gallery_photos_set_updated_at before update on gallery_photos
for each row execute function set_updated_at();

drop trigger if exists coupons_set_updated_at on coupons;
create trigger coupons_set_updated_at before update on coupons
for each row execute function set_updated_at();
