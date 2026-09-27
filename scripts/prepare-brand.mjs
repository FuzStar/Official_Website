import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

// 从 public/brand/logo-source.jpeg 派生出站内要用的各种尺寸。
// 换了 logo 之后重跑：node scripts/prepare-brand.mjs

const root = resolve(import.meta.dirname, '..')
const brandDir = resolve(root, 'public/brand')
const publicDir = resolve(root, 'public')

const CREAM = { r: 255, g: 252, b: 247, alpha: 1 }
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 }

const source = await sharp(resolve(brandDir, 'logo-source.jpeg')).rotate().toBuffer()
const { width, height } = await sharp(source).metadata()
console.log(`原图 ${width}x${height}`)

// 原图是白底，抠成透明才不会在奶油色页面上留一个白方块。
// 阈值做成软过渡，免得爪印边缘出现白边或者硬锯齿。
async function cutWhite(input, threshold = 236, feather = 16) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true })

  for (let i = 0; i < data.length; i += 4) {
    const lightness = (data[i] + data[i + 1] + data[i + 2]) / 3

    if (lightness >= threshold) {
      data[i + 3] = 0
    } else if (lightness > threshold - feather) {
      data[i + 3] = Math.round((255 * (threshold - lightness)) / feather)
    }
  }

  return sharp(data, { raw: info }).png().toBuffer()
}

// 把爪印摆进一块方形底板，留出安全边距，做图标用
async function plate(mark, size, padding, background) {
  const inner = size - padding * 2
  const artwork = await sharp(mark)
    .resize(inner, inner, { fit: 'contain', background: CLEAR })
    .png()
    .toBuffer()

  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: artwork, gravity: 'center' }])
    .png()
    .toBuffer()
}

// 整张 logo。带白底的那张给首页贴纸卡片用，抠透的那张给 og 图用
const fullLogo = await sharp(source).png().toBuffer()
await writeFile(resolve(brandDir, 'logo.png'), fullLogo)
await writeFile(resolve(brandDir, 'logo-clear.png'), await cutWhite(fullLogo))

// 页头只放爪印。位置按原图比例取，换图也大致对得上。
const markBox = {
  left: Math.round(width * 0.13),
  top: Math.round(height * 0.03),
  width: Math.round(width * 0.74),
  height: Math.round(height * 0.57),
}
const markRegion = await sharp(source).extract(markBox).png().toBuffer()
const mark = await cutWhite(markRegion)

await writeFile(
  resolve(brandDir, 'mark.png'),
  await sharp(mark).resize(512, 512, { fit: 'contain', background: CLEAR }).png().toBuffer(),
)

await writeFile(resolve(publicDir, 'favicon.png'), await plate(mark, 64, 3, CLEAR))
await writeFile(resolve(publicDir, 'apple-touch-icon.png'), await plate(mark, 180, 18, CREAM))
await writeFile(resolve(brandDir, 'icon-192.png'), await plate(mark, 192, 20, CREAM))
await writeFile(resolve(brandDir, 'icon-512.png'), await plate(mark, 512, 52, CREAM))

// 分享卡片。底色压一层暖色圆斑，避免整张白板
const ogBackdrop = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <rect width="1200" height="630" fill="#FFFCF7"/>
    <circle cx="1130" cy="70" r="200" fill="#F8D5B2" opacity="0.6"/>
    <circle cx="60" cy="580" r="170" fill="#FAD3CA" opacity="0.55"/>
    <circle cx="1080" cy="560" r="60" fill="#F3B983" opacity="0.7"/>
  </svg>`,
)

const ogMark = await sharp(resolve(brandDir, 'logo-clear.png'))
  .resize(300, 300, { fit: 'contain', background: CLEAR })
  .png()
  .toBuffer()

const ogText = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="320">
    <text x="0" y="128" font-family="Microsoft YaHei, PingFang SC, sans-serif" font-size="92" font-weight="700" fill="#3B2A1F">星绒社区</text>
    <text x="4" y="238" font-family="Outfit, Trebuchet MS, sans-serif" font-size="80" font-weight="700" fill="#D27438" letter-spacing="2">FuzzStar</text>
  </svg>`,
)

await writeFile(
  resolve(publicDir, 'og-image.png'),
  await sharp(ogBackdrop)
    .composite([
      { input: ogMark, left: 160, top: 165 },
      { input: ogText, left: 540, top: 160 },
    ])
    .png()
    .toBuffer(),
)

console.log('品牌资源已生成')
