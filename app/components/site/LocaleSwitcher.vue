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
    <!--
      locale=false：switchLocalePath 返回的已是目标语言的最终路径，
      ULink 默认还会按当前语言再本地化一次，把中文路径错误地加上 /en 前缀
    -->
    <UButton
      v-for="option in options"
      :key="option.code"
      size="xs"
      :to="switchLocalePath(option.code)"
      :locale="false"
      :color="locale === option.code ? 'primary' : 'neutral'"
      :variant="locale === option.code ? 'soft' : 'ghost'"
      class="justify-center px-2.5"
      :aria-current="locale === option.code ? 'true' : undefined"
    >
      {{ option.label }}
    </UButton>
  </div>
</template>
