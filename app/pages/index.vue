<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()

usePageSeo(t('seo.home.title'), t('seo.home.description'))

// 图标名留在代码里（保证 Tailwind 和图标包能扫到），文案放语言包，两边靠 icon 字段对齐
const directionIcons: Record<string, string> = {
  video: 'i-lucide-video',
  community: 'i-lucide-messages-square',
  ideas: 'i-lucide-lightbulb',
}

const directions = computed(() => {
  const items = tm('home.directions.items') as { icon: string, title: string, text: string }[]
  return items.map(item => ({
    ...item,
    icon: directionIcons[item.icon] ?? 'i-lucide-star',
  }))
})

/*
 * 首屏大爪印的视差：滚动时它比页面慢一截，滑动过程里能感觉到层次。
 * 位移量刻意压得很小（原滚动距离的 18%），免得变成明显的"飘"。
 */
const pawOffset = ref(0)
let onScroll: (() => void) | undefined
let ticking = false

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  onScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      pawOffset.value = Math.min(window.scrollY, 900) * 0.18
      ticking = false
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <div>
    <!-- 首屏 -->
    <section class="relative overflow-hidden">
      <SiteHeroBackdrop />

      <!--
        右侧的大爪印：纯几何、放低透明度、只在宽屏出现。
        不画角色——一是避免踩到 OC 版权和设定争议，二是几何形状
        比任何角色图都更耐看，也不会过时。
      -->
      <div
        class="pointer-events-none absolute -top-10 right-[-6%] hidden will-change-transform text-primary opacity-[0.07] lg:block xl:right-[-2%]"
        :style="{ transform: `translateY(${pawOffset}px)` }"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-[26rem] 2xl:size-[34rem]"
        >
          <g>
            <ellipse cx="6.4" cy="8.6" rx="2.1" ry="2.8" transform="rotate(-18 6.4 8.6)" />
            <ellipse cx="11" cy="6.4" rx="2.05" ry="2.9" />
            <ellipse cx="15.9" cy="7.9" rx="2.05" ry="2.75" transform="rotate(14 15.9 7.9)" />
            <ellipse cx="19.6" cy="11.4" rx="1.85" ry="2.4" transform="rotate(32 19.6 11.4)" />
            <path d="M12 12.6c3.5 0 6.3 2.7 6.3 5.4 0 2-1.6 3.3-3.7 3.3-1 0-1.8-.3-2.6-.3s-1.6.3-2.6.3c-2.1 0-3.7-1.3-3.7-3.3 0-2.7 2.8-5.4 6.3-5.4z" />
          </g>
        </svg>
      </div>

      <UContainer class="relative py-16 sm:py-24">
        <div class="max-w-3xl">
          <UBadge
            color="primary"
            variant="subtle"
            data-enter
          >
            {{ t('home.hero.badge') }}
          </UBadge>
          <h1
            data-enter
            class="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl"
            :style="{ '--enter-delay': '70ms' }"
          >
            {{ t('home.hero.title') }}
          </h1>
          <p
            data-enter
            class="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
            :style="{ '--enter-delay': '140ms' }"
          >
            {{ t('home.hero.lead') }}
          </p>
          <div
            data-enter
            class="mt-8 flex flex-wrap gap-3"
            :style="{ '--enter-delay': '210ms' }"
          >
            <UButton
              :to="localePath('join')"
              size="lg"
              icon="i-lucide-user-plus"
            >
              {{ t('home.hero.primaryCta') }}
            </UButton>
            <UButton
              :to="localePath('about')"
              size="lg"
              color="neutral"
              variant="soft"
              icon="i-lucide-arrow-right"
            >
              {{ t('home.hero.secondaryCta') }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- 三块方向 -->
    <section class="py-16 sm:py-20">
      <UContainer>
        <div
          v-reveal
          class="max-w-2xl"
        >
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ t('home.directions.title') }}
          </h2>
          <p class="mt-3 leading-relaxed text-muted">
            {{ t('home.directions.lead') }}
          </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, index) in directions"
            :key="item.title"
            v-reveal:index="index * 90"
            class="group hover-lift rounded-2xl border border-default bg-default p-6 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
          >
            <span class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UIcon :name="item.icon" class="size-4.5" />
            </span>
            <h3 class="mt-4 text-lg font-semibold">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ item.text }}
            </p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- 收尾 CTA -->
    <section class="py-16 sm:py-20">
      <UContainer>
        <div
          v-reveal
          class="rounded-3xl border border-primary/15 bg-primary/5 p-8 dark:bg-primary/10 sm:p-12"
        >
          <div class="max-w-xl">
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              {{ t('home.ctaBand.title') }}
            </h2>
            <p class="mt-3 leading-relaxed text-muted">
              {{ t('home.ctaBand.text') }}
            </p>
            <UButton
              :to="localePath('join')"
              class="mt-6"
              icon="i-lucide-arrow-right"
            >
              {{ t('home.ctaBand.button') }}
            </UButton>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>
