-- Add exhibitions_labels array table
CREATE TABLE IF NOT EXISTS exhibitions_labels (
  id SERIAL PRIMARY KEY,
  _order INTEGER NOT NULL,
  _parent_id INTEGER NOT NULL REFERENCES exhibitions(id) ON DELETE CASCADE,
  artist_name VARCHAR,
  content JSONB,
  audio_caption VARCHAR,
  audio_url VARCHAR
);

CREATE INDEX IF NOT EXISTS exhibitions_labels_order_idx ON exhibitions_labels(_order);
CREATE INDEX IF NOT EXISTS exhibitions_labels_parent_id_idx ON exhibitions_labels(_parent_id);

-- Version table
CREATE TABLE IF NOT EXISTS _exhibitions_v_version_labels (
  id SERIAL PRIMARY KEY,
  _order INTEGER NOT NULL,
  _parent_id INTEGER NOT NULL REFERENCES _exhibitions_v(id) ON DELETE CASCADE,
  artist_name VARCHAR,
  content JSONB,
  audio_caption VARCHAR,
  audio_url VARCHAR
);

CREATE INDEX IF NOT EXISTS _exhibitions_v_version_labels_order_idx ON _exhibitions_v_version_labels(_order);
CREATE INDEX IF NOT EXISTS _exhibitions_v_version_labels_parent_id_idx ON _exhibitions_v_version_labels(_parent_id);
