# 劳动仲裁智能助手 MVP v2

## 项目概述
劳动纠纷法律服务智能体 MVP，定位"劳动者的第一份法律行动指南"，核心差异化在 AI 案情分析 + 个性化证据清单 + 赔偿金计算。

## 技术栈
- **前端**：Vite + React + TypeScript + Tailwind CSS + react-router + tRPC (React Query)
- **后端**：Hono + tRPC + Drizzle ORM + SQLite
- **AI**：Moonshot API (OpenAI-compatible) + 智能规则引擎 fallback

## 已上线功能（6大模块）

### 1. 纠纷诊断（9种类型多选）
- 违法解除劳动合同、被迫离职、拖欠工资、加班费、未签劳动合同、社保/公积金、年休假、试用期、工伤
- 支持多类型同时勾选，自动合并分析

### 2. AI 案情分析（NEW v2）
- 后端 `/api/assessment` API，接收案情返回结构化 JSON
- **真实 AI 模式**：调用 Moonshot 大模型，System Prompt 含三层反幻觉防护
- **演示模式**：API 不可用时自动 fallback 到智能规则引擎，根据纠纷类型生成高质量结构化分析
- 输出字段：胜率预估、可主张权益清单（含金额+法条）、关键证据、风险提示、时间线、法律依据、推荐行动

### 3. 证据清单（自动生成）
- 根据已选纠纷类型自动聚合证据清单
- 含 14 项律师反馈修复内容
- 每项证据标注：必需/重要/辅助、获取方式、关键提示、法律依据
- 支持勾选标记已收集证据，本地存储进度

### 4. 赔偿金计算（地域化）
- 内置 10 城市社平工资、最低工资、计算口径数据
- 支持 2008 年前后分段计算
- 覆盖：N/N+1/2N、二倍工资、年休假、加班费
- 地域差异标注（加班费基数是否含加班费、社保受理路径等）

### 5. 仲裁全流程指引
- 按纠纷类型展示 8 步流程
- 每步含：时长、需准备的文书、关键提示、法条引用
- 支持步骤完成标记

### 6. 文书模板
- 劳动仲裁申请书（通用模板）
- 被迫解除劳动合同通知书
- 证据清单模板
- 支持一键复制和下载

## 部署方式

### 方式一：本地开发
```bash
cd labor-arbiter
npm install
npm run dev        # 前端开发服务器 localhost:5173
npm run start      # 后端 API 服务器 localhost:3000
```

### 方式二：生产部署（单 Node.js 服务）
```bash
cd labor-arbiter
npm install
npm run build      # 构建前端 + 编译后端
cp .env.example .env.local
# 编辑 .env.local 填入 API key（可选，无 key 则启用演示模式）
npm run start      # 启动完整服务（前端 + API）
```

### 方式三：分离部署（前端静态 + 后端独立）
- 前端：`dist/public/` 目录可直传 Vercel/Cloudflare Pages/GitHub Pages
- 后端：`npm run start` 启动 API 服务，部署到任何支持 Node.js 的平台
- 前端需配置 API 代理指向后端地址

## AI 接入配置

### 环境变量（.env.local）
```
# 方式1：Moonshot/Kimi API（推荐，国内可用）
KIMI_API_KEY=sk-xxx

# 方式2：OpenAI（需翻墙）
OPENAI_API_KEY=sk-xxx

# 方式3：强制演示模式（无 AI 调用，用智能规则引擎）
USE_MOCK_ASSESSMENT=true
```

### Prompt 设计
System Prompt 已内置在 `api/assessment.ts` 中，包含：
- 角色定义：专业劳动法律顾问
- 输出格式：严格 JSON Schema
- 金额计算规则：N/2N/二倍工资/年休假/加班费
- 地域差异处理：10 城市规则差异
- 反幻觉约束：禁止编造法条、禁止绝对化承诺、必须展示公式
- 自检清单：法条编号、金额公式、地域标注、置信度、免责声明

## 文件结构
```
labor-arbiter/
├── src/
│   ├── sections/
│   │   ├── HomePage.tsx          # 主页面（含 6 个 tab）
│   │   ├── DiagnosisSection.tsx  # 纠纷诊断
│   │   ├── AssessmentSection.tsx # AI 案情分析（NEW v2）
│   │   ├── EvidenceSection.tsx   # 证据清单
│   │   ├── CalculatorSection.tsx # 赔偿金计算
│   │   ├── ProcessSection.tsx   # 仲裁流程
│   │   └── TemplatesSection.tsx  # 文书模板
│   ├── data/
│   │   └── laborLawData.ts       # 10 城市数据 + 证据库 + 计算公式
│   └── lib/
│       └── trpc.ts               # tRPC 客户端
├── api/
│   ├── server.ts                 # Node.js 服务入口
│   ├── boot.ts                   # Hono 应用定义
│   ├── router.ts                 # tRPC 路由（含 assessment）
│   ├── assessment.ts             # AI 分析服务 + Prompt
│   ├── middleware.ts             # tRPC 上下文
│   └── [其他 router 模块]
├── db/
│   ├── schema.ts                 # SQLite 表结构
│   └── connection.ts             # Drizzle 连接
├── package.json
├── vite.config.ts
└── tsconfig.backend.json
```

## 后续迭代方向
1. **真实 AI 接入**：获取有效 Moonshot/OpenAI API key，替换演示模式
2. **更多城市数据**：扩展至 30+ 城市社平工资和裁判口径
3. **律师审核后台**：完善 Admin 后台（Dashboard、LawyerReview、RuleManager）
4. **用户反馈闭环**：feedback → lawyer review → knowledge update 的飞轮机制
5. **文书自动填充**：根据用户案情自动填充仲裁申请书模板
6. **判例检索**：接入公开判例库，提供类案参考

## 许可证 / 免责声明
本工具为法律信息整理工具，**不构成法律建议**。所有分析结果仅供参考，具体法律行动请咨询持牌律师。
