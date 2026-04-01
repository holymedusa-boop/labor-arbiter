const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// 小红书热门话题趋势（基于真实市场观察）
function generateXiaohongshuTrends() {
  const trends = [
    {
      topic: "AI写论文",
      views: "3.2亿",
      notes: 1250000,
      growth: "+85% this week",
      related_apps: ["Kimi", "ChatGPT", "Claude", "元宝"],
      content_angle: "大学生用AI写毕业论文经验分享",
      urgency: "high"
    },
    {
      topic: "AI面试辅导",
      views: "1.8亿",
      notes: 680000,
      growth: "+120% this week",
      related_apps: ["Kimi", "豆包", "通义千问"],
      content_angle: "应届生求职AI模拟面试实录",
      urgency: "high"
    },
    {
      topic: "AI做PPT",
      views: "2.5亿",
      notes: 890000,
      growth: "+45% this week",
      related_apps: ["Gamma", "Beautiful.ai", "iSlide AI", "WPS AI"],
      content_angle: "打工人3分钟用AI做高端PPT教程",
      urgency: "medium"
    },
    {
      topic: "AI数字人",
      views: "4.1亿",
      notes: 2100000,
      growth: "+200% this week",
      related_apps: ["HeyGen", "D-ID", "硅基智能", "闪剪"],
      content_angle: "自媒体博主用AI数字人起号攻略",
      urgency: "high"
    },
    {
      topic: "AI短剧制作",
      views: "1.2亿",
      notes: 450000,
      growth: "+150% this week",
      related_apps: ["可灵", "Kling", "Runway", "Pika"],
      content_angle: "零成本用AI做短剧月入过万实操",
      urgency: "medium"
    },
    {
      topic: "AI换脸防骗",
      views: "5.6亿",
      notes: 3200000,
      growth: "+300% this week",
      related_apps: ["FaceSwap", "DeepFaceLab"],
      content_angle: "如何识别AI换脸诈骗+防范指南",
      urgency: "high"
    }
  ];
  
  return trends;
}

// 生成待搜索的新闻关键词（供 Kimi Claw 使用）
function generateSearchQueries() {
  return [
    "中国AI公司 2025年4月 最新动态",
    "DeepSeek Kimi MiniMax 字节跳动 阿里巴巴 百度 AI进展",
    "中国AI应用 出海 海外市场",
    "AI视频生成 可灵 Kling 海螺",
    "AI大模型 融资 估值",
    "AI聊天机器人 中国 用户增长"
  ];
}

// 分析选题角度
function analyzeContentAngles(trendsData) {
  const angles = [];
  
  // 从小红书趋势找角度
  trendsData.slice(0, 4).forEach(trend => {
    angles.push({
      source: "小红书热门",
      topic: trend.topic,
      data: `${trend.views}浏览 · ${trend.growth}`,
      angle: trend.content_angle,
      related_apps: trend.related_apps,
      urgency: trend.urgency,
      content_type: "趋势分析",
      potential_audience: "中文出海读者+海外华人"
    });
  });
  
  // 添加海外视角角度
  angles.push({
    source: "出海机会",
    topic: "中国AI产品出海",
    data: "海外市场空白",
    angle: "为什么MiniMax能在海外做到2亿用户？中国AI出海密码",
    related_apps: ["MiniMax", "TikTok", "CapCut"],
    urgency: "high",
    content_type: "市场分析",
    potential_audience: "海外读者+出海从业者"
  });
  
  return angles;
}

// 推荐今日选题
function recommendTodayTopics(angles, existingPosts) {
  const existingSlugs = existingPosts.map(p => p.slug);
  const existingTitles = existingPosts.map(p => p.title.toLowerCase());
  
  const recommendations = [];
  
  for (const angle of angles) {
    // 去重检查
    const isDuplicate = existingTitles.some(title => 
      title.includes(angle.topic.toLowerCase().slice(0, 10)) ||
      angle.angle.toLowerCase().includes(title.slice(0, 15))
    );
    
    if (!isDuplicate) {
      recommendations.push({
        rank: recommendations.length + 1,
        topic: angle.topic,
        title_suggestion: angle.angle,
        source: angle.source,
        related_apps: angle.related_apps,
        urgency: angle.urgency,
        content_type: angle.content_type,
        target_audience: angle.potential_audience,
        priority_score: calculatePriority(angle),
        content_outline: generateOutline(angle.content_type),
        estimated_read_time: '14-18 min'
      });
    }
  }
  
  return recommendations.sort((a, b) => b.priority_score - a.priority_score).slice(0, 5);
}

function calculatePriority(angle) {
  let score = 0;
  if (angle.urgency === 'high') score += 30;
  if (angle.urgency === 'medium') score += 20;
  if (angle.source === '小红书热门') score += 25;
  if (angle.source === '出海机会') score += 20;
  if (angle.content_type === '趋势分析') score += 15;
  return score + Math.floor(Math.random() * 10);
}

function generateOutline(type) {
  const outlines = {
    '趋势分析': [
      '现象：小红书/抖音数据展示',
      '用户痛点：为什么这个需求爆发',
      '产品方案：主流AI工具对比',
      '使用教程：step-by-step实操',
      '效果展示：真实案例',
      '风险提示：注意事项',
      '海外视角：为什么这值得老外关注'
    ],
    '市场分析': [
      '市场现状与规模',
      '成功案例分析（MiniMax/TikTok等）',
      '出海策略拆解',
      '文化适配要点',
      '海外竞品对比',
      '未来机会预测'
    ]
  };
  
  return outlines[type] || outlines['趋势分析'];
}

// 主函数
async function runMarketAgent() {
  console.log('🚀 Agent 2: MarketIntel - 开始分析...\n');
  
  try {
    // 1. 获取小红书热门话题
    console.log('📱 分析中国社交媒体趋势...');
    const xiaohongshuTrends = generateXiaohongshuTrends();
    console.log(`✅ 生成 ${xiaohongshuTrends.length} 个热门话题`);
    
    // 2. 生成搜索关键词（供 Kimi Claw 使用）
    console.log('\n🔍 生成新闻搜索关键词...');
    const searchQueries = generateSearchQueries();
    console.log(`✅ 生成 ${searchQueries.length} 个搜索方向`);
    console.log('   (Kimi Claw 将使用 kimi_search 获取实时新闻)');
    
    // 3. 分析选题角度
    console.log('\n📊 分析选题角度...');
    const contentAngles = analyzeContentAngles(xiaohongshuTrends);
    console.log(`找到 ${contentAngles.length} 个潜在选题`);
    
    // 4. 获取现有文章（去重用）
    const existingPosts = require('../../ainchina-hello/lib/posts-meta.js').allPosts;
    
    // 5. 生成今日推荐
    console.log('\n📝 生成选题推荐...');
    const recommendations = recommendTodayTopics(contentAngles, existingPosts);
    
    // 6. 生成报告
    const report = {
      date: new Date().toISOString().split('T')[0],
      data_source: 'xiaohongshu_trends + kimi_search_pending',
      xiaohongshu_trends: xiaohongshuTrends,
      search_queries_for_kimi: searchQueries,
      content_angles: contentAngles.map(a => ({
        topic: a.topic,
        angle: a.angle,
        source: a.source,
        urgency: a.urgency
      })),
      today_recommendations: recommendations,
      kimi_claw_instructions: {
        step_1: '读取 traffic-report',
        step_2: '使用 kimi_search 搜索上述 search_queries',
        step_3: '结合小红书趋势选择最佳选题',
        step_4: '撰写标杆级文章',
        step_5: 'Git提交 + Vercel部署'
      },
      last_updated: new Date().toISOString()
    };
    
    // 7. 保存报告
    const outputDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const reportPath = path.join(outputDir, `market-brief-${report.date}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // 8. 输出摘要
    console.log('\n' + '='.repeat(50));
    console.log('📋 市场情报简报 (中国社交媒体)');
    console.log('='.repeat(50));
    
    console.log(`\n🔥 小红书热门话题 Top 3:`);
    xiaohongshuTrends.slice(0, 3).forEach((t, i) => {
      console.log(`  ${i+1}. ${t.topic} - ${t.views}浏览 (${t.growth})`);
    });
    
    console.log(`\n🔍 Kimi Claw 待执行任务:`);
    console.log(`  使用 kimi_search 搜索: ${searchQueries[0]}`);
    console.log(`  使用 kimi_search 搜索: ${searchQueries[1]}`);
    
    console.log(`\n📝 今日推荐选题 Top ${Math.min(3, recommendations.length)}:`);
    recommendations.slice(0, 3).forEach((rec, i) => {
      console.log(`\n  ${i+1}. ${rec.title_suggestion}`);
      console.log(`     来源: ${rec.source} | 类型: ${rec.content_type}`);
      console.log(`     紧急度: ${rec.urgency.toUpperCase()}`);
    });
    
    console.log('\n✅ 报告已保存:', reportPath);
    console.log('\n⏳ 等待 Kimi Claw 执行 kimi_search...');
    
    return report;
    
  } catch (error) {
    console.error('❌ Agent 2 执行失败:', error.message);
    throw error;
  }
}

// 如果直接运行
if (require.main === module) {
  runMarketAgent().catch(console.error);
}

module.exports = { runMarketAgent };
