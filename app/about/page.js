import Link from 'next/link'

export const metadata = {
  title: 'About | AI in China',
  description: 'Learn about AI in China - our mission to track and analyze the Chinese AI ecosystem.',
}

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#e5e5e5' }}>
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
                color: '#a3a3a3', 
                textDecoration: 'none',
                fontSize: '15px'
              }}>
                Blog
              </Link>
              <Link href="/about" style={{ 
                color: '#e5e5e5', 
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
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '32px' }}>About AI in China</h1>
          
          <p style={{ fontSize: '18px', color: '#a3a3a3', lineHeight: 1.7, marginBottom: '24px' }}>
            AI in China tracks the most significant artificial intelligence companies, products, 
            and trends emerging from China. Our mission is to provide global investors, builders, 
            and researchers with accurate, timely intelligence on this rapidly evolving ecosystem.
          </p>
          
          <p style={{ fontSize: '18px', color: '#a3a3a3', lineHeight: 1.7, marginBottom: '24px' }}>
            From foundational models like DeepSeek and Kimi to application-layer innovations 
            in video generation, education, and productivity tools, we cover the full spectrum 
            of Chinese AI development.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: 600, marginTop: '48px', marginBottom: '20px' }}>What We Track</h2>
          
          <ul style={{ fontSize: '17px', color: '#a3a3a3', lineHeight: 1.8, paddingLeft: '24px' }}>
            <li>Foundation model companies and their technical capabilities</li>
            <li>Application-layer AI products and user metrics</li>
            <li>Funding rounds and investment trends</li>
            <li>Regulatory developments and policy impacts</li>
            <li>Competitive positioning vs global alternatives</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: 600, marginTop: '48px', marginBottom: '20px' }}>Our Approach</h2>
          
          <p style={{ fontSize: '18px', color: '#a3a3a3', lineHeight: 1.7, marginBottom: '24px' }}>
            We combine primary research, technical analysis, and market intelligence to provide 
            insights you won't find elsewhere. Our coverage is independent and focused on what 
            matters: technology quality, user adoption, and business viability.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: 600, marginTop: '48px', marginBottom: '20px' }}>Contact</h2>
          
          <p style={{ fontSize: '18px', color: '#a3a3a3', lineHeight: 1.7 }}>
            For inquiries, partnership opportunities, or corrections, reach out at{' '}
            <a href="mailto:contact@ainchina.com" style={{ color: '#22d3ee', textDecoration: 'none' }}>
              contact@ainchina.com
            </a>
          </p>
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