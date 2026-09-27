import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { addTemplate, defineNuxtModule, updateTemplates } from '@nuxt/kit'
import matter from 'gray-matter'
import { load as parseYaml } from 'js-yaml'
import MarkdownIt from 'markdown-it'

// 构建期把 content/ 下的文件读成数据，页面 import '#content' 即可拿到。
// 数据在构建时就固定了，客户端不背解析器，也不依赖任何接口。
const md = new MarkdownIt({ html: false, linkify: true })

interface NoticeFrontmatter {
  title?: string
  date?: Date | string
  type?: string
  pinned?: boolean
  summary?: string
  cover?: string
}

// frontmatter 里的日期会被 yaml 解析成 Date，统一收敛成 YYYY-MM-DD
function toDateString(value: Date | string | undefined): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return typeof value === 'string' ? value : ''
}

export default defineNuxtModule({
  meta: { name: 'content-layer' },

  setup(_options, nuxt) {
    const contentDir = resolve(nuxt.options.rootDir, 'content')
    const noticeDir = join(contentDir, 'notice')

    const readYaml = (file: string) => {
      const path = join(contentDir, file)
      if (!existsSync(path)) return null

      const raw = readFileSync(path, 'utf8')
      // js-yaml 5 遇到"整份文件只有注释"会抛 expected a document, but the input is empty。
      // 这种文件是管理组还没填内容，当成空处理；真的写错语法还是要让它报出来。
      const hasContent = raw
        .split('\n')
        .some((line) => line.trim() !== '' && !line.trimStart().startsWith('#'))

      if (!hasContent) return null
      return parseYaml(raw) ?? null
    }

    const readNotices = () => {
      if (!existsSync(noticeDir)) return []

      return readdirSync(noticeDir)
        .filter((file) => file.endsWith('.md'))
        .map((file) => {
          const { data, content } = matter(readFileSync(join(noticeDir, file), 'utf8'))
          const fm = data as NoticeFrontmatter

          return {
            slug: file.replace(/\.md$/, ''),
            title: fm.title ?? '',
            date: toDateString(fm.date),
            type: fm.type === 'article' ? 'article' : 'notice',
            pinned: fm.pinned === true,
            summary: fm.summary ?? '',
            cover: fm.cover ?? '',
            html: md.render(content).trim(),
          }
        })
        .sort((a, b) => {
          if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
          return b.date.localeCompare(a.date)
        })
    }

    const template = addTemplate({
      filename: 'content/data.mjs',
      write: true,
      getContents: () => {
        const site = readYaml('site.yaml') ?? {}
        const members = readYaml('members.yaml') ?? []
        const friends = readYaml('friends.yaml') ?? []
        const notices = readNotices()

        return [
          `export const site = ${JSON.stringify(site, null, 2)}`,
          `export const members = ${JSON.stringify(members, null, 2)}`,
          `export const friends = ${JSON.stringify(friends, null, 2)}`,
          `export const notices = ${JSON.stringify(notices, null, 2)}`,
          '',
        ].join('\n')
      },
    })

    nuxt.options.alias['#content'] = template.dst

    // 公告详情是动态路由，没有站内链接指向就抓不到，这里显式列出来让它一起预渲染
    nuxt.options.nitro.prerender = nuxt.options.nitro.prerender || {}
    nuxt.options.nitro.prerender.routes = [
      ...(nuxt.options.nitro.prerender.routes || []),
      ...readNotices().map((notice) => `/news/${notice.slug}`),
    ]

    // dev 下改 content/ 里的文件，模板跟着重建，不用手动重启
    nuxt.hook('builder:watch', (_event, path) => {
      if (path.startsWith('content/')) void updateTemplates()
    })
  },
})
