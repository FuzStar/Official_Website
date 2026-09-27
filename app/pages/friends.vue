<script setup lang="ts">
import { friends, site } from '#content'

useSiteSeo({ title: '友链与合作' })
</script>

<template>
  <div>
    <SitePageHero eyebrow="Friends" title="友链与合作" />

    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div v-if="friends.length" class="grid gap-4 sm:grid-cols-2">
        <SiteFriendCard
          v-for="(friend, index) in friends"
          :key="friend.url || index"
          :friend="friend"
        />
      </div>
      <p
        v-else
        class="rounded-2xl border-2 border-dashed border-ink-900/20 px-6 py-12 text-center text-sm text-ink-400"
      >
        友链还在整理，位置给你留着。
      </p>

      <div class="sticker-card mt-12 bg-cream-50 p-8">
        <h2 class="text-xl font-extrabold text-ink-950">合作</h2>

        <div
          v-if="site.collaboration"
          class="rich-text rich-text-lg mt-4"
          v-html="site.collaboration"
        />

        <a v-if="site.email" :href="`mailto:${site.email}`" class="btn btn-secondary mt-6">
          <UIcon name="lucide:mail" class="size-4" />
          {{ site.email }}
        </a>
      </div>
    </section>
  </div>
</template>
