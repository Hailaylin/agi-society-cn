# AGI Society 官网调研报告

> 调研日期：2026-05-10
> 调研范围：原官方网站、源码仓库、基础设施

---

## 1. 源码仓库

### 1.1 主仓库

| 项目 | 详情 |
|------|------|
| **仓库** | [Hailaylin/agi-society-cn](https://github.com/Hailaylin/agi-society-cn) |
| **描述** | save and edit china agi society wiki web content |
| **技术栈** | MkDocs + Material 主题 + Python |
| **部署** | GitHub Pages (`hailaylin.github.io/agi-society-cn/`) + 深圳阿里云服务器 |
| **许可证** | 无明确 License 文件 |
| **原创性** | 独立原创仓库，非 Fork |

### 1.2 镜像仓库

| 项目 | 详情 |
|------|------|
| **Gitee** | [Hailay/agi-society-cn](https://gitee.com/Hailay/agi-society-cn) |
| **关系** | 与 GitHub 仓库互为镜像备份，修改一个自动同步到另一个 |

### 1.3 其他相关仓库

在 `hailaylin` 用户下搜索 "AGI Society"、"官方网站"、"site" 等关键词，**未发现其他与 AGI Society 官网直接相关的仓库**。`agi-society-cn` 是唯一官网源码仓库。

---

## 2. 网站内容覆盖

### 2.1 导航结构

```
├── NARS理论
│   ├── NARS理论概述
│   ├── AIKR / 不足预设
│   ├── 3C原则
│   └── 参考书籍（GTI、NAC）
├── NARS工程
│   ├── NARS各版实现（12个版本：OpenNARS、NARust、PyNARS、ONA等）
│   └── NARS衍生项目
├── AGI 通用人工智能
│   ├── 通用人工智能定义与历史
│   └── NARS简介
├── SAI 专用人工智能
│   ├── 专用人工智能
│   └── LLMs
├── 思想书库
│   ├── 意义片网思想
│   ├── 拟态操作
│   ├── Lazero
│   ├── 类脑智能意识系统
│   ├── 智能同一观
│   └── 资料和Q群
├── 历次会议
│   ├── 年会（2016-2024共9届）
│   └── 组会视频目录
└── 关于我们
    ├── 研究团队（王培、刘凯、徐英瑾、那迪、魏屹东、李祥）
    ├── 网站架构
    └── 贡献指南
```

### 2.2 内容特点

- 以 **NARS（非公理推理系统）** 为核心的理论与实践资料
- 2016-2024 年中国通用人工智能年会完整记录
- 团队介绍涵盖 6 位核心研究成员（哲学、计算机科学、教育科学跨学科）
- 理论深度：从王培的 GTI（一般智能理论）到 NAC（非公理控制）均有涉及
- NARust 有在线 WebAssembly Demo

### 2.3 在线 Demo

- NARust-158：WebAssembly 在线演示（`docs/nars/demo/narust-158/`）

---

## 3. 网站功能完整度

| 功能 | 状态 | 说明 |
|------|:----:|------|
| 首页 | ✅ | MkDocs Material 主题首页，含快捷链接、最新活动 |
| 导航 | ✅ | 7 个一级栏目，多级下拉菜单 |
| 搜索 | ✅ | MkDocs 内置全文搜索 |
| 评论系统 | ✅ | Giscus 集成（GitHub Discussions 驱动），支持亮/暗主题自动切换 |
| 亮/暗主题 | ✅ | 一键切换，Material 主题原生支持 |
| 数学公式 | ✅ | MathJax 3 渲染 |
| 代码高亮 | ✅ | Pygments，带复制按钮 |
| 响应式设计 | ✅ | Material 主题自适应 |
| 回到顶部 | ✅ | 浮动按钮 |
| ICP 备案 | ✅ | 粤ICP备2021145979号-1 |

---

## 4. CI/CD 部署

### 4.1 GitHub Pages Workflow

```yaml
触发条件: push to main / workflow_dispatch
环境: ubuntu-latest, Python 3.12
步骤: Checkout → Setup Python → Install (mkdocs + mkdocs-material) → Build → Deploy to Pages
```

### 4.2 双轨部署

```
GitHub (境外编辑) ←→ Gitee (境内编辑)  ← 自动镜像同步
                 ↓
         深圳阿里云服务器 (静态部署，满足合规)
```

---

## 5. 技术栈详情

| 层次 | 技术 |
|------|------|
| 内容 | Markdown（含 Frontmatter YAML） |
| 构建 | MkDocs + `mkdocs-material` |
| 评论 | Giscus（GitHub Discussions API） |
| 数学 | MathJax 3 + `pymdownx.arithmatex` |
| 搜索 | MkDocs 内置 search 插件 |
| 部署 | GitHub Pages + 阿里云 |
| 语言 | Python |

---

## 6. 痛点与改进方向（源自 web_arch.md）

原网站建设者在 `docs/about/web_arch.md` 中自述的痛点：

1. 协会网站更新难、维护难
2. 新手入门难、理论理解难
3. 想学 NARS 无从下手
4. 不知道这群人在干什么

提出的改进方向：

1. 美观、简洁的前端界面
2. 将散落在各处的 NARS 相关资源整合
3. 降低新手了解 NARS 的门槛
4. 降低编程人员实现 NARS 的难度
5. 考虑使用具有知识网络结构的框架（如 Quartz 4）

---

## 7. 本地克隆

原始仓库已克隆到 `original-contents/agi-society-cn/`，包含完整的 MkDocs 源码和所有 Markdown 文档。
