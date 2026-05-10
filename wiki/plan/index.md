# AGI Society 网站重建 — 调研汇总

> 日期：2026-05-10
> 项目：中国通用人工智能协会网站

---

## 项目当前结构

```
agi-society-cn/
├── docs/
│   └── plan/                          ← 调研文档（本文位置）
│       ├── index.md                   ← 本文件
│       ├── website-research.md        ← 原网站调研
│       └── framework-comparison.md    ← 框架交叉分析
├── original-contents/                 ← 原 MkDocs 源码（克隆自 GitHub）
│   └── agi-society-cn/
├── wiki/                              ← Quartz 4.5.2 项目（新站）
│   ├── content/                       ← 已迁移的 Markdown 内容
│   ├── quartz.config.ts               ← Quartz 配置
│   └── quartz.layout.ts               ← 布局配置
└── homepage/                          ← 首页（待建设）
```

---

## 调研核心发现

### 1. 原网站现状

- **仓库**：[Hailaylin/agi-society-cn](https://github.com/Hailaylin/agi-society-cn)（独立原创，非 Fork）
- **技术栈**：MkDocs + Material 主题，Python 生态
- **部署**：GitHub Pages + 深圳阿里云服务器（ICP 备案：粤ICP备2021145979号-1）
- **完整度**：功能完整（搜索、评论、主题切换、数学公式等均正常运作）
- **镜像**：Gitee [Hailay/agi-society-cn](https://gitee.com/Hailay/agi-society-cn)，自动同步
- **内容**：NARS 理论/工程、AGI/SAI、思想书库、9 届年会记录、6 位核心团队成员介绍

### 2. 框架选型结论

| 框架 | 知识图谱 | 成熟度 | 适合场景 |
|------|:---:|:---:|------|
| **Quartz** | ⭐⭐⭐⭐⭐ | 成熟 (v4.5.2) | 数字花园、知识网络 |
| **Nólëbase** | ⭐⭐ (施工中) | 中等 | Obsidian 笔记站（等图谱成熟） |
| **MkDocs Material** | ⭐ (无) | 极成熟 | 传统文档站 |

**推荐 Quartz**，理由：满足 web_arch.md 的知识网络需求，且已是 wiki/ 目录选定的框架。

### 3. 关键差异化功能（Quartz 独有或最强）

- 力导向知识图谱（D3.js + Pixi.js，本地/全局双视图）
- 反向链接自动生成
- 悬浮链接预览（Popover Previews）
- 三列布局（Explorer + 正文 + 图谱）
- SPA 无刷新路由
- Obsidian 原生兼容（Callout、Wikilinks、标签）

---

## 后续行动建议

1. **完善 wiki 内容迁移** — 对比 `original-contents/agi-society-cn/docs/` 与 `wiki/content/`，确保内容完整同步
2. **配置图谱参数** — 在 `quartz.layout.ts` 中调优 Graph View 的物理参数
3. **处理图片资源** — 将原 repo 中的图片迁移到 `wiki/content/` 对应位置
4. **配置 Giscus 评论** — 按原网站的 Giscus 配置集成到 Quartz
5. **建设 homepage** — 独立首页（`homepage/` 目录待开发）
6. **部署配置** — 配置 GitHub Actions 自动构建部署 Quartz 到目标域名

---

## 相关链接

- 原网站：https://hailaylin.github.io/agi-society-cn/
- 原仓库：https://github.com/Hailaylin/agi-society-cn
- Quartz 文档：https://quartz.jzhao.xyz/
- Quartz 仓库：https://github.com/jackyzha0/quartz
- Nólëbase：https://github.com/nolebase/nolebase
