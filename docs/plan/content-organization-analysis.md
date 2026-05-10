# 内容组织结构调研：学术信息 + 知识库双轨架构

> 调研日期：2026-05-10
> 参考站点：ALife（学术学会） + CSS Society（学术学会） + Nólëbase（知识库）
> 目标：抽象出「学术信息与知识库兼备」的 AGI Society 网站内容架构

---

## 0. 核心问题

```
AGI Society 网站的独特挑战：
  ├── 是学术组织（需要：协会介绍、年会、团队、出版物）
  ├── 是知识库（需要：NARS 理论、工程实现、教程、Wiki）
  └── 两者交叉（年会论文 → 知识库条目、团队研究 → 理论页面）

挑战：学术网站和知识库的传统信息架构是正交的——前者按"组织部门"组织，后者按"主题领域"组织
```

---

## 1. Nólëbase 知识库的内容组织模式

### 1.1 整体结构

```
nolebase.ayaka.io/zh-CN/
├── index.md                    ← 🏠 首页（Hero + Features + Team）
├── toc.md                      ← 📋 最近更新（按时间排序的全部页面列表）
├── 笔记/                        ← 📝 主知识库（按主题域分 26 个子目录）
│   ├── index.md                ← 笔记索引页
│   ├── 🤖 AI 人工智能/
│   ├── 🖥️ 开发/
│   ├── 📚 个人知识管理/
│   └── ... (26 categories)
├── 编目 Catalog/               ← 📂 按媒体类型编目（书籍/文章/番剧/视频）
│   ├── index.md
│   ├── 书籍/
│   ├── 文章/
│   ├── 番剧/
│   └── 视频/
├── 视图/                       ← 🔍 自定义视图
└── 🔌 知识库插件列表.md        ← 元信息
```

### 1.2 组织模式抽象

Nólëbase 使用了三种**正交的组织维度**：

| 维度 | 实现 | 机制 |
|------|------|------|
| **层级导航** | 文件夹结构 + 侧边栏树 | `calculateSidebar()` 自动生成 |
| **时间排序** | `toc.md` + `NolebaseRecentUpdates` | 基于 Git 历史 + frontmatter date |
| **媒体编目** | `编目 Catalog/` | 独立于主题分类的元信息层 |
| **标签系统** | frontmatter `tags: []` | 跨文件夹的主题聚类 |
| **双向链接** | `[[wikilink]]` | 页面间的网状关联（非层级） |

**关键洞察**：Nólëbase 不是单一树状结构，而是**树 + 标签 + 时间线 + 网状链接**的多维组织。

### 1.3 知识库内容类型

| 内容类型 | Nólëbase 中的实现 | 对 AGI Society 的启发 |
|------|------|------|
| **领域笔记** | `笔记/🤖 AI/xxx.md` | NARS 理论/工程文章 |
| **编目条目** | `编目 Catalog/书籍/xxx.md` | 论文/书籍/视频的元信息卡片 |
| **索引页** | `index.md`（文件夹聚合） | 自动生成的分类索引 |
| **最近更新** | `toc.md`（时间排序） | 协会动态/最新论文/组会更新 |
| **插件说明** | `知识库插件列表.md` | 元文档（编辑指南/贡献方式） |

---

## 2. ALife 学术学会的内容组织模式

### 2.1 整体结构

```
alife.org/
├── Home / News                      ← 🏠 首页 + 新闻动态
│   ├── News
│   └── Newsletter
├── About ISAL                       ← 🏛️ 学会介绍
│   ├── About ISAL                   ← 概述
│   ├── Board of Directors           ← 理事会
│   ├── ISAL Award Winners           ← 学会奖项
│   ├── Emerging Researchers         ← 青年研究者
│   ├── DEI Committee                ← 委员会
│   ├── Code of Conduct              ← 行为准则
│   └── Anti-harassment policy       ← 反骚扰政策
├── Conferences                      ← 📅 会议
│   ├── Upcoming ISAL Conferences    ← 近期会议
│   ├── Previous ISAL-supported      ← 往届会议
│   └── Other non-ISAL conferences   ← 其他相关会议
├── Publications                     ← 📖 出版物
│   ├── Publications (overview)      ← 总览
│   └── Latest articles from journal ← 期刊最新文章
├── Online Resources                 ← 🌐 在线资源
│   ├── Online Resources
│   ├── Latest news from around web  ← 外部动态聚合
│   ├── Jobs                         ← 招聘
│   └── Encyclopedia                 ← 百科（人工生命领域词条）
├── Membership                       ← 👥 会员
│   ├── Membership
│   └── Members Area
└── Connect                          ← 📬 联系方式
```

### 2.2 组织模式抽象

ALife 使用了**机构职能驱动**的单层树状结构：

| 维度 | 实现 | 机制 |
|------|------|------|
| **机构介绍** | About ISAL + Board + Awards | 静态 Pages，WordPress 页面编辑器 |
| **学术活动** | Conferences（未来 + 往届） | 按时间倒序排列的事件列表 |
| **学术出版** | Publications + Latest Articles | 期刊信息页 + Zotpress 文献插件 |
| **在线资源** | Encyclopedia + Jobs + External News | 词条型内容 + 外部 RSS 聚合 |
| **社区治理** | Code of Conduct + DEI + Anti-harassment | 制度文件页 |
| **会员系统** | Membership + Members Area | 付费会员 + 受保护内容 |

### 2.3 学术学会的内容类型

| 内容类型 | ALife 中的呈现 | 更新频率 | 对 AGI Society 的启发 |
|------|------|:---:|------|
| **学会简介** | About ISAL（静态页） | 低 | 协会简介（复用原 about/index.md） |
| **理事会/团队** | Board of Directors（人物列表） | 低 | 研究团队介绍（王培/刘凯/徐英瑾等） |
| **会议列表** | Conferences（时间线） | 中 | 年会列表（2016–2024）+ 未来年会预告 |
| **会议详情** | 单次会议页面（议程+视频+论文） | 中 | 每届年会独立页面（已有 2023/2024） |
| **期刊** | Artificial Life journal（MIT Press） | 高 | AGI 相关出版物列表（中文期刊链接） |
| **百科** | Encyclopedia（词条） | 低 | 可扩展的 AGI 术语词典 |
| **新闻** | News + Newsletter | 高 | 协会动态 / 组会公告 |
| **制度文件** | Code of Conduct 等 | 极低 | 协会章程 / 行为准则（如适用） |
| **招聘** | Jobs | 中 | 研究生招生 / 合作项目招募 |
| **在线资源** | Links + RSS 聚合 | 中 | B站链接 / 论文合集 / 外部 AGI 资源 |

---

## 3. CSS Society 学术学会的内容组织模式

> 参考站点：https://cssociety.org/ (Complex Systems Society)
> 技术栈：自定义 CMS（推测 Django）+ Tailwind CSS + Vanilla JS
> 开发者：Smart Systems (https://www.smart-systems.mx/)

CSS Society 与 ALife 同为国际学术学会，但其网站的信息架构更丰富，提供了学会运营层面的更多参考维度。

### 3.1 整体结构

```
cssociety.org/
├── Home                             ← 🏠 首页
│   ├── Hero：学会标语 + 使命
│   ├── Events 板块（近期会议）
│   ├── News 板块（最新动态）
│   ├── Calls 板块（奖项征集 + 征稿）
│   ├── Membership CTA（加入学会）
│   ├── Newsletter 订阅
│   └── Twitter Feed（社交媒体嵌入）
├── About                            ← 🏛️ 学会治理
│   ├── Contacts                     ← 联系方式
│   ├── Council                      ← 理事会
│   ├── Executive Committee          ← 执行委员会
│   ├── Statutes                     ← 学会章程（法律文件）
│   ├── By Laws                      ← 实施细则
│   └── Manifesto                    ← 学会宣言（出版体制改革）
├── News                             ← 📰 新闻动态
├── Events                           ← 📅 学术活动
│   ├── 近期活动（NetLogo/CCS/ComplexNetworks...）
│   ├── 往届活动（AJAX 加载）
│   └── 活动详情（UUID 独立页面）
├── Job Openings                     ← 💼 学术招聘
├── Calls                            ← 📢 征集公告
│   ├── 奖项征集（Emerging/Junior/Senior Awards）
│   ├── 会议申办（CCS 2028 host bids）
│   ├── 征稿（Special Issues）
│   └── 暑期学校（Tutors/Workshops）
├── Community                        ← 👥 社区
│   ├── Awards                       ← 学会奖项
│   ├── Local Chapters               ← 各地分会
│   └── Members                      ← 会员名录
├── YRCSS                            ← 🌱 青年研究者分会
├── CCS                              ← 🏗️ 旗舰会议
│   ├── By Laws
│   └── Steering Committee
├── Join Us / Membership             ← 💳 会员系统
│   ├── 4 级会员费用（€20–€110/年）
│   ├── 会员权益列表
│   ├── 注册流程（账户 + 付费）
│   └── 会议附带会员（(E)CCS 参会者自动获得）
└── Login / Register                 ← 🔐 账户系统
```

### 3.2 组织模式亮点

| 特点 | ALife | CSS Society | 对 AGI Society 的启发 |
|------|:---:|:---:|------|
| **会员系统** | ✅ 有 | ✅ 完整（4 级费用 + 线上注册付费） | 可考虑简化版（研究会/学生/普通） |
| **招聘板块** | ✅ Jobs | ✅ Job Openings | 研究生招生 + 合作项目招募 |
| **征集公告(Calls)** | ❌ 揉在 News 里 | ✅ 独立板块（奖项+征稿+会议申办） | 年会征文 + 奖项通知 |
| **治理文档** | ⚠️ 只有 CoC | ✅ 完整（Statutes+By Laws+Manifesto） | 协会章程（如有） |
| **青年分会** | ✅ Emerging Researchers | ✅ YRCSS（独立一级栏目） | 学生/青年研究者小组 |
| **分会体系** | ❌ | ✅ Local Chapters | 各地 AGI 研究小组（如有） |
| **社交媒体集成** | ✅ 社交图标 | ✅ Twitter Feed 嵌入首页 | B站/知乎/微信公众号 |
| **Newsletter** | ❌ | ✅ 首页订阅框 | 邮件/微信订阅 |
| **AJAX 分页** | ❌ | ✅ "Show More" 加载更多 | 年会/动态列表的无限滚动 |

### 3.3 CSS Society 的独特设计决策

**1. 首页 = 聚合仪表盘**
CSS Society 的首页不是一个"欢迎页"，而是一个信息聚合面板：Events + News + Calls + Membership CTA + Newsletter + Twitter Feed 六块内容同时展示。这是学会网站的高效模式——访问者不需要深入导航就能看到学会的全部近期活动。

**2. Calls 独立为一级板块**
Calls（征集公告）在 CSS Society 中是独立的顶级导航项，与 News/Events 并列。这反映了学会运营的现实——奖项征集、会议申办、征稿、暑期学校招募是持续性的运营活动。

**3. 会员系统深度集成**
CSS Society 有完整的账户系统（注册/登录）、4 级付费会员、会议附带会员机制。这是 CMS 深度定制的产物。对 AGI Society 的启发是——即使短期内不需要付费会员，也可以有"注册→关注→参与"的简化流程。

**4. UUID 内容模型**
所有 Event/Job/News/Call 都通过 UUID slug 访问（如 `/event/48d831be-...`），说明内容是数据库驱动的，而非静态文件。这是 CMS 模式相对于静态站点生成器的优势——动态内容管理。

**5. 学会宣言 (Manifesto)**
CSS Society 发布了一份关于学术出版体制改革的宣言，并获得了 ISAL 等学会的背书。这是一种"学会作为行业引领者"的品牌定位——不仅组织会议，还推动学术文化变革。AGI Society 也可以有类似的定位声明。

### 3.4 技术实现要点

| 方面 | 实现 | 评价 |
|------|------|------|
| CSS 框架 | Tailwind CSS（utility-first） | 与 UnoCSS 理念相通，学术克制风格 |
| JS | Vanilla JS（无框架） | 极致轻量，仅用于菜单切换 + AJAX 分页 |
| CMS | 推测 Django（UUID slug + 登录/注册 URL 模式） | 数据库驱动，动态内容管理 |
| 部署 | 推测 VPS/云服务器 | 传统部署模式 |
| 性能 | 无 SPA，传统 MPA | 每次导航整页刷新，但 JS 体积极小 |
| 开发方 | Smart Systems（墨西哥代理） | 外包开发，非自建 |

---

## 4. 三站内容架构对比

| 内容板块 | ALife (WordPress) | CSS Society (Custom CMS) | Nólëbase (VitePress) | AGI Society 建议 |
|------|:---:|:---:|:---:|------|
| **首页类型** | 静态介绍页 | 聚合仪表盘 | Hero + Features 卡片 | CSS 聚合模式 + Nólëbase Hero |
| **关于/治理** | About + Board + CoC | About + Statutes + By Laws + Manifesto | Team + Web Arch | 协会简介 + 团队 + 章程 |
| **会议** | Conferences（未来 + 往届） | Events（近期 + 往届 + AJAX） | — | 年会列表 + 详细议程页 |
| **新闻/动态** | News + Newsletter | News + Newsletter 订阅 | toc.md（最近更新） | 协会动态 + 组会更新 |
| **出版物** | Publications + Journal | —（无独立板块） | 笔记/（知识库文章） | 出版物专区 + 年会论文 |
| **招聘/机会** | Jobs | Job Openings | — | 研究生招生 + 合作项目 |
| **征集公告** | —（混在 News） | Calls（独立一级） | — | 年会征文 + 奖项通知 |
| **会员** | Membership（有付费） | Membership（4 级付费 + 线上注册） | — | 简化版（QQ群/注册关注） |
| **青年/学生** | Emerging Researchers | YRCSS（独立一级） | — | 学生/青年研究者页面 |
| **分会** | — | Local Chapters | — | 各地研究组（如有） |
| **知识库/Wiki** | Encyclopedia | — | 笔记/ + 编目 Catalog/ | NARS 理论 + 工程 + 术语词典 |
| **在线资源** | Online Resources | — | 🔌 插件列表 | B站/知乎/外部链接聚合 |
| **社交媒体** | Header 社交图标 | Twitter Feed 嵌入首页 | Discord 链接 | B站视频嵌入 + 知乎/微信 |

### 4.1 关键发现

```
1. 【CSS Society 是更完整的"学会运营"参考】
   ALife 偏学术展示（出版物、会议、百科），
   CSS Society 偏学会运营（会员、招聘、征集、宣言、分会）。
   AGI Society 应该取两者的交集。

2. 【两份学会参考的共有板块 = 学会网站的最低必备】
   About + Events/Conferences + News + Membership + Contact = 5 个必备板块。
   这 5 个是任何学术学会网站都需要的基础内容类型。

3. 【Nólëbase 补充了"知识库"维度】
   两份学会参考都没有知识库/Wiki 功能。
   Nólëbase 的笔记 + 编目 + TOC 三维组织模式是 AGI Society Wiki 的核心参考。

4. 【CSS Society 的 UUID 事件模型 vs 我们的 Markdown 事件模型】
   CSS Society 用数据库管理事件（适合频繁增删改），
   我们用 Markdown 文件管理内容（适合版本控制 + 社区贡献）。
   对于年会这种低频高价值内容，Markdown 文件更合适（Git 历史 = 天然的版本追踪）。
```

---

### 5.2 当前 Wiki 已有内容（`wiki/content/`）

```
wiki/content/
├── index.md                     ← Wiki 首页
├── agi/                         ← AGI 通用人工智能（1 页）
│   └── index.md
├── nars/                        ← NARS 核心（~30+ 页）
│   ├── index.md
│   ├── theory/                  ← 理论（AIKR / 3C / GTI 6 章 / NAC）
│   ├── impl/                    ← 工程实现（12 个版本）
│   └── derivative_project/      ← 衍生项目
├── sai/                         ← SAI 专用人工智能（2 页）
├── conference/                  ← 年会（3 页）
│   ├── index.md                 ← 2016–2024 汇总
│   ├── 2023.md                  ← 2023 上海 复旦大学
│   └── 2024.md                  ← 2024 南京 南京理工大学
├── other/                       ← 思想书库（6 页）
└── about/                       ← 关于（4 页 + 贡献指南）
    ├── index.md
    ├── team.md                  ← 6 位核心成员
    ├── web_arch.md              ← 网站架构
    └── contributing/            ← 贡献指南（3 页）
```

### 5.3 缺口分析

对比 ALife 模式，当前 AGI Society 缺失的内容类型：

| ALife 有的 | 当前 AGI 状态 | 优先级 |
|------|------|:---:|
| 学会简介（About） | ✅ 有（about/index.md） | — |
| 理事会/团队 | ✅ 有（about/team.md） | — |
| 会议列表 | ✅ 有（conference/） | — |
| 会议详情（议程+论文） | ⚠️ 部分有（缺少 2016–2022 详细议程） | P1 |
| 期刊/出版物专区 | ❌ 无 | P1 |
| 学会新闻/动态 | ❌ 无（组会视频散落在 B站） | P1 |
| 百科/术语词典 | ❌ 无（可扩展为 AGI Glossary） | P2 |
| 制度文件 | ❌ 无 | P3 |
| 招聘/招生 | ❌ 无 | P2 |
| 在线资源聚合 | ⚠️ 散落在 other/ 和外部链接 | P1 |
| 会员系统 | ❌ 无（QQ 群作为替代） | P3 |

---

## 5. 修订后的目标架构：「学术信息 + 知识库」双轨合一

> 基于 ALife + CSS Society + Nólëbase 三站参考的综合方案。

### 5.1 设计原则

```
1. 学术信息（机构维度）+ 知识库（主题维度）双轨并行
2. 同一内容可以在两个维度下被找到（多入口）
3. 机构信息偏静态结构化，知识库偏动态网络化
4. 首页聚合两个维度的精华（最新动态 + 知识入口）
```

#### 5.2 当前 Wiki 已有内容（`wiki/content/`）

```
agi-society.cn
│
├── 🏠 首页 (homepage/)
│   ├── Hero：协会品牌 + 核心标语
│   ├── 快速入口：探索 Wiki / 年会信息 / 团队成员
│   ├── 最新动态：组会更新 / 新论文 / 活动预告
│   └── 页脚：版权 / ICP / 联系方式
│
├── 📖 知识库 (wiki/ → Quartz)
│   │
│   ├── NARS 理论
│   │   ├── GTI（一般智能理论）
│   │   ├── NAC（非公理控制）
│   │   ├── AIKR / 3C 原则
│   │   └── AGI 术语词典 ← 新增
│   │
│   ├── NARS 工程
│   │   ├── 各版实现（12 版本）
│   │   ├── 衍生项目
│   │   └── 在线 Demo（NARust WASM）
│   │
│   ├── AGI 研究
│   │   ├── AGI 概述与历史
│   │   ├── SAI 专用人工智能
│   │   └── 思想书库
│   │
│   ├── 📚 出版物 ← 新增板块
│   │   ├── 中文 AGI 相关论文
│   │   ├── 年会论文合集
│   │   ├── 推荐书籍
│   │   └── 外部期刊链接
│   │
│   └── 🔗 在线资源 ← 整合板块
│       ├── Bilibili 讲座合集
│       ├── 外部 AGI 项目链接
│       ├── 研究团队学术主页
│       └── QQ 群 / 联系方式
│
├── 🏛️ 学术信息 (conference/ + about/ 增强)
│   │
│   ├── 关于协会
│   │   ├── 协会简介
│   │   ├── 研究团队（增强：学术主页 + ORCID + Google Scholar）
│   │   ├── 协会章程 ← 新增
│   │   └── 贡献指南
│   │
│   ├── 年会
│   │   ├── 2024 南京年会（详细议程 + 视频 + 论文）
│   │   ├── 2023 上海年会
│   │   ├── 2016–2022 年会档案 ← 补全
│   │   └── 下届年会预告 ← 新增
│   │
│   ├── 组会
│   │   ├── 组会视频目录（已有）
│   │   └── 近期组会预告 ← 新增
│   │
│   ├── 📰 协会动态 ← 新增板块
│   │   ├── 最新消息
│   │   ├── 成员动态（论文发表/学术报告）
│   │   └── Newsletter 订阅
│   │
│   ├── 🎓 学术机会 ← 新增板块
│   │   ├── 研究生招生
│   │   ├── 合作项目
│   │   └── 学术岗位
│   │
│   └── 📡 外部链接
│       ├── 国际 AGI 协会 (agi-conf.org)
│       ├── OpenNARS Wiki
│       └── 王培教授学术主页
```

### 5.5 内容类型定义

| 内容类型 | 模板 | 存储位置 | Frontmatter 必填字段 |
|------|------|------|------|
| **知识库页面** | 标准 wiki 页 | `wiki/content/` | `title`, `tags`, `created` |
| **年会页面** | 年会模板 | `wiki/content/conference/` | `title`, `date`, `venue`, `organizer` |
| **团队成员** | 团队卡片 | `wiki/content/about/team.md` | `name`, `title`, `affiliation`, `links` |
| **出版物条目** | 文献卡片 | `wiki/content/publications/` | `title`, `authors`, `year`, `journal`, `url` |
| **动态消息** | 新闻条目 | `wiki/content/news/` | `title`, `date`, `summary` |
| **术语词条** | 百科条目 | `wiki/content/glossary/` | `title`, `tags`, `aliases` |

### 5.6 跨维度导航

```
同一内容的多入口访问示例：

「2024 年会」
  ├── 首页 → 最新动态 → "2024 年会回顾"
  ├── 学术信息 → 年会 → 2024 南京
  └── 知识库 → 出版物 → 年会论文合集 → 2024 论文集

「王培教授」
  ├── 学术信息 → 关于协会 → 研究团队 → 王培
  ├── 知识库 → NARS 理论 → GTI → 作者：王培
  └── 知识库 → 出版物 → 按作者筛选 → 王培
```

### 5.7 对标参考

| AGI Society 板块 | ALife 对应 | Nólëbase 对应 |
|------|------|------|
| 首页 (Hero + Features) | Home + News 区域 | `index.md` (layout: home) |
| 知识库 (NARS/AGI) | Encyclopedia | `笔记/` + `编目 Catalog/` |
| 年会 | Conferences | —（Nólëbase 无会议模式） |
| 出版物 | Publications + Latest Articles | —（Nólëbase 无出版物模式） |
| 团队 | Board of Directors | HomePage.vue (VPTeamMembers) |
| 动态 | News + Newsletter | `toc.md` (Recent Updates) |
| 在线资源 | Online Resources + Jobs | `🔌 知识库插件列表.md` |
| 协会治理 | Code of Conduct / DEI | — |

---

## 6. 实施优先级

### Phase 1：核心内容（已有基础）

| 板块 | 当前状态 | 行动 |
|------|------|------|
| NARS 知识库 | ✅ 已迁移 | 补全图片 + NARust Demo |
| 年会记录 | ⚠️ 只有 2023/2024 | 补全 2016–2022 档案 |
| 团队介绍 | ✅ 完整 | 增强：加学术主页/ORCID 链接 |

### Phase 2：补齐学术信息（新增）

| 板块 | 行动 |
|------|------|
| 出版物专区 | 创建 `publications/` 目录，录入论文条目 |
| 协会动态 | 创建 `news/` 目录，从 B站/知乎汇总动态 |
| 在线资源 | 整合散落的 B站/外部链接到独立页面 |

### Phase 3：增强功能（后续）

| 板块 | 行动 |
|------|------|
| AGI 术语词典 | 创建 `glossary/`，双向链接到 NARS 理论页 |
| 学术机会 | 创建 `opportunities/`，发布招生/合作信息 |
| Newsletter | 接入 RSS / 邮件订阅 |

---

## 7. 关键洞察

```
1. 【双轨而非合并】学术信息和知识库是两种不同的信息架构。
   学术信息按"机构职能"组织（静态层级），知识库按"主题领域"组织（动态网络）。
   强行合并会导致导航混乱 → 应该用"多入口 + 交叉链接"而非"统一树"。

2. 【ALife 给我们的是"学会网站该有哪些内容类型"的答案】
   不是技术栈——他们的 WordPress 不是我们要复刻的。
   而是内容蓝图——学会需要简介、团队、会议、出版物、动态、资源。

3. 【Nólëbase 给我们的是"知识库该如何多维组织"的答案】
   不是具体的文件夹名——26 个 emoji 文件夹不是我们要的。
   而是组织维度——树状导航 + 标签 + 时间线 + 双向链接的混合模式。

4. 【Quartz 已经具备了多维组织的基础能力】
   文件夹 → Explorer 树状导航（Quartz 内置）
   标签 → Tag Pages 自动聚合（Quartz 内置）
   时间线 → FolderPage 已按日期排序
   双向链接 → Backlinks + Graph View（Quartz 内置）
   缺失的只有 "最近更新" 页面和 "新闻" 内容类型。
```

---

## 8. 参考源

| # | 来源 | 类型 | 内容 |
|---|------|------|------|
| 1 | `nolebase/nolebase` GitHub 仓库 | 一手源码 | 知识库完整目录结构 |
| 2 | https://nolebase.ayaka.io/ | 线上站点 | Nólëbase 官方知识库 |
| 3 | https://alife.org/ | 线上站点 | ALife 学术学会完整信息架构 |
| 4 | `wiki/content/` 本地目录 | 一手源码 | AGI Society 当前已迁移内容 |
| 5 | `original-contents/agi-society-cn/docs/` | 一手源码 | 原网站完整 Markdown 源文件 |
