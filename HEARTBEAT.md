# HEARTBEAT.md

## Daily Content Generation Task (4:15 AM)

When woken by cron at 4:15 AM for content generation:

### Phase 0: CRITICAL PATH — File Location (Do NOT Skip)

**Article MUST be saved to**: `ainchina-hello/content/posts/[YYYY-MM-DD-slug].md`

**Git operations MUST run in**: `cd /root/.openclaw/workspace/ainchina-hello`

**NEVER save to**: `content/xxx.md` (workspace root — this is the WRONG location)

**Why**: The website reads from `ainchina-hello/content/posts/`. The workspace root `content/` is for ainchina-agents reports, NOT for website articles.

### Phase 1: Preparation (MANDATORY)
- [ ] Read MEMORY.md for critical standards
- [ ] Reference benchmark: MiniMax Talkie article structure
- [ ] Reference benchmark: Doubao ByteDance article depth
- [ ] Remember: **ALL content must be in ENGLISH**

### Phase 2: Writing Standards

#### Language (CRITICAL - Zero Tolerance)
- [ ] Title is English
- [ ] Body is 90%+ English  
- [ ] Only social comments contain Chinese (with translations)
- [ ] Tables have English headers

#### Length & Depth (vs MiniMax/Doubao)
- [ ] Word count: 2,800-3,500
- [ ] 8-9 sections (H2 headings)
- [ ] 6-8 data tables
- [ ] Reading time: 14-18 minutes

#### Visual Content (Match Benchmark)
- [ ] Hero image (1200x600) — **每篇文章使用不同的 Unsplash 图片**
- [ ] 2-3 inline images (800x400) — **与 hero 不同，且不与近期文章重复**
- [ ] All images have captions
- [ ] 6 bilingual social comments

#### Image Anti-Duplication Rules (NEW — AdSense Quality)
- [ ] **Hero image**: Must be a NEW Unsplash image not used in last 30 days
- [ ] **Inline images**: Must differ from hero and from each other
- [ ] **Image pool**: Reference `ainchina-agents/references/image-pool.json` for available images
- [ ] **Rotation**: Do NOT reuse the same 5-10 images across all articles
- [ ] **Why this matters**: AdSense flagged "low quality content" due to image repetition across articles

#### SEO (Full Optimization)
- [ ] Meta title < 60 chars
- [ ] Meta description 150-160 chars
- [ ] 8-10 keywords
- [ ] JSON-LD structured data (injected by page.js, NOT in markdown)
- [ ] 4 related article links (use `/blog/slug/` format)

#### CRITICAL: Do NOT Include in Markdown
- [ ] NO `<script type="application/ld+json">` tags in markdown body
- [ ] NO raw HTML `<script>` tags
- [ ] NO `"@context": "https://schema.org"` text blocks
- [ ] Related article links use `/blog/slug/` NOT `/posts/slug`

### Phase 3: Final Verification

**If ANY check fails → STOP and fix before publishing**

Run command: `wc -w < article.md>` to check word count

### Phase 4: Deployment (CRITICAL — Follow Exact Steps)

**Step 1 — Save article to CORRECT location:**
```bash
# File MUST be here:
/root/.openclaw/workspace/ainchina-hello/content/posts/[slug].md
# NOT here:
# /root/.openclaw/workspace/content/[slug].md  ❌ WRONG
```

**Step 2 — Update metadata files:**
```bash
cd /root/.openclaw/workspace/ainchina-hello
# Add entry to lib/posts-meta.js (allPosts array)
# Add entry to app/blog/[slug]/page.js (postMetadata object)
```

**Step 3 — Build and verify:**
```bash
cd /root/.openclaw/workspace/ainchina-hello
npm run sitemap
npm run build
# Verify: ls dist/blog/[slug]/ should show index.html
```

**Step 4 — Git operations in CORRECT repo:**
```bash
cd /root/.openclaw/workspace/ainchina-hello  # NOT workspace root
git add -A
git commit -m "feat: [date] - [article title]"
git push origin main
```

**Step 5 — Post-deploy verification (MANDATORY):**
```bash
# Wait 45s for Vercel
sleep 45
# Check HTTP 200
curl -s -o /dev/null -w "%{http_code}" https://www.ainchina.com/blog/[slug]/
# Check homepage shows article
curl -s https://www.ainchina.com/ | grep -c "[slug]"
# Check NO raw JSON-LD text in body
curl -s https://www.ainchina.com/blog/[slug]/ | grep -c '"@context"'
# Should return: 0 (or 1 if it's in head, which is OK)
```

**Step 6 — Report to user:**
- Article URL
- Git commit hash
- HTTP status
- Any issues found

---

## Sitemap Auto-Generation

**New articles automatically included** via `npm run sitemap`:
- Script reads from `lib/posts-meta.js`
- Generates `public/sitemap.xml`
- Runs automatically before `npm run build`

**Manual run if needed:**
```bash
cd /root/.openclaw/workspace/ainchina-hello
npm run sitemap
```

---

**REMEMBER: User expects MiniMax/Doubao quality. Do not compromise.**
