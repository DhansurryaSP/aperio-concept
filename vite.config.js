import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Production builds are served from GitHub Pages at /aperio-concept/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/aperio-concept/' : '/',
  plugins: [react(), tailwindcss()],
}))
