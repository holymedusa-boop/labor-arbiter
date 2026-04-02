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

## Benchmark Quality Standards

Every article must match MiniMax/Doubao benchmark:

| Element | Requirement |
|---------|-------------|
| Word Count | 2,800 - 3,500 words |
| Sections | 8-9 deep-dive sections |
| Data Tables | 6-8 structured tables |
| Social Comments | 6 bilingual (Chinese + English) comments |
| Images | 3+ images (hero + inline) |
| Reading Time | 14-18 minutes |

## Reference Files

- **CONTENT_STANDARDS.md** - Full quality guidelines
- **ainchina-agents/reports/** - Daily market briefs (may be in Chinese)
- **content/posts/** - Published articles

## Daily Workflow (Cron at 4:15 AM)

When woken by cron:
1. Read reports from `/ainchina-agents/reports/`
2. Execute kimi_search for latest Chinese AI news
3. **CRITICAL**: Translate concepts to English while writing
4. Write article in ENGLISH following benchmark standards
5. Run Language Checklist above
6. Save to `content/posts/`
7. Git add, commit, push
8. Verify deployment

## Mistake Log

### 2026-04-02
- **Error**: Generated Chinese article
- **Impact**: User had to manually rewrite
- **Fix**: Re-wrote in English

### 2026-04-03  
- **Error**: Generated Chinese article again
- **Impact**: User frustration, pattern identified
- **Fix**: Re-wrote in English, created this MEMORY.md

## User Preferences

- **Content Language**: English only
- **Quality Standard**: Match MiniMax/Doubao articles
- **Execution Mode**: Direct (no subagents for content generation)
- **Wake Mechanism**: Cron job at 4:15 AM daily

---

*Last updated: April 3, 2026*
*Critical Rules: 1*
*Mistakes Logged: 2*
