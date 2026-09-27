<script setup lang="ts">
import { notices } from '#content'

useSiteSeo({ title: '公告' })
</script>

<template>
  <div>
    <SitePageHero eyebrow="News" title="公告" />

    <section class="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <div v-if="notices.length" class="space-y-5">
        <SiteNoticeCard v-for="item in notices" :key="item.slug" :notice="item" />
      </div>
      <p
        v-else
        class="rounded-2xl border-2 border-dashed border-ink-900/20 px-6 py-12 text-center text-sm text-ink-400"
      >
        暂无公告。
      </p>
    </section>
  </div>
</template>
