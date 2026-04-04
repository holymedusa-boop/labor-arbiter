# Daily Content Checklist

**Date:** ___________ **Topic:** _________________________

## Before Writing
- [ ] Read MEMORY.md (Language Rule #1: ENGLISH ONLY)
- [ ] Read this checklist
- [ ] Check yesterday's errors (don't repeat)

## Writing Phase
- [ ] Title is English
- [ ] Word count: 2,800-3,500 (check: `wc -w article.md`)
- [ ] 8-9 sections (H2 headings)
- [ ] 6-8 data tables
- [ ] 3 inline images with captions
- [ ] 6 bilingual social comments

## File Updates (CRITICAL - All 3 Required)
- [ ] `app/blog/[slug]/page.js` - postMetadata
- [ ] `app/blog/[slug]/page.js` - posts content
- [ ] `app/blog/page.js` - list entry
- [ ] `lib/posts-meta.js` - metadata

## Quality Check
- [ ] metaTitle < 60 chars
- [ ] metaDescription 150-160 chars
- [ ] Slug is URL-safe
- [ ] Date format: "April 4, 2026"
- [ ] Category matches existing categories

## Git (DO NOT commit reports)
- [ ] `git status` shows only content files
- [ ] No reports/ or .log files staged
- [ ] Commit message descriptive
- [ ] Push successful

## Verification
- [ ] https://www.ainchina.com/blog/{slug} loads
- [ ] Shows in https://www.ainchina.com/blog list
- [ ] Images display correctly

## Common Mistakes to AVOID
❌ Writing in Chinese
❌ Forgetting inline images
❌ Committing daily reports
❌ Missing blog list update
❌ Wrong file location

**Signed off by:** ___________ **Time:** ___________