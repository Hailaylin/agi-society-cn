import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import { presetClient } from '@nolebase/integrations/vitepress/client'
import GiscusComments from './components/GiscusComments.vue'
import DocFooterLicense from './components/DocFooterLicense.vue'

import './styles/custom.css'

const nolebase = presetClient({
  enhancedReadabilities: true,
  highlightTargetedHeading: true,
  inlineLinkPreview: true,
  enhancedMark: true,
  pageProperties: true,
  gitChangelog: false,
  thumbnailHash: false,
  index: false,
})

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(GiscusComments),
      'doc-footer-before': () => h(DocFooterLicense),
    })
  },
  enhanceApp(ctx) {
    nolebase?.enhanceApp?.(ctx)
  },
} satisfies Theme
