<script setup lang="ts">
import { siteConfig } from '#shared/config/site'

const { t, tm } = useI18n()

usePageSeo(t('seo.join.title'), t('seo.join.description'))

const steps = computed(() => tm('join.steps.items') as { title: string, text: string }[])
const requirements = computed(() => tm('join.requirements.items') as string[])
const faq = computed(() => (tm('join.faq.items') as { q: string, a: string }[])
  .map(item => ({ label: item.q, content: item.a })))

const communities = computed(() => [
  {
    href: siteConfig.communities.qq,
    name: t('join.communities.qq.name'),
    text: t('join.communities.qq.text'),
    button: t('join.communities.qq.button'),
    icon: 'i-lucide-users',
  },
  {
    href: siteConfig.communities.discord,
    name: t('join.communities.discord.name'),
    text: t('join.communities.discord.text'),
    button: t('join.communities.discord.button'),
    icon: 'i-lucide-globe',
  },
])
</script>

<template>
  <div>
    <SitePageHero
      :title="t('join.hero.title')"
      :lead="t('join.hero.lead')"
    />

    <UContainer class="space-y-16 py-14 sm:py-20">
      <!-- 三步 -->
      <section>
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
          {{ t('join.steps.title') }}
        </h2>
        <ol class="mt-6 grid gap-5 sm:grid-cols-3">
          <li
            v-for="(step, index) in steps"
            :key="step.title"
            class="rounded-2xl border border-default bg-default p-5"
          >
            <span class="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
              {{ index + 1 }}
            </span>
            <h3 class="mt-4 font-semibold">
              {{ step.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-muted">
              {{ step.text }}
            </p>
          </li>
        </ol>
      </section>

      <!-- 社区入口 -->
      <section>
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
          {{ t('join.communities.title') }}
        </h2>
        <div class="mt-6 grid gap-5 sm:grid-cols-2">
          <div
            v-for="community in communities"
            :key="community.href"
            class="flex flex-col rounded-2xl border border-default bg-default p-6"
          >
            <div class="flex items-center gap-3">
              <span class="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <UIcon :name="community.icon" class="size-4.5" />
              </span>
              <h3 class="text-lg font-semibold">
                {{ community.name }}
              </h3>
            </div>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-muted">
              {{ community.text }}
            </p>
            <UButton
              :href="community.href"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-5"
              icon="i-lucide-arrow-up-right"
            >
              {{ community.button }}
            </UButton>
          </div>
        </div>
        <p class="mt-4 text-sm text-muted">
          {{ t('join.communities.note') }}
          <a
            :href="`mailto:${siteConfig.email}`"
            class="text-primary transition-colors hover:text-primary/80"
          >{{ siteConfig.email }}</a>
        </p>
      </section>

      <!-- 申请须知 -->
      <section class="max-w-3xl">
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
          {{ t('join.requirements.title') }}
        </h2>
        <ul class="mt-5 space-y-3.5">
          <li
            v-for="(item, index) in requirements"
            :key="index"
            class="flex gap-3 leading-relaxed"
          >
            <UIcon
              name="i-lucide-circle-check"
              class="mt-1 size-5 shrink-0 text-primary"
            />
            <span class="text-muted">{{ item }}</span>
          </li>
        </ul>
      </section>

      <!-- FAQ -->
      <section class="max-w-3xl">
        <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
          {{ t('join.faq.title') }}
        </h2>
        <UAccordion
          :items="faq"
          class="mt-5"
        />
      </section>
    </UContainer>
  </div>
</template>
