-- =====================================================
-- Database Migration: Translation + Source URL Support
-- Project: europe-train-status
-- Date: 2026-04-23
-- =====================================================

-- =====================================================
-- STEP 1: Add translation fields to disruptions table
-- =====================================================

ALTER TABLE disruptions ADD COLUMN translated_title TEXT;
ALTER TABLE disruptions ADD COLUMN translated_description TEXT;
ALTER TABLE disruptions ADD COLUMN translated_at TIMESTAMP NULL;
ALTER TABLE disruptions ADD COLUMN translation_engine TEXT DEFAULT 'agent';
ALTER TABLE disruptions ADD COLUMN translation_status TEXT DEFAULT 'pending';
ALTER TABLE disruptions ADD COLUMN source_url VARCHAR(2048);

-- =====================================================
-- STEP 2: Create operator URL templates table
-- =====================================================

CREATE TABLE IF NOT EXISTS operator_url_templates (
    operator_code TEXT PRIMARY KEY,
    operator_name TEXT NOT NULL,
    base_url VARCHAR(2048) NOT NULL,
    detail_url_pattern VARCHAR(2048),     -- supports {id} placeholder, NULL = no detail page
    fallback_url VARCHAR(2048) NOT NULL,  -- disruptions overview page
    has_detail_page BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- STEP 3: Insert 6 operator records
-- =====================================================

INSERT OR REPLACE INTO operator_url_templates 
(operator_code, operator_name, base_url, detail_url_pattern, fallback_url, has_detail_page) 
VALUES 
('DB', 'Deutsche Bahn', 
 'https://www.bahn.de', 
 NULL, 
 'https://www.bahn.de/service/fahrplaene/aktuell/baustellen.html', 
 0),

('NS', 'Nederlandse Spoorwegen', 
 'https://www.ns.nl', 
 'https://www.ns.nl/reisinformatie/storingen-en-werkzaamheden/{id}', 
 'https://www.ns.nl/en/travel-information/disruptions-and-engineering-works.html', 
 1),

('NationalRail', 'National Rail (UK)', 
 'https://www.nationalrail.co.uk', 
 NULL, 
 'https://www.nationalrail.co.uk/service_disruptions/', 
 0),

('SBB', 'Swiss Federal Railways', 
 'https://www.sbb.ch', 
 NULL, 
 'https://www.sbb.ch/en/travel-information/current-situation.html', 
 0),

('Trenitalia', 'Trenitalia (Italy)', 
 'https://www.trenitalia.com', 
 NULL, 
 'https://www.trenitalia.com/en/trenitalia_news.html', 
 0),

('OEBB', 'Oesterreichische Bundesbahnen', 
 'https://www.oebb.at', 
 NULL, 
 'https://www.oebb.at/de/reiseplanung/baustellen', 
 0);

-- =====================================================
-- STEP 4: Backfill existing records
-- =====================================================

-- Mark existing records as needing translation
UPDATE disruptions 
SET translation_status = 'pending' 
WHERE translated_title IS NULL 
  AND translated_description IS NULL
  AND translation_status IS NULL;

-- Mark records that already have translations as done
UPDATE disruptions 
SET translation_status = 'done',
    translation_engine = 'agent'
WHERE translated_title IS NOT NULL 
  AND translated_description IS NOT NULL;

-- =====================================================
-- STEP 5: Index for performance
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_disruptions_translation_status 
ON disruptions(translation_status);

CREATE INDEX IF NOT EXISTS idx_disruptions_source_url 
ON disruptions(source_url);

CREATE INDEX IF NOT EXISTS idx_disruptions_operator_code 
ON disruptions(operator_code);
