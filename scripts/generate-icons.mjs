// 生成需要位图版本的图标与分享图。
// SVG 相关的改动直接改 public/favicon.svg 和下面的分享图模板，然后跑：
//   node scripts/generate-icons.mjs
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svg = await readFile(join(root, 'public/favicon.svg'))

// iOS 会给图标加圆角，底色必须不透明，否则图标外的方形会被抠出白边
await sharp(svg, { density: 384 })
  .resize(180, 180)
  .flatten({ background: '#8b5cf6' })
  .png()
  .toFile(join(root, 'public/apple-touch-icon.png'))

console.log('apple-touch-icon.png 已生成（180×180）')

/*
 * 社交分享图 1200×630。
 * 只有品牌色、点阵和爪印这类几何元素，不放角色形象——
 * 既避开了 OC 的版权问题，也不会让人误读成什么特定角色。
 */
const paw = (x, y, scale, opacity) => `
  <g transform="translate(${x} ${y}) scale(${scale})" fill="#ffffff" opacity="${opacity}">
    <ellipse cx="6.4" cy="8.6" rx="2.1" ry="2.8" transform="rotate(-18 6.4 8.6)" />
    <ellipse cx="11" cy="6.4" rx="2.05" ry="2.9" />
    <ellipse cx="15.9" cy="7.9" rx="2.05" ry="2.75" transform="rotate(14 15.9 7.9)" />
    <ellipse cx="19.6" cy="11.4" rx="1.85" ry="2.4" transform="rotate(32 19.6 11.4)" />
    <path d="M12 12.6c3.5 0 6.3 2.7 6.3 5.4 0 2-1.6 3.3-3.7 3.3-1 0-1.8-.3-2.6-.3s-1.6.3-2.6.3c-2.1 0-3.7-1.3-3.7-3.3 0-2.7 2.8-5.4 6.3-5.4z" />
  </g>`

const dotGrid = Array.from({ length: 12 }, (_, row) => Array.from({ length: 20 }, (_, col) =>
  `<circle cx="${col * 64 + 32}" cy="${row * 64 + 32}" r="2" fill="#ffffff" opacity="0.07"/>`
).join('')).join('')

const shareSvg = ({ title, subtitle }) => `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7c3aed"/>
      <stop offset="0.55" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#d97706"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.75" cy="0.2" r="0.8">
      <stop stop-color="#fbbf24" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#fbbf24" stop-opacity="0"/>
    </radialGradient>
    <mask id="fade">
      <rect width="1200" height="630" fill="url(#fadeGrad)"/>
    </mask>
    <linearGradient id="fadeGrad" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#fff" stop-opacity="0.9"/>
      <stop offset="0.75" stop-color="#fff" stop-opacity="0.15"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g mask="url(#fade)">${dotGrid}</g>

  ${paw(940, 60, 9, 0.1)}
  ${paw(150, 420, 6, 0.07)}

  <g transform="translate(96 262)">
    <rect x="0" y="-96" width="76" height="76" rx="20" fill="#ffffff" opacity="0.16"/>
    ${paw(14, -84, 2, 0.95)}
    <text x="104" y="-38" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="72" font-weight="700" fill="#ffffff">${title}</text>
    <text x="106" y="6" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="28" font-weight="400" fill="#ffffff" opacity="0.82">${subtitle}</text>
  </g>
</svg>`

// 中英文各一张，英文页面不能挂中文图
for (const [file, text] of [
  ['og-image.png', { title: 'FuzzStar', subtitle: '国内福瑞文化爱好者组织' }],
  ['og-image-en.png', { title: 'FuzzStar', subtitle: 'A furry culture community in China' }],
]) {
  await sharp(Buffer.from(shareSvg(text)), { density: 96 })
    .png()
    .toFile(join(root, 'public', file))
  console.log(`${file} 已生成（1200×630）`)
}
