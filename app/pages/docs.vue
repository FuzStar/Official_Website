<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

usePageSeo(t('seo.docs.title'), t('seo.docs.description'))
</script>

<template>
  <div>
    <SitePageHero
      :title="t('docs.hero.title')"
      :lead="t('docs.hero.lead')"
    >
      <template #badge>
        <UBadge
          color="warning"
          variant="subtle"
          icon="i-lucide-pencil-line"
        >
          {{ t('docs.badge') }}
        </UBadge>
      </template>
    </SitePageHero>

    <UContainer class="pb-20">
      <div class="mx-auto flex max-w-xl flex-col items-center rounded-3xl border border-default bg-default px-6 py-14 text-center">
        <span class="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <UIcon name="i-lucide-book-open-text" class="size-7" />
        </span>
        <h2 class="mt-6 text-2xl font-bold tracking-tight">
          {{ t('docs.coming.title') }}
        </h2>
        <p class="mt-3 leading-relaxed text-muted">
          {{ t('docs.coming.text') }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UButton
            :to="localePath('index')"
            icon="i-lucide-house"
          >
            {{ t('docs.coming.home') }}
          </UButton>
          <UButton
            :to="localePath('join')"
            color="neutral"
            variant="soft"
            icon="i-lucide-users"
          >
            {{ t('docs.coming.join') }}
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
