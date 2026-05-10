import { defineConfig } from 'vitepress'
import path from 'node:path'
import { presetMarkdownIt } from '@nolebase/integrations/vitepress/markdown-it'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { PageProperties } from '@nolebase/vitepress-plugin-page-properties/vite'
import obsidianCallouts from 'markdown-it-obsidian-callouts'

const nolebaseMD = presetMarkdownIt({
  bidirectionalLinks: {
    options: { dir: path.join(process.cwd(), 'content') },
  },
  unlazyImages: false,
  inlineLinkPreview: false,
})

export default defineConfig({
  lang: 'zh-CN',
  title: '中国通用人工智能协会',
  description: '中国通用人工智能协会 — 学术知识库',
  srcDir: './content',
  outDir: './dist',
  ignoreDeadLinks: true,
  cleanUrls: true,

  // CRITICAL: optimizeDeps.exclude 避免 Vite dev 模式预打包含 virtual module 的 Nólëbase 包
  vite: {
    plugins: [
      GitChangelog({
        include: ['**/*.md', '!node_modules'],
        repoURL: 'https://github.com/Hailaylin/agi-society-cn',
        maxGitLogCount: 2000,
      }),
      PageProperties(),
    ],
    optimizeDeps: {
      exclude: [
        'vitepress',
        '@nolebase/integrations',
        '@nolebase/ui',
        '@nolebase/vitepress-plugin-git-changelog',
        '@nolebase/vitepress-plugin-page-properties',
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/vitepress-plugin-enhanced-mark',
        '@nolebase/vitepress-plugin-highlight-targeted-heading',
        '@nolebase/vitepress-plugin-inline-link-preview',
        '@nolebase/vitepress-plugin-index',
        '@nolebase/vitepress-plugin-thumbnail-hash',
      ],
    },
    ssr: {
      noExternal: ['@nolebase/**'],
    },
  },

  markdown: {
    math: true,
    async preConfig(md) {
      await nolebaseMD.install(md)
    },
    config(md) {
      md.use(obsidianCallouts)
    },
  },

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '协会简介', link: '/about/' },
      { text: '学术研究', link: '/research/' },
      { text: '学术会议', link: '/conference/' },
      { text: '维基百科', link: '/wiki/' },
      { text: '项目介绍', link: '/projects/' },
      { text: '联系我们', link: '/contact/' },
    ],

    sidebar: {
      '/about/': [
        {
          text: '协会简介',
          items: [
            { text: '关于协会', link: '/about/' },
            { text: 'AGI 概述', link: '/about/agi' },
            { text: '协会成员', link: '/about/team' },
          ],
        },
        {
          text: '贡献指南',
          collapsed: true,
          items: [
            { text: '格式规范', link: '/about/contributing/formats' },
            { text: '工具配置', link: '/about/contributing/tools' },
            { text: '内容搬运', link: '/about/contributing/carrying' },
          ],
        },
      ],
      '/research/': [
        {
          text: '学术研究',
          items: [
            { text: '研究总览', link: '/research/' },
          ],
        },
        {
          text: 'NARS 理论',
          items: [
            { text: 'NARS 概述', link: '/research/nars/' },
            { text: 'AIKR 不足预设', link: '/research/nars/theory/aikr' },
            { text: '3C 原则', link: '/research/nars/theory/3c' },
            { text: '学习资源', link: '/research/nars/theory/learning_resources' },
            { text: '最新动态', link: '/research/nars/news' },
          ],
        },
        {
          text: 'GTI · 一般智能理论',
          collapsed: true,
          items: [
            { text: 'GTI 目录', link: '/research/nars/theory/gti/' },
            { text: '前言', link: '/research/nars/theory/gti/preface' },
            { text: '第1章', link: '/research/nars/theory/gti/chapter1/' },
            { text: '第2章', link: '/research/nars/theory/gti/chapter2/' },
            { text: '第3章', link: '/research/nars/theory/gti/chapter3/' },
            { text: '第4章', link: '/research/nars/theory/gti/chapter4/' },
            { text: '第5章', link: '/research/nars/theory/gti/chapter5/' },
            { text: '第6章', link: '/research/nars/theory/gti/chapter6/' },
          ],
        },
        {
          text: 'NAC · 非公理控制',
          collapsed: true,
          items: [
            { text: 'NAC 目录', link: '/research/nars/theory/nac/' },
            { text: '概述', link: '/research/nars/theory/nac/nac_overview/' },
            { text: '原理', link: '/research/nars/theory/nac/nac_principles/' },
            { text: 'NAL 与 NAC', link: '/research/nars/theory/nac/nal_and_nac/' },
          ],
        },
      ],
      '/conference/': [
        {
          text: '历次年会',
          items: [
            { text: '年会总览', link: '/conference/' },
            { text: '2025 · 第十届', link: '/conference/2025' },
            { text: '2024 · 第九届', link: '/conference/2024' },
            { text: '2023 · 第八届', link: '/conference/2023' },
            { text: '2022 · 第七届', link: '/conference/2022' },
            { text: '2021 · 第六届', link: '/conference/2021' },
            { text: '2020 · 第五届', link: '/conference/2020' },
            { text: '2019 · 第四届', link: '/conference/2019' },
            { text: '2018 · 第三届', link: '/conference/2018' },
            { text: '2017 · 第二届', link: '/conference/2017' },
            { text: '2016 · 第一届', link: '/conference/2016' },
          ],
        },
        {
          text: '组会',
          items: [
            { text: '组会总览', link: '/conference/group_meeting_overview' },
            { text: '历次组会', link: '/conference/group_meeting_catalogue' },
          ],
        },
      ],
      '/wiki/': [
        {
          text: '维基百科',
          items: [
            { text: '维基总览', link: '/wiki/' },
          ],
        },
        {
          text: 'NARS 实现',
          items: [
            { text: '实现介绍', link: '/wiki/nars_impl/introduction' },
            { text: '实现总览', link: '/wiki/nars_impl/' },
            { text: 'OpenNARS', link: '/wiki/nars_impl/impls/opennars' },
            { text: 'PyNARS', link: '/wiki/nars_impl/impls/pynars' },
            { text: 'NARust', link: '/wiki/nars_impl/impls/narust' },
            { text: 'ONA', link: '/wiki/nars_impl/impls/ona' },
          ],
        },
        {
          text: '思想书库',
          collapsed: true,
          items: [
            { text: '总览', link: '/research/thought_library/' },
            { text: '意义片网思想', link: '/research/thought_library/meaning_network' },
            { text: '拟态操作', link: '/research/thought_library/mimicry_operation' },
            { text: 'Lazero', link: '/projects/lazero' },
            { text: '类脑智能意识系统', link: '/research/thought_library/bingfengdecao' },
            { text: '智能同一观', link: '/research/thought_library/identity_of_intelligence' },
          ],
        },
      ],
      '/projects/': [
        {
          text: '项目介绍',
          items: [
            { text: '项目总览', link: '/projects/' },
            { text: 'NARS 衍生项目', link: '/projects/nars_derivatives/introduction' },
            { text: 'NACE', link: '/projects/nars_derivatives/nace' },
            { text: 'Lazero', link: '/projects/lazero' },
          ],
        },
      ],
      '/contact/': [
        {
          text: '联系我们',
          items: [
            { text: '联系方式', link: '/contact/' },
            { text: '研究团队', link: '/contact/team' },
            { text: '资料与 QQ 群', link: '/contact/documents_and_qq_group' },
          ],
        },
        {
          text: '贡献指南',
          collapsed: true,
          items: [
            { text: '格式规范', link: '/about/contributing/formats' },
            { text: '工具配置', link: '/about/contributing/tools' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Hailaylin/agi-society-cn' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            displayDetails: '显示详情',
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              closeText: '关闭',
            },
          },
        },
      },
    },

    editLink: {
      pattern: 'https://github.com/Hailaylin/agi-society-cn/edit/main/wiki/content/:path',
      text: '在 GitHub 上编辑此页',
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    outline: {
      label: '页面大纲',
      level: [2, 3],
    },

    darkModeSwitchLabel: '切换主题',
  },
})
