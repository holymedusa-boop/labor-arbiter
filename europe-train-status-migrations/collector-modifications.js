/**
 * =====================================================
 * Collector Modifications - Source URL Capture
 * Project: europe-train-status/backend/dist/
 * Date: 2026-04-23
 * =====================================================
 * 
 * This file shows the changes needed in each collector.
 * Q🦐 should apply these modifications to his actual collector files.
 */

// =====================================================
// PUPPETEER COLLECTORS (DB, NationalRail, SBB, Trenitalia)
// =====================================================

/**
 * Add source_url capture in your Puppeteer scraper.
 * Example for DB collector - apply same pattern to all 4.
 */
async function scrapeDBDisruptions(page, db) {
    await page.goto('https://www.bahn.de/service/fahrplaene/aktuell/baustellen.html', {
        waitUntil: 'networkidle2'
    });

    // CAPTURE SOURCE URL - ADD THIS LINE
    const sourceUrl = page.url();

    const disruptions = await page.evaluate(() => {
        // ... your existing scraping logic ...
        const items = document.querySelectorAll('.disruption-item');
        return Array.from(items).map(item => ({
            title: item.querySelector('.title')?.textContent?.trim(),
            description: item.querySelector('.description')?.textContent?.trim(),
            // ... other fields ...
        }));
    });

    // Store disruptions with source_url - MODIFY YOUR INSERT
    for (const disruption of disruptions) {
        await db.run(`
            INSERT INTO disruptions 
            (title, description, operator_code, source_url, translation_status, created_at)
            VALUES (?, ?, ?, ?, 'pending', datetime('now'))
        `, [
            disruption.title,
            disruption.description,
            'DB',
            sourceUrl  // <-- ADD THIS
        ]);
    }
}

// =====================================================
// NS API COLLECTOR
// =====================================================

/**
 * NS API returns disruption data with IDs.
 * We attempt to construct a detail page URL.
 * If it 404s, fallback to overview page.
 */
async function fetchNSDisruptions(db) {
    const response = await fetch('https://api.ns.nl/reisinformatie-api/api/v3/disruptions', {
        headers: {
            'Ocp-Apim-Subscription-Key': process.env.NS_API_KEY
        }
    });
    const data = await response.json();

    for (const disruption of data) {
        // NS API structure: disruption.id is the unique identifier
        const nsId = disruption.id;
        
        // Construct potential detail URL
        const detailUrl = `https://www.ns.nl/reisinformatie/storingen-en-werkzaamheden/${nsId}`;
        
        // Store with detail URL - verify this works before relying on it
        await db.run(`
            INSERT INTO disruptions 
            (title, description, operator_code, source_url, translation_status, created_at)
            VALUES (?, ?, ?, ?, 'pending', datetime('now'))
        `, [
            disruption.titel || disruption.title,
            disruption.beschrijving || disruption.description,
            'NS',
            detailUrl  // <-- ADD THIS
        ]);
    }
}

// =====================================================
// OEBB HAFAS API COLLECTOR
// =====================================================

/**
 * OEBB HAFAS API typically doesn't provide detail page URLs.
 * Use fallback URL from operator_url_templates table.
 */
async function fetchOEBBDisruptions(db) {
    // HAFAS API call - adjust to your actual implementation
    const response = await fetch('https://hafas.oebb.at/bin/mgate.exe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            // ... your HAFAS request body ...
        })
    });
    const data = await response.json();

    // Get fallback URL from templates
    const template = await db.get(
        'SELECT fallback_url FROM operator_url_templates WHERE operator_code = ?',
        ['OEBB']
    );

    for (const disruption of data.disruptions || []) {
        await db.run(`
            INSERT INTO disruptions 
            (title, description, operator_code, source_url, translation_status, created_at)
            VALUES (?, ?, ?, ?, 'pending', datetime('now'))
        `, [
            disruption.title,
            disruption.description,
            'OEBB',
            template.fallback_url  // <-- ADD THIS
        ]);
    }
}

// =====================================================
// HELPER: Resolve source_url with fallback logic
// =====================================================

/**
 * Use this function when displaying disruptions to get the correct URL.
 */
async function resolveSourceUrl(db, disruption) {
    if (disruption.source_url) {
        return disruption.source_url;
    }

    // Fallback to operator template
    const template = await db.get(
        'SELECT fallback_url FROM operator_url_templates WHERE operator_code = ?',
        [disruption.operator_code]
    );

    return template?.fallback_url || null;
}
