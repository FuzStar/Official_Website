// 友情链接数据：页面按这个列表渲染，顺序即展示顺序
// description 带 zh/en 两份，不填就不显示

export interface FriendLink {
  name: string
  url: string
  description?: { zh: string, en: string }
}

// 占位数据：上线前替换成真实友链
export const friendLinks: FriendLink[] = [
  {
    name: '示例站点',
    url: 'https://example.com',
    description: {
      zh: '把这里换成真实友站的介绍。',
      en: 'Replace this with a real description.',
    },
  },
  {
    name: '示例社区',
    url: 'https://example.org',
    description: {
      zh: '把这里换成真实友站的介绍。',
      en: 'Replace this with a real description.',
    },
  },
]
