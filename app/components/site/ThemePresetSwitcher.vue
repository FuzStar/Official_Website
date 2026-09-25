<script setup lang="ts">
const { t } = useI18n()
const { presets, current, setPreset } = useThemePreset()

const items = computed(() =>
  presets.map(preset => ({
    label: t(`theme.presets.${preset.id}`),
    icon: preset.id === current.value.id ? 'i-lucide-check' : undefined,
    swatch: preset.swatch,
    onSelect: () => setPreset(preset.id),
  })),
)
</script>

<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'end' }"
  >
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-palette"
      :aria-label="t('theme.label')"
    />

    <template #item-leading="{ item }">
      <span class="flex items-center gap-2">
        <span class="flex -space-x-1.5">
          <span
            v-for="color in item.swatch"
            :key="color"
            :class="['size-3 rounded-full ring-2 ring-default', color]"
          />
        </span>
        <UIcon
          v-if="item.icon"
          :name="item.icon"
          class="size-4 text-primary"
        />
      </span>
    </template>
  </UDropdownMenu>
</template>
