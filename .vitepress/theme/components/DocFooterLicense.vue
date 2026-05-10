<template>
  <div class="doc-footer-license">
    <p>
      本站内容采用
      <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
        CC BY-SA 4.0
      </a>
      许可。转载请注明出处。
    </p>
  </div>
</template>

<style scoped>
.doc-footer-license {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  text-align: center;
}

.doc-footer-license a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  transition: color 0.2s;
}

.doc-footer-license a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}
</style>
