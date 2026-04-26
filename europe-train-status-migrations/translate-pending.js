/**
 * =====================================================
 * Translation Script - Agent Local Translation
 * Project: europe-train-status/backend/dist/
 * Date: 2026-04-23
 * =====================================================
 * 
 * This script scans for pending translations and processes them
 * using the agent's built-in translation capability.
 * 
 * Usage: node translate-pending.js [--batch-size=10] [--dry-run]
 */

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// =====================================================
// CONFIGURATION
// =====================================================

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../data/disruptions.db');
const BATCH_SIZE = parseInt(process.argv.find(a => a.startsWith('--batch-size='))?.split('=')[1]) || 10;
const DRY_RUN = process.argv.includes('--dry-run');

// =====================================================
// LANGUAGE DETECTION - Skip English content
// =====================================================

/**
 * Quick heuristic to detect if text is already English.
 * Returns true if text appears to be English (mostly ASCII characters).
 */
function isEnglish(text) {
    if (!text || text.trim().length === 0) return true;
    
    // Count non-ASCII characters (basic heuristic)
    const nonAsciiCount = (text.match(/[^\x00-\x7F]/g) || []).length;
    const totalChars = text.length;
    
    // If less than 5% non-ASCII, consider it English
    return (nonAsciiCount / totalChars) < 0.05;
}

// =====================================================
// TRANSLATION FUNCTION - Agent-powered
// =====================================================

/**
 * Translate text using agent's built-in capability.
 * Q🦐 replaces this with his actual translation function.
 * 
 * @param {string} text - Original text to translate
 * @param {string} sourceLang - Source language hint (e.g., 'de', 'nl')
 * @returns {Promise<string|null>} - Translated text or null if failed
 */
async function translateText(text, sourceLang = null) {
    try {
        // TODO: Q🦐 - Replace with your actual agent translation call
        // Example integration:
        // const result = await agent.translate(text, { from: sourceLang, to: 'en' });
        // return result.translatedText;
        
        // Placeholder - simulates translation
        console.log(`  [TRANSLATE] "${text.substring(0, 50)}..." (${sourceLang || 'auto'} -> en)`);
        
        // In production, this should call the agent's translation API
        // For now, return null to indicate "not yet implemented"
        return null;
        
    } catch (error) {
        console.error(`  [ERROR] Translation failed: ${error.message}`);
        return null;
    }
}

// =====================================================
// MAIN TRANSLATION LOOP
// =====================================================

async function runTranslation() {
    console.log('========================================');
    console.log('Agent Translation Script');
    console.log(`DB: ${DB_PATH}`);
    console.log(`Batch Size: ${BATCH_SIZE}`);
    console.log(`Dry Run: ${DRY_RUN}`);
    console.log('========================================\n');

    const db = new sqlite3.Database(DB_PATH);
    
    // Promisify database methods
    const dbAll = (sql, params) => new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => err ? reject(err) : resolve(rows));
    });
    
    const dbRun = (sql, params) => new Promise((resolve, reject) => {
        db.run(sql, params, function(err) {
            err ? reject(err) : resolve({ lastID: this.lastID, changes: this.changes });
        });
    });

    try {
        // Count pending translations
        const pendingCount = await dbAll(
            `SELECT COUNT(*) as count FROM disruptions WHERE translation_status = 'pending'`
        );
        console.log(`Pending translations: ${pendingCount[0].count}`);

        if (pendingCount[0].count === 0) {
            console.log('Nothing to translate. Exiting.');
            return;
        }

        // Fetch batch of pending records
        const pending = await dbAll(
            `SELECT id, title, description, operator_code 
             FROM disruptions 
             WHERE translation_status = 'pending'
             LIMIT ?`,
            [BATCH_SIZE]
        );

        console.log(`Processing ${pending.length} records...\n`);

        let translated = 0;
        let skipped = 0;
        let failed = 0;

        for (const record of pending) {
            console.log(`[${record.id}] ${record.operator_code}: "${record.title?.substring(0, 60)}..."`);

            // Detect if already English
            const titleIsEnglish = isEnglish(record.title);
            const descIsEnglish = isEnglish(record.description);

            if (titleIsEnglish && descIsEnglish) {
                console.log('  -> Already English, marking done');
                skipped++;
                
                if (!DRY_RUN) {
                    await dbRun(
                        `UPDATE disruptions 
                         SET translation_status = 'done',
                             translated_title = title,
                             translated_description = description,
                             translated_at = datetime('now'),
                             translation_engine = 'agent'
                         WHERE id = ?`,
                        [record.id]
                    );
                }
                continue;
            }

            // Translate title
            let translatedTitle = null;
            if (!titleIsEnglish && record.title) {
                translatedTitle = await translateText(record.title, record.operator_code);
            } else if (record.title) {
                translatedTitle = record.title;
            }

            // Translate description
            let translatedDesc = null;
            if (!descIsEnglish && record.description) {
                translatedDesc = await translateText(record.description, record.operator_code);
            } else if (record.description) {
                translatedDesc = record.description;
            }

            if (!DRY_RUN) {
                if (translatedTitle || translatedDesc) {
                    await dbRun(
                        `UPDATE disruptions 
                         SET translated_title = ?,
                             translated_description = ?,
                             translated_at = datetime('now'),
                             translation_status = 'done',
                             translation_engine = 'agent'
                         WHERE id = ?`,
                        [translatedTitle, translatedDesc, record.id]
                    );
                    translated++;
                    console.log('  -> Translated and saved');
                } else {
                    await dbRun(
                        `UPDATE disruptions 
                         SET translation_status = 'failed',
                             translation_engine = 'failed',
                             translated_at = datetime('now')
                         WHERE id = ?`,
                        [record.id]
                    );
                    failed++;
                    console.log('  -> Translation failed, marked');
                }
            }
        }

        console.log('\n========================================');
        console.log('Translation Batch Complete');
        console.log(`Translated: ${translated}`);
        console.log(`Skipped (English): ${skipped}`);
        console.log(`Failed: ${failed}`);
        console.log('========================================');

    } catch (error) {
        console.error('Fatal error:', error);
        process.exit(1);
    } finally {
        db.close();
    }
}

// =====================================================
// CRON / SCHEDULED MODE
// =====================================================

/**
 * For cron integration, use this wrapper:
 * 
 * # crontab -e
 * # Run translation every 30 minutes
 * */30 * * * * cd /path/to/project && node backend/dist/translate-pending.js --batch-size=20
 */

// Run if called directly
if (require.main === module) {
    runTranslation();
}

module.exports = { runTranslation, translateText, isEnglish };
