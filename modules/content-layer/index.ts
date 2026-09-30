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
}

// frontmatter 里的日期会被 yaml 解析成 Date，统一收敛成 YYYY-MM-DD
function toDateString(value: Date | string | undefined): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return typeof value === 'string' ? value : ''
}

interface MemberEntry {
  avatar?: string
  qq?: string
  [key: string]: unknown
}

// 名单里没写 avatar 但填了 qq 的，取该 QQ 的当前头像：链接直接给浏览器，
// 对方换了头像页面跟着变。号码写错或接口不认时前端会回退成默认头像，不留破图。
// 想固定用某张图就填 avatar，以那边为准。
const withAvatar = (members: MemberEntry[]) =>
  members.map((member) => ({
    ...member,
    avatar: member.avatar || (member.qq ? `https://q1.qlogo.cn/g?b=qq&nk=${member.qq}&s=140` : ''),
  }))

// 岗位的职责与要求、招募说明、合作说明按 markdown 写，构建期渲染成 HTML 交给页面。
// 内容都在仓库里，没有外部输入，页面直接 v-html 是安全的。
const renderRich = (value: unknown): string =>
  typeof value === 'string' && value.trim() ? md.render(value).trim() : ''

// 单行说明用行内渲染：能写 **加粗** 和 `代码`，但不会像 renderRich 那样包一层 <p>，
// 可以直接放进 <li> 或标题旁边。
const renderInline = (value: unknown): string =>
  typeof value === 'string' && value.trim() ? md.renderInline(value).trim() : ''

interface AboutSectionEntry {
  title?: unknown
  body?: unknown
}

// "关于我们"页的板块列表，每块的正文按 markdown 写，构建期渲染成 HTML。
// 板块数量由内容决定，页面只管按顺序铺开，加一块不用改代码。
const prepareAbout = (raw: { lead?: unknown; sections?: AboutSectionEntry[] } | null) => ({
  lead: typeof raw?.lead === 'string' ? raw.lead : '',
  sections: (Array.isArray(raw?.sections) ? raw.sections : []).map((section) => ({
    title: typeof section?.title === 'string' ? section.title : '',
    body: renderRich(section?.body),
  })),
})

// 只有这几个长文字字段走 markdown，标题、人数这类短字段保持原样，
// 免得管理组写岗位名时无意间敲进个星号就被当成强调语法吃掉。
function prepareSite(raw: Record<string, unknown>) {
  const roles = Array.isArray(raw.roles) ? (raw.roles as Record<string, unknown>[]) : []

  return {
    ...raw,
    recruitNote: renderRich(raw.recruitNote),
    collaboration: renderRich(raw.collaboration),
    roles: roles.map((role) => ({
      ...role,
      duty: renderRich(role.duty),
      requirement: renderRich(role.requirement),
    })),
  }
}

// 短字段的统一收敛：不是字符串就给空串，留空即等于关掉这一块。
// 页面只判断有没有内容，不判断字段在不在。
const asText = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')

function prepareEggs(raw: Record<string, unknown> | null) {
  const typing = (raw?.typing ?? {}) as Record<string, unknown>

  return {
    konami: asText((raw?.konami as Record<string, unknown>)?.text),
    typing: { keys: asText(typing.keys), text: asText(typing.text) },
    paw: asText((raw?.paw as Record<string, unknown>)?.text),
    night: asText((raw?.night as Record<string, unknown>)?.text),
    year: asText((raw?.year as Record<string, unknown>)?.text),
    lost: asText((raw?.lost as Record<string, unknown>)?.text),
    console: asText(raw?.console),
    comment: asText(raw?.comment),
  }
}

interface MinecraftAddressEntry {
  platform?: unknown
  label?: unknown
  host?: unknown
  port?: unknown
  note?: unknown
}

interface MinecraftAccessEntry {
  title?: unknown
  body?: unknown
}

// MC 服务器页。地址、端口这类短字段保持原样，说明文字走 markdown。
// 地址和登录方式的条数由内容决定，页面只管按顺序铺开，加一条不用改代码。
function prepareMinecraft(raw: Record<string, unknown> | null) {
  const status = (raw?.status ?? {}) as Record<string, unknown>
  const addresses = Array.isArray(raw?.addresses)
    ? (raw.addresses as MinecraftAddressEntry[])
    : []
  const access = Array.isArray(raw?.access) ? (raw.access as MinecraftAccessEntry[]) : []

  return {
    name: asText(raw?.name),
    lead: asText(raw?.lead),
    status: { java: asText(status.java) },
    addresses: addresses.map((item) => ({
      platform: asText(item?.platform),
      label: asText(item?.label),
      host: asText(item?.host),
      // 端口在 yaml 里可能被读成字符串也可能被读成数字，统一收敛成字符串
      port: item?.port === undefined || item?.port === null ? '' : String(item.port),
      note: asText(item?.note),
    })),
    access: access.map((item) => ({
      title: asText(item?.title),
      body: renderRich(item?.body),
    })),
    about: renderRich(raw?.about),
    rules: renderRich(raw?.rules),
    penalty: renderRich(raw?.penalty),
    joinNote: asText(raw?.joinNote),
  }
}

interface GuideEntry {
  cmd?: unknown
  desc?: unknown
}

interface GuideGroup {
  title?: unknown
  entries?: GuideEntry[]
}

interface GuideSection {
  id?: unknown
  title?: unknown
  lead?: unknown
  groups?: GuideGroup[]
  note?: unknown
}

// 游戏服教程页。一块一节，节里再分几组指令。
// 节、组、条目都由内容决定数量，页面只管按顺序铺开，加一块不用改代码。
function prepareGuide(raw: Record<string, unknown> | null) {
  const sections = Array.isArray(raw?.sections) ? (raw.sections as GuideSection[]) : []

  return {
    lead: asText(raw?.lead),
    sections: sections.map((section) => ({
      id: asText(section?.id),
      title: asText(section?.title),
      lead: asText(section?.lead),
      groups: (Array.isArray(section?.groups) ? section.groups : []).map((group) => ({
        title: asText(group?.title),
        entries: (Array.isArray(group?.entries) ? group.entries : []).map((entry) => ({
          cmd: asText(entry?.cmd),
          // 说明是单行，走行内渲染
          desc: renderInline(entry?.desc),
        })),
      })),
      note: renderRich(section?.note),
    })),
  }
}

export default defineNuxtModule({
  meta: { name: 'content-layer' },

  setup(_options, nuxt) {
    const contentDir = resolve(nuxt.options.rootDir, 'content')
    const noticeDir = join(contentDir, 'notice')

    // js-yaml 的 load 返回 unknown，这里按调用处声明的形状交出去。
    // 文件缺失、或整份只有注释时给 null，由调用处决定空值怎么办。
    const readYaml = <T>(file: string): T | null => {
      const path = join(contentDir, file)
      if (!existsSync(path)) return null

      const raw = readFileSync(path, 'utf8')
      // js-yaml 5 遇到"整份文件只有注释"会抛 expected a document, but the input is empty。
      // 这种文件是管理组还没填内容，当成空处理；真的写错语法还是要让它报出来。
      const hasContent = raw
        .split('\n')
        .some((line) => line.trim() !== '' && !line.trimStart().startsWith('#'))

      if (!hasContent) return null
      return (parseYaml(raw) ?? null) as T | null
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
        const site = prepareSite(readYaml<Record<string, unknown>>('site.yaml') ?? {})
        const about = prepareAbout(readYaml<{ lead?: unknown; sections?: AboutSectionEntry[] }>('about.yaml'))
        const members = withAvatar(readYaml<MemberEntry[]>('members.yaml') ?? [])
        const friends = readYaml<Record<string, unknown>[]>('friends.yaml') ?? []
        const notices = readNotices()
        const eggs = prepareEggs(readYaml<Record<string, unknown>>('eggs.yaml'))
        const minecraft = prepareMinecraft(readYaml<Record<string, unknown>>('minecraft.yaml'))
        const minecraftGuide = prepareGuide(readYaml<Record<string, unknown>>('minecraft-guide.yaml'))

        return [
          `export const site = ${JSON.stringify(site, null, 2)}`,
          `export const about = ${JSON.stringify(about, null, 2)}`,
          `export const members = ${JSON.stringify(members, null, 2)}`,
          `export const friends = ${JSON.stringify(friends, null, 2)}`,
          `export const notices = ${JSON.stringify(notices, null, 2)}`,
          `export const eggs = ${JSON.stringify(eggs, null, 2)}`,
          `export const minecraft = ${JSON.stringify(minecraft, null, 2)}`,
          `export const minecraftGuide = ${JSON.stringify(minecraftGuide, null, 2)}`,
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
