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
    icon: directionIcons[item.icon] ?? 'i-lucide-sparkles',
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
        <div class="absolute -top-32 left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div class="absolute -right-24 top-36 h-72 w-72 rounded-full bg-secondary/15 blur-3xl" />
        <UIcon name="i-lucide-star" class="absolute left-[10%] top-28 size-5 text-primary/40" />
        <UIcon name="i-lucide-sparkles" class="absolute right-[16%] top-44 size-6 text-secondary/50" />
        <UIcon name="i-lucide-star" class="absolute left-[28%] top-64 size-3 text-secondary/40" />
        <UIcon name="i-lucide-star" class="absolute right-[32%] bottom-24 size-4 text-primary/30" />
      </div>

      <UContainer class="relative py-20 sm:py-28">
        <div class="max-w-3xl">
          <UBadge
            color="primary"
            variant="subtle"
            icon="i-lucide-sparkles"
          >
            {{ t('home.hero.badge') }}
          </UBadge>
          <h1 class="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            {{ t('home.hero.titleBefore') }}<span class="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{{ t('home.hero.titleAccent') }}</span>{{ t('home.hero.titleAfter') }}
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
          <h2 class="text-3xl font-bold tracking-tight">
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
            <span class="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UIcon :name="item.icon" class="size-5" />
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
    <section class="pb-20 sm:pb-24">
      <UContainer>
        <div class="relative overflow-hidden rounded-3xl border border-default bg-gradient-to-br from-primary/10 via-default to-secondary/10 p-8 sm:p-12">
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
