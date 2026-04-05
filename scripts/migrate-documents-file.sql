-- Add file upload field to exhibitions_documents
ALTER TABLE exhibitions_documents
  ADD COLUMN IF NOT EXISTS file_id INTEGER REFERENCES media(id) ON DELETE SET NULL;

-- Add to version table
ALTER TABLE _exhibitions_v_version_documents
  ADD COLUMN IF NOT EXISTS file_id INTEGER REFERENCES media(id) ON DELETE SET NULL;

-- Make url nullable (it was required before, now file takes precedence)
ALTER TABLE exhibitions_documents
  ALTER COLUMN url DROP NOT NULL;

ALTER TABLE _exhibitions_v_version_documents
  ALTER COLUMN url DROP NOT NULL;
