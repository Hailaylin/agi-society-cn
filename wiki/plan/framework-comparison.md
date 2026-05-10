# 框架技术选型交叉分析

> 调研日期：2026-05-10
> 分析对象：MkDocs Material、Nólëbase、Quartz
> 分析重点：呈现效果、知识图谱 / 关系网络能力

---

## 1. 框架概述

### 1.1 MkDocs Material

| 属性 | 详情 |
|------|------|
| 仓库 | [squidfunk/mkdocs-material](https://github.com/squidfunk/mkdocs-material) |
| Stars | 22,000+ |
| 语言 | Python |
| 定位 | 通用技术文档站点 |
| 设计哲学 | 结构化、线性阅读、配置驱动 |
| 当前 AGI Society 使用版本 | 最新 Material 9.x |
| 许可证 | MIT |

### 1.2 Nólëbase

| 属性 | 详情 |
|------|------|
| 仓库 | [nolebase/nolebase](https://github.com/nolebase/nolebase) |
| 生态仓库 | [nolebase/integrations](https://github.com/nolebase/integrations) |
| Stars | 615（主仓库）+ 310（integrations） |
| 语言 | TypeScript（VitePress + Vue 3） |
| 定位 | 知识库发布、Obsidian 笔记站点 |
| 设计哲学 | Obsidian 兼容、双向链接、插件生态 |
| 当前版本 | v1.0 / integrations v2.20 |
| 许可证 | MIT |

### 1.3 Quartz

| 属性 | 详情 |
|------|------|
| 仓库 | [jackyzha0/quartz](https://github.com/jackyzha0/quartz) |
| Stars | 12,113 |
| 语言 | TypeScript（自建构建引擎） |
| 定位 | 数字花园（Digital Garden） |
| 设计哲学 | 网络化思维、知识节点互联、Obsidian 原生兼容 |
| 当前版本 | v4.5.2 |
| 许可证 | MIT |

---

## 2. 呈现效果对比

### 2.1 页面布局

| 特性 | MkDocs Material | Nólëbase | Quartz |
|------|:---:|:---:|:---:|
| 单列内容布局 | ✅ | ✅ | ✅ |
| 双列（内容+侧边栏） | ✅ 导航栏侧边 | ✅ | ✅ |
| 三列（Explorer+正文+图谱） | ❌ | ❌ | ✅ 大屏自动启用 |
| 阅读模式（专注视图） | ❌ | ✅ 增强可读性 | ✅ Reader Mode |
| 返回顶部 | ✅ | ✅ | ❌ |

### 2.2 视觉与主题

| 特性 | MkDocs Material | Nólëbase | Quartz |
|------|:---:|:---:|:---:|
| 亮/暗主题切换 | ✅ | ✅ | ✅ |
| 主题色定制 | ✅ YAML 配置 | ✅ CSS 变量 | ✅ 配置文件 |
| 字体定制 | ✅ Google Fonts | ✅ | ✅ Google Fonts |
| 代码高亮 | ✅ Pygments | ✅ Shiki | ✅ Shiki |
| 代码复制按钮 | ✅ | ✅ | ✅ |
| Mermaid 图表 | ✅ 静态渲染 | ✅ | ✅ 全屏交互式查看 |
| 响应式设计 | ✅ | ✅ | ✅ |

### 2.3 导航体验

| 特性 | MkDocs Material | Nólëbase | Quartz |
|------|:---:|:---:|:---:|
| 顶部导航栏 | ✅ Tab 导航 | ✅ | ❌ |
| 侧边栏文件树 | ❌ | ✅ 文件夹树 | ✅ Explorer |
| 面包屑导航 | ✅ | ✅ | ✅ |
| SPA 路由（无刷新跳转） | ❌ | ✅ | ✅ Million SPA |
| 全文搜索 | ✅ 内置 | ✅ VitePress | ✅ FlexSearch |
| 悬浮链接预览 | ❌ | ✅ | ✅ Popover Previews |
| HMR 热更新 | ✅ | ✅ Vite | ✅ esbuild |

### 2.4 内容展示

| 特性 | MkDocs Material | Nólëbase | Quartz |
|------|:---:|:---:|:---:|
| Obsidian Callout | ✅ 12 种 Admonition | ✅ | ✅ 可折叠 |
| 数学公式 | ✅ MathJax 3 | ✅ MathJax 3 | ✅ LaTeX/KaTeX |
| 目录生成 (TOC) | ✅ 右侧 | ✅ 右侧 | ✅ 右侧 |
| OG/社交分享卡片 | ❌ | ✅ 自动生成 | ✅ 支持 |
| RSS 订阅 | ❌ | ❌ | ✅ |
| i18n 国际化 | ✅ 主题级 | ❌ | ✅ |
| 评论系统 | ✅ Giscus（手动集成） | ✅ 可嵌入 | ✅ Giscus 集成 |

### 2.5 呈现效果总评

```
视觉成熟度（开箱即用）:
  MkDocs Material ⭐⭐⭐⭐⭐ — 最成熟的 Material Design 主题
  Quartz          ⭐⭐⭐⭐   — 简洁优雅，数字花园风格
  Nólëbase        ⭐⭐⭐     — 依赖 VitePress 默认主题 + 自我定制

沉浸感（数字花园感）:
  Quartz          ⭐⭐⭐⭐⭐ — 3列布局+图谱+悬浮预览，最适合知识探索
  Nólëbase        ⭐⭐⭐⭐   — 插件丰富，笔记体验好
  MkDocs Material ⭐⭐⭐     — 传统文档站感，偏正式
```

---

## 3. 知识图谱 / 关系网络能力（核心差异）

### 3.1 Quartz — 图谱能力最强 ★★★★★

Quartz 的 Graph View 是其核心差异化功能，也是「数字花园」理念的关键体现。

```
图类型：
  ├── 本地图（Local Graph）：显示与当前页面直接相连的节点（1 跳）
  └── 全局图（Global Graph）：显示知识库中所有节点及其全部连接

渲染引擎：
  ├── D3.js — 力导向图布局算法
  └── Pixi.js — 高性能 Canvas 渲染（大量节点时仍流畅）

节点规则：
  ├── 节点半径 ∝ 入链数 + 出链数（链接越多的页面节点越大）
  ├── 已访问节点变色（类似浏览器历史链接色）
  └── 支持显示/隐藏标签节点

交互操作：
  ├── 拖拽平移（drag）
  ├── 滚轮缩放（zoom，0.5x–3x）
  ├── 悬停放大节点标签 + 高亮关联连线
  ├── 点击节点 → SPA 导航到对应页面
  ├── 一键重置视图（Reset 按钮）
  └── 触屏设备支持

可配置的物理参数：
  repelForce: 0.5      — 节点间斥力
  centerForce: 0.3     — 向心力
  linkDistance: 30     — 默认链接长度
  depth: 1 / -1        — 显示深度（-1 = 全局）
  scale: 1.1 / 0.9     — 默认缩放
  fontSize: 0.6        — 标签字号
  opacityScale: 1      — 缩放时标签淡出速度
  enableRadial: false   — 类 Obsidian 径向约束布局
  showTags: true        — 显示标签节点
  removeTags: []        — 过滤指定标签
```

**配套的网络化知识能力**：
- 反向链接（Backlinks）自动生成在每页底部
- Wikilinks `[[ ]]` 原生支持
- 悬浮链接预览（Popover Previews）
- Tag Pages 自动聚合同标签页面
- 文件夹页面自动聚合
- SPA 路由无缝跳转

### 3.2 Nólëbase — 图谱施工中 ★★☆☆☆

Nólëbase 有一个 `vitepress-plugin-graph-view` 插件，但尚处于开发早期：

```
当前状态：CONSTRUCTING（页面标注 "CONSTRUCTING"）
渲染引擎：D3.js 力导向（SVG 渲染，非 Canvas）
节点数据：硬编码示例 8 个节点 + 7 条边（非真实内容数据）
交互：基础拖拽 + 缩放 + 悬停
图类型：单图（无本地/全局切换）
```

Nólëbase 已有的知识网络能力：
- 双向链接 `[[ ]]` via `markdown-it-bi-directional-links`
- 内链预览 via `vitepress-plugin-inline-link-preview`
- 页面属性展示 via `vitepress-plugin-page-properties`

**结论**：Nólëbase 的关系图谱目前是半成品，不能用于生产环境。但其双向链接和悬浮预览是成熟的。

### 3.3 MkDocs Material — 无图谱能力 ★☆☆☆☆

MkDocs Material 是线性文档站，不具备知识网络能力：

```
知识图谱：❌ 无
双向链接：❌ 需第三方插件
反向链接：❌ 需第三方插件（如 mkdocs-backlinks，但功能有限）
标签聚合：❌ 无
悬浮预览：❌ 无
```

---

## 4. 技术栈与生态对比

| 维度 | MkDocs Material | Nólëbase | Quartz |
|------|:---:|:---:|:---:|
| **语言** | Python | TypeScript | TypeScript |
| **构建器** | MkDocs | VitePress (Vite) | 自建 (esbuild) |
| **前端框架** | Jinja2 模板 | Vue 3 | Preact |
| **CSS 方案** | SCSS | UnoCSS | 自建 SCSS |
| **搜索** | 内置 Lunr.js | VitePress 内置 | FlexSearch |
| **图表** | Mermaid (静态) | Mermaid | Mermaid (交互式) + Pixi.js 图谱 |
| **包管理** | pip | pnpm | npm |
| **Node 版本** | 不适用 | ≥18 | ≥22 |
| **热更新** | mkdocs serve | Vite HMR | esbuild HMR |
| **插件系统** | Python 插件 | VitePress + Vue 插件 | Transformer/Emitter/Filter 插件体系 |
| **Obsidian 兼容** | ❌ | ✅ (Callout/Wikilinks) | ✅ (Callout/Wikilinks/标签/属性) |

---

## 5. 部署对比

| 部署方式 | MkDocs Material | Nólëbase | Quartz |
|------|:---:|:---:|:---:|
| GitHub Pages | ✅ | ✅ | ✅ |
| Netlify | ✅ | ✅ 官方推荐 | ✅ |
| Vercel | ✅ | ✅ | ✅ |
| Cloudflare Pages | ✅ | ✅ | ✅ |
| 自建服务器 | ✅ 静态文件 | ✅ 静态文件 | ✅ 静态文件 |
| Docker | ✅ | ❌ | ✅ |
| 构建产物 | `site/` | `.vitepress/dist/` | `public/` |

---

## 6. 社区与维护

| 指标 | MkDocs Material | Nólëbase | Quartz |
|------|:---:|:---:|:---:|
| GitHub Stars | 22,000+ | 615 | 12,113 |
| Forks | 3,500+ | 91 | 3,768 |
| 社区活跃度 | 极高 | 中等 | 高 |
| 中文社区 | 一般 | 强（中文开发者主导） | 中等 |
| 最新发布 | 持续更新 | 活跃维护中 | v4.5.2 (2026-04) |
| 文档质量 | 优秀 | 良好 | 优秀 |
| 问题响应 | 快 | 中等 | 快 |

---

## 7. 迁移成本估算

### 从 MkDocs Material 迁移到 Quartz

| 维度 | 成本 |
|------|------|
| 内容迁移 | **低** — 同为 Markdown，需将 MkDocs Admonition 语法转为 Obsidian Callout 语法 |
| 导航配置 | **中** — 需熟悉 `quartz.config.ts` 和 `quartz.layout.ts` |
| 主题定制 | **中** — CSS 变量系统不同，需重新适配配色和字体 |
| 评论系统 | **低** — Quartz 同样支持 Giscus |
| 数学公式 | **低** — 切换到 KaTeX（Quartz 默认）或保留 MathJax |
| CI/CD | **低** — 构建命令不同，但部署逻辑类似 |
| 团队学习 | **中** — 需 Node.js 环境和 TypeScript 基础配置 |
| 总工期估算 | 1-2 周（内容 95% 复用） |

### 从 MkDocs Material 迁移到 Nólëbase

| 维度 | 成本 |
|------|------|
| 内容迁移 | **中** — Markdown 基本兼容，但 Admonition 语法需转换 |
| 导航配置 | **高** — VitePress 侧边栏配置较 MkDocs 复杂 |
| 主题定制 | **高** — 需 Vue 组件开发能力 |
| 图谱功能 | ⛔ **不可用** — graph-view 尚在施工 |
| 总工期估算 | 2-3 周（且图谱功能缺失） |

---

## 8. 推荐结论

### 推荐：Quartz v4.5.2

**理由**：

1. **满足 web_arch.md 的知识网络需求**：力导向图、双向链接、反向链接、标签系统一应俱全
2. **成熟度**：12k+ Stars，v4.5.2 稳定版本，3,700+ Fork，社区验证充分
3. **呈现效果**：三列布局 + 图谱 + 悬浮预览，最具「数字花园」沉浸感
4. **迁移成本可控**：Markdown 内容 95% 可复用，主要工作在配置和主题适配
5. **Obsidian 原生兼容**：未来可直接用 Obsidian 编辑内容，双向链接原生支持
6. **已是当前项目 wiki 所选框架**：`wiki/` 目录已经是 Quartz 4.5.2 项目

**不推荐 Nólëbase 的理由**：graph-view 插件处于 CONSTRUCTING 状态，关系图谱核心功能不可用。但其双向链接和悬浮预览是成熟功能，可作为 Quartz 的参考。

**保留 MkDocs Material 的理由**：如果不需要知识网络功能，MkDocs Material 是最成熟、最简单、视觉效果最好的纯文档站方案。当前官网已在此良好运行。
