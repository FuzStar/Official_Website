<script setup lang="ts">
import { memberCategories, members } from '#shared/config/members'

const { t, locale } = useI18n()

usePageSeo(t('seo.members.title'), t('seo.members.description'))

function pick(text?: { zh: string, en: string }): string | undefined {
  if (!text) return undefined
  return text[locale.value as keyof typeof text] ?? text.zh
}

// 没有人的分类不展示，避免页面出现空段
const groups = computed(() =>
  memberCategories
    .map(category => ({
      id: category.id,
      label: pick(category.label) ?? category.id,
      description: pick(category.description),
      members: members.filter(member => member.category === category.id),
    }))
    .filter(group => group.members.length > 0),
)
</script>

<template>
  <div>
    <SitePageHero
      :title="t('members.hero.title')"
      :lead="t('members.hero.lead')"
    />

    <UContainer class="space-y-14 py-14 sm:space-y-16 sm:py-20">
      <section
        v-for="group in groups"
        :key="group.id"
        v-reveal
      >
        <div class="max-w-2xl">
          <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ group.label }}
          </h2>
          <p
            v-if="group.description"
            class="mt-3 leading-relaxed text-muted"
          >
            {{ group.description }}
          </p>
        </div>

        <div class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <SiteMemberCard
            v-for="member in group.members"
            :key="member.name"
            :member="member"
          />
        </div>
      </section>
    </UContainer>
  </div>
</template>
