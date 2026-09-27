<script setup lang="ts">
import type { Notice } from '#content'

const props = defineProps<{ notice: Notice }>()

const dateLabel = computed(() => props.notice.date.replaceAll('-', '.'))
</script>

<template>
  <article class="sticker-card sticker-card-hover bg-cream-50 p-6">
    <div class="flex flex-wrap items-center gap-3">
      <time :datetime="notice.date" class="text-xs font-bold tracking-widest text-ink-400">
        {{ dateLabel }}
      </time>

      <span
        v-if="notice.pinned"
        class="inline-flex items-center gap-1 rounded-full border-2 border-ink-900 bg-brand-200 px-2 py-0.5 text-xs font-bold text-ink-900"
      >
        <UIcon name="lucide:pin" class="size-3" />
        置顶
      </span>
    </div>

    <h2 class="mt-3 text-lg font-extrabold tracking-tight text-ink-950">
      <NuxtLink
        v-if="notice.type === 'article'"
        :to="`/news/${notice.slug}`"
        class="transition-colors hover:text-brand-700"
      >
        {{ notice.title || '无标题' }}
      </NuxtLink>
      <template v-else>{{ notice.title || '无标题' }}</template>
    </h2>

    <!-- 短公告的正文直接在这里读完，不用再点一次 -->
    <div v-if="notice.type === 'notice'" class="notice-body mt-3 text-sm" v-html="notice.html" />

    <template v-else>
      <p v-if="notice.summary" class="mt-3 text-sm leading-relaxed text-ink-600">
        {{ notice.summary }}
      </p>
      <NuxtLink
        :to="`/news/${notice.slug}`"
        class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-all hover:gap-2.5"
      >
        阅读全文
        <UIcon name="lucide:arrow-right" class="size-4" />
      </NuxtLink>
    </template>
  </article>
</template>
