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
        :key="group.label"
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
          <div
            v-for="member in group.members"
            :key="member.name"
            class="flex items-center gap-4 rounded-2xl border border-default bg-default p-5"
          >
            <span class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg font-bold text-primary">
              {{ member.name.charAt(0) }}
            </span>
            <div class="min-w-0">
              <p class="truncate font-semibold">
                {{ member.name }}
              </p>
              <a
                v-if="member.link"
                :href="member.link"
                target="_blank"
                rel="noopener noreferrer nofollow"
                class="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-primary"
              >
                {{ pick(member.title) }}
                <UIcon name="i-lucide-arrow-up-right" class="size-3.5" />
              </a>
              <p
                v-else-if="pick(member.title)"
                class="text-sm text-muted"
              >
                {{ pick(member.title) }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </UContainer>
  </div>
</template>
