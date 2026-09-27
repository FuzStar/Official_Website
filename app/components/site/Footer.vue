<script setup lang="ts">
import { site } from '#content'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="mt-24 border-t-2 border-ink-900/10 bg-cream-100">
    <div class="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div class="lg:col-span-2">
          <SiteBrandMark />
          <p v-if="site.org.tagline" class="mt-4 max-w-sm text-sm leading-relaxed text-ink-600">
            {{ site.org.tagline }}
          </p>
        </div>

        <div>
          <h2 class="text-xs font-bold tracking-widest text-ink-400 uppercase">站内</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in siteNav" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h2 class="text-xs font-bold tracking-widest text-ink-400 uppercase">找到我们</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="group in site.groups" :key="group.url">
              <a
                :href="group.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
              >
                <UIcon :name="platformIcon(group.platform)" class="size-4" />
                {{ group.name || platformLabel(group.platform) }}
              </a>
            </li>
          </ul>

          <a
            v-if="site.email"
            :href="`mailto:${site.email}`"
            class="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-700 transition-colors hover:text-brand-700"
          >
            <UIcon name="lucide:mail" class="size-4" />
            {{ site.email }}
          </a>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-3 border-t-2 border-ink-900/10 pt-6 text-xs text-ink-500 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} {{ site.org.nameZh }} {{ site.org.name }}</p>

        <a
          v-if="site.icp"
          :href="site.icpUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors hover:text-brand-700"
        >
          {{ site.icp }}
        </a>
      </div>
    </div>
  </footer>
</template>
