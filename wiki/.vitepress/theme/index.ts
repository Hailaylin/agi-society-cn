import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { presetClient } from '@nolebase/integrations/vitepress/client'

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
  Layout: DefaultTheme.Layout,
  enhanceApp(ctx) {
    nolebase?.enhanceApp?.(ctx)
  },
} satisfies Theme
