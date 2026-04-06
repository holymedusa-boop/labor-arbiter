import Link from 'next/link'

// SEO Metadata for each article
const postMetadata = {
  'china-embodied-ai-revolution-2026': {
    metaTitle: "China's Embodied AI Revolution: $30B Q1 Funding Reshapes Robotics",
    metaDescription: 'China\'s embodied intelligence sector raised $30 billion in Q1 2026, creating 9 unicorns valued at $10B+. From Zhi Robotics to Autobot, discover how China is winning the physical AI race.',
    keywords: 'embodied AI, China robotics, humanoid robots, Zhi Robotics, LimX Dynamics, Autobot Robotics, embodied intelligence, AI funding, robotics unicorn, physical AI',
  },
  'china-ai-avatar-revolution-2025': {
    metaTitle: "China's AI Avatar Revolution: 410M Views, 200% Growth",
    metaDescription: 'China\'s AI avatar market hit 410M views with 200% weekly growth. Explore how Guiji AI, Shanjian, and HeyGen are transforming content creation for 21M creators.',
    keywords: 'AI avatar, digital human, China AI, Xiaohongshu, content creation, Guiji AI, HeyGen, virtual influencer, AI video, digital twin',
  },
  'china-ai-digital-human-revolution': {
    metaTitle: "China's AI Digital Human Revolution: 80,000 Virtual Avatars Reshaping Content",
    metaDescription: 'With 410 million Xiaohongshu views and Guiji AI\'s $440M IPO, China\'s digital human market is exploding. Analysis of HeyGen, Guiji, and the creator economy transformation.',
    keywords: 'AI digital human, China AI avatar, Guiji AI, HeyGen, virtual influencer, AI live streaming, digital creator economy, silicon intelligence, AI digital twin, Xiaohongshu AI',
  },
  'stepfun-terminal-ai-revolution': {
    metaTitle: "StepFun's $7 Billion Bet: China's AI Unicorn Winning the Terminal Race",
    metaDescription: 'With a record-breaking $700M funding round and Yin Qi at the helm, StepFun pioneers the shift from cloud AI to physical terminals. Analysis of 42M smartphone deployments and AI cockpits.',
    keywords: 'StepFun, 阶跃星辰, AI terminals, Yin Qi, on-device AI, smart cockpit, China AI, terminal AI, AI infrastructure, voice AI, automotive AI',
  },
  'deepseek-v3-deep-dive': {
    metaTitle: 'DeepSeek-V3: The $5.6M Training Run That Changed AI Economics',
    metaDescription: 'How DeepSeek trained a frontier-level LLM for $5.6M—18x cheaper than GPT-4. Technical breakdown of MLA, MoE architecture, and FP8 training.',
    keywords: 'DeepSeek-V3, DeepSeek, Chinese AI, LLM training, MoE architecture, MLA attention, FP8 training, AI economics',
  },
  'kimi-k2-5-analysis': {
    metaTitle: 'Kimi K2.5: Moonshot AI\'s 1M Context Window Powerhouse',
    metaDescription: 'Complete analysis of Kimi K2.5 with 1 million token context window. How Moonshot AI challenges OpenAI with long-context capabilities.',
    keywords: 'Kimi K2.5, Moonshot AI, long context LLM, Chinese AI, 1M tokens, context window, AI assistant',
  },
  'chinese-ai-index-2026': {
    metaTitle: 'Chinese AI Index 2026: The Complete Market Landscape',
    metaDescription: 'Comprehensive index of 103+ Chinese AI companies, $15B+ in funding, and the ecosystem reshaping global AI. Market intelligence report.',
    keywords: 'Chinese AI Index, AI market China, Chinese AI companies, AI funding, AI ecosystem, market intelligence',
  },
  'deepseek-vs-chatgpt': {
    metaTitle: 'DeepSeek vs ChatGPT: Can China\'s $5.6M Model Compete?',
    metaDescription: 'Head-to-head comparison: DeepSeek-V3 vs GPT-4o. Cost efficiency, performance benchmarks, and the future of open-weight AI.',
    keywords: 'DeepSeek vs ChatGPT, DeepSeek-V3 comparison, GPT-4 alternative, Chinese AI vs OpenAI, LLM benchmarks',
  },
  'chinese-ai-landscape': {
    metaTitle: 'The Rise of Chinese AI: Ecosystem Overview 2026',
    metaDescription: 'Deep dive into China\'s AI ecosystem: from DeepSeek to ByteDance, how Chinese companies are reshaping global AI competition.',
    keywords: 'Chinese AI ecosystem, China AI landscape, DeepSeek, ByteDance AI, Baidu AI, Alibaba AI',
  },
  'ai-video-tools-china': {
    metaTitle: 'Chinese AI Video Generation: Kling, Hailuo & the Creative Revolution',
    metaDescription: 'Analysis of China\'s leading AI video generators: Kling, Hailuo MiniMax, and Zhipu\'s CogVideo. How they compare to Sora and Runway.',
    keywords: 'Chinese AI video, Kling AI, Hailuo MiniMax, CogVideo, AI video generation, China video AI, Sora alternative',
  },
  'tongyi-qianwen-alibaba': {
    metaTitle: 'Alibaba Tongyi Qianwen: The E-commerce Giant\'s AI Play',
    metaDescription: 'Comprehensive analysis of Alibaba\'s Tongyi Qianwen models, from Qwen-72B to Qwen2-VL. How Alibaba leverages its ecosystem for AI dominance.',
    keywords: 'Tongyi Qianwen, Alibaba AI, Qwen model, Chinese LLM, Alibaba cloud AI, Qwen-72B, Qwen2-VL',
  },
  'wenxin-yiyan-baidu': {
    metaTitle: 'Baidu Wenxin Yiyan: 300 Million Users and Counting',
    metaDescription: 'Inside Baidu\'s Wenxin Yiyan: How the 300M-user AI assistant built China\'s largest AI ecosystem with Ernie Bot and PaddlePaddle.',
    keywords: 'Wenxin Yiyan, Baidu AI, Ernie Bot, Chinese chatbot, Baidu AI assistant, 300 million users',
  },
  'doubao-bytedance': {
    metaTitle: 'ByteDance Doubao: 200M Users Reshaping Content Creation',
    metaDescription: 'ByteDance\'s Doubao AI assistant: How 200 million users leverage TikTok integration, CapCut workflow, and creator tools for content production.',
    keywords: 'ByteDance Doubao, Doubao AI, TikTok AI, CapCut AI, Chinese AI assistant, content creator AI, 200 million users',
  },
  'minimax-talkie': {
    metaTitle: 'MiniMax Talkie: 212M User AI Companion Empire',
    metaDescription: 'How MiniMax built the world\'s largest AI companion platform with 212M users. Talkie, 星野, Hailuo AI video, and the future of emotional AI.',
    keywords: 'MiniMax Talkie, MiniMax AI, AI companion, Chinese AI, Talkie app, Hailuo AI, emotional AI, 212 million users',
  },
  'ai-thesis-writing-china': {
    metaTitle: 'AI Thesis Writing Explodes: How 12 Million Chinese Students Are Rewriting Academic Rules | AI in China',
    metaDescription: 'With 320 million views on Xiaohongshu, AI-assisted thesis writing has become a phenomenon reshaping China\'s higher education. A deep dive into the tools, workflows, and global implications.',
    keywords: 'AI thesis writing, Chinese students, academic writing, education technology, Kimi, thesis tools, plagiarism detection, China AI',
  },
  'doubao-12-trillion-token-explosion': {
    metaTitle: 'Doubao\'s 12 Trillion Token Explosion: How ByteDance Is Quietly Winning the Global AI Race',
    metaDescription: 'ByteDance\'s Doubao model just hit 12 trillion daily tokens—a 1000x growth in under two years. With China capturing 30% of global AI market share and challenging the US tech oligopoly.',
    keywords: 'Doubao, ByteDance, Volcano Engine, China AI, LLM market share, AI tokens, OpenRouter, AI economics, 12 trillion tokens',
  },
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params
  const post = posts[slug]
  const meta = postMetadata[slug]
  
  if (!post || !meta) {
    return {
      title: 'Article Not Found | AI in China',
    }
  }
  
  return {
    title: meta.metaTitle,
    description: meta.metaDescription,
    keywords: meta.keywords,
    authors: [{ name: 'AI in China' }],
    openGraph: {
      title: meta.metaTitle,
      description: meta.metaDescription,
      url: `https://www.ainchina.com/blog/${slug}/`,
      siteName: 'AI in China',
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: ['AI in China'],
      section: post.category,
      tags: meta.keywords.split(', '),
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.metaTitle,
      description: meta.metaDescription,
      creator: '@ainchina',
      images: [post.heroImage],
    },
    alternates: {
      canonical: `https://www.ainchina.com/blog/${slug}/`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}
