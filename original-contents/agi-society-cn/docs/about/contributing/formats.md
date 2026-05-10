---
comments: true
---

# 编辑格式

[🔗Markdown标准（英文）](https://commonmark.org/)

[🔗PyMDown官网文档](https://facelessuser.github.io/pymdown-extensions)

- ℹ️特别建议查看其中与标准Markdown不同的[块(block)语法](https://facelessuser.github.io/pymdown-extensions/extensions/blocks/)

## 文件规范

//// warning | 文件名规范

***所有Markdown文件，不论是否专名（如"NARS"），文件名一律使用snake_case蛇形命名规范***

- ⚠️实际网站运行中**区分大小写**，所以请务必确保文件名符合规范

在Git提交上，若需更改，编辑时请在 `.git/config` 中将 `core.ignorecase` 设置为 **`false`**

代码：

```bash
git config --global core.ignorecase false
```

/// example | 专名亦要全小写

❌ `NARS.md`

✅ `nars.md`

///

/// example | 首字母亦要小写

❌ `Lazero.md`

✅ `lazero.md`

///

/// example | 下划线`_`而非短斜杠`-`

❌ `web-arch.md`

✅ `web_arch.md`

///

/// example | 下划线分隔而非驼峰分隔

❌ `WebArch.md` `webArch.md`

✅ `web_arch.md`

///

////

（2024-07-27 其它有待扩充）

## 模块化内容渲染

使用PyMdown及其Extension：

/// note | 如何使用 block

````markdown
/// note | name

some context

///
````

note 字段可以是以下types里面的任意一种

````yaml
  - pymdownx.blocks.admonition:
      types:
      - new
      - settings
      - note
      - abstract
      - info
      - tip
      - success
      - question
      - warning
      - failure
      - danger
      - bug
      - example
      - quote
````

如：

````markdown
/// example | 例如

就像这样

///
````

此将生成：

/// example | 例如

就像这样

///

///

/// details | 或者是这样的可折叠块

hi hi hi ，我被二向箔折叠啦

/// details | 折叠块还能改变类型
    type: warning

我竟然被二向箔打了两遍

///

/// details | 折叠块还能强制不折叠
    open: true
    type: example

这不是套娃吗？

///

///
