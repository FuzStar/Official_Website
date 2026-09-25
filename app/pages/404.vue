<script setup lang="ts">
const { t } = useI18n()

usePageSeo(t('notFound.title'), t('notFound.lead'))
useSeoMeta({ robots: { index: false, follow: false } })
</script>

<template>
  <SiteNotFound />
</template>
