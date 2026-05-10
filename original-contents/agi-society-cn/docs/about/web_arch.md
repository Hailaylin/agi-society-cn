---
comments: true
---

# 网站架构

## 1. 需求分析

### 1.1. 目前痛点

1. 协会网站更新难、维护难
2. 新手入门难、理论理解难
3. 想学NARS无从下手
4. 不知道我们这群人在干什么

针对以上问题，我提出了对下一代网站的需求

### 1.2. 对网站的需求

1. 美观、简介的前端界面
2. 将散落在各处的NARS相关资源整合起来
3. 降低新手了解NARS的门槛
4. 降低编程人员进行NARS实现的难度

## 2. 编程实现

1. 中国境内站点Gitee：[agi-society-cn: 中国通用人工智能协会网站 (gitee.com)](https://gitee.com/Hailay/agi-society-cn)
2. 境外编辑GitHub：[Hailaylin/agi-society-cn: save and edit china agi society wiki web content (github.com)](https://github.com/Hailaylin/agi-society-cn)

两个站点互为镜像备份，修改一个会自动同步到另一个。

网站静态内容部署在中国深圳阿里云服务器中，以满足合规要求。

同时本地使用python脚本系统构建静态网页内容。

## 3. 改进

/// note | 想法1

可选用具有知识网络结构[Quartz 4](https://quartz.jzhao.xyz/)，适合将Obsidian的双向链接知识库发布在网上。

///
