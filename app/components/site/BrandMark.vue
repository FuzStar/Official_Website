<script setup lang="ts">
import { site } from '#content'

withDefaults(defineProps<{ showName?: boolean }>(), { showName: true })
</script>

<template>
  <span class="flex items-center gap-2.5">
    <img src="/brand/mark.png" alt="" width="44" height="44" class="size-11 shrink-0" />
    <span
      v-if="showName"
      class="text-lg font-extrabold tracking-tight text-ink-950"
    >{{ site.org.nameZh }}</span>
  </span>
</template>
