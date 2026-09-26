<script setup lang="ts">
defineProps<{
  title: string
  lead?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden">
    <SiteHeroBackdrop />
    <UContainer class="relative py-14 sm:py-20">
      <div class="max-w-3xl space-y-6">
        <slot name="badge" />
        <h1
          data-enter
          class="text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
        >
          {{ title }}
        </h1>
        <p
          v-if="lead"
          data-enter
          class="max-w-2xl text-lg leading-relaxed text-muted"
          :style="{ '--enter-delay': '80ms' }"
        >
          {{ lead }}
        </p>
      </div>
      <slot />
    </UContainer>
  </section>
</template>
