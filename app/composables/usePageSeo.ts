import { siteConfig } from '#shared/config/site'

/**
 * 每个页面共用的 SEO 信息：标题、描述、canonical 和双语 alternate。
 * 标题传页面自己的部分，站名和分隔符由 app.vue 的 titleTemplate 统一拼。
 */
export function usePageSeo(title: string, description: string) {
  const localePath = useLocalePath()
  const switchLocalePath = useSwitchLocalePath()
  const route = useRoute()
  const { locale } = useI18n()

  // route.path 本身带语言前缀，正好就是各语言下的规范地址
  const canonicalUrl = computed(() => new URL(route.path, siteConfig.url).href)
  const zhUrl = computed(() => siteConfig.url + switchLocalePath('zh'))
  const enUrl = computed(() => siteConfig.url + switchLocalePath('en'))

  useSeoMeta({
    title,
    description,
    ogTitle: `${title} · ${siteConfig.name}`,
    ogDescription: description,
    ogUrl: canonicalUrl,
    ogSiteName: siteConfig.name,
    ogType: 'website',
    ogLocale: computed(() => (locale.value === 'zh' ? 'zh_CN' : 'en_US')),
    ogLocaleAlternate: computed(() => (locale.value === 'zh' ? 'en_US' : 'zh_CN')),
    twitterCard: 'summary',
  })

  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl },
      { rel: 'alternate', hreflang: 'zh-CN', href: zhUrl },
      { rel: 'alternate', hreflang: 'en-US', href: enUrl },
      // 中文是主站，兜底指回中文版
      { rel: 'alternate', hreflang: 'x-default', href: zhUrl },
    ],
  })
}
