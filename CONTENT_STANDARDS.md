# AI in China - Content Generation Standards

## Language Requirement (CRITICAL)

**ALL articles MUST be written in ENGLISH.**

This is a non-negotiable standard for ain-china.com. The website targets international readers interested in China's AI ecosystem.

### Why English?
- Website audience: Global English-speaking readers
- Benchmark articles (Doubao, MiniMax, DeepSeek): All in English
- SEO: English content ranks better for international search
- Brand positioning: Professional international tech publication

## Article Benchmark Standards

Every article must match the quality of these benchmark pieces:
- MiniMax Talkie article (~3,400 words, 9 sections, 9 tables, 6 comments)
- Doubao ByteDance article (~3,200 words, 8 sections, 8 tables, 6 comments)
- AI Thesis Writing article (~3,400 words, 9 sections, 9 tables, 6 comments)

### Structure Requirements

| Element | Requirement |
|---------|-------------|
| **Word Count** | 2,800 - 3,500 words |
| **Sections** | 8-9 deep-dive sections |
| **Data Tables** | 6-8 structured tables |
| **Social Comments** | 6 bilingual (Chinese + English) comments |
| **Images** | 3 images (hero + 2 inline) |
| **Reading Time** | 14-18 minutes |

### Content Quality Checklist

- [ ] Compelling headline with data hook
- [ ] Executive summary at top
- [ ] Original data analysis (not just news summary)
- [ ] User/reader perspective included
- [ ] Global/international relevance explained
- [ ] Competitive landscape analysis
- [ ] Future outlook and predictions
- [ ] Related articles linked

### Bilingual Social Media Comments

Each article must include 6 comments from Chinese social media platforms:
- Format: Chinese original + English translation
- Sources: Zhihu, Xiaohongshu, Weibo, Twitter/X, Douban, GitHub
- Should represent diverse viewpoints (positive, skeptical, analytical)

## File Naming Convention

```
content/posts/{topic-keywords}.md
```

Examples:
- `minimax-talkie.md`
- `deepseek-v3-deep-dive.md`
- `ai-thesis-writing-china.md`
- `stepfun-terminal-ai-revolution.md`

## Daily Workflow (When Woken by Cron)

1. Read reports from `/ainchina-agents/reports/`
2. Execute `kimi_search` for latest Chinese AI news
3. **Select topic** based on urgency + interest
4. **Write article in ENGLISH** following benchmark standards
5. Save to `content/posts/`
6. Git add, commit, push
7. Verify deployment

## CRITICAL REMINDERS

⚠️ **ALWAYS write in ENGLISH**
⚠️ **NEVER write in Chinese** (except for bilingual comments)
⚠️ **Match MiniMax/Doubao benchmark quality**
⚠️ **Include data tables, social comments, images**
⚠️ **Check .gitignore exists before git operations**

## Previous Issues Log

### 2026-04-02
- ❌ Article generated in Chinese instead of English
- ✅ Fixed by manual rewrite

### 2026-04-03
- ❌ Article generated in Chinese instead of English  
- ✅ Fixed by manual rewrite with this standards document

## Language Verification Script

Before finalizing any article, verify:
1. Frontmatter title is in English
2. Article body is in English
3. Only social media comments section contains Chinese (with translations)
4. All data tables have English headers

If any section is in Chinese (except social comments), REWRITE immediately.
