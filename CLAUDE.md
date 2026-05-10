# AGI Society Wiki 开发规范

> 这些规范从多次调试、重构、内容补全的实践中提炼而来。面向后续 Agent 和人类协作者。

## 链接与渲染

### 遇到前端渲染异常，沿渲染管线逐层追溯

Markdown → markdown-it 转译 → Vue 模板编译 → SSR → 客户端 hydration。每一层都可能出问题，不能只改配置绕过。

- 查看构建产物的 SSR HTML 确认组件是否正确渲染
- 查看编译后的 JS（`.lean.js`）确认 `resolveComponent` 调用
- 第三方包有 bug 时在 VitePress 配置层禁用，不直接改 `node_modules`

### 任何脚本输出的 Markdown 内容必须构建验证

`vitepress build` 后检查：
- 表格是否渲染为 `<table>` / `<th>` / `<td>`（不是 `<p>` 内嵌 `|`）
- 链接 `<a>` 是否正常（不是 `<vpnolebaseinlinelinkpreview>` 残留）

### 构建失败时优先清缓存

```bash
rm -rf dist .vitepress/cache node_modules/.vite
npx vitepress build
```

诡异的 Rollup 崩溃、CSS 解析错误、ESBuild 异常，大概率是陈旧缓存所致。

## 内容补全

### 历史数据恢复的三层策略

1. **Git 历史** — `git show <commit> -- <file>` 提取原始内容
2. **平台 API** — B站 `pagelist` 接口获取分P 时间戳等结构化数据
3. **浏览器搜索** — web-access / CDP 浏览器搜索缺失条目

每层做完了确认无遗漏，再进下一层。不要跳层。

### 中文语义分割（人名拆分），脚本做初稿，人工逐条校验

脚本分不出的边缘 case：顿号 `、` 分隔的多人名、英文名（Chip Morrison）、课题组名（刘凯课题组）、"群体讨论"等非人名的报告人。脚本跑完后必须人工复查。

## 页面结构

### 新增页面类别前，先看现有目录结构有无可复用的模式

`annual/` 和 `group/` 就是例子——完全对标：各自有 `index.md` 总览 + 独立年份/学年文件。一致性优先于创新。

### 一个概念一个入口，消除冗余

`catalogue.md` 和 `index.md` 功能重叠时，合并为一个入口。不要让协作者困惑「这两个页面有什么区别」。

## 协作基础设施

### 降低非技术协作者的上手门槛

每项配置/工具/策略需考虑「不懂前端的人能用吗？」。如果不行，至少要有文档指引。

- `.obsidian/` 全部 Git 忽略，各协作者自行配置
- `CONTRIBUTING.md` 在项目根目录，提供多种贡献路径
- 关键 Obsidian 语法（wikilink、callout、`==高亮==`）确保网站渲染支持

### 内容可通过 Obsidian 直接编辑

`wiki/content/` 目录即为 Obsidian vault。协作者不需要安装 Node.js 或运行 `npm run dev`，直接编辑 `.md` 文件提交即可。

## 协作流程

### 重大决策前用结构化提问对齐认知

涉及文件结构重组、Git 策略、命名规范时，启动 `/super-questioning /popup-ask` 提供结构化选项。不能让 Agent 在这些问题上一言堂。

### 专注询问，不做盲目修改

`/super-questioning` 激活后暂停写入性操作（写文件、改代码、提交），专注于通过提问明确意图。在意图未清晰前不做修改。

## 技术栈要点

- **Markdown 引擎**：markdown-it + `markdown-it-mark`（`==高亮==`）+ `markdown-it-obsidian-callouts`（`> [!info]`）+ `@nolebase/markdown-it-bi-directional-links`（`[[wikilink]]`）
- **双向链接**：`bidirectionalLinks.dir` 指向 `content/` 目录，`[[nars/index|NARS]]` 格式
- **inlineLinkPreview**：当前已禁用（`presetMarkdownIt` + `presetClient` 双设为 `false`），v2.18.2 SSR 不兼容
- **构建工具**：VitePress v1.6.4 + Nólëbase v2.18.2
