/**
 * AGI Society Wiki — 自动侧边栏生成
 *
 * 基于 @nolebase/vitepress-plugin-sidebar 的 calculateSidebar，
 * 包装了 content-order（order/date/name）、content-order-reversed、
 * 以及 link 路径修正等功能。
 *
 * 排序规则（优先级）：order > date > 字母序（name）
 * - 父 index.md 设 content-order 决定使用哪个字段
 * - 同级子文件按对应字段排序
 * - 无对应字段的文件排在最后，按字母序
 */

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import GrayMatter from 'gray-matter'
import { calculateSidebar as calc } from '@nolebase/vitepress-plugin-sidebar'

const CONTENT_SECTIONS = [
  'content/about',
  'content/research',
  'content/conference',
  'content/wiki',
  'content/projects',
  'content/contact',
]

/**
 * Generate the sidebar configuration for VitePress.
 * Returns a path-keyed object: { '/about/': [...], '/research/': [...], ... }
 */
export function generateSidebar() {
  const items = calc(CONTENT_SECTIONS)

  // Unwrap top-level 'content' wrapper
  let sections: any[] = Array.isArray(items) ? items : (items as any).items || []
  if (sections.length === 1 && sections[0].index === 'content') {
    sections = sections[0].items || []
  }

  // Sort top-level sections using content/ root's content-order
  const sortedSections = sortByContentOrder(sections, 'content')

  // Build path-keyed object
  const result: Record<string, any[]> = {}
  for (const section of sortedSections) {
    const key = '/' + section.index + '/'
    result[key] = fixItems(section.items || [], join('content', section.index))
  }
  return result
}

// ---- internal helpers ----

function fixLink(link: string): string {
  return link ? link.replace('/content', '') : link
}

function fixItems(arr: any[], parentDir: string): any[] {
  const sorted = sortByContentOrder(arr, parentDir)
  return sorted.map(item => {
    const fixed = { ...item }
    if (fixed.link) fixed.link = fixLink(fixed.link)
    if (fixed.items) fixed.items = fixItems(fixed.items, join(parentDir, item.index || ''))
    // Default to expanded
    if (fixed.collapsed !== true) fixed.collapsed = false
    return fixed
  })
}

function getContentOrder(dirPath: string): string {
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

function getContentOrderReversed(dirPath: string): boolean {
  for (const name of ['index.md', '_page.md']) {
    const p = join(dirPath, name)
    if (existsSync(p)) {
      try {
        const { data } = GrayMatter(readFileSync(p, 'utf-8'))
        return data['content-order-reversed'] === true
      } catch { return false }
    }
  }
  return false
}

function getSortValue(
  filePath: string,
  orderMode: string
): { v: number; t: string } | null {
  if (!existsSync(filePath)) return null
  try {
    const { data } = GrayMatter(readFileSync(filePath, 'utf-8'))
    if (orderMode === 'order') return data?.order != null ? { v: Number(data.order), t: 'order' } : null
    if (orderMode === 'date' && data?.date) return { v: new Date(data.date).getTime(), t: 'date' }
    return null
  } catch { return null }
}

function sortByContentOrder(arr: any[], parentDir: string): any[] {
  if (!arr || arr.length === 0) return arr || []
  const orderMode = getContentOrder(parentDir)
  const reversed = getContentOrderReversed(parentDir)

  // Process children first (depth-first)
  for (const item of arr) {
    if (item.items) {
      const childDir = join(parentDir, item.index || '')
      item.items = sortByContentOrder(item.items, childDir)
    }
  }

  if (orderMode === 'name' && !reversed) return arr

  // Build sort keys by reading markdown files
  const withKeys = arr.map(item => {
    const filePath = item.link
      ? join('content', fixLink(item.link).replace(/^\//, '') + '.md')
      : join(parentDir, item.index || '', 'index.md')
    const sortVal = getSortValue(filePath, orderMode)
    return { ...item, _sortVal: sortVal }
  })

  const direction = reversed ? -1 : 1

  withKeys.sort((a, b) => {
    const aHas = a._sortVal != null
    const bHas = b._sortVal != null
    if (aHas && bHas) return direction * (a._sortVal.v - b._sortVal.v)
    if (aHas && !bHas) return -1
    if (!aHas && bHas) return 1
    return (a.text || '').localeCompare(b.text || '', 'zh')
  })

  return withKeys.map(({ _sortVal, ...rest }) => rest)
}
