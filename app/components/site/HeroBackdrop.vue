<template>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <!-- 顶部品牌色渐层 -->
    <div class="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/8 to-transparent" />

    <!-- 点阵：细密、低对比，负责"有纹理" -->
    <div class="absolute inset-0 bg-[radial-gradient(var(--ui-border)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

    <!--
      爪印：只在中大屏出现，尺寸放大、错位排布，不与点阵重叠成噪点。
      透明度压到 3%，是"能感觉到有"而不是"一眼看到装饰"。
    -->
    <div
      class="absolute inset-0 hidden bg-[length:var(--paw-tile-size)_var(--paw-tile-size)] opacity-[0.03] lg:block"
      :style="{
        backgroundImage: 'var(--paw-print)',
        backgroundPosition: '38px 12px',
        maskImage: 'linear-gradient(to_bottom,black,transparent_58%)',
      }"
    />
  </div>
</template>
