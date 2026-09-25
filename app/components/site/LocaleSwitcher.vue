<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const options = computed(() => [
  { code: 'zh' as const, label: t('header.switchToZh') },
  { code: 'en' as const, label: t('header.switchToEn') },
])
</script>

<template>
  <div
    class="inline-flex items-center rounded-lg bg-muted p-0.5"
    role="group"
    :aria-label="t('header.language')"
  >
    <UButton
      v-for="option in options"
      :key="option.code"
      size="xs"
      :to="switchLocalePath(option.code)"
      :color="locale === option.code ? 'primary' : 'neutral'"
      :variant="locale === option.code ? 'soft' : 'ghost'"
      class="justify-center px-2.5"
      :aria-current="locale === option.code ? 'true' : undefined"
    >
      {{ option.label }}
    </UButton>
  </div>
</template>
