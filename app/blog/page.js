import Link from 'next/link'

const posts = [
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
    slug: 'tongyi-qianwen-alibaba',
    title: 'Alibaba Tongyi Qianwen: Enterprise AI Powerhouse',
    category: 'AI Chatbots',
    excerpt: 'How Alibaba leverages e-commerce supremacy and cloud infrastructure to dominate enterprise AI adoption in China.',
    date: 'April 2, 2026',
    readTime: '14 min read'
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