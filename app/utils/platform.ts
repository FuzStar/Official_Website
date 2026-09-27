// 平台名和图标只在这里维护一份，卡片和页脚都从这里取，以后加平台不用改多处。
// 图标必须是 nuxt.config 的 clientBundle.icons 里列过的，否则静态托管下不显示。
// QQ 频道在 simple-icons 里没有专用标，拿对话图标顶上。
const icons: Record<string, string> = {
  qq: 'simple-icons:qq',
  qqchannel: 'lucide:messages-square',
  discord: 'simple-icons:discord',
  telegram: 'simple-icons:telegram',
}

const names: Record<string, string> = {
  qq: 'QQ 群',
  qqchannel: 'QQ 频道',
  discord: 'Discord',
  telegram: 'Telegram',
}

export const platformIcon = (platform: string) => icons[platform] ?? 'lucide:link'

export const platformLabel = (platform: string) => names[platform] ?? '社群'
