<script setup lang="ts">
import { notices } from '#content'

const route = useRoute()
const notice = notices.find((item) => item.slug === String(route.params.slug))

if (!notice) {
  throw createError({ statusCode: 404, statusMessage: '找不到这条公告', fatal: true })
}

useSiteSeo({
  title: notice.title,
  description: notice.summary || undefined,
})

const dateLabel = notice.date.replaceAll('-', '.')
</script>

<template>
  <article class="mx-auto max-w-3xl px-5 py-16 sm:px-8">
    <NuxtLink
      to="/news"
      class="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-all hover:gap-2.5"
    >
      <UIcon name="lucide:arrow-right" class="size-4 rotate-180" />
      全部公告
    </NuxtLink>

    <header class="mt-8">
      <div class="flex flex-wrap items-center gap-3">
        <time :datetime="notice.date" class="text-xs font-bold tracking-widest text-ink-400">
          {{ dateLabel }}
        </time>
        <span
          v-if="notice.type === 'article'"
          class="rounded-full border-2 border-ink-900 bg-blush-200 px-2 py-0.5 text-xs font-bold text-ink-900"
        >
          长文
        </span>
      </div>

      <h1 class="mt-4 text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        {{ notice.title }}
      </h1>
    </header>

    <div class="notice-body mt-10" v-html="notice.html" />
  </article>
</template>
