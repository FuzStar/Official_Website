<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()

useHtmlLang()

const isNotFound = computed(() => props.error?.statusCode === 404)

useSeoMeta({ robots: { index: false, follow: false } })
useHead(() => ({
  title: isNotFound.value ? t('notFound.title') : t('notFound.serverError'),
}))

function goHome() {
  clearError({ redirect: localePath('index') })
}
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <SiteHeader />
    <main class="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <template v-if="isNotFound">
        <SiteNotFound />
      </template>
      <template v-else>
        <span class="flex size-14 items-center justify-center rounded-2xl bg-error/10 text-error">
          <UIcon name="i-lucide-triangle-alert" class="size-7" />
        </span>
        <p class="mt-6 text-sm font-semibold text-error">
          {{ props.error?.statusCode }}
        </p>
        <h1 class="mt-1 text-4xl font-bold tracking-tight">
          {{ t('notFound.serverError') }}
        </h1>
        <UButton
          class="mt-8"
          icon="i-lucide-rotate-ccw"
          @click="goHome"
        >
          {{ t('notFound.home') }}
        </UButton>
      </template>
    </main>
    <SiteFooter />
  </div>
</template>
