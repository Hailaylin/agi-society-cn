import { defineConfig } from 'vitepress'
import path from 'node:path'
import { readFileSync, existsSync } from 'node:fs'
import { presetMarkdownIt } from '@nolebase/integrations/vitepress/markdown-it'
import { GitChangelog } from '@nolebase/vitepress-plugin-git-changelog/vite'
import { PageProperties } from '@nolebase/vitepress-plugin-page-properties/vite'
import obsidianCallouts from 'markdown-it-obsidian-callouts'
import { calculateSidebar } from '@nolebase/vitepress-plugin-sidebar'
import GrayMatter from 'gray-matter'

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
    publicDir: './public',
    server: {
      watch: {
        usePolling: true,
        interval: 1000,
      },
    },
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
    logo: '/logo.png',
    nav: [
      { text: '首页', link: '/' },
      { text: '协会简介', link: '/about/' },
      { text: '学术研究', link: '/research/' },
      { text: '学术会议', link: '/conference/' },
      { text: '维基百科', link: '/wiki/' },
      { text: '项目介绍', link: '/projects/' },
      { text: '联系我们', link: '/contact/' },
    ],

    sidebar: (() => {
      const { join } = path

      const items = calculateSidebar([
        'content/about',
        'content/research',
        'content/conference',
        'content/wiki',
        'content/projects',
        'content/contact',
      ])

      // Unwrap top-level 'content' wrapper
      let sections = Array.isArray(items) ? items : (items.items || [])
      if (sections.length === 1 && sections[0].index === 'content') {
        sections = sections[0].items || []
      }

      function fixLink(link) {
        return link ? link.replace('/content', '') : link
      }

      // Read content-order from a directory's index.md
      function getContentOrder(dirPath) {
        for (const name of ['index.md', '_page.md']) {
          const p = join(dirPath, name)
          if (existsSync(p)) {
            try {
              const { data } = GrayMatter(readFileSync(p, 'utf-8'))
              return data['content-order'] || 'name'
            } catch { return 'name' }
          }
        }
        return 'name'
      }

      // Extract sort key from a markdown file based on orderMode
      function getSortValue(filePath, orderMode) {
        if (!existsSync(filePath)) return null
        try {
          const { data } = GrayMatter(readFileSync(filePath, 'utf-8'))
          if (orderMode === 'order') return data?.order != null ? { v: Number(data.order), t: 'order' } : null
          if (orderMode === 'date' && data?.date) return { v: new Date(data.date).getTime(), t: 'date' }
          return null
        } catch { return null }
      }

      // Sort sidebar items based on parent directory's content-order
      function sortByContentOrder(arr, parentDir) {
        if (!arr || arr.length === 0) return (arr || [])
        const orderMode = getContentOrder(parentDir)

        // Process children first (depth-first)
        for (const item of arr) {
          if (item.items) {
            // Calculate child directory path
            const childDir = join(parentDir, item.index || '')
            sortByContentOrder(item.items, childDir)
          }
        }

        if (orderMode === 'name') {
          // Default: alphabetical (already sorted by calculateSidebar)
          return arr
        }

        // For order/date mode: build sort keys by reading markdown files
        const withKeys = arr.map(item => {
          const filePath = item.link
            ? join('content', fixLink(item.link).replace(/^\//, '') + '.md')
            : join(parentDir, item.index || '', 'index.md')
          const sortVal = getSortValue(filePath, orderMode)
          return { ...item, _sortVal: sortVal }
        })

        // Sort: items with the relevant field first (by value), then alphabetically
        const orderA = orderMode === 'date' ? -1 : 1  // date descending
        withKeys.sort((a, b) => {
          const aHas = a._sortVal != null, bHas = b._sortVal != null
          if (aHas && bHas) return orderA * (a._sortVal.v - b._sortVal.v)
          if (aHas && !bHas) return -1
          if (!aHas && bHas) return 1
          return (a.text || '').localeCompare(b.text || '', 'zh')
        })

        // Strip internal _sortVal
        return withKeys.map(({ _sortVal, ...rest }) => rest)
      }

      function fixItems(arr, parentDir) {
        const sorted = sortByContentOrder(arr, parentDir)
        return sorted.map(item => {
          const fixed = { ...item }
          if (fixed.link) fixed.link = fixLink(fixed.link)
          return fixed
        })
      }

      // Build path-keyed object
      const result = {}
      for (const section of sections) {
        const key = '/' + section.index + '/'
        const sorted = fixItems(section.items || [], join('content', section.index))
        result[key] = sorted
      }
      return result
    })(),

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
