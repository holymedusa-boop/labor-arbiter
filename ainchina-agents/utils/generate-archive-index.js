const fs = require('fs');
const path = require('path');

// Configuration
const SESSIONS_DIR = path.join(__dirname, '..', 'sessions');
const ARCHIVE_DIR = path.join(__dirname, '..', 'archive');
const REPORTS_DIR = path.join(__dirname, '..', 'reports');

// Calculate cutoff date (7 days ago)
const cutoffDate = new Date();
cutoffDate.setDate(cutoffDate.getDate() - 7);
cutoffDate.setHours(0, 0, 0, 0);

console.log(`\n🗂️  Session Archive Task - ${new Date().toISOString()}`);
console.log(`Cutoff date: ${cutoffDate.toISOString().split('T')[0]}\n`);

// Ensure directories exist
[ARCHIVE_DIR, REPORTS_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Get all session files
const getSessionFiles = () => {
  const files = [];
  if (!fs.existsSync(SESSIONS_DIR)) return files;
  
  const entries = fs.readdirSync(SESSIONS_DIR, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith('.md')) {
      const filePath = path.join(SESSIONS_DIR, entry.name);
      const stats = fs.statSync(filePath);
      files.push({
        name: entry.name,
        path: filePath,
        mtime: stats.mtime,
        size: stats.size
      });
    }
  }
  return files;
};

// Archive old sessions
const archiveSessions = () => {
  const files = getSessionFiles();
  const archivedFiles = [];
  const skippedFiles = [];
  
  for (const file of files) {
    const fileDate = new Date(file.mtime);
    fileDate.setHours(0, 0, 0, 0);
    
    if (fileDate < cutoffDate) {
      // Determine archive month folder
      const yearMonth = file.mtime.toISOString().slice(0, 7); // YYYY-MM
      const monthDir = path.join(ARCHIVE_DIR, yearMonth);
      
      if (!fs.existsSync(monthDir)) {
        fs.mkdirSync(monthDir, { recursive: true });
      }
      
      const destPath = path.join(monthDir, file.name);
      fs.copyFileSync(file.path, destPath);
      fs.unlinkSync(file.path);
      
      archivedFiles.push({
        name: file.name,
        archivedTo: destPath,
        date: file.mtime.toISOString().split('T')[0],
        size: file.size
      });
      console.log(`  ✅ Archived: ${file.name} → archive/${yearMonth}/`);
    } else {
      skippedFiles.push(file.name);
    }
  }
  
  return { archivedFiles, skippedFiles };
};

// Generate topic index
const generateIndex = () => {
  const index = {
    generatedAt: new Date().toISOString(),
    cutoffDate: cutoffDate.toISOString().split('T')[0],
    archives: {}
  };
  
  // Scan archive directories
  if (fs.existsSync(ARCHIVE_DIR)) {
    const yearMonths = fs.readdirSync(ARCHIVE_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => d.name)
      .sort();
    
    for (const ym of yearMonths) {
      const monthDir = path.join(ARCHIVE_DIR, ym);
      const files = fs.readdirSync(monthDir)
        .filter(f => f.endsWith('.md'))
        .sort();
      
      index.archives[ym] = {
        count: files.length,
        files: files.map(f => {
          const content = fs.readFileSync(path.join(monthDir, f), 'utf8').slice(0, 200);
          const title = content.split('\n')[0].replace(/^#\s*/, '') || f.replace('.md', '');
          return {
            name: f,
            title: title
          };
        })
      };
    }
  }
  
  // Write index file
  const indexPath = path.join(ARCHIVE_DIR, 'index.md');
  let indexContent = `# Session Archive Index\n\n`;
  indexContent += `Generated: ${index.generatedAt}\n\n`;
  indexContent += `## Archive Overview\n\n`;
  
  for (const [ym, data] of Object.entries(index.archives)) {
    indexContent += `### ${ym}\n\n`;
    indexContent += `Total: ${data.count} sessions\n\n`;
    for (const file of data.files) {
      indexContent += `- [${file.title}](${ym}/${file.name})\n`;
    }
    indexContent += '\n';
  }
  
  fs.writeFileSync(indexPath, indexContent);
  console.log(`\n  📋 Index generated: ${indexPath}`);
  
  return index;
};

// Generate report
const generateReport = (archivedFiles, skippedFiles) => {
  const report = {
    task: 'session-auto-archive-v2',
    executedAt: new Date().toISOString(),
    cutoffDate: cutoffDate.toISOString().split('T')[0],
    summary: {
      archived: archivedFiles.length,
      skipped: skippedFiles.length,
      totalSpace: archivedFiles.reduce((sum, f) => sum + f.size, 0)
    },
    archivedFiles,
    skippedFiles
  };
  
  const reportName = `archive-report-${new Date().toISOString().slice(0, 10)}.json`;
  const reportPath = path.join(REPORTS_DIR, reportName);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`\n  📊 Report generated: ${reportPath}`);
  
  return report;
};

// Main execution
const main = () => {
  console.log('📁 Scanning for old sessions...\n');
  
  const { archivedFiles, skippedFiles } = archiveSessions();
  const index = generateIndex();
  const report = generateReport(archivedFiles, skippedFiles);
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Session Archive Complete');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📦 Archived: ${archivedFiles.length} files`);
  console.log(`⏭️  Skipped (recent): ${skippedFiles.length} files`);
  console.log(`📊 Total space freed: ${(report.summary.totalSpace / 1024).toFixed(2)} KB`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
};

main();
