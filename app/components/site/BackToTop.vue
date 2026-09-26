<script setup lang="ts">
const { t } = useI18n()

const visible = ref(false)
let onScroll: (() => void) | undefined

onMounted(() => {
  onScroll = () => {
    visible.value = window.scrollY > 600
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll)
})

function toTop() {
  // 平滑滚动属于动效，开启"减少动态效果"时直接跳
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
}
</script>

<template>
  <button
    v-show="visible"
    type="button"
    :aria-label="t('nav.backToTop')"
    :title="t('nav.backToTop')"
    class="fixed right-5 bottom-5 z-40 flex size-10 items-center justify-center rounded-full border border-default bg-default/90 text-muted shadow-lg backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary sm:right-8 sm:bottom-8"
    @click="toTop"
  >
    <UIcon name="i-lucide-arrow-up" class="size-5" />
  </button>
</template>
