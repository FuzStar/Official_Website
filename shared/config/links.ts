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
    name: '站长的个人主页',
    url: 'https://0xnm.cn',
    description: {
      zh: '无名的主页',
      en: 'My Home Page',
    },
  },
]
