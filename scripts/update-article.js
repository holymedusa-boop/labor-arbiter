const fs = require('fs');
const path = require('path');

// Read the full article content
const articlePath = path.join(__dirname, '../content/posts/china-embodied-ai-revolution-2026.md');
const pageJsPath = path.join(__dirname, '../app/blog/[slug]/page.js');

const articleContent = fs.readFileSync(articlePath, 'utf-8');

// Extract body (remove frontmatter)
const bodyMatch = articleContent.match(/---[\s\S]*?---\s*([\s\S]*)/);
const body = bodyMatch ? bodyMatch[1].trim() : articleContent;

// Escape for JavaScript template literal
const escaped = body
  .replace(/\\\\/g, '\\\\\\\\')
  .replace(/`/g, '\\`')
  .replace(/\\$/g, '\\$');

// Create the new posts entry
const newEntry = `  'china-embodied-ai-revolution-2026': {
    title: "China's Embodied AI Revolution: How $30 Billion in Q1 Funding Is Reshaping Global Robotics",
    category: 'AI Trends',
    date: 'April 6, 2026',
    readTime: '17 min read',
    heroImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=600&fit=crop',
    content: \`
${escaped}
\`,
  },`;

// Read current page.js
let pageJs = fs.readFileSync(pageJsPath, 'utf-8');

// Find and replace the existing entry
const entryRegex = /  'china-embodied-ai-revolution-2026':\s*\{[\s\S]*?content:\s*\`[\s\S]*?\`,\s*\},/;

if (entryRegex.test(pageJs)) {
  pageJs = pageJs.replace(entryRegex, newEntry);
  console.log('✅ 已替换现有文章条目');
} else {
  // Insert after 'const posts = {'
  pageJs = pageJs.replace(
    /const posts = \{/, 
    `const posts = {\n${newEntry}`
  );
  console.log('✅ 已插入新文章条目');
}

// Write back
fs.writeFileSync(pageJsPath, pageJs, 'utf-8');
console.log('✅ page.js 已更新');
console.log('📊 内容统计:');
console.log('   - 字符数:', body.length);
console.log('   - 估计词数:', body.split(/\s+/).length);
console.log('   - 表格行数:', (body.match(/\|.*\|.*\|/g) || []).length);
