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
      { text: '会议', link: '/conference/' },
      { text: 'NARS书库', link: '/nars/' },
      { text: '百科', link: '/other/' },
      { text: '关于', link: '/about/' },
    ],

    sidebar: {
      '/about/': [
        {
          text: '关于我们',
          items: [
            { text: '关于协会', link: '/about/' },
            { text: '研究团队', link: '/about/team' },
            { text: '网站架构', link: '/about/web_arch' },
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
      '/agi/': [
        {
          text: 'AGI 通用人工智能',
          items: [
            { text: '概述', link: '/agi/' },
            { text: 'NARS 简介', link: '/nars/' },
          ],
        },
      ],
      '/nars/': [
        {
          text: 'NARS 理论',
          items: [
            { text: 'NARS 概述', link: '/nars/' },
            { text: 'AIKR 不足预设', link: '/nars/theory/aikr' },
            { text: '3C 原则', link: '/nars/theory/3c' },
            { text: '学习资源', link: '/nars/theory/learning_resources' },
            { text: '最新动态', link: '/nars/news' },
          ],
        },
        {
          text: 'NARS 工程',
          items: [
            { text: '实现总览', link: '/nars/impl/' },
            { text: '实现介绍', link: '/nars/impl/introduction' },
            { text: 'OpenNARS', link: '/nars/impl/impls/opennars' },
            { text: 'PyNARS', link: '/nars/impl/impls/pynars' },
            { text: 'NARust', link: '/nars/impl/impls/narust' },
            { text: 'ONA', link: '/nars/impl/impls/ona' },
          ],
        },
        {
          text: 'NARS 衍生项目',
          items: [
            { text: '衍生项目介绍', link: '/nars/derivative_project/introduction' },
            { text: 'NACE', link: '/nars/derivative_project/nace' },
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
      '/other/': [
        {
          text: '思想书库',
          items: [
            { text: '总览', link: '/other/' },
            { text: '意义片网思想', link: '/other/meaning_network' },
            { text: '拟态操作', link: '/other/mimicry_operation' },
            { text: 'Lazero', link: '/other/lazero' },
            { text: '类脑智能意识系统', link: '/other/bingfengdecao' },
            { text: '智能同一观', link: '/other/identity_of_intelligence' },
            { text: '资料和Q群', link: '/other/documents_and_qq_group' },
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
