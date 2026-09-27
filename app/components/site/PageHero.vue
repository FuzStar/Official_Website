<script setup lang="ts">
defineProps<{
  title: string
  description?: string
  eyebrow?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden border-b-2 border-ink-900/10 bg-cream-100">
    <!-- 右上那颗是背景纹理，压细压淡，别跟标题抢注意力 -->
    <SiteStarMark
      class="pointer-events-none absolute -top-7 right-3 size-28 text-brand-200/45"
      :stroke-width="0.7"
    />
    <SiteStarMark
      class="pointer-events-none absolute right-28 bottom-7 size-8 text-blush-300/60"
      :stroke-width="1"
    />

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
