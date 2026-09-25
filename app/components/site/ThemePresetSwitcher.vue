<script setup lang="ts">
const { t } = useI18n()
const { presets, current, setPreset } = useThemePreset()

const items = computed(() =>
  presets.map(preset => ({
    label: t(`theme.presets.${preset.id}`),
    swatch: preset.swatch,
    checked: preset.id === current.value.id,
    onSelect: () => setPreset(preset.id),
  })),
)
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end' }"
    :ui="{ content: 'min-w-40' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-palette"
      :aria-label="t('theme.label')"
    />

    <!-- 双色小方块代替原来的重叠圆点，两块颜色一目了然 -->
    <template #item-leading="{ item }">
      <span class="flex size-5 shrink-0 overflow-hidden rounded-md ring-1 ring-inset ring-default">
        <span
          v-for="color in item.swatch"
          :key="color"
          class="flex-1"
          :class="color"
        />
      </span>
    </template>

    <!-- 对勾放行尾，所有行右对齐，不再挤在色卡旁边 -->
    <template #item-trailing="{ item }">
      <UIcon
        v-if="item.checked"
        name="i-lucide-check"
        class="size-4 text-primary"
      />
    </template>
  </UDropdownMenu>
</template>
