-- Update Over My Head exhibition document URLs
UPDATE exhibitions_documents
SET url = '/exhibitions/over-my-head/labels'
WHERE label = 'View exhibition labels';

UPDATE exhibitions_documents
SET url = 'https://cdn.prod.website-files.com/66c514ae86960645a8afed7d/68def53fd5043a3fe9fbf56f_omh_exhibitionchecklist_20251002_print_imposed.pdf'
WHERE label = 'Exhibition checklist';

UPDATE exhibitions_documents
SET url = 'https://cdn.prod.website-files.com/66c514ae86960645a8afed7d/68cc60477b0c257a09562450_omh_archivechecklist_20250917_print.pdf'
WHERE label = 'View archival checklist';

-- Verify
SELECT label, url FROM exhibitions_documents ORDER BY _order;
