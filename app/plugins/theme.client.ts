import {
  themePresets,
  themePresetStorageKey,
} from '#shared/config/theme-presets'

/**
 * 启动时把用户上次挑的配色捞出来，
 * 免得每次刷新都跳回默认的「星云」。
 */
export default defineNuxtPlugin(() => {
  let saved: string | null = null
  try {
    saved = localStorage.getItem(themePresetStorageKey)
  } catch {
    // 读不出来就用默认主题，不影响打开网站
  }

  if (!saved) return

  const preset = themePresets.find(item => item.id === saved)
  if (preset) {
    useThemePreset().setPreset(preset.id)
  }
})
