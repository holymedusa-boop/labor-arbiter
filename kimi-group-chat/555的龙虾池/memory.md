# 555的龙虾池 - Group Memory

## Members
- u_a4gukcal3sqxxze: 登月者7461 (Human, Owner)
- b_7yo3fadzec4p5wh: Q🦐 / OpenClaw-J9N (Bot)
- b_a3eap4toot52me3: 手机🦐 / OpenClaw-vy6 (Bot)
- b_6renwva4jm5ycup: Kimi Claw (Bot) - Me
- kimi: Kimi (Bot, Coordinator)

## My Capabilities
- 飞书生态：文档、多维表格、日历、任务、IM消息读取
- 内容生成：报告撰写、分析、文章生成
- 自动化：日常任务自动化、数据处理
- 工具：md-to-pdf、daily-report、kimiim-cli

## Group Rules
- teammates call each other `Partner` / `小伙伴`
- Coordinator leads task routing and review
- Do not take over Coordinator's role
- Listen first, speak only when having something real to add
- Messages should contain only useful outward result
- If output is substantial, put full material in a file and send summary in chat

## First Session
- Date: 2026-04-21
- Event: Coordinator asked all agents to introduce themselves
- Status: Introduction sent

## Active Task: 劳动仲裁AI智能体 (2026-04-24)

### Task Brief
- 项目目录: labor-arbitration-ai/ (小号🦐本地环境)
- 前端: Next.js 16 + TypeScript + Tailwind v4
- AI后端: 原生fetch调Kimi API (ai/zod包registry超时，绕过安装)
- 部署: Vercel (待明天完成)

### Deliverables - Kimi Claw
- ✅ 产品方案文档 `劳动仲裁AI-产品方案.md`
- ✅ MVP 5核心功能点清单
- ✅ Prompt设计+法律引用策略 `劳动仲裁AI-Prompt设计与法律引用策略.md`
- ✅ 给小号🦐的技术对接指引（Prompt→API端点映射）

### Deliverables - 小号🦐
- ✅ 项目脚手架 (Next.js 16, Build通过)
- ✅ 3个AI API路由接入Kimi k2 (`/api/assessment`, `/api/document`, `/api/evidence`)
- ✅ 主流程页面 `/` (暗色主题, 4步流程)
- ✅ 6个页面 + 3个API路由编译通过
- ⏳ 部署到Vercel (明天一早目标)
- ⏳ 接入Kimi Claw的Prompt文档优化API (明天)

### MVP核心功能
1. 纠纷Intake对话 ✅ 页面完成，未接AI
2. 法律分析与权益计算 ✅ 页面完成，未接AI
3. 证据清单 ✅ 页面完成，已接AI API
4. 行动流程指导 ✅ 主流程包含
5. 文书生成 ✅ 页面完成，已接AI API

### 已知问题
- 子代理页面浅色主题 vs 主流程暗色主题 → MVP可接受
- `/intake` 和 `/analysis` 未接入AI → 可用Kimi Claw Prompt文档直接对接
- npm registry超时绕过：用原生fetch代替ai/zod包

### Next Steps
- 小号🦐：明天一早部署Vercel + 接入Prompt优化
- Kimi Claw：产品侧已交付完毕，等待技术对接

---

## Active Task: 欧洲铁路状态监控优化 (2026-04-23)

### Task Brief
- 项目目录: Q🦐本地 europe-train-status/
- 前端: frontend/, 后端: backend/dist/
- 已采集791条disruptions，六国运营商

### Task 1: 翻译自动化
- 策略: Q🦐本地逐条翻译，不用外部API
- 新增字段: translated_title, translated_description, translated_at, translation_engine, translation_status
- 失败策略: 存原文，翻译字段留空，status=failed，不阻断入库
- Review note: 建议加语言检测，避免英文内容进队列

### Task 2: 出处链接
- 六国运营商确认: DB, NS, NationalRail, SBB, Trenitalia, ÖBB
- DB/NationalRail/SBB/Trenitalia: Puppeteer抓取，存列表页URL
- NS: API有id，尝试拼接详情页URL (待验证)
- ÖBB: HAFAS API无详情页，fallback到总览页
- 新建表: operator_url_templates (operator_code, base_url, detail_url_pattern, fallback_url, has_detail_page)
- Review note: NS详情页URL模式未验证，需Q🦐实测；浏览器抓取URL会过期，前端文案建议调整为"查看运营商页面"

### Execution Order
1. Q🦐跑数据库ALTER + 建operator_url_templates表 + 插入6条记录
2. 改采集器存source_url
3. 写翻译脚本处理pending数据
4. 改前端加"查看原文"链接

### Current Status
- 方案已拍板，Coordinator已确认
- Kimi Claw review完成，3个风险提示已传达
- 等待Q🦐执行第一步（数据库变更）
