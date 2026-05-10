import { join } from 'node:path'
import { presetVite } from '@nolebase/integrations/vitepress/vite'
import UnoCSS from 'unocss/vite'

import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'

import { creators, githubRepoLink } from './metadata'

export default defineConfig(async () => {
  const nolebase = presetVite({
    gitChangelog: {
      options: {
        gitChangelog: {
          repoURL: () => githubRepoLink,
          mapAuthors: creators,
        },
        markdownSection: {
          excludes: [
            join('toc.md'),
            join('index.md'),
          ],
        },
      },
    },
    pageProperties: {
      options: {
        markdownSection: {
          excludes: [
            join('toc.md'),
            join('index.md'),
          ],
        },
      },
    },
  })

  return {
    assetsInclude: [
      '**/*.mov',
    ],
    optimizeDeps: {
      exclude: [
        'vitepress',
      ],
    },
    plugins: [
      Inspect(),
      Components({
        include: [/\.vue$/, /\.md$/],
        dirs: '.vitepress/theme/components',
        dts: '.vitepress/components.d.ts',
      }),
      UnoCSS({
        root: process.cwd(),
      }),
      nolebase,
      ...nolebase.plugins(),
    ],
  }
})
