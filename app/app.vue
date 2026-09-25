<script setup lang="ts">
import { siteConfig } from '#shared/config/site'

useHtmlLang()

useHead({
  // 页面自己只管给标题，分隔符和站名统一在这拼
  titleTemplate: title => title ? `${title} · ${siteConfig.name}` : siteConfig.name,
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
