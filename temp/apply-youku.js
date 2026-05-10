const fs = require('fs');

const orig = fs.readFileSync(process.env.HOME + '/temp/original_catalogue.md', 'utf8');

// Extract all Youku links
const youku = [];
const pattern = /\[([^\]]+)\]\((https?:\/\/[^\)]*youku[^\)]*)\)/g;
let m;
while ((m = pattern.exec(orig)) !== null) {
  const title = m[1].trim().replace(/\\/g, '');
  const url = m[2].trim().replace(/\?.*$/, '');
  if (!youku.find(l => l.title === title)) youku.push({ title, url });
}

function norm(s) {
  return s.toLowerCase()
    .replace(/[──—_·\s\u3000]+/g, '')
    .replace(/["""'']/g, '"')
    .replace(/（/g, '(').replace(/）/g, ')')
    .replace(/：/g, ':').replace(/，/g, ',').replace(/。/g, '')
    .replace(/\.mp4$/g, '');
}

// Manual match: find youku link where the youku title contains the entry's core phrase
function matchEntry(entryTitle) {
  const n = norm(entryTitle);
  // Extract key phrases (8+ chars, excluding common words)
  const phrases = entryTitle
    .replace(/[──—·、，,.()（）\[\]"\"\s\d_+#]+/g, ' ')
    .split(/\s+/)
    .filter(w => w.length >= 6 && !['通用人工智能','人工智能','通用','智能系统'].includes(w));

  for (const phrase of phrases) {
    const np = norm(phrase);
    for (const link of youku) {
      if (norm(link.title).includes(np)) return link;
    }
  }
  // Try numeric markers like (一), (二), 系列之, etc.
  const markers = entryTitle.match(/[（(][一二三四五六七八九十\d]+[）)]|系列之[一二三四五六七八九十\d]+/g);
  if (markers) {
    for (const mk of markers) {
      for (const link of youku) {
        if (link.title.includes(mk)) return link;
      }
    }
  }
  return null;
}

// Read current file
const curr = fs.readFileSync('wiki/content/conference/group_meeting_catalogue.md', 'utf8');
const lines = curr.split('\n');

// Build output: replace year section entries with linked versions
const outLines = [...lines];

let inSection = false;
let sectionYear = '';
let entryIdx = 0;

for (let i = 0; i < lines.length; i++) {
  const ym = lines[i].match(/^## (\d{4}-\d{4} 学年)/);
  if (ym) {
    sectionYear = ym[1];
    entryIdx = 0;
    inSection = (parseInt(sectionYear) <= 2018);
    continue;
  }
  if (lines[i].match(/^## /) && !lines[i].match(/^\d{4}-\d{4}/)) {
    inSection = false;
    continue;
  }
  if (!inSection) continue;

  const em = lines[i].match(/^- \[(\d+)\]\s*(.+)$/);
  if (!em) continue;
  entryIdx++;
  const num = em[1];
  let rest = em[2];
  // Skip if already has a link
  if (rest.includes('](')) continue;

  // Extract title (remove ⚠️ markers etc)
  const title = rest.replace(/（⚠️[^）]*）/, '').trim();
  const match = matchEntry(title);

  if (match) {
    const newLine = lines[i].replace(
      /^- \[\d+\]\s*(.+)$/,
      '- [' + num + '] [' + title + '](' + match.url + ')'
    );
    outLines[i] = newLine;
  }
}

fs.writeFileSync('wiki/content/conference/group_meeting_catalogue.md', outLines.join('\n'));
console.log('Done. Added Youku links where matches found.');
