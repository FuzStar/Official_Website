<script setup lang="ts">
defineProps<{
  /** 图标尺寸类，默认 56px 的方块 */
  class?: string
}>()
</script>

<template>
  <!--
    纯几何爪印，与 favicon、背景纹理同一套路径语言。
    刻意不用写实动物形象，避免"拟人兽 = 真实动物"的误读。
  -->
  <span
    class="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
    :class="$props.class"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      class="size-7"
    >
      <g>
        <ellipse cx="6.4" cy="8.6" rx="2.1" ry="2.8" transform="rotate(-18 6.4 8.6)" />
        <ellipse cx="11" cy="6.4" rx="2.05" ry="2.9" />
        <ellipse cx="15.9" cy="7.9" rx="2.05" ry="2.75" transform="rotate(14 15.9 7.9)" />
        <ellipse cx="19.6" cy="11.4" rx="1.85" ry="2.4" transform="rotate(32 19.6 11.4)" />
        <path d="M12 12.6c3.5 0 6.3 2.7 6.3 5.4 0 2-1.6 3.3-3.7 3.3-1 0-1.8-.3-2.6-.3s-1.6.3-2.6.3c-2.1 0-3.7-1.3-3.7-3.3 0-2.7 2.8-5.4 6.3-5.4z" />
      </g>
    </svg>
  </span>
</template>
