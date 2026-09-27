<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  eyebrow?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden border-b-2 border-ink-900/10 bg-cream-100">
    <SiteStarMark class="pointer-events-none absolute -top-8 right-4 size-36 text-brand-200/60" />
    <SiteStarMark class="pointer-events-none absolute right-32 bottom-6 size-10 text-blush-300/70" />

    <div class="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
      <p
        v-if="eyebrow"
        class="mb-3 text-xs font-bold tracking-[0.2em] text-brand-700 uppercase"
      >
        {{ eyebrow }}
      </p>

      <h1 class="text-3xl font-extrabold tracking-tight text-ink-950 sm:text-4xl">
        {{ title }}
      </h1>

      <p v-if="description" class="mt-4 max-w-2xl text-base leading-relaxed text-ink-600">
        {{ description }}
      </p>

      <slot />
    </div>
  </section>
</template>
