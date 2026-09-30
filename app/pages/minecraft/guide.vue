<script setup lang="ts">
import { minecraft, minecraftGuide } from '#content'

const sections = minecraftGuide.sections ?? []

// 图标名是运行时拼出来的，扫描不到，都列进了 nuxt.config 的 clientBundle.icons。
// 内容里出现没登记的 id 就落到 book-open，不至于空一块。
const sectionIcons: Record<string, string> = {
  residence: 'lucide:shield',
  teleport: 'lucide:compass',
  economy: 'lucide:coins',
  rewards: 'lucide:sparkles',
}
const sectionIcon = (id: string) => sectionIcons[id] || 'lucide:book-open'

const serverName = minecraft.name || '游戏服'

useSiteSeo({ title: '服务器教程', description: minecraftGuide.lead })
</script>

<template>
  <div>
    <SitePageHero
      eyebrow="Guide"
      title="服务器教程"
      :description="minecraftGuide.lead"
    >
      <NuxtLink to="/minecraft" class="btn btn-secondary">
        <UIcon name="lucide:arrow-left" class="size-4" />
        回{{ serverName }}
      </NuxtLink>
    </SitePageHero>

    <section v-if="sections.length" class="mx-auto max-w-5xl px-5 pt-14 sm:px-8">
      <nav aria-label="教程目录" class="flex flex-wrap gap-2.5">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="guide-tab"
        >
          <UIcon :name="sectionIcon(section.id)" class="size-4" />
          {{ section.title }}
        </a>
      </nav>
    </section>

    <section
      v-for="(section, index) in sections"
      :id="section.id"
      :key="section.id"
      class="scroll-mt-24"
      :class="index % 2 === 1 ? 'border-y-2 border-ink-900/10 bg-cream-100' : ''"
    >
      <div class="mx-auto max-w-5xl px-5 py-16 sm:px-8">
        <div class="flex items-center gap-3.5">
          <span
            class="grid size-11 shrink-0 place-items-center rounded-2xl border-2 border-ink-900 bg-brand-200"
          >
            <UIcon :name="sectionIcon(section.id)" class="size-5 text-ink-900" />
          </span>
          <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
            {{ section.title }}
          </h2>
        </div>

        <p v-if="section.lead" class="mt-4 max-w-2xl leading-relaxed text-ink-600">
          {{ section.lead }}
        </p>

        <div v-for="(group, groupIndex) in section.groups" :key="groupIndex" class="mt-10">
          <h3
            v-if="group.title"
            class="text-xs font-bold tracking-[0.16em] text-brand-700 uppercase"
          >
            {{ group.title }}
          </h3>

          <ul class="mt-4 space-y-3">
            <li
              v-for="(entry, entryIndex) in group.entries"
              :key="entryIndex"
              class="guide-entry"
            >
              <div v-if="entry.cmd" class="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                <code class="guide-cmd">{{ entry.cmd }}</code>
                <SiteCopyButton :value="entry.cmd" />
              </div>
              <p v-if="entry.desc" class="guide-desc" v-html="entry.desc" />
            </li>
          </ul>
        </div>

        <div v-if="section.note" class="rich-text guide-note mt-8" v-html="section.note" />
      </div>
    </section>

    <section class="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div
        class="sticker-card flex flex-col items-start gap-6 bg-brand-100 p-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h2 class="text-xl font-extrabold text-ink-950 sm:text-2xl">照着做还是没成？</h2>
          <p class="mt-2 max-w-xl text-ink-700">
            多半是版本或者权限的问题，进群说一声，有人接。
          </p>
        </div>

        <div class="flex shrink-0 flex-wrap gap-3">
          <NuxtLink to="/minecraft" class="btn btn-secondary">
            回{{ serverName }}
          </NuxtLink>
          <NuxtLink to="/join" class="btn btn-primary">
            进群
            <UIcon name="lucide:arrow-right" class="size-4" />
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
