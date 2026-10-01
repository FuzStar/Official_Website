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

  // 下挂部门也有一套自己的职责与要求，留空的字段页面不渲染
  export interface RoleGroup {
    title: string
    slots: string
    // 标题旁边那句小字说明，纯文本。比如"方块运营 · Minecraft 社区服运营组"
    note: string
    // 在 content/site.yaml 里按 markdown 写，构建期已渲染成 HTML
    duty: string
    requirement: string
  }

  export interface Role {
    title: string
    slots: string
    // 部门名旁边那句小字说明，纯文本
    note: string
    // duty 与 requirement 在 content/site.yaml 里按 markdown 写，
    // 构建期已渲染成 HTML，页面上用 v-html 输出
    duty: string
    requirement: string
    // 下挂部门，没有就空数组
    groups: RoleGroup[]
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

  export interface MinecraftAddress {
    // java / bedrock，决定卡片上挂哪个图标
    platform: string
    label: string
    host: string
    // 端口留空表示走 SRV，玩家不用填
    port: string
    note: string
  }

  export interface MinecraftAccess {
    title: string
    // 在 content/minecraft.yaml 里按 markdown 写，构建期已渲染成 HTML
    body: string
  }

  export interface MinecraftContent {
    name: string
    lead: string
    // 玩家实际要连的地址，留空则页面不显示实时状态徽章
    status: { java: string }
    addresses: MinecraftAddress[]
    access: MinecraftAccess[]
    // about / rules / penalty 在 content/minecraft.yaml 里按 markdown 写，
    // 构建期已渲染成 HTML
    about: string
    rules: string
    penalty: string
    joinNote: string
  }

  export interface GuideEntry {
    // 指令原文。空字符串表示这条只有说明、没有指令
    cmd: string
    // 在 content/minecraft-guide.yaml 里按行内 markdown 写，构建期渲染成 HTML 片段
    desc: string
  }

  export interface GuideGroup {
    title: string
    entries: GuideEntry[]
  }

  export interface GuideSection {
    // 页面锚点，别的页面可以 /minecraft/guide#id 直接跳过来
    id: string
    title: string
    lead: string
    groups: GuideGroup[]
    // 这一块末尾的补充说明，markdown 整段渲染后的 HTML
    note: string
  }

  export interface MinecraftGuideContent {
    lead: string
    sections: GuideSection[]
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
  export const minecraft: MinecraftContent
  export const minecraftGuide: MinecraftGuideContent
}
