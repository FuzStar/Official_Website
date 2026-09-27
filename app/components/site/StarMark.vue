<script setup lang="ts">
// logo 里那颗四角星，拿来当页面上的装饰件。描边固定用深棕，跟手绘 logo 保持一致。
// 放大成整块背景装饰时描边会等比变粗，用 strokeWidth 单独压细，别让它抢了内容。
withDefaults(defineProps<{ strokeWidth?: number }>(), { strokeWidth: 1.4 })
</script>

<template>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 1.6c.7 4.3 2.9 6.5 7.2 7.2-4.3.7-6.5 2.9-7.2 7.2-.7-4.3-2.9-6.5-7.2-7.2 4.3-.7 6.5-2.9 7.2-7.2Z"
      fill="currentColor"
      stroke="var(--color-ink-900)"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />
  </svg>
</template>
