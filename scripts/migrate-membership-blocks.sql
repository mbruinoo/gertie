-- membershipOptions block
CREATE TABLE IF NOT EXISTS pages_blocks_membership_options (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  _path text NOT NULL,
  block_type varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS pages_blocks_membership_options_cards (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES pages_blocks_membership_options(id) ON DELETE CASCADE,
  card_type varchar,
  tagline varchar,
  tier_name varchar,
  price varchar,
  cta_label varchar,
  cta_url varchar,
  cta_style varchar DEFAULT 'filled'
);

CREATE TABLE IF NOT EXISTS pages_blocks_membership_options_cards_perks (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES pages_blocks_membership_options_cards(id) ON DELETE CASCADE,
  text varchar
);

-- memberEvents block
CREATE TABLE IF NOT EXISTS pages_blocks_member_events (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  _path text NOT NULL,
  block_type varchar NOT NULL,
  subtitle varchar,
  cta_label varchar DEFAULT 'Learn more',
  cta_url varchar
);

-- curatedExperiences block
CREATE TABLE IF NOT EXISTS pages_blocks_curated_experiences (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  _path text NOT NULL,
  block_type varchar NOT NULL,
  cta_label varchar DEFAULT 'Learn more',
  cta_url varchar,
  disclaimer varchar
);

CREATE TABLE IF NOT EXISTS pages_blocks_curated_experiences_upcoming_items (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES pages_blocks_curated_experiences(id) ON DELETE CASCADE,
  title varchar NOT NULL,
  note varchar
);

CREATE TABLE IF NOT EXISTS pages_blocks_curated_experiences_experiences (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES pages_blocks_curated_experiences(id) ON DELETE CASCADE,
  date varchar,
  title varchar NOT NULL,
  image_id integer REFERENCES media(id),
  body text
);

-- Add hideHeroRule to pages
ALTER TABLE pages ADD COLUMN IF NOT EXISTS hide_hero_rule boolean DEFAULT false;

-- Versioning tables (same structure but referencing _pages_v)
CREATE TABLE IF NOT EXISTS _pages_v_blocks_membership_options (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _pages_v(id) ON DELETE CASCADE,
  _path text NOT NULL,
  block_type varchar NOT NULL
);

CREATE TABLE IF NOT EXISTS _pages_v_blocks_membership_options_cards (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _pages_v_blocks_membership_options(id) ON DELETE CASCADE,
  card_type varchar,
  tagline varchar,
  tier_name varchar,
  price varchar,
  cta_label varchar,
  cta_url varchar,
  cta_style varchar DEFAULT 'filled'
);

CREATE TABLE IF NOT EXISTS _pages_v_blocks_membership_options_cards_perks (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _pages_v_blocks_membership_options_cards(id) ON DELETE CASCADE,
  text varchar
);

CREATE TABLE IF NOT EXISTS _pages_v_blocks_member_events (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _pages_v(id) ON DELETE CASCADE,
  _path text NOT NULL,
  block_type varchar NOT NULL,
  subtitle varchar,
  cta_label varchar DEFAULT 'Learn more',
  cta_url varchar
);

CREATE TABLE IF NOT EXISTS _pages_v_blocks_curated_experiences (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _pages_v(id) ON DELETE CASCADE,
  _path text NOT NULL,
  block_type varchar NOT NULL,
  cta_label varchar DEFAULT 'Learn more',
  cta_url varchar,
  disclaimer varchar
);

CREATE TABLE IF NOT EXISTS _pages_v_blocks_curated_experiences_upcoming_items (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _pages_v_blocks_curated_experiences(id) ON DELETE CASCADE,
  title varchar NOT NULL,
  note varchar
);

CREATE TABLE IF NOT EXISTS _pages_v_blocks_curated_experiences_experiences (
  id serial PRIMARY KEY,
  _order integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _pages_v_blocks_curated_experiences(id) ON DELETE CASCADE,
  date varchar,
  title varchar NOT NULL,
  image_id integer REFERENCES media(id),
  body text
);

ALTER TABLE _pages_v ADD COLUMN IF NOT EXISTS version_hide_hero_rule boolean DEFAULT false;
