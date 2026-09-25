import {
  themePresets,
  defaultThemePreset,
  themePresetStorageKey,
  type ThemePreset,
} from '#shared/config/theme-presets'

/**
 * 主题预设的切换状态。
 * 配色本身由 Nuxt UI 根据 appConfig.ui.colors 实时生成，
 * 这里只负责改配置 + 记住用户的选择。
 */
export function useThemePreset() {
  const currentId = useState<string>('theme-preset', () => defaultThemePreset.id)

  const current = computed<ThemePreset>(
    () => themePresets.find(preset => preset.id === currentId.value) ?? defaultThemePreset,
  )

  function setPreset(id: string) {
    const preset = themePresets.find(item => item.id === id)
    if (!preset) return

    currentId.value = preset.id
    updateAppConfig({
      ui: {
        colors: { ...preset.colors },
      },
    })

    if (import.meta.client) {
      try {
        localStorage.setItem(themePresetStorageKey, preset.id)
      } catch {
        // 隐私模式下写不进去就算了，不值得为此打扰用户
      }
    }
  }

  return {
    presets: themePresets,
    current,
    setPreset,
  }
}
