# Nólëbase 首页逆向分析与学术风格参考

> 调研日期：2026-05-10
> 方法：浏览器实地访问 + HTML/CSS 逆向 + 源码仓库分析
> 目标：理解如何复刻 Nólëbase 式首页，融入学术风格，用于 AGI Society 首页过渡方案

---

## 1. 参考站点分析

### 1.1 Nólëbase 首页 — https://nolebase.aaaab3n.moe/

#### 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | VitePress v1.0.0-rc.40 |
| 语言 | TypeScript + Vue 3 |
| CSS | UnoCSS（原子化 CSS）+ 自定义 CSS 变量 |
| 构建 | Vite |
| 部署 | Netlify |
| Markdown 增强 | Nólëbase integrations 全家桶 |
| 仓库 | `nyovelt/nolebase`（Nólëbase 的 fork） |

#### 页面结构（HTML 逆向）

```
<body class="VPNolebaseEnhancedReadabilitiesLayoutSwitchSidebarWidthAdjustableOnly">
  ├── <header> VitePress 导航栏
  │   ├── Logo + 站点名
  │   ├── Search 按钮（Ctrl+K）
  │   ├── Nav: Homepage | Notes | Latest
  │   ├── 增强可读性菜单
  │   └── Share 按钮
  │
  └── <main>
      ├── VPHero (Hero 区域)
      │   ├── .name       → "g~Nj$3J2^" (clip 动画文本)
      │   ├── .text       → "记录回忆，知识和畅想的地方"
      │   ├── .tagline    → 昆雅语解释
      │   ├── .actions    → CTA 按钮
      │   │   ├── .brand  → "开始阅读" → /Notes/index
      │   │   └── .alt    → "GitHub 上浏览" → GitHub
      │   └── .image      → logo.svg + .image-bg 背景光晕
      │
      ├── VPFeatures (特性卡片网格)
      │   └── .grid-4 × 4 张卡片
      │       ├── 🌈 多样的主题和内容
      │       ├── 📃 皆为 Markdown
      │       ├── 🚀 由 VitePress 驱动
      │       └── 🗃 由 Obsidian 驱动
      │
      └── VPTeamMembers (团队展示)
          └── Creators of Nólëbase → 头像 + 名字 + 头衔 + 社交链接
```

#### 关键实现细节

**1. Homepage 是 Markdown 驱动的**

```yaml
# index.md (前端内容)
---
layout: home          # ← VitePress Home 布局
sidebar: false        # ← 隐藏侧边栏
title: Nólëbase
titleTemplate: 记录回忆，知识和畅想的地方

hero:
  name: g~Nj$3J2^
  text: 记录回忆，知识和畅想的地方
  tagline: ...
  image:
    src: /logo.svg
    alt: Vitest
  actions:
    - theme: brand
      text: 开始阅读
      link: /Notes/index
    - theme: alt
      text: GitHub 上浏览
      link: https://github.com/nyovelt/nolebase

features:
  - title: ...
    details: ...
    icon: 🌈
  # ... × 4
---

<HomePage />   # ← 自定义 Vue 组件（团队展示）
```

**2. 自定义 Vue 组件注入**

```typescript
// .vitepress/theme/index.ts
const ExtendedTheme: Theme = {
  extends: DefaultTheme,   // ← 继承 VitePress 默认主题
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 利用 VitePress Layout Slots 注入自定义组件
      'nav-bar-content-after': () => [
        h(NolebaseEnhancedReadabilitiesMenu),  // 阅读增强
        h(Share),                              // 分享按钮
      ],
    })
  },
  enhanceApp({ app }) {
    app.component('HomePage', HomePage)  // ← 注册自定义组件
    // ... Nólëbase 插件注册
  }
}
```

**3. HomePage 组件（团队展示）**

```vue
<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme'  // ← VitePress 内置组件
import { creators } from '../../creators'
</script>
<template>
  <div class="content">
    <main class="main">
      <div class="vp-doc">
        <h2>Creators of {{ siteName }}</h2>
        <VPTeamMembers size="small" :members="creators" />
      </div>
    </main>
  </div>
</template>
```

**4. Nólëbase Integrations 注入**

```typescript
// 在增强阅读体验的同时保持了 VitePress 默认主题
app.use(NolebaseInlineLinkPreviewPlugin)     // 悬浮链接预览
app.use(NolebaseGitChangelogPlugin)          // Git 变更记录
app.use(NolebasePagePropertiesPlugin())      // 页面属性面板（标签、进度、字数、阅读时间）
app.provide(NolebaseEnhancedReadabilitiesInjectionKey, {
  layoutSwitch: { defaultMode: SidebarWidthAdjustableOnly },
  spotlight: { defaultToggle: true, hoverBlockColor: 'rgb(240 197 52 / 7%)' }
})
```

#### 视觉效果要点

| 元素 | 效果 | 实现方式 |
|------|------|------|
| **标题动画** | `.clip` CSS 类实现渐变裁剪文字 | VitePress 内置 Hero 样式 |
| **Hero 背景** | Logo 后方的柔和光晕 | `.image-bg` 模糊渐变圆 |
| **卡片悬停** | 边框高亮（hover:zinc） | VitePress 默认 VPFeature 样式 |
| **品牌按钮** | 主题色填充 + 圆角 | `.VPButton.brand` |
| **阅读增强** | 调整布局宽度、行距、字体大小 | Nólëbase 插件面板 |
| **内链预览** | 悬浮弹出卡片显示目标页面内容 | Nólëbase 插件 |

---

### 1.2 学术风格参考 — https://alife.org/

#### 技术栈

| 层面 | 技术 |
|------|------|
| CMS | WordPress 6.9 |
| 主题 | OceanWP + OceanWP Child Theme |
| 字体 | Open Sans, sans-serif |
| 部署 | 自建服务器 |

#### 学术风格设计要素

```
配色方案：
  ├── 背景: #ffffff (纯白)
  ├── 正文: #000000 (纯黑)
  ├── 链接: rgb(25, 30, 35) (近黑)
  ├── 无过度装饰色（学术克制感）
  └── 页头透明背景

排版：
  ├── 正文字号: 14px（学术期刊标准）
  ├── 标题字号: 40px / font-weight: 600（有力但不花哨）
  ├── 行高: 1.8 (25.2px / 14px)
  ├── 字体: Open Sans（无衬线、可读性强）
  └── 中西文间距自然

布局：
  ├── 全宽内容区（849px 主内容）
  ├── 面包屑导航（层级清晰）
  ├── 三段式页脚（4 列 widget 区 + 版权）
  ├── 顶栏社交图标（低调）
  └── 搜索功能集成在顶栏

学术机构特有的设计模式：
  ├── 协会 Logo + 名称（品牌识别）
  ├── 会员/加入入口
  ├── 出版物专区（期刊 + 会议论文集）
  ├── 研究人员/团队展示
  ├── 联系方式与反馈渠道
  └── Colophon（技术声明页）
```

#### ALife 的学术设计原则

| 原则 | 表现 |
|------|------|
| **克制** | 无花哨动画，无渐变按钮，无阴影卡片 |
| **信息层级清晰** | 面包屑 + Section Header + 正文 |
| **排版驱动** | 好的字体 + 合适的字重 + 舒适的间距 = 权威感 |
| **功能性** | 搜索、导航、社交、联系方式，每一样都服务于学术交流 |
| **品牌一致** | Logo、配色、版式统一 |

---

## 2. 复刻策略：AGI Society 首页（Nólëbase 版）

### 2.1 目标效果

```
AGI Society 首页 = Nólëbase 式的 Hero + Features + Team 布局
                 + ALife 式的学术克制配色与排版
                 + 协会特有的内容（年会、团队成员、出版物、加入我们）
```

### 2.2 页面结构设计

```
┌─────────────────────────────────────────────┐
│  Nav: 首页 | Wiki | 年会 | 关于 | 搜索       │  ← VitePress Nav
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │           HERO 区域                   │    │
│  │  ┌──────────────────────────────┐    │    │
│  │  │  中国通用人工智能协会          │    │    │  ← .name (大字标题)
│  │  │  AGI Society of China         │    │    │  ← .text (副标题)
│  │  │  探索通用人工智能的理论与实现   │    │    │  ← .tagline
│  │  │                              │    │    │
│  │  │  [探索 Wiki]  [关于我们]       │    │    │  ← .actions (CTA 按钮)
│  │  └──────────────────────────────┘    │    │
│  │                    🧠 (协会 Logo)     │    │  ← .image
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │         特性卡片 (4-6 张)            │    │  ← VPFeatures
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐│    │
│  │  │ 📚   │ │ 🧠   │ │ 🤝   │ │ 📡   ││    │
│  │  │知识库│ │NARS  │ │年会  │ │最新  ││    │
│  │  │      │ │理论  │ │活动  │ │动态  ││    │
│  │  └──────┘ └──────┘ └──────┘ └──────┘│    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │         研究团队展示                  │    │  ← VPTeamMembers
│  │  王培  刘凯  徐英瑾  那迪  ...       │    │
│  └─────────────────────────────────────┘    │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │         页脚                         │    │
│  │  Copyright © 2016-2024              │    │
│  │  粤ICP备2021145979号-1              │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
```

### 2.3 配置实现方案

#### index.md（首页 Markdown 文件）

```yaml
---
layout: home
sidebar: false

title: 中国通用人工智能协会
titleTemplate: AGI Society of China

hero:
  name: 中国通用人工智能协会
  text: AGI Society of China
  tagline: 探索通用人工智能的理论与实现——汇集 NARS 理论与工程、AGI 前沿研究与学术交流
  image:
    src: /logo.svg
    alt: AGI Society
  actions:
    - theme: brand
      text: 探索 Wiki
      link: /wiki/
    - theme: alt
      text: 关于我们
      link: /about/

features:
  - title: NARS 知识库
    icon: 📚
    details: 非公理推理系统完整理论体系，从 GTI 到 NAC，12 个实现版本全覆盖
  - title: AGI 理论研究
    icon: 🧠
    details: 通用人工智能的前沿探索——3C 原则、AIKR 不足预设、一般智能理论
  - title: 学术年会
    icon: 🤝
    details: 2016–2024 连续九届中国通用人工智能年会，汇聚国内外 AGI 研究者
  - title: 最新动态
    icon: 📡
    details: 组会视频、学术论文、Bilibili 讲座合集，持续更新的 AGI 研究资讯
---
```

#### 学术化视觉定制（CSS 变量覆写）

```css
/* .vitepress/theme/styles/vars.css */
:root {
  /* ALife 风格：克制、专业、高对比度 */
  --vp-c-brand-1: #284b63;        /* 深蓝灰 — 学术主色调 */
  --vp-c-brand-2: #3c6e71;        /* 蓝绿 — 次要色 */
  --vp-c-brand-3: #284b63;

  --vp-c-text-1: rgba(0, 0, 0, 0.87);
  --vp-c-text-2: rgba(0, 0, 0, 0.6);

  --vp-font-family-base: 'Noto Sans SC', 'Open Sans', sans-serif;
  --vp-font-family-mono: 'IBM Plex Mono', monospace;
}

.dark {
  --vp-c-brand-1: #7b97aa;
  --vp-c-brand-2: #84a59d;
  --vp-c-text-1: rgba(235, 235, 236, 0.87);
  --vp-c-text-2: rgba(235, 235, 236, 0.6);
}
```

### 2.4 Nólëbase 插件选用

| 插件 | 用途 | 必要性 |
|------|------|:---:|
| `vitepress-plugin-enhanced-readabilities` | 阅读增强——字体大小、行距、布局宽度可调 | 推荐 |
| `vitepress-plugin-inline-link-preview` | Wiki 链接悬浮预览 | 推荐 |
| `vitepress-plugin-highlight-targeted-heading` | 锚点跳转高亮 | 可选 |
| `vitepress-plugin-git-changelog` | 页面编辑历史 | 可选 |
| `vitepress-plugin-page-properties` | 标签、字数、阅读时间 | 可选 |
| `vitepress-plugin-og-image` | 社交分享卡片 | 推荐 |
| `vitepress-plugin-meta` | SEO meta 标签 | 推荐 |
| `markdown-it-bi-directional-links` | 双向链接 [[ ]] | 推荐 |

---

## 3. 为什么用 Nólëbase 作为过渡首页

### 3.1 理由

| 原因 | 说明 |
|------|------|
| **即开即用** | VitePress Home 布局 + Nólëbase 集成，零配置起步 |
| **内容驱动** | Hero + Features 通过 YAML frontmatter 配置即可，无需写 HTML |
| **Node.js 生态统一** | 与 Quartz Wiki 共享 Node.js 生态，部署体系一致 |
| **可渐进增强** | 先用 Markdown 配置出首页，后续可以用 Vue 组件逐步增强交互 |
| **快速上线** | 相比 Astro 需要从零设计，Nólëbase 几小时内可出第一版 |

### 3.2 过渡到 Astro 的路径

```
Phase 1 (本周):   Nólëbase Homepage → 快速上线，有首页可用
Phase 2 (后续):   Astro 首页开发 → 更自由的布局、动画、品牌视觉
Phase 3 (切换):   无缝替换 Nólëbase → Astro
```

### 3.3 Nólëbase vs Astro（首页场景）

| 维度 | Nólëbase | Astro |
|------|------|------|
| 开发速度 | ⭐⭐⭐⭐⭐ (YAML 配置) | ⭐⭐⭐ (需编码) |
| 呈现自由度 | ⭐⭐⭐ (VitePress 布局约束) | ⭐⭐⭐⭐⭐ (完全自由) |
| 视觉冲击力上限 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 学习成本 | 低（熟悉 Markdown 即可） | 中（需前端基础） |
| 适合阶段 | 过渡期快速上线 | 最终精品呈现 |

---

## 4. 实施清单

### 4.1 最小可行首页（Day 1）

- [ ] 初始化 VitePress + Nólëbase 项目结构
- [ ] 配置 `index.md`（Hero + Features）
- [ ] 设置学术配色 CSS 变量
- [ ] 创建协会 Logo
- [ ] 配置导航栏（首页 | Wiki | 关于）
- [ ] 配置页脚（版权 + ICP 备案号）

### 4.2 增强（Week 1）

- [ ] 集成 Nólëbase 阅读增强插件
- [ ] 集成内链预览插件
- [ ] 团队展示组件（VPTeamMembers）
- [ ] 最新动态 / 年会回顾卡片
- [ ] SEO / OG 图片生成
- [ ] 搜索功能

### 4.3 上线检查

- [ ] 亮暗模式切换正常
- [ ] 移动端响应式
- [ ] CJK 字体渲染正确
- [ ] OG 社交卡片预览正常
- [ ] 链接跳转正常（含 Quartz Wiki）
- [ ] Lighthouse 性能 ≥ 90

---

## 5. 附录

### 5.1 参考仓库文件清单（nyovelt/nolebase）

```
.
├── index.md                          ← 首页（Hero + Features YAML）
├── .vitepress/
│   ├── config.ts                     ← VitePress 配置
│   ├── creators.ts                   ← 团队成员数据
│   └── theme/
│       ├── index.ts                  ← 主题入口（插件注册 + Layout Slots）
│       └── components/
│           ├── HomePage.vue           ← 团队展示组件
│           ├── Share.vue             ← 分享按钮
│           ├── DocFooter.vue         ← 自定义页脚
│           └── AppContainer.vue      ← App 容器
├── metadata/                         ← 站点元数据
├── public/logo.svg                   ← Logo
├── package.json                      ← 依赖管理
├── uno.config.ts                     ← UnoCSS 配置
└── vite.config.ts                    ← Vite 配置
```

### 5.2 关键依赖（package.json 参考）

```json
{
  "devDependencies": {
    "@nolebase/integrations": "^2.18.0",
    "@nolebase/markdown-it-bi-directional-links": "^2.18.0",
    "@nolebase/vitepress-plugin-enhanced-readabilities": "^2.18.0",
    "@nolebase/vitepress-plugin-inline-link-preview": "^2.18.0",
    "@nolebase/vitepress-plugin-highlight-targeted-heading": "^2.18.0",
    "@nolebase/vitepress-plugin-git-changelog": "^2.18.0",
    "@nolebase/vitepress-plugin-page-properties": "^2.18.0",
    "@nolebase/vitepress-plugin-og-image": "^2.18.0",
    "@nolebase/vitepress-plugin-meta": "^2.18.0",
    "vitepress": "^2.0.0-alpha",
    "vue": "^3.5",
    "unocss": "^66.0"
  }
}
```

### 5.3 参考链接

- 参考首页：https://nolebase.aaaab3n.moe/
- 学术风格参考：https://alife.org/
- VitePress Home 布局文档：https://vitepress.dev/reference/default-theme-home-page
- Nólëbase 主仓库：https://github.com/nolebase/nolebase
- 目标复刻仓库：https://github.com/nyovelt/nolebase

### 5.4 评审记录

| 日期 | 变更 |
|------|------|
| 2026-05-10 | 初稿：逆向分析 Nólëbase 首页 + ALife 学术风格，形成复刻方案 |
