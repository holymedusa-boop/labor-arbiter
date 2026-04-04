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

## Daily Workflow (Cron at 4:15 AM)

When woken by cron:
1. **READ THIS MEMORY.MD** (language + benchmark standards)
2. Read reports from `/ainchina-agents/reports/`
3. Execute kimi_search for latest Chinese AI news
4. **MENTALLY REFERENCE MiniMax/Doubao article structure**
5. Write article in ENGLISH following ALL checklists above
6. **RUN FULL QUALITY CHECKLIST** (length, depth, images, SEO)
7. Save to `content/posts/`
8. Git add, commit, push
9. Verify deployment

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

---

## User Preferences

- **Content Language**: English only
- **Quality Standard**: Match MiniMax/Doubao articles exactly
- **Execution Mode**: Direct (no subagents for content generation)
- **Wake Mechanism**: Cron job at 4:15 AM daily
- **Verification**: Run full checklist before every publish

---

*Last updated: April 3, 2026*
*Critical Rules: 1 (Language)*
*Quality Checks: 25 items*
*Benchmark Articles: 3*

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

*Last updated: April 4, 2026*
*Critical Rules: 1 (Language)*
*Quality Checks: 25 items*
*Benchmark Articles: 3*
*Automated Checks: 5-Point Protocol*
