// 成员列表数据：分类和成员都在这里维护，页面按配置渲染
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

export interface Member {
  name: string
  /** 对应 MemberCategory.id */
  category: string
  /** 个人头衔，不填则不显示 */
  title?: LocalizedText
  /** 个人主页或社交链接，不填则不显示 */
  link?: string
}

export const memberCategories: MemberCategory[] = [
  {
    id: 'management',
    label: { zh: '管理组', en: 'Management' },
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
    id: 'members',
    label: { zh: '普通成员', en: 'Members' },
    description: {
      zh: '社区的日常主力，缺人手时也来搭把手。',
      en: 'The regulars who keep the community going.',
    },
  },
]

// 占位数据：上线前替换成真实成员
export const members: Member[] = [
  {
    name: '示例·站长',
    category: 'management',
    title: { zh: '站长', en: 'Owner' },
    link: 'https://example.com',
  },
  {
    name: '示例·副站',
    category: 'management',
    title: { zh: '日常运营', en: 'Operations' },
  },
  {
    name: '示例·剪辑',
    category: 'creation',
    title: { zh: '视频剪辑', en: 'Video editor' },
  },
  {
    name: '示例·画师',
    category: 'creation',
    title: { zh: '插画', en: 'Illustrator' },
  },
  {
    name: '示例·成员',
    category: 'members',
  },
]
