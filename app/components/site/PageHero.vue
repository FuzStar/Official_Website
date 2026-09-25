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
      class="pointer-events-none absolute inset-0"
    >
      <div class="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/8 to-transparent" />
      <div class="absolute inset-0 [background-image:radial-gradient(var(--ui-border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
    </div>
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
