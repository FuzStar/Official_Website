<script setup lang="ts">
import { notices, site } from '#content'

const latestNotices = notices.slice(0, 3)
const groups = site.groups ?? []
const roles = site.roles ?? []

useSiteSeo({ description: site.org.intro || site.org.tagline })
</script>

<template>
  <div>
    <section class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="absolute -top-16 -left-24 size-80 rounded-full bg-brand-200/40 blur-3xl" />
        <div class="absolute -top-10 right-0 size-96 rounded-full bg-blush-200/50 blur-3xl" />
      </div>

      <div
        class="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-20 sm:px-8 sm:pt-24 sm:pb-24 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <p
            v-if="site.org.badge"
            class="inline-flex items-center gap-2 rounded-full border-2 border-ink-900 bg-cream-50 px-3.5 py-1.5 text-xs font-bold tracking-wider text-ink-700"
          >
            <SiteStarMark class="size-3.5 text-brand-500" />
            {{ site.org.badge }}
          </p>

          <h1
            class="mt-6 text-5xl leading-[1.06] font-extrabold tracking-tight text-ink-950 sm:text-6xl"
          >
            {{ site.org.nameZh }}
            <span class="mt-1 block text-brand-600">{{ site.org.name }}</span>
          </h1>

          <p v-if="site.org.tagline" class="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            {{ site.org.tagline }}
          </p>

          <div class="mt-9 flex flex-wrap gap-3">
            <NuxtLink to="/join" class="btn btn-primary">
              加入我们
              <UIcon name="lucide:arrow-right" class="size-4" />
            </NuxtLink>
            <NuxtLink to="/news" class="btn btn-secondary">
              <UIcon name="lucide:megaphone" class="size-4" />
              看公告
            </NuxtLink>
          </div>
        </div>

        <div class="relative mx-auto w-full max-w-xs sm:max-w-sm">
          <div class="sticker-card rotate-2 bg-white p-5">
            <img src="/brand/logo.png" :alt="`${site.org.nameZh} ${site.org.name}`" class="w-full" />
          </div>
          <SiteStarMark class="absolute -top-6 -left-4 size-12 text-brand-400" />
          <SiteStarMark class="absolute -right-3 -bottom-4 size-8 text-blush-400" />
        </div>
      </div>
    </section>

    <section v-if="site.org.intro" class="border-y-2 border-ink-900/10 bg-cream-100">
      <div class="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">关于我们</h2>
        <p class="mt-5 text-base leading-loose whitespace-pre-line text-ink-700">
          {{ site.org.intro }}
        </p>
        <NuxtLink
          to="/about"
          class="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-all hover:gap-2.5"
        >
          了解更多
          <UIcon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="text-xs font-bold tracking-[0.2em] text-brand-700 uppercase">News</p>
          <h2 class="mt-2 text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">公告</h2>
        </div>

        <NuxtLink
          to="/news"
          class="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition-all hover:gap-2.5"
        >
          全部公告
          <UIcon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
      </div>

      <div v-if="latestNotices.length" class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <SiteNoticeCard v-for="item in latestNotices" :key="item.slug" :notice="item" />
      </div>
      <p
        v-else
        class="mt-8 rounded-2xl border-2 border-dashed border-ink-900/20 px-6 py-10 text-center text-sm text-ink-400"
      >
        暂无公告。
      </p>
    </section>

    <section v-if="groups.length" class="border-y-2 border-ink-900/10 bg-cream-100">
      <div class="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p class="text-xs font-bold tracking-[0.2em] text-brand-700 uppercase">Community</p>
        <h2 class="mt-2 text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">社区群</h2>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SiteGroupCard v-for="group in groups" :key="group.url" :group="group" />
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div
        class="sticker-card flex flex-col items-start gap-6 bg-brand-100 p-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 class="text-xl font-extrabold text-ink-950 sm:text-2xl">友链与合作</h2>
          <p v-if="site.collaborationLead" class="mt-2 max-w-xl text-ink-700">
            {{ site.collaborationLead }}
          </p>
        </div>

        <NuxtLink to="/friends" class="btn btn-secondary shrink-0">
          查看
          <UIcon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
      </div>

      <div
        v-if="roles.length"
        class="sticker-card mt-6 flex flex-col items-start gap-6 bg-blush-100 p-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 class="text-xl font-extrabold text-ink-950 sm:text-2xl">招募工作人员</h2>
          <p class="mt-2 text-ink-700">共 {{ roles.length }} 个方向在招人。</p>
        </div>

        <NuxtLink to="/join#roles" class="btn btn-secondary shrink-0">
          看岗位
          <UIcon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
