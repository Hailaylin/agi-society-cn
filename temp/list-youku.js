const fs = require('fs');

// Read original for Youku links
const orig = fs.readFileSync(process.env.HOME + '/temp/original_catalogue.md', 'utf8');
const allYouku = [];
const re = /\[([^\]]+)\]\((https?:\/\/[^\)]*youku[^\)]*)\)/g;
let m;
while ((m = re.exec(orig)) !== null) {
  const title = m[1].trim().replace(/\\/g, '');
  const url = m[2].trim().replace(/\?.*$/, '');
  if (!allYouku.find(l => l.title === title)) {
    allYouku.push({ title, url });
  }
}

// Normalize for comparison
function norm(s) {
  return s.toLowerCase()
    .replace(/[──—_·\s\u3000]+/g, '')
    .replace(/["""'']/g, '"')
    .replace(/（/g, '(').replace(/）/g, ')')
    .replace(/：/g, ':').replace(/，/g, ',').replace(/。/g, '')
    .replace(/\.mp4$/g, '');
}

// Read current file
const curr = fs.readFileSync('wiki/content/conference/group_meeting_catalogue.md', 'utf8');
const lines = curr.split('\n');

// Manual mapping corrections based on analysis:
// Maps: "yearIndex" -> youkuLinkIndex (for known false-positives)
// null = no link available
const manualMap = {
  // 2017-2018 corrections
  '2017-2018_1': 13,   // 人工智能哲学与NARS
  '2017-2018_2': 14,   // AI教育专刊
  '2017-2018_5': null, // AI中的难问题 - no link
  '2017-2018_6': null, // AI课程 - no link
  '2017-2018_7': null, // 婴儿心理学 - no separate link (has "婴幼儿心理学" but different)
  '2017-2018_8': null, // 万事开头难 (NARS第一层试写体会 = 17)
  '2017-2018_9': null, // 《AGI_and_Reflexivity》 - matches 通用人工智能与反身性 (21)
};

// Output all Youku links for reference
for (let i = 0; i < allYouku.length; i++) {
  console.log(i + ': ' + allYouku[i].title.slice(0, 80));
}
