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

  // 规范地址用站点域名拼当前路径，不用 useRequestURL：预渲染时它拿不到真实域名。
  // 末尾补斜杠是因为产物是目录形态（about/index.html），托管方会把 /about
  // 用 308 送到 /about/，带斜杠的那个才是内容真正所在的地址。
  const base = site.url.replace(/\/+$/, '')
  const path = useRoute().path.replace(/\/+$/, '')
  const canonicalUrl = path === '' ? `${base}/` : `${base}${path}/`

  const noindex = options.indexable === false

  useHead({
    title: options.title ?? '',
    // noindex 的页面不声明规范地址
    ...(noindex ? {} : { link: [{ rel: 'canonical', href: canonicalUrl }] }),
  })

  useSeoMeta({
    description,
    ogTitle: options.title ? `${options.title} · ${siteName}` : siteName,
    ogDescription: description,
    ogType: 'website',
    ogImage: `${base}/og-image.png`,
    ogUrl: noindex ? undefined : canonicalUrl,
    twitterCard: 'summary_large_image',
  })

  if (noindex) {
    useSeoMeta({ robots: 'noindex' })
  }
}
