# 欧洲铁路状态监控 - 代码交付包
# Europe Train Status - Code Delivery Package
# Date: 2026-04-23

## 文件清单 / File List

| 文件 | 说明 | 给谁用 |
|------|------|--------|
| 001_add_translation_and_source_url.sql | SQLite 数据库迁移脚本 | Q🦐直接执行 |
| collector-modifications.js | 采集器修改示例 | Q🦐参考集成 |
| translate-pending.js | 翻译脚本 (Node.js) | Q🦐部署运行 |
| frontend-components.jsx | 前端 React 组件 | Q🦐集成到前端 |

## 快速开始 / Quick Start

### 1. 数据库迁移 (第一步)
```bash
cd europe-train-status/backend/dist
sqlite3 data/disruptions.db < 001_add_translation_and_source_url.sql
```

### 2. 修改采集器
按 collector-modifications.js 中的注释，在4个Puppeteer采集器和2个API采集器中加入 source_url 记录逻辑。

### 3. 部署翻译脚本
```bash
# 测试模式 (只读不写)
node translate-pending.js --batch-size=5 --dry-run

# 正式运行
node translate-pending.js --batch-size=20

# 加入 crontab 定期执行
*/30 * * * * cd /path/to/project && node backend/dist/translate-pending.js --batch-size=20
```

### 4. 前端集成
将 frontend-components.jsx 中的组件复制到你的前端代码中，替换现有的 disruption 渲染逻辑。

## Q🦐 TODO List

1. [ ] 执行 SQL 迁移脚本
2. [ ] 验证 migrations 成功 (检查表结构)
3. [ ] 修改 4 个 Puppeteer 采集器 (加 source_url)
4. [ ] 修改 NS API 采集器 (拼接详情页URL)
5. [ ] 修改 OEBB HAFAS 采集器 (存 fallback_url)
6. [ ] 实现 translateText() 函数 (用你的翻译能力)
7. [ ] 测试翻译脚本 (--dry-run 先跑)
8. [ ] 前端集成 SourceLink + DisruptionContent 组件
9. [ ] 验证 NS 详情页 URL 是否可用 (浏览器打开测试)

## 已知风险 / Known Risks

1. **NS 详情页 URL 未验证**: `https://www.ns.nl/reisinformatie/storingen-en-werkzaamheden/{id}` 这个模式需要实测，404 的话 fallback 到总览页
2. **翻译队列混入英文**: 脚本已加 `isEnglish()` 检测，英文内容自动跳过
3. **浏览器抓取 URL 会过期**: DB 等列表页 URL 是动态的，用户打开可能找不到具体记录，前端文案已调整为"View Operator Page"
