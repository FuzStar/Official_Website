<script setup lang="ts">
import type { Friend } from '#content'

defineProps<{ friend: Friend }>()
</script>

<template>
  <a
    :href="friend.url"
    target="_blank"
    rel="noopener noreferrer"
    class="sticker-card sticker-card-hover group flex items-center gap-4 bg-cream-50 p-5"
  >
    <img
      v-if="friend.logo"
      :src="friend.logo"
      :alt="friend.name"
      class="size-12 shrink-0 rounded-xl border-2 border-ink-900 object-cover"
    />
    <span
      v-else
      class="grid size-12 shrink-0 place-items-center rounded-xl border-2 border-ink-900 bg-blush-100"
    >
      <UIcon name="lucide:link" class="size-5 text-blush-700" />
    </span>

    <div class="min-w-0 flex-1">
      <h3 class="truncate font-extrabold text-ink-950 transition-colors group-hover:text-brand-700">
        {{ friend.name || '未命名' }}
      </h3>
      <p v-if="friend.description" class="mt-1 line-clamp-2 text-sm leading-relaxed text-ink-600">
        {{ friend.description }}
      </p>
    </div>

    <UIcon
      name="lucide:external-link"
      class="size-4 shrink-0 text-ink-300 transition-colors group-hover:text-brand-600"
    />
  </a>
</template>
