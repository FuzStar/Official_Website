// content/ 目录里的文件在构建期被解析成这些结构，页面从 '#content' 取用。
// 字段和 content/*.yaml 里的注释一一对应。

declare module '#content' {
  export interface Group {
    platform: string
    name: string
    handle: string
    url: string
    note: string
  }

  export interface Role {
    title: string
    slots: string
    // duty 与 requirement 在 content/site.yaml 里按 markdown 写，
    // 构建期已渲染成 HTML，页面上用 v-html 输出
    duty: string
    requirement: string
  }

  export interface SiteContent {
    org: {
      name: string
      nameZh: string
      badge: string
      tagline: string
      intro: string
    }
    url: string
    email: string
    icp: string
    icpUrl: string
    groups: Group[]
    roles: Role[]
    // "加入我们"页开头那句，讲清这页有两条路：进社群、进工作团队
    joinLead: string
    // 招募说明与通用要求，markdown 渲染后的 HTML
    recruitNote: string
    // 首页"友链与合作"横幅上的一句话摘要，纯文本
    collaborationLead: string
    // "友链与合作"页底部的合作说明，markdown 渲染后的 HTML
    collaboration: string
  }

  export interface AboutSection {
    title: string
    // 在 content/about.yaml 里按 markdown 写，构建期已渲染成 HTML
    body: string
  }

  export interface MemberLink {
    label: string
    url?: string
    // 只有账号、没有可跳转链接的（比如 Discord 用户名）填这里，卡片上显示成不可点的文本
    value?: string
    icon?: string
  }

  export interface Member {
    name: string
    avatar: string
    role: string
    bio: string
    qq: string
    email: string
    links: MemberLink[]
  }

  export interface Friend {
    name: string
    url: string
    description: string
    logo: string
  }

  export interface Notice {
    slug: string
    title: string
    date: string
    type: 'notice' | 'article'
    pinned: boolean
    summary: string
    html: string
  }

  // 站点彩蛋，文案在 content/eggs.yaml。每条的 text 为空就等于关掉它，
  // 所以页面拿到的一律是字符串，不是可选字段。
  export interface EggsContent {
    konami: string
    typing: { keys: string; text: string }
    paw: string
    night: string
    year: string
    lost: string
    console: string
    comment: string
  }

  export const site: SiteContent
  export const about: { lead: string; sections: AboutSection[] }
  export const members: Member[]
  export const friends: Friend[]
  export const notices: Notice[]
  export const eggs: EggsContent
}
