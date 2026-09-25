<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="flex min-h-[55vh] flex-col items-center justify-center px-4 py-24 text-center">
    <span class="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
      <UIcon name="i-lucide-compass" class="size-7" />
    </span>
    <p class="mt-6 text-sm font-semibold text-primary">
      404
    </p>
    <h1 class="mt-1 text-3xl font-bold tracking-tight">
      {{ t('notFound.title') }}
    </h1>
    <p class="mt-3 max-w-md leading-relaxed text-muted">
      {{ t('notFound.lead') }}
    </p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <UButton
        :to="localePath('index')"
        icon="i-lucide-house"
      >
        {{ t('notFound.home') }}
      </UButton>
      <UButton
        :to="localePath('join')"
        color="neutral"
        variant="soft"
        icon="i-lucide-users"
      >
        {{ t('notFound.join') }}
      </UButton>
    </div>
  </div>
</template>
