<script setup lang="ts">
import { site } from '#content'

const groups = site.groups ?? []
const roles = site.roles ?? []

// 手风琴同一时间只开一个。默认开第一个：首页有链接直达 #roles，
// 落地就能看见内容，不用再点一下。再点一下当前项则全部收起。
const openIndex = ref(0)

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? -1 : index
}

useSiteSeo({ title: '加入我们', description: site.org.tagline })
</script>

<template>
  <div>
    <SitePageHero eyebrow="Join us" title="加入我们">
      <p v-if="site.joinLead" class="mt-5 max-w-2xl leading-relaxed text-ink-600">
        {{ site.joinLead }}
      </p>
    </SitePageHero>

    <section id="groups" class="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <h2 class="text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">社区群</h2>
      <p class="mt-3 max-w-2xl text-ink-600">日常都在这里，挑一个你常用的加入就行。</p>

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

        <!-- 招募说明与通用要求，来自 content/site.yaml 的 recruitNote，已渲染成 HTML -->
        <div
          v-if="site.recruitNote"
          class="mt-8 max-w-3xl rounded-2xl border-2 border-dashed border-ink-900/25 bg-cream-50 px-6 py-6 sm:px-7"
        >
          <div class="rich-text" v-html="site.recruitNote" />
        </div>

        <!-- 岗位收成手风琴：开发部的要求比社区部长一倍多，全展开时页面拖得很长。
             折叠状态下正文仍留在 DOM 里（v-show 而非 v-if），搜索引擎照样读得到。 -->
        <div v-if="roles.length" class="mt-6 space-y-4">
          <article
            v-for="(role, index) in roles"
            :key="role.title || index"
            class="sticker-card overflow-hidden bg-cream-50"
          >
            <h3>
              <button
                type="button"
                class="flex w-full items-center gap-3 px-6 py-5 text-left sm:px-8"
                :aria-expanded="openIndex === index"
                :aria-controls="`role-panel-${index}`"
                @click="toggle(index)"
              >
                <span class="text-lg font-extrabold text-ink-950 sm:text-xl">
                  {{ role.title || '未命名岗位' }}
                </span>
                <span
                  v-if="role.slots"
                  class="rounded-full border-2 border-ink-900 bg-brand-200 px-2.5 py-0.5 text-xs font-bold text-ink-900"
                >
                  {{ role.slots }}
                </span>
                <UIcon
                  name="lucide:chevron-down"
                  class="ml-auto size-5 shrink-0 text-ink-400 transition-transform duration-200"
                  :class="openIndex === index ? 'rotate-180' : ''"
                />
              </button>
            </h3>

            <Transition name="role-panel">
              <div
                v-show="openIndex === index"
                :id="`role-panel-${index}`"
                class="border-t-2 border-dashed border-ink-900/15 px-6 pt-6 pb-7 sm:px-8"
              >
                <div class="lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] lg:gap-10">
                  <div v-if="role.duty">
                    <p class="text-xs font-bold tracking-wider text-ink-400 uppercase">
                      负责什么
                    </p>
                    <div class="rich-text mt-2" v-html="role.duty" />
                  </div>

                  <div
                    v-if="role.requirement"
                    class="mt-7 border-t-2 border-dashed border-ink-900/15 pt-6 lg:mt-0 lg:border-t-0 lg:pt-0"
                  >
                    <p class="text-xs font-bold tracking-wider text-ink-400 uppercase">
                      有什么要求
                    </p>
                    <div class="rich-text mt-2" v-html="role.requirement" />
                  </div>
                </div>
              </div>
            </Transition>
          </article>
        </div>

        <p v-else class="mt-6 text-sm text-ink-400">暂无在招岗位。</p>

        <div
          v-if="site.email"
          class="sticker-card mt-14 flex flex-col gap-6 bg-brand-100 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8"
        >
          <div>
            <h3 class="text-lg font-extrabold text-ink-950">怎么联系我们</h3>
            <p class="mt-2 max-w-md text-sm leading-relaxed text-ink-700">
              想来的话，发邮件说明你想去哪个方向、大概能投入多少时间。
            </p>
          </div>

          <a
            :href="`mailto:${site.email}`"
            class="btn btn-secondary shrink-0 self-start sm:self-auto"
          >
            <UIcon name="lucide:mail" class="size-4" />
            {{ site.email }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
