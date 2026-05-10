import type { HeadConfig } from 'vitepress'

const head: HeadConfig[] = [
  // Favicon
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
  ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
  ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
  ['link', { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#1a6b7a' }],

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
