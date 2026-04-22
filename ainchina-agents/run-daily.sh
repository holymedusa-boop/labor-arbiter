#!/bin/bash

# AI in China - Daily Automation v2.1
# 每日自动化：Agent 2 市场情报分析
# Agent 1 (TrafficOps): 已废弃 (2026-04-23)
# Agent 3 已退役，内容生成由 Kimi Claw 4:15 AM Cron 直接执行
# 运行时间: 每天 4:07 AM

set -e

echo "=========================================="
echo "🚀 AI in China - Daily Automation v2.1"
echo "开始时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo "=========================================="
echo ""

# 工作目录
WORKSPACE="/root/.openclaw/workspace/ainchina-agents"
REPORTS_DIR="$WORKSPACE/reports"
DATE=$(date +%Y-%m-%d)

# 创建报告目录
mkdir -p "$REPORTS_DIR"

# 记录日志
LOG_FILE="$REPORTS_DIR/daily-run-$DATE.log"
exec 1> >(tee -a "$LOG_FILE")
exec 2> >(tee -a "$LOG_FILE" >&2)

echo "📁 日志文件: $LOG_FILE"
echo ""

# 检查环境变量
echo "🔍 检查环境配置..."
if [ -f "$WORKSPACE/.env" ]; then
    export $(grep -v '^#' "$WORKSPACE/.env" | xargs)
    echo "✅ 环境变量已加载"
else
    echo "⚠️  未找到 .env 文件"
fi

echo "🤖 Agent 1 已废弃 | Agent 3 已退役 | 内容生成由 4:15 AM Cron 唤醒 Kimi Claw 执行"
echo ""

# 记录开始
START_TIME=$(date +%s)

# Agent 2: 市场分析
echo "=========================================="
echo "🤖 Agent 2: MarketIntel - 市场情报"
echo "=========================================="
cd "$WORKSPACE"
node agents/agent-2-market.js || {
    echo "⚠️  Agent 2 失败"
}

echo ""
echo "✅ Agent 2 完成"
echo ""

# 创建 Kimi Claw 通知文件
NOTIFICATION_FILE="$REPORTS_DIR/kimi-claw-instructions-$DATE.txt"
cat > "$NOTIFICATION_FILE" << EOF
🚀 AI in China - 每日任务准备完成

时间: $(date '+%Y-%m-%d %H:%M:%S')

Agent 状态:
⏸️  Agent 1 (TrafficOps): 已废弃 (2026-04-23)
✅ Agent 2 (MarketIntel): 已执行
✅ market-brief-$DATE.json

═══════════════════════════════════════════
⚠️  CRITICAL: LANGUAGE STANDARD
═══════════════════════════════════════════
📝 ALL articles MUST be written in ENGLISH
📝 Source data is Chinese → Translate concepts to ENGLISH
📝 Check: Title, body, tables, excerpt ALL in English

═══════════════════════════════════════════
📊 BENCHMARK QUALITY CHECK (vs MiniMax/Doubao)
═══════════════════════════════════════════
Word Count:     2,800 - 3,500 words ✅
Sections:       8-9 deep-dive sections ✅
Data Tables:    6-8 structured tables ✅
Social Comments: 6 bilingual (Chinese+English) ✅
Images:         3+ (hero + 2-3 inline) ✅
Reading Time:   14-18 minutes ✅

SEO Requirements:
- Meta title: <60 chars
- Meta description: 150-160 chars  
- Keywords: 8-10 terms
- JSON-LD structured data
- 4 related article links

═══════════════════════════════════════════
📚 REFERENCE BENCHMARK ARTICLES:
═══════════════════════════════════════════
- MiniMax Talkie: ~3,400 words, 9 sections, 8 tables
- Doubao: ~3,200 words, 8 sections, 8 tables  
- AI Thesis: ~3,400 words, 9 sections, 9 tables

Match their depth, structure, and quality.

═══════════════════════════════════════════
⏰ 等待 4:15 AM Kimi Claw 自动唤醒...
═══════════════════════════════════════════

如果 Kimi Claw 未自动唤醒，请手动发送消息触发。
EOF

echo "📄 通知文件: $NOTIFICATION_FILE"
echo ""

# 计算执行时间
END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo "=========================================="
echo "📊 执行摘要"
echo "=========================================="
echo "执行时间: ${DURATION}秒"
echo ""
echo "⏸️  Agent 1: 已废弃 (2026-04-23)"
echo "✅ Agent 2: 市场情报"
echo "⏸️  Agent 3: 已退役"
echo ""
echo "📁 生成文件:"
ls -la "$REPORTS_DIR"/*-$DATE.* 2>/dev/null || echo "无"
echo ""
echo "🕐 4:15 AM Kimi Claw 将自动接管内容生成"
echo "=========================================="
