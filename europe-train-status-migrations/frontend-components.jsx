/**
 * =====================================================
 * Frontend Components - Source URL + Translation Display
 * Project: europe-train-status/frontend/
 * Date: 2026-04-23
 * =====================================================
 * 
 * React components for rendering disruptions with source links
 * and translated content. Q🦐 should integrate these into his
 * existing frontend components.
 */

import React from 'react';

// =====================================================
// COMPONENT 1: Source URL Link
// =====================================================

/**
 * Renders a "View Source" link for a disruption.
 * Shows only if source_url exists.
 * Opens in new tab with proper security attributes.
 */
export function SourceLink({ sourceUrl, operatorCode }) {
    if (!sourceUrl) return null;

    // Determine link text based on operator
    const linkText = getLinkText(operatorCode);

    return (
        <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
            title={`View on ${operatorCode} official website`}
        >
            <span className="source-link-icon">🔗</span>
            {linkText}
        </a>
    );
}

/**
 * Get appropriate link text for each operator.
 * Browser-scraped operators show "View Operator Page"
 * since URLs are list pages, not detail pages.
 */
function getLinkText(operatorCode) {
    const detailPageOperators = ['NS'];
    
    if (detailPageOperators.includes(operatorCode)) {
        return 'View Detail';
    }
    return 'View Operator Page';
}

// =====================================================
// COMPONENT 2: Translated Content Display
// =====================================================

/**
 * Displays disruption title and description.
 * Shows translated version if available, falls back to original.
 * Includes visual indicator for translated content.
 */
export function DisruptionContent({ disruption }) {
    const { 
        title, 
        description, 
        translated_title, 
        translated_description,
        translation_status 
    } = disruption;

    const hasTranslation = translation_status === 'done' && translated_title;
    const displayTitle = hasTranslation ? translated_title : title;
    const displayDescription = hasTranslation ? translated_description : description;

    return (
        <div className="disruption-content">
            <h3 className="disruption-title">
                {displayTitle}
                {hasTranslation && (
                    <span className="translation-badge" title="Translated by agent">
                        EN
                    </span>
                )}
                {translation_status === 'failed' && (
                    <span className="translation-failed-badge" title="Translation failed">
                        ⚠️
                    </span>
                )}
            </h3>
            
            <p className="disruption-description">
                {displayDescription}
            </p>

            {/* Show original text if translated, with toggle option */}
            {hasTranslation && (
                <details className="original-text">
                    <summary>Original text</summary>
                    <p className="original-title">{title}</p>
                    <p className="original-description">{description}</p>
                </details>
            )}
        </div>
    );
}

// =====================================================
// COMPONENT 3: Full Disruption Card
// =====================================================

/**
 * Complete disruption card combining all features.
 * Use this as a reference for integrating into your existing list.
 */
export function DisruptionCard({ disruption }) {
    const { 
        id,
        operator_code,
        source_url,
        country_flag,
        created_at 
    } = disruption;

    return (
        <article className="disruption-card" data-operator={operator_code}>
            <div className="disruption-header">
                <span className="operator-badge">
                    {country_flag} {operator_code}
                </span>
                <time className="disruption-date">
                    {new Date(created_at).toLocaleDateString()}
                </time>
            </div>

            <DisruptionContent disruption={disruption} />

            <div className="disruption-footer">
                <SourceLink 
                    sourceUrl={source_url} 
                    operatorCode={operator_code} 
                />
                
                {disruption.translation_status === 'pending' && (
                    <span className="pending-badge">
                        Translation pending...
                    </span>
                )}
            </div>
        </article>
    );
}

// =====================================================
// CSS STYLES (Add to your CSS file)
// =====================================================

const styles = `
.disruption-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 16px;
    background: white;
}

.disruption-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.operator-badge {
    font-weight: 600;
    color: #333;
}

.disruption-date {
    color: #666;
    font-size: 0.9em;
}

.disruption-title {
    font-size: 1.2em;
    margin: 0 0 8px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.translation-badge {
    font-size: 0.7em;
    background: #e3f2fd;
    color: #1976d2;
    padding: 2px 6px;
    border-radius: 4px;
}

.translation-failed-badge {
    font-size: 0.8em;
}

.disruption-description {
    color: #555;
    line-height: 1.5;
    margin: 0 0 12px 0;
}

.original-text {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px dashed #ddd;
}

.original-text summary {
    cursor: pointer;
    color: #666;
    font-size: 0.9em;
}

.original-title {
    font-style: italic;
    color: #888;
    margin: 8px 0 4px 0;
}

.original-description {
    color: #888;
    font-size: 0.95em;
    margin: 0;
}

.disruption-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid #eee;
}

.source-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: #1976d2;
    text-decoration: none;
    font-size: 0.9em;
}

.source-link:hover {
    text-decoration: underline;
}

.source-link-icon {
    font-size: 0.9em;
}

.pending-badge {
    font-size: 0.85em;
    color: #ff9800;
    font-style: italic;
}
`;

// =====================================================
// HOOK: Use Disruptions with Translation
// =====================================================

/**
 * Custom hook for fetching disruptions with proper display fields.
 * Q🦐 should adapt this to his existing data fetching pattern.
 */
export function useDisruptions() {
    const [disruptions, setDisruptions] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('/api/disruptions')
            .then(res => res.json())
            .then(data => {
                // Ensure each disruption has display fields
                const processed = data.map(d => ({
                    ...d,
                    // Use translated fields if available
                    display_title: d.translated_title || d.title,
                    display_description: d.translated_description || d.description,
                    is_translated: d.translation_status === 'done'
                }));
                setDisruptions(processed);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch disruptions:', err);
                setLoading(false);
            });
    }, []);

    return { disruptions, loading };
}

// =====================================================
// EXAMPLE: Full Page Integration
// =====================================================

/**
 * Example of how to integrate into your existing page.
 */
export function DisruptionsPage() {
    const { disruptions, loading } = useDisruptions();

    if (loading) return <div>Loading...</div>;

    return (
        <div className="disruptions-page">
            <h1>European Train Disruptions</h1>
            
            <div className="disruptions-list">
                {disruptions.map(disruption => (
                    <DisruptionCard 
                        key={disruption.id} 
                        disruption={disruption} 
                    />
                ))}
            </div>

            <style>{styles}</style>
        </div>
    );
}
