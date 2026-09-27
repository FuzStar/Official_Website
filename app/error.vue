<script setup lang="ts">
import type { NuxtError } from '#app'
import { eggs, site } from '#content'

const props = defineProps<{ error: NuxtError }>()

useSiteSeo({
  title: String(props.error.statusCode ?? 404),
  description: site.org.tagline,
  indexable: false,
})

// 星星连点 5 下，露出藏在后面的那句
const countStarClicks = createClickCounter(5)
const lostLine = ref('')

function pokeStar() {
  if (countStarClicks()) lostLine.value = eggs.lost
}
</script>

<template>
  <div class="grid min-h-dvh place-items-center px-5 py-20">
    <div class="w-full max-w-md text-center">
      <div class="relative mx-auto size-24" @click="pokeStar">
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
      <p v-if="lostLine" class="mt-3 text-xs text-ink-400">{{ lostLine }}</p>

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
