# MEMORY.md - Critical Standards

## Content Generation - Language Standard (CRITICAL)

**Rule #1: ALL articles MUST be written in ENGLISH**

This is non-negotiable. The website ain-china.com targets international English-speaking readers.

### Why This Matters
- April 2, 2026: Generated Chinese article by mistake → User corrected me
- April 3, 2026: Generated Chinese article again → User corrected me again  
- **Pattern identified**: When source data is Chinese, I default to Chinese output

### Prevention Checklist (Run before publishing)

Before finalizing ANY article:

1. [ ] **Title is in English**
2. [ ] **Article body is 90%+ English**
3. [ ] **Only social media comments section contains Chinese** (with translations)
4. [ ] **All data tables have English headers**
5. [ ] **Frontmatter excerpt is in English**

If any check fails → REWRITE immediately.

### Source vs Output Language

| Source Data Language | Output Must Be |
|---------------------|----------------|
| Chinese news | English article |
| English reports | English article |
| Mixed sources | English article |

**Never** write article body in Chinese.

---

## Benchmark Article Analysis (MUST READ BEFORE WRITING)

Before generating new content, mentally reference these标杆 articles:

### MiniMax Talkie Article (Gold Standard)
```
Slug: minimax-talkie
Word Count: ~3,400 words
Sections: 9 deep-dive sections
Data Tables: 8 structured tables
Social Comments: 6 bilingual comments
Images: 3 (hero + 2 inline)
Reading Time: 16 minutes
Tone: Analytical + storytelling
Depth: Funding, tech, user feedback, global implications
```

### Doubao ByteDance Article (Gold Standard)
```
Slug: doubao-bytedance
Word Count: ~3,200 words
Sections: 8 sections
Data Tables: 8 tables
Social Comments: 6 comments
Images: 3
Reading Time: 15 minutes
Tone: Professional journalism
Depth: Ecosystem integration, user workflow, business model
```

### AI Thesis Writing Article (Gold Standard)
```
Slug: ai-thesis-writing-china
Word Count: ~3,400 words
Sections: 9 sections
Data Tables: 9 tables
Social Comments: 6 comments
Images: 3
Reading Time: 16 minutes
Tone: Phenomenon analysis + data-driven
Depth: User behavior, tools comparison, social commentary
```

---

## Quality Standards Checklist (BEFORE PUBLISHING)

### Length & Depth
- [ ] **Word count: 2,800 - 3,500 words** (check with wc command)
- [ ] **8-9 sections minimum** (H2 headings count)
- [ ] **Each section has substance** (not just bullet points)
- [ ] **Reading time: 14-18 minutes** stated in frontmatter

### Data & Analysis
- [ ] **6-8 structured tables** with proper headers
- [ ] **Original analysis** (not just news summary)
- [ ] **Comparative metrics** (vs competitors)
- [ ] **User/real-world data** (not just company claims)

### Visual Content
- [ ] **Hero image** (1200x600, Unsplash AI/tech themed)
- [ ] **2-3 inline images** (800x400, placed between sections)
- [ ] **All images have captions** (*italicized text below image*)
- [ ] **Image alt text** descriptive for SEO

### Social Media Comments
- [ ] **6 comments total**
- [ ] **Mixed sources**: Zhihu, Xiaohongshu, Weibo, Twitter/X, Douban, GitHub
- [ ] **Bilingual format**: Chinese quote + English translation
- [ ] **Diverse viewpoints**: Positive, skeptical, analytical
- [ ] **Engagement metrics**: 👍 ❤️ 🔁 ⭐ counts shown

### SEO Optimization
- [ ] **Meta title**: < 60 chars, includes main keyword
- [ ] **Meta description**: 150-160 chars, compelling
- [ ] **Keywords**: 8-10 relevant terms in meta
- [ ] **JSON-LD structured data**: TechArticle schema
- [ ] **URL slug**: kebab-case, keyword-rich
- [ ] **Related articles**: 4 internal links at bottom

### Content Structure
- [ ] **Compelling headline** with data hook ($X billion, XX million users)
- [ ] **Executive summary** at top (key metrics table)
- [ ] **"Why This Matters"** section explaining global significance
- [ ] **User voices/social comments** section
- [ ] **Competitive analysis** table
- [ ] **Future outlook** with milestones
- [ ] **Conclusion** with key insight
- [ ] **Disclaimer** at bottom

---

## Automated Verification Protocol (When User Says "Check Ainchina")

When user asks to **"检查 ainchina 发布项目"** or **"check ainchina"** or similar, execute the following **5-Point Inspection** automatically without asking for confirmation:

### Point 1: Language Check (CRITICAL)
```bash
# Check last few commits for Chinese content
git log --oneline -5 | head -5
grep -r "[\u4e00-\u9fff]" content/posts/*.md 2>/dev/null | head -3
```
- ❌ **If Chinese found in article body** → Report: "⚠️ 中文内容检测到"
- ✅ **If only social comments have Chinese** → Pass

### Point 2: Image Check
```bash
# Check inline images in latest article
grep -c "images.unsplash.com" app/blog/\[slug\]/page.js
grep "w=800" app/blog/\[slug\]/page.js | wc -l
```
- ❌ **If < 3 inline images** → Report: "⚠️ 缺少inline图片 (应有3张)"
- ✅ **If 3+ inline images with captions** → Pass

### Point 3: Publication Status
```bash
# Check if article is live
ls -t content/posts/*.md | head -1
curl -s -o /dev/null -w "%{http_code}" https://www.ainchina.com/blog/$(ls -t content/posts/*.md | head -1 | xargs basename -s .md)
```
- ❌ **If HTTP != 200** → Report: "⚠️ 文章未发布或无法访问"
- ✅ **If HTTP 200** → Pass

### Point 4: File Update Completeness
```bash
# Check if all 3 files were updated
SLUG=$(ls -t content/posts/*.md | head -1 | xargs basename -s .md)
grep -q "$SLUG" app/blog/\[slug\]/page.js && echo "✅ page.js" || echo "❌ page.js missing"
grep -q "$SLUG" app/blog/page.js && echo "✅ list page" || echo "❌ list page missing"
grep -q "$SLUG" lib/posts-meta.js && echo "✅ meta" || echo "❌ meta missing"
```
- ❌ **If any file missing** → Report: "⚠️ 未更新所有3个必需文件"
- ✅ **All 3 files updated** → Pass

### Point 5: Git History Pollution
```bash
# Check if reports were accidentally committed
git log --oneline -3 | grep -E "report|log|wechat"
git ls-files | grep -E "reports/|\.log$"
```
- ❌ **If reports/logs found** → Report: "⚠️ Git历史被污染"
- ✅ **Clean** → Pass

### Response Format
Always respond with:
```
## 🔍 Ainchina 发布检查报告

| 检查项 | 状态 | 详情 |
|--------|------|------|
| 语言 | ✅/❌ | 英文/中文检测到 |
| 图片 | ✅/❌ | X张inline图片 |
| 发布 | ✅/❌ | HTTP 200/404 |
| 文件 | ✅/❌ | 3/3 文件已更新 |
| Git | ✅/❌ | 干净/被污染 |

**总结**: X/5 通过
[如有问题] 建议修复: ...
```

---

## Quick Fix Commands (Reference)

If issues found, execute without asking:

**Fix missing images** → Add 3 Unsplash images with captions
**Fix Chinese content** → Rewrite in English immediately
**Fix missing file updates** → Update page.js, list page, meta
**Fix Git pollution** → git rm --cached reports/* && commit

---

- **CONTENT_STANDARDS.md** - Full quality guidelines
- **ainchina-agents/reports/** - Daily market briefs (may be in Chinese)
- **content/posts/** - Published articles
- **ainchina-hello/app/blog/** - Next.js blog implementation

---

## Sitemap Auto-Generation (IMPLEMENTED - April 6, 2026)

**CRITICAL: Sitemap must be updated for every new article**

### Background (Why This Exists)
- April 6, 2026: Discovered sitemap.xml was **6 days outdated**
- Only 9 URLs in sitemap vs 14+ actual articles
- Google couldn't discover new content → zero organic traffic
- **This was why traffic dropped after launch**

### Implementation
**Automated script created:**
- Script: `scripts/generate-sitemap.js`
- Reads from: `lib/posts-meta.js`
- Outputs to: `public/sitemap.xml`
- Auto-runs: Before every `npm run build` (prebuild hook)

### Usage

**Automatic (Default):**
```bash
# Sitemap auto-generates before build
npm run build
```

**Manual (if needed):**
```bash
cd /root/.openclaw/workspace/ainchina-hello
npm run sitemap
```

### Current Workflow (After Publishing Article)
1. Write article → Save to `content/posts/`
2. Update `lib/posts-meta.js` with new article
3. **Run `npm run sitemap`** to regenerate sitemap
4. Git add, commit, push
5. Sitemap automatically deployed with site

### Verification
```bash
cd /root/.openclaw/workspace/ainchina-hello
npm run sitemap
# Should output:
# 📚 找到 X 篇文章
# ✅ Sitemap 生成成功!
```

### Current Sitemaps

| Type | URL | Status |
|------|-----|--------|
| XML Sitemap | `https://www.ainchina.com/sitemap.xml` | ✅ Auto-generated |
| HTML Sitemap | `https://www.ainchina.com/sitemap` | ✅ User-friendly page |

---

## Daily Workflow (Cron at 4:15 AM)

When woken by cron:
1. **READ THIS MEMORY.MD** (language + benchmark standards)
2. Read reports from `/ainchina-agents/reports/`
3. Execute kimi_search for latest Chinese AI news
4. **MENTALLY REFERENCE MiniMax/Doubao article structure**
5. Write article in ENGLISH following ALL checklists above
6. **RUN FULL QUALITY CHECKLIST** (length, depth, images, SEO)
7. Save to `content/posts/`
8. **Update ONLY `lib/posts-meta.js`** (homepage/blog auto-sync from here)
9. **RUN `npm run sitemap`** (auto-generates sitemap.xml)
10. `npm run build` (builds with auto-synced homepage/blog)
11. Git add, commit, push
12. Verify deployment

**Note**: As of April 21, 2026, do NOT manually update `app/page.js` or `app/blog/page.js`. Both pages auto-import from `lib/posts-meta.js`.

---

## Mistake Log

### 2026-04-02
- **Error**: Generated Chinese article
- **Impact**: User had to manually rewrite
- **Fix**: Re-wrote in English

### 2026-04-03  
- **Error**: Generated Chinese article again
- **Impact**: User frustration, pattern identified
- **Fix**: Re-wrote in English, created this MEMORY.md

### 2026-04-21
- **Error**: Homepage showing old articles (March 31) instead of latest (April 21)
- **Impact**: User had to manually ask to fix sorting
- **Root Cause**: `app/page.js` had hardcoded article array with outdated entries
- **Fix**: Refactored to auto-import from `lib/posts-meta.js`, added sort by date
- **Side Effect**: Blog page also refactored to use single source of truth

---

## User Preferences

- **Content Language**: English only
- **Quality Standard**: Match MiniMax/Doubao articles exactly
- **Execution Mode**: Direct (no subagents for content generation)
- **Wake Mechanism**: Cron job at 4:15 AM daily
- **Verification**: Run full checklist before every publish

---

*Last updated: April 21, 2026*
*Critical Rules: 1 (Language)*
*Quality Checks: 25 items*
*Benchmark Articles: 3*
*Auto-sync: Homepage + Blog page (single source of truth)*

---

## Publishing Workflow (UPDATED April 9, 2026)

### New Requirement: Follow Checklist for Every Publish

**From today onwards, EVERY article publish must follow the PUBLISH-CHECKLIST.md**

Goal: **Automated daily publishing at 4:15 AM that actually works without errors**

### Publishing Checklist Location
- **File**: `ainchina-hello/PUBLISH-CHECKLIST.md`
- **Usage**: Complete all checkboxes before considering publish complete
- **Final Step**: Browser verification of live article

### Quality Benchmarking
Before publishing, compare against gold standard articles:
- **MiniMax Talkie** (~3,400 words, 8 tables, 3 images)
- **Doubao ByteDance** (~3,200 words, 8 tables, 3 images)
- **AI Thesis Writing** (~3,400 words, 9 tables, 3 images)

**Each new article must match this depth and quality.**

### Browser Verification (NEW)
After every publish, verify online:
1. [ ] Visit https://www.ainchina.com/blog/[slug] - must return 200
2. [ ] Visit https://www.ainchina.com/blog - article appears in list
3. [ ] Check images load correctly (no broken images)
4. [ ] Check no duplicate articles
5. [ ] Verify formatting (tables, headers, lists display correctly)

### Automation Goal
- **Target**: Daily 4:15 AM cron job generates and publishes article automatically
- **Success Criteria**: Zero manual intervention needed, 100% success rate
- **Current Status**: Semi-automatic (content generation automated, publishing needs checklist)

---

## Self-Sufficient Token Handling (DO NOT ASK USER)

**Vercel Token issues**: I can check these myself without asking user

### Check if Token is available:
```bash
# Check environment
env | grep VERCEL_TOKEN

# Check if Vercel CLI is logged in
vercel whoami

# Check project link
cat .vercel/project.json 2>/dev/null || cat ainchina-hello/.vercel/project.json 2>/dev/null
```

### If Token missing:
- **DO NOT ask user for token**
- **DO NOT say "I need token"**
- Instead: Proceed with Git-based deployment (GitHub→Vercel auto-deploy)
- Or: Use curl with GitHub Actions API if available

### Key Insight:
Vercel has **GitHub Integration** - pushing to main automatically deploys.
**NO TOKEN NEEDED for basic deployment.**

Token only needed for:
- Vercel API calls (traffic analytics)
- Edge function management
- Custom domain config

**For article publishing: Git push is sufficient.**

---

## Website Architecture - Single Source of Truth (April 21, 2026)

**Problem**: Multiple hardcoded article arrays across files caused maintenance headaches:
- `app/page.js` - Homepage articles (hardcoded)
- `app/blog/page.js` - Blog list articles (hardcoded)
- `lib/posts-meta.js` - Metadata (used by article detail pages only)

**Solution**: Refactored to single source of truth:
- `lib/posts-meta.js` - ONLY source of article metadata, auto-sorted by date
- `app/page.js` - Imports from posts-meta, shows latest 6
- `app/blog/page.js` - Imports from posts-meta, shows all
- `app/blog/[slug]/page.js` - SEO metadata (still per-article, but can be refactored later)

**Publishing workflow** (simplified April 21, 2026):
1. Write article → `content/posts/[slug].md`
2. Add metadata → `lib/posts-meta.js`
3. `npm run sitemap`
4. `npm run build`
5. `git add -A && git commit && git push origin main`
6. ✅ Homepage + blog list auto-sync from posts-meta.js

**Key file relationships**:
```
lib/posts-meta.js (single source)
    ├── app/page.js (latest 6)
    └── app/blog/page.js (all articles)

content/posts/*.md (article content)
    └── app/blog/[slug]/page.js (detail pages)
```

---

*Last updated: April 4, 2026*
*Critical Rules: 1 (Language)*
*Quality Checks: 25 items*
*Benchmark Articles: 3*
*Automated Checks: 5-Point Protocol*
