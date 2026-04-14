import Link from 'next/link'

// Blog posts list - updated April 13, 2026
const posts = [
  {
    slug: 'china-ai-agent-explosion-2025-enterprise-deployment',
    title: "China's AI Agent Explosion: How 126 Platforms and $1B+ in Enterprise Deals Are Reshaping Global Automation",
    category: 'AI Trends',
    excerpt: "With 371 government-contracted projects in H1 2025 alone, China's AI Agent market is hitting an inflection point. From JD.com's 7,000+ deployed agents to Alibaba serving 100,000+ factories, we dive deep into the $5B+ ecosystem.",
    date: 'April 15, 2026',
    readTime: '16 min read'
  },
  {
    slug: 'bytedance-seed-brain-drain-70-engineers',
    title: "ByteDance's AI Brain Drain: 70 Top Engineers Exit Seed Team in 12 Months",
    category: 'AI Trends',
    excerpt: "ByteDance is bleeding AI talent. Nearly 70 core engineers walked out of its prestigious Seed AI team in 12 months—most joining Tencent. Inside China's ruthless AI talent wars.",
    date: 'April 14, 2026',
    readTime: '16 min read'
  },
  {
    slug: 'china-ai-model-war-april-2026-week-changed-everything',
    title: "The Week That Changed Everything: China's AI Model War Intensifies in April 2026",
    category: 'AI Trends',
    excerpt: "In one week, Alibaba launched 3 models, Zhipu raised prices 83%, ByteDance deployed full-duplex voice AI, and China hit 140 trillion daily tokens. Why April 2026 marks the end of the AI price war and the beginning of a new phase.",
    date: 'April 13, 2026',
    readTime: '17 min read'
  },
  {
    slug: 'china-ai-chip-war-2026-us-sanctions',
    title: "The Great Silicon Wall: How China's AI Industry Is Defying U.S. Chip Sanctions in 2026",
    category: 'AI Infrastructure',
    excerpt: "ByteDance's $5.6B Huawei deal, DeepSeek V4 on domestic chips, and the parallel AI ecosystem China is building. Why U.S. tech dominance faces its biggest challenge.",
    date: 'April 12, 2026',
    readTime: '17 min read'
  },
  {
    slug: 'china-ai-model-wars-april-2026',
    title: "China's AI Model Wars: How Alibaba, ByteDance, and MiniMax Are Reshaping Global AI Competition in April 2026",
    category: 'AI Trends',
    excerpt: "April 2026 marks a turning point in China's AI race. Alibaba launched 3 models in one week, ByteDance deployed full-duplex voice AI, and MiniMax announced open-source M2.7. Discover how Chinese tech giants are outpacing Western competitors.",
    date: 'April 11, 2026',
    readTime: '18 min read'
  },
  {
    slug: 'modelbest-edge-ai-unicorn-2026',
    title: "ModelBest Becomes Unicorn: How Tsinghua's Edge AI Pioneer Is Reshaping On-Device Intelligence",
    category: 'AI Trends',
    excerpt: "Inside ModelBest's rise to unicorn status: How a Tsinghua-born startup is challenging AI giants with its 'Density Law' approach to edge AI, securing $100M+ in 2026.",
    date: 'April 10, 2026',
    readTime: '17 min read'
  },
  {
    slug: 'ai-interview-coaching-china-2025',
    title: 'The AI Interview Coach Phenomenon: How Chinese Graduates Are Using AI to Crack the Job Market',
    category: 'AI Applications',
    excerpt: 'Inside China\'s AI interview coaching boom: How millions of graduates are using Kimi, Doubao, and Tongyi Qianwen to prepare for interviews, with usage surging 120% in one week.',
    date: 'April 8, 2026',
    readTime: '16 min read'
  },
  {
    slug: 'china-ai-token-surge-gen-z',
    title: "China's AI Overtake: 31% Surge in Token Usage Signals Global Power Shift",
    category: 'AI Trends',
    excerpt: "Chinese AI models hit 12.96 trillion weekly tokens, surpassing US for 5 consecutive weeks. Inside the Gen Z revolution, $2B unicorn startups, and F-TAC Hand robotics breakthrough.",
    date: 'April 7, 2026',
    readTime: '17 min read'
  },
  {
    slug: 'china-embodied-ai-revolution-2026',
    title: "China's Embodied AI Revolution: How $30 Billion in Q1 Funding Is Reshaping Global Robotics",
    category: 'AI Trends',
    excerpt: "China's embodied intelligence sector raised $30 billion in Q1 2026 alone, creating 9 unicorn companies valued at $10B+. From Zhi Robotics' Tesla-like approach to Autobot's Big Tech backing, discover how China is winning the physical AI race.",
    date: 'April 6, 2026',
    readTime: '17 min read'
  },
  {
    slug: 'china-ai-avatar-revolution-2025',
    title: "China's AI Avatar Revolution: How 410 Million Views Transformed Content Creation Forever",
    category: 'AI Trends',
    excerpt: 'China\'s AI avatar market exploded to 410 million views in one week (+200% growth). From Xiaohongshu creators to IPO-bound giants like Guiji AI, discover how digital humans are reshaping content creation.',
    date: 'April 5, 2026',
    readTime: '16 min read'
  },
  {
    slug: 'china-ai-digital-human-revolution',
    title: "China's AI Digital Human Revolution: How 80,000 Virtual Avatars Are Reshaping the Creator Economy",
    category: 'AI Applications',
    excerpt: 'With 410 million Xiaohongshu views and Guiji AI\'s $440M IPO filing, China\'s AI digital human market is exploding. Analysis of HeyGen, Guiji, and the creator economy transformation.',
    date: 'April 5, 2026',
    readTime: '16 min read'
  },
  {
    slug: 'stepfun-terminal-ai-revolution',
    title: "StepFun's $7 Billion Bet: How China's AI Unicorn Is Winning the Terminal Race",
    category: 'AI Infrastructure',
    excerpt: 'With a record-breaking $700M funding round and former Megvii founder Yin Qi at the helm, StepFun is pioneering the shift from cloud AI to physical terminals. From 42 million smartphone deployments to AI-powered car cockpits.',
    date: 'April 3, 2026',
    readTime: '18 min read'
  },
  {
    slug: 'doubao-bytedance',
    title: 'ByteDance Doubao: The 200 Million User AI Assistant Reshaping Content Creation',
    category: 'AI Chatbots',
    excerpt: 'How ByteDance built the go-to AI assistant for China\'s content creator generation with deep TikTok and CapCut integration.',
    date: 'April 3, 2026',
    readTime: '15 min read'
  },
  {
    slug: 'tongyi-qianwen-alibaba',
    title: 'Alibaba Tongyi Qianwen: Enterprise AI Powerhouse',
    category: 'AI Chatbots',
    excerpt: 'How Alibaba leverages e-commerce supremacy and cloud infrastructure to dominate enterprise AI adoption in China.',
    date: 'April 2, 2026',
    readTime: '14 min read'
  },
  {
    slug: 'wenxin-yiyan-baidu',
    title: 'Baidu Wenxin Yiyan: The 300 Million User AI Assistant',
    category: 'AI Chatbots',
    excerpt: 'How Baidu built the most widely used AI assistant in China through ecosystem integration and first-mover advantage.',
    date: 'April 2, 2026',
    readTime: '14 min read'
  },
  {
    slug: 'ai-thesis-writing-china',
    title: 'AI Thesis Writing Explodes: How 12 Million Chinese Students Are Rewriting Academic Rules',
    category: 'AI Chatbots',
    excerpt: 'With 320 million views on Xiaohongshu, AI-assisted thesis writing has become a phenomenon reshaping China\'s higher education. A deep dive into the tools, workflows, and global implications.',
    date: 'April 2, 2026',
    readTime: '16 min read'
  },
  {
    slug: 'doubao-12-trillion-token-explosion',
    title: "Doubao's 12 Trillion Token Explosion: How ByteDance Is Quietly Winning the Global AI Race",
    category: 'AI Infrastructure',
    excerpt: 'ByteDance\'s Doubao model just hit 12 trillion daily tokens—a 1000x growth in under two years. With China capturing 30% of global AI market share and challenging the US tech oligopoly.',
    date: 'April 4, 2026',
    readTime: '16 min read'
  },
  {
    slug: 'ai-video-tools-china',
    title: 'Chinese AI Video Generation Tools',
    category: 'AI Video',
    excerpt: 'Analysis of Kling, Vidu, and other emerging video generation platforms competing with Sora in the Chinese market.',
    date: 'April 1, 2026',
    readTime: '8 min read'
  },
  {
    slug: 'minimax-talkie',
    title: 'MiniMax: The 212 Million User AI Companion Empire Built on Digital Intimacy',
    category: 'AI Chatbots',
    excerpt: 'How MiniMax built the world\'s largest AI companion platform with 212 million users across 200 countries through Talkie and emotional AI.',
    date: 'April 1, 2026',
    readTime: '16 min read'
  },
  {
    slug: 'qwen3-technical-analysis',
    title: "Qwen3 Technical Analysis: Alibaba's 235B MoE Model",
    category: 'Technical Analysis',
    excerpt: "How Alibaba's latest model achieves GPT-4 level performance with dynamic fast/deep reasoning modes, 22B active parameters, and 70% cost reduction.",
    date: 'March 31, 2026',
    readTime: '18 min read'
  },
  {
    slug: 'kimi-2m-context',
    title: "Kimi's 2M Token Context Analysis",
    category: 'AI Chatbots',
    excerpt: 'Technical deep dive into Moonshot AI\'s Long Context Piling architecture and how it enables processing of entire books in a single prompt.',
    date: 'March 31, 2026',
    readTime: '8 min read'
  },
  {
    slug: 'chinese-ai-index-2026',
    title: 'Chinese AI Index: 103 Companies Tracking',
    category: 'Market Intelligence',
    excerpt: 'Comprehensive tracking of Chinese AI companies including funding rounds, user metrics, and competitive positioning across chatbots, video, and enterprise tools.',
    date: 'March 31, 2026',
    readTime: '12 min read'
  },
  {
    slug: 'deepseek-v3-deep-dive',
    title: 'DeepSeek-V3: The $5.6M Training Run',
    category: 'Technical Analysis',
    excerpt: 'How DeepSeek achieved GPT-4 level performance with revolutionary MLA attention and FP8 training at a fraction of the cost.',
    date: 'March 31, 2026',
    readTime: '15 min read'
  },
  {
    slug: 'deepseek-vs-chatgpt',
    title: 'DeepSeek vs ChatGPT: Complete Comparison',
    category: 'AI Chatbots',
    excerpt: 'Side-by-side analysis of performance, pricing, availability, and use cases for the two leading AI chatbots in 2026.',
    date: 'March 31, 2026',
    readTime: '10 min read'
  },
  {
    slug: 'chinese-ai-landscape',
    title: 'The Rise of Chinese AI: Ecosystem Overview',
    category: 'Market Intelligence',
    excerpt: 'From foundation models to application layer: mapping the entire Chinese AI ecosystem and its global implications.',
    date: 'March 31, 2026',
    readTime: '10 min read'
  }
]

export const metadata = {
  title: 'Blog | AI in China',
  description: 'Latest analysis and insights on Chinese AI companies, products, and market trends.',
}

export default function BlogPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Header */}
      <header style={{ 
        borderBottom: '1px solid #1a1a1a',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(10px)',
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px 24px' }}>
          <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ 
              fontSize: '24px', 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none'
            }}>
              AI in China
            </Link>
            
            <div style={{ display: 'flex', gap: '32px' }}>
              <Link href="/blog" style={{ 
                color: '#e5e5e5', 
                textDecoration: 'none',
                fontSize: '15px'
              }}>
                Blog
              </Link>
              <Link href="/about" style={{ 
                color: '#a3a3a3', 
                textDecoration: 'none',
                fontSize: '15px'
              }}>
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Content */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '48px' }}>All Articles</h1>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px'
          }}>
            {posts.map((post) => (
              <article key={post.slug} style={{ 
                backgroundColor: '#111', 
                border: '1px solid #1a1a1a',
                borderRadius: '12px',
                padding: '24px'
              }}>
                <div style={{ 
                  fontSize: '12px', 
                  fontWeight: 600, 
                  color: '#22d3ee', 
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {post.category}
                </div>
                
                <Link 
                  href={`/blog/${post.slug}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <h2 style={{ 
                    fontSize: '20px', 
                    fontWeight: 600, 
                    marginBottom: '12px',
                    lineHeight: 1.3
                  }}>
                    {post.title}
                  </h2>
                </Link>
                
                <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.5 }}>
                  {post.excerpt}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginTop: '16px',
                  fontSize: '13px',
                  color: '#737373'
                }}>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 24px', 
        borderTop: '1px solid #1a1a1a',
        textAlign: 'center'
      }}>
        <p style={{ color: '#737373', fontSize: '14px' }}>© 2026 AI in China. All rights reserved.</p>
      </footer>
    </div>
  )
}