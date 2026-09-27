<script setup lang="ts">
import { eggs } from '#content'

// 触发方式写在这里，文案在 content/eggs.yaml——那边清空某条的 text 就等于关掉它。
// 两条原则：在输入框里按键盘一律让路，别跟正常输入抢；动效跟随系统的"减少动态效果"。

interface FallStar {
  id: number
  left: number
  size: number
  delay: number
  duration: number
}

// 源码彩蛋：v-html 塞进去的字符串会被解析成注释节点，页面上不占位、不显形，
// 只有右键查看源代码才看得到。注释里出现 -- 会让解析提前结束，统一换成破折号。
const sourceComment = computed(() =>
  eggs.comment ? `<!-- ${eggs.comment.replace(/--/g, '—')} -->` : '',
)

const route = useRoute()

const toast = ref('')
const stars = ref<FallStar[]>([])
const reducedMotion = ref(false)

let toastTimer: ReturnType<typeof setTimeout> | undefined
let starTimer: ReturnType<typeof setTimeout> | undefined
let starId = 0
let pawOn = false

function showToast(text: string) {
  if (!text) return
  toast.value = text
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.value = ''
  }, 8000)
}

function rainStars() {
  if (reducedMotion.value) return

  stars.value = Array.from({ length: 34 }, () => ({
    id: starId++,
    left: Math.random() * 100,
    size: 14 + Math.random() * 16,
    delay: Math.random() * 1.2,
    duration: 2.6 + Math.random() * 1.8,
  }))

  clearTimeout(starTimer)
  starTimer = setTimeout(() => {
    stars.value = []
  }, 6200)
}

const konami = createSequenceMatcher([
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
])
const typedWord = createTypedWordMatcher(eggs.typing.keys)

function onKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null
  const tag = target?.tagName ?? ''
  if (target?.isContentEditable || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

  if (eggs.konami && konami(event.key)) {
    showToast(eggs.konami)
    rainStars()
  }

  if (eggs.typing.text && typedWord(event.key)) showToast(eggs.typing.text)
}

// 光标彩蛋跟着地址栏走：站内跳转会丢掉 ?paw=1，所以每次换页都重新判断一次，
// 只有刚从关变开的时候才提示，免得每翻一页都弹。
function syncPaw() {
  const on = new URLSearchParams(window.location.search).get('paw') === '1'
  document.documentElement.classList.toggle('paw-cursor', on)

  if (on && !pawOn) showToast(eggs.paw)
  pawOn = on
}

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.addEventListener('keydown', onKeydown)
  syncPaw()

  if (eggs.console) {
    console.log('%c星绒社区 FuzzStar', 'font-size:16px;font-weight:700;color:#d27438')
    console.log(eggs.console)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  clearTimeout(toastTimer)
  clearTimeout(starTimer)
  document.documentElement.classList.remove('paw-cursor')
})

watch(() => route.fullPath, syncPaw)
</script>

<template>
  <span v-if="sourceComment" class="hidden" v-html="sourceComment" />

  <div
    v-if="stars.length"
    class="pointer-events-none fixed inset-0 z-90 overflow-hidden"
    aria-hidden="true"
  >
    <SiteStarMark
      v-for="star in stars"
      :key="star.id"
      class="egg-star text-brand-400"
      :stroke-width="1.2"
      :style="{
        left: `${star.left}%`,
        width: `${star.size}px`,
        height: `${star.size}px`,
        animationDelay: `${star.delay}s`,
        animationDuration: `${star.duration}s`,
      }"
    />
  </div>

  <Transition name="egg-toast">
    <button
      v-if="toast"
      type="button"
      class="sticker-card fixed bottom-6 left-6 z-100 flex max-w-xs items-start gap-2.5 bg-cream-50 px-4 py-3 text-left text-sm leading-relaxed font-medium text-ink-800"
      @click="toast = ''"
    >
      <UIcon name="lucide:sparkles" class="mt-0.5 size-4 shrink-0 text-brand-600" />
      <span>{{ toast }}</span>
    </button>
  </Transition>
</template>
