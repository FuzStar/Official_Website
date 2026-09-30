<script setup lang="ts">
const props = defineProps<{ host: string }>()

interface Snapshot {
  online: boolean
  players: number | null
  max: number | null
}

interface McStatusResponse {
  online?: boolean
  players?: { online?: number; max?: number }
}

interface McSrvStatResponse {
  online?: boolean
  players?: { online?: number; max?: number }
}

type State = 'loading' | 'online' | 'offline' | 'unknown'

const state = ref<State>('loading')
const snapshot = ref<Snapshot | null>(null)

const TIMEOUT = 8000

const counts = (players: { online?: number; max?: number } | undefined) => ({
  players: typeof players?.online === 'number' ? players.online : null,
  max: typeof players?.max === 'number' ? players.max : null,
})

// 这两个服务都自己解析 SRV 记录，所以只传域名就行，带上端口反而会查不到。
async function fromMcStatus(host: string, signal: AbortSignal): Promise<Snapshot> {
  const response = await fetch(
    `https://api.mcstatus.io/v2/status/java/${encodeURIComponent(host)}`,
    { signal },
  )
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as McStatusResponse
  return { online: data.online === true, ...counts(data.players) }
}

async function fromMcSrvStat(host: string, signal: AbortSignal): Promise<Snapshot> {
  const response = await fetch(`https://api.mcsrvstat.us/3/${encodeURIComponent(host)}`, {
    signal,
  })
  if (!response.ok) throw new Error(`HTTP ${response.status}`)

  const data = (await response.json()) as McSrvStatResponse
  return { online: data.online === true, ...counts(data.players) }
}

async function withTimeout<T>(run: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT)

  try {
    return await run(controller.signal)
  } finally {
    window.clearTimeout(timer)
  }
}

// 说在线的结果直接采信；说离线的先记着，等另一个源也这么说才作数。
// 只认第一个源的话，它那边一抖动就会把好端端开着的服务器报成离线。
async function probe(host: string): Promise<Snapshot> {
  const attempts = [fromMcStatus, fromMcSrvStat]
  let offline: Snapshot | null = null
  let lastError: unknown = null

  for (const attempt of attempts) {
    try {
      const result = await withTimeout((signal) => attempt(host, signal))
      if (result.online) return result
      offline = result
    } catch (error) {
      lastError = error
    }
  }

  if (offline) return offline
  throw lastError
}

onMounted(async () => {
  try {
    const result = await probe(props.host)
    snapshot.value = result
    state.value = result.online ? 'online' : 'offline'
  } catch {
    // 两个源都没答上话。这时候说离线是撒谎，留个中性状态
    state.value = 'unknown'
  }
})

const dotClass = computed(() => {
  if (state.value === 'online') return 'bg-brand-500'
  if (state.value === 'offline') return 'bg-ink-400'
  return 'bg-ink-300'
})

const label = computed(() => {
  if (state.value === 'loading') return '正在查询状态'
  if (state.value === 'online') return '服务器在线'
  if (state.value === 'offline') return '服务器离线'
  return '状态未知'
})

const detail = computed(() => {
  if (state.value === 'online') {
    const value = snapshot.value
    if (!value || value.players === null || value.max === null) return ''
    return `${value.players} / ${value.max} 人`
  }

  if (state.value === 'offline') return '可能在维护，去群里问一声'
  if (state.value === 'unknown') return '查询没成功，稍后刷新看看'
  return ''
})
</script>

<template>
  <div
    class="mt-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border-2 border-ink-900 bg-cream-50 px-4 py-2.5 shadow-sticker-sm"
  >
    <span class="relative flex size-2.5 shrink-0">
      <span
        v-if="state === 'online'"
        class="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-60"
        aria-hidden="true"
      />
      <span class="relative inline-flex size-2.5 rounded-full" :class="dotClass" />
    </span>

    <span class="text-sm font-bold text-ink-900">{{ label }}</span>
    <span v-if="detail" class="text-xs text-ink-500">{{ detail }}</span>
  </div>
</template>
