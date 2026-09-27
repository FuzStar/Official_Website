<script setup lang="ts">
import { members } from '#content'

useSiteSeo({ title: '工作人员' })
</script>

<template>
  <div>
    <SitePageHero eyebrow="Team" title="工作人员" />

    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div v-if="members.length" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SiteMemberCard
          v-for="(member, index) in members"
          :key="member.name || index"
          :member="member"
        />
      </div>
      <p
        v-else
        class="rounded-2xl border-2 border-dashed border-ink-900/20 px-6 py-12 text-center text-sm text-ink-400"
      >
        工作人员名单还没公开。
      </p>
    </section>
  </div>
</template>
