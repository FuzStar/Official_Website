// 本地预览 .output/public 的产物，等价于部署到 Cloudflare Pages 之后的样子。
// 用法：node scripts/preview.mjs [端口]
import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'

const root = new URL('../.output/public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const port = Number(process.argv[2] || 4173)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.webmanifest': 'application/manifest+json',
}

// Pages 的规则：找不到实体文件就先补 .html，再补 /index.html，最后回 404.html
function resolveFile(pathname) {
  const clean = normalize(decodeURIComponent(pathname)).replace(/^(\.\.[/\\])+/, '')
  const candidates = [
    join(root, clean),
    join(root, `${clean}.html`),
    join(root, clean, 'index.html'),
  ]

  for (const candidate of candidates) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate
  }

  return null
}

createServer((req, res) => {
  const pathname = new URL(req.url ?? '/', 'http://localhost').pathname

  if (pathname === '/') {
    res.writeHead(302, { location: '/index.html' })
    return res.end()
  }

  const file = resolveFile(pathname)
  if (!file) {
    const fallback = join(root, '404.html')
    res.writeHead(404, { 'content-type': types['.html'] })
    return existsSync(fallback) ? createReadStream(fallback).pipe(res) : res.end('404')
  }

  res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' })
  createReadStream(file).pipe(res)
}).listen(port, '127.0.0.1', () => {
  console.log(`preview: http://127.0.0.1:${port}`)
})
