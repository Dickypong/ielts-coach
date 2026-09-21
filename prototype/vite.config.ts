import { readFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** 仅开发态：从本机 OpenClaw 配置读取 MiniMax Key，供设置页一键导入 */
function openclawMinimaxDevPlugin(): Plugin {
  return {
    name: 'openclaw-minimax-dev',
    configureServer(server) {
      server.middlewares.use('/__dev/openclaw-minimax-key', async (_req, res) => {
        try {
          const raw = await readFile(join(homedir(), '.openclaw', 'openclaw.json'), 'utf8')
          const data = JSON.parse(raw) as {
            mcp?: { servers?: Record<string, { env?: Record<string, string> }> }
          }
          const key =
            data.mcp?.servers?.MiniMax?.env?.MINIMAX_API_KEY ||
            data.mcp?.servers?.minimax?.env?.MINIMAX_API_KEY ||
            ''
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: Boolean(key), apiKey: key || null }))
        } catch (e) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              ok: false,
              error: e instanceof Error ? e.message : '未找到 openclaw.json',
            }),
          )
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), openclawMinimaxDevPlugin()],
  // Tauri 生产包需要相对路径
  base: './',
  clearScreen: false,
  server: {
    host: '0.0.0.0',
    port: 5180,
    strictPort: true,
    // 浏览器直连 OpenAI 会 CORS 失败；开发态经同源代理转发 Whisper
    proxy: {
      '/__openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/__openai/, ''),
      },
    },
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: 'esnext',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
})
