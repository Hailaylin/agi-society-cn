# AGI Society Wiki 开发规范

> 本文件写给后续 Agent 和维护者。内容是 87 轮对话验证过的实践，不要绕过。

---

## 1. 内容目录结构

```
content/
├── index.md          首页（layout: home）
├── about/            协会简介（agi.md, team.md）
├── research/         学术研究
│   ├── nars/         NARS 理论（theory/, news.md）
│   └── thought_library/  思想书库
├── conference/       学术会议
│   ├── annual/       年会（2016.md-2025.md）
│   └── group/        组会（index.md, catalogue.md）
├── wiki/             维基百科
│   └── nars_impl/    NARS 实现（12 个 .md）
├── projects/         项目介绍
│   └── nars_derivatives/  衍生项目
└── contact/          联系我们
    ├── team.md
    ├── contributing/
    └── documents_and_qq_group.md
```

**规则**：
- 新增页面放对应板块目录，不要放在 `content/` 根目录
- 目录名保持英文，标题通过 frontmatter 设为中文
- 不要恢复旧 `agi/` `sai/` `other/` `nars/` 文件夹

---

## 2. Frontmatter 字段规范

### 字段顺序（身份→排序→配置→展示→互动）

```yaml
---
title:                 # 页面标题
sidebarTitle:          # 侧边栏显示名（覆盖 title），仅 index.md 和年会/组会文件需要

order:                 # 数字排序（content-order: order 时生效）
date:                  # 日期排序，格式 YYYY-MM-DD（content-order: date 时生效）

content-order:         # 子项排序：order | date | name（默认）。仅 index.md 设置
content-order-reversed: # true = 倒序

sidebarCollapsed:      # 侧边栏分组默认折叠：true/false（不设默认 false = 展开）
sidebarHide:           # true = 从侧边栏隐藏

comments:              # true = 显示 Giscus 评论区
---
```

### 排序规则
- 优先级：`order` > `date` > 字母序（`name`）
- 无对应字段的文件排最后，按字母序
- 普通内容页（aikr.md、3c.md 等）只需 `title`，不需要排序字段

---

## 3. 侧边栏系统

### 架构
- `sidebar.ts` — 三个公共导出，**不要手写侧边栏**
- `config.ts` 只有一行：`sidebar: generateSidebar()`

### 三个函数

| 函数 | 职责 | 副作用 |
|------|------|:--:|
| `generateSidebar()` | 初始化，返回缓存对象 | 首次调用时写缓存 |
| `hasSidebarChanged()` | 检测结构是否变化（指纹比对） | 无 |
| `commitSidebarUpdate()` | 更新缓存 + 记录指纹 | 写缓存 |

### 热更新流程
```
.md 文件变更
  → hasSidebarChanged()（指纹比对）
    → 结构相同：VitePress HMR 正常刷新内容
    → 结构不同：commitSidebarUpdate() → touch sidebar.ts → Vite 重载 config → full-reload
```

### 关键实现细节
- `sidebarCache` 是一个对象引用——VitePress 在 `resolveConfig` 时拿到这个引用
- `commitSidebarUpdate()` 用 `Object.assign` + `delete` 原地更新，保持同一个引用
- 轮询间隔 2 秒，在 `config.ts` 的 `sidebar-dev-watch` 插件中实现
- touch `sidebar.ts` 触发 Vite 模块热替换 → 重新求值 `generateSidebar()` → 返回已更新的 `sidebarCache`

---

## 4. CSS 分块约定

```
styles/
├── custom.css   ← 纯导入入口（禁止写样式）
├── vars.css     ← CSS 变量（颜色、callout、按钮）
├── homepage.css ← 首页（Hero、分区、卡片、团队、页脚）
├── callout.css  ← Obsidian Callout 完整样式
└── layout.css   ← 导航栏、排版、暗色模式
```

**规则**：新增样式到对应文件，不要写到 `custom.css`

---

## 5. 开发服务器

### 行为
- **编辑已有 .md 内容/frontmatter** → VitePress HMR 即时刷新（不触发 reload）
- **新增/重命名 .md 文件** → 2 秒内自动检测 + 全量 reload
- `npm run dev` 在 `wiki/` 目录下运行，端口默认 5173

### 不要做的事
- `server.restart()` — Vite 5 不存在此 API
- `require()` 在 ESM 模块内 — 用顶层 `import`
- `fs.watch` / `handleHotUpdate` / `transformPageData` 做侧边栏热更新 — 全部验证失败
- `Proxy` 包装 sidebar 对象 — VitePress 缓存 config，Proxy getter 永不触发

---

## 6. 禁止事项（已验证失败）

| 方案 | 失败原因 |
|------|---------|
| config.ts 里手写侧边栏 | 新增文件不自动反映 |
| `server.watcher.on('all')` 做 HMR | Windows 下 chokidar 事件不触发 |
| `handleHotUpdate` 返回 `[]` | VitePress 内置 md HMR 先拦截 |
| `fs.watch` + `ws.send` | ESM 环境 `require()` 报错 |
| `Proxy` + mtime 懒重算 | VitePress resolveConfig 后不再读 sidebar |
| `setInterval` 轮询直接 full-reload | 内容编辑也触发全量刷新 |

---

## 7. 测试规范

### 侧边栏测试（`sidebar.test.ts`）
- 框架：vitest + Playwright
- 覆盖：条目数量、排序、sidebarTitle、sidebarCollapsed
- 过滤条件必须精确（如 `/^20\d{2} · /` 而非 `/^20/`）
- 运行：`npx vitest run sidebar.test.ts`（需要 dev server 已启动）

### 构建验证
- 每次改动后运行 `npx vitepress build`
- `ignoreDeadLinks: true` 已配置，但仍需关注构建警告

---

## 8. 关键文件索引

| 文件 | 作用 |
|------|------|
| `.vitepress/config.ts` | VitePress 配置（nav、插件、轮询） |
| `.vitepress/sidebar.ts` | 侧边栏生成+检测+更新 |
| `.vitepress/head.ts` | HTML 元数据 |
| `.vitepress/theme/index.ts` | 主题入口（Nólëbase 插件 + 自定义组件） |
| `sidebar.test.ts` | 侧边栏自动化测试 |
