/**
 * FuzzStar 官网的全局信息，全部收口在这一个文件。
 * 页面里但凡要用到域名、邮箱、社群链接，一律从这里 import，
 * 保证以后换链接只改这一处。
 */
export const siteConfig = {
  name: 'FuzzStar',
  /** 站点正式域名，canonical / sitemap 都以它为准 */
  url: 'https://fuzstar.org',
  /** 创始人邮箱 */
  email: 'max@fuzstar.org',
  /** 社区入口：想加组织的人先进群，再联系管理组走审核 */
  communities: {
    qq: 'https://qm.qq.com/q/bbhpq1IXu',
    discord: 'https://discord.gg/GAAKPFD9K',
  },
  /** ICP 备案号，拿到之后填在这里，填了页脚才会渲染 */
  icp: '',
  /** 备案查询地址，跟着备案号一起出现 */
  icpUrl: 'https://beian.miit.gov.cn',
} as const

export type SiteConfig = typeof siteConfig
