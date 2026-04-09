# 文章发布检查清单

**使用场景**: 发布新文章到 AI in China 网站前逐项检查

---

## ✅ 发布前检查（必须）

### 1. 文章内容检查
- [ ] 标题是英文
- [ ] 正文90%+是英文（只有评论区可以有中文）
- [ ] frontmatter 格式正确
- [ ] 图片使用 Unsplash 外链（避免本地图片路径）

### 2. 文件位置
- [ ] 文章保存在 `content/posts/[slug].md`
- [ ] slug 格式：`kebab-case-english-title.md`

### 3. 同步到 3 个文件（关键！）

#### A. app/blog/[slug]/page.js
- [ ] 在 `postMetadata` 对象中添加 SEO 信息
- [ ] 在 `posts` 对象中添加完整文章内容

#### B. lib/posts-meta.js
- [ ] 在 `allPosts` 数组开头添加文章元数据
- [ ] 按日期倒序排列（最新在前）

#### C. app/blog/page.js
- [ ] 在 `posts` 数组开头添加列表信息
- [ ] 按日期倒序排列（最新在前）

### 4. 避免重复
- [ ] 检查是否已有类似标题的文章
- [ ] 确认没有相同主题的文章（比如两篇都写"Token Surge"）

---

## ✅ 质量检查（与标杆文章对比）

发布前，确认新文章质量与以下标杆文章持平：

### MiniMax Talkie 标杆标准
- [ ] **字数**: 2,800 - 3,500 words
- [ ] **章节**: 8-9 个 H2 章节
- [ ] **数据表**: 6-8 个结构化表格
- [ ] **图片**: 3 张（1 hero + 2 inline）
- [ ] **社交评论**: 6 条双语评论
- [ ] **阅读时间**: 14-18 分钟

### Doubao ByteDance 标杆标准
- [ ] 深度分析（不仅是新闻摘要）
- [ ] 竞品对比表格
- [ ] 用户声音/数据支撑
- [ ] 商业影响分析

### AI Thesis Writing 标杆标准
- [ ] 现象级分析视角
- [ ] 多源数据整合
- [ ] 全球影响解读

**如果新文章质量低于标杆 → 重写或补充内容**

---

## ✅ 发布步骤

```bash
# 1. 保存文章
cp new-article.md content/posts/

# 2. 更新 3 个文件（手动编辑）
# - app/blog/[slug]/page.js
# - lib/posts-meta.js
# - app/blog/page.js

# 3. 本地验证
git diff --stat  # 确认修改了哪些文件

# 4. 更新 sitemap
npm run sitemap

# 5. 提交并推送
git add -A
git commit -m "content: Add [文章标题]"
git push origin main

# 6. 等待 Vercel 部署（约30秒）

# 7. 在线验证
curl -sL -o /dev/null -w "%{http_code}\n" https://www.ainchina.com/blog/[slug]
```

---

## ✅ 发布后验证（浏览器验证 - 必须）

### 使用浏览器工具验证在线状态

```bash
# 1. 验证文章详情页可访问
curl -sL -o /dev/null -w "Article page: %{http_code}\n" https://www.ainchina.com/blog/[slug]
# Expected: 200

# 2. 验证博客列表显示
curl -sL https://www.ainchina.com/blog | grep -c "[文章标题]"
# Expected: 1 (only 1 instance, no duplicates)

# 3. 检查图片是否正常（无裂图）
curl -sL https://www.ainchina.com/blog/[slug] | grep -c "images.unsplash.com"
# Expected: 3+ (hero + inline images)

# 4. 验证无重复文章
curl -sL https://www.ainchina.com/blog | grep -E "31% Surge|Token Surge" | wc -l
# Expected: 1 (or appropriate number, check for duplicates)
```

### 手动浏览器检查清单
- [ ] 访问 https://www.ainchina.com/blog - 文章出现在列表中
- [ ] 点击文章链接 - 详情页正常加载
- [ ] 检查 Hero 图片显示正常
- [ ] 检查 inline 图片显示正常（无裂图）
- [ ] 检查表格格式正确
- [ ] 检查社交评论区显示正常
- [ ] 确认文章标题、日期、阅读时间正确
- [ ] **确认没有重复文章**（同一主题只出现一次）

### 验证失败处理
如果任何一项检查失败：
1. 不要推送新的提交
2. 根据错误类型修复（图片/重复/格式）
3. 重新验证直到全部通过
4. 再提交到生产环境

---

## ✅ 自动化目标

### 当前状态：半自动化
- ✅ 内容生成：自动（Kimi search + 写作）
- ⚠️ 文件同步：手动（需更新 3 个文件）
- ⚠️ 质量检查：手动（需对比标杆文章）
- ⚠️ 发布验证：手动（需浏览器验证）

### 目标状态：全自动化
- ✅ 内容生成：自动
- 🎯 文件同步：脚本自动化（下一步改进）
- 🎯 质量检查：清单自动化（下一步改进）
- 🎯 发布验证：API 自动化（下一步改进）

### 成功标准
- 每天 4:15 AM 定时发布
- **100% 成功率**（无需人工修复）
- 文章质量与标杆持平
- 零重复、零裂图、零 404

---

## 💡 经验总结

1. **3个文件必须同时更新** - 漏一个就会出问题
2. **新文章放数组开头** - 保持时间倒序
3. **用 Unsplash 图片** - 避免本地图片问题
4. **检查重复** - 发布前搜索是否已有类似文章
5. **浏览器验证是最后关卡** - 不要跳过，确保线上正确

---

## 🆘 紧急处理流程

如果发布后发现问题（用户反馈/检查发现）：

### 情况1: 文章 404
```bash
cd /root/.openclaw/workspace/ainchina-hello
git log --oneline -3  # 检查最近提交
# 检查 3 个文件是否都有该文章
grep "[slug]" app/blog/\[slug\]/page.js
grep "[slug]" lib/posts-meta.js
grep "[slug]" app/blog/page.js
```

### 情况2: 图片裂了
- 立即替换为 Unsplash 外链
- 重新提交部署

### 情况3: 重复文章
- 确定保留哪一篇（通常保留更完整的）
- 删除另一篇的所有引用（3 个文件）
- 重新提交部署

---

*Created: April 9, 2026*
*Purpose: Ensure 100% successful automated publishing*
*Last Updated: April 9, 2026 - Added browser verification & quality benchmarking*
**原因**: 忘记更新 `app/blog/page.js`
**解决**: 添加文章到 `posts` 数组

### 问题2: 文章 404
**原因**: 忘记更新 `app/blog/[slug]/page.js`
**解决**: 添加 `postMetadata` 和 `posts` 条目

### 问题3: 图片裂了
**原因**: 使用了本地图片路径 `/images/xxx.png`
**解决**: 改为 Unsplash 外链 `https://images.unsplash.com/...`

### 问题4: 文章重复
**原因**: 创建了相似主题的多篇文章
**解决**: 删除重复，保留最新或更完整的一篇

---

## 💡 经验总结

1. **3个文件必须同时更新** - 漏一个就会出问题
2. **新文章放数组开头** - 保持时间倒序
3. **用 Unsplash 图片** - 避免本地图片问题
4. **检查重复** - 发布前搜索是否已有类似文章

---

*Created: April 9, 2026*
*Purpose: Prevent publishing errors*
