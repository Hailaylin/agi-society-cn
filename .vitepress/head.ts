import type { HeadConfig } from 'vitepress'

const head: HeadConfig[] = [
  // Favicon
  ['link', { rel: 'icon', type: 'image/png', href: '/logo.png' }],
  ['link', { rel: 'apple-touch-icon', href: '/logo.png' }],

  ['meta', { name: 'author', content: 'AGI Society CN' }],
  ['meta', { name: 'keywords', content: 'AGI,通用人工智能,NARS,非公理推理,人工智能,认知科学' }],

  // Open Graph
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:title', content: '中国通用人工智能协会 — AGI Society of China' }],
  ['meta', { property: 'og:description', content: '基于 NARS 理论与开源实现的知识库' }],
  ['meta', { property: 'og:site_name', content: '中国通用人工智能协会' }],

  // ICP 备案
  ['meta', { name: 'icp', content: '粤ICP备2021145979号-1' }],
]

export default head
