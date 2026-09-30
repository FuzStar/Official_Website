import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { load as parseYaml } from 'js-yaml'

// 站点名和域名从 content/site.yaml 读，配 sitemap、canonical 时不再重复写一遍。
interface SiteYaml {
  url: string
  org: { name: string; nameZh: string }
}

const site = parseYaml(readFileSync(resolve(process.cwd(), 'content/site.yaml'), 'utf8')) as SiteYaml
const siteName = `${site.org.nameZh} ${site.org.name}`

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    './modules/content-layer',
  ],

  css: ['~/assets/css/main.css'],

  site: {
    url: site.url,
    name: siteName,
  },

  app: {
    // 极短的淡入淡出，只为消掉切页白闪，时长在 main.css 里控制
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'zh-CN' },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        // iOS 收藏夹要 PNG，SVG 不认
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
      meta: [
        // 移动端地址栏跟随品牌色，值跟 main.css 里的 --color-brand-500 保持一致
        { name: 'theme-color', content: '#E8914E' },
      ],
    },
  },

  icon: {
    // 图标全打进包里，静态托管时不请求任何在线接口
    // 没打包进去的图标宁可不显示，也不回落到 iconify API
    mode: 'css',
    fallbackToApi: false,
    clientBundle: {
      scan: true,
      // 配置文件里图标名是动态拼的，扫描不到，要用的逐个列这里
      icons: [
        'lucide:arrow-right',
        'lucide:arrow-up',
        'lucide:box',
        'lucide:check',
        'lucide:chevron-down',
        'lucide:chevron-right',
        'lucide:coffee',
        'lucide:copy',
        'lucide:external-link',
        'lucide:gamepad-2',
        'lucide:globe',
        'lucide:heart',
        'lucide:link',
        'lucide:mail',
        'lucide:megaphone',
        'lucide:menu',
        'lucide:messages-square',
        'lucide:paw-print',
        'lucide:pin',
        'lucide:sparkles',
        'lucide:users',
        'lucide:x',
        'simple-icons:bilibili',
        'simple-icons:discord',
        'simple-icons:github',
        'simple-icons:qq',
        'simple-icons:telegram',
        'simple-icons:x',
      ],
    },
  },

  sitemap: {
    // 404 页进 sitemap 没有意义
    exclude: [/\/404$/],
  },

  nitro: {
    // 整站静态化，构建时把页面全部生成好，托管方只管发静态文件
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  compatibilityDate: '2026-09-27',
})
