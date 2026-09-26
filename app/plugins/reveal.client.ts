/**
 * 滚动揭示指令 v-reveal。
 *
 * 用法：v-reveal 或 v-reveal:80（80 是延迟毫秒数，同一组的卡片错开入场）。
 *
 * 两个必要的约束：
 * 1. 只在客户端注册，且初始透明态由 html.has-reveal 兜住开关，
 *    脚本没跑起来时内容照常显示，不会白屏；
 * 2. 开了"减少动态效果"就直接呈现最终状态，不做任何位移。
 */
const REVEAL_CLASS = 'has-reveal'

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return

  document.documentElement.classList.add(REVEAL_CLASS)

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      entry.target.setAttribute('data-revealed', '')
      // 只播一次，回滚滚动不再重播
      observer.unobserve(entry.target)
    }
  }, {
    // 元素露出一点点就开始动，别等完全进入视口
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.05,
  })

  nuxtApp.vueApp.directive('reveal', {
    mounted(el, binding) {
      if (reduceMotion.matches) {
        el.setAttribute('data-revealed', '')
        return
      }

      const delay = Number(binding.arg ?? 0)
      if (Number.isFinite(delay) && delay > 0) {
        el.style.setProperty('--reveal-delay', `${delay}ms`)
      }

      el.setAttribute('data-reveal', '')
      observer.observe(el)
    },
    unmounted(el) {
      observer.unobserve(el)
    },
  })
})
