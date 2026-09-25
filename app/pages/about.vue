<script setup lang="ts">
const { t, tm } = useI18n()
const localePath = useLocalePath()

usePageSeo(t('seo.about.title'), t('seo.about.description'))

const origin = computed(() => tm('about.origin.paragraphs') as string[])
const work = computed(() => tm('about.work.items') as { title: string, text: string }[])
const values = computed(() => tm('about.values.items') as string[])

const workIcons = ['i-lucide-clapperboard', 'i-lucide-messages-square', 'i-lucide-calendar-heart', 'i-lucide-handshake']
</script>

<template>
  <div>
    <SitePageHero
      :title="t('about.hero.title')"
      :lead="t('about.hero.lead')"
    />

    <UContainer class="space-y-16 py-14 sm:py-16">
      <!-- 起源 -->
      <section class="max-w-3xl">
        <h2 class="text-2xl font-bold tracking-tight">
          {{ t('about.origin.title') }}
        </h2>
        <div class="mt-5 space-y-4 leading-relaxed text-muted">
          <p
            v-for="(paragraph, index) in origin"
            :key="index"
          >
            {{ paragraph }}
          </p>
        </div>
      </section>

      <!-- 在做的事 -->
      <section>
        <h2 class="text-2xl font-bold tracking-tight">
          {{ t('about.work.title') }}
        </h2>
        <div class="mt-6 grid gap-5 sm:grid-cols-2">
          <div
            v-for="(item, index) in work"
            :key="item.title"
            class="rounded-2xl border border-default bg-default p-5"
          >
            <div class="flex items-center gap-3">
              <span class="flex size-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <UIcon :name="workIcons[index] ?? 'i-lucide-star'" class="size-4.5" />
              </span>
              <h3 class="font-semibold">
                {{ item.title }}
              </h3>
            </div>
            <p class="mt-3 text-sm leading-relaxed text-muted">
              {{ item.text }}
            </p>
          </div>
        </div>
      </section>

      <!-- 相处方式 -->
      <section class="max-w-3xl">
        <h2 class="text-2xl font-bold tracking-tight">
          {{ t('about.values.title') }}
        </h2>
        <ul class="mt-5 space-y-3.5">
          <li
            v-for="(value, index) in values"
            :key="index"
            class="flex gap-3 leading-relaxed"
          >
            <UIcon
              name="i-lucide-circle-check"
              class="mt-1 size-5 shrink-0 text-primary"
            />
            <span class="text-muted">{{ value }}</span>
          </li>
        </ul>
      </section>

      <!-- 展望 -->
      <section class="rounded-3xl border border-default bg-gradient-to-br from-primary/10 via-default to-secondary/10 p-8 sm:p-10">
        <div class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight">
            {{ t('about.outlook.title') }}
          </h2>
          <p class="mt-4 leading-relaxed text-muted">
            {{ t('about.outlook.text') }}
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UButton
              :to="localePath('join')"
              icon="i-lucide-user-plus"
            >
              {{ t('about.outlook.primaryCta') }}
            </UButton>
            <UButton
              :to="localePath('charter')"
              color="neutral"
              variant="soft"
              icon="i-lucide-scroll-text"
            >
              {{ t('about.outlook.secondaryCta') }}
            </UButton>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>
