import Link from 'next/link'
import { allPosts } from '../lib/posts-meta'

export const metadata = {
  title: 'Sitemap | AI in China',
  description: 'Complete list of all articles and pages on AI in China.',
}

export default function SitemapPage() {
  // Group posts by category
  const postsByCategory = allPosts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = []
    }
    acc[post.category].push(post)
    return acc
  }, {})

  const categories = Object.keys(postsByCategory).sort()

  return (
    <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        marginBottom: '10px',
        color: '#e5e5e5'
      }}>
        Sitemap
      </h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>
        Complete list of all pages and articles on AI in China.
        <br />
        <a 
          href="/sitemap.xml" 
          style={{ color: '#3b82f6', textDecoration: 'none' }}
        >
          View XML Sitemap →
        </a>
      </p>

      {/* Main Pages */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          color: '#3b82f6',
          borderBottom: '2px solid #3b82f6',
          paddingBottom: '10px',
          marginBottom: '20px'
        }}>
          Main Pages
        </h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/" style={{ color: '#e5e5e5', textDecoration: 'none' }}>
              Home
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/blog" style={{ color: '#e5e5e5', textDecoration: 'none' }}>
              Blog
            </Link>
          </li>
          <li style={{ marginBottom: '10px' }}>
            <Link href="/about" style={{ color: '#e5e5e5', textDecoration: 'none' }}>
              About
            </Link>
          </li>
        </ul>
      </section>

      {/* Posts by Category */}
      {categories.map(category => (
        <section key={category} style={{ marginBottom: '40px' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: '#3b82f6',
            borderBottom: '2px solid #3b82f6',
            paddingBottom: '10px',
            marginBottom: '20px'
          }}>
            {category}
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {postsByCategory[category]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(post => (
                <li key={post.slug} style={{ marginBottom: '15px' }}>
                  <Link 
                    href={`/blog/${post.slug}`}
                    style={{ 
                      color: '#e5e5e5', 
                      textDecoration: 'none',
                      display: 'block'
                    }}
                  >
                    <span style={{ fontWeight: '500' }}>{post.title}</span>
                  </Link>
                  <span style={{ 
                    color: '#666', 
                    fontSize: '0.85rem',
                    display: 'block',
                    marginTop: '4px'
                  }}>
                    {post.date} • {post.readTime}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      ))}

      {/* Footer Info */}
      <footer style={{ 
        marginTop: '60px', 
        paddingTop: '20px',
        borderTop: '1px solid #333',
        color: '#666',
        fontSize: '0.9rem'
      }}>
        <p>
          Total: {allPosts.length} articles across {categories.length} categories
        </p>
        <p>
          Last updated: April 5, 2026
        </p>
      </footer>
    </main>
  )
}
