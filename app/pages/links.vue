<script setup lang="ts">
import { friendLinks } from '#shared/config/links'

const { t, locale } = useI18n()

usePageSeo(t('seo.links.title'), t('seo.links.description'))

function pick(text?: { zh: string, en: string }): string | undefined {
  if (!text) return undefined
  return text[locale.value as keyof typeof text] ?? text.zh
}

// logo 加载失败时退回名字首字
const failedLogos = reactive<Record<string, boolean>>({})

function markFailed(url: string) {
  failedLogos[url] = true
}
</script>

<template>
  <div>
    <SitePageHero
      :title="t('links.hero.title')"
      :lead="t('links.hero.lead')"
    />

    <UContainer class="py-14 sm:py-20">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <a
          v-for="link in friendLinks"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="group rounded-2xl border border-default bg-default p-6 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
        >
          <div class="flex items-start gap-4">
            <img
              v-if="link.logo && !failedLogos[link.url]"
              :src="link.logo"
              :alt="link.name"
              class="size-11 shrink-0 rounded-xl object-cover"
              loading="lazy"
              @error="markFailed(link.url)"
            >
            <span
              v-else
              class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary"
              aria-hidden="true"
            >
              {{ link.name.charAt(0) }}
            </span>
            <div class="min-w-0 flex-1">
              <div class="flex items-center justify-between gap-2">
                <h2 class="truncate text-lg font-semibold">
                  {{ link.name }}
                </h2>
                <UIcon
                  name="i-lucide-arrow-up-right"
                  class="size-4 shrink-0 text-muted transition-colors group-hover:text-primary"
                />
              </div>
              <p
                v-if="pick(link.description)"
                class="mt-1.5 text-sm leading-relaxed text-muted"
              >
                {{ pick(link.description) }}
              </p>
            </div>
          </div>
        </a>
      </div>
    </UContainer>
  </div>
</template>
