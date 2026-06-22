import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, basename } from 'path'

function fixFile(filePath) {
  const orig = readFileSync(filePath, 'utf8')
  let content = orig
  // Fix encoding artifacts from PowerShell UTF-8 botch
  content = content.replaceAll('Â·', '·')   // Â· -> ·
  content = content.replaceAll('Â ', ' ')         // Â  -> space
  content = content.replaceAll('Ã¢â¬â¢', "'") // â€™ -> '
  content = content.replaceAll('â\x80\x94', '—')      // â€" -> —
  content = content.replaceAll('â\x80\x99', '’')      // â€™ -> '
  if (content !== orig) {
    writeFileSync(filePath, content, 'utf8')
    console.log('Fixed: ' + basename(filePath))
  }
}

function walk(dir) {
  for (const f of readdirSync(dir)) {
    if (f === 'node_modules' || f === '.next' || f === '.git') continue
    const full = join(dir, f)
    if (statSync(full).isDirectory()) walk(full)
    else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.css')) fixFile(full)
  }
}

walk('C:/Users/zexc/Desktop/web dev/yasminas-bites')
console.log('Done')
