import Link from 'next/link'

// Auto-import posts from shared metadata
const { allPosts } = require('../lib/posts-meta')

// Helper to format ISO date (2026-04-21) → "April 21, 2026"
function formatDate(isoDate) {
  const d = new Date(isoDate + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// Take the latest 6 posts (already sorted newest-first in posts-meta.js)
const posts = allPosts.slice(0, 6).map(post => ({
  ...post,
  date: formatDate(post.date)
}))

const stats = [
  { value: '103+', label: 'Companies Tracked' },
  { value: '$15.2B', label: 'Total Funding' },
  { value: '500M+', label: 'Global Users' },
  { value: '24/7', label: 'Market Updates' }
]

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e5e5e5' }}>
      {/* Header */}
      <header style={{ 
        borderBottom: '1px solid #1a1a1a',
        position: 'sticky',
        top: 0,
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
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
                color: '#a3a3a3', 
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

      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            backgroundColor: 'rgba(34, 211, 238, 0.1)',
            border: '1px solid rgba(34, 211, 238, 0.3)',
            borderRadius: '9999px',
            color: '#22d3ee',
            fontSize: '14px',
            marginBottom: '32px'
          }}>
            <span style={{ 
              width: '8px', 
              height: '8px', 
              backgroundColor: '#22d3ee', 
              borderRadius: '50%',
              display: 'inline-block'
            }}></span>
            Tracking 103+ Chinese AI Companies
          </div>
          
          <h1 style={{ 
            fontSize: 'clamp(40px, 8vw, 64px)', 
            fontWeight: 700, 
            marginBottom: '24px',
            lineHeight: 1.1
          }}>
            The Rise of{' '}
            <span style={{
              background: 'linear-gradient(135deg, #22d3ee, #3b82f6, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Chinese AI
            </span>
          </h1>
          
          <p style={{ 
            fontSize: '20px', 
            color: '#a3a3a3', 
            marginBottom: '40px',
            lineHeight: 1.6
          }}>
            Comprehensive analysis of Chinese AI companies, products, and market intelligence 
            for global investors and builders. Technical deep dives, funding data, and competitive intelligence.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '64px',
        flexWrap: 'wrap',
        padding: '40px 24px',
        borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a'
      }}>
        {stats.map((stat, i) => (
          <div key={i} style={{ textAlign: 'center', minWidth: '140px' }}>
            <div style={{ fontSize: '40px', fontWeight: 700, color: '#22d3ee' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '14px', color: '#737373', marginTop: '4px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      {/* Latest Posts */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '48px'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 600 }}>Latest Deep Dives</h2>
            
            <Link 
              href="/blog" 
              style={{ 
                color: '#22d3ee', 
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              View all →
            </Link>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '28px'
          }}>
            {posts.map((post) => (
              <article key={post.slug} style={{ 
                backgroundColor: '#111', 
                border: '1px solid #1a1a1a',
                borderRadius: '12px',
                padding: '28px',
                transition: 'all 0.2s',
                cursor: 'pointer',
                ':hover': {
                  borderColor: '#22d3ee'
                }
              }}
              >
                <div style={{ 
                  fontSize: '11px', 
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
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: 600, 
                    marginBottom: '12px',
                    lineHeight: 1.4
                  }}>
                    {post.title}
                  </h3>
                </Link>
                
                <p style={{ fontSize: '15px', color: '#a3a3a3', lineHeight: 1.6, marginBottom: '16px' }}>
                  {post.excerpt}
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
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

      {/* Newsletter */}
      <section style={{ padding: '60px 24px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>Stay Updated</h3>
          <p style={{ fontSize: '16px', color: '#a3a3a3', marginBottom: '24px' }}>
            Get weekly analysis on Chinese AI companies, funding rounds, and market trends.
          </p>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a 
              href="https://twitter.com/ainchina" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '12px 24px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#e5e5e5',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Follow on X/Twitter
            </a>
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