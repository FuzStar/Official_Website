<script setup lang="ts">
const route = useRoute()
const menuOpen = ref(false)

watch(() => route.fullPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="sticky top-0 z-50 border-b-2 border-ink-900/10 bg-cream-50/85 backdrop-blur-md">
    <div class="mx-auto flex h-18 max-w-6xl items-center gap-4 px-5 sm:px-8">
      <NuxtLink to="/" aria-label="回到首页">
        <SiteBrandMark />
      </NuxtLink>

      <nav class="ml-auto hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="item in siteNav"
          :key="item.to"
          :to="item.to"
          class="rounded-full px-3.5 py-2 text-sm font-semibold text-ink-600 transition-colors hover:bg-brand-100 hover:text-ink-900"
          active-class="bg-brand-100 text-ink-900"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <NuxtLink
        to="/join"
        class="ml-auto hidden shrink-0 items-center gap-1.5 rounded-full border-2 border-ink-900 bg-brand-400 px-4 py-2 text-sm font-bold text-ink-950 shadow-sticker-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker md:inline-flex"
      >
        加入社区
        <UIcon name="lucide:arrow-right" class="size-4" />
      </NuxtLink>

      <button
        type="button"
        class="ml-auto inline-flex size-10 items-center justify-center rounded-xl border-2 border-ink-900 bg-cream-50 shadow-sticker-sm md:hidden"
        :aria-expanded="menuOpen"
        aria-label="导航菜单"
        @click="menuOpen = !menuOpen"
      >
        <UIcon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" class="size-5 text-ink-900" />
      </button>
    </div>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <nav
        v-if="menuOpen"
        class="border-t-2 border-ink-900/10 bg-cream-50 px-5 py-3 md:hidden"
      >
        <NuxtLink
          v-for="item in siteNav"
          :key="item.to"
          :to="item.to"
          class="block rounded-xl px-3 py-2.5 text-base font-semibold text-ink-700"
          active-class="bg-brand-100 text-ink-900"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
</template>
