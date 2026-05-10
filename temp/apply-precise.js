const fs = require('fs');

// Manually verified Youku link mappings from git history (commit 1428956)
// Key: "section-year_entryNum" → youku_url
// Sourced from original sections: 2016~2017 @ 优酷, 2018 @ 优酷, 2019 @ 优酷, 2020 @ 优酷

const YK = 'https://v.youku.com/v_show/';

const mappings = {
  // === 2017-2018: from "2016~2017 @ 优酷" + "2018 @ 优酷" ===
  '2017-2018_1':  YK + 'id_XMjg2ODQ3MzU5Mg==.html',  // 人工智能哲学与NARS
  '2017-2018_2':  YK + 'id_XMjg4NDQ1MzkwMA==.html',  // AI教育专刊系列报告之一
  '2017-2018_5':  YK + 'id_XMjkzODc0NjA1Mg==.html',  // 婴儿心理学 (orig: 婴幼儿心理学与通用人工智能系统教育)
  '2017-2018_6':  YK + 'id_XMjk1MzgwNzE4MA==.html',  // 万事开头难 (orig: NARS第一层试写体会)
  '2017-2018_7':  YK + 'id_XMjk3MjQ5ODAwNA==.html',  // 咱们情绪有力量
  '2017-2018_8':  YK + 'id_XMjk4NTQyMjc4NA==.html',  // 基本情感理论及其与AGI关系的思考
  '2017-2018_9':  YK + 'id_XMjk5NzA2NDQyMA==.html',  // AGI_and_Reflexivity (orig: 通用人工智能与反身性)
  '2017-2018_15': YK + 'id_XMzA5NDE4NDE0MA==.html',  // 通用人工智能的理论基础（一）
  '2017-2018_16': YK + 'id_XMzEwODA2MzkwMA==.html',  // 通用人工智能的理论基础（二）
  '2017-2018_17': YK + 'id_XMzEyNDY2NDM0NA==.html',  // 通用人工智能的理论基础（三）上
  '2017-2018_18': YK + 'id_XMzE0MTU1MTk0MA==.html',  // 通用人工智能的理论基础（三）下
  '2017-2018_19': YK + 'id_XMzE1Nzk3ODk3Ng==.html',  // 通用人工智能的理论基础（四）
  '2017-2018_20': YK + 'id_XMzE3NDM4NzM4NA==.html',  // 通用人工智能的理论基础（五）
  '2017-2018_21': YK + 'id_XMzE5MTMzMDI2OA==.html',  // 通用人工智能的理论基础（六）
  '2017-2018_22': YK + 'id_XMzIwNzg5NTUxNg==.html',  // 从内在表征到人工智能
  '2017-2018_24': YK + 'id_XMzI4NzMyNDIyNA==.html',  // 人机情未了 (orig: 人形机器人感知运动尝试 - same talk)
  '2017-2018_26': YK + 'id_XMzM0NTg2MjAyNA==.html',  // 探赜索隐 (orig: 探赜索隐——纳思软件工程大揭秘)
  '2017-2018_27': YK + 'id_XMzM3MjM0NDMyOA==.html',  // 法律与人工智能新挑战
  '2017-2018_28': YK + 'id_XMzQ0NDIwNzg4NA==.html',  // 础润而雨
  '2017-2018_29': YK + 'id_XMzQ2MTMzMTY3Ng==.html',  // 主体·强化学习·推理
  '2017-2018_32': YK + 'id_XMzUxMjE4OTM0OA==.html',  // HTM脑皮质学习算法（一）
  '2017-2018_34': YK + 'id_XMzU0NTc1MDI5Ng==.html',  // 揭开智能真相 (orig: 揭开智能真相──NARS基本理论速读)
  '2017-2018_37': YK + 'id_XMzYwNzk3ODQ4MA==.html',  // 人脑中的理性 (orig: 人脑中的"理性"和"非理性"谁多谁少？)
  '2017-2018_38': YK + 'id_XMzYyMTI0ODY3Ng==.html',  // 通用人工智能的理论基础（七）
  '2017-2018_39': YK + 'id_XMzYzMzg1MTc1Ng==.html',  // 通用人工智能的理论基础（八）
  '2017-2018_40': YK + 'id_XMzY0NzcwMDUxNg==.html',  // 表征的本质 (orig: 表征的本质：从内在表征与外在表征区分来看)
  '2017-2018_41': YK + 'id_XMzY2MDg5MDM3Ng==.html',  // 谎言的艺术
  '2017-2018_42': YK + 'id_XMzY5Mjc0MTc5Ng==.html',  // 以深度强化学习作为通用人工智能的基础

  // === 2018-2019: from "2018 @ 优酷" + "2019 @ 优酷" ===
  '2018-2019_2':  YK + 'id_XMzgyMTMxNjY2NA==.html',  // NARS工程解密系列之一
  '2018-2019_3':  YK + 'id_XMzgzMDIxNDk0OA==.html',  // 意识认知理论模型的30年进展
  '2018-2019_4':  YK + 'id_XMzgzODg5OTY1Mg==.html',  // NARS工程解密系列之二
  '2018-2019_5':  YK + 'id_XMzg1NzE0MjQ1Mg==.html',  // NARS工程解密系列之三
  '2018-2019_7':  YK + 'id_XMzg4NTY4NTM5Mg==.html',  // NARS工程解密系列之四
  '2018-2019_8':  YK + 'id_XMzg5NzE5NjI1Mg==.html',  // 《Non-Axiomatic Logic》教材第二、三章
  '2018-2019_9':  YK + 'id_XMzkwODYxNDUxMg==.html',  // HTM脑皮质学习算法新动向
  '2018-2019_11': YK + 'id_XMzk0NjU3MzkzNg==.html',  // 辛特科技的AGI路线及技术
  '2018-2019_12': YK + 'id_XMzk1MTE4ODk0OA==.html',  // Head meets mind
  '2018-2019_13': YK + 'id_XMzk2MTQ3ODQ3Mg==.html',  // NARS教材第四章 (orig: NARS教材第四章 → match to 四、五章)
  '2018-2019_14': YK + 'id_XMzk3MjAyNjUyMA==.html',  // 2018总结及2019展望
  '2018-2019_15': YK + 'id_XNDAxNDY2NTU2MA==.html',  // 医学人工智能专题报告（一）
  '2018-2019_17': YK + 'id_XNDA3OTE3NTMxNg==.html',  // 数据利维坦与数据统治
  '2018-2019_18': YK + 'id_XNDA4Njk3MDMyNA==.html',  // AGI新军之PAGI (orig: 通用人工智能PAGI20190305)
  '2018-2019_19': YK + 'id_XNDExMzI0OTY2MA==.html',  // 脑科学、精神病学对通用人工智能理论的启示
  '2018-2019_20': YK + 'id_XNDEyMzEzNjU2NA==.html',  // 螺旋论与he系统简介
  '2018-2019_21': YK + 'id_XNDE0MDIyMTMwMA==.html',  // 建构主义AI (orig: 通用人工智能理论基础系列报告之第九章——建构主义AI)
  '2018-2019_22': YK + 'id_XNDE3NTk4ODYyMA==.html',  // 深度神经网络推理 (orig: 神经网络的推理尝试)
  '2018-2019_23': YK + 'id_XNDE3MzEyMTUyMA==.html',  // 街景识别 (orig: OpenNARS v3.0.2-街景实时分析)
  '2018-2019_26': YK + 'id_XNDIzNTY0OTAxMg==.html',  // 前天高考、后天报告
  '2018-2019_27': YK + 'id_XNDIzNTY1MjkzMg==.html',  // Learn NARS From Wiki（1）
  '2018-2019_28': YK + 'id_XNDI1ODEzMjQxNg==.html',  // Learn NARS From Wiki（2）
  '2018-2019_29': YK + 'id_XNDI2NzMwMDU5Mg==.html',  // Learn NARS From Wiki（3）
  '2018-2019_30': YK + 'id_XNDI3NTg1Nzg3Ng==.html',  // Learn NARS From Wiki（4）
  '2018-2019_31': YK + 'id_XNDI4NDYyNDYzNg==.html',  // Learn NARS From Wiki（5）
  '2018-2019_32': YK + 'id_XNDI4NDYyNDYzNg==.html',  // Learn NARS From Wiki（6）same as 5

  // === 2019-2020: add missing Youku links for entries without B站 ===
  '2019-2020_14': YK + 'id_XNDYxNTI4MjUyOA==.html',  // 旁见侧出
  '2019-2020_15': YK + 'id_XNDYzMzY4NDQzNg==.html',  // 基于纳思的通用诊断系统
  '2019-2020_17': YK + 'id_XNDY3MTczNjYwOA==.html',  // 类脑系统大战机器僵尸
  '2019-2020_20': YK + 'id_XNDcyNjMyNDA0MA==.html',  // 昨日重现

  // === 2020-2021: add missing Youku link for AGI决策模型的前提假设 ===
  '2020-2021_25': YK + 'id_XNDg3Njg0MTQyMA==.html',  // AGI决策模型的前提假设
};

const curr = fs.readFileSync('wiki/content/conference/group_meeting_catalogue.md', 'utf8');
const lines = curr.split('\n');
let sectionYear = '';
let entryIdx = 0;

for (let i = 0; i < lines.length; i++) {
  const ym = lines[i].match(/^## (\d{4}-\d{4} 学年)/);
  if (ym) { sectionYear = ym[1].replace(' 学年', ''); entryIdx = 0; continue; }
  if (lines[i].match(/^## /) && !lines[i].match(/^\d{4}-\d{4}/)) { sectionYear = ''; continue; }
  if (!sectionYear) continue;
  const em = lines[i].match(/^- \[(\d+)\]\s*(.+)$/);
  if (!em) continue;
  entryIdx++;
  const num = em[1];
  const rest = em[2];
  // Skip if already has a link or ⚠️ marker
  if (rest.includes('](') || rest.includes('⚠️')) continue;

  const key = sectionYear + '_' + num;
  const url = mappings[key];
  if (!url) continue;

  const title = rest.trim();
  lines[i] = '- [' + num + '] [' + title + '](' + url + ')';
}

fs.writeFileSync('wiki/content/conference/group_meeting_catalogue.md', lines.join('\n'));
console.log('Done. Applied ' + Object.keys(mappings).length + ' manual mappings.');

// Print summary
let prevYear = '';
for (const key of Object.keys(mappings).sort()) {
  const [year, num] = key.split('_');
  if (year !== prevYear) { console.log('\n' + year + ':'); prevYear = year; }
  console.log('  [' + num + '] -> ' + mappings[key].split('/').pop());
}
