<script setup lang="ts">
import { siteConfig } from '#shared/config/site'

const { t } = useI18n()
const localePath = useLocalePath()

const year = new Date().getFullYear()

const siteLinks = computed(() => [
  { to: localePath('about'), label: t('nav.about') },
  { to: localePath('join'), label: t('nav.join') },
  { to: localePath('charter'), label: t('nav.charter') },
  { to: localePath('docs'), label: t('nav.docs') },
])

const communityLinks = computed(() => [
  { href: siteConfig.communities.qq, label: t('footer.qq') },
  { href: siteConfig.communities.discord, label: t('footer.discord') },
])
</script>

<template>
  <footer class="border-t border-default bg-muted/40">
    <UContainer class="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
      <div class="max-w-sm">
        <NuxtLink :to="localePath('index')" class="flex items-center gap-2">
          <span class="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-sm">
            <UIcon name="i-lucide-star" class="size-4 text-white" />
          </span>
          <span class="text-lg font-extrabold tracking-tight">
            <span class="text-default">Fuzz</span><span class="text-primary">Star</span>
          </span>
        </NuxtLink>
        <p class="mt-4 text-sm leading-relaxed text-muted">
          {{ t('footer.tagline') }}
        </p>
        <a
          :href="`mailto:${siteConfig.email}`"
          class="mt-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-primary"
        >
          <UIcon name="i-lucide-mail" class="size-4" />
          {{ siteConfig.email }}
        </a>
      </div>

      <nav :aria-label="t('footer.site')">
        <p class="text-sm font-semibold">
          {{ t('footer.site') }}
        </p>
        <ul class="mt-4 space-y-2.5">
          <li v-for="link in siteLinks" :key="link.to">
            <NuxtLink
              :to="link.to"
              class="text-sm text-muted transition-colors hover:text-primary"
            >
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <nav :aria-label="t('footer.community')">
        <p class="text-sm font-semibold">
          {{ t('footer.community') }}
        </p>
        <ul class="mt-4 space-y-2.5">
          <li v-for="link in communityLinks" :key="link.href">
            <a
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-primary"
            >
              {{ link.label }}
              <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
            </a>
          </li>
        </ul>
      </nav>
    </UContainer>

    <UContainer class="flex flex-wrap items-center justify-between gap-3 border-t border-default/60 py-5">
      <p class="text-xs text-muted">
        © {{ year }} {{ siteConfig.name }} · {{ t('footer.rights') }}
      </p>
      <a
        v-if="siteConfig.icp"
        :href="siteConfig.icpUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-xs text-muted transition-colors hover:text-primary"
      >
        {{ siteConfig.icp }}
      </a>
    </UContainer>
  </footer>
</template>
