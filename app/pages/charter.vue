<script setup lang="ts">
const { t, tm } = useI18n()

usePageSeo(t('seo.charter.title'), t('seo.charter.description'))

interface CharterArticle {
  no: string
  text: string
}

interface CharterChapter {
  title: string
  articles: CharterArticle[]
}

const chapters = computed(() => tm('charter.chapters') as CharterChapter[])
</script>

<template>
  <div>
    <SitePageHero
      :title="t('charter.hero.title')"
      :lead="t('charter.hero.lead')"
    />

    <UContainer class="py-14 sm:py-20">
      <UAlert
        class="mb-10"
        color="info"
        variant="subtle"
        icon="i-lucide-info"
        :title="t('charter.draft.title')"
        :description="t('charter.draft.description')"
      />

      <div class="grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav
          class="hidden lg:block"
          :aria-label="t('charter.toc')"
        >
          <div class="sticky top-24 space-y-1">
            <p class="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-muted">
              {{ t('charter.toc') }}
            </p>
            <a
              v-for="(chapter, index) in chapters"
              :key="chapter.title"
              :href="`#chapter-${index + 1}`"
              class="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-muted hover:text-default"
            >
              {{ chapter.title }}
            </a>
          </div>
        </nav>

        <div class="space-y-8">
          <section
            v-for="(chapter, index) in chapters"
            :id="`chapter-${index + 1}`"
            :key="chapter.title"
            class="scroll-mt-24 rounded-2xl border border-default bg-default p-6 sm:p-8"
          >
            <h2 class="text-2xl font-bold tracking-tight sm:text-3xl">
              {{ chapter.title }}
            </h2>
            <div class="mt-5 space-y-4 leading-relaxed">
              <p
                v-for="article in chapter.articles"
                :key="article.no"
                class="text-default"
              >
                <span class="mr-2 font-semibold text-primary">{{ article.no }}</span>{{ article.text }}
              </p>
            </div>
          </section>
        </div>
      </div>
    </UContainer>
  </div>
</template>
