<template>
  <div class="flex min-h-dvh flex-col">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-xl focus:border-2 focus:border-ink-900 focus:bg-brand-400 focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
    >
      跳到主要内容
    </a>

    <SiteHeader />

    <main id="main" class="flex-1">
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>
