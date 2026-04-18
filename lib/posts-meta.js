// AI in China - Posts Metadata
// 文章元数据管理文件

const allPosts = [
  {
    slug: 'china-ai-avatar-revolution-2026',
    title: "China's AI Avatar Revolution: How 410 Million Views Signal a Global Content Creation Shift",
    category: 'AI Applications',
    excerpt: "Chinese AI avatar tools are experiencing explosive growth with 410 million topic views and 200% weekly growth. From HeyGen to domestic platforms like Silicon Intelligence and ShanJian, this phenomenon reveals how AI is democratizing video content creation for millions of creators.",
    date: '2026-04-18',
    readTime: '16 min read'
  },
  {
    slug: 'stanford-ai-index-2026-china-rise',
    title: "Stanford AI Index 2026: China's 'Parallel Run' Era Has Arrived",
    category: 'AI Trends',
    excerpt: "Stanford HAI's 423-page AI Index Report 2026 reveals a historic turning point: the China-US AI gap has 'effectively closed' to just 2.7%. Alibaba ranks #3 globally, and Chinese AI models have surpassed US competitors in token consumption for 5 consecutive weeks.",
    date: '2026-04-17',
    readTime: '16 min read'
  },
  {
    slug: 'alibaba-token-hub-100b-gambit',
    title: "Alibaba's $100B Token Gambit: Inside the Alibaba Token Hub Revolution Reshaping China's AI Economy",
    category: 'AI Trends',
    excerpt: "Deep dive into Alibaba's strategic pivot with ATH: How the tech giant is betting its future on Token economics, targeting $100B annual revenue from cloud and AI by 2031.",
    date: '2026-04-16',
    readTime: '17 min read'
  },
  {
    slug: 'china-ai-agent-explosion-2025-enterprise-deployment',
    title: "China's AI Agent Explosion: How 126 Platforms and $1B+ in Enterprise Deals Are Reshaping Global Automation",
    category: 'AI Trends',
    excerpt: "With 371 government-contracted projects in H1 2025 alone, China's AI Agent market is hitting an inflection point. From JD.com's 7,000+ deployed agents to Alibaba serving 100,000+ factories.",
    date: '2026-04-15',
    readTime: '16 min read'
  },
  {
    slug: 'bytedance-seed-brain-drain-70-engineers',
    title: "ByteDance's AI Brain Drain: 70 Top Engineers Exit Seed Team in 12 Months",
    category: 'AI Trends',
    excerpt: "ByteDance is bleeding AI talent. Nearly 70 core engineers walked out of its prestigious Seed AI team in 12 months—most joining Tencent. Inside China's ruthless AI talent wars.",
    date: '2026-04-14',
    readTime: '16 min read'
  },
  {
    slug: 'china-ai-model-war-april-2026-week-changed-everything',
    title: "The Week That Changed Everything: China's AI Model War Intensifies in April 2026",
    category: 'AI Trends',
    excerpt: "In one week, Alibaba launched 3 models, Zhipu raised prices 83%, ByteDance deployed full-duplex voice AI, and China hit 140 trillion daily tokens. Why April 2026 marks the end of the AI price war and the beginning of a new phase.",
    date: '2026-04-13',
    readTime: '17 min read'
  },
  {
    slug: 'china-ai-chip-war-2026-us-sanctions',
    title: "The Great Silicon Wall: How China's AI Industry Is Defying U.S. Chip Sanctions in 2026",
    category: 'AI Infrastructure',
    excerpt: "ByteDance's $5.6B Huawei deal, DeepSeek V4 on domestic chips, and the parallel AI ecosystem China is building. Why U.S. tech dominance faces its biggest challenge.",
    date: '2026-04-12',
    readTime: '17 min read'
  },
  {
    slug: 'china-ai-model-wars-april-2026',
    title: "China's AI Model Wars: How Alibaba, ByteDance, and MiniMax Are Reshaping Global AI Competition in April 2026",
    category: 'AI Trends',
    excerpt: "April 2026 marks a turning point in China's AI race. Alibaba launched 3 models in one week, ByteDance deployed full-duplex voice AI, and MiniMax announced open-source M2.7. Discover how Chinese tech giants are outpacing Western competitors.",
    date: '2026-04-11',
    readTime: '18 min read'
  },
  {
    slug: 'modelbest-edge-ai-unicorn-2026',
    title: "ModelBest Becomes Unicorn: How Tsinghua's Edge AI Pioneer Is Reshaping On-Device Intelligence",
    category: 'AI Trends',
    excerpt: "Inside ModelBest's rise to unicorn status: How a Tsinghua-born startup is challenging AI giants with its 'Density Law' approach to edge AI, securing $100M+ in 2026.",
    date: '2026-04-10',
    readTime: '17 min read'
  },
  {
    slug: 'ai-interview-coaching-china-2025',
    title: 'The AI Interview Coach Phenomenon: How Chinese Graduates Are Using AI to Crack the Job Market',
    category: 'AI Applications',
    excerpt: 'Inside China\'s AI interview coaching boom: How millions of graduates are using Kimi, Doubao, and Tongyi Qianwen to prepare for interviews, with usage surging 120% in one week.',
    date: '2026-04-08',
    readTime: '16 min read'
  },
  {
    slug: 'china-ai-token-surge-gen-z',
    title: "China's AI Overtake: 31% Surge in Token Usage Signals Global Power Shift",
    category: 'AI Trends',
    excerpt: 'Chinese AI models hit 12.96 trillion weekly tokens, surpassing US for 5 consecutive weeks. Inside the Gen Z revolution, $2B unicorn startups, and the technical breakthrough reshaping robotics.',
    date: '2026-04-07',
    readTime: '17 min read'
  },
  {
    slug: 'china-embodied-ai-revolution-2026',
    title: "China's Embodied AI Revolution: How $30 Billion in Q1 Funding Is Reshaping Global Robotics",
    category: 'AI Trends',
    excerpt: 'China\'s embodied intelligence sector raised $30 billion in Q1 2026, creating 9 unicorn companies valued at $10B+. From Zhi Robotics\' Tesla-like approach to Autobot\'s Big Tech backing, discover how China is winning the physical AI race.',
    date: '2026-04-06',
    readTime: '17 min read'
  },
  {
    slug: 'china-ai-avatar-revolution-2025',
    title: "China's AI Avatar Revolution: 410M Views Transformed Content Creation Forever",
    category: 'AI Trends',
    excerpt: 'China\'s AI avatar market exploded to 410 million views in one week (+200% growth). From Xiaohongshu creators to IPO-bound giants like Guiji AI, discover how digital humans are reshaping content creation.',
    date: '2026-04-05',
    readTime: '16 min read'
  },
  {
    slug: 'china-ai-digital-human-revolution',
    title: "China's AI Digital Human Revolution: 80,000 Virtual Avatars Reshaping Content",
    category: 'AI Applications',
    excerpt: 'With 410 million Xiaohongshu views and Guiji AI\'s $440M IPO, China\'s digital human market is exploding. How virtual creators are changing the game.',
    date: '2026-04-05',
    readTime: '16 min read'
  },
  {
    slug: 'kimi-2m-context',
    title: "Kimi's 2M Token Context Analysis",
    category: 'AI Chatbots',
    excerpt: 'Technical deep dive into Moonshot AI\'s Long Context Piling architecture and how it enables processing of entire books in a single prompt.',
    date: '2026-03-31',
    readTime: '8 min read'
  },
  {
    slug: 'chinese-ai-index-2026',
    title: 'Chinese AI Index: 103 Companies Tracking',
    category: 'Market Intelligence',
    excerpt: 'Comprehensive tracking of Chinese AI companies including funding rounds, user metrics, and competitive positioning across chatbots, video, and enterprise tools.',
    date: '2026-03-31',
    readTime: '12 min read'
  },
  {
    slug: 'deepseek-v3-deep-dive',
    title: 'DeepSeek-V3: The $5.6M Training Run',
    category: 'Technical Analysis',
    excerpt: 'How DeepSeek achieved GPT-4 level performance with revolutionary MLA attention and FP8 training at a fraction of the cost.',
    date: '2026-03-31',
    readTime: '15 min read'
  },
  {
    slug: 'deepseek-vs-chatgpt',
    title: 'DeepSeek vs ChatGPT: Complete Comparison',
    category: 'AI Chatbots',
    excerpt: 'Side-by-side analysis of performance, pricing, availability, and use cases for the two leading AI chatbots in 2026.',
    date: '2026-03-31',
    readTime: '10 min read'
  },
  {
    slug: 'chinese-ai-landscape',
    title: 'The Rise of Chinese AI: Ecosystem Overview',
    category: 'Market Intelligence',
    excerpt: 'From foundation models to application layer: mapping the entire Chinese AI ecosystem and its global implications.',
    date: '2026-03-31',
    readTime: '10 min read'
  },
  {
    slug: 'ai-video-tools-china',
    title: 'Chinese AI Video Generation Tools',
    category: 'AI Video',
    excerpt: 'Analysis of Kling, Vidu, and other emerging video generation platforms competing with Sora in the Chinese market.',
    date: '2026-04-01',
    readTime: '8 min read'
  },
  {
    slug: 'tongyi-qianwen-alibaba',
    title: 'Alibaba Tongyi Qianwen: Enterprise AI Powerhouse',
    category: 'AI Chatbots',
    excerpt: 'How Alibaba leverages e-commerce supremacy and cloud infrastructure to dominate enterprise AI adoption in China.',
    date: '2026-04-02',
    readTime: '14 min read'
  },
  {
    slug: 'wenxin-yiyan-baidu',
    title: 'Baidu Wenxin Yiyan: The 300 Million User AI Assistant',
    category: 'AI Chatbots',
    excerpt: 'How Baidu built the most widely used AI assistant in China through ecosystem integration and first-mover advantage.',
    date: '2026-04-02',
    readTime: '14 min read'
  },
  {
    slug: 'doubao-bytedance',
    title: 'ByteDance Doubao: The 200 Million User AI Assistant',
    category: 'AI Chatbots',
    excerpt: 'How ByteDance built the AI assistant reshaping content creation with 200 million users through ecosystem integration.',
    date: '2026-03-31',
    readTime: '15 min read'
  },
  {
    slug: 'minimax-talkie',
    title: 'MiniMax: The 212 Million User AI Companion Empire Built on Digital Intimacy',
    category: 'AI Chatbots',
    excerpt: 'How MiniMax built the worlds largest AI companion platform with 212 million users across 200 countries through emotional connection and Talkie.',
    date: '2026-04-01',
    readTime: '16 min read'
  },
  {
    slug: 'ai-thesis-writing-china',
    title: 'AI Thesis Writing Explodes: How 12 Million Chinese Students Are Rewriting Academic Rules',
    category: 'AI Chatbots',
    excerpt: 'With 320 million views on Xiaohongshu, AI-assisted thesis writing has become a phenomenon reshaping China\'s higher education. A deep dive into the tools, workflows, and global implications.',
    date: '2026-04-02',
    readTime: '16 min read'
  },
  {
    slug: 'doubao-12-trillion-token-explosion',
    title: "Doubao's 12 Trillion Token Explosion: How ByteDance Is Quietly Winning the Global AI Race",
    category: 'AI Infrastructure',
    excerpt: 'ByteDance\'s Doubao model just hit 12 trillion daily tokens—a 1000x growth in under two years. With China capturing 30% of global AI market share and challenging the US tech oligopoly.',
    date: '2026-04-04',
    readTime: '16 min read'
  }
];

module.exports = { allPosts };
