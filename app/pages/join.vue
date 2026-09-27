<script setup lang="ts">
import { site } from '#content'

const groups = site.groups ?? []
const roles = site.roles ?? []

useSiteSeo({ title: '加入我们', description: site.org.tagline })
</script>

<template>
  <div>
    <SitePageHero eyebrow="Join us" title="加入我们">
      <p
        v-if="site.recruitNote"
        class="mt-5 max-w-2xl leading-relaxed whitespace-pre-line text-ink-600"
      >
        {{ site.recruitNote }}
      </p>
    </SitePageHero>

    <section id="groups" class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">社区群</h2>

      <div v-if="groups.length" class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SiteGroupCard v-for="group in groups" :key="group.url" :group="group" />
      </div>
      <p
        v-else
        class="mt-6 rounded-2xl border-2 border-dashed border-ink-900/20 px-6 py-10 text-center text-sm text-ink-400"
      >
        暂无社群信息。
      </p>
    </section>

    <section id="roles" class="border-t-2 border-ink-900/10 bg-cream-100">
      <div class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">工作团队</h2>

        <div v-if="roles.length" class="mt-8 grid items-start gap-5 sm:grid-cols-2">
          <div
            v-for="(role, index) in roles"
            :key="role.title || index"
            class="sticker-card bg-cream-50 p-6"
          >
            <div class="flex items-start justify-between gap-4">
              <h3 class="text-lg font-extrabold text-ink-950">
                {{ role.title || '未命名岗位' }}
              </h3>
              <span
                v-if="role.slots"
                class="shrink-0 rounded-full border-2 border-ink-900 bg-brand-200 px-2.5 py-0.5 text-xs font-bold text-ink-900"
              >
                {{ role.slots }}
              </span>
            </div>

            <dl class="mt-4 space-y-3.5 text-sm">
              <div v-if="role.duty">
                <dt class="font-bold text-ink-800">负责什么</dt>
                <dd class="mt-1 leading-relaxed whitespace-pre-line text-ink-600">{{ role.duty }}</dd>
              </div>
              <div v-if="role.requirement">
                <dt class="font-bold text-ink-800">有什么要求</dt>
                <dd class="mt-1 leading-relaxed whitespace-pre-line text-ink-600">{{ role.requirement }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <p v-else class="mt-6 text-sm text-ink-400">
          暂无在招岗位。
        </p>

        <div v-if="site.email" class="mt-12">
          <h3 class="text-sm font-bold tracking-wider text-ink-400 uppercase">联系方式</h3>
          <a :href="`mailto:${site.email}`" class="btn btn-secondary mt-4">
            <UIcon name="lucide:mail" class="size-4" />
            {{ site.email }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
