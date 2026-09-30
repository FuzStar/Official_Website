<script setup lang="ts">
import { minecraft } from '#content'

// 只有 yaml 里出现的图标名扫描不到，要用的都跟 nuxt.config 的 clientBundle.icons 对齐。
// 写了别的 platform 就落到手柄图标上，不至于空一块。
const addressIcons: Record<string, string> = {
  java: 'lucide:coffee',
  bedrock: 'lucide:box',
}

const addressIcon = (platform: string) => addressIcons[platform] || 'lucide:gamepad-2'

const addresses = minecraft.addresses ?? []
const access = minecraft.access ?? []

useSiteSeo({ title: minecraft.name || '游戏服', description: minecraft.lead })
</script>

<template>
  <div>
    <SitePageHero
      eyebrow="Minecraft"
      :title="minecraft.name || '游戏服'"
      :description="minecraft.lead"
    >
      <SiteMinecraftStatus v-if="minecraft.status.java" :host="minecraft.status.java" />
    </SitePageHero>

    <section v-if="addresses.length" class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">服务器地址</h2>

      <div class="mt-8 grid gap-5 sm:grid-cols-2">
        <article
          v-for="address in addresses"
          :key="`${address.host}:${address.port}`"
          class="sticker-card flex flex-col bg-cream-50 p-6"
        >
          <div class="flex items-center gap-3.5">
            <span
              class="grid size-12 shrink-0 place-items-center rounded-2xl border-2 border-ink-900 bg-brand-200"
            >
              <UIcon :name="addressIcon(address.platform)" class="size-5 text-ink-900" />
            </span>
            <h3 class="text-lg font-extrabold text-ink-950">
              {{ address.label || '连接地址' }}
            </h3>
          </div>

          <!-- 基岩版客户端把地址和端口分成两个输入框，这里也分开列，各自能单独复制。
               Java 版走 SRV，端口为空，复制地址那一条就够了。 -->
          <dl class="mt-6 space-y-4">
            <div>
              <dt class="text-xs font-bold tracking-wider text-ink-400">服务器地址</dt>
              <dd class="mt-1.5 flex flex-wrap items-center gap-2.5">
                <span class="font-mono text-lg font-bold break-all text-ink-900">
                  {{ address.host }}
                </span>
                <SiteCopyButton v-if="address.host" :value="address.host" />
              </dd>
            </div>

            <div v-if="address.port">
              <dt class="text-xs font-bold tracking-wider text-ink-400">端口</dt>
              <dd class="mt-1.5 flex flex-wrap items-center gap-2.5">
                <span class="font-mono text-lg font-bold text-ink-900">{{ address.port }}</span>
                <SiteCopyButton :value="address.port" />
              </dd>
            </div>
          </dl>

          <p v-if="address.note" class="mt-5 text-sm leading-relaxed text-ink-600">
            {{ address.note }}
          </p>
        </article>
      </div>
    </section>

    <section v-if="access.length" class="border-y-2 border-ink-900/10 bg-cream-100">
      <div class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">怎么进来</h2>
        <p class="mt-3 max-w-2xl text-ink-600">不同的账号走的路不一样，对着自己的情况看。</p>

        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <article
            v-for="(item, index) in access"
            :key="item.title || index"
            class="sticker-card bg-cream-50 p-6"
          >
            <h3 class="text-lg font-extrabold text-ink-950">{{ item.title }}</h3>
            <div v-if="item.body" class="rich-text mt-3" v-html="item.body" />
          </article>
        </div>
      </div>
    </section>

    <section v-if="minecraft.about" class="mx-auto max-w-3xl px-5 py-16 sm:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">这服在玩什么</h2>
      <div class="rich-text rich-text-lg mt-8" v-html="minecraft.about" />
    </section>

    <section v-if="minecraft.rules || minecraft.penalty" class="border-y-2 border-ink-900/10 bg-cream-100">
      <div class="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">服务器规矩</h2>
        <div v-if="minecraft.rules" class="rich-text rich-text-lg mt-8" v-html="minecraft.rules" />

        <template v-if="minecraft.penalty">
          <h3 class="mt-12 text-xl font-extrabold text-ink-950">违反了会怎么处理</h3>
          <div class="rich-text rich-text-lg mt-5" v-html="minecraft.penalty" />
        </template>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <div
        class="sticker-card flex flex-col items-start gap-6 bg-brand-100 p-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 class="text-xl font-extrabold text-ink-950 sm:text-2xl">进群一起玩</h2>
          <p v-if="minecraft.joinNote" class="mt-2 max-w-xl text-ink-700">
            {{ minecraft.joinNote }}
          </p>
        </div>

        <NuxtLink to="/join" class="btn btn-secondary shrink-0">
          看社群
          <UIcon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
