export default function Qwen3Article() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
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
            <a href="/" style={{ 
              fontSize: '24px', 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none'
            }}>
              AI in China
            </a>
            
            <div style={{ display: 'flex', gap: '32px' }}>
              <a href="/blog" style={{ 
                color: '#a3a3a3', 
                textDecoration: 'none',
                fontSize: '15px'
              }}>
                Blog
              </a>
              <a href="/about" style={{ 
                color: '#a3a3a3', 
                textDecoration: 'none',
                fontSize: '15px'
              }}>
                About
              </a>
            </div>
          </nav>
        </div>
      </header>

      <div style={{
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop"
          alt="Qwen3 AI Model Architecture"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to top, #0a0a0a, transparent)'
        }}/>
      </div>

      <article style={{ padding: '20px 24px 60px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div style={{ 
            fontSize: '12px', 
            fontWeight: 600, 
            color: '#22d3ee',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '16px'
          }}>
            Technical Analysis
          </div>
          
          <h1 style={{ 
            fontSize: '44px', 
            fontWeight: 700, 
            marginBottom: '20px',
            lineHeight: 1.15,
            color: '#e5e5e5',
            letterSpacing: '-0.5px'
          }}>
            Qwen3 Technical Analysis: Alibaba's 235B MoE Model with Hybrid Reasoning Architecture
          </h1>
          
          <div style={{ 
            display: 'flex', 
            gap: '16px',
            color: '#737373',
            fontSize: '14px',
            marginBottom: '56px'
          }}>
            <span>March 31, 2026</span>
            <span>•</span>
            <span>18 min read</span>
          </div>
          
          <div>
            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              In March 2026, Alibaba Cloud released Qwen3, introducing a novel hybrid reasoning architecture that dynamically switches between fast thinking and deep reasoning modes. This 235B parameter Mixture-of-Experts model achieves GPT-4 level performance with only 22B active parameters per token, delivering a 70% cost reduction compared to Western alternatives.
            </p>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              This is the complete technical breakdown of how Alibaba achieved this breakthrough in efficient AI inference.
            </p>

            <h2 style={{ 
              fontSize: '30px', 
              fontWeight: 600, 
              marginTop: '48px', 
              marginBottom: '24px',
              color: '#e5e5e5',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '12px'
            }}>
              The Numbers That Define Efficiency
            </h2>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              Qwen3's architecture represents a paradigm shift in large language model design:
            </p>

            <div style={{ overflowX: 'auto', margin: '24px 0' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '14px',
                minWidth: '500px'
              }}>
                <tbody>
                  <tr style={{
                    backgroundColor: '#1a1a1a',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>Metric</td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>Qwen3-235B</td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>GPT-4o</td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>Efficiency Gain</td>
                  </tr>
                  <tr style={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>Total Parameters</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>235B</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>~1.8T</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>7.7x smaller</td>
                  </tr>
                  <tr style={{
                    backgroundColor: '#111',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>Active Parameters</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>22B per token</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>~1.8T</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>82x efficiency</td>
                  </tr>
                  <tr style={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>Context Window</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>128K tokens</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>128K tokens</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>Parity</td>
                  </tr>
                  <tr style={{
                    backgroundColor: '#111',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>API Cost (per 1M tokens)</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>$0.80</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>$2.50</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>68% cheaper</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ 
              fontSize: '30px', 
              fontWeight: 600, 
              marginTop: '48px', 
              marginBottom: '24px',
              color: '#e5e5e5',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '12px'
            }}>
              Architecture Innovation: Hybrid Reasoning
            </h2>

            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: '36px', 
              marginBottom: '16px',
              color: '#22d3ee'
            }}>
              The Dual-Mode System
            </h3>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              Qwen3's most significant innovation is its <strong style={{ color: '#e5e5e5' }}>hybrid reasoning architecture</strong>. Unlike traditional models that use a single inference path, Qwen3 implements:
            </p>

            <ul style={{ 
              margin: '20px 0', 
              paddingLeft: '24px',
              color: '#d4d4d4'
            }}>
              <li style={{ margin: '10px 0', lineHeight: 1.7 }}>
                <strong style={{ color: '#e5e5e5' }}>Fast Thinking Mode:</strong> Direct token generation for straightforward queries, using only 22B active parameters
              </li>
              <li style={{ margin: '10px 0', lineHeight: 1.7 }}>
                <strong style={{ color: '#e5e5e5' }}>Deep Reasoning Mode:</strong> Extended chain-of-thought processing for complex problems, activating additional computation paths
              </li>
              <li style={{ margin: '10px 0', lineHeight: 1.7 }}>
                <strong style={{ color: '#e5e5e5' }}>Dynamic Switching:</strong> Model automatically selects appropriate mode based on query complexity
              </li>
            </ul>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              This approach addresses the efficiency concerns raised by DeepSeek-R1's always-on reasoning approach while maintaining high performance on complex tasks.
            </p>

            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              marginTop: '36px', 
              marginBottom: '16px',
              color: '#22d3ee'
            }}>
              MoE Implementation: Sparse Efficiency
            </h3>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              Qwen3 uses a <strong style={{ color: '#e5e5e5' }}>sparse MoE architecture</strong> with unprecedented efficiency:
            </p>

            <ul style={{ 
              margin: '20px 0', 
              paddingLeft: '24px',
              color: '#d4d4d4'
            }}>
              <li style={{ margin: '10px 0', lineHeight: 1.7 }}>
                <strong style={{ color: '#e5e5e5' }}>128 routed experts</strong> with top-8 routing per token
              </li>
              <li style={{ margin: '10px 0', lineHeight: 1.7 }}>
                <strong style={{ color: '#e5e5e5' }}>Shared experts</strong> activated for all tokens to maintain common knowledge
              </li>
              <li style={{ margin: '10px 0', lineHeight: 1.7 }}>
                <strong style={{ color: '#e5e5e5' }}>Load balancing</strong> mechanisms to prevent expert collapse
              </li>
              <li style={{ margin: '10px 0', lineHeight: 1.7 }}>
                <strong style={{ color: '#e5e5e5' }}>Expert specialization</strong> across different knowledge domains and reasoning patterns
              </li>
            </ul>

            <h2 style={{ 
              fontSize: '30px', 
              fontWeight: 600, 
              marginTop: '48px', 
              marginBottom: '24px',
              color: '#e5e5e5',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '12px'
            }}>
              Benchmark Performance
            </h2>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              Qwen3 demonstrates competitive performance across all major benchmarks:
            </p>

            <div style={{ overflowX: 'auto', margin: '24px 0' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '14px',
                minWidth: '500px'
              }}>
                <tbody>
                  <tr style={{
                    backgroundColor: '#1a1a1a',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>Benchmark</td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>Qwen3-235B</td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>GPT-4o</td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>DeepSeek-V3</td>
                  </tr>
                  <tr style={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>MMLU</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>87.2%</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>87.2%</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>87.1%</td>
                  </tr>
                  <tr style={{
                    backgroundColor: '#111',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>MATH-500</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>85.1%</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>76.6%</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>90.2%</td>
                  </tr>
                  <tr style={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>HumanEval</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>92.1%</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>90.2%</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>92.0%</td>
                  </tr>
                  <tr style={{
                    backgroundColor: '#111',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>C-Eval (Chinese)</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>91.8%</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>76.0%</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>86.1%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ 
              fontSize: '30px', 
              fontWeight: 600, 
              marginTop: '48px', 
              marginBottom: '24px',
              color: '#e5e5e5',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '12px'
            }}>
              Cost Efficiency: The Economics of Qwen3
            </h2>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              Qwen3 positions itself as a cost-effective alternative, priced at approximately <strong style={{ color: '#e5e5e5' }}>30% of GPT-4o's cost</strong> while delivering comparable or superior performance on many benchmarks.
            </p>

            <div style={{ overflowX: 'auto', margin: '24px 0' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '14px',
                minWidth: '500px'
              }}>
                <tbody>
                  <tr style={{
                    backgroundColor: '#1a1a1a',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>Model</td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>Input (per 1M)</td>
                    <td style={{
                      padding: '12px 16px',
                      fontWeight: 600,
                      color: '#22d3ee',
                      textAlign: 'left'
                    }}>Output (per 1M)</td>
                  </tr>
                  <tr style={{
                    backgroundColor: '#111',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>Qwen3-235B</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>$0.80</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>$2.40</td>
                  </tr>
                  <tr style={{
                    backgroundColor: 'transparent',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>GPT-4o</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>$2.50</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>$10.00</td>
                  </tr>
                  <tr style={{
                    backgroundColor: '#111',
                    borderBottom: '1px solid #2a2a2a'
                  }}>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>DeepSeek-V3</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>$0.27</td>
                    <td style={{
                      padding: '12px 16px',
                      color: '#d4d4d4',
                      textAlign: 'left'
                    }}>$1.10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 style={{ 
              fontSize: '30px', 
              fontWeight: 600, 
              marginTop: '48px', 
              marginBottom: '24px',
              color: '#e5e5e5',
              borderBottom: '1px solid #1a1a1a',
              paddingBottom: '12px'
            }}>
              Conclusion: Deployment Economics Matter
            </h2>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              Qwen3 represents a pragmatic evolution in large language model design, prioritizing <strong style={{ color: '#e5e5e5' }}>deployment flexibility</strong> over raw benchmark performance. Its hybrid reasoning architecture addresses real-world production concerns around cost and latency while maintaining competitive capabilities.
            </p>

            <p style={{ 
              fontSize: '17px', 
              lineHeight: 1.8,
              color: '#d4d4d4',
              margin: '16px 0'
            }}>
              For teams building Chinese-English bilingual applications or seeking cost-effective alternatives to GPT-4o, Qwen3 offers a compelling value proposition. The automatic reasoning mode switching is particularly valuable for applications with mixed query complexity.
            </p>

            <div style={{
              backgroundColor: '#111',
              borderLeft: '3px solid #22d3ee',
              padding: '20px',
              marginTop: '32px',
              borderRadius: '0 8px 8px 0'
            }}>
              <p style={{ 
                margin: 0, 
                fontWeight: 600, 
                fontSize: '17px',
                color: '#e5e5e5',
                lineHeight: 1.6
              }}>
                Bottom Line: Qwen3 doesn't win every benchmark, but it wins on <strong style={{ color: '#22d3ee' }}>practical deployment economics</strong>—an increasingly important factor as AI moves from experimentation to production at scale.
              </p>
            </div>
          </div>
        </div>
      </article>

      <footer style={{ 
        padding: '48px 24px', 
        borderTop: '1px solid #1a1a1a',
        textAlign: 'center'
      }}>
        <p style={{ color: '#737373', fontSize: '14px' }}>
          © 2026 AI in China. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
