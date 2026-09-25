<script setup lang="ts">
defineProps<{
  title: string
  lead?: string
}>()
</script>

<template>
  <section class="relative overflow-hidden">
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 via-secondary/5 to-transparent"
    />
    <UContainer class="relative py-14 sm:py-20">
      <div class="max-w-3xl space-y-4">
        <slot name="badge" />
        <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
          {{ title }}
        </h1>
        <p
          v-if="lead"
          class="max-w-2xl text-lg leading-relaxed text-muted"
        >
          {{ lead }}
        </p>
      </div>
      <slot />
    </UContainer>
  </section>
</template>
