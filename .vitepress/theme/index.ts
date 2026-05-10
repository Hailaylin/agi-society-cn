import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import '../styles/main.css'
import '../styles/vars.css'

const ExtendedTheme: Theme = {
  extends: DefaultTheme,
}

export default ExtendedTheme
