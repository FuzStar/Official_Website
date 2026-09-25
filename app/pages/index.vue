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
  const items = tm('home.directions.items') as { icon: string; title: string; text: string }[]
  return items.map(item => ({
    ...item,
    icon: directionIcons[item.icon] ?? 'i-lucide-star',
  }))
})
</script>

<template>
  <div>
    <!-- 首屏 -->
    <section class="relative overflow-hidden">
      <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0"
      >
        <div class="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/8 to-transparent" />
        <!-- 顶部点阵，往下淡出 -->
        <div class="absolute inset-0 [background-image:radial-gradient(var(--ui-border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      </div>
      <UContainer class="relative py-16 sm:py-24">
        <div class="max-w-3xl">
          <UBadge
            color="primary"
            variant="subtle"
          >
            {{ t('home.hero.badge') }}
          </UBadge>
          <h1 class="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            {{ t('home.hero.title') }}
          </h1>
          <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {{ t('home.hero.lead') }}
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
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
        <div class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ t('home.directions.title') }}
          </h2>
          <p class="mt-3 leading-relaxed text-muted">
            {{ t('home.directions.lead') }}
          </p>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in directions"
            :key="item.title"
            class="group rounded-2xl border border-default bg-default p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
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
        <div class="rounded-3xl border border-primary/15 bg-primary/5 p-8 dark:bg-primary/10 sm:p-12">
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
