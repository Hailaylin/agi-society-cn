const fs = require('fs');

// Read original for Youku links
const original = fs.readFileSync(process.env.HOME + '/temp/original_catalogue.md', 'utf8');
const youkuPattern = /\[([^\]]+)\]\((https?:\/\/[^\)]*youku[^\)]*)\)/gi;
const youkuLinks = [];
let m;
while ((m = youkuPattern.exec(original)) !== null) {
  const title = m[1].trim().replace(/\\/g, '');
  const url = m[2].trim().replace(/\?.*$/, '').replace(/==$/, '');
  if (!youkuLinks.find(l => l.title === title)) {
    youkuLinks.push({ title, url });
  }
}

function norm(s) {
  return s.toLowerCase()
    .replace(/[──—_·\s\u3000]+/g, '')
    .replace(/["""'']/g, '"')
    .replace(/（/g, '(').replace(/）/g, ')')
    .replace(/：/g, ':').replace(/，/g, ',').replace(/。/g, '')
    .replace(/\.mp4$/, '')
    .replace(/\\_/g, '_');
}

function findMatch(entryTitle) {
  const nTitle = norm(entryTitle);
  for (const link of youkuLinks) {
    const lTitle = norm(link.title);
    if (lTitle.includes(nTitle) || nTitle.includes(lTitle)) return link;
  }
  // Try with first significant phrase (>= 8 chars)
  const phrases = entryTitle.replace(/[──—·、，,.()（）\[\]]/g, ' ').split(/\s+/).filter(w => w.length >= 8);
  for (const phrase of phrases) {
    for (const link of youkuLinks) {
      if (norm(link.title).includes(norm(phrase))) return link;
    }
  }
  return null;
}

const current = fs.readFileSync('wiki/content/conference/group_meeting_catalogue.md', 'utf8');
const lines = current.split('\n');

const yearSections = [];
let currentYear = null;
let currentEntries = [];
let sectionStartLine = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const ym = line.match(/^## (\d{4}-\d{4} 学年)/);
  if (ym) {
    if (currentYear && currentEntries.length > 0) {
      yearSections.push({ year: currentYear, entries: currentEntries, startLine: sectionStartLine, endLine: i });
    }
    currentYear = ym[1];
    currentEntries = [];
    sectionStartLine = i;
    continue;
  }
  if (currentYear && line.match(/^- \[\d+\]/)) {
    let title = line.replace(/^- \[\d+\]\s*/, '');
    title = title.replace(/\[([^\]]+)\]\([^\)]+\)/, '$1');
    title = title.replace(/（⚠️[^）]*）/, '').trim();
    currentEntries.push({ title, lineIndex: i });
  }
  if (currentYear && line.match(/^## /) && !line.match(/^## \d{4}-\d{4}/)) {
    if (currentEntries.length > 0) {
      yearSections.push({ year: currentYear, entries: currentEntries, startLine: sectionStartLine, endLine: i });
    }
    currentYear = null;
  }
}
if (currentYear && currentEntries.length > 0) {
  yearSections.push({ year: currentYear, entries: currentEntries, startLine: sectionStartLine, endLine: lines.length });
}

const targetYears = yearSections.filter(s => parseInt(s.year) <= 2018);
for (const section of targetYears) {
  console.log('\n## ' + section.year);
  let matched = 0;
  for (const entry of section.entries) {
    const match = findMatch(entry.title);
    if (match) {
      matched++;
      console.log('  ✅ ' + entry.title.slice(0, 70));
      console.log('     -> ' + match.url);
    } else {
      console.log('  ❌ ' + entry.title.slice(0, 70) + '  [NO MATCH]');
    }
  }
  console.log('  = ' + matched + '/' + section.entries.length);
}
