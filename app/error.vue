<script setup lang="ts">
import type { NuxtError } from '#app'
import { site } from '#content'

const props = defineProps<{ error: NuxtError }>()

useSiteSeo({
  title: String(props.error.statusCode ?? 404),
  description: site.org.tagline,
  indexable: false,
})
</script>

<template>
  <div class="grid min-h-dvh place-items-center px-5 py-20">
    <div class="w-full max-w-md text-center">
      <div class="relative mx-auto size-24">
        <SiteStarMark class="size-24 text-brand-400" />
        <span
          class="absolute inset-0 grid place-items-center text-2xl font-extrabold text-ink-950"
        >
          {{ error.statusCode }}
        </span>
      </div>

      <h1 class="mt-8 text-xl font-extrabold text-ink-950">这一页走丢了</h1>
      <p class="mt-3 text-sm leading-relaxed text-ink-600">
        地址可能写错了，或者内容已经挪走。
      </p>

      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" class="btn btn-primary" @click="clearError({ redirect: '/' })">
          <UIcon name="lucide:arrow-right" class="size-4 rotate-180" />
          回首页
        </button>
        <button type="button" class="btn btn-secondary" @click="clearError({ redirect: '/news' })">
          看公告
        </button>
      </div>
    </div>
  </div>
</template>
