import type { HeadConfig } from 'vitepress'

const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['meta', { name: 'author', content: 'AGI Society CN' }],
  ['meta', { name: 'keywords', content: 'AGI,通用人工智能,NARS,非公理推理,人工智能,认知科学' }],

  // Open Graph
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:title', content: 'AGI Society Wiki — 中国通用人工智能协会' }],
  ['meta', { property: 'og:description', content: '基于 NARS 理论与开源实现的知识库' }],
  ['meta', { property: 'og:site_name', content: 'AGI Society Wiki' }],

  // ICP 备案
  ['meta', { name: 'icp', content: '粤ICP备2021145979号-1' }],
]

export default head
