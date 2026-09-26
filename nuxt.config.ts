import { siteConfig } from './shared/config/site'

// 站点级别的配置。域名、语言、模块都只在这里声明一次，
// 页面代码统一从 #shared 引数据，不散落硬编码。
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
  ],

  css: ['~/assets/css/main.css'],

  site: {
    url: siteConfig.url,
    name: siteConfig.name,
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        // iOS 的收藏夹不认 SVG，补一张 PNG
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
      meta: [
        // 移动端浏览器地址栏跟随品牌色
        { name: 'theme-color', content: '#8b5cf6' },
      ],
    },
  },

  i18n: {
    // 中文是主站（不带前缀），英文走 /en 前缀
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    locales: [
      { code: 'zh', language: 'zh-CN', name: '简体中文', file: 'zh.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'fuzzstar-lang',
      redirectOn: 'root',
    },
  },

  icon: {
    // 图标全部打进客户端包，静态托管时不依赖任何在线接口
    // 打包里没有的图标宁可不显示，也不去请求 iconify API
    fallbackToApi: false,
    clientBundle: {
      scan: true,
      // 配置文件里的图标名是动态的，扫描不到，要打包的逐个列在这里
      // 格式是 前缀:名字，成员配置里写 i- 前缀形式（如 i-simple-icons-qq）
      icons: [
        'lucide:check',
        'lucide:copy',
        'lucide:globe',
        'lucide:link',
        'lucide:x',
        'simple-icons:bilibili',
        'simple-icons:discord',
        'simple-icons:github',
        'simple-icons:qq',
        'simple-icons:telegram',
        'simple-icons:x',
        'simple-icons:youtube',
      ],
    },
  },

  sitemap: {
    // 404 页在 sitemap 里没有意义，直接排除
    exclude: [/\/404$/],
  },

  compatibilityDate: '2026-09-25',
})
