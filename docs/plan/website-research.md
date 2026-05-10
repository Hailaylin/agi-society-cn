# AGI Society 原官网调研报告

> 调研日期：2026-05-10
> 调研范围：原官方网站、源码仓库、基础设施、内容完整度
> 调研方法：GitHub API 代码审查 + 浏览器实地验证 + 仓库克隆分析

---

## 1. 源码仓库

### 1.1 主仓库

| 项目 | 详情 |
|------|------|
| **仓库** | [Hailaylin/agi-society-cn](https://github.com/Hailaylin/agi-society-cn) |
| **描述** | save and edit china agi society wiki web content |
| **技术栈** | MkDocs + Material 主题（Python 生态） |
| **线上地址** | `hailaylin.github.io/agi-society-cn/` |
| **部署方式** | GitHub Pages + 深圳阿里云服务器（双轨） |
| **原创性** | 独立原创仓库，非 Fork |
| **许可证** | MIT License |

### 1.2 镜像与备份

- **Gitee 镜像**：[Hailay/agi-society-cn](https://gitee.com/Hailay/agi-society-cn) — 与 GitHub 互为自动同步
- **深圳阿里云**：静态部署，满足 ICP 备案合规要求

### 1.3 关联仓库搜索结论

在 `hailaylin` 用户下的 50+ 个仓库中，搜索关键词 `AGI`、`site`、`官方网站`、`AGI Society`。

**结论**：`agi-society-cn` 是唯一与 AGI Society 官网直接相关的仓库，无可疑的 fork 或替代版本。

---

## 2. 网站内容完整度

### 2.1 导航结构

```
中国通用人工智能协会
├── NARS理论
│   ├── NARS理论概述
│   ├── AIKR / 不足预设
│   ├── 3C 原则
│   └── 参考书籍
│       ├── A General Theory of Intelligence (GTI)
│       │   ├── Preface
│       │   ├── Chapter 1–6
│       │   └── Topics (AI or AGI, Intelligence & Evolution, etc.)
│       └── 非公理控制 (NAC)
│           ├── NAC 概述
│           ├── NAC 经典版本（ONA, OpenNARS 1.5.x/3.0.x/3.1.x, PyNARS）
│           ├── NAC 原则（AIKR, 推理步进 O(N)）
│           └── NAL & NAC（NAL 7/8/9）
├── NARS工程
│   ├── NARS 各版实现（12 个版本）
│   │   ├── 20NAR1, Narjure, NARS CXin Py to TS
│   │   ├── NARS-Python, NARS-Swift, Narst
│   │   ├── NARust（含 WebAssembly 在线 Demo）
│   │   ├── ONA, OpenJunars, OpenNARS, PyNARS
│   │   └── 各版实现索引与介绍
│   └── NARS 衍生项目（NACE 等）
├── AGI 通用人工智能
│   ├── 通用人工智能定义、历史、与 AI 的区别
│   └── NARS 简介
├── SAI 专用人工智能
│   ├── 专用人工智能概述
│   └── LLMs
├── 思想书库
│   ├── 意义片网思想
│   ├── 拟态操作
│   ├── Lazero
│   ├── 类脑智能意识系统设想与架构
│   ├── 智能同一观
│   └── 资料和 Q 群
├── 历次会议
│   ├── 年会（2016–2024，共 9 届完整记录）
│   │   ├── 2016 武汉（华中师范大学）
│   │   ├── 2017 武汉（华中师范大学）
│   │   ├── 2018 锦州（渤海大学）
│   │   ├── 2019 深圳
│   │   ├── 2020 在线
│   │   ├── 2021 – 2024 逐年详细议程与视频链接
│   │   └── 各届 Bilibili 视频合集
│   └── 组会视频目录（2016–2024）
└── 关于我们
    ├── 研究团队（6 位核心成员详细介绍）
    │   ├── 王培（天普大学，OpenNARS 发起人，国际 AGI 协会委员）
    │   ├── 刘凯（渤海大学，协会召集人）
    │   ├── 徐英瑾（复旦大学，哲学教授，博士生导师）
    │   ├── 那孜古力·斯拉木（西北民族大学，博士，硕导）
    │   ├── 魏屹东（山西大学，哲学方向博导）
    │   └── 李祥（辽宁工业大学，博士师从王培）
    ├── 网站架构说明
    └── 贡献指南
```

### 2.2 内容统计

| 指标 | 数值 |
|------|------|
| Markdown 文件数 | ~100+ |
| 一级栏目 | 7 个 |
| NARS 实现版本覆盖 | 12 个 |
| 年会记录 | 9 届（2016–2024） |
| 核心团队成员 | 6 人 |
| 在线 Demo | 1 个（NARust WASM） |

---

## 3. 线上功能验证

> 通过浏览器实地访问验证，所有功能正常。

| 功能 | 状态 | 说明 |
|------|:----:|------|
| 首页渲染 | ✅ | MkDocs Material 主题，包含快捷链接、最新活动、共建指南 |
| 顶部导航栏 | ✅ | 7 个 Tab 标签页导航，支持多级下拉 |
| 全文搜索 | ✅ | 右上角搜索框，MkDocs 内置，支持高亮、分享、快捷键 |
| 评论系统 | ✅ | Giscus 集成，基于 GitHub Discussions，含 1 条现有评论 |
| 亮暗主题 | ✅ | 一键切换，`preferred_color_scheme` 自动适配 |
| 数学公式 | ✅ | MathJax 3 + `pymdownx.arithmatex` |
| 代码高亮 | ✅ | Pygments，带行号、复制按钮、标注注释 |
| 响应式设计 | ✅ | Material 主题自适应移动端 |
| 返回顶部按钮 | ✅ | 浮动显示 |
| ICP 备案 | ✅ | 粤ICP备2021145979号-1 |
| 导航即时加载 | ✅ | `navigation.instant` 已启用 |
| 导航自动隐藏 | ✅ | `header.autohide` 已启用 |

---

## 4. CI/CD 与部署架构

### 4.1 构建流程

```
Git Push → GitHub Actions
  ├── checkout (fetch-depth: 0)
  ├── setup Python 3.12
  ├── pip install mkdocs mkdocs-material
  ├── mkdocs build → site/
  └── deploy to GitHub Pages
```

### 4.2 双轨部署拓扑

```
GitHub (境外编辑)  ←→  Gitee (境内编辑)
       ↓                    ↓
  [自动镜像同步]       [自动镜像同步]
       ↓                    ↓
GitHub Pages          深圳阿里云服务器
                   (静态部署, ICP 备案合规)
```

---

## 5. MkDocs 配置要点

```yaml
site_name: 中国通用人工智能协会
theme: material (language: zh)
font: Noto Sans SC / Roboto Mono
features:
  - header.autohide          # 滚动时自动隐藏顶栏
  - navigation.tabs          # 顶部 Tab 导航
  - navigation.instant       # 即时页面加载
  - navigation.top           # 回到顶部按钮
  - search.highlight         # 搜索结果高亮
  - search.share             # 搜索可分享
  - content.code.copy        # 代码块复制
  - content.code.annotate    # 代码行标注
```

### 5.1 MkDocs 的呈现优势（对应当前网站）

| 特性 | 效果 |
|------|------|
| **Material Design 3** | 成熟的设计语言，专业感强 |
| **Noto Sans SC 字体** | 中英文混排优秀，阅读舒适 |
| **Admonition 系统** | 12 种提示框样式（note/warning/danger/quote 等），可折叠 |
| **内容标签页** | `pymdownx.blocks.tab` 实现内容分组 |
| **即时导航** | `navigation.instant` 实现类 SPA 的页面切换速度 |
| **搜索高亮+分享** | 搜索结果可分享 URL，支持高亮关键词 |
| **代码注解** | 行内标注、代码块标题、复制按钮 |

---

## 6. 原网站痛点（摘自 web_arch.md）

1. **更新难、维护难** — MkDocs 需要 Python 环境和命令行操作，门槛较高
2. **新手入门难** — 内容以理论为主，缺乏引导式、分级的入门路径
3. **NARS 学习路径缺失** — 想学 NARS 无从下手，资料散落各处
4. **协会形象展示不足** — 缺乏协会整体介绍、活动预告、成员动态
5. **缺少知识网络** — 内容间关系不直观，只能通过导航栏线性浏览

### 6.1 原建设者设想的改进方向

- 知识网络结构框架（明确提出 Quartz 4 作为候选）
- 更美观、简洁的前端界面
- 整合散落的 NARS 资源
- 降低新手门槛
- 降低 NARS 实现难度

---

## 7. 本地克隆

原始 MkDocs 项目已克隆到：`original-contents/agi-society-cn/`

包含完整的 Markdown 源文件、MkDocs 配置、主题覆写、GitHub Actions 工作流。
