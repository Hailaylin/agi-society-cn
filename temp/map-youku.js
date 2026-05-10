const fs = require('fs');

// Youku links from git history, mapped manually to year entries
// Format: "year_entryIndex" -> youku_url (null = no video)

const youkuMap = {
  // === 2017-2018 ===
  '2017-2018_1': 'https://v.youku.com/v_show/id_XMjg2ODQ3MzU5Mg==.html',    // 人工智能哲学与NARS
  '2017-2018_2': 'https://v.youku.com/v_show/id_XMjg4NDQ1MzkwMA==.html',    // AI教育专刊
  '2017-2018_7': 'https://v.youku.com/v_show/id_XMjkzODc0NjA1Mg==.html',    // 婴幼儿心理学 (title: 婴幼儿心理学与通用人工智能系统教育)
  '2017-2018_8': 'https://v.youku.com/v_show/id_XMjk1MzgwNzE4MA==.html',    // 万事开头难 (title: NARS第一层试写体会)
  '2017-2018_9': 'https://v.youku.com/v_show/id_XMjk3MjQ5ODAwNA==.html',    // 咱们情绪有力量
  '2017-2018_10': 'https://v.youku.com/v_show/id_XMjk4NTQyMjc4NA==.html',   // 基本情感理论
  '2017-2018_11': 'https://v.youku.com/v_show/id_XMjk5NzA2NDQyMA==.html',   // AGI_and_Reflexivity → 通用人工智能与反身性
  '2017-2018_17': 'https://v.youku.com/v_show/id_XMzA5NDE4NDE0MA==.html',   // 通用人工智能的理论基础（一）
  '2017-2018_18': 'https://v.youku.com/v_show/id_XMzEwODA2MzkwMA==.html',   // 通用人工智能的理论基础（二）
  '2017-2018_19': 'https://v.youku.com/v_show/id_XMzEyNDY2NDM0NA==.html',   // 通用人工智能的理论基础（三）上
  '2017-2018_20': 'https://v.youku.com/v_show/id_XMzE0MTU1MTk0MA==.html',   // 通用人工智能的理论基础（三）下
  '2017-2018_21': 'https://v.youku.com/v_show/id_XMzE1Nzk3ODk3Ng==.html',   // 通用人工智能的理论基础（四）
  '2017-2018_22': 'https://v.youku.com/v_show/id_XMzE3NDM4NzM4NA==.html',   // 通用人工智能的理论基础（五）
  '2017-2018_23': 'https://v.youku.com/v_show/id_XMzE5MTMzMDI2OA==.html',   // 通用人工智能的理论基础（六）
  '2017-2018_24': 'https://v.youku.com/v_show/id_XMzIwNzg5NTUxNg==.html',   // 从内在表征到人工智能
  '2017-2018_26': 'https://v.youku.com/v_show/id_XMzI4NzMyNDIyNA==.html',   // 人形机器人感知运动尝试 → 人机情未了
  '2017-2018_28': 'https://v.youku.com/v_show/id_XMzI0ODYxNDcwNA==.html',   // 为情所困 → 法律 (this doesn't match... skip)
  '2017-2018_26': 'https://v.youku.com/v_show/id_XMzI4NzMyNDIyNA==.html',   // 人形机器人 (this was for 人机情未了)
  // Actually let me re-do this more carefully.
};

// Let me just output what we have and manually build the file
console.log('Approach: direct file editing needed for accuracy');
console.log('Total entries with Youku links need careful title matching');
