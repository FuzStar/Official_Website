<script setup lang="ts">
const props = defineProps<{ value: string; label?: string }>()

const copied = ref(false)

async function copy() {
  try {
    await navigator.clipboard.writeText(props.value)
    copied.value = true
    window.setTimeout(() => {
      copied.value = false
    }, 1600)
  } catch {
    // 剪贴板权限拿不到就算了，号码本身就印在页面上，手动选中一样能复制
  }
}
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center gap-1.5 rounded-full border-2 border-ink-900 bg-cream-50 px-3 py-1 text-xs font-bold text-ink-800 shadow-sticker-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker"
    @click="copy"
  >
    <UIcon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-3.5" />
    {{ copied ? '已复制' : (label ?? '复制') }}
  </button>
</template>
