<script setup lang="ts">
import { about } from '#content'

const sections = about.sections ?? []

useSiteSeo({ title: '关于我们', description: about.lead })
</script>

<template>
  <div>
    <SitePageHero eyebrow="About" title="关于我们" :description="about.lead" />

    <section class="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <div v-if="sections.length" class="space-y-12">
        <article v-for="(item, index) in sections" :key="item.title || index">
          <h2 class="text-2xl font-extrabold tracking-tight text-ink-950">
            {{ item.title }}
          </h2>
          <div class="rich-text rich-text-lg mt-4" v-html="item.body" />
        </article>
      </div>
      <p
        v-else
        class="rounded-2xl border-2 border-dashed border-ink-900/20 px-6 py-12 text-center text-sm text-ink-400"
      >
        这一页还在写。
      </p>

      <div class="mt-16 grid gap-5 sm:grid-cols-2">
        <NuxtLink to="/join" class="sticker-card sticker-card-hover group flex flex-col bg-brand-100 p-6">
          <h3 class="text-lg font-extrabold text-ink-950">加入我们</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-ink-700">
            进社群，或者来工作团队一起做事。
          </p>
          <span
            class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-all group-hover:gap-2.5"
          >
            去看看
            <UIcon name="lucide:arrow-right" class="size-4" />
          </span>
        </NuxtLink>

        <NuxtLink to="/friends" class="sticker-card group flex flex-col bg-blush-100 p-6">
          <h3 class="text-lg font-extrabold text-ink-950">友链与合作</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-ink-700">
            换友链、办活动、互推内容都可以谈。
          </p>
          <span
            class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-all group-hover:gap-2.5"
          >
            去看看
            <UIcon name="lucide:arrow-right" class="size-4" />
          </span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
