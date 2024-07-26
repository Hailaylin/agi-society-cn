---
comments: true
---
# 本网站编辑格式

## 模块化内容渲染

使用PyMdown及其Extension：

/// note | 如何使用 block

````
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

## 推荐编辑工具

1. vscode
2. obsidian
3. Typora
4. etc.

欢迎推荐更优秀的编辑工具

## 配置实时开发环境

以下配置在Windows11 + WSL2 Ubuntu 24.02上经过测试。

### 0. clone

移动到你要clone的目录后：

````bash
git clone https://github.com/Hailaylin/agi-society-cn.git
````

> 推荐clone的目录在WSL2的虚拟机内部路径，这样磁盘IO会很快。而跨文件系统（linux <->  Windows）的操作会很慢。

### 1. 安装 python 虚拟环境

如果报错，则需要先安装python3，然后再执行上面的命令。apt源推荐换成清华源。

````bash
sudo apt install python3-full
````

并且在主机创建虚拟环境

````bash
python3 -m venv agi-society-pyenv
````

进入虚拟环境

````bash
source agi-society-pyenv/bin/activate
````

然后你的终端会显示：

````bash
(agi-society-pyenv) starlin@StarCloud:/mnt/d/NARS/000-AGI-Society.cn$
````

则你已经入虚拟环境中。

### 2. 启动实时预览

安装 mkdocs-material。网络不畅则需要设置pip国内镜像源。

````bash
pip install mkdocs-material
````

启动服务

````bash
mkdocs serve
````

### 3. vscode 实时预览

效果如下：
![vscode wsl mkdocs效果图](image/edit/Snipaste_2024-07-26_18-03-28.png)