<script setup lang="ts">
import { site } from '#content'

const siteName = `${site.org.nameZh} ${site.org.name}`

useHead({
  titleTemplate: (title) => (title ? `${title} · ${siteName}` : siteName),
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
