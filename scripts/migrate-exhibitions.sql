-- Run via: psql $DATABASE_URI -f scripts/migrate-exhibitions.sql

-- New scalar columns on main table
ALTER TABLE exhibitions ADD COLUMN IF NOT EXISTS presenting varchar;
ALTER TABLE exhibitions ADD COLUMN IF NOT EXISTS gallery_hours jsonb;

-- New scalar columns on versions table
ALTER TABLE _exhibitions_v ADD COLUMN IF NOT EXISTS version_presenting varchar;
ALTER TABLE _exhibitions_v ADD COLUMN IF NOT EXISTS version_gallery_hours jsonb;

-- Artists array
CREATE TABLE IF NOT EXISTS exhibitions_artists (
  _order    integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES exhibitions(id) ON DELETE CASCADE,
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name      varchar
);
CREATE INDEX IF NOT EXISTS exhibitions_artists_parent_idx ON exhibitions_artists(_parent_id);
CREATE INDEX IF NOT EXISTS exhibitions_artists_order_idx  ON exhibitions_artists(_order);

CREATE TABLE IF NOT EXISTS _exhibitions_v_version_artists (
  _order    integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _exhibitions_v(id) ON DELETE CASCADE,
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name      varchar
);
CREATE INDEX IF NOT EXISTS _exh_v_artists_parent_idx ON _exhibitions_v_version_artists(_parent_id);

-- Documents array
CREATE TABLE IF NOT EXISTS exhibitions_documents (
  _order    integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES exhibitions(id) ON DELETE CASCADE,
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label     varchar,
  url       varchar
);
CREATE INDEX IF NOT EXISTS exhibitions_documents_parent_idx ON exhibitions_documents(_parent_id);

CREATE TABLE IF NOT EXISTS _exhibitions_v_version_documents (
  _order    integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _exhibitions_v(id) ON DELETE CASCADE,
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label     varchar,
  url       varchar
);
CREATE INDEX IF NOT EXISTS _exh_v_documents_parent_idx ON _exhibitions_v_version_documents(_parent_id);

-- Installation images array
CREATE TABLE IF NOT EXISTS exhibitions_installation_images (
  _order    integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES exhibitions(id) ON DELETE CASCADE,
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id  integer REFERENCES media(id),
  caption   varchar
);
CREATE INDEX IF NOT EXISTS exhibitions_installation_images_parent_idx ON exhibitions_installation_images(_parent_id);

CREATE TABLE IF NOT EXISTS _exhibitions_v_version_installation_images (
  _order    integer NOT NULL,
  _parent_id integer NOT NULL REFERENCES _exhibitions_v(id) ON DELETE CASCADE,
  id        uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_id  integer REFERENCES media(id),
  caption   varchar
);
CREATE INDEX IF NOT EXISTS _exh_v_install_parent_idx ON _exhibitions_v_version_installation_images(_parent_id);
