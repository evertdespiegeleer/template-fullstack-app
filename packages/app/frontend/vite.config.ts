import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    server: {
      port: Number(process.env.FRONTEND_PORT),
      host: true,
      proxy: {
        '/api': {
          target: `http://app:${process.env.BACKEND_PORT ?? 13001}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [react()]
  })
})
