<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const menuOpen = ref(false)

// 离开顶部后给 header 一点投影，滚动时层次更清楚
const scrolled = ref(false)
let onScroll: (() => void) | undefined

onMounted(() => {
  onScroll = () => {
    scrolled.value = window.scrollY > 8
  }
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  if (onScroll) window.removeEventListener('scroll', onScroll)
})

// exact 只给首页：否则 '/' 会把所有页面都点亮
const links = computed(() => [
  { to: localePath('index'), label: t('nav.home'), exact: true },
  { to: localePath('about'), label: t('nav.about'), exact: false },
  { to: localePath('join'), label: t('nav.join'), exact: false },
  { to: localePath('charter'), label: t('nav.charter'), exact: false },
  { to: localePath('docs'), label: t('nav.docs'), exact: false },
])

const joinTo = computed(() => localePath('join'))
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-default/70 bg-default/80 backdrop-blur-md transition-shadow"
    :class="scrolled ? 'shadow-sm' : ''"
  >
    <UContainer class="flex h-16 items-center justify-between gap-4">
      <NuxtLink
        :to="localePath('index')"
        class="flex shrink-0 items-center gap-2"
        :aria-label="t('nav.home')"
      >
        <span class="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-sm">
          <UIcon name="i-lucide-star" class="size-4 text-white" />
        </span>
        <span class="text-lg font-extrabold tracking-tight">
          <span class="text-default">Fuzz</span><span class="text-primary">Star</span>
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex" :aria-label="t('nav.mainNav')">
        <ULink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :exact="link.exact"
          active-class="text-primary bg-primary/10"
          inactive-class="text-muted hover:text-default hover:bg-muted"
          class="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
        >
          {{ link.label }}
        </ULink>
      </nav>

      <div class="flex items-center gap-1.5">
        <SiteLocaleSwitcher class="hidden sm:inline-flex" />
        <SiteThemePresetSwitcher />
        <UColorModeButton />
        <UButton
          :to="joinTo"
          size="sm"
          icon="i-lucide-user-plus"
          class="hidden md:inline-flex"
        >
          {{ t('header.cta') }}
        </UButton>
        <UButton
          class="md:hidden"
          color="neutral"
          variant="ghost"
          icon="i-lucide-menu"
          :aria-label="t('nav.menu')"
          aria-haspopup="dialog"
          @click="menuOpen = true"
        />
      </div>
    </UContainer>

    <UDrawer
      v-model:open="menuOpen"
      :title="t('nav.menu')"
      close
    >
      <template #content>
        <div class="flex flex-col gap-5 p-4 pb-10">
          <nav class="flex flex-col gap-1" :aria-label="t('nav.mainNav')">
            <ULink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              :exact="link.exact"
              active-class="text-primary bg-primary/10"
              inactive-class="text-muted hover:text-default hover:bg-muted"
              class="rounded-lg px-3 py-2.5 text-base font-medium transition-colors"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </ULink>
          </nav>

          <SiteLocaleSwitcher class="self-start" />

          <UButton
            :to="joinTo"
            block
            icon="i-lucide-user-plus"
            @click="menuOpen = false"
          >
            {{ t('header.cta') }}
          </UButton>
        </div>
      </template>
    </UDrawer>
  </header>
</template>
