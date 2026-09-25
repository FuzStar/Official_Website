/**
 * 站内三套主题预设。
 * colors 里填的是 Tailwind 调色板的名字，运行时写进
 * Nuxt UI 的 ui.colors，整站配色立刻跟着换。
 * swatch 是切换器上展示的色卡，必须写完整的 class 字符串，
 * 否则 Tailwind 扫描不到、样式生成不出来。
 */
export interface ThemePreset {
  /** 同时作为 i18n 里 theme.presets.<id> 的翻译键 */
  id: string
  swatch: [string, string]
  colors: {
    primary: string
    secondary: string
    neutral: string
  }
}

const nebula: ThemePreset = {
  id: 'nebula',
  swatch: ['bg-violet-500', 'bg-amber-500'],
  colors: { primary: 'violet', secondary: 'amber', neutral: 'zinc' },
}

const sunrise: ThemePreset = {
  id: 'sunrise',
  swatch: ['bg-orange-500', 'bg-pink-500'],
  colors: { primary: 'orange', secondary: 'pink', neutral: 'stone' },
}

const grove: ThemePreset = {
  id: 'grove',
  swatch: ['bg-teal-500', 'bg-sky-500'],
  colors: { primary: 'teal', secondary: 'sky', neutral: 'slate' },
}

export const themePresets: ThemePreset[] = [nebula, sunrise, grove]

export const defaultThemePreset = nebula

/** 用户选过的预设存在这里，下次打开接着用 */
export const themePresetStorageKey = 'fuzzstar.theme-preset'
