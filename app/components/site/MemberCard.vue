<script setup lang="ts">
import type { Member } from '#content'

defineProps<{ member: Member }>()
</script>

<template>
  <div class="sticker-card sticker-card-hover flex flex-col bg-cream-50 p-5">
    <div class="flex items-start gap-4">
      <img
        v-if="member.avatar"
        :src="member.avatar"
        :alt="member.name"
        class="size-14 shrink-0 rounded-2xl border-2 border-ink-900 object-cover"
      />
      <span
        v-else
        class="grid size-14 shrink-0 place-items-center rounded-2xl border-2 border-ink-900 bg-brand-100"
      >
        <UIcon name="lucide:paw-print" class="size-6 text-brand-600" />
      </span>

      <div class="min-w-0 pt-0.5">
        <h3 class="truncate text-base font-extrabold text-ink-950">
          {{ member.name || '未命名' }}
        </h3>
        <p v-if="member.role" class="mt-1 text-xs font-bold tracking-wider text-brand-700">
          {{ member.role }}
        </p>
      </div>
    </div>

    <p v-if="member.bio" class="mt-4 flex-1 text-sm leading-relaxed text-ink-600">
      {{ member.bio }}
    </p>
    <div v-else class="flex-1" />

    <div class="mt-4 flex flex-wrap items-center gap-2">
      <SiteCopyButton v-if="member.qq" :value="member.qq" :label="`QQ ${member.qq}`" />

      <a
        v-if="member.email"
        :href="`mailto:${member.email}`"
        class="inline-flex items-center gap-1.5 rounded-full border-2 border-ink-900 bg-cream-50 px-3 py-1 text-xs font-bold text-ink-800 shadow-sticker-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
      >
        <UIcon name="lucide:mail" class="size-3.5" />
        邮箱
      </a>

      <a
        v-for="link in member.links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 rounded-full border-2 border-ink-900 bg-cream-50 px-3 py-1 text-xs font-bold text-ink-800 shadow-sticker-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
      >
        <UIcon v-if="link.icon" :name="link.icon" class="size-3.5" />
        {{ link.label }}
      </a>
    </div>
  </div>
</template>
