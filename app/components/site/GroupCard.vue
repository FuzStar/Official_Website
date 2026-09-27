<script setup lang="ts">
import type { Group } from '#content'

const props = defineProps<{ group: Group }>()

const icon = computed(() => platformIcon(props.group.platform))

const typeName = computed(() => platformLabel(props.group.platform))
</script>

<template>
  <div class="sticker-card sticker-card-hover flex flex-col bg-cream-50 p-6">
    <div class="flex items-center gap-3.5">
      <span
        class="grid size-12 shrink-0 place-items-center rounded-2xl border-2 border-ink-900 bg-brand-200"
      >
        <UIcon :name="icon" class="size-5 text-ink-900" />
      </span>

      <div class="min-w-0">
        <p v-if="group.name" class="text-xs font-bold tracking-widest text-ink-400 uppercase">
          {{ typeName }}
        </p>
        <!-- 群名还没填时拿平台名当标题，卡片不留空 -->
        <h3 class="truncate text-lg font-extrabold" :class="group.name ? 'text-ink-950' : 'text-ink-500'">
          {{ group.name || typeName }}
        </h3>
      </div>
    </div>

    <p v-if="group.note" class="mt-4 flex-1 text-sm leading-relaxed text-ink-600">
      {{ group.note }}
    </p>

    <div class="mt-auto flex flex-wrap items-center gap-2.5 pt-5">
      <a
        :href="group.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 rounded-full border-2 border-ink-900 bg-brand-400 px-4 py-2 text-sm font-bold text-ink-950 shadow-sticker-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
      >
        加入
        <UIcon name="lucide:arrow-right" class="size-4" />
      </a>

      <SiteCopyButton v-if="group.handle" :value="group.handle" :label="group.handle" />
    </div>
  </div>
</template>
