// 成员列表数据：分类和成员都在这里维护，页面按配置渲染
// 这里列的全是组织内成员（staff），按分工分组；社区群成员不在此列
// 文案带 zh/en 两份，切换语言时自动跟随

export interface LocalizedText {
  zh: string
  en: string
}

export interface MemberCategory {
  id: string
  label: LocalizedText
  description?: LocalizedText
}

export interface MemberLink {
  /** 平台名，专有名词不用翻译 */
  label: string
  /** 点击打开的地址，与 copy 二选一 */
  url?: string
  /** 点击复制的内容（如 QQ 号），与 url 二选一 */
  copy?: string
  /** 图标名，如 i-simple-icons-qq；不填按 label 自动匹配，新图标需登记在 nuxt.config 的 icon.clientBundle.icons */
  icon?: string
}

export interface Member {
  name: string
  /** 对应 MemberCategory.id */
  category: string
  /** 头像：public 目录下的路径（如 /avatars/xx.png）或完整 URL，不填显示名字首字 */
  avatar?: string
  /** 个人头衔，不填则不显示 */
  title?: LocalizedText
  /** 一句话简介，写短句，卡片上最多两行 */
  bio?: LocalizedText
  /** 个人链接，可多个，按顺序展示 */
  links?: MemberLink[]
}

// 分类与章程第三章对应：管理组是执行机构，下面三个部门彼此平级。
// 没有成员的分类不会在页面上显示。
export const memberCategories: MemberCategory[] = [
  {
    id: 'management',
    label: { zh: '管理组', en: 'Mod team' },
    description: {
      zh: '日常运营、审核和拍板的事都归他们管。',
      en: 'Runs the day-to-day: operations, reviews, and decisions.',
    },
  },
  {
    id: 'creation',
    label: { zh: '创作组', en: 'Creators' },
    description: {
      zh: '拍片、剪辑、画画、写东西的人。',
      en: 'The ones shooting, editing, drawing, and writing.',
    },
  },
  {
    id: 'development',
    label: { zh: '开发部', en: 'Development' },
    description: {
      zh: '网站、工具和素材，谁要改站都找他们。',
      en: 'The website, tooling, and assets — talk to them about site changes.',
    },
  },
  {
    id: 'community',
    label: { zh: '社区部', en: 'Community' },
    description: {
      zh: '群里的日常秩序、活动组织，还有接新人的事。',
      en: 'Group logistics, events, and looking after newcomers.',
    },
  },
]

// 占位数据：上线前替换成真实成员
// 头像文件放 public/avatars/ 下，avatar 填 /avatars/文件名
export const members: Member[] = [
  {
    name: '无名',
    avatar: '/avatars/wuming.jpg',
    category: 'management',
    title: { zh: '站长', en: 'Owner' },
    bio: {
      zh: '负责拍板，也负责收拾各种烂摊子。',
      en: 'Calls the shots and cleans up messes.',
    },
    links: [
      { label: 'Telegram', url: 'https://telegram.me/nocturnemax' },
      { label: 'QQ', copy: '3750620867' },
      { label: 'GitHub', url: 'https://github.com/0x4E6F6374' },
    ],
  },
]
