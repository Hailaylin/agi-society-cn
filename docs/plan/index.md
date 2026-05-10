# AGI Society 网站重建 — 调研汇总

> 日期：2026-05-10 | 更新：2026-05-10
> 项目：中国通用人工智能协会网站

---

## 项目当前结构

```
agi-society-cn/
├── docs/
│   └── plan/                          ← 调研文档（本文位置）
│       ├── index.md                   ← 本文件（总览）
│       ├── website-research.md        ← 原网站调研
│       ├── framework-comparison.md    ← 框架交叉分析
│       ├── nolebase-homepage-reverse-engineering.md ← Nólëbase 首页逆向分析
│       ├── tech-dissect-nolebase-knowledge-base.md  ← Nólëbase 知识库技术拆解
│       └── content-organization-analysis.md ← 内容组织结构调研
├── original-contents/                 ← 原 MkDocs 源码（克隆自 GitHub）
│   └── agi-society-cn/
├── wiki/                              ← Quartz 4.5.2 项目（知识库）
│   ├── content/                       ← 已迁移的 Markdown 内容
│   ├── quartz.config.ts
│   └── quartz.layout.ts
└── homepage/                          ← 首页（待建设）
```

---

## 架构决策

```
agi-society.cn
├── 首页 (homepage/)  → 呈现性页面（品牌展示、视觉冲击）
│   最终方案：Astro       ← Islands 架构，零 JS 默认，59k Stars
│   过渡方案：Nólëbase    ← 先快速上线，后续 Astro 重写替换
│
└── 知识库 (wiki/)    → 内容性页面（深度阅读、知识网络）
    最终方案：Quartz v4.5.2 ← 力导向图谱，双向链接，12k Stars
```

**核心判断**：首页是呈现性页面（视觉设计驱动），wiki 是内容性页面（信息架构驱动）。两种不同的产物，用两个不同的框架各司其职。

---

## 需求优先级

```
页面呈现效果（美观度） > 关系图谱功能
     60%                   25%           + 其他 15%

首页：呈现 > 一切          → Astro
Wiki：图谱 + 内容 > 呈现    → Quartz
过渡：速度 > 完美           → Nólëbase
```

---

## 核心发现

### 1. 原网站

- 仓库 `Hailaylin/agi-society-cn`，MkDocs Material 构建
- 功能完整在线运行，内容覆盖 7 大板块 100+ 页面
- 缺少知识网络（无双向链接、反向链接、图谱）
- 作为文档站成熟可靠，但不适合作为新架构的一部分（退役为历史存档）

→ 详见 [website-research.md](./website-research.md)

### 2. 框架选型

| 角色 | 最终方案 | 过渡方案 | 理由 |
|------|------|------|------|
| **首页** | Astro | Nólëbase | Astro 呈现自由度最高；Nólëbase 可快速上线 |
| **知识库** | Quartz | — | 图谱唯一成熟方案，已就位 |

→ 详见 [framework-comparison.md](./framework-comparison.md)

### 3. Nólëbase 首页复刻方案

通过逆向 https://nolebase.aaaab3n.moe/ 和 https://alife.org/ ，分析了 VitePress Home 布局的实现方式，形成了 Nólëbase 过渡首页的详细复刻方案（Hero + Features + Team 结构，学术化配色）。

→ 详见 [nolebase-homepage-reverse-engineering.md](./nolebase-homepage-reverse-engineering.md)

### 4. 技术拆解

用 tech-dissect 方法论对 Nólëbase 知识库首页进行了模块级拆解（P1-P5 评估），识别出 5 个可立即复用的 A 类模块（Hero、Features、Team、CSS Variables、Footer）。

→ 详见 [tech-dissect-nolebase-knowledge-base.md](./tech-dissect-nolebase-knowledge-base.md)

### 5. 内容组织架构

分析了 Nólëbase（知识库组织）和 ALife（学术学会组织）的内容结构，抽象出「学术信息 + 知识库」双轨合一的 AGI Society 内容架构蓝图。

→ 详见 [content-organization-analysis.md](./content-organization-analysis.md)

### 6. 为什么首页不用文档框架

文档框架（MkDocs、VitePress、Quartz）的本质是把 Markdown 变成可导航的文档。但首页不是文档，首页是品牌的视觉陈述。需要自由布局、动画、Hero 区域、极致性能——这些是 Astro 的强项，文档框架的弱项。

---

## 分阶段实施计划

### Phase 1：过渡期上线（Nólëbase 首页 + Quartz Wiki）

| # | 任务 | 位置 | 优先级 |
|---|------|------|:---:|
| 1 | 搭建 Nólëbase 项目（presetClient 模式） | `homepage/` | P0 |
| 2 | 配置首页导航（精简，导向 wiki） | Nólëbase config | P0 |
| 3 | 补充 Quartz wiki 缺失内容 | `wiki/content/` | P0 |
| 4 | 迁移图片资源到 wiki | `wiki/content/**/image/` | P0 |
| 5 | MkDocs Admonition → Obsidian Callout 转换 | `wiki/content/` | P0 |
| 6 | 创建出版物专区（`publications/`） | `wiki/content/publications/` | P1 |
| 7 | 创建协会动态（`news/`） | `wiki/content/news/` | P1 |
| 8 | 整合在线资源页面 | `wiki/content/` | P1 |
| 9 | 统一两站视觉（配色、字体） | 全局 CSS | P1 |
| 10 | 配置 Quartz 图谱参数 | `wiki/quartz.layout.ts` | P1 |
| 11 | 集成 Giscus 评论系统 | Quartz config | P1 |
| 12 | 部署：GitHub Actions + 自定义域名 | CI/CD | P1 |

### Phase 2：首页升级（Astro 替换 Nólëbase）

| # | 任务 | 位置 | 优先级 |
|---|------|------|:---:|
| 13 | 首页视觉设计（Hero、卡片、动画） | 设计稿 | P1 |
| 14 | Astro 项目初始化 | `homepage/` | P1 |
| 15 | 开发交互组件（时间线、团队展示等） | Astro 组件 | P2 |
| 16 | 性能优化（Lighthouse 100） | Astro build | P2 |
| 17 | 替换 Nólëbase 首页上线 | 部署切换 | P2 |

### Phase 3：持续迭代

| # | 任务 | 位置 | 优先级 |
|---|------|------|:---:|
| 18 | 首页动画增强（视差、微交互） | Astro 组件 | P3 |
| 19 | Wiki 图谱参数持续调优 | Quartz config | P3 |
| 20 | 补全 NARust WASM 在线 Demo | `wiki/static/` | P3 |
| 21 | 创建 AGI 术语词典（`glossary/`） | `wiki/content/glossary/` | P3 |
| 22 | 创建学术机会页面（`opportunities/`） | `wiki/content/opportunities/` | P3 |
| 23 | SEO + 性能监控 | 全局 | P3 |

---

## 相关链接

- 原网站：https://hailaylin.github.io/agi-society-cn/
- 原仓库：https://github.com/Hailaylin/agi-society-cn
- Astro：https://astro.build/
- Quartz：https://quartz.jzhao.xyz/
- Nólëbase：https://nolebase.ayaka.io/
- 参考首页：https://nolebase.aaaab3n.moe/
- ALife 学术参考：https://alife.org/
