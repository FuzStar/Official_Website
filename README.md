# 星绒社区 FuzzStar 官网

国内兽圈（福瑞）非官方社区组织「星绒社区 FuzzStar」的官方网站。
对外是门面，对内是把人引到社区群的中转站。

## 技术栈

Nuxt 4.5.2 + Nuxt UI 4.11.2 + Tailwind CSS 4，纯静态生成，托管在 Cloudflare Pages。

整站构建时预渲染成静态文件，没有服务端、没有接口、没有冷启动。以后要接社区 APP 的接口，
把 `nuxt.config.ts` 里的 nitro preset 换掉即可，页面代码不用动。

## 本地开发

```bash
npm install
npm run dev
```

## 构建与预览

```bash
npm run generate   # 产物在 .output/public
npm run preview    # 本地起静态服务预览产物，路由行为跟 Pages 一致
```

## 部署到 Cloudflare Pages

在 Pages 里连这个仓库，构建配置填：

| 项 | 值 |
| --- | --- |
| Framework preset | Nuxt |
| Build command | `npm run generate` |
| Build output directory | `.output/public` |
| 环境变量 | `NODE_VERSION` = `22` |

`public/_headers` 会被原样带到站点根目录，哈希产物走长期缓存。

## 改内容

**所有文案、名单、链接都在 `content/` 目录里，页面本身不含任何内容。**
具体怎么改看 [`content/README.md`](content/README.md)，那份文档是写给不懂代码的管理组成员的。

`content/` 之外不要改，页面结构和样式没有需要日常维护的部分。

## 品牌资源

`public/brand/logo-source.jpeg` 是 logo 原图。改了原图之后跑：

```bash
node scripts/prepare-brand.mjs
```

它会重新生成 favicon、apple-touch-icon、og 图和各尺寸图标。
