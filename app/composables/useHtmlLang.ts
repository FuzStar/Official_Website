/**
 * 让 <html lang> 跟着当前语言走。
 * 模块自带的自动注入要开 strictSeo（会接管 canonical/hreflang），
 * 这里单独补 lang，不动已验证过的 SEO 标签。
 */
export function useHtmlLang() {
  const { locale } = useI18n()
  const { public: publicConfig } = useRuntimeConfig()

  const lang = computed(() => {
    // 模块生成的 locales 类型是空对象，按 nuxt.config 里的实际字段断言
    const locales = publicConfig.i18n.locales as { code: string, language?: string }[]
    const current = locales.find(l => l.code === locale.value)
    return current?.language ?? locale.value
  })

  useHead({ htmlAttrs: { lang } })
}
