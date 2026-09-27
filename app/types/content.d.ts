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
    recruitNote: string
    collaboration: string
  }

  export interface MemberLink {
    label: string
    url: string
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
    cover: string
    html: string
  }

  export const site: SiteContent
  export const members: Member[]
  export const friends: Friend[]
  export const notices: Notice[]
}
