import { site } from '#content'

interface SiteSeoOptions {
  title?: string
  description?: string
  /** 传 false 表示列表页这类不需要被索引的页面 */
  indexable?: boolean
}

// 站点名和 og 图路径由这里统一拼，页面只管传标题和描述。
export function useSiteSeo(options: SiteSeoOptions = {}) {
  const siteName = `${site.org.nameZh} ${site.org.name}`
  const description = options.description || site.org.tagline || site.org.intro || undefined

  useHead({ title: options.title ?? '' })

  useSeoMeta({
    description,
    ogTitle: options.title ? `${options.title} · ${siteName}` : siteName,
    ogDescription: description,
    ogType: 'website',
    ogImage: `${site.url}/og-image.png`,
    twitterCard: 'summary_large_image',
  })

  if (options.indexable === false) {
    useSeoMeta({ robots: 'noindex' })
  }
}
