<script setup lang="ts">
import type { Member, MemberLink } from '#shared/config/members'

const props = defineProps<{ member: Member }>()

const { t, locale } = useI18n()

// 头像加载失败时退回名字首字
const avatarFailed = ref(false)

// 配置里没写 icon 时按 label 自动匹配
// 图标名写在这里是为了能被 scan 打进客户端包
const labelIcons: Record<string, string> = {
  github: 'i-lucide-github',
  gitlab: 'i-lucide-gitlab',
  website: 'i-lucide-globe',
  官网: 'i-lucide-globe',
  qq: 'i-simple-icons-qq',
  bilibili: 'i-simple-icons-bilibili',
  b站: 'i-simple-icons-bilibili',
  telegram: 'i-simple-icons-telegram',
  discord: 'i-simple-icons-discord',
  x: 'i-simple-icons-x',
  youtube: 'i-simple-icons-youtube',
}

function iconFor(link: MemberLink): string | undefined {
  return link.icon ?? labelIcons[link.label.toLowerCase()] ?? (link.copy ? 'i-lucide-copy' : undefined)
}

function pick(text?: { zh: string, en: string }): string | undefined {
  if (!text) return undefined
  return text[locale.value as keyof typeof text] ?? text.zh
}

interface CopyState {
  key: string
  ok: boolean
}

const copyState = ref<CopyState | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | undefined

onUnmounted(() => clearTimeout(copyTimer))

function feedbackKey(link: MemberLink): string {
  return `${link.label}:${link.copy}`
}

function stateFor(link: MemberLink): CopyState | undefined {
  if (copyState.value?.key === feedbackKey(link)) return copyState.value
  return undefined
}

function copyIcon(link: MemberLink): string {
  const state = stateFor(link)
  if (state) return state.ok ? 'i-lucide-check' : 'i-lucide-x'
  return iconFor(link) ?? 'i-lucide-copy'
}

function copyTitle(link: MemberLink): string {
  const state = stateFor(link)
  if (state) return state.ok ? t('members.copied') : t('members.copyFailed')
  return t('members.copy')
}

async function copyValue(link: MemberLink) {
  if (!link.copy) return
  const ok = await writeToClipboard(link.copy)
  copyState.value = { key: feedbackKey(link), ok }
  clearTimeout(copyTimer)
  copyTimer = setTimeout(() => (copyState.value = null), 2000)
}

async function writeToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    }
    catch {
      // 剪贴板被拒（权限、非 https 等），走下面的兜底
    }
  }
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    textarea.remove()
    return ok
  }
  catch {
    return false
  }
}
</script>

<template>
  <div class="rounded-2xl border border-default bg-default p-5">
    <div class="flex items-start gap-4">
      <img
        v-if="props.member.avatar && !avatarFailed"
        :src="props.member.avatar"
        :alt="props.member.name"
        class="size-14 shrink-0 rounded-full object-cover"
        loading="lazy"
        @error="avatarFailed = true"
      >
      <span
        v-else
        class="flex size-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary"
        aria-hidden="true"
      >
        {{ props.member.name.charAt(0) }}
      </span>

      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p class="font-semibold">
            {{ props.member.name }}
          </p>
          <UBadge
            v-if="pick(props.member.title)"
            color="primary"
            variant="subtle"
            size="sm"
          >
            {{ pick(props.member.title) }}
          </UBadge>
        </div>
        <p
          v-if="pick(props.member.bio)"
          class="mt-1.5 text-sm leading-relaxed text-muted line-clamp-2"
        >
          {{ pick(props.member.bio) }}
        </p>
      </div>
    </div>

    <div
      v-if="props.member.links?.length"
      class="mt-4 flex flex-wrap gap-2"
    >
      <template
        v-for="link in props.member.links"
        :key="feedbackKey(link)"
      >
        <a
          v-if="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer nofollow"
          class="inline-flex items-center gap-1.5 rounded-full border border-default px-2.5 py-1 text-xs font-medium text-muted transition-colors hover:border-primary/40 hover:text-primary"
        >
          <UIcon
            v-if="iconFor(link)"
            :name="iconFor(link)"
            class="size-3.5"
          />
          {{ link.label }}
          <UIcon name="i-lucide-arrow-up-right" class="size-3" />
        </a>
        <button
          v-else-if="link.copy"
          type="button"
          :title="copyTitle(link)"
          class="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors"
          :class="[
            stateFor(link)?.ok
              ? 'border-primary/50 bg-primary/10 text-primary'
              : stateFor(link)
                ? 'border-error/50 bg-error/10 text-error'
                : 'border-default text-muted hover:border-primary/40 hover:text-primary',
          ]"
          @click="copyValue(link)"
        >
          <UIcon :name="copyIcon(link)" class="size-3.5" />
          {{ link.label }} {{ link.copy }}
        </button>
      </template>
    </div>
  </div>
</template>
