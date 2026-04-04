# Daily Content Generation Workflow - Optimized

## Problem Analysis

### Issues Identified (April 4, 2026)
1. ❌ **Git History Pollution**: Daily reports were committed to main branch
2. ❌ **Missing Images**: Articles lacked inline images compared to benchmark articles
3. ❌ **Workflow Errors**: Same errors repeated daily (Chinese language, wrong file locations)

## Optimized Workflow

### Phase 1: Preparation (4:15 AM)
```
1. Read MEMORY.md for standards
2. Read HEARTBEAT.md for tasks
3. Check previous day's errors (avoid repetition)
```

### Phase 2: Content Generation
```
1. Search for latest Chinese AI news
2. Select topic with global significance
3. Write article following ALL quality standards:
   - ENGLISH only (CRITICAL)
   - 2,800-3,500 words
   - 8-9 sections (H2 headings)
   - 6-8 data tables
   - 3 inline images (not just hero)
   - 6 bilingual social comments
4. Update ALL three locations:
   - app/blog/[slug]/page.js (metadata + content)
   - app/blog/page.js (list entry)
   - lib/posts-meta.js (metadata)
```

### Phase 3: Quality Check (MANDATORY)
```
Before committing, verify:
□ Language: Article is 90%+ English
□ Images: 3 inline images added with captions
□ Length: 2,800-3,500 words (use wc -w)
□ Tables: 6-8 data tables
□ SEO: metaTitle < 60 chars, metaDescription 150-160 chars
□ Slug: URL-safe, kebab-case
□ Date: Correct format (April 4, 2026)
```

### Phase 4: Deployment
```
1. Git add only content files (reports are gitignored)
2. Commit with descriptive message
3. Push to main (Vercel auto-deploys)
4. Verify deployment at:
   https://www.ainchina.com/blog/{slug}
```

## Git Ignore Rules (Updated)

The following are now excluded from Git:
- `ainchina-agents/reports/*` - Daily execution reports
- `*.log` - Log files
- `.kimi/downloads/` - Temporary downloads
- `wechat-push-*.md` - WeChat drafts

## Common Errors & Prevention

| Error | Cause | Prevention |
|-------|-------|------------|
| Chinese article | Forgetting MEMORY.md Rule #1 | Checklist before writing |
| Missing images | Not following benchmark | Add 3 inline images minimum |
| Git pollution | Committing reports | .gitignore updated |
| Wrong file location | Not updating page.js | Update all 3 locations |
| Missing from list | Forgot blog/page.js | Checklist includes this |

## Files to Update (Always)

1. `app/blog/[slug]/page.js` - Add to postMetadata AND posts
2. `app/blog/page.js` - Add to posts array for listing
3. `lib/posts-meta.js` - Add to allPosts array

## Verification Checklist

After deployment, verify:
- [ ] Article accessible at /blog/{slug}
- [ ] Shows in blog list at /blog
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] SEO meta tags present

## Emergency Contacts

If workflow fails:
1. Check MEMORY.md for standards
2. Check this file for workflow
3. Do NOT commit reports to main