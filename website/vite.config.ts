import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import { defineConfig } from 'vite'

export default defineConfig((c) => ({
  base: c.mode === 'development' ? '/' : '/suntime-ics-distribution/',
  plugins: [react(), ssr({
    prerender: true,
  })],
}))
