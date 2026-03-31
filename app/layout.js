export const metadata = {
  title: 'AI in China | Tracking Chinese AI Companies & Products',
  description: 'Comprehensive analysis of Chinese AI companies, products, and market intelligence for global investors and builders.',
  keywords: 'Chinese AI, DeepSeek, Kimi, Moonshot, ByteDance, AI technology, artificial intelligence',
  openGraph: {
    title: 'AI in China',
    description: 'Tracking 103+ Chinese AI companies reshaping global tech',
    url: 'https://www.ainchina.com',
    siteName: 'AI in China',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI in China',
    description: 'Tracking 103+ Chinese AI companies reshaping global tech',
  },
  alternates: {
    canonical: 'https://www.ainchina.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-GK21PLH8V8"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GK21PLH8V8');
            `,
          }}
        />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0,
        backgroundColor: '#0a0a0a',
        color: '#e5e5e5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        {children}
      </body>
    </html>
  )
}