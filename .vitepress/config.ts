import { presetMarkdownIt } from '@nolebase/integrations/vitepress/markdown-it'
import { transformHeadMeta } from '@nolebase/vitepress-plugin-meta'
import MarkdownItFootnote from 'markdown-it-footnote'
import MarkdownItMathjax3 from 'markdown-it-mathjax3'
import { defineConfig } from 'vitepress'

import { discordLink, githubRepoLink, siteDescription, siteName } from '../metadata'
import head from './head'

const nolebase = presetMarkdownIt()

export default defineConfig({
  vue: {
    template: {
      transformAssetUrls: {
        video: ['src', 'poster'],
        source: ['src'],
        img: ['src'],
        image: ['xlink:href', 'href'],
        use: ['xlink:href', 'href'],
        NolebaseUnlazyImg: ['src'],
      },
    },
  },
  title: siteName,
  description: siteDescription,
  ignoreDeadLinks: true,
  head,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档',
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                },
              },
            },
          },
        },

        _render(src, env, md) {
          let html = md.render(src, env)
          let tagsPart = ''
          let headingPart = ''
          let contentPart = ''
          let fullContent = ''
          const sortContent = () => [headingPart, tagsPart, contentPart] as const
          let { frontmatter, content } = env

          if (!frontmatter)
            return html

          if (frontmatter.search === false)
            return ''

          contentPart = content ||= src

          const headingMatch = content.match(/^# .*/m)
          const hasHeading = !!(headingMatch && headingMatch[0] && headingMatch.index !== undefined)

          if (hasHeading) {
            const headingEnd = headingMatch.index! + headingMatch[0].length
            headingPart = content.slice(0, headingEnd)
            contentPart = content.slice(headingEnd)
          }
          else if (frontmatter.title) {
            headingPart = `# ${frontmatter.title}`
          }

          const tags = frontmatter.tags
          if (tags && Array.isArray(tags) && tags.length)
            tagsPart = `Tags: #${tags.join(', #')}`

          fullContent = sortContent().filter(Boolean).join('\n\n')

          html = md.render(fullContent, env)

          return html
        },
      },
    },
    nav: [
      { text: '主页', link: '/zh-CN/' },
      { text: '百科', link: '/zh-CN/百科/' },
      { text: 'NARS', link: '/zh-CN/NARS/理论/' },
      { text: '会议', link: '/zh-CN/会议/' },
      { text: '研究', link: '/zh-CN/研究/' },
      { text: '关于', link: '/zh-CN/关于/' },
    ],
    sidebar: {
      '/zh-CN/百科/': [
        { text: '百科', link: '/zh-CN/百科/' },
      ],
      '/zh-CN/NARS/理论/': [
        { text: '理论', link: '/zh-CN/NARS/理论/' },
        { text: '3C', link: '/zh-CN/NARS/理论/3c' },
        { text: 'AIKR', link: '/zh-CN/NARS/理论/aikr' },
        { text: '学习资源', link: '/zh-CN/NARS/理论/学习资源' },
      ],
      '/zh-CN/NARS/工程/': [
        { text: '工程', link: '/zh-CN/NARS/工程/' },
        { text: 'OpenNARS', link: '/zh-CN/NARS/工程/实现/opennars' },
        { text: 'PyNARS', link: '/zh-CN/NARS/工程/实现/pynars' },
        { text: 'ONA', link: '/zh-CN/NARS/工程/实现/ona' },
        { text: 'Narjure', link: '/zh-CN/NARS/工程/实现/narjure' },
        { text: 'NARS-Python', link: '/zh-CN/NARS/工程/实现/nars_python' },
        { text: 'OpenJunars', link: '/zh-CN/NARS/工程/实现/openjunars' },
        { text: 'NARust', link: '/zh-CN/NARS/工程/实现/narust' },
        { text: 'Narst', link: '/zh-CN/NARS/工程/实现/narst' },
        { text: '20NAR1', link: '/zh-CN/NARS/工程/实现/20nar1' },
        { text: 'NARS-Swift', link: '/zh-CN/NARS/工程/实现/nars_swift' },
        { text: 'NARS CXin Py to TS', link: '/zh-CN/NARS/工程/实现/nars_cxin_py_to_ts' },
      ],
      '/zh-CN/NARS/衍生项目/': [
        { text: '衍生项目', link: '/zh-CN/NARS/衍生项目/' },
      ],
      '/zh-CN/会议/': [
        { text: '会议', link: '/zh-CN/会议/' },
        { text: '2023', link: '/zh-CN/会议/2023' },
        { text: '2024', link: '/zh-CN/会议/2024' },
        { text: '组会目录', link: '/zh-CN/会议/组会目录' },
      ],
      '/zh-CN/研究/': [
        { text: '研究', link: '/zh-CN/研究/' },
      ],
      '/zh-CN/关于/': [
        { text: '关于我们', link: '/zh-CN/关于/' },
        { text: '团队', link: '/zh-CN/关于/团队' },
        { text: '网站架构', link: '/zh-CN/关于/网站架构' },
        { text: '贡献指南', link: '/zh-CN/关于/贡献指南/formats' },
      ],
    },
    socialLinks: [
      { icon: 'github', link: githubRepoLink },
    ],
    darkModeSwitchLabel: '切换主题',
    outline: { label: '页面大纲', level: 'deep' },
    editLink: {
      pattern: `${githubRepoLink}/tree/vitepress/zh-CN/:path`,
      text: '编辑本页面',
    },
    footer: {
      message: '用 <span style="color: #e25555;">&#9829;</span> 维护',
      copyright: '<a href="https://github.com/HailayLin/agi-society-cn">中国通用人工智能协会</a> · AGI Society CN',
    },
  },
  cleanUrls: true,
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'one-dark-pro',
    },
    math: true,
    preConfig: async (md) => {
      await nolebase.install(md)
    },
    config: (md) => {
      md.use(MarkdownItFootnote)
      md.use(MarkdownItMathjax3)
    },
  },
  async transformHead(context) {
    let head = [...context.head]

    const returnedHead = await transformHeadMeta()(head, context)
    if (typeof returnedHead !== 'undefined')
      head = returnedHead

    return head
  },
})
