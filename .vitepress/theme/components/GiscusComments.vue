<template>
  <div class="giscus-wrapper" v-if="showComments" />
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { onMounted, ref, watch } from 'vue'

const { isDark, frontmatter } = useData()
const showComments = ref(false)

onMounted(() => {
  // Only show comments if frontmatter has comments: true
  if (frontmatter.value.comments !== false) {
    showComments.value = true
    loadGiscus()
  }
})

watch(isDark, () => {
  const giscus = document.querySelector('giscus-widget')
  if (giscus) {
    giscus.setAttribute('theme', isDark.value ? 'dark' : 'light')
  }
})

function loadGiscus() {
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.setAttribute('data-repo', 'exomind-team/agi-society-cn')
  script.setAttribute('data-repo-id', 'R_kgDON-J5KA')
  script.setAttribute('data-category', 'Comments')
  script.setAttribute('data-category-id', 'DIC_kwDON-J5KM4Cm2Vu')
  script.setAttribute('data-mapping', 'pathname')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'bottom')
  script.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
  script.setAttribute('data-lang', 'zh-CN')
  script.setAttribute('crossorigin', 'anonymous')
  script.async = true

  const wrapper = document.querySelector('.giscus-wrapper')
  if (wrapper) wrapper.appendChild(script)
}
</script>

<style scoped>
.giscus-wrapper {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
</style>
